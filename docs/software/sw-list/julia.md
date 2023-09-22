# Julia

    module avail julia/

[Julia](https://julialang.org/) is a high-level, high-performance dynamic programming language for numerical computing. It provides a sophisticated compiler, distributed parallel execution, numerical accuracy, and an extensive mathematical function library.

## Usage

**Aditional modules**

Ideal way how to use needed modules is to install them into your home directory. Something like this should be sufficient:

```
$ module add julia-0.5.2-gcc
$ export JULIA_PKGDIR=$HOME/.julia
$ module add  cmake-3.6.1 openmpi-2.1.1-gcc
$ julia
julia> Pkg.add("MPI")
```
