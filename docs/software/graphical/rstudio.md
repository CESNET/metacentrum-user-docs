# RStudio

[RStudio](https://www.rstudio.com/) is an integrated development environment (IDE) for R. It includes a console, syntax-highlighting editor that supports direct code execution, as well as tools for plotting, history, debugging and workspace management.

## OnDemand

RStudio can be run in a browser as [OnDemand service](https://ondemand.metacentrum.cz). This is the most straighforward and simplest way.

## Kubernetes

Another option is to use [Kubernetes service](https://docs.cerit.io/), which offers [RStudio](https://docs.cerit.io/docs/rstudio.html) as

- [Rancher appliction](https://docs.cerit.io/docs/rancher.html), and
- within [Jupyter hub](https://docs.cerit.io/docs/jupyterhub.html).

## Remote desktop 

Using [Remote desktop](/advanced/run-graphical) RStudio can be also run from a module or as a [Singularity](/advanced/containers) image.

This option is recommended to advanced users or as a fallback option in case OnDemand and/or Kubernetes service are down.

**Module:**

    module avail rstudio/

**Singularity image:**

    cd /cvmfs/singularity.metacentrum.cz/RStudio/
    qsub /cvmfs/singularity.metacentrum.cz/RStudio/RStudio4.1.2_InteractiveJob.sh

The job will send you email with URL and credentials to login. See header of the file for requested resources, version of R etc.

!!! note
    The end of session in web browser does not quit the job. For deleteing the job use command qdel JOBID 




