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

let element;
describe('Expandable Section', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-expandable-section', {
            is: ExpandableSection
        });
        document.body.appendChild(element);
    });

    it('Expandable Section Default attributes', () => {
        expect(element.title).toBeUndefined();
        expect(element.closed).toBeFalsy();
        expect(element.collapsible).toBeFalsy();
        expect(element.variant).toBe('shaded');
    });

    /* ----- ATTRIBUTES ----- */

    // title
    it('Expandable Section title', () => {
        element.title = 'This is a title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '[data-element-id="h3"]'
            );
            expect(title.textContent).toBe('This is a title');
        });
    });

    it('Empty title and no collapsible', () => {
        const header = element.shadowRoot.querySelector('.slds-section__title');
        expect(header).toBeFalsy();
    });

    // closed
    it('Expandable Section closed', () => {
        element.closed = true;
        element.collapsible = true;

        return Promise.resolve().then(() => {
            const section = element.shadowRoot.querySelector('.slds-section');
            expect(section.className).not.toContain('slds-is-open');
        });
    });

    // collapsible
    // Depends on title
    it('Expandable Section collapsible true', () => {
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
            const icon = element.shadowRoot.querySelector(
                '[data-element-id^="lightning-icon"]'
            );
            expect(icon).toBeTruthy();
        });
    });

    it('Expandable Section collapsible false', () => {
        element.title = 'Some title';
        element.collapsible = false;

        return Promise.resolve().then(() => {
            const section = element.shadowRoot.querySelector('.slds-section');
            expect(section.className).toContain('slds-is-open');
            const title = element.shadowRoot.querySelector(
                '.slds-section__title span'
            );
            expect(title).toBeTruthy();

            const icon = element.shadowRoot.querySelector(
                '[data-element-id^="lightning-icon"]'
            );
            expect(icon).toBeFalsy();
        });
    });

    // variant
    // Depends on title and collapsible
    it('Shaded variant, with no collapsible', () => {
        element.title = 'Some title';
        element.variant = 'shaded';

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                '.slds-section__title'
            );
            expect(header.className).toContain('slds-theme_shade');
        });
    });

    it('Base variant, with no collapsible', () => {
        element.title = 'Some title';
        element.variant = 'base';

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                '.slds-section__title'
            );
            expect(header.className).not.toContain('slds-theme_shade');
        });
    });

    it('Base variant, with collapsible', () => {
        element.variant = 'base';
        element.collapsible = true;

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                '.slds-section__title'
            );
            expect(header.className).not.toContain('slds-theme_shade');

            const title = header.querySelector('.slds-section__title-action');
            expect(title.classList).toContain('slds-theme_default');
            expect(title.classList).toContain(
                'avonni-expandable-section__title-button_base'
            );
        });
    });

    it('Shaded variant, with collapsible', () => {
        element.variant = 'shaded';
        element.collapsible = true;

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                '.slds-section__title'
            );
            expect(header.className).not.toContain('slds-theme_shade');

            const title = header.querySelector('.slds-section__title-action');
            expect(title.classList).not.toContain('slds-theme_default');
            expect(title.classList).not.toContain(
                'avonni-expandable-section__title-button_base'
            );
        });
    });

    /* ----- EVENTS ----- */

    // toggle
    // Depends on collapsible
    it('toggle event', () => {
        element.collapsible = true;

        const handler = jest.fn();
        element.addEventListener('toggle', handler);

        const section = element.shadowRoot.querySelector('.slds-section');
        expect(section.classList).toContain('slds-is-open');

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '.slds-section__title-action'
                );
                button.click();
            })
            .then(() => {
                expect(handler).toHaveBeenCalledTimes(1);
                expect(handler.mock.calls[0][0].detail.closed).toBeTruthy();

                const button = element.shadowRoot.querySelector(
                    '.slds-section__title-action'
                );
                expect(section.classList).not.toContain('slds-is-open');
                button.click();
            })
            .then(() => {
                expect(section.classList).toContain('slds-is-open');
                expect(handler).toHaveBeenCalledTimes(2);
                expect(handler.mock.calls[1][0].detail.closed).toBeFalsy();
            });
    });
});
