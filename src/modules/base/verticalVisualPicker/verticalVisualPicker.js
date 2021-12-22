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
import { normalizeBoolean, normalizeString } from 'c/utilsPrivate';

const ITEM_SIZES = {
    valid: ['small', 'medium', 'large', 'responsive'],
    default: 'medium'
};

const ITEM_TYPES = { valid: ['radio', 'checkbox'], default: 'radio' };

const ITEM_VARIANTS = {
    valid: ['coverable', 'non-coverable'],
    default: 'non-coverable'
};

const DEFAULT_DISABLED = false;
const DEFAULT_HIDE_CHECK_MARK = false;
const DEFAULT_REQUIRED = false;

/**
 * @class
 * @descriptor avonni-vertical-visual-picker
 * @storyId example-verticalvisualpicker--base
 * @public
 */
export default class VerticalVisualPicker extends LightningElement {
    /**
     * Array of item objects.
     *
     * @type {object[]}
     * @public
     */
    @api items = [];

    /**
     * Text label to title the visual picker.
     *
     * @type {string}
     * @public
     */
    @api label;

    /**
     * Optional message to be displayed when no checkbox is selected and the required attribute is set.
     *
     * @type {string}
     * @public
     */
    @api messageWhenValueMissing;

    /**
     * The name of the visual picker.
     *
     * @type {string}
     * @public
     * @required
     */
    @api name;

    _disabled = DEFAULT_DISABLED;
    _hideCheckMark = DEFAULT_HIDE_CHECK_MARK;
    _required = DEFAULT_REQUIRED;
    _size = ITEM_SIZES.default;
    _type = ITEM_TYPES.default;
    _variant = ITEM_VARIANTS.default;

    /**
     * If present, the virtual visual picker is disabled.
     *
     * @type {boolean}
     * @public
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
     * If present, hide the check mark.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get hideCheckMark() {
        return this._hideCheckMark;
    }

    set hideCheckMark(value) {
        this._hideCheckMark = normalizeBoolean(value);
    }

    /**
     * If present, at least one item must be selected.
     *
     * @type {boolean}
     * @public
     * @default false
     */
    @api
    get required() {
        return this._required;
    }

    set required(value) {
        this._required = normalizeBoolean(value);
    }

    /**
     * The size of the items. Valid values include xx-small, x-small, small, medium and large.
     *
     * @type {string}
     * @public
     * @default medium
     */
    @api get size() {
        return this._size;
    }

    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: ITEM_SIZES.default,
            validValues: ITEM_SIZES.valid
        });
    }

    /**
     * Valid values include radio and checkbox.
     *
     * @type {string}
     * @public
     * @default radio
     */
    @api get type() {
        return this._type;
    }

    set type(type) {
        this._type = normalizeString(type, {
            fallbackValue: ITEM_TYPES.default,
            validValues: ITEM_TYPES.valid
        });
    }

    /**
     * Changes the appearance of the vertical visual picker. Valid values include coverable and non-coverable.
     *
     * @type {string}
     * @public
     * @default non-coverable
     */
    @api get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: ITEM_VARIANTS.default,
            validValues: ITEM_VARIANTS.valid
        });
    }
}
