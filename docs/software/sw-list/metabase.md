# Metabase

    module avail metabase/

Metabase module is normally automatically loaded upon login.

	It serves to set up some user environments and also makes accessible utils in `/software/meta-utils/public`, like `qextend` or `clean_scratch`.

## Usage

Since the `module purge` command removes all modules, including `metabase` module, we recommend to add it back manually, i. e. using the `module purge` command in the following way:

    $ module purge && module add metabase/1  

