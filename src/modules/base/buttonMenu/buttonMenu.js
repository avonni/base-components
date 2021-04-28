import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import {
    normalizeBoolean,
    normalizeString,
    observePosition
} from 'c/utilsPrivate';

const i18n = {
    loading: 'Loading',
    showMenu: 'Show Menu'
};

const menuItemCSSClassName = 'slds-dropdown__item';
const menuItemCSSSelector = `.slds-dropdown__list .${menuItemCSSClassName}`;

const validMenuAlignments = [
    'left',
    'center',
    'right',
    'bottom-left',
    'bottom-center',
    'bottom-right'
];

export default class ButtonMenu extends LightningElement {
    static delegatesFocus = true;

    @api iconSize = 'medium';

    @api iconName = 'utility:down';

    @api value = '';

    @api alternativeText = i18n.showMenu;

    @api loadingStateAlternativeText = i18n.loading;

    @api label;

    @api draftAlternativeText;

    _accesskey = null;
    _disabled = false;
    _dropdownVisible = false;
    _dropdownOpened = false;
    _nubbin = false;
    _title = null;
    _isDraft = false;
    _isLoading = false;
    _focusOnIndexDuringRenderedCallback = null;
    _tabindex = 0;

    _order = null;
    _variant = 'border';

    _positioning = false;
    _menuAlignment = 'left';
    _boundingRect = {};
    _rerenderFocus = true;

    _needsFocusAfterRender = false;

