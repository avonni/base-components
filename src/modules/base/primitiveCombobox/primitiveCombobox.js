import { LightningElement, api } from 'lwc';
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
import { InteractingState, FieldConstraintApi } from 'c/inputUtils';
import { classSet, generateUUID } from 'c/utils';
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
    _hideOptionsUntilSearch = false;
    _isLoading = false;
    _isMultiSelect = false;
    _loadMoreOffset = DEFAULT_LOAD_MORE_OFFSET;
    _loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    _multiLevelGroups = false;
    _options = [];
    _placeholder;
    _readOnly = false;
    _removeSelectedOptions = false;
    _required = false;
    _search = this.computeSearch;
    _hideClearIcon = false;
    _value = [];
    _variant = VARIANTS.default;

    _autoPosition;
    _cancelBlur = false;
    _maxVisibleOptions = Number(DROPDOWN_LENGTHS.default.match(/[0-9]+/)[0]);
    _highlightedOptionIndex = 0;
    _isSearching = false;
    _previousScroll;
    _restoreScrollTimeout;
    _searchTerm = '';
    _searchTimeout;
    _scrollState;
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
    showLoader = false;
    topActions = [];

    connectedCallback() {
        this.initValue();

        if (this.removeSelectedOptions) {
            this.visibleOptions = this.removeSelectedOptionsFrom(
                this.visibleOptions
            );
        }

        this.interactingState = new InteractingState();
        this.interactingState.onleave(() => this.showHelpMessageIfInvalid());
        this._connected = true;
    }

    renderedCallback() {
        if (this.dropdownVisible) {
            this.updateDropdownHeight();
            this.highlightOption(0);

            if (this.enableInfiniteLoading) {
                const list = this.template.querySelector(
                    '[data-element-id="ul-listbox"]'
                );
                if (list && list.scrollTop === 0) {
                    this.handleScroll();
                }
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

        this.sortFixedActions(this.topActions, 'first');
        this.sortFixedActions(this.bottomActions);
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
     * If present, you can load a subset of options and then display more when users scroll to the end of the drop-down. Use with the `loadmore` event handler to retrieve more data.
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

        if (
            this.dropdownVisible &&
            this._enableInfiniteLoading &&
            this.showLoader
        ) {
            this.restoreScroll();
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
        if (this.visibleOptions.length) this.computeGroups();
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
        this.showLoader = this._isLoading;

        if (
            this.dropdownVisible &&
            this.showLoader &&
            this.enableInfiniteLoading
        ) {
            this.restoreScroll();
        }
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
        if (this._connected) this.initValue();
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

        if (this.groups.length && this.visibleOptions.length)
            this.computeGroups();
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
        const options = normalizeArray(value);
        const optionObjects = this.initOptionObjects(options);
        this._options = optionObjects;

        if (this._connected) {
            this.initValue();
            this.visibleOptions = this.currentParent
                ? this.currentParent.options
                : this.options;
            if (this._searchTerm) {
                this.visibleOptions = this.search({
                    options: this.visibleOptions,
                    searchTerm: this._searchTerm
                });
            }
            this.showLoader =
                this.currentParent && !this.enableInfiniteLoading
                    ? this.currentParent.isLoading
                    : this.isLoading;

            if (
                this.dropdownVisible &&
                this.showLoader &&
                this.enableInfiniteLoading
            ) {
                this.restoreScroll();
            }
        } else {
            this.visibleOptions = optionObjects;
        }
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
        this._search = typeof value === 'function' ? value : this.computeSearch;
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
            this.initValue();
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
            this.getOption(
                this.parentOptionsValues[this.parentOptionsValues.length - 1]
            )
        );
    }

    /**
     * Returns a unique ID.
     *
     * @type {string}
     */
    get generateKey() {
        return generateUUID();
    }

    /**
     * Returns a boolean indicating if the value is valid or not.
     *
     * @type {boolean}
     */
    get hasBadInput() {
        return this.value.some((value) => value && !this.getOption(value));
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
    get _highlightedOption() {
        return (
            this._optionElements.length &&
            this._optionElements[this._highlightedOptionIndex]
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
     * Maximum height of the dropdown, so it doesn't overflow the window.
     *
     * @type {number}
     */
    get maxDropdownHeight() {
        const dropdown = this.template.querySelector(
            '[data-element-id="div-dropdown"]'
        );
        if (!dropdown) {
            return 0;
        }
        const maxHeightBeforeOverflow =
            window.innerHeight - dropdown.getBoundingClientRect().top - 20;

        return maxHeightBeforeOverflow < MIN_DROPDOWN_HEIGHT
            ? MIN_DROPDOWN_HEIGHT
            : maxHeightBeforeOverflow;
    }

    /**
     * Returns an array of options element.
     *
     * @type {element}
     */
    get _optionElements() {
        if (this.dropdownVisible) {
            const elements = [];
            const topActions = this.template.querySelectorAll(
                '[data-group-name="actions"][data-position="top"]'
            );
            topActions.forEach((action) => {
                if (action.dataset.ariaDisabled === 'false')
                    elements.push(action);
            });

            const groups = this.template.querySelectorAll(
                '[data-element-id="avonni-primitive-combobox-group"]'
            );
            groups.forEach((group) => {
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
                if (action.dataset.ariaDisabled === 'false')
                    elements.push(action);
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
     * Returns true if the dropdown is scrolled to the end.
     *
     * @type {boolean}
     */
    get scrolledToEnd() {
        const list = this.template.querySelector(
            '[data-element-id="ul-listbox"]'
        );
        const fullHeight = list.scrollHeight;
        const scrolledDistance = list.scrollTop;
        const visibleHeight = list.offsetHeight;
        return (
            visibleHeight + scrolledDistance + this.loadMoreOffset >= fullHeight
        );
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
     * True if input-value and no visible-options.
     *
     * @type {boolean}
     */
    get showNoSearchResultMessage() {
        return (
            !this._isSearching &&
            !this.showLoader &&
            !this.visibleOptions.length
        );
    }

    /**
     * Returns an array of visible options.
     *
     * @type {object[]}
     */
    get visibleOptions() {
        return this._visibleOptions;
    }
    set visibleOptions(value) {
        this._visibleOptions =
            this._connected && this.removeSelectedOptions
                ? this.removeSelectedOptionsFrom(value)
                : value;

        this.computeGroups();
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
        if (this.dropdownVisible) {
            this.dropdownVisible = false;
            this._previousScroll = undefined;
            this.stopDropdownPositioning();

            if (this.isMultiSelect) {
                this.resetLevel();
            } else {
                // Reset to current visible level and erase the search
                this.visibleOptions =
                    (this.currentParent && this.currentParent.options) ||
                    this.options;
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
                this.startDropdownAutoPositioning();
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
        const selectedOption = this.getOption(value);
        selectedOption.selected = false;

        this.computeSelection();
        this._value = this.selectedOptions.map((option) => option.value);
        this.visibleOptions = this.options;
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
        this.visibleOptions = [...this.options];
        this.parentOptionsValues = [];
        this.backLink = undefined;
        this.showLoader = this.isLoading;
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
     * Value initialization.
     */
    initValue() {
        if (this.selectedOption) {
            this.selectedOption.selected = false;
            this.selectedOption = undefined;
        }

        if (this.isMultiSelect) {
            this.selectedOptions.forEach((option) => {
                option.selected = false;
            });
            this.value.forEach((value) => {
                const selectedOption = this.getOption(value, this.options);
                if (selectedOption) selectedOption.selected = true;
            });
            this.selectedOption = undefined;
            this.inputValue = this._searchTerm;
            this.computeSelection();
        } else {
            const selectedOption = this.getOption(this.value[0], this.options);

            if (selectedOption) {
                selectedOption.selected = true;
                this.selectedOption = selectedOption;
                this.inputValue = selectedOption.label;
            } else {
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

    /**
     * Option's object initialization.
     */
    initOptionObjects(options, levelPath = []) {
        const optionObjects = [];
        options.forEach((option, index) => {
            const optionLevelPath = levelPath.concat(index);
            const optionObject = new Option(option, optionLevelPath);

            // If the option has children, generate objects for them too
            const childrenOptions = normalizeArray(option.options);
            if (childrenOptions.length) {
                optionObject.options = this.initOptionObjects(
                    childrenOptions,
                    optionLevelPath
                );
            }

            optionObjects.push(optionObject);
        });
        return optionObjects;
    }

    /**
     * Place the fixed actions first or last in an array of action objects. Used to make sure items actual order matches the visual order.
     *
     * @param {object[]} actions Array of actions to sort.
     * @param {string} position Position of the fixecd actions in the array. Valid values are first and last. Defaults to last.
     */
    sortFixedActions(actions, position) {
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
     * Positioning for the dropdown.
     */
    startDropdownAutoPositioning() {
        if (this.dropdownAlignment !== 'auto') {
            return;
        }

        if (!this._autoPosition) {
            this._autoPosition = new AutoPosition(this);
        }

        this._autoPosition.start({
            target: () =>
                this.template.querySelector('[data-element-id="input"]'),
            element: () =>
                this.template.querySelector('[data-element-id="div-dropdown"]'),
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

    /**
     * Calculating the dropdown's height.
     */
    updateDropdownHeight() {
        const groups = this.template.querySelectorAll(
            '[data-element-id^="avonni-primitive-combobox-group"]'
        );
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

        // Height of the top actions
        const topActions = this.template.querySelectorAll(
            '[data-group-name="actions"][data-position="top"]'
        );
        const topActionsHeight = getListHeight(topActions);

        // If we can see all options, add the height of the bottom actions
        let bottomActionsHeight = 0;
        if (this.visibleOptions.length <= this._maxVisibleOptions) {
            const bottomActions = this.template.querySelectorAll(
                '[data-group-name="actions"][data-position="bottom"]'
            );
            bottomActionsHeight = getListHeight(bottomActions);
        }

        const dropdown = this.template.querySelector(
            '[data-element-id="div-dropdown"]'
        );
        let height =
            optionsHeight +
            titlesHeight +
            topActionsHeight +
            bottomActionsHeight;

        const maxHeight = this.maxDropdownHeight;
        if (height > maxHeight) {
            height = maxHeight;
        }

        // Do not set the height when there is no actions or options
        // (for example 0 search results or is loading)
        if (height) {
            dropdown.style.height = `${height + 5}px`;
        }

        this.updateFixedActionsHeight();
    }

    /**
     * Computing the groups.
     */
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

    /**
     * Move the default group at the top.
     */
    sortGroups(groups) {
        const defaultGroupIndex = groups.findIndex(
            (group) => group.name === DEFAULT_GROUP_NAME
        );
        if (defaultGroupIndex > -1) {
            const defaultGroup = groups.splice(defaultGroupIndex, 1)[0];
            groups.unshift(defaultGroup);
        }
    }

    /**
     * Computes the selected options.
     */
    computeSelection() {
        this.selectedOptions = this.getSelectedOptions();
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
     * Search function.
     *
     * @param {object} params The search term and an array of the options
     * @returns {array} Array of options that includes the search term
     */
    computeSearch(params) {
        const { options, searchTerm } = params;
        return options.filter((option) => {
            return String(option.label)
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        });
    }

    /**
     * Removes selected options from the options array.
     *
     * @param {array} options Array of all the options
     * @returns {array} Array of all unselected options
     */
    removeSelectedOptionsFrom(options, levelPath = []) {
        const unselectedOptions = [];
        options.forEach((option, index) => {
            if (option.options.length) {
                const optionLevelPath = levelPath.concat(index);
                const computedOption = new Option(option, optionLevelPath);
                computedOption.options = this.removeSelectedOptionsFrom(
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

    /**
     * Restore the scroll position to prevent a jump when the loading spinner appears, or more options are loaded.
     */
    restoreScroll() {
        const list = this.template.querySelector(
            '[data-element-id="ul-listbox"]'
        );
        if (!list) {
            return;
        }

        const hasScrolled = list.scrollTop !== 0;
        if (hasScrolled) {
            // We make sure the scroll is restored only once,
            // to the position it had before all renders
            if (!this._scrollState) {
                this._scrollState = {
                    position: list.scrollTop,
                    isAtEnd: this.scrolledToEnd
                };
            }

            clearTimeout(this._restoreScrollTimeout);
            this._restoreScrollTimeout = setTimeout(() => {
                const { isAtEnd, position } = this._scrollState;
                list.scrollTop = isAtEnd ? list.scrollHeight : position;
                this._scrollState = null;
            }, 0);
        }
    }

    /**
     * Unselects selected options.
     *
     * @param {array} options Array of all the options
     */
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

    /**
     * Return an array of all selected options.
     *
     * @param {array} options Array of all the options
     * @returns {array} Array of all selected options
     */
    getSelectedOptions(options = this.options) {
        const selectedOptions = [];
        options.forEach((option) => {
            if (option.selected) selectedOptions.push(option);

            const childrenOptions = normalizeArray(option.options);
            if (childrenOptions.length) {
                selectedOptions.push(this.getSelectedOptions(childrenOptions));
            }
        });

        return selectedOptions.flat();
    }

    /**
     * Find an option from its value.
     *
     * @param {string} value Unique value of the option to find.
     * @param {array} options Array of options.
     * @returns {object} option
     */
    getOption(value, options = this.options) {
        let option = options.find((opt) => {
            return (
                (value || value === 0) &&
                opt.value.toString() === value.toString()
            );
        });

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

    /**
     * Hightlights the option with focus on.
     *
     * @param {number} index index of the option with focus on.
     */
    highlightOption(index) {
        if (!this._optionElements[index]) return;

        if (this._highlightedOption)
            this._highlightedOption.classList.remove(
                'avonni-primitive-combobox__option_focused'
            );
        this._highlightedOptionIndex = index;
        this._highlightedOption.classList.add(
            'avonni-primitive-combobox__option_focused'
        );
        const listboxElement = this.template.querySelector(
            '[data-element-id="ul-listbox"]'
        );
        listboxElement.setAttribute(
            'aria-activedescendant',
            normalizeAriaAttribute(this._highlightedOption.id)
        );
    }

    /**
     * Updates the back link.
     *
     * @param {string} parentLabel
     */
    updateBackLink(parentLabel) {
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
     * Position the fixed actions and add their height to the listbox padding, to leave room for them in their original position.
     */
    updateFixedActionsHeight() {
        const listbox = this.template.querySelector(
            '[data-element-id="ul-listbox"]'
        );
        if (!listbox) return;

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

        listbox.style.paddingTop = `${offset}px`;

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

        listbox.style.paddingBottom = `${offset}px`;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

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

        this.close();
        this.dispatchClose();
        this.interactingState.leave();
        this.dispatchEvent(new CustomEvent('blur'));
    }

    /**
     * Dispatches focus event.
     */
    handleFocus() {
        this.interactingState.enter();

        this.dispatchEvent(new CustomEvent('focus'));
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
     * Handles the click on highlighted options.
     */
    handleHighlightedOptionClick(event) {
        // If the search is allowed, the options have to be selected with enter
        if (this.allowSearch && (event.key === ' ' || event.key === 'Spacebar'))
            return;

        if (this._highlightedOption.dataset.value) {
            this.handleOptionClick(event);
        } else if (this._highlightedOption.dataset.name === 'backlink') {
            this.handleBackLinkClick();
        } else {
            this.handleActionClick(this._highlightedOption.dataset.name);
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
                        this.highlightOption(index - 1);
                    } else {
                        this.highlightOption(this._optionElements.length - 1);
                    }
                    // Prevent the browser scrollbar from scrolling up
                    event.preventDefault();
                    break;
                case 'ArrowDown':
                    if (index < this._optionElements.length - 1) {
                        this.highlightOption(index + 1);
                    } else {
                        this.highlightOption(0);
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
                    this.highlightOption(0);
                    break;
                case 'End':
                    this.highlightOption(this._optionElements - 1);
                    break;
                default:
                // do nothing
            }
        }
    }

    /**
     * Handles the back link click.
     */
    handleBackLinkClick() {
        const parents = this.parentOptionsValues;
        parents.pop();

        if (parents.length) {
            const parent = this.getOption(parents[parents.length - 1]);
            this.updateBackLink(parent.label);
            this.visibleOptions = parent.options;
            this.showLoader = parent.isLoading;
        } else {
            this.visibleOptions = this.options;
            this.backLink = undefined;
            this.showLoader = this.isLoading;
        }

        this.focus();
        this.dispatchEvent(new CustomEvent('backactionclick'));
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
            this.computeSelection();
            this._value = this.selectedOptions.map((option) => option.value);
            this.dispatchChange('unselect', levelPath);
        }

        this.resetLevel();
        this.focus();
    }

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
         * @param {string} name Name of the action clicked.
         * @public
         * @bubbles
         */
        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: name
                },
                bubbles: true
            })
        );

        this.close();
        this.dispatchClose();
        this.focus();
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

        const selectedOption = this.visibleOptions.find((option) => {
            return (
                option.value.toString() ===
                this._highlightedOption.dataset.value
            );
        });

        // If the option has children options, change the visible options
        if (selectedOption.hasChildren) {
            this.visibleOptions = selectedOption.options;
            this.parentOptionsValues.push(selectedOption.value);
            this.updateBackLink(this.currentParent.label);
            if (selectedOption.isLoading) {
                this.showLoader = true;
            }
            this.focus();
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
                const scrollableList = this.template.querySelector(
                    '[data-element-id="ul-listbox"]'
                );
                if (scrollableList) {
                    scrollableList.scrollTop = 0;
                }
            });
            return;
        }

        // Toggle selection
        if (!this.isMultiSelect && !selectedOption.selected) {
            this.unselectOption();
        }
        selectedOption.selected = !selectedOption.selected;

        this.computeSelection();

        this._value = this.selectedOptions.map((option) => option.value);

        if (!this.validity.valid) {
            this.reportValidity();
            if (this.validity.rangeOverflow) {
                if (selectedOption.selected) {
                    selectedOption.selected = false;
                    this.computeSelection();
                    this._value = this.selectedOptions.map(
                        (option) => option.value
                    );
                }
            }
            this.close();
            this.dispatchClose();
            this.focus();
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
        this.close();
        this.dispatchClose();
        this.focus();
    }

    /**
     * Handles mouse enter on li.
     */
    handleMouseEnter(event) {
        event.stopPropagation();
        if (event.currentTarget.dataset.ariaDisabled === 'true') return;

        // If the mouse enters an option, the id will be sent through an event from the group
        const id = event.detail.id ? event.detail.id : event.currentTarget.id;

        const index = this._optionElements.findIndex((option) => {
            return option.id === id;
        });

        this.highlightOption(index);
    }

    /**
     * Handle a scroll down the drop-down.
     */
    handleScroll() {
        if (
            !this.enableInfiniteLoading ||
            this.showLoader ||
            this._isSearching
        ) {
            return;
        }

        const list = this.template.querySelector(
            '[data-element-id="ul-listbox"]'
        );
        const loadLimit =
            list.scrollHeight - list.offsetHeight - this.loadMoreOffset;
        const firstTimeReachingTheEnd = this._previousScroll < loadLimit;

        if (
            this.scrolledToEnd &&
            (!this._previousScroll || firstTimeReachingTheEnd)
        ) {
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
        this._previousScroll = list.scrollTop;
    }

    /**
     * Handle an input in the combobox.
     */
    handleSearch() {
        // Search in the current level of options
        const options =
            (this.currentParent && this.currentParent.options) || this.options;

        const result = this.search({
            searchTerm: this._searchTerm,
            options
        });

        this.visibleOptions = result;

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
}
