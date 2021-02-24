import { LightningElement, api } from 'lwc';

const i18n = {
    labelSelectedItemString: 'is currently selected'
};

export default class PrimitiveCoordinateItem extends LightningElement {
    @api itemAddress;
    @api itemTitle;
    @api iconName;
    @api guid;
    @api selected = false;

    get i18n() {
        return i18n;
    }

    connectedCallback() {
        this.dispatchEvent(
            new CustomEvent('privatecoordinateregister', {
                bubbles: true,
                cancelable: true,
                composed: true,
                detail: {
                    key: this.guid
                }
            })
        );
    }

    get computedAssistiveText() {
        return true === this.selected
            ? `${this.itemTitle} ${i18n.labelSelectedItemString}`
            : '';
    }

    handleMouseOver() {
        const event = new CustomEvent('coordinatesmouseover', {
            detail: {
                key: this.guid
            }
        });

        this.dispatchEvent(event);
    }

    handleClick() {
        const event = new CustomEvent('coordinateclick', {
            detail: {
                key: this.guid
            }
        });

        this.dispatchEvent(event);
    }
}
