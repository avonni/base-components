import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'avonni/utilsPrivate';
import { classSet } from 'avonni/utils';

// For translations?
const i18n = {
    required: 'required'
};

const validSizes = ['x-small', 'small', 'medium', 'large'];
const validVariants = [
    'standard',
    'label-inline',
    'label-hidden',
    'label-stacked'
];

export default class InputToggle extends LightningElement {
    // Effective
    @api accessKey;
    @api ariaControls;
    @api ariaDescribedBy;
    @api ariaLabel;
    @api ariaLabelledBy;
    @api fieldLevelHelp;
    @api label = 'Toggle Label';
    @api messageToggleActive = 'Active';
    @api messageToggleInactive = 'Inactive';
    @api messageWhenValueMissing;
    @api name;
    @api value;

    _checked;
    _disabled;
    _hideMark;
    _readOnly; // No effect on checkboxes
    _required;
    _size = 'medium';
    _variant = 'standard';

    // To do
    @api validity;

    @api get checked() {
        return this._checked;
    }
    set checked(value) {
        this._checked = normalizeBoolean(value);
    }

    get computedFauxToggleClass() {
        return classSet('slds-checkbox_faux').add({
            'avonni-input-toggle__faux_x-small': this.size === 'x-small',
            'avonni-input-toggle__faux_small': this.size === 'small',
            'avonni-input-toggle__faux_large': this.size === 'large',
            'avonni-input-toggle__faux_hide-mark': this.hideMark === true
        });
    }

    get computedLabelClass() {
        return classSet('slds-form-element__label slds-m-bottom_none').add({
            'slds-assistive-text': this.variant === 'label-hidden'
        });
    }

    get computedWrapperClass() {
        return classSet('slds-checkbox_faux').add({
            'slds-form-element_horizontal': this.variant === 'label-inline',
            'slds-form-element_stacked': this.variant === 'label-stacked'
        });
    }

    @api get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    @api get hideMark() {
        return this._hideMark;
    }
    set hideMark(value) {
        this._hideMark = normalizeBoolean(value);
    }

    get i18n() {
        return i18n;
    }

    @api get readOnly() {
        return this._readOnly;
    }
    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
    }

    @api get required() {
        return this._required;
    }
    set required(value) {
        this._required = normalizeBoolean(value);
    }

    @api get size() {
        return this._size;
    }
    set size(toggleSize) {
        this._size = normalizeString(toggleSize, {
            fallbackValue: 'medium',
            validValues: validSizes
        });
    }

    @api get variant() {
        return this._variant;
    }
    set variant(toggleVariant) {
        this._variant = normalizeString(toggleVariant, {
            fallbackValue: 'standard',
            validValues: validVariants
        });
    }
}
