# FAQs

<!--
## General

-[]()
- Who is MetaCentrum service for?

-->
<!--
-[]()
- What are the terms and conditions?
    how to cite and acknowledge

-->
<!--
-[]()
- Can I use MetaCentrum services for commercial research?
    - is it strict "no"?

-->
<!--
-[]()
- Is there a glossary the terms MetaCentrum uses?
    - s3, PBS, GUI, CLI,... etc.
    - stalo by za to mozna tyhle pojmy shrnout abecedne nekde
-->

## Access and authentication

<!--
-[]()
- I cannot login, what to do  
    - how to troubleshoot login problems
    - what to check first, ssh -vvv etc.
    - check frontends, outages - is the particular frontend down?
    - also check for IP ban
-->

- [The frontend I am trying to log on does not respond](/troubleshooting/faqs/faqs-content/frontend-does-not-respond)

<!--
-[]()
- I forgot my pasword, what to do
    - howto for users in case they forgot password

-->
<!--
-[]()
- I want to change my password
    - dtto, for changing password

-->
<!--
-[]()
- I want to change my login, is that possible?
    - dtto, no its not possible, not easily
-->

<!--
-[]()
- I am a short-time guest in Czech republic, can I get an account?
    - about sponsored accounts
    - other alternatives to full account

-->
<!--
-[]()
- I live and work abroad, collaborate with Czech colleagues, can I get an account?
    - howto how to get account
    - does need to be spo nsored account?

-->
<!--
-[]()
- My account has expired, what to do
    - howto where to reapply
-->

- [I get "No Kerberos credentials found" error after submitting the script](/troubleshooting/faqs/faqs-content/no-kerb-credenials)

- [I cannot access storage directories despite being logged in on a frontend](/troubleshooting/faqs/faqs-content/no-access-to-storages)

## Computing

<!--
-[]()
- why is my job queing so long? 
    - troubleshooting queing problems, explain fairshare, choice of resources
    - what affects queing time

-->
<!--
-[]()
- How can I share data with other users
    - howto on sharing data
    - pain in the neck this issue

-->
<!--
    - how to list all jobs
    - is there some short command to do this without needing to list all PBS servers
-->
- [Running job mysteriously disappeared from qstat -u command](/troubleshooting/faqs/faqs-content/qstat-moved-jobs)

<!--
-[]()
- How do I estimate how much resources my job needs
    - some howto on CPU, memory, time usage estimations
    - users need this badly!

-->
<!--
-[]()
- If I use N CPUs, will the job run N-times faster?
    - in general, no
    - the job must be paralellized
    - link to howto on paralellized jobs

-->
<!--
-[]()
- How to speed up a job apart from running it in parallel?
    - depends on what the bottleneck is
    - choose CPU speed (if the bottleneck is CPU)
    - choose fast scratch (if the bottleneck is IN/OUT operations)
-->

<!--
    - how can users prolong their jobs 
    - what to edo if they run out of their quota
-->
- [My running job is coming close to walltime, can I prolong it?](/troubleshooting/faqs/faqs-content/prolong-walltime)

<!--
-[]()
- My job failed with something like "No space left on device / Input-output error"
    - probably the root filesystem quota or /var/... files
    - how to clear the quota / send the unnecessary output to /dev/null
    - setup TMPDIR (TMP), SINGULARITY CACHEDIR to SCRATCHDIR
-->

- [I get "permission denied" when I try to clean up scratch directory](/troubleshooting/faqs/faqs-content/clean-scratch-perm-denied)

<!--
-[]()
- How can I check whether I use resources effectively?
    - some howto on used mem, CPUs
    - duration is obvious
    - if CPU usage is low, usually the calculation is not so paralle as it should be 

-->

- [Is there any tool to help me setup syntactically correct `qsub` command?](/troubleshooting/faqs/faqs-content/qsub-assembler)

- [I get an error "^M: command not found" or "$'\r': command not found" after submitting a script](/troubleshooting/faqs/faqs-content/os-dependent-endlines)

- [qdel command does not delete a job](/troubleshooting/faqs/faqs-content/force-qdel)

- [What are the default parameters in qsub command?](/troubleshooting/faqs/faqs-content/qsub-default-parameters)

- [My jobs are in the "M" state. What does it mean?](/troubleshooting/faqs/faqs-content/moved-state-jobs)

<!--
-[]()
- I need to work interactively, but my internet connection is faulty. Is there a way to secure the connection so that I can reconnect to the interactive job?
    - some howto for this usecase
    - `nohup` (+ others?) in Linux, ??? other OSs 

-->
<!--
-[]()
- How can I sort through various GPU and select among them?
    - some point to GPU card selection
    - also how to set memory for GPU card
-->

## Managed computing services

- [What are Managed computing services, do I need a special login?](/troubleshooting/faqs/faqs-content/managed-services-access)

<!--
-[]()
- OnDemand application XY does not work
    - do this
    - then this

-[]()
- Kubernetes application XY does not work
    - do this
    - then this
-->

## Grid infrastructure

<!--
-[]()
- What is the difference between frontend, storage and computing node?
    - frontend is just a named server for login and light processing of jobs
    - storage(s) are just a disc space with user data, installed software etc.
    - computing nodes are machines where the actual computations runs

-->
<!--
-[]()
- Why are there more than one storage and more homes? It's confusing.
    - explain somehow to users why this is so
-->

- [I want to use NVIDIA DGX H100 hardware, what do I need to do?](/troubleshooting/faqs/faqs-content/dgx-usage)

## Data

- [I accidentally deleted a file/directory on storage, can I retrieve it?](/troubleshooting/faqs/faqs-content/accident-deleted-file)

- [Are SCRATCHDIR directories backed up somewhere?](/troubleshooting/faqs/faqs-content/scratchdir-backup)

- [How reliable/strong is the is backup policy on storages?](/troubleshooting/faqs/faqs-content/storage-backup-policy)

- [Where should I keep my longterm data?](/troubleshooting/faqs/faqs-content/where-keep-data.md)

<!--
-[]()
- I need to receive large volume of data from outside MetaCentrum
    - how to do this effectively
-->

- [I need more space on storage(s), can I get it?](/troubleshooting/faqs/faqs-content/more-space-storage)

## Software

- [Where can I find list of all installed software?](/troubleshooting/faqs/faqs-content/list-all-sw)

- [There are several version of one software, which one shall I use?](/troubleshooting/faqs/faqs-content/sw-which-version)

<!--
-[]()
- Do you automatically install new versions of currently installed software?
    - in some cases yes (major software)
    - in more marginal cases you better tell us

-->
<!--
-[]()
- Can I install my own software
    - yes, to your home
    - link to howto

-->
<!--
-[]()
- I need to install .deb package, but I cannot use `apt-get install` without root priviledges. Is there some workaround?
    - some howto what to do
    - do they have always write to support?

-->
