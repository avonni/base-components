import { LightningElement, api } from 'lwc';
import { normalizeArray } from 'c/utilsPrivate';
import { generateUniqueId } from 'c/utils';

export default class PrimitiveComboboxGroup extends LightningElement {
    @api label;
    @api name;

    _groups = [];
    _options = [];

    @api
    get options() {
        return this._options;
    }
    set options(value) {
        this._options = normalizeArray(value);
    }

    @api
    get groups() {
        return this._groups;
    }
    set groups(value) {
        this._groups = normalizeArray(value);
    }

    get generateKey() {
        return generateUniqueId();
    }

    @api
    get optionsElements() {
        return Array.from(this.template.querySelectorAll('.combobox__option'));
    }

    handleClick(event) {
        this.dispatchEvent(
            new CustomEvent('privateoptionclick', {
                detail: {
                    value: event.currentTarget.dataset.value
                },
                bubbles: true,
                composed: true
            })
        );
    }
}
