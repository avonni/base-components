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
import ButtonDialog from 'c/buttonDialog';

describe('Button Dialog', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });

        expect(element.accessKey).toBeUndefined();
        expect(element.alternativeText).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.variant).toBe('neutral');
        expect(element.iconName).toBeUndefined();
        expect(element.iconPosition).toBe('left');
    });

    /* ----- ATTRIBUTES ----- */

    // access-key
    it('Button Dialog access-key', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);

        element.accessKey = 'K';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.accessKey).toBe('K');
        });
    });

    // alternative-text
    it('Button Dialog alternative-text', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);

        element.alternativeText = 'This is an alternative text';
        const assistiveText = element.shadowRoot.querySelector(
            '.slds-assistive-text'
        );

        return Promise.resolve().then(() => {
            expect(assistiveText.textContent).toBe(
                'This is an alternative text'
            );
        });
    });

    // disabled
    it('Button Dialog disabled', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);

        element.disabled = true;
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.disabled).toBeTruthy();
        });
    });

    // label
    it('Button Dialog label', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);

        element.label = 'Button Label';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.label).toBe('Button Label');
        });
    });

    // variant
    it('Button Dialog variant neutral', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);

        element.variant = 'neutral';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('neutral');
        });
    });

    it('Button Dialog variant base', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);

        element.variant = 'base';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('base');
        });
    });

    it('Button Dialog variant brand', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);

        element.variant = 'brand';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('brand');
        });
    });

    it('Button Dialog variant brand-outline', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);

        element.variant = 'brand-outline';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('brand-outline');
        });
    });

    it('Button Dialog variant destructive', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);

        element.variant = 'destructive';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('destructive');
        });
    });

    it('Button Dialog variant destructive-text', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);

        element.variant = 'destructive-text';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('destructive-text');
        });
    });

    it('Button Dialog variant inverse', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);

        element.variant = 'inverse';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('inverse');
        });
    });

    it('Button Dialog variant success', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);

        element.variant = 'success';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('success');
        });
    });

    // icon name
    it('Button Dialog icon name', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);

        element.iconName = 'utility:lock';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.iconName).toBe('utility:lock');
        });
    });

    // icon position
    it('Button Dialog icon position left', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);

        element.iconName = 'utility:lock';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.iconPosition).toBe('left');
        });
    });

    it('Button Dialog icon position right', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);

        element.iconName = 'utility:lock';
        element.iconPosition = 'right';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.iconPosition).toBe('right');
        });
    });

    /* ---- METHODS ----- */
    it('method: click', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);

        let clickEvent = false;
        element.addEventListener('click', () => {
            clickEvent = true;
        });

        element.click();
        return Promise.resolve().then(() => {
            expect(clickEvent).toBeTruthy();
        });
    });

    it('method: focus', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);

        let focusEvent = false;
        element.addEventListener('focus', () => {
            focusEvent = true;
        });

        element.focus();
        return Promise.resolve().then(() => {
            expect(focusEvent).toBeTruthy();
        });
    });

    it('method: show', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);

        let showEvent = false;
        element.addEventListener('show', () => {
            showEvent = true;
        });

        element.show();
        return Promise.resolve().then(() => {
            expect(showEvent).toBeTruthy();
        });
    });

    it('method: hide', () => {
        const element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);

        let hideEvent = false;
        element.addEventListener('hide', () => {
            hideEvent = true;
        });

        element.hide();
        return Promise.resolve().then(() => {
            expect(hideEvent).toBeTruthy();
        });
    });
});
