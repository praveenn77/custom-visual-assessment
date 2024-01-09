import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import DialogConstructorOptions = powerbiVisualsApi.extensibility.visual.DialogConstructorOptions;
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];
var powerBIPracticeB883CB75C31B4D1E8EF5723834A80A09_DEBUG: IVisualPlugin = {
    name: 'powerBIPracticeB883CB75C31B4D1E8EF5723834A80A09_DEBUG',
    displayName: 'PowerBI_Practice',
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
    powerbi.visuals.plugins["powerBIPracticeB883CB75C31B4D1E8EF5723834A80A09_DEBUG"] = powerBIPracticeB883CB75C31B4D1E8EF5723834A80A09_DEBUG;
}
export default powerBIPracticeB883CB75C31B4D1E8EF5723834A80A09_DEBUG;