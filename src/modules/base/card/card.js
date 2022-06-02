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
import { classSet, generateUUID } from 'c/utils';
import { normalizeObject, normalizeString } from '../utilsPrivate/normalize';

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
    _avatar;
    _title;
    _mediaPosition;

    showTitleSlot = false;
    showMediaSlot = false;
    showMediaActionSlot = false;
    showActionSlot = false;
    showDefaultSlot = false;
    showFooterSlot = false;
    _showMedia = false;

    connectedCallback() {}

    renderedCallback() {
        console.log(this.mediaSlot);
        if (this.titleSlot) {
            this.showTitleSlot = this.titleSlot.assignedElements().length !== 0;
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
                this.defaultSlot.assignedElements().length !== 0;
        }
        if (this.footerSlot) {
            this.showFooterSlot =
                this.footerSlot.assignedElements().length !== 0;
        }

        this._showMedia = !!this.mediaSrc || this.showMediaSlot;
        console.log(this.mediaSrc, this.showMediaSlot);
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
        return this.template.querySelector('slot[name=media-actions]');
    }

    /**
     * Get the actions slot DOM element.
     *
     * @type {Element}
     */
    get actionSlot() {
        return this.template.querySelector('slot[name=actions]');
    }

    // /**
    //  * Get the actions slot DOM element.
    //  *
    //  * @type {Element}
    //  */
    // get actionsSlot() {
    //     return this.template.querySelector('slot[name=actions]');
    // }

    // /**
    //  * Get the actions slot DOM element.
    //  *
    //  * @type {Element}
    //  */
    // get actionsSlot() {
    //     return this.template.querySelector('slot[name=actions]');
    // }

    // PROPS //

    /**
     * Title
     *
     * @type {string}
     * @public
     */
    @api
    get title() {
        return this._title;
    }

    set title(value) {
        this._title = normalizeString(value);
    }

    /**
     * Source for the image or media
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
     * Image position in the card. Valid values are
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
     * Avatar object
     *
     * @type {object||object[]}
     * @public
     */
    @api
    get avatar() {
        return this._avatar;
    }

    set avatar(value) {
        if (!value) {
            this._avatar = null;
        } else {
            this._avatar = normalizeObject(value);
        }
    }

    // private

    /**
     * Generate unique ID key.
     */
    get generateKey() {
        return generateUUID();
    }

    get computedCardClasses() {
        return classSet('')
            .add({ 'image-top': this.mediaPosition === 'top' })
            .add({ 'image-left': this.mediaPosition === 'left' })
            .add({ 'image-right': this.mediaPosition === 'right' })
            .add({ 'image-center': this.mediaPosition === 'center' })
            .add({ 'image-bottom': this.mediaPosition === 'bottom' })
            .add({ background: this.mediaPosition === 'background' })
            .add({
                'background overlay-card': this.mediaPosition === 'overlay'
            })
            .add({
                'background-centered':
                    this.mediaPosition === 'background-center'
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

    get showCenterMedia() {
        return this.mediaPosition === 'center';
    }

    get showMedia() {
        return this._showMedia;
    }
}
