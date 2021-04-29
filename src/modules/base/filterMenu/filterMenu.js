import { LightningElement, api, track } from 'lwc';
import {
    normalizeBoolean,
    normalizeString,
    normalizeArray,
    observePosition
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';
import { Tooltip } from 'c/tooltipLibrary';

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

// TODO:
// update tests

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
    _hideSearchBox = false;
    _submitButtonLabel = DEFAULT_SUBMIT_BUTTON_LABEL;
    _resetButtonLabel = DEFAULT_RESET_BUTTON_LABEL;
    _menuWidth = MENU_WIDTHS.default;
    _menuLength = MENU_LENGTHS.default;
    _cancelBlur = false;
    _dropdownVisible = false;

    @track computedItems = [];
    dropdownOpened = false;

    connectedCallback() {
        this.classList.add(
            'slds-dropdown-trigger',
            'slds-dropdown-trigger_click'
        );
    }

    renderedCallback() {
        this.initTooltip();

        if (this._dropdownVisible) {
            this.cancelBlur();
        }
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
            valid: ICON_SIZES.valid
        });
    }

    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(bool) {
        this._isLoading = normalizeBoolean(bool);
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
        const array = JSON.parse(JSON.stringify(proxy));
        this._value = normalizeArray(array);

        this.computeValue();
    }

    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: VARIANTS.default,
            valid: VARIANTS.valid
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
    get hideSearchBox() {
        return this._hideSearchBox;
    }
    set hideSearchBox(bool) {
        this._hideSearchBox = normalizeBoolean(bool);
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
            valid: MENU_ALIGNMENTS.valid
        });
    }

    @api
    get menuWidth() {
        return this._menuWidth;
    }
    set menuWidth(value) {
        this._menuWidth = normalizeString(value, {
            fallbackValue: MENU_WIDTHS.default,
            valid: MENU_WIDTHS.valid
        });
    }

    @api
    get menuLength() {
        return this._menuLength;
    }
    set menuLength(value) {
        this._menuLength = normalizeString(value, {
            fallbackValue: MENU_LENGTHS.default,
            valid: MENU_LENGTHS.valid
        });
    }

    @api
    get nubbin() {
        return this._nubbin;
    }
    set nubbin(bool) {
        this._nubbin = normalizeBoolean(bool);
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
                'slds-dropdown_large': this.menuWidth === 'large',
                'slds-dropdown_length-with-icon-5':
                    this.menuLength === '5-items',
                'slds-dropdown_length-with-icon-7':
                    this.menuLength === '7-items',
                'slds-dropdown_length-with-icon-10':
                    this.menuLength === '10-items'
            })
            .toString();
    }

    @api
    clear() {
        this._value = [];
        this.computeValue();
    }

    computeTabindex() {
        this.computedItems.forEach((item) => {
            if (!item.disabled) {
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

    isAutoAlignment() {
        return this.menuAlignment.startsWith('auto');
    }

    focusOnButton() {
        this.template.querySelector('button').focus();
    }

    toggleMenuVisibility() {
        if (!this.disabled) {
            this._dropdownVisible = !this._dropdownVisible;
            if (!this.dropdownOpened && this._dropdownVisible) {
                this.dropdownOpened = true;
            }
            if (this._dropdownVisible) {
                this.dispatchEvent(new CustomEvent('open'));

                // update the bounding rect when the menu is toggled
                this._boundingRect = this.getBoundingClientRect();

                this.pollBoundingRect();
            } else {
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

    handleButtonClick() {
        this.allowBlur();

        this.toggleMenuVisibility();

        // Focus on the button even if the browser doesn't do it by default
        // (the behaviour differs between Chrome, Safari, Firefox)
        this.focusOnButton();
    }

    handleBlur() {
        // Don't handle the blur event if the focus events are inside the menu (see the cancelBlur/allowBlur functions)
        if (this._cancelBlur) {
            return;
        }
        // Hide only when the focus moved away from the container
        if (this._dropdownVisible) {
            this.toggleMenuVisibility();
        }

        // dispatch standard blur event
        this.dispatchEvent(new CustomEvent('blur'));
    }

    handleFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
    }

    handleDropdownMouseDown(event) {
        // if the menu contains a scrollbar due to large number of menu-items
        // this is needed so that menu doesnt close on dragging the scrollbar with the mouse
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

    handleDropdownMouseUp() {
        // We need this to make sure that if a scrollbar is being dragged with the mouse, upon release
        // of the drag we allow blur, otherwise the dropdown would not close on blur since we'd have cancel blur
        // set
        this.allowBlur();
    }

    handleDropdownMouseLeave() {
        // this is to close the menu after mousedown happens on scrollbar
        // in this case we close immediately if no menu-items were hovered/focused
        // without this the menu would remain open since the blur on the menuitems has happened already
        // when clicking the scrollbar
        if (!this._menuHasFocus) {
            this.close();
        }
    }

    handleDropdownScroll(event) {
        // We don't want this to bubble up to the modal which due to event retargeting wouldn't be able
        // to know what is actually being scrolled and thus may lead to the scrolling of the modal
        event.stopPropagation();
    }

    handleMenuContentFocus(event) {
        event.stopPropagation();

        // reset the cancelBlur so any clicks outside the menu can now close the menu
        this.allowBlur();
        this._menuHasFocus = true;
    }

    handleMenuContentBlur(event) {
        event.stopPropagation();

        this.handleBlur();
        this._menuHasFocus = false;
    }

    handleItemSelect(event) {
        const index = this.value.findIndex(
            (itemValue) => itemValue === event.currentTarget.value
        );
        if (index > -1) {
            this.value.splice(index, 1);
        } else {
            this.value.push(event.currentTarget.value);
        }

        this.computeValue();

        event.stopPropagation();
        this.dispatchSelect(event);
    }

    dispatchSelect(event) {
        this.dispatchEvent(
            new CustomEvent('select', {
                cancelable: true,
                detail: {
                    value: event.detail.value // pass value through from original private event
                }
            })
        );
    }

    handleSubmitClick() {
        this.dispatchEvent(
            new CustomEvent('apply', {
                detail: {
                    value: this.value
                }
            })
        );
        this.clear();
        this.handleBlur();
        this._menuHasFocus = false;
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
