"use strict";

import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsSlice = formattingSettings.Slice;
import FormattingSettingsModel = formattingSettings.Model;
// import { format, text } from "d3";


class Heading extends FormattingSettingsCard {

    heading = new formattingSettings.TextInput({
        name: "Heading",
        displayName: "Title",
        value: "",
        placeholder : "Enter Your Title"
    })

    subHeading = new formattingSettings.TextInput({
        name : "subHeading",
        displayName:"Sub Title",
        value : "",
        placeholder : "Enter your SubTitle"
    })

    fontSize = new formattingSettings.NumUpDown({
                name: "fontSize",
                displayName: "Text Size",
                value: 12
            });

    name: string = "dataPoint";
    displayName: string = "Title";
    slices: Array<FormattingSettingsSlice> = [this.heading ,this.subHeading];


}




/**
* visual settings model class
*
*/
export class VisualFormattingSettingsModel extends FormattingSettingsModel {
    // Create formatting settings model formatting cards
    // dataPointCard = new DataPointCardSettings();

    // cards = [this.dataPointCard];

    heading = new Heading();
    cards = [this.heading];
}
