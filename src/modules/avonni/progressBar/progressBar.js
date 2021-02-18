import { LightningElement, api } from 'lwc';

export default class ProgressBar extends LightningElement {
    @api label;

    _size = 'medium';
    _value = 0;
    _showValue = false;
    _valuePosition = 'top-right';
    _valueLabel = ''; // à vérifier
    _badges = {}; // à vérifier
    _variant = 'base';
    _theme = 'base';
    _textured = false;
    _thickness = 'medium';
    _orientation = 'horizontal';

    @api get value() {
        return this._value;
    }
    get styleValue() {
        return `width: ${this.value}%`;
    }

    set value(value) {
        if (value < 0) {
            this._value = 0;
        } else if (value > 100) {
            this._value = 100;
        } else {
            this._value = value;
        }
    }
}
