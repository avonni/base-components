
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
import { keyCodes } from 'c/utilsPrivate';

const i18n = {
    cancelButton: 'Cancel',
    customTab: 'Custom',
    defaultTab: 'Default',
    doneButton: 'Done'
};

const DEFAULT_COLOR = '#000000';

/**
 * @class
 * @descriptor avonni-color-picker-panel
 */
export default class ColorPickerPanel extends LightningElement {
    /**
     * Get currentColor.
     * 
     * @public
     */
    @api currentColor;

    _isCustomTabActive = false;
    _selectedColor = null;

    connectedCallback() {
        this._selectedColor = this.currentColor || DEFAULT_COLOR;
    }

    /**
     * Localization.
     * 
     * @type {object}
     */
    get i18n() {
        return i18n;
    }

    /**
     * Computed Panel class default styling.
     * 
     * @type {string}
     */
    get computedClassDefault() {
        return classSet({
            'slds-tabs_default__item': true,
            'slds-is-active': !this._isCustomTabActive
        }).toString();
    }

    /**
     * Computed Panel class custom styling.
     * 
     * @type {string}
     */
    get computedClassCustom() {
        return classSet({
            'slds-tabs_default__item': true,
            'slds-is-active': this._isCustomTabActive
        }).toString();
    }

    /**
     * Aria for Default Panel.
     * 
     * @type {string}
     */
    get ariaSelectedDefault() {
        return !this._isCustomTabActive.toString();
    }

    /**
     * Aria for Custom Panel.
     * 
     * @type {string}
     */
    get ariaSelectedCustom() {
        return this._isCustomTabActive.toString();
    }

    /**
     * Tab change handler.
     * 
     * @param {Event} event
     */
    handleTabChange(event) {
        event.preventDefault();
        const tabElement = event.currentTarget;
        if (tabElement.classList.contains('slds-is-active')) {
            return;
        }
        this._isCustomTabActive = tabElement.title !== i18n.defaultTab;
    }

    /**
     * Selected Color update handler.
     * 
     * @param {Event} event 
     */
    handleUpdateSelectedColor(event) {
        this._selectedColor = event.detail.color;
    }

    /**
     * Updated color event dispatcher.
     * 
     * @param {string} color 
     */
    dispatchUpdateColorEventWithColor(color) {
        /**
         * Event that fires when updating the color value.
         * 
         * @event
         * @name updatecolor
         * @param {string} color
         * @composed
         * @bubbles 
         */
        this.dispatchEvent(
            // eslint-disable-next-line lightning-global/no-custom-event-bubbling
            new CustomEvent('updatecolor', {
                composed: true,
                bubbles: true,
                detail: { color }
            })
        );
    }

    /**
     * Handle Click on done.
     */
    handleDoneClick() {
        this.dispatchUpdateColorEventWithColor(this._selectedColor);
    }

    /**
     * Handle Click on cancel.
     */
    handleCancelClick() {
        this.dispatchUpdateColorEventWithColor(this.currentColor);
    }

    /**
     * Handle Keydown event.
     * 
     * @param {Event} event 
     */
    handleKeydown(event) {
        if (event.keyCode === keyCodes.escape) {
            event.preventDefault();
            this.dispatchUpdateColorEventWithColor(this.currentColor);
        } else if (
            event.shiftKey &&
            event.keyCode === keyCodes.tab &&
            event.target.dataset.id === 'color-anchor'  
        ) {
            event.preventDefault();
            this.template.querySelector('button[name="done"]').focus();
        } else if (
            !event.shiftKey &&
            event.keyCode === keyCodes.tab &&
            event.target.name === 'done'
        ) {
            event.preventDefault();
            this.template.querySelector('c-color-picker-custom').focus();
        }
    }
}
