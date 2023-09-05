# Debian-X

    module avail debianX/ # where X = {7,8,9,10}

## Usage

Modules `debianX/compat` are backwards-compatibility packages which bring some missing libraries across OS Debian versions. If you experience any problem with libraries or applications compatibility in current debian version, try to add an one-version-older module.

An explicit lists of libraries for every respective Debian version can be found in the directory `/software/debian-compat/debian1X/lib/`.

### Example

1. Suppose you run into problem with missing library` typically get the `Missing .so library` error or similar.

2. Find the current OS version using `lsb_release` command:

    ```
    (BULLSEYE)user123@skirit:~$ lsb_release -a
    No LSB modules are available.
    Distributor ID:	Debian
    Description:	Debian GNU/Linux 11 (bullseye)
    Release:	11
    Codename:	bullseye
    ```

3. Add a one-version-lower module to your batch script

    module add debian10/compat

4. Run the job again. 

