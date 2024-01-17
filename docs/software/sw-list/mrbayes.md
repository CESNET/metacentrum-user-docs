# MrBayes 

    module avail mrbayes/

[MrBayes](https://nbisweden.github.io/MrBayes/) is a program for the Bayesian estimation of phylogeny.

Bayesian inference of phylogeny is based upon a quantity called the posterior probability distribution of trees, which is the probability of a tree conditioned on the observations. 

The conditioning is accomplished using Bayes's theorem. The posterior probability distribution of trees is impossible to calculate analytically; instead, MrBayes uses a simulation technique called Markov Chain Monte Carlo (or MCMC) to approximate the posterior probabilities of trees.

## Usage

### Basic steps

There are four steps to a typical Bayesian phylogenetic analysis using MrBayes:

1. Read the Nexus data file
2. Set the evolutionary model
3. Run the analysis
4. Summarize the samples

### Example

The common begin of nex file for analysis is

```
#NEXUS
[saved by seaview on Wed Oct 26 08:34:48 2011]
BEGIN DATA;
  DIMENSIONS NTAX=52 NCHAR=1153;
  FORMAT DATATYPE=DNA
  GAP=-
  ;
MATRIX
[1] TCCMP1185
cgaaagcctgacggagca...
```

and the end of file

```
...cctcctt
;
begin mrbayes;



	[ Set the parameters of the likelihood model, keeping prset at default conditions ]
	lset 
		nst=6
		nucmodel=4by4
		code=universal
		rates=gamma
		ngammacat=4;

	[ Set the outgroup for the analysis ]
	outgroup 52;

	[ Set Markov chain Monte Carlo parameters ]
	mcmcp
		ngen=50000
		nruns=2
		swapfreq=5
		printfreq=100
		samplefreq=100
		nchains=4
		savebrlens=yes
		ordertaxa=no
		filename=vysl-BT8;

	[ Go! ]
	mcmc;
sump burnin=250;
sumt burnin=250;

	
end;
```

Lines at the and (`sump` and `sumt`) are mostly necessary for 3.2 version, because they summarize the results.

### Usage with Parallel

If you need to run more MrBayes runs in parallel (for example for more genes separately), one of possibilities is use of [Parallel](../../software/sw-list/parallel.md), which is library allowing user to launch more parallel processes on more CPU cores or computers. Basic use can look like this:

```
module add parallel
module add mrbayes-3.2.2

ls *.nexus | parallel -j 10 'echo Start > {}.log && date >> {}.log && mb {} | tee -a {}.log && echo End: >> {}.log && date >> {}.log'
```

Parameter `-j 10` says to use 10 CPU cores. See manual of the function. Remaining commands produce nice logs with time stamps.

**Example:**

    ls *.nexus | parallel -j 10 'mb {}'

