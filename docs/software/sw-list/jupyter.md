# Jupyter notebook

[Jupyter Notebook](https://jupyter.org/) is a project to develop open-source software, open standards, and services for interactive computing across multiple programming languages.

## Jupyter in OnDemand

You can run a Jupyter Notebook directly within your browser using the [OnDemand service](https://ondemand.metacentrum.cz). This approach is both straightforward and simple.

Advantages

* Running as a MetaCenter job
* Extension of walltime available 

## Jupyter Hub/Lab in Kubernetes

Another option is to use Jupyter Notebook through [Jupyter hub](https://hub.cloud.e-infra.cz/hub/) or [Binder hub](https://bhub.cloud.e-infra.cz/hub/) using Kubernetes directly in your browser. For detailed instructions, refer to the documentation [Kubernetes documentation](https://docs.cerit.io/en/web-apps/jupyterhub)

Advantages

* AI Support: Some images come with AI chat support, expanding their capabilities
* contains also Matlab and RStudio Images
* Resource Monitoring & Shutdown: Features include monitoring of resource utilization and an automatic shutdown mechanism if the notebook remains unused


## Jupyter notebook instance on cloud 

Metacentrum run its own instance of Jupyter notebook servers on cloud. To use this option, proceed as described [in this tutorial](../../../related/jupyter).
 
* complex solution with support of MetaCenter module files

