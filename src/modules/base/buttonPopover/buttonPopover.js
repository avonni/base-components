

import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import {
    normalizeBoolean,
    normalizeString,
    observePosition
} from 'c/utilsPrivate';

const POPOVER_SIZES = {
    valid: ['small', 'medium', 'large'],
    default: 'medium'
};
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
const BUTTON_VARIANTS = {
    valid: [
        'base',
        'neutral',
        'brand',
        'brand-outline',
        'destructive',
        'destructive-text',
        'inverse',
        'success'
    ],
    default: 'neutral'
};

const POPOVER_TRIGGERS = {
    valid: ['click', 'hover', 'focus'],
    default: 'click'
};

const POPOVER_VARIANTS = {
    valid: ['base', 'warning', 'error', 'walkthrough'],
    default: 'base'
};

const ICON_POSITIONS = { valid: ['left', 'right'], default: 'left' };

const DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT = 'Loading';

/**
 * The button popover displays a lightning button. On click, open the popover.
 *
 * @class
 * @name ButtonPopover
 * @public
 * @storyId example-button-popover--neutral
 * @descriptor avonni-button-popover
 */
export default class ButtonPopover extends LightningElement {
    /**
     * The keyboard shortcut for the button.
     *
     * @type {string}
     */
    @api accessKey;
    /**
     * The Lightning Design System name of the icon. Names are written in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.
     * Only utility icons can be used in this component.
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
     * The title is displayed in the popover header.
     * To include additional markup or another component, use the title slot instead.
     *
     * @type {string}
     * @public
     */
    @api title;

    _disabled = false;
    _isLoading = false;
    _hideCloseButton = false;
    _iconPosition = ICON_POSITIONS.default;
    _loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    _placement = POPOVER_PLACEMENTS.default;
    _popoverSize = POPOVER_SIZES.default;
    _popoverVariant = POPOVER_VARIANTS.default;
    _triggers = POPOVER_TRIGGERS.default;
    _variant = BUTTON_VARIANTS.default;

    popoverVisible = false;
    showTitle = true;
    showFooter = true;
    _boundingRect = {};

    connectedCallback() {
        this.classList.add(
            'slds-dropdown-trigger',
            'slds-dropdown-trigger_click'
        );
        this._connected = true;
    }

