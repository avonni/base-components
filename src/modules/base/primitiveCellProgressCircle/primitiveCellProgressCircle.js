

import { LightningElement, api } from 'lwc';

export default class PrimitiveCellProgressCircle extends LightningElement {
    @api color;
    @api direction;
    @api label;
    @api size;
    @api thickness;
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
