# Install software

## General options

### Local installation

*This option means that the user installs the desired software by his/her own means anywhere into his/her home directory.*

**Variant 1: install from within interactive job (>= 5 min lasting installation)**

    # first start an interactive job with scratch directory
    qsub -I -l select=1:ncpus=1:mem=4gb:scratch_local=10gb -l walltime=2:00:00

    # after the job starts, redirect temporary files into scratch
    mkdir $SCRATCHDIR/tmp
    export TMPDIR=$SCRATCHDIR/tmp

    # make an installation directory anywhere in your home
    mkdir /storage/CITY_XY/home/user123/my_fancy_sw 

    # then install into this directory
    cd /storage/CITY_XY/home/user123/my_fancy_sw 
    install ...

**Variant 2: install without interactive job (<= 5 min lasting installations ONLY)**

    # first redirect temporary files into any directory in your home
    mkdir /storage/city_XY/home/user123/tmp
    export /storage/city_XY/home/user123/tmp

    # make an installation directory anywhere in your home
    mkdir /storage/CITY_XY/home/user123/my_fancy_sw 

    # then install into this directory
    cd /storage/CITY_XY/home/user123/my_fancy_sw 
    install ...

!!! question "why do I have to redirect to TMPDIR?"
    By default the variable TMPDIR points to system directory `/tmp`. This directory is writable to all, but users have a small quota of only 1 GB in `/tmp`. Therefore installations with default value of TMPDIR often fail due to insufficient space.

**Features of local installation:**

- no need to contact user support, to wait or to ask for aything (unless help is needed),
- if the `CITY_XY` storage is down, the software will not be available,
- it is up to user to figure out how to install the software,
- suitable for cases when the installation works out-of-the-box and the user wants to try the software ASAP. 

**We recommend this option in case:**

- you are not sure whether this software will be really useful and want to test it first,
- the calculations run with this software will take hours rather than days and weeks,
- as far as you know, there are no other users who would like to use this software,
- the installation process seems to be manageable with your skills,
- you do not want to interact with User support in any way.

!!! warning 
    With software installed in your home directory, the availability is limited to the availability of that particular `/storage/city_XY`. That is why, in case you have tested the software and intend to use it for **long running jobs**, we encourage users to ask us for system wide installation. 

!!! tip
    Often users try to install a minor and easy-looking software locally and fail. **This is very common.** If this happens (and you still want to keep the installation to your home directory), do not hesitate to contact User support at <meta@cesnet.cz> for help. They will reproduce the errors you get, find a solution and send it back to you in step-by-step guide. *Any installation process, no matter how straightforward it looks at the beginning, can get tricky.*

### System-wide installation

*This option means that the user sends request for software installation to <meta@cesnet.cz>. The User support team will install the software into system directories and make a modulefile through which the software can be loaded.* 

**Features of system-wide installation:**

- you have to contact user support and wait for several days before the thing is done (hours if you are lucky, but most often several days),
- no need to go into the installation process peculiarities,
- availability of the software is independent on particular `/storage` availability.

**We recommend this option in case:**

- it is a new version of already installed and/or commonly used software in MetaCentrum,
- you are confident about the new software's usability,
- you know the software will be useful to more users.

**How to write software install request**

There exists plethora of scientific software, sometimes with identical names. If you want us to install something, please give us as much of the following as possible:

1. Software name (**required**),
2. Version ("latest" or specific version) (**required**),
3. Link to where the source can be downloaded from (**required**),
4. Link to documentation,
5. Link to installation guide (if there is any) ,
6. Link to test suite or an example calculation (if there is any),
7. Any dependencies, modules or optional parts you need to be compiled together with the main software (if there are any).

## Common installation methods

When you download a software, it's usually compressed in some way and need to be extracted.

**.tar**

    tar -x -f package.tar 		# extract .tar archive 

**gz**

    gunzip package.gz 			# unzip .gz file

**.tgz, .tar.gz**

    tar -xvf package.tgz 		# unzip tarred and gzipped file
    tar -xvf package.tar.gz 	# dtto

**.zip**

    unzip package.zip 			# unzip .zip file

### Binaries

Some software is available as a ready-made binary file. In this case the only thing you need to do is to download and unpack the files.

    user123@skirit:~$ mkdir binaries ; cd binaries # prepare directory for the software (noc necessarry)
    user123@skirit:~/binaries$ wget https://sw_xy.tgz ; tar -xvf sw_xy.tgz # download and unpack 
    user13@skirit:~/binaries$ chmod 755 exec_file # set the binary to be executable
    user13@skirit:~/binaries$ ./exec_file # run the executable file

