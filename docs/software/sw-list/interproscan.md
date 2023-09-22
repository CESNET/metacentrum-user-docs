# InterPro Scan

    module avail interproscan/

[Interproscan](https://www.ebi.ac.uk/interpro/about/interpro/) provides functional analysis of proteins by classifying them into families and predicting domains and important sites. We combine protein signatures from a number of member databases into a single searchable resource, capitalising on their individual strengths to produce a powerful integrated database and diagnostic tool.  

## Usage

InterPro Scan must be run with `-T` parameter:

    interproscan.sh -T $SCRATCHDIR ...

The `-T` sets temporary directory instead of `/tmp` to `$SCRATCHDIR`. To use this parameter you must request a scratch in job's requirements.

A number of used processors (workers) is set in the file `interproscan.properties` to 8, so with one master you should request for 9-10 CPUs. 
