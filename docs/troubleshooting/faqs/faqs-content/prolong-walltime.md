# My running job is coming close to walltime, can I prolong it?

You should always aim to setting the walltime sufficiently from the beginning, since prolonging running jobs spoils the performance of scheduling system. Users are, however, allowed to prolong their running jobs (to a certain extent). To prolong a job e.g. by 1 hour this, use:

    (BUSTER)user123@skirit:~$ qextend my_job_ID 01:00:00
    The walltime of the job my_job_ID has been extended.
    Additional walltime:	01:00:00
    New walltime:		02:00:00

For detailed information see [how to prolong walltime](/computing/extend-walltime).

If you already have run out of a quota, contact our user support.
