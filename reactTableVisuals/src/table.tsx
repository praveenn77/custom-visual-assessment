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

export class TableVisual extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tableHead: [],
      tableData: [],
      title: "",
      subTitle: "",
    };
  }

  componentDidMount() {
    const { dataView } = this.props;
    if (dataView) {
      this.updateTableData(dataView);
    }
  }

  updateTableData(dataView: powerbi.DataView) {
    const columns = dataView.table.columns.map((column) => column.displayName);
    const rows = dataView.table.rows;
    const title = dataView.metadata.objects.demoSection.title.toString();
    const subTitle = dataView.metadata.objects.demoSection.subTitle.toString();

    this.state = {
      tableHead: columns,
      tableData: rows,
      title: title,
      subTitle: subTitle,
    };
  }

  renderTable() {
    const { tableHead, tableData, title, subTitle } = this.state;

    return (
      <div className="div-container">
        <h1>{title}</h1>
        <h3>{subTitle}</h3>
        <table>
          <thead>
            <tr>
              <th>IIndex</th>
              {tableHead.map((header, index) => (
                <th key={index}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <td>{rowIndex + 1}</td>
                {row.map((cell: React.ReactNode, cellIndex: React.Key) => (
                  <td key={cellIndex}>
                    {cell !== null && cell !== undefined ? cell : ""}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    return <div>{this.renderTable()}</div>;
  }
}
