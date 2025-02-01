
<table>
    <thead>
        <tr>
            <th>Server</th>
            <th>Directory</th>
            <th>Backup Class</th>
            <th>Note</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>storage-brno2.metacentrum.cz</td>
            <td>/storage/brno2/</td>
            <td>2</td>
            <td></td>
        </tr>
        <tr>
            <td>storage-brno11-elixir.metacentrum.cz</td>
            <td>/storage/brno11-elixir/</td>
            <td>2</td>
            <td>dedicated to ELIXIR-CZ</td>
        </tr>
        <tr>
            <td>storage-brno12-cerit.metacentrum.cz</td>
            <td>/storage/brno12-cerit/</td>
            <td>2</td>
            <td></td>
        </tr>
        <tr>
            <td>storage-plzen1.metacentrum.cz</td>
            <td>/storage/plzen1/</td>
            <td>2</td>
            <td></td>
        </tr>
        <tr>
            <td>storage-plzen4-ntis.metacentrum.cz</td>
            <td>/storage/plzen4-ntis/</td>
            <td>3</td>
            <td>dedicated to iti/kky groups</td>
        </tr>
        <tr>
            <td>storage-praha2-natur.metacentrum.cz</td>
            <td>/storage/praha2-natur/</td>
            <td>0</td>
            <td></td>
        </tr>
        <tr>
            <td>storage-praha6-fzu.metacentrum.cz</td>
            <td>/storage/praha6-fzu/</td>
            <td>0</td>
            <td></td>
        </tr>
        <tr>
            <td>storage-praha5-elixir.metacentrum.cz</td>
            <td>/storage/praha5-elixir/</td>
            <td>3</td>
            <td></td>
        </tr>
        <tr>
            <td>storage-budejovice1.metacentrum.cz</td>
            <td>/storage/budejovice1/</td>
            <td>3</td>
            <td></td>
        </tr>
        <tr>
            <td>storage-liberec3-tul.metacentrum.cz</td>
            <td>/storage/liberec3-tul/</td>
            <td>0</td>
            <td></td>
        </tr>
        <tr>
            <td>storage-pruhonice1-ibot.metacentrum.cz</td>
            <td>/storage/pruhonice1-ibot/</td>
            <td>3</td>
            <td></td>
        </tr>
        <tr>
            <td>storage-vestec1-elixir.metacentrum.cz</td>
            <td>/storage/vestec1-elixir/</td>
            <td>2</td>
            <td>also /storage/praha1/</td>
        </tr>
    </tbody>
</table>

<h2>Backup Class Descriptions</h2>
<table>
    <thead>
        <tr>
            <th>Backup Class</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>0</td>
            <td>No backup.</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Snapshot backups once a day. Backups are performed and stored on the same HW as primary data. This class provides protection against unintentional data removal. It does not protect against hardware failure of the storage.</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Snapshot backups plus a backup copy. The copy resides on a different hardware. This class provides protection against unintentional data removal as well as hardware failures.</td>
        </tr>
    </tbody>
</table>

</body>
</html>
