# CP2K 

    module avail cp2k/

[CP2K](http://www.cp2k.org) is a program to perform atomistic and molecular simulations of solid state, liquid, molecular, and biological systems. It provides a general framework for different methods such as e.g., density functional theory (DFT) using a mixed Gaussian and plane waves approach (GPW) and classical pair and many-body potentials. 

## Usage

Initialization makes available also MPI implementation and system variable `CP2K` pointing into CP2K install dir. Usage of one of the tools with sample data:

```
qsub -I -l select=8:ncpus=1:mem=4gb:scratch_local=1gb -l walltime=2:00:00
module add cp2k-6.1
cd $SCRATCHDIR
cp -r /software/cp2k/3.0/tests .
cd tests/TAMC/regtest
mpirun cp2k.psmp ./dimer.inp
```

This application supports parallel computing (MPI, OpenMP) which can have weird consequences.

The MPI parallelism is more robust and efficient enough even with more processes on the same node, that the mixed mode MPI/OpenMP parallelism is not worth trying. Moreover, the calculation crashes when more than 1 OpenMP parallel MPI process runs on the same node (valid for version 4.1). 

