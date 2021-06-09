import { LightningElement, api } from 'lwc';
import { normalizeArray, normalizeBoolean } from 'c/utilsPrivate';
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

    @api
    get removeSelectedOptions() {
        return this._removeSelectedOptions;
    }
    set removeSelectedOptions(value) {
        this._removeSelectedOptions = normalizeBoolean(value);
    }

    @api
    get optionsElements() {
        return Array.from(this.template.querySelectorAll('.combobox__option'));
    }

    get generateKey() {
        return generateUniqueId();
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
