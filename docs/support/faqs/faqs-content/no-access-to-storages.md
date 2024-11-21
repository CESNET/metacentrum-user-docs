# I cannot access storage directories despite being logged in on a frontend

If you get the error of the type

    (BUSTER)user123@skirit:~$ pwd
    /storage/brno2/home/user123
    (BUSTER)user123@skirit:~$ cd /storage/brno12-cerit
    -bash: cd: /storage/brno12-cerit: Permission denied

check by `klist` command whether you have a valid **Kerberos ticket (link na sekci s kerberos a pristupem)**

    (BUSTER)user123@skirit:~$ klist
    klist: No ticket file: /tmp/krb5cc_6446_oBfuZ2
    
If no Kerberos ticket is found, generate a new one by `kinit` command

    (BUSTER)user123@skirit:~$ kinit

The validity of Kerberos tickets is limited to 10 hours. If you stay logged in for longer time, the ticket will expire. You can renew the ticket by `kinit` command, however it is a good practice to log out after you finish work for the day.




