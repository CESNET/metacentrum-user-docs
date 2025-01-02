# Modify job attributes

Users can modify the attributes of the queueing jobs with the `qalter` command. The `qalter` command accomplishes the modifications by sending a modified job batch request to the PBS server, which owns each job. Thus, users must rewrite the entire attribute, including the unchanged parts. To see which attributes can be modified, call the `qalter` command on any frontend server.

The most frequently corrected attribute is the `-l` (resource list) attribute. Below are a few examples of how to use the `qalter` command and modify this attribute.

The job submitted as

    $ qsub -l select=1:ncpus=150:mem=10gb:scratch_local=10gb -l walltime=1:00:00 batch_job_script.sh

will never (will wait indefinitely in the queue) start because the requirement of 150 CPUs (ncpus=150) on one machine (select=1) cannot be met. Thus, the attribute of resources needs to be modified to a reasonable value.

    $ qalter -l select=1:ncpus=32:mem=10gb:scratch_local=10gb job_ID.pbs-m1.metacentrum.cz

**Please note that the entire attribute needs to be written, including unchanged parts.**

It is also possible to add some new values to the attribute. For example, the `spec` value that determines the speed of the CPU.

    $ qalter -l select=1:ncpus=150:mem=10gb:scratch_local=10gb:spec=6.9 job_ID.pbs-m1.metacentrum.cz

Walltime value can be modified as well. But only in the limits of the originally dedicated queue. submitted as

    $ qsub -l select=1:ncpus=150:mem=10gb:scratch_local=10gb -l walltime=1:00:00 batch_job_script.sh

will  be assigned to the queue `q_2h@pbs-m1.metacentrum.cz` with limits of walltime between 00:00:00 up to 02:00:00 (hh:mm:ss). Between these limits of the queue, the user can modify walltime.

    $ qalter -l walltime=01:30:00 job_ID.pbs-m1.metacentrum.cz

Attempts to increase the walltime behind the upper limit will fail.

    $ qalter -l walltime=10:00:00 job_ID.pbs-m1.metacentrum.cz
    qalter: Job violates queue and/or server resource limits job_ID.pbs-m1.metacentrum.cz
