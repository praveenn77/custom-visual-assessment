"use strict";
import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactCard from "../Components/ReactCard";
import * as $ from "jquery";
import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import DataView = powerbi.DataView;
import DataViewTable = powerbi.DataViewTable;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import powerbi from "powerbi-visuals-api";
import IVisualHost = powerbi.extensibility.visual.IVisualHost;
import ILocalVisualStorageService = powerbi.extensibility.ILocalVisualStorageService;

import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { VisualFormattingSettingsModel } from "./settings";

import "../style/visual.less";
import DataTables from "datatables.net";

export class Visual implements IVisual {
  private host: IVisualHost;

  private target: HTMLElement;
  private textNode: Text;
  private updateCountName: string = "updateCount";
  private updateCount: number;
  private storage: ILocalVisualStorageService;
  private formattingSettings: VisualFormattingSettingsModel;
  private formattingSettingsService: FormattingSettingsService;

  private reactRoot: React.ComponentElement<any, any>;
  private dataTable: DataTables.DataTables; // Use DataTable type from datatables.net namespace

  constructor(options: VisualConstructorOptions) {
    this.storage = options.host.storageService;

    this.storage
      .get(this.updateCountName)
      .then((count) => {
        this.updateCount = !isNaN(+count) ? +count : 0;
        console.log("Stored updateCount:", count);
      })
      .catch(() => {
        this.updateCount = 0;
        this.storage.set(this.updateCountName, this.updateCount.toString());
        console.log("Setting initial updateCount:", this.updateCount);
      });
    this.host = options.host;
    this.formattingSettingsService = new FormattingSettingsService();
    this.target = options.element;
    this.reactRoot = React.createElement(ReactCard, {});
    ReactDOM.render(this.reactRoot, this.target);
    this.dataTable = null;
  }

  public update(options: VisualUpdateOptions) {
    this.formattingSettings =
      this.formattingSettingsService.populateFormattingSettingsModel(
        VisualFormattingSettingsModel,
        options.dataViews[0]
      );

    console.log("Visual update", options);
    if (!isNaN(this.updateCount)) {
      this.updateCount++;
    } else {
      this.updateCount = 0;
    }

    this.storage.set(this.updateCountName, this.updateCount.toString());
    console.log("Updated updateCount:", this.updateCount);

    const dataView: DataView = options.dataViews[0];
    const tableDataView: DataViewTable = dataView.table;

    console.log(dataView);
    if (!tableDataView) {
      return;
    }

    if (this.dataTable) {
      this.dataTable.destroy();
    }

    this.target.textContent = "";
    const container = document.createElement("div");

    const title = document.createElement("h2");
    title.innerText = this.formattingSettings.demoSec.title.value || "Untitled";
    container.appendChild(title);

    const para = document.createElement("p");
    para.innerText = this.formattingSettings.demoSec.subTitle.value || "";
    container.appendChild(para);

    const table = document.createElement("table");
    table.classList.add("simple-table");
    container.appendChild(table);

    this.target.appendChild(container);

    $(document).ready(() => {
      this.dataTable = $(table).DataTable({
        data: tableDataView.rows.map((row) => {
          return tableDataView.columns.reduce((acc, column, index) => {
            acc[column.displayName] = row[index];
            return acc;
          }, {});
        }),
        columns: tableDataView.columns.map(
          (column: DataViewMetadataColumn) => ({
            title: column.displayName,
            data: column.displayName,
          })
        ),
        initComplete: () => {
          $(table).on("click", "td", (event) => {
            const cellData = event.currentTarget.textContent;
            console.log(cellData);

            this.host.launchUrl(cellData);
          });
        },
      });
    });
  }

  public getFormattingModel(): powerbi.visuals.FormattingModel {
    return this.formattingSettingsService.buildFormattingModel(
      this.formattingSettings
    );
  }
}
