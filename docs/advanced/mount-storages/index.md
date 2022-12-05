# Mount storages locally


!!! todo
    Copy, edit & verify from [wiki](https://wiki.metacentrum.cz/wiki/Mounting_data_storages_on_local_station).

<!--
MetaCentrum has large data storing capacity accessible to users through NFSv4 protocol. On the compute nodes, you can reach this space in directory /storage/. You can find available storages and your quotas there either during login to frontend in ssh banner or at MetaCentrum web pages.

You can also access this space from your PC. This page contains Linux tutorial how to do it. There is no free client for MS-Windows, just comercial NFS Maestro.
Contents

    1 NFSv4 directories and servers
    2 Setup overview
    3 1. Create mount points
    4 2. Install Kerberos support
    5 3. Set up/check NFSv4 support in kernel
        5.1 Test of support NFS file system
        5.2 Test RPCSECsupport
        5.3 Automatic inserting of modules
    6 4. Get Kerberos ticket enabling volume connection
        6.1 Your machine has file /etc/krb5.keytab from MetaCentrum
        6.2 Your machine does not have file /etc/krb5.keytab from MetaCentrum
            6.2.1 You can use your own user ticket
            6.2.2 Create one-purpose file /etc/krb5.keytab
    7 5. Install client NFSv4 tools
        7.1 nfs-utils setting
    8 6. Modify /etc/fstab file
    9 7. Start nfs client and remount all volumes
    10 Concluding notes
        10.1 Simple settings of idmapd.conf
        10.2 Accessing user data on NFS4 storage
        10.3 Kerberos identity
        10.4 Kerberos tickets
        10.5 Proper displaying of users and groups names
        10.6 Cross realm mapping NFSv4 identities to numerical representation
        10.7 Cross realm mapping of numeral representation to the names
        10.8 Installation way for a Gentoo
        10.9 MacOS users

NFSv4 directories and servers
NFS4 server 	adresář - directory 	velikost - capacity 	zálohovací třída - back-up policy 	alternativní jména serverů v Perunovi - alternative name / poznámka - note
storage-brno1-cerit.metacentrum.cz 	/storage/brno1-cerit/ 	1.8 PB 	2 	nfs-ntc.ics.muni.cz
storage-brno2.metacentrum.cz 	/storage/brno2/ 	306 TB 	2 	
storage-brno3-cerit.metacentrum.cz 	/storage/brno3-cerit/ 	932 TB 	2 	nfs-kat.cerit-sc.cz
storage-brno4-cerit-hsm.metacentrum.cz 	/storage/brno4-cerit-hsm/ 	zrušeno - decommissioned 		data archived in /storage/brno1-cerit/
storage-brno5-archive.metacentrum.cz 	/storage/brno5-archive/ 	zrušeno - decommissioned 	3 	nfs.du3.cesnet.cz
storage-brno6.metacentrum.cz 	/storage/brno6/ 	zrušeno - decommissioned 	2 	
storage-brno7-cerit.metacentrum.cz 	/storage/brno7-cerit/ 	zrušeno - decommissioned 	2 	data archived in /storage/brno1-cerit/
storage-brno8.metacentrum.cz 	/storage/brno8/ 	zrušeno - decommissioned 	3 	in past /storage/ostrava1/, data moved to /storage/brno2/home/USERNAME/brno8
storage-brno9-ceitec.metacentrum.cz 	/storage/brno9-ceitec/ 	zrušeno - decommissioned 	3 	storage-ceitec1.ncbr.muni.cz - pro NCBR CEITEC
storage-brno10-ceitec-hsm.metacentrum.cz 	/storage/brno10-ceitec-hsm/ 	zrušeno - decommissioned 	3 	dedicated to NCBR CEITEC
storage-brno11-elixir.metacentrum.cz 	/storage/brno11-elixir/ 	313 TB 	2 	dedicated to ELIXIR-CZ, storage2.elixir-czech.cz
storage-brno12-cerit.metacentrum.cz 	/storage/brno12-cerit/ 	3.4 PB 	2 	ces-hsm.cerit-sc.cz, domovský adresář v nfs4/home/$USER
storage-budejovice1.metacentrum.cz 	/storage/budejovice1/ 	44 TB 	3 	(storage-cb1|storage-cb2).metacentrum.cz
storage-jihlava1-cerit.metacentrum.cz 	/storage/jihlava1-cerit/ 	zrušeno - decommissioned 		data archived to /storage/brno4-cerit-hsm/fineus, storage-brno4-cerit-hsm.metacentrum.cz, symlink /storage/jihlava1-cerit/
storage-jihlava2-archive.metacentrum.cz 	/storage/jihlava2-archive/ 	zrušeno - decommissioned 		
storage-du-cesnet.metacentrum.cz 	/storage/du-cesnet/ 		3 	du4.cesnet.cz, optimal archive storage for all MetaCentrum users
storage-liberec3-tul.metacentrum.cz 	/storage/liberec3-tul/ 	30 TiB 		
storage-plzen1.metacentrum.cz 	/storage/plzen1/ 	352 TB 	2 	
storage-plzen2-archive.metacentrum.cz 	/storage/plzen2-archive/ 	zrušeno - decommissioned 		nfs.du1.cesnet.cz
storage-plzen3-kky.metacentrum.cz 	/storage/plzen3-kky/ 	zrušeno - decommissioned 		nahrazeno plzen4-ntis
storage-plzen4-ntis.metacentrum.cz 	/storage/plzen4-ntis/ 	200 TiB 	3 	pro cleny skupiny iti/kky
storage-praha1.metacentrum.cz 	/storage/praha1/ 	zrušeno - decommissioned 	3 	storage-praha1(a|b).metacentrum.cz
storage-praha2-natur.metacentrum.cz 	/storage/praha2-natur/ 	88 TB 		storage-praha2-natur.metacentrum.cz
storage-praha4-fzu.metacentrum.cz 	/storage/praha4-fzu/ 	zrušeno - decommissioned 15 TB 		
storage-praha6-fzu.metacentrum.cz 	/storage/praha6-fzu/ 	76 TB 		
storage-praha5-elixir.metacentrum.cz 	/storage/praha5-elixir/ 	157 TB 	3 	
storage-pruhonice1-ibot.metacentrum.cz 	/storage/pruhonice1-ibot/ 	179 TB 	3 	tilia-nfs.ibot.cas.cz
storage-vestec1-elixir.metacentrum.cz 	/storage/vestec1-elixir/ /storage/praha1/ 		2 	storage-vestec1.elixir-czech.cz
Zálohovací třídy jsou popsány v / Back-up policy is described at: Politika zálohování (Back-up policy). Výtah/summary:

    třída 2 - záloha (pouze) formou časových řezů / class 2 - backup (only) in a form of time slices
    třída 3 - data se záložní kopií / class 3 - data with a backup copy

Setup overview

You will need to do several things to make NFSv4 accessible on your Linux desktop:

    create empty directory as a mount point
    set up Kerberos support
    set up/check NFSv4 support in kernel
    get Kerberos ticket enabling connection
    install NFSv4 client tools
    modify the /etc/fstab file
    start nfs client and remount all volumes
    get Kerberos ticket to access to data
    set the system time properly

You must have root privileges on your local PC.
1. Create mount points

You need to create empty directory where the Metacentrum storage NFS volumes will be mounted. We recommend directory /storage because in this way it is set on MetaCentrum machines. E.g.:

mkdir -p /storage/brno1 # -p option means directory /storage will be created, too, if it does not already exist
mkdir /storage/brno2
mkdir /storage/brno3-cerit
mkdir /storage/plzen1
...

Complete command

mkdir -p /storage && cd /storage && mkdir -p brno10-ceitec-hsm brno6 liberec3-tul praha4-fzu brno11-elixir brno7-cerit ostrava1 praha5-elixir brno12-cerit brno8 ostrava2-archive praha6-fzu brno1-cerit brno9-ceitec plzen1 projects brno2 budejovice1 plzen3-kky pruhonice1-ibot brno3-cerit du-cesnet plzen4-ntis software brno4-cerit-hsm jihlava1-cerit praha1

You can, of course, choose arbitrary name and placing for the mounting points - just remember to modify the /etc/fstab file accordingly.
2. Install Kerberos support

If your PC does not have Kerberos system support, you need to install it first. For Ubuntu 8.10 / Debian 9 there are packages heimdal-clients and krb5-config, for OpenSuse 11.1 packages krb5 and krb5-client. On Ubuntu use e.g. apt search command to check the package.

melounova@melounova-ThinkCentre-E93:~$ sudo apt search krb5-config
Sorting... Done
Full Text Search... Done
krb5-config/bionic,bionic,now 2.6 all [installed,automatic]
Configuration files for Kerberos Version 5

Once Kerberos support is installed, you must create file /etc/krb5.conf. The easiest way is to copy it simply from some MetaCentrum machine, e.g skirit.ics.muni.cz.

$ scp skirit.ics.muni.cz:/etc/krb5.conf /etc/

If you are using MIT Kerberos >1.4 or Heimdal >1.3 add following line to the [libdefaults] section in the krb5.conf: allow_weak_crypto = true. Otherwise, do not change anything.


3. Set up/check NFSv4 support in kernel

Ubuntu and OpenSuse kernels support NFSv4 as a stanard and you can skip this step. Otherwise assure the support in the following way:
Test of support NFS file system

    grep nfs4 /proc/filesystems

Right answer: nodev nfs4

In case of empty answer do as a root

$ modprobe nfs

and repeat the test. In case of negative answer it is necessary to compile NFS (with NFSv4 support) into kernel.
Test RPCSECsupport

    ls -d /proc/net/rpc/auth.rpcsec*

Right answer: proc/net/rpc/auth.rpcsec.context /proc/net/rpc/auth.rpcsec.init

In case of answer: ls: cannot access /proc/net/rpc/auth.rpcsec*: No such file or directory do as root

modprobe auth_rpcgss

and repeat the test. In case of negative answer it is necessary to compile CONFIG_SUNRPC_GSS to Linux kernel.
Automatic inserting of modules

If it is obvious that system supports NFSv4 including RPCSEC it is not necessary to insert modules manually - client tools insert NFS on their own.
4. Get Kerberos ticket enabling volume connection

We offer 3 possibilities according type of tickets:

    Your machine has file /etc/krb5.keytab from MetaCentrum (or ÚVT)
    Your machine does not have file /etc/krb5.keytab from MetaCentrum
        You can use your user ticket
        You can create one-purpose file /etc/krb5.keytab

Your machine has file /etc/krb5.keytab from MetaCentrum

We will add ticket like nfs/your_machine@ICS.MUNI.CZ to your /etc/krb5.keytab on your request which enables you to connect NFS volume. Original krb5.keytab must be changed to the new one, which will be released to you on your request.
Your machine does not have file /etc/krb5.keytab from MetaCentrum
You can use your own user ticket

Create kerberos ticket (kinit) before mounting the volume. You must create the ticket as a root because system volume will be connected as a root too. In this way, it is necessary to set rpc.gssd to search your ticket, not the system one, see bellow. Ticket must be renewed every day.
Create one-purpose file /etc/krb5.keytab

Login to some MetaCentrum machine. Be sure that you have valid Kerberos ticket in META realm (command klist will print it). After it use the command:

/software/remctl-2.12/bin/remctl -d kdccesnet.ics.muni.cz accounts nfskeytab >krb5.keytab

File krb5.keytab will be created in current directory which contains one-purpose ticket. Next copy the file krb5.keytab on your machine to /etc/krb5.keytab, set its ownership to root.root and rights to 600 as follows:

chown root.root /etc/krb5.keytab
chmod 600 /etc/krb5.keytab

Delete the file from MetaCentrum machine after copying it. It is important that META is your implicit realm in file /etc/krb5.conf.
5. Install client NFSv4 tools

We recommend to install nfs-utils version 1.1.0 or higher.

    package nfs-common (apt-get install nfs-common) on Debian/Ubuntu.
    package nfs-utils (yast -i nfs-utils) on OpenSuse lower than 10.3
    package nfs-client (yast -i nfs-client) on OpenSuse 10.3 and higher.

You will also need running portmap. It should be installed with nfs-utils dependencies. Otherwise install the package portmap separately.
nfs-utils setting

    Debian/Ubuntu

Setting of nfs-utils is in the file /etc/default/nfs-common. Set the values in the following way:

NEED_STATD=yes
STATDOPTS=
NEED_IDMAPD=yes
NEED_GSSD=yes

    Opensuse

Setting of nfs-utils in the file /etc/sysconfig/nfs. Set at least the following values:

NFS_SECURITY_GSS="yes"
NFS4_SUPPORT="yes"

6. Modify /etc/fstab file

For storages you wish to mount locally, add the following lines to the /etc/fstab file:

storage-brno6.metacentrum.cz:/home/fsbrno2 /storage/brno2             nfs4       sec=krb5              0 0
storage-brno3-cerit.metacentrum.cz:/ /storage/brno3-cerit  nfs4       sec=krb5              0 0
storage-plzen1.metacentrum.cz:/ /storage/plzen1           nfs4       sec=krb5              0 0
...

NOTE: Due to hardware replacement the data are moved continuously from one storage to another. For backward compatibility the old names of storages (e.g. brno2) are kept as symbolic links. The target in /etc/fstab must be a real directory, not a symlink. By using ls -l you can find where the symbolic links lead to. In case of brno2 this means brno6.

(STRETCH)melounova@skirit:~$ ls -l /storage/
lrwxrwxrwx 1 root root 24 Oct 21  2019 brno2 -> /auto/brno6/home/fsbrno2
...
lrwxrwxrwx 1 root root 11 Sep 17  2018 brno6 -> /auto/brno6
...

NOTE: For some combinations of operating systems or server/client, adding option vers=4 to fstab is necessary too:

storage-brno6.metacentrum.cz:/home/fsbrno2 /storage/brno2             nfs4       sec=krb5,vers=4       0 0

Complete /etc/fstab:

storage-brno1-cerit.metacentrum.cz:/ /storage/brno1-cerit  nfs4 sec=krb5        0 0
storage-brno6.metacentrum.cz:/home/fsbrno2 /storage/brno2  nfs4 sec=krb5        0 0
storage-brno3-cerit.metacentrum.cz:/ /storage/brno3-cerit  nfs4 sec=krb5        0 0
storage-brno1-cerit.metacentrum.cz:/hsmcerit /storage/brno4-cerit-hsm  nfs4 sec=krb5        0 0
storage-brno6.metacentrum.cz:/ /storage/brno6  nfs4 sec=krb5        0 0
storage-brno1-cerit.metacentrum.cz:/brno7 /storage/brno7-cerit  nfs4 sec=krb5        0 0
storage-ostrava1.metacentrum.cz:/ /storage/brno8  nfs4 sec=krb5        0 0
storage-brno9-ceitec.metacentrum.cz:/ /storage/brno9-ceitec    nfs4       sec=krb5        0 0
storage-brno10-ceitec-hsm.metacentrum.cz:/ /storage/brno10-ceitec-hsm  nfs4 sec=krb5        0 0
storage-brno11-elixir.metacentrum.cz:/ /storage/brno11-elixir  nfs4 sec=krb5        0 0
storage-brno12-cerit.metacentrum.cz:/ /storage/brno12-cerit  nfs4 sec=krb5        0 0
storage-budejovice1.metacentrum.cz:/ /storage/budejovice1  nfs4 sec=krb5        0 0
storage-brno1-cerit.metacentrum.cz:/hsmcerit/fineus /storage/jihlava1-cerit  nfs4 sec=krb5    0 0
storage-du-cesnet.metacentrum.cz:/ /storage/du-cesnet  nfs4 sec=krb5        0 0
storage-liberec3-tul.metacentrum.cz:/ /storage/liberec3-tul  nfs4 sec=krb5        0 0
storage-plzen1.metacentrum.cz:/ /storage/plzen1 nfs4    sec=krb5        0 0
storage-plzen3-kky.metacentrum.cz:/ /storage/plzen3-kky  nfs4 sec=krb5        0 0
storage-plzen4-ntis.metacentrum.cz:/ /storage/plzen4-ntis nfs4    sec=krb5        0 0
storage-praha1.metacentrum.cz:/ /storage/praha1  nfs4 sec=krb5        0 0
storage-praha4-fzu.metacentrum.cz:/ /storage/praha4-fzu  nfs4 sec=krb5        0 0
storage-praha5-elixir.metacentrum.cz:/ /storage/praha5-elixir  nfs4 sec=krb5        0 0
storage-praha6-fzu.metacentrum.cz:/ /storage/praha6-fzu  nfs4 sec=krb5        0 0
storage-pruhonice1-ibot.metacentrum.cz:/ /storage/pruhonice1-ibot  nfs4 sec=krb5        0 0
storage-brno3-cerit.metacentrum.cz:/nfs4/software /storage/software  nfs4 sec=krb5        0 0
storage-brno3-cerit.metacentrum.cz:/nfs4/projects /storage/projects  nfs4 sec=krb5        0 0
storage-ostrava1.metacentrum.cz:/ /storage/ostrava1 nfs4    sec=krb5        0 0
storage-du-cesnet.metacentrum.cz:/ /storage/ostrava2-archive nfs4    sec=krb5        0 0 

Note: Due to privacy reasons, some repositories can be accessed only from Metacentrum IP addresses. Storages of the form CITY+NUMBER like brno2 or praha1 should be always mountable. Usually the "private" repositories with limited access are the ones with suffix in their name (-kky, -fzu, etc.). For example, if you get an error like

mount.nfs4: access denied by server while mounting storage-plzen3-kky.metacentrum.cz:/

this is very likely the case. Simply delete the line from /etc/fstab if you can't mount it from your location.
7. Start nfs client and remount all volumes

You don't need to mount a volume in OpenSuse 11.1, because running nfs service connect it automatically according records in /etc/fstab, in other OS, explicit mounting (mount -a) is needed.

    OpenSuse

/etc/init.d/nfs start 
insserv /etc/init.d/nfs

    Debian 9

systemctl restart nfs-client.target
mount -a

    Ubuntu

In file /etc/default/nfs-common should be set the option NEED_GSSD=yes.

service rpcbind start
service nfs-common start
service rpc-gssd start
mount -a

Now the Metacentrum NFSv4 volumes should be mounted to mount points specified in /etc/fstab file.
Concluding notes
Simple settings of idmapd.conf

File /etc/idmapd.conf sets mapping of NFSv4 identities to local users (NFSv4 works with text principals of kerberos, POSIX interface of file system works with numeral representation of users and groups).

Simple settings /etc/idmapd.conf consist on setting of configuration line: Domain = META. The users from domain @META will be map throught files /etc/passwd and /etc/group. So it means that for identity xhejtman@META must exist record in /etc/passwd with name xhejtman. Ordinary tools (ls -l) will show the names properly if the name in given files will be exist for their principal. For nonexisting name will be user mapping choosen as nobody and nogroup.

Example:

grep xhejtman /etc/passwd
xhejtman:x:1000:1000:Lukas Hejtmanek,,,:/home/xhejtman:/bin/bash
ls -l /mnt/nfs/software
total 0
drwxr-xr-x 4 nobody   nogroup   51 2008-06-12 12:49 etics
-rw-r--r-- 1 nobody   nogroup    0 2008-06-06 14:26 hu
drwxr-xr-x 6 xhejtman soft-nfs4 54 2008-06-12 14:45 libnfsidmap
drwxr-xr-x 5 xhejtman soft-nfs4 40 2008-06-11 13:12 nsswitch

Particular record for user xhejtman@META exists in /etc/passwd and record for group soft-nfs4@META also exists in /etc/group, so mapping runs properly and it is also properly shown. There is no record for users who own directory etics that is why it's shown as nobody:nogroup.


Accessing user data on NFS4 storage

If you use the tutorial you should have the volume mounted now. To be able to access your user data you must have valid kerberos ticket. You can obtain one by command kinit:

$ kinit
login@META's Password:
$ cd /storage/brno2/home/login

Please keep in mind that such kerberos ticket has limited validity (usually 12h). If you need to access storage without entering password and/or for longer periods (i.e. running some service), you can create ticket from one-purpose nfs/login@META keytab (see above how to obtain it):

kinit -t /etc/krb5.keytab nfs/login@META

With such a ticket you should be able to access login's data, however, it has limited (12h) validity too. You can prolong the ticket as follows:

echo "* */6 * * * /usr/bin/kinit -t /etc/krb5.keytab  nfs/login@META" | crontab

Kerberos identity

Users using one identity should be satisfied with standart NFS tools in their Linux distribution. If you want to use more identities at one time like xhejtman@META, xhejtman@ADMIN.META and xhejtman@ICS.MUNI.CZ it's necessary to use patched rpc.gssd program. Patched program is in NFS utils version 1.1.3. Patching older version is not easy, best way is to contact us and we make patched package for you.
Kerberos tickets

Ticket in /etc/krb5.keytab is implicitly used just to mount the volume. But we can make a deal that the ticket can be also used to access the storage – but explicit arrangement is necessary. This ticket is valid until kerberos server administrator deletes it. So the access via ticket can be used almost forever.

User ticket (ussually in /tmp/krb5cc_number) can be used for mounting (if we run rpc.gssd with choice -n) and also for access. This ticket often has limited validity.
Proper displaying of users and groups names

Above-mentioned settings of idmapd.conf will display properly only users and groups stored in /etc/passwd and /etc/group. Moreover the user or group must be from META domain. Cross realm user mapping is possible through advanced settings. It is necessary to set mapping of NFSv4 identities to numeral representation and it is necessary to set mapping of numerical representation to the individual names.
Cross realm mapping NFSv4 identities to numerical representation

It is necessary to reach mapping files of users and groups for mapping support.

    http://meta.cesnet.cz/nfs4/passwd-nfs4
    http://meta.cesnet.cz/nfs4/group-nfs4

You have to save this files to /etc/passwd-nfs4 and /etc/group-nfs4.

Then you have to download and install new version of library libnfsidmap from NFS. It is placed in /storage/software/libnfsidmap, where are both libraries for IA32 and X86_64 (lib32 and lib64), and Debian packages (for i386 a ndAMD64).

For this way of mapping it is necessary to set simply way, desribed above, get a packages and then you can try this advanced way. We should change settings of idmapd.conf after installing new version and reaching mapping files. :

[Translation]
Method = mnsswitch

Similar settings could have been in configuration file. New settings have text: mnsswitch instead nsswitch. We keep settings Domain = META the same.

Restart service idmapd.

Debian: /etc/init.d/nfs-common restart, 
opensuse /etc/init.d/idmapd restart or /etc/init.d/nfs restart

So now we have cross realm mapping of identities NFSv4 to numeral representation for POSIX interface.
Cross realm mapping of numeral representation to the names

It is settings of nsswitch mechanism of name translation.

You should download library libnss-nfs4.so.2 from NFS /storage/software/nsswitch and place it into directory /lib. There are versions for debian i386 a X86_64 at NFS. There is no packages because it is only single file.

Change configuration of /etc/nsswitch.conf in following way:

passwd:         compat nfs4
group:          compat nfs4

Add word nfs4 to the end of the lines passwd and group (it is the same name as have library libnss-jméno.so.2).

You don't have to restart service, new mapping should work immediatelly.

Names with domains are written implicitly. If we don't want to write some domain again and again, it is possible to export environment variable NFS4DOMAIN=META.

Example: export NFS4DOMAIN=META, 

then names from domain META will be shown without this domain in the list.
Installation way for a Gentoo

You need to install packages net-nds/portmap and net-fs/nfs-utils. Check whether nfs-utils are compilled with kerberos.

Scripts for a start nfs in Gentoo are little bit odd because they have common settings of server and client. Settings of nfs-utils is in the file /etc/conf.d/nfs where you need to change just choice "OPTS_RPC_GSSD" to the value " -- -n " in case you use your own key and not machine keytab.

Then assure you have downloaded modules nfs a rpcsec_gss_krb5 and set them to load aftear booting the system. The scripts can't load them itself.

Configure /etc/idmapd.conf, as is described upper, simply just rewrite Domain to META in pattern file and return to this place in the tutorial.

You need run services rpc.gssd and rpc.idmapd, for example /etc/init.d/rpc.gssd start, and manage to be run after start (rc-add default rpc.gssd and similary for rpc.idmapd).

Add into /etc/fstab line

smaug1.ics.muni.cz:/ /storage nfs4 sec=krb5

and run service /etc/init.d/nfsmount. Volume should mount now.
MacOS users

As was mentioned, users must be able to obtain the Kerberos ticket on their local machine. Follow this tutorial how to get a krb5 ticket.

Once kinit command successfully generates valid krb5 tickets, add line nfs.client.default_nfs4domain = META to the end of the file /etc/nfs.conf as superuser.

You have to create an empty directory where the Metacentrum storage NFS volume will be mounted. For example:

mkdir /path/on/my/local/computer/storage-praha5-elixir

Finally, you can mount the selected NFS volume (as superuser).

sudo mount_nfs -o vers=4,sec=krb5 storage-praha5-elixir.metacentrum.cz:home/your_username /path/on/my/local/computer/storage-praha5-elixir

The example above will mount your home directory on the storage praha5-elixir. On your local machine, data will be accessible through folder storage-praha5-elixir. 


-->
