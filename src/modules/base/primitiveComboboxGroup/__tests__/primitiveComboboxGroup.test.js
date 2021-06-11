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
import PrimitiveComboboxGroup from 'c/primitiveComboboxGroup';

const options = [
    {
        avatarFallbackIconName: 'standard:account',
        groups: ['accounts'],
        label: 'Burlington Textiles Corp of America',
        secondaryText: 'Account - Burlington, NC',
        value: 'burlington',
        hasAvatar: true,
        computedClass: 'combobox__option',
        options: []
    },
    {
        label: 'Dickenson plc',
        value: 'dickenson',
        computedClass: 'combobox__option',
        options: [
            {
                avatarFallbackIconName: 'standard:opportunity',
                groups: ['opportunities'],
                label: 'Tyrell Corp',
                options: [],
                secondaryText: 'Opportunity',
                value: 'tyrell',
                hasAvatar: true,
                computedClass: 'combobox__option'
            }
        ],
        groups: []
    },
    {
        avatarFallbackIconName: 'standard:account',
        groups: ['accounts'],
        label: 'Edge Communication',
        secondaryText: 'Account - Singapore',
        value: 'edge',
        hasAvatar: true,
        showCheckmark: true,
        computedClass: 'combobox__option',
        options: []
    }
];

const groups = [
    {
        label: 'Accounts',
        name: 'accounts',
        options: options
    },
    {
        label: 'Opportunities',
        name: 'opportunities',
        options: [
            {
                avatarFallbackIconName: 'standard:opportunity',
                groups: ['opportunities'],
                label: 'Tyrell Corp',
                options: options,
                secondaryText: 'Opportunity',
                value: 'tyrell',
                hasAvatar: true,
                computedClass: 'combobox__option'
            }
        ],
        groups: [
            {
                label: 'Closed',
                name: 'closed',
                options: [
                    {
                        avatarFallbackIconName: 'standard:opportunity',
                        groups: ['opportunities', 'closed'],
                        label: 'United Oil SLA',
                        secondaryText: 'Opportunity - Closed',
                        value: 'oil-sla',
                        hasAvatar: true,
                        computedClass: 'combobox__option',
                        options: []
                    }
                ],
                groups: [
                    {
                        label: 'Won',
                        name: 'won',
                        options: [
                            {
                                avatarFallbackIconName: 'standard:opportunity',
                                groups: ['opportunities', 'closed', 'won'],
                                label: 'United Oil Standby Generators',
                                secondaryText: 'Opportunity - Closed Won',
                                value: 'united-oil',
                                hasAvatar: true,
                                showCheckmark: true,
                                computedClass: 'combobox__option',
                                options: []
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

describe('PrimitiveComboboxGroup', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-primitive-combobox-group', {
            is: PrimitiveComboboxGroup
        });

        expect(element.label).toBeUndefined();
        expect(element.groups).toMatchObject([]);
        expect(element.name).toBeUndefined();
        expect(element.options).toMatchObject([]);
        expect(element.removeSelectedOptions).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */

    // label
    it('label', () => {
        const element = createElement('base-primitive-combobox-group', {
            is: PrimitiveComboboxGroup
        });
        document.body.appendChild(element);

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector('h3');
            expect(label).toBeTruthy();
            expect(label.textContent).toBe('A string label');
        });
    });

    // groups
    it('groups', () => {
        const element = createElement('base-primitive-combobox-group', {
            is: PrimitiveComboboxGroup
        });
        document.body.appendChild(element);

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
        const element = createElement('base-primitive-combobox-group', {
            is: PrimitiveComboboxGroup
        });
        document.body.appendChild(element);

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
        const element = createElement('base-primitive-combobox-group', {
            is: PrimitiveComboboxGroup
        });
        document.body.appendChild(element);

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
        const element = createElement('base-primitive-combobox-group', {
            is: PrimitiveComboboxGroup
        });
        document.body.appendChild(element);

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

    /* ----- METHODS ----- */

    // optionsElements
    it('get optionsElements method', () => {
        const element = createElement('base-primitive-combobox-group', {
            is: PrimitiveComboboxGroup
        });
        document.body.appendChild(element);

        element.options = options;

        return Promise.resolve().then(() => {
            const optionsElements = element.optionsElements;
            expect(optionsElements).toHaveLength(3);
        });
    });

    /* ----- EVENTS ----- */

    // privateoptionclick event
    // Depends on options
    it('privateoptionclick event', () => {
        const element = createElement('base-primitive-combobox-group', {
            is: PrimitiveComboboxGroup
        });
        document.body.appendChild(element);

        element.options = options;
        const handler = jest.fn();
        element.addEventListener('privateoptionclick', handler);

        return Promise.resolve().then(() => {
            const option = element.shadowRoot.querySelector(
                'li[role="option"]'
            );
            option.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toBe(
                options[0].value
            );
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    // privateoptionmouseenter event
    // Depends on options
    it('privateoptionmouseenter event', () => {
        const element = createElement('base-primitive-combobox-group', {
            is: PrimitiveComboboxGroup
        });
        document.body.appendChild(element);

        element.options = options;
        const handler = jest.fn();
        element.addEventListener('privateoptionmouseenter', handler);

        return Promise.resolve().then(() => {
            const option = element.shadowRoot.querySelector(
                'li[role="option"]'
            );
            option.dispatchEvent(new CustomEvent('mouseenter'));

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toBe(
                options[0].value
            );
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    // privateoptionmouseleave event
    // Depends on options
    it('privateoptionmouseleave event', () => {
        const element = createElement('base-primitive-combobox-group', {
            is: PrimitiveComboboxGroup
        });
        document.body.appendChild(element);

        element.options = options;
        const handler = jest.fn();
        element.addEventListener('privateoptionmouseleave', handler);

        return Promise.resolve().then(() => {
            const option = element.shadowRoot.querySelector(
                'li[role="option"]'
            );
            option.dispatchEvent(new CustomEvent('mouseleave'));

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toBe(
                options[0].value
            );
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });
});
