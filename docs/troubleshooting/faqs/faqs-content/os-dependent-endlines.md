# I get an error "^M: command not found" or "$'\r': command not found" after submitting a script

... or even an error of this type:
```
-bash: line 1: /var/spool/pbs/mom_priv/jobs/5534899.pbs-m1.metacentrum.cz.SC: cannot execute: required file not found
```

(The latter happens if wrong terminators are in the first `#!/bin/sh` line of the script.)

Described problem is caused by the fact that your batch script was written in non-Unix operational system (Windows) which uses different characters to mark end of a line.

To get rid of the faulty endlines, use `dos2unix` command:

    (BUSTER)user123@skirit:~$ dos2unix myscriph.sh

To test for the type of endlines, use command `file`:

    (BUSTER)user123@skirit:~$ file myscriph.sh
    myscript.sh: UTF-8 Unicode text, with CRLF line terminators

If the `file` report `CRLF line terminators`, your script needs to be converted to run on Linux. 

