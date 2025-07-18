import { LightningElement, api } from 'lwc';

const i18n = {
    labelSelectedItemString: 'is currently selected'
};

export default class PrimitiveCoordinateItem extends LightningElement {
    @api guid;
    @api iconName;
    @api itemAddress;
    @api itemTitle;
    @api selected = false;

    /*
     * -------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

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

    /*
     * -------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Getter for the computed assistive text.
     */
    get computedAssistiveText() {
        return this.selected
            ? `${this.itemTitle} ${i18n.labelSelectedItemString}`
            : '';
    }

    /**
     * Getter for the i18 constant containing the localized strings.
     */
    get i18n() {
        return i18n;
    }

    /*
     * -------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    handleClick() {
        const coordinateclick = new CustomEvent('coordinateclick', {
            detail: {
                key: this.guid
            }
        });
        this.dispatchEvent(coordinateclick);
    }

    handleMouseOver() {
        const coordinatehover = new CustomEvent('coordinatesmouseover', {
            detail: {
                key: this.guid
            }
        });
        this.dispatchEvent(coordinatehover);
    }
}
