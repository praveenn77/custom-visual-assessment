import { useState, useEffect } from "react";
import * as React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const TableVisual = ({ row, col }) => {
  const [rowData, setRowData] = useState([]);
  const [columnData, setColumnData] = useState([]);

  useEffect(() => {
    if (row !== rowData) {
      setRowData(row);
    }
    if (col !== columnData) {
      setColumnData(col);
    }
  }, [row, col]);

  return (
    <div className="ag-theme-quartz" style={{ height: 500 }}>
      <AgGridReact rowData={rowData} columnDefs={columnData} />
    </div>
  );
};

export default TableVisual;