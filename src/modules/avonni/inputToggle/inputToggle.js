import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'avonni/utilsPrivate';
import { classSet } from 'avonni/utils';

// For translations?
const i18n = {
    required: 'required'
};

const validSizes = ['x-small', 'small', 'medium', 'large'];

export default class InputToggle extends LightningElement {
    // "This attribute isn't supported for file, toggle, and checkbox-button types."
    // Waiting for answer
    @api fieldLevelHelp;

    // Effective
    @api accessKey = null;
    @api ariaControls = null;
    @api ariaDescribedBy = null;
    @api ariaLabel = null;
    @api ariaLabelledBy = null;
    @api label = 'Toggle Label';
    @api messageToggleActive = 'Active';
    @api messageToggleInactive = 'Inactive';
    @api messageWhenValueMissing;
    @api name;
    @api value;

    _checked;
    _disabled;
    _readOnly; // No effect on checkboxes
    _required;
    _size = 'medium';

    // To do
    @api hideMark = false;
    @api validity;
    @api variant;

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
            'avonni-input-toggle__faux_large': this.size === 'large'
        });
    }

    @api get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
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
}
