# Containers

![pic](/software/containers/singularity-logo.png)

!!! abstract "What are containers"
    *Containerization* is a software deployment process that bundles an application's code with all the files and libraries it needs to run on any infrastructure. It makes the application less dependent on the OS and system-wide installed libraries. A particular application packed together with its libraries and other files is a *container*. 

[Apptainer (former Singularity)](https://apptainer.org/docs-legacy) is an open-source program for containerization used in MetaCentrum.

Apptainer is invoked by command `singularity`.

Apptainer images (= containers) are commonly suffixed by `.sif`.

**Apptainer can import Docker images without having Docker installed or being a superuser** <br/>- see [the Docker part](#use-docker-image).

## Apptainer environment variables

Apptainer employs a few *paths* to store various temporary files:

- `CACHEDIR`:
- `LOCALCACHEDIR`:
- `TMPDIR`: 


bla bla

    export SINGULARITY_CACHEDIR="/storage/..."
    export SINGULARITY_LOCALCACHEDIR="/scratch...."
    export SINGULARITY_TMPDIR=""
    # Then you can start Apptainer
    singularity build ...

- `CACHEDIR` - downloaded layers
- `LOCALCACHEDIR` - run shell exec
- `TMPDIR` - squashfs and temporary files, there is limit 1GB by default, if you need more use scratch

Documentation: [https://sylabs.io/docs/](https://sylabs.io/docs/).

## Apptainer usage

In the basic usecases of Apptainer images covered below we suppose there already exists an image `my_image.sif` we intend to use. 

**List options**

To list all commands, run

    singularity

or

    singularity --help

on command line.

**Run a command in container**

Passing a command to an Apptainer image is done by `singularity exec "command"`.

For example,

    (BULLSEYE)user123@skirit:~$ singularity exec my_image.sif bash -c "java -version"
    java version "1.8.0_60"

**Open shell in container**

You can also open a shell within a container to work interactively. This is done by `singularity shell` command.

For example,

    (BULLSEYE)user123@skirit:~$ singularity shell my_image.sif
    Singularity> command_1
    Singularity> command_2
    ...
    Singularity> command_N

!!! warning "Do not use frontends for serious containers' usage"
    Apart from light testing and learning, running containers right on frontends is equivalent to **computing on frontend**. This is strongly discouraged. **For a serious work with containers, use interactive or batch job.**

**Use container in interactive job**

First run interative job *with scratch directory*:

    qsub -l select=1:scratch_local=10gb -l walltime=24:00:00

!!! question "What is the scratch directory good for?"
    You may need to redirect some Apptainer environment variables to store temporary files. To point them to `SCRATCHDIR` is one option. Alternatively you may redirect the Apptainer variables to some folder in your home.

Redirect `CACHEDIR` and `LOCALCACHEDIR` to `SCRATCHDIR`:

    user123@node123:~$ export CACHEDIR=$SCRATCHDIR
    user123@node123:~$ export localCACHEDIR=$SCRATCHDIR

Then run the container and open a shell within the container for interactive work:

    user123@node123:~$ singularity shell my_image.sif
    Singularity> command_1
    Singularity> command_2
    ...
    Singularity> command_N

**Use container in bash job**

    qsub -l select=1 -l walltime=24:00:00 -- /usr/bin/singularity exec -B /path/to/script:/home/username/script.sh my_image.img bash -c "/home/username/script.sh"

The `-B /path/to/script:/home/username/script.sh` option will bind the host directory (`/path/to/script`) to container directory (in this example `/home/username`). Without this option, the container will automatically bind to itself host directories on computational node where the job is run and the script may not be found.

**PBS Pro: run parallel job**

The scenario for this setup is: two nodes with common scratch dir

```
#!/bin/bash
#PBS -l select=2:ncpus=2:mem=1gb:scratch_shared=4gb
#PBS -l walltime=04:00:00
#PBS -l place=scatter
# modify/delete the above given guidelines according to your job's needs

module add openmpi-2.0.1-gcc
cat $PBS_NODEFILE |uniq >nodes.txt

# run job over ethernet or infiniband (mpirun autoselects better)
mpirun -n 2 --hostfile nodes.txt singularity exec my_image.img /path/to/program
```

## Pre-built Apptainer images

MetaCentrum offers a couple of ready-to-use Apptainer images for our users. Individual images are placed in the appropriate folder and the directory structure is shown below.

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

Apptainer images (.sif files) in each folder can be listed by `ls` command, e.g. `ls /cvmfs/singularity.metacentrum.cz/NGC/`.

## Custom Apptainer build

Preparing your own singularity image is intended for experienced users. Root privileges are needed or you can use system with User Namespace Remapping. Reading [Apptainer documentation](https://apptainer.org/docs-legacy) is a good idea too. 

`builder.metacentrum.cz` is server with User Namespace Remapping intended for Metacentrum users who need to build custom images. 

!!! warning 
    To access `builder.metacentrum.cz`, users must apply for membership in group "builders" at <meta@cesnet.cz>.

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

For more details see [https://sylabs.io/guides/3.7/user-guide/definition\_files.html](https://sylabs.io/guides/3.7/user-guide/definition_files.html).

## Docker images

For safety reasons, **running Docker images directly is not possible on Metacentrum nodes**.

If you want to use a Docker image, either

- run it on Apptainer as described [above](#Use Docker image), or
- use [Kubernetes service](http://docs.cerit.io/) specialized to run Docker images.

### Run Docker image in Apptainer

In general, you do not need root privileges if you can (re)use existing docker image.

Without root privileges you prepare singularity image from Docker image as:

    singularity build image.img docker://tensorflow/tensorflow:latest

However, if you want to change something or make your own image from scratch, you'll need root privileges.

Start docker image as:

    qsub -l select=1 -l walltime=24:00:00 -- /usr/bin/singularity exec docker://ubuntu:latest echo "Hello Dinosaur!"

The Docker download instructions of the type

    docker pull sangerpathogens/circlator

are in Apptainer replaced as

    singularity pull docker://sangerpathogens/circlator

This command will create `circlator_latest.sif`, a singularity image of docker image. The Docker mounting command of the type

    docker run -v /home/ubuntu/data:/data sangerpathogens/circlator

are in Apptainer replaced by

    mkdir circ_read; singularity run -B ./circ_read/:/data ./circlator_latest.sif

where `circ_read` is folder used for getting data into image. By running the command you are in the image and using `df -h` you can check that the folder is mounted.

If you need to explore the content of the Apptainer image (.sif file) interactively, use the `-C` flag.

    singularity shell -C ./circlator_latest.sif

To run script or command, eg. here circlator, in the image you can use

    singularity exec -B ./circ_read/:/data ./circlator_latest.sif "circlator"

inside the quotes, there is command that will be run inside the image. If you are using binding of specific directory (mostly containing input and output data), use absolute paths to the inputs (eg. /data/some.fasta) that are used as command parameters. After the exec you are back in standard environment (outside the image), here you must such paths (eg. `circ_read`).

For more details see [https://www.sylabs.io/guides/3.7/user-guide/singularity\_and\_docker.html](https://www.sylabs.io/guides/3.7/user-guide/singularity_and_docker.html).

### Example

Let's say you want to run [Chronusq tool](https://urania.chem.washington.edu/chronusq/chronusq_public), an quantum chemical software package.

This is a small tool and can be compiled directly on the frontend. The resulting `.sif` image will be about 166 MB large.

Alternatively you can setup and interactive job and work from within the job.

First set path for temporary files:
(Default is `/tmp` which has quota of only 1 GB.)

    export SINGULARITY_TMPDIR=/storage/CITY_XY/home/user123/

If you work within interactive job, then

    export SINGULARITY_TMPDIR=$SCRATCHDIR

Next, download Docker image and build

    singularity pull docker://uwligroup/chronusq

After ca 5 minus the singularity image `chronusq_latest.sif` will be ready.

To test the image, download water molecule `water.inp` from [here](https://urania.chem.washington.edu/chronusq/chronusq_public/-/wikis/examples/HF-Energy) or copy from here:

```
[Molecule]
charge = 0
mult = 1
geom:
 O     0.0     -0.076    0.0
 H     0.867    0.601    0.0
 H    -0.867    0.601    0.0


[QM]
reference = Real RHF
job = SCF

[BASIS]
basis = 6-31G(d)

[MISC]
nsmp = 1
mem = 100 MB
```

and run the calculation of single-point ground state energy as

    singularity exec chronusq_latest.sif chronusq water.inp

<!--
ODSTRANIT AZ NEBUDE RELEVANTNI
Relevantni tickety z RT:
-->

- [ticket](https://rt.cesnet.cz/rt/Ticket/Display.html?id=1130342)
- [ticket](https://rt.cesnet.cz/rt/Ticket/Display.html?id=1113656)
- [ticket](https://rt.cesnet.cz/rt/Ticket/Display.html?id=1084270)
