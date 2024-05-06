# Data handling in general

This chapter provides basic guides on data manipulation within MetaCentrum infrastructure.

When dealing with data, the most important criteria is the **total volume**/**number of files** that are to be moved in a single operation.

As a rule of thumb,

- moderate data is up to **1 000 individual files** AND up to **100 GB** of total size,
- large data is more than any of that.

## Data manipulation commands

### `scp`

scp works in pretty much the same way as normal `cp`, only it allows you to copy files between different machines.

    user123@home_PC:~$ scp -r my_dir user123@skirit.metacentrum.cz: # copy directory "my_dir" from user's PC to a home directory on skirit
    user123@home_PC:~$ scp -r user123@skirit.metacentrum.cz:~/results . # from user123's home on skirit, copy to user123's PC folder "results" 

### `wget`

Alternative way to download data is a `wget` command. `wget` will work only if the **file is available via ftp or http(s) protocols**, typically when it is a downloadable file on some server. `wget` is faster and less safe than `scp`, so it may be a method of choice if you need to download larger amount of data from a server where privacy is not an issue.

    ssh user123@skirit.metacentrum.cz # login to a frontend
    user123@skirit.metacentrum.cz:~$ mkdir data && cd data 
    user123@skirit.metacentrum.cz:~/data$ wget https://www.someServer.org/someData.zip # download file someData.zip from server https://www.someServer.org

Using `wget` you can only transfer data **to** Metacentrum machines.

`wget` is of no use if you want to transfer **from** Metacentrum.

### `sftp`

sftp is just another protocol for data transfer. Contrary to `scp` it is **interactive** and apart from copying it also enables the user to manipulate files and directories on the remote side. We recommend to use `scp` if you need only to copy the data.

!!! warning "Windows users alert"
    Windows users need an SFTP client, we recommend the WinSCP application. Keep in mind you have to fill in as target chosen NFS4 server instead of frontend in Step 1. Make sure you have selected SFTP file protocol, too.

1.    `sftp user123@target_NFS4_server` # Login
2.    `help` List available commands
3.    `get target_file` Download target file to your local system
4.    `get -r target_directory` Download target directory to your local system
5.    `put target_file` Upload target file to server
6.    `put -r target_directory` Upload target directory to server

!!! bug
    There is a bug affecting Ubuntu 14.04+ concerning the recursive copy command. If `put -r` fails, create the target directory on the server first to work around this issue.

![SFTP screenshot bug](../../data/data-within/sftp-bug.png)

### `rsync`

The `rsync` command is a more advanced and versatile copying tool. It enables the user to synchronize the content of two directories in a more efficient way than scp, because `rsync` copies only the differences between the directories. Therefore it is often used as a tool for regular backups.

**Examples**

Copy directory data to archive:

    $ rsync -zvh /storage/brno2/home/user123/data /storage/du-cesnet/home/user123/VO_metacentrum-tape_tape

Copy only the content of directory data to archive:

    $ rsync -zvh /storage/brno2/home/user123/data/ /storage/du-cesnet/home/user123/VO_metacentrum-tape_tape

### `tar`

`tar` (tape archiver) command enables to pack files and directories into one archive file. `tar` by itself does not compress the size of the files, and the resulting volume of the packed archive is roughly the same as the sum of the volumes of individual files.

`tar` is often used together with commands for file compression like `gzip`.

**Examples**

In `/storage/du-cesnet/home/USER/VO_metacentrum-tape_tape-archive`, create uncompressed archive of the directory `~/my-archive`:

    tar cvf /storage/du-cesnet/home/USER/VO_metacentrum-tape_tape-archive/my-archive.tgz ~/my-archive

In `/storage/du-cesnet/home/USER/VO_metacentrum-tape_tape-archive`, create archive of the directory `~/my-archive` and compress it by `gzip` command:

    tar czvf /storage/du-cesnet/home/USER/VO_metacentrum-tape_tape-archive/my-archive.tgz ~/my-archive

List the content of the existing archive:

    tar tzf /storage/du-cesnet/home/USER/VO_metacentrum-tape_tape-archive/my-archive.tgz

Unpack the *whole* archive `my-archive.tgz` residing in `storage/du-cesnet/home/USER/VO_metacentrum-tape_tape-archive/` into current directory:

    tar xzvf /storage/du-cesnet/home/USER/VO_metacentrum-tape_tape-archive/my-archive.tgz

Unpack *part* of the archive:

    tar tzf /storage/du-cesnet/home/USER/VO_metacentrum-tape_tape-archive/my-archive.tgz # list the content of the archive
    # unpack only file PATH1/file1 and directory PATH2/dir2 into the current directory
    tar xzvf /storage/du-cesnet/home/USER/VO_metacentrum-tape_tape-archive/my-archive.tgz "PATH1/file1" "PATH2/dir2"

There are many other options to customize the tar command. For the full description, read manual pages (`man tar`). 

## Moderate data handling

Moderate amount of data can be transferred to/from MetaCentrum machines in a straightforward way through the frontend.

Example:

    user123@home_PC:~$ scp user123@skirit.ics.muni.cz:/storage/brno2/home/user123/foo . # copy file "foo" from brno2 storage through skirit to a local PC

![Copy data to storage through frontend](cp-data-through-frontend.jpg)

!!! warning
    As you can see from the picture, all the traffic has to be processes by a frontend (data are not stored on frontend, but they load its CPUs and RAM), although the frontend is neither the source nor target of the data.

## Large data handling

!!! warning 
    Do not use frontends to transfer large data. Processes consuming inadequate CPU and RAM frontend capacity will be stopped.

!!! tip
    See **[table of storages](../../computing/storages)** for storage servers addresses and mount points.

Example:

    user123@home_PC:~$ scp user123@storage-brno2.metacentrum.cz:~/foo . # copy file "foo" from brno2 storage directly to a local PC

The overall scheme can be depicted as below:

![pic](cp-data-directly-storage.jpg)

!!! note 
    In general: the smaller number of files in the archive, the better (it speeds operations up and generates lower load on the storage subsystems; on the other hand, packing the files makes searching less comfortable). In case you need to archive a large number of small files, we recommend strongly to pack them before, as read/write operations are slower with many small files.

- if most of your files are large (hundreds of MBs, GBs, ...), don't bother with packing them and make a one-to-one copy to the archive,
- if your files are smaller and you don't plan to search individual files, pack them into `.tar` or `.zip` files,
- from the technical point of view, optimal "chunk" of packed data is 500 MB or bigger,
- don't use front-end servers for anything else than moving several small files! Submit a regular job and/or take an interactive job instead to handle with the archival data.
- keep in mind that the master HOME directory of each HSM storage is dedicated just for initialization scripts, and thus has a limited quota of just 50 MB.

<!-- a todle slozite vysvetlovani jeste plati?

The direct-access-equivalent to the command above is

    melounova@home_PC:~$ scp -r melounova@storage-brno6.metacentrum.cz:~/../fsbrno2/home/melounova/dir-with-thousands-files . 

Why do I log in to brno6, if I want to access brno2?

As hardware is changing, the user data are moved to new disk fields with new names. For convenience the old names, such as "brno2" are kept as symlinks, so that users don't need to revise all their scripts and aliases every time there is a change. When working from a frontend, everything remains the same no matter the changes in the background. For example, the brno2 still exists as a symlink, although the original brno2-hardware was replaced and the data now reside physically on brno6.

Since the direct access avoids the frontend, you cannot use the symbolic links, but you need to use real server names and correct paths. Although they can be figured out from the directory tree, for convenience we collect in the following table a list of storages, list of server names and corresponding paths. 
-->

**Move data between storages**

**Using scp**

If you want to move large amount of data between storages, the setup is similar as in the case when you copy data between your PC and a storage. The only difference is the you cannot access storages interactively and therefore the scp command has to be passed as an argument to `ssh` command.

For example, copy file foo from plzen1 to your home at brno2:

    ssh USERNAME@storage-plzen1.metacentrum.cz "scp foo storage-brno6.metacentrum.cz:~/../fsbrno2/home/USERNAME/"

If you are already logged on a frontend, you can simplify the command to:

    ssh storage-plzen1 "scp foo storage-brno6:~/../fsbrno2/home/USERNAME/"

The examples shown above will run only until you either disconnect, or the validity of Kerberos ticket expires. For longer-lasting copy operations, it is a good idea to submit the `scp` command within a job. Prepare a trivial batch script called e.g. `copy_files.sh`

````
#!/bin/sh
#PBS -N copy_files
#PBS -l select=1:ncpus=1:scratch_local=1gb
#PBS -l walltime=15:00:00

ssh storage-plzen1 "scp foo storage-brno6:~/../fsbrno2/home/USERNAME/"
````

and submit it as `qsub copy_files.sh`.

**Using rsync**

Another option how to pass data between storages is to use `rsync` command.

For example, to move all your data from plzen1 to brno12-cerit:

    (BUSTER)USERNAME@skirit:~$ ssh storage-plzen1 "rsync -avh ~ storage-brno12-cerit:~/home_from_plzen1/"

To move only a selected directory:

    (BUSTER)USERNAME@skirit:~$ ssh storage-plzen1 "rsync -avh ~/my_dir storage-brno12-cerit:~/my_dir_from_plzen1/"

You can wrap the `rsync` command into a job, too.

````
#!/bin/sh
#PBS -N copy_files
#PBS -l select=1:ncpus=1:scratch_local=1gb
#PBS -l walltime=15:00:00

ssh storage-plzen1 "rsync -avh ~ storage-brno12-cerit:~/home_from_plzen1/"
````

If you then look at the output of running job you can check how the data transfer proceeds.

    USERNAME@NODE:~$ tail -f /var/spool/pbs/spool/JOB_ID.pbs-m1.metacentrum.cz.OU

## Direct access to storages

### ssh protocol

Selected commands for data manipulation directly at the storage server can be run through `ssh`.

!!! tip
    When copying files with `dd` set block size (bs parameter) to at least 1 M. Operations will be faster.

Apart from the **cerit storages** (those with "cerit" in the name of the server), there is **no shell** available on storage servers, so `ssh user123@storage_name.metacentrum.cz` will not work. Instead, use the construction like `ssh user123@storage_name.metacentrum.cz command`.

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

!!! warning "No ssh by login and password to storage-du-cesnet.metacentrum.cz"
    Since April 2023, CESNET Storage department service does not allow to log in to their servers by login and password. To `ssh` to `storage-du-cesnet.metacentrum.cz`, users have to use either Kerberos ticket or ssh keys. See more on [Cesnet Storage Department service pages](https://du.cesnet.cz/en/novinky/start).

**Example**

List the content of home directory on remote machine:

    ssh USERNAME@storage-brno6.metacentrum.cz ls -l 

or

    ssh USERNAME@storage-brno6.metacentrum.cz ls -l /home/USERNAME

### Mount storages locally

For more advanced users, there is also the possibility to mount the data storages locally. The NFS4 servers can then be accessed in the same way as local disk.

For more detail, follow the tutorial on [how to mount storages on local station](../../computing/mount-storages).

