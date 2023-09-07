# Wolfram Mathematica

    module avail mathematica/
    module avail gridmathematica/

[Mathematica](https://www.wolfram.com/mathematica/) is a CAS (Computer Algebra System) like Matlab and Maple. It is able to analyze data sets, solve complex differential equations, and develop an entire solution for fast, high-precision numeric and symbolic computation. Mathematica also provides 2D and 3D data visualization and programming capabilities.

## Usage

!!! note
    To enable computational-intensive computations within Mathematica, one can make use of its parallel/distributed extension called GridMathematica -- see details at GridMathematica documentation.

### Licences

Commercial software, just for academic use.

!!! warning
    The purchased licenses permit just an academic use of the program!

!!! warning
     The provided Mathematica licenses are allowed to be used just on the nodes in Brno location! (Please, use `qsub -l select=...:brno=true ...` during the submission.)


- module `mathematica-12.2` available for all the registered users.
- module `mathematica-11.3` available for all the registered users.
- module `mathematica-11.1` available for all the registered users.
- module `mathematica-11` available for all the registered users.
- module `mathematica-10` Mathematica version 10.0.1, 10 concurrent runs, the license purchased by the CERIT-SC Centre, available for all the registered CERIT-SC/MetaVO users.
- module `mathematica-10.3`
- module `mathematica-9` Mathematica version 9.0.1, 10 concurrent runs, the license purchased by the CERIT-SC Centre, available for all the registered CERIT-SC/MetaVO users.
- modules `mathematica-9-XXX` Mathematica version 9.0.1, installations dedicated for use by the institutions owning a Mathematica license (actually, XXX = JCU, FZU or UK).
- modules `mathematica-8-XXX` Mathematica version 8, installations dedicated for use by the institutions owning a Mathematica license (actually, XXX = JCU, FZU or UK).
- modules `mathematica-7`

**Note:** If you are interested in using your Mathematica license within the MetaCentrum infrastructure, contact us for more details (the license terms and conditions of your license have to be consulted if such a use is available).

### Usage

Initialize enviroment ("module add mathematica-11.3" (version 11.3) or (in cases your institution has Mathematica licenses) "module add mathematica-9-XXX" or "module add mathematica-8-XXX") and run "Mathematica":

```
$ Mathematica   # GUI version
$ math          # command-line version
```

Note: To enable computational-intensive computations within Mathematica, one can make use of its parallel/distributed extension called GridMathematica -- see details at [Gridmathematica documentation](https://wiki.metacentrum.cz/wiki/GridMathematica).

Example of interactive use:

```
$ qsub -I -l select=1:ncpus=1:mem=1gb:scratch_local=1gb:brno=true -l walltime=1:00:00
$ module add mathematica-11.3
$ math

In[1]:= 1 + 1

Out[1]= 2

In[2]:= 1 + 2

Out[2]= 3
```
