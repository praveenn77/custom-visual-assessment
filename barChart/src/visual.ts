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
      console.warn("No data ");
      return;
    }
    const categoricalDataView: DataViewCategorical = dataView.categorical;
    if (!categoricalDataView) {
      console.warn("No categorical ");
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
