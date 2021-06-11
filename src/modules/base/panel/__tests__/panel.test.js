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
import Panel from 'c/panel';

describe('Panel', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-panel', {
            is: Panel
        });

        expect(element.position).toBe('right');
        expect(element.title).toBeUndefined();
        expect(element.size).toBe('medium');
    });

    /* ---- ATTRIBUTES ----- */

    // position
    it('position = right', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        element.position = 'right';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain('slds-panel_docked-right');
            expect(wrapper.classList).not.toContain('slds-panel_docked-left');
        });
    });

    it('position = left', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        element.position = 'left';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain('slds-panel_docked-left');
            expect(wrapper.classList).not.toContain('slds-panel_docked-right');
        });
    });

    // title
    it('title', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

        const title = element.shadowRoot.querySelector('h1');
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            expect(title.textContent).toContain('A string title');
        });
    });

    // size
    it('size = medium', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        element.size = 'medium';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-size_small');
            expect(wrapper.classList).toContain('slds-size_medium');
            expect(wrapper.classList).not.toContain('slds-size_large');
            expect(wrapper.classList).not.toContain('slds-size_x-large');
            expect(wrapper.classList).not.toContain('slds-size_full');
        });
    });

    it('size = small', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        element.size = 'small';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).toContain('slds-size_small');
            expect(wrapper.classList).not.toContain('slds-size_medium');
            expect(wrapper.classList).not.toContain('slds-size_large');
            expect(wrapper.classList).not.toContain('slds-size_x-large');
            expect(wrapper.classList).not.toContain('slds-size_full');
        });
    });

    it('size = large', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        element.size = 'large';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-size_small');
            expect(wrapper.classList).not.toContain('slds-size_medium');
            expect(wrapper.classList).toContain('slds-size_large');
            expect(wrapper.classList).not.toContain('slds-size_x-large');
            expect(wrapper.classList).not.toContain('slds-size_full');
        });
    });

    it('size = x-large', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        element.size = 'x-large';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-size_small');
            expect(wrapper.classList).not.toContain('slds-size_medium');
            expect(wrapper.classList).not.toContain('slds-size_large');
            expect(wrapper.classList).toContain('slds-size_x-large');
            expect(wrapper.classList).not.toContain('slds-size_full');
        });
    });

    it('size = full', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        element.size = 'full';

        return Promise.resolve().then(() => {
            expect(wrapper.classList).not.toContain('slds-size_small');
            expect(wrapper.classList).not.toContain('slds-size_medium');
            expect(wrapper.classList).not.toContain('slds-size_large');
            expect(wrapper.classList).not.toContain('slds-size_x-large');
            expect(wrapper.classList).toContain('slds-size_full');
        });
    });

    /* ---- METHODS ----- */

    // toggle
    it('method: toggle', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        expect(wrapper.classList).toContain('slds-is-hidden');

        element.toggle();

        return Promise.resolve()
            .then(() => {
                expect(wrapper.classList).toContain('slds-is-open');
                expect(wrapper.classList).not.toContain('slds-is-hidden');

                element.toggle();
            })
            .then(() => {
                expect(wrapper.classList).not.toContain('slds-is-open');
                expect(wrapper.classList).toContain('slds-is-hidden');
            });
    });

    // open and close
    it('methods: open and close', () => {
        const element = createElement('base-panel', {
            is: Panel
        });
        document.body.appendChild(element);

        const wrapper = element.shadowRoot.querySelector('.slds-panel');
        expect(wrapper.classList).toContain('slds-is-hidden');

        element.open();

        return Promise.resolve()
            .then(() => {
                expect(wrapper.classList).toContain('slds-is-open');
                expect(wrapper.classList).not.toContain('slds-is-hidden');

                element.close();
            })
            .then(() => {
                expect(wrapper.classList).not.toContain('slds-is-open');
                expect(wrapper.classList).toContain('slds-is-hidden');
            });
    });
});
