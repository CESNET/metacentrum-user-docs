#  Python modules

    module avail "python*modules"/

[Python](https://www.python.org/) programming language supports extensions in the form of so called 'modules'. To ease the administration of such modules we grouped them into one SW package (module). These packages are dependent on the Python version and used compiler. 

## Usage

For actual list of available Python modules use command `pipX.Y list`, e.g.

```
module add python36-modules-gcc
pip3.6 list
```

- To use of python module `python-igraph` you should also add one of the modules `igraph-0.7.1-gcc` and `igraph-0.7.1-intel`.
- To use of python module tables you should also add one of the modules `hdf5-1.8.12-gcc` or `hdf5-1.8.12-intel`.
- To use of python module `h5py` you should also add one of the modules `hdf5-1.8.14-gcc` or `hdf5-1.8.14-intel`.
- To use of python module `tetoolkit` you should also add module `R-3.2.3-intel`.

### Python modules conflicts

Different modules (versions) of Python (and python-modules) are usually impossible to run along. But it is possible to add modules only for calling necessary scripts, not for the whole batch. Like:

```
 (module add python34-modules-gcc;
      cython ...;
 )
 (module add qiime/1.9.1;
        alpha_rarefaction.py ...;
        beta_diversity_through_plots.py ...;
 )
```

