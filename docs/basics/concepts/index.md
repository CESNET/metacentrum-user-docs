# Basic concepts

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

**List of frontends together with their native /home directories**

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

![Queue sorting schema](routing-execution-queues.jpg)

In PBSmon, the [list of queues for all planners can be found](https://metavo.metacentrum.cz/pbsmon2/queues/list).

![Queues list (top)](queues_top.png)

. . .

![Queues list (bottom)](queues_bottom.png)

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

