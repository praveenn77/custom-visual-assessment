"use strict";

import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;

/**
 * Data Point Formatting Card
 */
class DataPointCardSettings extends FormattingSettingsCard {
    defaultColor = new formattingSettings.ColorPicker({
        name: "defaultColor",
        displayName: "Default color",
        value: { value: "" }
    });

    showAllDataPoints = new formattingSettings.ToggleSwitch({
        name: "showAllDataPoints",
        displayName: "Show all",
        value: true
    });

    fill = new formattingSettings.ColorPicker({
        name: "fill",
        displayName: "Fill",
        value: { value: "" }
    });

    fillRule = new formattingSettings.ColorPicker({
        name: "fillRule",
        displayName: "Color saturation",
        value: { value: "" }
    });

    fontSize = new formattingSettings.NumUpDown({
        name: "fontSize",
        displayName: "Text Size",
        value: 12
    });

    name: string = "dataPoint";
    displayName: string = "Data colors";
    slices: Array<FormattingSettingsSlice> = [this.defaultColor, this.showAllDataPoints, this.fill, this.fillRule, this.fontSize];
}

/**
* visual settings model class
*
*/
export class VisualFormattingSettingsModel extends FormattingSettingsModel {
    // Create formatting settings model formatting cards
    demo = new Demo();
    cards = [this.demo];
}

//  class Demo extends FormattingSettingsCard{

//     title = new formattingSettings.TextInput({
//         name : "title",
//         displayName : "",
//         placeholder : "Enter the title",
//         value : ""
//     });

//     name: string = "demo";
//     displayName? : string = "";
//     slices : Array<FormattingSettingsSlice> = [this.title] ;
// }

class Demo extends FormattingSettingsCard {
    title = new formattingSettings.TextInput({
        name: "title",
        displayName: "Title Here",
        placeholder: "Enter the title",
        value: ""
    });

    

    subTitle = new formattingSettings.TextInput({
        name: "subTitle",
        displayName: "Sub-Title Here",
        placeholder: "Enter the sub-title",
        value: ""
    });

    name: string = "demo";
    displayName?: string = "demo";
    slices: Array<FormattingSettingsSlice> = [this.title, this.subTitle];
}