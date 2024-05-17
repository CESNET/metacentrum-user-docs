# GPU computing

## GPU job

To run GPU calculation, the user needs to specify **number of GPU cards** only. The PBS scheduler will rout the job automatically into one of the **`gpu*`** queues.
 
!!! Note "name of GPU queue does not need to be specified anymore"
    Until the [upgrade to Open PBS server pbs-m1.metacentrum.cz](https://metavo.metacentrum.cz/en/news/novinka_2024_0010.html) the name of the queue had to be explicitly specified to run GPU job. **This is not required anymore.** Any job with non-zero `ngpus` parameter will be routed into gpu queue by the scheduler.

| available GPU queues | Walltime range | 
|------------|----------------|
| gpu@pbs-m1.metacentrum.cz | 00:00:00 - 24:00:00 |
| gpu\_long@pbs-m1.metacentrum.cz | 24:00:01 - 336:00:00 |

!!! tip "User group `iti` has a reserved GPU queue"
    Members of the [`iti` group](https://metavo.metacentrum.cz/pbsmon2/group/pbs-m1.metacentrum.cz/iti) (Institute of Theoretical Informatics, University of West Bohemia) have their own GPU cluster `konos` with priority access through direct submit to `iti@pbs-m1.metacentrum.cz` queue.

## PBS resources

### gpu mem

PBS parameter `gpu_mem` specifies minimum amount of memory that the GPU card will have. 

    qsub -q gpu -l select=1:ncpus=1:ngpus=1:gpu_mem=10gb ...

### gpu\_cap

PBS parameter `gpu_cap` is [Cuda compute capability as defined on this page](https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html#compute-capabilities).

!!! warning
    With the introduction of [new PBS server running on OpenPBS](../../computing/concepts/#pbs-servers), the specification of `gpu_cap` parameter is done in two distinct ways depending whether you submit to *PBS Pro* or *OpenPBS* scheduler.

### Architecture

The user can specify a *minimal required architecture* (`compute_XY`), or a *minimal required version within a given architecture* (`sm_XY`).

Minimal architecture:

    gpu_cap=compute_70   # will give you 7.0, 7.1, ... 7.5, but also 8.0, 9.0 ...

Minimal version of a chosen architecture, e.g. 7 ("Volta"):

    gpu_cap=sm_72        # will give you 7.2 till 7.5, but not 8.0 and higher

The requirements can be combined in a comma-separated string.

!!! note
    The commas are evaluated as an OR operand.

Example:

    qsub -l select=1:ngpus=1:gpu_cap=\"sm_65,compute_70\":mem=4gb   # 6.5 or 7.0 and higher
    qsub -l 'select=1:ngpus=1:gpu_cap="sm_65,compute_70":mem=4gb'   # dtto

!!! note
    Note that the quotes enclosing the `gpu_cap` options must be protected against shell expansion either by escaping them or by enclosing the whole `qsub` command into single quotes.

### cuda\_version

PBS parameter `cuda_version` is version of CUDA installed.

## System variables

IDs of GPU cards are stored in `CUDA_VISIBLE_DEVICES` variable.

These IDs are mapped to CUDA tools virtual IDs. Though if `CUDA_VISIBLE_DEVICES` contains value 2, 3 then CUDA tools will report IDs 0, 1. 

