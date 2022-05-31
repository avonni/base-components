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
import { normalizeArray, normalizeString } from '../utilsPrivate/normalize';

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
    _description;
    _href;
    _title;
    _mediaPosition;
    _backgroundImage;

    // how many actions position should there be...
    // array of
    actionPositions = new Array();
    titleActions = new Array();
    imageTopRightActions = new Array();

    renderedCallback() {}

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
    get mediaActionsSlot() {
        return this.template.querySelector('slot[name=media-actions]');
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
     * Href link for the title.
     *
     * @type {string}
     * @public
     */
    @api
    get href() {
        return this._href;
    }

    set href(value) {
        this._href = normalizeString(value);
    }

    /**
     * Card content text.
     *
     * @type {string}
     * @public
     */
    @api
    get description() {
        return this._description;
    }

    set description(value) {
        this._description = normalizeString(value);
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
     * Actions.
     *
     * @type {object||object[]}
     * @public
     */
    @api
    get actions() {
        return this._actions;
    }

    set actions(value) {
        this._actions = normalizeArray(value);
        this.sortActions(this._actions);
    }

    sortActions(actions) {
        actions.forEach((action) => {
            switch (action.position) {
                case 'title':
                    this.titleActions.push(action);
                    break;
                case 'image-top-right':
                    this.imageTopRightActions.push(action);
                    break;
                default:
                    break;
            }
        });
    }

    /**
     * Icons to be displayed beside the title.
     *
     * @type {string[]}
     * @public
     * @default
     */
    @api
    get icons() {
        return this._icons;
    }

    set icons(value) {
        // normalize...
        this._icons = value;
    }

    /**
     * Infos to appear as tags or links.
     *
     * @type {object[]}
     * @public
     * @default
     */
    @api
    get infos() {
        return this._infos;
    }

    set infos(value) {
        // normalize...
        this._infos = value;
    }

    /**
     * Image link for the main image.
     *
     * @type {string}
     * @default ''
     * @public
     */
    @api
    get imageSrc() {
        return this._imageSrc;
    }

    set imageSrc(value) {
        this._imageSrc = normalizeString(value);
    }

    // private

    get hasActions() {
        console.log(this.actions.length);
        return true;
    }

    /**
     * Generate unique ID key.
     */
    get generateKey() {
        return generateUUID();
    }

    get hasAction() {
        return false;
    }

    get computedCardClasses() {
        if (!this.imageSrc) return '';

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
        return !!this.imageSrc;
    }
}
