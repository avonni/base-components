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

export default class ButtonPopover extends LightningElement {
    /**
     * The keyboard shortcut for the button.
     *
     * @type {string}
     */
    @api accessKey;

    /**
     * The tile can include text, and is displayed in the header.
     * To include additional markup or another component, use the title slot.
     *
     * @type {string}
     */
    @api label;

    /**
     * Optional text to be shown on the button.
     *
     * @type {string}
     */
    @api title;

    /**
     * The Lightning Design System name of the icon.
     * Names are written in the format 'utility:down' where 'utility' is the category,
     * and 'down' is the specific icon to be displayed.
     * Only utility icons can be used in this component.
     *
     * @type {string}
     */
    @api iconName;

    /**
     * Message displayed while the popover is in the loading state.
     *
     * @type {string}
     */
    @api loadingStateAlternativeText;

    _disabled = false;
    _isLoading = false;
    _hideCloseButton = false;
    _iconPosition = ICON_POSITIONS.default;
    _popoverSize = POPOVER_SIZES.default;
    _placement = POPOVER_PLACEMENTS.default;
    _variant = BUTTON_VARIANTS.default;
    _triggers = POPOVER_TRIGGERS.default;
    _popoverVariant = POPOVER_VARIANTS.default;

    popoverVisible = false;
    showTitle = true;
    showFooter = true;
    _boundingRect = {};

    connectedCallback() {
        this.classList.add(
            'slds-dropdown-trigger',
            'slds-dropdown-trigger_click'
        );
    }

    renderedCallback() {
        if (this.titleSlot) {
            this.showTitle = this.titleSlot.assignedElements().length !== 0;
        }
        if (this.footerSlot) {
            this.showFooter = this.footerSlot.assignedElements().length !== 0;
        }

        if (this.triggers === 'click') {
            if (this.popoverVisible) {
                this.focusOnPopover();
            }
        }
    }

    get titleSlot() {
        return this.template.querySelector('slot[name=title]');
    }

    get footerSlot() {
        return this.template.querySelector('slot[name=footer]');
    }

    /**
     * Width of the popover. Accepted values include small, medium and large.
     *
     * @type {string}
     * @default medium
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
     * Describes the position of the icon with respect to body. Options include left and right.
     *
     * @type {string}
     * @default left
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
     * Determines the alignment of the popover relative to the button.
     * Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right.
     * The auto option aligns the popover based on available space.
     *
     * @type {string}
     * @default left
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
     * The variant changes the appearance of the button.
     * Accepted variants include base, neutral, brand, brand-outline,
     * destructive, destructive-text, inverse, and success.
     *
     * @type {string}
     * @default neutral
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

    /**
     * Specify which triggers will show the popover. Supported values are 'click', 'hover', 'focus'.
     *
     * @type {string}
     * @default click
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
     * The variant changes the appearance of the popover.
     * Accepted variants include base, warning, error, walkthrough.
     *
     * @type {string}
     * @default base
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
     * If present, the popover can be opened by users.
     *
     * @type {boolean}
     * @default false
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
     */
    @api
    get hideCloseButton() {
        return this._hideCloseButton;
    }

    set hideCloseButton(value) {
        this._hideCloseButton = normalizeBoolean(value);
    }

    /**
     * If present, the popover is in a loading state and shows a spinner.
     *
     * @type {boolean}
     * @default false
     */
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

    get computedAriaExpanded() {
        return String(this.popoverVisible);
    }

