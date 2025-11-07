import { LightningElement, api } from 'lwc';

export default class Slider extends LightningElement {
    @api disabled;
    @api disableSwap;
    @api isRatio;
    @api label;
    @api max;
    @api messageWhenRangeOverflow;
    @api messageWhenRangeUnderflow;
    @api messageWhenStepMismatch;
    @api messageWhenValueMissing;
    @api min;
    @api minimumDistance;
    @api hideTrack;
    @api hideMinMaxValues;
    @api showPin;
    @api showTickMarks;
    @api size;
    @api step;
    @api tickMarkStyle;
    @api type;
    @api unit;
    @api unitAttributes;
    @api variant;
    @api value;

    @api
    get validity() {
        return true;
    }

    @api
    blur() {
        return undefined;
    }

    @api
    checkValidity() {
        return true;
    }

    @api
    focus() {
        return undefined;
    }

    @api
    reportValidity() {
        return true;
    }

    @api
    showHelpMessageIfInvalid() {
        return undefined;
    }

    @api
    setCustomValidity() {
        return undefined;
    }
}
