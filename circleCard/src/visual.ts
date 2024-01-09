"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { VisualFormattingSettingsModel } from "./settings";


import "./../style/visual.less";
import DataView = powerbi.DataView;
import DataViewMetadataColumn = powerbi.DataViewMetadataColumn;
import DataViewTable = powerbi.DataViewTable;
import DataViewTableRow = powerbi.DataViewTableRow;
import PrimitiveValue = powerbi.PrimitiveValue;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IVisualHost = powerbi.extensibility.visual.IVisualHost;


export class Visual implements IVisual {
    private target: HTMLElement;
    private table: HTMLParagraphElement;
    private host: IVisualHost;
    private div: HTMLDivElement = document.createElement("div");
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;
    private h2: HTMLHeadElement;
    private h4: HTMLHeadElement;

    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);

        this.formattingSettingsService = new FormattingSettingsService();
        this.target = options.element;
        this.table = document.createElement("table");
        this.host = options.host;
        this.h2 = document.createElement("h2");
        this.h4 = document.createElement("h4");
        this.div.appendChild(this.h2);
        this.div.appendChild(this.h4);
        this.div.appendChild(this.table);
        this.target.appendChild(this.div);

    }

    public update(options: VisualUpdateOptions) {        
        this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(VisualFormattingSettingsModel, options.dataViews[0]);

        console.log("update",options);
        const dataView: DataView = options.dataViews[0];
        const tableDataView: DataViewTable = dataView.table;

        if (!tableDataView) {
            return
        }
        while (this.table.firstChild) {
            this.table.removeChild(this.table.firstChild);
        }

        let headingValue: any = this.formattingSettings.heading.heading.value || "";
        this.h2.innerText = headingValue;

        let subHeadingValue: any = this.formattingSettings.heading.subHeading.value;
        this.h4.innerText = subHeadingValue;

        //draw header
        const tableHeader = document.createElement("th");
        tableDataView.columns.forEach((column: DataViewMetadataColumn) => {
            const tableHeaderColumn = document.createElement("td");
            tableHeaderColumn.innerText = column.displayName
            tableHeader.appendChild(tableHeaderColumn);
        });
        this.table.appendChild(tableHeader);


        //draw rows
        tableDataView.rows.forEach((row: DataViewTableRow) => {
            const tableRow = document.createElement("tr");
            row.forEach((columnValue: PrimitiveValue) => {
                const cell = document.createElement("td");
                cell.innerText = columnValue.toString();
                tableRow.appendChild(cell);
            })
            this.table.appendChild(tableRow);
        });


    }
    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }
}