    connectedCallback() {
        this._connected = true;

        this.classList.add(
            'slds-dropdown-trigger',
            'slds-dropdown-trigger_click'
        );

        if (this.isDraft) {
            this.classList.add('slds-is-unsaved');
        }

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

    disconnectedCallback() {
        this._connected = false;
        if (this._deRegistrationCallback) {
            this._deRegistrationCallback();
        }
    }

    renderedCallback() {
        if (
            !this._positioning &&
            this._dropdownVisible &&
            this._rerenderFocus
        ) {
            this.focusOnMenuItemAfterRender();
        }
    }

    @api get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: 'border',
            validValues: [
                'border',
                'border-inverse',
                'border-filled',
                'bare',
                'bare-inverse',
                'container'
            ]
        });
    }

    @api get menuAlignment() {
        return this._menuAlignment;
    }

    set menuAlignment(value) {
        this._menuAlignment = normalizeString(value, {
            fallbackValue: 'left',
            validValues: validMenuAlignments
        });
    }

    @api get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    @api get nubbin() {
        return this._nubbin;
    }

    set nubbin(value) {
        this._nubbin = normalizeBoolean(value);
    }

    @api get title() {
        return this._title;
    }

    set title(newValue) {
        this._title = newValue;
    }

    @api get isDraft() {
        return this._isDraft;
    }

    set isDraft(value) {
        this._isDraft = normalizeBoolean(value);
    }

    @api get isLoading() {
        return this._isLoading;
    }

    set isLoading(value) {
        const normalizedValue = normalizeBoolean(value);
        if (this.isAutoAlignment()) {
            this.stopPositioning();
        }

        this._isLoading = normalizedValue;
    }

    @api get accessKey() {
        return this._accesskey;
    }

    set accessKey(newValue) {
        this._accesskey = newValue;
    }

    @api
    focus() {
        if (this._connected) {
            this.focusOnButton();
        }
    }

    @api
    click() {
        if (this._connected) {
            this.template.querySelector('button').click();
        }
    }

    get computedAriaExpanded() {
        return String(this._dropdownVisible);
    }

    focusOnMenuItemAfterRender() {
        let focusOnIndex = this._focusOnIndexDuringRenderedCallback || 0;

        const menuItems = this.getMenuItems();

        if (focusOnIndex === 'LAST') {
            focusOnIndex = menuItems.length - 1;

            if (focusOnIndex < 0) {
                focusOnIndex = 'LAST';
            }
        }

        if (focusOnIndex !== 'LAST') {
            if (focusOnIndex > menuItems.length - 1 && menuItems.length > 0) {
                focusOnIndex = menuItems.length - 1;
            }

            this.focusOnMenuItem(focusOnIndex);

            this._focusOnIndexDuringRenderedCallback = null;
        }

        this._rerenderFocus = false;
    }

    get computedAccessKey() {
        return this._accesskey;
    }

    get computedTitle() {
        return this._title;
    }

    get computedAlternativeText() {
        return this.alternativeText || i18n.showMenu;
    }

    get computedLoadingStateAlternativeText() {
        return this.loadingStateAlternativeText || i18n.loading;
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
                'slds-button_icon-small': this.iconSize === 'small' && !isBare
            });
        }

        return classes
            .add({
                'slds-button_first': this._order === 'first',
                'slds-button_middle': this._order === 'middle',
                'slds-button_last': this._order === 'last'
            })
            .toString();
    }

    get computedShowDownIcon() {
        return !(
            this.iconName === 'utility:down' ||
            this.iconName === 'utility:chevrondown'
        );
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
                'slds-p-vertical_large': this.isLoading
            })
            .toString();
    }

    handleMenuItemPrivateSelect(event) {
        if (event.detail.type === 'submenu') {
            event.target.parentElement
                .querySelectorAll('.avonni-submenu')
                .forEach((submenu) => {
                    submenu.close();
                });
            if (!this._dropdownVisible) {
                this.toggleMenuVisibility();
                event.target.focus();
            }
        } else {
            if (this._dropdownVisible) {
                this.toggleMenuVisibility();
                this.focusOnButton();
            }
        }

        event.stopPropagation();

        if (event.detail.type === 'dialog') {
            let dialog = this.querySelector(
                '[dialog-name=' + event.detail.value + ']'
            );
            if (dialog) {
                dialog.show();
                this.template.querySelector('button').blur();
            }
        }

        this.dispatchSelect(event);
    }

    dispatchSelect(event) {
        this.dispatchEvent(
            new CustomEvent('select', {
                cancelable: true,
                detail: {
                    value: event.detail.value
                }
            })
        );
    }

    handleButtonClick() {
        this.allowBlur();

        this.toggleMenuVisibility();

        this.focusOnButton();
    }

    handleButtonMouseDown(event) {
        const mainButton = 0;
        if (event.button === mainButton) {
            this.cancelBlur();
        }
    }

    handleDropdownMouseDown(event) {
        const mainButton = 0;
        if (event.button === mainButton) {
            this.cancelBlur();
        }
    }

    handleDropdownMouseUp() {
        this.allowBlur();
    }

    handleDropdownMouseLeave() {
        if (!this._menuHasFocus) {
            this.close();
        }
    }

    handleDropdownScroll(event) {
        event.stopPropagation();
    }

    focusOnButton() {
        this.template.querySelector('button').focus();
    }

    focusOnMenuItem(itemIndex) {
        if (this._dropdownVisible) {
            const menuItem = this.getMenuItemByIndex(itemIndex);
            this.cancelBlurAndFocusOnMenuItem(menuItem);
        }
    }

    isAutoAlignment() {
        return this.menuAlignment.startsWith('auto');
    }

    toggleMenuVisibility() {
        if (!this.disabled) {
            this._dropdownVisible = !this._dropdownVisible;
            this._rerenderFocus = !this._rerenderFocus;

            if (!this._dropdownVisible) {
                this.querySelectorAll('.avonni-submenu').forEach((submenu) => {
                    submenu.close();
                });
            }

            if (!this._dropdownOpened && this._dropdownVisible) {
                this._dropdownOpened = true;
            }
            if (this._dropdownVisible) {
                this.dispatchEvent(new CustomEvent('open'));

                this._boundingRect = this.getBoundingClientRect();

                this.pollBoundingRect();
            }

            this.classList.toggle('slds-is-open');
        }
    }

    getMenuItems() {
        return Array.from(this.querySelectorAll(menuItemCSSSelector));
    }

    getMenuItemByIndex(index) {
        return this.getMenuItems()[index];
    }

    findMenuItemIndex(menuItemElement) {
        return this.getMenuItems().indexOf(menuItemElement);
    }

    findMenuItemFromEventTarget(element) {
        let currentNode = element;
        const stopAtElement = this.template.querySelector("[role='menu']");

        while (currentNode !== stopAtElement) {
            if (
                currentNode.classList &&
                currentNode.classList.contains(menuItemCSSClassName)
            ) {
                return currentNode;
            }
            if (currentNode.parentNode) {
                currentNode = currentNode.parentNode;
            } else {
                return null;
            }
        }
        return null;
    }

    handleMouseOverOnMenuItem(event) {
        const menuItem = this.findMenuItemFromEventTarget(event.target);

        if (event.target.classList.value.indexOf('avonni-submenu') === -1) {
            event.target.parentElement
                .querySelectorAll('.avonni-submenu')
                .forEach((submenu) => {
                    submenu.close();
                });
        }

        if (menuItem) {
            const menuItemIndex = this.findMenuItemIndex(menuItem);
            this.focusOnMenuItem(menuItemIndex);
        }
    }

    cancelBlurAndFocusOnMenuItem(menuItem) {
        if (menuItem) {
            this.cancelBlur();
            menuItem.focus();
        }
    }

    handleFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
    }

    handlePrivateBlur(event) {
        event.stopPropagation();

        this.handleBlur();
        this._menuHasFocus = false;
    }

    handlePrivateFocus(event) {
        event.stopPropagation();

        this.allowBlur();
        this._menuHasFocus = true;
    }

    handleBlur() {
        if (this._cancelBlur) {
            return;
        }

        if (this._dropdownVisible) {
            this.toggleMenuVisibility();
        }

        this.dispatchEvent(new CustomEvent('blur'));
    }

    allowBlur() {
        this._cancelBlur = false;
    }

    cancelBlur() {
        this._cancelBlur = true;
    }

    setOrder(order) {
        this._order = order;
    }

    close() {
        if (this._dropdownVisible) {
            this.toggleMenuVisibility();
        }
    }

    pollBoundingRect() {
        if (this.isAutoAlignment() && this._dropdownVisible) {
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
}
