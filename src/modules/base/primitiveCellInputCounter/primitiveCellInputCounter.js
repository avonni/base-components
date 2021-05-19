import { LightningElement, api } from 'lwc';

export default class PrimitiveCellInputCounter extends LightningElement {
    @api columnType;
    @api rowKeyValue;
    @api value;
    @api name;
    @api label;
    @api max;
    @api min;
    @api step;
    @api disabled;

    handleChange(event) {
        const detail = event.detail;
        detail.columnType = this.columnType;
        detail.rowNumber = this.rowNumber;

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: detail,
                bubbles: true,
                composed: true
            })
        );
    }
}
