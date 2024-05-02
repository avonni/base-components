import { LightningElement, api } from 'lwc';

const i18n = {
    edit: 'Edit',
    editHasError: 'Error'
};

export default class PrivateCellEditableButton extends LightningElement {
    @api columnLabel;
    @api hasError;

    _htmlButton = null;

    disconnectedCallback() {
        this._htmlButton = null;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    @api
    get tabIndex() {
        return this.getAttribute('tabindex');
    }
    set tabIndex(value) {
        this.setAttribute('tabindex', value);
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    @api
    click() {
        if (this.htmlButton) {
            this.htmlButton.click();
        }
    }

    @api
    focus() {
        if (this.htmlButton) {
            this.htmlButton.focus();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get assistiveText() {
        const suffix = this.hasError ? ` ${i18n.editHasError}` : '';
        return `${i18n.edit} ${this.columnLabel}${suffix}`;
    }

    get htmlButton() {
        if (!this._htmlButton) {
            this._htmlButton = this.template.querySelector('button');
        }
        return this._htmlButton;
    }
}
