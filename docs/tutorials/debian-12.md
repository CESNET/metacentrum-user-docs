# Debian 12, new PBS server 


- new frontend `zenith.cerit-sc.cz` aliased also as `zenith.metacentrum.cz`

- new PBS server pbs-m1.metacentrum.cz

- [computing nodes with Debian 12](https://metavo.metacentrum.cz/pbsmon2/props?property=os%3Ddebian12)

- send a job to new PBS server from any fronted: just specify the server like this `module add openpbs ; qsub @pbs-m1.metacentrum.cz -I -l select=1:ncpus=1 -l walltime=1:00:00`

- `module purge` to get back to PBSPro ("old" planners)















