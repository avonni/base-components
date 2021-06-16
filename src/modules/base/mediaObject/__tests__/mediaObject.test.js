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

import { createElement } from 'lwc';
import MediaObject from 'c/mediaObject';

describe('MediaObject', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });

        expect(element.verticalAlign).toBe('start');
        expect(element.responsive).toBeFalsy();
        expect(element.inline).toBeFalsy();
        expect(element.size).toBe('medium');
    });

    // vertical-align
    it('verticalAlign = start', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.verticalAlign = 'start';
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-media_center');
            expect(wrapper.classList).not.toContain(
                'avonni-media-object-alignement-end'
            );
        });
    });

    it('verticalAlign = center', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.verticalAlign = 'center';
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain('slds-media_center');
            expect(wrapper.classList).not.toContain(
                'avonni-media-object-alignement-end'
            );
        });
    });

    it('verticalAlign = end', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.verticalAlign = 'end';
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-media_center');
            expect(wrapper.classList).toContain(
                'avonni-media-object-alignement-end'
            );
        });
    });

    // responsive
    it('responsive = false', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.responsive = false;
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-media_responsive');
        });
    });

    it('responsive = true', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.responsive = true;
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain('slds-media_responsive');
        });
    });

    // inline
    it('inline = false', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.inline = false;
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain(
                'avonni-media-object-display-inline'
            );
        });
    });

    it('inline = true', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.inline = true;
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain(
                'avonni-media-object-display-inline'
            );
        });
    });

    // size
    it('size = medium', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.size = 'medium';
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-media_small');
            expect(wrapper.classList).not.toContain('slds-media_large');
        });
    });

    it('size = small', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.size = 'small';
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain('slds-media_small');
            expect(wrapper.classList).not.toContain('slds-media_large');
        });
    });

    it('size = large', () => {
        const element = createElement('base-media-object', {
            is: MediaObject
        });
        document.body.appendChild(element);

        element.size = 'large';
        const wrapper = element.shadowRoot.querySelector('.slds-media');

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-media_small');
            expect(wrapper.classList).toContain('slds-media_large');
        });
    });
});
