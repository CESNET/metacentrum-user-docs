# Debian 12 & new PBS server 

By Jan 2024 we set up a new frontend `zenith` running on Debian 12. Currently there is only a few new computing nodes with Debian 12.

The rest of currently used computing nodes will be upgraded to Debian 12 in the near future.

At the same time, we are preparing to transfer from [PBS Pro](https://altair.com/pbs-professional) to [Open PBS](https://www.openpbs.org/).

A new Open PBS server `pbs-m1.metacentrum.cz` is up and running.

In the future the PBS Pro servers `meta-pbs.metacentrum.cz` and `cerit-pbs.cerit-sc.cz` will be decommissioned and their workload will be transferred to `pbs-m1.metacentrum.cz` only.


**Changes:**

- new frontend `zenith.cerit-sc.cz` (alias `zenith.metacentrum.cz`) with Debian 12
- see which are [computing nodes with Debian 12](https://metavo.metacentrum.cz/pbsmon2/props?property=os%3Ddebian12)
- new PBS server `pbs-m1.metacentrum.cz` default for `zenith` frontend

## Use new PBS from any frontend

Example: Send a job from `skirit` to  `pbs-m1.metacentrum.cz` scheduler

```
user@skirit:~$ module add openpbs        # this is necessarry!
user@skirit:~$ qsub -q @pbs-m1.metacentrum.cz -I -l select=1:ncpus=1 -l walltime=1:00:00
user@zenon1:~$ ...        ; exit         # do your job and exit               
user@skirit:~$ module purge              # if you want to get back PBSPro ("old" planners)
```

The module `openpbs` is needed also for other operations, e.g. probing for the job's state:

```
user@skirit:~$ module add openpbs 
user@skirit:~$ qstat -u user123  @pbs-m1.metacentrum.cz      
 
```

## Python on Debian 12

- typing "python"  on `zenith` will get you 3.x.x version of Python
- if you need some 2.x.x version of Python, you have to add it through a module (`module avail python/`)



