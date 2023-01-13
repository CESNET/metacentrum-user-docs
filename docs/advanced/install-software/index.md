# Install software

!!! note
    Nebudeme uvadet navod jak instalovat do systemovych adresaru AFS a vytvaret modulefily.

## Options

### Install on your own 

This means you select any place in any of your homes and install the executable there. 

    user213@any_frontend:/storage/CITY/home/user123/my_fancy_sw/executable_file

Then you run the calculation as

    /storage/CITY/home/user123/my_fancy_sw/executable_file input.inp ...

We recommend this option in case:

- you are not sure whether this software will be useful to you and want to test it first,
- the calculations run with this software will run hours rather than days and weeks,
- as far as you know, there are no other users who would like to use this software,
- the installation process seems to be manageable with your skills,
- you do not want to interact with User support in any way.

!!! warning 
    With software installed in your home directory, the availability is limited compared to system installation. In case of disk arrays failure, the installed software may become unavailable.

### Ask us to do it

This means that upon request sent to <meta@cesnet.cz> we install the software to system directories and make a modulefile available to use.

We recommend this option in case:

- it is a new version of already installed and/or commonly used software in MetaCentrum,
- you are confident about the new software's usability,
- you know the software will be useful to more users,
- you are not able to go through the installation on your own and need help. 

**How to write software install request**

There exists plethora of scientific software, sometimes with identical names. If you want us to install something, please give us as much of the following as possible:

1. Software name (**required**),
2. Version ("latest" or specific version) (**required**),
3. Link to where the source can be downloaded from (**required**),
4. Link to documentation,
5. Link to installation guide (if there is any) ,
6. Link to test suite or an example calculation (if there is any),
7. Any dependencies, modules or optional parts you need to be compiled together with the main software (if there are any).

## Examples

### Binaries

Some software is available only as ready-made binary file. In this case the only thing you need to do is to download and unpack the files.

Example: 

    user123@skirit:~$ mkdir satsuma ; cd satsuma # prepare dir for software "satsuma"
    user123@skirit:~/satsuma$ wget https://github.com/bioinfologics/satsuma2/releases/download/untagged-2c08e401140c1ed03e0f/satsuma2-linux.tar.gz # download it
    user13@skirit:~/satsuma$ tar -xvf satsuma2-linux.tar.gz # unpack it
    user13@skirit:~/satsuma$ cd product/bin ; ls # see the executables 

### Conda packages


