import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";
import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
/**
* visual settings model class
*
*/
export declare class VisualFormattingSettingsModel extends FormattingSettingsModel {
    demo: Demo;
    cards: Demo[];
}
declare class Demo extends FormattingSettingsCard {
    title: formattingSettings.TextInput;
    subTitle: formattingSettings.TextInput;
    name: string;
    displayName?: string;
    slices: Array<FormattingSettingsSlice>;
}
export {};
