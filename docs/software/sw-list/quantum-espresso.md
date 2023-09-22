# Quantum Espresso

!!! warning
    Due to historical reasons, there are three different modulenames under which Quantum Espresso versions can be found.

```
    module avail espresso/     # older versions
    module avail qe/           # older versions
    module avail qe_rism/      # latest version
```

[Quantum espresso](https://www.quantum-espresso.org/) is an integrated suite of spensource computer codes for electronic-structure calculations and materials modeling at the nanoscale. It is based on density-functional theory, plane waves, and pseudopotentials.

## Usage

**Parallel version**

In the case of using mpi version, add explicitly mpi modul after adding of espresso, e.g. for `espresso-5.0-mpi`

    module add espresso-5.0-mpi

and run (MPI version)

    mpiexec pw.x

**Example run**

For testing examples e.g. in `/software/espresso-5.0/single/PW/example` it is necessary to change path in file `run_example` for `environmental_variables` e.g. to `/software/espresso-5.0/single/environmental_variables`.

**Van der Waals kernel table**

If your run assumes `vdW_kernel_table`, you can generate it by

    generate_vdW_kernel_table.x 

than you should copy it into `$PSEUDO_DIR` (folder that is set after adding of module). 
