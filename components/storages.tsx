import React from 'react';

const StorageTable = () => {
  // Data for the storage table
  const storageData = [
    { server: 'storage-brno2.metacentrum.cz', directory: '/storage/brno2/', backupClass: 2, note: '' },
    { server: 'storage-brno11-elixir.metacentrum.cz', directory: '/storage/brno11-elixir/', backupClass: 2, note: 'dedicated to ELIXIR-CZ' },
    { server: 'storage-brno12-cerit.metacentrum.cz', directory: '/storage/brno12-cerit/', backupClass: 2, note: '' },
    { server: 'storage-plzen1.metacentrum.cz', directory: '/storage/plzen1/', backupClass: 2, note: '' },
    { server: 'storage-plzen4-ntis.metacentrum.cz', directory: '/storage/plzen4-ntis/', backupClass: 3, note: 'dedicated to iti/kky groups' },
    { server: 'storage-praha2-natur.metacentrum.cz', directory: '/storage/praha2-natur/', backupClass: 0, note: '' },
    { server: 'storage-praha6-fzu.metacentrum.cz', directory: '/storage/praha6-fzu/', backupClass: 0, note: '' },
    { server: 'storage-praha5-elixir.metacentrum.cz', directory: '/storage/praha5-elixir/', backupClass: 3, note: '' },
    { server: 'storage-budejovice1.metacentrum.cz', directory: '/storage/budejovice1/', backupClass: 3, note: '' },
    { server: 'storage-liberec3-tul.metacentrum.cz', directory: '/storage/liberec3-tul/', backupClass: 0, note: '' },
    { server: 'storage-pruhonice1-ibot.metacentrum.cz', directory: '/storage/pruhonice1-ibot/', backupClass: 3, note: '' },
    { server: 'storage-vestec1-elixir.metacentrum.cz', directory: '/storage/vestec1-elixir/', backupClass: 2, note: 'also /storage/praha1/' },
  ];

  // Data for the backup class descriptions
  const backupClassData = [
    { class: 0, description: 'No backup.' },
    { class: 2, description: 'Snapshot backups once a day. Backups are performed and stored on the same HW as primary data. This class provides protection against unintentional data removal. It does not protect against hardware failure of the storage.' },
    { class: 3, description: 'Snapshot backups plus a backup copy. The copy resides on a different hardware. This class provides protection against unintentional data removal as well as hardware failures.' },
  ];

  return (
    <div>
      <h2>Storage Information</h2>
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
          {storageData.map((row, index) => (
            <tr key={index}>
              <td>{row.server}</td>
              <td>{row.directory}</td>
              <td>{row.backupClass}</td>
              <td>{row.note}</td>
            </tr>
          ))}
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
          {backupClassData.map((row, index) => (
            <tr key={index}>
              <td>{row.class}</td>
              <td>{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StorageTable;