import { LightningElement, api } from 'lwc';

const i18n = {
    edit: 'edit',
    editHasError: 'error'
};

export default class PrivateCellEditableButton extends LightningElement {
    @api columnLabel;
    @api hasError;

    _htmlButton = null;

    @api
    focus() {
        if (this.htmlButton) {
            this.htmlButton.focus();
        }
    }

    @api
    click() {
        if (this.htmlButton) {
            this.htmlButton.click();
        }
    }

    @api
    get tabIndex() {
        return this.getAttribute('tabindex');
    }

    set tabIndex(value) {
        this.setAttribute('tabindex', value);
    }

    get htmlButton() {
        if (!this._htmlButton) {
            this._htmlButton = this.template.querySelector('button');
        }

        return this._htmlButton;
    }

    disconnectedCallback() {
        this._htmlButton = null;
    }

    get assistiveText() {
        const suffix = this.hasError ? ` ${i18n.editHasError}` : '';

        return `${i18n.edit} ${this.columnLabel}${suffix}`;
    }
}
