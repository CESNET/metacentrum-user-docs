# Big Data Tips and Tricks

For **Big Data** sets, we recommend using the `boto3` library or `s5cmd` tool.

## Fewer big files are better than many small files

When transferring **Big Data**, it is better to use fewer big files instead of many small files.

Be aware of that when you are transferring a lot of small files, the overhead of the transfer process can be significant.
You can save time and resources by packing the small files into a single big file and transferring it as one object.

## Chunk size matters

When transferring big files, the upload (or download) process is divided into chunks - so called `multipart uploads` (or downloads).
The size of these chunks can have a significant impact on the transfer speed.

The optimal chunk size depends on the size of the files you are transferring and the network conditions.

There is no one-size-fits-all solution, so you should experiment with different chunk sizes to find the optimal one for your use case.
We recommend starting with a chunk size of `file_size / 1000` (where `file_size` is the size of the file you are transferring).
You can then adjust the chunk size based on the results of your experiments.

## Cluster choice matters

Some cluster offer better `network interface` than others.

When transferring big files, it is important to choose a cluster with a good network interface.
One such cluster is the `halmir` machines, which offer a `10 Gbps` network interface.

You can check the possible clusters and their network interfaces on the [official website](https://metavo.metacentrum.cz/pbsmon2/nodes/physical) of the MetaCentrum.

## Hard disk speed does not matter

Our research has shown that the speed of the hard disk does not have a significant impact on the transfer speed.

When transferring big files, the network interface is the bottleneck, not the hard disk speed.

Therefore, you do not need to worry about the usage of `tmpfs` or `ramdisk` when transferring big files.

## Utilize compression

When transferring big files, it is a good idea to utilize compression.

You can compress the files before transferring them, effectively reducing the time and resources needed for the transfer.

Choice of the compression algorithm depends on the type of the files you are transferring, there is no one-size-fits-all solution.
We recommend using the `zstandard` algorithm, as it offers a good balance between compression ratio and decompression speed.
Depending on the type of your files, you can also consider using the `gzip`, `bzip2`, or `xz` algorithms.

For more information about the compression algorithms, please check this [comparison](https://quixdb.github.io/squash-benchmark/).

## Use the right tool for the job

When transferring big files, it is important to use the right tool for the job.

If you are unsure which tool to use, we recommend checking the [Storage Department](storage-department.md) page with a table of S3 service clients.

In short, we recommend using the `boto3` library or `s5cmd` tool for **Big Data** transfers.
