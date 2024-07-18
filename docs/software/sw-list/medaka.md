# Medaka

    module avail medaka/
    module add mambaforge ; mamba env list | grep medaka

[Medaka](https://github.com/nanoporetech/medaka) is a tool to create consensus sequences and variant calls from nanopore sequencing data. This task is performed using neural networks applied a pileup of individual sequencing reads against a draft assembly.

## Usage

### Mamba environment

```
(BOOKWORM)user_123@skirit:~$ module add mambaforge
(BOOKWORM)user_123@skirit:~$ mamba activate medaka_v1.6.0_py3.8
(medaka_v1.6.0_py3.8) (BOOKWORM)user_123@skirit:~$
```

### Module

```
(BOOKWORM)user_123@skirit:~$ module add medaka/1.6.0-gpu
(BOOKWORM)user_123@skirit:~$ source /software/medaka/1.6.0_gpu/venv/bin/activate
(medaka) (BOOKWORM)user_123@skirit:~$ medaka_consensus -i <fasta> -d <assembly> ...
(medaka) (BOOKWORM)user_123@skirit:~$ deactivate
```
