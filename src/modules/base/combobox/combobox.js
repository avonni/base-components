import { LightningElement, api } from 'lwc';
import ComboboxOption from './comboboxOption';
import {
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utilsPrivate';
import { FieldConstraintApi } from 'c/inputUtils';
import { classSet } from 'c/utils';

const DROPDOWN_ALIGNMENTS = {
    valid: [
        'auto',
        'left',
        'center',
        'right',
        'bottom-left',
        'bottom-center',
        'bottom-right'
    ],
    default: 'left'
};

const VARIANTS = {
    valid: ['standard', 'label-inline', 'label-hidden', 'label-stacked'],
    default: 'standard'
};

const DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT = 'Loading';
const DEFAULT_PLACEHOLDER = 'Select an Option';
const DEFAULT_PLACEHOLDER_WHEN_SEARCH_ALLOWED = 'Search...';

export default class Combobox extends LightningElement {
    @api fieldLevelHelp;
    @api label;
    @api messageWhenValueMissing;
    @api name;

    _actions = [];
    _allowSearch = false;
    _disabled = false;
    _dropdownAlignment = DROPDOWN_ALIGNMENTS.default;
    _groups = [];
    _hideSelectedOptions = false;
    _isLoading = false;
    _isMultiSelect = false;
    _loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    _multiLevelGroups = false;
    _options = [];
    _placeholder;
    _readOnly = false;
    _removeSelectedOptions = false;
    _required = false;
    _scopes = [];
    _search;
    _value = [];
    _variant = VARIANTS.default;

    _cancelBlur = false;
    selectedOptions = [];
    helpMessage;
    dropdownVisible = false;

    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        this._actions = normalizeArray(value);
    }

    @api
    get allowSearch() {
        return this._allowSearch;
    }
    set allowSearch(value) {
        this._allowSearch = normalizeBoolean(value);
    }

    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    @api
    get dropdownAlignment() {
        return this._dropdownAlignment;
    }
    set dropdownAlignment(value) {
        this._dropdownAlignment = normalizeString(value, {
            validValues: DROPDOWN_ALIGNMENTS.valid,
            fallbackValue: DROPDOWN_ALIGNMENTS.default
        });
    }

    @api
    get groups() {
        return this._groups;
    }
    set groups(value) {
        this._groups = normalizeArray(value);
    }

    @api
    get hideSelectedOptions() {
        return this._hideSelectedOptions;
    }
    set hideSelectedOptions(value) {
        this._hideSelectedOptions = normalizeBoolean(value);
    }

    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    @api
    get isMultiSelect() {
        return this._isMultiSelect;
    }
    set isMultiSelect(value) {
        this._isMultiSelect = normalizeBoolean(value);
    }

    @api
    get loadingStateAlternativeText() {
        return this._loadingStateAlternativeText;
    }
    set loadingStateAlternativeText(value) {
        this._loadingStateAlternativeText =
            typeof value === 'string'
                ? value.trim()
                : DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    }

    @api
    get multiLevelGroups() {
        return this._multiLevelGroups;
    }
    set multiLevelGroups(value) {
        this._multiLevelGroups = normalizeBoolean(value);
    }

    @api
    get options() {
        return this._options;
    }
    set options(value) {
        let options = normalizeArray(value);
        if (options.length > 0) {
            options = options.map((option) => {
                return new ComboboxOption(option);
            });
        }
        this._options = options;
        this.computedOptions = options;
    }

    @api
    get placeholder() {
        if (this._placeholder) return this._placeholder;

        return this.allowSearch
            ? DEFAULT_PLACEHOLDER_WHEN_SEARCH_ALLOWED
            : DEFAULT_PLACEHOLDER;
    }
    set placeholder(value) {
        this._placeholder = value;
    }

    @api
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
    }

    @api
    get removeSelectedOptions() {
        return this._removeSelectedOptions;
    }
    set removeSelectedOptions(value) {
        this._removeSelectedOptions = normalizeBoolean(value);
    }

    @api
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = normalizeBoolean(value);
    }

    @api
    get scopes() {
        return this._scopes;
    }
    set scopes(value) {
        this._scopes = normalizeArray(value);
    }

    @api
    get search() {
        return this._search;
    }
    set search(value) {
        this._search = typeof value === 'function' ? value : undefined;
    }

    @api
    get validity() {
        return this._constraint.validity;
    }

    @api
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = normalizeArray(value);
    }

    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            validValues: VARIANTS.valid,
            fallbackValue: VARIANTS.default
        });
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

    get inputIconName() {
        return this.allowSearch ? 'utility:search' : 'utility:down';
    }

    get inputIsDisabled() {
        return this.disabled || this.readOnly;
    }

    get computedAriaExpanded() {
        return this.dropdownVisible ? 'true' : 'false';
    }

    get computedAriaAutocomplete() {
        return this.readOnly || this.disabled ? 'none' : 'list';
    }

    get showSelectedOptions() {
        return !this.hideSelectedOptions && this.selectedOptions.length > 0;
    }

    get computedLabelClass() {
        return classSet('slds-form-element__label')
            .add({ 'slds-assistive-text': this.variant === 'label-hidden' })
            .toString();
    }

    get computedDropdownTriggerClass() {
        return classSet(
            'slds-is-relative slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click'
        )
            .add({ 'slds-is-open': this.dropdownVisible })
            .toString();
    }

    get computedDropdownClass() {
        const alignment = this.dropdownAlignment;

        return classSet(
            'slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid'
        )
            .add({
                'slds-dropdown_left':
                    alignment === 'left' || alignment === 'auto',
                'slds-dropdown_center': alignment === 'center',
                'slds-dropdown_right': alignment === 'right',
                'slds-dropdown_bottom': alignment === 'bottom-center',
                'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right':
                    alignment === 'bottom-right',
                'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left':
                    alignment === 'bottom-left'
            })
            .toString();
    }

    @api
    blur() {
        const input = this.template.querySelector('input');
        if (input) input.blur();
    }

    @api
    checkValidity() {
        return this._constraint.checkValidity();
    }

    @api
    close() {
        this.dropdownVisible = false;
    }

    @api
    focus() {
        const input = this.template.querySelector('input');
        if (input) input.focus();
    }

    @api
    open() {
        if (this.computedOptions.length > 0 && !this.inputIsDisabled) {
            this.dropdownVisible = true;
        }
    }

    @api
    reportValidity() {
        return this._constraint.reportValidity((message) => {
            this.helpMessage = this.messageWhenValueMissing || message;
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

    updateSelectedOptions() {
        this.selectedOptions = this.options.filter((option) => option.selected);
        this._value = this.selectedOptions.map((option) => option.value);
    }

    updateComputedOptions() {
        this.computedOptions = this.options.filter(
            (option) => !option.selected
        );
    }

    handleBlur() {
        if (this._cancelBlur) {
            return;
        }
        this.close();
    }

    handleFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
    }

    handleDropdownMouseDown(event) {
        const mainButton = 0;
        if (event.button === mainButton) {
            this._cancelBlur = true;
        }
    }

    handleDropdownMouseUp() {
        // We need this to make sure that if a scrollbar is being dragged with the mouse, upon release
        // of the drag we allow blur, otherwise the dropdown would not close on blur since we'd have cancel blur set
        this._cancelBlur = false;
    }

    handleInputKeyDown() {
        if (!this.dropdownVisible) {
            this.open();
            this.dispatchEvent(new CustomEvent('open'));
        }
    }

    handleOptionClick(event) {
        const target = event.target.dataset.value
            ? event.target
            : event.target.closest('.slds-listbox__option');
        const value = target.dataset.value;
        const selectedOption = this.options.find((option) => {
            return option.value === value;
        });

        selectedOption.selected = !selectedOption.selected;
        this.updateSelectedOptions();
        if (this.removeSelectedOptions) this.updateComputedOptions();

        this.dispatchEvent(
            new CustomEvent('select', {
                detail: {
                    value: value
                },
                bubbles: true
            })
        );

        this.focus();
        this.close();
    }

    handleRemoveSelectedOption(event) {
        const value = event.detail.name;
        const selectedOption = this.options.find(
            (option) => option.value === value
        );
        selectedOption.selected = false;
        this.updateSelectedOptions();
        if (this.removeSelectedOptions) this.updateComputedOptions();
    }

    handleTriggerClick() {
        if (!this.dropdownVisible) {
            this.open();
            this.dispatchEvent(new CustomEvent('open'));
        }
    }
}
