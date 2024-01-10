"use strict";
import powerbi from "powerbi-visuals-api";

import DataView = powerbi.DataView;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import IViewport = powerbi.IViewport;
import * as React from "react";
import * as ReactDOM from "react-dom";
import { ReactCircleCard, initialState } from "./components/ReactCircleCard";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { VisualFormattingSettingsModel } from "./settings";

import "./../style/visual.less";

export class Visual implements IVisual {
  private target: HTMLElement;
  private reactRoot: React.ComponentElement<any, any>;
  private viewport: IViewport;
  private formattingSettings: VisualFormattingSettingsModel;
  private formattingSettingsService: FormattingSettingsService;

  constructor(options: VisualConstructorOptions) {
    this.reactRoot = React.createElement(ReactCircleCard, {});
    this.target = options.element;
    this.formattingSettingsService = new FormattingSettingsService();

    ReactDOM.render(this.reactRoot, this.target);
  }

  public getFormattingModel(): powerbi.visuals.FormattingModel {
    return this.formattingSettingsService.buildFormattingModel(
      this.formattingSettings
    );
  }

  public update(options: VisualUpdateOptions) {
    if (options.dataViews && options.dataViews[0]) {
      const dataView: DataView = options.dataViews[0];
      this.viewport = options.viewport;
      const { width, height } = this.viewport;
      const size = Math.min(width, height);
      this.formattingSettings =
        this.formattingSettingsService.populateFormattingSettingsModel(
          VisualFormattingSettingsModel,
          options.dataViews[0]
        );
      const circleSettings = this.formattingSettings.circleCard;

      ReactCircleCard.update({
        textLabel: dataView.metadata.columns[0].displayName,
        textValue: dataView.single.value.toString(),
        size,
        borderWidth: circleSettings.circleThickness.value,
background: circleSettings.circleColor.value.value,

      });
    } else {
      this.clear();
    }
  }

  private clear() {
    ReactCircleCard.update(initialState);
  }
}
