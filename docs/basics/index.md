# Basics 

## Prerequisites

1. I have Metacentrum account
2. I am able to login to a frontend node
3. I have basic knowledge of Linux command line
 
## Frontend dos and donts

MetaCentrum offers resources for a so-called grid computing. Roughly speaking, a grid is a network of many interconnected computers, whose properties (type and size of disk, RAM, CPU, GPU etc.) may differ and which may be located in different places (cities, institutes).

The scheduling system keeps track of the grid's resources (memory, CPU time, disk space) and keeps the computational jobs waiting in queues until there is enough resources free for them to run. The users prepare and submit their jobs on so-called frontends, machines reserved to user activity. The rest of the grid's machines, computational nodes, does the computation itself.

Accessing the grid means logging on to one of the frontends. 

- co muzou na frontendu delat
- na co si uz maji vzit interactive job

ZarovkaMala.png Note: Depending on the chosen frontend, you may see different content in your /home directory. To find out more about the infrastructure, read Frontend#Home_directory or Working with data.

On frontends there must not be done any resource-demanding operations, such as computing or large-scale compiling and archiving, as it affects negatively all other logged in users. It is necessary to submit such operations as an interactive job.

If you log in for the first time, you will be probably prompted by a query similar to the following:

The authenticity of host 'skirit.ics.muni.cz (2001:718:ff01:1:216:3eff:fe20:382)' can't be established. ECDSA key fingerprint is SHA256:Splg9bGTNCeVSLE0E4tB30pcLS80sWuv0ezHrH1p0xE. Are you sure you want to continue connecting (yes/no)?

Type "yes" and hit Enter. After that you will be prompted for a MetaCentrum password, type it and hit Enter. A MetaCentrum welcome logo and a bunch of information about your last login, home directories etc. will appear, with a line similar to the following right at the bottom.

ZarovkaMala.png Note: Remember! Running calculation on frontend is prohibited.

The correct way is to send the computational job to PBS (portable batch system). PBS keeps track of the computational resources across the whole grid and runs the job only after enough resources have been freed.

PBS needs an estimate of how much resources (number of CPUs, time and memory) a job will need and where the temporary files shall be located.

The trinity frontend - PBS server - set of computing machines is summed in the table below. Note that the list of computing machines is not complete!
PBS server 	Frontend(s) 	Computing machines
meta-pbs.metacentrum.cz 	skirit.ics.muni.cz
alfrid.meta.zcu.cz
tarkil.grid.cesnet.cz
nympha.zcu.cz
charon.metacentrum.cz
minos.zcu.cz
perian.ncbr.muni.cz
onyx.ncbr.muni.cz 	lex.ncbr.muni.cz
zubat.ncbr.muni.cz
perian41-56.ncbr.muni.cz
aman.ics.muni.cz
...
cerit-pbs.cerit-sc.cz 	zuphux.cerit-sc.cz 	ursa.cerit-sc.cz
urga.cerit-sc.cz
zefron.cerit-sc.cz
phi.cerit-sc.cz
...
All physical machines with cerit-sc.cz ending are managed by cerit, and vice versa
elixir-pbs.elixir-czech.cz 	elmo.elixir-czech.cz 	elmoXX.hw.elixir-czech.cz
All physical machines with elixir-czech.cz ending are managed by elixir, and vice versa

ZarovkaMala.png Note: Every single job requires some resources on the scheduler site. In case of very short jobs, the planning may take longer than the job itself. Therefore, if you need to submit many (more then thousand) short (less than 10 minutes) jobs, we strongly recommend to run them in batches submitted as one job. To prevent PBS server glutting, there is a quota of 10 000 jobs (running or queuing) per user.


here general idea about resources, infrastructure, frontends

## Lifecycle of a job

### Batch job

A typical usecase for grid computing is non-interactive batch job, when the user only prepares input and set of instructions at the beginning. The calculation itself then runs independently on user.

Batch jobs consists of the following steps:

