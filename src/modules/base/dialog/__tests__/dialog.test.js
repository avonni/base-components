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

describe('Dialog', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Dialog Default attributes', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });

        expect(element.title).toBeUndefined();
        expect(element.size).toBe('medium');
        expect(element.isLoading).toBeFalsy();
        expect(element.loadingStateAlternativeText).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // title
    it('Dialog title', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);

        element.title = 'This is a title';
        element.show();

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h2');
            expect(title.textContent).toBe('This is a title');
        });
    });

    // size
    it('Dialog size small', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);

        element.size = 'small';
        element.show();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector('.slds-modal');
            expect(modal.className).toContain('slds-modal_small');
        });
    });

    it('Dialog size medium', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);

        element.show();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector('.slds-modal');
            expect(modal.className).toContain('slds-modal_medium');
        });
    });

    it('Dialog size large', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);

        element.size = 'large';
        element.show();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector('.slds-modal');
            expect(modal.className).toContain('slds-modal_large');
        });
    });

    // is loading
    it('Dialog size is loading', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);

        element.isLoading = true;
        element.show();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                'lightning-spinner'
            );
            expect(spinner).toBeTruthy();
        });
    });

    // loading state alternative text
    it('Dialog size loading state alternative text', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);

        element.isLoading = true;
        element.loadingStateAlternativeText =
            'This is a loading state alternative text';
        element.show();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                'lightning-spinner'
            );
            expect(spinner.alternativeText).toBe(
                'This is a loading state alternative text'
            );
        });
    });

    // show dialog
    it('Dialog show dialog', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);

        element.showDialog = true;

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector('.slds-modal');
            expect(modal).toBeTruthy();
        });
    });

    /* ----- METHODS ----- */

    // close
    it('Dialog close method', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);

        element.show();
        element.hide();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector('.slds-modal');
            expect(modal).toBeFalsy();
        });
    });

    // focusOnCloseButton
    // Depends on showDialog
    it('Dialog focusOnCloseButton method', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);

        element.showDialog = true;
        const handler = jest.fn();

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '.slds-modal__close'
            );
            button.focus = handler;
            element.focusOnCloseButton();
            expect(handler).toHaveBeenCalled();
        });
    });

    // show
    it('Dialog show method', () => {
        const element = createElement('base-dialog', {
            is: Dialog
        });
        document.body.appendChild(element);

        element.show();

        return Promise.resolve().then(() => {
            const modal = element.shadowRoot.querySelector('.slds-modal');
            expect(modal).toBeTruthy();
        });
    });
});
