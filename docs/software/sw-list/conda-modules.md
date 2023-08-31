# Conda modules 

    module avail conda-modules/

[Conda](https://docs.conda.io/en/latest/) is an open-source package management system and environment management system that runs on Windows, macOS and Linux (available in Metacentrum). Conda quickly installs, runs and updates packages and their dependencies. Conda easily creates, saves, loads and switches between environments on the computer. In Metacentrum Conda is used for managing of python tools. 

## Usage

Under the `conda-modules` module, there are multiple environments installed.

The basic commands are:

    module add conda-modules-py37 # load initial Conda module
    conda env list                # list installed environments
    conda activate busco          # activate an environment (e.g. busco)
    busco --help                  # use selected application
    conda deactivate              # quit

### Environmnent-specific notes

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

