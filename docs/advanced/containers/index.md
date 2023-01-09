# Containerization

## Singularity

Singularity is a free, cross-platform and open-source computer program that performs operating-system-level virtualization also known as containerization.

Singularity is able to support natively high-performance interconnects, such as InfiniBand[24] and Intel Omni-Path Architecture (OPA). It also has native support for Open MPI library by utilizing a hybrid MPI container approach where OpenMPI exists both inside and outside the container. Singularity can import Docker images without having Docker installed or being a superuser.

Unlike Docker, Singularity was designed do fit the high-performance computing (HPC) needs. HPC environments are typically multi-user systems where users should only have access to their own data. For all practical purposes, Docker gives superuser privileges. Singularity, on the other hand, runs under user identity. It blocks privilege escalation inside containers by using an immutable single-file container format that can be cryptographically signed and verified.

Singularity is installed on all MetaCentrum and Cerit nodes.

### Freely accessible Singularity images

MetaCentrum offers a couple of ready-to-use Singularity images for our users. Individual images are placed in the appropriate folder and the directory structure is shown below.

    /cvmfs/singularity.metacentrum.cz/
    │
    ├── FEFLOW/ # FEFLOW is a computer program for simulating groundwater flow, mass transfer and heat transfer in porous media and fractured media
    │
    ├── KKY/ # Tools prepared for the Department of Cybernetics (KKY) at the University of West Bohemia in Pilsen
    │
    ├── NGC/ # GPU-tuned frameworks for deep learning packed as containers under NVIDIA GPU CLOUD (NGC), including NAMD3, OpenCV, PyTorch, qEspresso, TensorFlow 
    │
    ├── NVIDIA_HPC_SDK/ # A Comprehensive Suite of Compilers, Libraries and Tools for HPC
    │
    ├── OpenFOAM/ # OpenFOAM is capable of simulating anything from complex fluid flows involving chemical reactions, turbulence and heat transfer, to solid dynamics, electromagnetics and the pricing of financial options
    │
    ├── Peregrine/ # Peregrine is a fast genome assembler for accurate long reads
    │
    ├── RNApeg/ # RNApeg is an RNA junction calling, correction, and quality-control package
    │
    ├── RStudio/ # Integrated development environment (IDE) for R
    │
    └── TE-Tools/ # Dfam TE Tools is a container that includes RepeatMasker, RepeatModeler, and coseg

Singularity images (.sif files) in each folder can be listed by ls command. For example ls /cvmfs/singularity.metacentrum.cz/NGC/

### Basic usecases

Some basic usecases covering the singularity usage are below. Please note, that mentioning all nuances (especially usage of various versions of MPI or running parallel job on different infiniband HW) is beyond scope of this section.

#### Interactive session

    [dexter@ungu1 ~]$ singularity shell my_image.img
    Singularity: Invoking an interactive shell within container...
    (SINGULARITY_JESSIE)dexter@ungu1:~$

#### Running command

    [dexter@ungu1 ~]$ singularity exec my_image.img bash -c "java -version"
    java version "1.8.0_60"
    Java(TM) SE Runtime Environment (build 1.8.0_60-b27)
    Java HotSpot(TM) 64-Bit Server VM (build 25.60-b23, mixed mode)

#### PBS Pro: singularity interactive session

    qsub -I -l select=1 -l walltime=24:00:00 -- /usr/bin/singularity shell my_image.img

#### PBS Pro: running script inside singularity container

    qsub -l select=1 -l walltime=24:00:00 -- /usr/bin/singularity exec -B /path/to/script:/home/username/script.sh my_image.img bash -c "/home/username/script.sh"

The `-B /path/to/script:/home/username/script.sh` option will bind the host directory (/path/to/script) to container directory (in this example /home/username). Without this option, the container will automatically bind to itself host directories on computational node where the job is run and the script may not be found.

#### PBS Pro: running parallel job using singularity

The scenario for this setup is: two nodes with common scratch dir

    #!/bin/bash
    #PBS -l select=2:ncpus=2:mem=1gb:scratch_shared=4gb
    #PBS -l walltime=04:00:00
    #PBS -l place=scatter
    # modify/delete the above given guidelines according to your job's needs

    module add openmpi-2.0.1-gcc
    cat $PBS_NODEFILE |uniq >nodes.txt

    # run job over ethernet or infiniband (mpirun autoselects better)
    mpirun -n 2 --hostfile nodes.txt singularity exec my_image.img /path/to/program

