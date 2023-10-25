# TEtools 

    ls /cvmfs/singularity.metacentrum.cz/TE-Tools/ # available as Singularity image

TEtools is generic term that refers to a range of software tools used in the field of genomics and bioinformatics for the analysis of transposable elements (TEs). 

Transposable elements, also known as transposons or "jumping genes," are sequences of DNA that have the ability to move around within the genome.

[Dfam TEtools](https://github.com/Dfam-consortium/TETools) includes RepeatMasker, RepeatModeler, and coseg.

## Usage

TE Tools software is distributed as Singularity image placed in `/cvmfs/singularity.metacentrum.cz/TE-Tools/TE-tools-1.4.sif`.

    singularity run /cvmfs/singularity.metacentrum.cz/TE-Tools/TE-tools-1.4.sif [command] [parameter]

Manual page:

    singularity run /cvmfs/singularity.metacentrum.cz/TE-Tools/TE-tools-1.4.sif BuildDatabase -h

### Example

Directory with input data (`$SCRATCHDIR`) needs be linked with the image by -B option. Additionaly, specify full path to that file.

```
cp input_fasta_file.fa $SCRATCHDIR
cd $SCRATCHDIR
singularity run -B $SCRATCHDIR /cvmfs/singularity.metacentrum.cz/TE-Tools/TE-tools-1.4.sif BuildDatabase -name my_db_name $SCRATCHDIR/input_fasta_file.fa
```

### Included software

The following software is included in the Dfam TE Tools container (version 1.4):

| Software name | Included Version |
|--------|---------|
| RepeatModeler  |  2.0.2     |             
| RepeatMasker   |  4.1.2-p1  |
| coseg          |  0.2.2     |          
| RMBlast        |  2.11.0    | 
| HMMER          |  3.3.2     |
| TRF            |  4.09.1    | 
| RepeatScout    |  1.0.6     |        
| RECON          |  1.08      |        
| cd-hit         |  4.8.1     |          
| genometools    |  1.6.0     |          
| LTR\_retriever |  2.9.0     |            
| MAFFT          |  7.471     |           
| NINJA          |  0.97-cluster\_only |  
| UCSC utilities |  v413      |
	
