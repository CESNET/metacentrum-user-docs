# Turbomole

    module avail turbomole/

[Turbomole](https://www.turbomole.org/) is a general purpose quantum chemistry package for ab initio electronic structure calculations (Hartree-Fock, DFT, MP2, Coupled Cluster, TDDFT, ...).

## Usage

### License

The program is available just for non-commercial use:

- [Turbomole End User License Agreement](../../img/turbomole-enduser-license.pdf)  
- before using the program, you first need to [accept its licence](https://signup.e-infra.cz/fed/registrar/?vo=meta&group=lic_turbomole)

Versions 5.6, 6.0, 6.4, 6.5, 7.1, 7.4, 7.5 and 7.6. The TURBOMOLE is available in the following versions:

- version 7.6 (module `turbomole/7.6`, module `turbomole/7.6-mpi` and `turbomole/7.6-smp`) – a license purchased by Centre CERIT-SC available for all the registered MetaVO users – [explicit EULA agreement is required](https://signup.e-infra.cz/fed/registrar/?vo=meta&group=lic_turbomole)
- version 7.5 (module `TmoleX-2021`) – a license purchased by Centre CERIT-SC available for all the registered MetaVO users – [explicit EULA agreement is required](https://signup.e-infra.cz/fed/registrar/?vo=meta&group=lic_turbomole)
- version 7.4 (module `TmoleX-19`) – a license purchased by Centre CERIT-SC available for all the registered MetaVO users – [explicit EULA agreement is required](https://signup.e-infra.cz/fed/registrar/?vo=meta&group=lic_turbomole)
- version 7.1 (module `turbomole/7.1`, module `turbomole/7.1-mpi` and `turbomole/7.1-smp`) – a license purchased by Centre CERIT-SC available for all the registered MetaVO users – [explicit EULA agreement is required](https://signup.e-infra.cz/fed/registrar/?vo=meta&group=lic_turbomole)
- version 6.5 (module `turbomole/6.5`) – a license purchased by Centre CERIT-SC available for all the registered MetaVO users – [explicit EULA agreement is required](https://signup.e-infra.cz/fed/registrar/?vo=meta&group=lic_turbomole)
- versions 6.0 and 6.4 (modules `turbomole/6.0` and `turbomole/6.4`) -- licensed for a JCU group
- versions 5.6 (module `turbomole/5.6`) -- licensed for NCBR research group

### Paralellization

**Single processor version**

    module add turbomole/6.0
    jobex -ri >jobex.out

**Parallel version** (setting of variables lead to appending of parallel binaries)

    export PARA_ARCH=MPI
    export PARNODES=PROCS
    module add turbomole/6.0
    jobex -ri >jobex.out

where instead of `PROCS` specify number of processors ( e.g. `$PBS_RESC_TOTAL_PROCS` inside PBS job script).

### Graphical interface (TmoleX)

There is also a graphical interface to Turbomole installed in MetaCentrum - see [TmoleX](../../software/sw-list/tmolex.md).

