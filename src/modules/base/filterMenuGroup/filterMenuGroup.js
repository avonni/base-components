import { AvonniResizeObserver } from 'c/resizeObserver';
import {
    classSet,
    deepCopy,
    normalizeArray,
    normalizeBoolean,
    normalizeObject,
    normalizeString
} from 'c/utils';
import { equal } from 'c/utilsPrivate';
import { LightningElement, api } from 'lwc';
import Menu from './menu';

const DEFAULT_APPLY_BUTTON_LABEL = 'Apply';
const DEFAULT_RESET_BUTTON_LABEL = 'Reset';
const DEFAULT_WEEK_START_DAY = 0;
const MENU_VARIANTS = {
    valid: ['horizontal', 'vertical'],
    default: 'horizontal'
};
const FILTER_MENU_MARGIN = 4;
const FILTER_MENU_POPOVER_BUTTON_SIZE = 32;

const MENU_GROUP_ALIGNS = {
    valid: ['left', 'center', 'right'],
    default: 'left'
};

/**
 * @class
 * @descriptor avonni-filter-menu-group
 * @storyId example-filter-menu-group--base
 * @public
 */
export default class FilterMenuGroup extends LightningElement {
    _applyButtonLabel = DEFAULT_APPLY_BUTTON_LABEL;
    _align = MENU_GROUP_ALIGNS.default;
    _hideApplyButton = false;
    _hideApplyResetButtons = false;
    _hideSelectedItems = false;
    _menus = [];
    _resetButtonLabel = DEFAULT_RESET_BUTTON_LABEL;
    _singleLine = false;
    _value = {};
    _variant = MENU_VARIANTS.default;
    _weekStartDay = DEFAULT_WEEK_START_DAY;

