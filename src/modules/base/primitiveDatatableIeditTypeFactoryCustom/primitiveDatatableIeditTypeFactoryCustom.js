import { LightningElement, api } from 'lwc';
import { assert } from 'c/utilsPrivate';

import ComboboxTpl from './combobox.html';
import DefaultTpl from './default.html';

const CUSTOM_TYPES_TPL = {
    combobox: ComboboxTpl
};

const INVALID_TYPE_FOR_EDIT =
    'column custom type not supported for inline edit';

export default class PrimitiveDatatableIeditTypeFactory extends LightningElement {
    columnLabel;
    @api editedValue;
    @api required;
    @api disabled;
    @api dropdownAlignement;
    @api dropdownLength;
    @api isMultiSelect;
    @api label;
    @api options;
    @api placeholder;

    @api
    get columnDef() {
        return this._columnDef;
    }

    set columnDef(value) {
        assert(
            // eslint-disable-next-line no-prototype-builtins
            CUSTOM_TYPES_TPL.hasOwnProperty(value.type),
            INVALID_TYPE_FOR_EDIT
        );
        this._columnDef = value;
        this.columnLabel = value.label;
    }

    get columnType() {
        return this._columnDef.type;
    }

    render() {
        return CUSTOM_TYPES_TPL[this.columnType] || DefaultTpl;
    }

    connectedCallback() {
        this._blurHandler = this.handleComponentBlur.bind(this);
        this._focusHandler = this.handleComponentFocus.bind(this);
        this._changeHandler = this.handleComponentChange.bind(this);
    }

    renderedCallback() {
        this.concreteComponent.addEventListener('blur', this._blurHandler);
        this.concreteComponent.addEventListener('focus', this._focusHandler);
        this.concreteComponent.addEventListener('change', this._changeHandler);
        if (this.concreteComponent) {
            this.concreteComponent.focus();
        }
    }

    get concreteComponent() {
        return this.template.querySelector('[data-inputable="true"]');
    }

    @api
    focus() {
        if (this.concreteComponent) {
            this.concreteComponent.focus();
        }
    }

    @api
    value() {
        return this.concreteComponent.value;
    }

    @api
    validity() {
        return this.concreteComponent.validity;
    }

    @api
    showHelpMessageIfInvalid() {
        this.concreteComponent.showHelpMessageIfInvalid();
    }

    handleComponentFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
    }

    handleComponentBlur() {
        this.dispatchEvent(new CustomEvent('blur'));
    }

    handleComponentChange() {
        this.showHelpMessageIfInvalid();
    }

    onChange(event) {
        this.dispatchEvent(
            new CustomEvent('changecomboboxfactory', {
                detail: event.detail,
                bubbles: true,
                composed: true
            })
        );
    }
}
