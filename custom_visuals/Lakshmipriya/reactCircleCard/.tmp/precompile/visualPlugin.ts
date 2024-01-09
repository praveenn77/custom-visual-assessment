import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import DialogConstructorOptions = powerbiVisualsApi.extensibility.visual.DialogConstructorOptions;
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];
var reactCircleCardAACA1D3619A1438A9C5519E8A7560AC7_DEBUG: IVisualPlugin = {
    name: 'reactCircleCardAACA1D3619A1438A9C5519E8A7560AC7_DEBUG',
    displayName: 'ReactCircleCard',
    class: 'Visual',
    apiVersion: '5.3.0',
    create: (options?: VisualConstructorOptions) => {
        if (Visual) {
            return new Visual(options);
        }
        throw 'Visual instance not found';
    },
    createModalDialog: (dialogId: string, options: DialogConstructorOptions, initialState: object) => {
        const dialogRegistry = (<any>globalThis).dialogRegistry;
        if (dialogId in dialogRegistry) {
            new dialogRegistry[dialogId](options, initialState);
        }
    },
    custom: true
};
if (typeof powerbi !== "undefined") {
    powerbi.visuals = powerbi.visuals || {};
    powerbi.visuals.plugins = powerbi.visuals.plugins || {};
    powerbi.visuals.plugins["reactCircleCardAACA1D3619A1438A9C5519E8A7560AC7_DEBUG"] = reactCircleCardAACA1D3619A1438A9C5519E8A7560AC7_DEBUG;
}
export default reactCircleCardAACA1D3619A1438A9C5519E8A7560AC7_DEBUG;