import * as React from "react";
import powerbi from "powerbi-visuals-api";
import "../style/visual.less";
interface Props {
    dataView: powerbi.DataView | null;
}
interface State {
    tableHead: string[];
    tableData: any[][];
    title: String;
    subTitle: String;
}
export declare class TableVisual extends React.Component<Props, State> {
    constructor(props: Props);
    componentDidMount(): void;
    updateTableData(dataView: powerbi.DataView): void;
    renderTable(): React.JSX.Element;
    render(): React.JSX.Element;
}
export {};
