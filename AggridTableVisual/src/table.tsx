import { useState, useEffect } from "react";
import * as React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

interface TableVisualProps {
  row: any[];
  col: any[];
  title?: string;
  subtitle?: string;
}

const TableVisual: React.FC<TableVisualProps> = ({
  row,
  col,
  title = "Default Title",
  subtitle = "Default Subtitle",
}) => {
  const [rowData, setRowData] = useState(row);
  const [columnData, setColumnData] = useState(col);
  const [titleName, setTitleName] = useState(title);
  const [subtitleName, setSubtitleName] = useState(subtitle);

  useEffect(() => {
    setRowData(row);
    setColumnData(col);
    setTitleName(title);
    setSubtitleName(subtitle);
  }, [row, col, title, subtitle]);

  return (
    <>
      <h1>{titleName}</h1>
      <h3>{subtitleName}</h3>
      <div className="ag-theme-quartz" style={{ height: 500 }}>
        <AgGridReact rowData={rowData} columnDefs={columnData} />
      </div>
    </>
  );
};

export default TableVisual;
