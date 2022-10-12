# Queues

## Default queues

Queues are a basic concept of PBS. When submitting a job, the user normally does not have to specify any queue. For every PBS server, there exists a default queue, namely

- `default@meta-pbs.metacentrum.cz`
- `default@cerit-pbs.cerit-sc.cz`
- `elixircz@elixir-pbs.elixir-czech.cz`

where the job goes if not specified otherwise. 

## Routing vs execution queues

The default queue is only **routing** one: it serves only to sort jobs into another queues. The sorting criterion is requested walltime, therefore the existence of queues like `q_2h` (2 hour jobs),`q_4h` (4 hour),`q_1d` (1 day), `q_2d`, `q_4d`, `q_1w` (1 week),`q_2w` , etc.

The latter queues are **execution** ones, i.e. they serve to actually run the jobs.

### List queue details

To see the details of a queue, use:

    qstat -Q -f queue_name@server_name

Example of output of `qstat -Q -f default@meta-pbs.metacentrum.cz`:

    (BULLSEYE)user123@halmir1:~$ qstat -Q -f default@meta-pbs.metacentrum.cz
    Queue: default
        queue_type = Route
        total_jobs = 0
        state_count = Transit:0 Queued:0 Held:0 Waiting:0 Running:0 Exiting:0 Begun
    	:0 
        max_queued = [u:PBS_GENERIC=30000]
        resources_max.ngpus = 0
        resources_max.walltime = 720:00:00
        resources_min.mem = 50mb
        resources_min.ncpus = 1
        resources_default.place = free
        resources_default.walltime = 24:00:00
        comment = Default queue (routing)|Implicitni fronta
        route_destinations = q_2h,q_4h,q_1d,q_2d,q_4d,q_1w,q_2w,q_2w_plus
        enabled = True
        started = True

## Specific queues

In some cases, it is possible or even recommended that the user choses a particular queue. This is the case when the job is characterized not by walltime as a major limiting factor, but by another resource - memory, GPU usage etc.

| Queue name | Description |
|------------|-------------|
| gpu@meta-pbs.metacentrum.cz  | Jobs requiring at least 1 GPU, up to 24 hours walltime |
| gpu\_long@meta-pbs.metacentrum.cz | Jobs requiring at least 1 GPU, up to 2 weeks walltime |
| large\_mem@meta-pbs.metacentrum.cz | Jobs requiring 500 GB or more, up to 1 week walltime |
| gpu@cerit-pbs.cerit-sc.cz | Jobs requiring at least 1 GPU, up to 24 hours walltime |
| phi@cerit-pbs.cerit-sc.cz | Jobs optimized to run on Intel Phi architecture |
| uv@cerit-pbs.cerit-sc.cz | Jobs requiring >100 CPUs OR >%)) GB of memory |

## qstat command usage

The `qstat` command provides info about queues and jobs.

The `qstat` command by default displays info only about queued or running jobs. To get also info about finished jobs, use `qstat -x` or custom command `pbs-get-job-history` (see below).

Example - queues:

    qstat -q  # get list of queues and their properties on current PBS server
    qstat -Q  # dtto, different format
    qstat -q @cerit-pbs.cerit-sc.cz # list queues on cerit-pbs.cerit-sc.cz PBS server
    qstat -q @cerit-pbs.cerit-sc.cz @meta-pbs.metacentrum.cz @elixir-pbs.elixir-czech.cz # list queues on all servers

