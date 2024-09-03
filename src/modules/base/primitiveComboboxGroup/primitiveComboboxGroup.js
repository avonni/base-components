import { LightningElement, api } from 'lwc';
import { generateUUID, normalizeArray, normalizeBoolean } from 'c/utils';

export default class PrimitiveComboboxGroup extends LightningElement {
    @api label;
    @api name;

    _groups = [];
    _options = [];
    _removeSelectedOptions = false;

    renderedCallback() {
        // The group is added to the id to be able to make the difference between
        // the two versions of the same option, when an option is in several groups.
        const options = this.template.querySelectorAll(
            '[data-element-id="li-option"]'
        );
        options.forEach((option, index) => {
            option.id = `${this.name}-${index}`;
        });
    }

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
    get titleElement() {
        return this.template.querySelector(
            '[data-element-id="li-group-title"]'
        );
    }

    @api
    get optionElements() {
        if (!this.options) return null;

        const options = Array.from(
            this.template.querySelectorAll('[data-element-id="li-option"]')
        );

        if (this.groups) {
            const groups = Array.from(
                this.template.querySelectorAll(
                    '[data-element-id="avonni-primitive-combobox-group"]'
                )
            );
            groups.forEach((group) => {
                options.push(group.optionElements);
            });
        }
        return options.flat();
    }

    get generateKey() {
        return generateUUID();
    }

    handleAction(event) {
        if (event.currentTarget.dataset.ariaDisabled === 'true') return;
        this.dispatchEvent(
            new CustomEvent(`privateoption${event.type}`, {
                detail: {
                    id: event.currentTarget.id
                },
                bubbles: true,
                composed: true
            })
        );
    }
}
