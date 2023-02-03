# PGI CDK

    module add pgicdk/ # PGI CDK
    module add pgiwks/ # PGI Workspation

## Description

PGI Cluster Development Kit is a collection of tools for development parallel ( supports parallel models OpenMP a MPI) and also serial programs in laguanges C, C++, FORTRAN 77, Fortran 95 and High Performance Fortran (HPF). Program exept to compilers and supported libraries contains debugger and profiler with support for parallel programs, optimalized mathematic libraries BLAS and LAPACK and parallel library ScaLAPACK. 

## Usage

Every user can use this program on PC clusters of MetaCentrum.

- PGICDK version 18.1 (module pgicdk-18.1): 2 permanent network-floating licenses
- PGICDK version 17.10 (module pgicdk-17.10): 2 permanent network-floating licenses
- PGICDK version 16.10 (module pgicdk-16.10): 2 permanent network-floating licenses
- PGICDK version 15.10 (module pgicdk-15.10): 2 permanent network-floating licenses
- PGICDK version 14.9 (module pgicdk-14.9): 2 permanent network-floating licenses
- PGICDK version 14.3 (module pgicdk-14.3): 2 permanent network-floating licenses
- PGICDK version 13.10 (module pgicdk-13.10): 2 permanent network-floating licenses
- PGICDK version 12.4 (module pgicdk-12.4): 2 permanent network-floating licenses
- PGICDK version 8.0 (module pgicdk-8.0): 10 permanent network-floating licenses
- PGICDK version 6.0 (module pgicdk-6.0):
- PGICDK version 5.1 (module pgicdk-5.1):

**Programs and environment variables**

Quick overview of the most used programs in module to ease you the searching in man pages.

| Program | Description | Corresponding environment variables | Notes |
|---|----|----|---|
| pgcc | preprocessor, compiler, assembler and linker for ANSI and K&R C | CC="pgcc", CPP="pgcc -E" | |	
| pgCC |preprocessor, compiler, assembler and linker for C++ | CXX="pgCC", CXXCPP="pgCC -E" | |
| pgc++ | preprocessor, compiler, assembler and linker for C++, compatible with GNU C++ compilers | CXX="pgc++", CXXCPP="pgc++ -E" | | 	
| pgf77 | preprocessor, compiler, assembler and linker for Fortran 77 | F77="pgf70" | |
| pgf90, pgf95, pgfortran | preprocessor, compiler, assembler and linker for Fortran 90/95 | F90="pgf90", FC="pgf90" | pgf90, pgf95 = aliases for pgfortran |


## Links

[PGI homepage](https://www.pgroup.com/index.htm).

[Old MetaCentrum wiki documentation](https://wiki.metacentrum.cz/wiki/PGI_CDK).
