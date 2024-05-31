# Queues

## Default queues

Queues are a basic concept of PBS. When submitting a job, the user normally does not have to specify any queue. There exists a default queue, namely `default@pbs-m1.metacentrum.cz` where the job goes if not specified otherwise. Then it is automatically sorted to respective queues based on duration of the job (walltime).

## Specific queues

In some cases, it is possible or even recommended that the user choses a particular queue. This is the case when the job is characterized not by walltime as a major limiting factor, but by another resource - memory, GPU usage etc.

| Queue name | Description |
|------------|-------------|
| gpu@pbs-m1.metacentrum.cz  | Jobs requiring at least 1 GPU, up to 24 hours walltime |
| gpu\_long@pbs-m1.metacentrum.cz | Jobs requiring at least 1 GPU, up to 2 weeks walltime |
| large\_mem@pbs-m1.metacentrum.cz | Jobs requiring 500 GB or more, up to 1 week walltime |
| phi@cerit-pbs.cerit-sc.cz | Jobs optimized to run on Intel Phi architecture |
| [uv@cerit-pbs.cerit-sc.cz](https://metavo.metacentrum.cz/pbsmon2/queue/uv@cerit-pbs.cerit-sc.cz) | Jobs requiring >100 CPUs OR >500 GB of memory, accessible only from [zuphux frontend](../../computing/frontends) |

## Queue info by qstat

The `qstat` command provides info about queues and jobs.

Example:

    qstat -q  # get list of queues and their properties 
    qstat -Q  # dtto, different format

To see details for a selected queue, use:

    qstat -Q -f queue_name@server_name

Example of output of `qstat -Q -f gpu_long@pbs-m1.metacentrum.cz`:

    (BUSTER)user123@skirit:~$ qstat -Q -f gpu_long@pbs-m1.metacentrum.cz
    Queue: gpu_long
        queue_type = Execution
        Priority = 66
        total_jobs = 24
        state_count = Transit:0 Queued:14 Held:0 Waiting:0 Running:10 Exiting:0 Beg
    	un:0 
        max_queued = [u:PBS_GENERIC=2000]
        resources_max.ngpus = 99
        resources_max.walltime = 336:00:00
        resources_min.mem = 50mb
        resources_min.ncpus = 1
        resources_min.ngpus = 1
        resources_default.ngpus = 0
        comment = Queue for long time computations on GPU|Fronta pro dlouhodob\u00e
    	9 v\u00fdpo\u010dty na GPU
        default_chunk.queue_list = q_gpu_long
        resources_assigned.mem = 1760gb
        resources_assigned.mpiprocs = 124
        resources_assigned.ncpus = 124
        resources_assigned.nodect = 10
        max_run_res.ncpus = [u:PBS_GENERIC=200]
        backfill_depth = 2
        enabled = True
        started = True

In this particular queue, no jobs can run unless they require at least 1 GPU (`resources_min.ngpus`).
