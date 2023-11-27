# Job-related emails

PBS server sends email notification when the job changes state.

    -m a send mail when job is aborted by batch system
    -m b send mail when job begins execution
    -m e send mail when job ends execution
    -m n do not send mail

The options `a`, `b`, `e` can be combined, e.g.:

    -m abe – sends an email when the job aborts (a), begins (b) and completes/ends (e)

The email can be sent to any email address using the -M option:

    -M user123@pbspro.com

!!! todo
    Add content from [A page about email aggregation](https://wiki.metacentrum.cz/wiki/Email_notifications).


