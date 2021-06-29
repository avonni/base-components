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

import { LightningElement, api, track } from 'lwc';
import { classSet } from 'c/utils';
import { classListMutation } from 'c/utilsPrivate';

const DEFAULT_ALIGN = {
    horizontal: 'left',
    vertical: 'bottom',
};

export default class PrimitiveBubble extends LightningElement {
    @track
    state = {
        visible: false,
        contentId: '',
    };

    divElement;

    @api
    get contentId() {
        return this.state.contentId;
    }

    set contentId(value) {
        this.state.contentId = value;

        if (this.state.inDOM) {
            this.divEl.setAttribute('id', this.state.contentId);
        }
    }

    connectedCallback() {
        this.updateClassList();
        this.setAttribute('role', 'tooltip');
        this.state.inDOM = true;
    }

    disconnectedCallback() {
        this.state.inDOM = false;
    }

    renderedCallback() {
        // set content manually once rendered
        // - this is required to avoid the content update being in the wrong 'tick'
        this.setContentManually();
        this.setIdManually();
    }

    set content(value) {
        this.state.content = value;

        if (this.state.inDOM) {
            this.setContentManually();
        }
    }

    @api
    get content() {
        return this.state.content || '';
    }

    @api
    get align() {
        return this.state.align || DEFAULT_ALIGN;
    }
    set align(value) {
        this.state.align = value;
        this.updateClassList();
    }

    @api
    get visible() {
        return this.state.visible;
    }

    set visible(value) {
        this.state.visible = value;
        this.updateClassList();
    }

    setIdManually() {
        this.divElement = this.divElement
            ? this.divElement
            : this.template.querySelector('div');
        this.divElement.setAttribute('id', this.state.contentId);
    }

    // manually set the content value
    setContentManually() {
        /* manipulate DOM directly */
        this.template.querySelector(
            '.slds-popover__body'
        ).textContent = this.state.content;
    }

    // compute class value for this bubble
    updateClassList() {
        const classes = classSet('slds-popover').add('slds-popover_tooltip');

        // show or hide bubble
        classes.add({
            'slds-rise-from-ground': this.visible,
            'slds-fall-into-ground': !this.visible,
        });

        // apply the proper nubbin CSS class
        const { horizontal, vertical } = this.align;
        classes.add({
            'slds-nubbin_top-left': horizontal === 'left' && vertical === 'top',
            'slds-nubbin_top-right':
                horizontal === 'right' && vertical === 'top',
            'slds-nubbin_bottom-left':
                horizontal === 'left' && vertical === 'bottom',
            'slds-nubbin_bottom-right':
                horizontal === 'right' && vertical === 'bottom',
            'slds-nubbin_bottom':
                horizontal === 'center' && vertical === 'bottom',
            'slds-nubbin_top': horizontal === 'center' && vertical === 'top',
            'slds-nubbin_left': horizontal === 'left' && vertical === 'center',
            'slds-nubbin_right':
                horizontal === 'right' && vertical === 'center',
        });

        classListMutation(this.classList, classes);
    }

    handleMouseLeave() {
        this.visible = false;
    }
}
