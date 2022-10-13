# Modules


## Limit module span 

In ciomplex jobs it may be necessary to limit the functionality of the module to a part of the script to avoid mismatch between libraries. ... 

Application programs available through the module system automatically load all necessary dependencies. Dependencies typically mean other modules. During the creation of long and complex pipelines, when it is needed to load many modules, there may raise a conflict of loaded dependencies and the subsequent crash of some programs. When the user needs to use more modules in one job, and it is not obvious that they will not be in conflict, it is advisable to limit the use of individual modules to only the necessary part of the script. Such a restriction can be done using parentheses. Basically, it is a replacement of the module add and module rm commands, but faster and safer. Limiting the module to part of the script using parentheses can be done as follows:


(module add module_1
command_1 ... <input> <output>
)

# Here, after the right parenthesis, module module_1 is no longer active (including its dependencies). The script can continue by the activation of module module_2

(module add module_2
command_2 ... <input> <output>
)


