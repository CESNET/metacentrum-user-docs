# Basics 

Welcome to the basic guide on how to run calculations in Metacentrum grid service. You will learn here hor to **submit a job**, set up **resources**, how the system of **frontends**, **PBS servers**, **computational nodes** and **storages** works. 

To start, you need to:

1. have Metacentrum account
2. be able to login to a frontend node
3. have elementary knowledge of Linux command line
 
More advanced topics are covered in the [Advanced section](/advanced/pbs-options/).

## Frontend dos and donts

Frontend usage policy is different from the one on computational nodes. The frontend nodes are shared by all users, the command typed by any user is performed immediately and there is no resource planning. Frontend node are not intended for heavy computing.

Frontends should be used only for:

- preparing inputs, data post processing
- managing batch jobs
- light compiling and testing

!!! warning

The resource load on frontend is monitored continuously and processes not adhering to usage rules will be terminated without warning. For large compilations, running benchmark calculations or moving massive data volumes (> 10 GB, > 10 000 files), use interative job.

## Frontends, storages, homes

Sem nejake intro jak jsou provazany ruzne storage s ruznymi homy, v zasade o infrastrukture


| Machine name 	          | System 	| Home directory 	        |  PBS server 	              |
|---------------|------------------|---------------|------------|
| skirit.ics.muni.cz 	  | Debian 10 	| /storage/brno2/home/ 	        |  meta-pbs.metacentrum.cz    |  
| alfrid.meta.zcu.cz 	  | Debian 11 	| /storage/plzen1/home/ 	|  meta-pbs.metacentrum.cz    |  
| tarkil.grid.cesnet.cz   | Debian 11 	| /storage/praha1/home/ 	|  meta-pbs.metacentrum.cz    |  
| nympha.zcu.cz 	  | Debian 11 	| /storage/plzen1/home/ 	|  meta-pbs.metacentrum.cz    |  
| charon.nti.tul.cz 	  | Debian 11 	| /storage/liberec3-tul/home/ 	|  meta-pbs.metacentrum.cz    |  
| minos.zcu.cz 	          | Debian 11 	| /storage/plzen1/home/ 	|  meta-pbs.metacentrum.cz    |  
| perian.grid.cesnet.cz   | Debian 10 	| /storage/brno2/home/ 	        |  meta-pbs.metacentrum.cz    |  
| onyx.metacentrum.cz 	  | Debian 10 	| /storage/brno2/home/ 	        |  meta-pbs.metacentrum.cz    |  
| tilia.ibot.cas.cz 	  | Debian 11 	| /storage/pruhonice1-ibot/home/|  meta-pbs.metacentrum.cz    |
| zuphux.cerit-sc.cz 	  | CentOS 7.9 	| /storage/brno3-cerit/home/ 	|  cerit-pbs.cerit-sc.cz      | 	
| elmo.elixir-czech.cz 	  | Debian 10 	| /storage/praha5-elixir/home/ 	|  elixir-pbs.elixir-czech.cz |	




Advanced page see [Advanced grid infrastructure](/advanced/grid-infrastruct)

## Modules

uvod do toho jak u nas funguji moduly (to bude pain!)

There is numerous scientific software installed on MetaCentrum machines, spanning from mathematical and statistical software through computational chemistry, bioinformatics to technical and material modelling software.

You can load an application offered by MetaCentrum to your job or machine via command module add + name of the selected application. If you are not sure which version of the application you would like to use, check complete list of applications page first.

For example:

    jenicek@skirit:~$ module avail # shows all currently available applications
    jenicek@skirit:~$ module avail 2>&1 | grep g16 # show all modules containing "g16" in their name
    jenicek@skirit:~$ module add g16-B.01 # loads Gaussian 16, v. B.01 application
    jenicek@skirit:~$ module list # shows currently loaded applications in your environment
    jenicek@skirit:~$ module unload g16-B.01 # unloads Gaussian 16, v. B.01 application

Users can install their own software. If you would like to install a new application or new version of an application, try to read [How to install an application](/advanced/install-software/) or contact User support.

## Resources

The information about resources goes into qsub command options.
Request time memory, and number of CPUs

In the qsub command, the colons (:) and lowercase "L" (l) are divisors, and the options go in pairs of <resource>=<value>.

    qsub -l select=ncpus=2:mem=4gb:scratch_local=1gb -l walltime=2:00:00

where

    ncpus is number of processors (2 in this example)
    mem is the size of memory that will be reserved for the job (4 GB in this example, default 400 MB),
    scratch_local specifies the size and type of scratch directory (1 GB in this example, no default)
    walltime is the maximum time the job will run, set in the format hh:mm:ss (2 hours in this example, default 24 hours)

The qsub command has a deal more options than the ones shown here; for example, it is possible to specify a number of computational nodes, type of their OS or their physical placement. A more in-depth information about PBS commands can be found in the page About scheduling system.

## PBS servers

**PBS server** schedules jobs to run according to which resources are available, priority of the job, user's faishare score and others.

Metacentrum has three PBS servers:

- `meta-pbs.metacentrum.cz`, shorthand *meta* (accessible to all Metacentrum users)
- `cerit-pbs.cerit-sc.cz`, shorthand *cerit*  (accessible to all Metacentrum users)
- `elixir-pbs.elixir-czech.cz`, shorthand *elixir* (accessible only to Elixir group members)

To optimize resource usage, jobs can be moved from a PBS server to another one, which is less busy. 

