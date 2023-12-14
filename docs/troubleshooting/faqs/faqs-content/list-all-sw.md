---
hide:
  - toc
---

# Where can I find list of all installed software?

Currently an explicit list of all software is not included in this documentation.

In MetaCentrum software is organized in so-called *modules*. 

A primary tool to list all software is to [log in to a frontend](/access/log-in) and to type

    module avail

or

    module avail -t

The output of `module avail -t` looks like this:

![pic](list-all-sw-pic-001.png)

!!! tip
    With this type of output, you can go forward a page by pressing Spacebar key.

To list all version of a selected software, use `module avail MODULE_NAME/`, e.g.:

![pic](list-all-sw-pic-002.png)

!!! note
    You **have to** add the `/` at the end to see all versions.

Some selected software is provided via [Ondemand](/software/ondemand), [related managed services](/related/galaxy) and [containers](/software/containers), too.

To read more on this issue read [How to search for software page](/software/search-soft).

