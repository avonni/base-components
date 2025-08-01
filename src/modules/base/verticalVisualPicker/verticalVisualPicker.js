import { LightningElement, api } from 'lwc';
import {
    classSet,
    generateUUID,
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utils';
import { equal } from 'c/utilsPrivate';
import { InteractingState, FieldConstraintApi } from 'c/inputUtils';
import Item from './item';

const DEFAULT_MIN = 0;
const DEFAULT_COLLAPSED_SHOW_MORE_BUTTON = 'Show more';
const DEFAULT_DISABLED = false;
const DEFAULT_EXPANDED_SHOW_MORE_BUTTON = 'Show less';
const DEFAULT_HIDE_CHECK_MARK = false;
const DEFAULT_LOAD_MORE_OFFSET = 20;
const DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT = 'Loading...';
const DEFAULT_REQUIRED = false;
const DEFAULT_REQUIRED_ALTERNATIVE_TEXT = 'Required';
const ITEM_SIZES = {
    valid: ['small', 'medium', 'large', 'responsive'],
    default: 'medium'
};
const ITEM_TYPES = { valid: ['radio', 'checkbox'], default: 'radio' };
const ITEM_VARIANTS = {
    valid: ['coverable', 'non-coverable'],
    default: 'non-coverable'
};

/**
 * @class
 * @descriptor avonni-vertical-visual-picker
 * @storyId example-verticalvisualpicker--base
 * @public
 */
export default class VerticalVisualPicker extends LightningElement {
    /**
     * The label for the show more button when the items are collapsed.
     *
     * @type {string}
     * @public
     * @default 'Show more'
     */
    @api collapsedShowMoreButton = DEFAULT_COLLAPSED_SHOW_MORE_BUTTON;
    /**
     * The label for the show more button when the items are expanded.
     *
     * @type {string}
     * @public
     * @default 'Show less'
     */
    @api expandedShowMoreButton = DEFAULT_EXPANDED_SHOW_MORE_BUTTON;
    /**
     * Text label to title the vertical visual picker.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * Message displayed while the picker is in the loading state.
     *
     * @type {string}
     * @public
     * @default 'Loading...'
     */
    @api loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
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
     * The name of the vertical visual picker.
     *
     * @type {string}
     * @public
     * @required
     */
    @api name = generateUUID();
    /**
     * The assistive text when the required attribute is set to true.
     *
     * @type {string}
     * @public
     * @default 'Required'
     */
    @api requiredAlternativeText = DEFAULT_REQUIRED_ALTERNATIVE_TEXT;

    _disabled = DEFAULT_DISABLED;
    _enableInfiniteLoading = false;
    _hideCheckMark = DEFAULT_HIDE_CHECK_MARK;
    _isLoading = false;
    _items = [];
    _loadMoreOffset = DEFAULT_LOAD_MORE_OFFSET;
    _max;
    _maxCount;
    _min = DEFAULT_MIN;
    _required = DEFAULT_REQUIRED;
    _size = ITEM_SIZES.default;
    _type = ITEM_TYPES.default;
    _value = [];
    _variant = ITEM_VARIANTS.default;

    _cancelBlur = false;
    _computedItems = [];
    _connected = false;
    _isCollapsed = true;
    helpMessage = '';

    /*
     * -------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.interactingState = new InteractingState();
        this.interactingState.onleave(() => this.showHelpMessageIfInvalid());
        this.initItems();
        this._connected = true;
    }

    renderedCallback() {
        this.setCssVariables();
        this.handleScroll();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, the visual picker is disabled and the user cannot interact with it.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);

        if (this._connected) {
            this.initItems();
        }
    }

    /**
     * If present, you can load a subset of items and then display more when users scroll to the end of the picker. Use with the `loadmore` event to retrieve more items.
     * If present, `max-count` is ignored.
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
            this.handleScroll();
        }
    }

    /**
     * If present, hide the check mark when selected.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get hideCheckMark() {
        return this._hideCheckMark;
    }
    set hideCheckMark(value) {
        this._hideCheckMark = normalizeBoolean(value);
    }

    /**
     * If present, a spinner is shown to indicate that more items are loading.
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
     * Array of items with attributes populating the vertical visual picker.
     *
     * @type {object[]}
     * @public
     */
    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = normalizeArray(value);

        if (this._connected) {
            this.initItems();
        }
    }

    /**
     * Determines when to trigger infinite loading based on how many pixels the scroll position is from the end of the picker.
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
        this._loadMoreOffset = isNaN(value)
            ? DEFAULT_LOAD_MORE_OFFSET
            : parseInt(value, 10);

        if (this._connected) {
            this.handleScroll();
        }
    }

    /**
     * Maximum number of selected items.
     *
     * @type {number}
     * @default Infinity
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
     * Maximum of items allowed in the visible list.
     * This attribute is ignored if `enable-infinite-loading` is present.
     *
     * @type {number}
     * @public
     */
    @api
    get maxCount() {
        return this._maxCount;
    }
    set maxCount(value) {
        this._maxCount = isNaN(value) ? undefined : parseInt(value, 10);
    }

    /**
     * Minimum number of selected options required.
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
        this._min = isNaN(parseInt(value, 10))
            ? DEFAULT_MIN
            : parseInt(value, 10);
    }

    /**
     * If present, at least one item must be selected.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get required() {
        return this._required;
    }
    set required(value) {
        this._required = normalizeBoolean(value);
    }

    /**
     * It defines the width of the item. Valid values include small, medium, large and responsive.
     *
     * @type {string}
     * @public
     * @default medium
     */
    @api
    get size() {
        return this._size;
    }
    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: ITEM_SIZES.default,
            validValues: ITEM_SIZES.valid
        });

        if (this._connected) {
            this.initItems();
        }
    }

    /**
     * It defines the type of input. Valid values include radio and checkbox.
     *
     * @type {string}
     * @public
     * @default radio
     */
    @api
    get type() {
        return this._type;
    }
    set type(type) {
        this._type = normalizeString(type, {
            fallbackValue: ITEM_TYPES.default,
            validValues: ITEM_TYPES.valid
        });
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
     * Value of the selected item. For the checkbox type, the value can be an array. Ex: [value1, value2], 'value1' or ['value1'].
     *
     * @type {(string|string[])}
     * @public
     */
    @api
    get value() {
        return this._value;
    }
    set value(value) {
        const normalizedValue =
            typeof value === 'string' ? [value] : normalizeArray(value);
        if (equal(normalizedValue, this._value)) {
            return;
        }
        this._value = normalizedValue;

        if (this._connected) {
            this.initItems();
        }
    }

    /**
     * It changes the appearance of the item when selected. Valid values include coverable and non-coverable.
     *
     * @type {string}
     * @public
     * @default non-coverable
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: ITEM_VARIANTS.default,
            validValues: ITEM_VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIESs
     * -------------------------------------------------------------
     */

    /**
     * Computed CSS classes for the div wrapping the loading spinner and the show more/less button.
     *
     * @type {string}
     */
    get computedButtonSpinnerWrapperClass() {
        const classes = classSet('slds-is-relative').add({
            'avonni-vertical-visual-picker__loading-spinner':
                this.isLoading && !this.showMoreButton,
            'slds-show_inline-block': this.isLoading && this.showMoreButton
        });

        if (this.isLoading && !this.showMoreButton) {
            classes.add(
                `avonni-vertical-visual-picker__item_size-${this.size}`
            );
        }
        return classes.toString();
    }

    /**
     * Computed NOT selected class styling.
     *
     * @type {string}
     */
    get computedNotSelectedClass() {
        return classSet('avonni-vertical-visual-picker__content_container')
            .add({
                'slds-is-not-selected': this.isCoverable && !this.hideCheckMark,
                'avonni-is-not-selected': this.isCoverable && this.hideCheckMark
            })
            .toString();
    }

    /**
     * Compute visual picker type class styling based on selected attributes.
     *
     * @type {string}
     */
    get computedVerticalVisualPickerClass() {
        return classSet(
            'slds-visual-picker slds-visual-picker_vertical avonni-vertical-visual-picker'
        )
            .add(`avonni-vertical-visual-picker__item_size-${this.size}`)
            .toString();
    }

    /**
     * Computed visual picker type class styling based on selected attributes.
     *
     * @type {string}
     */
    get computedVerticalVisualPickerTypeClass() {
        return classSet(
            'slds-visual-picker__figure avonni-vertical-visual-picker__figure slds-align_absolute-left'
        )
            .add(`avonni-vertical-visual-picker__item_size-${this.size}`)
            .add({
                'slds-visual-picker__text': !this.isCoverable,
                'slds-visual-picker__icon': this.isCoverable,
                'avonni-hide-check-mark': this.hideCheckMark,
                'avonni-vertical-visual-picker__figure-with-tags': this.hasTags
            })
            .toString();
    }

    /**
     * Validation with constraint Api.
     *
     * @type {object}
     */
    get _constraint() {
        if (!this._constraintApi) {
            this._constraintApi = new FieldConstraintApi(() => this, {
                valueMissing: () =>
                    !this.disabled && this.required && this.value.length === 0,
                rangeUnderflow: () =>
                    this.type === 'checkbox' &&
                    this.numberOfMainItemsSelected < this.min,
                rangeOverflow: () =>
                    this.type === 'checkbox' &&
                    this.numberOfMainItemsSelected > this.max
            });
        }
        return this._constraintApi;
    }

    /**
     * Icon name of the show more/less button.
     *
     * @type {string}
     */
    get computedShowMoreButtonIconName() {
        return this._isCollapsed ? 'utility:down' : 'utility:up';
    }

    /**
     * Label of the show more/less button.
     *
     * @type {string}
     */
    get computedShowMoreButtonLabel() {
        return this._isCollapsed
            ? this.collapsedShowMoreButton
            : this.expandedShowMoreButton;
    }

    /**
     * Returns true if one of the items has tags.
     *
     * @type {boolean}
     */
    get hasTags() {
        return this.items.some((item) => item.tags);
    }

    /**
     * Get input.
     *
     * @type {Element}
     */
    get input() {
        return this.template.querySelector('[data-element-id="input"]');
    }

    /**
     * Get all inputs.
     *
     * @type {Element}
     */
    get inputs() {
        return Array.from(
            this.template.querySelectorAll('[data-element-id="input"]')
        );
    }

    /**
     * Verify if variant is coverable.
     *
     * @type {boolean}
     */
    get isCoverable() {
        return this.variant === 'coverable';
    }

    /**
     * Returns the number of selected main items.
     */
    get numberOfMainItemsSelected() {
        if (this.type === 'radio') return this.value ? 1 : 0;
        return this.items
            .map(({ value }) => value)
            .filter((value) => this.value.includes(value)).length;
    }

    /**
     * True of the max count show more/less button is visible, or if the component is loading.
     *
     * @type {boolean}
     * @default false
     */
    get showButtonOrSpinner() {
        return this.isLoading || this.showMoreButton;
    }

    /**
     * True if the show more/less button should be visible.
     *
     * @type {boolean}
     */
    get showMoreButton() {
        return (
            !this.enableInfiniteLoading &&
            !isNaN(this.maxCount) &&
            this.items.length > this.maxCount
        );
    }

    /**
     * Array of visible items.
     *
     * @type {object[]}
     */
    get visibleItems() {
        return this.showMoreButton && this._isCollapsed
            ? this._computedItems.slice(0, this.maxCount)
            : this._computedItems;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Removes keyboard focus from the input element.
     *
     * @public
     */
    @api
    blur() {
        this.input.blur();
    }

    /**
     * Checks if the input is valid.
     *
     * @returns {boolean} Indicates whether the element meets all constraint validations.
     * @public
     */
    @api
    checkValidity() {
        return this._constraint.checkValidity();
    }

    /**
     * Sets focus on the input element.
     *
     * @public
     */
    @api
    focus() {
        this.input.focus();
    }

    /**
     * Retrieve the current error message. If it is null than the input is valid.
     *
     * @returns {string} Current input error message.
     * @public
     */
    @api
    getErrorMessage() {
        this.reportValidity();
        return this.helpMessage;
    }

    /**
     * Displays the error messages and returns false if the input is invalid.
     * If the input is valid, reportValidity() clears displayed error messages and returns true.
     *
     * @returns {boolean} - The validity status of the input fields.
     * @public
     */
    @api
    reportValidity() {
        return this._constraint.reportValidity((message) => {
            this.helpMessage = message;
        });
    }

    /**
     * Sets a custom error message to be displayed when a form is submitted.
     *
     * @param {string} message - The string that describes the error.
     * If message is an empty string, the error message is reset.
     * @public
     */
    @api
    setCustomValidity(message) {
        this._constraint.setCustomValidity(message);
    }

    /**
     * Displays error messages on invalid fields.
     * An invalid field fails at least one constraint validation and returns false when checkValidity() is called.
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
     * Initialize the items.
     */
    initItems() {
        this._computedItems = this.items.map((item) => {
            const maxReached =
                this.type === 'checkbox' &&
                this.max !== 1 &&
                this.numberOfMainItemsSelected >= this.max;
            const isUnselectedOption =
                this.type === 'checkbox' && !this.value.includes(item.value);
            return new Item({
                ...item,
                disabled:
                    this.disabled ||
                    item.disabled ||
                    (maxReached && isUnselectedOption),
                isChecked: this.isItemChecked(item.value, item.subItems),
                size: this.size
            });
        });
    }

    /**
     * Verifies if the item should be checked.
     * @param {string} value item value
     * @param {object[]} subItems item subitems
     * @returns
     */
    isItemChecked(value, subItems) {
        const isPickerSelected = this._value.includes(value);
        if (!subItems) return isPickerSelected;
        const isSubItemSelected = subItems.some((subItem) =>
            this._value.includes(subItem.value)
        );
        return isPickerSelected || isSubItemSelected;
    }

    /**
     * Goes through every visual picker and sets the "checked" attribute.
     */
    refreshCheckedAttributes() {
        const wrappers = this.template.querySelectorAll(
            '[data-element-id="div-item-wrapper"]'
        );
        wrappers.forEach((wrapper) => {
            const value = wrapper.dataset.value;
            const item = this._computedItems.find(
                (i) => i.computedValue === value
            );
            if (item) {
                item.isChecked = this._isItemChecked(
                    item.computedValue,
                    item.subItems
                );
                this.input.checked = item.isChecked;
            }
        });
    }

    /**
     * Set the CSS variables used to compute the height of the items wrapper.
     */
    setCssVariables() {
        const wrapper = this.template.querySelector(
            '[data-element-id="div-wrapper"]'
        );
        if (!wrapper) {
            return;
        }
        const legend = this.template.querySelector(
            '[data-element-id="legend"]'
        );
        if (legend) {
            wrapper.style.setProperty(
                '--avonni-vertical-visual-picker-legend-height',
                `${legend.offsetHeight}px`
            );
        }
        const helpMessage = this.template.querySelector(
            '[data-element-id="div-help-message"]'
        );
        if (helpMessage) {
            wrapper.style.setProperty(
                '--avonni-vertical-visual-picker-help-message-height',
                `${helpMessage.offsetHeight}px`
            );
        }
    }

    /*
     * -------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Dispatches the blur event.
     */
    handleBlur() {
        if (this._cancelBlur) {
            return;
        }
        this.interactingState.leave();
    }

    /**
     * Change event handler.
     *
     * @param {Event} event
     */
    handleChange(event) {
        event.stopPropagation();
        const targetValue = event.currentTarget.value;
        const targetChecked = event.currentTarget.checked;

        let newValue;
        const item = this._items.find(({ value }) => value === targetValue);
        if (this.type === 'radio' && targetChecked) {
            newValue = [targetValue];
        } else {
            newValue = [...this._value];
            if (targetChecked) {
                newValue.push(targetValue);
            } else {
                newValue = newValue.filter((value) => value !== targetValue);
                if (item && item.subItems) {
                    const subItemsValues = item.subItems.map(
                        ({ value }) => value
                    );
                    // Remove all subItems values from current value.
                    newValue = newValue.filter(
                        (value) => !subItemsValues.includes(value)
                    );
                }
            }
        }

        const oldValue = this._value;
        const oldNumberOfMainItemSelected = this.numberOfMainItemsSelected;
        this._value = newValue;

        // Exception if checkbox max = 1, unselect last option and select the clicked one.
        // Looking to have the same behaviour as radio buttons, but being able to deselect the option.
        if (
            this.max === 1 &&
            this.validity.rangeOverflow &&
            oldNumberOfMainItemSelected < this.numberOfMainItemsSelected
        ) {
            this._value = this.value.filter(
                (value) => !oldValue.includes(value)
            );
        }

        this.dispatchChange();
        this.refreshCheckedAttributes();
        this.initItems();

        // Wait for the checked attributes to be refreshed.
        requestAnimationFrame(() => {
            // Set the focus on the clicked item.
            const lastClickedInput = this.inputs?.find(
                (input) => input.value === targetValue
            );
            lastClickedInput?.focus();
        });
    }

    /**
     * Handle the click on an item. Dispatch the itemclick event.
     * Sub Items click are not supported.
     *
     * @param {Event} event
     */
    handleClick(event) {
        /**
         * The event fired when an item is clicked.
         *
         * @event
         * @name itemclick
         * @param {string} value Clicked item value.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('itemclick', {
                detail: {
                    value: event.currentTarget.value
                }
            })
        );
    }

    /**
     * Handles the focus event.
     */
    handleFocus() {
        this.interactingState.enter();
    }

    /**
     * Input keyup event handler.
     *
     * @param {Event} event
     */
    handleKeyUp(event) {
        if (event.key !== 'Enter') return;
        event.currentTarget.click();
    }

    /**
     * Handles the mouse enter event.
     */
    handleMouseEnter() {
        this._cancelBlur = true;
    }

    /**
     * Handles the mouse leave event.
     */
    handleMouseLeave() {
        this._cancelBlur = false;
    }

    /**
     * Handle the scroll of the items wrapper.
     */
    handleScroll() {
        if (!this.enableInfiniteLoading || this.isLoading) {
            return;
        }

        const itemsWrapper = this.template.querySelector(
            '[data-element-id="div-items-wrapper"]'
        );

        const { scrollTop, scrollHeight, clientHeight } = itemsWrapper;
        const offsetFromBottom = scrollHeight - scrollTop - clientHeight;
        const noScrollBar = scrollTop === 0 && scrollHeight === clientHeight;

        if (offsetFromBottom <= this.loadMoreOffset || noScrollBar) {
            /**
             * The event fired when you scroll to the end of the visual picker. This event is fired only if `enable-infinite-loading` is true.
             *
             * @event
             * @name loadmore
             * @public
             */
            this.dispatchEvent(new CustomEvent('loadmore'));
        }
    }

    /**
     * Sub Items change event handler.
     *
     * @param {Event} event
     */
    handleSubItemsChange(event) {
        event.stopPropagation();
        const subItemsValue = event.detail.value;
        const subItemsSelected =
            typeof subItemsValue === 'string' ? [subItemsValue] : subItemsValue;

        let newValue = [...this._value];
        const item = this._items.find(
            ({ value }) => value === event.currentTarget.dataset.value
        );
        const subItemsValues = item.subItems.map(({ value }) => value);

        // Remove all subItems values from current value.
        newValue = newValue.filter((value) => !subItemsValues.includes(value));

        // Add the currently selected values of the input-choice-set.
        newValue.push(...subItemsSelected);

        this._value = newValue;
        this.dispatchChange();
        this.refreshCheckedAttributes();
    }

    /**
     * Handle a click on the show more/less button.
     */
    handleToggleShowMoreButton() {
        /**
         * The event fired when the show more/less button is clicked.
         *
         * @event
         * @name itemsvisibilitytoggle
         * @param {boolean} show True if items are currently hidden and the click was meant to show more of them. False if the click was meant to hide the visible items.
         * @param {number} visibleItemsLength Length of the currently visible items.
         * @public
         * @cancelable
         */
        const event = new CustomEvent('itemsvisibilitytoggle', {
            detail: {
                show: this._isCollapsed,
                visibleItemsLength: this.visibleItems.length
            },
            cancelable: true
        });
        this.dispatchEvent(event);

        if (!event.defaultPrevented) {
            this._isCollapsed = !this._isCollapsed;
        }
    }

    /**
     * Dispatch the 'change' event.
     */
    dispatchChange() {
        const dispatchString =
            this.type === 'radio' &&
            this._items.every((item) => !item.subItems);
        /**
         * The event fired when the value changed.
         *
         * @event
         * @name change
         * @param {string|string[]} value Selected items' value. Returns a string if the type is radio and no items have subItems. Otherwise returns an array of string.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('change', {
                detail: {
                    value: dispatchString ? this._value[0] || null : this._value
                }
            })
        );
    }
}
