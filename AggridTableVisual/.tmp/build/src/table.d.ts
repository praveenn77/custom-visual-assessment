import * as React from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
interface TableVisualProps {
    row: any[];
    col: any[];
    title?: string;
    subtitle?: string;
}
declare const TableVisual: React.FC<TableVisualProps>;
export default TableVisual;
