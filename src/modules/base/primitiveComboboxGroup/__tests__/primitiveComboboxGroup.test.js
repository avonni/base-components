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

    it('Primitive combobox group: Default attributes', () => {
        expect(element.label).toBeUndefined();
        expect(element.groups).toMatchObject([]);
        expect(element.name).toBeUndefined();
        expect(element.options).toMatchObject([]);
        expect(element.removeSelectedOptions).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */

    // label
    it('Primitive combobox group: label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="h3"]'
            );
            expect(label).toBeTruthy();
            expect(label.textContent).toBe('A string label');
        });
    });

    // groups
    it('Primitive combobox group: groups', () => {
        element.groups = groups;

        return Promise.resolve().then(() => {
            const childGroups = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-combobox-group"]'
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
    it('Primitive combobox group: options', () => {
        element.options = options;

        return Promise.resolve().then(() => {
            const optionElements =
                element.shadowRoot.querySelectorAll('li[role="option"]');
            expect(optionElements).toHaveLength(options.length);

            optionElements.forEach((option, index) => {
                const optionObject = options[index];
                expect(option.ariaDisabled).toBe(
                    optionObject.disabled ? 'true' : 'false'
                );
                expect(option.className).toBe(optionObject.computedClass);
                expect(option.dataset.value).toBe(optionObject.value);

                const checkmark = option.querySelector(
                    '.slds-listbox__option-icon lightning-icon'
                );
                expect(!!checkmark).toBe(!!optionObject.showCheckmark);

                const avatar = option.querySelector(
                    '[data-element-id="avonni-avatar"]'
                );
                expect(!!avatar).toBe(!!optionObject.hasAvatar);

                const label = option.querySelector(
                    '.slds-listbox__option-text'
                );
                expect(label.textContent).toBe(optionObject.label);

                const secondaryText = option.querySelector(
                    '.slds-listbox__option-meta'
                );
                expect(
                    optionObject.secondaryText
                        ? secondaryText.textContent ===
                              optionObject.secondaryText
                        : !secondaryText
                ).toBeTruthy();

                const childrenChevron = option.querySelector(
                    '.slds-media__figure_reverse lightning-icon'
                );
                expect(!!childrenChevron).toBe(!!optionObject.options.length);
            });
        });
    });

    // remove-selected-options
    // Depends on groups and options
    it('Primitive combobox group: removeSelectedOptions = false', () => {
        element.groups = groups;
        element.options = options;
        element.removeSelectedOptions = false;

        return Promise.resolve().then(() => {
            const childGroups = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-combobox-group"]'
            );
            childGroups.forEach((group) => {
                expect(group.removeSelectedOptions).toBeFalsy();
            });

            const optionElements =
                element.shadowRoot.querySelectorAll('li[role="option"]');
            optionElements.forEach((option, index) => {
                const checkmark = option.querySelector(
                    '.slds-listbox__option-icon lightning-icon'
                );
                expect(!!checkmark).toBe(!!options[index].showCheckmark);
            });
        });
    });

    it('Primitive combobox group: removeSelectedOptions = true', () => {
        element.groups = groups;
        element.options = options;
        element.removeSelectedOptions = true;

        return Promise.resolve().then(() => {
            const childGroups = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-combobox-group"]'
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
    it('Primitive combobox group: get optionElements', () => {
        element.options = options;

        return Promise.resolve().then(() => {
            const optionElements = element.optionElements;
            expect(optionElements).toHaveLength(3);
        });
    });

    // titleElement
    it('Primitive combobox group: get titleElement', () => {
        element.label = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.titleElement;
            expect(title).toBeTruthy();
        });
    });

    /* ----- EVENTS ----- */

    // privateoptionclick event
    // Depends on options and name
    it('Primitive combobox group: privateoptionclick event', () => {
        element.options = options;
        element.name = 'string-name';
        const handler = jest.fn();
        element.addEventListener('privateoptionclick', handler);

        return Promise.resolve().then(() => {
            const option =
                element.shadowRoot.querySelector('li[role="option"]');
            option.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.id).toBe('string-name-0');
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    it('Primitive combobox group: privateoptionclick event, disabled', () => {
        element.options = options;
        element.name = 'string-name';
        const handler = jest.fn();
        element.addEventListener('privateoptionclick', handler);

        return Promise.resolve().then(() => {
            const option =
                element.shadowRoot.querySelectorAll('li[role="option"]')[2];
            option.click();

            expect(handler).toHaveBeenCalledTimes(0);
        });
    });

    // privateoptionmouseenter event
    // Depends on options and name
    it('Primitive combobox group: privateoptionmouseenter event', () => {
        element.options = options;
        element.name = 'string-name';
        const handler = jest.fn();
        element.addEventListener('privateoptionmouseenter', handler);

        return Promise.resolve().then(() => {
            const option =
                element.shadowRoot.querySelector('li[role="option"]');
            option.dispatchEvent(new CustomEvent('mouseenter'));

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.id).toBe('string-name-0');
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });
});
