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

const ILLUSTRATION_SIZES = { valid: ['small', 'large'], default: 'small' };

const ILLUSTRATION_VARIANTS = {
    valid: [
        'text-only',
        'going-camping',
        'gone_fishing',
        'maintenance',
        'desert',
        'open-road',
        'no-access',
        'no-connection',
        'not-available-in-lightning',
        'page-not-available',
        'walkthrough-not-available',
        'fishing-deals',
        'lake-mountain',
        'no-events',
        'no-events-2',
        'no-task',
        'no-task-2',
        'setup',
        'gone-fishing',
        'no-access-2',
        'no-content',
        'no-preview',
        'preview',
        'research'
    ],
    default: 'text-only'
};

/**
 * @class
 * @descriptor avonni-illustration
 * @storyId example-illustration--small-size
 * @public
 */
export default class Illustration extends LightningElement {
    /**
     * The illustration title.
     *
     * @type {string}
     * @public
     */
    @api title;
    _size = ILLUSTRATION_SIZES.default;
    _variant = ILLUSTRATION_VARIANTS.default;

    /**
     * The variant types of illustrations.
     *
     * @type {string}
     * @public
     * @default text-only
     */
    @api
    get variant() {
        return this._variant;
    }

    set variant(variant) {
        this._variant = normalizeString(variant, {
            fallbackValue: ILLUSTRATION_VARIANTS.default,
            validValues: ILLUSTRATION_VARIANTS.valid
        });
    }

    /**
     * The illustration sizes. Valid options include 'small', 'large'.
     *
     * @type {string}
     * @public
     * @default small
     */
    @api
    get size() {
        return this._size;
    }

    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: ILLUSTRATION_SIZES.default,
            validValues: ILLUSTRATION_SIZES.valid
        });
    }

    /**
     * Illustration class styling.
     *
     * @type {string}
     */
    get illustrationClass() {
        return classSet('slds-illustration')
            .add({
                'slds-illustration_small': this._size === 'small',
                'slds-illustration_large': this._size === 'large'
            })
            .toString();
    }

    /**
     * Assign variant to svg URL.
     *
     * @type {string}
     */
    get svgURL() {
        return `/assets/canvas-elements/illustrationLibrary/${this.variant}.svg`;
    }

    /**
     * Show Illustration SVG.
     *
     * @type {boolean}
     */
    get showSvg() {
        return this._variant !== 'text-only';
    }
}
