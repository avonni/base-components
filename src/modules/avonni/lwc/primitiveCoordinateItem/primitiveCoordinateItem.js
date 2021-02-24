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

    /**
     * getter for the i18 constant containing the localized strings
     */
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
        if (this.selected === true) {
            return `${this.itemTitle} ${i18n.labelSelectedItemString}`;
        }
        return '';
    }

    handleMouseOver() {
        const coordinatehover = new CustomEvent('coordinatesmouseover', {
            detail: {
                key: this.guid
            }
        });
        this.dispatchEvent(coordinatehover);
    }

    handleClick() {
        const coordinateclick = new CustomEvent('coordinateclick', {
            detail: {
                key: this.guid
            }
        });
        this.dispatchEvent(coordinateclick);
    }
}
