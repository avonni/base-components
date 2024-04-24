import { LightningElement, api } from 'lwc';

export default class PrimitiveCellAvatarGroup extends LightningElement {
    @api actionIconName;
    @api colKeyValue;
    @api items;
    @api layout;
    @api maxCount;
    @api name;
    @api rowKeyValue;
    @api size;
    @api value;
    @api variant;

    handleActionClick(event) {
        this.dispatchEvent(
            new CustomEvent('privateactionclick', {
                detail: {
                    detail: event.detail,
                    bubbles: event.bubbles,
                    composed: event.composed,
                    cancelable: event.cancelable,
                    type: event.type
                },
                bubbles: true,
                composed: true
            })
        );
    }

    handleAvatarClick(event) {
        this.dispatchEvent(
            new CustomEvent('privateavatarclick', {
                detail: {
                    detail: event.detail,
                    bubbles: event.bubbles,
                    composed: event.composed,
                    cancelable: event.cancelable,
                    type: event.type
                },
                bubbles: true,
                composed: true
            })
        );
    }
}
