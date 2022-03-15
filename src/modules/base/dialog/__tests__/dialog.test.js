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
import Dialog from 'c/dialog';

let element;
describe('Dialog', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);
    });

    it('Dialog Default attributes', () => {
        expect(element.title).toBeUndefined();
        expect(element.size).toBe('medium');
        expect(element.isLoading).toBeFalsy();
        expect(element.loadingStateAlternativeText).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // title
    it('Dialog title', () => {
        element.title = 'This is a title';
        element.show();

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '[data-element-id="h2"]'
            );
            expect(title.textContent).toBe('This is a title');
        });
    });

    // size
    it('Dialog size x-small', () => {
        element.size = 'x-small';
        element.show();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector(
                '[data-element-id="modal"]'
            );
            expect(modal.className).toContain('slds-modal_x-small');
        });
    });

    it('Dialog size small', () => {
        element.size = 'small';
        element.show();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector(
                '[data-element-id="modal"]'
            );
            expect(modal.className).toContain('slds-modal_small');
        });
    });

    it('Dialog size medium', () => {
        element.show();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector(
                '[data-element-id="modal"]'
            );
            expect(modal.className).toContain('slds-modal_medium');
        });
    });

    it('Dialog size large', () => {
        element.size = 'large';
        element.show();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector(
                '[data-element-id="modal"]'
            );
            expect(modal.className).toContain('slds-modal_large');
        });
    });

    // is loading
    it('Dialog size is loading', () => {
        element.isLoading = true;
        element.show();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner"]'
            );
            expect(spinner).toBeTruthy();
        });
    });

    // loading state alternative text
    it('Dialog size loading state alternative text', () => {
        element.isLoading = true;
        element.loadingStateAlternativeText =
            'This is a loading state alternative text';
        element.show();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner"]'
            );
            expect(spinner.alternativeText).toBe(
                'This is a loading state alternative text'
            );
        });
    });

    // show dialog
    it('Dialog show dialog', () => {
        element.showDialog = true;

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector(
                '[data-element-id="modal"]'
            );
            expect(modal).toBeTruthy();
        });
    });

    /* ----- METHODS ----- */

    // close
    it('Dialog close method', () => {
        element.show();
        element.hide();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector(
                '[data-element-id="modal"]'
            );
            expect(modal).toBeFalsy();
        });
    });

    // focusOnCloseButton
    // Depends on showDialog
    it('Dialog focusOnCloseButton method', () => {
        element.showDialog = true;
        const handler = jest.fn();

        return Promise.resolve().then(() => {
            const button =
                element.shadowRoot.querySelector('.slds-modal__close');
            button.focus = handler;
            element.focusOnCloseButton();
            expect(handler).toHaveBeenCalled();
        });
    });

    // show
    it('Dialog show method', () => {
        element.show();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector(
                '[data-element-id="modal"]'
            );
            expect(modal).toBeTruthy();
        });
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    // outsideclick
    it('outsideclick event', () => {
        element.showDialog = true;
        const handler = jest.fn();
        element.addEventListener('outsideclick', handler);

        return Promise.resolve().then(() => {
            const section = element.shadowRoot.querySelector(
                '[data-element-id="modal"]'
            );
            const content = element.shadowRoot.querySelector(
                '[data-element-id="div-content"]'
            );
            content.click();
            expect(handler).not.toHaveBeenCalled();
            section.click();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });
});
