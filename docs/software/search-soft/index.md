# How to search for software

There are thousands of packages installed at MetaCetrum. The list of selected software above is by far not complete.

To search for any package, use command `module avail PACKAGE_NAME`.

!!! info "Search is case-insensitive"
    For example, `module avail r/` and `module avail R/` are the same for the purpose of searching. Other commands, however (such as `module add` or `module load`) are case-sensitive.

!!! tip "You can use stars"
    The `module avail` command accepts bash special characters. The most useful is the `*` which replaces any string.

**Example: search for some Orca installation** 

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


**Example: search for some R package** 

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





