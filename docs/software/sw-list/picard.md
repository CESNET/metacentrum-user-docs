# Picard 

    module avail picard/

[Picard](https://broadinstitute.github.io/picard/) is a set of Java command line tools for manipulating high-throughput sequencing (HTS) data and formats such as SAM/BAM/CRAM and VCF. 

## Usage

!!! warning
    Be aware that Picard needs a defined `$SCRATCHDIR` variable for successful running.

!!! warning
    To run Picard version <= 2.22.1  you need Java as well - load manually `module add jdk/`.

Users can list available tools:

    java -jar $PICARD

And run individual tools, for example:

    java -jar $PICARD CreateSequenceDictionary -h #will print manual page
    java -jar $PICARD CreateSequenceDictionary R=reference.fasta O=reference.dict

Since version 2.27.5, the usage is more straightforward.

    module add picard # it will load the newest version of Picard
    picard <program name> -h

Java processes within Picard may exceed the quota for saving temporary files in the root directory (`/tmp`). When calculation fails with something like `Caused by: java.io.IOException: Disk quota exceeded`, call the command

    export _JAVA_OPTIONS="-Djava.io.tmpdir=$SCRATCHDIR"

before starting Picard. This command redirects temporary files to the scratch.
