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
    // classSet,
    generateUUID
} from 'c/utils';
import { normalizeString } from '../utilsPrivate/normalize';

export default class Card extends LightningElement {
    _description;
    _href;
    _title;
    _variant;

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
     * Card layout variant, horizontal or vertical.
     *
     * @type {string}
     * @public
     * @default vertical
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(value) {
        this._variant = normalizeString(value);
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
        // normalize...
        this._actions = value;
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

    get generateKey() {
        return generateUUID();
    }
}