    renderedCallback() {
        if (this.popoverVisible) {
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

        if (this.triggers === 'click') {
            this.focusOnPopover();
        }
    }

    /**
     * Title slot.
     *
     * @type {element}
     */
    get titleSlot() {
        return this.template.querySelector('slot[name=title]');
    }

    /**
     * Footer slot.
     *
     * @type {element}
     */
    get footerSlot() {
        return this.template.querySelector('slot[name=footer]');
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
     * Describes the position of the icon with respect to body. Options include left and right.
     *
     * @type {string}
     * @default left
     * @public
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
     * Message displayed while the popover is in the loading state.
     *
     * @type {string}
     * @default Loading
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
     * Determines the alignment of the popover relative to the button. Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right.
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
     * Specify which trigger will show the popover. Supported values are 'click', 'hover' and 'focus'.
     *
     * @type {string}
     * @default click
     * @public
     */
    @api
    get triggers() {
        return this._triggers;
    }

    set triggers(triggers) {
        this._triggers = normalizeString(triggers, {
            fallbackValue: POPOVER_TRIGGERS.default,
            validValues: POPOVER_TRIGGERS.valid
        });
    }

    /**
     * The variant changes the appearance of the button. Accepted variants include base, neutral, brand, brand-outline, destructive, destructive-text, inverse, and success.
     *
     * @type {string}
     * @default neutral
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
     * True if there is a title.
     * @type {boolean}
     */
    get hasStringTitle() {
        return !!this.title;
    }

    /**
     * Return a true string if the popover is visible and a false string if not.
     *
     * @type {string}
     */
    get computedAriaExpanded() {
        return String(this.popoverVisible);
    }

    /**
     * Computed Popover Header Class styling.
     *
     * @type {string}
     */
    get computedPopoverHeaderClass() {
        return classSet('slds-popover__header')
            .add({
                'avonni-button-popover_space-between': !this.hideCloseButton
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
                'slds-dropdown_left':
                    this._placement === 'left' || this.isAutoAlignment(),
                'slds-dropdown_center': this._placement === 'center',
                'slds-dropdown_right': this._placement === 'right',
                'slds-dropdown_bottom': this._placement === 'bottom-center',
                'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right':
                    this._placement === 'bottom-right',
                'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left':
                    this._placement === 'bottom-left',
                'slds-nubbin_top-left': this._placement === 'left',
                'slds-nubbin_top-right': this._placement === 'right',
                'slds-nubbin_top': this._placement === 'center',
                'slds-nubbin_bottom-left': this._placement === 'bottom-left',
                'slds-nubbin_bottom-right': this._placement === 'bottom-right',
                'slds-nubbin_bottom': this._placement === 'bottom-center',
                'slds-p-vertical_large': this._isLoading,
                'slds-popover_warning': this._popoverVariant === 'warning',
                'slds-popover_error': this._popoverVariant === 'error',
                'slds-popover_walkthrough':
                    this._popoverVariant === 'walkthrough',
                'slds-show': this.popoverVisible,
                'slds-hide': !this.popoverVisible
            })
            .add(`slds-popover_${this._popoverSize}`)
            .toString();
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
        if (this._connected) {
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
     * Set focus on the button.
     *
     * @public
     */
    @api
    focus() {
        if (this._connected) {
            this.focusOnButton();
        }
    }

    /**
     * Open the popover.
     *
     * @public
     */
    @api
    open() {
        if (!this.popoverVisible) {
            this.toggleMenuVisibility();
        }
    }

    /**
     * Close the popover.
     */
    @api
    close() {
        if (this.popoverVisible) {
            this.toggleMenuVisibility();
        }
        /**
         * The event fired when the popover is closed.
         *
         * @event
         * @name close
         * @public
         */
        this.dispatchEvent(new CustomEvent('close'));
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
        if (!this._disabled) {
            this.cancelBlur();
            this.focusOnButton();

            if (this._triggers === 'click') {
                this.toggleMenuVisibility();
            }
        }
    }

    /**
     * Sets the focus on the button.
     * If the trigger is focus, it toggles the menu visibility.
     */
    focusOnButton() {
        this.allowBlur();
        this.template
            .querySelector('[data-element-id="lightning-button"]')
            .focus();
        if (
            this._triggers === 'focus' &&
            !this.popoverVisible &&
            !this._disabled
        ) {
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
        if (this.triggers !== 'click') {
            this.toggleMenuVisibility();
        }
    }

    /**
     * If the trigger is click, it toggles the menu visibility.
     */
    handlePopoverBlur(event) {
        const isButton =
            this.template.querySelector(
                '[data-element-id="lightning-button"]'
            ) === event.relatedTarget;
        if (this._cancelBlur) {
            return;
        }
        if (this.triggers === 'click' && !isButton) {
            this.toggleMenuVisibility();
        }
    }

    /**
     * If the trigger is hover and the popover is not visible, it toggles the menu visibility.
     * If the trigger is hover and the popover is visible, it sets the variable cancelBlur to true.
     */
    handleMouseEnter() {
        if (
            this._triggers === 'hover' &&
            this.popoverVisible &&
            !this._disabled &&
            !this._cancelBlur
        ) {
            this.cancelBlur();
        }
        if (
            this._triggers === 'hover' &&
            !this.popoverVisible &&
            !this._disabled
        ) {
            this.allowBlur();
            this.toggleMenuVisibility();
        }
    }

    /**
     * If the trigger is hover and the popover is visible, it toggles the menu visibility.
     */
    handleMouseLeave() {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(
            function () {
                if (
                    !this._cancelBlur &&
                    this._triggers === 'hover' &&
                    this.popoverVisible &&
                    !this._disabled
                ) {
                    this.cancelBlur();
                    this.toggleMenuVisibility();
                }
                if (
                    this._cancelBlur &&
                    this._triggers === 'hover' &&
                    this.popoverVisible &&
                    !this._disabled
                ) {
                    this.allowBlur();
                }
            }.bind(this),
            250
        );
    }

    /**
     * If the trigger is hover and the popover is visible and the mouse enters the popover,
     * it sets the variable cancelBlur to true.
     */
    handleMouseEnterBody() {
        if (
            this._triggers === 'hover' &&
            this.popoverVisible &&
            !this._disabled
        ) {
            this.cancelBlur();
        }
    }

    /**
     * If the trigger is hover and the popover is visible and the mouse leaves the popover,
     * it sets the variable cancelBlur to true.
     */
    handleMouseLeaveBody() {
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        setTimeout(
            function () {
                if (
                    !this._cancelBlur &&
                    this._triggers === 'hover' &&
                    this.popoverVisible &&
                    !this._disabled
                ) {
                    this.cancelBlur();
                    this.toggleMenuVisibility();
                }
                if (
                    this._cancelBlur &&
                    this._triggers === 'hover' &&
                    this.popoverVisible &&
                    !this._disabled
                ) {
                    this.allowBlur();
                }
            }.bind(this),
            250
        );
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
        if (this.triggers === 'focus') {
            this.focusOnButton();
        }
        if (this.triggers === 'click') {
            this.popoverVisible = true;
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
     * Toggles the popover visibility depending on if it's visible or not.
     */
    toggleMenuVisibility() {
        if (!this.disabled) {
            this.popoverVisible = !this.popoverVisible;

            if (this.popoverVisible) {
                this._boundingRect = this.getBoundingClientRect();
                this.pollBoundingRect();
            }
        }
    }

    /**
     * Poll for change in bounding rectangle
     * only if it is placement=auto since that is
     * position:fixed and is opened.
     */
    pollBoundingRect() {
        if (this.isAutoAlignment() && this.popoverVisible) {
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
     * Returns true if the placement is auto.
     */
    isAutoAlignment() {
        return this._placement.startsWith('auto');
    }
}
