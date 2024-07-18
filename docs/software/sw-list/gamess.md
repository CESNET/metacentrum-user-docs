# Gamess 

    module avail gamess/

[Gamess](https://www.msg.chem.iastate.edu/gamess/) is a program for *ab initio* quantum chemistry calculation. GAMESS can compute SCF wavefunctions ranging from RHF, ROHF, UHF, GVB, and MCSCF. Correlation corrections to these SCF wavefunctions include Configuration Interaction, second order Perturbation theory, and Coupled cluster approaches, as well as the Density Functional Theory approximation. 

## Usage

### License

Licence is free, but every research group has to register at [http://www.msg.chem.iastate.edu/gamess/License_Agreement.html](http://www.msg.chem.iastate.edu/gamess/License_Agreement.html). Then contact MetaCentrum user support (via email meta@cesnet.cz) and confirm your registration.

### Example

The main script is `rungms`.

For parallel calculation, `rungms` requires additional arguments (version, number of main processes, number of cpus per node).

Also, `TMPDIR` should be set inside `$SCRATCHDIR`. The module sets implicitly variable `SCR` to `$SCRATCHDIR`, so if you want to use a different value, set it in the script of the task (and create the directory, if it doesn't exist yet) before running `rungms`.

A batch of example input files is included within Gamess installation directories.

**Example batch script**

```
#!/bin/bash
#PBS -N Gamess_test
#PBS -l select=1:ncpus=2:mem=4gb:scratch_local=10gb
#PBS -l walltime=1:00:00 

# define a DATADIR variable: directory where the input files are taken from and where output will be copied to
DATADIR=/storage/brno2/home/user_123/gamess-test

echo "$PBS_JOBID is running on node `hostname -f` in a scratch directory $SCRATCHDIR" >> $DATADIR/jobs_info.txt

module add gamess/dec2014

export TMPDIR=$SCRATCHDIR/tmp; mkdir $TMPDIR

cd $SCRATCHDIR
cp /afs/ics.muni.cz/software/gamess/dec2014/tests/standard/exam01.inp .

rungms exam01.inp >exam01.log 2>exam01.err

cp exam01.log $DATADIR/
cp exam01.err $DATADIR/

```

