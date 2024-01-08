# Conda modules 

    module avail conda-modules/

[Conda](https://docs.conda.io/en/latest/) is an open-source package management and environment management system that is commonly used in the Python programming ecosystem. 

Conda allows you to easily install, update, and manage software packages and libraries, including Python packages, data science libraries, and various dependencies. It handles package dependencies and ensures that software is compatible with your environment.

Conda enables you to create isolated environments (aka Conda environments), where you can work on different projects with different sets of packages and dependencies without conflicts. This helps in maintaining a clean and organized development environment.

Conda is platform-agnostic and can be used on various operating systems, including Windows, macOS, and Linux. This makes it easy to share and reproduce environments across different platforms.

## Usage

!!! warning "Use `conda-modules/*` primarily to invoke some of the already installed environments."
    As the `conda` included in the `conda-module` module is not recent version and not a very fast one, we recommend to use `conda-modules/*` solely in cases you need to invoke some if the already installed environments. <br/>If you need `conda` in order to install a *new Conda environment*, we recommend to use `mamba` installer from module `mambaforge` - see [How to install Conda packages](../../software/install-software/#conda-packages).

Under the `conda-modules` module, there are multiple environments installed.

The basic commands are:

    module add conda-modules-py37 # load initial Conda module
    conda env list                # list installed environments
    conda activate busco          # activate an environment (e.g. busco)
    busco --help                  # use selected application
    conda deactivate              # quit

### Environment-specific notes

**fast-bonito_v0.2.2_py3.7**

User must specify absolute paths to the python script `basecaller.py` and to the model file `batchsize200_chunksize6000.pb`:

    python /software/conda-modules/5.3.1/envs/fast-bonito_v0.2.2_py3.7/fast-bonito/basecaller.py \
    --model_directory /software/conda-modules/5.3.1/envs/fast-bonito_v0.2.2_py3.7/fast-bonito/models/batchsize200_chunksize6000.pb 

**ffpenv**

    $ conda activate ffpenv
    $ export LD_LIBRARY_PATH=/software/conda-modules/5.3.1/envs/ffpenv/lib/python3.7/site-packages/PySide2-5.15.2-py3.7-linux-x86_64.egg/PySide2/Qt/lib:/software/conda-modules/5.3.1/lib:/software/conda-modules/5.3.1/envs/ffpenv/lib/
    $ ggparam-gui

**megalodon**

Prepared with Guppy 5.0.15 (CPU and GPU versions) placed in `/software/conda-modules/5.3.1/envs/megalodon/bin/ont-guppy-cpu` and `/software/conda-modules/5.3.1/envs/megalodon/bin/ont-guppy-gpu`.

You should accept [ONT licence](https://perun.metacentrum.cz/meta/registrar/?locale=en&vo=meta&group=lic_oxnanopore).

GPU version requires CUDA capability 6.0 and higher (PBS parameter `gpu_cap=cuda60`).

**tedensity_v0.9.1_py3.8**

Call the main python script `process_genome.py` with an absolute path: `python /software/conda-modules/5.3.1/envs/tedensity_v0.9.1_py3.8/TE_Density/process_genome.py`.

