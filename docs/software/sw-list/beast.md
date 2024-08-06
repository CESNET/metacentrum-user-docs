# BEAST 

    module avail beast/
    module avail beast2/

[BEAST](https://www.beast2.org/) is a cross-platform program for Bayesian MCMC analysis of molecular sequences. It is entirely orientated towards rooted, time-measured phylogenies inferred using strict or relaxed molecular clock models. It can be used as a method of reconstructing phylogenies but is also a framework for testing evolutionary hypotheses without conditioning on a single tree topology.

## Usage

**Parallel run**

For parallel running are required additional parameters

    -instances N -threads N

where N is one less value than number of processors requested in PBS task. And also add

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

