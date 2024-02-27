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


What is [object storage](https://du.cesnet.cz/en/navody/object_storage/start)

<!--

### Access

- describe the [process](https://rt.cesnet.cz/rt/Ticket/Display.html?id=1245495):

The prerequisite for this guide is to have S3 storage itself. You need to contact data storage support <du-support@cesnet.cz>.
Once you obtained S3 credentials `aws_access_key_id` and `aws_secret_access_key` from S3 data storage administrators you can continue with the following steps.

**1.**

To stage data to/from Metacentrum storage facility you can use rclone or s5cmd tool.

**1a.**

To use s5cmd tool (preferred) you need to create a credentials file (copy the content below) in your home dir, ie. `/storage/brno2/home/<your-login-name>/.aws/credentials`.

```
###
[profile-name]
aws_access_key_id = XXXXXXXXXXXXXXXXXXXXX
aws_secret_access_key = XXXXXXXXXXXXXXXXXXXXX
max_concurrent_requests = 200
max_queue_size = 20000
multipart_threshold = 128MB
multipart_chunksize = 32MB
###
```

**1b.**
 
Alternatively, you can use rclone tool, which is less handy for large data sets. In case of large data sets (tens of terabytes) please use s5cmd.
For rclone you need to create a credentials file (copy the content below) in your home dir, ie. `/storage/brno2/home/<your-login-name>/.config/rclone/rclone.conf`.

```
###
[profile-name]
type = s3
provider = Ceph
access_key_id = XXXXXXXXXXXXXXXXXXX
secret_access_key = XXXXXXXXXXXXXXXXXXXXXXXX
endpoint = s3.clX.du.cesnet.cz
acl = private
###
```

**2.**

For the convenience you can add into your Job script the variable, where did you store your credentials.

```
#define CREDDIR, where you stored your S3 credentials for, default is your home directory
#s5cmd example
#S3CRED=/storage/brno2/home/<your-login-name>/.aws/credentials
#rclone example
#S3CRED=/storage/brno2/home/<your-login-name>/.config/rclone/rclone.conf
```

**3.**

Then you can easily add the stage in/out commands into your Job script in the appropriate position.

**3a.**

Stage-in

```
#stage in command for s5cmd
s5cmd --credentials-file "${S3CRED}" --profile profile-name --endpoint-url=https://s3.clX.du.cesnet.cz cp s3://my-bucket/h2o.com ${DATADIR}/
```

```
#stage in command for rclone
rclone sync --progress --fast-list --config ${S3CRED} profile-name:my-bucket/h2o.com  ${DATADIR}
```

**3b.**

Stage-out

```
#stage out command for s5cmd
s5cmd --credentials-file "${S3CRED}" --profile profile-name --endpoint-url=https://s3.clX.du.cesnet.cz cp ${DATADIR}/h2o.out s3://my-bucket/
```

```
#stage in command for rclone
rclone sync --progress --fast-list --config ${S3CRED} ${DATADIR}/h2o.out profile-name:my-bucket/  
```

### Clients

- there are more clients - link to [https://du.cesnet.cz/en/navody/object_storage/cesnet_s3/start](https://du.cesnet.cz/en/navody/object_storage/cesnet_s3/start)
- since we consider working from a (Linux) frontend, here we give 2 examples

#### s3cmd 

`/storage/brno2/home/melounova/.s3cfg` content:

```
[default]
host_base = https://s3.cl4.du.cesnet.cz
use_https = True
access_key = 3WVWLY30M6PB85UZRP4H
secret_key = UxiNQbwWQNLl8sp8l4SQ18mD40BGq3XyqtVvMdel
host_bucket = s3.cl4.du.cesnet.cz
```

Examples:

```
s3cmd mb s3://my-bucket
s3cmd du s3://my-bucket/
s3cmd put file001 s3://my-bucket/
s3cmd du s3://my-bucket/
s3cmd get s3://my-bucket/file001
```


#### aws 

`/storage/brno2/home/melounova/.aws/credentials`

```
###
[profile-name]
aws_access_key_id = 3WVWLY30M6PB85UZRP4H
aws_secret_access_key = UxiNQbwWQNLl8sp8l4SQ18mD40BGq3XyqtVvMdel
max_concurrent_requests = 200
max_queue_size = 20000
multipart_threshold = 128MB
multipart_chunksize = 32MB
###
```

```
S3CRED=/storage/brno2/home/melounova/.aws/credentials
```


-->









