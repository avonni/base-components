import { AutoPosition, Direction } from 'c/positionLibrary';
import { classSet, normalizeBoolean, normalizeString } from 'c/utils';
import { LightningElement, api } from 'lwc';

const BUTTON_SIZES = {
    validBare: ['x-small', 'small', 'medium', 'large'],
    validNonBare: ['xx-small', 'x-small', 'small', 'medium'],
    default: 'medium'
};
const BUTTON_TRIGGERS = {
    valid: ['click', 'hover', 'focus'],
    default: 'click'
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
        'success'
    ],
    default: 'border'
};
const DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT = 'Loading...';
const POPOVER_PLACEMENTS = {
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
const POPOVER_SIZES = {
    valid: ['small', 'medium', 'large'],
    default: 'medium'
};
const POPOVER_VARIANTS = {
    valid: ['base', 'warning', 'error', 'walkthrough'],
    default: 'base'
};

/**
 * The button popover display an avonni button icon. On trigger, opens the popover.
 *
 * @class
 * @name ButtonIconPopover
 * @public
 * @storyId example-button-icon-popover--base-with-popover-base
 * @descriptor avonni-button-icon-popover
 */
export default class ButtonIconPopover extends LightningElement {
    /**
     * The keyboard shortcut for the button.
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
     * The class to be applied to the contained icon element.
     *
     * @type {string}
     * @public
     */
    @api iconClass;

    /**
     * The Lightning Design System name of the icon. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
     * Only utility icons can be used in this component.
     *
     * @type {string}
     * @public
     */
    @api iconName;

    /**
     * URL to set for the image attribute.
     *
     * @public
     * @type {string}
     */
    @api iconSrc;

    /**
     * The tile can include text, and is displayed in the header.
     * To include additional markup or another component, use the title slot.
     *
     * @type {string}
     * @public
     */
    @api title;

    /**
     * Text to display when the user mouses over or focuses on the button.
     * The tooltip is auto-positioned relative to the button and screen space.
     *
     * @type {string}
     * @public
     */
    @api tooltip;

    _disabled = false;
    _hideCloseButton = false;
    _isButtonLoading = false;
    _isLoading = false;
    _loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    _placement = POPOVER_PLACEMENTS.default;
    _popoverSize = POPOVER_SIZES.default;
    _popoverVariant = POPOVER_VARIANTS.default;
    _size = BUTTON_SIZES.default;
    _triggers = BUTTON_TRIGGERS.default;
    _variant = BUTTON_VARIANTS.default;

    showTitle = true;
    showFooter = true;
    _autoPosition;
    _popoverVisible = false;

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
        if (this._popoverVisible) {
            this.classList.add('slds-is-open');
        } else {
            this.classList.remove('slds-is-open');
        }

        if (this.titleSlot) {
            this.showTitle = this.titleSlot.assignedElements().length !== 0;
        }
        if (this.footerSlot) {
            this.showFooter = this.footerSlot.assignedElements().length !== 0;
        }

        if (this.isTriggerClick) {
            this.focusOnPopover();
        }
    }

    /**
     * Footer slot.
     *
     * @type {element}
     */
    get footerSlot() {
        return this.template.querySelector('slot[name=footer]');
    }

    /**
     * Title slot.
     *
     * @type {element}
     */
    get titleSlot() {
        return this.template.querySelector('slot[name=title]');
    }

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * If present, the popover can't be opened by users.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get disabled() {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    /**
     * If present, the close button inside of the popover is hidden.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get hideCloseButton() {
        return this._hideCloseButton;
    }
    set hideCloseButton(value) {
        this._hideCloseButton = normalizeBoolean(value);
    }

    /**
     * If present, shows a loading spinner over the button.
     *
     * @type {boolean}
     * @default false
     * @public
     */
    @api
    get isButtonLoading() {
        return this._isButtonLoading;
    }
    set isButtonLoading(value) {
        this._isButtonLoading = normalizeBoolean(value);
    }

    /**
     * If present, the popover is in a loading state and shows a spinner.
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
     * Message displayed while the popover or the button is in the loading state.
     *
     * @type {string}
     * @default Loading...
     * @public
     */
    @api
    get loadingStateAlternativeText() {
        return this._loadingStateAlternativeText;
    }
    set loadingStateAlternativeText(value) {
        this._loadingStateAlternativeText =
            typeof value === 'string'
                ? value.trim()
                : DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    }

    /**
     * Determines the alignment of the popover relative to the button.
     * Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right.
     * The auto option aligns the popover based on available space.
     *
     * @type {string}
     * @default left
     * @public
     */
    @api
    get placement() {
        return this._placement;
    }
    set placement(placement) {
        this._placement = normalizeString(placement, {
            fallbackValue: POPOVER_PLACEMENTS.default,
            validValues: POPOVER_PLACEMENTS.valid
        });
    }

    /**
     * Width of the popover. Accepted values include small, medium and large.
     *
     * @type {string}
     * @default medium
     * @public
     */
    @api
    get popoverSize() {
        return this._popoverSize;
    }
    set popoverSize(popoverSize) {
        this._popoverSize = normalizeString(popoverSize, {
            fallbackValue: POPOVER_SIZES.default,
            validValues: POPOVER_SIZES.valid
        });
    }

    /**
     * The variant changes the appearance of the popover.
     * Accepted variants include base, warning, error, walkthrough.
     *
     * @type {string}
     * @default base
     * @public
     */
    @api
    get popoverVariant() {
        return this._popoverVariant;
    }
    set popoverVariant(popoverVariant) {
        this._popoverVariant = normalizeString(popoverVariant, {
            fallbackValue: POPOVER_VARIANTS.default,
            validValues: POPOVER_VARIANTS.valid
        });
    }

    /**
     * The size of the button icon. For the bare variant,
     * options include x-small, small, medium, and large.
     * For non-bare variants, options include xx-small, x-small, small, and medium.
     *
     * @type {string}
     * @default medium
     * @public
     */
    @api
    get size() {
        return this._size;
    }
    set size(size) {
        if (
            this._variant === 'bare' ||
            this._variant === 'bare-inverse' ||
            this._variant === 'base'
        ) {
            this._size = normalizeString(size, {
                fallbackValue: BUTTON_SIZES.default,
                validValues: BUTTON_SIZES.validBare
            });
        } else {
            this._size = normalizeString(size, {
                fallbackValue: BUTTON_SIZES.default,
                validValues: BUTTON_SIZES.validNonBare
            });
        }
    }

    /**
     * Specify which triggers will show the popover. Supported values are 'click', 'hover', 'focus'.
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
            fallbackValue: BUTTON_TRIGGERS.default,
            validValues: BUTTON_TRIGGERS.valid
        });
    }

    /**
     * The variant changes the look of the button. Accepted variants include bare, bare-inverse, base, border, border-filled,
     * border-inverse, brand, brand-outline, container, destructive, destructive-text, inverse, neutral and success.
     *
     * @type {string}
     * @default border
     * @public
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

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * Avonni Button Element.
     *
     * @type {element}
     */
    get button() {
        return this.template.querySelector('[data-element-id="button-icon"]');
    }

    /**
     * Return a true string if the popover is visible and a false string if not.
     *
     * @type {string}
     */
    get computedAriaExpanded() {
        return String(this._popoverVisible);
    }

    /**
     * Computed Popover Header Class styling.
     *
     * @type {string}
     */
    get computedPopoverHeaderClass() {
        return classSet('slds-popover__header')
            .add({
                'avonni-button-icon-popover_space-between':
                    !this.hideCloseButton
            })
            .toString();
    }

    /**
     * Computed Popover Class styling.
     *
     * @type {string}
     */
    get computedPopoverClass() {
        return classSet('slds-popover')
            .add({
                'slds-is-fixed': this.placement === 'auto',
                'slds-dropdown_left': this.placement === 'left',
                'slds-dropdown_center': this.placement === 'center',
                'slds-dropdown_right': this.placement === 'right',
                'slds-dropdown_bottom': this.placement === 'bottom-center',
                'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right':
                    this.placement === 'bottom-right',
                'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left':
                    this.placement === 'bottom-left',
                'slds-nubbin_top-left': this.placement === 'left',
                'slds-nubbin_top-right': this.placement === 'right',
                'slds-nubbin_top': this.placement === 'center',
                'slds-nubbin_bottom-left': this.placement === 'bottom-left',
                'slds-nubbin_bottom-right': this.placement === 'bottom-right',
                'slds-nubbin_bottom': this.placement === 'bottom-center',
                'slds-p-vertical_large': this._isLoading
            })
            .add({
                'slds-show': this._popoverVisible,
                'slds-hide': !this._popoverVisible
            })
            .add(`slds-popover_${this.popoverVariant}`)
            .add(`slds-popover_${this.popoverSize}`)
            .toString();
    }

    /**
     * True if there is a title.
     * @type {boolean}
     */
    get hasStringTitle() {
        return !!this.title;
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
        if (this._connected && this.button) {
            this.clickOnButton();
        }
        /**
         * The event fired when the popover is clicked.
         *
         * @event
         * @name click
         * @public
         */
        this.dispatchEvent(new CustomEvent('click'));
    }

    /**
     * Closes the popover.
     *
     * @public
     */
    @api
    close() {
        if (this._popoverVisible) {
            this.toggleMenuVisibility();
        }
    }

    /**
     * Sets focus on the button.
     *
     * @public
     */
    @api
    focus() {
        if (this._connected && this.button) {
            this.focusOnButton();
        }
    }

    /**
     * Opens the popover.
     *
     * @public
     */
    @api
    open() {
        if (!this._popoverVisible) {
            this.toggleMenuVisibility();
        }
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE METHODS
     * -------------------------------------------------------------
     */

    /**
     * Sets the focus on the button-icon.
     * If the trigger is click, it toggles the menu visibility and blurs the button-icon.
     */
    clickOnButton() {
        if (!this.disabled && this.button) {
            this.cancelBlur();
            this.focusOnButton();

            if (this.isTriggerClick) {
                this.toggleMenuVisibility();
            }
        }
    }

    /**
     * Sets the focus on the button-icon.
     * If the trigger is focus, it toggles the menu visibility.
     */
    focusOnButton() {
        this.allowBlur();
        this.button.focus();
        if (this.isTriggerFocus && !this._popoverVisible && !this.disabled) {
            this.toggleMenuVisibility();
        }
    }

    /**
     * Sets the focus on the popover.
     */
    focusOnPopover() {
        this.template.querySelector('.slds-popover').focus();
    }

    /**
     * If the trigger is hover or focus, it toggles the menu visibility.
     */
    handleBlur() {
        if (this._cancelBlur) {
            return;
        }
        if (!this.isTriggerClick) {
            this.toggleMenuVisibility();
        }
    }

    /**
     * If the trigger is click, it toggles the menu visibility.
     */
    handlePopoverBlur(event) {
        const isButton = this.button === event.relatedTarget;
        if (this._cancelBlur) {
            return;
        }
        if (this.isTriggerClick && !isButton) {
            this.toggleMenuVisibility();
        }
    }

    /**
     * If the trigger is hover and the popover is not visible, it toggles the menu visibility.
     * If the trigger is hover and the popover is visible, it sets the variable cancelBlur to true.
     */
    handleMouseEnter() {
        if (
            this.isTriggerHover &&
            this._popoverVisible &&
            !this.disabled &&
            !this._cancelBlur
        ) {
            this.cancelBlur();
        }
        if (this.isTriggerHover && !this._popoverVisible && !this.disabled) {
            this.allowBlur();
            this.toggleMenuVisibility();
        }
    }

    /**
     * If the trigger is hover and the popover is visible, it toggles the menu visibility.
     */
    handleMouseLeave() {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
            if (
                !this._cancelBlur &&
                this.isTriggerHover &&
                this._popoverVisible &&
                !this.disabled
            ) {
                this.cancelBlur();
                this.toggleMenuVisibility();
            }
            if (
                this._cancelBlur &&
                this.isTriggerHover &&
                this._popoverVisible &&
                !this.disabled
            ) {
                this.allowBlur();
            }
        }, 250);
    }

    /**
     * If the trigger is hover and the popover is visible and the mouse enters the popover,
     * it sets the variable cancelBlur to true.
     */
    handleMouseEnterBody() {
        if (this.isTriggerHover && this._popoverVisible && !this.disabled) {
            this.cancelBlur();
        }
    }

    /**
     * If the trigger is hover and the popover is visible and the mouse leaves the popover,
     * it sets the variable cancelBlur to true.
     */
    handleMouseLeaveBody() {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(() => {
            if (
                !this._cancelBlur &&
                this.isTriggerHover &&
                this._popoverVisible &&
                !this.disabled
            ) {
                this.cancelBlur();
                this.toggleMenuVisibility();
            }
            if (
                this._cancelBlur &&
                this.isTriggerHover &&
                this._popoverVisible &&
                !this.disabled
            ) {
                this.allowBlur();
            }
        }, 250);
    }

    /**
     * Handles mouse down on popover.
     */
    handlePopoverMouseDown(event) {
        const mainButton = 0;
        if (event.button === mainButton) {
            this.cancelBlur();
        }
    }

    /**
     * Sets the variable cancelBlur to false.
     */
    handlePopoverMouseUp() {
        this.allowBlur();
    }

    /**
     * If variable cancelBlur is false, it sets the variable cancelBlur to true.
     */
    handlePopoverKeyDown() {
        if (!this._cancelBlur) {
            this.cancelBlur();
        }
    }

    /**
     * If trigger is focus, sets the focus on the button when click on a slot.
     * If trigger is click, keeps the popover visible when click on a slot.
     */
    handleSlotClick() {
        if (this.isTriggerFocus) {
            this.focusOnButton();
        }
        if (this.isTriggerClick) {
            this._popoverVisible = true;
        }
    }

    /**
     * Sets the variable cancelBlur to false.
     */
    allowBlur() {
        this._cancelBlur = false;
    }

    /**
     * Sets the variable cancelBlur to false.
     */
    cancelBlur() {
        this._cancelBlur = true;
    }

    /**
     * Start positioning the popover in the viewport.
     */
    startPositioning() {
        const popover = this.template.querySelector(
            '[data-element-id="div-popover"]'
        );
        if (!popover) {
            return;
        }
        if (!this._autoPosition) {
            this._autoPosition = new AutoPosition(this);
        }

        this._autoPosition.start({
            target: () => this.button,
            element: () => popover,
            align: {
                horizontal: Direction.Right,
                vertical: Direction.Top
            },
            targetAlign: {
                horizontal: Direction.Right,
                vertical: Direction.Bottom
            },
            autoFlip: true,
            padTop: 4
        });
    }

    /**
     * Stop positioning the popover.
     */
    stopPositioning() {
        if (this._autoPosition) {
            this._autoPosition.stop();
        }
    }

    /**
     * Toggles the popover visibility depending on if it's visible or not.
     * Adds class slds-is-open if popover visible and removes if not.
     */
    toggleMenuVisibility() {
        if (!this.disabled) {
            this._popoverVisible = !this._popoverVisible;

            if (this._popoverVisible) {
                this.dispatchOpen();
                requestAnimationFrame(() => {
                    this.startPositioning();
                });
            } else {
                this.stopPositioning();
                this.dispatchClose();
            }

            this.classList.toggle('slds-is-open');
        }
    }

    /**
     * Dispatch the `close` event.
     */
    dispatchClose() {
        /**
         * The event fired when the popover is closed.
         *
         * @event
         * @name close
         * @public
         */
        this.dispatchEvent(new CustomEvent('close'));
    }

    /**
     * Dispatch the `open` event.
     */
    dispatchOpen() {
        /**
         * The event fired when the popover is opened.
         *
         * @event
         * @name open
         * @public
         */
        this.dispatchEvent(new CustomEvent('open'));
    }
}
