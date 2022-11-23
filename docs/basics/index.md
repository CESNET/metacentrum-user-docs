# Basics 

Welcome to the basic guide on how to run calculations in Metacentrum grid service. You will learn how to

- navigate between **frontends**, **home directories** and **storages**,
- make use of **batch** and **interactive** job,
- **submit a job** to a **PBS server**,
- set up **resources** for a job,
- retrieve job **output**.

*Most topics mentioned here are covered to greater depth in the [Advanced](/advanced/) section.*

!!! note "To start, you need to"

    1. have Metacentrum account
    2. be able to login to a frontend node
    3. have elementary knowledge of Linux command line
 
    *If anything is missing, see [Access](/access/) section.*

## Concepts

### Frontends, storages, homes

There are several **frontends** (login nodes) to access the grid. Each frontend has a native **home directory** on one of the **storages**. 

There are several storages (large-capacity harddisc arrays). They are named according to their physical location (a city). 

    user123@user123-XPS-13-9370:~$ ssh skirit.metacentrum.cz
    user123@skirit.ics.muni.cz's password: 
    ...
    (BUSTER)user123@skirit:~$ pwd # print current directory
    /storage/brno2/home/user123   # "brno2" is native storage for "skirit" frontend


A frontend has a native home directory on one, and only one, storage; however this is not true the other way round: a home directory on a certain storage may be directed to by more than one frontend.

    user123@user123-XPS-13-9370:~$ ssh nympha.zcu.cz 
    ...
    (BULLSEYE)user123@nympha:~$ pwd
    /storage/plzen1/home/user123   # "plzen1" is native storage for "nympha" frontend
    (BULLSEYE)user123@nympha:~$ exit 
    user123@user123-XPS-13-9370:~$ ssh minos.zcu.cz
    ...
    (BULLSEYE)user123@minos:~$ pwd
    /storage/plzen1/home/user123   # "plzen1" is native storage also for "minos" frontend

To get to a certain home directory, user does not need to log on a specific frontend. Users can change their home directories by `cd` command.

For example, assume that `skirit.metacentrum.cz` frontend is down and you want to access `brno2` storage:

    user123@user123-XPS-13-9370:~$ ssh tarkil.metacentrum.cz # login to "tarkil" instead
    ...
    (BULLSEYE)user123@tarkil:~$ pwd
    /storage/praha1/home/user123   # I am on "praha1" storage, but need "brno2"
    (BULLSEYE)user123@tarkil:~$ cd /storage/brno2/home/user123 # change to home on "brno2" storage
    (BULLSEYE)user123@tarkil:/storage/brno2/home/user123$ pwd 
    /storage/brno2/home/user123 # I am now on "brno2" storage 

The overall schema can be summed up as shown below:

![picture](/assets/templ_001.png)

--8<-- "frontend-table-2.md"

**Frontend do's and dont's**

Frontend usage policy is different from the one on computational nodes. The frontend nodes are shared by all users, the command typed by any user is performed immediately and there is no resource planning. Frontend node are not intended for heavy computing.

Frontends should be used only for:

- preparing inputs, data pre- and postprocessing
- managing batch jobs
- light compiling and testing

!!! warning
    The resource load on frontend is monitored continuously. Processes not adhering to usage rules will be terminated without warning. For large compilations, running benchmark calculations or moving massive data volumes (> 10 GB, > 10 000 files), use interative job.

### PBS servers

A set of instructions performed on computational nodes is **computational job**. Jobs require a set of **resources** such as CPUs, memory or time. A **scheduling system** plans execution of the jobs so as optimize the load and usage of computational nodes.

