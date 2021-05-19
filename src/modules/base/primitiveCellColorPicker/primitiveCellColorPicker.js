import { LightningElement, api } from 'lwc';

export default class PrimitiveCellColorPicker extends LightningElement {
    @api columns;
    @api columnType;
    @api rowKeyValue;
    @api value;
    @api colors;
    @api disabled;
    @api hideColorInput;
    @api label;
    @api menuAlignment;
    @api menuIconName;
    @api menuIconSize;
    @api menuVariant;
    @api opacity;
    @api type;

    handleChange(event) {
        const detail = event.detail;
        detail.columnType = this.columnType;
        detail.rowKeyValue = this.rowKeyValue;

        this.dispatchEvent(
            new CustomEvent('change', {
                detail: detail,
                bubbles: true,
                composed: true
            })
        );
    }
}
