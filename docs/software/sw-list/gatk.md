# Genome Analysis Toolkit

    module avail gatk/

[Genome Analysis Toolkit](https://gatk.broadinstitute.org/hc/en-us) is a generic tool for pairwise sequence comparison. It allows you to align sequences using many alignment models, either exhaustive dynamic programming or a variety of heuristics.  

## Usage

In the `qsub` command, it is necessary to specify the parameter `ompthreads` to allow a run on multiple threads, e.g. (for eight threads):

    qsub -l select=1:ncpus=8:ompthreads=8:mem=...

### Versions 4*

GATK 4 has a wrapper script, `gatk`, which significantly simplifies commands.

    gatk --help    # to print help
    gatk --list    # to list all available tools inside the toolkit

An example of command with data:

    gatk --java-options "-Xmx20G" HaplotypeCaller -R reference.fasta -I input.bam -O output.vcf

The `-Xmx` memory option represents the amount of memory used only by the java process. However, the user must request more memory from PBS to cover all other processes outside of java. For example, for `-Xmx20g`, reserve `mem=30gb` from PBS.

### Versions 3* and 2*

Initialization also makes java/opendjk and system variable `$GATK` available pointing into the GATK install directory. Usage of one of the tools with sample data (not for version 3.8-0):

    java -Xmx20g -jar "$GATK"/GenomeAnalysisTK.jar -T CountReads -R "$GATK"/resources/exampleFASTA.fasta -I "$GATK"/resources/exampleBAM.bam

During large data processing, some problems with the size of the `tmp` directory can occur (and can lead to the end of a job or a significant slowdown). In this case, add the parameter `-Djava.io.tmpdir="${SCRATCHDIR}"/tmp` into the java command.

List of tools and version check:

```
java -jar "$GATK"/GenomeAnalysisTK.jar --help
java -jar "$GATK"/GenomeAnalysisTK.jar --version
```
