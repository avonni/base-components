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
import Splitter from 'c/splitter';

describe('Splitter', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-splitter', {
            is: Splitter
        });

        expect(element.orientation).toBe('horizontal');
    });

    /* ----- ATTRIBUTES ----- */

    // orientation
    it('orientation = horizontal', () => {
        const element = createElement('base-splitter', {
            is: Splitter
        });

        document.body.appendChild(element);
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('div');
            expect(wrapper.classList).not.toContain(
                'splitter-orientation-vertical'
            );
            expect(wrapper.classList).toContain(
                'splitter-orientation-horizontal'
            );
        });
    });

    it('orientation = vertical', () => {
        const element = createElement('base-splitter', {
            is: Splitter
        });

        document.body.appendChild(element);
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('div');
            expect(wrapper.classList).toContain(
                'splitter-orientation-vertical'
            );
            expect(wrapper.classList).not.toContain(
                'splitter-orientation-horizontal'
            );
        });
    });

    /* ----- METHODS ----- */

    // changeHeight
    it('changeHeight method', () => {
        const element = createElement('base-splitter', {
            is: Splitter
        });

        document.body.appendChild(element);
        element.changeHeight(300);

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('div');
            expect(wrapper.style.height).toBe('300px');
        });
    });
});
