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
import VerticalProgressStep from 'c/verticalProgressStep';

describe('VerticalProgressStep', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-vertical-progress-step', {
            is: VerticalProgressStep
        });

        expect(element.label).toBeUndefined();
        expect(element.value).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // label
    it('label', () => {
        const element = createElement('base-vertical-progress-step', {
            is: VerticalProgressStep
        });

        document.body.appendChild(element);

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-progress__item_content .slds-truncate'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // value
    it('value', () => {
        const element = createElement('base-vertical-progress-step', {
            is: VerticalProgressStep
        });

        document.body.appendChild(element);

        element.value = 'a-string-value';

        return Promise.resolve().then(() => {
            expect(element.dataset.step).toBe('a-string-value');
        });
    });

    /* ----- EVENTS ----- */

    // stepmouseenter
    // Depends on value
    it('stepmouseenter event', () => {
        const element = createElement('base-vertical-progress-step', {
            is: VerticalProgressStep
        });

        document.body.appendChild(element);

        element.value = 'a-string-value';
        const handler = jest.fn();
        element.addEventListener('stepmouseenter', handler);
        const marker = element.shadowRoot.querySelector(
            '.slds-progress__marker'
        );
        marker.dispatchEvent(new CustomEvent('mouseenter'));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.value).toBe('a-string-value');
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });

    // stepmouseleave
    // Depends on value
    it('stepmouseleave event', () => {
        const element = createElement('base-vertical-progress-step', {
            is: VerticalProgressStep
        });

        document.body.appendChild(element);

        element.value = 'a-string-value';
        const handler = jest.fn();
        element.addEventListener('stepmouseleave', handler);
        const marker = element.shadowRoot.querySelector(
            '.slds-progress__marker'
        );
        marker.dispatchEvent(new CustomEvent('mouseleave'));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.value).toBe('a-string-value');
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });

    // stepblur
    // Depends on value
    it('stepblur event', () => {
        const element = createElement('base-vertical-progress-step', {
            is: VerticalProgressStep
        });

        document.body.appendChild(element);

        element.value = 'a-string-value';
        const handler = jest.fn();
        element.addEventListener('stepblur', handler);
        const marker = element.shadowRoot.querySelector(
            '.slds-progress__marker'
        );
        marker.dispatchEvent(new CustomEvent('blur'));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.value).toBe('a-string-value');
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });

    // stepfocus
    // Depends on value
    it('stepfocus event', () => {
        const element = createElement('base-vertical-progress-step', {
            is: VerticalProgressStep
        });

        document.body.appendChild(element);

        element.value = 'a-string-value';
        const handler = jest.fn();
        element.addEventListener('stepfocus', handler);
        const marker = element.shadowRoot.querySelector(
            '.slds-progress__marker'
        );
        marker.dispatchEvent(new CustomEvent('focus'));

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.value).toBe('a-string-value');
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });
});
