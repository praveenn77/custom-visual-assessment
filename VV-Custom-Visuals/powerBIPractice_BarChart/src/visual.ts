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
import BarChart from "../Compnents/BarChart";
import { VisualFormattingSettingsModel } from "./settings";

export class Visual implements IVisual {
  private target: HTMLElement;
  private updateCount: number;
  private textNode: Text;
  private formattingSettings: VisualFormattingSettingsModel;
  private formattingSettingsService: FormattingSettingsService;
  private reactRoot: React.FunctionComponentElement<{}>;
  constructor(options: VisualConstructorOptions) {
    console.log("Visual constructor", options);
    this.formattingSettingsService = new FormattingSettingsService();
    this.target = options.element;
    this.updateCount = 0;
    ReactDOM.render(this.reactRoot, this.target);
  }
  // Your Visual class
  // ...
  public update(options: VisualUpdateOptions) {
    this.formattingSettings =
      this.formattingSettingsService.populateFormattingSettingsModel(
        VisualFormattingSettingsModel,
        options.dataViews[0]
      );
    console.log("Visual update", options);
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
    const data = categories.map((category, index) => ({
      category,
      measure: values1[index],
      columnName: categoricalDataView.categories[0].source.displayName,
      valueName: categoricalDataView.values[0].source.displayName,
    }));

    ReactDOM.unmountComponentAtNode(this.target);

    // Pass the data to the BarChart component with explicit type
    const reactRoot = React.createElement(BarChart, { data });
    ReactDOM.render(reactRoot, this.target);
  }
  public getFormattingModel(): powerbi.visuals.FormattingModel {
    return this.formattingSettingsService.buildFormattingModel(
      this.formattingSettings
    );
  }
}
