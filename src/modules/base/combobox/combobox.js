import { LightningElement, api } from 'lwc';
import Scope from './scope';
import Option from './option';
import Action from './action';
import {
    normalizeArray,
    normalizeBoolean,
    normalizeString,
    getListHeight,
    normalizeAriaAttribute,
    classListMutation
} from 'c/utilsPrivate';
import { FieldConstraintApi } from 'c/inputUtils';
import { classSet, generateUniqueId } from 'c/utils';
import { AutoPosition, Direction } from 'c/positionLibrary';

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

const DROPDOWN_LENGTHS = {
    valid: ['5-items', '7-items', '10-items'],
    default: '7-items'
};

const DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT = 'Loading';
const DEFAULT_PLACEHOLDER = 'Select an Option';
const DEFAULT_PLACEHOLDER_WHEN_SEARCH_ALLOWED = 'Search...';
const DEFAULT_GROUP_NAME = 'ungrouped';
const DEFAULT_SCOPES_TITLE = 'Suggested for you';

// Default LWC message
const DEFAULT_MESSAGE_WHEN_VALUE_MISSING = 'Complete this field.';

export default class Combobox extends LightningElement {
    @api fieldLevelHelp;
    @api label;
    @api name;

    _actions = [];
    _allowSearch = false;
    _disabled = false;
    _dropdownAlignment = DROPDOWN_ALIGNMENTS.default;
    _dropdownLength = DROPDOWN_LENGTHS.default;
    _groups = [];
    _hideSelectedOptions = false;
    _isLoading = false;
    _isMultiSelect = false;
    _loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    _messageWhenValueMissing = DEFAULT_MESSAGE_WHEN_VALUE_MISSING;
    _multiLevelGroups = false;
    _options = [];
    _placeholder;
    _readOnly = false;
    _removeSelectedOptions = false;
    _required = false;
    _scopes = [];
    _scopesTitle = DEFAULT_SCOPES_TITLE;
    _search = this.computeSearch;
    _value = [];
    _variant = VARIANTS.default;

    _autoPosition;
    _cancelBlur = false;
    _maxVisibleOptions = Number(DROPDOWN_LENGTHS.default.match(/[0-9]+/)[0]);
    _focusedOptionIndex = 0;
    _focusedScopeIndex = 0;
    _visibleOptions = [];
    backLink;
    computedGroups = [];
    dropdownVisible = false;
    scopesDropdownVisible = false;
    helpMessage;
    inputValue = '';
    parentOptionsValues = [];
    scopesInputValue = '';
    selectedOption;
    selectedOptions = [];
    topActions = [];
    bottomActions = [];

    connectedCallback() {
        this.initValue();

        if (this.removeSelectedOptions) {
            this.visibleOptions = this.removeSelectedOptionsFrom(
                this.visibleOptions
            );
        }
    }

    renderedCallback() {
        if (this.dropdownVisible) {
            this.updateDropdownHeight();
        }
    }

    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        const actions = normalizeArray(value);
        this.topActions = [];
        this.bottomActions = [];
        this._actions = [];

