import { Visual } from "../../src/visual";
import powerbiVisualsApi from "powerbi-visuals-api";
import IVisualPlugin = powerbiVisualsApi.visuals.plugins.IVisualPlugin;
import VisualConstructorOptions = powerbiVisualsApi.extensibility.visual.VisualConstructorOptions;
import DialogConstructorOptions = powerbiVisualsApi.extensibility.visual.DialogConstructorOptions;
var powerbiKey: any = "powerbi";
var powerbi: any = window[powerbiKey];
var practiceProject08AEBD6D9ED94A6DB5EA14734B73D369_DEBUG: IVisualPlugin = {
    name: 'practiceProject08AEBD6D9ED94A6DB5EA14734B73D369_DEBUG',
    displayName: 'practiceProject',
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
    powerbi.visuals.plugins["practiceProject08AEBD6D9ED94A6DB5EA14734B73D369_DEBUG"] = practiceProject08AEBD6D9ED94A6DB5EA14734B73D369_DEBUG;
}
export default practiceProject08AEBD6D9ED94A6DB5EA14734B73D369_DEBUG;