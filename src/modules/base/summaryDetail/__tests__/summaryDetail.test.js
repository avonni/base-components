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
import SummaryDetail from 'c/summaryDetail';

let element;
describe('SummaryDetail', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-summary-detail', {
            is: SummaryDetail
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.closed).toBeFalsy();
        expect(element.expandIconName).toBe('utility:chevronright');
        expect(element.hideIcon).toBeFalsy();
        expect(element.fullWidth).toBeFalsy();
        expect(element.removeBodyIndentation).toBeFalsy();
        expect(element.shrinkIconName).toBe('utility:chevrondown');
        expect(element.title).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // closed
    it('closed = false', () => {
        element.closed = false;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-summary-detail'
            );
            const icon = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );

            expect(wrapper.classList).toContain('slds-is-open');
            expect(icon.iconName).toBe('utility:chevrondown');
        });
    });

    it('closed = true', () => {
        element.closed = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-summary-detail'
            );
            const icon = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );

            expect(wrapper.classList).not.toContain('slds-is-open');
            expect(icon.iconName).toBe('utility:chevronright');
        });
    });

    // expand-icon-name
    // Depends on closed
    it('expandIconName', () => {
        element.expandIconName = 'utility:apps';
        element.closed = true;

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // hide-icon
    it('hideIcon = false', () => {
        element.hideIcon = false;

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );
            expect(icon).toBeTruthy();
        });
    });

    it('hideIcon = true', () => {
        element.hideIcon = true;

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );
            expect(icon).toBeFalsy();
        });
    });

    // full-width
    it('fullWidth = false', () => {
        element.fullWidth = false;

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '.slds-summary-detail__title > div > div'
            );
            const body = element.shadowRoot.querySelector(
                '.slds-summary-detail div'
            );

            expect(title.classList).not.toContain('slds-col');
            expect(body.classList).not.toContain('slds-col');
        });
    });

    it('fullWidth = true', () => {
        element.fullWidth = true;

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '.slds-summary-detail__title > div > div'
            );
            const body = element.shadowRoot.querySelector(
                '.slds-summary-detail div'
            );

            expect(title.classList).toContain('slds-col');
            expect(body.classList).toContain('slds-col');
        });
    });

    // remove-body-indentation
    it('removeBodyIndentation = false', () => {
        element.removeBodyIndentation = false;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.slds-summary-detail__content'
            );
            expect(content.classList).not.toContain('content_no-indent');
        });
    });

    it('removeBodyIndentation = true', () => {
        element.removeBodyIndentation = true;

        return Promise.resolve().then(() => {
            const content = element.shadowRoot.querySelector(
                '.slds-summary-detail__content'
            );
            expect(content.classList).toContain('content_no-indent');
        });
    });

    // shrink-icon-name
    it('shrinkIconName', () => {
        element.shrinkIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // title
    it('title', () => {
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h3');
            expect(title).toBeTruthy();
            expect(title.textContent).toBe('A string title');
        });
    });

    /* ----- EVENTS ----- */

    // toggle
    it('toggle event', () => {
        const handler = jest.fn();
        element.addEventListener('toggle', handler);
        const icon = element.shadowRoot.querySelector('lightning-button-icon');
        icon.click();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.closed).toBe(true);
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });
});
