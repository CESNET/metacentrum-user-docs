# Direct access to storages

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

