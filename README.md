# MetaCentrum User Documentation

This repository contains documentation for MetaCentrum grid services hosted at [docs.metacentrum.cz](https://docs.metacentrum.cz).

If you found an error or something is missing in this documentation please open an [issue](https://github.com/CESNET/metacentrum-user-docs/issues/new). Pull requests are also welcome.

## How to contribute

The documentation pages are written mostly in [Markdown](https://www.mkdocs.org/user-guide/writing-your-docs/#writing-with-markdown) and use [fumadocs syntax](https://fumadocs.vercel.app/docs/ui/markdown). These files are used to automatically generate a static website which is then deployed on [docs.metacentrum.cz](https://docs.metacentrum.cz).

The easiest way to start contributing is to find the `.mdx` file that is used to generate the page you want to modify in the [/content/docs folder](https://github.com/CESNET/metacentrum-user-docs/tree/main/content/docs) and either edit it directly using GitHub editor or press dot (`.`) to load vscode in your browser. Afterwards create a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) with your changes and they will be reviewed.

### How to compile on a local station

In case you want to generate the static pages locally (could be useful for large changes) see below.

1. Clone CERIT repo with some objects common to all eInfra docs: `git clone https://github.com/CERIT-SC/fumadocs` (you can do this only once, you just need to have the repo content somewhere.) There are several files that are needed to compile the docs, however they should not be copied to the repo and should be only used temporarily (ask Lukas Hejtmanek if in doubt).

2. Clone the Metacentrum docs repo, checkout to the main branch:

```
git clone https://github.com/CESNET/metacentrum-user-docs

git checkout remotes/origin/main 

# or you can make the remote branch local as:
git checkout -b main origin/main

```

3. Make a small script similar to the following:

```bash
#!/bin/bash

# path to where the Metacentrum docs repo
repodir="/home/melounova/meta/metacentrum-user-docs"

# path to the CERIT fumadocs repo
fumadir="/home/melounova/meta/fumadocs"

# Copy some stuff from CERIT repo to Metacentrum repo
cd ${repodir}/components
cp -r ${fumadir}/components/* .
cd ${repodir}

# run the build 
docker  run -it --rm -p 3000:3000 -e STARTPAGE=/en/docs -v ${repodir}/public:/opt/fumadocs/public -v ${repodir}/components:/opt/fumadocs/components -v ${repodir}/content/docs:/opt/fumadocs/content/docs cerit.io/docs/fuma:v15.0.12 pnpm dev

# remove again the stuff borrowed from CERIT repo
cd ${repodir}/components ; rm -r ai ; rm  button.tsx card3.tsx sidebar.tsx toc.tsx
```

4. run the script (as sudo if needed); in a browser, see the docs at `http://localhost:3000/en/docs/welcome`  


**Notes**

- 8 GB of mem is just barely enough to run the build on an older ntb













