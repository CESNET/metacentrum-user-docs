# Storage Department services

The CESNET Storage Department provides various types of data services.
It is available to all users with **MetaCentrum login and password**.

Storage Department data policies will be described to a certain level at this page.
For more detailed information, users should however navigate the [Storage Department documentation pages](https://docs.du.cesnet.cz).

!!! warning "Data storage technology in the Data Storage Department has changed by May 2024"
    For a long time the data were stored on hierarchical storage machines ("HSM" for short) with a directory structure accessible from `/storage/du-cesnet`.<br/> Due to technological innovation of operated system were the HSM storages disconnected and decommissioned. User data have been transferred to [machines with Object storage technology](https://docs.du.cesnet.cz/en/object-storage-s3/s3-service).<br/> Object storage is successor of HSM with slightly different set of commands, i.e. it **does not** work in the same way.

## Object storage
S3 storage is available for all Metacentrum users.
You can generate your credetials via [Gatekeeper service](https://access.du.cesnet.cz/#/).
Where you will select your Metacentrum account and you should obtain your `access_key` and `secret_key`.

### Simple storage - use when you need commonly store your data

You can use the S3 storage as simple storage to store your data.
You can use your credentials to configure some of the supported S3 clients like s3cmd, s5cmd (large datasets) and rclone.
The detailed tutorial for S3 client configuration can be found in the [official Data Storage Department tutorials](https://docs.du.cesnet.cz/en/object-storage-s3/s3-clients).

### Direct usage in the job file
You can add `s5cmd` and `rclone` commands directly into your job file.

!!! warning "Bucket creation"
    Do not forget that the bucket being used for staging MUST exist on the remote S3 data storage. If you plan to stage-out your data into a non-existing bucket the job will fail. You need to prepare the bucket for stage-out in advance. You can use the [official Data Storage Department tutorials](https://docs.du.cesnet.cz/en/object-storage-s3/s3-clients) for particular S3 client.

### S3 service clients

| Binary          | Source code language | Library         | Console usage | Python usage | Fit for Big Data transfers |
|-----------------|----------------------|-----------------|---------------|--------------|----------------------------|
| aws cli         | Python               | aws cli         | Yes           | Yes          | No                         |
| s3cmd           | Python               | s3cmd           | Yes           | Yes          | No                         |
| s4cmd           | Python               | [boto3](#boto3) | No            | Yes          | Yes                        |
| [s5cmd](#s5cmd) | Go                   | --- ? ---       | Yes           | No           | Yes                        |

#### boto3

`boto3` is a **Python** library that allows you to interact with the S3 storage.
You have to use it from your **Python** scripts - it is not a standalone tool like `s3cmd` or `s5cmd`.

##### Installation

In order to use `boto3` library, you need to install it first.
You can do it by running the following command inside your Python environment:

```bash
pip install boto3
```

##### Usage

First, you need to create an instance of the `s3 client` object with your credentials and the endpoint URL:

```python
import boto3

access_key = "********************"
secret_key = "****************************************"
endpoint_url = "https://s3.cl4.du.cesnet.cz"

s3 = boto3.client("s3", aws_access_key_id=access_key, aws_secret_access_key=secret_key, endpoint_url=endpoint_url)
```

(*Side note*: You can use the `~/.aws/credentials` file to store your credentials and use them in your scripts.
For more information, see the [official boto3 documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/guide/credentials.html).)

Then you can use the `s3` object to interact with the S3 storage.
For example, you can **list all the buckets**:

```python
response = s3.list_buckets()
for bucket in response["Buckets"]:
    print(f"{bucket['Name']}")
```

Or you can **upload** a file to the S3 storage:

```python
s3.upload_file("/local/path/to/file", "bucket-name", "remote/path/to/object")
```

Or alternatively, you can **download** an object from the S3 storage (be aware of the parameters order!):

```python
s3.download_file("bucket-name", "remote/path/to/object", "/local/path/to/file")
```

#### s5cmd

To use `s5cmd` tool you need to create a credentials file (copy the content below) in your home dir, e.g. `/storage/brno2/home/<your-login-name>/.aws/credentials`.

```
[profile-name]
aws_access_key_id = XXXXXXXXXXXXXXXXXXXXX
aws_secret_access_key = XXXXXXXXXXXXXXXXXXXXX
max_concurrent_requests = 200
max_queue_size = 20000
multipart_threshold = 128MB
multipart_chunksize = 32MB
```

Then you can continue to use `s5cmd` via commands described in [Data Storage guide](https://docs.du.cesnet.cz/en/object-storage-s3/s5cmd).
Alternatively, you can directly add the following lines into your job file.

```
#define CREDDIR, where you stored your S3 credentials for, default is your home directory
S3CRED=/storage/brno2/home/<your-login-name>/.aws/credentials

#stage in command for s5cmd
s5cmd --credentials-file "${S3CRED}" --profile profile-name --endpoint-url=https://s3.cl4.du.cesnet.cz cp s3://my-bucket/h2o.com ${DATADIR}/

#stage out command for s5cmd
s5cmd --credentials-file "${S3CRED}" --profile profile-name --endpoint-url=https://s3.cl4.du.cesnet.cz cp ${DATADIR}/h2o.out s3://my-bucket/
```

#### rclone

Alternatively, you can use `rclone` tool, which is less handy for large data sets.
In case of large data sets (tens of terabytes) please use `s5cmd` or `boto3`, mentioned above.
For rclone you need to create a credentials file (copy the content below) in your home dir, e.g. `/storage/brno2/home/<your-login-name>/.config/rclone/rclone.conf`.

```
[profile-name]
type = s3
provider = Ceph
access_key_id = XXXXXXXXXXXXXXXXXXX
secret_access_key = XXXXXXXXXXXXXXXXXXXXXXXX
endpoint = s3.cl4.du.cesnet.cz
acl = private
```

Then you can continue to use `rclone` via commands described in [Data Storage guide](https://docs.du.cesnet.cz/en/object-storage-s3/rclone).
Or you can directly add following lines into your job file.

```
#define CREDDIR, where you stored your S3 credentials for, default is your home directory
S3CRED=/storage/brno2/home/<your-login-name>/.config/rclone/rclone.conf

#stage in command for rclone
rclone sync --progress --fast-list --config ${S3CRED} profile-name:my-bucket/h2o.com  ${DATADIR}

#stage out command for rclone
rclone sync --progress --fast-list --config ${S3CRED} ${DATADIR}/h2o.out profile-name:my-bucket/
```
