import { LightningElement, api } from 'lwc';

export default class PrimitiveDatatableColorPicker extends LightningElement {
    @api columnType;
    @api rowNumber;
    @api value;

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
