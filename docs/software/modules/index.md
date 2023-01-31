# Modules

In Metacentrum infrastructure all applications are packed into so-called modules, which make sure that a given application will run within a correct environment (incl. libraries, system variables setup etc.). Therefore to run a certain software, you must first load a module for this software.

A complete guide to how module and modulefile commands work can be found on https://modules.readthedocs.io/en/latest/modulefile.html. You can also browse the manpage from a command line man module.

On this page we will show only the most common usecases of the module command.

## Basic usecases

List core names of available modules

$ module avail                  # list all available modules (but not their versions)
                                # the list is very long; move down the list by pressing Space or Enter key
$ module avail intel            # list all available modules starting with "intel":
intel-parallel-studio/  intel/  intelcdk/  intelmpi/

List available versions of a specific module

$ module avail intelcdk/        # list the modules within the intelcdk/ directory (the "/" is important!)

will get list of versions with the default one underlined:

intelcdk/12  intelcdk/13  intelcdk/14  intelcdk/15  intelcdk/16  intelcdk/17  intelcdk/17.1  intelcdk/17.1-cvmfs  intelcdk/19u3 

$ module avail intelcdk --indepth # list all the modules within the intelcdk directory
$ module avail intelcdk -a        # similar to above, plus list aliases to modules

Load a default version of a module

$ module load intelcdk           # or
$ module load intelcdk --default # load default version of intelcdk (usually the newest); there is always one
                                 # use this option if you have no specific reason to do otherwise
                                 # or if you are insecure which version to choose, start by default one
$ module add intelcdk            # equivalent to the above

Load a specific version of a module

$ module load intelcdk-17.1

List currently loaded modules

$ module list
Currently Loaded Modulefiles:
 1) intelcdk/17.1

Unload a module:

$ module unload matlab-9.9      # unload matlab-9.9, for example
$ module del matlab-9.9         # equivalent to the above

Clear all currently loaded modules:

$ module purge              # get rid of everything!

Display information about the module:

$ module display intelcdk-17.1     # get loads of info about the module and environment

Some important variables are

    PATH - path to the executable
    LD_LIBRARY_PATH - path to libraries for linker
    LIBRARY_PATH - path to libraries

## Specific usecases

## Limit the module validity to a bash subshell

Within a single session you can use modules separately by enclosing them to parentheses. Parentheses, in general, create a subshell in bash, i.e. all modules loaded within a certain subshell will be unloaded automatically after the subshell exits.

Example: normally the following two modules will conflict if loaded within the same session:

(BUSTER)melounova@skirit:~$ module add python/3.8.0-gcc
This is the user wrapper module using spack module python/3.8.0-gcc-rab6t.
(BUSTER)melounova@skirit:~$ module add python/3.8.0-gcc-rab6t
python/3.8.0-gcc-rab6t(49):ERROR:150: Module 'python/3.8.0-gcc-rab6t' conflicts with the currently loaded module(s) 'python/3.8.0-gcc'
python/3.8.0-gcc-rab6t(49):ERROR:102: Tcl command execution failed: conflict python

However you can load them separately in subshells:

(BUSTER)melounova@skirit:~$ (module add python/3.8.0-gcc; python)
This is the user wrapper module using spack module python/3.8.0-gcc-rab6t.
...
>>> quit()
(BUSTER)melounova@skirit:~$ (module add python/3.8.0-gcc-rab6t; python) 
...
>>> quit()

## Limit module span 

In complex jobs it may be necessary to limit the functionality of the module to a part of the script to avoid mismatch between libraries. ... 

Application programs available through the module system automatically load all necessary dependencies. Dependencies typically mean other modules. During the creation of long and complex pipelines, when it is needed to load many modules, there may raise a conflict of loaded dependencies and the subsequent crash of some programs. When the user needs to use more modules in one job, and it is not obvious that they will not be in conflict, it is advisable to limit the use of individual modules to only the necessary part of the script. Such a restriction can be done using parentheses. Basically, it is a replacement of the module add and module rm commands, but faster and safer. Limiting the module to part of the script using parentheses can be done as follows:


    (module add module_1
    command_1 ... <input> <output>
    )
    
    # Here, after the right parenthesis, module module_1 is no longer active (including its dependencies). The script can continue by the activation of module module_2
    
    (module add module_2
    command_2 ... <input> <output>
    )



## Modulefiles

A modulefile is a text file that collects paths to the binary, paths to external libraries and possible dependencies on other modules.

The modulefiles reside in some of the directories included in variable MODULEPATH (echo $MODULEPATH).

For many applications, there are several modules available. This means there are several copies of the software available, differing in version, compiler and other features. For example,

$ module avail tensorflow/
tensorflow/1.3.0-cpu          tensorflow/1.3.0-gpu-python3  tensorflow/1.5.0-gpu          tensorflow/1.13.1-gpu-python3  
tensorflow/1.3.0-cpu-python3  tensorflow/1.4.1-gpu          tensorflow/1.7.1-cpu-python3  tensorflow/2.0.0-gpu-python3   
tensorflow/1.3.0-gpu          tensorflow/1.5.0-cpu-python3  tensorflow/1.7.1-gpu-python3  

says there are 11 versions of TensorFlow software differing by version, Python version (2 or 3) and whether it can be used for GPU computing (gpu) or not (cpu).
Modulefile example

    #%Module1.0
    #!
    #! Title: gsl-1.16
    #! Platforms: amd64_linux32
    #! Version: 1.16
    #! Description: GNU Scientific Library tools collection
    #!
    #! Author: Petr Hanousek, #35289 
    #!
    #!
    proc ModulesHelp {} {
    global ModulesCurrentModulefile
    puts stdout "modulehelp $ModulesCurrentModulefile"
    }
    
    set basedir /software/gsl/1.16/gcc
    
    prepend-path PATH ${basedir}/bin 
    prepend-path PKG_CONFIG_PATH ${basedir}/lib/pkgconfig
    prepend-path LD_LIBRARY_PATH ${basedir}/lib
    prepend-path MANPATH ${basedir}/share/man

the number after the author's name you can see in some modulefiles is the number of RT ticket which requested the installation
the only necessary path is PATH, where the executable is
a modulefile can add other modules (module add ...) if there is a dependency
basedir is path to the install directory - it can be pretty anywhere; in case of non-standard installation, e.g. to home directory, don't forget to set variable MODULEPATH accordingly (see How to install an application)



