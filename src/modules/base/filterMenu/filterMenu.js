/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { LightningElement, api, track } from 'lwc';
import {
    dateTimeObjectFrom,
    deepCopy,
    normalizeBoolean,
    normalizeObject,
    normalizeString,
    normalizeArray,
    observePosition,
    animationFrame,
    timeout
} from 'c/utilsPrivate';
import { numberFormat } from 'c/internationalizationLibrary';
import { classSet } from 'c/utils';
import { Tooltip } from 'c/tooltipLibrary';
import {
    Direction,
    startPositioning,
    stopPositioning
} from 'c/positionLibrary';

import filterMenuVertical from './filterMenuVertical.html';
import filterMenu from './filterMenu.html';

const ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'medium'
};

const MENU_ALIGNMENTS = {
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

const BUTTON_VARIANTS = {
    valid: [
        'bare',
        'container',
        'border',
        'border-filled',
        'bare-inverse',
        'border-inverse'
    ],
    default: 'border'
};

const LOAD_MORE_OFFSET = 20;

const MENU_VARIANTS = {
    valid: ['horizontal', 'vertical'],
    default: 'horizontal'
};

const MENU_WIDTHS = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'small'
};

const MENU_LENGTHS = {
    valid: ['5-items', '7-items', '10-items'],
    default: '7-items'
};

const TYPE_ATTRIBUTES = {
    'date-range': [
        'dateStyle',
        'labelEndDate',
        'labelEndTime',
        'labelStartDate',
        'labelStartTime',
        'timeStyle',
        'type'
    ],
    list: [
        'allowSearch',
        'dropdownLength',
        'dropdownWidth',
        'enableInfiniteLoading',
        'isMultiSelect',
        'items',
        'searchInputPlaceholder'
    ],
    range: [
        'hideMinMaxValues',
        'max',
        'min',
        'showPin',
        'showTickMarks',
        'step',
        'tickMarkStyle',
        'unit',
        'unitAttributes'
    ]
};

const TYPES = {
    default: 'list',
    valid: ['date-range', 'list', 'range']
};

const i18n = {
    loading: 'Loading',
    showMenu: 'Show Menu'
};

const DEFAULT_ICON_NAME = 'utility:down';
const DEFAULT_SEARCH_INPUT_PLACEHOLDER = 'Search...';
const DEFAULT_APPLY_BUTTON_LABEL = 'Apply';
const DEFAULT_RANGE_VALUE = [0, 100];
const DEFAULT_RESET_BUTTON_LABEL = 'Reset';

/**
 * @class
 * @descriptor avonni-filter-menu
 * @storyId example-filter-menu--base
 * @public
 */
export default class FilterMenu extends LightningElement {
    /**
     * The keyboard shortcut for the button menu (horizontal variant) or the checkbox group (vertical variant).
     *
     * @type {string}
     * @public
     */
    @api accessKey;
    /**
     * Label of the menu.
     *
     * @type {string}
     * @public
     */
    @api label;
    /**
     * Specifies the name of the filter menu.
     *
     * @type {string}
     * @public
     */
    @api name;
    /**
     * Title of the button (horizontal variant) or the label (vertical variant).
     *
     * @type {string}
     * @public
     */
    @api title;

    _alternativeText = i18n.showMenu;
    _applyButtonLabel = DEFAULT_APPLY_BUTTON_LABEL;
    _buttonVariant = BUTTON_VARIANTS.default;
    _disabled = false;
    _dropdownAlignment = MENU_ALIGNMENTS.default;
    _dropdownLength = MENU_LENGTHS.default;
    _dropdownNubbin = false;
    _dropdownWidth = MENU_WIDTHS.default;
    _hideApplyResetButtons = false;
    _hideSelectedItems = false;
    _iconName = DEFAULT_ICON_NAME;
    _iconSize = ICON_SIZES.default;
    _isLoading = false;
    _isMultiSelect = false;
    _items = [];
    _loadingStateAlternativeText = i18n.loading;
    _resetButtonLabel = DEFAULT_RESET_BUTTON_LABEL;
    _searchInputPlaceholder = DEFAULT_SEARCH_INPUT_PLACEHOLDER;
    _showSearchBox = false;
    _tooltip;
    _type = TYPES.default;
    _typeAttributes = {};
    _value = [];
    _variant = MENU_VARIANTS.default;

    _allowBlur = true;
    _dropdownIsFocused = false;
    _order;
    _previousScroll;
    _searchTimeOut;

    @track computedItems = [];
    @track selectedItems = [];
    computedTypeAttributes = {};
    @track currentValue = [];
    dropdownVisible = false;
    fieldLevelHelp;
    searchTerm;

