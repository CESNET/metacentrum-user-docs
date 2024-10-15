# BEAST 

    module avail beast/
    module avail beast2/

[BEAST](https://www.beast2.org/) is a cross-platform program for Bayesian MCMC analysis of molecular sequences. It is entirely orientated towards rooted, time-measured phylogenies inferred using strict or relaxed molecular clock models. It can be used as a method of reconstructing phylogenies but is also a framework for testing evolutionary hypotheses without conditioning on a single tree topology.

## Usage

**Parallel run**

For parallel running, additional parameters are required

    -instances N -threads N

where N is the number of processors requested in the PBS task. And also add

    useThreads="true" 

attribute in the input file.


**With BEAGLE**

```
# Load BEAST, e.g.
module add beast2/beast2-2.6.7-intel-19.0.4-d2lg5zn
# Load OpenJDK
module add openjdk/openjdk-1.8.0_222-b10-intel-19.0.4-xc66unh
# Load BEAGLE
module add libbeagle/libbeagle-3.1.2-intel-19.0.4-gpu-m62lgl6
# See available graphical cards (if applicable) and help
beast -beagle_info
beast -help
# Use BEAST with BEAGLE
beast ... -beagle ... XXX.xml
```

## Beast additional packages

Users can install additional packages available via the `packagemager` command in their home directories. The following example demonstrates the local building of Beast 2.7.7 (distributed as a binary file; no installation is required) and the installation of the SNAPP package. 

    $ wget https://github.com/CompEvol/beast2/releases/download/v2.7.7/BEAST.v2.7.7.Linux.x86.tgz
    $ tar -xf BEAST.v2.7.7.Linux.x86.tgz
    $ export PATH=/storage/city/home/user_name/beast/bin/:$PATH

The default installation of Beast includes only Beast and Java.

    $ beast -version
    BEAST v2.7.7
    ---
    BEAST.app v2.7.7
    BEAST.base v2.7.7
    BEAST.app v2.7.7
    BEASTLabs v2.0.2
    ---
    Java version 17.0.3

If the SNAPP package is installed in the same directory as Beast itself, the package will be detected automatically.

    $ packagemanager -add SNAPP -dir /storage/city/home/user_name/beast
    $ beast -version
    BEAST v2.7.7
    ---
    BEAST.app v2.7.7
    BEAST.base v2.7.7
    BEAST.app v2.7.7
    SNAPP v1.6.1
    BEASTLabs v2.0.2
    ---
    Java version 17.0.3

But if the package is located in a different (non-automatically detected) path, it is necessary to specify this path via the `-packagedir` option in the `beast` command.

    $ beast -packagedir /storage/city/home/username/folder_with_packages
