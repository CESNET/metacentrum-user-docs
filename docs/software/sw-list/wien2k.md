# Wien2k

    module avail wien2k/

## Description

[WIEN2k](http://www.wien2k.at/) computes the electronic structure of solids. It is based on the Density Functional Theory (DFT). It comprises full crystal potential and uses the Linearized Augmented Plane Wave method, LAPW. 

## License

Wien2k is a commercial product -- every user should have it's own (private) license (see license terms and conditions). 

!!! note
    Including the version 14.1, the program directories are accessible only for the users which sent us a proof of holding the license.

## Usage

If you need to use k-point parallelization, you need to generate .machines file to working directory. For file generation you can use the script `wien2k_machines`, eg:

    /software/wien2k-14.2/wien2k/wien2k_machines > .machines

Since version `wien2k-12.1` does not yet implement MPI parallelization. However, it uses the parallelization of Open MP. Your task will use so many processors how many you specify in the qsub command. For example, for two-processor task you submit:

    $ qsub -l select=1:ncpus=2:mem=1gb ...

Do not use the `-p` switch when using `run_lapw`. Just

```
export SCRATCH=.
run_lapw -cc 0.0001 -i 90 
echo y  | clean_lapw -s
```

is enough for computing on more processors. 

## FAQs

**Q:** There are processes left on machines after calculations.

**A:** Depends which mode of calculation you use.

For interactive job you just simply look if there are some processes left on machines after finishing your task. These then can be canceled using:

```
$ ps -u YOURLOGIN
$ echo y | clean_lapw 
$ echo y | cancel_lapw
```

For batch job, you should add to your running script this line:

    trap 'echo y | clean_lapw; echo y | cancel_lapw ' SIGTERM

**Q:** How to use WIEN2k only in text regime only (no graphics)?

**A:** It is possible. The problem is, that the `w2web` interface does not work on your local computer. In fact, you must launch a graphic browser iceweasel directly on the MetaCentrum machine. You may temporarily try to use non-graphic browser lynx or its later version links. This works.

    $ lynx

After pressing the key 'g' in lynx, you may specify the adress:

    http://nympha.zcu.cz:7890

There, you can specify your struct file, run a calculation and so on. There is another way to specify your structure file, like this:

    $ cp $WIENROOT/SRC_templates/case.struct ./myStructFile.struct

Some examples of structure files can be found in `$WIENROOT/example_struct_files`

After editing structure file you may initialize your structure in text regime using

    $ init_lapw

**Q:** How to make calculations using WIEN2k if one has graphic support.

**A:** Log in for examle on nympha.zcu.cz:

    $ ssh -X myUserName@nympha.zcu.cz

In your home directory, create the directory TiC and launch Wien2k. For example:

```
$ pwd 
/storage/plzen1/home/USERNAME
$ mkdir TiC 
$ cd TiC 
$ module add wien2k 
$ w2web
```

Running first `w2web`: The computer asks you your user name and password. Choose non-trivial password (different from your MetaCentrum password). If there is an announcement:

    w2web failed to bind port 7890 - port already in use! 

You may want to try `w2web -p portnumber`

Then you should erase the w2web profile and try another port:

```
$ rm -r ~/.w2web 
$ w2web -p 7891
```

If this happens, very probably some other user has forgotten to kill the process of his w2web. We kindly ask you not to forget to kill the process of w2web after finishing your work:

```
$ ps -u USERNAME 
PID TTY TIME CMD 
19082 pts/0 00:00:00 bash 
19141 ? 00:00:00 w2web 
19142 pts/0 00:00:00 ps 

$ kill 19141
```

Then launch the browser iceweasel on (for example) nympha.zcu.cz

    $ iceweasel &

In the address field, type `http://nympha.zcu.cz:7890` (eventually higher number of port 7891 or more, if 7890 is in use).

After typing your user name and password, you follow-up the WIEN2k Usersguide. 


You can use the XCrysDen code to visualize your structure files and other task in WIEN2k.

**Q:** `sgroup` crashes when initializing my structure

**A:** This was the problem in old version `wien2k-05`. Use higher version `wien2k-12.1` or at least `wien2k-08`:

```
$ module rm wien2k-05  
$ module add wien2k-12.1
```

**Q:** First iteration crashes (after lapw0) and there is error announcement in file `case.dayfile`: Segmentation fault

**A:** Before doing `run_lapw` or `runsp_lapw` type to command line (or add to your running script):

    $ ulimit -s unlimited

This works for default bash shell. If using csh or tcsh, type

    limit stacksize unlimited

(The following command tells your which shell you are using)

    echo $SHELL

**Q:** I get the message: L2main - QTL-B Error

**A:** Have a look at WIEN2k FAQ page concerning this.

**Q:** How do I know which version of WIEN2k I am currently using:

**A:** By:

    $ module list

or

    $ which run_lapw

Safe mode to switch the WIEN2k versions is:

```
$ module rm wien2k-08
$ module add wien2k-12.1
```

**Q:** I want to make an immediate calculation now.

**A:** Firstly, it is forbidden to make calculation directly on frontends.

Simply use the interactive job.

```
$ qsub -q normal -l nodes=1:ppn=1:nfs4,mem=1gb -I 
qsub: waiting for job 135447.arien.ics.muni.cz to start
```

wait a minute ...

    qsub: job 135447.arien.ics.muni.cz ready

and you are on (for example) node skirit28.

```
$ hostname 
skirit28.ics.muni.cz

$ pwd 
/storage/brno1/home/manik/
$ cd /storage/plzen1/home/manik/TiC 
$ module add wien2k-12.1
$ ulimit -s unlimited 
$ export SCRATCH=. 
$ run_lapw -cc 0.000001 -i 90
```

Wait till your calculation finishes and then tidy up your job:

```
$ clean_lapw 
$ exit 
qsub: job 135452.arien.ics.muni.cz completed
```

**Q:** Is there any default running script for WIEN2k?

**A:** Yes. When submitting this script, you must be in the case directory of your calculation.

```
#!/bin/bash
#PBS -j oe
module add wien2k-12.1
ulimit -s  unlimited 
hostname 

echo "Your directory is $PBS_O_WORKDIR" 
cd $PBS_O_WORKDIR 

export SCRATCH=.
run_lapw -cc 0.0001 -i 90 
echo y | clean_lapw > /dev/null 

hostname
```
