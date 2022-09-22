# PBS detailed options page

Prerequisites - user is familiar with the following concepts:

- what is a **queue** in our system
- what is a PBS **resource**
- what is a **job ID**
- that they need a **Kerberos ticket** to run a job

Don't forget to make the user aware also that...

- there is limitation to **number or jobs** (10 000)
- there exists a link to **qsub refiner**
- there is **fairshare** for resources
- that there are **three PBS servers** in Metacentrum



## PBS basic commands

    qsub – submit the job to the queue
    qdel – cancel a waiting or running job
    qmove – move the job to another queue (only waiting jobs!)
    pbsnodes – get current node state and its properties
    qstat – current state of jobs

The volume of displayed information can be adjusted by -v and -vv parameters. 

## qsub

### **Memory** (**mem**)

Job is implicitly assigned 400 MB of memory if not specified otherwise.

    -l select=1:ncpus=1:mem=10gb

### **Duration** (**walltime**)

Maximal duration of a job is set in format `hh:mm:ss`. Default value is 24 hours.

    -l walltime=1:00:00 (one hour)

Users can to a certain extent prolong walltime in running jobs - see [`qextend` command](#qextend)

### **Scratch directory** (**scratch_local | scratch_shared | scratch_ssd | scratch_shm**)

Scratch storage is a storage for temporary files on computing nodes. This storage should be used only during computations and should be freed immediately after your job ends. 

!!! warning "No default scratch"

 You must always specify the size and type of scratch if you need to use one. Unlike in the case of memory, cpus and walltime, there is no default value for scratch directory.

!!! note "Scratch directory cleaning"

 Scratch directory is not writable, only it's content is. Therefore you cannot clean the scratch by `rm -rf $SCRATCHDIR`, but you can do it by `rm -rf $SCRATCHDIR/*`. Users should always clear the content of scratch directory after the job ends to free disc space. Otherwise, this directory will be automatically deleted after approx. 14 days (earlier if there is lack of space on disks).

We offer four types of scratch storage:

- `scratch_local`
    - available on every node, located on regular hard disc
    - choose this type as a default if you have no reason to do otherwise
    - located in `/scratch/USERNAME/job_JOBID`
- `scratch_ssd`
    - located on small SSD disc
    - ultra fast (compared to local scratch), but smaller in volume
    - not available on all computational nodes!
    - to check for availability on a particular node: see [Node properties on Metavo pages](https://metavo.metacentrum.cz/pbsmon2/props)
    - recommended in jobs where the bottleneck is disc-related operations (applications that create/read a lot of files)
    - located in `/scratch.ssd/USERNAME/job_JOBID`
- `scratch_shared`
    - network volume which is shared between all clusters in a given location (city)
    - read/write operation slower than on local scratch
    - useful if you need to run more than one application that need access to the same data
    - not available on all computational nodes!
    - to check for availability on a particular node: see [Node properties on Metavo pages](https://metavo.metacentrum.cz/pbsmon2/props)
    - mounted to directory `/scratch.shared/USERNAME/job_JOBID`
- `scratch_shm`
    - scratch directory is in RAM
    - fastest, but data on scratch do not survive the end/failure of the job
    - use when you need ultra fast scratch AND when you absolutely don't care about data from failed/killed/ended jobs
    - boolean type, submitted as `scratch_shm=true`
    - maximum size of scratch is defined by mem (memory) parameter
    - remember to choose mem large enough (to hold both data in scratch and the actual memory requirements for the job)
    - mounted to directory `/dev/shm/scratch.shm/USERNAME/job_JOBID`


The most important system variables related to scratch are these:

- `SCRATCHDIR`: path to scratch directory
- `SCRATCH_TYPE`: type of scratch directory
- `SCRATCH_VOLUME`: size of scratch directory

## **Number of nodes and processors**

Number of processors and "chunks" is set with -l select=[number]:ncpus=[number]. Terminology of PBS Pro defines "chunk" as further indivisible set of resources allocated to a job on 1 physical node. Chunks can be on one machine next to each other or conversely always on different machines, eventually they can be placed according to available resources. Note that only one select argument is allowed at a time. Examples:

        -l select=1:ncpus=2 – two processors on one chunk
        -l select=2:ncpus=1 – two chunks each with one processor
        -l select=1:ncpus=1+1:ncpus=2 – two chunks, one with one processor and second with two processors
        -l select=2:ncpus=1 -l place=pack – all chunks must be on one node (if there is not any big enough node, the job will never run)
        -l select=2:ncpus=1 -l place=scatter – each chunk will be placed on different node
        -l select=2:ncpus=1 -l place=free – permission to plane chunks on nodes arbitrarily, according to actual resource availability on nodes (default behavior for PBS Pro):

If you are not sure about the number of needed processors, ask for an exclusive reservation of the whole machine using the parameter "-l place=":

        -l select=2:ncpus=1 -l place=exclhost – request for 2 exclusive nodes (without cpu and mem limit control)
        -l select=3:ncpus=1 -l place=scatter:excl – it is possible to combine exclusivity with specification of chunk planning
        -l select=102:place=group=cluster – 102 cpus on one cluster


### **Licence**

Some software require licence. Licence is set by parameter -l

        -l select=3:ncpus=1 -l walltime=1:00:00 -l matlab=1 – one licence for Matlab
        -l walltime=120:00:00 (5 days)


### **Email notification**

PBS server sends email notification when the job changes state.

        -m a send mail when job is aborted by batch system
        -m b send mail when job begins execution
        -m e send mail when job ends execution
        -m n do not send mail

The options a, b, e can be combined, e.g.:

        -m abe – sends an email when the job aborts (a), begins (b) and completes/ends (e)

The email can be sent to any email address using the -M option:

        -M james@pbspro.com


### **Path for output**

By default the job output (output, and error files) is saved in a folder from which the job was submitted (variable PBS\_O\_WORKDIR).

This behaviour for output, resp. error files can be changed by parameters -o, resp -e.

        -o /custom-path/myOutputFile
        -e /custom-path/myErrorFile

### **Queue and/or PBS server**

If you need to send the job to a specific queue and/or specific PBS server, use the qsub -q destination option.

The argument destination can be one of the following:

queue@server # specific queue on specific server,
queue # specific queue on the current (default) server,
@server # default queue on specific server.

E. g. qsub -q oven@meta-pbs.metacentrum.cz will send the job to a queue oven on server meta-pbs.metacentrum.cz. Similarly, qsub -q @cerit-pbs.cerit-sc.cz will send the job to default queue managed by cerit pbs server, no matter which frontend the job is sent from. 


### **OS**

To submit a job to a machine with Debian9, please use "os=debian9", or "os=centos7" in job specification:

 zuphux$ qsub -l select=1:ncpus=2:mem=1gb:scratch\_local=1gb:os=debian9 …

To submit a job to a machine with any Debian, please use "osfamily=debian", or "osfamily=redhat" (for rhel or centos) in job specification:

 zuphux$ qsub -l select=1:ncpus=2:mem=1gb:scratch\_local=1gb:osfamily=debian …

To run tasks on a machine with any OS, type "os = ^ any"

 zuphux$ qsub -l select=1:ncpus=2:mem=1gb:scratch\_local=1gb:os=^any …

If you experience any problem with libraries or applications compatibility in Debian9, please add module debian8-compat. 

### **Cluster**

The PBS allows you to choose a particular cluster:

qsub -l select=X:ncpus=X:mem=Xmb:scratch\_local=X:cluster=ida

The PBS allows also to avoid a particular cluster:

qsub -l select=X:ncpus=X:mem=Xmb:scratch\_local=X:cluster=^ida

However it is not possible to combine conditions. If you e.g. want to avoid both ida and haldir, the following

qsub -l select=X:ncpus=X:mem=Xmb:scratch\_local=X:cluster=^ida:cluster=^haldir

will not work. This is based on the principle that in PBS, every resource (in this case cluster resource) can be specified only once.

On the other hand, cl\_ida and cl\_haldir are different resources, so:

qsub -l select=X:ncpus=X:mem=Xmb:scratch\_local=X:cl\_ida=False:cl\_haldir=False

will work and will avoid both ida and haldir clusters.

The same will do with

qsub -l select=X:ncpus=X:mem=Xmb:scratch\_local=X:cluster=^ida:cl\_haldir=False

Note: As the list of node properties is made by hand, it is always possible that for some cluster the resource cl\_SOMETHINGwill be missing. Therefore

    always check a list of resources in https://metavo.metacentrum.cz/pbsmon2/props#prop2node
    write us to meta@cesnet.cz if you think some cl_SOMETHING is missing from the list. Thank you!

### **CPU speed**

To require minimal CPU speed, use parameter spec. E.g.

    qsub -l select=1:ncpus=1:spec=4.8

will limit your selection to computational nodes with CPU speed scaled as 4.8 (as scaled by SPEC CPU2017) or higher. To see which machines comply to this criterion, go to qsub assembler and fill in the spec parameter only. Below you will get a table of machines matching your requirement. 

### **MPI processes**

    How many MPI processes would run on one chunk is specified by mpiprocs=[number].
    For each MPI process there is one line in nodefile $PBS_NODEFILE that specifies allocated vnode.
        -l select=3:ncpus=2:mpiprocs=2 – 6 MPI processes (nodefile contains 6 lines with names of vnodes), 2 MPI processes always share 1 vnode with 2 CPU
    How many OpenMP threads would run in 1 chunk (ompthreads=[number]), 2 omp threads on 1 chunks is default behaviour (ompthreads = ncpus)

### **Location**

### **CPU type**

AMD vs Intel


**GPU computing**

For computing on GPU a gpu queue is used (specified can be either gpu or gpu\_long). GPU queues are accessible for all MetaCentrum members, one gpu card is assigned by default. IDs of GPU cards are stored in CUDA\_VISIBLE\_DEVICES variable.

    -l select=ncpus=1:ngpus=2 -q gpu







## qdel

## qmove

Moving job to another queue

qmove uv@cerit-pbs.cerit-sc.cz 475337.cerit-pbs.cerit-sc.cz # move job 475337.cerit-pbs.cerit-sc.cz to a queue uv@cerit-pbs.cerit-sc.cz

Jobs can only be moved from one server to another if they are in the 'Q', 'H', or 'W' states, and only if there are no running subjobs. A job in the Running (R), Transiting (T), or Exiting (E) state cannot be moved. See list of queues. 


## qstat

## qextend


Prolong walltime
Jump to navigation
Jump to search

Users are allowed to prolong their jobs in a limited number of cases.

To do this, use command qextend <full jobID> <additional_walltime>

For example:

(BUSTER)melounova@skirit:~$ qextend 8152779.meta-pbs.metacentrum.cz 01:00:00
The walltime of the job 8152779.meta-pbs.metacentrum.cz has been extended.
Additional walltime:	01:00:00
New walltime:		02:00:00

    You must use full job ID to identify the job correctly (see Beginners guide).
    the time format can be either
        a single number - interpreted as seconds
        hh:mm:ss - interpreted as hours:minutes:seconds

To prevent abuse of the tool, there is a 30-day quota on how many times can the extend command be applied by a single user AND the total added time. Currently you can within the last 30 days

    extend your jobs 20-times
    use up to 2880 CPU-hours in total to prolong your jobs.

Job prolongations older than 30 days are "forgotten" and no longer occupy your quota.

ZarovkaMala.png Note: The cputime-hours are not walltime hours. If you e.g. prolong a job running on 8 CPUs by 1 hour, 8 hours will be subtracted from your cputime fund.

To get current state of your fund, run qextend info:

(BUSTER)melounova@skirit:~$ qextend info

melounova@META's info:

30-days counter limit:	20
Used counter limit:	2
Avail. counter limit:	18

30-days cputime fund:	1440:00:00
Used cputime fund:	01:00:01
Avail. cputime fund:	1438:59:59

Earliest rec. timeout:	2021-08-20 10:13:36.426429

    Counter limit is how many times you can prolong a job
    Cputime fund is the amount of cpu-time you can use to prolong a job
    Earliest rec. timeout indicates when the oldest one of your prolongations made during last 30 days will be forgotten


ZarovkaMala.png Note: After reaching the monthly limit, additional prolongation is possible only at request - meta@cesnet.cz






## pbsnodes

## **How to submit job array**

    The job array is submitted as:

 # general command
 $ qsub -J X-Y[:Z] script.sh
 # example
 $ qsub -J 2-7:2 script.sh

    X is first index of a job, Y is upper border of an index and Z in optional parameter of an index step, therefore the example command will generate subjobs with indexes 2,4,6.
    The job array is represented by a single job whose job number is followed by "[]", this main job provides an overview of unfinished sub jobs.

$ qstat -f 969390'[]' -x | grep array\_state\_count
    array_state_count = Queued:0 Running:0 Exiting:0 Expired:0 

    An example of sub job ID is 969390[1].meta-pbs.metacentrum.cz.
    The sub job can be queried by a qstat command (qstat -t).
    PBS Pro uses PBS_ARRAY_INDEX instead of Torque's PBS_ARRAYID inside of a sub job. The varibale PBS_ARRAY_ID contains job ID of the main job.











