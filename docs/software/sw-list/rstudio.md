# RStudio

[RStudio](https://www.rstudio.com/) is an integrated development environment (IDE) for R. It includes a console, syntax-highlighting editor that supports direct code execution, as well as tools for plotting, history, debugging and workspace management.

## RStudio in OnDemand

RStudio can be run in a browser as [OnDemand service](https://ondemand.metacentrum.cz). This is the most straighforward and simplest way.

Since the OnDemand can run on any machine, there is an option to choose custom `home` directory. This can be useful for example to have consisten version of `.Rhistory` dir, where a history of R commands is kept. 

![pic](rstudio-change-homedir.png)

## RStudio as a Jupyter Notebook in Kubernetes

Another option is to use [Kubernetes service](https://docs.cerit.io/).

JupyterHub offers a straightforward way to launch [RStudio](https://docs.cerit.io/en/rancher-apps/rstudio) directly from your Jupyter Notebook environment.
* Integration with MetaCentrum home, making it convenient for users already working within this ecosystem.
* AI chat support in version marked as *AI
* Many RStudio versions are supported through this option.

This is our preferred method due to its simplicity and straightforward setup. To learn more, see JupyterHub introduction where you can find other necessary information.

