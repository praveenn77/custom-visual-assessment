import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { VisualFormattingSettingsModel } from "./settings";
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import FormattingModel = powerbi.visuals.FormattingModel;
import * as ReactDOM from "react-dom";
import * as React from "react";
import TableVisual from "./table";

interface VisualProps {
  element: HTMLElement;
}

export class Visual implements IVisual {
  private target: HTMLElement;
  private formattingSettings: VisualFormattingSettingsModel;
  private formattingSettingsService: FormattingSettingsService;
  private tableVisual: React.FC<{
    row: any[];
    col: any[];
    title: string;
    subtitle: string;
  }>;

  constructor(options: VisualConstructorOptions) {
    console.log("Visual constructor", options);
    this.target = options.element;
    this.formattingSettingsService = new FormattingSettingsService();
    this.tableVisual = TableVisual;
  }

  public update(options: VisualUpdateOptions) {
    const dataViews = options.dataViews;
    console.log(options);

    this.formattingSettings =
      this.formattingSettingsService.populateFormattingSettingsModel(
        VisualFormattingSettingsModel,
        options.dataViews[0]
      );
    const columnData = dataViews[0].table.columns.map((item) => ({
      field: item.displayName,
    }));

    const rowData = dataViews[0].table.rows.map((item) =>
      item.reduce((acc, itemval, index) => {
        acc[columnData[index].field] = itemval;
        return acc;
      }, {})
    );

    let title = "Table";
    let subtitle = "Table Sub Title";

    if (
      dataViews[0].metadata.objects &&
      dataViews[0].metadata.objects.demoSection
    ) {
      if (dataViews[0].metadata.objects.demoSection.title) {
        title = dataViews[0].metadata.objects.demoSection.title.toString();
      }
      if (dataViews[0].metadata.objects.demoSection.subTitle) {
        subtitle =
          dataViews[0].metadata.objects.demoSection.subTitle.toString();
      }
    }
    this.render(rowData, columnData, title, subtitle);
  }

  public getFormattingModel(): FormattingModel {
    return this.formattingSettingsService.buildFormattingModel(
      this.formattingSettings
    );
  }

  private render(
    rowData: any[],
    columnData: any[],
    title: string,
    subtitle: string
  ): void {
    ReactDOM.render(
      <this.tableVisual
        row={rowData}
        col={columnData}
        title={title}
        subtitle={subtitle}
      />,
      this.target
    );
  }
}
