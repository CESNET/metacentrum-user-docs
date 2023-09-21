# GIbPSs 

    module avail gibpss/

[GIbPSs](https://github.com/ahapke/gibpss) is a package for analysis of GBS (genotyping-by-sequencing) and RAD (restriction site associated DNA) sequence data. It handles paired-end or single reads from protocols such as GBS, two-enzyme GBS, and ddRAD. It can also analyze forward reads from RAD libraries. Its main purpose is genotyping of individuals from diploid organisms without a reference genome for population genetic and phylogeographic analyses. 

## Usage

Available modules are:

```
createstdat_03.0.pl
data_selector_16.0.pl
depth_analyzer_09.0.pl
export_gt_13.0.pl
export_seq_03.0.pl
export_svars_02.0.pl
export_tables_07.0.pl
fdm_07.0.pl
indel_checker_03.0.pl
indloc_23.0.pl
indpoploc_06.0.pl
pair_finder_07.0.pl
phredi_08.0.pl 
phred_pos_filter_07.0.pl
poploc_09.0.pl
usearch11
```

Use all `.pl` scripts with a full path prefix `perl /software/gibpss/1.0.2/source/` , i.e. `perl /software/gibpss/1.0.2/source/createstdat_03.0.pl`.
