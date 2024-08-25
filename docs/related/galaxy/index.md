# Galaxy

[Galaxy](https://galaxyproject.org/) is an open, web-based platform designed for FAIR data analysis,
in biomedical research originally but spanning numerous scientific domains nowadays. 

There is worldwide network of **Galaxy** servers providing open access to virtually all academic users
consisting of "copies" (instances) of the service in [United States](https://usegalaxy.org), [Europe](https://usegalaxy.eu) and [Australia](https://usegalaxy.org.au).
Besides, [numerous specialized services](https://galaxyproject.org/use/) exist.

Extensive documentation, including quickstart and advanced tutorials, is available on [Galaxy Community Hub](https://galaxyproject.org).


# usegalaxy.cz

[E-infraCZ](https://e-infra.cz) / [Metacentrum](https://metacentrum.cz) together with [Elixir CZ](https://www.elixir-czech.cz)
provides the [usegalaxy.cz](https://usegalaxy.cz) service. 
It aims at replicating the functionality (set of available tools in particular) of the worldwide services ([usegalaxy.org](https://usegalaxy.org), [usegalaxy.eu](https://usegalaxy.eu))
while offering significantly higher user quotas (both computational and storage) to the registered CZ users and their collaborators.


## Federated Login Options

Metacentrum Galaxy provides two convenient options for logging in:

1. **[E-infra AAI](https://aai.cesnet.cz)** 
which is the prefered way for CZ academic users, and it grants higher computing and storage quotas automatically.
2. **[Life Science Login](https://lifescience-ri.eu/ls-login.html)** If you are associated with the LifeScience/Elixir, you can log in using LifeScience AAI.
This is the same method used by [usegalaxy.eu](https://usegalaxy.eu) and it grants access to the same set of users, with restricted quotas, though.

CZ users, who are able to use E-infra AAI, are able to login also with Life Science Login in most cases, and they are advised to link them together 
in Galaxy to avoid future confusion (e.g. not being able to access results stored previously).

The following procedure links the identities:

- Go to your Galaxy user settings by clicking on **Preferences** in the **User** tab.
- Under **Preferences**, select **Manage Third-Party Identities**.
- Select the other identity provider and authenticate yourself.

## FTP Access

Standard file upload to Galaxy via web browser (through the *Upload data* button) can be rather limiting for 
huge files or large number of files.
These cases must be addressed with FTP upload instead.
The process is [documented here](https://galaxyproject.org/ftp-upload/), and unlike [usegalaxy.org](https://usergalaxy.org) it **has not** been decomissioned
at [usegalaxy.cz](https://usegalaxy.cz).

On the other hand, FTP support in Galaxy is rather legacy, and it does not provide smooth integration with the federated login.
Instead, several setup steps are required to use it at the first time:

1. **Initial Setup:**

    - When you first register on Metacentrum Galaxy, you won't have an FTP password by default.

2. **Reset Your Password:**

    - To set up your FTP access, go to the [Galaxy login](https://usegalaxy.cz/login/) panel.
    - Enter your registered email address into the login panel.

3. **Reset Your Password via Email:**
    - Click on the "Click here to reset your password" button.

4. **Check Your Email:**
    - You will receive an email with a reset password link. Please check your email inbox, including your spam folder, if necessary.

5. **Set a New Password:**
    - Open the email and click on the provided link.
    - You will be directed to a page where you can set up a new password for your FTP access.

6. **FTP Access:**
    - Once you have set a new password, you can use your registered email address and the new password to log in via FTP.

Now, you can use your email address and password to upload files to Metacentrum Galaxy using your preferred FTP client.

## Resource availability and user quotas

TODO

## Data storage reliability

In a nutshell, data storage of [usegalaxy.cz](https://usegalaxy.cz) is resilient to "normal" disk failures,
common consistency problems following abrupt power outages etc. 
However, the all the data are still stored in a single server room, and they are neither replicated nor backed up
elsewehere. 
Therefore, abnormal situation (fire in the server room etc.) may lead to data loss.
Hence, users are **not advised** to use this service to store **high-value** data in a single copy,
and to rely on the storage for long term.

In more technical detail, both the user data files and the Galaxy database are stored on [remote block device](https://du.cesnet.cz/en/navody/object_storage/cesnet_rbd/start)
(RBD) provided by [CESNET storage department](https://du.cesnet.cz/en/start).
Specifically, RBD is configured as 12+4 Ceph erasure code, hence it is able to recover from simultaneous failure of four drives.
Further, regular [RBD snapshots](https://du.cesnet.cz/en/navody/object_storage/cesnet_rbd/snapshots/start) are created to mitigate the
risk of ending up with irrecoverable filesystem corruption. 

# RepeatExplorer Galaxy

RepeatExplorer Galaxy environment is available at [https://repeatexplorer-elixir.cerit-sc.cz/](https://repeatexplorer-elixir.cerit-sc.cz/)

# Old documentation

Metacentrum used to operate a legacy Galaxy instance till 2023. 
Its documentation is [preserved here](https://wiki.metacentrum.cz/wiki/Galaxy) for eventual reference.


# Contact


If you need any help or experience tool errors or any unexpected issues contact us at <regalaxy@rt.cesnet.cz>.
