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
import { normalizeString } from '../utilsPrivate/normalize';

const MEDIA_POSITIONS = {
    valid: [
        'left',
        'right',
        'top',
        'bottom',
        'center',
        'background',
        'overlay'
    ],
    default: 'top'
};

export default class Card extends LightningElement {
    _iconName;
    _title;
    _mediaPosition = 'top';
    _showMedia = false;

    showTitleSlot = false;
    showMediaSlot = false;
    showMediaActionSlot = false;
    showActionSlot = false;
    showDefaultSlot = false;
    showFooterSlot = false;
    _isEmptyCard = true;

    connectedCallback() {}

    renderedCallback() {
        if (this.titleSlot) {
            this.showTitleSlot =
                this.titleSlot.assignedElements().length !== 0 &&
                !this.hasStringTitle;
        }
        if (this.mediaSlot) {
            this.showMediaSlot = this.mediaSlot.assignedElements().length !== 0;
        }
        if (this.mediaActionSlot) {
            this.showMediaActionSlot =
                this.mediaActionSlot.assignedElements().length !== 0;
        }
        if (this.actionSlot) {
            this.showActionSlot =
                this.actionSlot.assignedElements().length !== 0;
        }
        if (this.defaultSlot) {
            this.showDefaultSlot =
                this.defaultSlot.assignedElements().length !== 0 ||
                this.defaultSlot.innerText.trim().length !== 0;
        }
        if (this.footerSlot) {
            this.showFooterSlot =
                this.footerSlot.assignedElements().length !== 0;
        }

        console.log(this.showTitleSlot, this.hasStringTitle);

        // if there is nothing in the card, show the default slot
        this._isEmptyCard =
            !this.showTitleSlot &&
            !this.showMediaSlot &&
            !this.showMediaActionSlot &&
            !this.showActionSlot &&
            !this.showDefaultSlot &&
            !this.showFooterSlot &&
            !this._iconName &&
            !this._mediaSrc &&
            !this._title;

        this._showMedia = !!this.mediaSrc || this.showMediaSlot;
    }

    /**
     * Get the title slot DOM element.
     *
     * @type {Element}
     */
    get titleSlot() {
        return this.template.querySelector('slot[name=title]');
    }

    // SLOTS //

    /**
     * Get the media slot DOM element.
     *
     * @type {Element}
     */
    get mediaSlot() {
        return this.template.querySelector('slot[name=media]');
    }

    /**
     * Get the media actions slot DOM element.
     *
     * @type {Element}
     */
    get mediaActionSlot() {
        return this.template.querySelector('slot[name=media-action]');
    }

    /**
     * Get the actions slot DOM element.
     *
     * @type {Element}
     */
    get actionSlot() {
        return this.template.querySelector('slot[name=action]');
    }

    /**
     * Get the footer slot DOM element.
     *
     * @type {Element}
     */
    get footerSlot() {
        return this.template.querySelector('slot[name=footer]');
    }

    /**
     * Get the actions slot DOM element.
     *
     * @type {Element}
     */
    get defaultSlot() {
        return this.template.querySelector('slot:not([name])');
    }
    /*
     * -------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */

    /**
     * The title in the header of the card, right of the icon. The title attribute supersedes the title slot.
     *
     * @type {string}
     * @public
     */
    @api
    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    /**
     * Source for the image or media.
     *
     * @type {string}
     * @public
     */
    @api
    get mediaSrc() {
        return this._mediaSrc;
    }

    set mediaSrc(value) {
        this._mediaSrc = normalizeString(value);
    }

    /**
     * Position of the media relative to the card.
     * Valid values are "top", "center", "left", "right", "bottom", "background", and "overlay". Defaults to "top".
     *
     * @type {string}
     * @public
     */
    @api
    get mediaPosition() {
        return this._mediaPosition;
    }

    set mediaPosition(value) {
        this._mediaPosition = normalizeString(value, {
            fallbackValue: MEDIA_POSITIONS.default,
            validValues: MEDIA_POSITIONS.valid
        });
    }

    /**
     * The Lightning Design System name displayed left of the title in the header.
     * Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.
     *
     * @type {string}
     * @public
     */
    @api
    get iconName() {
        return this._iconName;
    }

    set iconName(value) {
        this._iconName = normalizeString(value);
    }

