# My jobs are in the "M" state. What does it mean?

MetaCentrum uses three PBS servers: 

- `elixir-pbs.elixir-czech.cz`
- `meta-pbs.metacentrum.cz` 
- `cerit-pbs.cerit-sc.cz`

If you find some job in the "M" (**m**oved) state, it means your job was shifted from one PBS server to another, where are more free resources. Typically PBS servers meta-pbs.metacentrum.cz and cerit-pbs.cerit-sc.cz move their jobs to server elixir-pbs.elixir-czech.cz.

*Tady by to ještě chtělo instrukci, jak tedy pak identifikovat job - to původní job- ID je potom irelevantni, ci? Nebo je to nejak nalinkovane? To asi ne...*

To get list of all your jobs spanning all PBSs, use

    qstat -u user123 @elixir-pbs.elixir-czech.cz @meta-pbs.metacentrum.cz @cerit-pbs.cerit-sc.cz
