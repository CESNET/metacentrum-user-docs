# Job tracking

## Job info by qstat 

The current state of the job can be probed by `qstat` command.

Example:

    qstat job_ID # display status of selected job (short format)
    qstat -f job_ID # display status of job (long format)
    qstat -u user123 # list all user123's running or waiting jobs on current PBS server 
    qstat -u user123 @cerit-pbs.cerit-sc.cz @meta-pbs.metacentrum.cz @elixir-pbs.elixir-czech.cz # dtto, on all PBS servers

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
    - `$PBS_JOBID.OU` for STDOUT, e.g. `13031539.meta-pbs.metacentrum.cz.OU`
    - `$PBS_JOBID.ER` for STDERR, e.g. `13031539.meta-pbs.metacentrum.cz.ER`
4. To watch a file continuously, you can also use a command `tail -f`

For example:

    (BULLSEYE)user123@tarkil:~$ qstat -f 13031539.meta-pbs.metacentrum.cz | grep exec_host2
    exec_host2 = zenon41.cerit-sc.cz:15002/12
    (BULLSEYE)user123@tarkil:~$ ssh zenon41.cerit-sc.cz
    user123@zenon41.cerit-sc.cz:/var/spool/pbs/spool$ tail -f 13031539.meta-pbs.metacentrum.cz.OU 
 
## Finished jobs

### Last 24 hours

Use `qstat -x` command.

To include in `qstat` also finished (`F`) and moved (`M`) jobs, use `-x` option:

    qstat -x -u user123 @elixir-pbs.elixir-czech.cz # list all jobs for user user123 running on elixir-pbs.elixir-czech.cz PBS server including the finished ones

The finished jobs are displayed only if they are max. 24 hours old.

### Older

Use `pbs-get-job-history` custom command.

Users can get complex information about their current or historical (several months) batch jobs. For this there exists custom command `pbs-get-job-history`, which is available on all frontends and compute nodes and extracts the following information:

- complete batch job (submitted shell script)
- standard output and standard error files
- various technical logs

Basic usage is:

    pbs-get-job-history job_ID

When the job history is found, individual files are stored in one folder named by its jobid.

Example of the output:

    user123@elmo:~$ pbs-get-job-history 11808203.meta-pbs.metacentrum.cz
    
    11808203.meta-pbs.metacentrum.cz  Job found
    
    Storing job data in ./11808203.meta-pbs.metacentrum.cz
    
    11808203.meta-pbs.metacentrum.cz_afslog_00000001.pid  # Process identification number (PID)
    11808203.meta-pbs.metacentrum.cz.ER                   # Standard error
    11808203.meta-pbs.metacentrum.cz.JB                   # PBS parameters in binary format, not human readable
    11808203.meta-pbs.metacentrum.cz.JB.TXT               # PBS parameters in text format, readable
    11808203.meta-pbs.metacentrum.cz.MOM_LOGS             # PBS logs
    11808203.meta-pbs.metacentrum.cz.OU                   # Standard output
    11808203.meta-pbs.metacentrum.cz.SC                   # Original user's shell script
    11808203.meta-pbs.metacentrum.cz.SYSLOG               # System logs from the computing node

!!! note
The `pbs-get-job-history` utility does not retrieve input data and job results (they are not stored anywhere).

!!! note
Output for interactive jobs does not contain `.ER`, `.OU` and `.SC` files

## Job exit codes

Sem tabulku exit kodu, kde a jak je zjistit a co znamenaji 

