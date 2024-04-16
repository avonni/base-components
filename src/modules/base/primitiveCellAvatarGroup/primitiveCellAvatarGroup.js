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
    @api variant;

    handleAvatarClick(event) {
        const { detail, bubbles, composed, cancelable, type } = event;
        this.dispatchEvent(
            new CustomEvent('privateavatarclick', {
                detail: {
                    detail,
                    bubbles,
                    composed,
                    cancelable,
                    type
                },
                bubbles: true,
                composed: true
            })
        );
    }

    handleActionClick(event) {
        const { detail, bubbles, composed, cancelable, type } = event;
        this.dispatchEvent(
            new CustomEvent('privateactionclick', {
                detail: {
                    detail,
                    bubbles,
                    composed,
                    cancelable,
                    type
                },
                bubbles: true,
                composed: true
            })
        );
    }
}
