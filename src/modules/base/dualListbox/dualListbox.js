import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import { FieldConstraintApi } from 'c/inputUtils';

const DEFAULT_MIN = 0;

const VALID_VARIANTS = {
    valid: ['standard', 'label-hidden', 'label-inline', 'label-stacked'],
    default: 'standard'
};

export default class DualListbox extends LightningElement {
    @api label;
    @api sourceLabel;
    @api selectedLabel;
    @api addButtonLabel;
    @api downButtonLabel;
    @api removeButtonLabel;
    @api upButtonLabel;
    @api fieldLevelHelp;
    @api messageWhenRangeOverflow;
    @api messageWhenRangeUnderflow;
    @api messageWhenValueMissing;
    @api name;
    @api requiredOptions = [];
    @api value = [];

    _disableReordering = false;
    _disabled = false;
    _min = DEFAULT_MIN;
    _max;
    _options = [];
    _required = false;
    _searchEngine = false;
    _showActivityIndicator = false;
    _size = 10;
    _variant = VALID_VARIANTS.default;
    _helpMessage;

    connectedCallback() {
        console.log(this.computedHeightSize);
    }

    @api
    get disableReordering() {
        return this._disableReordering;
    }

    set disableReordering(value) {
        this._disableReordering = normalizeBoolean(value);
    }

    @api
    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    @api
    get max() {
        return this._max;
    }

    set max(max) {
        this._max = Number(max);
    }

    @api
    get min() {
        return this._min;
    }

    set min(min) {
        this._min = Number(min);
    }

    @api
    get options() {
        return this._options;
    }

    set options(value) {
        this._options = Array.isArray(value) ? value : [];
    }

    @api
    get required() {
        return this._required;
    }

    set required(value) {
        this._required = normalizeBoolean(value);
    }

    @api
    get searchEngine() {
        return this._searchEngine;
    }

    set searchEngine(value) {
        this._searchEngine = normalizeBoolean(value);
    }

    @api
    get showActivityIndicator() {
        return this._showActivityIndicator;
    }

    set showActivityIndicator(value) {
        this._showActivityIndicator = normalizeBoolean(value);
    }

    @api
    get size() {
        return this._size;
    }

    set size(size) {
        this._size = Number(size);
    }

    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: VALID_VARIANTS.default,
            validValues: VALID_VARIANTS.valid
        });
    }

    get isLabelHidden() {
        return this._variant === 'label-hidden';
    }

    get computedOuterClass() {
        return classSet('slds-form-element')
            .add({
                'slds-form-element_horizontal':
                    this._variant === 'label-inline',
                'slds-form-element_stacked': this._variant === 'label-stacked'
            })
            .toString();
    }

    get computedInnerClass() {
        return classSet('slds-dueling-list__options')
            .add({
                'slds-is-disabled': this._disabled === true
            })
            .toString();
    }

    get computedHeightSize() {
        return `height: ${this._size * 3.25}rem;`;
    }

    get validity() {
        return this._constraint.validity;
    }

    @api
    checkValidity() {
        return this._constraint.checkValidity();
    }

    @api
    reportValidity() {
        return this._constraint.reportValidity((message) => {
            this._helpMessage = message;
        });
    }

    @api
    setCustomValidity(message) {
        this._constraint.setCustomValidity(message);
    }

    @api
    showHelpMessageIfInvalid() {
        this.reportValidity();
    }

    @api
    focus() {
        const firstOption = this.template.querySelector('c-primitive-option');
        if (firstOption) {
            firstOption.focus();
        }
    }

    get _constraint() {
        if (!this._constraintApi) {
            this._constraintApi = new FieldConstraintApi(() => this, {
                valueMissing: () =>
                    !this.disabled && this.required && this.value.length === 0
            });
        }
        return this._constraintApi;
    }
}
