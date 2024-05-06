# Job tracking

## Job info by qstat 

The current state of the job can be probed by `qstat` command.

Example:

    qstat job_ID # display status of selected job (short format)
    qstat -f job_ID # display status of job (long format)
    qstat -u user123 # list all user123's running or waiting jobs on current PBS server 
    qstat -u user123 @cerit-pbs.cerit-sc.cz @pbs-m1.metacentrum.cz @elixir-pbs.elixir-czech.cz # dtto, on all PBS servers

## Job states

PBS Pro uses different codes to mark job state within the PBS ecosystem. 

| State | Description |
|-------|-------------|
| Q | Queued |
| M | Moved to another PBS server |
| H | Held. Job is put into a held state by the server, user or administrator. Job stays in a held state until it is released by a user or administrator.|
| R | Running |
| S | Suspended (substate of R) |
| E | Exiting after having run |
| F | Finished |
| X | Finished (subjobs only) |
| W | Waiting. Job is waiting for its requested execution time to be reached, or job is delayed due to stagein failure. |

## Output of running jobs

Although the input and temporary files for calculation lie in `$SCRACHDIR`, the standard output (STDOUT) and standard error output (STDERR) are elsewhere. 

To see current state of these files in a running job, proceed in these steps:

1. find on which host the job runs by `qstat -f job_ID | grep exec_host2`
2. `ssh` to this host
3. on the host, navigate to `/var/spool/pbs/spool/` directory and examine the files
    - `$PBS_JOBID.OU` for STDOUT, e.g. `13031539.pbs-m1.metacentrum.cz.OU`
    - `$PBS_JOBID.ER` for STDERR, e.g. `13031539.pbs-m1.metacentrum.cz.ER`
4. To watch a file continuously, you can also use a command `tail -f`

For example:

    (BULLSEYE)user123@tarkil:~$ qstat -f 13031539.pbs-m1.metacentrum.cz | grep exec_host2
    exec_host2 = zenon41.cerit-sc.cz:15002/12
    (BULLSEYE)user123@tarkil:~$ ssh zenon41.cerit-sc.cz
    user123@zenon41.cerit-sc.cz:/var/spool/pbs/spool$ tail -f 13031539.pbs-m1.metacentrum.cz.OU 
 
<!--
## Job exit codes

!!! todo
    Sem tabulku exit kodu, kde a jak je zjistit a co znamenaji 

-->


