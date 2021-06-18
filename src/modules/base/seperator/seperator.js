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
import { normalizeString } from 'c/utilsPrivate';

const VALID_ALIGN_CONTENT_VARIANTS = {
    valid: ['start', 'center', 'end'],
    default: 'center'
};
const VALID_ICON_SIZES = {
    valid: ['xx-small', 'x-small', 'small', 'medium', 'large'],
    default: 'medium'
};
const VALID_ORIENTATIONS = {
    valid: ['horizontal', 'vertical'],
    default: 'horizontal'
};
const VALID_ICON_POSITIONS = { valid: ['left', 'right'], default: 'left' };

export default class Seperator extends LightningElement {
    @api label;
    @api iconName;

    _alignContent = VALID_ALIGN_CONTENT_VARIANTS;
    _iconSize = VALID_ICON_SIZES;
    _orientation = VALID_ORIENTATIONS;
    _iconPosition = VALID_ICON_POSITIONS;

    renderedCallback() {
        console.log(this.alignContent);
    }

    @api get alignContent() {
        return this._alignContent;
    }

    set alignContent(value) {
        this._alignContent = normalizeString(value, {
            fallbackValue: VALID_ALIGN_CONTENT_VARIANTS.default,
            validValues: VALID_ALIGN_CONTENT_VARIANTS.valid
        });
    }

    @api get iconSize() {
        return this._iconSize;
    }

    set iconSize(value) {
        this._iconSize = normalizeString(value, {
            fallbackValue: VALID_ICON_SIZES.default,
            validValues: VALID_ICON_SIZES.valid
        });
    }

    @api get orientation() {
        return this._orientation;
    }

    set orientation(value) {
        this._orientation = normalizeString(value, {
            fallbackValue: VALID_ORIENTATIONS.default,
            validValues: VALID_ORIENTATIONS.valid
        });
    }

    @api get iconPosition() {
        return this._iconPosition;
    }

    set iconPosition(value) {
        this._iconPosition = normalizeString(value, {
            fallbackValue: VALID_ICON_POSITIONS.default,
            validValues: VALID_ICON_POSITIONS.valid
        });
    }

    get avonniComputedContainerClass() {
        return classSet(
            'slds-grid slds-grid_vertical-align-center slds-gutters'
        ).toString();
    }

    get avonniComputedLineOneClass() {
        return classSet('avonni-seperator_line-one slds-col slds-border_bottom')
            .add({
                'slds-hide': this.alignContent === 'start'
            })
            .toString();
    }
    get avonniComputedLineTwoClass() {
        return classSet('avonni-seperator_line-two slds-col slds-border_bottom')
            .add({
                'slds-hide': this.alignContent === 'end'
            })
            .toString();
    }
    get avonniComputedContentClass() {
        return classSet(
            'slds-grid slds-grid_vertical-align-center slds-grid_align-center slds-p-around_x-small'
        ).toString();
    }
}
