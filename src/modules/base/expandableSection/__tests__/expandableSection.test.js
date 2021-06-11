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
import ExpandableSection from 'c/expandableSection';

describe('Expandable Section', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Expandable Section Default attributes', () => {
        const element = createElement('base-expandable-section', {
            is: ExpandableSection
        });

        expect(element.title).toBeUndefined();
        expect(element.closed).toBeFalsy();
        expect(element.collapsible).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */

    // title
    it('Expandable Section title', () => {
        const element = createElement('base-expandable-section', {
            is: ExpandableSection
        });
        document.body.appendChild(element);

        element.title = 'This is a title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h3');
            expect(title.textContent).toBe('This is a title');
        });
    });

    // closed
    it('Expandable Section closed', () => {
        const element = createElement('base-expandable-section', {
            is: ExpandableSection
        });
        document.body.appendChild(element);

        element.closed = true;
        element.collapsible = true;

        return Promise.resolve().then(() => {
            const section = element.shadowRoot.querySelector('.slds-section');
            expect(section.className).not.toContain('slds-is-open');
        });
    });

    // collapsible
    it('Expandable Section collapsible true', () => {
        const element = createElement('base-expandable-section', {
            is: ExpandableSection
        });
        document.body.appendChild(element);

        element.collapsible = true;

        return Promise.resolve().then(() => {
            const section = element.shadowRoot.querySelector('.slds-section');
            expect(section.className).toContain('slds-is-open');
            const title = element.shadowRoot.querySelector(
                '.slds-section__title'
            );
            expect(title.className).not.toContain('slds-theme_shade');
            const spanTitle = element.shadowRoot.querySelector(
                '.slds-truncate'
            );
            expect(spanTitle.className).not.toContain(
                'slds-p-horizontal_small'
            );
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon).toBeTruthy();
        });
    });

    it('Expandable Section collapsible false', () => {
        const element = createElement('base-expandable-section', {
            is: ExpandableSection
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const section = element.shadowRoot.querySelector('.slds-section');
            expect(section.className).toContain('slds-is-open');
            const title = element.shadowRoot.querySelector(
                '.slds-section__title'
            );
            expect(title.className).toContain('slds-theme_shade');
            const spanTitle = element.shadowRoot.querySelector(
                '.slds-truncate'
            );
            expect(spanTitle.className).toContain('slds-p-horizontal_small');
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon).toBeFalsy();
        });
    });
});
