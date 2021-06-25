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
import DualListbox from 'c/dualListbox';

// Not tested
// maxVisibleOptions, because depends on DOM measurements (offsetHeight)

const options = [
    {
        value: '1',
        label: 'Option 1'
    },
    {
        value: '2',
        label: 'Option 2'
    },
    {
        value: '3',
        label: 'Option 3'
    },
    {
        value: '4',
        label: 'Option 4'
    },
    {
        value: '5',
        label: 'Option 5'
    }
];

describe('DualListbox', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Dual Listbox Default attributes', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        expect(element.addButtonIconName).toBe('utility:right');
        expect(element.addButtonLabel).toBeUndefined();
        expect(element.hideBottomDivider).toBeFalsy();
        expect(element.buttonSize).toBe('medium');
        expect(element.buttonVariant).toBe('border');
        expect(element.disableReordering).toBeFalsy();
        expect(element.disabled).toBeFalsy();
        expect(element.downButtonIconName).toBe('utility:down');
        expect(element.downButtonLabel).toBeUndefined();
        expect(element.draggable).toBeFalsy();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.isLoading).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.max).toBeUndefined();
        expect(element.min).toBe(0);
        expect(element.messageWhenRangerOverflow).toBeUndefined();
        expect(element.messageWhenRangerUnderflow).toBeUndefined();
        expect(element.messageWhenValueIsMissing).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.options).toMatchObject([]);
        expect(element.required).toBeFalsy();
        expect(element.requiredOptions).toMatchObject([]);
        expect(element.searchEngine).toBeFalsy();
        expect(element.selectedLabel).toBeUndefined();
        expect(element.selectedPlaceholder).toBeUndefined();
        expect(element.maxVisibleOptions).toBe(5);
        expect(element.sourceLabel).toBeUndefined();
        expect(element.upButtonIconName).toBe('utility:up');
        expect(element.upButtonLabel).toBeUndefined();
        expect(element.validity).toBeUndefined();
        expect(element.value).toMatchObject([]);
        expect(element.variant).toBe('standard');
        expect(element.size).toBe('medium');
    });

    /* ----- ATTRIBUTES ----- */

    // add-button-icon-name & add-button-label
    it('Dual Listbox add button icon name and label', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.addButtonIconName = 'utility:add';
        element.addButtonLabel = 'add';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelector(
                "lightning-button-icon[title='add']"
            );
            expect(lightningButtonIcon.iconName).toBe('utility:add');
            expect(lightningButtonIcon.title).toBe('add');
        });
    });

    // hide bottom divider
    it('Dual Listbox hide bottom divider', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.options = options;

        element.hideBottomDivider = true;

        return Promise.resolve().then(() => {
            const li = element.shadowRoot.querySelectorAll(
                '.slds-listbox__item'
            );
            li.forEach((item) => {
                expect(item.className).not.toContain(
                    'avonni-dual-listbox-option-border_bottom'
                );
            });
        });
    });

    // button-size
    it('Dual Listbox button size xx-small', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonSize = 'xx-small';

        return Promise.resolve().then(() => {
            expect(element.buttonSize).toBe('xx-small');
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.size).toBe('xx-small');
            });
        });
    });

    it('Dual Listbox button size x-small', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonSize = 'x-small';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.size).toBe('x-small');
            });
        });
    });

    it('Dual Listbox button size small', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonSize = 'small';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.size).toBe('small');
            });
        });
    });

    it('Dual Listbox button size medium', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonSize = 'medium';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.size).toBe('medium');
            });
        });
    });

    it('Dual Listbox button size large', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonSize = 'large';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.size).toBe('large');
            });
        });
    });

    // button-variant
    it('Dual Listbox button variant bare', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonVariant = 'bare';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.variant).toBe('bare');
            });
        });
    });

    it('Dual Listbox button variant container', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonVariant = 'container';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.variant).toBe('container');
            });
        });
    });

    it('Dual Listbox button variant brand', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonVariant = 'brand';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.variant).toBe('brand');
            });
        });
    });

    it('Dual Listbox button variant border-filled', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonVariant = 'border-filled';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.variant).toBe('border-filled');
            });
        });
    });

    it('Dual Listbox button variant bare-inverse', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonVariant = 'bare-inverse';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.variant).toBe('bare-inverse');
            });
        });
    });

    it('Dual Listbox button variant border-inverse', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.buttonVariant = 'border-inverse';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            lightningButtonIcon.forEach((button) => {
                expect(button.variant).toBe('border-inverse');
            });
        });
    });

    // disable-reordering
    it('Dual Listbox disable reordering', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.disableReordering = true;
        element.addButtonLabel = 'add';
        element.removeButtonLabel = 'remove';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );

            expect(lightningButtonIcon.length).toBe(2);
            expect(lightningButtonIcon[0].title).toBe('add');
            expect(lightningButtonIcon[1].title).toBe('remove');
        });
    });

    // disabled
    it('Dual Listbox disabled', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.disabled = true;
        element.addButtonLabel = 'add';
        element.downButtonLabel = 'down';
        element.removeButtonLabel = 'remove';
        element.upButtonLabel = 'up';

        return Promise.resolve().then(() => {
            const columns = element.shadowRoot.querySelectorAll(
                '.slds-dueling-list__options'
            );

            const buttons = element.shadowRoot.querySelectorAll('button');
            buttons.forEach((button) => {
                expect(button.disabled).toBeTruthy();
            });

            columns.forEach((column) => {
                expect(column.classList).toContain('slds-is-disabled');
            });
        });
    });

    // down-button-icon-name & down-button-label
    it('Dual Listbox down button icon name and label', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.downButtonIconName = 'utility:apex';
        element.downButtonLabel = 'down';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelector(
                "lightning-button-icon[title='down']"
            );
            expect(lightningButtonIcon.iconName).toBe('utility:apex');
            expect(lightningButtonIcon.title).toBe('down');
        });
    });

    // draggagble
    it('Dual Listbox draggable without disabled', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.options = options;
        element.draggable = true;

        return Promise.resolve().then(() => {
            const optionsDraggable = element.shadowRoot.querySelectorAll(
                '.slds-listbox__option'
            );
            optionsDraggable.forEach((option) => {
                expect(option.draggable).toBeTruthy();
            });
        });
    });

    it('Dual Listbox draggable with disabled', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.options = options;
        element.draggable = true;
        element.disabled = true;

        return Promise.resolve().then(() => {
            const optionsDraggable = element.shadowRoot.querySelectorAll(
                '.slds-listbox__option'
            );
            optionsDraggable.forEach((option) => {
                expect(option.draggable).toBeFalsy();
            });
        });
    });

    // field-level-help
    it('Dual Listbox field level help', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.fieldLevelHelp = 'A string help';

        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector('lightning-helptext');
            expect(help).toBeTruthy();
        });
    });

    // isLoading
    it('Dual Listbox is loading', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.isLoading = true;

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                'lightning-spinner'
            );
            expect(spinner).toBeTruthy();
        });
    });

    // label
    it('Dual Listbox label', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // message-when-range-overflow and max
    it('Dual Listbox message when range overflow', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.max = 2;
        element.messageWhenRangeOverflow = 'Maximum Capacity!';
        element.options = options;
        element.value = ['1', '2', '3'];
        element.addButtonLabel = 'add';

        return Promise.resolve()
            .then(() => {
                const lightningButtonIcon = element.shadowRoot.querySelector(
                    "lightning-button-icon[title='add']"
                );
                element.focus();
                lightningButtonIcon.click();
                element.blur();
            })
            .then(() => {
                const div = element.shadowRoot.querySelector(
                    "div[role='alert']"
                );
                const message = element.shadowRoot.querySelector(
                    '.slds-has-error.slds-form-element__help'
                );
                expect(message.textContent).toBe('Maximum Capacity!');
                expect(div).toBeTruthy();
            });
    });

    // message-when-range-underflow and min
    it('Dual Listbox message when range underflow', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);
        element.messageWhenRangeUnderflow = 'Minimum Capacity!';
        element.min = 5;
        element.options = options;
        element.value = ['1', '2', '3', '4', '5'];
        element.removeButtonLabel = 'remove';

        return Promise.resolve()
            .then(() => {
                const opt = element.shadowRoot.querySelector(
                    "div[data-value='1']"
                );
                opt.click();
                const lightningButtonIcon = element.shadowRoot.querySelector(
                    "lightning-button-icon[title='remove']"
                );
                lightningButtonIcon.click();
                element.blur();
            })
            .then(() => {
                element.value = [];
                const message = element.shadowRoot.querySelector(
                    '.slds-has-error.slds-form-element__help'
                );
                expect(message.textContent).toBe('Minimum Capacity!');
            });
    });

    // message-when-value-missing
    it('Dual Listbox message when value is missing', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);
        element.required = true;
        element.options = options;
        element.messageWhenValueMissing = 'Missing value!';
        element.value = ['1'];
        element.removeButtonLabel = 'remove';

        return Promise.resolve()
            .then(() => {
                const opt = element.shadowRoot.querySelector(
                    "div[data-value='1']"
                );
                opt.click();
                const lightningButtonIcon = element.shadowRoot.querySelector(
                    "lightning-button-icon[title='remove']"
                );
                lightningButtonIcon.click();
                element.blur();
            })
            .then(() => {
                element.value = [];
                const message = element.shadowRoot.querySelector(
                    '.slds-has-error.slds-form-element__help'
                );
                expect(message.textContent).toBe('Missing value!');
            });
    });

    // options
    it('Dual Listbox options with avatar', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        const optionWithAvatar = [
            {
                value: '1',
                label: 'Option 1',
                iconName: 'standard:address'
            }
        ];

        element.options = optionWithAvatar;

        return Promise.resolve()
            .then(() => {
                const optionValue = element.shadowRoot.querySelector(
                    "div[data-value='1']"
                );
                expect(optionValue).toBeTruthy();
            })
            .then(() => {
                const label = element.shadowRoot.querySelector(
                    '.slds-media__body'
                );
                expect(label.textContent).toBe('Option 1');
            });
    });

    it('Dual Listbox options without avatar', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        const optionWithAvatar = [
            {
                value: '1',
                label: 'Option 1'
            }
        ];

        element.options = optionWithAvatar;

        return Promise.resolve()
            .then(() => {
                const optionValue = element.shadowRoot.querySelector(
                    "div[data-value='1']"
                );
                expect(optionValue).toBeTruthy();
            })
            .then(() => {
                const label = element.shadowRoot.querySelector(
                    '.slds-media__body'
                );
                expect(label.textContent).toBe('Option 1');
            });
    });

    // remove-button-icon-name & remove-button-label
    it('Dual Listbox remove button icon name and label', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.removeButtonIconName = 'utility:apex';
        element.removeButtonLabel = 'remove';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelector(
                "lightning-button-icon[title='remove']"
            );
            expect(lightningButtonIcon.iconName).toBe('utility:apex');
            expect(lightningButtonIcon.title).toBe('remove');
        });
    });

    // required
    it('Dual Listbox required', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);
        element.required = true;

        return Promise.resolve().then(() => {
            const asterisk = element.shadowRoot.querySelector('.slds-required');
            expect(asterisk).toBeTruthy();
        });
    });

    // required options
    it('Dual Listbox required options', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.options = options;

        return Promise.resolve()
            .then(() => {
                element.requiredOptions = ['1'];
            })
            .then(() => {
                const selected = element.shadowRoot.querySelector(
                    'ul[data-selected-list]'
                );
                expect(selected.querySelectorAll('li')).toHaveLength(1);
            });
    });

    // search engine
    it('Dual Listbox search engine', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);
        element.searchEngine = true;

        return Promise.resolve().then(() => {
            const searchBox = element.shadowRoot.querySelector(
                'lightning-input'
            );
            expect(searchBox).toBeTruthy();
            expect(searchBox.type).toBe('search');
        });
    });

    // selected label and source label
    it('Dual Listbox selected label & source label', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.sourceLabel = 'A string source label';
        element.selectedLabel = 'A string selected label';

        return Promise.resolve().then(() => {
            const Labels = element.shadowRoot.querySelectorAll(
                "span[class='slds-form-element__label']"
            );
            expect(Labels[0].textContent).toBe('A string source label');
            expect(Labels[1].textContent).toBe('A string selected label');
        });
    });

    // selected placeholder
    it('Dual Listbox selected placeholder', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.value = [];
        element.selectedPlaceholder = 'A string selected placeholder';

        return Promise.resolve().then(() => {
            const placeHolder = element.shadowRoot.querySelector('ul + span');
            expect(placeHolder.textContent).toBe(
                'A string selected placeholder'
            );
        });
    });

    // up-button-icon-name & up-button-label
    it('Dual Listbox up button icon name and label', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.upButtonIconName = 'utility:apex';
        element.upButtonLabel = 'up';

        return Promise.resolve().then(() => {
            const lightningButtonIcon = element.shadowRoot.querySelector(
                "lightning-button-icon[title='up']"
            );
            expect(lightningButtonIcon.iconName).toBe('utility:apex');
            expect(lightningButtonIcon.title).toBe('up');
        });
    });

    // value
    it('Dual Listbox value', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.options = options;
        element.value = ['1', '2', '3'];

        return Promise.resolve().then(() => {
            const source = element.shadowRoot.querySelector(
                'ul[data-source-list]'
            );
            const selected = element.shadowRoot.querySelector(
                'ul[data-selected-list]'
            );
            expect(source.querySelectorAll('li')).toHaveLength(2);
            expect(selected.querySelectorAll('li')).toHaveLength(3);
        });
    });

    // variants
    it('Dual Listbox variant label hidden', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.label = 'This is a label-hidden';
        element.variant = 'label-hidden';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            expect(label.textContent).toBe('This is a label-hidden');
        });
    });

    it('Dual Listbox variant label stacked', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.variant = 'label-stacked';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector(
                '.slds-form-element_stacked'
            );
            expect(div).toBeTruthy();
        });
    });

    // size
    it('Dual Listbox size small', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.size = 'small';

        return Promise.resolve().then(() => {
            const columns = element.shadowRoot.querySelectorAll(
                '.avonni-dual-listbox-list__column'
            );
            const boxes = element.shadowRoot.querySelectorAll(
                '.slds-dueling-list__options'
            );

            const sourceListColumn = columns[0];
            const selectedListColumn = columns[2];
            expect(sourceListColumn.className).toBe(
                'avonni-dual-listbox-list__column avonni-dual-listbox-list__column_responsive_small'
            );
            expect(selectedListColumn.className).toBe(
                'avonni-dual-listbox-list__column avonni-dual-listbox-list__column_responsive_small'
            );
            boxes.forEach((box) => {
                expect(box.className).toContain(
                    'avonni-dual-listbox-size_small'
                );
                expect(box.className).not.toContain(
                    'avonni-dual-listbox-size_medium'
                );
                expect(box.className).not.toContain(
                    'avonni-dual-listbox-size_large'
                );
            });
        });
    });

    it('Dual Listbox size medium', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.size = 'medium';

        return Promise.resolve().then(() => {
            const columns = element.shadowRoot.querySelectorAll(
                '.avonni-dual-listbox-list__column'
            );
            const boxes = element.shadowRoot.querySelectorAll(
                '.slds-dueling-list__options'
            );

            const sourceListColumn = columns[0];
            const selectedListColumn = columns[2];
            expect(sourceListColumn.className).toBe(
                'avonni-dual-listbox-list__column avonni-dual-listbox-list__column_responsive_medium'
            );
            expect(selectedListColumn.className).toBe(
                'avonni-dual-listbox-list__column avonni-dual-listbox-list__column_responsive_medium'
            );
            boxes.forEach((box) => {
                expect(box.className).not.toContain(
                    'avonni-dual-listbox-size_small'
                );
                expect(box.className).toContain(
                    'avonni-dual-listbox-size_medium'
                );
                expect(box.className).not.toContain(
                    'avonni-dual-listbox-size_large'
                );
            });
        });
    });

    it('Dual Listbox size large', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.size = 'large';

        return Promise.resolve().then(() => {
            const columns = element.shadowRoot.querySelectorAll(
                '.avonni-dual-listbox-list__column'
            );
            const boxes = element.shadowRoot.querySelectorAll(
                '.slds-dueling-list__options'
            );

            const sourceListColumn = columns[0];
            const selectedListColumn = columns[2];
            expect(sourceListColumn.className).toBe(
                'avonni-dual-listbox-list__column avonni-dual-listbox-list__column_responsive_large'
            );
            expect(selectedListColumn.className).toBe(
                'avonni-dual-listbox-list__column avonni-dual-listbox-list__column_responsive_large'
            );
            boxes.forEach((box) => {
                expect(box.className).not.toContain(
                    'avonni-dual-listbox-size_small'
                );
                expect(box.className).not.toContain(
                    'avonni-dual-listbox-size_medium'
                );
                expect(box.className).toContain(
                    'avonni-dual-listbox-size_large'
                );
            });
        });
    });

    /* ----- JS ----- */

    // testing selection
    it('Dual Listbox selection', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.options = options;

        return Promise.resolve().then(() => {
            const option = element.shadowRoot.querySelectorAll(
                '.slds-listbox__option'
            );
            const firstOption = option[0];
            firstOption.click();
            const secondOption = option[1];
            expect(firstOption.tabIndex).toBe(0);
            expect(firstOption.getAttribute('data-type')).toContain('source');
            expect(secondOption.tabIndex).toBe(-1);
        });
    });

    /* ----- EVENTS ----- */

    // change
    it('change event', () => {
        const element = createElement('base-dual-listbox', {
            is: DualListbox
        });
        document.body.appendChild(element);

        element.options = options;
        element.value = ['1', '2'];
        element.addButtonLabel = 'add';

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const option = element.shadowRoot.querySelector(
                '.slds-listbox__option'
            );
            const lightningButtonIcon = element.shadowRoot.querySelector(
                "lightning-button-icon[title='add']"
            );
            option.click();
            lightningButtonIcon.click();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toMatchObject([
                '1',
                '2',
                '3'
            ]);
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });
});