*Example: Usage of software "satsuma" distributed as binary file.*

    user123@skirit:~$ mkdir satsuma ; cd satsuma # prepare dir for software "satsuma"
    user123@skirit:~/satsuma$ wget https://github.com/bioinfologics/satsuma2/releases/download/untagged-2c08e401140c1ed03e0f/satsuma2-linux.tar.gz # download it
    user13@skirit:~/satsuma$ tar -xvf satsuma2-linux.tar.gz # unpack it
    user13@skirit:~/satsuma$ cd product/bin ; ls # list and run the executables 

### R packages

To install R packages locally, first create some directory to serve as your local R library:

    mkdir /storage/CITY_N/home/USERNAME/Rpackages/

Then install the package as:

    export R_LIBS_USER="/storage/CITY_N/home/USERNAME/Rpackages"
    module add r/
    R
    >install.packages(PACKAGE_NAME,lib="/storage/CITY_N/home/USERNAME/Rpackages/")

and load the package

    >library(PACKAGE_NAME)

### Python packages

*Example: install software package "spektral".*

First run an interactive job:

```
qsub -I -l select=1:ncpus=1:mem=4gb:scratch_local=10gb -l walltime=2:00:0
```

Then install the package:
```
# store temporary files in SCRATCHDIR
export TMPDIR=$SCRATCHDIR

# load pip module
module add py-pip

# make a local directory to install to
mkdir /storage/cityN/home/user123/my_pip_libs

# ... and tell pip about it
export PYTHONUSERBASE=/storage/cityN/home/user123/my_pip_libs/     

# install spektral and its dependencies
pip3 install spektral --user        

exit
```

To run the package, first find out which python version was used to install the package with:

```
(BULLSEYE)user123@skirit:~$ ls /storage/cityN/home/user123/my_pip_libs/lib/
python3.7
```

Then choose any `python` module version `3.7.x`:

```
module add python/3.7.7-intel-19.0.4-mgiwa7z

# setup system variables 
export PYTHONUSERBASE=/storage/cityN/home/user123/my_pip_libs
export PATH=$PYTHONUSERBASE/bin:$PATH
export PYTHONPATH=$PYTHONUSERBASE/lib/python3.7/site-packages:$PYTHONPATH
```

And use the package:

```
python
>>> import spektral
...
```


### Conda packages

!!! tip
    Some of the most popular Conda packages may be already installed system-wide - see [`conda-modules` page](../../software/sw-list/conda-modules).

**Conda package installers: Conda, Mamba, Micromamba**

[Conda](https://conda.io), avalable through [`conda-modules/` module](../../software/sw-list/conda-modules), is an open-source package management and environment management system that is commonly used in the Python programming ecosystem.

[Mamba](https://anaconda.org/conda-forge/mamba), available through `mambaforge` module, is a package manager and environment manager that is designed to be a faster and more efficient drop-in replacement for Conda. Both Conda and Mamba are closely related, as Mamba was developed as an open-source project to address some of the performance limitations of Conda.

[Micromamba](https://anaconda.org/conda-forge/micromamba), available through `micromamba` module, is a lightweight and resource-efficient alternative to Mamba. Mamba, while faster than Conda, is still a relatively large application. In contrast, Micromamba is built to be more minimalistic and efficient, making it a suitable choice for resource-constrained environments, such as embedded systems or containers.

!!! tip
    We recommend to use `mamba` from `mambaforge` module as a primary installer for new Conda environments - see [example of Conda packages install by Mamba](../../software/install-software/#conda-packages_1). 

*Example: Install package [segemehl](https://anaconda.org/bioconda/segemehl) from Conda repository.*
    
    module add mambaforge
    # create new Conda environment called segemehl-0.3.4 (with python 3.8)
    mamba create --prefix /storage/city/home/user_name/segemehl-0.3.4 python=3.8 -y
    # activate the environment
    mamba activate /storage/city/home/user_name/segemehl-0.3.4
    # install the package
    mamba install -c bioconda segemehl -y
    # leave the environment
    mamba deactivate

Activate this environment (e.g. within batch jobs) as:

    module add mambaforge
    mamba activate /storage/city/home/user_name/segemehl-0.3.4
    segemehl.x ... # run the job
    mamba deactivate

### Containers

Apptainer (Singularity) images can be deployed and run directly on MetaCentrum machines.

If your software is released as Docker container, you have more option.

- **Apptainer** (former Singularity) **image** can be run in MetaCentrum directly, see [Singularity howto](../../software/containers).
- **Docker images** must be translated into an Apptainer image and run [as described in this chapter](../../software/containers/#docker-usage).
- Docker images can be run also via Kubernetes service. See [Kubernetes](https://docs.e-infra.cz/compute/containers/) for instruction.

