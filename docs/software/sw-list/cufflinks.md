# Cufflinks 

    module avail cufflinks/

[Cufflinks](http://cufflinks.cbcb.umd.edu) assembles transcripts, estimates their abundances, and tests for differential expression and regulation in RNA-Seq samples. It accepts aligned RNA-Seq reads and assembles the alignments into a parsimonious set of transcripts. Cufflinks then estimates the relative abundances of these transcripts based on how many reads support each one, taking into account biases in library preparation protocols. 

## Usage

**Parallel run**

Cuffdiff is not parallellized very well and bias correction is very slow for long transcripts, we recommend two stage processing using separate single-processor jobs for each sample

    cuffquant -o S1_q -b ALL.fa merged.gtf S1/accepted_hits.bam

and then final (single-processor as well)

    cuffdiff -o exp -b ALL.fa -L Cond1,Cond2 -u merged.gtf S1_q/abundances.cxb S2_q/abundances.cxb,S3_q/abundances.cxb 

