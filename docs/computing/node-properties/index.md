# Specific nodes

!!! warning
    The list of nodes on this page is not complete. Normally, the choice of a particular node is not important (sometimes not even desirable), as the choice is done by PBS server according to resource requirements. The nodes and queues listed here are selected for some specific purpose which is hard to define through resources alone.

## Oven node

Oven (`oven.ics.muni.cz`, aliased as `oven.metacentrum.cz`) is a new special frontend which is available through [oven queue](https://metavo.metacentrum.cz/pbsmon2/queue/oven@meta-pbs.metacentrum.cz). It is dedicated for non-demanding jobs (control/re-submitting of jobs).

**Parameters:**

- 80 virtual CPUs
- 8 GB memory
- **does not kill** jobs if they exceed requested amount of **CPUs/memory**
- **does kill** jobs if they exceed their **walltime**

**Oven queue:**

- unlike common frontends, `oven` supports job length (walltime) up to one month (720:00:00)
- by default a job gets **only 100 MB memory** (unlike common queues where is the value 400 MB)
- `oven` has a **separated fairshare** (only for control/re-submitting jobs)

**Example:**

This is a basic example how to use oven queue:

    echo "echo hostname | qsub" | qsub -q oven


<!-- TODO
`pbsnodes` command usage.
-->


