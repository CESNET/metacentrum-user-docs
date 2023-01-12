# Install software

!!! note
    Nebudeme uvadet navod jak instalovat do systemovych adresaru AFS a vytvaret modulefily.

## Options

### Install on your own 

This means you select any place in any of your homes and install the executable there. 

    user213@any_frontend:/storage/CITY/home/user123/my_fancy_sw/executable_file

Then you run the calculation as

    /storage/CITY/home/user123/my_fancy_sw/executable_file input.inp ...

We recommend this option in case:

- you are not sure whether this software will be useful to you and want to test it first,
- the calculations run with this software will run hours rather than days and weeks,
- as far as you know, there are no other users who would like to use this software,
- the installation process seems to be manageable with your skills,
- you do not want to interact with User support in any way.

!!! warning 
    With software installed in your home directory, the availability is limited compared to system installation. In case of disk arrays failure, the installed software may become unavailable.

!!! question
    Chapu to spravne ze kdyz mam nejaky sw nainstalovany v homu, bezi mi na tom vypocet a ten home v prubehu vypoctu vypadne, tak spadne i ten job? Nebo se to cele nacte do RAM a vypadek disku se projevi jen napr. v nemoznosti zapsat outfiles?

!!! question
    Pokud si teda uzivatel nainstaluje k sobe do homu, ma si vyrabet i vlastni modulefile a nastavovat MODULEPATH? K cemu je to dulezite, nemuze to proste volat rovnou explicitne z homu?

### Ask us to do it

This means that upon request sent to <meta@cesnet.cz> we install the software to system directories and make a modulefile available to use.

We recommend this option in case:

- it is a new version of already installed and/or commonly used software in MetaCentrum,
- you are confident about the new software's usability,
- you know the software will be useful to more users,
- you are not able to go through the installation on your own and need help. 

**How to write software install request**

There exists plethora of scientific software, sometimes with identical names. If you want us to install something, please give us as much of the following as possible:

1. Software name (**required**),
2. Version ("latest" or specific version) (**required**),
3. Link to where the source can be downloaded from (**required**),
4. Link to documentation,
5. Link to installation guide (if there is any) ,
6. Link to test suite or an example calculation (if there is any),
7. Any dependencies, modules or optional parts you need to be compiled together with the main software (if there are any).

## Examples

### Binaries

Some software is available only as ready-made binary file. In this case the only thing you need to do is to download and unpack the files.

Example: 

    user123@skirit:~$ mkdir satsuma ; cd satsuma # prepare dir for software "satsuma"
    user123@skirit:~/satsuma$ wget https://github.com/bioinfologics/satsuma2/releases/download/untagged-2c08e401140c1ed03e0f/satsuma2-linux.tar.gz # download it
    user13@skirit:~/satsuma$ tar -xvf satsuma2-linux.tar.gz # unpack it
    user13@skirit:~/satsuma$ cd product/bin ; ls # see the executables 

### Conda packages

How to instal usind conda, miniconda, micromamba

Example:

<!--
https://rt.cesnet.cz/rt/Ticket/Display.html?id=1103181
https://rt.cesnet.cz/rt/Ticket/Display.html?id=1120618
-->

### Pip install

How to install using pip

### Containers

How to install something delivered as Docker / Singularity (Apptainer) container

### Compile from source

The hardest way...











!!! question
    Ceho se tykaji ty stranky Puppet, Galaxy etc?


