# My jobs are in the "M" state. What does it mean?

MetaCentrum uses three PBS servers (elixir-pbs.elixir-czech.cz, meta-pbs.metacentrum.cz and cerit-pbs.cerit-sc.cz) and you can easily check the status of your running and waiting jobs on these servers by the command (on any front-end)

qstat -u YOUR\_USER\_NAME @elixir-pbs.elixir-czech.cz @meta-pbs.metacentrum.cz @cerit-pbs.cerit-sc.cz

If you find some job in the "M" state (Grid\_computing&action=submit#I\_want\_to\_prolong\_my\_jobMoved). This means your job was moved from one PBS server to another, where are more free resources. Typically PBS servers meta-pbs.metacentrum.cz and cerit-pbs.cerit-sc.cz move their jobs to server elixir-pbs.elixir-czech.cz. 
