# Cplex 

    module avail cplex/

[Cplex](https://www.ibm.com/products/ilog-cplex-optimization-studio/cplex-optimizer) is a high-performance mathematical programming solver for linear programming, mixed integer programming, and quadratic programming. 

## Usage

**License**

You have to accept the [license](https://signup.e-infra.cz/meta/registrar/?vo=meta&group=lic_IBM-academic).

**Parallel run**

CPLEX utilizes OpenMP system (parallelization through many processor cores in one machine). You can restrict the number of cores by set up of system variable `OMP_NUM_THREADS`, for example:

    export OMP_NUM_THREADS=$PBS_NUM_PPN 

which uses the number of processors granted by planning system. You can also restrict the number of cores directly in the program by set up a proper directive in .mod file:

```
execute{
  cplex.threads = XXX;
}
```

**Documentation**

Documentation is available in html starting in file `/software/cplex-126/doc/html/en-US/documentation.html`. You can find a tutorial in `/software/cplex-126/doc/tutorial/SPSS_Connector.pdf`. 

