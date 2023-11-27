# PBS commands

The most relevant native PBS commands (and related options) are:

- `qsub` - submit the job
- `qmove` - move the job to another queue 
- `qdel` - delete a waiting or running job
- `qstat` - view current state of jobs
- `pbsnodes` - get info about current node(s) state and their properties

## qsub

Basic command to submit a job.

## qdel

The `qdel` command deletes a  queing or running job.

Examples:

```
qdel job_ID # basic usage
qdel -W force job_ID # use if normal qdel does not work ("stuck" jobs)
```

## qmove

The `qmove` command moves a job to another queue.

Jobs can only be moved from one server to another if they are in the `Q` (queued), `H` (held), or `W` (waiting) states, and only if there are no running subjobs. A job in the Running (`R`), Transiting (`T`), or Exiting (`E`) state cannot be moved.

Example:

    qmove uv@cerit-pbs.cerit-sc.cz 475337.cerit-pbs.cerit-sc.cz # move job 475337.cerit-pbs.cerit-sc.cz to a queue uv@cerit-pbs.cerit-sc.cz

## qstat

`qstat` command probes the state of jobs and queues mainly. See sections [Queues in Meta](/advanced/queues-in-meta/#qstat-command-usage)

For detailed options list, see `man qstat`.

