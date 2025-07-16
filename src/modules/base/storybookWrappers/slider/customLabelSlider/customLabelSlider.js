import { LightningElement, api } from 'lwc';

export default class CustomLabelSlider extends LightningElement {
    @api disabled;
    @api disableSwap;
    @api hideMinMaxValues;
    @api hideTrack;
    @api label;
    @api max;
    @api min;
    @api minimumDistance;
    @api showPin;
    @api showTickMarks;
    @api size;
    @api step;
    @api tickMarkStyle;
    @api type;
    @api unit;
    @api unitAttributes;
    @api value;
    @api variant;
}
