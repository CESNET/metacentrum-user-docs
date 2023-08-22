# How to search for software

There are thousands of packages installed at MetaCentrum. The list of selected software is by far not complete.

In general, when searching for an application, you should checklist the following:

1. Look at the list of selected software either [sorted alphabetically](/software/alphabet/) or [by field of interest](/software/sw-list/amber).
2. Use `module avail` command as described [on this page](#modules).
3. Go through software prepared as [containers](#containers).
4. Check whether your software is included in any of [managed services](#services).

!!! tip 
    No luck? The consult [how to install new (version of) software](http://localhost:8080/software/install-software/#general-options) either locally or system-wide.

## Modules

To search for any package, use command `module avail PACKAGE_NAME`.

!!! info "Search is case-insensitive"
    For example, `module avail r/` and `module avail R/` are the same for the purpose of searching. Other commands, however (such as `module add` or `module load`) are case-sensitive.

!!! tip "You can use stars (with backslash or quotes)"
    The `module avail` command accepts bash special characters. The most useful is the `*` which replaces any string; for example `module avail g\*`, `module avail 'g*'`, `module avail "g*"` lists all modules beginning with "g".

!!! question "Why backslash or quotes?"
    To make it to `module avail`, the `*` must be protected by backslash or quotes not to be expanded by shell. To experiment with this behaviour, try `touch g001; module avail g*` (returns nothing) versus `touch g001; module avail g\*` (returns list of modules).

### Example 1: Orca versions

```
(BULLSEYE)user123@skirit:~$ module avail or
----------- /packages/run/modules-5/debian11avx512 ---------------
orca/  orthofinder/  

Key:
modulepath  directory/ 
```
The above search will return all modules starting with the string "or".

```
(BULLSEYE)user123@skirit:~$ module avail orca
----------- /packages/run/modules-5/debian11avx512 ---------------
orca/  

Key:
modulepath  directory/  
```
The above search is limited only to "orca" package, but does not show versions.

```
(BULLSEYE)user123@skirit:~$ module avail orca/
----------- /packages/run/modules-5/debian11avx512 ---------------
orca/2.6.4  orca/3.0.1  orca/4.0.2  orca/4.1.1  orca/4.1.2  orca/4.2.0  orca/4.2.1  orca/5.0.1-intel-19.0.4-bnofsgq  orca/5.0.3-intel-19.0.4-dyfxe2x  

Key:
modulepath  
```
With "/" at the end, the search will output all versions available for the specified module.

### Example 2: R package

Modulefiles of system-wide installed R package are of the form `r-PACKAGE`.

To list all R packages, run

    module avail r-*

Let's say you want to use package `bsgenome`. Commands

    module avail bsgenome
    module avail bsgenome*

will yield nothing.

On the other hand,

    module avail *bsgenome*

will show up the package.

## Containers

A minor part of software is prepared as Singularity containers.

You can list them at

    ls /cvmfs/singularity.metacentrum.cz/

For instructions on container usage, see [the containers chapter](/software/containers).

## Services

MetaCentrum runs several managed services. It is good idea to go through what these services offer.

- [OnDemand](/software/services/ondemand): easy browser-based access to graphical software,
- [Kubernetes](/software/services/kubernetes): service designed for Docker image usage,
- [Galaxy](/software/services/galaxy): platform for biomedical research,
- [Jupyter notebooks](/software/services/jupyter): interactive computing across multiple programming languages.
