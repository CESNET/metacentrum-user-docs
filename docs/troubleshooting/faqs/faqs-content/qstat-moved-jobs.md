# Running job mysteriously disappeared from qstat -u command

If the `qstat` command lists a certain job in Q state and then, after some time, the same `qstat` outputs nothing and the result files are missing, often this is the case when the job was moved to different PBS server and is still running. 

The `qstat -u username` lists only jobs run under the current PBS server. 

To list all your jobs at all servers, modify the command as

    qstat -u user123 @meta-pbs.metacentrum.cz @cerit-pbs.cerit-sc.cz @elixir-pbs.elixir-czech.cz

