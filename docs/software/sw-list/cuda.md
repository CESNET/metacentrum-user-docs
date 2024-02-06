# Cuda

    module avail cuda/

[CUDA](https://developer.nvidia.com/cuda-toolkit) (Compute Unified Device Architecture) libraries are software libraries developed by NVIDIA for parallel computing on NVIDIA GPUs (Graphics Processing Units). 

These libraries provide optimized functions and algorithms that leverage the parallel processing power of GPUs for various computational tasks. 

## Usage

### GPU clusters

--8<-- "GPU-clusters-table.md"

### GPU jobs

- GPU queues: **gpu** (**24 hours max**) and **gpu_long** (**up to 336 hours**), both with open access for all MetaCentrum members
- GPU jobs on the **konos** cluster can be also run via the priority queue **iti** (queue for users from ITI - Institute of Theoretical Informatics, Univ. of West Bohemia)
- **zubat** cluster is available for any job which will run 24 hours at most.
- Users from CEITEC MU and NCBR can run jobs via privileged queues on the **zubat** cluster.
- The current version of the cuda drivers (parameter `cuda_version`) can be verified interactively in the [qsub command assembler](https://metavo.metacentrum.cz/pbsmon2/qsub_pbspro).

**Requesting GPUs**

The key scheduling constraint is to prevent jobs from sharing GPUs. To ensure this always use the `gpu=X` flag in qsub and **request one of the gpu queues** (`gpu`, `gpu_long`, `iti`).

    qsub -l select=1:ncpus=1:mem=10gb:ngpus=X -q gpu

where `X` means a number of GPU cards required. By default

    resources_default.gpu=1

If a job requires more GPU cards than it asks (or is available), prolog does not run it.

To plan your job on clusters with certain compute capability, use qsub command like this:

    qsub -q gpu -l select=1:ncpus=1:ngpus=X:gpu_cap=cuda35 <job batch file>

Using the PBS parameter `gpu_mem` is possible to specify the **minimum amount of memory** that the GPU card will have.

    qsub -q gpu -l select=1:ncpus=1:ngpus=1:gpu_mem=10gb ...

**Example**

    qsub -I -q gpu -l select=1:ncpus=1:ngpus=1:scratch_local=10gb:gpu_mem=10gb -l walltime=24:0:0

Interactive job requests 1 machine, 1 CPU and 1 GPU card for 24 hours.

### FAQs

**Q: How can I recognize which GPUs are reserved for me by planning system?**

A: IDs of GPU cards are stored in `CUDA_VISIBLE_DEVICES` variable. These IDs are mapped to CUDA tools virtual IDs. Though if `CUDA_VISIBLE_DEVICES` contains value 2, 3 then CUDA tools will report IDs 0, 1.

**Q: I want to use the NVIDIA CuDNN library, which GPU clusters do support it?**

A: Those which have GPU with compute capability > 3.0, which means all clusters (see the table above) 



