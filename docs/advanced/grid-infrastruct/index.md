# Grid infrastructure

## Frontends and storages

A **[frontend](/basics/frontends)** is a single machine intended for user logins and ligh pre- and post-processing of data.

A **storage** is a large disc array where user data (user home directories) are kept.

!!! note "Storage names"
    Storages are named according to their physical location (city) + number.

As there is not one huge storage, but several large and loosely interconnected storages, users have access to **several different home directories**.

Every frontend has a `/home` directory mounted to one of the storages, e.g. `/home` of frontend `skirit.metacentrum.cz` is mounted on `/storage/brno2/home`, so when an user is logged on `skirit`, the commands `ls ~` and `ls /storage/brno2/home/user123` are equivalent. 

A frontend has a native home directory on one, and only one, storage; however this is not true the other way round: a home directory on a certain storage may be mounted by more than one frontend:

    user123@user123-XPS-13-9370:~$ ssh nympha.zcu.cz 
    ...
    (BULLSEYE)user123@nympha:~$ pwd
    /storage/plzen1/home/user123   # "plzen1" is native storage for "nympha" frontend
    (BULLSEYE)user123@nympha:~$ exit 
    user123@user123-XPS-13-9370:~$ ssh minos.zcu.cz
    ...
    (BULLSEYE)user123@minos:~$ pwd
    /storage/plzen1/home/user123   # "plzen1" is native storage also for "minos" frontend

The overall schema can be summed up as shown below:

![Frontends, storages and homes connection](frontends-storages-homes.jpg)

**Transition between storages is possible** no matter which frontend an user is logged to. To get to a certain home directory, user does not need to log on a specific frontend. Users can change their home directories by `cd` command.

For example, assume that `skirit.metacentrum.cz` frontend is down and you want to access `brno2` storage:

    user123@user123-XPS-13-9370:~$ ssh tarkil.metacentrum.cz # login to "tarkil" instead
    ...
    (BULLSEYE)user123@tarkil:~$ pwd
    /storage/praha1/home/user123   # I am on "praha1" storage, but need "brno2"
    (BULLSEYE)user123@tarkil:~$ cd /storage/brno2/home/user123 # change to home on "brno2" storage
    (BULLSEYE)user123@tarkil:/storage/brno2/home/user123$ pwd 
    /storage/brno2/home/user123 # I am now on "brno2" storage 

A complete list of storages can be found in table below:

--8<-- "storages-table-1.md"

!!! warning "Backup policy for storages"

    All storages are backed up once a day (normally between 6 a.m. and 7 a.m.), by  snapshot backup. There backups are kept for 2 weeks. For a more complete understanding of how the data are backed up in MetaCentrum service, see #working-with-data chapter.  


## Scratch storages

Scratch storage is a **storage for temporary files for running job**. This storage should be used only during computations and should be freed immediately after your job ends. The location of scratch directory is defined by a system variable `SCRATCHDIR`.
Scratch types

We offer four types of scratch storage:

    scratch_local
        available on every node, located on regular hard disc
        choose this type as a default if you have no reason to do otherwise
        integer type, submitted as scratch_local=10gb
        located in /scratch/USERNAME/job_JOBID
    scratch_ssd
        located on small SSD disc
        ultra fast (compared to local scratch), but smaller in volume
        integer type, submitted as scratch_ssd=1gb
        not available on all computational nodes!
        to check for availability on a particular node: go to https://metavo.metacentrum.cz/pbsmon2/props -> choose a node -> search for scratch_ssd in a gray table
        recommended in jobs where the bottleneck is disc-related operations (applications that create/read a lot of files)
        located in /scratch.ssd/USERNAME/job_JOBID
    scratch_shared
        network volume which is shared between all clusters in a given location (city)
        read/write operation slower than on local scratch
        useful if you need to run more than one application that need access to the same data
        integer type, submitted as scratch_shared=10gb
        not available on all computational nodes!
        to check for availability on a particular node: go to https://metavo.metacentrum.cz/pbsmon2/props -> choose a node -> search for scratch_shared in a gray table
        mounted to directory /scratch.shared/USERNAME/job_JOBID
    scratch_shm
        scratch directory is in RAM
        fastest, but data on scratch do not survive the end/failure of the job
        use when you need ultra fast scratch AND when you absolutely don't care about data from failed/killed/ended jobs
        boolean type, submitted as scratch_shm=true
        maximum size of scratch is defined by mem (memory) parameter
        remember to choose mem large enough (to hold both data in scratch and the actual memory requirements for the job)
        mounted to directory /dev/shm/scratch.shm/USERNAME/job_JOBID

!!! warning "No default scratch"
    For a batch job, you must set the size and type of scratchdir! There is no default type of scratch.

Directory `SCRATCHDIR` is not writable, only it's content is. Therefore you cannot e.g. do `rm -rf $SCRATCHDIR`, but you can `rm -rf $SCRATCHDIR/*`.

Users should always clear the content of scratch directory after the job ends to free disc space. Otherwise, this directory will be automatically deleted after 14 days at most (earlier if there is lack of space on disks).

Examples:

Submit batch job with 100 GB scratch on local disc:

    qsub -l select=1:ncpus=1:mem=4gb:scratch_local=100gb

Submit interactive job with 20 GB memory and scratch in RAM:

    qsub -I -l select=1:ncpus=1:mem=20gb:scratch_shm=true

Submit batch job with 1 GB of scratch on SSD disc:

    qsub -l select=1:ncpus=1:mem=4gb:scratch_ssd=1gb

**System variables**

    SCRATCHDIR
        location of scratch directory
        echo $SCRATCHDIR
    SCRATCH_TYPE
        type of scratch directory
        echo $SCRATCH_TYPE
    SCRATCH_VOLUME
        size of scratch directory
        echo $SCRATCH_VOLUME

<!--

## Computational nodes

!!! todo
    This is a new section to be added to docs

### PBS servers and "their" nodes

- zde vysvetlit ze nody "patri" vzdy primarne nejakemu serveru
- tabulku co k cemu patri
- taky CLI command jak zjistit kteremu serveru co patri a vice versa 

### OS

- o operacnim systemu
- ze je vsude (skoro) Debian, ze se obcas upgraduje
- o baliccich debian-compat
- jak zjistit ktery debian zrovna mame

### CPU architectures

- kde mame jake procesory a v cem se to muze projevovat
- jak zjistit jaka CPU arch kde je

### GPU nodes

- zde dat tabulku serveru s GPU kartami urcenych ke GPU vypoctum

### Whateve

- v zasade zde by se melo vlezt pokud mame nejakou zvlastni skupinu nodu na kterou chceme uzivatele upozornit

-->

## Decomissioned storages

For reference we keep also some history of decomissioned storages and where the data have been moved to, see table below.

--8<-- "storages-decom-table-1.md"









