| Server                                     | Directory                  | Backup<br/>class |  Note                |
|--------------------------------------------|----------------------------| -----------------|----------------------|
| storage-brno2.metacentrum.cz               | /storage/brno2/            | 2                |          |
| storage-brno11-elixir.metacentrum.cz       | /storage/brno11-elixir/    | 2                |  dedicated to ELIXIR-CZ    |
| storage-brno12-cerit.metacentrum.cz        | /storage/brno12-cerit/     | 2                |                                      |
| storage-plzen1.metacentrum.cz              | /storage/plzen1/           | 2                |             |
| storage-plzen4-ntis.metacentrum.cz         | /storage/plzen4-ntis/      | 3                |  dedicated to iti/kky groups  |
| storage-praha2-natur.metacentrum.cz        | /storage/praha2-natur/     | 0                |               |
| storage-praha6-fzu.metacentrum.cz          | /storage/praha6-fzu/       | 0                |               |
| storage-praha5-elixir.metacentrum.cz       | /storage/praha5-elixir/    | 3                |               | 
| storage-budejovice1.metacentrum.cz         | /storage/budejovice1/      | 3                |             |
| storage-liberec3-tul.metacentrum.cz        | /storage/liberec3-tul/     | 0                |             |
| storage-pruhonice1-ibot.metacentrum.cz     | /storage/pruhonice1-ibot/  | 3                |               |
| storage-vestec1-elixir.metacentrum.cz      | /storage/vestec1-elixir/   | 2                |  also /storage/praha1/           |

| Backup class | Description |
|--------------|-------------|
| 0            | No backup.  |
| 2            | Snapshot backups once a day. Backups are performed and stored on the same HW as primary data. This class provides protection against unintentional data removal. It does not protect against hardware failure of the storage. |
| 3            | Snapshot backups plus a backup copy. The copy resides on a different hardware. This class provides protection against unintentional data removal as well as hardware failures. |

