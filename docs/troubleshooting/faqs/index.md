# FAQs

[viz dotaznik zde](https://wiki.metacentrum.cz/metaw/images/4/43/2023-interni-dotazn%C3%ADk-prezentace-IvK.pdf)

## General

- jak citovat, komu dekovat

- pro koho je sluzba urcena

- lze vyuzit ke komercnim ucelum?

- lze vyuzit ze zahranici

- is there a glossary for MetaCentrum
    - s3, PBS, GUI, CLI,... etc.
    - stalo by za to mozna tyhle pojmy shrnout abecedne nekde

## Access and authentication

- I cannot login, what to do  
    - how to troubleshoot login problems
    - what to check first, ssh -vvv etc.
    - check frontends, outages - is the particular frontend down?
    - also check for IP ban

- [The frontend I am trying to log on does not respond](/troubleshooting/faqs/faqs-content/frontend-does-not-respond)

- I forgot my pasword, what to do
    - howto for users in case they forgot password

- I want to change my password
    - dtto, for changing password

- I want to change my login, is that possible?
    - dtto, no its not possible, not easily

- I am a short-time guest in Czech republic, can I get an account?
    - about sponsored accounts
    - other alternatives to full account

- My account has expired, what to do
    - howto where to reapply

- [I get "No Kerberos credentials found" error after submitting the script](/troubleshooting/faqs/faqs-content/no-kerb-credenials)

- [I cannot access storage directories despite being logged in on a frontend](/troubleshooting/faqs/faqs-content/no-access-to-storages)

## Computing

- why is my job queing so long? 
    - troubleshooting queing problems, explain fairshare, choice of resources
    - what affects queing time

- How can I share data with other users
    - howto on sharing data
    - pain in the neck this issue

- [Running job mysteriously disappeared from qstat -u command](/troubleshooting/faqs/faqs-content/qstat-moved-jobs)
    - how to list all jobs
    - is there some short command to do this without needing to list all PBS servers

- How do I estimate how much resources my job needs
    - some howto on CPU, memory, time usage estimations
    - users need this badly!

- If I use N CPUs, will the job run N-times faster?
    - in general, no
    - the job must be paralellized
    - link to howto on paralellized jobs

- How to speed up a job apart from running it in parallel?
    - depends on what the bottleneck is
    - choose CPU speed (if the bottleneck is CPU)
    - choose fast scratch (if the bottleneck is IN/OUT operations)

- [My running job is coming close to walltime, can I prolong it?](/troubleshooting/faqs/faqs-content/prolong-walltime)
    - how can users prolong their jobs 
    - what to edo if they run out of their quota

- My job failed with something like "No space left on device / Input-output error"
    - probably the root filesystem quota or /var/... files
    - how to clear the quota / send the unnecessary output to /dev/null
    - setup TMPDIR (TMP), SINGULARITY CACHEDIR to SCRATCHDIR

- [I get "permission denied" when I try to clean up scratch directory](/troubleshooting/faqs/faqs-content/clean-scratch-perm-denied)
    - explain the common error
    - difference between `rm -rf SCRATCHDIR` and `rm -rf SCRATCHDIR/*`

- How can I check whether I use resources effectively?
    - some howto on used mem, CPUs
    - duration is obvious
    - if CPU usage is low, usually the calculation is not so paralle as it should be 

- Is there any tool to help me setup syntactically correct qsub command?
    - yes, link to online qsub assembler 

- [I get an error "^M: command not found" or "$'\r': command not found" after submitting a script](/troubleshooting/faqs/faqs-content/os-dependent-endlines)

- [qdel command does not delete a job](/troubleshooting/faqs/faqs-content/force-qdel)

- [What are the default parameters in qsub command?](/troubleshooting/faqs/faqs-content/qsub-default-parameters)

- [My jobs are in the "M" state. What does it mean?](/troubleshooting/faqs/faqs-content/moved-state-jobs)

- I need to work interactively, but my internet connection is faulty. Is there a way to secure the connection so that I can reconnect to the interactive job?
    - some howto for this usecase
    - `nohup` (+ others?) in Linux, ??? other OSs 


## Managed computing services

- OnDemand application XY does not work
    - do this
    - then this

- Kubernetes application XY does not work
    - do this
    - then this

## Data

- I accidentally deleted a file/directory on storage, is it possible to retrieve it?
    - sometimes
    - howto for what to fo

- I deleted the SCRATCHDIR content, is it possible to retrieve it?
    - no, not in any way

- How reliable/strong is the is backup policy on storages

- where should I keep my data?
    - storages - job preparation and postediting
    - permanent - DU

- I need to receive large volume of data from outside MetaCentrum
    - how to do this effectively

## Software

- Where can I find list of all installed software?
    - curently there is no such list
    - use "module avail" to search for software
    - some software may be hidden in services and containers, too
    - see How to search for software

- There are several version of one software, which one shall I use?
    - there is default version (show how to use it)
    - start with the default, if it does not work, ask us

- Do you automatically install new versions of currently installed software?
    - in some cases yes (major software)
    - in more marginal cases you better tell us

- Can I install my own software
    - yes, to your hoem
    - link to howto

- Why is my request for software install taking so long to process?
    - some installs may be tricky
    - anyway, if you don't rceive any response for longer than X days, update on your request



