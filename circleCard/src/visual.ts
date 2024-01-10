"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import DataView = powerbi.DataView;
import DataViewTable = powerbi.DataViewTable;
import DataViewTableRow = powerbi.DataViewTableRow;
import { VisualFormattingSettingsModel } from "./settings";

export class Visual implements IVisual {
  private target: HTMLElement;
  private formattingSettings: VisualFormattingSettingsModel;
  private formattingSettingsService: FormattingSettingsService;

  constructor(options: VisualConstructorOptions) {
    console.log("Visual constructor", options);
    this.formattingSettingsService = new FormattingSettingsService();
    this.target = options.element;
  }

  public update(options: VisualUpdateOptions) {
    this.formattingSettings =
      this.formattingSettingsService.populateFormattingSettingsModel(
        VisualFormattingSettingsModel,
        options.dataViews[0]
      );

    this.target.innerHTML = "";

    // Get the DataView table and columns
    const dataView: DataView = options.dataViews[0];
    const tableData: DataViewTable = dataView.table;
    const columns = tableData.columns.map((column) => column.displayName);
    const rows: DataViewTableRow[] = tableData.rows;

    //  table element
    const table = document.createElement("table");
    table.setAttribute("class", "table");

    const headerRow = document.createElement("tr");
    headerRow.setAttribute("class", "table-row");

    const th = document.createElement("th");
    th.setAttribute("class", "table-head");
    th.innerText = "Index";
    headerRow.appendChild(th);

    columns.forEach((column) => {
      const th = document.createElement("th");
      th.setAttribute("class", "table-head");
      th.innerText = column;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    let tBody = document.createElement("tbody");
    tBody.setAttribute("class", "table-body");

    // data rows
    rows.forEach((row, index) => {
      const tr = document.createElement("tr");
      let className = "first-class";
      if (index % 2 == 0) {
        className = "second-class";
      }
      tr.setAttribute("class", className);

      // Set index in the first cell of each row
      const tdone = document.createElement("td");
      tdone.setAttribute("class", "table-data");
      tdone.innerText = (index + 1).toString();
      tr.appendChild(tdone);

      row.forEach((cellValue) => {
        const td = document.createElement("td");
        td.setAttribute("class", "table-data");
        td.innerText = cellValue.toString();
        tr.appendChild(td);
      });

      tBody.appendChild(tr);
    });
    table.appendChild(tBody);

    this.target.appendChild(table);
  }

  public getFormattingModel(): powerbi.visuals.FormattingModel {
    return this.formattingSettingsService.buildFormattingModel(
      this.formattingSettings
    );
  }
}
