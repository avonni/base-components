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

const BUTTON_SIZES = {
    validBare: ['x-small', 'small', 'medium', 'large'],
    validNonBare: ['xx-small', 'x-small', 'small', 'medium'],
    default: 'medium'
};

const BUTTON_TRIGGERS = {
    valid: ['click', 'hover', 'focus'],
    default: 'click'
};

const POPOVER_VARIANTS = {
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
    _handleCloseButton = false;
    _isLoading = false;
    _size = BUTTON_SIZES.default;
    _placement = POPOVER_PLACEMENTS.default;
    _variant = BUTTON_VARIANTS.default;
    _popoverSize = POPOVER_SIZES.default;
    _triggers = BUTTON_TRIGGERS.default;
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

    @api
    get size() {
        return this._size;
    }

    set size(size) {
        if (this._variant === 'bare' || this._variant === 'bare-inverse') {
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

    @api
    get triggers() {
        return this._triggers;
    }

    set triggers(triggers) {
        this._triggers = normalizeString(triggers, {
            fallbackValue: BUTTON_TRIGGERS.default,
            validValues: BUTTON_TRIGGERS.valid
        });
    }

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

    @api
    get hideCloseButton() {
        return this._hideCloseButton;
    }

    set hideCloseButton(value) {
        this._hideCloseButton = normalizeBoolean(value);
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

    get computedAriaExpanded() {
        return String(this.popoverVisible);
    }

    get computedPopoverHeaderClass() {
        return classSet('slds-popover__header')
            .add({
                'avonni-button-icon-popover-space-between': !this
                    .hideCloseButton
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
        this.dispatchEvent(new CustomEvent('focus'));
    }

    /**
     * {Function} close - Opens the popover if it's closed
     */
    @api
    open() {
        if (!this.popoverVisible) {
            this.toggleMenuVisibility();
        }
        this.dispatchEvent(new CustomEvent('open'));
    }

    /**
     * {Function} close - Closes the popover if it's open
     */
    @api
    close() {
        if (this.popoverVisible) {
            this.toggleMenuVisibility();
        }
        this.dispatchEvent(new CustomEvent('close'));
    }

    clickOnButton() {
        if (!this._disabled) {
            this.cancelBlur();
            this.focusOnButton();

            if (this._triggers === 'click') {
                this.allowBlur();
                this.toggleMenuVisibility();
                this.template.querySelector('lightning-button-icon').blur();
            }

            this.dispatchEvent(new CustomEvent('click'));
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

    focusOnPopover() {
        this.template.querySelector('.slds-popover').focus();
    }

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

    handlePopoverMouseDown(event) {
        const mainButton = 0;
        if (event.button === mainButton) {
            this.cancelBlur();
        }
    }

    handlePopoverMouseUp() {
        this.allowBlur();
    }

    handlePopoverKeyDown() {
        if (!this._cancelBlur) {
            this.cancelBlur();
        }
    }

    handlePopoverKeyPress() {
        if (this._cancelBlur) {
            this.allowBlur();
        }
    }

    handleSlotClick() {
        if (this.triggers === 'focus') {
            this.focusOnButton();
        }
        if (this.triggers === 'click') {
            this.popoverVisible = true;
            this.focusOnPopover();
        }
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
                if (this.isConnected) {
                    observePosition(this, 300, this._boundingRect, () => {
                        this.close();
                    });

                    this.pollBoundingRect();
                }
            }, 250);
        }
    }

    isAutoAlignment() {
        return this._placement.startsWith('auto');
    }
}
