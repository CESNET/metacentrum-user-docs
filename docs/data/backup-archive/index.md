# Backup and archiving

- odkaz na datova uloziste
- jaky je rozdil mezi nama a DU
- rozdil mezi adresarema DU (`VO_tape` vs `VO_tape_tape`)


## Data backup in MetaCentrum 

There are three data storages types offered by MetaCentrum **with respect to backup policy**:

| Storage type 	 | Basic description | Typical usecase| 
|----------------|-------------------|----------------|
| Scratch storages | Fast storages with minimum data capacity | Storing data during computations |
| Disk arrays | Common `/storage` volumes, user homes | Storing data between computations |
| Hierarchical storages | Storages with massive data capacity | Data archiving |

!!! warning "Homes are not robustly backed up"
    Keep in mind that the **data in your home directory** are backed up only in a form of **daily snapshots** stored **on the same disk** array, and thus are prone to loss in case of hardware failure or accident. For data of permanent value consider keeping your own copy or using hierarchical storages (see below).

### Scratch storages

- Scratch storages (scratch directories) on computational nodes serve to store the temporary files. 
- They are **not backed-up** in any way.
- After the job ends, data on scratch storages are automatically deleted after 14 days (if not cleared by the batch script).

### Disk arrays

- Disk arrays are meant to prepare, process and store data between jobs.
- Disk arrays are several connected hard drives accessible via `/storage` directories.
- Files are **stored on multiple drives**, which guarantees higher I/O data speed and reliability.
- Disk arrays have a **backup policy of saving snapshots** (once a day, usually at night/early morning) of user's data.
- The snapshots are **kept at least 14 days** backwards.

The backup policy on storages offers some protection in case **user unintentionally deletes some of their files**; Generally, data that existed the day before the accident can be recovered. 

The snapshots are stored, however, on the same disk arrays as the data, so **in case of hardware failure these backups will be lost**. 

Therefore **we do not recommend to use disk arrays to backup any important data**. For more robust archiving service [the section below](/advanced/work-data/#data-archiving), or visit directly [Cesnet data storage page](https://du.cesnet.cz/en/start).

## Data backup and archiving in Storage Department

![pic](templ_001.png)

## Backup

## Archiving

!!! info "Data archiving and backup is not MetaCentrum service"
    Central to MetaCentrum grid computing service is computing, not storage of data. Although the data on user homes are backed up to a certain level, not all risks are covered. MetaCentrum storages are unsuitable for archiving the data. For serious back-up and archiving of data use [Cesnet data storage service](https://du.cesnet.cz/en/start).

Information in this section is a rough overview of data services provided by Cesnet data storage service. In case of problems/questions, we recommend to [contact Cesnet storage department](https://du.cesnet.cz/en/o_nas/start).

Since the data in "normal" home directories are backed-up only in a form of snapshots, they are not protected against loss due to hardware failure.

Data of permanent value should be backed-up on dedicated **servers with hierarchical storage policy**.

### Disk arrays with hierarchical storage

Disk arrays with hierarchical storage have a more robust backup policy than user homes. To increase redundancy of data, they contain several layers of storage media: first layer is a disk array, lower layers are made of MAIDs (Massive Array of Idle Drives) or magnetic tape libraries.

- Lower layers have bigger capacity but slower access times.
- Data are moved automatically among these layers based on their last usage.
- The most important consequence from the user's point of view is that the access to unused data may be slower than to the recently used ones.

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

**`tape_tape`**

- Use this option to backup data to protect from data loss in case the primary data are lost.
- Typically these data need not to be kept for a very long time.
- Therefore in `VO_metacentrum-tape_tape` the files older than 12 months are automatically removed (they are considered as "expired").

**`tape_tape_archive**

- Use this option to archive data you want to keep "forever".
- `VO_metacentrum-tape_tape-archive` has user quota set for volume of data and/or number of files.
- The data are not removed after a time (they do not "expire").

**Transfering the files to/from the archive**

!!! note 
    In general: the smaller number of files in the archive, the better (it speeds operations up and generates lower load on the storage subsystems; on the other hand, packing the files makes searching less comfortable). In case you need to archive a large number of small files, we recommend strongly to pack them before, as read/write operations are slower with many small files.

- if most of your files are large (hundreds of MBs, GBs, ...), don't bother with packing them and make a one-to-one copy to the archive,
- if your files are smaller and you don't plan to search individual files, pack them into `.tar` or `.zip` files,
- from the technical point of view, optimal "chunk" of packed data is 500 MB or bigger,
- don't use front-end servers for anything else than moving several small files! Submit a regular job and/or take an interactive job instead to handle with the archival data.
- keep in mind that the master HOME directory of each HSM storage is dedicated just for initialization scripts, and thus has a limited quota of just 50 MB.

<!--
!!! todo
    Plus sem dat tez veci z [Politika zalohovani](https://wiki.metacentrum.cz/wiki/Politika_zalohovani)
-->





