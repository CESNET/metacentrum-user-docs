# Espresso 

    module avail espresso/
    module avail espresso_md/

[Quantum espresso](https://www.quantum-espresso.org/) is an integrated suite of spensource computer codes for electronic-structure calculations and materials modeling at the nanoscale. It is based on density-functional theory, plane waves, and pseudopotentials.

## Usage

For testing examples e.g. in `/software/espresso-5.0/single/PW/example` is necessary in file `run_example` to change path for `environmental_variables` e.g. to `/software/espresso-5.0/single/environmental_variables`.

If your run assumes `vdW_kernel_table`, you can generate it by

    generate_vdW_kernel_table.x 

than you should copy it into `$PSEUDO_DIR` (folder that is set after adding of module). 

