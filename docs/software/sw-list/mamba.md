# Mamba

    module avail mambaforge/

[Mamba](https://mamba.readthedocs.io/en/latest/user_guide/mamba.html) is an open-source package management and environment management system that is commonly used in the Python programming ecosystem. 

Mamba is closely related to [Conda](../../../software/sw-list/conda-modules). The syntax of `mamba` commands is basically the same as that of [Conda](../../../software/sw-list/conda-modules).

!!! tip
    We urge users to use Mamba as a primary tool to invoke and install environments. Module `mambaforge` can even access environments installed in `conda-modules`, and thus can act as a full replacement of `conda-modules` module.

!!! warning
    Avoid combining Mamba environments with traditional modules in one session. Often it can lead to various conflicts and application malfunctions.

## Usage

### Use existing environment

The basic commands are:

    module add mambaforge     # load the module
    mamba env list            # list installed environments
    mamba activate busco      # activate an environment (e.g. busco)
    mamba --help              # use selected application
    mamba deactivate          # quit

### Install new environment

See [How to install Conda/Mamba packages](../../../software/install-software/#condamamba-packages).
