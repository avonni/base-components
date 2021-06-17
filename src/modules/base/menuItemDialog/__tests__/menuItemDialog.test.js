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
import MenuItemDialog from 'c/menuItemDialog';

describe('MenuItemDialog', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-menu-item-dialog', {
            is: MenuItemDialog
        });

        expect(element.accessKey).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.draftAlternativeText).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.isDraft).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.prefixIconName).toBeUndefined();
        expect(element.tabIndex).toBe('0');
        expect(element.value).toBeUndefined();
    });

    /* ---- ATTRIBUTES ----- */

    // access-key
    it('accessKey', () => {
        const element = createElement('base-menu-item-dialog', {
            is: MenuItemDialog
        });
        document.body.appendChild(element);

        const link = element.shadowRoot.querySelector('a');
        element.accessKey = 'K';

        return Promise.resolve().then(() => {
            expect(link.accessKey).toBe('K');
        });
    });

    // disabled
    // Depends on the dispatch of a privateselect event on click
    it('disabled = false', () => {
        const element = createElement('base-menu-item-dialog', {
            is: MenuItemDialog
        });
        document.body.appendChild(element);

        let eventDispatched = false;
        element.disabled = false;
        element.addEventListener('privateselect', () => {
            eventDispatched = true;
        });

        const link = element.shadowRoot.querySelector('a');
        link.click();

        return Promise.resolve().then(() => {
            expect(eventDispatched).toBeTruthy();
        });
    });

    it('disabled = true', () => {
        const element = createElement('base-menu-item-dialog', {
            is: MenuItemDialog
        });
        document.body.appendChild(element);

        let eventDispatched = false;
        element.disabled = true;
        element.addEventListener('privateselect', () => {
            eventDispatched = true;
        });

        const link = element.shadowRoot.querySelector('a');
        link.click();

        return Promise.resolve().then(() => {
            expect(eventDispatched).toBeFalsy();
        });
    });

    // draft-alternative-text
    // Depend on isDraft
    it('draftAlternativeText', () => {
        const element = createElement('base-menu-item-dialog', {
            is: MenuItemDialog
        });
        document.body.appendChild(element);

        element.draftAlternativeText = 'A string alternative text';
        element.isDraft = true;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector('abbr');
            expect(abbr.title).toBe('A string alternative text');
        });
    });

    // icon-name
    it('iconName', () => {
        const element = createElement('base-menu-item-dialog', {
            is: MenuItemDialog
        });
        document.body.appendChild(element);

        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                'span + lightning-icon'
            );
            expect(icon).toBeTruthy();
        });
    });

    // is-draft
    it('isDraft = false', () => {
        const element = createElement('base-menu-item-dialog', {
            is: MenuItemDialog
        });
        document.body.appendChild(element);

        element.isDraft = false;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector('abbr');
            expect(abbr).toBeFalsy();
        });
    });

    it('isDraft = true', () => {
        const element = createElement('base-menu-item-dialog', {
            is: MenuItemDialog
        });
        document.body.appendChild(element);

        element.isDraft = true;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector('abbr');
            expect(abbr).toBeTruthy();
        });
    });

    // label
    it('label', () => {
        const element = createElement('base-menu-item-dialog', {
            is: MenuItemDialog
        });
        document.body.appendChild(element);

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector('span');
            expect(span.textContent).toBe('A string label');
            expect(span.title).toBe('A string label');
        });
    });

    // prefix-icon-name
    it('prefixIconName', () => {
        const element = createElement('base-menu-item-dialog', {
            is: MenuItemDialog
        });
        document.body.appendChild(element);

        element.prefixIconName = 'standard:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                'span > lightning-icon'
            );
            expect(icon).toBeTruthy();
        });
    });

    // tab-index
    it('tabIndex', () => {
        const element = createElement('base-menu-item-dialog', {
            is: MenuItemDialog
        });
        document.body.appendChild(element);

        element.tabIndex = '-1';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector('a');
            expect(link.getAttribute('tabindex')).toBe('-1');
        });
    });

    // value
    // Depends on the dispatch of a privateselect event on click
    it('value', () => {
        const element = createElement('base-menu-item-dialog', {
            is: MenuItemDialog
        });
        document.body.appendChild(element);

        let eventDetailValue;
        element.value = 'a-string-value';
        element.addEventListener('privateselect', (event) => {
            eventDetailValue = event.detail.value;
        });

        const link = element.shadowRoot.querySelector('a');
        link.click();

        return Promise.resolve().then(() => {
            expect(eventDetailValue).toBe('a-string-value');
        });
    });

    /* ---- METHOD ----- */

    // focus
    it('focus', () => {
        const element = createElement('base-menu-item-dialog', {
            is: MenuItemDialog
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
});
