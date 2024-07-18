# ABySS

    module avail abyss/

[ABySS](https://www.bcgsc.ca/resources/software/abyss) is a de novo, parallel, paired-end sequence assembler that is designed for short reads. 

## Usage

**Parallel use**

Newer AbySS versions use a different way how to use parallelization. Do not run `mpirun -np 8 abyss-pe`. To run ABySS with 8 threads (for example), use `abyss-pe np=8`. The `abyss-pe` driver script will start the MPI process, like so: `mpirun -np 8 ABYSS-P`. The example with ABySS 2.3.5 (prepared as an environment) is following:

    module add mambaforge
    mamba activate abyss_v2.3.5_py3.6
    abyss-pe np=8 k=71 B=3G name=test_run ...

Version 2.1.5 was compiled with `openmpi-3.1.2-gcc`! 