        actions.forEach((action) => {
            const actionObject = new Action(action);
            this._actions.push(actionObject);

            if (actionObject.position === 'bottom') {
                this.bottomActions.push(actionObject);
            } else {
                this.topActions.push(actionObject);
            }
        });
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
    get dropdownLength() {
        return this._dropdownLength;
    }
    set dropdownLength(value) {
        this._dropdownLength = normalizeString(value, {
            fallbackValue: DROPDOWN_LENGTHS.default,
            validValues: DROPDOWN_LENGTHS.valid
        });

        this._maxVisibleOptions = Number(
            this._dropdownLength.match(/[0-9]+/)[0]
        );
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
    get messageWhenValueMissing() {
        return this._messageWhenValueMissing;
    }
    set messageWhenValueMissing(value) {
        this._messageWhenValueMissing =
            typeof value === 'string'
                ? value.trim()
                : DEFAULT_MESSAGE_WHEN_VALUE_MISSING;
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
        if (this.visibleOptions.length) this.focusOption(0);

        if (this.isConnected) {
            this.initValue();
        }
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
        if (this._scopes.length) {
            this._scopes = this._scopes.map((scope) => {
                return new Scope(scope);
            });

            // By default, the first scope will be selected
            this._scopes[0].selected = true;
            this.scopesInputValue = this._scopes[0].label;
            this.selectedScopeIconName = this._scopes[0].iconName;
            this.focusScope(0);
        }
    }

    @api
    get scopesTitle() {
        return this._scopesTitle;
    }
    set scopesTitle(value) {
        this._scopesTitle =
            typeof value === 'string' ? value.trim() : DEFAULT_SCOPES_TITLE;
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

        classListMutation(this.classList, {
            'slds-form-element_stacked': this._variant === 'label-stacked',
            'slds-form-element_horizontal': this._variant === 'label-inline'
        });
    }

    get visibleOptions() {
        return this._visibleOptions;
    }
    set visibleOptions(value) {
        this._visibleOptions =
            this.isConnected && this.removeSelectedOptions
                ? this.removeSelectedOptionsFrom(value)
                : value;

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
            this.selectedOption &&
            this.inputValue === this.selectedOption.label &&
            (this.selectedOption.avatarSrc ||
                this.selectedOption.avatarFallbackIconName)
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

    get computedAriaActiveDescendant() {
        return normalizeAriaAttribute(
            this._focusedOption && this._focusedOption.value
        );
    }

    get computedScopesAriaActiveDescendant() {
        return normalizeAriaAttribute(
            this._focusedScope && this._focusedScope.value
        );
    }

    get currentParent() {
        return (
            this.parentOptionsValues.length &&
            this.getOption(
                this.parentOptionsValues[this.parentOptionsValues.length - 1]
            )
        );
    }

    get focusableOptions() {
        const focusable = this.topActions
            .concat(this.visibleOptions)
            .concat(this.bottomActions);
        if (this.backLink) focusable.unshift(this.backLink);
        return focusable;
    }

    get _focusedOption() {
        return this.focusableOptions[this._focusedOptionIndex];
    }

    get _focusedScope() {
        return this.scopes[this._focusedScopeIndex];
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
        return this.inputValue && !this.visibleOptions.length;
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
            'slds-is-relative slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click combobox__dropdown-trigger'
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
            'slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid combobox__dropdown'
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
        if (this.dropdownVisible) {
            this.dropdownVisible = false;
            this.stopDropdownPositioning();

            if (this.isMultiSelect) {
                // Reset options and keep the current search
                const searchTerm = this.inputValue;
                const options = this.options;
                this.visibleOptions = searchTerm
                    ? this.search({ options, searchTerm })
                    : options;

                this.parentOptionsValues = [];
                this.backLink = undefined;
                this.focusOption(0);
            } else {
                // Reset to current visible level and erase the search
                this.visibleOptions =
                    (this.currentParent && this.currentParent.options) ||
                    this.options;
            }
        }
    }

    @api
    focus() {
        if (this.input) this.input.focus();
    }

    @api
    open() {
        const hasItems = this.options.length || this.actions.length;
        if (
            !this.inputIsDisabled &&
            !this.dropdownVisible &&
            (hasItems || this.isLoading)
        ) {
            this.dropdownVisible = true;
            this.startDropdownAutoPositioning();
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

    initValue() {
        if (this.isMultiSelect) {
            this.value.forEach((value) => {
                const selectedOption = this.options.find(
                    (option) => option.value === value
                );
                if (selectedOption) selectedOption.selected = true;
            });
            this.selectedOption = undefined;
        } else {
            const selectedOption = this.options.find(
                (option) => option.value === this.value[0]
            );
            if (selectedOption) {
                selectedOption.selected = true;
                this.selectedOption = selectedOption;
            }
        }

        this.computeSelection();
    }

    initOptionObjects(options) {
        const optionObjects = [];
        options.forEach((option) => {
            const optionObject = new Option(option);

            // If the option has children, generate objects for them too
            const childrenOptions = normalizeArray(option.options);
            if (childrenOptions.length) {
                optionObject.options = this.initOptionObjects(childrenOptions);
            }

            optionObjects.push(optionObject);
        });
        return optionObjects;
    }

    startDropdownAutoPositioning() {
        if (this.dropdownAlignment !== 'auto') {
            return;
        }

        if (!this._autoPosition) {
            this._autoPosition = new AutoPosition(this);
        }

        this._autoPosition.start({
            target: () => this.template.querySelector('input'),
            element: () => this.template.querySelector('div.slds-dropdown'),
            align: {
                horizontal: Direction.Left,
                vertical: Direction.Top
            },
            targetAlign: {
                horizontal: Direction.Left,
                vertical: Direction.Bottom
            },
            autoFlip: true,
            alignWidth: true,
            autoShrinkHeight: true,
            minHeight:
                // Same configuration as lightning-combobox
                this.visibleOptions.length < 3 ? '2.25rem' : '6.75rem'
        });
    }

    // remove-next-line-for-c-namespace
    stopDropdownPositioning() {
        if (this._autoPosition) {
            this._autoPosition.stop();
        }
    }

    updateDropdownHeight() {
        const groups = this.template.querySelectorAll(
            'c-primitive-combobox-group'
        );
        const visibleItems = [];

        let i = 0;
        while (
            visibleItems.flat().length < this._maxVisibleOptions &&
            i < groups.length
        ) {
            const options = groups[i].optionsElements;
            visibleItems.push(options);
            i += 1;
        }

        // Height of the visible options, according to the dropdown length
        const optionsHeight = getListHeight(
            visibleItems.flat(),
            this._maxVisibleOptions
        );

        // Height of the top actions
        const topActions = this.template.querySelectorAll(
            '.combobox__action_top'
        );
        const topActionsHeight = getListHeight(topActions);

        // If we can see all options, add the height of the bottom actions
        let bottomActionsHeight = 0;
        if (this.visibleOptions.length <= this._maxVisibleOptions) {
            const bottomActions = this.template.querySelectorAll(
                '.combobox__action_bottom'
            );
            bottomActionsHeight = getListHeight(bottomActions);
        }

        const dropdown = this.template.querySelector(
            '.combobox__dropdown-trigger .slds-dropdown'
        );
        const height = optionsHeight + topActionsHeight + bottomActionsHeight;

        // Do not set the height when there is no actions or options
        // (for example 0 search results or is loading)
        if (height) {
            dropdown.style.maxHeight = `${height}px`;
        }
    }

    computeGroups() {
        const computedGroups = [];

        // For each visible option
        this.visibleOptions.forEach((option) => {
            const optionGroups = option.groups;
            let currentLevelGroups = computedGroups;

            if (optionGroups.length && this.groups.length > 1) {
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
        this.selectedOptions = this.getSelectedOptions();
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
                const computedOption = new Option(option);
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

    focusScope(index) {
        if (this._focusedScope) {
            this._focusedScope.focused = false;
        }
        this._focusedScopeIndex = index;
        this._focusedScope.focused = true;
    }

    focusOption(index) {
        if (this._focusedOption) this._focusedOption.focused = false;
        this._focusedOptionIndex = index;
        this._focusedOption.focused = true;
    }

    updateBackLink(label) {
        this.backLink = new Action({
            label: label,
            name: 'backlink',
            iconName: 'utility:chevronleft',
            position: 'top',
            isBackLink: true
        });
    }

    handleBlur() {
        if (this._cancelBlur) {
            return;
        }
        if (this.selectedOption && this.inputValue === '') {
            this.inputValue = this.selectedOption.label;
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

        // Search in the current level of options
        const options =
            (this.currentParent && this.currentParent.options) || this.options;

        const result = this.search({
            searchTerm,
            options: options
        });

        if (this._focusedOption) this._focusedOption.focused = false;
        this.visibleOptions = result;
        this.focusOption(0);

        this.dispatchEvent(
            new CustomEvent('search', {
                detail: {
                    value: searchTerm
                }
            })
        );
    }

    handleInputClick() {
        if (this.selectedOption) {
            this.inputValue = '';
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

    handleFocusableOptionClick(event) {
        // If the search is allowed, the options have to be selected with enter
        if (this.allowSearch && (event.key === ' ' || event.key === 'Spacebar'))
            return;

        if (this._focusedOption.value) {
            this.handleOptionClick(event);
        } else if (this._focusedOption.name === 'backlink') {
            this.handleBackLinkClick();
        } else {
            this.handleActionClick(this._focusedOption.name);
        }
    }

    handleScopesInputKeyDown(event) {
        if (!this.scopesDropdownVisible) {
            this.scopesDropdownVisible = true;
        } else {
            const index = this._focusedScopeIndex;
            switch (event.key) {
                case 'ArrowUp':
                    if (index > 0) {
                        this.focusScope(index - 1);
                    } else {
                        this.focusScope(this.scopes.length - 1);
                    }
                    break;
                case 'ArrowDown':
                    if (index < this.scopes.length - 1) {
                        this.focusScope(index + 1);
                    } else {
                        this.focusScope(0);
                    }
                    break;
                case ' ':
                    this.handleScopeClick(event);
                    break;
                case 'Spacebar':
                    this.handleScopeClick(event);
                    break;
                case 'Enter':
                    this.handleScopeClick(event);
                    break;
                case 'Escape':
                    this.scopesDropdownVisible = false;
                    break;
                case 'Home':
                    this.focusScope(0);
                    break;
                case 'End':
                    this.focusScope(this.scopes.length - 1);
                    break;
                default:
                // do nothing
            }
        }
    }

    handleInputKeyDown(event) {
        if (!this.dropdownVisible) {
            this.open();
            this.dispatchEvent(new CustomEvent('open'));
        } else {
            const index = this._focusedOptionIndex;
            switch (event.key) {
                case 'ArrowUp':
                    if (index > 0) {
                        this.focusOption(index - 1);
                    } else {
                        this.focusOption(this.focusableOptions.length - 1);
                    }
                    break;
                case 'ArrowDown':
                    if (index < this.focusableOptions.length - 1) {
                        this.focusOption(index + 1);
                    } else {
                        this.focusOption(0);
                    }
                    break;
                case 'ArrowLeft':
                    this.handleBackLinkClick();
                    break;
                case 'GoBack':
                    this.handleBackLinkClick();
                    break;
                case ' ':
                    this.handleFocusableOptionClick(event);
                    break;
                case 'Spacebar':
                    this.handleFocusableOptionClick(event);
                    break;
                case 'Enter':
                    this.handleFocusableOptionClick(event);
                    break;
                case 'Escape':
                    this.close();
                    break;
                case 'Home':
                    this.focusOption(0);
                    break;
                case 'End':
                    this.focusOption(this.focusableOptions.length - 1);
                    break;
                default:
                // do nothing
            }
        }
    }

    handleBackLinkClick() {
        const parents = this.parentOptionsValues;
        parents.pop();

        if (parents.length) {
            const parent = this.getOption(parents[parents.length - 1]);
            this.updateBackLink(parent.label);
            this.visibleOptions = parent.options;
        } else {
            this.visibleOptions = this.options;
            this.backLink = undefined;
        }

        this.focusOption(0);
        this.focus();
    }

    handleClearInput(event) {
        event.stopPropagation();
        this.inputValue = '';

        // Clear the value
        if (!this.isMultiSelect && this.selectedOption) {
            this.selectedOption.selected = false;
            this.selectedOption = undefined;
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
        this.visibleOptions = this.options;
        this.parentOptionsValues = [];

        this.focus();
    }

    handleScopeClick() {
        if (!this._focusedScope) {
            this.template.querySelector('input.combobox__scopes-input').focus();
            return;
        }

        // Clear any previously selected scope
        const previouslySelectedScope = this.scopes.find(
            (scope) => scope.selected
        );
        if (previouslySelectedScope) previouslySelectedScope.selected = false;

        // Select new scope
        this._focusedScope.selected = true;
        this.scopesInputValue = this._focusedScope.label;
        this.selectedScopeIconName = this._focusedScope.iconName;

        this.dispatchEvent(
            new CustomEvent('scopeselect', {
                detail: {
                    name: this._focusedScope.name
                }
            })
        );

        this._focusedScope.focused = false;
        this._focusedScopeIndex = undefined;
        this.scopesDropdownVisible = false;
    }

    handleActionClick(eventOrName) {
        // If the action is "clicked" through a keyboard event, the argument will be the name
        const name =
            typeof eventOrName === 'string'
                ? eventOrName
                : eventOrName.currentTarget.dataset.name;

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

        const selectedOption = this._focusedOption;
        const value = this._focusedOption.value;

        // If the option has children options, change the visible options
        if (selectedOption.options && selectedOption.options.length) {
            this.visibleOptions = selectedOption.options;
            this.parentOptionsValues.push(selectedOption.value);
            this.updateBackLink(this.currentParent.label);
            this.focusOption(0);
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
            this.selectedOption = selectedOption;
        } else {
            this.inputValue = '';
            this.selectedOption = undefined;
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

    handleMouseEnter(event) {
        event.stopPropagation();
        const type = event.currentTarget.dataset.type;
        const name = event.currentTarget.dataset.name;

        // The mouse is in the scopes dropdown
        if (type === 'scope') {
            const index = this.scopes.findIndex((scope) => {
                return scope.name === name;
            });
            this.focusScope(index);
        } else {
            // The mouse is in the main dropdown
            let index;

            if (name) {
                // The mouse hovers an action
                index = this.focusableOptions.findIndex((option) => {
                    return option.name === name;
                });
            } else {
                // The mouse hovers an option
                index = this.focusableOptions.findIndex((option) => {
                    return option.value === event.detail.value;
                });
            }
            this.focusOption(index);
        }
    }

    handleMouseLeave(event) {
        event.stopPropagation();
        const type = event.currentTarget.dataset.type;

        if (type === 'scope') {
            // The mouse is in the scopes dropdown
            if (this._focusedScope) this._focusedScope.focused = false;
            this._focusedScopeIndex = undefined;
        } else {
            // The mouse is in the main dropdown
            if (this._focusedOption) this._focusedOption.focused = false;
            this._focusedOptionIndex = undefined;
        }
    }

    handleRemoveSelectedOption(event) {
        const value = event.detail.name;
        const selectedOption = this.getOption(value);
        selectedOption.selected = false;

        this.computeSelection();
        this.visibleOptions = this.options;

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
