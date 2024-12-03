# Job-related emails

PBS (Portable Batch System) allows users to set email notifications about the state of their job(s). 

```
PBS
  -m <mail events>
    Specifies the set of conditions under which mail about the job is sent.  Sets job's Mail_Points attribute to mail events.  
    The mail events argument can be one of the following:
    The single character "n"
    Any combination of "a", "b", and "e", with optional "j"
    The following table lists the sub-options to the -m option:
      n    No mail is sent
      a    Mail is sent when the job is aborted by the batch system
      b    Mail is sent when the job begins execution
      e    Mail is sent when the job terminates
      j    Mail is sent for subjobs. Must be combined with one or more of the a , b , or e sub-options
    Default: a
```

The options `a`, `b`, `e` can be combined, e.g.:

    -m abe – sends an email when the job aborts (a), begins (b) and completes/ends (e)

The email can be sent to any email address using the -M option:

    -M user123@pbspro.com

## E-mail aggregation

Careless usage of e-mail notifications can however result in large amount of emails and potentially activation of spam filters.

To avoid this, we aggregate the email notifications in 30 minutes intervals and send them as single email subjected *PBS JOB squashed report*.

- E-mails that notify about termination (`PBS -m e`) or abort (`PBS -m a`) are aggregated in intervals of 30 minutes
- upon notification about the beginning of the job (`PBS -m b`), everything aggregated so far is sent within 60 seconds and new aggregation interval starts
- if no emails were generated within the last 30 minutes, any next email is sent within 60 seconds and then fresh aggregation period starts

The `PBS -m b = 60 seconds` rule responds to the facts that some users rely on email notifications while waiting for their interactive jobs to start.

 Other cases are squashed if possible. 

