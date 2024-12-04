# Mount storages locally

!!! warning "This is for Linux and macOS"
    This page contains tutorial how to mount storages locally on Linux and macOS machines. There is no free client for MS-Windows, just comercial NFS Maestro.

**List of current storage servers**
 
--8<-- "storages-table.md"

## Connection setup

You will need to do several things to make NFSv4 accessible on your Linux desktop:

!!! note "Administrator access is required"
    You must have root privileges on your local PC.

### Create mount points

You need to create an empty directory where the Metacentrum NFS volumes will be mounted. We recommend directory `/storage` because this is what is set on MetaCentrum machines. E.g.:

    mkdir /storage
    mkdir /storage/brno12-cerit
    mkdir /storage/brno2
    mkdir /storage/plzen1
    ...

You can choose an arbitrary name and location for the mounting points - just remember to modify accordingly the steps described below.

### Install Kerberos support

If your PC does not have Kerberos system support enabled, you need to install it first. On Debian-based systems you can do:

    apt install krb5-user

Once Kerberos support is installed, you must provide proper configuration in `/etc/krb5.conf`. The easiest way is to copy it simply from a MetaCentrum machine, e.g skirit.ics.muni.cz, e.g. :

    scp user@skirit.ics.muni.cz:/etc/krb5.conf /etc/

Verify that Kerberos is correctly enabled

    kinit user@META
    klist

### Get Kerberos credentials for your NFS

The following command replaces an existing krb5.keytab! If you already have one, you need to update its content using 'ktutil' command.

    $ ssh user@skirit.metacentrum.cz '/software/remctl-2.12/bin/remctl -d kdccesnet.ics.muni.cz accounts nfskeytab' > /etc/krb5.keytab

Set its ownership to root.root and rights to 600 as follows:

    chown root.root /etc/krb5.keytab
    chmod 600 /etc/krb5.keytab

### Install client NFSv4 tools 

On Debian-base system:

    apt-get install nfs-common

You will also need a running portmap. It should be installed with nfs-utils dependencies. Otherwise install the package portmap separately.

**nfs-utils setting on Debian/Ubuntu**

Setting of nfs-utils is in the file `/etc/default/nfs-common`. Set the values in the following way:

    NEED_STATD=yes
    STATDOPTS=
    NEED_IDMAPD=yes
    NEED_GSSD=yes

**nfs-utils setting on Opensuse**

Setting of nfs-utils in the file `/etc/sysconfig/nfs`. Set at least the following values:

    NFS_SECURITY_GSS="yes"
    NFS4_SUPPORT="yes"

### Enable automatic mount on boot

For storages you wish to mount locally, add the following lines to the `/etc/fstab` file:

    storage-brno12-cerit.metacentrum.cz:/ /storage/brno12-cerit  nfs4       sec=krb5i             0 0
    storage-plzen1.metacentrum.cz:/ /storage/plzen1           nfs4       sec=krb5i             0 0
    ...

!!! note
    Due to hardware replacement the data are moved continuously from one storage to another. For backward compatibility the old names of storages (e.g. brno2) are kept as symbolic links. The target in `/etc/fstab` must be a real directory, not a symlink. By using `ls -l` you can find where the symbolic links lead to. 

Sample of `/etc/fstab`:

    storage-brno12-cerit.metacentrum.cz:/ /storage/brno12-cerit  nfs4 sec=krb5i       0 0
    storage-brno2.metacentrum.cz:/ /storage/brno2  nfs4 sec=krb5i       0 0
    storage-du-cesnet.metacentrum.cz:/ /storage/du-cesnet  nfs4 sec=krb5i       0 0
    ...

**Note:** Due to privacy reasons, some repositories can be accessed only from Metacentrum IP addresses. Storages of the form CITY+NUMBER like brno2 or praha1 should be always mountable. Usually the "private" repositories with limited access are the ones with suffix in their name (-kky, -fzu, etc.). For example, if you get an error like

    mount.nfs4: access denied by server while mounting storage-plzen3-kky.metacentrum.cz:/

