"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";
import { VisualFormattingSettingsModel } from "./settings";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import DataView = powerbi.DataView;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import DataViewTable = powerbi.DataViewTable;
import DataViewTableRow = powerbi.DataViewTableRow;
import PrimitiveValue = powerbi.PrimitiveValue;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;

export class Visual implements IVisual {
  private target: HTMLElement;
  private host: any;
  private table: HTMLTableElement;
  private title: string;
  private subTitle : string;
  private textNode: Text;
  private formattingSettings: VisualFormattingSettingsModel;
  private formattingSettingsService: FormattingSettingsService;

  constructor(options: VisualConstructorOptions) {
    // constructor body
    this.target = options.element;
    this.host = options.host;
    this.table = document.createElement("table");
    this.title = "";
    this.subTitle = "";
    this.target.appendChild(this.table);
    this.formattingSettingsService = new FormattingSettingsService();
  }

//   public setTitle(title: string) {
//     this.title = title;
//     this.update;
//   }

//   public setSubTitle(subTitle: string) {
//     this.subTitle = subTitle;
//     this.update;
//   }
  public update(options: VisualUpdateOptions) {
    this.formattingSettings =
      this.formattingSettingsService.populateFormattingSettingsModel(
        VisualFormattingSettingsModel,
        options.dataViews[0]
      );
    const dataView: DataView = options.dataViews[0];
    const tableDataView: DataViewTable = dataView.table;

    if (!tableDataView) {
      return;
    }
    while (this.table.firstChild) {
      this.table.removeChild(this.table.firstChild);
    }

    const tableCaption = document.createElement("h1");
    tableCaption.innerText = this.formattingSettings.demoSec.title.value || "";
    this.table.appendChild(tableCaption);

    const tableSubCaption = document.createElement("p");
    tableSubCaption.innerText = this.formattingSettings.demoSec.subTitle.value;
    this.table.appendChild(tableSubCaption);

    // draw header
    const tableHeader = document.createElement("thead");
    const headerRow = document.createElement("tr");
    tableDataView.columns.forEach((column: DataViewMetadataColumn) => {
      const tableHeaderColumn = document.createElement("th");
      tableHeaderColumn.innerText = column.displayName;
      headerRow.appendChild(tableHeaderColumn);
    });
    tableHeader.appendChild(headerRow);
    this.table.appendChild(tableHeader);

    // draw body
    const tableBody = document.createElement("tbody");
    tableDataView.rows.forEach((row: DataViewTableRow) => {
      const tableRow = document.createElement("tr");
      row.forEach((columnValue: PrimitiveValue) => {
        const cell = document.createElement("td");
        cell.innerText = columnValue.toString();
        tableRow.appendChild(cell);
      });
      tableBody.appendChild(tableRow);
    });
    this.table.appendChild(tableBody);


    // let dataView: DataView = options.dataViews[0];



  }

  public getFormattingModel(): powerbi.visuals.FormattingModel {
    return this.formattingSettingsService.buildFormattingModel(
      this.formattingSettings
    );
  }
}