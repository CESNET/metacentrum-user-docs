# Matlab

    module avail matlab/

[Matlab](http://www.matlab.com) is an integrated system covering tools for symbolic and numeric computations, analyses and data visualizations, modeling and simulations of real processes.

## Usage

### OnDemand

Matlab can be run in a browser as [OnDemand service](https://ondemand.metacentrum.cz). This is the most straighforward and simplest way.

### Jupyter notebook

Matlab is available to run from [cloud Jupyter Notebook service](https://hub.cloud.e-infra.cz/hub/) as described in [Jupyter notebook documentation](http://docs.cerit.io/docs/jupyterhub.html).

### Kubernetes

Another option is to use [Kubernetes service](https://docs.cerit.io/), which offers [Matlab](https://docs.cerit.io/docs/matlab.html) as a [Rancher application](https://docs.cerit.io/docs/rancher.html).

### Remote desktop 

Using [Remote desktop](../../software/graphical-access), Matlab can be also run from a module.

This option is recommended to advanced users or as a fallback option in case OnDemand and/or Kubernetes service are down.

## Licences

!!! warning
    Any of the purchased licenses permit **just an academic use** of the program!


### Matlab 9.14 and newer

For versions 9.14 and newer, MetaCentrum offers a license valid for 200 instances of MATLAB and a wide set of its toolboxes.

!!! note
    A default version of Matlab (`module add matlab`) runs also on this 200-pieces license.

PBS tracks these licenses as a `"matlab"` resource, therefore unless you use older Matlab version, always submit the job as

    qsub ... -l matlab=1 ...   # ask for 1 Matlab license
    
!!! tip
    In principle a license reservation is needed both for Matlab core and each one of the toolboxes you will need to use. **However, since the number of respective toolbox licenses is large, it is improbable that they will "run out"**. For most cases, you will be safe with the following simplified version which reserves only the core Matlab license `qsub ... -l matlab=1 ...` .

**Troubleshooting tools**

*List all licenses for Matlab and its available toolboxes:*

```
$ cat /software/matlab-latest/etc/license_tah.dat | grep INCREMENT   

$ module add matlab/9.14
$ matlab
>> ver                                 # alternative way from inside Matlab
```

*List currently issued and available licences of Matlab core:*

    $ /software/matlab-9.14/etc/lmstat -a | grep "Users of MATLAB:"

*List currently issued (reserved) licenses of Matlab core as well as toolboxes:*

    $ /software/matlab-9.14/etc/lmstat -a | grep "in use"

*Get type of license used in current instance of Matlab:*

    $ module add matlab/9.14 
    $ matlab
    $ >> license                # should return '41204682'

### Matlab 9.13 and older

For versions 9.13 and older, MetaCentrum offers a variable amount of licenses for Matlab core and its respective toolboxes.

| Matlab licenses              | Matlab licenses                   | Matlab licenses                |
|------------------------------|-----------------------------------|--------------------------------|
| MATLAB 450                   | Fuzzy_Toolbox 51                  |  Robust_Toolbox 1              |        
| Aerospace_Toolbox 1          | GADS_Toolbox 4                    |  RTW_Embedded_Coder 2          |       
| Antenna_Toolbox 1            | Identification_Toolbox 51         |  Signal_Blocks 50              |       
| Bioinformatics_Toolbox 15    | Image_Acquisition_Toolbox 5       |  Signal_Toolbox 87             |       
| Communication_Toolbox 25     | Image_Toolbox 94                  |  SimBiology 5                  |       
| Compiler 7                   | Instr_Control_Toolbox 1           |  SimDriveline 1                |       
| Control_Toolbox 50           | MAP_Toolbox 4                     |  SimHydraulics 3               |       
| Curve_Fitting_Toolbox 52     | MATLAB_Builder_for_Java 7         |  SimMechanics 5                |       
| Data_Acq_Toolbox 2           | MATLAB_Coder 8                    |  Simscape 7                    |       
| Database_Toolbox 12          | MATLAB_Distrib_Comp_Engine 384    |  Simulink_Control_Design 50    |       
| Datafeed_Toolbox 1           | MPC_Toolbox 1                     |  Simulink_HDL_Coder 3          |       
| Distrib_Computing_Toolbox 53 | Neural_Network_Toolbox 153        |  Simulink_PLC_Coder 1          |       
| Econometrics_Toolbox 6       | Optimization_Toolbox 153          |  SIMULINK 150                  |       
| Embedded_IDE_Link 1          | PDE_Toolbox 50                    |  Stateflow 25                  |       
| Excel_Link 1                 | Power_System_Blocks 2             |  Statistics_Toolbox 87         |       
| Financial_Toolbox 2          | Real-Time_Win_Target 51           |  Symbolic_Toolbox 153          |       
| Fin_Instruments_Toolbox 2    | Real-Time_Workshop 3              |  Target_Support_Package 1      |       
| Fixed_Point_Toolbox 3        | Robotics_System_Toolbox 7         |  Vehicle_Network_Toolbox 1     |       
| Video_and_Image_Blockset 12  | Virtual_Reality_Toolbox 6         |  Wavelet_Toolbox 8             |

!!! note
    Unless they have a specific reason, **we urge users to use version 9.14 and newer**.

!!! warning
    PBS does not anymore track the licenses for older Matlab versions, therefore **when you submit the job, do not use the `-l matlab=XX` option**.

**Troubleshooting tools**

*List all licenses for Matlab and its available toolboxes:*

```
$ cat /software/matlab-latest/etc/licese_old.dat | grep INCREMENT   

$ module add matlab/9.13
$ matlab
>> ver                                 # alternative way from inside Matlab
```

*List currently issued and available licences of Matlab core:*

    $ /software/matlab-9.13/etc/lmstat -a | grep "Users of MATLAB:"

*List currently issued (reserved) licenses of Matlab core as well as toolboxes:*

    $ /software/matlab-9.13/etc/lmstat -a | grep "in use"

*Get type of license used in current instance of Matlab:*

    $ module add matlab/9.13 
    $ matlab
    $ >> license                # should return '84911'

### ZCU users

Users of ZČU (West Bohemian University, Plzeň) have their own license for 10k MATLAB instances. Therefore they should not apply for MetaCentrum PBS resource.

!!! question "How do I find out who are ZCU users?"
     In [Perun](https://perun.cesnet.cz/), search for group `users-zcu` and see if you are a member.   

**Troubleshooting tools**

*Get type of license used in current instance of Matlab:*

    $ module add matlab/9.14 
    $ matlab
    $ >> license                # should return '41198919'


## Built-in documentation

From the MATLAB command window one can use the command help to get help with a a particular command, e.g.

    >> help rand

in the desktop environment one can use also the command doc

    >> doc rand

Online documentation is available at [MATLAB Product Documentation](https://www.mathworks.com/help/).

## Tips and notes

### Matlab as interactive job

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

### Matlab as batch job

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

If you are planning to run more then a few Matlab jobs simultaneously, please see [Running multiple MATLAB jobs](#distributed-and-parallel-jobs).

### Turn off Java Virtual Machine (JVM)

MATLAB uses its own java virtual machine for the desktop environment. Many jobs can be sped-up by turning the JVM off (option `matlab -nojvm`). Keep in mind, however, that some internal functions and toolboxes (e.g. Distributed Computing Toolbox) need Java.

### Matlab with Maple symbolic environment

Since the Maple's symbolic environment is not fully compatible with the Matlab's symbolic environment, the Matlab symbolic environment is used by default when starting the Matlab within MetaCentrum environment.

In case the Maple symbolic environment is needed, it must be required explicitly:

```
$ module add matlab
$ matlab-sym-maple       # the options of this command are the same as for the original 'matlab' command
                         # an alternative -- the 'matlab-sym-matlab' command -- explicitly requires the Matlab symbolic environment
```

### CPU usage

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

### Distributed and parallel jobs

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

**Running multiple MATLAB jobs simultaneously**

If there is a need to run multiple instances of Matlab simultaneously, users are strongly encouraged to run them on as few nodes as possible. Matlab takes one licence per user per node, regardless of number of Matlab instances running there. For example, you can run 64 instances of Matlab on one node while using only 1 licence.

An easy way to group Matlab instances offers [`parallel` command](../../software/sw-list/parallel.md).

The `parallel` command is particularly useful for distributing Matlab tasks across available CPUs effectively. 

First, make sure you have loaded the Matlab and Parallel Computing Toolbox modules as shown in the `myjob.sh` script:

```
#!/bin/bash 

# set PATH to find Matlab and Parallel
module add matlab
module add -s parallel 

# go to my working directory
cd $HOME/matlab/ 

# run multiple MATLAB instances in parallel
cat <<EOF | parallel -j${PBS_NCPUS}
matlab -nosplash -nodesktop -nodisplay -r "myFunction()" > output-0.txt
matlab -nosplash -nodesktop -nodisplay -r "myFunction()" > output-1.txt
matlab -nosplash -nodesktop -nodisplay -r "myFunction()" > output-2.txt
EOF

# # (You can use also a more succint one-line variant:)
# parallel -j${PBS_NCPUS} matlab -nosplash -nodesktop -nodisplay -r "myFunction()" > output-{%}.txt ::: 0 1 2 

```

Submit your job with a command like:

```
qsub -l select=1:ncpus=10:mem=5gb place=pack -l matlab=1 myjob.sh
```

By adding `place=pack`, you are instructing the job scheduler to try to allocate all the requested resources on a single server if possible.This will run multiple MATLAB instances concurrently, each executing `myFunction()` and saving their output to separate files.






