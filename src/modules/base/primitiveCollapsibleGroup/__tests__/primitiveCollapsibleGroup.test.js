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
import PrimitiveCollapsibleGroup from 'c/primitiveCollapsibleGroup';

let element = null;
describe('Primitive Collapsible Group', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-collapsible-group', {
            is: PrimitiveCollapsibleGroup
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.closed).toBeFalsy();
        expect(element.hideCollapsibleIcon).toBeFalsy();
        expect(element.level).toBeUndefined();
        expect(element.size).toBeUndefined();
        expect(element.sectionWidth).toBeUndefined();
        expect(element.title).toBeUndefined();
    });

    it('Closed attribute false', () => {
        element.title = 'Test';
        element.size = 4;
        element.closed = false;

        return Promise.resolve().then(() => {
            const section = element.shadowRoot.querySelector('.slds-section');
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(section.className).toContain('slds-is-open');
            expect(section.className).toContain(
                'avonni-primitive-collapsible-group__section_margin_bottom'
            );
            expect(icon.iconName).toBe('utility:chevrondown');
        });
    });

    it('Closed attribute true', () => {
        element.title = 'Test';
        element.size = 4;
        element.closed = true;

        return Promise.resolve().then(() => {
            const section = element.shadowRoot.querySelector('.slds-section');
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(section.className).not.toContain('slds-is-open');
            expect(section.className).not.toContain(
                'avonni-primitive-collapsible-group__section_margin_bottom'
            );
            expect(icon.iconName).toBe('utility:chevronright');
        });
    });

    it('Hide Collapsible Icon true', () => {
        element.hideCollapsibleIcon = true;
        element.title = 'Test';
        element.size = 4;

        return Promise.resolve().then(() => {
            const section = element.shadowRoot.querySelector('.slds-section');
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(section.className).toContain('slds-is-open');
            expect(section.className).toContain(
                'avonni-primitive-collapsible-group__section_margin_bottom'
            );
            expect(icon).toBeNull();
        });
    });

    it('Level = 2', () => {
        element.title = 'Test';
        element.size = 4;
        element.level = '2';

        return Promise.resolve().then(() => {
            expect(
                element.shadowRoot.querySelector('h3').style.paddingLeft
            ).toBe('2rem');
        });
    });

    it('Title and Size', () => {
        element.title = 'Test';
        element.size = 4;

        return Promise.resolve().then(() => {
            expect(element.shadowRoot.querySelector('h3').textContent).toBe(
                'Test (4)'
            );
        });
    });

    it('Section Width', () => {
        element.title = 'Test';
        element.size = 4;
        element.sectionWidth = 1000;

        return Promise.resolve().then(() => {
            expect(
                element.shadowRoot.querySelector('.slds-section').style.width
            ).toBe('1000px');
        });
    });

    it('Toggle Section', () => {
        element.title = 'Test';
        element.size = 4;
        element.closed = false;

        return Promise.resolve().then(() => {
            element.toggleSection();
            expect(element.closed).toBeTruthy();
        });
    });
});