    get computedPopoverHeaderClass() {
        return classSet('slds-popover__header')
            .add({
                'avonni-button-popover-space-between': !this.hideCloseButton
            })
            .toString();
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
                'slds-popover_large': this._popoverSize === 'large',
                'slds-show': this.popoverVisible,
                'slds-hide': !this.popoverVisible
            })
            .toString();
    }

    /**
     * Simulates a mouse click on the button.
     */
    @api
    click() {
        if (this.isConnected) {
            this.clickOnButton();
        }
    }

    /**
     * Sets focus on the button.
     */
    @api
    focus() {
        if (this.isConnected) {
            this.focusOnButton();
        }
    }

    /**
     * Opens the popover if it's closed
     */
    @api
    open() {
        if (!this.popoverVisible) {
            this.toggleMenuVisibility();
        }
        this.dispatchEvent(new CustomEvent('open'));
    }

    /**
     * Closes the popover if it's open
     */
    @api
    close() {
        if (this.popoverVisible) {
            this.toggleMenuVisibility();
        }
        this.dispatchEvent(new CustomEvent('close'));
    }

    /**
     * Sets the focus on the button-icon.
     * If the trigger is click, toggles the menu visibility and blurs the button-icon.
     * @ignore
     */
    clickOnButton() {
        if (!this._disabled) {
            this.cancelBlur();
            this.focusOnButton();

            if (this._triggers === 'click') {
                this.allowBlur();
                this.toggleMenuVisibility();
                this.template.querySelector('lightning-button').blur();
            }

            this.dispatchEvent(new CustomEvent('click'));
        }
    }

    /**
     * Sets the focus on the button-icon.
     * If the trigger is focus, toggle the menu visibility.
     * @ignore
     */
    focusOnButton() {
        this.template.querySelector('lightning-button').focus();
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
     * @ignore
     */
    focusOnPopover() {
        this.template.querySelector('.slds-popover').focus();
    }

    /**
     * Blurs the button-icon.
     * If the trigger is not click and the popover is visible, it toggles the menu visibility.
     * @ignore
     */
    handleBlur() {
        if (this._cancelBlur) {
            return;
        }
        if (this.triggers !== 'click') {
            if (this.popoverVisible) {
                this.toggleMenuVisibility();
            }
        }
    }

    /**
     * Blurs the popover.
     * If the trigger is click and the popover is visible, it toggles the menu visibility.
     * @ignore
     */
    handlePopoverBlur() {
        if (this._cancelBlur) {
            return;
        }
        if (this.triggers === 'click') {
            if (this.popoverVisible) {
                this.toggleMenuVisibility();
            }
        }
    }

    /**
     * If the trigger is hover and the popover is not visible, it toggles the menu visibility.
     * If the trigger is hover and the popover is visible, it sets the variable cancelBlur to true.
     * @ignore
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
     * @ignore
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
     * @ignore
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
     * @ignore
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

    handlePopoverMouseDown(event) {
        const mainButton = 0;
        if (event.button === mainButton) {
            this.cancelBlur();
        }
    }

    /**
     * It sets the variable cancelBlur to false.
     * @ignore
     */
    handlePopoverMouseUp() {
        this.allowBlur();
    }

    /**
     * If variable cancelBlur is false, it sets the variable cancelBlur to true.
     * @ignore
     */
    handlePopoverKeyDown() {
        if (!this._cancelBlur) {
            this.cancelBlur();
        }
    }

    /**
     * If variable cancelBlur is true, it sets the variable cancelBlur to false.
     * @ignore
     */
    handlePopoverKeyPress() {
        if (this._cancelBlur) {
            this.allowBlur();
        }
    }

    /**
     * If trigger is focus, sets the focus on the button with click on a slot.
     * If trigger is click, keeps the popover visible and set focus on the popover
     * when click on a slot.
     * @ignore
     */
    handleSlotClick() {
        if (this.triggers === 'focus') {
            this.focusOnButton();
        }
        if (this.triggers === 'click') {
            this.popoverVisible = true;
            this.focusOnPopover();
        }
    }

    /**
     * Sets the variable cancelBlur to false.
     * @ignore
     */
    allowBlur() {
        this._cancelBlur = false;
    }

    /**
     * Sets the variable cancelBlur to false.
     * @ignore
     */
    cancelBlur() {
        this._cancelBlur = true;
    }

    /**
     * Toggles the popover visibility depending on if it's visible or not.
     * @ignore
     */
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

    /**
     * Poll for change in bounding rectangle
     * only if it is placement=auto since that is
     * position:fixed and is opened
     * @ignore
     */
    pollBoundingRect() {
        if (this.isAutoAlignment() && this.popoverVisible) {
            // eslint-disable-next-line @lwc/lwc/no-async-operation
            setTimeout(() => {
                if (this.isConnected) {
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
     * @ignore
     */
    isAutoAlignment() {
        return this._placement.startsWith('auto');
    }
}
