# Extend walltime

Users are allowed to prolong their jobs in a limited number of cases.

To do this, use command `qextend job_ID additional_walltime`.

Time can be set as:

- a single number - interpreted as seconds
- `hh:mm:ss` - interpreted as hours:minutes:seconds

Example:

    (BUSTER)user123@skirit:~$ qextend 8152779.pbs-m1.metacentrum.cz 01:00:00
    The walltime of the job 8152779.pbs-m1.metacentrum.cz has been extended.
    Additional walltime:	01:00:00
    New walltime:		02:00:00

To prevent abuse of the tool, there is a quota limiting the `qextend` usage to:

- max. 20 times within the last 30 days, `AND`
- prolong the job(s) by up to 2880 CPU-hours within the last 30 days.

Job prolongations older than 30 days are "forgotten" and no longer occupy user's quota.

!!! warning "CPU-hours are not walltime hours"
    User quota is set to hours-per-CPU. If you e.g. prolong a job running on 8 CPUs by 1 hour, 8 hours will be subtracted from your cputime fund.

To get current state of your fund, run `qextend info`:

    (BUSTER)user123@skirit:~$ qextend info

    user123@META's info:

    30-days counter limit:	20
    Used counter limit:	2
    Avail. counter limit:	18

    30-days cputime fund:	1440:00:00
    Used cputime fund:	01:00:01
    Avail. cputime fund:	1438:59:59

    Earliest rec. timeout:	2021-08-20 10:13:36.426429

Counter limit is how many times you can prolong a job.
Cputime fund is the amount of cpu-time you can use to prolong a job.
Earliest rec. timeout indicates when the oldest one of your prolongations made during last 30 days will be forgotten.

!!! note "What to do if you run out of quota"
    If you reach the monthly limit and still need to prolong a job, it can be done upon request to user support at <meta@cesnet.cz>.

!!! question "How do I extend array job?"
    The `qextend` command can be used to extend simple jobs only. If you need to extend array job, let us know at <meta@cesnet.cz> user support.