    computedMenus = [];
    selectedPills = [];
    _computedMenusWhenLastOverflow = [];
    _connected = false;
    _containerMaxHeight = 0;
    _hasCalculatedOverflow = false;
    _hasRecalculatedValue = false;
    _hiddenMenusLength = 0;
    _isCalculatingOverflow = false;
    _isPopoverOpen = false;
    _itemsWidths = [];
    _itemsWidthsTotal = 0;
    _openedMenuCount = 0;
    _resizeObserver;
    _selectedValue = {};
    _sliceIndex = 0;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.computeValue();
        this._connected = true;
    }

    renderedCallback() {
        if (!this._resizeObserver && this.showSingleLine) {
            this._resizeObserver = this.initResizeObserver();
        } else if (this._resizeObserver && !this.showSingleLine) {
            this._resizeObserver.disconnect();
            this._resizeObserver = undefined;
        }
    }

    disconnectedCallback() {
        if (this._resizeObserver) {
            this._resizeObserver.disconnect();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Alignment of the menu group. Valid values include left, center, right. This attribute isn’t supported for the vertical variant.
     *
     * @type {string}
     * @public
     * @default left
     */
    @api
    get align() {
        return this._align;
    }
    set align(align) {
        this._align = normalizeString(align, {
            fallbackValue: MENU_GROUP_ALIGNS.default,
            validValues: MENU_GROUP_ALIGNS.valid
        });
    }

    /**
     * Label of the apply button.
     *
     * @type {string}
     * @public
     * @default Apply
     */
    @api
    get applyButtonLabel() {
        return this._applyButtonLabel;
    }
    set applyButtonLabel(value) {
        this._applyButtonLabel =
            value && typeof value === 'string'
                ? value.trim()
                : DEFAULT_APPLY_BUTTON_LABEL;
    }

    /**
     * If present, the apply button is hidden and the value is immediately saved every time the selection changes.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get hideApplyButton() {
        return this._hideApplyButton;
    }
    set hideApplyButton(value) {
        this._hideApplyButton = normalizeBoolean(value);
    }

    /**
     * If present, the apply and reset buttons are hidden and the value is immediately saved every time the selection changes.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get hideApplyResetButtons() {
        return this._hideApplyResetButtons;
    }
    set hideApplyResetButtons(value) {
        this._hideApplyResetButtons = normalizeBoolean(value);
    }

    /**
     * If present, the selected items are hidden.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get hideSelectedItems() {
        return this._hideSelectedItems;
    }
    set hideSelectedItems(bool) {
        this._hideSelectedItems = normalizeBoolean(bool);
    }

    /**
     * Array of menu objects.
     *
     * @type {object[]}
     * @public
     */
    @api
    get menus() {
        return this._menus;
    }
    set menus(value) {
        this._menus = deepCopy(normalizeArray(value, 'object'));
        this.computedMenus = this._menus.map((menu) => {
            return new Menu(menu);
        });

        if (this._connected) {
            this.computeValue();
        }
    }

    /**
     * Label of the reset button.
     *
     * @type {string}
     * @public
     * @default Reset
     */
    @api
    get resetButtonLabel() {
        return this._resetButtonLabel;
    }
    set resetButtonLabel(value) {
        this._resetButtonLabel =
            value && typeof value === 'string'
                ? value.trim()
                : DEFAULT_RESET_BUTTON_LABEL;
    }

    /**
     * If present, the menus are limited to one line. This attribute isn’t supported for the vertical variant.
     *
     * @type {boolean}
     * @default false
     */
    @api
    get singleLine() {
        return this._singleLine;
    }
    set singleLine(value) {
        this._singleLine = normalizeBoolean(value);
        if (this._connected && !this._resizeObserver && this.showSingleLine) {
            this._resizeObserver = this.initResizeObserver();
        }
    }

    /**
     * Value of the menus. The object follows the structure `{ menuName: menuValue }`.
     * Depending on the menu type, its value will have a different type:
     * * `list`: selected item’s value, or array of selected items' values.
     * * `range`: array of selected numbers.
     * * `date-range`: array of ISO 8601 dates.
     *
     * @type {object}
     * @public
     */
    @api
    get value() {
        return this._value;
    }
    set value(value) {
        this._value = deepCopy(normalizeObject(value));

        if (this._connected) {
            this.computeValue();
        }
    }

    /**
     * The variant changes the look of the menu group. Accepted variants include horizontal and vertical.
     *
     * @type {string}
     * @public
     * @default horizontal
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: MENU_VARIANTS.default,
            validValues: MENU_VARIANTS.valid
        });
        if (this._connected && !this._resizeObserver && this.showSingleLine) {
            this._resizeObserver = this.initResizeObserver();
        }
    }

    /**
     * Used by the `date-range` menu type. Day displayed as the first day of the week. The value has to be a number between 0 and 6, 0 being Sunday, 1 being Monday, and so on until 6.
     *
     * @type {number}
     * @default 0
     * @public
     */
    @api
    get weekStartDay() {
        return this._weekStartDay;
    }
    set weekStartDay(value) {
        const number = parseInt(value, 10);
        this._weekStartDay =
            isNaN(number) || number < 0 || number > 6
                ? DEFAULT_WEEK_START_DAY
                : number;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Placement of the popover.
     *
     * @type {string}
     */
    get buttonPopoverPlacement() {
        if (!this.moreFilterElement) {
            return 'auto';
        }
        const rect = this.moreFilterElement.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const viewportCenterX = window.innerWidth / 2;
        const horizontal = elementCenterX < viewportCenterX ? 'left' : 'right';
        return horizontal;
    }

    /**
     * Position of the reset button
     *
     * @type {string}
     */
    get menuResetButtonPosition() {
        return this.isVertical ? 'top' : 'bottom';
    }

    /**
     * Button Icon Popover Class Styling
     *
     * @type {string}
     */
    get computedButtonIconPopoverClass() {
        const isInHiddenMenus = Object.keys(this.value || {}).some((key) =>
            this.hiddenMenus?.some((menu) => menu.name === key)
        );
        return classSet(
            'slds-show_inline-block slds-text-align_left avonni-filter-menu-group__button-icon-popover'
        )
            .add({
                'avonni-filter-menu-group__button-icon-popover-selected':
                    isInHiddenMenus
            })
            .toString();
    }

    /**
     * Filters class styling
     *
     * @type {string}
     */
    get computedFiltersClass() {
        return classSet({
            'slds-m-right_xx-small': !this.isVertical,
            'slds-m-bottom_small': this.isVertical
        });
    }

    /**
     * Filter Wrapper class styling
     *
     * @type {string}
     */
    get computedFiltersWrapperClass() {
        return classSet({
            'slds-grid': !this.isVertical,
            'slds-grid_align-center':
                !this.isVertical && this.align === 'center',
            'slds-grid_align-end': !this.isVertical && this.align === 'right',
            'slds-wrap': !this.isVertical,
            'slds-grid_vertical-align-center': !this.isVertical,
            'slds-hidden': this._isCalculatingOverflow && this.showSingleLine
        }).toString();
    }

    /**
     * Selected items class wrapper styling for the horizontal variant
     *
     * @type {string}
     */
    get computedHorizontalSelectedItemsWrapperClass() {
        return classSet('slds-grid')
            .add({
                'slds-grid_align-end': this.align === 'right',
                'slds-grid_align-center': this.align === 'center'
            })
            .toString();
    }

    /**
     * Dynamically compute the hidden menus based on the slice index.
     *
     * @type {object[]}
     */
    get hiddenMenus() {
        return this.computedMenus.slice(this._sliceIndex);
    }

    /**
     * True if the apply and reset buttons should be hidden for each menu.
     *
     * @type {boolean}
     */
    get hideMenuApplyButtons() {
        return (
            this.hideApplyButton ||
            this.hideApplyResetButtons ||
            this.isVertical
        );
    }

    /**
     * True if the apply and reset buttons should be hidden for each menu.
     *
     * @type {boolean}
     */
    get hideMenuApplyResetButtons() {
        return !this.isVertical && this.hideApplyResetButtons;
    }

    /**
     * True if the apply and reset buttons should be hidden for each hidden menu.
     *
     * @type {boolean}
     */
    get hideHiddenMenuApplyButton() {
        return this.hideApplyButton || this.hideApplyResetButtons;
    }

    /**
     * True if the menu group shows a single line
     *
     * @type {boolean}
     */
    get showSingleLine() {
        return !this.isVertical && this.singleLine;
    }

    /**
     * Check if Vertical variant.
     *
     * @type {boolean}
     */
    get isVertical() {
        return this.variant === 'vertical';
    }

    /**
     * Check if there is an overflow from the visible menus.
     *
     * @type {boolean}
     */
    get isOverflow() {
        return this._hiddenMenusLength > 0 && this.showSingleLine;
    }

    /**
     * Returns the list of filter menu elements.
     *
     * @type {NodeListOf<HTMLElement>}
     */
    get listMenus() {
        return this.template.querySelectorAll(
            '[data-element-id="avonni-filter-menu"]'
        );
    }

    /**
     * Return the menu group wrapper.
     *
     * @type {Element}
     */
    get menuGroupWrapper() {
        return this.template.querySelector('[data-element-id="ul"]');
    }

    /**
     * Return the button icon popover.
     *
     * @type {Element}
     */
    get moreFilterElement() {
        return this.template.querySelector(
            '[data-element-id="filter-menu-group-button-icon-popover"]'
        );
    }

    /**
     * Returns the pill actions.
     *
     * @type {object[]}
     */
    get pillActions() {
        return [
            {
                label: 'Remove',
                name: 'remove',
                iconName: 'utility:close'
            }
        ];
    }

    /**
     * True if the apply and reset buttons should be displayed at the end of the menus.
     *
     * @type {boolean}
     */
    get showApplyResetButtons() {
        return this.isVertical && !this.hideApplyResetButtons;
    }

    /**
     * True if some filter options are selected, and the filter menu is horizontal.
     *
     * @type {boolean}
     */
    get showHorizontalSelectedItems() {
        return (
            !this.isVertical &&
            !this.hideSelectedItems &&
            this.selectedPills.length
        );
    }

    /**
     * True if some filter options are selected, and the filter menu is vertical.
     *
     * @type {boolean}
     */
    get showVerticalSelectedItems() {
        return (
            this.isVertical &&
            !this.hideSelectedItems &&
            this.selectedPills.length
        );
    }

    /**
     * Dynamically compute the visible menus based on the slice index.
     *
     * @type {object[]}
     */
    get visibleMenus() {
        return this.showSingleLine
            ? this.computedMenus.slice(0, this._sliceIndex)
            : this.computedMenus;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Save the currently selected values.
     *
     * @public
     */
    @api
    apply() {
        this.updateRecalculationFlag();
        this._value = deepCopy(this._selectedValue);
        this.computeValue();
    }

    /**
     * Clear the value.
     *
     * @deprecated
     */
    @api
    clear() {
        this._value = {};
        this.computeValue();

        console.warn(
            'The clear() method is deprecated. To unselect the value, use reset(). To remove the current value, use the value attribute.'
        );
    }

    /**
     * Set the focus on the first focusable element.
     *
     * @public
     */
    @api
    focus() {
        const element = this.template.querySelector(
            '[data-group-name="focusable-element"]'
        );
        if (element) {
            element.focus();
        }
    }

    /**
     * Set the focus on the search input of the given menu.
     *
     * @param {string} name Name of the menu that should receive the focus.
     * @public
     */
    @api
    focusSearchInput(name) {
        const element = this.template.querySelector(`[data-name="${name}"]`);
        if (element) {
            element.focusSearchInput();
        }
    }

    /**
     * Unselect all values, without saving the change.
     *
     * @public
     */
    @api
    reset() {
        this._selectedValue = {};
        this.computedMenus.forEach((menu) => {
            menu.value = [];
        });
        this.computedMenus = [...this.computedMenus];
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Checks if a computation of the visible menus is allowed.
     *
     * @returns {boolean} True if a computation of the visible menus is allowed.
     */
    allowVisibleMenusComputation() {
        return (
            this._connected &&
            this.menuGroupWrapper &&
            this.showSingleLine &&
            this._openedMenuCount === 0 &&
            !this._isCalculatingOverflow &&
            !this._isPopoverOpen
        );
    }

    /**
     * Compute the slice index for the hidden menus.
     *
     * @param {number} wrapperWidth Width of the menu group wrapper.
     * @returns {number} Slice index
     */
    computeSliceIndex(wrapperWidth) {
        let sliceIndex =
            this._itemsWidthsTotal < wrapperWidth
                ? this.computedMenus.length
                : 0;

        if (sliceIndex !== this.computedMenus.length) {
            let totalWidth = FILTER_MENU_POPOVER_BUTTON_SIZE;
            sliceIndex = 0;
            for (const menuWidth of this._itemsWidths) {
                if (totalWidth + menuWidth > wrapperWidth) break;
                totalWidth += menuWidth;
                sliceIndex++;
            }
        }
        return sliceIndex;
    }

    /**
     * Set the value in each computed menu.
     */
    computeValue() {
        const pills = [];
        this.computedMenus.forEach((menu) => {
            menu.value = deepCopy(this.value[menu.name]);
            pills.push(menu.selectedItems);
        });
        this.selectedPills = pills.flat();
        this._selectedValue = deepCopy(this.value);
        // Make sure the visible menus are all displayed.
        if (this._hiddenMenusLength === 0) {
            this._sliceIndex = this.computedMenus.length;
        }
        if (this.isDifferentComputedMenu()) {
            this.updateVisibleMenus();
        }
    }

    /**
     * Initialize the screen resize observer.
     *
     * @returns {AvonniResizeObserver} Resize observer.
     */
    initResizeObserver() {
        if (!this.menuGroupWrapper) {
            return null;
        }
        return new AvonniResizeObserver(this.menuGroupWrapper, () => {
            this.updateVisibleMenusOnResize();
        });
    }

    /**
     * Check if the menus have changed since the last overflow calculation.
     *
     * @returns {boolean} True if the menus have changed since the last overflow calculation.
     */
    isDifferentComputedMenu() {
        const currentMenusState = this.computedMenus.map((menu) => ({
            name: menu.name,
            label: menu.label
        }));

        return !equal(currentMenusState, this._computedMenusWhenLastOverflow);
    }

    /**
     * Save all items widths, to compute their visibility later.
     */
    saveItemsWidths() {
        this._itemsWidths = [];
        this._itemsWidthsTotal = 0;

        for (const listMenu of this.listMenus) {
            const width =
                listMenu.getBoundingClientRect().width + FILTER_MENU_MARGIN;
            this._itemsWidths.push(width);
            this._itemsWidthsTotal += width;
        }
    }

    /**
     * Save the container max height, to compute their visibility later.
     *
     * @param {number} sliceIndex The index at which the menus appear in the popover.
     */
    saveContainerMaxHeight(sliceIndex) {
        const childHeights = Array.from(this.listMenus).map(
            (el) => el.offsetHeight
        );
        const maxChildHeight = childHeights.length
            ? Math.max(...childHeights)
            : 0;

        let tallestChildHeight;

        if (sliceIndex === 0) {
            tallestChildHeight = FILTER_MENU_POPOVER_BUTTON_SIZE;
        } else if (sliceIndex === this.computedMenus.length) {
            tallestChildHeight = maxChildHeight;
        } else {
            tallestChildHeight = Math.max(
                FILTER_MENU_POPOVER_BUTTON_SIZE,
                maxChildHeight
            );
        }
        this._containerMaxHeight = tallestChildHeight;
    }

    /**
     * Updates the internal recalculation flag based on the value of the first hidden menu.
     * The flag is set to true if the menu value has changed since the last stored value.
     * This flag is used to determine whether the visible menus needs to be updated after a value change.
     */
    updateRecalculationFlag() {
        if (!this.showSingleLine || !this._isPopoverOpen) {
            this._hasRecalculatedValue = false;
            return;
        }
        const name = this.hiddenMenus[0]?.name;
        if (!name) {
            this._hasRecalculatedValue = false;
            return;
        }

        const newValue = this._selectedValue[name] ?? [];
        const oldValue = this._value[name] ?? [];

        this._hasRecalculatedValue = !equal(newValue, oldValue);
    }

    /**
     * Re-evaluates and updates the visible menus when the component is resized.
     */
    updateVisibleMenusOnResize() {
        if (!this.allowVisibleMenusComputation()) {
            this._hasCalculatedOverflow = false;
            return;
        }

        if (
            this._containerMaxHeight === this.menuGroupWrapper.offsetHeight &&
            this._hasCalculatedOverflow
        ) {
            this._hasCalculatedOverflow = false;
            return;
        }

        if (!this._itemsWidthsTotal) {
            this.saveItemsWidths();
            this.saveContainerMaxHeight(this._sliceIndex);
        }

        this.listMenus.forEach((listMenu, i) => {
            const width =
                listMenu.getBoundingClientRect().width + FILTER_MENU_MARGIN;

            const oldWidth = this._itemsWidths[i] || 0;
            this._itemsWidthsTotal += width - oldWidth;
            this._itemsWidths[i] = width;
        });

        let wrapperWidth = this.menuGroupWrapper.offsetWidth;
        let sliceIndex = this.computeSliceIndex(wrapperWidth);

        if (
            this._sliceIndex !== sliceIndex ||
            this._containerMaxHeight !== this.menuGroupWrapper.offsetHeight
        ) {
            this.updateVisibleMenus(this.menuGroupWrapper.offsetWidth);
        }
    }

    /**
     * Update the visible items.
     *
     * @param {number} maxWidth Max width of the menu group wrapper.
     */
    updateVisibleMenus(maxWidth) {
        if (!this.allowVisibleMenusComputation()) {
            this._hasCalculatedOverflow = false;
            return;
        }
        this._sliceIndex = this.computedMenus.length;
        this._isCalculatingOverflow = true;
        // Waiting for the items to be rendered
        requestAnimationFrame(() => {
            let wrapperWidth = maxWidth ?? this.menuGroupWrapper.offsetWidth;
            this.saveItemsWidths();
            let sliceIndex = this.computeSliceIndex(wrapperWidth);
            this.saveContainerMaxHeight(sliceIndex);
            this.updateVisibleState(sliceIndex);
        });

        // Put as many items as needed in the more filters popver if the new menu display is still overflowing.
        const adjustOverflowStep = () => {
            if (
                this._containerMaxHeight !==
                    this.menuGroupWrapper.offsetHeight &&
                this._sliceIndex > 0
            ) {
                const sliceIndex = Math.max(0, this._sliceIndex - 1);
                this.updateVisibleState(sliceIndex);
                requestAnimationFrame(adjustOverflowStep);
            } else {
                this._isCalculatingOverflow = false;
                this._hasCalculatedOverflow = true; // Prevents infinite loops of resize
            }
        };

        requestAnimationFrame(adjustOverflowStep);
    }

    /**
     * Update the visible state based on the index at which menus appear in the popover.
     *
     * @param {number} sliceIndex The index at which the menus appear in the popover.
     */
    updateVisibleState(sliceIndex) {
        this._sliceIndex = sliceIndex;
        this.saveContainerMaxHeight(sliceIndex);
        this._hiddenMenusLength = this.hiddenMenus.length;
        this._computedMenusWhenLastOverflow = this.computedMenus.map(
            (menu) => ({
                name: menu.name,
                label: menu.label
            })
        );
        this._openedMenuCount = 0;
        this._hasRecalculatedValue = false;
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Handle a click on an "Apply" button, in the horizontal variant.
     *
     * @param {Event} event `apply` event fired by the menu.
     */
    handleApply(event) {
        event.stopPropagation();
        if (this.hideMenuApplyButtons) {
            // The apply and select events are fired at the same time
            return;
        }
        const menuName = event.target.dataset.name;
        this.value[menuName] = event.detail.value;
        this.computeValue();
        this.dispatchApply(menuName);
    }

    /**
     * Handle the click on the "Apply" button, in the vertical variant.
     */
    handleApplyClick() {
        this.apply();
        this.dispatchApply();
    }

    /**
     * Handle the closing of a menu popover.
     *
     * @param {Event} event close event fired by the menu.
     */
    handleClose(event) {
        event.stopPropagation();
        const menuName = event.target.dataset.name;
        const isVisibleMenu = this.visibleMenus.find(
            (m) => m.name === menuName
        );
        if (isVisibleMenu) {
            this._openedMenuCount = Math.max(0, this._openedMenuCount - 1);
            this.updateVisibleMenusOnResize();
        }

        /**
         * The event fired when a dropdown is closed (horizontal variant) or a section is closed (vertical variant).
         *
         * @event
         * @name close
         * @param {string} name Name of the closed menu.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('close', {
                detail: {
                    name: menuName
                }
            })
        );
    }

    /**
     * Handle the load more event.
     *
     * @param {Event} event `loadmore` event fired by the menu.
     */
    handleLoadMore(event) {
        event.stopPropagation();
        const menuName = event.target.dataset.name;

        /**
         * The event fired when the end of a list is reached. It is only fired if the `enableInfiniteLoading` type attribute is present on the menu. In the horizontal variant, the `loadmore` event is triggered by a scroll to the end of the list. In the vertical variant, the `loadmore` event is triggered by a button clicked by the user or by a nested item opening.
         *
         * @event
         * @name loadmore
         * @param {object} item If the event was triggered by a nested item, definition of this item.
         * @param {string} name Name of the menu that triggered the event.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('loadmore', {
                detail: { item: event.detail.item, name: menuName }
            })
        );
    }

    /**
     * Handle the nb filter items event.
     *
     * @param {Event} event `loadtotalcount` event fired by the menu.
     */
    handleLoadTotalCount(event) {
        event.stopPropagation();
        const menuName = event.target.dataset.name;

        /**
         * The event fired when the list is opened or the search term is modified.
         *
         * @event
         * @name loadtotalcount
         * @param {string} name Name of the menu that triggered the event.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('loadtotalcount', {
                detail: { name: menuName }
            })
        );
    }

    /**
     * Handle the opening of the more filters button.
     *
     * @param {Event} event open event fired by the popover.
     */
    handleMoreFiltersOpen(event) {
        event.stopPropagation();
        const elementId = event.target.dataset.elementId;
        if (elementId === 'filter-menu-group-button-icon-popover') {
            if (this.moreFilterElement) {
                this._hasRecalculatedValue = false;
                this._isPopoverOpen = true;
            }
            return;
        }
        this.handleOpen(event);
    }

    /**
     * Handle the closing of the more filters button.
     *
     * @param {Event} event close event fired by the popover.
     */
    handleMoreFiltersClose(event) {
        event.stopPropagation();
        const elementId = event.target.dataset.elementId;
        if (elementId === 'filter-menu-group-button-icon-popover') {
            requestAnimationFrame(() => {
                const isAllClosed =
                    !this.moreFilterElement?.classList.contains(
                        'slds-is-open'
                    ) && this._openedMenuCount === 0;
                if (isAllClosed) {
                    this._isPopoverOpen = false;
                    if (this._hasRecalculatedValue) {
                        this._hasRecalculatedValue = false;
                        this.updateVisibleMenus();
                    } else {
                        this.updateVisibleMenusOnResize();
                    }
                }
            });
            return;
        }
        this.handleClose(event);
    }

    /**
     * Handle the opening of a menu popover.
     *
     * @param {Event} event open event fired by the menu.
     */
    handleOpen(event) {
        event.stopPropagation();
        const menuName = event.target.dataset.name;
        if (this.visibleMenus.find((m) => m.name === menuName)) {
            this._openedMenuCount = Math.max(0, this._openedMenuCount + 1);
        }

        /**
         * The event fired when a dropdown is opened (horizontal variant) or a section is opened (vertical variant).
         *
         * @event
         * @name open
         * @param {string} name Name of the opened menu.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('open', {
                detail: {
                    name: menuName
                }
            })
        );
    }

    /**
     * Handle a click on a "Reset" button, in the horizontal variant or the vertical variant.
     *
     * @param {Event} event `reset` event fired by the menu.
     */
    handleReset(event) {
        event.stopPropagation();
        const menuName = event.target.dataset.name;

        // A reset can be send in the horizontal variant from the hidden menus
        // even if hideApplyResetButtons is true.
        const shouldSaveImmediately =
            this.hideApplyButton || this.hideApplyResetButtons;

        delete this._selectedValue[menuName];
        this.dispatchReset(menuName);
        // Save the reset immediately
        if (shouldSaveImmediately) {
            this.apply();
            this.dispatchApply(menuName);
        }
    }

    /**
     * Handle an input in a search field.
     *
     * @param {Event} event `search` event fired by the menu.
     */
    handleSearch(event) {
        event.stopPropagation();
        const menuName = event.target.dataset.name;
        const value = event.detail.value;

        /**
         * The event fired when a search input value is changed.
         *
         * @event
         * @name search
         * @param {string} name Name of the menu that triggered the event.
         * @param {string} value Value of the search input.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('search', {
                detail: {
                    name: menuName,
                    value
                }
            })
        );
    }

    /**
     * Handle the removal of a selected item pill.
     *
     * @param {Event} event `actionclick` event fired by the pill container.
     */
    handleSelectedItemRemove(event) {
        const index = event.detail.index;
        const selectedPill = this.selectedPills.splice(index, 1)[0];
        const { menuName, itemValue } = selectedPill;

        // Update the menu value
        if (itemValue) {
            const menu = this.computedMenus.find((m) => m.name === menuName);
            this.value[menuName] = menu.value.filter((v) => {
                return v !== selectedPill.itemValue;
            });
        } else {
            delete this.value[menuName];
        }
        this.computeValue();
        this.updateVisibleMenus();
        this.dispatchApply();
    }

    /**
     * Handle the selection of a new value in one of the menus.
     *
     * @param {Event} event `select` event fired by the menu.
     */
    handleSelect(event) {
        event.stopPropagation();
        const menuName = event.target.dataset.name;
        const value = event.detail.value;

        if (!value.length) {
            delete this._selectedValue[menuName];
        } else {
            this._selectedValue[menuName] = value;
        }

        /**
         * The event fired when a user selects or unselects a value.
         *
         * @event
         * @name select
         * @param {string} name Name of the menu.
         * @param {string} value Currently displayed value of the menu.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('select', {
                detail: {
                    name: menuName,
                    value
                }
            })
        );

        // Save the selection immediately
        if (this.hideApplyButton || this.hideApplyResetButtons) {
            this.apply();
            this.dispatchApply(menuName);
        }
    }

    /**
     * Dispatch the apply event.
     *
     * @param {string} name Name of the menu that triggered the event, if any.
     */
    dispatchApply(name) {
        /**
         * The event fired when an "Apply" button is clicked, or a pill removed from the selected items.
         *
         * @event
         * @name apply
         * @param {string} name In the horizontal variant, name of the menu that triggered the event.
         * @param {object} value Current value of the filter menu group.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('apply', {
                detail: {
                    name,
                    value: this.value
                }
            })
        );
    }

    /**
     * Dispatch the reset event.
     *
     * @param {string} name Name of the menu that triggered the event, if any.
     */
    dispatchReset(name) {
        /**
         * The event fired when a "Reset" button is clicked.
         *
         * @event
         * @name reset
         * @param {string} name In the horizontal variant, name of the menu that triggered the event.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('reset', {
                detail: {
                    name
                }
            })
        );
    }
}
