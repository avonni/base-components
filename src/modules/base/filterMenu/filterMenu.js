import { numberFormat } from 'c/numberFormat';
import {
    Direction,
    startPositioning,
    stopPositioning
} from 'c/positionLibrary';
import { Tooltip } from 'c/tooltipLibrary';
import {
    classSet,
    deepCopy,
    normalizeArray,
    normalizeBoolean,
    normalizeObject,
    normalizeString
} from 'c/utils';
import {
    animationFrame,
    buttonGroupOrderClass,
    equal,
    observePosition,
    timeout
} from 'c/utilsPrivate';
import { api, LightningElement, track } from 'lwc';
import filterMenu from './filterMenu.html';
import filterMenuVertical from './filterMenuVertical.html';
import Item from './item';
import {
    getItemByName,
    getTreeItemByLevelPath,
    SELECT_ALL_ACTION,
    SELECT_IMMEDIATE_CHILDREN_ACTION,
    toggleTreeItemValue,
    UNSELECT_ALL_ACTION
} from './nestedItemsUtils';

import { formatDateFromStyle, formatTimeString } from './itemFormatUtils.js';

const BUTTON_VARIANTS = {
    default: 'border',
    valid: [
        'bare',
        'bare-inverse',
        'border',
        'border-filled',
        'border-inverse',
        'container',
        'outline-brand'
    ]
};

const DEFAULT_APPLY_BUTTON_LABEL = 'Apply';
const DEFAULT_ICON_NAME = 'utility:down';
const DEFAULT_NO_RESULTS_MESSAGE = 'No matches found';
const DEFAULT_RANGE_VALUE = [0, 100];
const DEFAULT_RESET_BUTTON_LABEL = 'Clear selection';
const DEFAULT_SEARCH_INPUT_PLACEHOLDER = 'Search...';
const DEFAULT_WEEK_START_DAY = 0;

const i18n = {
    loading: 'Loading...',
    showMenu: 'Show Menu'
};

const ICON_SIZES = {
    default: 'medium',
    valid: ['large', 'medium', 'small', 'x-small', 'xx-small']
};

const LOAD_MORE_OFFSET = 20;

const MENU_ALIGNMENTS = {
    default: 'left',
    valid: [
        'auto',
        'bottom-center',
        'bottom-left',
        'bottom-right',
        'center',
        'left',
        'right'
    ]
};

const MENU_VARIANTS = {
    default: 'horizontal',
    valid: ['horizontal', 'vertical']
};

const MENU_WIDTHS = {
    default: 'small',
    valid: ['large', 'medium', 'small', 'x-small', 'xx-small']
};

const TYPE_ATTRIBUTES = {
    'date-range': [
        'dateStyle',
        'labelEndDate',
        'labelEndTime',
        'labelStartDate',
        'labelStartTime',
        'timeStyle',
        'timezone',
        'type'
    ],
    list: [
        'allowSearch',
        'dropdownLength',
        'dropdownWidth',
        'enableInfiniteLoading',
        'hasNestedItems',
        'isMultiSelect',
        'itemCounts',
        'items',
        'noResultsMessage',
        'searchInputPlaceholder',
        'totalCount'
    ],
    range: [
        'hideMinMaxValues',
        'isPercentage',
        'max',
        'min',
        'showPin',
        'showTickMarks',
        'step',
        'tickMarkStyle',
        'unit',
        'unitAttributes'
    ],
    'time-range': ['labelEndTime', 'labelStartTime', 'timeStyle']
};

