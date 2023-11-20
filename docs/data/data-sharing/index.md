# Share data among users

Sometimes two or more MetaCentrum users need to work on the same files and directories.

Since setting whole `home` directory as accessible to anyone is considered a security vulnerability (due to the possibility to manipulate sensitive files like .k5login, .bashrc by a third party) such settings are discouraged and are automatically reset.

To make sharing of data possible and at the time safe, we offer two options varying slightly with respect to expected volume of shared data, namely:

1. sharing based on a **group**,
2. sharing based on **project directory**.

!!! todo
    This page is under construction.


<!--
TODO:

- jaky je mezi tim rozdil? Vlastne jen kvoty?
- proc jim pri zakladani projektoveho adresare nepomuzeme vic?

[NFSv4](https://wiki.metacentrum.cz/wiki/Access_Control_Lists_on_NFSv4)



## Sharing data within group



## Sharing data in project 




To share data among a group of users, it is necessary to:

- Create the group within the MetaCentrum infrastructure and manage its users
- Have directories, within which the data will be shared
- Ensure the correct identity within the system/job environment


1. Create the group within the MetaCentrum infrastructure and manage its users

- choose a name for your group and ask us for creating it (write us an email to meta@cesnet.cz)
- you can also write a list of initial members
- once the group is created, you'll be provided with a graphical environment for managing members of the group (using the Perun system)
- further changes in the list of members will be under your control


2. Have directories, within which the data will be shared

Data could be shared either within running jobs (the SCRATCHDIR directory) or within a dedicated directory located under /storage/CITY/home/USER volume or within a dedicated directory located under /storage/projects/PROJECT volume:

- to share data within running jobs, there are no explicit actions necessary
- the scheduler prepares the directory based on your requirements specified in the next section
- to share data within a dedicated directory located under /storage/CITY/home/USER volume, do:
- create a directory, within which the data will be shared

    mkdir /storage/CITY/home/USER/shared

assign it to your group (denoted by "MYGROUP")

    chgrp -R MYGROUP /storage/CITY/home/USER/shared

set an indication to the directory, so that all the data created within it will belong to group associated with its group

    chmod g+s /storage/CITY/home/USER/shared

ensure the correct setting

    ls -ld /storage/CITY/home/USER/shared

- to share data within a dedicated directory located under /storage/projects/PROJECT volume, do:
- write us an email asking to create a project directory
- once the directory is created, follow the similar steps as in the case of /storage/CITY/home/USER volume (see above)

3. Ensure the correct identity within the system/job environment

When creating files, the system has to know under which group identity the files should be created (if the group identity is not enforced by the master directory, see above). Here, it is necessary to distinguish between the work on frontends and the work within running jobs:

- to create files when working on frontends, it is necessary:
- to change your primary group to the requested one

    newgrp MYGROUP # all the created files will be owned by the MYGROUP group

Note that newgrp starts a new sub-shell and should thus be placed at the end of the start-up script.

if necessary, to set the access rights under which the files will be created (via well-known umask command)

    umask 002 # will set the access rights of all the newly created files to rwxrwxr-x

the above lines could be placed into system start-up scripts /storage/*/home/USER/.profile or equivalent file (e.g. /storage/*/home/USER/.bash_profile when it is in use) for automatic setting
           
alternatively, ask us for changing your primary group within the whole MetaCentrum infrastructure

to create files within running jobs, it is necessary:
        
to have the following lines within your script submitted via qsub command (or provide these via command-line options to qsub):

```
#!/bin/bash
#PBS -W umask=002
#PBS -W group_list=MYGROUP
```
- option -W umask=002 ensures the correct access rights to created files (rwxrwxr-x)
- option -W group_list=MYGROUP ensures that all the processes will run under the group MYGROUP

these options further ensure an availability of the $SCRATCHDIR directory to the group members as well -- the directory will be owned by the requested group and the access rights will be rwx (r - read,w - write, x - execute/list):

```
$ qsub -I -W group_list=einfra -W umask=002
qsub: waiting for job 4025666.meta-pbs.metacentrum.cz to start
qsub: job 4025666.meta-pbs.metacentrum.cz ready

konos6$ ls -ld $SCRATCHDIR
drwxrwxr-x 2 makub einfra 6 Feb 13 10:50 /scratch/makub/job_4025666.meta-pbs.metacentrum.cz

konos6$ id
uid=13153(makub) gid=10002(einfra) groups=10000(meta),10002(einfra),10100(storage)
```

!!!warning
    Because of a bug in the Network File System (NFS) we use, it is necessary to explicitely change the group ownership of the newly created files/directories (at the end of an interactive session or job) by calling the command

    chgrp -R MYGROUP DIRECTORY

(Otherwise, the data will be saved under your primary group.) Alternatively, you can ask us for changing your primary group throughout the whole MetaCentrum infrastructure.

4. Ensure the correct identity by using sync_with_group

Some groups find changing umask inconvenient. For these users we recommend another approach.

  1. Copy the files you need to work with from shard directory elsewhere.
  2. Process the data, create new files etc.
  3. When ready to share the data, send them back into shared directory by a command

    sync_with_group group_name source_dir target_dir

where

    group_name = name of the group the project directory belongs to
    source_dir = the working directory
    target_dir = shared project directory

-->
