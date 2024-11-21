---
hide:
  - toc
---

# I accidentally deleted a file in my home, can I retrieve it?

!!! warning "home = `/storage/city_N/home/USERNAME/`"
    The answer is about files stored in users' homes, i.e. on `storage` facilities. It is not valid for files stored in scratch directories and possibly also `/tmp` and `/var` system directories.

Short answer:<br/> **yes if you are lucky**.

Longer answer:<br/> **we can retrieve the version of the file that was written to disc before ca 6 a.m local time. If you ask us. And if the question is not about hardware failure.**

The `storage` discs are backed-up once a day in the morning (around 6-7 a.m. local time). The backups are kept on the same hardware, so this provides some protection against unintentional user-side delete (aka `rm -rf ~/*` instead of `rm -rf ./*`).

!!! tip
    If you work intensively in the course of single day, we strongly advise to backup your data (to your local PC, to another directory... anyhow) at regular intervals, as the storage backup will not be able to retrieve the data created during that particular day.









