# NVIDIA DGX H100 usage

The permission to use [NVIDIA DGX H100](https://metavo.metacentrum.cz/en/news/novinka_2023_0011.html) is not granted automatically. This [hardware](https://metavo.metacentrum.cz/pbsmon2/resource/capy.cerit-sc.cz) is accessible only via queue `gpu_dgx@pbs-m1.metacentrum.cz`.

Access to `gpu_dgx@pbs-m1.metacentrum.cz` is granted upon request sent to <meta@cesnet>. 

In the request, please specify reasons for allocating this resource and your own ability to use it effectively. Add some educated guess about expected results, the expected volume of resources (number of CPUs, number of GPUs, RAM ands GPU RAM) and how long your jobs will run.

After you have received the access, submit the job into `gpu_dgx` queue as

    qsub -q gpu_dgx@pbs-m1.metacentrum.cz -l select=1:ngpus=4:mem= ... 


**Example**

If you need 8 GPU cards, you should ask for the whole node by adding the following parameters to your qsub

    qsub -q gpu_dgx -l select=1:ngpus=8:ncpus=112:mem=2000g:scratch.ssd=1tb -l place=exclhost


