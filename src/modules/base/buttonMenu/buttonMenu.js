import { isCustomIconType, isStandardIconType } from 'c/iconUtils';
import { AutoPosition, Direction } from 'c/positionLibrary';
import { ButtonMenuBase } from 'c/buttonMenuUtils';
import { Tooltip } from 'c/tooltipLibrary';
import { classSet, normalizeBoolean, normalizeString } from 'c/utils';
import { buttonGroupOrderClass, keyValues } from 'c/utilsPrivate';
import { api } from 'lwc';

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

const DEFAULT_SEARCH_INPUT_PLACEHOLDER = 'Search…';

const i18n = {
    loading: 'Loading',
    showMenu: 'Show Menu'
};

const LOAD_MORE_OFFSET = 20;

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

const MENU_LENGTHS = {
    valid: ['5-items', '7-items', '10-items'],
    default: '7-items'
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

/**
 * @class
 * @descriptor avonni-button-menu
 * @storyId example-button-menu--base
 * @public
 */
export default class ButtonMenu extends ButtonMenuBase {
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
     * Message displayed while the button is in the loading state.
     *
     * @name loadingStateAlternativeText
     * @public
     * @type {string}
     * @default Loading...
     */
    /**
     * The Lightning Design System name of the icon positionned before the label.
     *
     * @type {string}
     * @public
     */
    @api prefixIconName;
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

    _allowSearch = false;
    _hideDownArrow = false;
    _iconName = DEFAULT_ICON_NAME;
    _iconSize = ICON_SIZES.default;
    _isDraft = false;
    _isLoading = false;
    _menuAlignment = MENU_ALIGNMENTS.default;
    _menuLength = MENU_LENGTHS.default;
    _nubbin = false;
    _tooltip;
    _searchInputPlaceholder = DEFAULT_SEARCH_INPUT_PLACEHOLDER;
    _triggers = MENU_TRIGGERS.default;
    _variant = BUTTON_VARIANTS.default;

    _autoPosition;
    _connected = false;
    _dropdownIsFocused = false;
    _dropdownVisible = false;
    _previousScroll = undefined;
    _searchTimeOut;
    _showFooter = false;

    searchTerm;

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
        this._connected = true;
    }

    renderedCallback() {
        super.renderedCallback();
        if (
            this.enableInfiniteLoading &&
            this.dropdownElement &&
            this.dropdownElement.scrollTop === 0
        ) {
            this.handleScroll();
        }

        const menuItem = this.getMenuItemByIndex(0);
        if (menuItem && menuItem.tabIndex !== '0') {
            menuItem.tabIndex = '0';
        }
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
     * If present, you can load a subset of items and then display more when users scroll to the end of the button menu. Use with the `loadmore` event to retrieve more items.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get enableInfiniteLoading() {
        return this._enableInfiniteLoading;
    }
    set enableInfiniteLoading(value) {
        this._enableInfiniteLoading = normalizeBoolean(value);
    }

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
        this._isLoading = normalizedValue;
        if (this._connected && !this._isLoading) {
            requestAnimationFrame(() => {
                if (this._dropdownVisible && !this._dropdownIsFocused) {
                    this.focusDropdown();
                }
            });
        }
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

    /**
     * Return the button element
     */
    get button() {
        return this.template.querySelector('[data-element-id="button"]');
    }

    /**
     * Computed focusability of the button
     */
    get buttonTabIndex() {
        if (this.isButtonLoading || this._dropdownVisible) {
            return -1;
        }
        return this.tabIndex;
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
            this.variant === 'bare' || this.variant === 'bare-inverse';
        const isBareContainer = isBare || this.variant === 'base';
        const isAddedVariant =
            this.variant === 'base' ||
            this.variant === 'brand' ||
            this.variant === 'brand-outline' ||
            this.variant === 'destructive' ||
            this.variant === 'destructive-text' ||
            this.variant === 'inverse' ||
            this.variant === 'neutral' ||
            this.variant === 'success';

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
                'avonni-button-menu__button-icon': isAddedVariant,
                'slds-button_icon':
                    !this.label &&
                    !this.iconSrc &&
                    !this.iconName &&
                    !isAddedVariant,
                'slds-button_icon-bare': isBare,
                'avonni-button-menu__button-icon-more':
                    !this.hideDownArrow &&
                    ((!this.isDownIcon &&
                        (this.iconName || this.iconSrc || this.label)) ||
                        (this.iconSrc && this.isDownIcon)),
                'slds-button_icon-border':
                    this.variant === 'border' && this.computedHideDownIcon,
                'slds-button_icon-border-filled':
                    this.variant === 'border-filled',
                'slds-button_icon-border-inverse':
                    this.variant === 'border-inverse',
                'slds-button_icon-container':
                    this.variant === 'container' && this.computedHideDownIcon,
                'slds-button_icon-inverse': this.variant === 'bare-inverse',
                [`slds-button_icon-${this.iconSize}`]: !isBareContainer
            });
            if (
                (!isBareContainer &&
                    (this.iconSrc ||
                        (this.iconName && !this.iconSrc && !this.label))) ||
                (!this.iconSrc &&
                    !this.iconName &&
                    !this.label &&
                    !this.hideDownArrow)
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
     * Computed down icon svg class.
     *
     * @type {string}
     */
    get computedDownIconSvgClass() {
        return classSet('slds-button__icon').add({
            'slds-m-left_xx-small': this.label
        });
    }

    /**
     * Computed dropdown class styling.
     *
     * @type {string}
     */
    get computedDropdownClass() {
        return classSet(
            'slds-dropdown avonni-button-menu__dropdown slds-dropdown_fluid'
        )
            .add({
                'avonni-button-menu__dropdown-form-element':
                    this.isAutoAlignment,
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
                // The condition on enable infinite loading prevent the menu from growing suddenly
                'slds-p-vertical_large':
                    this.isLoading && !this.enableInfiniteLoading
            })
            .toString();
    }

    /**
     * Computed Item List Class styling.
     *
     * @type {string}
     */
    get computedDropdownContentClass() {
        const length = this.menuLength;
        return classSet('slds-dropdown__list')
            .add({
                'slds-dropdown_length-with-icon-5': length === '5-items',
                'slds-dropdown_length-with-icon-7': length === '7-items',
                'slds-dropdown_length-with-icon-10': length === '10-items'
            })
            .toString();
    }

    /**
     * Computed Footer Container Class styling.
     *
     * @type {string}
     */
    get computedFooterContainerClass() {
        return classSet('slds-popover__footer')
            .add({
                'slds-hide': !this._showFooter
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
     * HTML element of the dropdown.
     *
     * @type {HTMLElement}
     */
    get dropdownElement() {
        return this.template.querySelector(
            '[data-element-id="div-dropdown-content"]'
        );
    }

    get dropdownOpened() {
        return this._dropdownVisible;
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
     * Display icon only if iconName is set and src is not set.
     *
     * @type {boolean}
     */
    get showIcon() {
        return this.iconName && !this.iconSrc;
    }

    /**
     * Display the loading spinner that hides the items.
     *
     * @type {boolean}
     */
    get showOnlyLoading() {
        return !this.enableInfiniteLoading && this.isLoading;
    }

    /**
     * Display the infinite loading spinner that is visible below the items.
     *
     * @type {boolean}
     */
    get showInfiniteLoading() {
        return this.enableInfiniteLoading && this.isLoading;
    }

    /**
     * Compute the spinner size depending on the button size
     */
    get spinnerSize() {
        const mediaPresent = this.iconName || this.iconSrc;
        if (mediaPresent && !this.label) {
            return ['xx-small', 'x-small', 'small'].includes(this.iconSize)
                ? 'xx-small'
                : 'x-small';
        }
        return mediaPresent && this.iconSize === 'large' ? 'small' : 'x-small';
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
     * Close the menu.
     *
     * @api
     */
    @api
    close() {
        if (this._dropdownVisible) {
            this.toggleMenuVisibility();
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

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Tooltip initialization.
     */
    initTooltip() {
        if (this._tooltip && !this._tooltip.initialized) {
            this._tooltip.initialize();
        }
    }

    focusDropdown() {
        requestAnimationFrame(() => {
            const focusTrap = this.template.querySelector(
                '[data-element-id="avonni-focus-trap"]'
            );
            if (focusTrap && this.allowSearch) {
                this._dropdownIsFocused = true;
                focusTrap.focus();
            } else {
                this.focusOnMenuItem(0);
            }
        });
    }

    startAutoPositionning() {
        if (!this.isAutoAlignment || !this._dropdownVisible) {
            return;
        }
        if (!this._autoPosition) {
            this._autoPosition = new AutoPosition(this);
        }

        const dropdown = this.template.querySelector(
            '[data-element-id="dropdown"]'
        );
        this._autoPosition.start({
            target: () => this.button,
            element: () => dropdown,
            align: {
                horizontal: Direction.Left,
                vertical: Direction.Top
            },
            targetAlign: {
                horizontal: Direction.Left,
                vertical: Direction.Bottom
            },
            autoFlip: true,
            alignWidth: true,
            autoShrinkHeight: true
        });
    }

    stopAutoPositioning() {
        if (this._autoPosition) {
            this._autoPosition.stop();
        }
    }

    /**
     * Menu visibility toggle handler.
     */
    toggleMenuVisibility() {
        if (!this.computedDisabled) {
            this._dropdownVisible = !this._dropdownVisible;

            if (!this._dropdownVisible) {
                this.querySelectorAll('.avonni-submenu').forEach((submenu) => {
                    submenu.close();
                });
            }

            if (this._dropdownVisible) {
                this.dispatchOpen();
                requestAnimationFrame(() => {
                    this.startAutoPositionning();
                });
                this.focusDropdown();
            } else {
                this.stopAutoPositioning();
                this.dispatchClose();
                this._previousScroll = undefined;
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
            event.relatedTarget && this.isValidMenuItem(event.relatedTarget);
        if (this.isTriggerFocus && !isMenuItemFocused) {
            this.toggleMenuVisibility();
        }
        if (!isMenuItemFocused) {
            this.dispatchEvent(new CustomEvent('blur'));
        }
    }

    /**
     * Button click handler.
     */
    handleButtonClick() {
        if (!this.computedDisabled && this.isTriggerClick) {
            this.toggleMenuVisibility();
            this.focusDropdown();
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

        if (
            this.isTriggerFocus &&
            !this._dropdownVisible &&
            !this.computedDisabled
        ) {
            this.toggleMenuVisibility();
            requestAnimationFrame(() => {
                this.focusDropdown();
            });
        }
    }

    /**
     * Handle a key down pressed on the button. Toggle the opening of the menu if the key is right.
     *
     * @param {Event} event `keydown` event.
     */
    handleButtonKeyDown(event) {
        const validTriggerKeys = ['Enter', ' ', 'Spacebar'];
        if (
            validTriggerKeys.includes(event.key) &&
            (this.isTriggerClick || this.isTriggerHover)
        ) {
            event.preventDefault();
            this.toggleMenuVisibility();
            this.focusDropdown();
        }
    }

    handleDropdownFocus() {
        this.focusDropdown();
    }

    handleDropdownFocusIn() {
        this._dropdownIsFocused = true;
    }

    handleDropdownFocusOut(event) {
        this._dropdownIsFocused = false;

        // Ignore focus out when the new focused element is the toggler.
        const isButtonReceivingFocus = this.button === event.relatedTarget;
        if (!isButtonReceivingFocus && !this.isTriggerHover) {
            requestAnimationFrame(() => {
                if (!this._dropdownIsFocused && this._dropdownVisible) {
                    this.toggleMenuVisibility();
                }
            });
        }
    }

    /**
     * Dropdown keydown handler.
     *
     * @param {Event} event
     */
    handleDropdownKeyDown(event) {
        switch (event.key) {
            case keyValues.escape: {
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
     * Handle the slot change of the footer.
     *
     */
    handleFooterSlotChange() {
        if (this.footerSlot) {
            this._showFooter = this.footerSlot.assignedElements().length !== 0;
        } else {
            this._showFooter = false;
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
     * Handle an input in the search box.
     *
     * @param {Event} event change event.
     */
    handleSearch(event) {
        event.stopPropagation();
        this.searchTerm = event.detail.value;

        clearTimeout(this._searchTimeOut);
        this._searchTimeOut = setTimeout(() => {
            this.dispatchSearch();
        }, 500);
    }

    /**
     * Handle a scroll movement in the dropdown menu.
     */
    handleScroll() {
        if (!this.enableInfiniteLoading || this.isLoading) {
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
     * Menu item keydown handler.
     *
     * @param {Event} event
     */
    handleMenuItemKeyDown(event) {
        switch (event.key) {
            case keyValues.down:
            case keyValues.up: {
                this.focusNextOrPreviousMenuItem(event);
                break;
            }
            case keyValues.escape: {
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
        if (this._dropdownVisible) {
            this.toggleMenuVisibility();
            this.button.focus();
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
        if (
            this.computedDisabled ||
            !this.isTriggerHover ||
            this._dropdownVisible
        ) {
            return;
        }
        this.toggleMenuVisibility();
    };

    handleMouseLeave = () => {
        if (
            this.computedDisabled ||
            !this.isTriggerHover ||
            !this._dropdownVisible
        ) {
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
     * Menu search dispatch method.
     */
    dispatchSearch() {
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
                }
            })
        );
    }

    /**
     * Menu load more dispatch method.
     */
    dispatchLoadMore() {
        /**
         * The event fired when you scroll to the end of the dropdown menu. This event is fired only if `enable-infinite-loading` is true.
         *
         * @event
         * @name loadmore
         * @public
         */
        this.dispatchEvent(new CustomEvent('loadmore'));
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
