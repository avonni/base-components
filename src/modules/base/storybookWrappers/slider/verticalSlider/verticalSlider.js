import { LightningElement, api } from 'lwc';

export default class VerticalSlider extends LightningElement {
    @api alternativeText;
    @api disabled;
    @api disableSwap;
    @api hideMinMaxValues;
    @api hideTrack;
    @api isRatio;
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

    get secondsSliderValues() {
        return [25, 75];
    }
}
