# SPAdes 

    module avail spades/

[SPAdes](https://cab.spbu.ru/software/spades/) is an assembly toolkit containing various assembly pipelines. It is intended for both standard (multicell) and single-cell MDA bacteria assemblies. 

## Usage

In the `qsub` command is necessary to specify parameter ompthreads to allow run on multiple threads, e.g. (for 8 threads run):

    qsub -l select=1:ncpus=8:ompthreads=8:mem=...

!!! tip
    SPAdes is not able to utilize more than 6 CPUs on average. Reservation of more than 8 CPUs will not be beneficial for the speedup of calculation.    

