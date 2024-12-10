# Mamba

    module avail mambaforge/

[Mamba](https://mamba.readthedocs.io/en/latest/user_guide/mamba.html) is an open-source package management and environment management system that is commonly used in the Python programming ecosystem. 

Mamba is a re-implementation of [Conda](../../../software/sw-list/conda-modules) written in C++, offering some benefits.
- Parallel downloading of repository data and package files using multi-threading.
- Libsolv for much faster dependency solving.
- C++ implementation for maximum efficiency.

The syntax of `mamba` commands is basically the same as that of [Conda](../../../software/sw-list/conda-modules). Mamba utilises the same command line parser, package installation code and transaction verification routines as conda to stay as compatible as possible.

    conda env list			vs.	mamba env list
    conda create --prefix...	vs. 	mamba create --prefix...
    conda activate /storage/...	vs.	mamba activate /storage/...
    conda deactivate		vs.	mamba deactivate

!!! tip
    We would like to encourage users to use Mamba as a primary tool to invoke and install environments. Module `mambaforge` can even access environments installed in `conda-modules`, and thus can act as a full replacement of `conda-modules` module.

!!! warning
    Avoid combining Mamba environments with traditional modules in a single session. Doing so can often lead to conflicts and application malfunctions.

## Usage

### Use existing environment

The basic commands are:

    module add mambaforge     # load the module
    mamba env list            # list installed environments
    mamba activate busco      # activate an environment (e.g. busco)
    mamba --help              # use selected application
    mamba deactivate          # quit

### Install new environment

See [How to install Conda/Mamba packages](../../../software/install-software#condamamba-packages).
