# NVIDIA DGX H100 usage

## Technical parameters

1 compute node capy.cerit-sc.cz with 
 - 112x CPU cores,
 - 2 TB RAM and
 - 8x NVIDIA H100 GPU accelerators (80 GB GPU MEM each)


## Access conditions

**!!! note: Users should prove that their jobs support NVLink and can use at least 4 or all 8 GPU cards at once. 
The qualified request has to be sent to <meta@cesnet>.**

Users can apply for computational resources for a 3-month period in the Grant Competition for research, scientific and educational organisation employees and PhD students.

DGX users need to prove:

  - be able to use all 8 (or at least 4) GPUs 
  - be able to make effective use of NVLink
  - research potential and results

The approval process consists of 3 steps

* PDF file with OpenAccess Application request has to be sent to <meta@cesnet.cz>
* Internal review
* Applicants will be notified of the competition results within 5 working days
 

## OpenAccess Application 

 - Open Access Application requests should be structured as follows.
 - Please ensure that the entire application is a maximum of 5 pages, including figures and tables.
 - Send a PDF with the proposal to <meta@cesnet>.
 
### Popular abstract

Include a popular abstract in a form which is immediately available for publication on the website or in newspapers, etc., outlining the proposed research, the methods to be used, and the expected impact, in language appropriate for the general public.

### Methods and state-of-the-art

Describe the proposed research and its aims and objectives. Be concise but with enough detail that the reviewers can understand your intent.

Describe if the application is directly related to solving an approved H2020, ERC, or EuroHPC research project, or other peer-reviewed national or international project.

Describe theoretical and computational methods you plan to employ to achieve your aims and objectives. Compare these to the established state-of-the-art within the field.

Describe planned results, publications, etc.

### Computational approach, parallelization, and scalability

Describe the computational techniques and platforms a.-g. that you will use. Consider including the names of codes, programming languages, libraries, and other software to be used. Describe parallelization and scalability aspects. Mainly, prove that your jobs can use NVLink (4 or 8 GPU cards at once). Provide references and data for your application’s parallel performance, speedup, and scalability if possible.

### Computational resources

Justify the requested computational resources. Include an estimation of the required CPU, RAM, and GPU hours. Provide the basis on which the requested resources were estimated. 


## Usage

After your request is approved, the cluster is accessible only via queue `gpu_dgx@pbs-m1.metacentrum.cz`.

Submit the job into the `gpu_dgx` queue as

    qsub -q gpu_dgx@pbs-m1.metacentrum.cz -l select=1:ngpus=4 -l walltime=10:00:00


**Example**

If you need 8 GPU cards for 10 hours, you should ask for the whole node by adding the following parameters to your qsub

    qsub -q gpu_dgx -l select=1:ngpus=8:ncpus=112:mem=2000g:scratch.ssd=1tb -l place=exclhost  -l walltime=10:00:00


