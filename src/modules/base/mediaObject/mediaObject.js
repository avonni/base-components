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
import { normalizeString, normalizeBoolean } from 'c/utilsPrivate';
import { classSet } from 'c/utils';

const validSizes = ['small', 'medium', 'large'];
const validVerticalAlignement = ['center', 'start', 'end'];

export default class MediaObject extends LightningElement {
    _verticalAlign = 'start';
    _responsive = false;
    _inline = false;
    _size = 'medium';
    _rendered = false;

    showFigureSlot = true;
    showFigureInverseSlot = true;

    renderedCallback() {
        if (!this._rendered) {
            this._rendered = true;

            this.showFigureSlot =
                this.figureSlot &&
                this.figureSlot.assignedElements() &&
                this.figureSlot.assignedElements().length > 0;

            this.showFigureInverseSlot =
                this.figureInverseSlot &&
                this.figureInverseSlot.assignedElements() &&
                this.figureInverseSlot.assignedElements().length > 0;
        }
    }

    get figureSlot() {
        return this.template.querySelector('slot[name=figure]');
    }

    get figureInverseSlot() {
        return this.template.querySelector('slot[name=figure-inverse]');
    }

    @api
    get verticalAlign() {
        return this._verticalAlign;
    }

    set verticalAlign(verticalAlign) {
        this._verticalAlign = normalizeString(verticalAlign, {
            fallbackValue: 'start',
            validValues: validVerticalAlignement
        });
    }

    @api
    get responsive() {
        return this._responsive;
    }

    set responsive(value) {
        this._responsive = normalizeBoolean(value);
    }

    @api
    get inline() {
        return this._inline;
    }

    set inline(value) {
        this._inline = normalizeBoolean(value);
    }

    @api get size() {
        return this._size;
    }

    set size(size) {
        this._size = normalizeString(size, {
            fallbackValue: 'medium',
            validValues: validSizes
        });
    }

    get mediaObjectClass() {
        return classSet('slds-media')
            .add({
                'slds-media_small': this._size === 'small',
                'slds-media_large': this._size === 'large',
                'slds-media_center': this._verticalAlign === 'center',
                'avonni-media-object-alignement-end':
                    this._verticalAlign === 'end',
                'slds-media_responsive': this._responsive === true,
                'avonni-media-object-display-inline': this._inline === true
            })
            .toString();
    }
}
