/*
 *  Power BI Visual CLI
 *
 *  Copyright (c) Microsoft Corporation
 *  All rights reserved.
 *  MIT License
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the ""Software""), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED *AS IS*, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

"use strict";
import * as React from "react";
import * as ReactDOM from "react-dom";
import ReactCircleCard from "../Components/ReactCircleCard";
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
import IDownloadService = powerbi.extensibility.IDownloadService;

import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { VisualFormattingSettingsModel } from "./settings";
import ILocalVisualStorageService = powerbi.extensibility.ILocalVisualStorageService;

import "../style/visual.less";

export class Visual implements IVisual {
  private host: IVisualHost;
  private updateCountName: string = 'updateCount';
  private storage: ILocalVisualStorageService;
  private downloadService: IDownloadService;

  private target: HTMLElement;
  private updateCount: number;
  private textNode: Text;
  private formattingSettings: VisualFormattingSettingsModel;
  private formattingSettingsService: FormattingSettingsService;

  private reactRoot: React.ComponentElement<any, any>;
  private dataTable: DataTables.DataTables; // Use DataTable type from datatables.net namespace

  constructor(options: VisualConstructorOptions) {
    console.log("Visual constructor", options);

    this.host = options.host;
    this.storage = options.host.storageService;

    this.storage.get(this.updateCountName).then(count =>
      {
          this.updateCount = +count;
      })
      .catch(() =>
      {
          this.updateCount = 0;
          this.storage.set(this.updateCountName, this.updateCount.toString());
      });

    this.formattingSettingsService = new FormattingSettingsService();
    this.target = options.element;
    this.updateCount = 0;
    this.reactRoot = React.createElement(ReactCircleCard, {});
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
    // @ts-ignore: Ignore TypeScript error for unknown property 'defaultValue'
    const fontColor = this.formattingSettings.demoSec.colorPicker.defaultValue.solid.color || "#000000";
    const colors = fontColor.toString();

    title.style.color = colors;
    container.appendChild(title);

    const para = document.createElement("p");
    para.innerText = this.formattingSettings.demoSec.subTitle.value || "";
    container.appendChild(para);

    const table = document.createElement("table");
    table.classList.add("simple-table");
    container.appendChild(table);

    this.target.appendChild(container);

    // Create DataTable
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
}