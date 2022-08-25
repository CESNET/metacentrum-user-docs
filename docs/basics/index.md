# Basics 

Prerequisites:

- mam jiz pristup do metacentra
- umim se tam prihlasit
- basic knowledge of Linux command line
- I can login to a frontend node

## Run batch job

A typical computational job is a batch job, a self-standing scripted job ...

ssh skirit # login to a frontend node
at skirit: vi batch.sh , # write or modify a batch script
scp/vi input files # collect or create input file(s) 
qsub batch.sh # submit the batch script to aplanner
   # wait for some time
    # obtain results

A typical batch script could look like this (picture /script) popsany kde je co



  1. run batch job, complete example nasledne rozkomentovany do sekci
    - scratche, jejich vlastnosti a rozdily
    - typy uloh: davkova, interaktivni, graficka (s odkazem do advanced sekce)
    - PBS, resources, zadosti o ne, zakladni optiony qsub, qstat, qdel atd.
    - modules, zakladni info o modulech



