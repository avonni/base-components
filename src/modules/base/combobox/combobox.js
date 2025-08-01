import { LightningElement, api } from 'lwc';
import { classListMutation } from 'c/utilsPrivate';
import {
    classSet,
    deepCopy,
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utils';

const DEFAULT_BACK_ACTION = {
    iconName: 'utility:chevronleft'
};
const DEFAULT_LOAD_MORE_OFFSET = 20;
const DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT = 'Loading';
const DEFAULT_MIN = 0;
const DEFAULT_NO_RESULTS_MESSAGE = 'No matches found';
const DEFAULT_PLACEHOLDER = 'Select an Option';
const DEFAULT_PLACEHOLDER_WHEN_SEARCH_ALLOWED = 'Search...';
const DEFAULT_READ_ONLY_LABEL = 'Read Only Combobox';
const DEFAULT_REQUIRED_ALTERNATIVE_TEXT = 'Required';
const DEFAULT_SELECTED_OPTIONS_ARIA_LABEL = 'Selected Options';
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
const DROPDOWN_LENGTHS = {
    valid: ['5-items', '7-items', '10-items'],
    default: '7-items'
};
const SELECTED_OPTIONS_ACTIONS = [
    {
        name: 'remove',
        alternativeText: 'Remove option',
        iconName: 'utility:close'
    }
];
const SELECTED_OPTIONS_DIRECTIONS = {
    default: 'horizontal',
    valid: ['horizontal', 'vertical']
};
const VARIANTS = {
    valid: ['standard', 'label-inline', 'label-hidden', 'label-stacked'],
    default: 'standard'
};

/**
 * A widget that provides a user with an input field that is either an autocomplete or readonly, accompanied by a listbox of options.
 *
 * @class
 * @public
 * @storyId example-combobox--base
 * @descriptor avonni-combobox
 */
export default class Combobox extends LightningElement {
    /**
     * Help text detailing the purpose and function of the combobox.
     *
     * @type {string}
     * @public
     */
    @api fieldLevelHelp;
    /**
     * Text label for the combobox.
     *
     * @type {string}
     * @public
     */
    @api label;
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
     * Specifies the name of the combobox.
     *
     * @type {string}
     * @public
     */
    @api name;
    /**
     * Message displayed when no search results are found.
     *
     * @type {string}
     * @public
     * @default No matches found
     */
    @api noResultsMessage = DEFAULT_NO_RESULTS_MESSAGE;
    /**
     * The assistive text when the required attribute is set to true.
     *
     * @type {string}
     * @public
     * @default Required
     */
    @api requiredAlternativeText = DEFAULT_REQUIRED_ALTERNATIVE_TEXT;
    /**
     * Custom search function to execute instead of the default search. It has to:
     * * Take an object with two keys as an argument: <code>options</code> and <code>searchTerm</code>.
     * * Return the new options.
     *
     * @type {function}
     * @public
     */
    @api search;
    /**
     * The Lightning Design System name of the icon indicating that the selected options are sortable. Specify the name in the format 'utility:user' where 'utility' is the category, and 'user' is the specific icon to be displayed.
     * The icon is visible only if `sortable-selected-options` is present, and selected-options-direction is vertical.
     *
     * @type {string}
     * @public
     */
    @api sortableSelectedOptionsIconName;

    _actions = [];
    _allowSearch = false;
    _backAction = DEFAULT_BACK_ACTION;
    _disabled = false;
    _dropdownAlignment = DROPDOWN_ALIGNMENTS.default;
    _dropdownLength = DROPDOWN_LENGTHS.default;
    _enableInfiniteLoading = false;
    _groups = [];
    _hideClearIcon = false;
    _hideOptionsUntilSearch = false;
    _hideSelectedOptions = false;
    _isLoading = false;
    _isMultiSelect = false;
    _keepOpenOnSelect = false;
    _loadMoreOffset = DEFAULT_LOAD_MORE_OFFSET;
    _loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    _max;
    _min = DEFAULT_MIN;
    _multiLevelGroups = false;
    _options = [];
    _placeholder;
    _readOnly = false;
    _removeSelectedOptions = false;
    _required = false;
    _scopes = [];
    _scopesGroups = [];
    _search = this.computeSearch;
    _selectedOptionsAriaLabel = DEFAULT_SELECTED_OPTIONS_ARIA_LABEL;
    _selectedOptionsDirection = SELECTED_OPTIONS_DIRECTIONS.default;
    _sortableSelectedOptions = false;
    _value = [];
    _variant = VARIANTS.default;

    selectedOptions = [];
    scopesValue;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Array of action objects. The actions are displayed at the end of the combobox options.
     *
     * @type {object[]}
     * @public
     */
    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        this._actions = normalizeArray(value);
    }

    /**
     * If present, the combobox options are searchable.
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
     * @default { iconName: 'utility:chevronleft', label: Label of the parent option }
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
     * If present, the combobox is disabled and users cannot interact with it.
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
        this._groups = normalizeArray(value);
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
     * If present, the combobox options are hidden until a search value is entered.
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
     * If present, the selected options pills will be hidden.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get hideSelectedOptions() {
        return this._hideSelectedOptions;
    }
    set hideSelectedOptions(value) {
        this._hideSelectedOptions = normalizeBoolean(value);
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
    }

    /**
     * If present, the dropdown menu will remain open after an option is selected.
     *
     * @type {boolean}
     * @default false
     * @public
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
     * If multi-select, maximum number of selected options allowed.
     *
     * @type {number}
     * @public
     */
    @api
    get max() {
        return this._max;
    }
    set max(value) {
        this._max = isNaN(parseInt(value, 10)) ? Infinity : parseInt(value, 10);
    }

    /**
     * If multi-select, minimum number of selected options allowed.
     *
     * @type {number}
     * @default 0
     * @public
     */
    @api
    get min() {
        return this._min;
    }
    set min(value) {
        const number = isNaN(parseInt(value, 10))
            ? DEFAULT_MIN
            : parseInt(value, 10);
        this._min = number;
    }

    /**
     * If present, groups can contain other groups. Each group added to an option will create a level of depth.
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
        this._options = normalizeArray(value);
    }

    /**
     * Text that is displayed before an option is selected, to prompt the user to select an option.
     * The default value varies depending on the value of allow-search.
     *
     * @type {string}
     * @default Select an option -or- Search…
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
     * Array of scope objects. The scopes are displayed in a drop-down menu, to the left of the combobox input.
     *
     * @type {object[]}
     * @public
     */
    @api
    get scopes() {
        return this._scopes;
    }
    set scopes(value) {
        this._scopes = normalizeArray(value);
        this.scopesValue = this.scopes.length && [this.scopes[0].value];
    }

    /**
     * Array of group objects. The groups are used to separate the scopes inside the drop-down.
     *
     * @type {object[]}
     * @public
     */
    @api
    get scopesGroups() {
        return this._scopesGroups;
    }
    set scopesGroups(value) {
        this._scopesGroups = normalizeArray(value);
    }

    /**
     * Describes the selected options section to assistive technologies.
     *
     * @type {string}
     * @default Selected Options
     * @public
     */
    @api
    get selectedOptionsAriaLabel() {
        return this._selectedOptionsAriaLabel;
    }
    set selectedOptionsAriaLabel(value) {
        this._selectedOptionsAriaLabel =
            typeof value === 'string'
                ? value.trim()
                : DEFAULT_SELECTED_OPTIONS_ARIA_LABEL;
    }

    /**
     * Direction of the selected options. Horizontally, the selected options will be displayed as pills. Vertically, the selected options will be displayed as a list.
     *
     * @type {string}
     * @default horizontal
     * @public
     */
    @api
    get selectedOptionsDirection() {
        return this._selectedOptionsDirection;
    }
    set selectedOptionsDirection(value) {
        this._selectedOptionsDirection = normalizeString(value, {
            fallbackValue: SELECTED_OPTIONS_DIRECTIONS.default,
            validValues: SELECTED_OPTIONS_DIRECTIONS.valid
        });
    }

    /**
     * If present, the selected options are sortable.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get sortableSelectedOptions() {
        return this._sortableSelectedOptions;
    }
    set sortableSelectedOptions(value) {
        this._sortableSelectedOptions = normalizeBoolean(value);
    }

    /**
     * Represents the validity states that an element can be in, with respect to constraint validation.
     *
     * @type {string}
     * @public
     */
    @api
    get validity() {
        return (this.mainCombobox && this.mainCombobox.validity) || false;
    }

    /**
     * Array of selected options value, or unique string value. If is-multi-select is false and several values are passed, only the first one will be taken into account.
     *
     * @type {(string[]|string)}
     * @public
     */
    @api
    get value() {
        return this._value;
    }
    set value(value) {
        if (typeof value === 'string') {
            this._value = this._computeStringValue(value);
        } else if (typeof value === 'number') {
            this._value = [value];
        } else {
            this._value = [...normalizeArray(value)];
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
     * Computed CSS classes for the comboboxes wrapper.
     *
     * @type {string}
     */
    get computedComboboxGroupClass() {
        return this.showScopes ? 'slds-combobox-group' : undefined;
    }

    /**
     * Computed label, with default value if the combobox is read-only.
     *
     * @type {string}
     */
    get computedLabel() {
        return this.label || !this.readOnly
            ? this.label
            : DEFAULT_READ_ONLY_LABEL;
    }

    /**
     * Computed CSS Classes for the label.
     *
     * @type {string}
     */
    get computedLabelClass() {
        return classSet('slds-form-element__label avonni-combobox__label')
            .add({ 'slds-assistive-text': this.variant === 'label-hidden' })
            .toString();
    }

    /**
     * Computed CSS classes for the main combobox.
     *
     * @type {string}
     */
    get computedMainComboboxClass() {
        return classSet({
            'slds-combobox-addon_end avonni-combobox__main-combobox_scopes':
                this.showScopes
        }).toString();
    }

    /**
     * Main combobox HTML element.
     *
     * @type {HTMLElement}
     */
    get mainCombobox() {
        return this.template.querySelector(
            '[data-element-id="avonni-primitive-combobox-main"]'
        );
    }

    /**
     * Selected options, in a valid pill container or list items format.
     *
     * @type {object[]}
     */
    get normalizedSelectedOptions() {
        return deepCopy(this.selectedOptions).map((opt) => {
            return { ...opt, name: opt.value };
        });
    }

    /**
     * Array of actions displayed on the selected options pills. Return a unique remove action, or an empty array, if disabled or read-only.
     *
     * @type {object[]}
     */
    get selectedOptionsActions() {
        return this.readOnly || this.disabled ? [] : SELECTED_OPTIONS_ACTIONS;
    }

    /**
     * True if the selected options are visible and displayed as horizontal pills.
     *
     * @type {boolean}
     */
    get showHorizontalSelectedOptions() {
        return (
            this.showSelectedOptions &&
            this.selectedOptionsDirection === 'horizontal'
        );
    }

    /**
     * True if the scopes combobox is visible.
     *
     * @type {boolean}
     */
    get showScopes() {
        return this.scopes.length;
    }

    /**
     * True if the selected options are visible.
     *
     * @type {boolean}
     */
    get showSelectedOptions() {
        return (
            !this.hideSelectedOptions &&
            this.isMultiSelect &&
            this.selectedOptions.length
        );
    }

    /**
     * True if the selected options are visible and displayed as a vertical list.
     *
     * @type {boolean}
     */
    get showVerticalSelectedOptions() {
        return (
            this.showSelectedOptions &&
            this.selectedOptionsDirection === 'vertical'
        );
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Remove focus from the combobox.
     *
     * @public
     */
    @api
    blur() {
        this.mainCombobox.blur();
    }

    /**
     * Check if the input is valid.
     *
     * @returns {boolean} True if the element meets all constraint validations.
     * @public
     */
    @api
    checkValidity() {
        return this.mainCombobox.checkValidity();
    }

    /**
     * Close the drop-down.
     *
     * @public
     */
    @api
    close() {
        this.mainCombobox.close();
    }

    /**
     * Set focus on the combobox.
     *
     * @public
     */
    @api
    focus() {
        this.mainCombobox.focus();
    }

    /**
     * Open the drop-down.
     *
     * @public
     */
    @api
    open() {
        this.mainCombobox.open();
    }

    /**
     * Display the error messages. If the input is valid, <code>reportValidity()</code> clears displayed error messages.
     *
     * @returns {boolean} False if invalid, true if valid.
     * @public
     */
    @api
    reportValidity() {
        return this.mainCombobox.reportValidity();
    }

    /**
     * Reset the combobox to the first options level.
     *
     * @public
     */
    @api
    resetLevel() {
        this.mainCombobox.resetLevel();
    }

    /**
     * Set a custom error message to be displayed when a form is submitted.
     *
     * @param {string} message The string that describes the error. If message is an empty string, the error message is reset.
     * @public
     */
    @api
    setCustomValidity(message) {
        this.mainCombobox.setCustomValidity(message);
    }

    /**
     * Display error messages on invalid fields.
     * An invalid field fails at least one constraint validation and returns false when <code>checkValidity()</code> is called.
     *
     * @public
     */
    @api
    showHelpMessageIfInvalid() {
        this.reportValidity();
    }

    /**
     * Update the scope drop-down value.
     *
     * @param {string} value Unique value of the scope that should be selected.
     * @public
     */
    @api
    updateScope(value) {
        this.scopesValue = value;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Compute the value of the combobox if the value is a string.
     *
     * @param {string} value The value of the combobox.
     * @returns {string[]} The value of the combobox.
     */
    _computeStringValue(value) {
        const parts = value.split(';');
        return parts.length > 1 ? parts : [value];
    }

    /**
     * Get an option by its value.
     *
     * @param {string} value Unique value of the option.
     * @param {object[]} options Array of options.
     * @returns {object} Option object.
     */
    _getOption(value, options = this.options) {
        for (let i = 0; i < options.length; i++) {
            const option = options[i];
            if (option.value === value) {
                return option;
            }

            const children = normalizeArray(option.options);
            if (children.length) {
                const childOption = this._getOption(value, children);
                if (childOption) return childOption;
            }
        }
        return null;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Dispatches action click event.
     */
    handleActionClick(event) {
        const { name } = event.detail;
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
    }

    /**
     * Handle the click on a back action.
     */
    handleBackActionClick() {
        /**
         * The event fired when a user clicks on a back action.
         *
         * @event
         * @name backactionclick
         * @public
         * @bubbles
         */
        this.dispatchEvent(
            new CustomEvent('backactionclick', { bubbles: true })
        );
    }

    /**
     * Dispatches blur event.
     */
    handleBlur() {
        this.dispatchEvent(new CustomEvent('blur'));
    }

    /**
     * Dispatches change event.
     */
    handleChange(event) {
        const { action, levelPath, value } = event.detail;
        this._value = value;

        this._dispatchChange(action, levelPath);
    }

    /**
     * Dispatch the close event.
     */
    handleClose() {
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
     * Dispatches focus event.
     */
    handleFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
    }

    /**
     * Handle the click on an option with nested options.
     *
     * @param {Event} event
     */
    handleLevelChange(event) {
        const option = this._getOption(event.detail.optionValue);

        /**
         * The event fired when an option with nested options has been selected.
         *
         * @event
         * @name levelchange
         * @param {object} option Option clicked.
         * @public
         * @bubbles
         */
        this.dispatchEvent(
            new CustomEvent('levelchange', {
                detail: {
                    option: deepCopy(option)
                },
                bubbles: true
            })
        );
    }

    /**
     * Handle the load more event dispatched by the primitive combobox.
     *
     * @param {Event} event `loadmore` event.
     */
    handleLoadMore(event) {
        const { optionValue, searchTerm } = event.detail;
        const option = optionValue ? this._getOption(optionValue) : null;

        /**
         * The event fired when you scroll to the bottom of the drop-down to load more options.
         *
         * @event
         * @name loadmore
         * @param {object} option Current parent option, if the visible options are nested.
         * @param {string} searchTerm Value of the search input.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('loadmore', {
                detail: {
                    option: deepCopy(option),
                    searchTerm
                }
            })
        );
    }

    /**
     * Dispatches open event.
     */
    handleOpen() {
        /**
         * The event fired when the drop-down is opened.
         * It is not fired when the drop-down is opened programmatically with the <code>open()</code> method.
         *
         * @event
         * @name open
         * @public
         */
        this.dispatchEvent(new CustomEvent('open'));
    }

    /**
     * Handles private select for primitive-combobox.
     */
    handlePrivateSelect(event) {
        this.selectedOptions = event.detail.selectedOptions;
    }

    /**
     * Handles removal of a vertical selected option.
     *
     * @param {Event} event
     */
    handleRemoveListItem(event) {
        const value = event.detail.targetName;
        this.mainCombobox.removeSelectedOption(value);
    }

    /**
     * Handles the removal of a horizontal selected option.
     *
     * @param {Event} event
     */
    handleRemovePill(event) {
        const index = event.detail.index;
        const value = this.selectedOptions[index].value;
        this.mainCombobox.removeSelectedOption(value);
    }

    /**
     * Handles the reordering of the selected options.
     *
     * @param {Event} event
     */
    handleReorderSelectedOptions(event) {
        this._value = event.detail.items.map((item) => item.name);
        this._dispatchChange('reorder');
    }

    /**
     * Dispatches search event.
     */
    handleSearch(event) {
        const { optionValue, value } = event.detail;
        const option = optionValue ? this._getOption(optionValue) : null;

        /**
         * The event fired when a user types into the combobox input.
         *
         * @event
         * @name search
         * @param {object} option Current parent option, if the visible options are nested.
         * @param {string} value The value of the search input.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('search', {
                detail: {
                    value,
                    option: deepCopy(option)
                }
            })
        );
    }

    /**
     * Dispatches scope change event.
     */
    handleScopeChange(event) {
        /**
         * The event fired when a scope is selected.
         *
         * @event
         * @name scopechange
         * @param {string} value The value of the scope selected.
         * @bubbles
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('scopechange', {
                detail: {
                    value: event.detail.value[0]
                },
                bubbles: true
            })
        );
    }

    /**
     * Dispatch the change event.
     */
    _dispatchChange(action, levelPath) {
        /**
         * The event fired when the combobox value changes. The value changes when an option has been selected or unselected, or because the selected options have been reordered.
         *
         * @event
         * @name change
         * @param {string} action Type of change made to the value. Options are `select`, `unselect` or `reorder`.
         * @param {number[]} levelPath If an option has been selected or unselected, array of level indexes to get to the option. This is useful in case options are nested.
         * The levels start at 0. For example, if an option is the third child of its parent, and its parent is the second child of the root options, the value would be: `[1, 2]`.
         * @param {(string[]|string)} value New value of the combobox. If the combobox is not multi-select, the value is a string.
         * @bubbles
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    action,
                    levelPath,
                    value: !this.isMultiSelect ? this.value[0] : this.value
                },
                bubbles: true
            })
        );
    }
}
