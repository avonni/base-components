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
import { normalizeBoolean } from 'c/utilsPrivate';

export default class WizardStep extends LightningElement {
    @api label;
    @api name;
    @api beforeChange = function () {
        return true;
    };
    @api beforeChangeErrorMessage;

    stepClass;
    _hidePreviousButton = false;
    _hideNextFinishButton = false;

    connectedCallback() {
        const stepRegister = new CustomEvent('wizardstepregister', {
            bubbles: true,
            detail: {
                callbacks: {
                    setClass: this.setClass,
                    beforeChange:
                        typeof this.beforeChange === 'function'
                            ? this.beforeChange.bind(this)
                            : null
                },
                name: this.name,
                label: this.label,
                hidePreviousButton: this.hidePreviousButton,
                hideNextFinishButton: this.hideNextFinishButton,
                beforeChangeErrorMessage: this.beforeChangeErrorMessage
            }
        });

        this.dispatchEvent(stepRegister);
    }

    setClass = (value) => {
        this.stepClass = value;
    };

    @api
    get hidePreviousButton() {
        return this._hidePreviousButton;
    }
    set hidePreviousButton(value) {
        this._hidePreviousButton = normalizeBoolean(value);
    }

    @api
    get hideNextFinishButton() {
        return this._hideNextFinishButton;
    }
    set hideNextFinishButton(value) {
        this._hideNextFinishButton = normalizeBoolean(value);
    }
}
