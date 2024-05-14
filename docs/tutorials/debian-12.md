# Debian 12 & new PBS server 

Recently we set up a new frontend `zenith` running on Debian 12 - see [Complete list of frontends, their homes and OSs](../../computing/frontends).

At the same time, we are preparing to transfer from [PBS Pro](https://altair.com/pbs-professional) to [Open PBS](https://www.openpbs.org/).

A new Open PBS server `pbs-m1.metacentrum.cz` is up and running.

Currently the PBS Pro servers `meta-pbs.metacentrum.cz`, `cerit-pbs.cerit-sc.cz` and `elixir-pbs.elixir-czech.cz` are being decommissioned and their workload will be transferred to `pbs-m1.metacentrum.cz` only.

## Elixir users

### New queue 

Users of the `elixir` group shall submit their jobs to reserved queue `elixircz@pbs-m1.metacentrum.cz`, e.g.

    qsub -l walltime=1:0:0 -q elixircz@pbs-m1.metacentrum.cz -l select=1:ncpus=1:mem=400mb:scratch_local=400mb

`elixir` users still have their reserved pool of nodes with separate planning.

### Submit from elmo frontend

Currently the `elmo` frontend still submits to old "elixir" PBS server.

**Workaround: Submit a job from `elmo` to  `pbs-m1.metacentrum.cz` scheduler**

```
user@elmo:~$ module add openpbs        # this is necessarry!
user@elmo:~$ qsub -q @pbs-m1.metacentrum.cz -I -l select=1:ncpus=1 -l walltime=1:00:00
user@zenon1:~$ ...        ; exit         # do your job and exit               
user@elmo:~$ module rm openpbs         # if you want to get back PBSPro ("old" planners)
```

The module `openpbs` is needed also for other operations, e.g. probing for the job's state:

```
user@elmo:~$ module add openpbs 
user@elmo:~$ qstat -u user123  @pbs-m1.metacentrum.cz  
```

## Known issues

### Python on Debian 12

- typing "python"  on `zenith` will get you 3.x.x version of Python
- if you need some 2.x.x version of Python, you have to add it through a module (`module avail python/`)

### Missing libraries

Try `module add debian11/compat` if you run into "library XY: no such file or directory" type of problem.

If this does not help, contact us at <meta@cesnet.cz>

