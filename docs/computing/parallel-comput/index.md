# Parallel computing

Parallel computing can significantly shorten time of your job because the job uses multiple resources at once.

MetaCentrum offers two ways of parallel computing - **OpenMP** and **MPI**, which can be used separately or can be combined.

## OpenMP

If your application is able to use multiple threads via a shared memory, **request a single chunk with multiple processors** and make sure the variable `OMP_NUM_THREADS` is set.

!!! warning
    Setting the variable `OMP_NUM_THREADS` is important, as it restricts the number of processes that can run in parallel. **If `OMP_NUM_THREADS` is not set, the application may try to use all the available cores and batch system will kill your job.**

For example with qsub command:

    qsub -l select=1:ncpus=4:ompthreads=4:mem=16gb:scratch_local=5gb -l walltime=24:00:00 script.sh

add to the batch script the line:

    export OMP_NUM_THREADS=4 # write the number explicitly

or (a safer way):

    export OMP_NUM_THREADS=$PBS_NUM_PPN # set it equal to PBS variable PBS_NUM_PPN (number of CPUs in a chunk)

## MPI

Running an MPI computation is possible via **`mpirun` command**.

If your application consists of multiple processes communicating via a message passing interface, **request for a set of chunks with arbitrary number of processors**. 

For example:

    qsub -l select=2:ncpus=2:mem=1gb:scratch_local=2gb -l walltime=1:00:00 script.sh

For most applications, it is preferable to use large chunks (many nodes with 32 or 64 CPUs (cores) are available in Metacentrum) rather than many small chunks since communication inside shared of memory of single node is faster than external network.

PBS may or may not place multiple chunks on single node (depending on available resources and other jobs).

To ensure that the nodes are on the same cluster, we recommend to use the option `-l place=group=cluster`:
  
    qsub -l select=2:ncpus=2:mem=1gb:scratch_local=2gb -l place=group=cluster -l walltime=1:00:00 skript.sh

In special cases when each chunk must be placed on a different node, use `-l place = scatter` parameter.

    qsub -l select=2:ncpus=2:mem=1gb:scratch_local=2gb -l place=scatter -l walltime=1:00:00 skript.sh

Then run your calculation as

    mpirun myMPIapp

### Use InfiniBand connection

To get even a better speedup, you can request special nodes, which are interconnected by a low-latency [InfiniBand connection](https://en.wikipedia.org/wiki/InfiniBand).

    qsub -l select=4:ncpus=4:mem=1gb:scratch_local=1gb -l walltime=1:00:00 -l place=group=infiniband script.sh

### MPI and OpenMP interaction

If your application supports both types of parallelization (MPI and OpenMP), you can combine them. This requires some level of caution, otherwise the job might get to conflict with the scheduler.

PBS options for parallelization are:

- `ompthreads=[number]`: how many **OpenMP threads** can run on **1 chunk**
- `mpiprocs=[number]`: how many **MPI processes** can run on **1 chunk**


Examples of correct using the OpenMP library:

| Requested resources | Example |
|------|------|
| 1 device, more processors | `export OMP_NUM_THREADS=$PBS_NUM_PPN`<br/> `mpirun -n 1 /path/to/program ...` |
| 1 device, more processors | `export OMP_NUM_THREADS=1`<br/> `mpirun /path/to/program ...` |
| 2 device, more processors | `cat $PBS_NODEFILE | uniq >nodes.txt`<br/>`export OMP_NUM_THREADS=$PBS_NUM_PPN`<br/> `mpirun -n 2 --hostfile nodes.txt /path/to/program ...` |




