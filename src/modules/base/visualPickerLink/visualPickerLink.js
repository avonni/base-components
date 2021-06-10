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
import { classSet } from 'c/utils';
import visualPickerLink from './visualPickerLink.html';
import visualPickerLinkInfoOnly from './visualPickerLinkInfoOnly.html';

const validIconPositions = ['left', 'right'];

export default class VisualPickerLink extends LightningElement {
    @api iconName;
    @api title;
    @api href;

    _iconPosition = 'left';
    _completed = false;
    _infoOnly = false;
    showTitle = true;

    render() {
        return this._infoOnly ? visualPickerLinkInfoOnly : visualPickerLink;
    }

    renderedCallback() {
        if (this.titleSlot) {
            this.showTitle = this.titleSlot.assignedElements().length !== 0;
        }
    }

    get titleSlot() {
        return this.template.querySelector('slot[name=title]');
    }

    @api get iconPosition() {
        return this._iconPosition;
    }

    set iconPosition(iconPosition) {
        this._iconPosition = normalizeString(iconPosition, {
            fallbackValue: 'left',
            validValues: validIconPositions
        });
    }

    @api get completed() {
        return this._completed;
    }

    set completed(value) {
        this._completed = normalizeBoolean(value);
    }

    @api get infoOnly() {
        return this._infoOnly;
    }

    set infoOnly(value) {
        this._infoOnly = normalizeBoolean(value);
    }

    get computedContainerClass() {
        return classSet('slds-welcome-mat__tile')
            .add({
                'slds-welcome-mat__tile_complete':
                    this._completed && !this._infoOnly,
                'slds-welcome-mat__tile_info-only': this._infoOnly
            })
            .toString();
    }

    get computedTileBodyClass() {
        return classSet('slds-welcome-mat__tile-body')
            .add({
                'avonni-welcome-mat__tile-body-right':
                    this._iconPosition === 'right',
                'avonni-welcome-mat__tile-no-icon': !this.iconName
            })
            .toString();
    }

    get computedIconContainerClass() {
        return classSet(
            'slds-media__figure slds-media__figure_fixed-width slds-align_absolute-center'
        )
            .add({
                'avonni-media__figure-right': this._iconPosition === 'right'
            })
            .toString();
    }

    get leftPosition() {
        return this._iconPosition === 'left';
    }

    handleClick() {
        this.dispatchEvent(new CustomEvent('click'));
    }
}
