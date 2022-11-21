# Log in

Users access the grid through so-called **frontends** - Linux machines designed as exclusive entry points for users. No calculations run on frontends.

Frontends run (as all the grid machines) on Linux, so the tools to log in is **ssh protocol** and a **Linux terminal**.

![grid](/assets/templ_004.png)

!!! note
    Windows or Mac users will need some of the Linux CLI emulators, such as PuTTY. 

!!! todo
    Zjistit cim se AKTUALNE realisticky hlasi windowsari a macisti.

=== "Linux"

    This is Linux howto
    ``` example
    ssh centos@IP
    ```

=== "Windows"

    This is Windows howto

If you log in for the first time, you will be probably prompted by a query similar to the following:

    The authenticity of host 'skirit.ics.muni.cz (2001:718:ff01:1:216:3eff:fe20:382)' can't be
    established. ECDSA key fingerprint is SHA256:Splg9bGTNCeVSLE0E4tB30pcLS80sWuv0ezHrH1p0xE.
    Are you sure you want to continue connecting (yes/no)?

Type "yes" and hit Enter. After that you will be prompted for a MetaCentrum password, type it and hit Enter.

- co uvidi
- kde muzou overit klice


Kerberos


List of frontend (table here)

--8<-- "frontend-table-1.md"
