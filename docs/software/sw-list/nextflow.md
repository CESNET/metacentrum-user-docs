# Nextflow 

**As a service:**

Nextflow is available as a part of [Kubernetes](https://docs.cerit.io/docs/nextflow.html).
    
**In a grid:**

    module add conda-modules-py37 ; conda activate nextflow ; nextflow -v # as conda environment
    module avail nextflow/ # as a module

[Nextflow](https://www.nextflow.io/) enables scalable and reproducible scientific workflows using software containers. It allows the adaptation of pipelines written in the most common scripting languages. 

## Usage

!!! tip
    This page contains notes on how to use Nextflow within metaCentrum grid. However MetaCentrum modules may not contail full-blown list of Nextflow utilities. As a no. 1 choide we recommend to access [Nextflow via the Kubernetes service](https://docs.cerit.io/docs/nextflow.html).

### Example: Nextflow as a batch job

Nexflow script with two processes for run as separate PBS jobs, with passing an intermediate results. Important is first line to run im Metacentrum. Parameters for jobs are limited for now, scratchdir, gpu and others should we test and prepare to run.

Filename for this example is **basic.nexflow**:

```
#!/bin/bash /software/nextflow/21.04.3/nextflow
params.in = "$baseDir/sample.fa"
/*
* split a fasta file in multiple files
*/
process splitSequences {
   executor = 'pbspro'
   queue 'default@meta-pbs.metacentrum.cz'
   cpus 1
   memory '1 GB'
   input:
   path 'input.fa' from params.in
   output:
   path 'seq_*' into records
   """
   csplit input.fa '%^>%' '/^>/' '{*}' -f seq_
   """
}
/*
* Simple reverse the sequences
*/
process reverse {
   executor = 'pbspro'
   queue 'default@meta-pbs.metacentrum.cz'
   cpus 1
   memory '2 GB'
   input:
   path x from records
   output:
   stdout into result
   """
   cat $x | rev
   """
}
/*
* print the channel content
*/
result.subscribe { println it }
```

Run script for PBS, filename **basic.qsub**:

```
#!/bin/bash
#PBS -q default@meta-pbs.metacentrum.cz
#PBS -l walltime=1:0:0
#PBS -l select=1:ncpus=1:mem=3gb
#PBS -N NF-test
module add nextflow-21.04.3
cd /storage/plzen1/home/hoidekr/nextflow/  #cd to work directory
./basic.nextflow
```

Run the job as

    qsub basic.qsub

The job starts and runs two other jobs as specified in nexflow script. All information about run jobs, stdout/errout job skripts, intermediate results, results etc. is saved into dir `work` and `.nextflow` under the working directory. 


