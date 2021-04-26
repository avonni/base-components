import { LightningElement, api } from 'lwc';
import { classSet } from 'c/utils';
import {
    normalizeBoolean,
    normalizeString,
    observePosition
} from 'c/utilsPrivate';

const validPopoverSizes = {
    valid: ['small', 'medium', 'large'],
    default: 'medium'
};

const validPlacements = {
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

const validVariants = {
    valid: [
        'bare',
        'container',
        'brand',
        'border',
        'border-filled',
        'bare-inverse',
        'border-inverse'
    ],
    default: 'border'
};

const validSizesBare = {
    valid: ['x-small', 'small', 'medium', 'large'],
    default: 'medium'
};

const validSizesNonBare = {
    valid: ['xx-small', 'x-small', 'small', 'medium'],
    default: 'medium'
};

const validTriggers = { valid: ['click', 'hover', 'focus'], default: 'click' };

const validPopoverVariants = {
    valid: ['base', 'warning', 'error', 'walkthrough'],
    default: 'base'
};

export default class ButtonIconPopover extends LightningElement {
    @api accessKey;
    @api alternativeText;
    @api title;
    @api iconName;
    @api iconClass;
    @api loadingStateAlternativeText;
    @api tooltip;

    _disabled = false;
    _isLoading = false;
    _size = 'medium';
    _placement = validPlacements.default;
    _variant = validVariants.default;
    _popoverSize = validPopoverSizes.default;
    _triggers = validTriggers.default;
    _popoverVariant = validPopoverVariants.default;
    popoverVisible = false;
    showTitle = true;
    showFooter = true;
    _boundingRect = {};

    connectedCallback() {
        this._connected = true;

        this.classList.add(
            'slds-dropdown-trigger',
            'slds-dropdown-trigger_click'
        );
    }

    disconnectedCallback() {
        this._connected = false;
    }

    renderedCallback() {
        if (this.titleSlot) {
            this.showTitle = this.titleSlot.assignedElements().length !== 0;
        }
        if (this.footerSlot) {
            this.showFooter = this.footerSlot.assignedElements().length !== 0;
        }
    }

    get titleSlot() {
        return this.template.querySelector('slot[name=title]');
    }

    get footerSlot() {
        return this.template.querySelector('slot[name=footer]');
    }

    @api
    get size() {
        return this._size;
    }

    set size(size) {
        if (this._variant === 'bare' || this._variant === 'bare-inverse') {
            this._size = normalizeString(size, {
                fallbackValue: validSizesBare.default,
                validValues: validSizesBare.valid
            });
        } else {
            this._size = normalizeString(size, {
                fallbackValue: validSizesNonBare.default,
                validValues: validSizesNonBare.valid
            });
        }
    }

    @api
    get placement() {
        return this._placement;
    }

    set placement(placement) {
        this._placement = normalizeString(placement, {
            fallbackValue: validPlacements.default,
            validValues: validPlacements.valid
        });
    }

    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: validVariants.default,
            validValues: validVariants.valid
        });
    }

    @api
    get popoverSize() {
        return this._popoverSize;
    }

    set popoverSize(popoverSize) {
        this._popoverSize = normalizeString(popoverSize, {
            fallbackValue: validPopoverSizes.default,
            validValues: validPopoverSizes.valid
        });
    }

    @api
    get triggers() {
        return this._triggers;
    }

    set triggers(triggers) {
        this._triggers = normalizeString(triggers, {
            fallbackValue: validTriggers.default,
            validValues: validTriggers.valid
        });
    }

    @api
    get popoverVariant() {
        return this._popoverVariant;
    }

    set popoverVariant(popoverVariant) {
        this._popoverVariant = normalizeString(popoverVariant, {
            fallbackValue: validPopoverVariants.default,
            validValues: validPopoverVariants.valid
        });
    }

    @api
    get disabled() {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = normalizeBoolean(value);
    }

    @api
    get isLoading() {
        return this._isLoading;
    }

    set isLoading(value) {
        this._isLoading = normalizeBoolean(value);
    }

    get hasStringTitle() {
        return !!this.title;
    }

    @api
    click() {
        if (this._connected) {
            this.clickOnButton();
        }
    }

    @api
    focus() {
        if (this._connected) {
            this.focusOnButton();
        }
    }

    @api
    close() {
        if (this.popoverVisible) {
            this.toggleMenuVisibility();
        }
    }

    clickOnButton() {
        if (!this._disabled) {
            this.allowBlur();
            this.focusOnButton();

            if (this._triggers === 'click') {
                this.toggleMenuVisibility();
            }

            this.dispatchEvent(new CustomEvent('click'), {
                bubbles: false,
                cancelable: false,
                composed: false
            });
        }
    }

    focusOnButton() {
        this.template.querySelector('lightning-button-icon').focus();
        if (
            this._triggers === 'focus' &&
            !this.popoverVisible &&
            !this._disabled
        ) {
            this.toggleMenuVisibility();
        }
    }

    handleBlur() {
        if (this._cancelBlur) {
            return;
        }

        if (this.popoverVisible) {
            this.toggleMenuVisibility();
        }
    }

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

    handleMouseEnterBody() {
        if (
            this._triggers === 'hover' &&
            this.popoverVisible &&
            !this._disabled
        ) {
            this.cancelBlur();
        }
    }

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

    handleDropdownMouseDown(event) {
        const mainButton = 0;
        if (event.button === mainButton) {
            this.cancelBlur();
        }
    }

    handleDropdownMouseUp() {
        this.allowBlur();
    }

    allowBlur() {
        this._cancelBlur = false;
    }

    cancelBlur() {
        this._cancelBlur = true;
    }

    toggleMenuVisibility() {
        if (!this.disabled) {
            this.popoverVisible = !this.popoverVisible;

            if (this.popoverVisible) {
                this._boundingRect = this.getBoundingClientRect();
                this.pollBoundingRect();
            }

            this.classList.toggle('slds-is-open');
        }
    }

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

    get computedAriaExpanded() {
        return String(this.popoverVisible);
    }

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
                'slds-popover_small': this._popoverSize === 'small',
                'slds-popover_medium': this._popoverSize === 'medium',
                'slds-popover_large': this._popoverSize === 'large'
            })
            .toString();
    }

    isAutoAlignment() {
        return this._placement.startsWith('auto');
    }
}
