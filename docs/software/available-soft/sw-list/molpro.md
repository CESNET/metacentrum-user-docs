# Molpro

    module avail molpro/

## Description

Molpro is a complete system of ab initio programs for molecular electronic structure calculations. As distinct from other commonly used quantum chemistry packages, the emphasis is on highly accurate computations, with extensive treatment of the electron correlation problem through the multiconfiguration-reference CI, coupled cluster and associated methods.

## Usage

The license of the MolPro version 2012.1 is:

- bought by CERIT-SC Centre for academical use by any MetaCentrum user
- restricted just to Brno locality
- requires users to properly reference the used modules (see the program documentation)
- module molpro-2008.1 -- MolPro version 2008.1; o utilize this program, you have to buy a licence, then scan this licence and send it to address meta@cesnet.cz

Then run as

     $ molpro inputfile.com

- the program automatically detects the number of available processors/cores (for both parallel as well as distributed computations)
- if necessary, the program automatically uses the MPI routines in order to perform distributed computation
- to limit the number of processes/threads, use the `-n` and/or `-t` options -- see `molpro -h` or program documentation

## Links


[Molpro homepage](https://www.molpro.net/).

[Old MetaCentrum wiki documentation](https://wiki.metacentrum.cz/wiki/MolPro).
