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
import Publisher from 'c/publisher';

let element;
describe('Publisher', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-publisher', {
            is: Publisher
        });

        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.buttonLabel).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.placeholder).toBeUndefined();
        expect(element.value).toBeUndefined();
        expect(element.variant).toBe('base');
    });

    /* ----- ATTRIBUTES ----- */

    // button-label
    it('buttonLabel', () => {
        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');
            expect(button.label).toBe('A string label');
        });
    });

    // disabled
    // Depends on focus()
    it('disabled = false', () => {
        element.disabled = false;

        return Promise.resolve().then(() => {
            // The button should not be disabled by default
            const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');
            const input = element.shadowRoot.querySelector('[data-element-id="lightning-input"]');

            expect(input.disabled).toBeFalsy();
            expect(button.disabled).toBeFalsy();
        });
    });

    it('disabled = true', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');
            const input = element.shadowRoot.querySelector('[data-element-id="lightning-input"]');

            expect(input.disabled).toBeTruthy();
            expect(button.disabled).toBeTruthy();
        });
    });

    // placeholder
    // Depends on focus()
    it('placeholder', () => {
        element.placeholder = 'A string placeholder';

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );
                expect(input.placeholder).toBe('A string placeholder');

                element.focus();
            })
            .then(() => {
                const richText = element.shadowRoot.querySelector(
                    '.richTextPublisher'
                );
                expect(richText.placeholder).toBe('A string placeholder');
            });
    });

    // value
    // Depends on focus()
    it('value', () => {
        element.value = 'A string value';
        element.focus();

        return Promise.resolve().then(() => {
            const richText = element.shadowRoot.querySelector(
                '[data-element-id="avonni-input-rich-text"]'
            );
            expect(richText.value).toBe('A string value');
        });
    });

    // variant
    it('variant = base', () => {
        element.variant = 'base';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');
            expect(button).toBeTruthy();
        });
    });

    it('variant = comment', () => {
        element.variant = 'comment';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');
            expect(button).toBeFalsy();
        });
    });

    /* ----- METHOD ----- */

    // focus
    it('focus method', () => {
        element.focus();

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.slds-publisher');
            const richText = element.shadowRoot.querySelector(
                '[data-element-id="avonni-input-rich-text"]'
            );

            expect(wrapper.classList).toContain('slds-is-active');
            expect(richText).toBeTruthy();
        });
    });

    /* ----- EVENT ----- */

    // submit
    // Depends on value
    it('submit event', () => {
        const handler = jest.fn();
        element.value = 'A string value';
        element.addEventListener('submit', handler);
        element.focus();

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

            button.click();
            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler.mock.calls[0][0].detail.value).toBe(
                'A string value'
            );
        });
    });
});