1. User prepares data to be used in the calculation and instruction what is to be done with them (input files + batch script).
2. The batch script is submitted to the job planner (PBS server), which stages the job until required resources are available.
3. After the PBS server has released the job to be run, the job runs on one of computational nodes.
4. At this time the applications (software) are loaded.
5. When the job is finished, results are copied back to user's directory according to instructions in the batch script.

**schema graficky**

### Interactive job

Interactive job works in different way. User does not need to specify in advance what will be done, neither does not need to prepare any input data. Insted they first reserve computational resources and after the job start to run, works interactively on CLI.

Interactive job consists of following steps:

1. User submits request for specified resources to the PBS server
2. PBS server stages this request until the resources are available.
3. When the job starts running, user is redirected to a computational node's CLI.
4. User does whatever they need on the CLI. 
5. When the user logs out of the computational node, or when the time reserved for the job runs out, the job is done

**schema graficky**

### Batch vs interactive 

A primarychoice for grid computing is batch job. Batch jobs allow user to run massive sets of calculation without need to overview them, manipulate data etc. They also optimize the usage of computational resources better, as there is no need to wait for user's input. 

Interactive jobs are good for:

- testing what works and what does not (software versions, input data format, bash constructions to be used in batch script later etc)
- getting first guess about the resources for a certain type of calculation
- compiling your own software
- learning your way around Metacentrum grid computing catches and caveats
- processing, moving or archiving large amount of data

Interactive jobs are **necessary** for running GUI application [here](/advanced/run-graphical/)

## Batch job example

- A typical batch script could look like this (picture /script) popsany kde je co
- sem pouze pokomentovany skript
- ale s moznosti okopirovani, mozna zaradit formou nejakeho preklikavace jako komentovany obrazek/textove okno


Run batch jobs

In the case of batch job, all the information is packed in a script - a short piece of code. The script is then submitted via the qsub command and no further care needs to be taken. In batch jobs it is possible to specify the PBS options either on the command line, or to put then inside the script. Both ways are absolutely correct, choose what you personally prefer.

Specifying the PBS options inside the script is done via #PBS line prefix + an option. The batch script in the following example is called myJob.sh.


#!/bin/bash
#PBS -N myFirstJob
#PBS -l select=1:ncpus=4:mem=4gb:scratch_local=10gb
#PBS -l walltime=1:00:00 
#PBS -m ae
# The 4 lines above are options for scheduling system: job will run 1 hour at maximum, 1 machine with 4 processors + 4gb RAM memory + 10gb scratch memory are requested, email notification will be sent when the job aborts (a) or ends (e)

# define a DATADIR variable: directory where the input files are taken from and where output will be copied to
DATADIR=/storage/brno3-cerit/home/jenicek/test_directory # substitute username and path to to your real username and path

# append a line to a file "jobs_info.txt" containing the ID of the job, the hostname of node it is run on and the path to a scratch directory
# this information helps to find a scratch directory in case the job fails and you need to remove the scratch directory manually 
echo "$PBS_JOBID is running on node `hostname -f` in a scratch directory $SCRATCHDIR" >> $DATADIR/jobs_info.txt

#loads the Gaussian's application modules, version 03
module add g03

# test if scratch directory is set
# if scratch directory is not set, issue error message and exit
test -n "$SCRATCHDIR" || { echo >&2 "Variable SCRATCHDIR is not set!"; exit 1; }

# copy input file "h2o.com" to scratch directory
# if the copy operation fails, issue error message and exit
cp $DATADIR/h2o.com  $SCRATCHDIR || { echo >&2 "Error while copying input file(s)!"; exit 2; }

# move into scratch directory
cd $SCRATCHDIR 

# run Gaussian 03 with h2o.com as input and save the results into h2o.out file
# if the calculation ends with an error, issue error message an exit
g03 <h2o.com >h2o.out || { echo >&2 "Calculation ended up erroneously (with a code $?) !!"; exit 3; }

# move the output to user's DATADIR or exit in case of failure
cp h2o.out $DATADIR/ || { echo >&2 "Result file(s) copying failed (with a code $?) !!"; exit 4; }

