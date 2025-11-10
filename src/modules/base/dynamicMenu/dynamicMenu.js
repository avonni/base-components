import {
    classSet,
    normalizeArray,
    normalizeBoolean,
    normalizeString
} from 'c/utils';
import { getListHeight, keyValues, observePosition } from 'c/utilsPrivate';
import { LightningElement, api } from 'lwc';

const BUTTON_SIZES = {
    valid: ['auto', 'stretch'],
    default: 'auto'
};

const BUTTON_VARIANTS = {
    valid: [
        'bare',
        'bare-inverse',
        'base',
        'border',
        'border-filled',
        'border-inverse',
        'brand',
        'brand-outline',
        'container',
        'destructive',
        'destructive-text',
        'inverse',
        'neutral',
        'reset',
        'success'
    ],
    default: 'border'
};

const DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT = 'Loading...';
const DEFAULT_SEARCH_INPUT_PLACEHOLDER = 'Search…';

const ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'medium'
};

const ICON_POSITIONS = {
    valid: ['left', 'right'],
    default: 'left'
};

const MENU_ALIGNMENTS = {
    valid: [
        'auto',
        'bottom-center',
        'bottom-left',
        'bottom-right',
        'center',
        'left',
        'right'
    ],
    default: 'left'
};

const MENU_LENGTHS = {
    valid: ['5-items', '7-items', '10-items'],
    default: '7-items'
};

const MENU_WIDTHS = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'small'
};

/**
 * @class
 * @descriptor  avonni-dynamic-menu
 * @storyId example-dynamic-menu--base
 * @public
 */
export default class DynamicMenu extends LightningElement {
    /**
     * The keyboard shortcut for the button menu.
     *
     * @type {string}
     * @public
     */
    @api accessKey;
    /**
     * The assistive text for the button.
     *
     * @type {string}
     * @public
     */
    @api alternativeText;
    /**
     * Reserved for internal use only.
     * Describes the order of this element inside `lightning-button-group`. Valid values include first, middle or last.
     *
     * @public
     * @type {string}
     */
    @api groupOrder = '';
    /**
     * The name of the icon to be used in the format 'utility:down'.
     *
     * @type {string}
     * @public
     */
    @api iconName;
    /**
     * Optional text to be shown on the button.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * Message displayed while the menu is in the loading state.
     *
     * @type {string}
     * @public
     * @default Loading...
     */
    @api loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    /**
     * Text that is displayed when the field is empty, to prompt the user for a valid entry.
     *
     * @type {string}
     * @public
     */
    @api searchInputPlaceholder = DEFAULT_SEARCH_INPUT_PLACEHOLDER;
    /**
     * Displays tooltip text when the mouse moves over the button menu.
     *
     * @type {string}
     * @public
     */
    @api title;
    /**
     * Text to display when the user mouses over or focuses on the button. The tooltip is auto-positioned relative to the button and screen space.
     *
     * @type {string}
     * @public
     */
    @api tooltip;

    _allowSearch = false;
    _buttonSize = BUTTON_SIZES.default;
    _disabled = false;
    _hideCheckMark = false;
    _iconPosition = ICON_POSITIONS.default;
    _iconSize = ICON_SIZES.default;
    _isLoading;
    _items = [];
    _menuAlignment = MENU_ALIGNMENTS.default;
    _menuLength = MENU_LENGTHS.default;
    _menuWidth = MENU_WIDTHS.default;
    _value;
    _variant = BUTTON_VARIANTS.default;

    displayActionIcons = false;
    dropdownOpened = false;
    filteredItems = [];
    hoverItem;
    computedListHeight;
    queryTerm;
    showFooter = true;

