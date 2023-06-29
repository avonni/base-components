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
import VisualPickerLink from 'c/visualPickerLink';

let element;
describe('VisualPickerLink', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-visual-picker-link', {
            is: VisualPickerLink
        });
        document.body.appendChild(element);
    });

    it('Visual picker link: Default attributes', () => {
        expect(element.completed).toBeFalsy();
        expect(element.href).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.iconPosition).toBe('left');
        expect(element.infoOnly).toBeFalsy();
        expect(element.disabled).toBeFalsy();
        expect(element.title).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // completed
    it('Visual picker link: completed = false', () => {
        element.completed = false;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.avonni-visual-picker-link__tile'
            );
            expect(wrapper.classList).not.toContain(
                'slds-welcome-mat__tile_complete'
            );
        });
    });

    it('Visual picker link: completed = true', () => {
        element.completed = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.avonni-visual-picker-link__tile'
            );
            expect(wrapper.classList).toContain(
                'slds-welcome-mat__tile_complete'
            );
        });
    });

    // href
    it('Visual picker link: href', () => {
        element.href = 'https://www.avonni.app/';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector(
                '[data-element-id="a"]'
            );
            expect(link.href).toBe('https://www.avonni.app/');
        });
    });

    // icon-name
    it('Visual picker link: iconName', () => {
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon-left"]'
            );

            expect(icon).toBeTruthy();
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    it('Visual picker link: no iconName', () => {
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const tileBody = element.shadowRoot.querySelector(
                '.slds-welcome-mat__tile-body'
            );

            expect(tileBody.classList).not.toContain(
                'avonni-visual-picker-link__tile-no-icon'
            );
        });
    });

    // icon-position
    // Depends on iconName
    it('Visual picker link: iconPosition = left', () => {
        element.iconName = 'utility:apps';
        element.iconPosition = 'left';

        return Promise.resolve().then(() => {
            const iconLeft = element.shadowRoot.querySelector(
                'a div:first-of-type.slds-media__figure'
            );
            const iconRight = element.shadowRoot.querySelector(
                '.avonni-visual-picker-link__figure-right'
            );
            const tileBody = element.shadowRoot.querySelector(
                '.slds-welcome-mat__tile-body'
            );

            expect(iconLeft).toBeTruthy();
            expect(iconRight).toBeFalsy();
            expect(tileBody.classList).not.toContain(
                'avonni-visual-picker-link__tile-body-right'
            );
        });
    });

    it('Visual picker link: iconPosition = right', () => {
        element.iconName = 'utility:apps';
        element.iconPosition = 'right';

        return Promise.resolve().then(() => {
            const iconLeft = element.shadowRoot.querySelector(
                'a div:first-of-type.slds-media__figure'
            );
            const iconRight = element.shadowRoot.querySelector(
                '.avonni-visual-picker-link__figure-right'
            );
            const tileBody = element.shadowRoot.querySelector(
                '.slds-welcome-mat__tile-body'
            );

            expect(iconLeft).toBeFalsy();
            expect(iconRight).toBeTruthy();
            expect(tileBody.classList).toContain(
                'avonni-visual-picker-link__tile-body-right'
            );
        });
    });

    // info-only
    it('Visual picker link: infoOnly = false', () => {
        element.infoOnly = false;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.avonni-visual-picker-link__tile'
            );
            const link = element.shadowRoot.querySelector(
                '[data-element-id="a"]'
            );

            expect(link).toBeTruthy();
            expect(wrapper.classList).not.toContain(
                'avonni-visual-picker-link__tile_info-only'
            );
        });
    });

    it('Visual picker link: infoOnly = true', () => {
        element.infoOnly = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.avonni-visual-picker-link__tile'
            );
            const link = element.shadowRoot.querySelector(
                '[data-element-id="a"]'
            );

            expect(link).toBeFalsy();
            expect(wrapper.classList).toContain(
                'avonni-visual-picker-link__tile_info-only'
            );
        });
    });

    // disabled
    it('Visual picker link: disabled = true', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector(
                '[data-element-id="container"]'
            );

            expect(link.classList).toContain(
                'avonni-visual-picker-link_disabled'
            );
        });
    });

    it('Visual picker link: disabled = false', () => {
        element.disabled = false;

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector(
                '[data-element-id="container"]'
            );

            expect(link.classList).not.toContain(
                'avonni-visual-picker-link_disabled'
            );
        });
    });

    // title
    it('Visual picker link: title', () => {
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '.avonni-visual-picker-link__tile-title'
            );
            expect(title.textContent).toBe('A string title');
        });
    });

    /* ----- EVENTS ----- */

    // click
    it('Visual picker link: click event', () => {
        const handler = jest.fn();
        element.addEventListener('click', handler);

        const link = element.shadowRoot.querySelector('[data-element-id="a"]');
        link.click();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });
});
