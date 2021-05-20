import { LightningElement, api } from 'lwc';

export default class PrimitiveCellInputDateRange extends LightningElement {
    @api colKeyValue;
    @api rowKeyValue;
    @api dateStyle;
    @api timeStyle;
    @api timezone;
    @api disabled;
    @api label;
    @api labelStartDate;
    @api labelEndDate;
    @api type;
    _value;
    readOnly;

    @api
    get value() {
        return this._value;
    }
    set value(value) {
        // When data is first set, the value is an object containing the editable state
        // When the cell is edited, only the value is sent back
        if (typeof value === 'object' && value.editable !== undefined) {
            this.readOnly = !value.editable;
            this._value = value.value;
        } else {
            this._value = value;
        }
    }

    get startDate() {
        return typeof this.value === 'object'
            ? this.value.startDate
            : undefined;
    }

    get endDate() {
        return typeof this.value === 'object' ? this.value.endDate : undefined;
    }

    handleChange(event) {
        const detail = {
            value: {
                startDate: event.detail.startDate,
                endDate: event.detail.endDate
            },
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
