import React from 'react';

const StorageSSHTable = () => {
  // Table data stored as an array of objects
  const storageData = [
    {
      storage: '/storage/brno2',
      serverName: 'storage-brno2.metacentrum.cz',
      path: '~/../fsbrno2/home/USERNAME',
      example: 'scp -r USERNAME@storage-brno2.metacentrum.cz:~/../fsbrno2/home/USERNAME/foo .',
    },
    {
      storage: '/storage/brno6/',
      serverName: 'storage-brno6.metacentrum.cz',
      path: '~/ or /home/USERNAME',
      example: (
        <>
          <code>scp -r USERNAME@storage-brno6.metacentrum.cz:~/foo .</code>
          <br />
          or
          <br />
          <code>scp -r USERNAME@storage-brno6.metacentrum.cz:/home/USERNAME/foo .</code>
        </>
      ),
    },
    {
      storage: '/storage/budejovice1/',
      serverName: 'storage-budejovice1.metacentrum.cz',
      path: '~/ or /home/USERNAME',
      example: (
        <>
          <code>scp -r USERNAME@storage-budejovice1.metacentrum.cz:~/foo .</code>
          <br />
          or
          <br />
          <code>scp -r USERNAME@storage-budejovice1.metacentrum.cz:/home/USERNAME/foo .</code>
        </>
      ),
    },
    {
      storage: '/storage/du-cesnet/',
      serverName: 'storage-du-cesnet.metacentrum.cz',
      path: '~/VO_metacentrum-tape_tape and ~/VO_metacentrum-tape_tape-archive',
      example: (
        <>
          <code>scp -r USERNAME@storage-du-cesnet.metacentrum.cz:~/VO_metacentrum-tape_tape/foo .</code>
          <br />
          and
          <br />
          <code>scp -r USERNAME@storage-du-cesnet.metacentrum.cz:~/VO_metacentrum-tape_tape-archive/foo .</code>
        </>
      ),
    },
    {
      storage: '/storage/liberec3-tul/',
      serverName: 'storage-liberec3-tul.metacentrum.cz',
      path: '~/ or /home/USERNAME/',
      example: (
        <>
          <code>scp -r USERNAME@storage-liberec3-tul.metacentrum.cz:~/foo .</code>
          <br />
          or
          <br />
          <code>scp -r USERNAME@storage-liberec3-tul.metacentrum.cz:/home/USERNAME/foo .</code>
        </>
      ),
    },
    {
      storage: '/storage/plzen1/',
      serverName: 'storage-plzen1.metacentrum.cz',
      path: '~/ or /home/USERNAME/',
      example: (
        <>
          <code>scp -r USERNAME@storage-plzen1.metacentrum.cz:~/foo .</code>
          <br />
          or
          <br />
          <code>scp -r USERNAME@storage-plzen1.metacentrum.cz:/home/USERNAME/foo .</code>
        </>
      ),
    },
    {
      storage: '/storage/praha1/',
      serverName: 'storage-praha1.metacentrum.cz',
      path: '~/ or /home/USERNAME/',
      example: (
        <>
          <code>scp -r USERNAME@storage-praha1.metacentrum.cz:~/foo .</code>
          <br />
          or
          <br />
          <code>scp -r USERNAME@storage-praha1.metacentrum.cz:/home/USERNAME/foo .</code>
        </>
      ),
    },
  ];

  return (
    <div>
      <h2>Storage Information</h2>
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
          {storageData.map((row, index) => (
            <tr key={index}>
              <td>{row.storage}</td>
              <td>{row.serverName}</td>
              <td>{row.path}</td>
              <td>{row.example}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StorageSSHTable;
