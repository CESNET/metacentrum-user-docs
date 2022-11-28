# Working with data

This topical guide provides the most important information about data manipulation, storage and archiving in MetaCentrum.

!!! todo
    Definuj hned ze zacatku co je "large data" a "small data", protoze je to rozlisovaci kriterium tohoto clanku.


Data storage: managing large numbers of files

Keeping large number of files (>=million of files) in user's homes is problematic, since it significantly increases the time needed to backup the home directories as well as to manipulate them for any other purpose. At such quantities, the number of the files is the limiting factor, not their size. To keep the service operations sustainable, there is a quota on number of files. We encourage the users who exceed the quota either to remove the data, or to squash them into suitably sized chunks. It is our experience that often the directories with millions of files result from a job gone amok and as such present a "dead weight". Users who really need to store large numbers of files can contact user support meta@cesnet.cz and ask for an exception.
Check your quota of number of files

You can see the state of your quotas at

    the table that appears after you login on a frontend
    your quota overview at MetaVO web

Remove, tar, or tar and archive the excess files

If the data is junk, remove it either within a single command, e.g.

(BUSTER)melounova@tarkil:~$ ssh melounova@storage-brno6.metacentrum.cz rm -rf ~/junk_dir

or wrap the command into a batch job to avoid waiting for the command to end:

(BUSTER)melounova@tarkil:~$ qsub -l walltime=24:00:00 remove_junk_dir.sh

If the data is not junk, pack them them into larger chunks using the tar command either from a command line or from within a batch job:

(BUSTER)melounova@tarkil:~$ ssh melounova@storage-brno6.metacentrum.cz tar -cf not_junk_dir.tar ~/not_junk_dir
(BUSTER)melounova@tarkil:~$ qsub -l walltime=24:00:00 tar_my_files.sh

If you have enough space on your storage directories, you can keep the packed data there. However we encourage users to archive the data that are of permanent value, large and not accessed frequently.

If you really need to keep large numbers of files in your home directory, contact us at user support mail meta@cesnet.cz. 


## Basic commands for data transfer

Basic commands for data transfer are scp, wget and sftp.

Windows alert: Windows users will need an application that emulates the Linux commands for data transfer. See How to ssh from Windows.
scp

scp works in pretty much the same way as normal cp command, only it allows you to copy files between different machines.

marenka@home_PC:~$ scp my_file.txt jenicek@skirit.metacentrum.cz: # copy file "my_file.txt" to a home folder of user "jenicek" on a frontend "skirit.metacentrum.cz"
marenka@home_PC:~$ scp -r my_dir jenicek@skirit.metacentrum.cz: # as above; copy directory "my_dir" together with all subdirectories
marenka@home_PC:~$ scp -r jenicek@skirit.metacentrum.cz:~/results . # from jenicek's home on skirit, copy to marenka's local PC folder "results" 
marenka@home_PC:~$ scp -r jenicek@storage-brno6.metacentrum.cz:~/../fsbrno2/home/jenicek/results . # copy jenicek's folder "results" directly from /storage/brno2 (see section below for explanation of the path and server address)

wget

Alternative way to download data is a wget command. wget will work only if the file is available via ftp or http(s) network protocols, typically when it is a downloadable file on some server. wget is faster and less safe than scp, so it may be a method of choice if you need to download larger amount of data from Internet where privacy is not an issue.

ssh jenicek@skirit.metacentrum.cz # login to a frontend; replace "jenicek" by your real username
jenicek@skirit.metacentrum.cz:~$ mkdir data; cd data # create and enter directory "data" where the data will be downloaded to
jenicek@skirit.metacentrum.cz:~/data$ wget https://www.someServer.org/someData.zip # download file "someData.zip" from a server (= webpage) "https://www.someServer.org"

By wget you can only transfer data to Metacentrum machines. wget is of no use if you want to transfer from Metacentrum.
sftp

