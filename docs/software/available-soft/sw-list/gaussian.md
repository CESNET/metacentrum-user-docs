# Gaussian

    module avail g/

## Description

Gaussian is package of quantum mechanics programs. Program serves to predict the energies, molecular structures, and vibrational frequencies of molecular systems, along with numerous molecular properties derived from these basic computation types.


## Usage

Gaussian 03 and 09 can be used on the clusters installed in Brno (Supercomputing Centre MU) location.

The purchased licenses permit just an academic use of the program!

Program is actually available in many versions: g09-A.02 including GaussView (only jcu users, contact person is Martin Kabelac mkabelac@prf.jcu.cz), g09-A02 and Gaussian 09 (g09, G09-C.01, G09-D.01 and g09-E.01), g16-A.03 and the newest g16-B.01. Module g09-D.01linda contains Linda version allowing to use more machines.

If you do not use Linda version, other versions permit computing only on one machine, thus it is nonsense to plan computation on more machines. Although job submission in form

    select=Y:ncpus=X

with Y > 1 will not end with an error, it will compute only on one machine like you submit it with select=1:ncpus=X parameter. This results in overcomming the requested resources on memory or scratch size and the job would be killed.


## Links

[Old MetaCentrum wiki documentation](https://wiki.metacentrum.cz/wiki/Gaussian-GaussView)
