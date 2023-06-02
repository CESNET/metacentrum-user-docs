# Wien2k

    module avail wien2k/

## Description

Program WIEN2k computes the electronic structure of solids. It is based on the Density Functional Theory (DFT) [W. Kohn and L. J. Sham: Phys. Rev. 140, A1133–A1138 (1965)]. It comprises full crystal potential and uses the Linearized Augmented Plane Wave method, LAPW [S. Cottenier: DFT and the Family of (L)APW-methods: a step-by-step introduction, University of Ghent, Belgium, 2004]). 

## Usage

Wien2k is a commercial product -- every user should have it's own (private) license (see license terms and conditions). 

!!! mote
    Including the version 14.1, the program directories are accessible only for the users which sent us a proof of holding the license.

If you need to use k-point parallelization, you need to generate .machines file to working directory. For file generation you can use the script `wien2k_machines`, eg:

    /software/wien2k-14.2/wien2k/wien2k_machines > .machines

Note: Since version wien2k-12.1 does not yet implement MPI parallelization. However, it uses the parallelization of Open MP. Your task will use so many processors how many you specify in the qsub command. For example, for two-processor task you submit:

```
$ qsub -l select=1:ncpus=2:mem=1gb ...

Do not use the -p switch when using run_lapw. Just

export SCRATCH=.
run_lapw -cc 0.0001 -i 90 
echo y  | clean_lapw -s
```

is enough for computing on more processors. 

## Links

[Wien2k homepage](https://wiki.metacentrum.cz/wiki/WIEN2k).

[Old MetaCentrum wiki documentation](https://wiki.metacentrum.cz/wiki/WIEN2k).
