# Maple

    module avail maple/

[Maple homepage](https://www.maplesoft.com/products/maple/index.aspx) is a general-purpose computer algebra system - an enviroment for sympolic computations, solving scientific and engeneering problems, mathematic research, and/or data visualization, thus allowing a creation of technical publications. 

## Usage

### Licenses

- Maple 2017.1: 15 floating liceses
- Maple 16: 30 floating liceses
- Maple 15: 30 floating liceses

When using a floating license (Maple 15 and 16), it is necessary to ask the scheduling system for a license reservation via the job submission attributes.

**Maple 15 and 16**

The Maple 15/16 is able to use just more computational threads (i.e., cores on a single node).

It is necessary to ask for a floating license. Thus, the job submission (requiring a single computational node) should be performed as follows:

    qsub -l select=1:ncpus=4:mem=16gb -l maple=1 ...

i.e., the job is asking for four cores on a single 64-bit node, 16GB of memory and a single Maple 15/16 license. 

### Example

The following usage examples are specialized on and tested with the newest Maple version available (Maple 16); their application on the older versions is possible, but might not work.

Once submitting a job, which is intended to perform Maple computations, it is necessary to provide the scheduler with a requirement for available Maple license (thus, the job will be started just once a license becomes available). This requirement is specified by setting the maple job's property, as shown on the following examples (for another license reservation options see the #License reservation section below).

**Interactive use**

Provide the scheduling system with a requirement for the number of available nodes/cores and Maple licenses:

    qsub -I -l select=1:ncpus=X:... -l maple=1      # requires 1 license, 1 node having X cores

Initialize the Maple environment ("module add maple") and run the command:
- `maple` ... for interactive text environment
- `xmaple` ... for interactive graphical environment

**Batch use**

Create a job startup script, which initially performs an intialization of the modules subsystem, followed by an initialization of the Maple environment. After that, the script might perform the Maple computations intended:

```
#!/bin/sh

# initialize the Maple
module add maple

# perform Maple computations
maple < mymaplefile.{txt,mpl}
```

Subsequently, submit the script together with your requirements for the number of available nodes/cores and Maple licenses:

    qsub -l select=1:ncpus=X:... -l maple=1 myScript.sh          # requires 1 license, 1 node having X cores

**Integrating Maple with Matlab**

The installed Maple Toolbox for Matlab allows two-way integration between Maple and Matlab environments -- the toolbox thus allows to combine the Maple's symbolic computations with Matlab's numeric computations. See more information about the toolbox at Maple official site.

Usage example (interactive job):

Ask the scheduling system for an interactive job

    qsub -I -l select=1:ncpus=X:... -l maple=1            # X ... the number of required cores

initialize the matlab module

    module add matlab

start the Matlab having the Maple symbolic toolbox enabled

    matlab-sym-maple

write the following set of commands into the Matlab worksheet:

```
maple                    % starts the Maple (might take some time)
syms x y                 % initializes symbolic variables
cos(sqrt(x^2-y^2))/x^2
setmaple('h',ans)        % allows the result to be accessible from the Maple
```

an access to the resulting formula (h variable) from the Maple environment can be checked by typing the h into the Maple worksheet and pressing Enter -- the Matlab formula should be shown.

