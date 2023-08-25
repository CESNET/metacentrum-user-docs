# Kraken

    module avail kraken/
    module avail kraken2/

[Kraken 2](https://ccb.jhu.edu/software/kraken2/index.shtml) is the newest version of Kraken, a taxonomic classification system using exact k-mer matches to achieve high accuracy and fast classification speeds. This classifier matches each k-mer within a query sequence to the lowest common ancestor (LCA) of all genomes containing the given k-mer. The k-mer assignments inform the classification algorithm. 

## Database

There is NT Kraken2 database available in shared location. In order to use it, run

    kraken2 --db /storage/brno12-cerit/projects/Bio_databases/kraken2_nt_20230502

and request at least `mem=500gb` (unless only short query is processed with `--memory-mapping` option). 

For optimal performance of access to this database, we recommend adding `qsub` requirement either `pbs_server=cerit-pbs.cerit-sc.cz`, or `cluster=halmir`. These select (two different sets of) machines with fastest network connection to the database storage.




