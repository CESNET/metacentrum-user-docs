# Filesender

FileSender is a web based application that allows authenticated users to send large files to other users. 

- FileSender functions as a file storage: you upload the file and specify who should receive a link for its download. The other party will receive an **e-mail with the link**.
- File is stored in the repository for **up to 30 days**.
- The files can be large with **size up to 500 GB**.
- See [Cesnet Filesender instance](https://www.cesnet.cz/services/filesender/?lang=en).

On this page we describe the CLI version, which can be used directly from Metacentrum frontends.

### Get config file

If you use Filesender for the first time, you have to get the configuration file first. If you already have a configuration file, skip this step.

**Log on Cesnet Filesender homepage**

Use your Metacentrum username and password to login to [Cesnet Filesender homepage](https://filesender.cesnet.cz/).

**Upload some dummy file to initialize the database**

There is a small bug causing that the GUI does not display entry for users with no upload history. To overcome this, upload and send (to yourself) any dummy file by drag-and-drop first.

**Download configuration file from Cesnet Filesender**

On main page, choose My Profile --> click on the link Download Python CLI client configuration.

![Filesender](filesender_1.png)

Then,

![Filesender](filesender_2.png)

The configuration file is a normal text file. Nothing needs to be modified or added to this file, just save it somewhere on your frontend.

### Upload files

To make filesender run, add it as a module:

    module add filesender/0-cli

and export a path to the configuration file:

    export FILESENDER_CONFIG=/storage/.../path-to-configuration-file # default configuration is in $HOME/.filesender/filesender.py.ini

Then you can upload the file:

    filesender.py -s "Subject" -r recipient_1@example.org    file.tar.gz     # upload file.tar.gz

### Download files

Once you have received an email with a notification that some file has been uploaded to Filesender.Cesnet.cz and you have been granted permission to download its contents, click on the Download link.

![Filesender](filesender_3.png)

A new window in your browser will be open where you have to copy a URL hidden under the Download button.

Go to the terminal and use wget utility to download the file. The syntax looks like:

    wget -O "file_name" "URL"

Replace file\_name with name as you wish and URL by saved URL in your clipboard. Do not forget to use double quotes.

![Filesender](filesender_4.png) 