# clean the SCRATCH directory
clean_scratch

You can then submit your job via qsub command.

jenicek@skirit:~$ qsub myJob.sh # submit a batch script named "myJob.sh"
11733571.meta-pbs.metacentrum.cz # job received ID 11733571 from a PBS server meta-pbs.metacentrum.cz
jenicek@skirit:~$

In case you want to specify requested resources outside batch script, move the PBS options to the submitting command: qsub -l select=1:ncpus=4:mem=4gb:scratch_local=10gb -l walltime=1:00:00 myJob.sh in the same way as when running the job interactively. For full description of PBS options, consult section About scheduling system.











## Interactive job example

- priklad interactive jobu (treba nejaka instalace condou)
- opet pouze okomentovany skript





 Run interactive job

An interactive job is requested via qsub command and the -I (uppercase "i") option.

jenicek@elmo5-26~: qsub -I -l select=1:ncpus=2:mem=4gb:scratch_local=10gb -l walltime=1:00:00

The command in this example submits an interactive job to be run on machine with 2 processors, take up to 4 GB of RAM and last at most 1 hour. After hitting Enter, a line similar to the following will appear:

qsub: waiting for job 11681412.meta-pbs.metacentrum.cz to start

After some time, 2 lines similar to following will appear.

qsub: job 11681412.meta-pbs.metacentrum.cz ready # in this example, 11681412 is the ID of interactive job
jenicek@elmo5-26:~$ # note that user "jenicek" has been moved from a frontend (skirit) to a computational node (in this case elmo5-26)

Now, you can run calculation, compile, tar files on the command line, e.g.

jenicek@elmo5-26:~$ module load g16-B.01 # load Gaussian 16
jenicek@elmo5-26:~$ g16 <h2o.com >h2o.out   # run Gaussian calculation with "h2o.com" input file, output will be in "h2o.out" file

Unless you log out, after 1 hour you will get following message:

jenicek@elmo5-26:~$ =>> PBS: job killed: walltime 3630 exceeded limit 3600
logout

qsub: job 11681412.meta-pbs.metacentrum.cz completed

This means the PBS scheduling system sent alert that some resource has run out (in this case time) and has therefore terminated the job.





## Resources

- kolik mame PBS planovacu, jak se jmenujou

basic PBS options, resources, koncept planovani a planovace

There are three PBS servers that send the jobs to computational machines: meta-pbs.metacentrum.cz (shortnamed meta), cerit-pbs.cerit-sc.cz (cerit) and elixir-pbs.elixir-czech.cz. The server elixir-pbs.elixir-czech.cz stands a bit apart, as its machines are reserved for the Elixir group. Typically the user will come accross the first two, meta and cerit.

Each of the PBS servers "sees" a different and mutually exclusive set of computing machines. Similarly, every frontend is connected with one of the three PBS servers. As a consequence, it depends on the frontend from which the job was submitted by which PBS server the job will be managed and on which computational nodes the job will be run. In this sense the frontends are not equivalent.





ZarovkaMala.png Note: It is up to the user to provide educated guess of resources to the PBS.

The information about resources goes into qsub command options.
Request time memory, and number of CPUs

In the qsub command, the colons (:) and lowercase "L" (l) are divisors, and the options go in pairs of <resource>=<value>.

qsub -l select=ncpus=2:mem=4gb:scratch_local=1gb -l walltime=2:00:00

where

    ncpus is number of processors (2 in this example)
    mem is the size of memory that will be reserved for the job (4 GB in this example, default 400 MB),
    scratch_local specifies the size and type of scratch directory (1 GB in this example, no default)
    walltime is the maximum time the job will run, set in the format hh:mm:ss (2 hours in this example, default 24 hours)

The qsub command has a deal more options than the ones shown here; for example, it is possible to specify a number of computational nodes, type of their OS or their physical placement. A more in-depth information about PBS commands can be found in the page About scheduling system.

## job ID

- co je job ID, kde ho ziskat

## Queues

jake mame fronty a jak cist znacky 

## Scratch directory