sftp is just another protocol for transferring data. Contrary to scp it is interactive, slower and apart from copying it also enables the user to manipulate files and directories on the remote side. We recommend to use scp if you need only to copy the data.
Related topics
Usage of WinSCP 	
About SFTP protocol 	

Windows users need an SFTP client, we recommend the WinSCP application. Keep in mind you have to fill in as target chosen NFS4 server instead of frontend in Step 1. Make sure you have selected SFTP file protocol, too.

Linux users just open a terminal and use sftp command as shown below. More about sftp command can be found in this external link.

sftp 'META username'@target_NFS4_server # Login
help # Shows available commands
get target_file # Downloads target file to your local system
get -r target_directory # Downloads target directory to your local system
put target_file # Uploads target file to server
put -r target_directory # Uploads target directory to server

There is a bug affecting Ubuntu 14.04+ concerning the recursive copy command: put -r . If put -r fails, create the target directory on the server first to work around this issue.

SFTP1.png
rsync

The rsync command is a more advanced and versatile copying tool. It enables the user to synchronize the content of two directories in a more efficient way than scp, because rsync copies only the differences between the directories. Therefore it is often used as a tool for regular backups.

Copy directory data to archive:

$ rsync -zvh /storage/brno2/home/melounova/data /storage/du-cesnet/home/melounova/VO_metacentrum-tape_tape

Copy only the content of directory data to archive:

$ rsync -zvh /storage/brno2/home/melounova/data/ /storage/du-cesnet/home/melounova/VO_metacentrum-tape_tape







## Moderate data: use a frontend  

Moderate amount of data (hundreds of individual files and/or less that 100 GB) can be transferred to/from MetaCentrum machines in a straightforward way.

The server you login to is one of the frontends.

The path to locate your destination/source data is the same path you see when you ale logged in on a frontend.

Example:

melounova@home_PC:~$ scp melounova@skirit.ics.muni.cz:/storage/brno2/home/melounova/foo . # copy file "foo" from "brno2" storage through frontend skirit to my local PC



## Large data: avoid frontend

Data transfer between storages and PC, principles

When transferring large amount of data we ask users to avoid frontends. This is because transfer of large data can overload the frontend and cause slowdown, which is inconvenient to other users.

For example, the command

melounova@home_PC:~$ scp -r melounova@skirit.ics.muni.cz:/storage/brno2/home/melounova/dir-with-thousands-files .

does this:

Scp frontend.jpg

The data are not stored on frontend, but they load its CPUs and RAM. Therefore for large data it is better to access the data storages (NFS4 servers) directly.

The direct-access-equivalent to the command above is

melounova@home_PC:~$ scp -r melounova@storage-brno6.metacentrum.cz:~/../fsbrno2/home/melounova/dir-with-thousands-files . 

and it can be visualised as:

Scp direct.jpg

Why do I log in to brno6, if I want to access brno2?

As hardware is changing, the user data are moved to new disk fields with new names. For convenience the old names, such as "brno2" are kept as symlinks, so that users don't need to revise all their scripts and aliases every time there is a change. When working from a frontend, everything remains the same no matter the changes in the background. For example, the brno2 still exists as a symlink, although the original brno2-hardware was replaced and the data now reside physically on brno6.

Since the direct access avoids the frontend, you cannot use the symbolic links, but you need to use real server names and correct paths. Although they can be figured out from the directory tree, for convenience we collect in the following table a list of storages, list of server names and corresponding paths. 


!!! todo
    TABLE



### Move data to/from a storage directly

### Move data between storages

Data transfer between storages using scp

If you want to move large amount of data between storages, the setup is similar as in the case when you copy data between your PC and a storage. The only difference is the you cannot access storages interactively (see Working with data) and therefore the scp command has to be passed as an argument to ssh command.

For example, copy file foo from plzen1 to your home at brno2:

ssh USERNAME@storage-plzen1.metacentrum.cz "scp foo storage-brno6.metacentrum.cz:~/../fsbrno2/home/USERNAME/"

If you are already logged on a frontend, you can simplify the command to:

