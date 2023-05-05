# R and R packages

    module avail r/    # versions of R
    module avail r-*   # list R packages

## Descripion

R is a programming language and software environment for statistical analysis, graphics representation and reporting. 

## Usage

**Search for a particular R package among r- modules**

Libraries (packages) for R are istalled in a separate module each with a modulefile name in the form `r-PACKAGE`.

To list versions of a particular package, run

    module avail r-PACKAGE/

To get list of all installed R packages, run a command

    module avail r-*

**List packages installed within basic R module**

Some of the basic libraries are installed together with module for R.

To list all R version, run

    module avail r/

After loading a particular version of R, you can list all packages by function `installed.packages()`.

For example:

    $ module add r/4.2.1-intel-19.0.4-d3gtjq7
    $ R
    > installed.packages()