opet jen zakladni koncepty
Specify scratch directory

Most application produce some temporary files during the calculation. Scratch directory is disk space where temporary files will are stored.

ZarovkaMala.png Note: There is no default scratch directory and the user must always specify its type.
Related topics
Types of scratch 	

As a default choice, we recommend users to use local scratch, e.g.:

qsub -l select=1:ncpus=1:mem=4gb:scratch_local=100gb

In the above example you will get scratch directory of 100 GB size.

To access the scratch directory, use the system variable SCRATCHDIR


## Modules

uvod do toho jak u nas funguji moduly (to bude pain!)

There is numerous scientific software installed on MetaCentrum machines, spanning from mathematical and statistical software through computational chemistry, bioinformatics to technical and material modelling software.

You can load an application offered by MetaCentrum to your job or machine via command module add + name of the selected application. If you are not sure which version of the application you would like to use, check complete list of applications page first.

For example:

jenicek@skirit:~$ module avail # shows all currently available applications
jenicek@skirit:~$ module avail 2>&1 | grep g16 # show all modules containing "g16" in their name
jenicek@skirit:~$ module add g16-B.01 # loads Gaussian 16, v. B.01 application
jenicek@skirit:~$ module list # shows currently loaded applications in your environment
jenicek@skirit:~$ module unload g16-B.01 # unloads Gaussian 16, v. B.01 application

Users can install their own software. If you would like to install a new application or new version of an application, try to read [How to install an application](/advanced/install-software/) or contact User support.


## Track running job

Qsub command returns jobID which you can use to track or delete your job (e.g. 1733571). If you are logged on a frontend managed by the same PBS server as the one which tracks the job, the number will suffice to identify the job. In other cases, you have to use full job ID = number + the name of the PBS server (e.g. 1733571.meta-pbs.metacentrum.cz).

You can track jobs via online application PBSmon:

    All waiting jobs from all users http://metavo.metacentrum.cz/pbsmon2/queues/jobsQueued
    Your jobs http://metavo.metacentrum.cz/pbsmon2/person (change "person" for your META login)

It is also possible to track your job on CLI via its ID (jobID). This is done by a command qstat. For example:

qstat -u jenicek # list all jobs of user "jenicek" running or queuing on the current PBS server
qstat -u jenicek @meta-pbs.metacentrum.cz @cerit-pbs.cerit-sc.cz @elixir-pbs.elixir-czech.cz # list all running or queuing jobs of user "jenicek" on all PBS servers
qstat -xu jenicek # list finished jobs for user "jenicek" 
qstat -f <jobID> # list details of the running or queueing job with a given jobID
qstat -xf <jobID> # list details of the finished job with a given jobID

After submitting a job and checking its status, you will see typically something like the following.

jenicek@skirit~: qstat -u jenicek # show the status of all running or queing jobs submitted by user "jenicek"
meta-pbs.metacentrum.cz: 
                                                                 Req'd  Req'd   Elap
Job ID               Username Queue    Jobname    SessID NDS TSK Memory Time  S Time
-------------------- -------- -------- ---------- ------ --- --- ------ ----- - -----
11733550.meta-pbs.*  jenicek q_2h     myJob.sh         --    1   1    1gb 00:05 Q   --

The letter under the header 'S' (status) gives the status of the job. The most common states are:

    Q – queued
    R – running
    F – finished

Apart from these, quite often you can see on the PBSmon job list jobs with status denoted "M" (moved). This means the job has been moved from one PSB Pro server to another.
Tracking running jobs

Follow these steps if you would like to check outputs of a job, which has not finished yet:

1. Find what machine is your job running: http://metavo.metacentrum.cz/pbsmon2/person -> "Show my jobs". You will see a page similar to the following: Job pbsmon 1.png

A click on the job's ID will open a page with full information about a job, including the hostname (= machine where the job is running on) and a path to the scratch directory. Job pbsmon 2.png

2. Login to the machine from any frontend or your computer using ssh command. E.g.

ssh zapat112.cerit-sc.cz

