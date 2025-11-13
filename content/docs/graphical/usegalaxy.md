---
title: usegalaxy.cz
---
## Introduction usegalaxy.cz

[Galaxy](https://galaxyproject.org/) is a **web-based** solution to deal with **large scientific datasets**, their computational processing, and tracking through **provenance** of the secondary datasets.

Having originated in the bioinformatics community, Galaxy spans over **numerous scientific disciplines** (ecology, chemistry, NLP, climate science, social sciences, …) nowadays, **thousands of computational tools** are available, and it is supported by dozens of scientific and software development teams.

The user community is world-wide, with main installations in US, EU, and Australia, complemented with a network of national installations (usegalaxy.*).

The Czech national service [usegalaxy.cz](https://usegalaxy.cz) is provided by [e-INFRA CZ](https://e-infra.cz) / [MetaCentrum](https://metacentrum.cz) together with [Elixir CZ](https://www.elixir-czech.cz).

It **mirrors the toolset of the global public instances** [usegalaxy.org](https://usegalaxy.org), [usegalaxy.eu](https://usegalaxy.eu)) with **much larger quotas for Czech researchers** and their collaborators.


## Accessing usegalaxy.cz

Web interface: https://usegalaxy.cz

| Option    | Who can use it     | How to log in         | Typical quota       |
|-----------|--------------------|-----------------------|---------------------|
| **MetaCentrum account**       | Anyone with a valid MetaCentrum account (see below) | Use the MetaCentrum AAI on the Galaxy login page | 200 GB storage, 10 concurrent jobs   |
| **Life‑Science Login (ELIXIR AAI)** | Users registered in the ELIXIR/Life‑Science federated identity system | Click **Life Science Login** on the Galaxy login page | 50 GB storage, 10 concurrent jobs  |

### How to obtain a MetaCentrum account
* Go to the [MetaCentrum application form](https://metavo.metacentrum.cz/en/application/index.html) 
* Sign in via credentials from your institution (Czech academia)
* Follow the instructions

### Linking your identities (recommended)
<Callout type="tip">
Tip: If you have both identities, link them in Galaxy. This prevents “missing data” problems when you switch between log‑ins.
</Callout>

1. Click on *User* in the top menu
2. Select *Preferences*.
3. Select *Manage Third-Party Identities*.
4. Choose the other identity provider and authenticate yourself.

## Using usegalaxy.cz
The user interface shows:
* list of available **tools** (left)
* **submission form** or **results** of computation (center)
* **history**, i.e. set of files with their mutual provenance links (right)


![pic](/img/meta/galaxy/galaxycz.png)


The [Galaxy Training Network GTN](https://training.galaxyproject.org/training-material/topics/introduction/) hosts a large collection of tutorials ranging from basic to advanced topics:  

  * Beginner: Introduction to Galaxy – https://training.galaxyproject.org/training-material/topics/introduction/  
  * Data import & export – FTP, HTTP, S3, etc.  
  * Workflow building – creating, sharing, and publishing pipelines

<Callout type="tip">
Bookmark the GTN site; most of the tasks you’ll need are already documented there.
</Callout>


### User Quotas

+---------------------------+-------------------------------------------+---------------------------------------------------------------+
| Resource                  | Limit (standard)                          | How to request more                                            |
+---------------------------+-------------------------------------------+---------------------------------------------------------------+
| **Storage**               | 200 GB (MetaCentrum / E‑infra AAI)        | Send a request to **regalaxy@rt.cesnet.cz** with a short      |
|                           | 50 GB (Life‑Science Login)                | description of your needs.                                    |
+---------------------------+-------------------------------------------+---------------------------------------------------------------+
| **Concurrent jobs**       | 10 jobs per user (default)                | Same e‑mail address – we can raise the limit for large        |
|                           |                                           | projects.                                                      |
+---------------------------+-------------------------------------------+---------------------------------------------------------------+
| **Maximum single dataset**| 50 GB                                      | Split large files or ask for a temporary increase.            |
+---------------------------+-------------------------------------------+---------------------------------------------------------------+

If your research requires more storage please reach us at regalaxy@rt.cesnet.cz with description of your needs. All quota changes are evaluated case‑by‑case.


### FTP Upload – Step‑by‑Step

Because Galaxy’s federated log‑ins don’t provide an FTP password out‑of‑the‑box, you need to create one first.
Additional steps are required in order to obtain password for your FTP access:

1. Log in to [usegalaxy.cz](https://usegalaxy.cz) using one of the federated login options. At this point you don't have an FTP password yet.
2. Log out of Galaxy and go to the [Galaxy login](https://usegalaxy.cz/login/) panel and enter your registered email address into the username field.
3. Click on the `Click here to reset your password` button.
4. You will receive an email with the reset password link. Check your spam folder if necessary.
5. Click on the provided link and set up a new password for your FTP access.
6. Once you have set a new password, you can use your registered email address and the new password to log in to our ftp server at `usegalaxy.cz` and copy your files there.
7. Follow the data import process described in the [docs](https://galaxyproject.org/ftp-upload/).

<Callout type="info">
Note: The FTP password you set does not affect your Galaxy web login. Keep it safe, but you can reset it anytime via the same password‑reset procedure.
</Callout>

### Common Tasks at a Glance

+--------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| Task                     | Quick command / UI steps                                                                                                                                |
+--------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Run a tool**           | Upload data → Choose a tool from the left panel → Fill parameters → Click “Run”                                                                      |
+--------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Create a workflow**    | History → Click the gear ⚙️ → “Create Workflow” → Add steps → Save                                                                                      |
+--------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Share a dataset**      | Click the dataset’s pencil icon → “Share or Publish” → Add a user’s e‑mail or make the dataset public                                                  |
+--------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Check job status**     | Top‑right History panel shows running/queued/completed jobs; click the i icon for details                                                          |
+--------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Request more resources**| Email regalaxy@rt.cesnet.cz with a short description (quota, compute nodes, etc.)                                                                   |
+--------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+
| **Reset FTP password**   | Follow steps 2‑4 in the FTP Upload table above                                                                                                          |
+--------------------------+----------------------------------------------------------------------------------------------------------------------------------------------------------+

## References and Use Cases

* [Presentation from MetaCenter HPC Seminar 9/2025](https://metavo.metacentrum.cz/export/sites/meta/cs/seminars/Seminar2025/Krenek_Galaxy_metausers_2025.pdf)

Those presentations were given at the EOSC Symposium 2025:
* [4 different Communities (Bio, Astro, Earth, Climate) doing Imaging data analysis in Galaxy](https://gxy.io/eosc25)
* [Earth Science use-case with Volcanoes](https://gxy.io/plume2bloom)
* [Polish EOSC Node with a Baltic Sea use case about Harmful Algae Blooms](https://gxy.io/eosc-node-poland-demo)
* [Social Science and Humanities about land-use plans and OCR](https://gxy.io/berd-eosc25)




