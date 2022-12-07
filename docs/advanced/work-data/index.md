# Working with data

This chapter provides basic guides on data manipulation, storage and archiving within MetaCentrum infrastructure. For general advice on scientific data management and data good practice, see **link to some einfra part on general data management**. 

!!! todo
    Meli bychom mit na urovni einfra (navod spolecny pro vsechny sluzby) neco podobneho jako [CSC.fi obecne o datech](https://docs.csc.fi/data/datasets/datamanagement/#overview).

When dealing with data in general, the most important criteria is the total volume/number of files that are to be moved in a single operation.

As a rule of thumb,

- Moderate data is up to **1 000 individual files** AND up to **100 GB** of total size.
- Large data is more than any of that.

## Quotas on storages

Keeping large data volumes or too many files in user's homes is problematic, since it significantly increases the time needed to backup the home directories as well as to manipulate them for any other purpose. To keep the service operations sustainable, **a quota on number of files** as well as **a quota on total volume of data** is set on most storages.

You can see the state of your quotas:

- in the table that appears every time when you login on a frontend,
- at your [quota overview in PBSmon](http://metavo.metacentrum.cz/en/myaccount/kvoty).

### When you exceed a quota 

#### Delete it

If you produce **large** amount of data by mistake, remove it either within a single command, e.g.

    (BUSTER)user123@tarkil:~$ ssh user123@storage-brno6.metacentrum.cz rm -rf ~/junk_dir

or wrap the command into a batch job to avoid waiting for the command to end:

    (BUSTER)user123@tarkil:~$ qsub -l walltime=24:00:00 remove_junk_dir.sh

If you produce **insanely large** amount of files that need to be removed, contact our User support.

!!! todo
    Existuje nejaky priklad manipulace s daty, kdy jsou tak velka, ze to nema mazat uzivatel ani v ramci batch jobu? (Nejake extremne rekurzivni vytvareni zanorenych adresaru apod...)

#### Pack small files into large chunks

If the data is not junk, pack them them into larger chunks using the `tar` command either from a command line or from within a batch job:

    (BUSTER)user123@tarkil:~$ ssh usr123@storage-brno6.metacentrum.cz tar -cf not_junk_dir.tar ~/not_junk_dir
    (BUSTER)user123@tarkil:~$ qsub -l walltime=24:00:00 tar_my_files.sh

If you have enough space on your storage directories, you can keep the packed data there. However we encourage users to [archive](#data-archiving) any finished-project data of permanent value.

If you for some reason need to shift some of your quotas, [contact us](/contact).

#### Archive the data

Due both to operational reasons (regular backups of storages) and for safety reasons (storages have weaker backup policy than archives), users should [archive](#data-archiving) any data that are of permanent value to them and may be needed in future.

Archiving data from finished projects also helps to avoid problems with storage quotas.

#### Move the data to another storage

This is an intermediate solution. The storages quotas are separate, so you can temporarily dump some data to different storage where you have more free space.

## Root filesystem quota

Apart of quota set on storage, there is a **separate quota for user's data outside the home directory**.

This applies to situations when **one of user's processes writes to /tmp directory** and (on computational node) when **the user's job produces large standard output (.OU) or error (.ER) files in /var/spool directory**.

![Data quotas overview](/advanced/work-data/data-quotas-scheme.jpg)

!!! warning
    The root filesystem quota is relatively small. If it is exceeded, an email is sent to the user with instructions what to do. Until the data are deleted, no further calculations will be run on the computational node.

**How to remove the files**

1. Login onto the affected machine.

    `ssh user123@halmir18.metacentrum.cz`

2. List the files in your filesystem quota using the `check-local-quota` tool.

    `check-local-quota`

3. Inspect the files; if they contain valuable data, copy them to your home directory. After that remove them.
4. Check local quota again; there should be no files left.

**How to prevent the situation**

*Redirect TMPDIR to SCRATCHDIR*

A common variable name for a directory where temporary files shall be kept is `TMPDIR`.

Some software uses a `/tmp` directory as a default for temporary files. Try adding 

    export TMPDIR=$SCRATCHDIR

to the beginning of your batch script. This will force the application to place the temporary files into scratch directory instead.

*Dump/redirect large outputs*

If the problem was caused by large `.OU` or `.ER` files, either redirect them to `/dev/null` directory

    ./your_application ... > /dev/null # redirect .OU to /dev/null
    ./your_application ... 2> /dev/null # redirect .ER to /dev/null
    ./your_application ... > /dev/null 2>&1 # redirect both .OU and .ER to /dev/null

or redirect them to a file in your scratch directory

    ./your_application ... > standard_output.txt # redirect .OU to standard_output.txt
    ./your_application ... 2> error_output.txt # redirect .ER to error_output.txt
    ./your_application ... > std_err_output.txt 2>&1 # redirect both .OU and .ER to std_err_output.txt

If you redirect to `/dev/null`, the data will be dumped and there is no way to get them back later. The second way will make possible to inspect the files after your calculation is done.

The above mentioned causes are the most common ones. Your filesystem quota can be exceeded also in other ways. If you are not sure what caused the problem and how to prevent the situation to happen again, feel free to [contact us](/contact).

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

!!! warning "Windows alert"
    Windows users need an SFTP client, we recommend the WinSCP application. Keep in mind you have to fill in as target chosen NFS4 server instead of frontend in Step 1. Make sure you have selected SFTP file protocol, too.

1.    `sftp user123@target_NFS4_server` # Login
2.    `help` List available commands
3.    `get target_file` Download target file to your local system
4.    `get -r target_directory` Download target directory to your local system
5.    `put target_file` Upload target file to server
6.    `put -r target_directory` Upload target directory to server

!!! bug
    There is a bug affecting Ubuntu 14.04+ concerning the recursive copy command. If `put -r` fails, create the target directory on the server first to work around this issue.

![SFTP screenshot bug](/advanced/work-data/sftp-bug.png)

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

There are many other options to customize the tar command. For the full description, read manual pages (man tar). 

## Moderate data handling

Moderate amount of data can be transferred to/from MetaCentrum machines in a straightforward way *via the frontend*.

Example:

    user123@home_PC:~$ scp user123@skirit.ics.muni.cz:/storage/brno2/home/user123/foo . # copy file "foo" from brno2 storage through skirit to a local PC

The overall scheme of "transferring data through frontend":

![Copy data to storage through frontend](/advanced/work-data/cp-data-through-frontend.jpg)

!!! warning
    As you can see from the picture, all the traffic has to be processes by a frontend (data are not stored on frontend, but they load its CPUs and RAM), although the frontend is neither the source nor target of the data.

## Large data handling

When transferring large amount of data we ask users to avoid frontends. Large data should be transferred directly to/from  storages (NFS4 servers).

!!! warning 
    Do not use frontends to transfer large data. Processes consuming inadequate CPU and RAM frontend capacity will be stopped.

Example:

    user123@home_PC:~$ scp user123@storage-brno2.metacentrum.cz:~/foo . # copy file "foo" from brno2 storage directly to a local PC

The overall scheme can be depicted as below:

![pic](/advanced/work-data/cp-data-directly-storage.jpg)

<!-- potrebujeme tuhle tabulku??? See ~/test_direct_access_storages.sh
--8<-- "storages-direct-ssh-table.md"
-->

<!-- a todle slozite vysvetlovani jeste plati?
The direct-access-equivalent to the command above is

    melounova@home_PC:~$ scp -r melounova@storage-brno6.metacentrum.cz:~/../fsbrno2/home/melounova/dir-with-thousands-files . 

Why do I log in to brno6, if I want to access brno2?

As hardware is changing, the user data are moved to new disk fields with new names. For convenience the old names, such as "brno2" are kept as symlinks, so that users don't need to revise all their scripts and aliases every time there is a change. When working from a frontend, everything remains the same no matter the changes in the background. For example, the brno2 still exists as a symlink, although the original brno2-hardware was replaced and the data now reside physically on brno6.

Since the direct access avoids the frontend, you cannot use the symbolic links, but you need to use real server names and correct paths. Although they can be figured out from the directory tree, for convenience we collect in the following table a list of storages, list of server names and corresponding paths.-->

### Move data between storages

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

    USERNAME@NODE:~$ tail -f /var/spool/pbs/spool/JOB_ID.meta-pbs.metacentrum.cz.OU

### Send data outside MetaCentrum

In case you need to pass large amount of data to someone without Metacentrum access, we recommend to use Cesnet Filesender upload. On this page we describe the CLI version, which can be used directly from Metacentrum frontends.

#### Get Filesender config file

If you use filesender for the first time, you have to get the configuration file first. If you already have a configuration file, skip this step and go directly to the next chapter.

**Log on Cesnet Filesender homepage**

Use your Metacentrum username and password to login to [Cesnet Filesender homepage](https://filesender.cesnet.cz/).

**Upload some dummy file to initialize the database**

There is a small bug causing that the GUI does not display entry for users with no upload history. To overcome this, upload and send (to yourself) any dummy file by drag-and-drop first.

**Download configuration file from Cesnet Filesender**

On main page, choose My Profile --> click on the link Download Python CLI client configuration.

![Filesender](filesender_1.png)

Then,

![Filesender](filesender_2.png)

The configuration file is a normal text file. Nothing needs to be modified or added to this file, just save it somewhere on your frontend.

#### Upload files to Filesender

To make filesender run, add it as a module:

    module add filesender-cli

and export a path to the configuration file:

    export FILESENDER_CONFIG=/storage/.../path-to-configuration-file # default configuration is in $HOME/.filesender/filesender.py.ini

Then you can upload the file:

    filesender.py -s "Subject" -r recipient_1@example.org    file.tar.gz     # upload file.tar.gz

#### Download files from Filesender

Once you have received an email with a notification that some file has been uploaded to Filesender.Cesnet.cz and you have been granted permission to download its contents, click on the Download link.

![Filesender](filesender_3.png)

A new window in your browser will be open where you have to copy a URL hidden under the Download button.

Go to the terminal and use wget utility to download the file. The syntax looks like:

    wget -O "file_name" "URL"

Replace file\_name with name as you wish and URL by saved URL in your clipboard. Do not forget to use double quotes.

![Filesender](filesender_4.png) 

## Direct access to storages

### ssh protocol

Selected commands for data manipulation directly at the storage server can be run through `ssh`. On the other hand these operations can easily overload NFSv4 server.

!!! warning
    If you plan massive file moves directly accessing the storages, contact us in advance.

!!! warning
    It is not possible to run programs at storage volume. No computation should be run at the NFSv4 server.

!!! tip
    When copying files with `dd` set block size (bs parameter) to at least 1 M. Operations will be faster.

Apart from the **cerit storages** (= storages with "cerit" in the name of the server), there is **no shell** available on storage servers, so `ssh user123@storage_name.metacentrum.cz` will not work. (You *will* log in, but you will be immediately logged out.) Instead, use the construction like `ssh user123@storage_name.metacentrum.cz command`.

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

**Example**

List the content of home directory on remote machine:

    ssh USERNAME@storage-brno6.metacentrum.cz ls -l 

or

    ssh USERNAME@storage-brno6.metacentrum.cz ls -l /home/USERNAME

### Mount storage on local station

For more advanced users, there is also the possibility to mount the data storages locally. The NFS4 servers can then be accessed in the same way as local disk.

For more detail, follow the tutorial on [how to mount storages on local station](/advanced/mount-storages).

## Data backup 

There are three data storages types offered by MetaCentrum **with respect to backup policy**:

| Storage type 	 | Basic description | Typical usecase| 
|----------------|-------------------|----------------|
| Scratch storages | Fast storages with minimum data capacity | Storing data during computations |
| Disk arrays | Common `/storage` volumes, user homes | Storing data between computations |
| Hierarchical storages | Storages with massive data capacity | Data archiving |


!!! warning "Homes are not robustly backed up"
    Keep in mind that the **data in your home directory** are backed up only in a form of **daily snapshots** stored **on the same disk** array, and thus are prone to loss in case of hardware failure or accident. For data of permanent value consider keeping your own copy or using hierarchical storages (see below).

### Scratch storages

Scratch storages are accessible via scratch directory on computational nodes. Use this storages during computations only. This means the batch script should clean up the scratch after the job is done or, if the data are left in scratch, it should be done manually (as is the case when the job fails or is killed). Data on scratch storages are automatically deleted after 14 days.

### Disk arrays

Disk arrays are several connected hard drives and are accessible via `/storage` directories. Files are stored on multiple drives, which guarantees higher I/O data speed and reliability. Use disk arrays for preparing data and storing data between jobs.

Disk arrays have a backup policy of saving snapshots (once a day, usually at night/early morning) of user's data. The snapshots are kept at least 14 days backwards. This offers some protection in case user unintentionally deletes some of their files. Generally, data that existed the day before the accident can be recovered. The snapshots are stored, however, on the same disk arrays as the data, so in case of e.g. hardware failure of the disks these backups will be lost. Therefore we recommend strongly to backup any important data elsewhere. For archiving purposes MetaCentrum offers dedicated storage servers.

### Disk arrays with hierarchical storage

Disk arrays with hierarchical storage have a more robust backup policy and should be used primarily for archiving purposes. To increase redundancy of data, they contain several layers of storage media. The first layer is a disk array, lower layers are made of MAIDs (Massive Array of Idle Drives) or magnetic tape libraries. Lower layers have bigger capacity but slower access times. Data are moved automatically among these layers based on their last usage. The most important consequence from the user's point of view is that the access to long-unused data may be slower than to the recently-used ones.

Use hierarchical storages for storing data which you do not currently use, but which are important and not easily reproducible in the future. 

## Data archiving

!!! info "Data archiving and backup is service of MetaCentrum grid computing"
    Central to MetaCentrum grid computing service is computing, not storage of data. Although the data on user homes are backed up to a certain level, not all risks are covered. MetaCentrum grid storages are unsuitable for archiving the data. For serious back-up and archiving of data use [Cesnet data storage service](https://du.cesnet.cz/en/start). Information in this section is a rough overview of data services provided by Cesnet data storage service. In case of problems/questions, we recommend to [contact them](https://du.cesnet.cz/en/o_nas/start ) Cesnet storage department homepage or contact support@cesnet.cz (see Cesnet storage department FAQs).

Since the data in "normal" home directories are backed-up only in a form of snapshots, they are not protected against loss due to hardware failure. The data of permanent value which would be hard to recreate should be backed-up on dedicated servers with hierarchical storage policy.

**Current archive servers**

| Server name | Mounted at | Note |
|-------------|------------|-------|
| storage-du-cesnet.metacentrum.cz | /storage/du-cesnet/ | primary for all Metacentrum users |
| storage-brno14.ceitec.metacentrum.cz | /storage/brno14-ceitec/ | for NCBR/CEITEC users only |

The users are free to access any server in the table above directly, however we recommend to use directory:

- `/storage/du-cesnet/home/META_username/VO_metacentrum-tape_tape-archive/` for archiving, or
- `/storage/du-cesnet/home/META_username/VO_metacentrum-tape_tape/` for backup service.

!!! warning
    Never leave data directly in the home, i.e. in` /storage/du-cesnet/home/META_username/`. The home directory should serve only to keep SSH keys, making links to directories with the actual data and other configuration files. To enforce this, there is tiny quota set on home directory (see further [info on Cesnet data storage service pages](https://du.cesnet.cz/en/navody/home-migrace-plzen/start)).

**`tape_tape_archive` vs `tape_tape` : differences**

Permanent data archives are normally limited in size (typically results of some research, not raw data) and the user wants to keep then "forever". Therefore the `VO_metacentrum-tape_tape-archive` has user quota set for volume of data and/or number of files. On the other hand the data are not removed after a time (they do not "expire"). Use this link if you want to stash away data of permanent value.

Backed-up data serve to protect from data loss in case the primary data are lost. Typically these data need not to be kept for a very long time. Therefore in `VO_metacentrum-tape_tape` the files older than 12 months are automatically removed (they are considered as "expired"). Use this link if you want to protect your current data e.g. from HW failure of the server where the primary data are stored.

**A few notes:**

- Actual usage of storages are on [PBSmon](http://metavo.metacentrum.cz/pbsmon2/nodes/physical), search for "Hierarchical storages"
- The documentation of the directory structure in HSM servers can be found on [Cesnet data storage service page](https://du.cesnet.cz/wiki/doku.php/en/navody/home-migrace-plzen/start)
- The complete [storage facility documentation](https://du.cesnet.cz/wiki/doku.php/en/navody/start)
- On the HSM storages the user quota is not applied. Only a technical limitation of 5TB, involving an overloading of the HSM with a one-time data copy, is applied.

**Transfering the files to/from the archive**

!!! note 
    In general: the smaller number of files in the archive, the better (it speeds operations up and generates lower load on the storage subsystems; on the other hand, packing the files makes searching less comfortable). In case you need to archive a large number of small files, we recommend strongly to pack them before, as read/write operations are slower with many small files.

- if most of your files are large (hundreds of MBs, GBs, ...), don't bother with packing them and make a one-to-one copy to the archive,
- if your files are smaller and you don't plan to search individual files, pack them into tar or zip files,
- from the technical point of view, optimal "chunk" of packed data is 500 MB or bigger,
- don't use front-end servers for anything else than moving several small files! Submit a regular job and/or take an interactive job instead to handle with the archival data
- keep in mind that the master HOME directory of each HSM storage is dedicated just for initialization scripts, and thus has a limited quota of just 50 MB.

<!--
!!! todo
    Plus sem dat tez veci z [Politika zalohovani](https://wiki.metacentrum.cz/wiki/Politika_zalohovani)
-->



