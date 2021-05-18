import { LightningElement, api } from 'lwc';

export default class PrimitiveDatatableColorPicker extends LightningElement {
    @api columnType;
    @api rowNumber;

    _value;

    @api
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value || {};
    }

    handleEvent(event) {
        const detail = event.detail;
        detail.columnType = this.columnType;
        detail.rowNumber = this.rowNumber;

        this.dispatchEvent(
            new CustomEvent(event.type, {
                detail: detail,
                bubbles: true,
                composed: true
            })
        );
    }
}
