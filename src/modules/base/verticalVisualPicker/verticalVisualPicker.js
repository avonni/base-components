import { LightningElement, api } from 'lwc';
import { classSet, generateUUID } from 'c/utils';
import {
    normalizeBoolean,
    normalizeString,
    normalizeArray
} from 'c/utilsPrivate';
import { InteractingState, FieldConstraintApi } from 'c/inputUtils';
import Item from './item';

const ITEM_SIZES = {
    valid: ['small', 'medium', 'large', 'responsive'],
    default: 'medium'
};

const ITEM_TYPES = { valid: ['radio', 'checkbox'], default: 'radio' };

const ITEM_VARIANTS = {
    valid: ['coverable', 'non-coverable'],
    default: 'non-coverable'
};

const DEFAULT_DISABLED = false;
const DEFAULT_HIDE_CHECK_MARK = false;
const DEFAULT_LOAD_MORE_OFFSET = 20;
const DEFAULT_REQUIRED = false;

/**
 * @class
 * @descriptor avonni-vertical-visual-picker
 * @storyId example-verticalvisualpicker--base
 * @public
 */
export default class VerticalVisualPicker extends LightningElement {
    /**
     * Text label to title the vertical visual picker.
     *
     * @type {string}
     * @public
     */
    @api label;

    /**
     * Error message to be displayed when no item is selected and the required attribute is set to true.
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

    _disabled = DEFAULT_DISABLED;
    _enableInfiniteLoading = false;
    _hideCheckMark = DEFAULT_HIDE_CHECK_MARK;
    _isLoading = false;
    _items = [];
    _loadMoreOffset = DEFAULT_LOAD_MORE_OFFSET;
    _maxCount;
    _required = DEFAULT_REQUIRED;
    _size = ITEM_SIZES.default;
    _type = ITEM_TYPES.default;
    _variant = ITEM_VARIANTS.default;
    _value = [];

    _computedItems = [];
    _connected = false;
    _isCollapsed = true;
    helpMessage;

    connectedCallback() {
        this.interactingState = new InteractingState();
        this.interactingState.onleave(() => this.showHelpMessageIfInvalid());
        this._initItems();
        this._connected = true;
    }

    renderedCallback() {
        this._refreshCheckedAttributes();

        if (this.enableInfiniteLoading) {
            this._setCssVariables();
            this.handleScroll();
        }
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
            this._initItems();
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
            this._initItems();
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
            this._initItems();
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
        this._value =
            typeof value === 'string' ? [value] : normalizeArray(value);

        if (this._connected) {
            this._initItems();
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

    get currentShowButtonIconName() {
        return this._isCollapsed ? 'utility:down' : 'utility:up';
    }

    get currentShowButtonLabel() {
        return this._isCollapsed ? 'Show more' : 'Show less';
    }

    get fieldsetClass() {
        return classSet('slds-form-element')
            .add({
                'avonni-vertical-visual-picker__fieldset_full-height':
                    this.enableInfiniteLoading
            })
            .toString();
    }

    /**
     * Verify if variant is coverable.
     *
     * @type {boolean}
     */
    get isCoverable() {
        return this._variant === 'coverable';
    }

    get itemsWrapperClass() {
        return classSet('slds-form-element__control')
            .add({
                'slds-scrollable_y avonni-vertical-visual-picker__item-wrapper_full-height':
                    this.enableInfiniteLoading
            })
            .toString();
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
     * Compute visual picker type class styling based on selected attributes.
     *
     * @type {string}
     */
    get verticalVisualPickerClass() {
        return classSet('slds-visual-picker slds-visual-picker_vertical')
            .add(`avonni-vertical-visual-picker__item_size-${this._size}`)
            .toString();
    }

    /**
     * Compute visual picker type class styling based on selected attributes.
     *
     * @type {string}
     */
    get verticalVisualPickerTypeClass() {
        return classSet(
            'slds-visual-picker__figure avonni-vertical-visual-picker__figure slds-align_absolute-left'
        )
            .add(`avonni-vertical-visual-picker__item_size-${this._size}`)
            .add({
                'slds-visual-picker__text': !this.isCoverable,
                'slds-visual-picker__icon': this.isCoverable,
                'avonni-hide-check-mark': this._hideCheckMark,
                'avonni-vertical-visual-picker__figure-with-tags': this.hasTags
            })
            .toString();
    }

    get visibleItems() {
        return this.showMoreButton && this._isCollapsed
            ? this._computedItems.slice(0, this.maxCount)
            : this._computedItems;
    }

    /**
     * Compute NOT selected class styling.
     *
     * @type {string}
     */
    get notSelectedClass() {
        return classSet('avonni-vertical-visual-picker__content_container')
            .add({
                'slds-is-not-selected':
                    this.isCoverable && !this._hideCheckMark,
                'avonni-is-not-selected':
                    this.isCoverable && this._hideCheckMark
            })
            .toString();
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
     * Get input.
     *
     * @type {Element}
     */
    get input() {
        return this.template.querySelector('[data-element-id="input"]');
    }

    get showMoreButton() {
        return (
            !this.enableInfiniteLoading &&
            !isNaN(this.maxCount) &&
            this.items.length > this.maxCount
        );
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
                    !this.disabled && this.required && this.value.length === 0
            });
        }
        return this._constraintApi;
    }

    get wrapperClass() {
        return classSet({
            'avonni-vertical-visual-picker__wrapper_full-height':
                this.enableInfiniteLoading
        }).toString();
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

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
     * Removes keyboard focus from the input element.
     *
     * @public
     */
    @api
    blur() {
        this.input.blur();
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
     * Dispatch the 'change' event.
     */
    _dispatchChange() {
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

    _dispatchLoadMore() {
        /**
         * The event fired when you scroll to the end of the visual picker. This event is fired only if `enable-infinite-loading` is true.
         *
         * @event
         * @name loadmore
         * @public
         */
        this.dispatchEvent(new CustomEvent('loadmore'));
    }

    _initItems() {
        this._computedItems = this.items.map((item) => {
            return new Item({
                ...item,
                disabled: this.disabled || item.disabled,
                isChecked: this._isItemChecked(item.value, item.subItems),
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
    _isItemChecked(value, subItems) {
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
    _refreshCheckedAttributes() {
        if (this.inputs) {
            this.inputs.forEach((input) => {
                const item = this.computedItems.find(
                    ({ computedValue }) => computedValue === input.value
                );
                input.checked =
                    item &&
                    this._isItemChecked(item.computedValue, item.subItems);
            });
        }
    }

    _setCssVariables() {
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
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    /**
     * Dispatches the blur event.
     */
    handleBlur() {
        this.interactingState.leave();
    }

    /**
     * Dispatches the focus event.
     */
    handleFocus() {
        this.interactingState.enter();
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
                    const subItemsValue = item.subItems.map(
                        ({ value }) => value
                    );
                    // Remove all subItems values from current value.
                    newValue = newValue.filter(
                        (value) => !subItemsValue.includes(value)
                    );
                }
            }
        }

        this._value = newValue;
        this._dispatchChange();
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
            this._dispatchLoadMore();
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
        this._dispatchChange();
        this._refreshCheckedAttributes();
    }

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
                show: !this._isCollapsed,
                visibleItemsLength: this.visibleItems.length
            },
            cancelable: true
        });
        this.dispatchEvent(event);

        if (!event.defaultPrevented) {
            this._isCollapsed = !this._isCollapsed;
        }
    }
}