In Metacentrum the **[PBR Pro](https://www.altair.com/pbs-professional)** scheduling system is used. The servers on which the scheduling system are called **PBS servers**.

Metacentrum has three PBS servers:

- `meta-pbs.metacentrum.cz`, shorthand *meta* (accessible to all Metacentrum users)
- `cerit-pbs.cerit-sc.cz`, shorthand *cerit*  (accessible to all Metacentrum users)
- `elixir-pbs.elixir-czech.cz`, shorthand *elixir* (directly accessible only to Elixir group members)

Which PBS server will take care of particular job depends on from which frontend the job was submitted. Every frontend has some default (primary) PBS server (see table below). To optimize resource usage, jobs can be moved however from a certain PBS server less busy one.  Typically jobs from *meta* and *cerit* servers are moved to *elixir*.

| PBS server | Frontends |
|------------|-----------|
| meta-pbs.metacentrum.cz | skirit.ics.muni.cz, alfrid.meta.zcu.cz, tarkil.grid.cesnet.cz, nympha.zcu.cz, charon.nti.tul.cz, minos.zcu.cz, perian.grid.cesnet.cz, onyx.metacentrum.cz |
| cerit-pbs.cerit-sc.cz | zuphux.cerit-sc.cz |
| elixir-pbs.elixir-czech.cz | elmo.elixir-czech.cz | 	

The most important PBS Pro commands are:

- `qsub` - submit a computational job 
- `qstat` - query status of a job
- `qdel` - delete a job

### Resources

Every jobs need to have defined set of computational resources at the point of submission. The resources can be specified

- on CLI as `qsub` command options, or
- inside the batch script on lines beginning with `#PBS` header.

In the PBS terminology, a **chunk** is a subset of computational nodes on which the job runs. In most cases the concept of chunks is useful for parallelized computing only and "normal" jobs run on one chunk. We cannot avoid the concept of chunks, though, as the specification of resources differ according to whether they can be applied on a job as a whole or on a chunk.

According to PBS internal logic, the resources are either **chunk-wide** or **job-wide**.

**Job-wide** resources are defined for the job as a whole, e.g. maximal duration of the job or a license to run a commercial software. The cannot be divided in parts and distributed among computational nodes on which the jo runs. Every job-wide resource is defined in the form of `-l <resource_name>=<resource_value>`, e.g. `-l walltime=1:00:00`.

**Chunk-wide** resources can be ascribed to every chunk separately and differently. At this point we assume that the number of chunks is always 1, which is also a default value. Chunk-wide resources are defined as options of `select` statement in pairs `<resource_name>=<resource_value>` divided by `:`.

The essential resources are:

| Resource name | Keyword | Chunk-wide or job-wide? |
|---------------|---------|-------------------------|
| no. of CPUs | ncpus | chunk |
| Memory | mem | chunk |
| Maximal duration of the job | walltime | job |
| Type and volume of space for temporary data | scratch\_local | chunk |

There are a deal more resources than the ones shown here; for example, it is possible to specify a type of computational nodes' OS or their physical placement, software licences, speed of CPU, number pf GPU cards and more. For detailed information see [PBS options detailed page](/advanced/pbs-options/).

Examples:

    qsub -l select1=ncpus=2:mem=4gb:scratch_local=1gb -l walltime=2:00:00 myJob.sh

where

    ncpus is number of processors (2 in this example)
    mem is the size of memory that will be reserved for the job (4 GB in this example, default 400 MB),
    scratch_local specifies the size and type of scratch directory (1 GB in this example, no default)
    walltime is the maximum time the job will run, set in the format hh:mm:ss (2 hours in this example, default 24 hours)


### Queues

When the job is submitted, it is added to one of the **queues** managed by the scheduler. Queues can be defined arbitrarily by the admins based on various criteria - usually on walltime, but also on number of GPU cards, size of memory etc. Some queues are reserved for defined groups of users ("private" queues).

Unless you [have a reason to send job to a specific queue](/advanced/queues-in-meta/), do not specify any. The job will be submitted into a default queue and from there routed to one of execution queues.

The default queue is only **routing** one: it serves to sort jobs into another queues according to the job's walltime - e.g. `q_1h` (1-hour jobs), `q_1d` (1-day jobs), etc.

The latter queues are **execution** ones, i.e. they serve to actually run the jobs. 

![Queue sorting schema](/assets/templ_002.png)

In PBSmon, the [list of queues for all planners can be found](https://metavo.metacentrum.cz/pbsmon2/queues/list).

![pic](/assets/pbsmon_screenshots/queues_top.png)
![pic](/assets/pbsmon_screenshots/queues_bottom.png)

!!! todo
    tyto obrazky k sobe slepit a vysvetlit znacky routing, execution, soukroma.

!!! warning 
    Do not try to skip other users by sending a job to a specific queue just because it seems to have more free machines. There is always some reason why some machines are seemingly idle. Moreover, the scheduler will not allow user doing so.

!!! tip
    If you however suspect that some queue accepts jobs that should not be there or behaves in a strange way, contact User support. 

### Modules

!!! todo
    Depends on modulefiles update

### Scratch directory

Most application produce some temporary files during the calculation. Scratch directory is disk space where temporary files will are stored.
 
!!! warning
    There is no default scratch directory and the user must always specify its type and volume.

Currently we offer four types of scratch storage:

| Type | Available on every node? | Location on machine | `$SCRATCHDIR` value | Key characteristic |
|------| -------------------------|---------------------|-------------------|----------------------|
| local | yes | `/scratch/USERNAME/job_JOBID` | `scratch_local`|  universal, large capacity, available everywhere |	
| ssd   | no  | `/scratch.ssd/USERNAME/job_JOBID` | `scratch_ssd`| fast I/O operations |
| shared | no  | `/scratch.shared/USERNAME/job_JOBID` | `scratch_shared`| can be shared by more jobs | 	
| shm | no  | `/dev/shm/scratch.shm/USERNAME/job_JOBID` | `scratch_shm`| exists in RAM, ultra fast |

As a default choice, we recommend users to use **local scratch**.

To access the scratch directory, use the system variable `SCRATCHDIR`.

## Computing

### Lifecycle of a job

#### Batch job

A typical usecase for grid computing is non-interactive batch job, when the user only prepares input and set of instructions at the beginning. The calculation itself then runs independently on user.

Batch jobs consists of the following steps:

1. User prepares data to be used in the calculation and instruction what is to be done with them (input files + batch script).
2. The batch script is submitted to the job planner (PBS server), which stages the job until required resources are available.
3. After the PBS server has released the job to be run, the job runs on one of computational nodes.
4. At this time the applications (software) are loaded.
5. When the job is finished, results are copied back to user's directory according to instructions in the batch script.

!!! todo
    schema graficky

#### Interactive job

Interactive job works in different way. User does not need to specify in advance what will be done, neither does not need to prepare any input data. Instead they first reserve computational resources and after the job start to run, works interactively on CLI.

Interactive job consists of following steps:

1. User submits request for specified resources to the PBS server
2. PBS server stages this request until the resources are available.
3. When the job starts running, user is redirected to a computational node's CLI.
4. User does whatever they need on the CLI. 
5. When the user logs out of the computational node, or when the time reserved for the job runs out, the job is done

!!! todo
    schema graficky

#### Which one?

A primary choice for grid computing is batch job. Batch jobs allow user to run massive sets of calculation without need to overview them, manipulate data etc. They also optimize the usage of computational resources better, as there is no need to wait for user's input. 

Interactive jobs are good for:

- testing what works and what does not (software versions, input data format, bash constructions to be used in batch script later etc)
- getting first guess about resources
- compiling your own software
- processing, moving or archiving large amount of data

Interactive jobs are **necessary** for running GUI application [here](/advanced/run-graphical/)

### Batch job example

The batch script in the following example is called myJob.sh.

    (BUSTER)user123@skirit:~$ cat myJob.sh
    #!/bin/bash
    #PBS -N batch_job_example
    #PBS -l select=1:ncpus=4:mem=4gb:scratch_local=10gb
    #PBS -l walltime=1:00:00 
    # The 4 lines above are options for scheduling system: job will run 1 hour at maximum, 1 machine with 4 processors + 4gb RAM memory + 10gb scratch memory are requested
    
    # define a DATADIR variable: directory where the input files are taken from and where output will be copied to
    DATADIR=/storage/brno3-cerit/home/user123/test_directory # substitute username and path to to your real username and path
    
    # append a line to a file "jobs_info.txt" containing the ID of the job, the hostname of node it is run on and the path to a scratch directory
    # this information helps to find a scratch directory in case the job fails and you need to remove the scratch directory manually 
    echo "$PBS_JOBID is running on node `hostname -f` in a scratch directory $SCRATCHDIR" >> $DATADIR/jobs_info.txt
    
    #loads the Gaussian's application modules, version 03
    module add g03
    
    # test if scratch directory is set
    # if scratch directory is not set, issue error message and exit
    test -n "$SCRATCHDIR" || { echo >&2 "Variable SCRATCHDIR is not set!"; exit 1; }
    
    # copy input file "h2o.com" to scratch directory
    # if the copy operation fails, issue error message and exit
    cp $DATADIR/h2o.com  $SCRATCHDIR || { echo >&2 "Error while copying input file(s)!"; exit 2; }
    
    # move into scratch directory
    cd $SCRATCHDIR 
    
    # run Gaussian 03 with h2o.com as input and save the results into h2o.out file
    # if the calculation ends with an error, issue error message an exit
    g03 <h2o.com >h2o.out || { echo >&2 "Calculation ended up erroneously (with a code $?) !!"; exit 3; }
    
    # move the output to user's DATADIR or exit in case of failure
    cp h2o.out $DATADIR/ || { echo >&2 "Result file(s) copying failed (with a code $?) !!"; exit 4; }
    
    # clean the SCRATCH directory
    clean_scratch

The job is then submitted as

    (BUSTER)user123@skirit:~$ qsub myJob.sh 
    11733571.meta-pbs.metacentrum.cz # job ID is 11733571.meta-pbs.metacentrum.cz

Alternatively, you can specify resources on the command line. In this case the lines starting by `#PBS` need not to be in the batch script.

    (BUSTER)user123@skirit:~$qsub -l select=1:ncpus=4:mem=4gb:scratch_local=10gb -l walltime=1:00:00 myJob.sh 

!!! note
    If both resource specifications are present (on CLI as well as inside the script), the values on CLI have priority.

### Interactive job example

An interactive job is requested via `qsub -I` command (uppercase "i").

    (BUSTER)user123@skirit:~$ qsub -I -l select=1:ncpus=4 -l walltime=2:00:00 # submit interactive job 
    qsub: waiting for job 13010171.meta-pbs.metacentrum.cz to start
    qsub: job 13010171.meta-pbs.metacentrum.cz ready # 13010171.meta-pbs.metacentrum.cz is the job ID
    (BULLSEYE)user123@elmo3-1:~$ # elmo3-1 is computational node
    (BULLSEYE)user123@elmo3-1:~$ conda # start conda
    (BULLSEYE)user123@elmo3-1:~$ conda list | grep scipy # make sure there is no scipy package already installed
    (BULLSEYE)user123@elmo3-1:~$ conda search scipy 
    ... # conda returns list of scipy packages available in repositories
    (BULLSEYE)user123@elmo3-1:~$ conda --create my_scipy # create my environment to install scipy into
    ... 
    environment location: /storage/praha1/home/melounova/.conda/envs/my_scipy 
    ...
    Proceed ([y]/n)? y
    ...
    (BULLSEYE)user123@elmo3-1:~$ conda activate my_scipy # enter the environment
    (my_scipy) (BULLSEYE)user123@elmo3-1:~$ 
    (my_scipy) (BULLSEYE)user123@elmo3-1:~$ conda install scipy
    ...
    Proceed ([y]/n)? y
    ...
    Downloading and Extracting Packages
    ...
    (my_scipy) (BULLSEYE)user123@elmo3-1:~$ python
    ...
    >>> import scipy as sp
    >>> 

Unless you log out, after 1 hour you will get following message:

    user123@elmo3-1:~$ =>> PBS: job killed: walltime 7230 exceeded limit 7200
    logout
    qsub: job 13010171.meta-pbs.metacentrum.cz completed

### job ID

Job ID is unique identifier in a job. Job ID is crucial to track, manipulate or delete job, as well as to identify your problem to user support.

Under some circumstances the job can be identified by the number only (e.g. `13010171.`). In general, however, the PBS server suffix is needed, too, to fully identify the job (e.g. `13010171.meta-pbs.metqcentrum.cz`).  

You can get the job ID:

- after running `qsub` command
- by `echo $PBS_JOBID` in interactive job  or in the batch script
- by `qstat -u your_username @meta-pbs.metacentrum.cz @cerit-pbs.cerit-sc.cz @elixir-pbs.elixir-czech.cz`

Within interactive job:

    (BULLSEYE)user123@elmo3-1:~$ echo $PBS_JOBID
    13010171.meta-pbs.metacentrum.cz

By `qstat` command:

    (BULLSEYE)user123@elmo3-1s :~$ qstat -u user123 @meta-pbs.metacentrum.cz @cerit-pbs.cerit-sc.cz @elixir-pbs.elixir-czech.cz 
    
    elixir-pbs.elixir-czech.cz: 
                                                                 Req'd  Req'd   Elap
    Job ID               Username Queue    Jobname    SessID NDS TSK Memory Time  S Time
    -------------------- -------- -------- ---------- ------ --- --- ------ ----- - -----
    13010171.meta-pbs.m* user123  global   STDIN      366884   1   8    4gb 02:00 R 00:17


### Job status

Basic command for getting status about your jobs is `qstat` command.

    qstat -u user123 # list all jobs of user "user123" running or queuing on the current PBS server
    qstat -u user123 @meta-pbs.metacentrum.cz @cerit-pbs.cerit-sc.cz @elixir-pbs.elixir-czech.cz # list all running or queuing jobs of user "user123" on all PBS servers
    qstat -xu user123 # list finished jobs for user "user123" 
    qstat -f <jobID> # list details of the running or queueing job with a given jobID
    qstat -xf <jobID> # list details of the finished job with a given jobID

You will see something like following table:

                                                                     Req'd  Req'd   Elap
    Job ID               Username Queue    Jobname    SessID NDS TSK Memory Time  S Time
    -------------------- -------- -------- ---------- ------ --- --- ------ ----- - -----
    11733550.meta-pbs.*  user123 q_2h     myJob.sh         --    1   1    1gb 00:05 Q   --

The letter under the header 'S' (status) gives the status of the job. The most common states are:

- Q – queued
- R – running
- F – finished
- M – moved to another PBS server

To learn more about how to track running job and how to retrieve job history, see [Job tracking page](/advanced/job-tracking).

### Output files

When a job is completed (no matter how), two files are created in the directory from which you have submitted the job:

1. `<job_name>.o<jobID>` - job's standard output (STDOUT)
2. `<job_name>.e<jobID>` - job's standard error output (STDERR)

STDERR file contains all the error messages which occurred during the calculation. It is a first place where to look if the job has failed.

### Job termination

#### Done by user

Sometimes you need to delete submitted/running job. This can be done by `qdel` command:

    (BULLSEYE)user123@skirit~: qdel 21732596.elixir-pbs.elixir-czech.cz

If plain `qdel` does not work, add `-W` (force del) option:

    (BULLSEYE)user123@skirit~: qdel -W force 21732596.elixir-pbs.elixir-czech.cz

#### Done by PBS server

The PBS server keeps track of resources used by the job. In case the job uses more resources than it has reserved, PBS server sends a **SIGKILL** signal to the execution host.

You can see the signal as `Exit_status` on CLI:

    (BULLSEYE)user123@tarkil:~$ qstat -x -f 13030457.meta-pbs.metacentrum.cz | grep Exit_status
        Exit_status = -29

In case of moved (PBS code **M**) jobs, append to job ID the name of the PBS server the job was moved to: 

    (BULLSEYE)user123@tarkil:~$ qstat -x -f 13031539.meta-pbs.metacentrum.cz@cerit-pbs.cerit-sc.cz | grep Exit_status
        Exit_status = 0

### Exit codes

Most often you will meet one of the following three signals:

| Type of job ending | Exist status (name) | Exit status (number) |
|--------------------|---------------------|----------------------|
| number of CPUs     | `JOB_EXEC_KILL_NCPUS_SUM` | -25 |
| memory             | `JOB_EXEC_KILL_MEM` 	 | -27 |
| walltime           | `JOB_EXEC_KILL_WALLTIME`  | -29 |
| normal termination |                           | 0   |

### Manual scratch clean

In case of erroneous job ending, the data are left in the scratch directory. You should always clean the scratch after all potentially useful data has been retrieved. To do so, you need to know the hostname of machine where the job was run, and path to the scratch directory.

!!! note
    Users' rights allow only `rm -rf $SCRATCHDIR/*`, not `rm -rf $SCRATCHDIR`.

For example:

    user123@skirit:~$ ssh user123@luna13.fzu.cz # login to a hostname luna13.fzu.cz
    user123@luna13:~$ cd /scratch/user123/job_14053410.meta-pbs.metacentrum.cz # enter the scratch directory
    user123@luna13:/scratch/user123/job_14053410.meta-pbs.metacentrum.cz$ rm -r * # remove all files and subdirectories

