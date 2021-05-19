import { LightningElement, api } from 'lwc';

export default class PrimitiveCellInputDateRange extends LightningElement {
    @api columnType;
    @api rowKeyValue;
    @api checked;
    @api disabled;
    @api hideMark;
    @api label;
    @api messageToggleActive;
    @api messageToggleInactive;
    @api name;
    @api size;

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
