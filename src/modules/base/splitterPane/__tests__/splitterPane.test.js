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
import SplitterPane from 'c/splitterPane';

let element;
describe('SplitterPane', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-splitter-pane', {
            is: SplitterPane
        });
        document.body.appendChild(element);
    });

    it('Splitter pane: Default attributes', () => {
        expect(element.collapsed).toBeFalsy();
        expect(element.collapsedSize).toBeUndefined();
        expect(element.collapsible).toBeFalsy();
        expect(element.max).toBeUndefined();
        expect(element.min).toBeUndefined();
        expect(element.resizable).toBeFalsy();
        expect(element.scrollable).toBeFalsy();
        expect(element.size).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // collapsed
    it('Splitter pane: collapsed = false', () => {
        element.collapsed = false;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('collapsed')).toBe('false');
        });
    });

    it('Splitter pane: collapsed = true', () => {
        element.collapsed = true;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('collapsed')).toBe('true');
        });
    });

    // collapsed-size
    it('Splitter pane: collapsedSize', () => {
        element.collapsedSize = '100px';

        return Promise.resolve().then(() => {
            expect(element.getAttribute('collapsedSize')).toBe('100px');
        });
    });

    // collapsible
    it('Splitter pane: collapsible = false', () => {
        element.collapsible = false;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('collapsible')).toBe('false');
        });
    });

    it('Splitter pane: collapsible = true', () => {
        element.collapsible = true;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('collapsible')).toBe('true');
        });
    });

    // max
    it('Splitter pane: max', () => {
        element.max = '50%';

        return Promise.resolve().then(() => {
            expect(element.getAttribute('max')).toBe('50%');
        });
    });

    // min
    it('Splitter pane: min', () => {
        element.min = '300px';

        return Promise.resolve().then(() => {
            expect(element.getAttribute('min')).toBe('300px');
        });
    });

    // resizable
    it('Splitter pane: resizable = false', () => {
        element.resizable = false;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('resizable')).toBe('false');
        });
    });

    it('Splitter pane: resizable = true', () => {
        element.resizable = true;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('resizable')).toBe('true');
        });
    });

    // scrollable
    it('Splitter pane: scrollable = false', () => {
        element.scrollable = false;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('scrollable')).toBe('false');
        });
    });

    it('Splitter pane: scrollable = true', () => {
        element.scrollable = true;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('scrollable')).toBe('true');
        });
    });

    // size
    it('Splitter pane: size', () => {
        element.size = '40%';

        return Promise.resolve().then(() => {
            expect(element.getAttribute('size')).toBe('40%');
        });
    });
});
