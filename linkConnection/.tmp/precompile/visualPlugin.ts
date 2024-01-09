import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import DialogConstructorOptions = powerbiVisualsApi.extensibility.visual.DialogConstructorOptions;
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];
var linkConnection454C8FEB74474B629A5A5F4B3DDF3F4D_DEBUG: IVisualPlugin = {
    name: 'linkConnection454C8FEB74474B629A5A5F4B3DDF3F4D_DEBUG',
    displayName: 'LinkConnection',
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
    powerbi.visuals.plugins["linkConnection454C8FEB74474B629A5A5F4B3DDF3F4D_DEBUG"] = linkConnection454C8FEB74474B629A5A5F4B3DDF3F4D_DEBUG;
}
export default linkConnection454C8FEB74474B629A5A5F4B3DDF3F4D_DEBUG;