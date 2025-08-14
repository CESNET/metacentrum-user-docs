import React from 'react';

const GPUClusterTable = () => {
  // Data for the table
  const tableData = [
    {
      cluster: 'adan.grid.cesnet.cz',
      nodes: 'adan[1-61].grid.cesnet.cz',
      gpusPerNode: '2x Tesla T4',
      computeCapability: '7.5',
      memGB: '16',
      cudnn: 'YES',
    },
    {
      cluster: 'alfrid.meta.czu.cz',
      nodes: 'afrid[1-4].meta.czu.cz',
      gpusPerNode: '2x L40',
      computeCapability: '8.9',
      memGB: '46',
      cudnn: 'YES',
    },
    {
      cluster: 'bee.cerit-sc.cz',
      nodes: 'bee[1-10].cerit-sc.cz',
      gpusPerNode: '2x H100 NVL',
      computeCapability: '9.0',
      memGB: '96',
      cudnn: 'YES',
    },
    {
      cluster: 'cha.natur.cuni.cz',
      nodes: 'cha.natur.cuni.cz',
      gpusPerNode: '8x GeForce RTX 2080 Ti',
      computeCapability: '7.5',
      memGB: '12',
      cudnn: 'YES',
    },
     {
      cluster: 'elbi1.hw.elixir-czech.cz ',
      nodes: 'elbi1[1].hw.elixir-czech.cz ',
      gpusPerNode: '2x NVIDIA A100',
      computeCapability: '8.0',
      memGB: '40',
      cudnn: 'YES',
    },
    {
      cluster: 'fau.natur.cuni.cz',
      nodes: 'fau[1-3].natur.cuni.cz',
      gpusPerNode: '8x Quadro RTX 5000',
      computeCapability: '7.5',
      memGB: '16',
      cudnn: 'YES',
    },
    {
      cluster: 'fer.natur.cuni.cz',
      nodes: 'fer[1-3].natur.cuni.cz',
      gpusPerNode: '8x RTX A4000',
      computeCapability: '8.6',
      memGB: '16',
      cudnn: 'YES',
    },
    {
      cluster: 'galdor.metacentrum.cz',
      nodes: 'galdor[1-20].metacentrum.cz',
      gpusPerNode: '4x A40',
      computeCapability: '8.6',
      memGB: '46',
      cudnn: 'YES',
    },
    {
      cluster: 'glados.cerit-sc.cz',
      nodes: 'glados[1-2].cerit-sc.cz',
      gpusPerNode: '2x GeForce RTX 2080',
      computeCapability: '7.5',
      memGB: '8',
      cudnn: 'YES',
    },
    {
      cluster: 'gita.cerit-sc.cz',
      nodes: 'gita[1-7].cerit-sc.cz',
      gpusPerNode: '2x GeForce RTX 2080 Ti',
      computeCapability: '7.5',
      memGB: '12',
      cudnn: 'YES',
    },
    {
      cluster: 'glados.cerit-sc.cz',
      nodes: 'glados1.cerit-sc.cz',
      gpusPerNode: '1x TITAN V GPU',
      computeCapability: '7.0',
      memGB: '12',
      cudnn: 'YES',
    },
    {
      cluster: 'glados.cerit-sc.cz',
      nodes: 'glados[2-7].cerit-sc.cz',
      gpusPerNode: '2x GeForce RTX 2080',
      computeCapability: '7.5',
      memGB: '8',
      cudnn: 'YES',
    },
    {
      cluster: 'glados.cerit-sc.cz',
      nodes: 'glados[10-13].cerit-sc.cz',
      gpusPerNode: '2x 1080Ti GPU',
      computeCapability: '6.1',
      memGB: '12',
      cudnn: 'YES',
    },
    {
      cluster: 'grimbold.metacentrum.cz',
      nodes: 'grimbold.metacentrum.cz',
      gpusPerNode: '2x Tesla P100',
      computeCapability: '6.0',
      memGB: '12',
      cudnn: 'YES',
    },
    {
      cluster: 'konos.fav.zcu.cz',
      nodes: 'konos[1-8].fav.zcu.cz',
      gpusPerNode: '4x GeForce GTX 1080 Ti',
      computeCapability: '6.1',
      memGB: '12',
      cudnn: 'YES',
    },
    {
      cluster: 'luna2022.fzu.cz',
      nodes: 'luna[201-206].fzu.cz',
      gpusPerNode: '1x A40',
      computeCapability: '8.6',
      memGB: '46',
      cudnn: 'YES',
    },
    {
      cluster: 'zia.cerit-sc.cz',
      nodes: 'zia[1-5].cerit-sc.cz',
      gpusPerNode: '4x A100',
      computeCapability: '8.0',
      memGB: '40',
      cudnn: 'YES',
    },
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>Cluster</th>
          <th>Nodes</th>
          <th>GPUs per node</th>
          <th>Compute capability</th>
          <th>Mem [GB]</th>
          <th>CuDNN</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            <td>{row.cluster}</td>
            <td>{row.nodes}</td>
            <td>{row.gpusPerNode}</td>
            <td>{row.computeCapability}</td>
            <td>{row.memGB}</td>
            <td>{row.cudnn}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GPUClusterTable;
