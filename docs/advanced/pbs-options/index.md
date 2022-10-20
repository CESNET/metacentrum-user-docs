# PBS resources

## Chunk vs job

PBS concept is based on so-called **chunks** as basic computational units. A chunk is further indivisible set of resources placed on the same host . User may require one (default) or more chunks for a job.

Some resources can be defined per chunk, i.e. user can request them for each chunk separately. Examples of **chunk-wide resources** are number of CPUs, GPUs or scratch directory type and volume. 

Other resources can be defined only for the job as a whole. Examples of **job-wide resources** are walltime, type of queue or software licence. 

Chunks are typically used to optimize the resource usage of parallelized computations. There may be e.g. a driving process placed on one chunk with relatively few CPUs combined with parallelized parts of a job running on other chunk(s) with many CPUs. 

Chunks can be on one machine next to each other or always on different machines, depending on job-wide option `place`.

Number of chunks `N` is set with `-l select=[N]:`. When user needs to set up more chunks with different resources, they are concatenated with `+`. The `select` keyword can be used only once.

`N` is not mandatory in the `select` statement. Default value of `N` is 1.

Examples of chunk specification:

    -l select=:ncpus=2 # one chunk with two CPUs
    -l select=1:ncpus=2 # same as above
    -l select=1:ncpus=1+1:ncpus=2 # two chunks, one with one CPU and one with two CPUs
    -l select=6:ncpus=2:mem=4gb+3:ncpus=8:mem=4GB # six chunks with 2 CPUs and 4 GB of memory each and three chunks with 8 CPUs and 4 GB of memory each

Examples of `place` usage:

    -l select=2:ncpus=1 -l place=pack # two chunks, both must be on one host
    -l select=2:ncpus=1 -l place=scatter # two chunks which must be on different hosts
    -l select=2:ncpus=1 -l place=free # two chunks placed arbitrarily according to resource availability on (default)

If you are not sure about the number of needed processors, ask for an exclusive reservation of the whole machine:

    -l select=2:ncpus=1 -l place=exclhost # request whole host allocated to this job (without cpu and mem limit control)
    -l select=102:place=group=cluster # 102 cpus on one cluster

## Chunk-wide resources

### **CPUs**

Resource name: `ncpus`. Default value: `1`.

Example:

    -l select=1:ncpus=2 # request 2 CPUs

### **Memory** 

Resource name: `mem`. Default value: `400 MB`.

Example:

    -l select=1:ncpus=1:mem=10gb # request 10 GB memory job


### **CPU type**

Resource name: `cpu_vendor`. Default value: `???`.

In the Metacentrum grid there are both machines with AMD as well as Intel processors. Some software may be sensitive to the processor used (although most applications run seamlessly on both). Therefore you can request a specific CPU vendor:

    qsub -l select=1:ncpus=1:cpu_vendor=amd  # use machine with AMD processor
    qsub -l select=1:ncpus=1:cpu_vendor=intel # dtto with Intel

### **CPU speed**

Resource name: `spec`. Default value: `???`.

