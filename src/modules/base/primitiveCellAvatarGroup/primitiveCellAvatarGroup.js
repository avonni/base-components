

import { LightningElement, api } from 'lwc';

export default class PrimitiveCellAvatarGroup extends LightningElement {
    @api colKeyValue;
    @api rowKeyValue;
    @api items;
    @api layout;
    @api maxCount;
    @api size;
    @api variant;
    @api actionIconName;
    @api name;
    @api value;

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
}
