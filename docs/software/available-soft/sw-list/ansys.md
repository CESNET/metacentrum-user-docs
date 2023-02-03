# Ansys

    module avail ansys/

## Description

ANSYS is a general nonlinear multiphysics software offering structural and thermodynamic analysis, continuum flow analysis, analysis of electrostatic and electromagnetic fields and acoustic analysis. All of these analysis may be performed on its own, or thanks to ANSYS' multiphysics approach all in one comprehensive analysis. ANSYS allows to perform not only validating calculations, but thanks to its parametric computation models even for sensitivity and optimization analysis and reliability analysis. 

## Usage

!!! note
    Although this application can be used in text-only mode, in most use cases you will need graphical interface.

!!! tip
    Alternatively, you can use a Kubernetes graphical version (VNC needed) [https://docs.cerit.io/docs/ansys.html](https://docs.cerit.io/docs/ansys.html). Available for testing, please report any problem with Kubernetes directly to <k8s@ics.muni.cz>.

All licenses are restricted **to academical use** only.

Ask scheduler (qsub parameter on command line or #PBS pragma in submit script) for licence depending on purpose:

    add -l ansys-cfd=1 for 1 available license of Ansys CFD
    add -l ansys-me=1 for 1 available license of Ansys Mechanical
    add -l ansys-hpc=Z for Z available licenses of Ansys HPC

Check the number of currently available licenses

```
module add ansys-2021-R1
lmutil lmstat -c 1055@lm-brno.ics.muni.cz -a
# filter specific license feature "cfd_base"
lmutil lmstat -c 1055@lm-brno.ics.muni.cz -a | grep cfd_base
```

or you can use Ansys specific license tool

```
/software/ansys-2021/R1/v211/licensingclient/linx64/ansysli_util -statli 2325@lm-brno.ics.muni.cz -printavail
# or with filter to specific license feature "cfd_preppost"
/software/ansys-2021/R1/v211/licensingclient/linx64/ansysli_util -statli 2325@lm-brno.ics.muni.cz -printavail | grep -B 3 -A 6 "FEATURENAME: cfd_preppost"
```

### Available ANSYS products

The following Ansys products are available within the MetaCentrum infrastructure:

- **Ansys CFD** - product combining two primary general-purpose fluids simulation products offered by ANSYS – Ansys Fluent and Ansys CFX.
    - **Ansys Fluent** contains the broad physical modeling capabilities needed to model flow, turbulence, heat transfer, and reactions for industrial applications ranging from air flow over an aircraft wing to combustion in a furnace, from bubble columns to oil platforms, from blood flow to semiconductor manufacturing, and from clean room design to wastewater treatment plants.
    - **Ansys CFX** is a general purpose fluid dynamics program for simulating all types of models concerning fluid flow, including effects of temperature(conductance, radiance).

- **Ansys Mechanical** - product for simulating of structural and thermodynamic tasks. The engineering simulation product provides a complete set of elements behavior, material models and equation solvers for a wide range of mechanical design problems. In addition, it offers thermal analysis and coupled-physics capabilities involving acoustic, piezoelectric, thermal–structural and thermo-electric analysis.

All ANSYS tools can utilize at most 4 local processors for task computation; for more demanding tasks in multiprocess/multinode environment (e.g. grids) it's necessary to use additional tool – **Ansys HPC** – every of its licenses allows for distribution of computation to another available (local or remote) processor. 

### Versions

- Ansys version 2021 R1 (module add ansys-2021-R1)
    - product is licensed for all registered users of national grid infrastructure of MetaCentrum
    - without location restriction (usable in the whole area of the Czech Republic)

- Ansys version 2020 R1 (module add ansys-2020-R1)
    - product is licensed for all registered users of national grid infrastructure of MetaCentrum
    - without location restriction (usable in the whole area of the Czech Republic)

- Ansys version 2019 R3 (module add ansys-2019-R3)
    - product is licensed for all registered users of national grid infrastructure of MetaCentrum
    - without location restriction (usable in the whole area of the Czech Republic)

- Ansys version 19.2 (module add ansys-19.2)
    - product is licensed for all registered users of national grid infrastructure of MetaCentrum
    - increased number of HPC licences to 512 computing cores!
    - without location restriction (usable in the whole area of the Czech Republic)

- Ansys version 18.2 (module add ansys-18.2)
    - product is licensed for all registered users of national grid infrastructure of MetaCentrum
    - increased number of HPC licences to 512 computing cores!
    - without location restriction (usable in the whole area of the Czech Republic)

- Ansys version 18.0 (module add ansys-18.0)
    - product is licensed for all registered users of national grid infrastructure of MetaCentrum
    - increased number of HPC licences to 512 computing cores!
    - without location restriction (usable in the whole area of the Czech Republic)

- Ansys version 17.2 (module add ansys-17.2)
    - product is licensed for all registered users of national grid infrastructure of MetaCentrum
    - without location restriction (usable in the whole area of the Czech Republic)

- Ansys version 17.1 (module add ansys-17.1)
    - product is licensed for all registered users of national grid infrastructure of MetaCentrum
    - without location restriction (usable in the whole area of the Czech Republic)

- Ansys version 16.2 (module add ansys-16.2)
    - product is licensed for all registered users of national grid infrastructure of MetaCentrum
    - without location restriction (usable in the whole area of the Czech Republic)

- Ansys version 16.1 (module add ansys-16.1)
    - product is licensed for all registered users of national grid infrastructure of MetaCentrum
    - without location restriction (usable in the whole area of the Czech Republic)

- Ansys version 15.0 (module add ansys-15)
    - product is licensed for all registered users of national grid infrastructure of MetaCentrum
    - without location restriction (usable in the whole area of the Czech Republic)

- Ansys version 14.0 (module add ansys-14)
    - product is licensed for all registered users of national grid infrastructure of MetaCentrum
    - without location restriction (usable in the whole area of the Czech Republic)

**Number of available licenses** (applies to all above mentioned versions):

- Ansys Academic Research CFD (Ansys Fluent + Ansys CFX) in quantity of 25 parallel runs
- Ansys Academic Research Mechanical in quantity of 5 parallel runs
- additional tool Ansys HPC in quantity of 512 pieces (=> cores)

- Available tools
    - FLUENT : command `fluent`
    - CFX : command `cfx*` (e.g. cfx5, cfx5launch, cfx5post, etc.)
    - CFD Post : command `cfdpost`
    - ICEM-CFD : command `icemcfd`
    - Workbench : command `runwb2`

### Ansys Fluent

Ansys Fluent supports both interactive and batch use.

**Interactive usage**

For graphic environment, open the GUI interface.

For text-only regime login to a frontend and ask for interactive job in the standard way

```
ssh skirit.ics.muni.cz
qsub -I -l select=X:ncpus=Y:mem=Zgb  # text-only regime
```
Start Fluent and proceed according to onscreen instructions

```
module add ansys-18.2
fluent # graphic regime
fluent -g # text-only regime
```

**Batch usage**

Login to a frontend

Prepare input data and batch script -- in the script, use following commands:

a) for serial computation:

```
module add ansys-18.2
fluent <version> -g -i input_file  # serial initialization of Fluent
```

b) for paralel/distributed computation:

