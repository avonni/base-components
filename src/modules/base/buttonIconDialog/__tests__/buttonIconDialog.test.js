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
import ButtonIconDialog from 'c/buttonIconDialog';

describe('Button Icon Dialog', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });

        expect(element.accessKey).toBeUndefined();
        expect(element.alternativeText).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.variant).toBe('border');
        expect(element.size).toBe('medium');
        expect(element.tooltip).toBeUndefined();
        expect(element.iconClass).toBeUndefined();
        expect(element.iconName).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // access-key
    it('Button Icon Dialog access-key', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.accessKey = 'K';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.accessKey).toBe('K');
        });
    });

    // alternative-text
    it('Button Icon Dialog alternative-text', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.alternativeText = 'This is an alternative text';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.alternativeText).toBe('This is an alternative text');
        });
    });

    // disabled
    it('Button Icon Dialog disabled', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.disabled = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.disabled).toBeTruthy();
        });
    });

    // variant
    it('Button Icon Dialog variant border', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.variant = 'border';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('border');
        });
    });

    it('Button Icon Dialog variant bare', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.variant = 'bare';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('bare');
        });
    });

    it('Button Icon Dialog variant container', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.variant = 'container';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('container');
        });
    });

    it('Button Icon Dialog variant brand', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.variant = 'brand';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('brand');
        });
    });

    it('Button Icon Dialog variant border-filled', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.variant = 'border-filled';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('border-filled');
        });
    });

    it('Button Icon Dialog variant bare-inverse', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.variant = 'bare-inverse';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('bare-inverse');
        });
    });

    it('Button Icon Dialog variant border-inverse', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.variant = 'border-inverse';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('border-inverse');
        });
    });

    // size
    it('Button Icon Dialog size xx-small', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.size = 'xx-small';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('xx-small');
        });
    });

    it('Button Icon Dialog size x-small', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.size = 'x-small';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('x-small');
        });
    });

    it('Button Icon Dialog size small', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.size = 'small';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('small');
        });
    });

    it('Button Icon Dialog size medium', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.size = 'medium';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('medium');
        });
    });

    it('Button Icon Dialog size large for non bare', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.size = 'large';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('medium');
        });
    });

    it('Button Icon Dialog size large for bare', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.variant = 'bare';
        element.size = 'large';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('large');
        });
    });

    // tooltip
    it('Button Icon Dialog tooltip', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.tooltip = 'This is a tooltip';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.tooltip).toBe('This is a tooltip');
        });
    });

    // icon class
    it('Button Icon Dialog icon class', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.iconClass = 'button-dialog-icon-class';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.iconClass).toBe('button-dialog-icon-class');
        });
    });

    // icon name
    it('Button Icon Dialog icon name', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);

        element.iconName = 'utility:lock';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        return Promise.resolve().then(() => {
            expect(button.iconName).toBe('utility:lock');
        });
    });

    /* ---- METHODS ----- */
    it('method: click', () => {
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
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
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
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
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
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
        const element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
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