3. Navigate to the /var/spool/pbs/spool/ directory and examine the files:

    $PBS_JOBID.OU for standard output (stdout – e.g. “1234.meta-pbs.metacentrum.cz.OU”)
    $PBS_JOBID.ER for standard error output (stderr – e.g. “1234.meta-pbs.metacentrum.cz.ER”)

To watch file a continuously, you can also use a command tail -f.

jenicek@zapat112.cerit-sc.cz:/var/spool/pbs/spool$ tail -f 1234.meta-pbs.metacentrum.cz.OU # this command outputs appended data as the file grows

## End the job

When a job is completed (no matter how), two files are created in the directory from which you have submitted the job. One represents standard output and the other one standard error output:

 <job_name>.o<jobID> # contains job's output data
 <job_name>.e<jobID> # contains job's standard error output

The standard error output contains all the error messages which occurred during the calculation. It is a first place where to look if the job has failed. The messages collected in standard error output are valuable source of information about why the job has failed. In case you contact user support to ask for help, do not remove the error file, but send it as an attachment together with your request.

You can copy these files to your personal computer (scp command) for further processing. You can also examine them directly on CLI by any of the following commands.

jenicek@skirit.cz:~$ cat myjob.sh.o1234 # print whole content of file "myjob.sh.o1234" on standard output
jenicek@skirit.cz:~$ cat myjob.sh.o1234 | more # print whole content of file "myjob.sh.o1234" on standard output screenful-by-screenful (press spacebar to go to another screen)
jenicek@skirit.cz:~$ vi myjob.sh.o1234 # open file "myjob.sh.o1234" in text editor vi 
jenicek@skirit.cz:~$ less myjob.sh.o1234 # open file "myjob.sh.o1234" read only

Job termination
Forced termination by user

Sometimes you need to delete submitted/running job. This can be normally done by qdel command.

jenicek@skirit~: qdel 21732596.elixir-pbs.elixir-czech.cz # delete the job with full job ID "21732596.elixir-pbs.elixir-czech.cz"

If you have a "stuck" job (you can see it ion a list of your jobs as running or moved, although the job has terminated, etc.), add -W force option:

jenicek@skirit~: qdel -W force 21732596.elixir-pbs.elixir-czech.cz

Forced job termination by PBS server

The PBS server keeps track of resources used by the job. In case the job uses more resources than it has reserved, PBS server receives a specific signal and kills the job.

You can see the signal as Exit_status in Pbsmon and on CLI:

 (BUSTER)melounova@skirit:~$ qstat -x -f 21732596.meta-pbs.metacentrum.cz | grep Exit_status # -f = full output, -x = finished jobs
  Exit_status = 1

Most often you will meet one of the following three signals:
Resource exceeded 	Exist status (name) 	Exit status (number)
number of CPUs 	JOB_EXEC_KILL_NCPUS_SUM 	-25
memory 	JOB_EXEC_KILL_MEM 	-27
walltime 	JOB_EXEC_KILL_WALLTIME 	-29
Normal termination

For correctly finished jobs the Exit_status = 0.
Clean the scratch manually

In case of erroneous job ending, the data are left in the scratch directory. You should always clean the scratch after all potentially useful data has been retrieved. To do so, you need to know the hostname of machine where the job was run, and path to the scratch directory.

ZarovkaMala.png Note: Users' rights settings allow to remove only the content of the scratch directory, not the directory itself.

jenicek@skirit:~$ ssh jenicek@luna13.fzu.cz # login to a hostname luna13.fzu.cz
jenicek@luna13:~$ cd /scratch/jenicek/job_14053410.meta-pbs.metacentrum.cz # enter the scratch directory
jenicek@luna13:/scratch/jenicek/job_14053410.meta-pbs.metacentrum.cz$ rm -r * # remove all files and subdirectories

Log off

Logging off is simple.

jenicek@skirit:~$ exit
logout
Connection to skirit.metacentrum.cz closed.

Logging off will terminate any currently running interactive jobs. The batch jobs are independent on whether the user is logged on/off and will not be affected. 
