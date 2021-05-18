import { LightningElement, api } from 'lwc';

export default class PrimitiveDatatableAvatarGroup extends LightningElement {
    @api columnType;
    @api rowNumber;
    @api value;

    dispatchAvatarClick(event) {
        const detail = event.detail;
        detail.columnType = this.columnType;
        detail.rowNumber = this.rowNumber;

        this.dispatchEvent(
            new CustomEvent('avatarclick', {
                detail: detail,
                bubbles: true,
                composed: true
            })
        );
    }
}
