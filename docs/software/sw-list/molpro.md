# Molpro

    module avail molpro/

[Molpro](https://www.molpro.net/) is a complete system of ab initio programs for molecular electronic structure calculations. The emphasis is on highly accurate computations with extensive treatment of the electron correlation problem through the multiconfiguration-reference CI, coupled cluster and associated methods.

## Usage

The license of the Molpro version 2024.3.0 is:

- freely available to all MetaCentrum users for academic use
- restricted just to the Brno locality (use PBS option `:brno=True`)
- module `molpro/2024.3.0`

The license of the Molpro version 2012.1 is:

- freely available to all MetaCentrum users for academic use
- restricted just to the Brno locality (use PBS option `:brno=True`)
- module `molpro/2012.1`

Other Molpro versions require a personal user license.

Then run as

    $ molpro inputfile.com

- the program automatically detects the number of available processors/cores (for both parallel as well as distributed computations)
- if necessary, the program automatically uses the MPI routines in order to perform distributed computation
- to limit the number of processes/threads, use the `-n` and/or `-t` options -- see `molpro -h` or program documentation

