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
import ScopedNotification from 'c/scopedNotification';

describe('ScopedNotification', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        expect(element.iconName).toBeUndefined();
        expect(element.iconSize).toBe('medium');
        expect(element.title).toBeUndefined();
        expect(element.variant).toBe('base');
    });

    /* ----- ATTRIBUTES ----- */

    // icon-name
    it('iconName', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        document.body.appendChild(element);

        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon).toBeTruthy();
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // icon-size
    // Depends on iconName
    it('iconSize', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        document.body.appendChild(element);

        element.iconName = 'utility:apps';
        element.iconSize = 'large';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.size).toBe('large');
        });
    });

    // title
    it('title', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        document.body.appendChild(element);

        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '.slds-media__body p'
            );
            expect(title.textContent).toBe('A string title');
        });
    });

    // variant
    // Depends on iconName
    it('variant = base', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        document.body.appendChild(element);

        element.variant = 'base';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-scoped-notification'
            );

            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_light'
            );
            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_dark'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_warning'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_error'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_success'
            );
        });
    });

    it('variant = light', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        document.body.appendChild(element);

        element.variant = 'light';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-scoped-notification'
            );

            expect(wrapper.classList).toContain(
                'slds-scoped-notification_light'
            );
            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_dark'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_warning'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_error'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_success'
            );
        });
    });

    it('variant = dark', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        document.body.appendChild(element);

        element.variant = 'dark';
        element.iconName = 'utility:favorite';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-scoped-notification'
            );
            const icon = element.shadowRoot.querySelector('lightning-icon');

            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_light'
            );
            expect(wrapper.classList).toContain(
                'slds-scoped-notification_dark'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_warning'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_error'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_success'
            );
            expect(icon.variant).toBe('inverse');
        });
    });

    it('variant = warning', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        document.body.appendChild(element);

        element.variant = 'warning';
        element.iconName = 'utility:favorite';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-scoped-notification'
            );
            const icon = element.shadowRoot.querySelector('lightning-icon');

            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_light'
            );
            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_dark'
            );
            expect(wrapper.classList).toContain(
                'avonni-scoped-notification_warning'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_error'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_success'
            );
            expect(icon.variant).toBe('warning');
        });
    });

    it('variant = error', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        document.body.appendChild(element);

        element.variant = 'error';
        element.iconName = 'utility:favorite';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-scoped-notification'
            );
            const icon = element.shadowRoot.querySelector('lightning-icon');

            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_light'
            );
            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_dark'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_warning'
            );
            expect(wrapper.classList).toContain(
                'avonni-scoped-notification_error'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_success'
            );
            expect(icon.variant).toBe('error');
        });
    });

    it('variant = success', () => {
        const element = createElement('base-scoped-notification', {
            is: ScopedNotification
        });

        document.body.appendChild(element);

        element.variant = 'success';
        element.iconName = 'utility:favorite';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-scoped-notification'
            );
            const icon = element.shadowRoot.querySelector('lightning-icon');

            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_light'
            );
            expect(wrapper.classList).not.toContain(
                'slds-scoped-notification_dark'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_warning'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-scoped-notification_error'
            );
            expect(wrapper.classList).toContain(
                'avonni-scoped-notification_success'
            );
            expect(icon.variant).toBe('success');
        });
    });
});
