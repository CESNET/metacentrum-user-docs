# Masurca

    module avail masurca/

[Masurca](https://genome.umd.edu/masurca.html) is a genome assembly and analysis toolkit. It contains MaSuRCA genome assembler, QuORUM error corrector for Illumina data, POLCA genome polishing software, Chromosome scaffolder, jellyfish mer counter, and MUMmer aligner.

## Usage

Masurca launches helper processes that use additional CPUs. So the total CPU usage is higher than is defined by the `NUM_THREADS` parameter in the configuration file. Therefore, to prevent the termination of calculation by the scheduling system due to exceeding the number of reserved CPUs, reserve 3 extra CPUs.

```
-l select=1:ncpus=X+3
NUM_THREADS=X
```


