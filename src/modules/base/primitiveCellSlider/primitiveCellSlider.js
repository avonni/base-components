import { LightningElement, api } from 'lwc';

export default class PrimitiveCellSlider extends LightningElement {
    @api colKeyValue;
    @api rowKeyValue;
    @api disabled;
    @api label;
    @api max;
    @api min;
    @api size;
    @api step;

    _value;
    _readOnly;

    @api
    get value() {
        return this._value;
    }
    set value(value) {
        // When data is first set, the value is an object containing the editable state
        // When the cell is edited, only the value is sent back
        if (typeof value === 'object') {
            this._readOnly = !value.editable;
            this._value = value.value;
        } else {
            this._value = value;
        }
    }

    get computedDisabled() {
        return this.disabled || this._readOnly;
    }

    handleChange(event) {
        const detail = {
            value: event.detail.value,
            colKeyValue: this.colKeyValue,
            rowKeyValue: this.rowKeyValue
        };

        this.dispatchEvent(
            new CustomEvent('privateeditcustomcell', {
                detail: detail,
                bubbles: true,
                composed: true
            })
        );
    }
}
