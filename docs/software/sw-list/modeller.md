# Modeller

    module avail modeller/

[Modeller](https://salilab.org/modeller/) is a software for homology or comparative modelling of protein three-dimensional structures.

MODELLER implements comparative protein structure modeling by satisfaction of spatial restraints, and can perform many additional tasks, including de novo modeling of loops in protein structures, optimization of various models of protein structure, multiple alignment of protein sequences amd others.

## Usage

### License

To be able to use Modeller, you have to [accept its license](https://perun.metacentrum.cz/meta/registrar/?locale=en&vo=meta&group=lic_modeller).

### Python versions

There are two basic ways to run MODELLER. They differ in the Python interpreter used:

1. `mod9.17 somescript.py` (uses built-int Python 2.3 interpreter)
2. `modpy.sh somescript.py` (simply runs `somescript.py` - it has to be executable)

In the second case, MODELLER should work well with both 2.7.6 and 3.4.1 versions of Python in MetaCentrum. 