Although non-elixir users cannot submit directly to `elixir-pbs.elixir-czech.cz` server, jobs from the other two are often moved there.

Every frontend has some default (primary) PBS server - see table in [**Table of frontends**](#Frontends, storages, homes)

!!! todo
kde bude ta tabulka umistena?



## Queues

jake mame fronty a jak cist znacky 

## Scratch directory

Most application produce some temporary files during the calculation. Scratch directory is disk space where temporary files will are stored.

!!! warning
There is no default scratch directory and the user must always specify its type an d volume.

Currently we offer four types of scratch storage:

| Type | Available on every node? | Location on machine | `$SCRATCHDIR` value | Key characteristic |
|------| -------------------------|---------------------|-------------------|----------------------|
| local | yes | `/scratch/USERNAME/job_JOBID` | `scratch_local`|  universal, large capacity, available everywhere |	
| ssd   | no  | `/scratch.ssd/USERNAME/job_JOBID` | `scratch_ssd`| fast I/O operations |
| shared | no  | `/scratch.shared/USERNAME/job_JOBID` | `scratch_shared`| can be shared by more jobs | 	
| shm | no  | `/dev/shm/scratch.shm/USERNAME/job_JOBID` | `scratch_shm`| exists in RAM, ultra fast |

As a default choice, we recommend users to use **local scratch**.

To read more about scratch storages, see [Scratch storage page](/advanced/grid-infrastruct/#Scratch-storages)To access the scratch directory, use the system variable SCRATCHDIR


## Lifecycle of a job

### Batch job

A typical usecase for grid computing is non-interactive batch job, when the user only prepares input and set of instructions at the beginning. The calculation itself then runs independently on user.

Batch jobs consists of the following steps:

1. User prepares data to be used in the calculation and instruction what is to be done with them (input files + batch script).
2. The batch script is submitted to the job planner (PBS server), which stages the job until required resources are available.
3. After the PBS server has released the job to be run, the job runs on one of computational nodes.
4. At this time the applications (software) are loaded.
5. When the job is finished, results are copied back to user's directory according to instructions in the batch script.

**schema graficky**

### Interactive job

Interactive job works in different way. User does not need to specify in advance what will be done, neither does not need to prepare any input data. Insted they first reserve computational resources and after the job start to run, works interactively on CLI.

Interactive job consists of following steps:

1. User submits request for specified resources to the PBS server
2. PBS server stages this request until the resources are available.
3. When the job starts running, user is redirected to a computational node's CLI.
4. User does whatever they need on the CLI. 
5. When the user logs out of the computational node, or when the time reserved for the job runs out, the job is done

**schema graficky**

### Batch vs interactive 

A primary choice for grid computing is batch job. Batch jobs allow user to run massive sets of calculation without need to overview them, manipulate data etc. They also optimize the usage of computational resources better, as there is no need to wait for user's input. 

Interactive jobs are good for:

- testing what works and what does not (software versions, input data format, bash constructions to be used in batch script later etc)
- getting first guess about resources
- compiling your own software
- processing, moving or archiving large amount of data

Interactive jobs are **necessary** for running GUI application [here](/advanced/run-graphical/)

## Batch job example

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

## Interactive job example

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

## job ID

Job ID is unique identifier in a job. Job ID is crucial to track, manipulate or delete job, as well as to identify your problem to user support.

Under some circumstances the job can be identified by the number only (e.g. `13010171.`). In general, however, the PBS server suffix is needed, too, to fully identify the job (e.g. `13010171.meta-pbs.metqcentrum.cz`).  

You can get the job ID:

- after running `qsub` command
- by running `echo $PBS_JOBID` in interactive job  or in the batch script
- by running `qstat -u your_username @meta-pbs.metacentrum.cz @cerit-pbs.cerit-sc.cz @elixir-pbs.elixir-czech.cz`

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



## Get job status

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

To learn more about how to track running job and how to retrieve job history, see [Job tracking page](/advanced/job-tracking)

## Ended jobs

### Output files

When a job is completed (no matter how), two files are created in the directory from which you have submitted the job:

1. `<job_name>.o<jobID>` - job's standard output (STDOUT)
2. `<job_name>.e<jobID>` - job's standard error output (STDERR)

STDERR file contains all the error messages which occurred during the calculation. It is a first place where to look if the job has failed.

### User termination

Sometimes you need to delete submitted/running job. This can be done by `qdel` command:

    (BULLSEYE)user123@skirit~: qdel 21732596.elixir-pbs.elixir-czech.cz

If plain `qdel` does not work, add `-W` (force del) option:

    (BULLSEYE)user123@skirit~: qdel -W force 21732596.elixir-pbs.elixir-czech.cz

### Termination by PBS server

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

## Manual scratch clean

In case of erroneous job ending, the data are left in the scratch directory. You should always clean the scratch after all potentially useful data has been retrieved. To do so, you need to know the hostname of machine where the job was run, and path to the scratch directory.

!!! note
Users' rights settings allow only `rm -rf $SCRATCHDIR/*`, not `rm -rf $SCRATCHDIR`.

For example:

    user123@skirit:~$ ssh user123@luna13.fzu.cz # login to a hostname luna13.fzu.cz
    user123@luna13:~$ cd /scratch/user123/job_14053410.meta-pbs.metacentrum.cz # enter the scratch directory
    user123@luna13:/scratch/user123/job_14053410.meta-pbs.metacentrum.cz$ rm -r * # remove all files and subdirectories


