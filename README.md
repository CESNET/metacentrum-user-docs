# MetaCentrum User Documentation

This repository contains documentation for MetaCentrum grid services hosted at [docs.metacentrum.cz](https://docs.metacentrum.cz).

If you found an error or something is missing in this documentation please open an [issue](https://github.com/CESNET/metacentrum-user-docs/issues/new). Pull requests are also welcome.

## How to contribute

The documentation pages are written mostly in [Markdown](https://www.mkdocs.org/user-guide/writing-your-docs/#writing-with-markdown) and use [fumadocs syntax](https://fumadocs.vercel.app/docs/ui/markdown). These files are used to automatically generate a static website which is then deployed on [docs.metacentrum.cz](https://docs.metacentrum.cz).

The easiest way to start contributing is to find the `.mdx` file that is used to generate the page you want to modify in the [/content/docs folder](https://github.com/CESNET/metacentrum-user-docs/tree/main/content/docs) and either edit it directly using GitHub editor or press dot (`.`) to load vscode in your browser. Afterwards create a [pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) with your changes and they will be reviewed.

### How to compile on a local station

In case you want to generate the static pages locally (could be useful for large changes) see below.

1. Clone the CESNET/metacentrum-user-docs repo `git clone https://github.com/CESNET/metacentrum-user-docs`
2. Clone CERIT-SC/fumadocs repo with some objects common to all eInfra docs: `git clone https://github.com/CERIT-SC/fumadocs`
3. Copy the required files `cp -r fumadocs/components/* metacentrum-user-docs/components/`
4. Enter the directory `cd metacentrum-user-docs`
5. Run the build
```bash
docker  run -it --rm -p 3000:3000 -e STARTPAGE=/en/docs -v ./public:/opt/fumadocs/public -v ./components:/opt/fumadocs/components -v ./content/docs:/opt/fumadocs/content/docs cerit.io/docs/fuma:v16.4.6 pnpm dev
```
6. Documentation will be available at `http://localhost:3000/en/docs/welcome` and automatically rebuilt on source change.
