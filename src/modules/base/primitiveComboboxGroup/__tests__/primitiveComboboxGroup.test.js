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
import { groups, options } from './data';
import PrimitiveComboboxGroup from 'c/primitiveComboboxGroup';

let element;
describe('PrimitiveComboboxGroup', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-combobox-group', {
            is: PrimitiveComboboxGroup
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.label).toBeUndefined();
        expect(element.groups).toMatchObject([]);
        expect(element.name).toBeUndefined();
        expect(element.options).toMatchObject([]);
        expect(element.removeSelectedOptions).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */

    // label
    it('label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector('h3');
            expect(label).toBeTruthy();
            expect(label.textContent).toBe('A string label');
        });
    });

    // groups
    it('groups', () => {
        element.groups = groups;

        return Promise.resolve().then(() => {
            const childGroups = element.shadowRoot.querySelectorAll(
                'c-primitive-combobox-group'
            );
            expect(childGroups).toHaveLength(groups.length);

            childGroups.forEach((group, index) => {
                expect(group.name).toBe(groups[index].name);
                expect(group.label).toBe(groups[index].label);
                expect(group.options).toMatchObject(
                    groups[index].options || []
                );
                expect(group.groups).toMatchObject(groups[index].groups || []);
            });
        });
    });

    // options
    it('options', () => {
        element.options = options;

        return Promise.resolve().then(() => {
            const optionElements = element.shadowRoot.querySelectorAll(
                'li[role="option"]'
            );
            expect(optionElements).toHaveLength(options.length);

            optionElements.forEach((option, index) => {
                expect(option.className).toBe(options[index].computedClass);
                expect(option.dataset.value).toBe(options[index].value);

                const checkmark = option.querySelector(
                    '.slds-listbox__option-icon lightning-icon'
                );
                if (options[index].showCheckmark) {
                    expect(checkmark).toBeTruthy();
                } else {
                    expect(checkmark).toBeFalsy();
                }

                const avatar = option.querySelector('c-avatar');
                if (options[index].hasAvatar) {
                    expect(avatar).toBeTruthy();
                } else {
                    expect(avatar).toBeFalsy();
                }

                const label = option.querySelector(
                    '.slds-listbox__option-text'
                );
                expect(label.textContent).toBe(options[index].label);

                const secondaryText = option.querySelector(
                    '.slds-listbox__option-meta'
                );
                if (options[index].secondaryText) {
                    expect(secondaryText.textContent).toBe(
                        options[index].secondaryText
                    );
                } else {
                    expect(secondaryText).toBeFalsy();
                }

                const childrenChevron = option.querySelector(
                    '.slds-media__figure_reverse lightning-icon'
                );
                if (options[index].options.length) {
                    expect(childrenChevron).toBeTruthy();
                } else {
                    expect(childrenChevron).toBeFalsy();
                }
            });
        });
    });

    // remove-selected-options
    // Depends on groups and options
    it('removeSelectedOptions = false', () => {
        element.groups = groups;
        element.options = options;
        element.removeSelectedOptions = false;

        return Promise.resolve().then(() => {
            const childGroups = element.shadowRoot.querySelectorAll(
                'c-primitive-combobox-group'
            );
            childGroups.forEach((group) => {
                expect(group.removeSelectedOptions).toBeFalsy();
            });

            const optionElements = element.shadowRoot.querySelectorAll(
                'li[role="option"]'
            );
            optionElements.forEach((option, index) => {
                const checkmark = option.querySelector(
                    '.slds-listbox__option-icon lightning-icon'
                );
                if (options[index].showCheckmark) {
                    expect(checkmark).toBeTruthy();
                } else {
                    expect(checkmark).toBeFalsy();
                }
            });
        });
    });

    it('removeSelectedOptions = true', () => {
        element.groups = groups;
        element.options = options;
        element.removeSelectedOptions = true;

        return Promise.resolve().then(() => {
            const childGroups = element.shadowRoot.querySelectorAll(
                'c-primitive-combobox-group'
            );
            childGroups.forEach((group) => {
                expect(group.removeSelectedOptions).toBeTruthy();
            });

            const checkmarks = element.shadowRoot.querySelectorAll(
                '.slds-listbox__option-icon lightning-icon'
            );
            expect(checkmarks).toHaveLength(0);
        });
    });

    /* ----- COMPUTED PUBLIC VARIABLES ----- */

    // optionElements
    it('get optionElements', () => {
        element.options = options;

        return Promise.resolve().then(() => {
            const optionElements = element.optionElements;
            expect(optionElements).toHaveLength(3);
        });
    });

    // titleElement
    it('get titleElement', () => {
        element.label = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.titleElement;
            expect(title).toBeTruthy();
        });
    });

    /* ----- EVENTS ----- */

    // privateoptionclick event
    // Depends on options and name
    it('privateoptionclick event', () => {
        element.options = options;
        element.name = 'string-name';
        const handler = jest.fn();
        element.addEventListener('privateoptionclick', handler);

        return Promise.resolve().then(() => {
            const option = element.shadowRoot.querySelector(
                'li[role="option"]'
            );
            option.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.id).toBe('string-name-0');
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    // privateoptionmouseenter event
    // Depends on options and name
    it('privateoptionmouseenter event', () => {
        element.options = options;
        element.name = 'string-name';
        const handler = jest.fn();
        element.addEventListener('privateoptionmouseenter', handler);

        return Promise.resolve().then(() => {
            const option = element.shadowRoot.querySelector(
                'li[role="option"]'
            );
            option.dispatchEvent(new CustomEvent('mouseenter'));

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.id).toBe('string-name-0');
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });
});
