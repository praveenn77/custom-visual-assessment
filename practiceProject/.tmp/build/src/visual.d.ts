import "datatables.net";
import "datatables.net-dt/css/jquery.dataTables.css";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import powerbi from "powerbi-visuals-api";
import "../style/visual.less";
export declare class Visual implements IVisual {
    private host;
    private target;
    private textNode;
    private updateCountName;
    private updateCount;
    private storage;
    private formattingSettings;
    private formattingSettingsService;
    private reactRoot;
    private dataTable;
    constructor(options: VisualConstructorOptions);
    update(options: VisualUpdateOptions): void;
    getFormattingModel(): powerbi.visuals.FormattingModel;
}
