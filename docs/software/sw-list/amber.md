# Amber

    module avail amber/

## Descripion

Amber is a set of molecular mechanical force fields for the simulation of biomolecules.

Program package contains cca 50 programs, which cover wide spectrum of computational chemistry. Main programs are following Amber modules: 

**sander**

Simulated annealing with NMR-derived energy restraints. This allows for NMR refinement based on NOE-derived distance restraints, torsion angle restraints, and penalty functions based on chemical shifts and NOESY volumes.

**pmemd**

This is an extensively-modified version of the sander program, optimized for periodic, PME simulations, and for GB simulations.

**nmode**

Normal mode analysis program using first and second derivative information, used to find search for local minima, perform vibrational analysis, and search for transition states.

**LEaP**

LEaP is an X-windows-based program that provides for basic model building and Amber coordinate and parameter/topology input file creation. It includes a molecular editor which allows for building residues and manipulating molecules.

**antechamber**

This program suite automates the process of developing force field descriptors for most organic molecules. It starts with structures (usually in PDB format), and generates files that can be read into LEaP for use in molecular modeling. The force field description that is generated is designed to be compatible with the usual Amber force fields for proteins and nucleic acids.

**ptraj**

Tool to analyze MD trajectories, computing a variety of things, like RMS deviation from a reference structure, hydrogen bonding analysis, time-correlation functions, diffusional behavior, and so on.

**mm_pbsa**

This is a script to automate post-processing of MD trajectories, to analyze energetics using continuum solvent ideas. It can be used to break energies energies into "pieces" arising from different residues, and to estimate free energy differences between conformational basins. 

## Usage and license


- **22.x modules**
    - *available to all users of MetaCentrum*
    - users need to [accept the Amber license](https://perun.metacentrum.cz/meta/registrar/?locale=en&vo=meta&group=lic_amber) to be able to run the job
    - The module contains all types of binaries - sequential, .MPI, .OMP and .cuda (GPU)

- **18.x modules**
    - *available only for students and employees of Charles University*
    - `amber-18-intel` compiled by Intel Compiler with OpenMPI support (.MPI suffixes), including pmemd.gem (preferred non-GPU variant)
    - `amber-18` compiled by GCC with OpenMPI support (.MPI suffixes)
    - `amber-18-gpu-upd17` activates binaries for GPU version (update 17) compiled by IntelCDK with OpenMPI parallel support (.cuda and .cuda.MPI suffixes)
    - `amber-18-gpu` activates binaries for GPU version (update 14) compiled by IntelCDK with OpenMPI parallel support (.cuda and .cuda.MPI suffixes), does not support GPUs with CUDA capability 8.0 or higher

- **16.x modules**
    - *available to all MetaCentrum users*
    - `amber-16-gpu` activates all binaries, not only GPU version (even parallel and nonparallel versions, distinguished by suffixes .MPI, .cuda, .cuda.MPI)
    - usage of amber-16-gpu is preferred due to better optimization.

- **14.x modules**
    - *available to all the MetaCentrum users*
    - `amber-14` is compiled by Intel compiler with the support of Intel MKL and distributed (MPI) computing (OpenMPI)
    - `amber-14-gpu` is compiled by Intel compiler with the support of Intel MKL, GPU computing (CUDA 6.0), and distributed (MPI) computing (OpenMPI)
    - `amber-14-gpu8` activates all binaries, not only GPU version (even parallel and nonparallel versions, distinguished by suffixes .MPI, .cuda, .cuda.MPI)
    - usage of `amber-14-gpu8` is preferred due to better optimization.

- **12.x modules**
    - *available just for users from Masaryk University*


## Links

[Amber homepage](http://ambermd.org/).

