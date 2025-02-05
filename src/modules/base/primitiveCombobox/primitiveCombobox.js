import { FieldConstraintApi, InteractingState } from 'c/inputUtils';
import { AutoPosition, Direction } from 'c/positionLibrary';
import {
    classSet,
    deepCopy,
    generateUUID,
    normalizeAriaAttribute,
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utils';
import { classListMutation, equal, getListHeight } from 'c/utilsPrivate';
import { LightningElement, api } from 'lwc';
import Action from './action';
import Option from './option';
import {
    MAX_LOADED_OPTIONS,
    computeScroll,
    getTopOption,
    isOutsideOfView
} from './scrollUtils';

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

const DEFAULT_BACK_ACTION = {
    iconName: 'utility:chevronleft'
};
const DEFAULT_LOAD_MORE_OFFSET = 20;
const DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT = 'Loading';
const DEFAULT_MIN = 0;
const DEFAULT_PLACEHOLDER = 'Select an Option';
const DEFAULT_PLACEHOLDER_WHEN_SEARCH_ALLOWED = 'Search...';
const DEFAULT_GROUP_NAME = 'ungrouped';
const MIN_DROPDOWN_HEIGHT = 60;

/**
 * Primitive Combobox.
 *
 * @class
 */
export default class PrimitiveCombobox extends LightningElement {
    /**
     * Help text detailing the purpose and function of the primitive combobox.
     *
     * @type {string}
     * @public
     */
    @api fieldLevelHelp;

    /**
     * Deprecated. The selected options are in the combobox component's DOM.
     *
     * @type {boolean}
     * @deprecated
     */
    @api hideSelectedOptions;

    /**
     * Text label for the primitive combobox.
     *
     * @type {string}
     * @public
     */
    @api label;

    /**
     * If multi-select, maximum number of selected options allowed.
     *
     * @type {number}
     * @public
     */
    @api max;

    /**
     * Error message to be displayed when a bad input is detected.
     *
     * @type {string}
     * @public
     */
    @api messageWhenBadInput;

    /**
     * Error message to be displayed when a range overflow is detected.
     *
     * @type {string}
     * @public
     */
    @api messageWhenRangeOverflow;

    /**
     * Error message to be displayed when a range underflow is detected.
     *
     * @type {string}
     * @public
     */
    @api messageWhenRangeUnderflow;

    /**
     * Error message to be displayed when the value is missing and input is required.
     *
     * @type {string}
     * @public
     */
    @api messageWhenValueMissing;

    /**
     * If multi-select, minimum number of selected options allowed.
     *
     * @type {number}
     * @default 0
     * @public
     */
    @api min = DEFAULT_MIN;

    /**
     * Specifies the name of the primitive combobox.
     *
     * @type {string}
     * @public
     */
    @api name;

    /**
     * Deprecated. The selected options are in the combobox component's DOM.
     *
     * @type {string}
     * @deprecated
     */
    @api selectedOptionsAriaLabel;

    _actions = [];
    _allowSearch = false;
    _backAction = DEFAULT_BACK_ACTION;
    _disabled = false;
    _dropdownAlignment = DROPDOWN_ALIGNMENTS.default;
    _dropdownLength = DROPDOWN_LENGTHS.default;
    _enableInfiniteLoading = false;
    _groups = [{ name: DEFAULT_GROUP_NAME }];
    _hideClearIcon = false;
    _hideOptionsUntilSearch = false;
    _isLoading = false;
    _isMultiSelect = false;
    _keepOpenOnSelect = false;
    _loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    _loadMoreOffset = DEFAULT_LOAD_MORE_OFFSET;
    _multiLevelGroups = false;
    _options = [];
    _placeholder;
    _readOnly = false;
    _removeSelectedOptions = false;
    _required = false;
    _search = this._computeSearch;
    _value = [];
    _variant = VARIANTS.default;

    _autoPosition;
    _cancelBlur = false;
    _computedOptions = [];
    _endIndex = MAX_LOADED_OPTIONS;
    _highlightedOptionIndex = 0;
    _isSearching = false;
    _maxVisibleOptions = Number(DROPDOWN_LENGTHS.default.match(/[0-9]+/)[0]);
    _originalOptions = [];
    _scrollTimeout;
    _searchTerm = '';
    _searchTimeout;
    _startIndex = 0;
    _topVisibleOption;
    _visibleOptions = [];
    backLink;
    bottomActions = [];
    computedGroups = [];
    dropdownVisible = false;
    helpMessage;
    inputValue = '';
    parentOptionsValues = [];
    selectedOption;
    selectedOptions = [];
    showEndLoader = false;
    showStartLoader = false;
    topActions = [];

    /*
     * -------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this._initValue();
        this._initComputedOptions();

        this.interactingState = new InteractingState();
        this.interactingState.onleave(() => this.showHelpMessageIfInvalid());
        this._connected = true;
    }

    renderedCallback() {
        if (this.dropdownVisible) {
            this._updateDropdownHeight();

            if (this.enableInfiniteLoading) {
                if (this._topVisibleOption) {
                    this._scrollToTopVisibleOption();
                }
                if (this.list && this.list.scrollTop === 0) {
                    this.handleScroll();
                }
            } else {
                this._highlightOption(0);
            }
        }
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of action objects. The actions are displayed at the end of the primitive combobox options.
     *
     * @type {object[]}
     * @public
     */
    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        const actions = normalizeArray(value);
        if (equal(actions, this._actions)) {
            return;
        }
        this._computeActions(actions);
    }

    /**
     * If present, the primitive combobox options are searchable.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get allowSearch() {
        return this._allowSearch;
    }
    set allowSearch(value) {
        this._allowSearch = normalizeBoolean(value);
    }

    /**
     * Action object. The back action is used to go back to the previous level, after clicking on an option that has nested options.
     *
     * @type {object}
     * @default { iconName: 'utility:chevronright', label: Label of the parent option }
     * @public
     */
    @api
    get backAction() {
        return this._backAction;
    }
    set backAction(value) {
        this._backAction =
            value instanceof Object ? value : DEFAULT_BACK_ACTION;
    }

    /**
     * If present, the primitive combobox is disabled and users cannot interact with it.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    /**
     * Specifies where the drop-down list is aligned with or anchored to the selection field.
     * Valid values include auto, left, center, right, bottom-left, bottom-center and bottom-right.
     * By default the list is aligned with the selection field at the top left so the list opens down.
     * Use bottom-left to make the selection field display at the bottom so the list opens above it.
     * Use auto to let the component determine where to open the list based on space available.
     *
     * @type {string}
     * @default left
     * @public
     */
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

    /**
     * Maximum length of the dropdown menu. Valid values include 5-items, 7-items and 10-items.
     *
     * @type {string}
     * @default 7-items
     * @public
     */
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

    /**
     * If present, only a subset of the options is displayed at a time. Use in conjunction with the `loadmore` event handler to retrieve more data when the users scroll down.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get enableInfiniteLoading() {
        return this._enableInfiniteLoading;
    }
    set enableInfiniteLoading(value) {
        this._enableInfiniteLoading = normalizeBoolean(value);

        if (this._connected) {
            this._initComputedOptions();
        }
    }

    /**
     * Array of group objects. The groups are used to separate the options inside the drop-down.
     *
     * @type {object[]}
     * @public
     */
    @api
    get groups() {
        return this._groups;
    }
    set groups(value) {
        this._groups = [...normalizeArray(value)];

        // Add a default group for options without groups
        this._groups.unshift({ name: DEFAULT_GROUP_NAME });
        if (this._visibleOptions.length) {
            this._computeGroups();
        }
    }

    /**
     * If present, the primitive combobox options are hidden until a search value is entered.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get hideOptionsUntilSearch() {
        return this._hideOptionsUntilSearch;
    }
    set hideOptionsUntilSearch(value) {
        this._hideOptionsUntilSearch = normalizeBoolean(value);
    }

    /**
     * If true, the drop-down menu is in a loading state and shows a spinner.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
        this.showEndLoader = this._isLoading;
        this.showStartLoader = false;
    }

    /**
     * If present, multiple options can be selected.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get isMultiSelect() {
        return this._isMultiSelect;
    }
    set isMultiSelect(value) {
        this._isMultiSelect = normalizeBoolean(value);
        if (this._connected) this._initValue();
    }

    /**
     * If present, the dropdown menu will remain open after an option is selected.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get keepOpenOnSelect() {
        return this._keepOpenOnSelect;
    }
    set keepOpenOnSelect(value) {
        this._keepOpenOnSelect = normalizeBoolean(value);
    }

    /**
     * Determines when to trigger infinite loading based on how many pixels the drop-down's scroll position is from the bottom of the drop-down.
     *
     * @type {number}
     * @default 20
     * @public
     */
    @api
    get loadMoreOffset() {
        return this._loadMoreOffset;
    }
    set loadMoreOffset(value) {
        const number = Number(value);
        this._loadMoreOffset = isNaN(number)
            ? DEFAULT_LOAD_MORE_OFFSET
            : number;
    }

    /**
     * Message displayed while the combobox is in the loading state.
     *
     * @type {string}
     * @default Loading
     * @public
     */
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

    /**
     * If present, groups can contain other groups. Each group added to an option will create a level of depth.
     *
     * If false, there will be only one level of groups.
     * If an option belongs to several groups, the option will be repeated in each group.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get multiLevelGroups() {
        return this._multiLevelGroups;
    }
    set multiLevelGroups(value) {
        this._multiLevelGroups = normalizeBoolean(value);

        if (this.groups.length && this._visibleOptions.length)
            this._computeGroups();
    }

    /**
     * Array of option objects.
     *
     * @type {object[]}
     * @public
     */
    @api
    get options() {
        return this._options;
    }
    set options(value) {
        this._setOptions(value);
    }

    /**
     * Text that is displayed before an option is selected, to prompt the user to select an option.
     *
     * The default value varies depending on the value of allow-search.
     *
     * @type {string}
     * @default Select an Option -or- Search…
     * @public
     */
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

    /**
     * If present, the combobox is read-only. A read-only combobox is also disabled.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get readOnly() {
        return this._readOnly;
    }
    set readOnly(value) {
        this._readOnly = normalizeBoolean(value);
    }

    /**
     * If present, the selected options will be removed from the options.
     *
     * If false, a checkmark will be displayed next to the selected options.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get removeSelectedOptions() {
        return this._removeSelectedOptions;
    }
    set removeSelectedOptions(value) {
        this._removeSelectedOptions = normalizeBoolean(value);

        if (this._connected) {
            this._initComputedOptions();
        }
    }

    /**
     * If present, a value must be selected before the form can be submitted.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = normalizeBoolean(value);
    }

    /**
     * Custom search function to execute instead of the default search. It has to:
     * * Take an object with two keys as an argument: options and searchTerm
     * * Return the new options.
     *
     * @type {function}
     * @public
     */
    @api
    get search() {
        return this._search;
    }
    set search(value) {
        this._search =
            typeof value === 'function' ? value : this._computeSearch;
    }

    /**
     * If present, it is not possible to clear a selected option using the input clear icon.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get hideClearIcon() {
        return this._hideClearIcon;
    }
    set hideClearIcon(value) {
        this._hideClearIcon = normalizeBoolean(value);
    }

    /**
     * Represents the validity states that an element can be in, with respect to constraint validation.
     *
     * @type {string}
     * @public
     */
    @api
    get validity() {
        return this._constraint.validity;
    }

    /**
     * Array of selected options value. If is-multi-select is false and several values are passed, only the first one will be taken into account.
     *
     * @type {string[]}
     * @public
     */
    @api
    get value() {
        return this._value;
    }
    set value(value) {
        this._value =
            typeof value === 'string' || typeof value === 'number'
                ? [value]
                : [...normalizeArray(value)];

        if (this._connected) {
            this._initValue();
        }
    }

    /**
     * The variant changes the appearance of the combobox.
     * Accepted variants include standard, label-hidden, label-inline, and label-stacked.
     * This value defaults to standard. Use label-hidden to hide the label but make it available to assistive technology.
     * Use label-inline to horizontally align the label and combobox.
     * Use label-stacked to place the label above the combobox.
     *
     * @type {string}
     * @default standard
     * @public
     */
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

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Returns true as a string if dropdown-visible is true and false as a string if false.
     *
     * @type {string}
     */
    get computedAriaExpanded() {
        return this.dropdownVisible ? 'true' : 'false';
    }

    /**
     * Returns none if this.readOnly or this.disabled is present and list if not.
     *
     * @type {string}
     */
    get computedAriaAutocomplete() {
        return this.readOnly || this.disabled ? 'none' : 'list';
    }

    /**
     * Computed Dropdown Trigger Class styling.
     *
     * @type {string}
     */
    get computedDropdownTriggerClass() {
        return classSet(
            'slds-is-relative slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click combobox__dropdown-trigger'
        )
            .add({
                'slds-is-open': this.dropdownVisible,
                'slds-has-icon-only slds-combobox_container':
                    this.showInputValueIcon
            })
            .toString();
    }

    /**
     * Computed Dropdown Class styling.
     *
     * @type {string}
     */
    get computedDropdownClass() {
        return classSet(
            'slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid avonni-primitive-combobox__dropdown'
        )
            .add({
                'slds-dropdown_left':
                    this.dropdownAlignment === 'left' ||
                    this.dropdownAlignment === 'auto',
                'slds-dropdown_center': this.dropdownAlignment === 'center',
                'slds-dropdown_right': this.dropdownAlignment === 'right',
                'slds-dropdown_bottom':
                    this.dropdownAlignment === 'bottom-center',
                'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right':
                    this.dropdownAlignment === 'bottom-right',
                'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left':
                    this.dropdownAlignment === 'bottom-left'
            })
            .toString();
    }

    /**
     * Computed Hide options Until Search value.
     *
     * @type {boolean}
     */
    get computedHideOptionsUntilSearch() {
        return this.allowSearch && this.hideOptionsUntilSearch;
    }

    /**
     * Computed Input Container Class styling.
     *
     * @type {string}
     */
    get computedInputContainerClass() {
        return classSet('slds-combobox__form-element slds-input-has-icon')
            .add({
                'slds-input-has-icon_left-right avonni-primitive-combobox__input-has-icon_left-right':
                    this.showInputValueAvatar || this.showInputValueIcon,
                'slds-input-has-icon_right':
                    !this.showInputValueAvatar && !this.showInputValueIcon
            })
            .toString();
    }

    /**
     * Computed Label Class styling.
     *
     * @type {string}
     */
    get computedLabelClass() {
        return classSet('slds-form-element__label')
            .add({ 'slds-assistive-text': this.variant === 'label-hidden' })
            .toString();
    }

    /**
     * Gets FieldConstraintApi.
     *
     * @type {object}
     */
    get _constraint() {
        if (!this._constraintApi) {
            this._constraintApi = new FieldConstraintApi(() => this, {
                valueMissing: () =>
                    !this.disabled && this.required && this.value.length === 0,
                badInput: () => this.hasBadInput,
                rangeOverflow: () =>
                    this.selectedOptions.length > this.max &&
                    this.isMultiSelect,
                rangeUnderflow: () =>
                    this.selectedOptions.length < this.min && this.isMultiSelect
            });
        }
        return this._constraintApi;
    }

    /**
     * True if parent-options-values and current parent.
     *
     * @type {boolean}
     */
    get currentParent() {
        return (
            this.parentOptionsValues.length &&
            this._getOption(
                this.parentOptionsValues[this.parentOptionsValues.length - 1]
            )
        );
    }

    /**
     * Returns a dropdown element.
     *
     * @type {element}
     */
    get dropdown() {
        return this.template.querySelector('[data-element-id="div-dropdown"]');
    }

    /**
     * Returns a unique ID.
     *
     * @type {string}
     */
    get generateKey() {
        return generateUUID();
    }

    get groupElements() {
        return this.template.querySelectorAll(
            '[data-element-id="avonni-primitive-combobox-group"]'
        );
    }

    /**
     * Returns a boolean indicating if the value is valid or not.
     *
     * @type {boolean}
     */
    get hasBadInput() {
        return this.value.some((value) => value && !this._getOption(value));
    }

    /**
     * True if allow-search is false.
     *
     * @type {boolean}
     */
    get hasNoSearch() {
        return !this.allowSearch;
    }

    /**
     * Highlighted option HTML element.
     *
     * @type {HTMLElement}
     */
    get highlightedOption() {
        return (
            this.optionElements.length &&
            this.optionElements[this._highlightedOptionIndex]
        );
    }

    /**
     * Returns an input element.
     *
     * @type {element}
     */
    get input() {
        return this.template.querySelector('[data-element-id="input"]');
    }

    /**
     * Returns an icon name for the input depending on allow-search attribute.
     *
     * @type {string}
     */
    get inputIconName() {
        return this.allowSearch ? 'utility:search' : 'utility:down';
    }

    /**
     * True if disabled or read-only are true.
     *
     * @type {boolean}
     */
    get inputIsDisabled() {
        return this.disabled || this.readOnly;
    }

    /**
     * Returns a list element.
     *
     * @type {element}
     */
    get list() {
        return this.template.querySelector('[data-element-id="ul-listbox"]');
    }

    /**
     * Maximum height of the dropdown, so it doesn't overflow the window.
     *
     * @type {number}
     */
    get maxDropdownHeight() {
        if (!this.dropdown) {
            return 0;
        }
        const maxHeightBeforeOverflow =
            window.innerHeight - this.dropdown.getBoundingClientRect().top - 20;

        return maxHeightBeforeOverflow < MIN_DROPDOWN_HEIGHT
            ? MIN_DROPDOWN_HEIGHT
            : maxHeightBeforeOverflow;
    }

    /**
     * Returns an array of options element.
     *
     * @type {element}
     */
    get optionElements() {
        if (this.dropdownVisible) {
            const elements = [];
            const topActions = this.template.querySelectorAll(
                '[data-group-name="actions"][data-position="top"]'
            );
            topActions.forEach((action) => {
                if (action.dataset.ariaDisabled === 'false') {
                    elements.push(action);
                }
            });

            this.groupElements.forEach((group) => {
                elements.push(
                    group.optionElements.filter(
                        (option) => option.dataset.ariaDisabled === 'false'
                    )
                );
            });

            const bottomActions = this.template.querySelectorAll(
                '[data-group-name="actions"][data-position="bottom"]'
            );
            bottomActions.forEach((action) => {
                if (action.dataset.ariaDisabled === 'false') {
                    elements.push(action);
                }
            });

            return elements.flat();
        }
        return [];
    }

    /**
     * True if read-only and is-multi-select is false.
     *
     * @type {boolean}
     */
    get readOnlyNotMultiSelect() {
        return this.readOnly && !this.isMultiSelect;
    }

    /**
     * True if value is valid returns the input value, if else return the value.
     *
     * @type {string}
     */
    get readOnlyValue() {
        return this.validity.valid ? this.inputValue : '';
    }

    /**
     * True if hide-clear-input is false and the input has a value.
     *
     * @type {boolean}
     */
    get showClearInputIcon() {
        return !this.hideClearIcon && this.inputValue !== '';
    }

    /**
     * If true, display value avatar.
     *
     * @type {boolean}
     */
    get showInputValueAvatar() {
        return (
            this.selectedOption &&
            !this.selectedOption.iconName &&
            this.inputValue === this.selectedOption.label &&
            (this.selectedOption.avatarSrc ||
                this.selectedOption.avatarFallbackIconName)
        );
    }

    /**
     * If true, display value icon.
     *
     * @type {boolean}
     */
    get showInputValueIcon() {
        return this.selectedOption && this.selectedOption.iconName;
    }

    /**
     * True if input-value and no visible-options.
     *
     * @type {boolean}
     */
    get showNoSearchResultMessage() {
        return (
            !this._isSearching &&
            !this.showEndLoader &&
            !this._computedOptions.length
        );
    }

    get topActionsHeight() {
        const topActions = this.template.querySelectorAll(
            '[data-group-name="actions"][data-position="top"]'
        );
        return getListHeight(topActions);
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Removes focus from the input.
     *
     * @public
     */
    @api
    blur() {
        if (this.input) this.input.blur();
    }

    /**
     * Checks if the input is valid.
     *
     * @returns {boolean} True if the element meets all constraint validations.
     * @public
     */
    @api
    checkValidity() {
        return this._constraint.checkValidity();
    }

    /**
     * Closes the dropdown.
     *
     * @public
     */
    @api
    close() {
        this._searchTerm = '';
        this._resetVisibleOptions();

        if (this.dropdownVisible) {
            this.dropdownVisible = false;
            this._stopDropdownPositioning();

            if (this.isMultiSelect) {
                this.resetLevel();
            } else {
                this._initComputedOptions();
            }
        }
    }

    /**
     * Sets focus on the input.
     *
     * @public
     */
    @api
    focus() {
        if (this.input) this.input.focus();
    }

    /**
     * Opens the dropdown.
     *
     * @public
     */
    @api
    open() {
        const hasItems =
            this.options.length || this.actions.length || this.backLink;
        if (
            !this.inputIsDisabled &&
            !this.dropdownVisible &&
            (hasItems || this.isLoading || this.enableInfiniteLoading)
        ) {
            this.dropdownVisible = true;
            requestAnimationFrame(() => {
                this._startDropdownAutoPositioning();
            });
        }
    }

    /**
     * Handles the removal of a selected option.
     * Dispatches change event.
     *
     * @param {string} value Value of the option to remove.
     * @public
     */
    @api
    removeSelectedOption(value) {
        const selectedOption = this._getOption(value);
        selectedOption.selected = false;

        this._computeSelection();
        this._value = this.selectedOptions.map((option) => option.value);
        this._initComputedOptions();
        this.dispatchChange('unselect', selectedOption.levelPath);
    }

    /**
     * Displays the error messages. If the input is valid, <code>reportValidity()</code> clears displayed error messages.
     *
     * @returns {boolean} False if invalid, true if valid.
     * @public
     */
    @api
    reportValidity() {
        return this._constraint.reportValidity((message) => {
            this.helpMessage = message;
        });
    }

    /**
     * Reset the combobox to the first options level.
     *
     * @public
     */
    @api
    resetLevel() {
        this._resetVisibleOptions();
        this._initComputedOptions();
        this.parentOptionsValues = [];
        this.backLink = undefined;
        this.showEndLoader = this.isLoading;
        this.showStartLoader = false;
    }

    /**
     * Sets a custom error message to be displayed when a form is submitted.
     *
     * @param {string} message The string that describes the error. If message is an empty string, the error message is reset.
     * @public
     */
    @api
    setCustomValidity(message) {
        this._constraint.setCustomValidity(message);
    }

    /**
     * Displays error messages on invalid fields.
     * An invalid field fails at least one constraint validation and returns false when <code>checkValidity()</code> is called.
     *
     * @public
     */
    @api
    showHelpMessageIfInvalid() {
        this.reportValidity();
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Computing the actions.
     */
    _computeActions(actions = this._actions) {
        this.topActions = [];
        this.bottomActions = [];
        this._actions = [];
        const nbOfResults = this._computedOptions.length;

        actions.forEach((action) => {
            const actionObject = new Action(
                action,
                this._searchTerm,
                nbOfResults
            );
            this._actions.push(actionObject);

            if (actionObject.position === 'bottom') {
                this.bottomActions.push(actionObject);
            } else {
                this.topActions.push(actionObject);
            }
        });

        this._sortFixedActions(this.topActions, 'first');
        this._sortFixedActions(this.bottomActions);
    }

    /**
     * Computing the groups.
     */
    _computeGroups() {
        const computedGroups = [];

        // For each visible option
        this._visibleOptions.forEach((option) => {
            const optionGroups = option.groups;
            let currentLevelGroups = computedGroups;

            if (optionGroups.length && this.groups.length > 1) {
                // For each group of the option
                optionGroups.forEach((name, index) => {
                    // If groups are nested
                    if (this.multiLevelGroups) {
                        // We push the option only if we have reached the deepest group
                        currentLevelGroups = normalizeArray(
                            this._groupOption({
                                groups: currentLevelGroups,
                                name,
                                option:
                                    index === optionGroups.length - 1
                                        ? option
                                        : undefined
                            })
                        );
                    } else {
                        this._groupOption({
                            groups: computedGroups,
                            name,
                            option
                        });
                    }
                });
            } else {
                // If the option does not have groups,
                // push the option in the default group
                this._groupOption({
                    groups: computedGroups,
                    option,
                    name: DEFAULT_GROUP_NAME
                });
            }
        });

        this._sortGroups(computedGroups);
        this.computedGroups = computedGroups;
    }

    /**
     * Search function.
     *
     * @param {object} params The search term and an array of the options
     * @returns {array} Array of options that includes the search term
     */
    _computeSearch(params) {
        const { options, searchTerm } = params;
        return options.filter((option) => {
            return String(option.label)
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        });
    }

    /**
     * Computes the selected options.
     */
    _computeSelection() {
        this.selectedOptions = this._getSelectedOptions();
        this.selectedOptions.sort((a, b) => {
            // Sort the selected options by their position in the value
            const indexA = this.value.indexOf(a.value);
            const indexB = this.value.indexOf(b.value);
            return indexA - indexB;
        });

        this.dispatchEvent(
            new CustomEvent('privateselect', {
                detail: { selectedOptions: this.selectedOptions }
            })
        );
    }

    /**
     * Find an option from its value.
     *
     * @param {string} value Unique value of the option to find.
     * @param {array} options Array of options.
     * @returns {object} option
     */
    _getOption(value, options = this.options) {
        let option = options.find((opt) => {
            return (
                opt.value &&
                (value || value === 0) &&
                opt.value.toString() === value.toString()
            );
        });

        // Search deeper levels
        let i = 0;
        while (!option && i < options.length) {
            const childrenOptions = options[i].options;
            if (childrenOptions.length) {
                option = this._getOption(value, childrenOptions);
            }
            i += 1;
        }

        return option;
    }

    /**
     * Return an array of all selected options.
     *
     * @param {array} options Array of all the options
     * @returns {array} Array of all selected options
     */
    _getSelectedOptions(options = this.options) {
        const selectedOptions = [];
        options.forEach((option) => {
            if (option.selected) selectedOptions.push(option);

            const childrenOptions = normalizeArray(option.options);
            if (childrenOptions.length) {
                selectedOptions.push(this._getSelectedOptions(childrenOptions));
            }
        });

        return selectedOptions.flat();
    }

    /**
     * Finds a group based on its name, and adds an option to its list.
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
    _groupOption(params) {
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
            if (name === DEFAULT_GROUP_NAME) this._sortGroups(groups);

            return newGroup.groups;
        }
        // If the group is not in the global groups list,
        // push the option in the default group
        this._groupOption({
            groups,
            option,
            name: DEFAULT_GROUP_NAME
        });
    }

    /**
     * Hightlights the option with focus on.
     *
     * @param {number} index index of the option with focus on.
     */
    _highlightOption(index) {
        if (!this.optionElements[index]) return;

        if (this.highlightedOption) {
            this.highlightedOption.classList.remove(
                'avonni-primitive-combobox__option_focused'
            );
        }
        this._highlightedOptionIndex = index;

        if (this.highlightedOption) {
            this.highlightedOption.classList.add(
                'avonni-primitive-combobox__option_focused'
            );
            this.list.setAttribute(
                'aria-activedescendant',
                normalizeAriaAttribute(this.highlightedOption.id)
            );
        }
    }

    _initComputedOptions() {
        const options = this.currentParent
            ? this.currentParent.options
            : this.options;
        this._computedOptions = this.removeSelectedOptions
            ? this._removeSelectedOptionsFrom(options)
            : options;

        if (this._searchTerm) {
            this._computedOptions = this.search({
                searchTerm: this._searchTerm,
                options: this._computedOptions
            });
        }

        this._initVisibleOptions();
    }

    /**
     * Option's object initialization.
     */
    _initOptionObjects(options, levelPath = []) {
        const optionObjects = [];
        options.forEach((option, index) => {
            const optionLevelPath = levelPath.concat(index);
            const optionObject = new Option(option, optionLevelPath);

            // If the option has children, generate objects for them too
            const childrenOptions = normalizeArray(option.options);
            if (childrenOptions.length) {
                optionObject.options = this._initOptionObjects(
                    childrenOptions,
                    optionLevelPath
                );
            }

            optionObjects.push(optionObject);
        });
        return optionObjects;
    }

    /**
     * Value initialization.
     */
    _initValue() {
        if (this.selectedOption) {
            this.selectedOption.selected = false;
            this.selectedOption = undefined;
        }

        if (this.isMultiSelect) {
            this.selectedOptions.forEach((option) => {
                option.selected = false;
            });
            this.value.forEach((value) => {
                const selectedOption = this._getOption(value, this.options);
                if (selectedOption) selectedOption.selected = true;
            });
            this.selectedOption = undefined;
            this.inputValue = this._searchTerm;
            this._computeSelection();
        } else {
            const selectedOption = this._getOption(this.value[0], this.options);
            this.inputValue = '';

            if (selectedOption) {
                selectedOption.selected = true;
                this.selectedOption = selectedOption;
                this.inputValue = selectedOption.label;
            }

            if (this._searchTerm) {
                // Filter the options if there is a search term
                this.inputValue = this._searchTerm;
                this.search({
                    searchTerm: this._searchTerm,
                    options:
                        (this.currentParent && this.currentParent.options) ||
                        this.options
                });
            }
        }
    }

    _initVisibleOptions() {
        const nbOptions = this._computedOptions.length;
        if (!this.enableInfiniteLoading) {
            this._startIndex = 0;
            this._endIndex = nbOptions;
        }

        this._visibleOptions = this._computedOptions.slice(
            Math.max(this._startIndex, 0),
            this._endIndex
        );

        this._computeGroups();
    }

    /**
     * Removes selected options from the options array.
     *
     * @param {array} options Array of all the options
     * @returns {array} Array of all unselected options
     */
    _removeSelectedOptionsFrom(options, levelPath = []) {
        const unselectedOptions = [];
        options.forEach((option, index) => {
            if (option.options.length) {
                const optionLevelPath = levelPath.concat(index);
                const computedOption = new Option(option, optionLevelPath);
                computedOption.options = this._removeSelectedOptionsFrom(
                    computedOption.options,
                    optionLevelPath
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

    _resetVisibleOptions() {
        this._startIndex = 0;
        this._endIndex = MAX_LOADED_OPTIONS;
    }

    _scrollToTopVisibleOption() {
        if (!this.list) {
            return;
        }
        let previousTopOption;
        const { offset, value } = this._topVisibleOption;
        const groups = this.groupElements;

        for (let i = 0; i < groups.length; i++) {
            const options = groups[i].optionElements;
            const option = options.find((o) => o.dataset.value === value);
            if (option) {
                previousTopOption = option;
                break;
            }
        }
        if (previousTopOption) {
            this.list.scrollTop = previousTopOption.offsetTop + offset;
        }
        this._highlightOption(this._highlightedOptionIndex);
        this._topVisibleOption = null;
    }

    _setOptions(value) {
        const options = normalizeArray(value);
        if (equal(this._originalOptions, options)) {
            return;
        }
        this._originalOptions = deepCopy(options);
        this._options = this._initOptionObjects(options);

        if (this._connected) {
            this._initValue();
            this._initComputedOptions();

            this.showStartLoader = false;
            this.showEndLoader =
                this.currentParent && !this.enableInfiniteLoading
                    ? this.currentParent.isLoading
                    : this.isLoading;
        }
    }

    /**
     * Show or hide the loaders.
     *
     * @param {boolean} loadDown If true, show the end loader. If false, show the start loader.
     */
    _showLoaders(loadDown) {
        this.showStartLoader = !loadDown;
        this.showEndLoader = loadDown;
        const topOption = this._topVisibleOption
            ? { ...this._topVisibleOption }
            : undefined;

        clearTimeout(this._scrollTimeout);
        this._scrollTimeout = setTimeout(() => {
            this._topVisibleOption = topOption;
            this.showStartLoader = false;
            this.showEndLoader =
                this.currentParent && !this.enableInfiniteLoading
                    ? this.currentParent.isLoading
                    : this.isLoading;
            this._highlightOption(this._highlightedOptionIndex);
        }, 0);
    }

    /**
     * Place the fixed actions first or last in an array of action objects. Used to make sure items actual order matches the visual order.
     *
     * @param {object[]} actions Array of actions to sort.
     * @param {string} position Position of the fixecd actions in the array.
     */
    _sortFixedActions(actions, position) {
        const fixedFirst = position === 'first';

        actions.sort((a, b) => {
            if (a.fixed && !b.fixed) {
                return fixedFirst ? -1 : 1;
            } else if (!a.fixed && b.fixed) {
                return fixedFirst ? 1 : -1;
            }
            return 0;
        });
    }

    /**
     * Move the default group at the top.
     */
    _sortGroups(groups) {
        const defaultGroupIndex = groups.findIndex(
            (group) => group.name === DEFAULT_GROUP_NAME
        );
        if (defaultGroupIndex > -1) {
            const defaultGroup = groups.splice(defaultGroupIndex, 1)[0];
            groups.unshift(defaultGroup);
        }
    }

    /**
     * Positioning for the dropdown.
     */
    _startDropdownAutoPositioning() {
        if (this.dropdownAlignment !== 'auto') {
            return;
        }

        if (!this._autoPosition) {
            this._autoPosition = new AutoPosition(this);
        }

        this._autoPosition.start({
            target: () => this.input,
            element: () => this.dropdown,
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
                this._visibleOptions.length < 3 ? '2.25rem' : '6.75rem'
        });
    }

    // remove-next-line-for-c-namespace
    _stopDropdownPositioning() {
        if (this._autoPosition) {
            this._autoPosition.stop();
        }
    }

    /**
     * Unselects selected options.
     *
     * @param {array} options Array of all the options
     */
    _unselectOption(options = this.options) {
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
                selectedOption = this._unselectOption(childrenOptions);
            }
            i += 1;
        }
    }

    /**
     * Updates the back link.
     *
     * @param {string} parentLabel
     */
    _updateBackLink(parentLabel) {
        const { label, iconName, fixed, position, disabled } = this.backAction;

        this.backLink = new Action({
            disabled,
            fixed,
            iconName,
            label: typeof label === 'string' ? label : parentLabel,
            name: 'backlink',
            position
        });
    }

    /**
     * Calculating the dropdown's height.
     */
    _updateDropdownHeight() {
        const groups = this.groupElements;
        const visibleItems = [];
        const visibleGroupTitles = [];

        // As long as we haven't reach the maximum visible options or the end of the groups,
        // get the next group options and title
        let i = 0;
        while (
            visibleItems.flat().length < this._maxVisibleOptions &&
            i < groups.length
        ) {
            const options = groups[i].optionElements;
            visibleItems.push(options);

            const title = groups[i].titleElement;
            if (title) visibleGroupTitles.push(title);
            i += 1;
        }
        // Add the loading spinner as an option
        const loadingSpinner = this.template.querySelector(
            '[data-element-id="li-loading-spinner"]'
        );
        if (loadingSpinner) {
            visibleItems.push(loadingSpinner);
        }

        // Add the empty option message as an option
        const emptyMessage = this.template.querySelector(
            '[data-element-id="li-no-matches"]'
        );
        if (emptyMessage) {
            visibleItems.push(emptyMessage);
        }

        // Height of the visible options, according to the dropdown length
        const optionsHeight = getListHeight(
            visibleItems.flat(),
            this._maxVisibleOptions
        );

        // Height of the title groups
        const titlesHeight = getListHeight(visibleGroupTitles);

        // If we can see all options, add the height of the bottom actions
        let bottomActionsHeight = 0;
        if (this._visibleOptions.length <= this._maxVisibleOptions) {
            const bottomActions = this.template.querySelectorAll(
                '[data-group-name="actions"][data-position="bottom"]'
            );
            bottomActionsHeight = getListHeight(bottomActions);
        }

        let height =
            optionsHeight +
            titlesHeight +
            this.topActionsHeight +
            bottomActionsHeight;

        const maxHeight = this.maxDropdownHeight;
        if (height > maxHeight) {
            height = maxHeight;
        }

        // Do not set the height when there is no actions or options
        // (for example 0 search results or is loading)
        if (height) {
            this.dropdown.style.height = `${height + 5}px`;
        }

        this._updateFixedActionsHeight();
    }

    /**
     * Updates the visibility of the dropdown menu.
     */
    _updateDropdownMenuVisibility() {
        if (this.keepOpenOnSelect) {
            this.computedGroups = [...this.computedGroups];
        } else {
            this.close();
            this.dispatchClose();
        }
        this.focus();
    }

    /**
     * Position the fixed actions and add their height to the listbox padding, to leave room for them in their original position.
     */
    _updateFixedActionsHeight() {
        if (!this.list) return;

        let offset = 0;
        const fixedTopActions = Array.from(
            this.template.querySelectorAll(
                '[data-group-name="actions"][data-position="top"][data-fixed="true"]'
            )
        );
        fixedTopActions.forEach((action) => {
            action.style.top = `${offset}px`;
            offset += action.offsetHeight;
        });

        this.list.style.paddingTop = `${offset}px`;

        offset = 0;
        const fixedBottomActions = Array.from(
            this.template.querySelectorAll(
                '[data-group-name="actions"][data-position="bottom"][data-fixed="true"]'
            )
        );
        fixedBottomActions.reverse().forEach((action) => {
            action.style.bottom = `${offset}px`;
            offset += action.offsetHeight;
        });

        this.list.style.paddingBottom = `${offset}px`;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Handles the click on action.
     * Dispatches actionclick event.
     * Closes the dropdown.
     *
     * @param {event} event If clicked with mouse we receive the event
     * @param {string} name If clicked with keyboard we receive the name
     */
    handleActionClick(eventOrName) {
        // If the action is "clicked" through a keyboard event, the argument will be the name
        let name;
        if (typeof eventOrName === 'string') {
            name = eventOrName;
        } else {
            if (eventOrName.currentTarget.dataset.ariaDisabled === 'true') {
                this.focus();
                return;
            }
            name = eventOrName.currentTarget.dataset.name;
        }

        /**
         * The event fired when a user clicks on an action.
         *
         * @event
         * @name actionclick
         * @param {string} name The name of the action clicked.
         * @bubbles
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name
                },
                bubbles: true
            })
        );

        this.close();
        this.dispatchClose();
        this.focus();
        this._computeActions();
    }

    /**
     * Handles the back link click.
     */
    handleBackLinkClick() {
        const parents = this.parentOptionsValues;
        parents.pop();
        this._resetVisibleOptions();

        if (parents.length) {
            this._updateBackLink(this.currentParent.label);
            this._initComputedOptions();
            this.showEndLoader = this.currentParent.isLoading;
        } else {
            this._initComputedOptions();
            this.backLink = undefined;
            this.showEndLoader = this.isLoading;
        }

        this.showStartLoader = false;
        this.focus();
        this.dispatchEvent(new CustomEvent('backactionclick'));
    }

    /**
     * If selected-option and input-value = '' closes the dropdown.
     * Dispatches blur event.
     */
    handleBlur() {
        if (this._cancelBlur) {
            return;
        }
        if (this.selectedOption) {
            this.inputValue = this.selectedOption.label;
        } else {
            this.inputValue = '';
        }
        if (this._searchTerm) {
            this._searchTerm = '';
            this.handleSearch();
        }

        if (this.dropdownVisible) {
            this.close();
            this.dispatchClose();
        }

        this.interactingState.leave();
        this.dispatchEvent(new CustomEvent('blur'));
    }

    /**
     * Clears the input value.
     * Dispatches change event.
     */
    handleClearInput(event) {
        event.stopPropagation();
        if (this.disabled) return;

        this.inputValue = '';
        if (this._searchTerm) {
            this._searchTerm = '';
            this.handleSearch();
        }

        // Clear the value
        if (!this.isMultiSelect && this.selectedOption) {
            const levelPath = this.selectedOption.levelPath;
            this.selectedOption.selected = false;
            this.selectedOption = undefined;
            this._computeSelection();
            this._value = this.selectedOptions.map((option) => option.value);
            this.dispatchChange('unselect', levelPath);
        }

        this.resetLevel();
        this.focus();
    }

    /**
     * Handles a mouse press down on the dropdown.
     *
     * @param {Event} event
     */
    handleDropdownMouseDown(event) {
        const mainButton = 0;
        if (event.button === mainButton) {
            this._cancelBlur = true;
        }
    }

    /**
     * Sets cancelBlur to false on mouseup on dropdown.
     */
    handleDropdownMouseUp() {
        // We need this to make sure that if a scrollbar is being dragged with the mouse, upon release
        // of the drag we allow blur, otherwise the dropdown would not close on blur since we'd have cancel blur set
        this._cancelBlur = false;
    }

    /**
     * Dispatches focus event.
     */
    handleFocus() {
        this.interactingState.enter();
        this.dispatchEvent(new CustomEvent('focus'));
    }

    /**
     * Handles the click on highlighted options.
     */
    handleHighlightedOptionClick(event) {
        // If the search is allowed, the options have to be selected with enter
        if (this.allowSearch && (event.key === ' ' || event.key === 'Spacebar'))
            return;

        if (this.highlightedOption.dataset.value) {
            this.handleOptionClick(event);
        } else if (this.highlightedOption.dataset.name === 'backlink') {
            this.handleBackLinkClick();
        } else {
            this.handleActionClick(this.highlightedOption.dataset.name);
        }
    }

    /**
     * Handles the input for the search function.
     * Dispatches search event.
     */
    handleInput(event) {
        this._searchTerm = event.currentTarget.value;
        this.inputValue = this._searchTerm;
        this.handleSearch();

        // Update dropdown visibility when hideOptionsUntilSearch is present.
        if (this.computedHideOptionsUntilSearch) {
            if (!this.inputValue && this.dropdownVisible) {
                this.close();
                this.dispatchClose();
            } else if (this.inputValue && !this.dropdownVisible) {
                this.open();
                this.dispatchOpen();
            }
        }
    }

    /**
     * Handles the input key down.
     * If dropdown is closed, opens it and dispatch open event.
     */
    handleInputKeyDown(event) {
        if (!this.dropdownVisible) {
            this.open();
            this.dispatchOpen();
        } else {
            const index = this._highlightedOptionIndex;
            switch (event.key) {
                case 'ArrowUp':
                    if (index > 0) {
                        const option = this.optionElements[index - 1];
                        if (isOutsideOfView(option, this.list)) {
                            const optionTop =
                                option.getBoundingClientRect().top;
                            const top = this.list.scrollTop;
                            this.list.scrollTop = top - optionTop;
                        }
                        this._highlightOption(index - 1);
                    } else if (!this.showStartLoader) {
                        this._highlightOption(this.optionElements.length - 1);
                    }
                    // Prevent the browser scrollbar from scrolling up
                    event.preventDefault();
                    break;
                case 'ArrowDown':
                    if (index < this.optionElements.length - 1) {
                        const option = this.optionElements[index + 1];

                        if (isOutsideOfView(option, this.list)) {
                            const top = this.list.scrollTop;
                            const optionBottom = option.offsetHeight;
                            this.list.scrollTop = top + optionBottom;
                        }
                        this._highlightOption(index + 1);
                    } else if (!this.showEndLoader) {
                        this._highlightOption(0);
                    }
                    // Prevent the browser scrollbar from scrolling down
                    event.preventDefault();
                    break;
                case 'ArrowLeft':
                case 'GoBack':
                    this.handleBackLinkClick();
                    break;
                case ' ':
                case 'Spacebar':
                case 'Enter':
                    this.handleHighlightedOptionClick(event);

                    if (
                        !this.allowSearch &&
                        (event.key === ' ' || event.key === 'Spacebar')
                    ) {
                        // Prevent the browser scrollbar from scrolling down
                        event.preventDefault();
                    }
                    break;
                case 'Escape':
                    this.close();
                    this.dispatchClose();
                    break;
                case 'Home':
                    this._highlightOption(0);
                    break;
                case 'End':
                    this._highlightOption(this.optionElements - 1);
                    break;
                default:
                // do nothing
            }
        }
    }

    /**
     * Handles the click on option.
     * Dispatches change event.
     * Closes the dropdown.
     *
     * @param {event} event click event
     */
    handleOptionClick(event) {
        event.stopPropagation();

        const selectedOption = this._visibleOptions.find((option) => {
            return (
                option.value.toString() === this.highlightedOption.dataset.value
            );
        });

        // If the option has children options, change the visible options
        if (selectedOption.hasChildren) {
            this._resetVisibleOptions();
            this.parentOptionsValues.push(selectedOption.value);
            this._initComputedOptions();
            this._updateBackLink(this.currentParent.label);
            if (selectedOption.isLoading) {
                this.showEndLoader = true;
            }
            this.focus();
            this.showStartLoader = false;
            this._searchTerm = '';

            /**
             * The event fired when an option with nested options has been selected.
             *
             * @event
             * @name levelchange
             * @param {string} optionValue The value of the option clicked.
             * @public
             */
            this.dispatchEvent(
                new CustomEvent('levelchange', {
                    detail: {
                        optionValue: selectedOption.value
                    }
                })
            );

            requestAnimationFrame(() => {
                // Scroll back to top when opening a child option
                if (this.list) {
                    this.list.scrollTop = 0;
                }
            });
            return;
        }

        // Toggle selection
        if (!this.isMultiSelect && !selectedOption.selected) {
            this._unselectOption();
        }
        selectedOption.selected = !selectedOption.selected;

        this._computeSelection();

        this._value = this.selectedOptions.map((option) => option.value);

        if (!this.validity.valid) {
            this.reportValidity();
            if (this.validity.rangeOverflow) {
                if (selectedOption.selected) {
                    selectedOption.selected = false;
                    this._computeSelection();
                    this._value = this.selectedOptions.map(
                        (option) => option.value
                    );
                }
            }
            this._updateDropdownMenuVisibility();
            return;
        }

        // Update the input value
        if (!this.isMultiSelect && selectedOption.selected) {
            this.inputValue = selectedOption.label;
            this.selectedOption = selectedOption;
        } else {
            this.inputValue = '';
            this.selectedOption = undefined;
        }

        const action = selectedOption.selected ? 'select' : 'unselect';
        this.dispatchChange(action, selectedOption.levelPath);
        this._updateDropdownMenuVisibility();
    }

    /**
     * Handles mouse enter on li.
     */
    handleMouseEnter(event) {
        event.stopPropagation();
        if (event.currentTarget.dataset.ariaDisabled === 'true') return;

        // If the mouse enters an option, the id will be sent through an event from the group
        const id = event.detail.id ? event.detail.id : event.currentTarget.id;

        const index = this.optionElements.findIndex((option) => {
            return option.id === id;
        });

        this._highlightOption(index);
    }

    /**
     * Handle a scroll down the drop-down.
     */
    handleScroll() {
        if (
            !this.enableInfiniteLoading ||
            this.showEndLoader ||
            this.showStartLoader ||
            this._isSearching ||
            !this.list
        ) {
            return;
        }

        const { startIndex, endIndex, loadDown, loadMore } = computeScroll({
            list: this.list,
            loadMoreOffset: this.loadMoreOffset,
            nbOptions: this._computedOptions.length,
            previousStartIndex: this._startIndex,
            previousEndIndex: this._endIndex
        });

        if (!isNaN(startIndex) && this._startIndex !== startIndex) {
            this._topVisibleOption = getTopOption({
                list: this.list,
                groupElements: this.groupElements,
                topActionsHeight: this.topActionsHeight
            });

            this._startIndex = startIndex;
            this._endIndex = endIndex;
            const firstOptionValue =
                this._visibleOptions[0] && this._visibleOptions[0].value;
            const nbOptions = this._visibleOptions.length;
            this._initVisibleOptions();
            const optionsHaveChanged =
                firstOptionValue !==
                    (this._visibleOptions[0] &&
                        this._visibleOptions[0].value) ||
                nbOptions !== this._visibleOptions.length;
            if (optionsHaveChanged) {
                this._showLoaders(loadDown);
            }
        }

        if (loadDown && loadMore) {
            this.dispatchLoadMore();
        }
    }

    /**
     * Handle an input in the combobox.
     */
    handleSearch() {
        // Search in the current level of options
        this._resetVisibleOptions();
        this._initComputedOptions();
        this._computeActions();

        clearTimeout(this._searchTimeout);
        this._isSearching = true;
        this._searchTimeout = setTimeout(() => {
            this.dispatchEvent(
                new CustomEvent('search', {
                    detail: {
                        value: this._searchTerm,
                        optionValue: this.currentParent
                            ? this.currentParent.value
                            : null
                    }
                })
            );
            this._isSearching = false;
        }, 500);
    }

    /**
     * Handles the trigger click.
     * If dropdown is closed, it opens it.
     * Dispatches open event.
     */
    handleTriggerClick() {
        if (!this.dropdownVisible && !this.computedHideOptionsUntilSearch) {
            this.open();
            this.dispatchOpen();
        }
    }

    /**
     * Dispatch the change event.
     *
     * @param {string} action Action that fired the event. Valid values are `select` or `unselect`.
     * @param {number[]} levelPath Array of level indexes to get to the option.
     */
    dispatchChange(action, levelPath) {
        this.reportValidity();

        /**
         * The event fired when an option is selected or unselected.
         *
         * @event
         * @name change
         * @param {string} action Type of change made to the value. Options are `select` or `unselect`.
         * @param {number[]} levelPath Array of level indexes to get to the option.
         * @param {string[]} value New value of the primitive combobox.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    action,
                    levelPath,
                    value: this.value
                }
            })
        );
    }

    /**
     * Dispatch the close event.
     */
    dispatchClose() {
        /**
         * The event fired when the drop-down is closed. It is not fired when the drop-down is closed programmatically with the `close()` method.
         *
         * @event
         * @name close
         * @public
         */
        this.dispatchEvent(new CustomEvent('close'));
    }

    dispatchLoadMore() {
        /**
         * The event fired when the infinite loading is enabled, and the user scrolls to the bottom of the dropdown.
         *
         * @event
         * @property {string} optionValue Value of the selected parent option, if any.
         * @property {string} searchTerm Current search term, if any.
         * @name loadmore
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('loadmore', {
                detail: {
                    optionValue: this.currentParent
                        ? this.currentParent.value
                        : null,
                    searchTerm: this._searchTerm
                }
            })
        );
    }

    /**
     * Dispatch the close event.
     */
    dispatchOpen() {
        /**
         * The event fired when the drop-down is closed. It is not fired when the drop-down is closed programmatically with the `close()` method.
         *
         * @event
         * @name close
         * @public
         */
        this.dispatchEvent(new CustomEvent('open'));
    }

    stopPropagation(event) {
        event.stopPropagation();
    }
}