this is very likely the case. Simply delete the line from `/etc/fstab` if you can't mount it from your location.

### Start nfs client and remount all volumes

You don't need to mount a volume in OpenSuse 11.1, because running nfs service connect it automatically according records in `/etc/fstab`, in other OS, explicit mounting (`mount -a`) is needed.

Now the Metacentrum NFSv4 volumes should be mounted to mount points specified in `/etc/fstab` file.

### Accessing user data on NFS4 storage

To be able to access your user data you must have valid kerberos ticket. You can obtain one by `kinit` command:

    kinit user@META

Veirfy you can access your home directly:

    ls /storage/brno2/home/user123


## Concluding notes

### Simple settings of idmapd.conf

File `/etc/idmapd.conf` sets mapping of NFSv4 identities to local users (NFSv4 works with text principals of kerberos, POSIX interface of file system works with numeral representation of users and groups).

Simple settings `/etc/idmapd.conf` consist on setting of configuration line: `Domain = META`. The users from domain @META will be map throught files `/etc/passwd` and `/etc/group`. So it means that for identity `user_123@META` must exist record in `/etc/passwd` with name user\_123. Ordinary tools (`ls -l`) will show the names properly if the name in given files will be exist for their principal. For nonexisting name will be user mapping choosen as nobody and nogroup.

Example:

    grep user_123 /etc/passwd
    user_123:x:1000:1000:User 123       ,,,:/home/user_123:/bin/bash
    ls -l /mnt/nfs/software
    total 0
    drwxr-xr-x 4 nobody   nogroup   51 2008-06-12 12:49 etics
    -rw-r--r-- 1 nobody   nogroup    0 2008-06-06 14:26 hu
    drwxr-xr-x 6 user_123 soft-nfs4 54 2008-06-12 14:45 libnfsidmap
    drwxr-xr-x 5 user_123 soft-nfs4 40 2008-06-11 13:12 nsswitch

Particular record for user user\_123@META exists in `/etc/passwd` and record for group soft-nfs4@META also exists in `/etc/group`, so mapping runs properly and it is also properly shown. There is no record for users who own directory etics that is why it's shown as `nobody:nogroup`.

### Proper displaying of users and groups names

Above-mentioned settings of idmapd.conf will display properly only users and groups stored in `/etc/passwd` and `/etc/group`. Moreover, the user or group must be from the META domain. Cross realm user mapping is possible through advanced settings. It is necessary to set mapping of NFSv4 identities to numeral representation and it is necessary to set mapping of numerical representation to the individual names.

### Cross realm mapping NFSv4 identities to numerical representation

It is necessary to reach mapping files of users and groups for mapping support.

