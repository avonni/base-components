import { LightningElement, api } from 'lwc';

export default class PrimitiveCellProgressBar extends LightningElement {
    @api label;
    @api referenceLines;
    @api showValue;
    @api textured;
    @api theme;
    @api thickness;
    @api valueLabel;
    @api valuePrefix;
    @api valueSuffix;
    @api valuePosition;
    @api variant;

    _value;

    @api
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value * 100;
    }
}
