import { api } from 'lwc';
import { classSet } from 'c/utils';
import {
    normalizeBoolean,
    normalizeString,
    observePosition,
    keyCodes,
    buttonGroupOrderClass
} from 'c/utilsPrivate';
import { Tooltip } from 'c/tooltipLibrary';
import PrimitiveButton from 'c/primitiveButton';
import { isCustomIconType, isStandardIconType } from 'c/iconUtils';

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
        'success'
    ],
    default: 'border'
};

const i18n = {
    loading: 'Loading',
    showMenu: 'Show Menu'
};

const MENU_ALIGNMENTS = {
    valid: [
        'left',
        'center',
        'right',
        'bottom-left',
        'bottom-center',
        'bottom-right'
    ],
    default: 'left'
};

const MENU_TRIGGERS = {
    valid: ['click', 'hover', 'focus'],
    default: 'click'
};

const ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'small'
};

const DEFAULT_ICON_NAME = 'utility:down';
const MENU_ITEM_TAG = 'lightning-menu-item';

/**
 * @class
 * @descriptor avonni-button-menu
 * @storyId example-button-menu--base
 * @public
 */
export default class ButtonMenu extends PrimitiveButton {
    static delegatesFocus = true;
    /**
     * The keyboard shortcut for the button menu.
     *
     * @name accessKey
     * @public
     * @type {string}
     */
    /**
     * The assistive text for the button menu.
     *
     * @public
     * @type {string}
     * @default Show Menu
     */
    @api alternativeText = i18n.showMenu;
    /**
     * If present, the menu can't be opened by users.
     *
     * @name disabled
     * @public
     * @type {boolean}
     * @default false
     */
    /**
     * Describes the reason for showing the draft indicator. This is required when is-draft is true.
     *
     * @public
     * @type {string}
     */
    @api draftAlternativeText;
    /**
     * Reserved for internal use only.
     * Describes the order of this element (first, middle or last) inside a lightning-button-group.
     *
     * @type {string}
     * @public
     */
    @api groupOrder;
    /**
     * URL to set for the image attribute.
     *
     * @name iconSrc
     * @public
     * @type {string}
     */
    /**
     * Optional text to be shown on the button.
     *
     * @name label
     * @public
     * @type {string}
     */
    /**
     * Message displayed while the menu is in the loading state.
     *
     * @public
     * @type {string}
     * @default Loading
     */
    @api loadingStateAlternativeText = i18n.loading;
    /**
     * Displays title text when the mouse moves over the button menu.
     *
     * @name title
     * @public
     * @type {string}
     */
    /**
     * The value for the button element. This value is optional and can be used when submitting a form.
     *
     * @name value
     * @public
     * @type {string}
     */
    /**
     * The variant changes the look of the button. Accepted variants include bare, bare-inverse, base, border, border-filled,
     * border-inverse, brand, brand-outline, container, destructive, destructive-text, neutral, inverse and success.
     *
     * @name variant
     * @public
     * @type {string}
     * @default neutral
     */

    _hideDownArrow = false;
    _iconName = DEFAULT_ICON_NAME;
    _iconSize = ICON_SIZES.default;
    _isDraft = false;
    _isLoading = false;
    _menuAlignment = MENU_ALIGNMENTS.default;
    _nubbin = false;
    _tooltip;
    _triggers = MENU_TRIGGERS.default;
    _variant = BUTTON_VARIANTS.default;

    _boundingRect = {};
    _dropdownIsFocused = false;
    _dropdownVisible = false;
    _dropdownIgnoreNextFocusOut = false;
    _needsFocusAfterRender = false;

    dropdownOpened = false;

    /*
     * ------------------------------------------------------------
     *  LIFECYCLE HOOKS
     * -------------------------------------------------------------
     */

    connectedCallback() {
        super.connectedCallback();

        this.classList.add(
            'slds-dropdown-trigger',
            'slds-dropdown-trigger_click'
        );

        this.addEventListener('mouseenter', this.handleMouseEnter);
        this.addEventListener('mouseleave', this.handleMouseLeave);
    }

