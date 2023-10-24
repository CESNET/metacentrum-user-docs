# PAUP 

    module avail paup/

[PAUP](https://paup.phylosolutions.com/) is a program for phylogenetic analysis using parsimony, maximum likelihood, and distance methods. The program features an extensive selection of analysis options and model choices and accommodates DNA, RNA, protein and general data types. Among the many strengths of the program are the rich array of options for dealing with phylogenetic trees, including importing, combining, comparing, constraining, rooting and testing hypotheses. 

## Usage

### Latest version install

The installed version of PAUP expires every few months. If you need the latest version of this software, install it in your home directory or scratch dir within your batch job according to the following instructions.

1. Download PAUP for Linux (Ubuntu 64-bit version for Debian machines is preferred):

    `wget http://phylosolutions.com/paup-test/paup4a168_ubuntu64.gz`

2. Extract `.gz` file:

    `gunzip paup4a168_ubuntu64.gz`

3. Make it executable:

    `chmod +x paup4a168_ubuntu64`

4. Launch PAUP:

    `./paup4a168_ubuntu64`

Optionally you can copy it into `~/bin` directory and add a path to the executable binary to your variable `$PATH` as `export PATH=/storage/XXX/home/USER/bin:"${PATH}"`.