const TYPES = {
    default: 'list',
    valid: ['date-range', 'list', 'range', 'time-range']
};

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
     * Reserved for internal use only.
     * Describes the order of this element inside `lightning-button-group`. Valid values include first, middle or last.
     *
     * @public
     * @type {string}
     */
    @api groupOrder = '';
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
    _closed = false;
    _collapsible = false;
    _disabled = false;
    _dropdownAlignment = MENU_ALIGNMENTS.default;
    _dropdownLength;
    _dropdownNubbin = false;
    _dropdownWidth = MENU_WIDTHS.default;
    _hideApplyButton = false;
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
    _showClearButton = false;
    _showSearchBox = false;
    _tooltip;
    _type = TYPES.default;
    _typeAttributes = {};
    _value = [];
    _variant = MENU_VARIANTS.default;
    _weekStartDay = DEFAULT_WEEK_START_DAY;

    _allowBlur = true;
    _dateRangeFrames = [];
    _dropdownIsFocused = false;
    _order;
    _previousScroll;
    _preventDropdownToggle = false;
    _searchTimeOut;

    computedItemCounts = {};
    @track computedItems = [];
    computedTypeAttributes = {};
    @track currentValue = [];
    dropdownVisible = false;
    fieldLevelHelp;
    labelMap = new Map();
    searchTerm;
    @track selectedItems = [];
    visibleItems = [];

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        this.normalizeTypeAttributes();
        this.computeItemCounts();
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
        } else if (!this.infiniteLoad && this.isList) {
            this.dispatchLoadItemCounts();
        }
        this.dispatchLoadTotalCount();
    }

    disconnectedCallback() {
        if (this._deRegistrationCallback) {
            this._deRegistrationCallback();
        }
        this._dateRangeFrames.forEach((f) => cancelAnimationFrame(f));
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
     * If present, close the collapsible section. This attribute is only supported by the vertical variant.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get closed() {
        return this._closed;
    }

    set closed(value) {
        this._closed = normalizeBoolean(value);
    }

    /**
     * If present, the headers are collapsible. This attribute is only supported by the vertical variant.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get collapsible() {
        return this._collapsible;
    }

    set collapsible(value) {
        this._collapsible = normalizeBoolean(value);
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
     * @deprecated
     */
    @api
    get dropdownLength() {
        return this._dropdownLength;
    }
    set dropdownLength(value) {
        this._dropdownLength = value;

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
     * @deprecated
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
        if (this.isAutoAlignment) {
            // stop previous positioning if any as it maintains old position relationship
            this.stopPositioning();

            if (this._isLoading && !normalizedValue) {
                // was loading before and now is not, we need to reposition
                this.startPositioning();
            }
        }

        this._isLoading = normalizedValue;
        if (!this._isLoading && this.isRange && this.dropdownVisible) {
            this.focusRange();
        }
    }

    /**
     * Deprecated. Allow multi-selection in the type attributes.
     *
     * @type {boolean}
     * @default false
     * @deprecated
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
     * @deprecated
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
            this.computeItemCounts();
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
     * @default Search...
     * @deprecated
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
     * If present, a clear button is displayed. This attribute is only supported by the vertical variant.
     *
     * @type {boolean}
     * @default false
     */
    @api
    get showClearButton() {
        return this._showClearButton;
    }
    set showClearButton(value) {
        this._showClearButton = normalizeBoolean(value);
    }

    /**
     * Deprecated. Set the search box visibility in the type attributes.
     *
     * @type {boolean}
     * @default false
     * @deprecated
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
     * Type of the filter menu. Valid values include list, range, date-range and time-range.
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
            this.computeSelectedItems();
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
            this.computeSelectedItems();

            if (
                this.isVertical &&
                this.infiniteLoad &&
                !this.isLoading &&
                !this.visibleItems.length
            ) {
                // Fire the loadmore event without waiting for the user
                // to click on the load more button
                this.dispatchLoadMore();
            }
        }
    }

    /**
     * Value of the filter menu.
     * If the type is `list`, array of selected items values.
     * If the type is `range`, array of selected numbers.
     * If the type is `date-range`, array of ISO 8601 dates.
     * If the type is `time-range`, array of time strings in the format HH:mm[:ss[.SSS]].
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
        if (equal(array, this.value)) {
            return;
        }
        this._value = deepCopy(array);
        this.currentValue = deepCopy(array);

        if (this._connected) {
            this.computeItemCounts();
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
            !this.isLoading &&
            !this.visibleItems.length
        ) {
            // Fire the loadmore event without waiting for the user
            // to click on the load more button
            this.dispatchLoadMore();
        }
    }

    /**
     * Used by the `date-range` type. Day displayed as the first day of the week. The value has to be a number between 0 and 6, 0 being Sunday, 1 being Monday, and so on until 6.
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

        const classes = classSet(
            'slds-button slds-truncate avonni-filter-menu__button'
        );
        classes.add(buttonGroupOrderClass(this.groupOrder));

        if (this.label || this.selectedItemLabels.length > 0) {
            classes.add({
                'slds-button_neutral': this.buttonVariant === 'border',
                'slds-button_inverse': this.buttonVariant === 'border-inverse',
                'slds-button_outline-brand':
                    this.buttonVariant === 'outline-brand'
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

        classes.add({
            'avonni-filter-menu__button-selected':
                this.selectedItemLabels.length > 0
        });

        return classes.toString();
    }

    /**
     * Computed button title.
     *
     * @type {string}
     */
    get computedButtonTitle() {
        return [
            this.title,
            this.selectedFilterLabels,
            this.selectedItemCountLabel
        ]
            .filter(Boolean)
            .join(' ');
    }

    /**
     * Computed collapsible button icon name.
     *
     * @type {string}
     */
    get computedCollapsibleButtonIconName() {
        return this.closed ? 'utility:chevronright' : 'utility:chevrondown';
    }

    /**
     * Computed Dropdown class styling.
     *
     * @type {string}
     */
    get computedDropdownClass() {
        const alignment = this.dropdownAlignment;
        const nubbin = this.dropdownNubbin;
        const isDateTime = this.computedTypeAttributes.type === 'datetime';
        const isSmallRange = this.isRange || (this.isDateRange && isDateTime);

        const classes = classSet('slds-dropdown slds-p-around_none').add({
            'slds-dropdown_left': alignment === 'left' || this.isAutoAlignment,
            'slds-dropdown_center': alignment === 'center',
            'slds-dropdown_right': alignment === 'right',
            'slds-dropdown_bottom': alignment === 'bottom-center',
            'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right':
                alignment === 'bottom-right',
            'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left':
                alignment === 'bottom-left',
            'slds-nubbin_top-left': nubbin && alignment === 'left',
            'slds-nubbin_top-right': nubbin && alignment === 'right',
            'slds-nubbin_top': nubbin && alignment === 'center',
            'slds-nubbin_bottom-left': nubbin && alignment === 'bottom-left',
            'slds-nubbin_bottom-right': nubbin && alignment === 'bottom-right',
            'slds-nubbin_bottom': nubbin && alignment === 'bottom-center',
            'slds-dropdown_small': isSmallRange,
            'slds-dropdown_large':
                (this.isDateRange && !isDateTime) || this.isTimeRange
        });

        if (this.computedTypeAttributes.dropdownWidth) {
            classes.add(
                `slds-dropdown_${this.computedTypeAttributes.dropdownWidth}`
            );
        }
        return classes.toString();
    }

    /**
     * Computed Menu Label with selected items.
     *
     * @type {string}
     */
    get computedMenuLabelClass() {
        return classSet('slds-dropdown__list')
            .add({
                'slds-text-title_bold': this.selectedItemLabels.length > 0
            })
            .toString();
    }

    /**
     * Computed Item List Class styling.
     *
     * @type {string}
     */
    get computedDropdownContentClass() {
        const length = this.computedTypeAttributes.dropdownLength;
        return classSet('slds-dropdown__list')
            .add({
                'slds-dropdown_length-with-icon-5':
                    this.isList && length === '5-items',
                'slds-dropdown_length-with-icon-7':
                    this.isList && (!length || length === '7-items'),
                'slds-dropdown_length-with-icon-10':
                    this.isList && length === '10-items'
            })
            .toString();
    }

    get computedNoResultsMessage() {
        return (
            this.computedTypeAttributes.noResultsMessage ||
            DEFAULT_NO_RESULTS_MESSAGE
        );
    }

    /**
     * Computed section class styling.
     *
     * @type {string}
     */
    get computedSectionClass() {
        return this.displayFilters ? 'slds-show' : 'slds-hide';
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
     * Computed vertical list CSS classes.
     *
     * @type {string}
     */
    get computedVerticalListClass() {
        const length = this.computedTypeAttributes.dropdownLength;
        return classSet({
            'slds-dropdown_length-with-icon-5':
                this.isList && length === '5-items',
            'slds-dropdown_length-with-icon-7':
                this.isList && length === '7-items',
            'slds-dropdown_length-with-icon-10':
                this.isList && length === '10-items'
        }).toString();
    }

    /**
     * Returns true, if the filter menu is not collapsible or open and display the filters.
     *
     * @type {boolean}
     */
    get displayFilters() {
        return !this.collapsible || (this.collapsible && !this.closed);
    }

    /**
     * Selected end date, when the type is date-range.
     *
     * @type {string|null}
     */
    get dateRangeEndDate() {
        if (!Array.isArray(this.currentValue)) {
            return null;
        }
        return this.currentValue[1];
    }

    /**
     * Selected start date, when the type is date-range.
     *
     * @type {string|null}
     */
    get dateRangeStartDate() {
        if (!Array.isArray(this.currentValue)) {
            return null;
        }
        return this.currentValue[0];
    }

    /**
     * True if the filter menu is disabled or loading.
     *
     * @type {boolean}
     */
    get disabledOrLoading() {
        return this.isLoading || this.disabled;
    }

    /**
     * HTML element of the dropdown.
     *
     * @type {HTMLElement}
     */
    get dropdownElement() {
        return this.template.querySelector(
            '[data-element-id="div-dropdown-content"]'
        );
    }

    /**
     * True if the filter menu has nested items.
     *
     * @type {boolean}
     */
    get hasNestedItems() {
        return this.computedTypeAttributes.hasNestedItems;
    }

    /**
     * True if inifinite loading is enabled.
     *
     * @type {boolean}
     */
    get infiniteLoad() {
        return this.computedTypeAttributes.enableInfiniteLoading;
    }

    /**
     * True if the dropdown menu is automatically positionned.
     *
     * @type {boolean}
     */
    get isAutoAlignment() {
        return this.dropdownAlignment.startsWith('auto');
    }

    /**
     * True if the type is date-range.
     *
     * @type {boolean}
     */
    get isDateRange() {
        return this.type === 'date-range';
    }

    /**
     * True if the type is list.
     *
     * @type {boolean}
     */
    get isList() {
        return this.type === 'list';
    }

    /**
     * True if the type is range.
     *
     * @type {boolean}
     */
    get isRange() {
        return this.type === 'range';
    }

    /**
     * True if the type is time-range.
     *
     * @type {boolean}
     */
    get isTimeRange() {
        return this.type === 'time-range';
    }

    /**
     * True if the variant is vertical.
     *
     * @type {boolean}
     */
    get isVertical() {
        return this.variant === 'vertical';
    }

    /**
     * True if the labels have a count.
     *
     * @type {boolean}
     */
    get hasCountLabel() {
        return Object.keys(this.computedItemCounts).length > 0;
    }

    /**
     * True if no list items are visible.
     *
     * @type {boolean}
     */
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

    /**
     * The loaded number of filter items over the total number of filter items
     *
     * @type {string}
     */
    get selectedOverTotal() {
        const currentLength = this.visibleItems.length;
        let totalLength = this.computedTypeAttributes?.totalCount ?? 0;
        totalLength =
            currentLength > totalLength || !this.infiniteLoad
                ? currentLength
                : totalLength;
        return `${currentLength} of ${totalLength}`;
    }

    /**
     * Array of one action: remove. The action is shown on the selected items pills.
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
     * Value of the slider, when the type is range.
     *
     * @type {number[]}
     */
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
     * True if the end of the list is reached.
     *
     * @type {boolean}
     */
    get scrolledToEnd() {
        const fullHeight = this.dropdownElement.scrollHeight;
        const scrolledDistance = this.dropdownElement.scrollTop;
        const visibleHeight = this.dropdownElement.offsetHeight;
        return (
            visibleHeight + scrolledDistance + LOAD_MORE_OFFSET >= fullHeight
        );
    }

    /**
     * Computed Menu Label with selected filters.
     *
     * @type {string}
     */
    get selectedFilterLabels() {
        const selectedCount = this.selectedItemLabels.length;

        if (selectedCount === 0) {
            return '';
        }

        if (selectedCount <= 2) {
            const selectedLabels = this.selectedItemLabels.join(', ');
            return `(${selectedLabels})`;
        }

        const firstTwoLabels = this.selectedItemLabels
            .slice(0, 2)
            .map((item) => item)
            .join(', ');
        return `(${firstTwoLabels})`;
    }

    /**
     * Display the count for the selected items
     *
     * @type {string}
     */
    get selectedItemCountLabel() {
        if (this.isVertical) {
            const count = this.isList
                ? this.value.length
                : this.value.filter((v) => v !== null).length;

            return count > 0 ? String(count) : '';
        }

        const count = this.value.length;

        return count > 2 ? `${count - 2}+` : '';
    }

    /**
     * Display the labels of the selected items
     *
     * @type {string[]}
     */
    get selectedItemLabels() {
        const hasComputedItems = this.computedItems.length > 0;
        this.labelMap = this.dropdownVisible
            ? new Map(
                  this.computedItems.map((item) => [item.value, item.label])
              )
            : this.labelMap;

        const valueLabels = this.value.map(
            (value) => this.labelMap.get(value) || value
        );
        if (this.isDateRange || this.isRange) {
            return this.selectedItems.map((item) => item.label);
        }
        const labels = hasComputedItems
            ? this.selectedItems.map((item) => item.label)
            : valueLabels;
        return labels;
    }

    /**
     * True if the apply and reset buttons should be visible.
     *
     * @type {boolean}
     */
    get showApplyResetButtons() {
        return !this.hideApplyResetButtons && !this.showNoResultsMessage;
    }

    /**
     * True if the selected filter count should be visible
     *
     * @type {boolean}
     */
    get showCount() {
        return !!this.selectedItemCountLabel;
    }

    /**
     * True if the selected filter value should be visible
     *
     * @type {boolean}
     */
    get showFilterValue() {
        return !!this.selectedFilterLabels;
    }

    /**
     * True if the load more button should be visible.
     *
     * @type {boolean}
     */
    get showLoadMoreButton() {
        return this.infiniteLoad && !this.isLoading;
    }

    /**
     * True if clear only section should be visible.
     *
     * @type {boolean}
     */
    get showClearSection() {
        return this.showClearButton && this.currentValue.length > 0;
    }

    /**
     * True if the no result message should be visible.
     *
     * @type {boolean}
     */
    get showNoResultsMessage() {
        return (
            !this.isLoading &&
            this.noVisibleListItem &&
            this.type === 'list' &&
            (this.searchTerm || this.variant === 'horizontal')
        );
    }

    /**
     * True if the selected items should be visible.
     *
     * @type {boolean}
     */
    get showSelectedItems() {
        return !this.hideSelectedItems && this.selectedItems.length > 0;
    }

    /**
     * Selected start time, when the type is time-range.
     *
     * @type {string|null}
     */
    get timeRangeStartTime() {
        if (!Array.isArray(this.currentValue)) {
            return null;
        }
        return this.currentValue[0];
    }

    /**
     * Selected end time, when the type is time-range.
     *
     * @type {string|null}
     */
    get timeRangeEndTime() {
        if (!Array.isArray(this.currentValue)) {
            return null;
        }
        return this.currentValue[1];
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
        this._value = [...this.currentValue];
        this.computeSelectedItems();
        this.close();
    }

    /**
     * Deprecated. To unselect the value, use `reset()`. To remove the current value, use the `value` attribute.
     *
     * @deprecated
     */
    @api
    clear() {
        this._value = [];
        this.currentValue = [];
        this.computeItemCounts();
        this.computeListItems();
        this.computeSelectedItems();

        console.warn(
            'The clear() method is deprecated. To unselect the value, use reset(). To remove the current value, use the value attribute.'
        );
    }

    /**
     * Set the focus on the filter menu button (horizontal variant) or choice set (vertical variant).
     *
     * @public
     */
    @api
    focus() {
        if (this.isVertical && this.hasNestedItems) {
            const tree = this.template.querySelector(
                '[data-element-id="avonni-tree"]'
            );
            if (tree) {
                tree.focus();
            }
        } else if (this.isVertical) {
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
     * Set the focus on the search input.
     *
     * @public
     */
    @api
    focusSearchInput() {
        const search = this.template.querySelector(
            '[data-element-id="lightning-input"]'
        );
        if (search) {
            search.focus();
        }
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
            this.computeItemCounts();
            this.computeListItems();
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

    /**
     * Create the computed item counts, based on the given items.
     */
    computeItemCounts() {
        if (!this.isList || !this.computedTypeAttributes?.itemCounts) {
            return;
        }

        this.computedItemCounts = deepCopy(
            normalizeObject(this.computedTypeAttributes.itemCounts)
        );
    }

    /**
     * Create the computed list items, based on the given items.
     */
    computeListItems() {
        if (!this.isList) {
            return;
        }
        let firstFocusableItem;
        const items = deepCopy(
            normalizeArray(this.computedTypeAttributes.items, 'object')
        );
        const hasCountLabel = this.hasCountLabel;

        this.computedItems = items.map((item) => {
            let tabindex = '-1';
            if (!firstFocusableItem && !item.disabled && !item.hidden) {
                firstFocusableItem = true;
                tabindex = '0';
            }
            const numberRecords = this.computedItemCounts[item?.value] ?? 0;
            if (hasCountLabel) {
                item.countLabel = `(${numberRecords})`;
                item.additionalLabel = `(${numberRecords})`;
            }
            const computedItem = new Item({
                ...item,
                filterValue: this.currentValue,
                hasNestedItems: this.hasNestedItems,
                tabindex
            });
            return computedItem;
        });
        this.visibleItems = this.getVisibleItems();

        if (this.dropdownVisible) {
            // If the items are set while the popover is open, prevent losing focus
            this.focusDropdown();
        }
    }

    /**
     * Compute the selected items, that will be displayed as pills.
     */
    computeSelectedItems() {
        if (this.isList) {
            this.computeSelectedListItems();
        } else {
            this.computeSelectedRange();
        }
    }

    /**
     * Use the value to compute the selected list items that will be displayed as pills.
     */
    computeSelectedListItems() {
        const selectedItems = [];
        this.value.forEach((v) => {
            const item = getItemByName(v, this.computedItems);
            if (item) {
                selectedItems.push({
                    label: item.label,
                    name: item.value
                });
            }
        });

        this.selectedItems = selectedItems;
    }

    /**
     * Use the value to compute the selected range that will be displayed as a pill.
     */
    computeSelectedRange() {
        const selection = this.value.reduce((string, value) => {
            let normalizedValue = '';
            const date = new Date(value);
            if (this.isDateRange && value && !isNaN(date)) {
                // Date range
                const { dateStyle, timeStyle, timezone, type } =
                    this.computedTypeAttributes;
                normalizedValue = formatDateFromStyle(date, {
                    dateStyle,
                    showTime: type === 'datetime',
                    timeStyle,
                    timeZone: timezone
                });
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
                if (
                    style === 'percent' &&
                    this.computedTypeAttributes.isPercentage
                ) {
                    value /= 100;
                }
                normalizedValue = value.toString();
                normalizedValue = numberFormat(options).format(normalizedValue);
            } else if (this.isTimeRange && value) {
                normalizedValue = formatTimeString(value);
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
     * Close the dropdown menu.
     */
    close() {
        if (this.dropdownVisible) {
            this.toggleMenuVisibility();
        }
    }

    /**
     * Set the focus on the dropdown menu of the horizontal variant.
     */
    focusDropdown() {
        const isFocusableList =
            (this.isList && this.visibleItems.length) ||
            this.computedTypeAttributes.allowSearch;
        const isFocusable =
            isFocusableList || (!this.isList && !this.isLoading);

        if (isFocusable) {
            this._allowBlur = false;
            requestAnimationFrame(() => {
                const focusTrap = this.template.querySelector(
                    '[data-element-id="avonni-focus-trap"]'
                );
                if (focusTrap) {
                    this._dropdownIsFocused = true;
                    focusTrap.focus();
                }
            });
        }
    }

    /**
     * Set the focus on a list item of the dropdown menu.
     *
     * @param {number} currentIndex Index of the currently focused item.
     * @param {number} addedIndex Index to add to the current index. Valid values include 1 and -1. Defaults to 1.
     */
    focusListItem(currentIndex, addedIndex = 1) {
        const items = this.template.querySelectorAll(
            '[data-element-id="a-list-item"]'
        );
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
     * Set the focus on the range.
     */
    focusRange() {
        requestAnimationFrame(() => {
            const range = this.template.querySelector(
                '[data-element-id="avonni-slider"]'
            );
            if (range) {
                range.focus();
            }
        });
    }

    /**
     * Get only the item that are in the search scope or have children that are in the search scope.
     */
    getVisibleItems(items = this.computedItems) {
        if (!this.searchTerm || typeof this.searchTerm !== 'string') {
            return items;
        }

        const visibleItems = [];
        for (let i = 0; i < items.length; i += 1) {
            const visibleItem = new Item({
                ...items[i],
                filterValue: this.currentValue
            });
            if (Array.isArray(visibleItem.items)) {
                visibleItem.items = this.getVisibleItems(visibleItem.items);
                if (visibleItem.items.length) {
                    visibleItem.expanded = true;
                    visibleItems.push(visibleItem);
                    continue;
                }
            }

            const normalizedLabel = items[i].label.toLowerCase();
            const searchTerm = this.searchTerm.toLowerCase();
            const matchesSearch = normalizedLabel.includes(searchTerm);
            if (matchesSearch) {
                visibleItems.push(visibleItem);
            }
        }
        return visibleItems;
    }

    /**
     * Create the computed type attributes. Make sure only the authorized attributes for the given type are kept, add the deperecated attributes and compute the list items.
     */
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
        this.computeItemCounts();
        this.computeListItems();
    }

    /**
     * Observe the dropdown position if its position is automatically set.
     */
    pollBoundingRect() {
        // only poll if the dropdown is auto aligned
        if (this.isAutoAlignment && this.dropdownVisible) {
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

    /**
     * Set the order of the button menu. This method is used as a callback by a potential button group parent.
     *
     * @param {number} order Order of the button menu in its siblings.
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
        if (!this.isAutoAlignment) {
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

    /**
     * Make sure the deprecated attributes used for the list type are still supported through the type attributes.
     */
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
     * Toggle the visibility of the dropdown menu.
     */
    toggleMenuVisibility() {
        if (!this.disabled) {
            this.dropdownVisible = !this.dropdownVisible;
            if (this.dropdownVisible) {
                this.startPositioning();
                this.dispatchOpen();

                // update the bounding rect when the menu is toggled
                this._boundingRect = this.getBoundingClientRect();

                this.pollBoundingRect();
                this.currentValue = [...this.value];
                this.computeItemCounts();
                this.computeListItems();
                this.focusDropdown();
            } else {
                this.stopPositioning();
                this.dispatchClose();
                this._previousScroll = undefined;
            }
        }
    }

    toggleTreeItem(levelPath = [], action) {
        const visibleItem = getTreeItemByLevelPath(
            levelPath,
            this.visibleItems
        );
        visibleItem.checked = !visibleItem.checked;
        const item = getItemByName(visibleItem.name, this.computedItems);
        this.currentValue = toggleTreeItemValue({
            action,
            item,
            value: this.currentValue
        });
        visibleItem.updateActions();
        this.visibleItems = [...this.visibleItems];
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS AND DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Handle a click on the apply button.
     */
    handleApply() {
        this.apply();
        this.dispatchApply();
    }

    /**
     * Handle the blur of the button menu.
     */
    handleButtonBlur() {
        if (this._allowBlur) {
            this.dispatchEvent(new CustomEvent('blur'));
            this.close();
        }
    }

    /**
     * Handle a click on the button menu.
     */
    handleButtonClick() {
        if (!this._preventDropdownToggle) {
            this.toggleMenuVisibility();
        }
        this._preventDropdownToggle = false;
    }

    /**
     * Handle a focus on the button menu.
     */
    handleButtonFocus() {
        if (this._allowBlur) {
            this.dispatchEvent(new CustomEvent('focus'));
        } else {
            this._allowBlur = true;

            if (this.dropdownVisible) {
                // Prevent toggling the menu twice,
                // if we click on the button when it is open
                this._preventDropdownToggle = true;
            }
        }
    }

    /**
     * Handle a change in the value of the input choice set that is visible when the variant is vertical.
     *
     * @param {Event} event change event.
     */
    handleChoiceSetChange(event) {
        const value = event.detail.value;
        this.currentValue =
            value && !Array.isArray(value) ? [value] : value || [];
        this.computedItems.forEach((item) => {
            item.checked = this.currentValue.includes(item.value);
        });
        this.dispatchSelect();
    }

    /**
     * Handle a change of the input date range, when the type is date-range.
     *
     * @param {Event} event change event.
     */
    handleDateRangeChange(event) {
        const { startDate, endDate } = event.detail;
        this.currentValue = !startDate && !endDate ? [] : [startDate, endDate];
        this._dateRangeFrames.forEach((f) => cancelAnimationFrame(f));
        this._dateRangeFrames = [];

        // Give time for the calendar to actually close
        this._dateRangeFrames[0] = requestAnimationFrame(() => {
            const dateRange = this.template.querySelector(
                '[data-element-id="avonni-input-date-range"]'
            );

            if (dateRange) {
                dateRange.blur();
            }

            this._dateRangeFrames[1] = requestAnimationFrame(() => {
                this._dateRangeFrames[2] = requestAnimationFrame(() => {
                    this.dispatchSelect();
                });
            });
        });
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
     * Handle a click on a list item.
     *
     * @param {Event} event click event.
     */
    handleListItemClick(event) {
        event.preventDefault();
        const { value, disabled } = event.currentTarget.dataset;
        if (disabled) {
            return;
        }

        this.currentValue = [];
        this.computedItems = this.computedItems.map((item) => {
            if (item.value === value) {
                item.checked = !item.checked;
            } else if (!this.computedTypeAttributes.isMultiSelect) {
                item.checked = false;
            }
            if (item.checked) {
                this.currentValue.push(item.value);
            }
            return item;
        });
        this.visibleItems = this.getVisibleItems();

        this.dispatchSelect();
    }

    /**
     * Handle a key down on a list item.
     *
     * @param {Event} event keydown event.
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
            case ' ':
            case 'Spacebar': {
                event.currentTarget.click();
                break;
            }
            default:
                break;
        }
    }

    /**
     * Handle a click on the load more button.
     */
    handleLoadMore() {
        this.dispatchLoadMore();
    }

    /**
     * Handle a change of the slider value, when the type is range.
     *
     * @param {Event} event change event.
     */
    handleRangeChange(event) {
        this.currentValue = event.detail.value;
        this.dispatchSelect();
    }

    /**
     * Handle a click on the reset button.
     */
    handleResetClick() {
        /**
         * The event fired when the selection is resetted.
         *
         * @event
         * @name reset
         * @public
         * @bubbles
         */
        this.dispatchEvent(new CustomEvent('reset', { bubbles: true }));
        this.reset();

        // In the vertical menu, a reset event can still be dispatched even when
        // hideApplyResetButtons is true, because of the Clear button.
        // Save the reset immediately.
        if (this.hideApplyButton || this.hideApplyResetButtons) {
            this._value = [...this.currentValue];
            this.computeSelectedItems();
            this.dispatchApply();
        }
    }

    /**
     * Handle a scroll movement in the dropdown menu.
     */
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
     * Handle an input in the search box.
     *
     * @param {Event} event change event.
     */
    handleSearch(event) {
        event.stopPropagation();
        this.searchTerm = event.detail.value;

        clearTimeout(this._searchTimeOut);
        this._searchTimeOut = setTimeout(() => {
            this.visibleItems = this.getVisibleItems();

            /**
             * The event fired when the search input value is changed.
             *
             * @event
             * @name search
             * @param {string} value The value of the search input.
             * @public
             * @bubbles
             */
            this.dispatchEvent(
                new CustomEvent('search', {
                    detail: {
                        value: this.searchTerm
                    },
                    bubbles: true
                })
            );

            if (
                this.isVertical &&
                this.infiniteLoad &&
                !this.isLoading &&
                this.noVisibleListItem
            ) {
                this.dispatchLoadMore();
            } else if (!this.infiniteLoad && this.isList) {
                this.dispatchLoadItemCounts();
            }
            this.dispatchLoadTotalCount();
        }, 300);
    }

    /**
     * Handle the removal of a selected item.
     *
     * @param {Event} event actionclick event.
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
        this.computeItemCounts();
        this.computeListItems();
        this.dispatchApply();
    }

    /**
     * Handle a change of the input time range, when the type is time-range.
     *
     * @param {Event} event
     */
    handleTimeRangeChange(event) {
        event.stopPropagation();
        event.preventDefault();

        const elementId = event.target.dataset.elementId;
        const value = event.target.value;

        let [start, end] = this.currentValue;

        start = start ?? null;
        end = end ?? null;

        if (elementId === 'lightning-input-start-time') {
            start = value;
        } else if (elementId === 'lightning-input-end-time') {
            end = value;
        }

        this.currentValue = [start, end];

        this.dispatchSelect();
    }

    handleTreeActionClick(event) {
        const { name, levelPath } = event.detail;
        if (
            name !== SELECT_ALL_ACTION.name &&
            name !== UNSELECT_ALL_ACTION.name &&
            name !== SELECT_IMMEDIATE_CHILDREN_ACTION.name
        ) {
            return;
        }
        this.toggleTreeItem(levelPath, name);
        this.dispatchSelect();
    }

    /**
     * Handle a `loadmore` event coming from a list that has nested items.
     *
     * @param {Event} event `loadmore` event coming from the tree.
     */
    handleTreeLoadMore(event) {
        const levelPath = event.detail.levelPath;
        const item = getTreeItemByLevelPath(levelPath, this.visibleItems);
        if (item) {
            this.dispatchLoadMore(item);
        }
    }

    /**
     * Handle the selection of a list item when the list has nested items.
     *
     * @param {Event} event `select` event coming from the tree.
     */
    handleTreeSelect(event) {
        event.stopPropagation();

        const levelPath = event.detail.levelPath;
        if (levelPath) {
            this.toggleTreeItem(levelPath);
        } else {
            const value = deepCopy(event.detail.selectedItems);
            this.currentValue = value;
        }

        this.dispatchSelect();
    }

    /**
     * Dispatch the apply event.
     */
    dispatchApply() {
        /**
         * The event fired when the “Apply” button is clicked, or a pill removed from the selected items. If `hide-apply-reset-buttons` is `true`, the `apply` event is also fired when the user selects or unselects a value.
         *
         * @event
         * @name apply
         * @param {string[]|number[]} value New value of the filter menu.
         * @public
         * @bubbles
         */
        this.dispatchEvent(
            new CustomEvent('apply', {
                detail: {
                    value: this.value
                },
                bubbles: true
            })
        );
    }

    /**
     * Dispatch the close event.
     */
    dispatchClose() {
        /**
         * The event fired when the dropdown is closed (horizontal variant) or the section is closed (vertical variant).
         *
         * @event
         * @name close
         * @public
         * @bubbles
         */
        this.dispatchEvent(new CustomEvent('close', { bubbles: true }));
    }

    /**
     * Dispatch the `loaditemcounts` event.
     *
     */
    dispatchLoadItemCounts() {
        /**
         * The event fired when the number of records by item needs to be updated. It is only fired if type of the menu is a list and the`enableInfiniteLoading` type attribute is absent.
         *
         * @event
         * @name loaditemcounts
         * @public
         * @bubbles
         */
        this.dispatchEvent(
            new CustomEvent('loaditemcounts', {
                bubbles: true
            })
        );
    }

    /**
     * Dispatch the `loadmore` event.
     *
     * @param {object} item Parent item that triggered the `loadmore` event, if the items are nested.
     */
    dispatchLoadMore(item) {
        /**
         * The event fired when the end of a list is reached. It is only fired if the `enableInfiniteLoading` type attribute is present. In the horizontal variant, the `loadmore` event is triggered by a scroll to the end of the list. In the vertical variant, the `loadmore` event is triggered by a button clicked by the user or by a nested item opening.
         *
         * @event
         * @name loadmore
         * @param {object} item If the event was triggered by a nested item, definition of this item.
         * @public
         * @bubbles
         */
        this.dispatchEvent(
            new CustomEvent('loadmore', {
                bubbles: true,
                detail: { item: deepCopy(item) }
            })
        );
    }

    /**
     * Dispatch the `loadtotalcount` event.
     */
    dispatchLoadTotalCount() {
        /**
         * The event fired when the list is is rendered or the search term is modified.
         *
         * @event
         * @name loadtotalcount
         * @public
         * @bubbles
         */
        this.dispatchEvent(
            new CustomEvent('loadtotalcount', { bubbles: true })
        );
    }

    /**
     * Dispatch the open event.
     */
    dispatchOpen() {
        /**
         * The event fired when the dropdown is opened (horizontal variant) or the section is opened (vertical variant).
         *
         * @event
         * @name open
         * @public
         * @bubbles
         */
        this.dispatchEvent(new CustomEvent('open', { bubbles: true }));
    }

    /**
     * Dispatch the select event.
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
             * @bubbles
             */
            new CustomEvent('select', {
                detail: {
                    value: deepCopy(this.currentValue)
                },
                bubbles: true
            })
        );

        // Save the selection immediately
        if (this.hideApplyButton || this.hideApplyResetButtons) {
            this._value = [...this.currentValue];
            this.computeSelectedItems();
            this.dispatchApply();

            if (this.isList && !this.computedTypeAttributes.isMultiSelect) {
                this.close();
            }
        }
    }

    /**
     * Section change status toggle.
     */
    toggleSection() {
        this._closed = !this._closed;

        if (this._closed) {
            this.dispatchClose();
        } else {
            this.dispatchOpen();
        }
    }
}