ssh storage-plzen1 "scp foo storage-brno6:~/../fsbrno2/home/USERNAME/"

The scp-command examples shown above will run only until you either disconnect, or the validity of Kerberos ticket expires. For longer-lasting copy operations, it is a good idea to submit the scp command within a job. Prepare a trivial batch script called e.g. copy_files.sh

 #!/bin/sh
 #PBS -N copy_files
 #PBS -l select=1:ncpus=1:scratch_local=1gb
 #PBS -l walltime=15:00:00

 ssh storage-plzen1 "scp foo storage-brno6:~/../fsbrno2/home/USERNAME/"

and submit it as qsub copy_files.sh.
Data transfer between storages using rsync

Another option how to pass data between storages is to use rsync command.

For example, to move all your data from plzen1 to brno12-cerit:

(BUSTER)USERNAME@skirit:~$ ssh storage-plzen1 "rsync -avh ~ storage-brno12-cerit:~/home_from_plzen1/"

To move only a selected directory:

(BUSTER)USERNAME@skirit:~$ ssh storage-plzen1 "rsync -avh ~/my_dir storage-brno12-cerit:~/my_dir_from_plzen1/"

You can wrap the rsync command into a job, too.

 #!/bin/sh
 #PBS -N copy_files
 #PBS -l select=1:ncpus=1:scratch_local=1gb
 #PBS -l walltime=15:00:00

 ssh storage-plzen1 "rsync -avh ~ storage-brno12-cerit:~/home_from_plzen1/"

If you then look at the output of running job you can check how the data transfer proceeds.

USERNAME@NODE:~$ tail -f /var/spool/pbs/spool/JOB_ID.meta-pbs.metacentrum.cz.OU




### Direct access to storages

Other ways to access /storage directly
ssh protocol

Selected programs serving for data manipulation directly at the NFSv4 storage server can be run through SSH. On the other hand these operations can easily overload NFSv4 server. If you plan massive file moves, contact us in advance, please.

Notes

    Apart from the cerit NFS4 servers, there is no shell available on storage servers, so typing simply ssh user@NFS4.storage.cz will not work (you can log in, but you will be immediately logged out). Instead, use the construction ssh user@NFS4.storage.cz command.
    It is not possible to run programs at storage volume. No computation should be run at the NFSv4 server.
    When copying files with dd set block size (bs parameter) to at least 1 M (comparing with default 512 byte). Operations will be faster.

On storage servers, only the following commands are available:

    /usr/bin/scp,
    /usr/lib/sftp-server,
    /bin/cp,
    /bin/ls,
    /bin/tar,
    /bin/cat,
    /bin/dd,
    /bin/rm,
    /bin/mkdir,
    /bin/mv,
    /bin/rmdir,
    /bin/chmod,
    /usr/bin/gzip,
    /usr/bin/gunzip

Example

List the content of home directory on remote machine by the following command:

ssh USERNAME@storage-brno6.metacentrum.cz ls -l

Full path can be used as well:

ssh USERNAME@storage-brno6.metacentrum.cz ls -l /home/USERNAME


### Mount storage on local station

Mount storage on local station

For more advanced users, there is also the possibility to mount the data storages locally. The NFS4 servers can then be accessed in the same way as local disk. Follow the tutorial in [Mounting data storages on local station] to learn how to mount the storages locally. 


### How to remove large data

!!! todo
    tdy by to chtelo dat nejaky navod tem uzivatelum kteri potrebuji VYMAZAT neco velkeho; jak to maji udelat a pokud to nastroji ktere maji k dispozici nejde tak jak maji poznat situaci kdy se o to nemaji pokouset a napsat na provoz

## Quotas on storages

## Data backup policies

Sem zpracovat z wiki vse od [Data storage](https://wiki.metacentrum.cz/wiki/Working_with_data#Data_storage) do konce stranky.




!!! todo

    Plus sem dat tez veci z [Politika zalohovani](https://wiki.metacentrum.cz/wiki/Politika_zalohovani)



