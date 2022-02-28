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
import { normalizeArray, keyCodes } from 'c/utilsPrivate';

export default class PrimitivePill extends LightningElement {
    @api href;
    @api label;
    @api name;

    _actions = [];
    _avatar;

    _focusedActions = false;

    connectedCallback() {
        this.addEventListener('keydown', this.handleKeyDown);
    }

    disconnectedCallback() {
        this.removeEventListener('keydown', this.handleKeyDown);
    }

    @api
    get actions() {
        return this._actions;
    }
    set actions(value) {
        this._actions = normalizeArray(value);
        this._focusedActions = false;
    }

    @api
    get avatar() {
        return this._avatar;
    }
    set avatar(value) {
        this._avatar = value instanceof Object ? value : null;
    }

    get labelLink() {
        return this.template.querySelector('[data-element-id="a-label"]');
    }

    get oneAction() {
        return this.actions.length === 1 && this.actions[0];
    }

    get severalActions() {
        return this.actions.length > 1;
    }

    @api
    focusLink() {
        if (this.labelLink) this.labelLink.focus();
    }

    handleActionClick(event) {
        const actionName =
            event.detail instanceof Object
                ? event.detail.value
                : event.currentTarget.value;

        this.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: actionName
                }
            })
        );
    }

    handleKeyDown = (event) => {
        if (
            event.keyCode === keyCodes.tab &&
            this.actions.length &&
            !this._focusedActions &&
            !event.shiftKey
        ) {
            event.preventDefault();
            event.stopPropagation();

            this._focusedActions = true;
            const actionElement = this.template.querySelector(
                '[data-group-name="action"]'
            );
            actionElement.focus();
        } else {
            this._focusedActions = false;
        }
    };

    handleLinkMouseDown(event) {
        // Prevent the link from being dragged,
        // to allow for dragging the whole item
        event.preventDefault();
    }

    stopPropagation(event) {
        event.stopPropagation();
    }
}
