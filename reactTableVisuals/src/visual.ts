import powerbi from "powerbi-visuals-api";
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";
import { VisualFormattingSettingsModel } from "./settings";
import { TableVisual } from "./table";
import * as ReactDOM from "react-dom";
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import IVisual = powerbi.extensibility.visual.IVisual;

export class Visual implements IVisual {
  private target: HTMLElement;
  private formattingSettings: VisualFormattingSettingsModel;
  private formattingSettingsService: FormattingSettingsService;
  private tableVisual: TableVisual;
  private helpLinkElement: any;

  constructor(options: VisualConstructorOptions) {
    console.log("Visual constructor", options);
    this.formattingSettingsService = new FormattingSettingsService();
    this.target = options.element;
    this.tableVisual = new TableVisual({ dataView: null });
    options.element.appendChild(this.helpLinkElement);
  }

  public update(options: VisualUpdateOptions) {
    console.log("DataView : ", options.dataViews);
    console.log(options.dataViews[0]);
    this.formattingSettings =
      this.formattingSettingsService.populateFormattingSettingsModel(
        VisualFormattingSettingsModel,
        options.dataViews[0]
      );
    if (options.dataViews && options.dataViews[0]) {
      try {
        this.tableVisual.updateTableData(options.dataViews[0]);
        ReactDOM.render(this.tableVisual.render(), this.target);
      } catch (error) {
        console.error("Error updating or rendering the visual:", error);
      }
    } else {
      console.error("No valid dataView found");
    }
  }

  public getFormattingModel(): powerbi.visuals.FormattingModel {
    return this.formattingSettingsService.buildFormattingModel(
      this.formattingSettings
    );
  }

  
}
