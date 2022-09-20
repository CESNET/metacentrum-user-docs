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


!!! note

 nvfjkldnxk


## PBS basic commands


    qsub – submit the job to the queue
    qdel – cancel a waiting or running job
    qmove – move the job to another queue (only waiting jobs!)
    pbsnodes – get current node state and its properties
    qstat – current state of jobs

The volume of displayed information can be adjusted by -v and -vv parameters. 

## qsub


### **Number of nodes and processors**

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

### **Size of scratch**

Scratch directory is a disk space on current computational node used to store temporary files. Always specify type and size of scratch, PBS has no default scratch assigned. Scratch type can be one of scratch\_local|scratch\_ssd|scratch\_shared. Examples:

        -l select=1:ncpus=1:mem=4gb:scratch_local=10gb
        -l select=1:ncpus=1:mem=4gb:scratch_ssd=1gb
        -l select=1:ncpus=1:mem=4gb:scratch_shared=1gb


After the request for scratch if specified, following variables are present in work environment:

    $SCRATCH_VOLUME = size of scratch
    $SCRATCHDIR = path to scratch directory
    $SCRATCH_TYPE = either of scratch_local,scratch_ssd, scratch_shared

### **Memory**

Amount of needed memory – job is implicitly assigned with 400MB of memory if not specified otherwise. Examples:

        -l select=1:ncpus=1:mem=10gb
        -l select=1:ncpus=1:mem=200mb


### **Walltime**

Maximal duration of a job is set by -l walltime=[[hh:]mm:]ss, default walltime is 24:00:00. Queues q_ (such as q\_2h, q\_2d etc.) are not accessible for submit jobs, rout queue (default) automatically chose appropriate time queue based on specified walltime. Examples:

        -l walltime=1:00:00 (one hour)


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











