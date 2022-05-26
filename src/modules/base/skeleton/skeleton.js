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
import { normalizeString } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const ANIMATION_VARIANTS = {
    valid: ['pulse', 'wave']
};

const SKELETON_VARIANTS = {
    valid: ['circular', 'rectangular', 'text'],
    default: 'text'
};

/**
 * @class
 * @name Skeleton
 * @public
 * @storyId example-skeleton--base
 * @descriptor avonni-skeleton
 */
export default class Skeleton extends LightningElement {
    _animation;
    _height;
    _variant = SKELETON_VARIANTS.default;
    _width;

    /*
     * ------------------------------------------------------------
     *  PUBLIC PROPERTIES
     * -------------------------------------------------------------
     */
    /**
     * The animation type changes the appearance of the skeleton. Valid values include pulse and wave.
     * @type {string}
     * @public
     */
    @api
    get animation() {
        return this._animation;
    }
    set animation(value) {
        this._animation = normalizeString(value, {
            fallbackValue: ANIMATION_VARIANTS.default,
            validValues: null
        });
    }

    /**
     * Height of the skeleton in em.
     * @type {number}
     * @public
     */
    @api
    get height() {
        return this._height;
    }
    set height(value) {
        const number = isNaN(parseInt(value, 10)) ? 100 : value;
        this._height = number;
    }

    /**
     * The variant changes the appearance of the skeleton. Valid values include circular, rectangular and text.
     * @type {string}
     * @default base
     * @public
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: SKELETON_VARIANTS.default,
            validValues: SKELETON_VARIANTS.valid
        });
    }

    /**
     * Width of the skeleton in em.
     * @type {number}
     * @public
     */
    @api
    get width() {
        return this._width;
    }
    set width(value) {
        const number = isNaN(parseInt(value, 10)) ? 100 : value;
        this._width = number;
    }

    /*
     * ------------------------------------------------------------
     *  PRIVATE PROPERTIES
     * -------------------------------------------------------------
     */
    /**
     * Wrapper div class, depending on the variant value.
     * @type {string}
     */
    get variantClass() {
        return classSet('avonni-skeleton__base')
            .add(`avonni-alert_${this._variant}`)
            .toString();
    }
}
