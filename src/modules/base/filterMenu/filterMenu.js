import { LightningElement, api, track } from 'lwc';
import {
    normalizeBoolean,
    normalizeString,
    normalizeArray,
    observePosition,
    animationFrame,
    timeout
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import { Tooltip } from 'c/tooltipLibrary';
import {
    Direction,
    startPositioning,
    stopPositioning
} from 'c/positionLibrary';

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

const VARIANTS = {
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

const MENU_WIDTHS = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'small'
};

const MENU_LENGTHS = {
    valid: ['5-items', '7-items', '10-items'],
    default: '7-items'
};

const i18n = {
    loading: 'Loading',
    showMenu: 'Show Menu'
};

const DEFAULT_ICON_NAME = 'utility:down';
const DEFAULT_SEARCH_INPUT_PLACEHOLDER = 'Search...';
const DEFAULT_SUBMIT_BUTTON_LABEL = 'Apply';
const DEFAULT_RESET_BUTTON_LABEL = 'Reset';

export default class FilterMenu extends LightningElement {
    @api accessKey;
    @api label;
    @api title;

    _alternativeText = i18n.showMenu;
    _loadingStateAlternativeText = i18n.loading;
    _tooltip;
    _disabled = false;
    _iconName = DEFAULT_ICON_NAME;
    _iconSize = ICON_SIZES.default;
    _isLoading = false;
    _items = [];
    _menuAlignment = MENU_ALIGNMENTS.default;
    _nubbin = false;
    _value = [];
    _variant = VARIANTS.default;
    _searchInputPlaceholder = DEFAULT_SEARCH_INPUT_PLACEHOLDER;
    _showSearchBox = false;
    _submitButtonLabel = DEFAULT_SUBMIT_BUTTON_LABEL;
    _resetButtonLabel = DEFAULT_RESET_BUTTON_LABEL;
    _menuWidth = MENU_WIDTHS.default;
    _menuLength = MENU_LENGTHS.default;
    _hideSelectedItems = false;

    _cancelBlur = false;
    _dropdownVisible = false;

    @track computedItems = [];
    @track selectedItems = [];
    dropdownOpened = false;

    connectedCallback() {
        this.classList.add(
            'slds-dropdown-trigger',
            'slds-dropdown-trigger_click'
        );

        // button-group necessities
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
    }

    renderedCallback() {
        this.initTooltip();
    }

    @api
    get alternativeText() {
        return this._alternativeText;
    }
    set alternativeText(value) {
        this._alternativeText =
            typeof value === 'string' ? value.trim() : i18n.showMenu;
    }

    @api
    get loadingStateAlternativeText() {
        return this._loadingStateAlternativeText;
    }
    set loadingStateAlternativeText(value) {
        this._loadingStateAlternativeText =
            typeof value === 'string' ? value.trim() : i18n.loading;
    }

    @api
    get tooltip() {
        return this._tooltip ? this._tooltip.value : undefined;
    }

    set tooltip(value) {
        if (this._tooltip) {
            this._tooltip.value = value;
        } else if (value) {
            // Note that because the tooltip target is a child element it may not be present in the
            // dom during initial rendering.
            this._tooltip = new Tooltip(value, {
                root: this,
                target: () => this.template.querySelector('button')
            });
            this._tooltip.initialize();
        }
    }

    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(bool) {
        this._disabled = normalizeBoolean(bool);
    }

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

    @api
    get items() {
        return this._items;
    }
    set items(proxy) {
        this._items = normalizeArray(proxy);
        this.computedItems = JSON.parse(JSON.stringify(this._items));

        this.computeValue();
        this.computeTabindex();
    }

    @api
    get value() {
        return this._value;
    }
    set value(proxy) {
        const array = normalizeArray(proxy);
        this._value = JSON.parse(JSON.stringify(array));

        this.computeValue();
    }

    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: VARIANTS.default,
            validValues: VARIANTS.valid
        });
    }

    @api
    get searchInputPlaceholder() {
        return this._searchInputPlaceholder;
    }
    set searchInputPlaceholder(value) {
        this._searchInputPlaceholder =
            value && typeof value === 'string'
                ? value.trim()
                : DEFAULT_SEARCH_INPUT_PLACEHOLDER;
    }

    @api
    get showSearchBox() {
        return this._showSearchBox;
    }
    set showSearchBox(bool) {
        this._showSearchBox = normalizeBoolean(bool);
    }

    @api
    get submitButtonLabel() {
        return this._submitButtonLabel;
    }
    set submitButtonLabel(value) {
        this._submitButtonLabel =
            value && typeof value === 'string'
                ? value.trim()
                : DEFAULT_SUBMIT_BUTTON_LABEL;
    }

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

    @api
    get nubbin() {
        return this._nubbin;
    }
    set nubbin(bool) {
        this._nubbin = normalizeBoolean(bool);
    }

    @api
    get hideSelectedItems() {
        return this._hideSelectedItems;
    }
    set hideSelectedItems(bool) {
        this._hideSelectedItems = normalizeBoolean(bool);
    }

    get computedShowDownIcon() {
        return !(
            this.iconName === 'utility:down' ||
            this.iconName === 'utility:chevrondown'
        );
    }

    get computedAriaExpanded() {
        return String(this._dropdownVisible); // default value must be a string for the attribute to always be present with a string value
    }

    get computedButtonClass() {
        const isDropdownIcon = !this.computedShowDownIcon;
        const isBare =
            this.variant === 'bare' || this.variant === 'bare-inverse';

        const classes = classSet('slds-button');

        if (this.label) {
            classes.add({
                'slds-button_neutral': this.variant === 'border',
                'slds-button_inverse': this.variant === 'border-inverse'
            });
        } else {
            // The inverse check is to allow for a combination of a non-default icon and an -inverse variant
            const useMoreContainer =
                this.variant === 'container' ||
                this.variant === 'bare-inverse' ||
                this.variant === 'border-inverse';

            classes.add({
                'slds-button_icon': !isDropdownIcon,
                'slds-button_icon-bare': isBare,
                'slds-button_icon-more': !useMoreContainer && !isDropdownIcon,
                'slds-button_icon-container-more':
                    useMoreContainer && !isDropdownIcon,
                'slds-button_icon-container':
                    this.variant === 'container' && isDropdownIcon,
                'slds-button_icon-border':
                    this.variant === 'border' && isDropdownIcon,
                'slds-button_icon-border-filled':
                    this.variant === 'border-filled',
                'slds-button_icon-border-inverse':
                    this.variant === 'border-inverse',
                'slds-button_icon-inverse': this.variant === 'bare-inverse',
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

    get computedDropdownClass() {
        return classSet('slds-dropdown')
            .add({
                'slds-dropdown_left':
                    this.menuAlignment === 'left' || this.isAutoAlignment(),
                'slds-dropdown_center': this.menuAlignment === 'center',
                'slds-dropdown_right': this.menuAlignment === 'right',
                'slds-dropdown_bottom': this.menuAlignment === 'bottom-center',
                'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right':
                    this.menuAlignment === 'bottom-right',
                'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left':
                    this.menuAlignment === 'bottom-left',
                'slds-nubbin_top-left':
                    this.nubbin && this.menuAlignment === 'left',
                'slds-nubbin_top-right':
                    this.nubbin && this.menuAlignment === 'right',
                'slds-nubbin_top':
                    this.nubbin && this.menuAlignment === 'center',
                'slds-nubbin_bottom-left':
                    this.nubbin && this.menuAlignment === 'bottom-left',
                'slds-nubbin_bottom-right':
                    this.nubbin && this.menuAlignment === 'bottom-right',
                'slds-nubbin_bottom':
                    this.nubbin && this.menuAlignment === 'bottom-center',
                'slds-p-vertical_large': this.isLoading,
                'slds-dropdown_xx-small': this.menuWidth === 'xx-small',
                'slds-dropdown_x-small': this.menuWidth === 'x-small',
                'slds-dropdown_small': this.menuWidth === 'small',
                'slds-dropdown_medium': this.menuWidth === 'medium',
                'slds-dropdown_large': this.menuWidth === 'large'
            })
            .toString();
    }

    get computedItemListClass() {
        return classSet('slds-dropdown__list').add({
            'slds-dropdown_length-with-icon-5': this.menuLength === '5-items',
            'slds-dropdown_length-with-icon-7': this.menuLength === '7-items',
            'slds-dropdown_length-with-icon-10': this.menuLength === '10-items'
        });
    }

    get showSelectedItems() {
        return !this.hideSelectedItems && this.selectedItems.length > 0;
    }

    @api
    focus() {
        this.template.querySelector('button').focus();
    }

    @api
    clear() {
        this._value = [];
        this.computeValue();
    }

    computeTabindex() {
        let firstFocusableItem;
        this.computedItems.forEach((item) => {
            if (!firstFocusableItem && !item.disabled) {
                firstFocusableItem = true;
                item.tabindex = '0';
            } else {
                item.tabindex = '-1';
            }
        });
    }

    computeValue() {
        this.computedItems.forEach((item) => {
            if (this.value.indexOf(item.value) > -1) {
                item.checked = true;
            } else {
                item.checked = false;
            }
        });
    }

    allowBlur() {
        this._cancelBlur = false;
    }

    cancelBlur() {
        this._cancelBlur = true;
    }

    close() {
        if (this._dropdownVisible) {
            this.toggleMenuVisibility();
        }
    }

    initTooltip() {
        if (this._tooltip && !this._tooltip.initialized) {
            this._tooltip.initialize();
        }
    }

    setOrder(order) {
        this._order = order;
    }

    isAutoAlignment() {
        return this.menuAlignment.startsWith('auto');
    }

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
                        target: () => this.template.querySelector('button'),
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

    stopPositioning() {
        if (this._autoPosition) {
            stopPositioning(this._autoPosition);
            this._autoPosition = null;
        }
        this._positioning = false;
    }

    toggleMenuVisibility() {
        if (!this.disabled) {
            this._dropdownVisible = !this._dropdownVisible;
            if (!this.dropdownOpened && this._dropdownVisible) {
                this.dropdownOpened = true;
            }
            if (this._dropdownVisible) {
                this.startPositioning();
                this.dispatchEvent(new CustomEvent('open'));

                // update the bounding rect when the menu is toggled
                this._boundingRect = this.getBoundingClientRect();

                this.pollBoundingRect();
            } else {
                this.stopPositioning();
                this.dispatchEvent(new CustomEvent('close'));
            }

            this.classList.toggle('slds-is-open');
        }
    }

    pollBoundingRect() {
        // only poll if the dropdown is auto aligned
        if (this.isAutoAlignment() && this._dropdownVisible) {
            setTimeout(
                () => {
                    if (this.isConnected) {
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

    handleDropdownMouseDown(event) {
        const mainButton = 0;
        if (event.button === mainButton) {
            this.cancelBlur();
        }
    }

    handleButtonMouseDown(event) {
        const mainButton = 0;
        if (event.button === mainButton) {
            this.cancelBlur();
        }
    }

    handleDropdownClick() {
        // On click outside of a focusable element, the focus will go to the button
        if (!this.template.activeElement) {
            this.focus();
        }
    }

    handleButtonClick() {
        this.allowBlur();

        this.toggleMenuVisibility();
    }

    handleButtonFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
    }

    handleButtonBlur() {
        if (!this._cancelBlur) {
            this.close();
            this.dispatchEvent(new CustomEvent('blur'));
        }
    }

    handlePrivateSelect(event) {
        const index = this.value.findIndex(
            (itemValue) => itemValue === event.detail.value
        );
        if (index > -1) {
            this.value.splice(index, 1);
        } else {
            this.value.push(event.detail.value);
        }

        this.computeValue();

        event.stopPropagation();

        // Dispatch the event with the same properties as LWC button-menu
        this.dispatchEvent(
            new CustomEvent('select', {
                cancelable: true,
                detail: {
                    value: event.detail.value
                }
            })
        );
    }

    handlePrivateBlur(event) {
        event.stopPropagation();

        if (this._cancelBlur) {
            return;
        }

        if (this._dropdownVisible) {
            this.toggleMenuVisibility();
        }
    }

    handlePrivateFocus(event) {
        event.stopPropagation();
        this.allowBlur();
    }

    handleKeyDown(event) {
        if (event.code === 'Tab') {
            this.cancelBlur();

            if (event.target.label === this.submitButtonLabel) {
                this.allowBlur();
                this.close();
                this.dispatchEvent(new CustomEvent('blur'));
            }
        }

        const isMenuItem = event.target.tagName === 'LIGHTNING-MENU-ITEM';

        // To follow LWC convention, menu items are navigable with up and down arrows
        if (isMenuItem) {
            const index = Number(event.target.dataset.index);

            if (event.code === 'ArrowUp') {
                const previousItem = this.template.querySelector(
                    `[data-index="${index - 1}"]`
                );
                if (previousItem) {
                    this.cancelBlur();
                    previousItem.focus();
                }
            } else if (event.code === 'ArrowDown') {
                const nextItem = this.template.querySelector(
                    `[data-index="${index + 1}"]`
                );
                if (nextItem) {
                    this.cancelBlur();
                    nextItem.focus();
                }
            }
        }
    }

    handleSelectedItemRemove(event) {
        const index = event.detail.index;
        this.selectedItems.splice(index, 1);

        const value = this.selectedItems.map((item) => item.name);

        this.dispatchEvent(
            new CustomEvent('apply', {
                detail: {
                    value: value
                }
            })
        );
    }

    handleSubmitClick() {
        const selectedItems = [];
        this.computedItems.forEach((item) => {
            if (item.checked) {
                selectedItems.push({
                    label: item.label,
                    name: item.value
                });
            }
        });
        this.selectedItems = selectedItems;

        this.dispatchEvent(
            new CustomEvent('apply', {
                detail: {
                    value: this.value
                }
            })
        );

        this.dispatchEvent(
            new CustomEvent('privateapply', {
                detail: {
                    value: this.selectedItems
                }
            })
        );
        this.clear();
        this.close();
    }

    handleResetClick() {
        this.dispatchEvent(new CustomEvent('reset'));
        this.clear();
    }

    handleSearch(event) {
        const searchTerm = event.currentTarget.value.toLowerCase();

        this.computedItems.forEach((item) => {
            const label = item.label.toLowerCase();
            item.hidden = searchTerm ? !label.includes(searchTerm) : false;
        });

        this.dispatchEvent(
            new CustomEvent('search', {
                detail: {
                    value: event.currentTarget.value
                }
            })
        );
    }
}
