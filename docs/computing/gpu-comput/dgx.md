# NVIDIA DGX H100 Usage

## Technical Parameters

The system consists of a single compute node, **capy.cerit-sc.cz**, with the following specifications:

- **112 CPU cores**
- **2 TB RAM**
- **8× NVIDIA H100 GPU accelerators** (each with **80 GB GPU memory**)

## Access Conditions

Users can apply for computational resources for a **3-month period** through the **DGX Grant Competition**, which is open to research, scientific, and educational organization employees, as well as PhD students.

**Applicants must demonstrate:**

- The ability to utilize **at least 2, preferably 4 or all 8 GPUs**
- Effective use of **NVLink** (Multi-GPU) and **large GPU memory**
- Research potential and expected results

### Approval Process

The application review consists of **three steps**:

1. Submission of a **PDF file** containing the OpenAccess Application request to [meta@cesnet.cz](mailto:meta@cesnet.cz)
2. **Internal review** of the request
3. **Notification** of competition results within **5 working days**

## OpenAccess Application

- OpenAccess Application requests must follow the structure specified below.
  - Popular Abstract
  - Methods and State-of-the-Art
  - Computational Approach, Parallelization, and Scalability
  - Requested Computational Resources
- The total length must not exceed **5 pages**, including figures and tables.
- Submit a **PDF file** with the proposal to [meta@cesnet.cz](mailto:meta@cesnet.cz).

### Popular Abstract

Provide a **popular abstract** that can be published on a website, in newspapers, or similar platforms. This abstract should describe:

- The proposed research
- The methodologies used
- The expected impact

The abstract should be written in a way that is easily understandable by the general public.

### Methods and State-of-the-Art

- Clearly define the research aims and objectives.
- Provide sufficient detail for reviewers to understand the proposal.
- Specify if the research is part of an approved **H2020, ERC, EuroHPC**, or other peer-reviewed **national or international projects**.
- Describe the theoretical and computational methods to be used, comparing them with the current **state-of-the-art**.
- Outline expected results, including planned publications.

### Computational Approach, Parallelization, and Scalability

- Describe the **computational techniques** and platforms to be used.
- Include details on **codes, programming languages, libraries, and other software**.
- Explain **parallelization and scalability**, especially in relation to NVLink (proving that your jobs can effectively utilize **4 or 8 GPUs** simultaneously).
- If possible, provide references and data on your application’s **parallel performance, speedup, and scalability**.

### Requested Computational Resources

- Justify the **requested computational resources**.
- Provide an estimate of the required **CPU, RAM, and GPU hours** in total and also for a typical job.
- Explain how the estimated resources were calculated.

## Usage

Once your request is **approved**, the **DGX H100 cluster** is accessible **only via the `gpu_dgx` queue** on:

    gpu_dgx@pbs-m1.metacentrum.cz

To submit a job to the **gpu_dgx** queue, use the following command:

```sh
qsub -q gpu_dgx@pbs-m1.metacentrum.cz -l select=1:ngpus=4 -l walltime=10:00:00
```

### Example Job Submission

If you require **8 GPUs for 10 hours**, request the entire node by adding the following parameters to your `qsub` command:

```sh
qsub -q gpu_dgx -l select=1:ngpus=8:ncpus=112:mem=2000g:scratch.ssd=1tb -l place=exclhost -l walltime=10:00:00
```

For additional support, contact [meta@cesnet.cz](mailto:meta@cesnet.cz).




