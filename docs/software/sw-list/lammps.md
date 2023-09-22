# LAMMPS

    module avail lammps/

[LAMMPS](https://docs.lammps.org/Manual.html) is a classical molecular dynamics code, and an acronym for Large-scale Atomic/Molecular Massively Parallel Simulator. LAMMPS has potentials for soft materials (biomolecules, polymers) and solid-state materials (metals, semiconductors) and coarse-grained or mesoscopic systems.

## Usage

**Tip no. 1**

Lammps does not work on the oldest clusters. Please specify an option `cpu_flag=avx2` in the qsub command. This option will exclude incompatible nodes. 

**Tip no. 2**

There is a significant difference in computing speed of the program between Intel and AMD machine architecture. It runs better on Intel.

**Tip no. 3**

The lammps binary includes many compiled parts. You can get their list by issuing command

    lmp -h

