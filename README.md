# How to compile on a local station

This is a howto on how to compile the docs on a local station.

1. Clone CERIT repo with some objects common to all eInfra docs: `git clone https://github.com/CERIT-SC/fumadocs` (you can do this only once, you just need to have the repo content somewhere.) There are several files that are needed to compile the docs, however they should not be copied to the repo and should be only used temporarily (ask Lukas Hejtmanek if in doubt).

2. Clone the Metacentrum docs repo, checkout to the fumadocs branch:

```
git clone https://github.com/CESNET/metacentrum-user-docs

git checkout remotes/origin/fumadocs 

# or you can make the remote branch local as:
git checkout -b fumadocs origin/fumadocs

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
- this howto will probably change in the near future as Metacentrum docs will officially transfer from mkdocs to fumadocs