    connectedCallback() {
        // button-group necessities
        /**
        * Private button register event
        *
        * @event
        * @name privatebuttonregister
        * @param {object} callbacks
        * *setOrder : this.setOrder.bind(this),
        * *setDeRegistrationCallback: (deRegistrationCallback) => {
                        this._deRegistrationCallback = deRegistrationCallback;
                    }
        * @bubbles
        */
        const privatebuttonregister = new CustomEvent('privatebuttonregister', {
            bubbles: true,
            detail: {
                callbacks: {
                    setOrder: this.setOrder.bind(this),
                    setDeRegistrationCallback: (deRegistrationCallback) => {
                        this._deRegistrationCallback = deRegistrationCallback;
                    }
                }
            }
        });

        this.dispatchEvent(privatebuttonregister);
        this.normalizeTypeAttributes();
        this.computeListItems();
        this.computeSelectedItems();
        this._connected = true;

        if (
            this.isVertical &&
            this.infiniteLoad &&
            !this.isLoading &&
            !this.computedItems.length
        ) {
            // Fire the loadmore event without waiting for the user
            // to click on the load more button
            this.dispatchLoadMore();
        }
    }

    disconnectedCallback() {
        if (this._deRegistrationCallback) {
            this._deRegistrationCallback();
        }
    }

    renderedCallback() {
        this.initTooltip();

        if (
            this.infiniteLoad &&
            this.dropdownElement &&
            this.dropdownElement.scrollTop === 0
        ) {
            this.handleScroll();
        }
    }

