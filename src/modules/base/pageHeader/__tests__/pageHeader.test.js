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
import PageHeader from 'c/pageHeader';

let element;
describe('PageHeader', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-page-header', {
            is: PageHeader
        });
        document.body.appendChild(element);
    });

    it('Page header: Default attributes', () => {
        expect(element.iconName).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.title).toBeUndefined();
        expect(element.info).toBeUndefined();
        expect(element.variant).toBe('base');
        expect(element.isJoined).toBeFalsy();
    });

    // icon-name
    it('Page header: iconName', () => {
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-mobile"]'
            );
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // label
    // Depends on variant
    it('Page header: label', () => {
        element.variant = 'object-home';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-page-header__name > .slds-page-header__name-title > span'
            );

            expect(label.textContent).toBe('A string label');
        });
    });

    // title
    it('Page header: title', () => {
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '.slds-page-header__title'
            );

            expect(title.textContent).toBe('A string title');
        });
    });

    // info
    // Depends on variant
    it('Page header: info with the default (base) variant', () => {
        element.info = 'A string info';

        return Promise.resolve().then(() => {
            const info = element.shadowRoot.querySelector(
                '.slds-page-header__name-meta'
            );

            expect(info.textContent).toBe('A string info');
        });
    });

    it('Page header: info with the object-home variant', () => {
        element.info = 'A string info';
        element.variant = 'object-home';

        return Promise.resolve().then(() => {
            const info = element.shadowRoot.querySelector(
                '.slds-page-header__meta-text'
            );

            expect(info.textContent).toBe('A string info');
        });
    });

    // is-joined
    it('Page header: if-joined with base variant', () => {
        element.variant = 'base';
        element.isJoined = true;

        return Promise.resolve().then(() => {
            const header =
                element.shadowRoot.querySelector('.slds-page-header');

            expect(header.classList).toContain('slds-page-header_joined');
        });
    });

    it('Page header: if-joined with record-home-vertical variant', () => {
        element.variant = 'record-home-vertical';
        element.isJoined = true;

        return Promise.resolve().then(() => {
            const header =
                element.shadowRoot.querySelector('.slds-page-header');

            expect(header.classList).toContain('slds-page-header_vertical');
            expect(header.classList).toContain('slds-page-header_joined');
        });
    });

    // variant
    it('Page header: variant = base', () => {
        element.variant = 'base';

        return Promise.resolve().then(() => {
            const wrapper =
                element.shadowRoot.querySelector('.slds-page-header');
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );
            const bodyInfo = element.shadowRoot.querySelector(
                '.slds-page-header__meta-text'
            );
            const headerInfo = element.shadowRoot.querySelector(
                '[data-element-id="header-info"]'
            );
            const details = element.shadowRoot.querySelector(
                'slot[name="details"]'
            );

            expect(label).toBeFalsy();
            expect(bodyInfo).toBeFalsy();
            expect(headerInfo).toBeTruthy();
            expect(details).toBeFalsy();

            expect(wrapper.classList).not.toContain(
                'avonni-page-header__header_object-home'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-page-header__header_record-home'
            );
            expect(wrapper.classList).not.toContain(
                'slds-page-header_vertical'
            );
        });
    });

    it('Page header: variant = object-home', () => {
        element.variant = 'object-home';

        return Promise.resolve().then(() => {
            const wrapper =
                element.shadowRoot.querySelector('.slds-page-header');
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );
            const bodyInfo = element.shadowRoot.querySelector(
                '.slds-page-header__meta-text'
            );
            const headerInfo = element.shadowRoot.querySelector(
                '[data-element-id="header-info"]'
            );
            const details = element.shadowRoot.querySelector(
                'slot[name="details"]'
            );

            expect(label).toBeTruthy();
            expect(bodyInfo).toBeTruthy();
            expect(headerInfo).toBeFalsy();
            expect(details).toBeFalsy();

            expect(wrapper.classList).toContain(
                'avonni-page-header__header_object-home'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-page-header__header_record-home'
            );
            expect(wrapper.classList).not.toContain(
                'slds-page-header_vertical'
            );
        });
    });

    it('Page header: variant = record-home', () => {
        element.variant = 'record-home';

        return Promise.resolve().then(() => {
            const wrapper =
                element.shadowRoot.querySelector('.slds-page-header');
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );
            const bodyInfo = element.shadowRoot.querySelector(
                '.slds-page-header__meta-text'
            );
            const headerInfo = element.shadowRoot.querySelector(
                '[data-element-id="header-info"]'
            );
            const details = element.shadowRoot.querySelector(
                'slot[name="details"]'
            );

            expect(label).toBeTruthy();
            expect(bodyInfo).toBeTruthy();
            expect(headerInfo).toBeFalsy();
            expect(details).toBeTruthy();

            expect(wrapper.classList).not.toContain(
                'avonni-page-header__header_object-home'
            );
            expect(wrapper.classList).toContain(
                'avonni-page-header__header_record-home'
            );
            expect(wrapper.classList).not.toContain(
                'slds-page-header_vertical'
            );
        });
    });

    it('Page header: variant = record-home-vertical', () => {
        element.variant = 'record-home-vertical';

        return Promise.resolve().then(() => {
            const wrapper =
                element.shadowRoot.querySelector('.slds-page-header');
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );
            const bodyInfo = element.shadowRoot.querySelector(
                '.slds-page-header__meta-text'
            );
            const headerInfo = element.shadowRoot.querySelector(
                '[data-element-id="header-info"]'
            );
            const details = element.shadowRoot.querySelector(
                'slot[name="details"]'
            );

            expect(label).toBeTruthy();
            expect(bodyInfo).toBeTruthy();
            expect(headerInfo).toBeFalsy();
            expect(details).toBeTruthy();

            expect(wrapper.classList).not.toContain(
                'avonni-page-header__header_object-home'
            );
            expect(wrapper.classList).not.toContain(
                'avonni-page-header__header_record-home'
            );
            expect(wrapper.classList).toContain('slds-page-header_vertical');
        });
    });
});
