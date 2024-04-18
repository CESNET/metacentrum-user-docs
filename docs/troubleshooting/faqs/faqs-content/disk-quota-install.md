---
hide:
  - toc
---

# I get "Disk quota exceeded" error during installation, how do I fix this?

Expanded, the error typically looks like this:

    ERROR: Could not install packages due to an OSError: [Errno 122] Disk quota exceeded

Type  `echo $TMPDIR`.

If you get `/tmp` in return, the temporary files of various packages (installed via *pip*, *conda*, *mamba*, etc.) are saved into `/tmp` directory (= outside of user's home).

The quota for writing outside of the scratch directory or user's home is very low (977 MB only) which causes the installation to fail.

**What to do:**

First check whether there are any files remaining in `/tmp`:

    user_123@node:~$ check-local-quota

!!! note 
    Often no files in `/tmp` are found after failed installation. This is because most package managers try to clean up after themselves.

If there are any files found, remove them.

Secondly, redirect the variable `TMPDIR` as

    user_123@node:~$ export TMPDIR=$SCRATCHDIR   

and re-run the installation.
