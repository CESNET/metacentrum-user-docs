# Storage Department services

The CESNET Storage Department provides a backup and archiving service. It is available to all users with **MetaCentrum login and password**.

Storage Department data policies will be described to a certain level at this page. For more detailed information, users should however navigate the [Storage Department documentation pages](https://du.cesnet.cz/en/start).

## Tape storage

!!! info "Data archiving and backup is not MetaCentrum service"
    From within MetaCentrum frontend, users can **ssh**/**scp** to Storage Department infrastructure. Information in this section is a rough overview of data services provided by Cesnet Storage Department. In case of problems/questions, we recommend to [contact Cesnet Storage Department](https://du.cesnet.cz/en/o_nas/start).

![pic](meta-vs-du-dirs.jpg)

Underlying infrastructure in Storage Department are **servers with hierarchical storage policy**. To increase redundancy of data, these discs contain several layers of storage media: first layer is a disk array, lower layers are made of MAIDs (Massive Array of Idle Drives) or magnetic tape libraries.

- Lower layers have bigger capacity but slower access times.
- Data are moved automatically among these layers based on their last usage.
- The most important consequence from the user's point of view is that the access to unused data may be slower than to the recently used ones.

**Current Storage Department servers**

| Server name | Mounted at | Note |
|-------------|------------|-------|
| storage-du-cesnet.metacentrum.cz | /storage/du-cesnet/ | for all Metacentrum users |
| storage-brno14.ceitec.metacentrum.cz | /storage/brno14-ceitec/ | for NCBR/CEITEC users only |

!!! warning
    Never leave data directly in the home, i.e. in` /storage/du-cesnet/home/META_username/`. The home directory should serve only to keep SSH keys, making links to directories with the actual data and other configuration files. To enforce this, there is tiny quota set on home directory (see further [info on Cesnet data storage service pages](https://du.cesnet.cz/en/navody/home-migrace-plzen/start)).

### Backup

- `/storage/du-cesnet/home/META_username/VO_metacentrum-tape_tape/`
- Use this option to backup data to protect data in case primary data are lost.
- Typically these data need not to be kept for a very long time.
- Files older than 12 months are automatically removed (they are considered as "expired").

### Archiving

- `/storage/du-cesnet/home/META_username/VO_metacentrum-tape_tape-archive/`
- Use this option to archive data you want to keep "forever".
- The directory has user quota set for volume of data and/or number of files.
- The data are not removed after a time (they do not "expire").

## Object storage

!!! warning 
    This section is under construction.


What is object storage:

https://du.cesnet.cz/en/navody/object_storage/start

### Access

- describe the process together with screenshots

### Clients

- there are more clients - link to https://du.cesnet.cz/en/navody/object_storage/cesnet_s3/start
- since we consider working from a (Linux) frontend, here we give 2 examples

#### s3cmd 

`/storage/brno2/home/melounova/.s3cfg` 

#### aws 


`/storage/brno2/home/melounova/.aws/credentials`