- [http://meta.cesnet.cz/nfs4/passwd-nfs4](http://meta.cesnet.cz/nfs4/passwd-nfs4)
- [http://meta.cesnet.cz/nfs4/group-nfs4](http://meta.cesnet.cz/nfs4/group-nfs4)

You have to save this files to `/etc/passwd-nfs4` and `/etc/group-nfs4`.

Then you have to download and install new version of library libnfsidmap from NFS. It is placed in `/storage/software/libnfsidmap`, where are both libraries for IA32 and X86\_64 (lib32 and lib64), and Debian packages (for i386 a ndAMD64).

For this way of mapping it is necessary to set simply way, desribed above, get a packages and then you can try this advanced way. We should change settings of idmapd.conf after installing new version and reaching mapping files:

    [Translation]
    Method = mnsswitch

Similar settings could have been in configuration file. New settings have text: `mnsswitch` instead of `nsswitch`. We keep settings `Domain = META` the same.

Restart service idmapd:

    Debian: /etc/init.d/nfs-common restart, 
    opensuse /etc/init.d/idmapd restart or /etc/init.d/nfs restart

So now we have cross realm mapping of identities NFSv4 to numeral representation for POSIX interface.

### Cross realm mapping of numeral representation to the names

It is settings of nsswitch mechanism of name translation.

You should download library `libnss-nfs4.so.2` from NFS `/storage/software/nsswitch` and place it into directory `/lib`. There are versions for debian i386 a X86\_64 at NFS. There is no packages because it is only single file.

Change configuration of `/etc/nsswitch.conf` in following way:

    passwd:         compat nfs4
    group:          compat nfs4

Add `nfs4` to the end of the lines passwd and group (it is the same name as have library libnss-NAME.so.2).

You don't have to restart service, new mapping should work immediately.

Names with domains are written implicitly. If we don't want to write some domain again and again, it is possible to export environment variable NFS4DOMAIN=META.

    export NFS4DOMAIN=META 

then names from domain META will be shown without this domain in the list.

### Set up/check NFSv4 support in kernel

Ubuntu and OpenSuse kernels support NFSv4 by default and you can skip this step. Otherwise assure the support in the following way:

**Test of support NFS file system**

    grep nfs4 /proc/filesystems

You should get: `nodev nfs4`.

In case of empty answer do as a root

    $ modprobe nfs

and repeat the test. In case of negative answer it is necessary to compile NFS (with NFSv4 support) into kernel.

**Test RPCSECsupport**

    ls -d /proc/net/rpc/auth.rpcsec*

You should get: `proc/net/rpc/auth.rpcsec.context /proc/net/rpc/auth.rpcsec.init`

In case of answer: `ls: cannot access /proc/net/rpc/auth.rpcsec*: No such file or directory`, do as root

    modprobe auth_rpcgss

and repeat the test. In case of negative answer it is necessary to compile `CONFIG_SUNRPC_GSS` to Linux kernel.

**Automatic inserting of modules**

If it is obvious that system supports NFSv4 including RPCSEC it is not necessary to insert modules manually - client tools insert NFS on their own.

### Installation for Gentoo

You need to install packages `net-nds/portmap` and `net-fs/nfs-utils`. Check whether nfs-utils are compilled with kerberos.

Scripts for a start nfs in Gentoo are little bit odd because they have common settings of server and client. Settings of nfs-utils is in the file `/etc/conf.d/nfs` where you need to change just choice "OPTS\_RPC\_GSSD" to the value " -- -n " in case you use your own key and not machine keytab.

Then assure you have downloaded modules `nfs` and `rpcsec_gss_krb5` and set them to load aftear booting the system. The scripts can't load them itself.

Configure `/etc/idmapd.conf`, as is described upper, simply just rewrite Domain to META in pattern file and return to this place in the tutorial.

You need run services rpc.gssd and rpc.idmapd, for example `/etc/init.d/rpc.gssd start`, and manage to be run after start (rc-add default rpc.gssd and similary for rpc.idmapd).

Add into `/etc/fstab` line

    smaug1.ics.muni.cz:/ /storage nfs4 sec=krb5i

and run service `/etc/init.d/nfsmount`. Volume should mount now.

### Installation for macOS

Users must be able to obtain the Kerberos ticket on their local machine. Follow this tutorial how to get a krb5 ticket.

Once `kinit` command successfully generates valid krb5 tickets, add line `nfs.client.default_nfs4domain = META` to the end of the file `/etc/nfs.conf` as superuser.

You have to create an empty directory where the Metacentrum storage NFS volume will be mounted. For example:

    mkdir /path/on/my/local/computer/storage-praha5-elixir

Finally, you can mount the selected NFS volume (as superuser).

    mount_nfs -o vers=4,sec=krb5i storage-praha5-elixir.metacentrum.cz:home/your_username /path/on/my/local/computer/storage-praha5-elixir

The example above will mount your home directory on the storage praha5-elixir to the specified directory on the local computer.
