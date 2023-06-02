# Matlab

    module avail matlab/

## Description

MATLAB is an integrated system covering tools for symbolic and numeric computations, analyses and data visualizations, modeling and simulations of real processes etc. Next to MATLAB and Simulink there are other supplementary toolboxes available (see also section below). 

MATLAB is an integrated system covering tools for symbolic and numeric computations, analyses and data visualizations, modeling and simulations of real processes.

## OnDemand

Matlab can be run in a browser as [OnDemand service](https://ondemand.metacentrum.cz). This is the most straighforward and simplest way.

## Jupyter notebook

Matlab is available to run from [cloud Jupyter Notebook service](https://hub.cloud.e-infra.cz/hub/) as described in [Jupyter notebook documentation](http://docs.cerit.io/docs/jupyterhub.html).

## Kubernetes

Another option is to use [Kubernetes service](https://docs.cerit.io/), which offers [Matlab](https://docs.cerit.io/docs/matlab.html) as a [Rancher application](https://docs.cerit.io/docs/rancher.html).

## Remote desktop 

Using [Remote desktop](/advanced/run-graphical), Matlab can be also run from a module.

This option is recommended to advanced users or as a fallback option in case OnDemand and/or Kubernetes service are down.

**Module:**

    module avail matlab/

For a detailed description of Matlab usage see [this page](/software/available-soft/sw-list/matlab).

## Usage

### Licences

There exists a permanent licence type "College" (for operating systems UNIX and MS Windows) that is available to all the national grid infrastructure MetaCentrum users as well as to all students and employees of

- Masaryk university in Brno
- University of West Bohemia in Pilsen
- Czech Technical University in Prague

MATLAB can be installed freely on every computer at these universities and once running it takes licences from a pool of available licences. These licences are currently maintained by three licence servers: at ZČU in Plzeň, at ÚVT UK in Praha and at ÚVT MU in Brno.

The purchased licenses permit **just an academic use** of the program!

Names and number of licences:

- MATLAB 450
- Aerospace\_Toolbox 1
- Antenna\_Toolbox 1
- Bioinformatics\_Toolbox 15
- Communication\_Toolbox 25
- Compiler 7
- Control\_Toolbox 50
- Curve\_Fitting\_Toolbox 52
- Data\_Acq\_Toolbox 2
- Database\_Toolbox 12
- Datafeed\_Toolbox 1
- Distrib\_Computing\_Toolbox 53
- Econometrics\_Toolbox 6
- Embedded\_IDE\_Link 1
- Excel\_Link 1
- Financial\_Toolbox 2
- Fin\_Instruments\_Toolbox 2
- Fixed\_Point\_Toolbox 3
- Fuzzy\_Toolbox 51
- GADS\_Toolbox 4
- Identification\_Toolbox 51
- Image\_Acquisition\_Toolbox 5
- Image\_Toolbox 94
- Instr\_Control\_Toolbox 1
- MAP\_Toolbox 4
- MATLAB\_Builder\_for\_Java 7
- MATLAB\_Coder 8
- MATLAB\_Distrib\_Comp\_Engine 384
- MPC\_Toolbox 1
- Neural\_Network\_Toolbox 153
- Optimization\_Toolbox 153
- PDE\_Toolbox 50
- Power\_System\_Blocks 2
- Real-Time\_Win\_Target 51
- Real-Time\_Workshop 3
- Robotics\_System\_Toolbox 7
- Robust\_Toolbox 1
- RTW\_Embedded\_Coder 2
- Signal\_Blocks 50
- Signal\_Toolbox 87
- SimBiology 5
- SimDriveline 1
- SimHydraulics 3
- SimMechanics 5
- Simscape 7
- Simulink\_Control\_Design 50
- Simulink\_HDL\_Coder 3
- Simulink\_PLC\_Coder 1
- SIMULINK 150
- Stateflow 25
- Statistics\_Toolbox 87
- Symbolic\_Toolbox 153
- Target\_Support\_Package 1
- Vehicle\_Network\_Toolbox 1
- Video\_and\_Image\_Blockset 12
- Virtual\_Reality\_Toolbox 6
- Wavelet\_Toolbox 8

Together with the permanent licence a complete maintenance (including new version updates of all mentioned products) is also available and it is annually renewed.

A list of licenses and its usage can be obtained by

    $ /software/matlab-9.8/etc/lmstat -a | grep "in use"

**Licences and scheduler**

You need to tell the PBS scheduler that the job will require a licence. Each Matlab package has its own licence. For exasmple, if you need to use Statistics\_Toolbox, submit your job like this:

    qsub ... -l matlab=1 -l matlab_Statistics_Toolbox=1 ...

Names of toolboxes with prefix matlab_ are required by PBS scheduling system for the purpose of license reservation. During MATLAB usage, don't use these prefixes and use only base name of selected toolbox. 

### Documentation

From the MATLAB command window one can use the command help to get help with a a particular command, e.g.

    >> help rand

in the desktop environment one can use also the command doc

    >> doc rand

Online documentation is available at [MATLAB Product Documentation](https://www.mathworks.com/help/).


### Tips and detailed HOWTO

**Matlab as interactive job**

Interactive regime brings no significant speed-up comparing to running MATLAB locally on your machine unless parallelism is used. Interactive regime is recommended for development of your code and its testing.

**1. OnDemand interface**

This is the most easy and straighforward way to run Matlab in graphical mode. Follow the OnDemand tutorial.

**2. Interactive job with remote desktop**

If you prefer to stay with command line or if, for some reason, you cannot use web browser, it is possible to run Matlab as interactive job and get the graphical output to your screen by configuring remote desktop (recommended) or X-Window. Follow the tutorials to learn how to setup the graphical connection.

After the graphical connection is set up, Matlab can be run from the provided menu or by typing the following code into a terminal window:

    $ module add matlab
    $ matlab

**3. Interactive job without GUI**

It is possible to run MATLAB in the text regime only, when the graphical mode is not necessary (you may even create figures, work with them, save them to a disk, though they are not visible). The relevant keywords for this case are:

    $ matlab -nosplash -nodisplay -nodesktop

**Matlab as batch job**

If you do not need the graphical environment, it is is possible to run MATLAB in batch regime. Create batch script myjob.sh with the following contents:

```
#!/bin/bash

# set PATH to find MATLAB
module add matlab

# go to my working directory
cd $HOME/matlab/

# run MATLAB
matlab -nosplash -nodesktop -nodisplay -r "myFunction()"

# or in a different way:
#matlab -nosplash -nodesktop -nodisplay < myFunction.m > output.txt
```

Put all your MATLAB files (your \*.mat and \*.m files) to the directory `$HOME/matlab/` and submit this shell script like

    qsub -l select=1:ncpus=10:mem=1gb -l matlab=1 myjob.sh

Batch jobs are useful especially if you want to run more jobs in parallel or if you do not want to block your local machine with running jobs.

**Turn off Java Virtual Machine (JVM)**

MATLAB uses its own java virtual machine for the desktop environment. Many jobs can be sped-up by turning the JVM off (option `matlab -nojvm`). Keep in mind, however, that some internal functions and toolboxes (e.g. Distributed Computing Toolbox) need Java.

**Start Matlab with Maple symbolic environment**

Since the Maple's symbolic environment is not fully compatible with the Matlab's symbolic environment, the Matlab symbolic environment is used by default when starting the Matlab within MetaCentrum environment.

In case the Maple symbolic environment is needed, it must be required explicitly:

```
$ module add matlab
$ matlab-sym-maple       # the options of this command are the same as for the original 'matlab' command
                         # an alternative -- the 'matlab-sym-matlab' command -- explicitly requires the Matlab symbolic environment
```

**Distributed and parallel jobs in MATLAB**

MATLAB now supports distributed and parallel jobs on multiprocessor machines using the [Parallel Computing Toolbox](https://www.mathworks.com/products/parallel-computing.html) (the name of the licence is Distrib\_Computing\_Toolbox) and on clusters using the [MATLAB Distributed Computing Server](https://www.mathworks.com/products/matlab-parallel-server.html) (name of the licence is MATLAB\_Distrib\_Comp\_Engine).

**Parallel Matlab computations in MetaCentrum**

To prepare an environment for parallel computations, it is necessary to initialize a parallel pool of so-called workers using the function `parpool` (called `matlabpool` in previous versions). This standard initialization requires to specify an amount of workers to initialize; moreover, thanks to shared filesystems, it may also result in a collision when trying to initialize several pools simultaneously.

To make the initialization of parallel pool easier as well as to cope with the collision problems, we have prepared a function MetaParPool:

```
MetaParPool('open');        % initializes parallel pool (returns the number of initialized workers)
...
x = MetaParPool('size');    % allows to discover the size of parallel pool (returns the number of workers)
                            % may be called as MetaParPool('info'); as well
...
% a computation using parfor, spmd and other Matlab functions
...
MetaParPool('close');       % closing the parallel pool
```

**Notes**

- the function **automatically detects the number of cores assigned to a job** - the size of parallel pool is always automatically set based on resources assigned to a job
- it is necessary to ask for N computing cores on a single node (`qsub -l select=1:ncpus=N ...`)
- to make parallel computations using this function, there are **1 Matlab license and 1 Distributed Computing Toolbox license** and **N-1 MATLAB Distributed Computing Engine licenses** necessary (N denotes the number of requested cores)
- a reservation can be thus performed via `-l matlab=1,matlab_Distrib_Computing_Toolbox=1` 
- **an example** of parallel computation using the MetaParPool function can be found in the `/software/matlab-meta_ext/examples` directory (file `example-parallel.m` shows the Matlab input file itself while the file `run_parallel.sh` shows an example startup script).

**CPU usage**

Depending on the structure of script and functions being called, Matlab may use more CPUs than granted by the scheduler. This may result in your job being killed by the scheduler.

Incorrect CPU usage can be prevented by resorting to one of the extremes:

**1. Force Matlab to work on one CPU only by using `--singleCompThread` option**

```
qsub ... ncpus=1 ...
matlab ... -nojvm --singleCompThread ...
```

Obvious disadvantage is no speedup due to parallelization. On poorly (or partly) parallelized codes, or if the 1-CPU-speed-only is not an issue, `--singleCompThread` is often a good choice.

**2. Reserve whole computational node by exclhost option**

    qsub -l select=1:ncpus=1 -l place=exclhost

This requirement is done on the PBS level and essentially asks the PBS to grant whole computational node to your job only. Being so, even if Matlab code uses all' available CPUs, your job won't be killed.

On the other hand, `exclhost` is a large requirement. If the grid is busy, jobs with exclhost may wait for a long time (even several days!) to run.

`exclhost` may be effective in case you have a number of Matlab jobs which use parallelization only in some critical part. You can group them into one PBS job and run them all at once in background, e.g.

```
qsub ... place=exclhost ...
(cd Dataset1; matlab ... ) &
(cd Dataset2; matlab ... ) &
...
(cd DatasetN; matlab ... )
```

**3. Find the optimal number of CPUs using cgroups**

If you need some level of parallelizations, but don't want to use `exclhost`, you can limit number of available CPUs by using cgroups, which is Linux kernel tool. Only some machines are able to use cgroups.

    qsub -l select=1:ncpus=N:cgroups=cpuset ... # N is the the optimal number of CPUs

Finding the optimal number (N) of CPUs can be tricky and sometimes reduced to trial-and-error approach, especially if your code calls external libraries. You can use top command to watch the CPU load. 


## Links

[Matlab homepage](http://www.matlab.com).

[Old MetaCentrum wiki documentation](https://wiki.metacentrum.cz/wiki/Matlab).
