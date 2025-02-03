import React from 'react';

const DecommissionedServersTable = () => {
  // Data for the table
  const serversData = [
    {
      server: 'storage-du-cesnet.metacentrum.cz',
      rootDirectory: '/storage/du-cesnet/',
      dueDate: 'May 2024',
      note: (
        <>
          Decommissioned by{' '}
          <a href="https://du.cesnet.cz/en/novinky/start#termination_of_access_to_the_du4_repository_in_ostrava_-_2352024">
            23rd May 24
          </a>
          ; we recommend to use{' '}
          <a href="https://du.cesnet.cz/en/navody/object_storage/cesnet_s3/start">
            Object storages
          </a>{' '}
          as a backup and archiving site instead.
        </>
      ),
    },
    {
      server: 'storage-brno1-cerit.metacentrum.cz',
      rootDirectory: '/storage/brno1-cerit/',
      dueDate: 'Q2 2024',
      note: 'Data were moved to /storage/brno12-cerit/',
    },
    {
      server: 'storage-brno3-cerit.metacentrum.cz',
      rootDirectory: '/storage/brno3-cerit/',
      dueDate: 'Jan 2024',
      note: (
        <>
          Data moved to /storage/brno12-cerit/home/USERNAME/brno3/;<br /> symlink{' '}
          <code>/storage/brno3-cerit/home/LOGIN/</code> is only temporary!
        </>
      ),
    },
    {
      server: 'storage-jihlava1-cerit.metacentrum.cz',
      rootDirectory: '/storage/jihlava1-cerit/',
      dueDate: '---',
      note: (
        <>
          Data archived to /storage/brno4-cerit-hsm/fineus, <br /> storage-brno4-cerit-hsm.metacentrum.cz,
          <br /> symlink <code>/storage/jihlava1-cerit/</code>
        </>
      ),
    },
    {
      server: 'storage-plzen2-archive.metacentrum.cz',
      rootDirectory: '/storage/plzen2-archive/',
      dueDate: '---',
      note: '',
    },
    {
      server: 'storage-brno4-cerit-hsm.metacentrum.cz',
      rootDirectory: '/storage/brno4-cerit-hsm/',
      dueDate: '---',
      note: 'Data archived to /storage/brno1-cerit/',
    },
    {
      server: 'storage-brno5-archive.metacentrum.cz',
      rootDirectory: '/storage/brno5-archive/',
      dueDate: '---',
      note: '',
    },
    {
      server: 'storage-brno6.metacentrum.cz',
      rootDirectory: '/storage/brno6/',
      dueDate: '---',
      note: '',
    },
    {
      server: 'storage-brno7-cerit.metacentrum.cz',
      rootDirectory: '/storage/brno7-cerit/',
      dueDate: '---',
      note: 'Data archived to /storage/brno1-cerit/',
    },
    {
      server: 'storage-praha4-fzu.metacentrum.cz',
      rootDirectory: '/storage/praha4-fzu/',
      dueDate: '---',
      note: '',
    },
    {
      server: 'storage-plzen3-kky.metacentrum.cz',
      rootDirectory: '/storage/plzen3-kky/',
      dueDate: '---',
      note: '',
    },
    {
      server: 'storage-praha1.metacentrum.cz',
      rootDirectory: '/storage/praha1/',
      dueDate: '---',
      note: '',
    },
    {
      server: 'storage-jihlava2-archive.metacentrum.cz',
      rootDirectory: '/storage/jihlava2-archive/',
      dueDate: '---',
      note: '',
    },
    {
      server: 'storage-brno8.metacentrum.cz',
      rootDirectory: '/storage/brno8/',
      dueDate: '---',
      note: 'Data moved to /storage/brno2/home/USERNAME/brno8',
    },
    {
      server: 'storage-brno9-ceitec.metacentrum.cz',
      rootDirectory: '/storage/brno9-ceitec/',
      dueDate: '---',
      note: '',
    },
    {
      server: 'storage-brno10-ceitec-hsm.metacentrum.cz',
      rootDirectory: '/storage/brno10-ceitec-hsm/',
      dueDate: '---',
      note: '',
    },
  ];

  return (
    <div>
      <h2>Decommissioned Servers</h2>
      <table>
        <thead>
          <tr>
            <th>Decommissioned Servers</th>
            <th>Root Directory</th>
            <th>Due Date</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {serversData.map((server, index) => (
            <tr key={index}>
              <td>{server.server}</td>
              <td>{server.rootDirectory}</td>
              <td>{server.dueDate}</td>
              <td>{server.note}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DecommissionedServersTable;
