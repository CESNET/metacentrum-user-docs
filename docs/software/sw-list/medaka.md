# Medaka

    module avail medaka/

[Medaka](https://github.com/nanoporetech/medaka) is a tool to create consensus sequences and variant calls from nanopore sequencing data. This task is performed using neural networks applied a pileup of individual sequencing reads against a draft assembly.

## Usage

Medaka is available as a Conda environment.

```
$ module add  module add medaka/1.6.0-gpu
$ source /software/medaka/1.6.0_gpu/venv/bin/activate
(medaka) $ medaka_consensus -i <fasta> -d <assembly> ...
(medaka) $ deactivate
```
