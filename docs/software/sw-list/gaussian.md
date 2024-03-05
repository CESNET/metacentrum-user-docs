# Gaussian

    module avail g03/
    module avail g09/
    module avail g16/

[Gaussian](https://www.gaussian.com) is package of quantum mechanics programs. Program serves to predict the energies, molecular structures, and vibrational frequencies of molecular systems, along with numerous molecular properties derived from these basic computation types.

## License

Gaussian 03 and 09 can be used on the clusters installed in Brno location:

    -l select=1:ncpus=N: ... :brno=True

!!! warning
    The purchased licenses permit just an academic use of the program!

## Versions

Program is actually available in many versions: 

- g09-A.02 including GaussView (only [JCU](https://jcu.cz) users),
- g09-A02 and Gaussian 09 (g09, G09-C.01, G09-D.01 and g09-E.01),
- g16-A.03 and the newest g16-C.01.

Module `g09/D.01linda` contains Linda version allowing to use more machines.

If you do not use Linda version, other versions permit computing only on one machine, thus it is nonsense to plan computation on more machines. Although job submission in form

    select=Y:ncpus=X

with Y > 1 will not end with an error, it will compute only on one machine like you submit it with `select=1:ncpus=X` parameter. This results in overcomming the requested resources on memory or scratch size and the job would be killed.


## Usage

### Batch computation

- prepare the job description script, where you should specify the computation, which should be performed over the input file

Recommendation: we highly recommend to use the g09-prepare (or g16-prepare for the G16 version) utility from within the script -- within the file, the utility automatically sets the parameters %nproc (number of processors), %mem (amount of usable memory) and %rwf (amount of scratch space -- for large computations, the scratch space may also be separated into multiple files, which may be automatically erased by Gaussian during the computation) based on the real resources dedicated for the job. See g09-prepare -h.
        
For example, such a script may look like this one:

````
    #!/bin/bash
    
    #ensure removing the temporary data if the job ends or fails
    trap "clean_scratch" TERM EXIT
     
    DATADIR="/storage/brno2/home/$LOGNAME"
    JOBNAME="myjob"             # myjob.com -> myjob.log
    
    # sanity checks
    if [[ -z "$SCRATCHDIR" ]]; then
       echo "use scratch_local, scratch_ssd, or scratch_shared in qsub (resource specification)"
       exit 1
    fi
    
    if [[ ! (-f "$DATADIR/${JOBNAME}.com") ]]; then
       echo "the input file '$DATADIR/${JOBNAME}.com' does not exist"
       exit 1
    fi
    
    # copy input file from shared network disk to local disk
    cp $DATADIR/${JOBNAME}.com $SCRATCHDIR/ || exit 1
    cd $SCRATCHDIR/ || exit 2
    
    # let's load the Gaussian module
    module add g09
    
    #  myjob.com is the input file
    # setup the resource requirements within the input file so that they correspond to the resources reserved
    g09-prepare ${JOBNAME}.com
    
    # start the computation (use g16 instead of g09 for the g16 version) , myjob.log will be the output file
    g09 ${JOBNAME}.com
    # alternatively: g09 < ${JOBNAME}.com > ${JOBNAME}.log
    
    # copy the output from local scratch to shared network disk
    cp ${JOBNAME}.log $DATADIR/ || export CLEAN_SCRATCH=false
````

Pass the startup script to the scheduler together with resource requirements:

    qsub -l select=1:ncpus=X:mem=Yg:scratch_local=Zg mydescriptionscript.sh
        
!!! note
    The Gaussian version purchased by MetaCentrum does not support a distributed run over a multiple nodes; thus, use just a single node with multiple processors for your computations...


### Linda computations (using more machines)

The script remains the same, we only change `module add g09` for `module add g09/D.01linda` and submit the job with given number of machines N

     qsub -l select=N:ncpus=X:mem=Yg:scratch_local=Zg mydescriptionscript.sh

### Interactive computation

Ask for an interactive job having a single node with a specified number of processors (ppn parameter), specified amount of memory (mem parameter), and specified amount of scratch space (scratch parameter -- in KB) reserved:

    qsub -I -l select=1:ncpus=X:mem=Yg:scratch_local=Zg

Load the Gaussian module into the environment:

    module add g09

Prepare the Gaussian input file (named e.g. myinput.com).

!!! tip
    We highly recommend to use the g09-prepare utility to automatically set the input file's parameters %nproc (number of processors), %mem (amount of usable memory) and %rwf (amount of scratch space -- for large computations, the scratch space may also be separated into multiple files, which may be automatically erased by Gaussian during the computation) based on the real resources dedicated for the job. See `g09-prepare -h`.

    g09-prepare myjob.com

Run the computation

    g09 myjob.com

(alternatively: `g09 <myjob.com >myjob.out`)

## FAQs

**Q:** How to tell Gaussian to limit the size of the used /scratch? How to determine, what size had been really used?

**A:** Once a Gaussian computation finishes, it informs the user about the size of used files in the following form:

    File lengths (MBytes):  RWF=    207 Int=      0 D2E=      0 Chk=    134 Scr=      1

It is possible to limit the amount of the used scratch space using the directives %RWF=,%Int=,%D2E= in the form (if more space is necessary, the computation crashes):

    %RWF=/directory/,200GB 

It is also necessary to tell PBS to reserve such a space on the scratch -- do it using the -l scratch=XXX parameter (see more information in Scratch storage). The following example ensures an allocation of 200 GB space on the /scratch volume of the worker node::

    -l scratch=200gb 

To set the RWF parameter automatically (based on the resources really reserved for a job), please, use the `g09-prepare` command (see above). When using this script for large computations, one may let the script to let the scratch space separate into multiple files, which may be automatically erased by Gaussian during the computation (%NoSave).

Note: Alternatively, the amount of scratch space may be limited using the `MaxDisk=200GB` parameter (however, this is just a hint for some computation methods, which are able to work with a disk using different ways -- generally, this parameter does not ensure exceeding of the specified value.)

**Q:** Memory alocation in program Gaussian version G03.E01 does not work. What should I do?

**A:** If you get a warning: "buffer allocation failed in ntrext1." just after running the program, use as work directory $SCRATCHDIR instead of $HOME (there is an error in the new version, that occurs according type of file system)

**Q:** I think there is a problem with the node `orca14-2`. Gaussian computings have fallen down immediately after running with error message (every time in different part of the log file) "Erroneous write. Write 8192 instead of 12288."

**A:** Reason of this failure is that your disk is full of undeleted Gaussian helping files. These files are remains from your previous computings which weren't successful. You can avoid this situation by deleting all helping files after the end of computing.

**Q:** Which settings are necessary for Linda version?

**A:** You should specify

    %NProcShared=2
    %LindaWorkers=doom29,gram7

where the first defines how many cores you need per machine, and the second parameter is the list of machines. `g09-prepare` sets both parameters by default. 

