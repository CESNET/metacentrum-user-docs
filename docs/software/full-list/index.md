# Full list

There are thousands of packages installed at MetaCetrum. The list of selected software above is by far not complete.

To search for any package, use command `module avail`.

!!! info "Search is case-insensitive"
    For example, `module avail r/` and `module avail R/` are the same for the purpose of searching. Other commands, however (such as `module add` or `module load`) are case-sensitive.

**Example: search for some Orca installation** 

```
(BULLSEYE)user123@skirit:~$ module avail or
----------- /packages/run/modules-5/debian11avx512 ---------------
orca/  orthofinder/  

Key:
modulepath  directory/ 
```
The above search will return all modules starting with the string "or".

```
(BULLSEYE)user123@skirit:~$ module avail orca
----------- /packages/run/modules-5/debian11avx512 ---------------
orca/  

Key:
modulepath  directory/  
```
The above search is limited only to "orca" package, but does not show versions.

```
(BULLSEYE)user123@skirit:~$ module avail orca/
----------- /packages/run/modules-5/debian11avx512 ---------------
orca/2.6.4  orca/3.0.1  orca/4.0.2  orca/4.1.1  orca/4.1.2  orca/4.2.0  orca/4.2.1  orca/5.0.1-intel-19.0.4-bnofsgq  orca/5.0.3-intel-19.0.4-dyfxe2x  

Key:
modulepath  
```
With "/" at the end, the search will output all versions available for the specified module.


<!--

Do teto sekce by casem mel pribyt kompletni seznam modulu
generovany automaticky.

U modulu kde mame nejakou informaci k jeho spusteni (known issue...)
by mel byt odkaz na modul/sw klikatelny a vest na stranku s prislusnou
specifikaci.

Protoze tohle je ale komplexnejsi programatorsky ukol,
pro ucely releasu teto dokumentace kompletni matrix modulu vynechame.

Bude dodelana pozdeji jako samostatny branch.

Zatim na teto strance jen navod na to jak si kompletni seznam
modulu zobrazit.

-->






