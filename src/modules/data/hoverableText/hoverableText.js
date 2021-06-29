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
import {
    normalizeArray,
    normalizeBoolean,
    normalizeString,
    observePosition
} from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const POPOVER_SIZES = {
    valid: ['small', 'medium', 'large'],
    default: 'medium'
};

const PLACEMENTS = {
    valid: [
        'auto',
        'left',
        'right',
        'center',
        'bottom-left',
        'bottom-right',
        'bottom-center'
    ],
    default: 'left'
};

const THEMES = {
    valid: ['default', 'shade', 'default-shade', 'inverse'],
    default: 'default'
};

const DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT = 'Loading';

export default class HoverableText extends LightningElement {
    @api label;
    @api href;
    @api title;
    @api titleHref;
    @api avatarSrc;
    @api avatarFallbackIconName;

    _fields = [];
    _popoverSize = POPOVER_SIZES.default;
    _placement = PLACEMENTS.default;
    _isLoading = false;
    _loadingStateAlternativeText = DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    _theme = THEMES.default;

    popoverVisible = false;

    renderedCallback() {
        if (this.popoverVisible) {
            this.template.querySelector('.slds-popover__close').focus();
        }
    }

    @api
    get fields() {
        return this._fields;
    }
    set fields(value) {
        this._fields = normalizeArray(value);
    }

    @api
    get popoverSize() {
        return this._popoverSize;
    }
    set popoverSize(value) {
        this._popoverSize = normalizeString(value, {
            fallbackValue: POPOVER_SIZES.default,
            validValues: POPOVER_SIZES.valid
        });
    }

    @api
    get placement() {
        return this._placement;
    }
    set placement(value) {
        this._placement = normalizeString(value, {
            fallbackValue: PLACEMENTS.default,
            validValues: PLACEMENTS.valid
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
    get loadingStateAlternativeText() {
        return this._loadingStateAlternativeText;
    }
    set loadingStateAlternativeText(value) {
        this._loadingStateAlternativeText =
            typeof value === 'string'
                ? value
                : DEFAULT_LOADING_STATE_ALTERNATIVE_TEXT;
    }

    @api
    get theme() {
        return this._theme;
    }
    set theme(value) {
        this._theme = normalizeString(value, {
            fallbackValue: THEMES.default,
            validValues: THEMES.valid
        });
    }

    get showAvatar() {
        return this.avatarSrc || this.avatarFallbackIconName;
    }

    get showFields() {
        return this.fields.length > 0;
    }

    get showAvatarWithoutTitle() {
        return (
            !this.computedTitle &&
            (this.avatarFallbackIconName || this.avatarSrc)
        );
    }

    get computedLabel() {
        return this.label || this.href;
    }

    get computedTitle() {
        return this.title || this.titleHref;
    }

    get computedAriaExpanded() {
        return String(this.popoverVisible);
    }

    get computedAriaLabel() {
        return this.computedTitle || this.computedLabel;
    }

    get computedPopoverClass() {
        return classSet('slds-popover')
            .add({
                'slds-dropdown_left':
                    this.placement === 'left' || this.isAutoAlignment(),
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
                'slds-popover_small': this.popoverSize === 'small',
                'slds-popover_medium': this.popoverSize === 'medium',
                'slds-popover_large': this.popoverSize === 'large',
                'slds-theme_inverse': this.theme === 'inverse',
                'slds-theme_shade':
                    this.theme === 'shade' ||
                    (this.theme === 'default-shade' && this.computedTitle)
            })
            .toString();
    }

    get computedPopoverWrapperClass() {
        const topSpacing =
            this.placement === 'left' ||
            this.placement === 'right' ||
            this.placement === 'center' ||
            this.isAutoAlignment();

        return classSet()
            .add({
                'popover-top': topSpacing,
                'popover-bottom': this.placement.startsWith('bottom')
            })
            .toString();
    }

    get computedPopoverBodyClass() {
        return classSet('slds-grid slds-popover__body')
            .add({
                'slds-theme_default': this.theme === 'default-shade',
                'slds-border_top':
                    this.theme === 'default-shade' && this.computedTitle
            })
            .toString();
    }

    @api
    open() {
        if (!this.popoverVisible) {
            this.toggleMenuVisibility();
            this.dispatchEvent(new CustomEvent('open'));
        }
    }

    @api
    close() {
        if (this.popoverVisible) {
            this.toggleMenuVisibility();
            this.dispatchEvent(new CustomEvent('close'));
        }
    }

    @api
    focus() {
        const link = this.template.querySelector('a.hoverable-label');
        if (link) {
            link.focus();
        } else {
            this.template.querySelector('.accessibility-button').focus();
        }
    }

    toggleMenuVisibility() {
        this.popoverVisible = !this.popoverVisible;

        if (this.popoverVisible) {
            this._boundingRect = this.getBoundingClientRect();
            this.pollBoundingRect();
        }

        this.classList.toggle('slds-is-open');
    }

    toggleAccessibilityButtonVisibility(event) {
        event.currentTarget.classList.toggle('accessibility-button-hidden');

        if (!this.href) {
            this.dispatchEvent(new CustomEvent('focus'));
        }
    }

    pollBoundingRect() {
        if (this.isAutoAlignment() && this.popoverVisible) {
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

    isAutoAlignment() {
        return this.placement.startsWith('auto');
    }

    handleKeyUp(event) {
        if (event.key === 'Escape' && this.popoverVisible) {
            this.close();
            this.focus();
        }
    }

    handleButtonCloseKeyDown(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            this.close();
            this.focus();
        }
    }

    handleFocus() {
        this.dispatchEvent(new CustomEvent('focus'));
    }
}
