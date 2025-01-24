# NVidia GPU cloud

NVIDIA provides GPU-tuned frameworks for deep learning packed as Docker containers under [NVIDIA GPU CLOUD (NGC)](https://ngc.nvidia.com/).

NGC containers are released monthly (RR.MM). You can find changelog and HW/driver support matrix at [Support Matrix](https://docs.nvidia.com/deeplearning/frameworks/support-matrix/index.html).

NGC images are available on Docker Hub and saved as Singularity images in CVMFS instance mounted on `/cvmfs/singularity.metacentrum.cz/NGC`. The Singularity images stored on cvmfs are faster to use than running container directly from Docker Hub, in which case you have to rebuild first to Singularity image format.

[Deep learning frameworks documentation](https://docs.nvidia.com/deeplearning/frameworks/index.html):

-  [Kaldi](https://docs.nvidia.com/deeplearning/frameworks/kaldi-release-notes/index.html)
-  [MXNet](https://docs.nvidia.com/deeplearning/frameworks/mxnet-release-notes/index.html)
-  [NVCaffe](https://docs.nvidia.com/deeplearning/frameworks/caffe-release-notes/index.html)
-  [PyTorch](https://docs.nvidia.com/deeplearning/frameworks/pytorch-release-notes/index.html)
-  [TensorFlow](https://docs.nvidia.com/deeplearning/frameworks/tensorflow-release-notes/index.html)

## Run as Singularity image

To use local cvmfs instance, first automount the filesystem by command:

    ls /cvmfs/singularity.metacentrum.cz

Currently there are NGC images of TensorFlow v1/v2 and PyTorch in more versions, which requires at least version 6.0 of compute capabilities and CUDA version 11. It means you have to use `gpu_cap=cuda60` and `cuda_version=11.0` in your PBS job.

In general, the Singularity is run as singularity `run image.SIF` or `singularity shell image.SIF` command plus other options.

- `run` will launch container; in case of frameworks there is usually available Jyputer notebook or Jupyter Lab
- `shell` will launch interactive shell
- `exec` will run a particular command

### From CVMFS as interactive job

Start interactive job:

    qsub -I -l select=1:mem=16gb:scratch_local=10gb:ngpus=1:gpu_cap=cuda60:cuda_version=11.0 -l walltime=4:00:00

Run singularity image with shell:

    singularity shell --nv /cvmfs/singularity.metacentrum.cz/NGC/PyTorch\:20.09-py3.SIF

You will get a shell inside container and it is ready to run commands, e.g.:

    Singularity> python -c  'import torch; print(torch.cuda.get_device_properties(0))'
    _CudaDeviceProperties(name='Tesla T4', major=7, minor=5, total_memory=15109MB, multi_processor_count=40)

### From CVMFS as regular batch job

Prepare e.g. runPyTorch\_job.sh script to run calculation within PyTorch image:

```
#!/bin/bash
#PBS -N PyTorch_Job
#PBS -l select=1:ncpus=1:mem=16gb:scratch_local=10gb:ngpus=1:gpu_cap=cuda60
#PBS -l walltime=4:00:00
#PBS -m ae
singularity run --nv /cvmfs/singularity.metacentrum.cz/NGC/PyTorch\:20.09-py3.SIF /your/work_dir/run_script.sh
```

Submit the script in usual way:

    qsub runPyTorch_job.sh

### From dockerhub as interactive job

It is also possible to run NGC images directly from Docker Hub using interactive job.

    qsub -I -l select=1:mem=16gb:scratch_local=10gb:ngpus=1:gpu_cap=cuda60:cuda_version=11.0 -l walltime=4:00:00

Within the interactive job, first create **tmp directory** within scratch directory and set `SINGULARITY_TMPDIR` to this director. Default `/tmp` has limited quota.

    mkdir $SCRATCHDIR/tmp
    export SINGULARITY_TMPDIR=$SCRATCHDIR/tmp

The run singularity with Docker Hub URL:

    singularity shell --nv docker://nvcr.io/nvidia/pytorch:20.09-py3

### Re-running image from Singularity cache

During the first run, layers of image will be downloaded into cache and the image will be built. From the second run onward, Singularity will restart the image from cache if possible.

By default the layers are cached to `~/.singularity/cache/` directory.

You can clean cache with `singularity cache clean`.

## Notes

- Directories `/storage`, `/auto` and `home` are binded inside container by default.
- Add `--nv` argument to singularity for GPU computing.
- Versions of NGC images requiring CUDA version higher than 11.0 are not supported (see https://metavo.metacentrum.cz/pbsmon2/props and search for cuda\_version)
- Customizing images is possible. See Singularity
- In case you would add NGC image or your own image to cmvfs, write ticket to meta@cesnet.cz.

### Get NGC API key

If you have not done so already, you need to register first at [https://ngc.nvidia.com](https://ngc.nvidia.com) to get NGC API key. After you log in, you can find this API key under the Setup menu in you personal tab.

### Build Singularity image

Building the image is a resource-intensive process and must be done as interactive job with large enough scratch (at least 10 GB). **Some temporary directories are by default bound to `/tmp`, which has a limited user quota on MetaCentrum.** Therefore you should **bind them to scratch directory instead**.

Example of script to build image from NGC:

    #/bin/bash
    export NGCDIR="/storage/brno2/home/melounova/ngc_sandbox" # directory where the image will go
    export SINGULARITY_DOCKER_USERNAME='$oauthtoken'
    export SINGULARITY_DOCKER_PASSWORD=Yj..........Az # API Key you get after logging in at https://ngc.nvidia.com/
    export SINGULARITY_CACHEDIR="/storage/brno2/home/melounova/.singularity" # the cache dir must exist
    mkdir $SCRATCHDIR/tmp
    export SINGULARITY_TMPDIR=$SCRATCHDIR/tmp 
    export SINGULARITY_LOCALCACHEDIR="$SCRATCHDIR"
    
    singularity -v build $NGCDIR/TensorFlow.simg docker://nvcr.io/nvidia/tensorflow:20.03-tf2-py3 # build the image TensorFlow.simg

It is possible to create custom images derived from NGC images. See Singularity how to do it.

### Job scripts for JupyterLab

We have prepared job scripts for JupyterLab inside container with TensorFlow and Pytorch. See scripts in `/cvmfs/singularity.metacentrum.cz/NGC`.

    JupyterLabPyTorch_Job.sh
    JupyterLabTensorFlow1_Job.sh # run JupyterLab with TensorFlow v.1
    JupyterLabTensorFlow2_Job.sh # run JupyterLab with TensorFlow v.2

In the header of scripts, you can change PBS parameters. Run the selected script in PBS, e.g.:

    qsub JupyterLabPyTorch_Job.sh

After the job starts you will get email with **URL** and **password** where JupyterLab is running. 
