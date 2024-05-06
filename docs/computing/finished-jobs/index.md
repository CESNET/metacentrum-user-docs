# Finished jobs

## Last 24 hours

Use `qstat -x` command.

To include in `qstat` also finished (`F`) and moved (`M`) jobs, use `-x` option:

    qstat -x -u user123 @elixir-pbs.elixir-czech.cz # list all jobs for user user123 running on elixir-pbs.elixir-czech.cz PBS server including the finished ones

The finished jobs are displayed only if they are max. 24 hours old.

## Older

Use `pbs-get-job-history` custom command.

Users can get complex information about their current or historical (several months) batch jobs. For this there exists custom command `pbs-get-job-history`, which is available on all frontends and compute nodes and extracts the following information:

- complete batch job (submitted shell script)
- standard output and standard error files
- various technical logs

Basic usage is:

    pbs-get-job-history job_ID

When the job history is found, individual files are stored in one folder named by its jobid.

Example of the output:

    user123@elmo:~$ pbs-get-job-history 11808203.pbs-m1.metacentrum.cz
    
    11808203.pbs-m1.metacentrum.cz  Job found
    
    Storing job data in ./11808203.pbs-m1.metacentrum.cz
    
    11808203.pbs-m1.metacentrum.cz_afslog_00000001.pid  # Process identification number (PID)
    11808203.pbs-m1.metacentrum.cz.ER                   # Standard error
    11808203.pbs-m1.metacentrum.cz.JB                   # PBS parameters in binary format, not human readable
    11808203.pbs-m1.metacentrum.cz.JB.TXT               # PBS parameters in text format, readable
    11808203.pbs-m1.metacentrum.cz.MOM_LOGS             # PBS logs
    11808203.pbs-m1.metacentrum.cz.OU                   # Standard output
    11808203.pbs-m1.metacentrum.cz.SC                   # Original user's shell script
    11808203.pbs-m1.metacentrum.cz.SYSLOG               # System logs from the computing node

!!! note
    The `pbs-get-job-history` utility does not retrieve input data and job results (they are not stored anywhere).

!!! note
    Output for interactive jobs does not contain `.ER`, `.OU` and `.SC` files

