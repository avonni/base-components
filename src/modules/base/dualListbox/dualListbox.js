import { LightningElement, api } from 'lwc';
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';

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
    @api validity;
    @api value = [];

    _disableReordering = false;
    _disabled = false;
    _min = DEFAULT_MIN;
    _max = 100; // to verify
    _options = [];
    _required = false;
    _searchEngine = false;
    _showActivityIndicator = false;
    _size = 10;
    _variant = VALID_VARIANTS.default;

    connectedCallback() {
        console.log(this.sourceLabel);
        console.log(this.selectedLabel);
        console.log(this.label);
        console.log(this.addButtonLabel);
        console.log(this.removeButtonLabel);
        console.log(this.upButtonLabel);
        console.log(this.downButtonLabel);
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
}
