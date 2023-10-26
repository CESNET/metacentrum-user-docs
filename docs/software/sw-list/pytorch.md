#  PyTorch

    ls /cvmfs/singularity.metacentrum.cz/NGC   # Singularity image
    module avail pytorch/                      # as a module

[PyTorch](https://pytorch.org/) is a python package that provides two high-level features:

- tensor computation (like Numpy) with strong GPU acceleration
- deep neural networks built on a tape-based autograd system

Usually one uses PyTorch either as:

- a replacement for numpy to use the power of GPUs.
- a deep learning research platform that provides maximum flexibility and speed

## Usage

!!! tip
    Unless you have s specific reason not to do so, we encourage users to run PyTorch from a Singularity image rather than from a modules.

### Singularity image 

Newer versions of PyTorch are available solely as Singularity images optimized for usage with NVidia GPUs (NVidia GPU Cloud, NGC). The NGC packages are placed in the directory `/cvmfs/singularity.metacentrum.cz`; you have to list the directory first to see its contents:

    ls /cvmfs/singularity.metacentrum.cz

To use a selected version of PyTorch image, run the image within interactive job as:

```
qsub -I -l select=1:mem=16gb:scratch_local=10gb:ngpus=1:gpu_cap=cuda60:cuda_version=11.0 -q gpu -l walltime=4:00:00
singularity shell --nv /cvmfs/singularity.metacentrum.cz/NGC/PyTorch\:21.03-py3.SIF
```

### Module usage

Older versions of PyTorch can be obtained also as modulefiles. Please keep in mind that the usage of PyTorch as modulefile is deprecated and newer versions will not be installed.

All currently installed versions of PyTorch support following methods of computations:

- CPU-only computations
- GPU-accelerated computations based on CUDA 8.0 and CuDNN 7.0 libraries

PyTorch 1.1.0:

- `pytorch-1.1.0_python-3.6.2_cuda-10.1` (May 2019); version 1.1.0 - with Python 3.6.2, CUDA 10.1 and CuDNN 7.0

PyTorch 0.3.0:

- `pytorch-0.3.0_python-3.6.2_cuda-8.0` (January 2018); version 0.3.0.post4 - with Python 3.6.2, CUDA 8.0 and CuDNN 7.0
- `pytorch-0.3.0_python-2.7.6_cuda-8.0` (January 2018); version 0.3.0.post4 - with Python 2.7.6, CUDA 8.0 and CuDNN 7.0

Usage:

```
(JESSIE)leontovyc_roman@tarkil:~$ module add pytorch-1.1.0_python-3.6.2_cuda-10.1
(JESSIE)leontovyc_roman@tarkil:~$ python -c 'import torch; print(torch.__version__);'
1.1.0
```