    /*
     * -------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */
    get computedCardClasses() {
        return classSet('avonni-card__body-container')
            .add({
                'avonni-card__media-top avonni-card__media-top-left-radius avonni-card__media-top-right-radius':
                    this.mediaPosition === 'top'
            })
            .add({
                'avonni-card__media-left avonni-card__media-top-left-radius':
                    this.mediaPosition === 'left'
            })
            .add({
                'avonni-card__media-right avonni-card__media-top-right-radius':
                    this.mediaPosition === 'right'
            })
            .add({
                'avonni-card__media-center': this.mediaPosition === 'center'
            })
            .add({
                'avonni-card__media-top-left-radius avonni-card__media-top-right-radius':
                    this.mediaPosition === 'center' && !this.hasHeader
            })
            .add({
                'avonni-card__media-bottom': this.mediaPosition === 'bottom'
            })
            .add({
                'avonni-card__media-background avonni-card__media-top-left-radius avonni-card__media-top-right-radius':
                    this.mediaPosition === 'background'
            })
            .add({
                'avonni-card__media-overlay avonni-card__media-top-left-radius avonni-card__media-top-right-radius':
                    this.mediaPosition === 'overlay'
            })
            .add({
                'avonni-card__media-bottom-left-radius':
                    !this.showFooterSlot &&
                    (this.mediaPosition === 'left' ||
                        this.mediaPosition === 'background' ||
                        this.mediaPosition === 'overlay' ||
                        this.mediaPosition === 'bottom' ||
                        (this.mediaPosition === 'center' &&
                            !this.showDefaultSlot))
            })
            .add({
                'avonni-card__media-bottom-right-radius':
                    !this.showFooterSlot &&
                    (this.mediaPosition === 'right' ||
                        this.mediaPosition === 'background' ||
                        this.mediaPosition === 'overlay' ||
                        this.mediaPosition === 'bottom' ||
                        (this.mediaPosition === 'center' &&
                            !this.showDefaultSlot))
            })
            .toString();
    }

    /**
     * Apply bottom border
     *
     * @type {boolean}
     */
    get hasBottomBorder() {
        if (
            this.mediaPosition === 'top' &&
            (this.showFooterSlot || this.showDefaultSlot || this.hasHeader)
        ) {
            return true;
        }
        if (
            this.mediaPosition === 'center' &&
            (this.showFooterSlot || this.showDefaultSlot)
        ) {
            return true;
        }
        return false;
    }

    /**
     * Apply top border
     *
     * @type {boolean}
     */
    get hasTopBorder() {
        if (
            (this.mediaPosition === 'bottom' ||
                this.mediaPosition === 'center') &&
            this.hasHeader
        ) {
            return true;
        }
        return false;
    }

    /**
     * Is the header present?
     *
     * @type {boolean}
     */
    get hasHeader() {
        return (
            this.showTitleSlot ||
            this.hasStringTitle ||
            !!this.iconName ||
            this.showActionSlot
        );
    }

    /**
     * Is card empty?
     *
     * @type {boolean}
     */
    get isEmptyCard() {
        return this._isEmptyCard;
    }

    set isEmptyCard(value) {
        this._isEmptyCard = value;
    }

    /**
     * Media container classes
     *
     * @type {string}
     */
    get computedMediaClasses() {
        return classSet('avonni-card__media-container')
            .add({ 'slds-hide': !this.showMedia })
            .add({
                'avonni-card__media-top-right-radius':
                    this.roundMediaTopRightCorder
            })
            .add({
                'avonni-card__media-top-left-radius':
                    this.roundMediaTopLeftCorder
            })
            .add({
                'avonni-card__media-bottom-right-radius':
                    this.roundMediaBottomRightCorder
            })
            .add({
                'avonni-card__media-bottom-left-radius':
                    this.roundMediaBottomLeftCorder
            })
            .add({ 'avonni-card__media-border-bottom': this.hasBottomBorder })
            .add({ 'avonni-card__media-border-top': this.hasTopBorder })
            .add({
                'avonni-card__media-border-left': this.mediaPosition === 'right'
            })
            .add({
                'avonni-card__media-border-right': this.mediaPosition === 'left'
            })
            .toString();
    }

    get computedHeaderClasses() {
        return classSet('slds-grid slds-has-flexi-truncate avonni-card__header')
            .add({ 'slds-hide': !this.hasHeader && !this.isEmptyCard })
            .toString();
    }

    get computedFooterClasses() {
        return classSet('avonni-card__footer')
            .add({ 'slds-hide': !this.showFooterSlot })
            .toString();
    }

    get computedDefaultSlotClasses() {
        return classSet('avonni-card__default-slot')
            .add({
                'slds-hide':
                    this.mediaPosition === 'center' ||
                    (!this.showDefaultSlot && !this.isEmptyCard)
            })
            .toString();
    }

    get computedCenterDefaultSlotClasses() {
        return classSet('avonni-card__center-default-slot')
            .add({
                'slds-hide':
                    !this.showDefaultSlot ||
                    !this.showMedia ||
                    this.mediaPosition !== 'center'
            })
            .toString();
    }

    /**
     * Check if Title text is specified.
     *
     * @type {string}
     */
    get hasStringTitle() {
        return !!this.title;
    }

    get showMedia() {
        return this._showMedia;
    }
}
