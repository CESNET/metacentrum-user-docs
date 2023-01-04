# GPU computing

## Submit GPU job

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

**Example**

    qsub -I -q gpu -l select=1:ncpus=1:ngpus=1:scratch_local=10gb -l walltime=24:0:0


## GPU-specific resources

gpu mem ...

gpu\_cap

cuda\_version

## GPU-specific system variables

## GPU clusters

GPU clusters table







