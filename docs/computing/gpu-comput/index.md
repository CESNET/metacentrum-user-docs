# GPU computing

## GPU job

To run GPU calculation, the user needs to:

1. specify **number of GPU cards** (parameter `ngpus`), and
2. choose one of the **gpu queues explicitly**.

!!! Warning "name of GPU queue must be specified"
    Contrary to normal job, the GPU jobs will not be routed into appropriate queue according to parameter `ngpus` only. The name of the queue (parameter `-q`) has to be specified, too.

| GPU queue name | Walltime range | 
|------------|----------------|
| gpu@meta-pbs.metacentrum.cz | 00:00:00 - 24:00:00 |
| gpu\_long@meta-pbs.metacentrum.cz | 00:00:00 - 336:00:00 |
| gpu@cerit-pbs.cerit-sc.cz | 00:00:00 - 24:00:00 |

GPU jobs on the **konos** cluster can be also run via the priority queue `iti@meta-pbs.metacentrum.cz` (queue for users from ITI - Institute of Theoretical Informatics, Univ. of West Bohemia).

**Example**

    qsub -I -q gpu -l select=1:ncpus=1:ngpus=1:scratch_local=10gb -l walltime=24:0:0


### Specific PBS resources

#### gpu mem

PBS parameter `gpu_mem` specifies minimum amount of memory that the GPU card will have. 

    qsub -q gpu -l select=1:ncpus=1:ngpus=1:gpu_mem=10gb ...

#### gpu\_cap

PBS parameter `gpu_cap` is [Cuda compute capability as defined on this page](https://docs.nvidia.com/cuda/cuda-c-programming-guide/index.html#compute-capabilities).

#### cuda\_version

PBS parameter `cuda_version` is version of CUDA installed.

### Specific system variables

IDs of GPU cards are stored in `CUDA_VISIBLE_DEVICES` variable.

These IDs are mapped to CUDA tools virtual IDs. Though if `CUDA_VISIBLE_DEVICES` contains value 2, 3 then CUDA tools will report IDs 0, 1. 



