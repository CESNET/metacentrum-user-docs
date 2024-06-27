# Trap command usage

To manage proper cleaning of scratch space, users can take advantage of `trap` command and `clean_scratch` script.

`trap` command allows users to catch signals from OS and execute a code when they occur.


`clean_scratch` is a systemwide-installed MetaCentrum utility that removes the content of the current job's scratch directory.

!!! tip 
    While it is perfectly OK to use the `trap` command instruction upon the normal ending of a job, in case the job is killed (either by PBS or user) the results may be not always what the user expected, depending on the amount of data in scratch. 

## Trap the EXIT

**`trap 'clean_scratch' EXIT`**

`EXIT` is not a signal, but for the purpose of `trap` command it can be treated in the same way.

`EXIT` happens when the script ends, either by executing the last line or via the `exit` command somewhere in the bash script:

```
#!/bin/bash
cp fileXXX "$SCRATCHDIR/" || { echo >&2 "cp of fileXXX failed!"; exit 1; }
```
If the copying of `fileXXX` failed, the job will end AND the scratch space will be cleaned.

## Trap the TERM

**`trap 'clean_scratch' TERM`**

`TERM` is a OS signal a job receives when it is terminated from "outside", i.e. when it does not finish in normal way.

The job may be killed either by PBS or by the user (`qdel` command):

![pic](trap-command-scheme.jpg)

The batch script receives `SIGTERM` signal. **There is no way how to distinguish whether the job was killed by PBS or by the user.** Upon receiving the `SIGTERM`, the running process may take a variety of actions - it may stop immediately, or it may attempt to clean up *and* stop, or it may do nothing. If the process keeps running, the `SIGTERM` signal is after some delay followed by `SIGKILL` (equivalent to `kill -9`), which stops it immediately.

- What action is taken upon receiving a `SIGTERM` can be defined via `trap` command. 
- `SIGKILL` cannot be trapped, ignored nor reacted to.

This construction is useful to clean up after failed jobs **where the user is not interested in any data produced by the job** and in such cases we encourage users to apply it (see [section below](#caveats) for potential pitfalls.)

## Trap both EXIT and TERM 

**`trap 'clean_scratch' EXIT TERM`**

This construction combines both purposes mentioned above.

## Caveats

!!! tip
    Currently the delay between `SIGTERM` and `SIGKILL` is **10 seconds**.<br/>Depending on the amount of data in scratch, some code constructions within the `trap` command may run to and end, while other may not. This can lead to unexpected behaviour.

**Example 1**

*Idea:* if the job crashes, copy away potentially valuable files, then clean the scratch.

```
trap 'cp all_checkpoint_files somewhere_safe/ ; clean_scratch' TERM  
```

*Potential hazard:* if the checkpoint files are large and/or numerous, the copy operation may not finish in time before being interrupted by `SIGKILL` signal. Some of the files may be missing and/or incomplete. Moreover the scratch directory will not be cleaned.

*Solution:* If you already know that your job produces many and/or large files which you will need to retrieve in case the job crashes, it is safer to just let yourself know about it by adding a line to output:

```
trap 'echo "$PBS_JOBID job failed. Retrieve the files from $SCRATCHDIR on `hostname -f` node, then clean the scratch manually" /storage/..../' TERM  
```



<!--

### EXIT 

The use of trap upon EXIT can backfire, too. Suppose the user adds the trap with the purpose to clean up after the script has run to an end, then adds some petty sanity check after the core calculation is done.

```
#!/bin/bash
...
trap 'clean_scratch' EXIT
...
./potentially_long_calculation_producing_result_files
test -n some-directory || { echo >&2 "Directory does not exist!"; exit 1; }
cp result_files somewhere/
...
```

This, too, can lead to unintentional loss of results, as the `clean_scratch` is executed before the result files are copied away. 


### TERM


 -->