[Conda](https://conda.io) is an open-source, cross-platform, language-agnostic package manager and environment management system. MetaCentra users can use conda and create new environments on their own and install application tools from various channels. The most straightforward way how to install the required tool is via the general module `conda-modules-py37` in the user's home directory.

    module add conda-modules-py37
    conda --help
    conda create --help
    conda install --help
    ... etc

The following tutorial will briefly explain all the necessary steps on how to create and activate a new conda environment and install the selected application tool. As an example, we will install [BLAST](https://anaconda.org/bioconda/blast) from the Bioconda channel. Detailed information can be found in the [official documentation](https://conda.io/projects/conda/en/latest/user-guide/tasks/manage-environments.html).

    module add conda-modules-py37
    conda create --prefix /storage/city/home/user_name/my_blast_env

First of all, load module conda-modules-py37. The second command will create a new environment (basically a new folder with some necessary components) named `my_blast_env` in the specified path.

Absolute or relative paths can be used, and folder name can be changed at will. The default python version is 3.6. If needed, a different python version can be installed by the python flag. E.g. `conda create --prefix ... my_blast_env python=3.10`. When the new environment is created, it has to be activated before the installation.

    conda activate /storage/city/home/user_name/my_blast_env
   conda install -c bioconda blast

After the installation, everything is ready, and a new tool can be immediately used. When the calculation is finished, the loaded environment should be deactivated.

    blastn -db DATABASE_NAME -query INPUT_FASTA -out OUTPUT_NAME ...
    conda deactivate

Later on, within interactive and/or batch jobs, just activate the already existing environment and start the calculation:

    module add conda-modules-py37
    conda activate /storage/city/home/user_name/my_blast_env
    blastn ...
    conda deactivate 

Alternativelly, the creation of a new environment and the installation can be done by one command:

    conda create -n my_blast_env -c bioconda blast

In this case, the environment can be created only without the path specification (`/` character is not allowed) and will be placed in the home directory in a hidden folder `.conda`.

All available environments (prepared by MetaCentrum admins and by user) can be listed by the command:

    conda env list

If for some reason the general conda installation is not suitable enough, users can use the local installation of [miniconda](https://docs.conda.io/en/latest/miniconda.html) client. Miniconda is a free minimal installer for conda. It is a small, bootstrap version of Anaconda that includes only conda, Python, the packages they depend on, and a small number of other useful packages, including pip, zlib and a few others.

    wget https://repo.anaconda.com/miniconda/Miniconda3-py39_4.12.0-Linux-x86_64.sh
    bash Miniconda3-py39_4.12.0-Linux-x86_64.sh
    # and follow the interactive installation procedure

Miniconda contains the conda package manager and Python. Once Miniconda is installed, you can use the conda command to install any other packages and create environments as usual.

    /storage/city/home/user_name/miniconda3/bin/conda --help

During the installation of huge and complex packages, native conda can be very slow, especially in *Solving environment* phase. To speed up the entire installation process, users can use the mamba installer, which is a reimplementation of the conda package manager with the same functionalities and syntax but much faster. There are two easy ways how to use [mamba](https://mamba.readthedocs.io/en/latest/index.html) (instead of conda) or [micromamba](https://mamba.readthedocs.io/en/latest/user_guide/micromamba.html) (instead of miniconda), respectively.

**Usage of mamba in conda environments**

A quite direct usage of mamba is to create a conda environment as described before and install mamba prior to the installation of the required tool.

    module add conda-modules-py37
    conda create --prefix /storage/city/home/user_name/my_env
    conda activate /storage/city/home/user_name/my_env
    conda install -c conda-forge mamba
    mamba install some_tool
    # perform your calculation
    conda deactivate

The installation of mamba is fast, and following speed up is significant. For the installation of other tools just replace "conda" by "mamba", further syntax is the same. 100% compatibility between conda and mamba can not be guaranteed, but in most cases it works well.

**Mamba from the module**

Possibly users can directly use mamba from the module `mambaforge-22.9.0`

    module add mambaforge-22.9.0
    mamba create ...

**Usage of micromamba**

Micromamba supports a subset of all mamba or conda commands and is distributed as a stand-alone precompiled binary. Basic but fully functional usage should be as follow.

    module add micromamba-1.1.0
    # load micromamba installed in MetaCentrum
    
    micromamba info
    # show information about micromamba configuration
    
    micromamba config append channels conda-forge
    micromamba config append channels bioconda
    # for more convenient future usage, the user can set some default channels; conda-forge and bioconda are pretty popular
    
    micromamba create -n my_new_env
    # create a new and empty environment; the name should be changed at will
    
    micromamba env list
    # show a list of all available environments
    
    micromamba activate my_new_env
    # activate the selected environment
    
    micromamba install blast=2.12.0
    # now it is possible to install specific tool, for example blast version 2.12.0
    
    # if the appropriate channels were not previously set as default, they would have to be additionally specified using the -c flag in micromamba install command
    micromamba install -c bioconda -c conda-forge blast=2.12.0
    
    blastn --help
    # run the calculation
    
    micromamba deactivate
    # leave the activated environment

<!--
Example:

To install Conda package "segemehl": 
    
    module add conda-modules-py37
    # create new Conda environment called segemehl-0.3.4 (with python 3.8)
    conda create --prefix /storage/city/home/user_name/segemehl-0.3.4 python=3.8 -y
    # activate the environment
    conda activate /storage/city/home/user_name/segemehl-0.3.4
    # install the package
    conda install -c bioconda -c conda-forge segemehl -y
    # leave the environment
    conda deactivate

Activation of this environment (e.g. within batch jobs) is as:

    module add conda-modules-py37
    conda activate /storage/city/home/user_name/segemehl-0.3.4
    segemehl.x ... # run the job
    conda deactivate

Hezky popsane v listkach: 
https://rt.cesnet.cz/rt/Ticket/Display.html?id=1103181
https://rt.cesnet.cz/rt/Ticket/Display.html?id=1120618
-->

<!--
### Pip install

How to install using pip
https://rt.cesnet.cz/rt/Ticket/Display.html?id=1128040
https://rt.cesnet.cz/rt/Ticket/Display.html?id=1125154
https://rt.cesnet.cz/rt/Ticket/Display.html?id=918582
https://rt.cesnet.cz/rt/Ticket/Display.html?id=793931

### Containers

How to install something delivered as Docker / Singularity (Apptainer) container

### Compile from source

The hardest way...

-->


