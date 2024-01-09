"use strict";

import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import "./../style/visual.less";

import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import DataView = powerbi.DataView;
import DataViewCategorical = powerbi.DataViewCategorical;
import * as React from "react";
import * as ReactDOM from "react-dom";
import BarChart from './Component/component';
import { VisualFormattingSettingsModel } from "./settings";

export class Visual implements IVisual {
    private target: HTMLElement;
    private updateCount: number;
    private textNode: Text;
    private formattingSettings: VisualFormattingSettingsModel;
    private formattingSettingsService: FormattingSettingsService;

    private reactRoot: React.FunctionComponentElement<{}>;
    
    constructor(options: VisualConstructorOptions) {
        console.log('Visual constructor', options);
        this.formattingSettingsService = new FormattingSettingsService();
        this.target = options.element;
        this.updateCount = 0;
       

        ReactDOM.render(this.reactRoot, this.target);
    }

    // ...

public update(options: VisualUpdateOptions) {
    this.formattingSettings = this.formattingSettingsService.populateFormattingSettingsModel(
        VisualFormattingSettingsModel,
        options.dataViews[0]
    );

    console.log('Visual update', options);

    const dataView: DataView = options.dataViews[0];
    if (!dataView) {
        console.warn("No data view available");
        return;
    }

    const categoricalDataView: DataViewCategorical = dataView.categorical;
    if (!categoricalDataView) {
        console.warn("No categorical data view available");
        return;
    }

    const categories = categoricalDataView.categories[0].values.map(String);
    const values1 = categoricalDataView.values[0].values.map(Number);

    const columnName = dataView.metadata.columns[0].displayName;
    console.log(columnName);
    const valueName = dataView.metadata.columns[1].displayName;
    console.log(valueName);
    const data = categories.map((category, index) => ({
        category,
        measure: values1[index],
        columnName: columnName,
        valueName: valueName
    }));

    ReactDOM.unmountComponentAtNode(this.target);

    const reactRoot = React.createElement(BarChart, { data });
    ReactDOM.render(reactRoot, this.target);
}


    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.formattingSettings);
    }
}