    _boundingRect = {};
    _cancelBlur = false;
    _dropdownIsFocused = false;
    _dropdownVisible = false;
    _focusedIndex = 0;
    _order;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.classList.add(
            'slds-dropdown-trigger',
            'slds-dropdown-trigger_click'
        );
        this._connected = true;
    }

    renderedCallback() {
        if (this.footerSlot) {
            this.showFooter = this.footerSlot.assignedElements().length !== 0;
        }
        if (this.dropdownOpened) {
            this.calculateListHeight();
        }
    }

    disconnectedCallback() {
        if (this._deRegistrationCallback) {
            this._deRegistrationCallback();
        }
    }

    /**
     * Footer Slot DOM element
     *
     * @type {HTMLElement}
     */
    get footerSlot() {
        return this.template.querySelector('slot[name=footer]');
    }

    /**
     * Slot DOM element
     *
     * @type {HTMLElement}
     */
    get slot() {
        return this.template.querySelector('slot');
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, display a search box.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get allowSearch() {
        return this._allowSearch;
    }
    set allowSearch(value) {
        this._allowSearch = normalizeBoolean(value);
    }

    /**
     * Size of the button. Available options include auto and stretch.
     *
     * @type {string}
     * @public
     * @default auto
     */
    @api
    get buttonSize() {
        return this._buttonSize;
    }
    set buttonSize(value) {
        this._buttonSize = normalizeString(value, {
            fallbackValue: BUTTON_SIZES.default,
            validValues: BUTTON_SIZES.valid
        });

        if (this._buttonSize === 'stretch') {
            this.classList.add('slds-button_stretch');
        } else {
            this.classList.remove('slds-button_stretch');
        }
    }

    /**
     * If present, the menu cannot be opened by users.
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
     * Describes the position of the icon with respect to body. Options include left and right.
     *
     * @type {string}
     * @public
     * @default left
     */
    @api
    get iconPosition() {
        return this._iconPosition;
    }
    set iconPosition(iconPosition) {
        this._iconPosition = normalizeString(iconPosition, {
            fallbackValue: ICON_POSITIONS.default,
            validValues: ICON_POSITIONS.valid
        });
    }

    /**
     * The size of the icon. Options include xx-small, x-small, small, medium, or large.
     *
     * @type {string}
     * @public
     * @default medium
     */
    @api
    get iconSize() {
        return this._iconSize;
    }
    set iconSize(iconSize) {
        this._iconSize = normalizeString(iconSize, {
            fallbackValue: ICON_SIZES.default,
            validValues: ICON_SIZES.valid
        });
    }

    /**
     * If present, the menu is in a loading state and shows a spinner.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    /**
     * Array of item objects.
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
        this.filteredItems = this._items;
    }

    /**
     * Determines the alignment of the menu relative to the button. Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right. The auto option aligns the dropdown menu based on available space.
     *
     * @type {string}
     * @public
     * @default left
     */
    @api
    get menuAlignment() {
        return this._menuAlignment;
    }
    set menuAlignment(value) {
        this._menuAlignment = normalizeString(value, {
            fallbackValue: MENU_ALIGNMENTS.default,
            validValues: MENU_ALIGNMENTS.valid
        });
    }

    /**
     * Maximum length of the menu. Valid values include 5-items, 7-items and 10-items.
     *
     * @type {string}
     * @default 7-items
     * @public
     */
    @api
    get menuLength() {
        return this._menuLength;
    }
    set menuLength(value) {
        this._menuLength = normalizeString(value, {
            fallbackValue: MENU_LENGTHS.default,
            validValues: MENU_LENGTHS.valid
        });
    }

    /**
     * Minimum width of the menu. Valid values include xx-small, x-small, small, medium and large.
     *
     * @type {string}
     * @default small
     * @public
     */
    @api
    get menuWidth() {
        return this._menuWidth;
    }
    set menuWidth(value) {
        this._menuWidth = normalizeString(value, {
            fallbackValue: MENU_WIDTHS.default,
            validValues: MENU_WIDTHS.valid
        });
    }

    /**
     * If present, a nubbin is present on the menu. A nubbin is a stub that protrudes from the menu item towards the button menu. The nubbin position is based on the menu-alignment.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get nubbin() {
        return this._nubbin;
    }
    set nubbin(value) {
        this._nubbin = normalizeBoolean(value);
    }

    /**
     * Value of the selected item.
     *
     * @public
     * @type {string}
     */
    @api
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = value;
    }

    /**
     * The variant changes the look of the button. Accepted variants include bare, bare-inverse, base, border, border-filled, border-inverse brand, brand-outline, container, destructive, destructive-text, inverse, neutral, reset and success.
     *
     * @type {string}
     * @public
     * @default border
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: BUTTON_VARIANTS.default,
            validValues: BUTTON_VARIANTS.valid
        });
    }

    /**
     * Deprecated. Use `allow-search` instead.
     *
     * @type {boolean}
     * @default false
     * @deprecated
     */
    @api
    get withSearch() {
        return this._allowSearch;
    }
    set withSearch(value) {
        this._allowSearch = normalizeBoolean(value);
        console.warn(
            'The "with-search" attribute is deprecated. Use "allow-search" instead.'
        );
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed Aria Expanded from dropdown menu.
     *
     * @type {string}
     */
    get computedAriaExpanded() {
        return String(this._dropdownVisible);
    }

    /**
     * Computed Aria Label from dropdown menu.
     *
     * @type {string}
     */
    get computedAriaLabel() {
        return this.label || this.title || this.alternativeText;
    }

    /**
     * Computed Button class styling.
     *
     * @type {string}
     */
    get computedButtonClass() {
        return classSet('')
            .add({
                'avonni-dynamic-menu__button': this.variant !== 'reset',
                'avonni-dynamic-menu__button_reset': this.variant === 'reset'
            })
            .toString();
    }

    /**
     * Computed Button variant.
     *
     * @type {string}
     */
    get computedButtonVariant() {
        return this.variant === 'reset' ? 'bare' : this.variant;
    }

    /**
     * Computed Dropdown class styling.
     *
     * @type {string}
     */
    get computedDropdownClass() {
        return classSet(
            'slds-is-absolute slds-dropdown slds-popover slds-dynamic-menu avonni-dynamic-menu__dropdown_color-background'
        )
            .add({
                'slds-dropdown_left':
                    this.menuAlignment === 'left' || this.isAutoAlignment,
                'slds-dropdown_center': this.menuAlignment === 'center',
                'slds-dropdown_right': this.menuAlignment === 'right',
                'slds-dropdown_bottom': this.menuAlignment === 'bottom-center',
                'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right':
                    this.menuAlignment === 'bottom-right',
                'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left':
                    this.menuAlignment === 'bottom-left',
                'slds-nubbin_top-left':
                    this.menuAlignment === 'left' && this.nubbin,
                'slds-nubbin_top-right':
                    this.menuAlignment === 'right' && this.nubbin,
                'slds-nubbin_top':
                    this.menuAlignment === 'center' && this.nubbin,
                'slds-nubbin_bottom-left':
                    this.menuAlignment === 'bottom-left' && this.nubbin,
                'slds-nubbin_bottom-right':
                    this.menuAlignment === 'bottom-right' && this.nubbin,
                'slds-nubbin_bottom':
                    this.menuAlignment === 'bottom-center' && this.nubbin,
                'slds-p-vertical_large': this.isLoading
            })
            .add(`slds-dropdown_${this.menuWidth}`)
            .toString();
    }

    /**
     * Computed list items.
     * @type {object[]}
     */
    get computedListItems() {
        return this.filteredItems.map((item, index) => {
            let { actions, avatar, label, meta, value } = item;
            const key = `item-key-${index}`;
            const metaJoin = meta ? meta.join(' • ') : null;
            const selected = this.value === value;
            const displayFigure = avatar || !this.hideCheckMark;
            const computedItemClass = classSet(
                'slds-listbox__option slds-media slds-media_center slds-listbox__option_plain'
            ).add({
                'slds-is-selected': selected
            });
            return {
                actions,
                avatar,
                key,
                label,
                metaJoin,
                selected,
                value,
                computedItemClass,
                displayFigure
            };
        });
    }

    /**
     * Check if the button size is stretch.
     *
     * @type {boolean}
     */
    get computedStrech() {
        return this.buttonSize === 'stretch';
    }

    /**
     * Check if menu is Auto Aligned.
     *
     * @type {boolean}
     */
    get isAutoAlignment() {
        return this.menuAlignment.startsWith('auto');
    }

    /**
     * Verify if there's Items to display.
     *
     * @type {boolean}
     */
    get showItems() {
        return this.computedListItems.length;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Simulates a mouse click on the button.
     *
     * @public
     */
    @api
    click() {
        if (this._connected) {
            if (this.label) {
                this.template
                    .querySelector('[data-element-id="button"]')
                    .click();
            } else {
                this.template
                    .querySelector('[data-element-id="button-icon"]')
                    .click();
            }
        }
    }

    /**
     * Set focus on the button.
     *
     * @public
     */
    @api
    focus() {
        if (this._connected) {
            this.focusOnButton();
        }
        /**
         * Focus event
         *
         * @event
         * @name focus
         */
        this.dispatchEvent(new CustomEvent('focus'));
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Allows Blur.
     */
    allowBlur() {
        this._cancelBlur = false;
    }

    /**
     * Return the list height.
     *
     * @type {string}
     */
    calculateListHeight() {
        let height = 10;
        let length = 7;
        if (this.menuLength === '5-items') {
            length = 5;
        } else if (this.menuLength === '10-items') {
            length = 10;
        }

        const items = this.template.querySelectorAll(
            '[data-element-id="item"]'
        );

        if (items) {
            height += getListHeight(items, length);
        }
        this.computedlistHeight = `max-height: ${height}px; overflow-y: auto;`;
    }

    /**
     * Cancels Blur.
     */
    cancelBlur() {
        this._cancelBlur = true;
    }

    /**
     * Close Dropdown menu.
     */
    close() {
        if (this._dropdownVisible) {
            this.toggleMenuVisibility();
        }
    }

    /**
     * Set the focus on the item at the saved focused index.
     */
    focusItem() {
        const focusedItem = this.template.querySelector(
            `[data-element-id="item"][data-index="${this._focusedIndex}"]`
        );
        if (focusedItem) {
            focusedItem.focus();
        }
    }

    /**
     * Button focus handler.
     */
    focusOnButton() {
        const buttonType = this.label ? 'button' : 'button-icon';
        const button = this.template.querySelector(
            `[data-element-id=${buttonType}`
        );
        if (button) {
            button.focus();
        }
    }

    /**
     * Set the focus on the dropdown menu.
     */
    focusDropdown() {
        if (this.isLoading) {
            return;
        }
        this.cancelBlur();
        requestAnimationFrame(() => {
            const focusTrap = this.template.querySelector(
                '[data-element-id="avonni-focus-trap"]'
            );
            if (focusTrap) {
                this._dropdownIsFocused = true;
                focusTrap.focus();

                if (this.computedListItems.length > 0) {
                    const selectedItemIndex = this.computedListItems.findIndex(
                        (item) => item.selected
                    );
                    this.switchFocus(selectedItemIndex);
                    if (!this.allowSearch) {
                        this.focusItem();
                    }
                }
            }
        });
    }

    /**
     * Normalize the focused index.
     *
     * @param {number} index Index to normalize.
     */
    normalizeFocusedIndex(index) {
        let position = 'INDEX';

        if (index < 0) {
            position = 'FIRST_ITEM';
        } else if (index > this.computedListItems.length - 1) {
            position = 'LAST_ITEM';
        }

        switch (position) {
            case 'FIRST_ITEM':
                return 0;
            case 'LAST_ITEM':
                return this.computedListItems.length - 1;
            default:
                return index;
        }
    }

    /**
     * Get bounding rect coordinates for dropdown menu.
     */
    pollBoundingRect() {
        if (this.isAutoAlignment && this._dropdownVisible) {
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            setTimeout(() => {
                if (this._connected) {
                    observePosition(this, 300, this._boundingRect, () => {
                        this.close();
                    });

                    this.pollBoundingRect();
                }
            }, 250);
        }
    }

    /**
     * Sets the order value of the button when in the context of a button-group or other ordered component
     * @param {string} order -  The order string (first, middle, last)
     */
    setOrder(order) {
        this._order = order;
    }

    /**
     * Update the focused index.
     *
     * @param {number} index Index of the new focused item.
     */
    switchFocus(index) {
        const normalizedIndex = this.normalizeFocusedIndex(index);
        const previousItem = this.template.querySelector(
            `[data-element-id="item"][data-index="${this._focusedIndex}"]`
        );
        if (previousItem) {
            previousItem.tabIndex = '-1';
        }
        this._focusedIndex = normalizedIndex;
        const item = this.template.querySelector(
            `[data-element-id="item"][data-index="${normalizedIndex}"]`
        );
        if (item) {
            item.tabIndex = '0';
        }
    }

    /**
     * Dropdown menu Visibility toggle.
     */
    toggleMenuVisibility() {
        if (!this.disabled) {
            this._dropdownVisible = !this._dropdownVisible;
            this.dropdownOpened = !this.dropdownOpened;

            if (this._dropdownVisible) {
                /**
                 * The event fired when you open the dropdown menu.
                 *
                 * @event
                 * @name open
                 * @public
                 */
                this.dispatchEvent(new CustomEvent('open'));
                this._boundingRect = this.getBoundingClientRect();
                this.pollBoundingRect();
                this.focusDropdown();
            } else {
                /**
                 * The event fired when you close the dropdown menu.
                 *
                 * @event
                 * @name close
                 * @public
                 */
                this.dispatchEvent(new CustomEvent('close'));
                this.filteredItems = this.items;
            }

            this.classList.toggle('slds-is-open');
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Blur Handler.
     */
    handleBlur() {
        if (this._cancelBlur) {
            return;
        }

        if (this._dropdownVisible) {
            this.toggleMenuVisibility();
        }
    }

    /**
     * Button Click handler.
     */
    handleButtonClick() {
        this.allowBlur();
        this.toggleMenuVisibility();
        this.focusOnButton();
    }

    /**
     * Button Mouse down event handler.
     *
     * @param {Event} event
     */
    handleButtonMouseDown(event) {
        const mainButton = 0;
        if (event.button === mainButton) {
            this.cancelBlur();
        }
    }

    /**
     * Handle a focus set inside the dropdown menu.
     */
    handleDropdownFocusIn() {
        this._dropdownIsFocused = true;
    }

    /**
     * Handle a focus lost inside the dropdown menu.
     */
    handleDropdownFocusOut() {
        this._dropdownIsFocused = false;

        requestAnimationFrame(() => {
            if (!this._dropdownIsFocused) {
                this.close();
            }
        });
    }

    /**
     * Handle a key up in the dropdown menu.
     *
     * @param {Event} event keyup event.
     */
    handleDropdownKeyUp(event) {
        const key = event.key;
        if (key === 'Escape') {
            this.close();

            requestAnimationFrame(() => {
                // Set the focus on the button after render
                this.focus();
            });
        }
    }

    /**
     * Dropdown menu Mouse down event handler.
     *
     * @param {Event} event
     */
    handleDropdownMouseDown(event) {
        const mainButton = 0;
        if (event.button === mainButton) {
            this.cancelBlur();
        }
    }

    /**
     * Dropdown menu Mouse up handler.
     */
    handleDropdownMouseUp() {
        this.allowBlur();
    }

    /**
     * Dropdown menu scroll event handler.
     *
     * @param {Event} event
     */
    handleDropdownScroll(event) {
        event.stopPropagation();
    }

    /**
     * Item Click handler.
     *
     * @param {Event} event
     */
    handleItemClick(event) {
        let target = event.target.getAttribute('data-element-id');
        let value = event.currentTarget.getAttribute('data-value');
        if (target === 'action') {
            /**
             * The event fired when a user clicks on an action.
             *
             * @event
             * @name actionclick
             * @param {string} name Name of the action clicked.
             * @param {string} item The value of the item.
             * @public
             */
            this.dispatchEvent(
                new CustomEvent('actionclick', {
                    detail: {
                        name: event.target.name,
                        item: value
                    }
                })
            );
        } else {
            /**
             * Select event.
             *
             * @event
             * @name select
             * @param {string} value The value of the selected item.
             * @cancelable
             * @public
             */
            this.dispatchEvent(
                new CustomEvent('select', {
                    cancelable: true,
                    detail: {
                        value
                    }
                })
            );
            this._value = value;
        }

        this.toggleMenuVisibility();
    }

    /**
     * Handle a focus on an item.
     *
     * @param {Event} event `focus` event.
     */
    handleItemFocus(event) {
        const index = Number(event.currentTarget.dataset.index);
        if (index !== this._focusedIndex) {
            this.switchFocus(index);
        }
    }

    /**
     * Key down event handler.
     *
     * @param {Event} event
     */
    handleItemKeyDown(event) {
        switch (event.key) {
            case keyValues.left:
            case keyValues.up: {
                // Prevent the page from scrolling
                event.preventDefault();
                this.switchFocus(this._focusedIndex - 1);
                this.focusItem();
                break;
            }
            case keyValues.right:
            case keyValues.down: {
                // Prevent the page from scrolling
                event.preventDefault();
                this.switchFocus(this._focusedIndex + 1);
                this.focusItem();
                break;
            }
            case keyValues.space:
            case keyValues.spacebar:
            case keyValues.enter:
                // Prevent the page from scrolling
                event.preventDefault();
                this.handleItemClick(event);
                break;
            default:
                break;
        }
    }

    /**
     * Mouse Enter handler. Adds display action class.
     *
     * @param {Event} event
     */
    handleItemMouseEnter(event) {
        event.currentTarget.classList.add(
            'avonni-dynamic-menu__display_action'
        );
    }

    /**
     * Mouse Leave handler. Removes display action class.
     *
     * @param {Event} event
     */
    handleItemMouseLeave(event) {
        event.currentTarget.classList.remove(
            'avonni-dynamic-menu__display_action'
        );
    }

    /**
     * Key up event handler.
     *
     * @param {Event} event
     */
    handleKeyUp(event) {
        let filter = event.target.value.toLowerCase();
        this.filteredItems = this.items.filter((item) => {
            return (
                item.label.toLowerCase().indexOf(filter) > -1 ||
                item.value.toLowerCase().indexOf(filter) > -1
            );
        });
    }

    /**
     * Handles the search change event.
     *
     * @param {Event} event
     */
    handleSearchChange(event) {
        if (!event.target.value) {
            this.filteredItems = this.items;
        }
    }
}
