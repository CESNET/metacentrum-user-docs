# Storage Department services

The CESNET Storage Department provides various types of data services. It is available to all users with **MetaCentrum login and password**.

Storage Department data policies will be described to a certain level at this page. For more detailed information, users should however navigate the [Storage Department documentation pages](https://docs.du.cesnet.cz).

<!--
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
-->
!!! warning "Data storage technology in Storage department has changed by May 2024"
    For a long time the data were stored on hierarchical storage machines ("HSM" for short) with a directory structure accessible from `/storage/du-cesnet`.<br/> Due to technological innovation of operated system were the HSM storages disconnected and decommissioned. User data have been transferred to [machines with Object storage technology](https://docs.du.cesnet.cz/en/object-storage-s3/s3-service).<br/> Object storage is successor of HSM with slightly different set of commands, i.e. it **does not** work in the precisely same way (sadly).

<!--
!!! tip "Ask <du-support@cesnet.cz> for help, they are prepared for many questions from users"
    Object storage is a different paradigm than good old Linux filesystem, so yes, this is a big change for most of our users and not a very easy one to grasp. The people in Storage department know this and they are prepared to answer your questions.<br/> Please be aware that MetaCentrum user support (<meta@cesnet.cz>) can provide only limited advice as the data storage is out of the scope of MetaCentrum services.

Below you will find short description of main object storage (S3) command and usage.
-->

## Object storage
For all Metacentrum users is available S3 storage. You can generate your credetials via [Gatekeeper service](https://access.du.cesnet.cz/#/). Where you will select your Metacentrum account and you should obtain your `access_key` and `secret_key`.

### Simple storage - use when you need commonly store your data

You can use the S3 storage as simple storage to store your data. You can use your credentials to configure some of the supported S3 clients like s3cmd, s5cmd (large datasets) and rclone. The detailed tutorial for S3 client configuration can be found in the [official Data Storage Department tutorials](https://docs.du.cesnet.cz/en/object-storage-s3/s3-clients)

### Direct usage in the job file
You can add s5cmd and rclone commands directly into your job file.
!!! warning "Bucket creation"
    Do not forget that the bucket being used for staging MUST exist on the remote S3 data storage. If you plan to stage-out your data into a non-existing bucket the job will fail. You need to prepare the bucket for stage-out in advance. You can use the [official Data Storage Department tutorials](https://docs.du.cesnet.cz/en/object-storage-s3/s3-clients) for particular S3 client.

#### s5cmd
To use s5cmd tool (preferred) you need to create a credentials file (copy the content below) in your home dir, ie. `/storage/brno2/home/<your-login-name>/.aws/credentials`.

```
[profile-name]
aws_access_key_id = XXXXXXXXXXXXXXXXXXXXX
aws_secret_access_key = XXXXXXXXXXXXXXXXXXXXX
max_concurrent_requests = 200
max_queue_size = 20000
multipart_threshold = 128MB
multipart_chunksize = 32MB
```

Then you can continue to use `s5cmd` via commands described in [Data Storage guide](https://docs.du.cesnet.cz/en/object-storage-s3/s5cmd). Or you can directly add following lines into your job file.

```
#define CREDDIR, where you stored your S3 credentials for, default is your home directory
S3CRED=/storage/brno2/home/<your-login-name>/.aws/credentials

#stage in command for s5cmd
s5cmd --credentials-file "${S3CRED}" --profile profile-name --endpoint-url=https://s3.cl4.du.cesnet.cz cp s3://my-bucket/h2o.com ${DATADIR}/

#stage out command for s5cmd
s5cmd --credentials-file "${S3CRED}" --profile profile-name --endpoint-url=https://s3.cl4.du.cesnet.cz cp ${DATADIR}/h2o.out s3://my-bucket/
```

#### rclone

Alternatively, you can use rclone tool, which is less handy for large data sets. In case of large data sets (tens of terabytes) please use `s5cmd` above. For rclone you need to create a credentials file (copy the content below) in your home dir, ie. `/storage/brno2/home/<your-login-name>/.config/rclone/rclone.conf`.

```
[profile-name]
type = s3
provider = Ceph
access_key_id = XXXXXXXXXXXXXXXXXXX
secret_access_key = XXXXXXXXXXXXXXXXXXXXXXXX
endpoint = s3.cl4.du.cesnet.cz
acl = private
```

Then you can continue to use `rclone` via commands described in [Data Storage guide](https://docs.du.cesnet.cz/en/object-storage-s3/rclone). Or you can directly add following lines into your job file.

```
#define CREDDIR, where you stored your S3 credentials for, default is your home directory
S3CRED=/storage/brno2/home/<your-login-name>/.config/rclone/rclone.conf

#stage in command for rclone
rclone sync --progress --fast-list --config ${S3CRED} profile-name:my-bucket/h2o.com  ${DATADIR

#stage out command for rclone
rclone sync --progress --fast-list --config ${S3CRED} ${DATADIR}/h2o.out profile-name:my-bucket/

