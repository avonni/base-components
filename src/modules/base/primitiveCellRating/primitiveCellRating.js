import { LightningElement, api } from 'lwc';

export default class PrimitiveCellRating extends LightningElement {
    @api colKeyValue;
    @api rowKeyValue;
    @api disabled;
    @api iconName;
    @api iconSize;
    @api label;
    @api max;
    @api min;
    @api selection;
    @api valueHidden;

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
