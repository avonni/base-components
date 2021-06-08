import { LightningElement, api } from 'lwc';
import ComboboxScope from './comboboxScope';
import ComboboxOption from './comboboxOption';
import {
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utilsPrivate';
import { FieldConstraintApi } from 'c/inputUtils';
import { classSet, generateUniqueId } from 'c/utils';

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
const DEFAULT_GROUP_NAME = 'ungrouped';

export default class Combobox extends LightningElement {
    @api fieldLevelHelp;
    @api label;
    @api messageWhenValueMissing;
    @api name;
    @api scopesTitle;

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
    _currentLevelOptions = [];
    _visibleOptions = [];
    computedGroups = [];
    dropdownVisible = false;
    scopesDropdownVisible = false;
    helpMessage;
    inputValue = '';
    lastSelectedOption;
    scopesInputValue = '';
    selectedOptions = [];
    topActions = [];
    bottomActions = [];

    connectedCallback() {
        this.initValue();
        this.computeGroups();
    }

    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        this._actions = normalizeArray(value);

        this.initActions();
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
        this._groups = [...normalizeArray(value)];

        // Add a default group for options without groups
        this._groups.unshift({ name: DEFAULT_GROUP_NAME });
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
        if (this.isConnected) this.initValue();
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
        const options = normalizeArray(value);
        const optionObjects = this.initOptionObjects(options);
        this._options = optionObjects;
        this.visibleOptions = optionObjects;
        this._currentLevelOptions = optionObjects;

        if (this.isConnected) this.initValue();
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
        let scopes = normalizeArray(value);
        if (scopes.length > 0) {
            scopes = scopes.map((scope) => {
                return new ComboboxScope(scope);
            });

            // By default, the first scope will be selected
            scopes[0].selected = true;
            this.scopesInputValue = scopes[0].label;
            this.selectedScopeIconName = scopes[0].iconName;
        }
        this._scopes = scopes;
    }

    @api
    get search() {
        return this._search;
    }
    set search(value) {
        this._search = typeof value === 'function' ? value : this.computeSearch;
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
        this._value =
            typeof value === 'string' ? [value] : normalizeArray(value);
        if (this.isConnected) this.initValue();
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

    get visibleOptions() {
        return this._visibleOptions;
    }
    set visibleOptions(value) {
        this._visibleOptions = value;
        this.computeGroups();
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

    get generateKey() {
        return generateUniqueId();
    }

    get input() {
        return this.template.querySelector('.combobox__input');
    }

    get inputIconName() {
        return this.allowSearch ? 'utility:search' : 'utility:down';
    }

    get showInputValueAvatar() {
        return (
            this.lastSelectedOption &&
            this.inputValue === this.lastSelectedOption.label &&
            (this.lastSelectedOption.avatarSrc ||
                this.lastSelectedOption.avatarFallbackIconName)
        );
    }

    get inputIsDisabled() {
        return this.disabled || this.readOnly;
    }

    get hasNoSearch() {
        return !this.allowSearch;
    }

    get computedAriaExpanded() {
        return this.dropdownVisible ? 'true' : 'false';
    }

    get computedScopesAriaExpanded() {
        return this.scopesDropdownVisible ? 'true' : 'false';
    }

    get computedAriaAutocomplete() {
        return this.readOnly || this.disabled ? 'none' : 'list';
    }

    get showScopes() {
        return this.scopes.length > 0;
    }

    get showSelectedOptions() {
        return (
            !this.hideSelectedOptions &&
            this.isMultiSelect &&
            this.selectedOptions.length > 0
        );
    }

    get showClearInputIcon() {
        return this.input && this.inputValue !== '';
    }

    get showNoSearchResultMessage() {
        return this.inputValue && this.visibleOptions.length === 0;
    }

    get computedLabelClass() {
        return classSet('slds-form-element__label')
            .add({ 'slds-assistive-text': this.variant === 'label-hidden' })
            .toString();
    }

    get computedComboboxGroupClass() {
        return this.showScopes ? 'slds-combobox-group' : undefined;
    }

    get computedScopesContainerClass() {
        return classSet('slds-combobox_container combobox__scopes-container')
            .add({
                'slds-has-icon-only': this.selectedScopeIconName
            })
            .toString();
    }

    get computedDropdownTriggerClass() {
        return classSet(
            'slds-is-relative slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click'
        )
            .add({
                'slds-is-open': this.dropdownVisible,
                'slds-combobox-addon_end': this.showScopes
            })
            .toString();
    }

    get computedDropdownScopesTriggerClass() {
        return classSet(
            'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click'
        )
            .add({ 'slds-is-open': this.scopesDropdownVisible })
            .toString();
    }

    get computedDropdownClass() {
        return classSet(
            'slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid'
        )
            .add(this.alignmentClasses)
            .toString();
    }

    get computedScopesInputContainerClass() {
        return classSet('slds-combobox__form-element slds-input-has-icon')
            .add({
                'slds-input-has-icon_left-right': this.selectedScopeIconName,
                'slds-input-has-icon_right': !this.selectedScopeIconName
            })
            .toString();
    }

    get computedInputContainerClass() {
        return classSet('slds-combobox__form-element slds-input-has-icon')
            .add({
                'slds-input-has-icon_left-right combobox__input-has-icon_left-right': this
                    .showInputValueAvatar,
                'slds-input-has-icon_right': !this.showInputValueAvatar
            })
            .toString();
    }

    get alignmentClasses() {
        return {
            'slds-dropdown_left':
                this.dropdownAlignment === 'left' ||
                this.dropdownAlignment === 'auto',
            'slds-dropdown_center': this.dropdownAlignment === 'center',
            'slds-dropdown_right': this.dropdownAlignment === 'right',
            'slds-dropdown_bottom': this.dropdownAlignment === 'bottom-center',
            'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right':
                this.dropdownAlignment === 'bottom-right',
            'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left':
                this.dropdownAlignment === 'bottom-left'
        };
    }

    @api
    blur() {
        if (this.input) this.input.blur();
    }

    @api
    checkValidity() {
        return this._constraint.checkValidity();
    }

    @api
    close() {
        this.dropdownVisible = false;
        this._currentLevelOptions = this.options;
        this.visibleOptions = this.options;
    }

    @api
    focus() {
        if (this.input) this.input.focus();
    }

    @api
    open() {
        if (!this.inputIsDisabled) {
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

    initActions() {
        this.topActions = [];
        this.bottomActions = [];
        this.actions.forEach((action) => {
            if (action.position === 'bottom') {
                this.bottomActions.push(action);
            } else {
                this.topActions.push(action);
            }
        });
    }

    initValue() {
        if (this.isMultiSelect) {
            this.value.forEach((value) => {
                const selectedOption = this.options.find(
                    (option) => option.value === value
                );
                if (selectedOption) selectedOption.selected = true;
            });
            this.lastSelectedOption = undefined;
        } else {
            const selectedOption = this.options.find(
                (option) => option.value === this.value[0]
            );
            if (selectedOption) {
                selectedOption.selected = true;
                this.lastSelectedOption = selectedOption;
            }
        }

        this.computeSelection();
    }

    initOptionObjects(options) {
        const optionObjects = [];
        options.forEach((option) => {
            const optionObject = new ComboboxOption(option);

            // If the option has children, generate objects for them too
            const childrenOptions = normalizeArray(option.options);
            if (childrenOptions.length) {
                optionObject.options = this.initOptionObjects(childrenOptions);
            }

            optionObjects.push(optionObject);
        });
        return optionObjects;
    }

    computeGroups() {
        const computedGroups = [];

        // For each visible option
        this.visibleOptions.forEach((option) => {
            const optionGroups = option.groups;
            let currentLevelGroups = computedGroups;

            if (optionGroups.length > 0) {
                // For each group of the option
                optionGroups.forEach((name, index) => {
                    // If groups are nested
                    if (this.multiLevelGroups) {
                        // We push the option only if we have reached the deepest group
                        currentLevelGroups = normalizeArray(
                            this.groupOption({
                                groups: currentLevelGroups,
                                name,
                                option:
                                    index === optionGroups.length - 1
                                        ? option
                                        : undefined
                            })
                        );
                    } else {
                        this.groupOption({
                            groups: computedGroups,
                            name,
                            option
                        });
                    }
                });
            } else {
                // If the option does not have groups,
                // push the option in the default group
                this.groupOption({
                    groups: computedGroups,
                    option,
                    name: DEFAULT_GROUP_NAME
                });
            }
        });

        this.sortGroups(computedGroups);
        this.computedGroups = computedGroups;
    }

    /**
     * Find a group based on its name, and adds an option to its list.
     * Takes an object with three keys as an argument.
     *
     * @param {array} groups Array of the groups.
     * @param {object} option (optional) The option we want to push in the group. If provided, when the group is found, the option will be added to its options.
     * @param {string} name The name of the group the option belongs to.
     *
     * @returns {array} The children groups of the group that was selected.
     */

    // The rule is disabled, because the default "return" is to call the function again
    // eslint-disable-next-line consistent-return
    groupOption(params) {
        const { groups, option, name } = params;
        const computedGroup = groups.find((grp) => grp.name === name);

        if (computedGroup) {
            // If the group already exists, push the new option in the list
            if (option) computedGroup.options.push(option);
            return computedGroup.groups;
        }

        // If the group does not exist yet but is in the global groups list,
        // create a new group
        const group = this.groups.find((grp) => {
            return grp.name === name;
        });
        if (group) {
            const newGroup = {
                label: group.label,
                name: name,
                options: option ? [option] : [],
                groups: []
            };
            groups.push(newGroup);

            // If we just added the default group, move it up to the first entry
            if (name === DEFAULT_GROUP_NAME) this.sortGroups(groups);

            return newGroup.groups;
        }
        // If the group is not in the global groups list,
        // push the option in the default group
        this.groupOption({
            groups,
            option,
            name: DEFAULT_GROUP_NAME
        });
    }

    sortGroups(groups) {
        const defaultGroupIndex = groups.findIndex(
            (group) => group.name === DEFAULT_GROUP_NAME
        );
        if (defaultGroupIndex > -1) {
            const defaultGroup = groups.splice(defaultGroupIndex, 1)[0];
            groups.unshift(defaultGroup);
        }
    }

    computeSelection() {
        // Update selected options
        this.selectedOptions = this.getSelectedOptions();

        // Update the visible options
        let visibleOptions = this.options;
        if (this.isMultiSelect && this.inputValue) {
            visibleOptions = this.search({
                options: visibleOptions,
                searchTerm: this.inputValue
            });
        }
        if (this.removeSelectedOptions) {
            visibleOptions = this.removeSelectedOptionsFrom(visibleOptions);
        }
        this.visibleOptions = visibleOptions;

        // Update value
        this._value = this.selectedOptions.map((option) => option.value);
    }

    computeSearch(params) {
        const { options, searchTerm } = params;
        return options.filter((option) => {
            return option.label
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        });
    }

    removeSelectedOptionsFrom(options) {
        const unselectedOptions = [];
        options.forEach((option) => {
            if (option.options.length) {
                const computedOption = new ComboboxOption(option);
                computedOption.options = this.removeSelectedOptionsFrom(
                    computedOption.options
                );

                // We want to show the option only if some children options are unselected
                if (computedOption.options.length) {
                    unselectedOptions.push(computedOption);
                }
            } else {
                if (!option.selected) unselectedOptions.push(option);
            }
        });
        return unselectedOptions;
    }

    unselectOption(options = this.options) {
        let selectedOption = options.find((option) => option.selected);
        if (selectedOption) {
            selectedOption.selected = false;
            return;
        }

        // Search deeper levels
        let i = 0;
        while (!selectedOption && i < options.length) {
            const childrenOptions = options[i].options;
            if (childrenOptions.length) {
                selectedOption = this.unselectOption(childrenOptions);
            }
            i += 1;
        }
    }

    getSelectedOptions(options = this.options) {
        const selectedOptions = [];
        options.forEach((option) => {
            if (option.selected) selectedOptions.push(option);
            if (option.options.length) {
                selectedOptions.push(this.getSelectedOptions(option.options));
            }
        });

        return selectedOptions.flat();
    }

    getOption(value, options = this.options) {
        let option = options.find((opt) => opt.value === value);

        // Search deeper levels
        let i = 0;
        while (!option && i < options.length) {
            const childrenOptions = options[i].options;
            if (childrenOptions.length) {
                option = this.getOption(value, childrenOptions);
            }
            i += 1;
        }

        return option;
    }

    handleBlur() {
        if (this._cancelBlur) {
            return;
        }
        if (this.lastSelectedOption && this.inputValue === '') {
            this.inputValue = this.lastSelectedOption.label;
        }
        this.close();

        this.dispatchEvent(new CustomEvent('blur'));
    }

    handleScopeBlur() {
        if (this._cancelBlur) {
            return;
        }
        this.scopesDropdownVisible = false;
    }

    handleFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
    }

    handleInput(event) {
        const searchTerm = event.currentTarget.value;
        this.inputValue = searchTerm;

        const result = this.search({
            searchTerm,
            options: this._currentLevelOptions
        });

        this.visibleOptions = this.removeSelectedOptions
            ? this.removeSelectedOptionsFrom(result)
            : result;

        this.dispatchEvent(
            new CustomEvent('search', {
                detail: {
                    value: searchTerm
                }
            })
        );
    }

    handleInputClick() {
        if (this.lastSelectedOption) {
            this.inputValue = '';
            this.visibleOptions = this.removeSelectedOptions
                ? this.removeSelectedOptionsFrom(this.options)
                : this.options;
        }
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

    handleClearInput(event) {
        event.stopPropagation();
        this.inputValue = '';

        // Clear the value
        if (!this.isMultiSelect && this.lastSelectedOption) {
            this.lastSelectedOption.selected = false;
            this.lastSelectedOption = undefined;
            this.computeSelection();

            const value = event.currentTarget.dataset.value;
            this.dispatchEvent(
                new CustomEvent('remove', {
                    detail: {
                        value: value
                    }
                })
            );
        }

        // Reset the visible options
        this.visibleOptions = this.removeSelectedOptions
            ? this.removeSelectedOptionsFrom(this.options)
            : this.options;

        this.focus();
    }

    handleScopeClick(event) {
        // Find the selected scope
        const target = event.target.dataset.value
            ? event.target
            : event.target.closest('li');
        const name = target.dataset.name;

        // Clear any previously selected scope
        const previouslySelectedScope = this.scopes.find(
            (scope) => scope.selected
        );
        previouslySelectedScope.selected = false;

        // Select new scope
        const selectedScope = this.scopes.find((scope) => scope.name === name);
        selectedScope.selected = true;
        this.scopesInputValue = selectedScope.label;
        this.selectedScopeIconName = selectedScope.iconName;

        this.dispatchEvent(
            new CustomEvent('scopeselect', {
                detail: {
                    name: name
                }
            })
        );

        this.scopesDropdownVisible = false;
    }

    handleActionClick(event) {
        const name = event.currentTarget.dataset.name;
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: name
                }
            })
        );

        this.close();
        this.focus();
    }

    handleOptionClick(event) {
        event.stopPropagation();

        const value = event.detail.value;
        const selectedOption = this.visibleOptions.find((option) => {
            return option.value === value;
        });

        // If the option has children options, change the visible options
        if (selectedOption.options && selectedOption.options.length) {
            this.visibleOptions = selectedOption.options;
            this._currentLevelOptions = selectedOption.options;
            this.focus();
            return;
        }

        // Toggle selection
        if (!this.isMultiSelect && !selectedOption.selected) {
            this.unselectOption();
        }
        selectedOption.selected = !selectedOption.selected;
        this.computeSelection();

        // Update the input value
        if (!this.isMultiSelect && selectedOption.selected) {
            this.inputValue = selectedOption.label;
            this.lastSelectedOption = selectedOption;
        } else {
            this.inputValue = '';
            this.lastSelectedOption = undefined;
        }

        this.dispatchEvent(
            new CustomEvent('select', {
                detail: {
                    value: value
                },
                bubbles: true
            })
        );

        this.close();
        this.focus();
    }

    handleRemoveSelectedOption(event) {
        const value = event.detail.name;
        const selectedOption = this.getOption(value);
        selectedOption.selected = false;

        this.computeSelection();

        this.dispatchEvent(
            new CustomEvent('remove', {
                detail: {
                    value: value
                },
                bubbles: true
            })
        );
    }

    handleTriggerClick() {
        if (!this.dropdownVisible) {
            this.open();
            this.dispatchEvent(new CustomEvent('open'));
        }
    }

    handleScopeTriggerClick() {
        this.scopesDropdownVisible = !this.scopesDropdownVisible;
    }
}