More information about parallelization and different setups (specially for programs supporting MPI and OpenMP together) can be found in Parallelization.

#### Starting docker image

    qsub -l select=1 -l walltime=24:00:00 -- /usr/bin/singularity exec docker://ubuntu:latest echo "Hello Dinosaur!"

#### Preparing your own singularity image

Preparing your own singularity image is intended for experienced users. Root privileges are needed or you can use system with User Namespace Remapping. Reading singularity documentation Singularity documentation is a good idea too :) In general, you do not need root privileges if you can (re)use existing docker image.

Without root privileges you prepare singularity image from Docker image as:

    singularity build image.img docker://tensorflow/tensorflow:latest

However, if you want to change something or make your own image from scratch, you'll need root privileges.
builder.metacentrum.cz

Builder.metacentrum.cz is server with User Namespace Remapping intended for Metacentrum users who need to build custom images. Users must apply for membership in group builders at meta@cesnet.cz.

Image file is read-only and to modify it you have to use sandbox directory. In this example we use Debian Buster docker image.

    singularity build -f -s test1.sbox docker://debian:buster

After running container from sandbox, you can make changes via package system, compile the source codes, install pip/conda modules etc. In this example we install ffmpeg package in Debian Buster environment.

    singularity shell -f -w test1.sbox
    Singularity> apt update && apt install ffmpeg
    Singularity> exit

Build image from sandbox:

    singularity build -f test1.SIF test1.sbox

For repeatable build of image you can use the definition file, example test1.def

    Bootstrap: docker
    From: debian:buster
    %post
    apt-get update && apt-get install -y ffmpeg

Build image from recipe file:

    singularity build –f test1.SIF test1.def

For more details see `https://sylabs.io/guides/3.7/user-guide/definition_files.html`.

#### Starting application docker image

The Docker download instructions of the type

docker pull sangerpathogens/circlator

are in Singularity replaced as

singularity pull docker://sangerpathogens/circlator

This command will create `circlator_latest.sif`, a singularity image of docker image. The Docker mounting command of the type

    docker run -v /home/ubuntu/data:/data sangerpathogens/circlator

are in Singularity replaced by

    mkdir circ_read; singularity run -B ./circ_read/:/data ./circlator_latest.sif

where `circ_read` is folder used for getting data into image. By running the command you are in the image and using df -h you can check that the folder is mounted.

If you need to explore the content of the Singularity image (.sif file) interactively, use the -C flag.

    singularity shell -C ./circlator_latest.sif

To run script or command, eg. here circlator, in the image you can use

    singularity exec -B ./circ_read/:/data ./circlator_latest.sif "circlator"

inside the quotes, there is command that will be run inside the image. If you are using binding of specific directory (mostly containing input and output data), use absolute paths to the inputs (eg. /data/some.fasta) that are used as command parameters. After the exec you are back in standard environment (outside the image), here you must such paths (eg. circ_read).

For more details see [https://www.sylabs.io/guides/3.7/user-guide/singularity_and_docker.html](https://www.sylabs.io/guides/3.7/user-guide/singularity_and_docker.html).

#### Environment Settings (optional)

Before you start Singularity you may need to set:

    export SINGULARITY_CACHEDIR="/storage/..."
    export SINGULARITY_LOCALCACHEDIR="/scratch...."
    export SINGULARITY_TMPDIR=""
    # Than you can start Singularity
    singularity build ...

    CACHEDIR -- downloaded layers
    LOCALCACHEDIR -- run shell exec
    TMPDIR -- squashfs and temporary files, there is limit 1GB by default, if you need more use scratch

Documentation: [https://sylabs.io/docs/](https://sylabs.io/docs/).

License: [https://raw.githubusercontent.com/singularityware/singularity/development/LICENSE.md](https://raw.githubusercontent.com/singularityware/singularity/development/LICENSE.md). 

## Docker

!!! todo
    Docker supported in MetaCentrum in the future?









