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
import SegmentButton from 'c/segmentButton';

describe('SegmentButton', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-segment-button', {
            is: SegmentButton
        });

        expect(element.disabled).toBeFalsy();
        expect(element.iconName).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.prefixIconName).toBeUndefined();
        expect(element.type).toBe('button');
        expect(element.value).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // disabled
    it('disabled = false', () => {
        const element = createElement('base-segment-button', {
            is: SegmentButton
        });

        document.body.appendChild(element);

        element.disabled = false;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.disabled).toBeFalsy();
        });
    });

    it('disabled = true', () => {
        const element = createElement('base-segment-button', {
            is: SegmentButton
        });

        document.body.appendChild(element);

        element.disabled = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.disabled).toBeTruthy();
        });
    });

    // icon-name
    it('iconName', () => {
        const element = createElement('base-segment-button', {
            is: SegmentButton
        });

        document.body.appendChild(element);

        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // label
    it('label', () => {
        const element = createElement('base-segment-button', {
            is: SegmentButton
        });

        document.body.appendChild(element);

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.textContent).toBe('A string label');
        });
    });

    // prefix-icon-name
    it('prefixIconName', () => {
        const element = createElement('base-segment-button', {
            is: SegmentButton
        });

        document.body.appendChild(element);

        element.prefixIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // prefix-icon-name and icon-name
    it('prefixIconName and iconName', () => {
        const element = createElement('base-segment-button', {
            is: SegmentButton
        });

        document.body.appendChild(element);

        element.prefixIconName = 'utility:apps';
        element.iconName = 'utility:user';

        return Promise.resolve().then(() => {
            const icons = element.shadowRoot.querySelectorAll('lightning-icon');
            expect(icons[0].iconName).toBe('utility:apps');
            expect(icons[1].iconName).toBe('utility:user');
        });
    });

    // type
    it('type', () => {
        const element = createElement('base-segment-button', {
            is: SegmentButton
        });

        document.body.appendChild(element);

        element.type = 'reset';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.type).toBe('reset');
        });
    });

    // value
    it('value', () => {
        const element = createElement('base-segment-button', {
            is: SegmentButton
        });

        document.body.appendChild(element);

        element.value = 'a-string-value';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.value).toBe('a-string-value');
        });
    });

    /* ----- METHODS ----- */

    // disableButton
    it('disableButton method', () => {
        const element = createElement('base-segment-button', {
            is: SegmentButton
        });

        document.body.appendChild(element);

        expect(element.disabled).toBeFalsy();
        element.disableButton();

        return Promise.resolve().then(() => {
            expect(element.disabled).toBeTruthy();
        });
    });

    /* ----- EVENTS ----- */

    // click
    // Depends on value
    it('click event', () => {
        const element = createElement('base-segment-button', {
            is: SegmentButton
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('click', handler);
        element.value = 'a-string-value';

        const button = element.shadowRoot.querySelector('button');
        button.click();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.value).toBe('a-string-value');
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });
});
