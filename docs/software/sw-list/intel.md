# Intel

    module avail intelcdk/

The [Intel development kit](https://www.intel.com/content/www/us/en/developer/tools/overview.html) is a set of tools for development of parallel (supports OpenMP and MPI parallel models) as well as serial programs programmed in C, C++, FORTRAN 77, Fortran 95 and High Performance Fortran (HPF). In addition to compilers and support libraries, the kit includes a debugger and a profiler with support for parallel programs, optimized mathematical libraries BLAS and LAPACK and ScaLAPACK parallel library. 

## Usage

Can be used on MetaCentrum nodes by any MetaCentrum member.

The purchased licenses permit **only academic use** of the program!

**Included tools:**

- Intel® C/C++ Compiler -- C/C++ compilers
- Intel® Fortran Compiler -- Fortran compiler
- Intel® Debugger (IDB) -- a tool for debugging programs (including parallel/distributed ones) written in C, C++, and Fortran
- Intel® Cilk™ Plus -- an extension of C/C++ compilers that simplifies an implemention of parallel applications
- Intel® MKL (Math Kernel Libraries) -- a computing math library of highly optimized, extensively threaded math routines for applications that require maximum performance (core math functions include BLAS, LAPACK, ScaLAPACK1, sparse solvers, fast Fourier transforms, vector math, and more)
- Intel® IPP (Integrated Performance Primitives) -- an extensive library of multicore-ready, highly optimized software functions for multimedia, data processing, and communications applications
- Intel® TBB (Threading Building Blocks) -- runtime library that simplifies the writing of multithreaded applications in the C++ environment
- Intel® Trace Analyzer and Collector -- graphical tool for understanding MPI application behavior, quickly finding bottlenecks, improving correctness, and achieving high performance for parallel cluster applications based on Intel architecture

**Versions**

- Intel Parallel Studio XE 2019 Cluster Edition Update 3(module intelcdk-19u3)
- Intel Parallel Studio XE 2017 Cluster Edition Update 1(module intelcdk-17.1)
    - Intel® C/C++/Fortran Compiler, Intel® Debugger, Intel® Cilk™ Plus, Intel® MKL, Intel® IPP, Intel® TBB -- 2x permanent network-floating license
    - Intel® Fortran Compiler -- 2x permanent network-floating license
- Intel Parallel Studio XE 2017 Cluster Edition (module intelcdk-17)
    - Intel® C/C++/Fortran Compiler, Intel® Debugger, Intel® Cilk™ Plus, Intel® MKL, Intel® IPP, Intel® TBB -- 2x permanent network-floating license
    - Intel® Fortran Compiler -- 2x permanent network-floating license
- Intel Parallel Studio XE 2016 Cluster Edition (module intelcdk-16)
    - Intel® C/C++/Fortran Compiler, Intel® Debugger, Intel® Cilk™ Plus, Intel® MKL, Intel® IPP, Intel® TBB -- 2x permanent network-floating license
    - Intel® Fortran Compiler -- 2x permanent network-floating license
- Intel CDK version 15.0 (module intelcdk-15) -- newly called Intel Parallel Studio XE 2015 Cluster Edition:
    - Intel® C/C++/Fortran Compiler, Intel® Debugger, Intel® Cilk™ Plus, Intel® MKL, Intel® IPP, Intel® TBB -- 2x permanent network-floating license
    - Intel® Fortran Compiler -- 2x permanent network-floating license
- Intel MPI verze 5.0.1 (module intelmpi-5.0.1)
    - Intel® Trace Analyzer and Collector
- Intel CDK version 14.0 (module intelcdk-14):
    - Intel® C/C++/Fortran Compiler, Intel® Debugger, Intel® Cilk™ Plus, Intel® MKL, Intel® IPP, Intel® TBB -- 2x permanent network-floating license
    - Intel® Fortran Compiler -- 2x permanent network-floating license
- Intel C/C++ Composer version 13.1 (module intelcdk-13):
    - Intel® C/C++ Compiler, Intel® MKL, Intel® TBB -- 4x permanent network-floating license
- Intel CDK version 12.1 (module intelcdk-12):
    - Intel® C/C++ Compiler, Intel® Debugger, Intel® Cilk™ Plus, Intel® MKL, Intel® IPP, Intel® TBB -- 4x permanent network-floating license
    - Intel® Fortran Compiler -- 2x permanent network-floating license

**Optimizing compilation**

Except the basic optimization options (-O1, -O2, -O3) you can use CPU instructions optimization (automatic CPU dispatching). This is Intel compiler unique ability of targeting the different instruction sets of different processors. GCC optimizes only for one processor instruction set, the application is not able to "choose the best" when running. If you need to run your code on all MetaCentrum clusters, add the following to one of CFLAGS, FFLAGS or CPPFLAGS:

    -msse4.2 -axAVX,CORE-AVX2

You can find more information on [this page](https://www.intel.com/content/www/us/en/developer/articles/technical/understanding-cpu-optimized-code-used-in-intel-ipp.html).

**WARNING:** Be careful if you plan to add the -fast flag, which sets -xHost (and other options) automatically during compilation. If you place -fast after -axCORE-AVX2 -xSSE4.2, -xHost takes precedence over -axCORE-AVX2 -xSSE4.2, and the executable is generated for the compilation host processor.

**Linking MKL libraries**

![Math libraries dependencies](../../software/sw-list/intel-math-libs.png)

Simple way how to get needed linking parameters provides [Intel MKL link advisor](https://www.intel.com/content/www/us/en/developer/tools/oneapi/onemkl-link-line-advisor.html).

Intel FFTW libraries are [part of MKL](https://www.intel.com/content/www/us/en/developer/tools/oneapi/onemkl.html#gs.oye6lc) since version 10. From that version it is sufficient to link only MKL and not bother with other wrappers.

**Linking examples**

These examples assumes using of intelcdk-15 module. All libraries are accessible at $MKLROOT/lib/intel64, differences between LP and ILP versions are described in the article [Using the ILP64 Interface vs. LP64 Interface](https://www.intel.com/content/www/us/en/developer/tools/documentation.html) on Intel pages.

Following parameters can be variously combined.

- Using basic math libraries [2]:

    `export LDFLAGS="-limf -lm"`

- Using FFTW:

    `export LDFLAGS="-L$MKLROOT/lib/intel64 -lfftw3xc_intel"`

Please note that libfftw3xc is a FFTW3 C wrapper and libfftw3xf is FFTW3 Fortran wrapper.

- Using OpenMP:

    `export LDFLAGS="-L$MKLROOT/lib/intel64 -qopenmp"`

- Using BLAS, LAPACK:

    `export LDFLAGS="-L$MKLROOT/lib/intel64 -lmkl_blas95_lp64 -lmkl_lapack95_lp64"`

or (if not sufficient) try the full specification

    `export LDFLAGS="-L$MKLROOT/lib/intel64 -L$MKLROOT/../../../lib/intel64 -lmkl_intel_lp64 -lmkl_intel_thread -lmkl_core -liomp5 -lpthread -lmkl_blas95_lp64 -lmkl_lapack95_lp64"`

Please note that Intel MKL ILP64 libraries use the 64-bit integer type (necessary for indexing large arrays, with more than 231-1 elements), whereas the LP64 libraries index arrays with the 32-bit integer type. There are both library types available compiled by Intel compiler [3]. If you need BLAS and LAPACK compiled by gfortran, please use the path /software/intelcdk-15/mkl/lib/intel64/gfortran47 for the proper files. We can make available more versions of these libraries.

- Using SCALAPACK (LAPACK with MPI support), mandatory addition of openmpi-1.8.2-intel module:

    `export LDFLAGS="-L$MKLROOT/lib/intel64 -lmkl_blacs_openmpi_lp64 -lmkl_scalapack_lp64"`

- Linking libraries path directly to program (avoid possible `LD_LIBRARY_PATH` issues)

    `make LDFLAGS=-Wl,-R/afs/ics.muni.cz/software/intelcdk-15/composerxe/lib/intel64`

**ld: cannot find -lompstub**

From certain version of Intel compiler is used the library `iomp5` instead of `ompstub`. So with intelcdk-15 use `-liomp5` instead of `-lompstub`.

**Programs and environment variables**

Quick overview of the most used programs in module to ease you the searching in man pages.

| Program | Description | Corresponding environment variables | Notes |
|----|-----|----|----|
| icc |	preprocessor, compiler, assembler and linker for C | CC="icc", CPP="icc -E" |  |
| icpc | preprocessor, compiler, assembler and linker for C++ | CXX="icpc", CXXCPP="icpc -E" |  |
| ifort | preprocessor, compiler, assembler and linker for Fortran 77 | F77="ifort -f77rtl" | default behavior of ifort is like Fortran 90 compiler |
| ifort | preprocessor, compiler, assembler and linker for Fortran 90/95 | F90="ifort", FC="ifort" | default |

**GCC and ICC interaction**
Program parts can be compiled with different compilers and then link them together. Nice description is on [Intel pages](https://www.intel.com/content/www/us/en/developer/tools/overview.html). 

