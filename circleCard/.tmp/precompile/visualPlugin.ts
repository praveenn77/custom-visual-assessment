import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import DialogConstructorOptions = powerbiVisualsApi.extensibility.visual.DialogConstructorOptions;
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];
var circleCardBE76A7C7565E4B1AB46EB4A28D3315D0_DEBUG: IVisualPlugin = {
    name: 'circleCardBE76A7C7565E4B1AB46EB4A28D3315D0_DEBUG',
    displayName: 'CircleCard',
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
    powerbi.visuals.plugins["circleCardBE76A7C7565E4B1AB46EB4A28D3315D0_DEBUG"] = circleCardBE76A7C7565E4B1AB46EB4A28D3315D0_DEBUG;
}
export default circleCardBE76A7C7565E4B1AB46EB4A28D3315D0_DEBUG;