    render() {
        if (this.isVertical) {
            return filterMenuVertical;
        }
        return filterMenu;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * The assistive text for the button menu. This attribute isn’t supported for the vertical variant.
     *
     * @type {string}
     * @public
     * @default Show Menu
     */
    @api
    get alternativeText() {
        return this._alternativeText;
    }
    set alternativeText(value) {
        this._alternativeText =
            typeof value === 'string' ? value.trim() : i18n.showMenu;
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
     * The button variant changes the look of the horizontal variant’s button. Accepted variants include bare, container, border, border-filled, bare-inverse, and border-inverse. This attribute isn’t supported for the vertical variant.
     *
     * @type {string}
     * @public
     * @default border
     */
    @api
    get buttonVariant() {
        return this._buttonVariant;
    }
    set buttonVariant(value) {
        this._buttonVariant = normalizeString(value, {
            fallbackValue: BUTTON_VARIANTS.default,
            validValues: BUTTON_VARIANTS.valid
        });
    }

    /**
     * If present, the menu cannot be used by users.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(bool) {
        this._disabled = normalizeBoolean(bool);
    }

    /**
     * Determines the alignment of the dropdown menu relative to the button. Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right. The auto option aligns the dropdown menu based on available space. This attribute isn’t supported for the vertical variant.
     *
     * @type {string}
     * @public
     * @default left
     */
    @api
    get dropdownAlignment() {
        return this._dropdownAlignment;
    }
    set dropdownAlignment(value) {
        this._dropdownAlignment = normalizeString(value, {
            fallbackValue: MENU_ALIGNMENTS.default,
            validValues: MENU_ALIGNMENTS.valid
        });
    }

    /**
     * Deprecated. Set the dropdown length in the type attributes.
     *
     * @type {string}
     * @default 7-items
     */
    @api
    get dropdownLength() {
        return this._dropdownLength;
    }
    set dropdownLength(value) {
        this._dropdownLength = normalizeString(value, {
            fallbackValue: MENU_LENGTHS.default,
            validValues: MENU_LENGTHS.valid
        });

        console.warn(
            'The "dropdown-length" attribute is deprecated. Add a "dropdownLength" key to the type attributes instead.'
        );

        if (this._connected) {
            this.supportDeprecatedAttributes();
        }
    }

    /**
     * If present, a nubbin is present on the dropdown menu. A nubbin is a stub that protrudes from the menu item towards the button menu. The nubbin position is based on the menu-alignment. This attribute isn’t supported for the vertical variant.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get dropdownNubbin() {
        return this._dropdownNubbin;
    }
    set dropdownNubbin(bool) {
        this._dropdownNubbin = normalizeBoolean(bool);
    }

    /**
     * Deprecated. Set the dropdown width in the type attributes.
     *
     * @type {string}
     * @default small
     */
    @api
    get dropdownWidth() {
        return this._dropdownWidth;
    }
    set dropdownWidth(value) {
        this._dropdownWidth = normalizeString(value, {
            fallbackValue: MENU_WIDTHS.default,
            validValues: MENU_WIDTHS.valid
        });

        console.warn(
            'The "dropdown-width" attribute is deprecated. Add a "dropdownWidth" key to the type attributes instead.'
        );

        if (this._connected) {
            this.supportDeprecatedAttributes();
        }
    }

    /**
     * If present, the apply and reset buttons are hidden and the value is immediately saved every time the selection changes.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get hideApplyResetButtons() {
        return this._hideApplyResetButtons;
    }
    set hideApplyResetButtons(bool) {
        this._hideApplyResetButtons = normalizeBoolean(bool);
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
     * The name of the icon to be used in the format 'utility:down'. For the horizontal variant, if an icon other than 'utility:down' or 'utility:chevrondown' is used, a utility:down icon is appended to the right of that icon.
     *
     * @type {string}
     * @public
     * @default utility:down for horizontal variant
     */
    @api
    get iconName() {
        return this._iconName;
    }
    set iconName(value) {
        this._iconName =
            value && typeof value === 'string'
                ? value.trim()
                : DEFAULT_ICON_NAME;
    }

    /**
     * The size of the icon. Options include xx-small, x-small, small, medium or large. This value defaults to medium.
     *
     * @type {string}
     * @public
     * @default medium
     */
    @api
    get iconSize() {
        return this._iconSize;
    }
    set iconSize(value) {
        this._iconSize = normalizeString(value, {
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
    set isLoading(bool) {
        const normalizedValue = normalizeBoolean(bool);
        if (this.isAutoAlignment()) {
            // stop previous positioning if any as it maintains old position relationship
            this.stopPositioning();

            if (this._isLoading && !normalizedValue) {
                // was loading before and now is not, we need to reposition
                this.startPositioning();
            }
        }

        this._isLoading = normalizedValue;
    }

    /**
     * Deprecated. Allow multi-selection in the type attributes.
     *
     * @type {boolean}
     * @default false
     */
    @api
    get isMultiSelect() {
        return this._isMultiSelect;
    }
    set isMultiSelect(bool) {
        this._isMultiSelect = normalizeBoolean(bool);

        console.warn(
            'The "is-multi-select" attribute is deprecated. Add an "isMultiSelect" key to the type attributes instead.'
        );

        if (this._connected) {
            this.supportDeprecatedAttributes();
        }
    }

    /**
     * Deprecated. Set the items in the type attributes.
     *
     * @type {object[]}
     */
    @api
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = normalizeArray(value, 'object');
        console.warn(
            'The "items" attribute is deprecated. Add an "items" key to the type attributes instead.'
        );

        if (this._connected) {
            this.supportDeprecatedAttributes();
            this.computeListItems();
        }
    }

    /**
     * Message displayed while the menu is in the loading state.
     *
     * @type {string}
     * @public
     * @default Loading
     */
    @api
    get loadingStateAlternativeText() {
        return this._loadingStateAlternativeText;
    }
    set loadingStateAlternativeText(value) {
        this._loadingStateAlternativeText =
            typeof value === 'string' ? value.trim() : i18n.loading;
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
     * Deprecated. Set the search input placeholder in the type attributes.
     *
     * @type {string}
     * @public
     * @default Search...
     */
    @api
    get searchInputPlaceholder() {
        return this._searchInputPlaceholder;
    }
    set searchInputPlaceholder(value) {
        this._searchInputPlaceholder =
            typeof value === 'string'
                ? value.trim()
                : DEFAULT_SEARCH_INPUT_PLACEHOLDER;

        console.warn(
            'The "search-input-placeholder" attribute is deprecated. Add a "searchInputPlaceholder" key to the type attributes instead.'
        );

        if (this._connected) {
            this.supportDeprecatedAttributes();
        }
    }

    /**
     * Deprecated. Show the search box in the type attributes.
     *
     * @type {boolean}
     * @default false
     */
    @api
    get showSearchBox() {
        return this._showSearchBox;
    }
    set showSearchBox(bool) {
        this._showSearchBox = normalizeBoolean(bool);

        console.warn(
            'The "show-search-box" attribute is deprecated. Add an "allowSearch" key to the type attributes instead.'
        );

        if (this._connected) {
            this.supportDeprecatedAttributes();
        }
    }

    /**
     * The tooltip is displayed on hover or focus on the button (horizontal variant), or on the help icon (vertical variant).
     *
     * @type {string}
     * @public
     */
    @api
    get tooltip() {
        return this._tooltip ? this._tooltip.value : undefined;
    }

    set tooltip(value) {
        // Used instead of the tooltip in vertical variant
        this.fieldLevelHelp = value;

        if (this._tooltip) {
            this._tooltip.value = value;
        } else if (value) {
            // Note that because the tooltip target is a child element it may not be present in the
            // dom during initial rendering.
            this._tooltip = new Tooltip(value, {
                root: this,
                target: () =>
                    this.template.querySelector('[data-element-id="button"]')
            });
            this._tooltip.initialize();
        }
    }

    /**
     * Type of the filter menu. Valid values include list, range and date-range.
     *
     * @type {string}
     * @default list
     * @public
     */
    @api
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = normalizeString(value, {
            fallbackValue: TYPES.default,
            validValues: TYPES.valid
        });

        if (this._connected) {
            this.normalizeTypeAttributes();
        }
    }

    /**
     * Attributes specific to the type (see **Types and Type Attributes**).
     *
     * @type {object}
     * @public
     */
    @api
    get typeAttributes() {
        return this._typeAttributes;
    }
    set typeAttributes(value) {
        this._typeAttributes = normalizeObject(value);

        if (this._connected) {
            this.normalizeTypeAttributes();
        }
    }

    /**
     * Value of the filter menu.
     * If the type is `list`, array of selected items values. If the type is `range`, array of selected numbers. If the type is `date-range`, array of ISO 8601 dates.
     *
     * @type {String[] | Number[] | Date[]}
     * @public
     */
    @api
    get value() {
        return this._value;
    }
    set value(val) {
        const array = typeof val === 'string' ? [val] : normalizeArray(val);
        this._value = array;
        this.currentValue = deepCopy(array);

        if (this._connected) {
            this.computeListItems();
            this.computeSelectedItems();
        }
    }

    /**
     * The variant changes the look of the menu. Accepted variants include horizontal and vertical.
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

        if (
            this._connected &&
            this.isVertical &&
            this.infiniteLoad &&
            !this.isLoading
        ) {
            if (!this.visibleListItems.length) {
                // Fire the loadmore event without waiting for the user
                // to click on the load more button
                this.dispatchLoadMore();
            }
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Computed checkbox Items.
     *
     * @type {object}
     */
    get checkboxComputedItems() {
        return this.computedItems.filter((item) => !item.hidden);
    }

    /**
     * Computed showdown icon.
     *
     * @type {boolean}
     */
    get computedShowDownIcon() {
        return !(
            this.iconName === 'utility:down' ||
            this.iconName === 'utility:chevrondown'
        );
    }

    /**
     * Computed Aria Expanded from dropdown menu.
     *
     * @type {string}
     */
    get computedAriaExpanded() {
        return String(this.dropdownVisible); // default value must be a string for the attribute to always be present with a string value
    }

    /**
     * Computed Button class styling.
     *
     * @type {string}
     */
    get computedButtonClass() {
        const isDropdownIcon = !this.computedShowDownIcon;
        const isBare =
            this.buttonVariant === 'bare' ||
            this.buttonVariant === 'bare-inverse';

        const classes = classSet('slds-button');

        if (this.label) {
            classes.add({
                'slds-button_neutral': this.buttonVariant === 'border',
                'slds-button_inverse': this.buttonVariant === 'border-inverse'
            });
        } else {
            // The inverse check is to allow for a combination of a non-default icon and an -inverse buttonVariant
            const useMoreContainer =
                this.buttonVariant === 'container' ||
                this.buttonVariant === 'bare-inverse' ||
                this.buttonVariant === 'border-inverse';

            classes.add({
                'slds-button_icon': !isDropdownIcon,
                'slds-button_icon-bare': isBare,
                'slds-button_icon-more': !useMoreContainer && !isDropdownIcon,
                'slds-button_icon-container-more':
                    useMoreContainer && !isDropdownIcon,
                'slds-button_icon-container':
                    this.buttonVariant === 'container' && isDropdownIcon,
                'slds-button_icon-border':
                    this.buttonVariant === 'border' && isDropdownIcon,
                'slds-button_icon-border-filled':
                    this.buttonVariant === 'border-filled',
                'slds-button_icon-border-inverse':
                    this.buttonVariant === 'border-inverse',
                'slds-button_icon-inverse':
                    this.buttonVariant === 'bare-inverse',
                'slds-button_icon-xx-small':
                    this.iconSize === 'xx-small' && !isBare,
                'slds-button_icon-x-small':
                    this.iconSize === 'x-small' && !isBare,
                'slds-button_icon-small': this.iconSize === 'small' && !isBare,
                'slds-button_icon-large': this.iconSize === 'large' && !isBare
            });
        }

        return classes
            .add({
                // order classes when part of a button-group
                'slds-button_first': this._order === 'first',
                'slds-button_middle': this._order === 'middle',
                'slds-button_last': this._order === 'last'
            })
            .toString();
    }

    /**
     * Computed Dropdown class styling.
     *
     * @type {string}
     */
    get computedDropdownClass() {
        return classSet('slds-dropdown slds-p-around_none')
            .add({
                'slds-dropdown_left':
                    this.dropdownAlignment === 'left' || this.isAutoAlignment(),
                'slds-dropdown_center': this.dropdownAlignment === 'center',
                'slds-dropdown_right': this.dropdownAlignment === 'right',
                'slds-dropdown_bottom':
                    this.dropdownAlignment === 'bottom-center',
                'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right':
                    this.dropdownAlignment === 'bottom-right',
                'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left':
                    this.dropdownAlignment === 'bottom-left',
                'slds-nubbin_top-left':
                    this.dropdownNubbin && this.dropdownAlignment === 'left',
                'slds-nubbin_top-right':
                    this.dropdownNubbin && this.dropdownAlignment === 'right',
                'slds-nubbin_top':
                    this.dropdownNubbin && this.dropdownAlignment === 'center',
                'slds-nubbin_bottom-left':
                    this.dropdownNubbin &&
                    this.dropdownAlignment === 'bottom-left',
                'slds-nubbin_bottom-right':
                    this.dropdownNubbin &&
                    this.dropdownAlignment === 'bottom-right',
                'slds-nubbin_bottom':
                    this.dropdownNubbin &&
                    this.dropdownAlignment === 'bottom-center',
                'avonni-filter-menu__dropdown_range':
                    this.isRange || this.isDateRange
            })
            .add(`slds-dropdown_${this.computedTypeAttributes.dropdownWidth}`)
            .toString();
    }

    /**
     * Computed Item List Class styling.
     *
     * @type {string}
     */
    get computedDropdownContentClass() {
        const length = this.computedTypeAttributes.dropdownLength;
        return classSet('slds-dropdown__list').add({
            'slds-dropdown_length-with-icon-5':
                this.isList && length === '5-items',
            'slds-dropdown_length-with-icon-7':
                this.isList && length === '7-items',
            'slds-dropdown_length-with-icon-10':
                this.isList && length === '10-items'
        });
    }

    get dateRangeEndDate() {
        if (!Array.isArray(this.currentValue)) {
            return null;
        }
        return this.currentValue[1];
    }

    get dateRangeStartDate() {
        if (!Array.isArray(this.currentValue)) {
            return null;
        }
        return this.currentValue[0];
    }

    get disabledOrLoading() {
        return this.isLoading || this.disabled;
    }

    get dropdownElement() {
        return this.template.querySelector(
            '[data-element-id="div-dropdown-content"]'
        );
    }

    get infiniteLoad() {
        return this.computedTypeAttributes.enableInfiniteLoading;
    }

    get isDateRange() {
        return this.type === 'date-range';
    }

    get isList() {
        return this.type === 'list';
    }

    get isRange() {
        return this.type === 'range';
    }

    get isVertical() {
        return this.variant === 'vertical';
    }

    get noVisibleListItem() {
        let i = 0;
        let noVisibleListItem = true;
        while (i < this.computedItems.length && noVisibleListItem) {
            if (!this.computedItems[i].hidden) {
                noVisibleListItem = false;
            }
            i += 1;
        }
        return noVisibleListItem;
    }

    get pillActions() {
        return [
            {
                label: 'Remove',
                name: 'remove',
                iconName: 'utility:close'
            }
        ];
    }

    get scrolledToEnd() {
        const fullHeight = this.dropdownElement.scrollHeight;
        const scrolledDistance = this.dropdownElement.scrollTop;
        const visibleHeight = this.dropdownElement.offsetHeight;
        return (
            visibleHeight + scrolledDistance + LOAD_MORE_OFFSET >= fullHeight
        );
    }

    get showLoadMoreButton() {
        return this.infiniteLoad && !this.isLoading;
    }

    get showNoResultMessage() {
        return !this.isLoading && this.searchTerm && this.noVisibleListItem;
    }

    get rangeValue() {
        if (this.currentValue.length) {
            return this.currentValue;
        }
        const { min, max } = this.computedTypeAttributes;
        const start = isNaN(min) ? DEFAULT_RANGE_VALUE[0] : Number(min);
        const end = isNaN(max) ? DEFAULT_RANGE_VALUE[1] : Number(max);
        return [start, end];
    }

    /**
     * Display selected items.
     *
     * @type {boolean}
     */
    get showSelectedItems() {
        return !this.hideSelectedItems && this.selectedItems.length > 0;
    }

    get visibleListItems() {
        return this.computedItems.filter((it) => !it.hidden);
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Set the focus on the menu.
     *
     * @public
     */
    @api
    focus() {
        if (this.isVertical) {
            const choiceSet = this.template.querySelector(
                '[data-element-id="avonni-input-choice-set"]'
            );
            if (choiceSet) {
                choiceSet.focus();
            }
        } else {
            const button = this.template.querySelector(
                '[data-element-id="button"]'
            );
            if (button) {
                button.focus();
            }
        }
    }

    /**
     * Save the currently selected values.
     *
     * @public
     */
    @api
    apply() {
        this._value = [...this.currentValue];
        this.computeSelectedItems();
        this.close();
    }

    /**
     * Clear the value.
     */
    @api
    clear() {
        this._value = [];
        this.currentValue = [];
        this.computeListItems();
        this.computeSelectedItems();
    }

    /**
     * Unselect all values, without saving the change.
     *
     * @public
     */
    @api
    reset() {
        this.currentValue = [];
        if (this.isList) {
            this.computedItems = this.computedItems.map((item) => {
                item.checked = false;
                return item;
            });
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Initialize tooltip.
     */
    initTooltip() {
        if (this._tooltip && !this._tooltip.initialized) {
            this._tooltip.initialize();
        }
    }

    computeListItems() {
        if (!this.isList) {
            return;
        }
        let firstFocusableItem;
        const items = normalizeArray(
            this.computedTypeAttributes.items,
            'object'
        );

        this.computedItems = deepCopy(items).map((item) => {
            item.checked = this.currentValue.includes(item.value);
            item.hidden = this.isOutOfSearchScope(item.label);

            if (!firstFocusableItem && !item.disabled && !item.hidden) {
                firstFocusableItem = true;
                item.tabindex = '0';
            } else {
                item.tabindex = '-1';
            }
            return item;
        });
    }

    computeSelectedRange() {
        const selection = this.value.reduce((string, value) => {
            let normalizedValue = '';
            if (this.isDateRange && value && !isNaN(new Date(value))) {
                // Date range
                const date = new Date(value);
                normalizedValue = this.formatDate(date);
            } else if (this.isRange && !isNaN(value)) {
                // Range
                const style = this.computedTypeAttributes.unit;
                const attributes = normalizeObject(
                    this.computedTypeAttributes.unitAttributes
                );
                const options = {
                    style,
                    ...attributes
                };
                normalizedValue = value.toString();
                normalizedValue = numberFormat(options).format(normalizedValue);
            }
            return string.length
                ? `${string} - ${normalizedValue}`
                : normalizedValue;
        }, '');

        if (selection.length) {
            this.selectedItems = [
                {
                    label: selection,
                    name: selection
                }
            ];
        } else {
            this.selectedItems = [];
        }
    }

    /**
     * Compute Selected Items List by checked items.
     */
    computeSelectedItems() {
        if (this.isList) {
            this.computeSelectedListItems();
        } else {
            this.computeSelectedRange();
        }
    }

    computeSelectedListItems() {
        const selectedItems = this.computedItems.filter((item) => {
            return this.value.includes(item.value);
        });

        this.selectedItems = selectedItems.map((item) => {
            return {
                label: item.label,
                name: item.value
            };
        });
    }

    /**
     * Close dropdown menu.
     */
    close() {
        if (this.dropdownVisible) {
            this.toggleMenuVisibility();
        }
    }

    formatDate(date) {
        const dateTime = dateTimeObjectFrom(date);
        const showTime = this.computedTypeAttributes.type === 'datetime';
        const { dateStyle, timeStyle } = this.computedTypeAttributes;

        let formattedDate,
            formattedTime = '';
        switch (dateStyle) {
            case 'long':
                formattedDate = dateTime.toFormat('DDD');
                break;
            case 'short':
                formattedDate = dateTime.toFormat('D');
                break;
            default:
                formattedDate = dateTime.toFormat('DD');
                break;
        }
        if (showTime) {
            switch (timeStyle) {
                case 'long':
                    formattedTime += dateTime.toFormat('ttt');
                    break;
                case 'short':
                    formattedTime = dateTime.toFormat('t');
                    break;
                default:
                    formattedTime = dateTime.toFormat('tt');
                    break;
            }
        }
        return `${formattedDate} ${formattedTime}`.trim();
    }

    focusDropdown() {
        this._allowBlur = false;
        requestAnimationFrame(() => {
            const focusTrap = this.template.querySelector(
                '[data-element-id="lightning-focus-trap"]'
            );
            if (focusTrap) {
                this._dropdownIsFocused = true;
                focusTrap.focus();
            }
        });
    }

    focusListItem(currentIndex, addedIndex = 1) {
        const items = this.visibleListItems;
        items[currentIndex].tabIndex = '-1';
        const index = currentIndex + addedIndex;

        let item = items[index];
        if (index < 0) {
            item = items[items.length - 1];
        } else if (index >= items.length) {
            item = items[0];
        } else if (item && item.disabled) {
            this.focusListItem(index, addedIndex);
            return;
        }

        if (item) {
            item.focus();
            item.tabIndex = '0';
        }
    }

    /**
     * Checks if dropdown is auto Aligned.
     *
     * @returns boolean
     */
    isAutoAlignment() {
        return this.dropdownAlignment.startsWith('auto');
    }

    isOutOfSearchScope(label) {
        if (!this.searchTerm || typeof this.searchTerm !== 'string') {
            return false;
        }
        const normalizedLabel = label.toLowerCase();
        const searchTerm = this.searchTerm.toLowerCase();
        return !normalizedLabel.includes(searchTerm);
    }

    normalizeTypeAttributes() {
        const typeAttributes = {};
        Object.entries(this.typeAttributes).forEach(([key, value]) => {
            const allowedAttribute =
                TYPE_ATTRIBUTES[this.type] &&
                TYPE_ATTRIBUTES[this.type].includes(key);
            if (allowedAttribute) {
                typeAttributes[key] = value;
            }
        });
        this.computedTypeAttributes = typeAttributes;
        this.supportDeprecatedAttributes();
        this.computeListItems();
    }

    /**
     * Set order of items.
     *
     * @param {object} order
     */
    setOrder(order) {
        this._order = order;
    }

    /**
     * Menu positioning and animation start.
     *
     * @returns object dropdown menu positioning.
     */
    startPositioning() {
        if (!this.isAutoAlignment()) {
            return Promise.resolve();
        }

        this._positioning = true;

        const align = {
            horizontal: Direction.Left,
            vertical: Direction.Top
        };

        const targetAlign = {
            horizontal: Direction.Left,
            vertical: Direction.Bottom
        };

        let autoFlip = true;
        let autoFlipVertical;

        return animationFrame()
            .then(() => {
                this.stopPositioning();
                this._autoPosition = startPositioning(
                    this,
                    {
                        target: () =>
                            this.template.querySelector(
                                '[data-element-id="button"]'
                            ),
                        element: () =>
                            this.template.querySelector('.slds-dropdown'),
                        align,
                        targetAlign,
                        autoFlip,
                        autoFlipVertical,
                        scrollableParentBound: true,
                        keepInViewport: true
                    },
                    true
                );
                // Edge case: W-7460656
                if (this._autoPosition) {
                    return this._autoPosition.reposition();
                }
                return Promise.reject();
            })
            .then(() => {
                return timeout(0);
            })
            .then(() => {
                // Use a flag to prevent this async function from executing multiple times in a single lifecycle
                this._positioning = false;
            });
    }

    /**
     * Stop menu positioning and animation.
     */
    stopPositioning() {
        if (this._autoPosition) {
            stopPositioning(this._autoPosition);
            this._autoPosition = null;
        }
        this._positioning = false;
    }

    supportDeprecatedAttributes() {
        if (!this.isList) {
            return;
        }

        const {
            isMultiSelect,
            searchInputPlaceholder,
            allowSearch,
            dropdownLength,
            dropdownWidth,
            items
        } = this.computedTypeAttributes;

        if (allowSearch === undefined) {
            this.computedTypeAttributes.allowSearch = this.showSearchBox;
        }
        if (dropdownLength === undefined) {
            this.computedTypeAttributes.dropdownLength = this.dropdownLength;
        }
        if (dropdownWidth === undefined) {
            this.computedTypeAttributes.dropdownWidth = this.dropdownWidth;
        }
        if (isMultiSelect === undefined) {
            this.computedTypeAttributes.isMultiSelect = this.isMultiSelect;
        }
        if (!searchInputPlaceholder) {
            this.computedTypeAttributes.searchInputPlaceholder =
                this.searchInputPlaceholder;
        }
        if (!Array.isArray(items) || !items.length) {
            this.computedTypeAttributes.items = deepCopy(this.items);
        }
    }

    /**
     * Dropdown menu visibility toggle.
     */
    toggleMenuVisibility() {
        if (!this.disabled) {
            this.dropdownVisible = !this.dropdownVisible;
            if (this.dropdownVisible) {
                this.startPositioning();

                /**
                 * The event fired when the dropdown is opened.
                 *
                 * @event
                 * @name open
                 * @public
                 */
                this.dispatchEvent(new CustomEvent('open'));

                // update the bounding rect when the menu is toggled
                this._boundingRect = this.getBoundingClientRect();

                this.pollBoundingRect();
                this.currentValue = [...this.value];
                this.computeListItems();
                this.focusDropdown();
            } else {
                this.stopPositioning();

                /**
                 * The event fired when the dropdown is closed.
                 *
                 * @event
                 * @name close
                 * @public
                 */
                this.dispatchEvent(new CustomEvent('close'));
                this._previousScroll = undefined;

                requestAnimationFrame(() => {
                    this.focus();
                });
            }
        }
    }

    /**
     * Get bounding rect coordinates for dropdown menu.
     */
    pollBoundingRect() {
        // only poll if the dropdown is auto aligned
        if (this.isAutoAlignment() && this.dropdownVisible) {
            setTimeout(
                () => {
                    if (this._connected) {
                        observePosition(this, 300, this._boundingRect, () => {
                            this.close();
                        });

                        // continue polling
                        this.pollBoundingRect();
                    }
                },
                250 // check every 0.25 second
            );
        }
    }

    handleButtonBlur() {
        if (this._allowBlur) {
            this.dispatchEvent(new CustomEvent('blur'));
        }
    }

    handleButtonFocus() {
        if (this._allowBlur) {
            this.dispatchEvent(new CustomEvent('focus'));
        } else {
            this._allowBlur = true;
        }
    }

    handleDropdownFocusIn() {
        this._dropdownIsFocused = true;
    }

    handleDropdownFocusOut() {
        this._dropdownIsFocused = false;

        requestAnimationFrame(() => {
            if (!this._dropdownIsFocused) {
                this.close();
            }
        });
    }

    handleDropdownKeyUp(event) {
        const key = event.key;
        if (key === 'Escape') {
            this.close();
        }
    }

    /**
     * Checkbox value change event handler.
     *
     * @param {Event} event
     */
    handleCheckboxChange(event) {
        const value = event.detail.value;
        this.currentValue =
            value && !Array.isArray(value) ? [value] : value || [];
        this.computedItems.forEach((item) => {
            item.checked = this.currentValue.includes(item.value);
        });
        this.dispatchSelect();
    }

    handleDateRangeChange(event) {
        const { startDate, endDate } = event.detail;
        this.currentValue = [startDate, endDate];
        this.dispatchSelect();
    }

    /**
     * Private select handler.
     *
     * @param {Event} event
     */
    handlePrivateSelect(event) {
        event.stopPropagation();

        const selectedValue = event.detail.value;
        this.currentValue = [];
        this.computedItems = this.computedItems.map((item) => {
            if (item.value === selectedValue) {
                item.checked = !item.checked;
            } else if (!this.computedTypeAttributes.isMultiSelect) {
                item.checked = false;
            }
            if (item.checked) {
                this.currentValue.push(item.value);
            }
            return item;
        });

        this.dispatchSelect();
    }

    /**
     * Key down event handler.
     *
     * @param {Event} event
     */
    handleListItemKeyDown(event) {
        const key = event.key;
        const index = Number(event.currentTarget.dataset.index);

        switch (key) {
            case 'ArrowUp': {
                this.focusListItem(index, -1);
                break;
            }
            case 'ArrowDown': {
                this.focusListItem(index);
                break;
            }
            default:
                break;
        }
    }

    handleRangeChange(event) {
        this.currentValue = event.detail.value;
        this.dispatchSelect();
    }

    handleScroll() {
        if (!this.infiniteLoad || this.isLoading) {
            return;
        }

        const fullHeight = this.dropdownElement.scrollHeight;
        const visibleHeight = this.dropdownElement.offsetHeight;
        const loadLimit = fullHeight - visibleHeight - LOAD_MORE_OFFSET;
        const firstTimeReachingTheEnd = this._previousScroll < loadLimit;

        if (
            this.scrolledToEnd &&
            (!this._previousScroll || firstTimeReachingTheEnd)
        ) {
            this.dispatchLoadMore();
        }
        this._previousScroll = this.dropdownElement.scrollTop;
    }

    /**
     * Selected Item removal handler.
     *
     * @param {Event} event
     */
    handleSelectedItemRemove(event) {
        const { targetName, index } = event.detail;
        this.selectedItems.splice(index, 1);
        this.selectedItems = [...this.selectedItems];

        if (this.isList) {
            const valueIndex = this.value.findIndex((name) => {
                return name === targetName;
            });
            this.value.splice(valueIndex, 1);
        } else {
            this._value = [];
        }

        this.currentValue = [...this.value];
        this.computeListItems();
        this.dispatchApply();
    }

    /**
     * Apply click handler.
     */
    handleApply() {
        this.apply();
        this.dispatchApply();
    }

    /**
     * Reset Click handler.
     */
    handleResetClick() {
        /**
         * The event fired when the selection is resetted.
         *
         * @event
         * @name reset
         * @public
         */
        this.dispatchEvent(new CustomEvent('reset'));
        this.reset();
    }

    /**
     * Search handler.
     *
     * @param {Event} event
     */
    handleSearch(event) {
        event.stopPropagation();
        this.searchTerm = event.detail.value;

        clearTimeout(this._searchTimeOut);
        this._searchTimeOut = setTimeout(() => {
            this.computedItems.forEach((item) => {
                item.hidden = this.isOutOfSearchScope(item.label);
            });
            this.computedItems = [...this.computedItems];

            /**
             * The event fired when the search input value is changed.
             *
             * @event
             * @name search
             * @param {string} value The value of the search input.
             * @public
             */
            this.dispatchEvent(
                new CustomEvent('search', {
                    detail: {
                        value: this.searchTerm
                    }
                })
            );

            if (
                this.isVertical &&
                this.infiniteLoad &&
                !this.isLoading &&
                this.noVisibleListItem
            ) {
                this.dispatchLoadMore();
            }
        }, 300);
    }

    /**
     * Dispatch Apply event.
     */
    dispatchApply() {
        /**
         * The event fired when the “Apply” button is clicked, or a pill removed from the selected items. If `hide-apply-reset-buttons` is `true`, the `apply` event is also fired when the user selects or unselects a value.
         *
         * @event
         * @name apply
         * @param {string[]|number[]} value New value of the filter menu.
         * @public
         */
        this.dispatchEvent(
            new CustomEvent('apply', {
                detail: {
                    value: this.value
                }
            })
        );
    }

    dispatchLoadMore() {
        /**
         * The event fired when the end of a list is reached. It is only fired if the `enableInfiniteLoading` type attribute is present. In the horizontal variant, the `loadmore` event is triggered by a scroll to the end of the list. In the vertical variant, the `loadmore` event is triggered by a button clicked by the user.
         *
         * @event
         * @name loadmore
         * @public
         */
        this.dispatchEvent(new CustomEvent('loadmore'));
    }

    /**
     * Dispatch Select event.
     */
    dispatchSelect() {
        this.dispatchEvent(
            /**
             * TThe event fired when a user selects or unselects a value.
             *
             * @event
             * @name select
             * @param {string[]} value Currently selected value. The value is not saved, as long as the user does not click on the “apply” button.
             * @public
             */
            new CustomEvent('select', {
                detail: {
                    value: deepCopy(this.currentValue)
                }
            })
        );

        if (this.hideApplyResetButtons) {
            // Save the selection immediately
            this._value = [...this.currentValue];
            this.computeSelectedItems();
            this.dispatchApply();

            if (this.isList && !this.computedTypeAttributes.isMultiSelect) {
                this.close();
            }
        }
    }
}
