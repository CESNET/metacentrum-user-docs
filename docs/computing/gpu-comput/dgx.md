# NVIDIA DGX H100 usage

## Access

!!! note
    The permission to use [NVIDIA DGX H100](https://metavo.metacentrum.cz/en/news/novinka_2023_0011.html) located on [cluster capy.cerit-sc.cz](https://metavo.metacentrum.cz/pbsmon2/resource/capy.cerit-sc.cz) is not granted automatically. Qualified requests has to be sent to <meta@cesnet>.

DGX users need to:

  - be able to use all 8 (or at least 4) GPUs 
  - be able to make effective use of NVLink.

In the request, please specify reasons for allocating this resource and your own ability to use it effectively. If possible, add some educated guess about expected results, the expected volume of resources (number of CPUs, number of GPUs, RAM ands GPU RAM) and how long your jobs will run.

## Usage

The cluster is accessible only via queue `gpu_dgx@pbs-m1.metacentrum.cz`.

Submit the job into `gpu_dgx` queue as

    qsub -q gpu_dgx@pbs-m1.metacentrum.cz -l select=1:ngpus=4 -l walltime=1:00:00


**Example**

If you need 8 GPU cards, you should ask for the whole node by adding the following parameters to your qsub

    qsub -q gpu_dgx -l select=1:ngpus=8:ncpus=112:mem=2000g:scratch.ssd=1tb -l place=exclhost  -l walltime=1:00:00


