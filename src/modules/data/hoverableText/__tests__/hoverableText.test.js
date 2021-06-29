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
import DataHoverableText from 'c/dataHoverableText';

// NB: most tests depend on open() to work.

// Not tested:
// auto positionning
// Keyboard navigation (we can't artificially dispatch an event with a key code)

const FIELDS = [
    {
        label: 'Account Name',
        value: 'Jane Doe Inc.',
        type: 'text'
    },
    {
        label: 'Phone',
        value: '514-222-3333',
        type: 'phone'
    },
    {
        label: 'Close date',
        value: new Date(),
        type: 'date',
        typeAttributes: {
            day: 'numeric',
            month: 'long'
        }
    }
];

describe('DataHoverableText', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        expect(element.avatarFallbackIconName).toBeUndefined();
        expect(element.avatarSrc).toBeUndefined();
        expect(element.fields).toMatchObject([]);
        expect(element.isLoading).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.loadingStateAlternativeText).toBe('Loading');
        expect(element.href).toBeUndefined();
        expect(element.placement).toBe('left');
        expect(element.popoverSize).toBe('medium');
        expect(element.theme).toBe('default');
        expect(element.title).toBeUndefined();
        expect(element.titleHref).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // avatar-fallback-icon-name
    // Depends on title
    it('avatarFallbackIconName without title', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.avatarFallbackIconName = 'standard:apps';

        element.open();

        return Promise.resolve().then(() => {
            const mediaObject = element.shadowRoot.querySelector(
                'c-media-object'
            );
            expect(mediaObject).toBeFalsy();

            const avatar = element.shadowRoot.querySelector(
                '.slds-popover__body c-avatar'
            );
            expect(avatar).toBeTruthy();
            expect(avatar.fallbackIconName).toBe('standard:apps');
        });
    });

    it('avatarFallbackIconName with title', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.avatarFallbackIconName = 'standard:apps';
        element.title = 'A string title';

        element.open();

        return Promise.resolve().then(() => {
            const mediaObject = element.shadowRoot.querySelector(
                'c-media-object'
            );
            expect(mediaObject).toBeTruthy();

            const avatar = element.shadowRoot.querySelector(
                '.slds-popover__body c-avatar'
            );
            expect(avatar).toBeFalsy();
        });
    });

    // avatar-src
    // Depends on title
    it('avatarSrc without title', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.avatarSrc =
            'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg';

        element.open();

        return Promise.resolve().then(() => {
            const mediaObject = element.shadowRoot.querySelector(
                'c-media-object'
            );
            expect(mediaObject).toBeFalsy();

            const avatar = element.shadowRoot.querySelector(
                '.slds-popover__body c-avatar'
            );
            expect(avatar).toBeTruthy();
            expect(avatar.src).toBe(
                'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
            );
        });
    });

    it('avatarSrc with title', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.avatarSrc =
            'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg';
        element.title = 'A string title';

        element.open();

        return Promise.resolve().then(() => {
            const mediaObject = element.shadowRoot.querySelector(
                'c-media-object'
            );
            expect(mediaObject).toBeTruthy();

            const avatar = element.shadowRoot.querySelector(
                '.slds-popover__body c-avatar'
            );
            expect(avatar).toBeFalsy();
        });
    });

    // fields
    it('fields', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.fields = FIELDS;

        element.open();

        return Promise.resolve().then(() => {
            const labels = element.shadowRoot.querySelectorAll(
                '.slds-popover_panel__label'
            );
            const values = element.shadowRoot.querySelectorAll('c-output-data');

            FIELDS.forEach((field, index) => {
                expect(labels[index].textContent).toBe(field.label);
                expect(values[index].value).toBe(field.value);
                expect(values[index].type).toBe(field.type);
                expect(values[index].typeAttributes).toMatchObject(
                    field.typeAttributes || {}
                );
            });
        });
    });

    // is-loading
    it('isLoading = false', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.isLoading = false;

        element.open();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                'lightning-spinner'
            );
            expect(spinner).toBeFalsy();

            const popoverBody = element.shadowRoot.querySelector(
                '.slds-popover__body'
            );
            expect(popoverBody).toBeTruthy();
        });
    });

    it('isLoading = true', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.isLoading = true;

        element.open();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                'lightning-spinner'
            );
            expect(spinner).toBeTruthy();

            const popoverBody = element.shadowRoot.querySelector(
                '.slds-popover__body'
            );
            expect(popoverBody).toBeFalsy();
        });
    });

    // label
    // Depends on href
    it('label', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector('a.hoverable-label');
            const labelNoLink = element.shadowRoot.querySelector(
                'span.hoverable-label'
            );

            expect(link).toBeFalsy();
            expect(labelNoLink).toBeTruthy();
            expect(labelNoLink.textContent).toBe('A string label');
        });
    });

    it('label with href', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.label = 'A string label';
        element.href = 'https://www.avonni.app/';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector('a.hoverable-label');
            const labelNoLink = element.shadowRoot.querySelector(
                'span.hoverable-label'
            );

            expect(labelNoLink).toBeFalsy();
            expect(link).toBeTruthy();
            expect(link.textContent).toBe('A string label');
        });
    });

    // loading-state-alternative-text
    // Depends on isLoading
    it('loadingStateAlternativeText', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.isLoading = true;
        element.loadingStateAlternativeText = 'A string help';

        element.open();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                'lightning-spinner'
            );
            expect(spinner.alternativeText).toBe('A string help');
        });
    });

    // href
    // Depends on label
    it('href without label', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.href = 'https://www.avonni.app/';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector('a.hoverable-label');

            expect(link.textContent).toBe('https://www.avonni.app/');
            expect(link.href).toBe('https://www.avonni.app/');
        });
    });

    it('href with label', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.href = 'https://www.avonni.app/';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector('a.hoverable-label');

            expect(link.textContent).toBe('A string label');
            expect(link.href).toBe('https://www.avonni.app/');
        });
    });

    // placement
    it('placement = left', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.placement = 'left';

        element.open();

        return Promise.resolve().then(() => {
            const popoverWrapper = element.shadowRoot.querySelector(
                'lightning-button-icon + div'
            );
            expect(popoverWrapper.classList).toContain('popover-top');
            expect(popoverWrapper.classList).not.toContain('popover-bottom');

            const popover = element.shadowRoot.querySelector('.slds-popover');

            expect(popover.classList).toContain('slds-dropdown_left');
            expect(popover.classList).not.toContain('slds-dropdown_center');
            expect(popover.classList).not.toContain('slds-dropdown_right');
            expect(popover.classList).not.toContain('slds-dropdown_bottom');
            expect(popover.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(popover.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );

            expect(popover.classList).toContain('slds-nubbin_top-left');
            expect(popover.classList).not.toContain('slds-nubbin_top-right');
            expect(popover.classList).not.toContain('slds-nubbin_top');
            expect(popover.classList).not.toContain('slds-nubbin_bottom-left');
            expect(popover.classList).not.toContain('slds-nubbin_bottom-right');
            expect(popover.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    it('placement = auto', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.placement = 'auto';

        element.open();

        return Promise.resolve().then(() => {
            const popoverWrapper = element.shadowRoot.querySelector(
                'lightning-button-icon + div'
            );
            expect(popoverWrapper.classList).toContain('popover-top');
            expect(popoverWrapper.classList).not.toContain('popover-bottom');

            const popover = element.shadowRoot.querySelector('.slds-popover');

            expect(popover.classList).toContain('slds-dropdown_left');
            expect(popover.classList).not.toContain('slds-dropdown_center');
            expect(popover.classList).not.toContain('slds-dropdown_right');
            expect(popover.classList).not.toContain('slds-dropdown_bottom');
            expect(popover.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(popover.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );

            expect(popover.classList).not.toContain('slds-nubbin_top-left');
            expect(popover.classList).not.toContain('slds-nubbin_top-right');
            expect(popover.classList).not.toContain('slds-nubbin_top');
            expect(popover.classList).not.toContain('slds-nubbin_bottom-left');
            expect(popover.classList).not.toContain('slds-nubbin_bottom-right');
            expect(popover.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    it('placement = center', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.placement = 'center';

        element.open();

        return Promise.resolve().then(() => {
            const popoverWrapper = element.shadowRoot.querySelector(
                'lightning-button-icon + div'
            );
            expect(popoverWrapper.classList).toContain('popover-top');
            expect(popoverWrapper.classList).not.toContain('popover-bottom');

            const popover = element.shadowRoot.querySelector('.slds-popover');

            expect(popover.classList).not.toContain('slds-dropdown_left');
            expect(popover.classList).toContain('slds-dropdown_center');
            expect(popover.classList).not.toContain('slds-dropdown_right');
            expect(popover.classList).not.toContain('slds-dropdown_bottom');
            expect(popover.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(popover.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );

            expect(popover.classList).not.toContain('slds-nubbin_top-left');
            expect(popover.classList).not.toContain('slds-nubbin_top-right');
            expect(popover.classList).toContain('slds-nubbin_top');
            expect(popover.classList).not.toContain('slds-nubbin_bottom-left');
            expect(popover.classList).not.toContain('slds-nubbin_bottom-right');
            expect(popover.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    it('placement = right', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.placement = 'right';

        element.open();

        return Promise.resolve().then(() => {
            const popoverWrapper = element.shadowRoot.querySelector(
                'lightning-button-icon + div'
            );
            expect(popoverWrapper.classList).toContain('popover-top');
            expect(popoverWrapper.classList).not.toContain('popover-bottom');

            const popover = element.shadowRoot.querySelector('.slds-popover');

            expect(popover.classList).not.toContain('slds-dropdown_left');
            expect(popover.classList).not.toContain('slds-dropdown_center');
            expect(popover.classList).toContain('slds-dropdown_right');
            expect(popover.classList).not.toContain('slds-dropdown_bottom');
            expect(popover.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(popover.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );

            expect(popover.classList).not.toContain('slds-nubbin_top-left');
            expect(popover.classList).toContain('slds-nubbin_top-right');
            expect(popover.classList).not.toContain('slds-nubbin_top');
            expect(popover.classList).not.toContain('slds-nubbin_bottom-left');
            expect(popover.classList).not.toContain('slds-nubbin_bottom-right');
            expect(popover.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    it('placement = bottom-right', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.placement = 'bottom-right';

        element.open();

        return Promise.resolve().then(() => {
            const popoverWrapper = element.shadowRoot.querySelector(
                'lightning-button-icon + div'
            );
            expect(popoverWrapper.classList).not.toContain('popover-top');
            expect(popoverWrapper.classList).toContain('popover-bottom');

            const popover = element.shadowRoot.querySelector('.slds-popover');

            expect(popover.classList).not.toContain('slds-dropdown_left');
            expect(popover.classList).not.toContain('slds-dropdown_center');
            expect(popover.classList).toContain('slds-dropdown_right');
            expect(popover.classList).toContain('slds-dropdown_bottom');
            expect(popover.classList).toContain('slds-dropdown_bottom-right');
            expect(popover.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );

            expect(popover.classList).not.toContain('slds-nubbin_top-left');
            expect(popover.classList).not.toContain('slds-nubbin_top-right');
            expect(popover.classList).not.toContain('slds-nubbin_top');
            expect(popover.classList).not.toContain('slds-nubbin_bottom-left');
            expect(popover.classList).toContain('slds-nubbin_bottom-right');
            expect(popover.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    it('placement = bottom-center', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.placement = 'bottom-center';

        element.open();

        return Promise.resolve().then(() => {
            const popoverWrapper = element.shadowRoot.querySelector(
                'lightning-button-icon + div'
            );
            expect(popoverWrapper.classList).not.toContain('popover-top');
            expect(popoverWrapper.classList).toContain('popover-bottom');

            const popover = element.shadowRoot.querySelector('.slds-popover');

            expect(popover.classList).not.toContain('slds-dropdown_left');
            expect(popover.classList).not.toContain('slds-dropdown_center');
            expect(popover.classList).not.toContain('slds-dropdown_right');
            expect(popover.classList).toContain('slds-dropdown_bottom');
            expect(popover.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(popover.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );

            expect(popover.classList).not.toContain('slds-nubbin_top-left');
            expect(popover.classList).not.toContain('slds-nubbin_top-right');
            expect(popover.classList).not.toContain('slds-nubbin_top');
            expect(popover.classList).not.toContain('slds-nubbin_bottom-left');
            expect(popover.classList).not.toContain('slds-nubbin_bottom-right');
            expect(popover.classList).toContain('slds-nubbin_bottom');
        });
    });

    it('placement = bottom-left', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.placement = 'bottom-left';

        element.open();

        return Promise.resolve().then(() => {
            const popoverWrapper = element.shadowRoot.querySelector(
                'lightning-button-icon + div'
            );
            expect(popoverWrapper.classList).not.toContain('popover-top');
            expect(popoverWrapper.classList).toContain('popover-bottom');

            const popover = element.shadowRoot.querySelector('.slds-popover');

            expect(popover.classList).toContain('slds-dropdown_left');
            expect(popover.classList).not.toContain('slds-dropdown_center');
            expect(popover.classList).not.toContain('slds-dropdown_right');
            expect(popover.classList).toContain('slds-dropdown_bottom');
            expect(popover.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(popover.classList).toContain('slds-dropdown_bottom-left');

            expect(popover.classList).not.toContain('slds-nubbin_top-left');
            expect(popover.classList).not.toContain('slds-nubbin_top-right');
            expect(popover.classList).not.toContain('slds-nubbin_top');
            expect(popover.classList).toContain('slds-nubbin_bottom-left');
            expect(popover.classList).not.toContain('slds-nubbin_bottom-right');
            expect(popover.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    // popover-size
    it('popoverSize = medium', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.popoverSize = 'medium';

        element.open();

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');

            expect(popover.classList).not.toContain('slds-popover_small');
            expect(popover.classList).toContain('slds-popover_medium');
            expect(popover.classList).not.toContain('slds-popover_large');
        });
    });

    it('popoverSize = small', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.popoverSize = 'small';

        element.open();

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');

            expect(popover.classList).toContain('slds-popover_small');
            expect(popover.classList).not.toContain('slds-popover_medium');
            expect(popover.classList).not.toContain('slds-popover_large');
        });
    });

    it('popoverSize = large', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.popoverSize = 'large';

        element.open();

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');

            expect(popover.classList).not.toContain('slds-popover_small');
            expect(popover.classList).not.toContain('slds-popover_medium');
            expect(popover.classList).toContain('slds-popover_large');
        });
    });

    // theme
    // Depends on title
    it('theme = default', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.theme = 'default';

        element.open();

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            const popoverBody = element.shadowRoot.querySelector(
                '.slds-popover__body'
            );

            expect(popover.classList).not.toContain('slds-theme_inverse');
            expect(popover.classList).not.toContain('slds-theme_shade');
            expect(popoverBody.classList).not.toContain('slds-theme_default');
            expect(popoverBody.classList).not.toContain('slds-border_top');
        });
    });

    it('theme = default-shade, without title', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.theme = 'default-shade';

        element.open();

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            const popoverBody = element.shadowRoot.querySelector(
                '.slds-popover__body'
            );

            expect(popover.classList).not.toContain('slds-theme_inverse');
            expect(popover.classList).not.toContain('slds-theme_shade');
            expect(popoverBody.classList).toContain('slds-theme_default');
            expect(popoverBody.classList).not.toContain('slds-border_top');
        });
    });

    it('theme = default-shade, with title', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.theme = 'default-shade';
        element.title = 'A string title';

        element.open();

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            const popoverBody = element.shadowRoot.querySelector(
                '.slds-popover__body'
            );

            expect(popover.classList).not.toContain('slds-theme_inverse');
            expect(popover.classList).toContain('slds-theme_shade');
            expect(popoverBody.classList).toContain('slds-theme_default');
            expect(popoverBody.classList).toContain('slds-border_top');
        });
    });

    it('theme = shade', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.theme = 'shade';

        element.open();

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            const popoverBody = element.shadowRoot.querySelector(
                '.slds-popover__body'
            );

            expect(popover.classList).not.toContain('slds-theme_inverse');
            expect(popover.classList).toContain('slds-theme_shade');
            expect(popoverBody.classList).not.toContain('slds-theme_default');
            expect(popoverBody.classList).not.toContain('slds-border_top');
        });
    });

    it('theme = inverse', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.theme = 'inverse';

        element.open();

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            const popoverBody = element.shadowRoot.querySelector(
                '.slds-popover__body'
            );

            expect(popover.classList).toContain('slds-theme_inverse');
            expect(popover.classList).not.toContain('slds-theme_shade');
            expect(popoverBody.classList).not.toContain('slds-theme_default');
            expect(popoverBody.classList).not.toContain('slds-border_top');
        });
    });

    // title
    it('title', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.title = 'A string title';

        element.open();

        return Promise.resolve().then(() => {
            const mediaObject = element.shadowRoot.querySelector(
                'c-media-object'
            );
            expect(mediaObject).toBeTruthy();

            const ariaLabel = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            expect(ariaLabel.textContent).toBe('A string title');
        });
    });

    // titleHref
    // Depends on title
    it('titleHref, without title', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.titleHref = 'https://www.avonni.app/';

        element.open();

        return Promise.resolve().then(() => {
            const mediaObject = element.shadowRoot.querySelector(
                'c-media-object'
            );
            expect(mediaObject).toBeTruthy();

            const ariaLabel = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            expect(ariaLabel.textContent).toBe('https://www.avonni.app/');
        });
    });

    it('titleHref, with title', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.titleHref = 'https://www.avonni.app/';
        element.title = 'A string title';

        element.open();

        return Promise.resolve().then(() => {
            const mediaObject = element.shadowRoot.querySelector(
                'c-media-object'
            );
            expect(mediaObject).toBeTruthy();

            const ariaLabel = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            expect(ariaLabel.textContent).toBe('A string title');
        });
    });

    /* ----- METHODS ----- */

    // open
    it('open method', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);

        const closedPopover = element.shadowRoot.querySelector(
            'lightning-button-icon + div'
        );
        expect(closedPopover).toBeFalsy();

        element.open();

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector(
                'lightning-button-icon + div'
            );
            expect(popover).toBeTruthy();
        });
    });

    // close
    it('close method', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);

        element.open();

        return Promise.resolve()
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    'lightning-button-icon + div'
                );
                expect(popover).toBeTruthy();

                element.close();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    'lightning-button-icon + div'
                );
                expect(popover).toBeFalsy();
            });
    });

    // focus
    // Depends on href
    it('focus, without href', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        const accessibilityButton = element.shadowRoot.querySelector(
            '.accessibility-button'
        );
        accessibilityButton.focus = handler;

        element.focus();

        return Promise.resolve().then(() => {
            expect(handler).toHaveBeenCalled();
        });
    });

    it('focus, with href', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);
        element.href = 'https://www.avonni.app/';
        const handler = jest.fn();

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector('a.hoverable-label');
            link.focus = handler;

            element.focus();
            expect(handler).toHaveBeenCalled();
        });
    });

    /* ----- EVENTS ----- */

    // open
    it('open event', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('open', handler);

        element.open();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });

    // close
    it('close event', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('close', handler);

        element.open();
        element.close();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });

    // focus
    // Depends on href
    it('focus event, without href', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('focus', handler);

        const accessibilityButton = element.shadowRoot.querySelector(
            '.accessibility-button'
        );
        accessibilityButton.dispatchEvent(new CustomEvent('focus'));
        expect(handler).toHaveBeenCalled();
    });

    it('focus event, with href', () => {
        const element = createElement('data-hoverable-text', {
            is: DataHoverableText
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('focus', handler);
        element.href = 'https://www.avonni.app/';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector('a.hoverable-label');
            link.dispatchEvent(new CustomEvent('focus'));

            expect(handler).toHaveBeenCalled();
        });
    });
});
