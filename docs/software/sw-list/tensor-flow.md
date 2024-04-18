#  TensorFlow

    ls /cvmfs/singularity.metacentrum.cz/NGC/    # Singularity image
    module avail tensorflow/                     # as a module

[TensorFlow](https://www.tensorflow.org/) is an open source software library for numerical computation using data flow graphs.

A data flow graph, also known as a data flow diagram (DFD), is a graphical representation of the flow of data within a system or process. It is a visual tool used for modeling and understanding how data moves through various components or stages in a system. 

Flexible architecture of TensorFlow allows you to deploy computation to one or more CPUs or GPUs in a desktop, server, or mobile device with a single API. 

## Usage

### Singularity image

Newer versions of TensorFlow are **available solely as [Singularity images](../../software/containers/#singularity-usage)** optimized for usage with NVidia GPUs (NVidia GPU Cloud, NGC).

The NGC packages are placed in the directory `/cvmfs/singularity.metacentrum.cz`; you have to list the directory first to see its contents:

    ls /cvmfs/singularity.metacentrum.cz

To use a selected version of TensorFlow image, run the image within interactive job as:

```
qsub -I -l select=1:mem=16gb:scratch_local=10gb:ngpus=1:gpu_cap=cuda60:cuda_version=11.0 -q gpu -l walltime=4:00:00
singularity shell --nv /cvmfs/singularity.metacentrum.cz/NGC/TensorFlow\:21.03-tf2-py3.SIF
```
<!-- TODO
More about Nvidia GPU cloud usage can be found at NVidia deep learning frameworks wiki page. 
-->

### Module

!!! tip
    Unless you have a specific reason, we encourage users to use TensorFlow in a container instead of module.

Once you add the module that best suits your needs, the use is as simple as running python and importing the tensorflow module:

```
python
>>> import tensorflow as tf
>>> (etc.)
```

!!! bug
    If you are using tensorflow-2.0.0-gpu-python3 and receive a message "Illegal instruction", ask for GPU cards supporting avx512 instructions: `PBS -l select=...:cpu_flag=avx512dq`




