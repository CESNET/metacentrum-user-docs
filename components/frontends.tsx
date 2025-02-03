import React from 'react';

const FrontendTable = () => {
  // Data for the table
  const tableData = [
    {
      frontendAddress: 'charon.nti.tul.cz',
      aliasedAs: 'charon.metacentrum.cz',
      nativeHome: '/storage/liberec3-tul',
      os: 'Debian 12',
      location: 'Liberec',
      note: '',
    },
    {
      frontendAddress: 'elmo.elixir-czech.cz',
      aliasedAs: 'elmo.metacentrum.cz',
      nativeHome: '/storage/praha5-elixir',
      os: 'Debian 12',
      location: 'Praha',
      note: 'Dedicated to <a href="/access/elixir">Elixir users</a>',
    },
    {
      frontendAddress: 'luna.fzu.cz',
      aliasedAs: 'luna.metacentrum.cz',
      nativeHome: '/storage/praha1',
      os: 'Debian 12',
      location: 'Praha',
      note: 'Reserved for <a href="https://www.fzu.cz/en">FZU</a> users',
    },
    {
      frontendAddress: 'nympha.meta.zcu.cz',
      aliasedAs: 'nympha.metacentrum.cz, nympha.zcu.cz, minos.zcu.cz, minos.meta.zcu.cz, alfrid.meta.zcu.cz',
      nativeHome: '/storage/plzen1',
      os: 'Debian 12',
      location: 'Plzen',
      note: '',
    },
    {
      frontendAddress: 'oven.metacentrum.cz',
      aliasedAs: '',
      nativeHome: '/storage/brno2',
      os: 'Debian 12',
      location: 'Brno',
      note: 'Reserved to access <a href="../../../computing/infrastructure/specific-nodes/#oven-node">oven node</a> only',
    },
    {
      frontendAddress: 'perian.grid.cesnet.cz',
      aliasedAs: 'perian.metacentrum.cz, onyx.metacentrum.cz',
      nativeHome: '/storage/brno2',
      os: 'Debian 12',
      location: 'Brno',
      note: '',
    },
    {
      frontendAddress: 'skirit.ics.muni.cz',
      aliasedAs: 'skirit.metacentrum.cz',
      nativeHome: '/storage/brno2',
      os: 'Debian 12',
      location: 'Brno',
      note: '',
    },
    {
      frontendAddress: 'tarkil.grid.cesnet.cz',
      aliasedAs: 'tarkil.metacentrum.cz',
      nativeHome: '/storage/praha1',
      os: 'Debian 12',
      location: 'Praha',
      note: '',
    },
    {
      frontendAddress: 'tilia.ibot.cas.cz',
      aliasedAs: 'tilia.metacentrum.cz',
      nativeHome: '/storage/pruhonice1-ibot',
      os: 'Debian 12',
      location: 'Pruhonice',
      note: '',
    },
    {
      frontendAddress: 'zenith.cerit-sc.cz',
      aliasedAs: 'zenith.metacentrum.cz',
      nativeHome: '/storage/brno12-cerit',
      os: 'Debian 12',
      location: 'Brno',
      note: '',
    },
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Frontend address</th>
          <th>Aliased as</th>
          <th>Native home</th>
          <th>OS</th>
          <th>Physically located in</th>
          <th>Note</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td>{row.frontendAddress}</td>
            <td>{row.aliasedAs}</td>
            <td>{row.nativeHome}</td>
            <td>{row.os}</td>
            <td>{row.location}</td>
            <td dangerouslySetInnerHTML={{ __html: row.note }}></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FrontendTable;