    renderedCallback() {
        super.renderedCallback();
        this.initTooltip();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('mouseenter', this.handleMouseEnter);
        this.removeEventListener('mouseleave', this.handleMouseLeave);
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, the small down arrow normaly displayed to the right of a custom icon is hidden. Without a custom icon-name this does nothing.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get hideDownArrow() {
        return this._hideDownArrow;
    }
    set hideDownArrow(value) {
        this._hideDownArrow = normalizeBoolean(value);
    }

    /**
     * The name of the icon to be used in the format 'utility:down'. If an icon other than 'utility:down' or 'utility:chevrondown' is used, a utility:down icon is appended to the right of that icon.
     *
     * @public
     * @type {string}
     * @default utility:down
     */
    @api
    get iconName() {
        return this._iconName;
    }
    set iconName(value) {
        this._iconName = normalizeString(value);
    }

    /**
     * The size of the icon. Options include xx-small, x-small, small, medium or large.
     *
     * @public
     * @type {string}
     * @default medium
     */
    @api
    get iconSize() {
        return this._iconSize;
    }
    set iconSize(size) {
        this._iconSize = normalizeString(size, {
            fallbackValue: ICON_SIZES.default,
            validValues: ICON_SIZES.valid
        });
    }

    /**
     * If present, the menu trigger shows a draft indicator.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get isDraft() {
        return this._isDraft;
    }
    set isDraft(value) {
        this._isDraft = normalizeBoolean(value);
        if (this._isDraft && this._connected) {
            this.classList.add('slds-is-unsaved');
        }
    }

    /**
     * If true, the menu is in a loading state and shows a spinner.
     *
     * @public
     * @type {boolean}
     * @default false
     */
    @api
    get isLoading() {
        return this._isLoading;
    }
    set isLoading(value) {
        const normalizedValue = normalizeBoolean(value);
        if (this.isAutoAlignment) {
            this.stopPositioning();
        }
        this._isLoading = normalizedValue;
    }

    /**
     * Determines the alignment of the menu relative to the button. Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right. The auto option aligns the dropdown menu based on available space.
     *
     * @public
     * @type {string}
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
     * Text to display when the user mouses over or focuses on the button. The tooltip is auto-positioned relative to the button and screen space.
     *
     * @public
     * @type {string}
     */
    @api
    get tooltip() {
        return this._tooltip ? this._tooltip.value : undefined;
    }
    set tooltip(value) {
        if (this._tooltip) {
            this._tooltip.value = value;
        } else if (value) {
            this._tooltip = new Tooltip(value, {
                root: this,
                target: () => this.button
            });
            this._tooltip.initialize();
        }
    }

    /**
     * Specify which trigger will show the menu. Supported values are 'click', 'hover' and 'focus'.
     *
     * @type {string}
     * @default click
     * @public
     */
    @api
    get triggers() {
        return this._triggers;
    }
    set triggers(value) {
        this._triggers = normalizeString(value, {
            fallbackValue: MENU_TRIGGERS.default,
            validValues: MENU_TRIGGERS.valid
        });
    }

    /**
     * The variant changes the look of the button. Accepted variants include bare, bare-inverse, base, border, border-filled,
     * border-inverse, brand, brand-outline, container, destructive, destructive-text, inverse, neutral and success.
     *
     * @public
     * @type {string}
     * @default border
     */
    @api
    get variant() {
        return this._variant;
    }
    set variant(value) {
        this._variant = normalizeString(value, {
            fallbackValue: BUTTON_VARIANTS.default,
            validValues: BUTTON_VARIANTS.valid
        });
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    get button() {
        return this.template.querySelector('[data-element-id="button"]');
    }

    /**
     * Return a true string if the popover is visible and a false string if not.
     *
     * @type {string}
     */
    get computedAriaExpanded() {
        return String(this._dropdownVisible);
    }

    /**
     * Computed button class styling.
     *
     * @type {string}
     */
    get computedButtonClass() {
        const isBare =
            this.variant === 'bare' ||
            this.variant === 'bare-inverse' ||
            this.variant === 'base';
        const isAddedVariant =
            this.variant === 'base' ||
            this.variant === 'brand' ||
            this.variant === 'brand-outline' ||
            this.variant === 'destructive' ||
            this.variant === 'destructive-text' ||
            this.variant === 'inverse' ||
            this.variant === 'neutral' ||
            this.variant === 'success';
        const useMoreContainer =
            this.variant === 'container' ||
            this.variant === 'bare-inverse' ||
            this.variant === 'border-inverse';

        const classes = classSet('slds-button avonni-button-menu');

        classes.add(`avonni-button-menu_${this.variant}`);
        classes.add(buttonGroupOrderClass(this.groupOrder));
        classes.add({
            'slds-button_brand': this.variant === 'brand',
            'slds-button_outline-brand': this.variant === 'brand-outline',
            'slds-button_destructive': this.variant === 'destructive',
            'slds-button_text-destructive': this.variant === 'destructive-text',
            'slds-button_inverse': this.variant === 'inverse',
            'slds-button_neutral': this.variant === 'neutral',
            'slds-button_success': this.variant === 'success'
        });

        if (this.stretch) {
            classes.add('slds-button_stretch');
        }
        if (this.label) {
            classes.add({
                'avonni-button-menu__button_label': this.label,
                'avonni-button-menu__button_medium': this.iconSize === 'medium',
                'avonni-button-menu__button_large': this.iconSize === 'large'
            });
        } else {
            classes.add({
                'slds-button_icon':
                    !this.computedHideDownIcon && !isAddedVariant,
                'slds-button_icon-bare': isBare,
                'avonni-button-menu__button-icon-more':
                    !useMoreContainer && !this.computedHideDownIcon,
                'avonni-button-menu__button-icon-container-more':
                    useMoreContainer && !this.computedHideDownIcon,
                'slds-button_icon-border':
                    this.variant === 'border' && this.computedHideDownIcon,
                'slds-button_icon-border-filled':
                    this.variant === 'border-filled',
                'slds-button_icon-border-inverse':
                    this.variant === 'border-inverse',
                'slds-button_icon-container':
                    this.variant === 'container' && this.computedHideDownIcon,
                'slds-button_icon-inverse': this.variant === 'bare-inverse',
                'avonni-button-menu__button-icon': isAddedVariant,
                [`slds-button_icon-${this.iconSize}`]: !isBare
            });
            if (
                !isBare &&
                (this.iconSrc ||
                    (this.iconName && !this.iconSrc && !this.label))
            ) {
                classes.add(`avonni-button-menu__icon_${this.iconSize}`).add({
                    'avonni-button-menu__button-icon':
                        this.iconSrc || this.iconName
                });
            }
        }
        return classes;
    }

    /**
     * Computed dropdown class styling.
     *
     * @type {string}
     */
    get computedDropdownClass() {
        return classSet('slds-dropdown avonni-button-menu__dropdown')
            .add({
                'slds-dropdown_left':
                    this.menuAlignment === 'left' || this.isAutoAlignment,
                'slds-dropdown_center': this.menuAlignment === 'center',
                'slds-dropdown_right': this.menuAlignment === 'right',
                'slds-dropdown_bottom': this.menuAlignment.includes('bottom'),
                'slds-dropdown_right slds-dropdown_bottom-right':
                    this.menuAlignment === 'bottom-right',
                'slds-dropdown_left slds-dropdown_bottom-left':
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

    /**
     * Show downwards icon on button.
     *
     * @type {boolean}
     */
    get computedHideDownIcon() {
        return this.hideDownArrow || (this.isDownIcon && !this.iconSrc);
    }

    /**
     * Computed size for the icon.
     *
     * @type {string}
     */
    get computedIconSize() {
        if (this.isDownIcon && this.iconSize === 'large') return 'x-small';
        if (this.iconSize === 'medium') return 'x-small';
        if (this.iconSize === 'large') return 'small';
        return '';
    }

    /**
     * Computed icon svg class.
     *
     * @type {string}
     */
    get computedIconSvgClass() {
        return classSet('slds-button__icon').add({
            'slds-button__icon_right': this.label
        });
    }

    /**
     * Computed image class styling.
     *
     * @type {string}
     */
    get computedImageClass() {
        return classSet('avonni-button-menu__image')
            .add(`avonni-button-menu__image_${this.iconSize}`)
            .add({ 'slds-m-right_xx-small': this.label })
            .toString();
    }

    /**
     * Computed loading state default or loading state alternative text.
     *
     * @type {string}
     */
    get computedLoadingStateAlternativeText() {
        return this.loadingStateAlternativeText || i18n.loading;
    }

    /**
     * Computed main icon class styling.
     *
     * @type {string}
     */
    get computedMainIconClass() {
        // Scale adjustment is needed for standard or custom icons.
        const isCustomOrStandardIcon =
            isCustomIconType(this.iconName) ||
            isStandardIconType(this.iconName);
        return classSet('slds-grid').add({
            [`avonni-button-menu__main-icon-with-label_${this.iconSize}`]:
                this.label && !this.isDownIcon && !isCustomOrStandardIcon,
            [`avonni-button-menu__main-icon-with-label-adjust-scale_${this.iconSize}`]:
                this.label && !this.isDownIcon && isCustomOrStandardIcon,
            'avonni-button-menu__main-icon-adjust-scale':
                !this.label && !this.isDownIcon && isCustomOrStandardIcon
        });
    }

    /**
     * Returns true if menu alignment is auto.
     *
     * @type {boolean}
     */
    get isAutoAlignment() {
        return this.menuAlignment.startsWith('auto');
    }

    /**
     * Returns true if icon is a down icon.
     *
     * @type {boolean}
     */
    get isDownIcon() {
        return ['utility:down', 'utility:chevrondown'].includes(this.iconName);
    }

    get isTriggerClick() {
        return this.triggers === 'click';
    }

    get isTriggerFocus() {
        return this.triggers === 'focus';
    }

    get isTriggerHover() {
        return this.triggers === 'hover';
    }

    /**
     * Display icon only if iconName is set and src is not set.
     *
     * @type {boolean}
     */
    get showIcon() {
        return this.iconName && !this.iconSrc;
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC METHODS
     * -------------------------------------------------------------
     */

    /**
     * Simulate a mouse click on the button.
     *
     * @public
     */
    @api
    click() {
        if (this.button) {
            this.button.click();
        }
    }

    /**
     * Set focus on the button.
     *
     * @public
     */
    @api
    focus() {
        if (this.button) {
            this.button.focus();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Close menu.
     */
    close() {
        if (this._dropdownVisible) {
            this.toggleMenuVisibility();
        }
    }

    /**
     * Find menu item's index.
     *
     * @param {object} menuItemElement
     * @returns {number} index of menu item
     */
    findMenuItemIndex(menuItemElement) {
        return this.getMenuItems().indexOf(menuItemElement);
    }

    /**
     * Find menu item from event target.
     *
     * @param {Element} element
     * @returns {Element} menu item
     */
    findMenuItemFromEventTarget(element) {
        let currentNode = element;
        const stopAtElement = this.template.querySelector("[role='menu']");

        while (currentNode !== stopAtElement) {
            if (currentNode.tagName === MENU_ITEM_TAG.toUpperCase()) {
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

    /**
     * Set focus on menu item via Item Index.
     *
     * @param {object} itemIndex
     */
    focusOnMenuItem(itemIndex) {
        if (this._dropdownVisible) {
            const menuItem = this.getMenuItemByIndex(itemIndex);
            if (menuItem) {
                menuItem.focus();
            }
        }
    }

    /**
     * Get item with index in menu item array.
     *
     * @param {object[]} index
     * @return menu item from array
     */
    getMenuItemByIndex(index) {
        return this.getMenuItems()[index];
    }

    /**
     * Get item array from menu.
     *
     * @return {object[]}
     */
    getMenuItems() {
        return Array.from(this.querySelectorAll(MENU_ITEM_TAG));
    }

    /**
     * Tooltip initialization.
     */
    initTooltip() {
        if (this._tooltip && !this._tooltip.initialized) {
            this._tooltip.initialize();
        }
    }

    /**
     * Poll bounding rect position for button menu.
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
     * To prevent default action and stop propagation of event
     *
     * @param {Event} event
     */
    preventDefaultAndStopPropagation(event) {
        event.preventDefault();
        event.stopPropagation();
    }

    /**
     * Menu visibility toggle handler.
     */
    toggleMenuVisibility() {
        if (!this.disabled) {
            this._dropdownVisible = !this._dropdownVisible;

            if (!this._dropdownVisible) {
                this.querySelectorAll('.avonni-submenu').forEach((submenu) => {
                    submenu.close();
                });
            }

            if (!this.dropdownOpened && this._dropdownVisible) {
                this.dropdownOpened = true;
            }

            if (this._dropdownVisible) {
                this._boundingRect = this.getBoundingClientRect();
                this.pollBoundingRect();
                this.dispatchOpen();
            } else {
                this.dispatchClose();
            }

            this.classList.toggle('slds-is-open');
        }
    }

    /*
     * ------------------------------------------------------------
     *  EVENT HANDLERS
     * -------------------------------------------------------------
     */

    /**
     * Blur handler.
     */
    handleButtonBlur(event) {
        const isMenuItemFocused =
            event.relatedTarget &&
            event.relatedTarget.tagName === MENU_ITEM_TAG.toUpperCase();
        if (this.isTriggerFocus && !isMenuItemFocused) {
            this.toggleMenuVisibility();
        }
        this.dispatchEvent(new CustomEvent('blur'));
    }

    /**
     * Button click handler.
     */
    handleButtonClick() {
        if (!this.disabled && this.isTriggerClick) {
            this.toggleMenuVisibility();
            requestAnimationFrame(() => {
                this.focusOnMenuItem(0);
            });
        }
    }

    /**
     * Focus handler.
     */
    handleButtonFocus() {
        /**
         * @event
         * @name focus
         */
        this.dispatchEvent(new CustomEvent('focus'));

        if (this.isTriggerFocus && !this._dropdownVisible && !this.disabled) {
            this.toggleMenuVisibility();
            requestAnimationFrame(() => {
                this.focusOnMenuItem(0);
            });
        }
    }

    /**
     * Handle a key down pressed on the button. Toggle the opening of the menu if the key is right.
     *
     * @param {Event} event `keydown` event.
     */
    handleButtonKeyDown(event) {
        event.preventDefault();
        const key = event.key;
        const isValidKey = key === 'Enter' || key === ' ' || key === 'Spacebar';
        if (isValidKey && this.button) {
            this.button.click();
        }
    }

    handleDropdownFocus() {
        this.focusOnMenuItem(0);
    }

    handleDropdownFocusIn() {
        this._dropdownIsFocused = true;
    }

    handleDropdownFocusOut(event) {
        this._dropdownIsFocused = false;

        // Ignore focus out when the new focused element is the toggler.
        const isButtonReceivingFocus = this.button === event.relatedTarget;
        if (isButtonReceivingFocus && this.isTriggerFocus) {
            requestAnimationFrame(() => {
                this.button.blur();
            });
        } else if (!isButtonReceivingFocus && !this.isTriggerHover) {
            requestAnimationFrame(() => {
                if (!this._dropdownIsFocused) {
                    this.toggleMenuVisibility();
                }
            });
        }
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
     * Menu item keydown handler.
     *
     * @param {Event} event
     */
    handleMenuItemKeyDown(event) {
        const menuItem = this.findMenuItemFromEventTarget(event.target);
        if (!menuItem) return;

        const menuItemIndex = this.findMenuItemIndex(menuItem);
        switch (event.keyCode) {
            case keyCodes.down:
            case keyCodes.up: {
                this.preventDefaultAndStopPropagation(event);
                let nextIndex =
                    event.keyCode === keyCodes.up
                        ? menuItemIndex - 1
                        : menuItemIndex + 1;

                if (nextIndex >= this.getMenuItems().length) {
                    nextIndex = 0;
                } else if (nextIndex < 0) {
                    nextIndex = this.getMenuItems().length - 1;
                }
                this.focusOnMenuItem(nextIndex);
                break;
            }
            case keyCodes.escape: {
                if (this._dropdownVisible && !this.isTriggerFocus) {
                    this.preventDefaultAndStopPropagation(event);
                    this.toggleMenuVisibility();
                    this.button.focus();
                }
                break;
            }
            default:
        }
    }

    /**
     * Menu item mouse over handler.
     *
     * @param {Event} event
     */
    handleMenuItemMouseOver(event) {
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

    /**
     * Menu item selector handler.
     *
     * @param {Event} event
     */
    handleMenuItemSelect(event) {
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
                this.button.focus();
            }
        }

        event.stopPropagation();

        if (event.detail.type === 'dialog') {
            let dialog = this.querySelector(
                '[dialog-name=' + event.detail.value + ']'
            );
            if (dialog) {
                dialog.show();
                this.button.blur();
            }
        }

        this.dispatchSelect(event);
    }

    handleMouseEnter = () => {
        if (this.disabled || !this.isTriggerHover || this._dropdownVisible) {
            return;
        }
        this.toggleMenuVisibility();
    };

    handleMouseLeave = () => {
        if (this.disabled || !this.isTriggerHover || !this._dropdownVisible) {
            return;
        }
        this.toggleMenuVisibility();
    };

    /*
     * -------------------------------------------------------------
     *  EVENT DISPATCHERS
     * -------------------------------------------------------------
     */

    /**
     * Menu close dispatch method.
     */
    dispatchClose() {
        /**
         * The event fired when the dropdown menu is closed.
         *
         * @event
         * @name close
         * @public
         */
        this.dispatchEvent(new CustomEvent('close'));
    }

    /**
     * Menu open dispatch method.
     */
    dispatchOpen() {
        /**
         * The event fired when the dropdown menu is opened.
         *
         * @event
         * @name open
         * @public
         */
        this.dispatchEvent(new CustomEvent('open'));
    }

    /**
     * Menu item select dispatch method.
     *
     * @param {Event} event
     */
    dispatchSelect(event) {
        /**
         * The event fired when a menu item is selected.
         *
         * @event
         * @name select
         * @param {string} value Value of the selected option.
         * @public
         * @cancelable
         */
        this.dispatchEvent(
            new CustomEvent('select', {
                cancelable: true,
                detail: {
                    value: event.detail.value
                }
            })
        );
    }
}
