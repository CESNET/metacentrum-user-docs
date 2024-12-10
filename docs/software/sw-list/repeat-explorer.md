# Repeat Explorer 

[Repeat Explorer](http://repeatexplorer.umbr.cas.cz/) is a computational pipeline for the discovery and characterization of repetitive sequences in eukaryotic genomes. 

## Galaxy service

Repeat Explorer is accessible through [Galaxy service](https://repeatexplorer-elixir.cerit-sc.cz).


## Module

RepeatExplorer is also available as a conventional module.

    module avail repeatexplorer/            

## Singularity image

Before executing the Singularity image (`singularity exec...`) located in `/cvmfs/singularity.metacentrum.cz/RepeatExplorer`, call the command

    export SINGULARITYENV_TMPDIR=$SCRATCHDIR

to redirect temporary files otherwise the calculation probably will fail with `sqlite3.OperationalError: disk I/O error`.







