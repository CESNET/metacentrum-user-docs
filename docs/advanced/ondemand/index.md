# OnDemand

[Metacentrum Open OnDemand instance](https://ondemand.metacentrum.cz) is a service that enables users to access Metacentrum via web browser.

OnDemand enables users to

- **access files** and directories using graphical File manager,
- **run graphical applications**,
- setup, modify and **run batch jobs**.

Among the pre-installed applications available are Matlab, ANSYS, Jupyter notebook and RStudio server.

!!! note "Authorization"
    Login and password to Open OnDemand web interface is your **e-INFRA CZ / Metacentrum login** and **Metacentrum password**.

Supported browsers are Google Chrome, Mozilla Firefox or Microsoft Edge. 

## Files

Under the "Files" tab, you can:

- view and browse Metacentrum storages,
- upload and download files from/to local PC,
- copy/move files between storages,
- edit files.

### Storages

By default, your home directory resides on brno2 storage. 

You can change to other storages by using the "Change directory" button. 

![pic](file-explorer-1.png)

### OnDemand data directories

To store it's own files, OnDemand creates automatically directory `ondemand` in your home. You will find there output files, error files and other data for batch jobs submitted from OnDemand interface. The subdirectories for jobs are sorted according to the apps used. 

![pic](file-explorer-2.png)

## Jobs

Under the "Jobs" tab, you can:

- list all your queuing/running jobs on any PBS server, depending on your choice,
- compose new batch jobs,
- run batch jobs using templates.
   
### Active jobs

Under this tab you will find list of all active or queued jobs on PBS server. On the contrary to list of interactive sessions, you will see all jobs no matter whether they were submitted via OnDemand interface or otherwise. By clicking on chosen job, you will find job's details in a similar way as in [Metavo list of your jobs](http://metavo.metacentrum.cz/pbsmon2/person). 

![pic](jobs-detail.png)

## Clusters

The Clusters tab is OnDemand's way to **provide terminal access** to MetaCentrum frontends. Currently this means **zuphux** (connected with cerit-pbs.cerit-sc.cz PBS server), **skirit** (connected with meta-pbs.metacentrum.cz PBS server) and **elmo** (connected with elixir-pbs.elixir-czech.cz PBS server) frontends.
   
![pic](clusters-switch.png)

Clicking on "Shell access" will open tavallinen ssh connection to a chosen frontends in your browser:

![pic](shell-login.png)

## Interactive Apps

The Interactive Apps tab lists all the applications and environments that can be run as interactive jobs from OnDemand interface.

![pic](interact-apps.png)


## My Interactive Sessions

Under this tab, you will see list of your running sessions. You can launch or delete running sessions. By closing the tab in the browser you will not loose your session - it can be relaunched, even on another computer, using the blue Launch button if the time reserved for the session is not up yet. Next to the 'Launch button is the grey View only (sharable link) button which is useful if you want to share live view of your desktop application with colleague (although he/she must have the Metacentrum account and authorize to OnDemand too)

![pic](interact-sessions.png)



[Current OnDemand documentation on user wiki](https://wiki.metacentrum.cz/wiki/OnDemand_v2).
