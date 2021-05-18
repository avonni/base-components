import { LightningElement, api } from 'lwc';
import { normalizeAriaAttribute } from 'c/utilsPrivate';

export default class PrimitiveDatatableInputCounter extends LightningElement {
    @api columnType;
    @api rowNumber;
    @api value;

    get ariaControls() {
        return normalizeAriaAttribute(this.value.ariaControls);
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
