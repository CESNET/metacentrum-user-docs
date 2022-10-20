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

## Trap command usage

There does not exist a single optimal batch script for all possible types of calculations. The example script in Beginners guide follows a rather data-protective policy:

    clean the scratch directory only if there was no error,
    in case the job was interrupted (either by user or by PBS), or ended erroneously, do not clean the scratch.

This policy may not fit all users, as it shifts the responsibility for cleaning scratch on user in case of non-standard ending of the job. There is a way to automate scratch cleaning in case of error, namely the trap command.
Trap the SIGTERM

When the job is killed either by PBS or by the user (qdel command), the following happens:

Sigterm sigkill.jpg

The batch script receives SIGTERM signal. There is no way how to distinguish whether the job was killed by PBS or by the user. On receiving the SIGTERM, the running process may take a variety of actions - it may stop immediately, or it may attempt to clean up AND stop, or it may do nothing. If the process keeps running, the SIGTERM signal is after several seconds followed by SIGKILL (equivalent to kill -9), which stops it immediately.

What action is taken upon receiving a SIGTERM can be defined via trap command. (SIGKILL cannot be trapped, ignored nor reacted to.)

    #!/bin/bash
    trap 'clean_scratch' TERM # clean the scratch if you receive SIGTERM (kill by PBS or user qdel)

Caution! This solution is useful to get rid of mess left after user-killed jobs, but it may backfire when the job was killed by PBS, typically when walltime limits are exceeded and the clean_scratch removes all potentially valuable checkpoint files. Adding

    #!/bin/bash
    trap 'cp all_checkpoint_files somewhere_safe/ ; clean_scratch' TERM # on SIGTERM, attempt to copy away potentially valuable files before cleaning scratch

can improve things, but will clutter user's home directory by unwanted files in other cases. Moreover, if the files are large and/or numerous, the copying may not finish in time before being interrupted by SIGKILL signal and the data need to be retrieved from scratch manually anyway.
Trap the EXIT

EXIT is not a signal, but for the purpose of trap command it can be treated in the same way. EXIT happens when the script ends, either by executing the last line or via the exit command like in the code snippet below:

    #!/bin/bash
    test -n "$SCRATCHDIR" || { echo >&2 "Variable SCRATCHDIR is not set!"; exit 1; }

If the trap for EXIT is set

    #!/bin/bash
    trap 'clean_scratch' EXIT # if the script exits, clean scratch

the scratch will be cleaned if the script hits exit command or - at the latest - after it runs to an end.

Caution! The use of trap upon EXIT can backfire, too. Suppose the user adds the trap with the purpose to clean up after the script has run to an end, then adds some petty sanity check after the core calculation is done.

    #!/bin/bash

    ...

    trap 'clean_scratch' EXIT
    
    ...
    
    ./potentially_long_calculation_producing_result_files
    
    test -n some-directory || { echo >&2 "Directory some-directory does not exist!"; exit 1; }
    
    cp result_files somewhere/
    ...

This, too, can lead to unintentional loss of results, as the clean_scratch is executed before the result files are copied away. 

