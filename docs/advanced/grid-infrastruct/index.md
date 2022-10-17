# Grid infrastructure


Sem dat ukecanejsi vysvetleni toho jak u nas funguje infrastruktura, homy, proc jsou ruzne frontendy na ruzne homy atd.

## Frontends

- vcetne overovani klicu

## Scratch storages

Scratch storage is a storage for temporary files on computing nodes. This storage should be used only during computations and should be freed immediately after your job ends. The location of scratch directory is defined by a system variable SCRATCHDIR.
Scratch types

We offer four types of scratch storage:

    scratch_local
        available on every node, located on regular hard disc
        choose this type as a default if you have no reason to do otherwise
        integer type, submitted as scratch_local=10gb
        located in /scratch/USERNAME/job_JOBID
    scratch_ssd
        located on small SSD disc
        ultra fast (compared to local scratch), but smaller in volume
        integer type, submitted as scratch_ssd=1gb
        not available on all computational nodes!
        to check for availability on a particular node: go to https://metavo.metacentrum.cz/pbsmon2/props -> choose a node -> search for scratch_ssd in a gray table
        recommended in jobs where the bottleneck is disc-related operations (applications that create/read a lot of files)
        located in /scratch.ssd/USERNAME/job_JOBID
    scratch_shared
        network volume which is shared between all clusters in a given location (city)
        read/write operation slower than on local scratch
        useful if you need to run more than one application that need access to the same data
        integer type, submitted as scratch_shared=10gb
        not available on all computational nodes!
        to check for availability on a particular node: go to https://metavo.metacentrum.cz/pbsmon2/props -> choose a node -> search for scratch_shared in a gray table
        mounted to directory /scratch.shared/USERNAME/job_JOBID
    scratch_shm
        scratch directory is in RAM
        fastest, but data on scratch do not survive the end/failure of the job
        use when you need ultra fast scratch AND when you absolutely don't care about data from failed/killed/ended jobs
        boolean type, submitted as scratch_shm=true
        maximum size of scratch is defined by mem (memory) parameter
        remember to choose mem large enough (to hold both data in scratch and the actual memory requirements for the job)
        mounted to directory /dev/shm/scratch.shm/USERNAME/job_JOBID

Warning.gif Warning: You must set the size and type of scratch dir during job submission! There is no default type of scratch.


$SCRATCHDIR is not writable, only it's content is. Therefore you cannot e.g. do rm -rf $SCRATCHDIR, but you can rm -rf $SCRATCHDIR/*. Users should always clear the content of scratch directory after the job ends to free disc space. Otherwise, this directory will be automatically deleted after 14 days at most (earlier if there is lack of space on disks).
Examples

    submit batch job with 100 GB scratch on local disc

qsub -l select=1:ncpus=1:mem=4gb:scratch_local=100gb

    submit interactive job with 20 GB memory and scratch in RAM

qsub -I -l select=1:ncpus=1:mem=20gb:scratch_shm=true

    submit batch job with 1 GB of scratch on SSD disc

 qsub -l select=1:ncpus=1:mem=4gb:scratch_ssd=1gb

System variables

The most important system variables related to scratch are these:

    SCRATCHDIR
        location of scratch directory
        echo $SCRATCHDIR
    SCRATCH_TYPE
        type of scratch directory
        echo $SCRATCH_TYPE
    SCRATCH_VOLUME
        size of scratch directory
        echo $SCRATCH_VOLUME