CPUs across Metacentrum grid differ in their how fast they are. Therefore they are classed by parameter `spec` according to methodology of [SPEC CPU2017](https://www.spec.org/cpu2017/).  To see the `spec` values, go to [qsub assembler](https://metavo.metacentrum.cz/pbsmon2/qsub_pbspro) and see the drop-down menu in the `spec` parameter.

!!! todo
 Jak nastavit odkaz tak, aby proklik sel na EN verzi qsub assembleru?

Example:

    qsub -l select=:spec=4.8 # 1 CPU with speed class 4.8 or higher

### **Scratch directory**

Resource names: `scratch_local`, `scratch_shared`, `scratch_ssd`, `scratch_shm`. 

Default value: none.

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

Scratch directory is not writable, only it's content is. Therefore you cannot clean the scratch by `rm -rf $SCRATCHDIR`, but you can do it by `rm -rf $SCRATCHDIR/*`. Users should always clear the content of scratch directory after the job ends to free disc space. Otherwise, this directory will be automatically deleted after approx. 14 days (earlier if there is lack of space on disks).

The most important system variables related to scratch are these:

- `SCRATCHDIR`: path to scratch directory
- `SCRATCH_TYPE`: type of scratch directory
- `SCRATCH_VOLUME`: size of scratch directory

Example:

    (BUSTER)user123@skirit:~$ qsub -I -l select=scratch_local=20gb -l walltime=1:00:00
    qsub: waiting for job 12910867.meta-pbs.metacentrum.cz to start
    qsub: job 12910867.meta-pbs.metacentrum.cz ready
    (BULLSEYE)user123@elmo3-3:~$ echo $SCRATCHDIR
    /scratch/user123/job_12910867.meta-pbs.metacentrum.cz
    (BULLSEYE)user123@elmo3-3:~$ echo $SCRATCH_TYPE
    local
    (BULLSEYE)user123@elmo3-3:~$ echo $SCRATCH_VOLUME
    21474836480

### **Number of GPUs**

Resource name: `ngpus`. Default value: `0`.

!!! todo
 sem dat vic ke gpu vypoctum, do jake fronty to posilat apod.

    -l select=ncpus=1:ngpus=2 -q gpu

### **OS**

Resource name: `os`, `osfamily`. Default value: `???`.

To submit a job to a machine with specific operation system, use `os=OS_name`:

    zuphux$ qsub -l select=1:ncpus=2:mem=1gb:scratch_local=1gb:os=debian11 …

To submit a job to a machine with a specific OS type, use `osfamily=OS_type_name`

    zuphux$ qsub -l select=1:ncpus=2:mem=1gb:scratch_local=1gb:osfamily=debian …


### **Cluster**

Resource name: `cluster`, `cl_NAME`. Default value: none.

PBS allows you to choose a particular cluster (using either resource `cluster` or `cl_NAME`:

    qsub -l select=1:ncpus=2:cluster=halmir # run the job on cluster "halmir"
    qsub -l select=1:ncpus=2:cl_halmir=True # same as above

Alternatively, you can avoid a particular cluster:

    qsub -l select=1:ncpus=2:cluster=^halmir 
    qsub -l select=1:ncpus=2:cl_halmir=False

However it is not possible to combine conditions. If you e.g. want to avoid both `adan` and `halmir`, the following

    qsub -l select=1:ncpus=2:cluster=^adan:cluster=^halmir

will not work. This is based on the principle that in PBS, every resource (in this case `cluster` resource) can be specified only once.

On the other hand, `cl_adan` and `cl_halmir` are different resources, so:

    qsub -l select=1:ncpus=2:cl_adan=False:cl_halmir=False

will work and will avoid both `adan` and `halmir` clusters.

The same can be done with

    qsub -l select=1:ncpus=2:cluster=^adan:cl_halmir=False


### **Location**

Resource names: `brno`, `budejovice`, `liberec`, `olomouc`, `plzen`, `praha`, `pruhonice`, `vestec`.

Default value: none.

As the physical machines are distributed over multiple locations in Czech republic, it may be useful to be ble to specify the location of the machine(s)

    qsub -l select=1:ncpus=1:brno=True # run on machines located in Brno.

### **MPI processes**

Resource name: `mpiprocs`, `ompthreads`. Default value: `???`.

How many MPI processes would run on one chunk is specified by `mpiprocs=[number]`:

    -l select=3:ncpus=2:mpiprocs=2 # 6 MPI processes (nodefile contains 6 lines with names of vnodes), 2 MPI processes always share 1 vnode with 2 CPU

How many OpenMP threads would run in 1 chunk `ompthreads=[number]`, 2 omp threads on 1 chunks is default behaviour (`ompthreads = ncpus`).

## Job-wide resources

### **Duration**

Resource name: `walltime`. Default value: `24:00:00` (24 hours).

Maximal duration of a job is set in format `hh:mm:ss`.

Example:

    -l walltime=1:00:00 # one hour job

Users can to a certain extent prolong walltime in running jobs - see [`qextend` command](#qextend)

### **Queue and/or PBS server**

Resource name: ``. Default value: ``.
If you need to send the job to a specific queue and/or specific PBS server, use the `qsub -q` option.

    qsub -q queue@server # specific queue on specific server
    qsub -q queue # specific queue on the current (default) server
    qsub -q @server # default queue on specific server

For example, `qsub -q @cerit-pbs.cerit-sc.cz` will send the job to default queue managed by cerit pbs server, no matter which frontend the job is sent from. 

### **Licence**

Some software requires licence to run. Licence is set by parameter `-l`

    -l select=3:ncpus=1 -l walltime=1:00:00 -l matlab=1 # one licence for Matlab

## **Email notifications**

PBS server sends email notification when the job changes state.

    -m a send mail when job is aborted by batch system
    -m b send mail when job begins execution
    -m e send mail when job ends execution
    -m n do not send mail

The options `a`, `b`, `e` can be combined, e.g.:

    -m abe – sends an email when the job aborts (a), begins (b) and completes/ends (e)

The email can be sent to any email address using the -M option:

    -M user123@pbspro.com

## **Paths for output**

By default the job output (output, and error files) is saved in a folder from which the job was submitted (variable `PBS_O_WORKDIR`).

This behaviour for output, resp. error files can be changed by parameters -o, resp -e.

    -o /custom-path/myOutputFile
    -e /custom-path/myErrorFile

## PBS commands usage

The most relevant native PBS commands (and related options) are:

- `qsub` - submit the job
- `qmove` - move the job to another queue 
- `qdel` - delete a waiting or running job
- `qstat` - view current state of jobs
- `pbsnodes` - get info about current node(s) state and their properties

Further we discuss a custom PBS command:

- `qextend` - prolong walltime for a running job

### qsub

### qdel

The `qdel` command deletes a  queing or running job.

Examples:
    qdel job_ID # basic usage
    qdel -W force job_ID # use if normal qdel does not work ("stuck" jobs)

### qmove

The `qmove` command moves a job to another queue.

Jobs can only be moved from one server to another if they are in the `Q` (queued), `H` (held), or `W` (waiting) states, and only if there are no running subjobs. A job in the Running (`R`), Transiting (`T`), or Exiting (`E`) state cannot be moved.

Example:

    qmove uv@cerit-pbs.cerit-sc.cz 475337.cerit-pbs.cerit-sc.cz # move job 475337.cerit-pbs.cerit-sc.cz to a queue uv@cerit-pbs.cerit-sc.cz

### qextend

Users are allowed to prolong their jobs in a limited number of cases.

To do this, use command `qextend job_ID additional_walltime`.

Time can be set as:

- a single number - interpreted as seconds
- `hh:mm:ss` - interpreted as hours:minutes:seconds

Example:

    (BUSTER)user123@skirit:~$ qextend 8152779.meta-pbs.metacentrum.cz 01:00:00
    The walltime of the job 8152779.meta-pbs.metacentrum.cz has been extended.
    Additional walltime:	01:00:00
    New walltime:		02:00:00

To prevent abuse of the tool, there is a quota limiting the `qextend` usage to:

- max. 20 times within the last 30 days, `AND`
- prolong the job(s) by up to 2880 CPU-hours within the last 30 days.

Job prolongations older than 30 days are "forgotten" and no longer occupy user's quota.

!!! warning "CPU-hours are not walltime hours"

User quota is set to hours-per-CPU. If you e.g. prolong a job running on 8 CPUs by 1 hour, 8 hours will be subtracted from your cputime fund.

To get current state of your fund, run `qextend info`:

    (BUSTER)user123@skirit:~$ qextend info

    user123@META's info:

    30-days counter limit:	20
    Used counter limit:	2
    Avail. counter limit:	18

    30-days cputime fund:	1440:00:00
    Used cputime fund:	01:00:01
    Avail. cputime fund:	1438:59:59

    Earliest rec. timeout:	2021-08-20 10:13:36.426429

Counter limit is how many times you can prolong a job.
Cputime fund is the amount of cpu-time you can use to prolong a job.
Earliest rec. timeout indicates when the oldest one of your prolongations made during last 30 days will be forgotten.

!!! note "What to do if you run out of quota"

If you reach the monthly limit and still need to prolong a job, it can be done upon request to user support at <meta@cesnet.cz>.

### qstat

`qstat` command probes the state of jobs and queues mainly. See sections [Queues in Meta](/advanced/queues-in-meta/#qstat-command-usage)

For detailed options list, see `man qstat`.

## Job arrays

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


## Node properties

`pbsnodes` comand usage

## Useful links

- link to **qsub refiner**
- link to **machine properties**
