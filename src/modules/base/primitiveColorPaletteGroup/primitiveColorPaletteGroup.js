import { LightningElement, api } from 'lwc';
import { generateUUID } from 'c/utils';
import { normalizeArray, normalizeBoolean } from 'c/utilsPrivate';

export default class PrimitiveColorPaletteGroup extends LightningElement {
    @api name;
    @api label;

    _colors = [];
    _disabled = false;
    _readOnly = false;

    /*
     * -------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    @api
    get colors() {
        return this._colors;
    }
    set colors(value) {
        this._colors = normalizeArray(value);
    }

    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    @api
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
    }

    /*
     * -------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Generated unique ID key.
     */
    get generateKey() {
        return generateUUID();
    }

    /*
     * -------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    handleBlur() {
        this.dispatchEvent(
            new CustomEvent('blur', {
                bubbles: true,
                composed: true
            })
        );
    }

    handleClick(event) {
        event.preventDefault();

        const { color, token } = event.currentTarget.dataset;
        this.dispatchEvent(
            new CustomEvent('privatecolorselect', {
                detail: {
                    color,
                    token
                },
                bubbles: true,
                composed: true
            })
        );
    }

    handleDblClick() {
        this.dispatchEvent(
            new CustomEvent('colordblclick', {
                bubbles: true,
                composed: true
            })
        );
    }

    handleFocus() {
        this.dispatchEvent(
            new CustomEvent('focus', { bubbles: true, composed: true })
        );
    }
}
