import React, { useState } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

import { gridColumnDefs } from '../utils/constants';
import { Input, Heading } from '../components/';

const Grid = ({ spots }) => {
  const [gridApi, setGridApi] = useState({});
  const onGridReady = ({ api }) => {
    api.sizeColumnsToFit();
    setGridApi(api);
  };

  const handleOnChange = ({ target: { value } }) => {
    gridApi.setQuickFilter(value);
  };

  return (
    <div
      className="ag-theme-balham"
      style={{
        width: '100%',
        margin: '3rem auto'
      }}
    >
      <Heading forFilter={true}>Filter</Heading>
      <Input
        id="filter"
        name="filter"
        placeholder="Filter..."
        type="text"
        className={'text-input'}
        onChange={handleOnChange}
      />

      <AgGridReact
        defaultColDef={{
          resizable: true,
          sortable: true
        }}
        onGridReady={onGridReady}
        domLayout={'autoHeight'}
        animateRows={true}
        columnDefs={gridColumnDefs}
        rowData={spots}
        pagination={true}
        paginationPageSize={10}
        rowClassRules={{ 'favorite-spot': 'data.isFavorite' }}
      />
    </div>
  );
};

export default Grid;
