import { LightningElement, api } from 'lwc';

export default class PrimitiveCellInputDateRange extends LightningElement {
    @api columnType;
    @api rowKeyValue;
    @api value;
    @api dateStyle;
    @api timeStyle;
    @api timezone;
    @api disabled;
    @api label;
    @api labelStartDate;
    @api labelEndDate;
    @api type;

    get startDate() {
        return typeof this.value === 'object'
            ? this.value.startDate
            : undefined;
    }

    get endDate() {
        return typeof this.value === 'object' ? this.value.endDate : undefined;
    }

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
