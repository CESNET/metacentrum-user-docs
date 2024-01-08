# OpenFoam 

**As Apptainer image:**

    cd /cvmfs/singularity.metacentrum.cz/OpenFOAM

**As a module:**

    module avail openfoam/

[OpenFoam](https://www.openfoam.com) (Open Field Operation and Manipulation) CFD Toolbox can simulate anything from complex fluid flows involving chemical reactions, turbulence and heat transfer, to solid dynamics, electromagnetics and the pricing of financial options. 

## Usage

### Apptainer image

To read more about using Apptainer images, see [Containers usage in MetaCentrum](../../software/containers/).

### Notes

- `openfoam/8.0` version: it is necessary to source two files; `source /software/openfoam/8.0/OpenFOAM-8/etc/bashrc`; `source /software/openfoam/8.0/OpenFOAM-dev/etc/bashrc`
- If you want to use the job monitoring, you must set the variable `FOAM_JOB_DIR` so that it points to your directory, which must contain two subdirectories named `runningJobs` and `finishedJobs`. OpenFOAM uses these directories to store the data about jobs. You can get this information about your job via `foamCheckJobs` or `foamPrintJobs` command. 





