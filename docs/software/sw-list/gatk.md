# Genome Analysis Toolkit

    module avail gatk/

[Genome Analysis Toolkit](https://gatk.broadinstitute.org/hc/en-us) is a generic tool for pairwise sequence comparison. It allows you to align sequences using a many alignment models, either exhaustive dynamic programming or a variety of heuristics.  

## Usage

Initialization makes available also java 7 (or java 8 for version 3.7 and 3.8) and system variable `$GATK` pointing into GATK install dir. Usage of one of the tools with sample data (not for version 3.8-0):

    java -Xmx2g -jar "$GATK"/GenomeAnalysisTK.jar -T CountReads -R "$GATK"/resources/exampleFASTA.fasta -I "$GATK"/resources/exampleBAM.bam

During large data processing, some problems with size of tmp directory can occurs (and can lead to the end of job or significant slowdown). In this case, add parameter -Djava.io.tmpdir="${SCRATCHDIR}"/tmp into java command.

List of tools and version check:

```
java -Xmx2g -jar "$GATK"/GenomeAnalysisTK.jar --help
java -Xmx2g -jar "$GATK"/GenomeAnalysisTK.jar --version
```