```
module add ansys-18.2
cpus=`cat $PBS_NODEFILE | wc -l`
fluent <version> -t${cpus} -p -cnf=$PBS_NODEFILE -g < flow.input  # parallel/distributed initialization of Fluent
```

Note: you can get list of available versions by running `$ fluent -v`.

Submit the batch script:

    skirit$ qsub -l select=X:ncpus=Y:mem=Zgb batch_script.sh

**Parallel batch usage**

It seems that best usage of parallel fluent differs from HW where fluent runs (infiniband vs. omnipath), as a rule of thumb you can use:

```
  if test $(sort -u < $PBS_NODEFILE |wc -l) -gt 1 -a -w /dev/hfi1_0;then  
          MPI_IMP=-mpi=intel
  fi
  fluent 2ddp -g -t$PBS_RESC_TOTAL_PROCS $MPI_IMP -cnf=$PBS_NODEFILE -i case.jou > case.out 2>&1
```

To utilize homogeneous cluster (fluent cannot optimally use nodes with different performance) , one should submit via:

   qsub -l select=N:...:infiniband=^none -l place=group=cluster ...

!!! tip
    To minimalize time needed for communication vith cortex component and increase performace, one can try to increase /solve/set/reporting-interval.

!!! tip
    Check the scalability of parallel run before spawning at dozens of processors, maybe the 16cpu run is faster then 32cpu one due to big communication overhead. 

### Ansys CFX

**Interactive usage**

For graphic environment, open the GUI interface. 

For text-only regime login to a frontend and ask for interactive job in the standard way

```
ssh skirit.ics.muni.cz
qsub -I -l select=X:ncpus=Y:mem=Zgb  # text-only regime
```
Start CFX and proceed according to onscreen instructions

```
cfx5 # graphical mode
cfx5launch # text-only mode
```

**Batch usage**

Login to a frontend

Prepare input data and batch script -- in the script, use following commands:
    
a) for serial computation:

```
module add ansys-18.2
cfx5pre -batch inputfile.pre [...]
cfx5solve -def inputfile [...]
cfdpost -batch inputfile.cse [...]
```
b) for paralel/distributed computation:

```
module add ansys-18.2

#### Create host list
hl=`sort $PBS_NODEFILE | uniq -c | awk '{print $2"*"$1}' | tr '\n' ',' | sed 's/,$//'`

#### Run the computation, e.g.
cfx5solve -def 0.def -ccl 0.ccl -part-large -start-method "Platform MPI Distributed Parallel" -par-dist $hl
```
Submit the batch script:

    skirit$ qsub -l select=X:ncpus=Y:mem=Zgb batch_script.sh

### Ansys Workbench


For graphic environment, open the GUI interface.

Start Workbench in the graphical mode

    runwb2 # graphical mode


## Links

[Ansys homepage](https://customercenter.ansys.com/) - documentation available only for registered users.

[Old MetaCentrum wiki documentation](https://wiki.metacentrum.cz/wiki/ANSYS).

Software documentation is available locally in program's directory:

- version Ansys 18.2: /software/ansys-18.2/doc/readme.html
- version Ansys 18.0: /software/ansys-18.0/doc/readme.html
- version Ansys 17.2: /software/ansys-17.2/doc/readme.html
- version Ansys 17.1: /software/ansys-17.1/doc/readme.html
- version Ansys 16.2: /software/ansys-16.2/doc/readme.html
- version Ansys 16.1: /software/ansys-16.1/doc/readme.html
- version Ansys 15: /software/ansys-15/doc/readme.html
- version Ansys 14: /software/ansys-14/doc/readme.html
