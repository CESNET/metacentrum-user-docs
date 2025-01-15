# Types od data storage

If you followed the documentation on computing, you obtained quite a good
idea how data is handled in MetaCentrum. This article contains a brief but
storage-centered summary of all types of storage in MetaCentrum and also
other storage facilities in the e-infrastructure.

Computation jobs typically process data that is kept in **scratch
directories**. Those usually reside directly on computation nodes and serve
purely for keeping the data during the computation itself. The job should
clean scratch directories after itself. You can find more about scratch
directories in
https://docs.metacentrum.cz/computing/infrastructure/scratch-storages/.

**Home directories** are disk arrays mounted as file systems to computation
clusters. They are conveniently named after cities, as it is generally the
fastest to access data kept in the vicinity of the computation. Home
directories serve for storing user's data between computation jobs, i.e.
for weeks to months, possibly even years. Their capacity is nevertheless
limited to storage volumes that can be reasonably handled on a shared file
system.
You can learn all about home directories in
https://docs.metacentrum.cz/computing/infrastructure/storages/, note
especially the relationship between clusters and storages (FIXME link) and
be advised that not all of them are backed up (FIXME link). You
can even (FIXME link) mount them to your own computer.

Should your data exceed capacities available as home directories, you can
consider using services of generic data storage facilities available in the
infrastructure and operated by the Data Storage Department. That is a
system of large capacity **object storage facilities** typically accessed
through S3 protocol. Object storages can be used both for high capacities
as well as longer-term data storage. Requirements exceeding 10 TB (or even
hundreds TB) and years of storage time are generally possible, they should
nevertheless be discussed individually.
(FIXME nekam do toho dostat link na
https://docs.metacentrum.cz/data/storage-department/)

As you may have noticed, we haven't discussed long-term data storage so
far. For long-term data storage, the **National repository platform[National repository platform](https://www.eosc.cz/projekty/narodni-repozitarova-platforma-pro-vyzkumna-data-os-i-nrp/nrp)** is
being built, providing repositories. _Data repositories_ are storage
systems for data equipped with rich metadata that help making the data
findable, accessible, interoperable, and reusable.

