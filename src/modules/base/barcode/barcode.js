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

import { LightningElement } from 'lwc';

const SYMBOLOGY = {
    valid: [
        'EAN8',
        'EAN13',
        'UPCE',
        'UPCA',
        'Code11',
        'Code39',
        'Code39Extended',
        'Code93',
        'Code93Extended',
        'Code128',
        'Code128A',
        'Code128B',
        'Code128C',
        'GS1-128',
        'MSImod10',
        'MSImod11',
        'MSImod1010',
        'MSImod1110',
        'POSTNET'
    ],
    default: 'Code39'
};

const RENDERING_ENGINE = {
    valid: ['canvas', 'svg'],
    default: 'svg'
};

const DEFAULT_BACKGROUND = 0xfff;
const DEFAULT_SIZE = 300;
const DEFAULT_HIDE_VALUE = false;
const DEFAULT_CHECKSUM = false;
const DEFAULT_TEXT_COLOR = 0x000000;

/**
 * @class
 * @name Barcode
 * @descriptor avonni-barcode
 * @storyId example-barcode--base
 * @public
 */
export default class Barcode extends LightningElement {
    _background = DEFAULT_BACKGROUND;
    _color;
    _renderAs = RENDERING_ENGINE.default;
    _size = DEFAULT_SIZE;
    _value;
    _hideValue = DEFAULT_HIDE_VALUE;
    _checksum = DEFAULT_CHECKSUM;
    _textColor = DEFAULT_TEXT_COLOR;
    _type = SYMBOLOGY.default;
}
