# Running job mysteriously disappeared from qstat -u command


The job was most probably moved between PBS servers; the qstat -u username lists only jobs run under the current PBS server. To list jobs at all servers, modify the command as

qstat -u USERNAME @meta-pbs.metacentrum.cz @cerit-pbs.cerit-sc.cz @elixir-pbs.elixir-czech.cz

