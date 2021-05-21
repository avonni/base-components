import { LightningElement, api } from 'lwc';

export default class PrimitiveCellCheckboxButton extends LightningElement {
    @api colKeyValue;
    @api rowKeyValue;
    @api disabled;
    @api label;
    @api name;

    _value;
    readOnly;

    @api
    get value() {
        return this._value;
    }
    set value(value) {
        // When data is first set, the value is an object containing the editable state
        // When the cell is edited, only the value is sent back
        if (typeof value === 'object') {
            this.readOnly = !value.editable;
            this._value = value.value;
        } else {
            this._value = value;
        }
    }

    get showInput() {
        return this.value || !this.computedDisabled;
    }

    get computedDisabled() {
        return this.disabled || this.readOnly;
    }

    handleChange(event) {
        const detail = {
            value: event.detail.checked,
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
