import React from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { gridColumnDefs } from '../utils/constants';

const rows = [
  {
    id: '0dEGTxlKxh',
    name: '27-Waam',
    longitude: 66.8381,
    latitude: 24.4681,
    windProbability: 100,
    country: 'India',
    whenToGo: 'APRIL',
    isFavorite: false
  },
  {
    id: 's7uMTLEM6g',
    name: '2nd Bay',
    longitude: -9.78,
    latitude: 31.48,
    windProbability: 88,
    country: 'Morocco',
    whenToGo: 'AUGUST',
    isFavorite: false
  },
  {
    id: '6eADIckIJz',
    name: "Adam's Bridge",
    longitude: 79.5686,
    latitude: 9.0869,
    windProbability: 95,
    country: 'Sri Lanka',
    whenToGo: 'AUGUST',
    isFavorite: false
  },
  {
    id: 's7uMTLEM6g',
    name: '2nd Bay',
    longitude: -9.78,
    latitude: 31.48,
    windProbability: 88,
    country: 'Morocco',
    whenToGo: 'AUGUST',
    isFavorite: false
  },
  {
    id: 's7uMTLEM6g',
    name: '2nd Bay',
    longitude: -9.78,
    latitude: 31.48,
    windProbability: 88,
    country: 'Morocco',
    whenToGo: 'AUGUST',
    isFavorite: false
  },
  {
    id: 's7uMTLEM6g',
    name: '2nd Bay',
    longitude: -9.78,
    latitude: 31.48,
    windProbability: 88,
    country: 'Morocco',
    whenToGo: 'AUGUST',
    isFavorite: false
  },
  {
    id: 's7uMTLEM6g',
    name: '2nd Bay',
    longitude: -9.78,
    latitude: 31.48,
    windProbability: 88,
    country: 'Morocco',
    whenToGo: 'AUGUST',
    isFavorite: false
  },
  {
    id: 's7uMTLEM6g',
    name: '2nd Bay',
    longitude: -9.78,
    latitude: 31.48,
    windProbability: 88,
    country: 'Morocco',
    whenToGo: 'AUGUST',
    isFavorite: false
  },
  {
    id: 's7uMTLEM6g',
    name: '2nd Bay',
    longitude: -9.78,
    latitude: 31.48,
    windProbability: 88,
    country: 'Morocco',
    whenToGo: 'AUGUST',
    isFavorite: false
  },
  {
    id: 's7uMTLEM6g',
    name: '2nd Bay',
    longitude: -9.78,
    latitude: 31.48,
    windProbability: 88,
    country: 'Morocco',
    whenToGo: 'AUGUST',
    isFavorite: false
  },
  {
    id: 's7uMTLEM6g',
    name: '2nd Bay',
    longitude: -9.78,
    latitude: 31.48,
    windProbability: 88,
    country: 'Morocco',
    whenToGo: 'AUGUST',
    isFavorite: false
  },
  {
    id: 's7uMTLEM6g',
    name: '2nd Bay',
    longitude: -9.78,
    latitude: 31.48,
    windProbability: 88,
    country: 'Morocco',
    whenToGo: 'AUGUST',
    isFavorite: false
  },
  {
    id: 's7uMTLEM6g',
    name: '2nd Bay',
    longitude: -9.78,
    latitude: 31.48,
    windProbability: 88,
    country: 'Morocco',
    whenToGo: 'AUGUST',
    isFavorite: false
  }
];

const Grid = () => {
  const onGridReady = ({ api }) => {
    api.sizeColumnsToFit();
  };

  return (
    <div
      className="ag-theme-balham"
      style={{
        width: '100%',
        margin: '3rem auto'
      }}
    >
      <AgGridReact
        defaultColDef={{
          resizable: true,
          sortable: true,
          filter: true
        }}
        onGridReady={onGridReady}
        domLayout={'autoHeight'}
        animateRows={true}
        columnDefs={gridColumnDefs}
        rowData={rows}
        pagination={true}
        paginationPageSize={10}
      />
    </div>
  );
};

export default Grid;
