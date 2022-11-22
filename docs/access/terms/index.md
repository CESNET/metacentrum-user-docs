# Terms and conditions

## Usage rules

Access to MetaCentrum grid computing is granted **free of charge** only to members of **academic/non-commercial institutions** of the Czech republic **with research and/or education objectives**. If you are interested in using our infrastructure for commercial research, please contact us to discuss whether that particular research project can be conducted in MetaCentrum.

MetaCentrum services are available on a "best effort" basis. The operator strives to maintain the availability and security of the service, with essential services run in high-availability mode and automatically monitored. Support is available during normal working hours.

For full description of the service see [Metacentrum NGI pages](https://www.metacentrum.cz/en/about/rules/).

### Account prolongation

The user account **expires annually on the 2nd of February**. By the end of December/beginning of January users are noticed to ask for account prolongation.

!!! question "So if I create an account on 1st of February, do I need to prolong it the next day?"
    Yes.

If the account is not prolonged till 2nd February, it expires. The data, login and username still exist, however, and can be reactivated upon request. After 4 years of grace period the expired account is deleted together with all its data.
 
### Acknowledgements and publications

The user of MetaCentrum is obliged to use the following acknowledgement formula in all your publications created with the support of MetaCentrum, CERIT-SC and/or Elixir CZ. Please fill in citations of your publications in our system, you will get privileged access to all resources of MetaCentrum, CERIT-SC and/or ELIXIR CZ centre as a bonus.

Acknowledgement formula for MetaCentrum service:

    Computational resources were supplied by the project "e-Infrastruktura CZ" (e-INFRA CZ LM2018140 ) supported by the Ministry of Education, Youth and Sports of the Czech Republic.

Acknowledgement formula for ELIXIR CZ resources:

    Computational resources were provided by the ELIXIR-CZ project (LM2018131), part of the international ELIXIR infrastructure.

!!! note
    In addition to the acknowledgement in the publication, do not forget to add the project number (LM2018140 for e-INFRA CZ and/or LM2018131 for ELIXIR-CZ) during the export of publication to the RIV system.
 
### Research groups annual report

We ask research groups to send us by the end of January annual report for the past year. The report should include:

1. Name of the group, contact address
2. List of the group members
3. Summary of the group's research interests
3. Hardware contributed to Metacentrum (if any)
4. Most often used Metacentrum software
5. New software developed (if any)
6. List of research projects that used Metacentrum resources together with short annotation
7. List of publications with acknowledgement to Metacentrum/CERIT-SC

Accepted languages are English and Czech. The report can be in any file format. E-mail address for sending the report is <annual-report@metacentrum.cz>. 

## Security

Secure and effective utilization of MetaCentrum resources is possible only if there will be some operational rules fulfilled. Study therefore really carefully the security rules for work in MetaCentrum and in the network generally.

1. Users has to protect their account by a **non-trivial Kerberos password**. The password must not be shared. The password must not be used in open (non-encrypted) protocols as is e.g. standard unic (non-Kerberized) telnet or ftp.
   
2. Non-trival password is such that can not be deduced (even after simple mutations) from the data known about account owner and that is not a name of a person, animal or object (even after simple mutations). The administrators are authorized to perform tests to look for non-trivial passwords; in the case of positive results will inform the account owner by secure way. Followingly the account owner have to change the password immediately (the original account can be locked until the time of password change).

3. Users are not allowed to share their accounts. If it is necessary to share the account due to some reasons (e.g. software installation), it has to be done using Kerberos (i.e. through ".k5login" file) and it should be also discussed with specific administrators.

4. If the password is compromised, it is necessary to change it as soon as possible - see [How to change your password](/access/account/#password-change)     .

5. Usage of non-secured protocols telnet, ftp etc. at other machines is not recommended as well. If this authentication method is used, one has to take into account lower security level of specific accout (and disclosure of the password in open form transferred by the network). It is forbidden use such account to log in to MetaCentrum through Kerberos or SSH protocol due to danger of security breach using weakly secured account followed by usage of fake ssh or fake Kerberos with a trojan horse and consequently danger of breach of MetaCentrum accounts.

6. Strange behaviour of your account, appearance or disapparance of files, unknown processes running under your identity and so on has to be necessarily reported to the administrators of MetaCentrum.

