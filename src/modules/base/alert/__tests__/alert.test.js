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
import Alert from 'c/alert';

let element;
describe('Alert', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-alert', {
            is: Alert
        });
        document.body.appendChild(element);
    });

    it('Alert: Default attributes', () => {
        expect(element.iconName).toBeUndefined();
        expect(element.variant).toBe('base');
        expect(element.isDismissible).toBe(false);
    });

    it('Alert: variant base', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');
        expect(div.classList).toContain('avonni-notify_alert');
        expect(div.classList).toContain('avonni-alert_base');
        expect(div.classList).not.toContain('avonni-alert_error');
        expect(div.classList).not.toContain('avonni-alert_offline');
        expect(div.classList).not.toContain('avonni-alert_warning');
    });

    it('Alert: variant error', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.variant = 'error';

        return Promise.resolve().then(() => {
            expect(element.variant).toBe('error');
            expect(div.classList).toContain('avonni-notify_alert');
            expect(div.classList).not.toContain('avonni-alert_base');
            expect(div.classList).toContain('avonni-alert_error');
            expect(div.classList).not.toContain('avonni-alert_offline');
            expect(div.classList).not.toContain('avonni-alert_warning');
        });
    });

    it('Alert: variant offline', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');

        element.variant = 'offline';

        return Promise.resolve().then(() => {
            expect(element.variant).toBe('offline');
            expect(div.classList).toContain('avonni-notify_alert');
            expect(div.classList).not.toContain('avonni-alert_base');
            expect(div.classList).not.toContain('avonni-alert_error');
            expect(div.classList).toContain('avonni-alert_offline');
            expect(div.classList).not.toContain('avonni-alert_warning');
        });
    });

    it('Alert: variant warning', () => {
        const div = element.shadowRoot.querySelector('[data-element-id="div"]');
        element.variant = 'warning';

        return Promise.resolve().then(() => {
            expect(element.variant).toBe('warning');
            expect(div.classList).toContain('avonni-notify_alert');
            expect(div.classList).not.toContain('avonni-alert_base');
            expect(div.classList).not.toContain('avonni-alert_error');
            expect(div.classList).not.toContain('avonni-alert_offline');
            expect(div.classList).toContain('avonni-alert_warning');
        });
    });

    it('Alert: isDismissible = false', () => {
        element.isDismissible = false;

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(lightningButtonIcon).toBeFalsy();
        });
    });

    it('Alert: isDismissible = true', () => {
        element.isDismissible = true;

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(lightningButtonIcon).toBeTruthy();
        });
    });

    it('Alert: iconName', () => {
        let lightningIcon = element.shadowRoot.querySelector(
            '[data-element-id="lightning-icon"]'
        );

        expect(element.iconName).toBeUndefined();
        expect(lightningIcon.iconName).toBeUndefined();

        element.iconName = 'utility:user';

        return Promise.resolve().then(() => {
            lightningIcon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon"]'
            );
            expect(element.iconName).toBe('utility:user');
            expect(lightningIcon.iconName).toBe('utility:user');
        });
    });

    it('Alert: closeAction', () => {
        element.isDismissible = true;
        const mockCallBack = jest.fn();
        element.closeAction = mockCallBack;

        return Promise.resolve()
            .then(() => {
                const div = element.shadowRoot.querySelector(
                    '[data-element-id="div"]'
                );
                const lightningButtonIcon = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon"]'
                );

                expect(div).toBeTruthy();
                lightningButtonIcon.click();
            })
            .then(() => {
                const div = element.shadowRoot.querySelector(
                    '[data-element-id="div"]'
                );
                expect(div).toBeFalsy();
                expect(mockCallBack.mock.calls.length).toEqual(1);
            });
    });
});
