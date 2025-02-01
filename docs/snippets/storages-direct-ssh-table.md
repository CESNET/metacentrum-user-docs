
<table>
    <thead>
        <tr>
            <th>Storage</th>
            <th>Server Name</th>
            <th>Path to User Homes</th>
            <th>Example: How to Copy from This Storage to Local PC</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>/storage/brno2</td>
            <td>storage-brno2.metacentrum.cz</td>
            <td>~/../fsbrno2/home/USERNAME</td>
            <td><code>scp -r USERNAME@storage-brno2.metacentrum.cz:~/../fsbrno2/home/USERNAME/foo .</code></td>
        </tr>
        <tr>
            <td>/storage/brno6/</td>
            <td>storage-brno6.metacentrum.cz</td>
            <td>~/ or /home/USERNAME</td>
            <td>
                <code>scp -r USERNAME@storage-brno6.metacentrum.cz:~/foo .</code><br>
                or<br>
                <code>scp -r USERNAME@storage-brno6.metacentrum.cz:/home/USERNAME/foo .</code>
            </td>
        </tr>
        <tr>
            <td>/storage/budejovice1/</td>
            <td>storage-budejovice1.metacentrum.cz</td>
            <td>~/ or /home/USERNAME</td>
            <td>
                <code>scp -r USERNAME@storage-budejovice1.metacentrum.cz:~/foo .</code><br>
                or<br>
                <code>scp -r USERNAME@storage-budejovice1.metacentrum.cz:/home/USERNAME/foo .</code>
            </td>
        </tr>
        <tr>
            <td>/storage/du-cesnet/</td>
            <td>storage-du-cesnet.metacentrum.cz</td>
            <td>~/VO_metacentrum-tape_tape and ~/VO_metacentrum-tape_tape-archive</td>
            <td>
                <code>scp -r USERNAME@storage-du-cesnet.metacentrum.cz:~/VO_metacentrum-tape_tape/foo .</code><br>
                and<br>
                <code>scp -r USERNAME@storage-du-cesnet.metacentrum.cz:~/VO_metacentrum-tape_tape-archive/foo .</code>
            </td>
        </tr>
        <tr>
            <td>/storage/liberec3-tul/</td>
            <td>storage-liberec3-tul.metacentrum.cz</td>
            <td>~/ or /home/USERNAME/</td>
            <td>
                <code>scp -r USERNAME@storage-liberec3-tul.metacentrum.cz:~/foo .</code><br>
                or<br>
                <code>scp -r USERNAME@storage-liberec3-tul.metacentrum.cz:/home/USERNAME/foo .</code>
            </td>
        </tr>
        <tr>
            <td>/storage/plzen1/</td>
            <td>storage-plzen1.metacentrum.cz</td>
            <td>~/ or /home/USERNAME/</td>
            <td>
                <code>scp -r USERNAME@storage-plzen1.metacentrum.cz:~/foo .</code><br>
                or<br>
                <code>scp -r USERNAME@storage-plzen1.metacentrum.cz:/home/USERNAME/foo .</code>
            </td>
        </tr>
        <tr>
            <td>/storage/praha1/</td>
            <td>storage-praha1.metacentrum.cz</td>
            <td>~/ or /home/USERNAME/</td>
            <td>
                <code>scp -r USERNAME@storage-praha1.metacentrum.cz:~/foo .</code><br>
                or<br>
                <code>scp -r USERNAME@storage-praha1.metacentrum.cz:/home/USERNAME/foo .</code>
            </td>
        </tr>
    </tbody>
</table>

</body>
</html>
