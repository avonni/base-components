import { LightningElement, api } from 'lwc';

export default class PrimitiveDatatableAvatarGroup extends LightningElement {
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
