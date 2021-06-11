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
import VisualPicker from 'c/visualPicker';

const ITEMS = [
    {
        title: 'Item 1',
        description: 'Some description for item 1',
        value: 'item-1',
        disabled: true,
        figure: {
            title: 'Figure 1',
            description: 'Some description for figure 1',
            iconName: 'standard:user',
            iconSize: 'large',
            iconAlternativeText: 'Alternative text for icon',
            iconPosition: 'bottom',
            iconSrc: '/assets/fakeicon.ico'
        }
    },
    {
        title: 'Item 2',
        description: 'Some description for item 2',
        value: 'item-2',
        figure: {
            title: 'Figure 2',
            description: 'Some description for figure 2',
            iconName: 'standard:apps',
            iconSize: 'medium',
            iconAlternativeText: 'Alternative text for icon',
            iconPosition: 'left'
        }
    },
    {
        title: 'Item 3',
        description: 'Some description for item 3',
        value: 'item-3',
        figure: {
            title: 'Figure 3',
            description: 'Some description for figure 3',
            iconName: 'standard:apps'
        }
    }
];

describe('VisualPicker', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        expect(element.disabled).toBeFalsy();
        expect(element.hideBorder).toBeFalsy();
        expect(element.hideCheckMark).toBeFalsy();
        expect(element.items).toMatchObject([]);
        expect(element.label).toBeUndefined();
        expect(element.messageWhenValueMissing).toBeUndefined();
        expect(element.name).toBe('input-1');
        expect(element.ratio).toBe('1-by-1');
        expect(element.required).toBeFalsy();
        expect(element.size).toBe('medium');
        expect(element.type).toBe('radio');
        expect(element.value).toMatchObject([]);
        expect(element.variant).toBe('non-coverable');
    });

    /* ----- ATTRIBUTES ----- */

    // disabled
    // Depends on items
    it('disabled = false', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.disabled = false;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('input');
            inputs.forEach((input, index) => {
                expect(input.disabled).toBe(ITEMS[index].disabled || false);
            });
        });
    });

    it('disabled = true', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.disabled = true;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('input');
            inputs.forEach((input) => {
                expect(input.disabled).toBeTruthy();
            });
        });
    });

    // hide-border
    // Depends on items
    it('hideBorder = false', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.hideBorder = false;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const type = element.shadowRoot.querySelector(
                '.slds-visual-picker__figure'
            );
            expect(type.classList).not.toContain('avonni-hide-border');
        });
    });

    it('hideBorder = true', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.hideBorder = true;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const type = element.shadowRoot.querySelector(
                '.slds-visual-picker__figure'
            );
            expect(type.classList).toContain('avonni-hide-border');
        });
    });

    // hide-check-mark
    // Depends on variant, value and items
    it('hideCheckMark = false', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.hideCheckMark = false;
        element.items = ITEMS;
        element.variant = 'coverable';

        return Promise.resolve().then(() => {
            const type = element.shadowRoot.querySelector(
                '.slds-visual-picker__figure'
            );
            const notSelected = element.shadowRoot.querySelector(
                '.slds-is-not-selected'
            );

            expect(notSelected).toBeTruthy();
            expect(type.classList).not.toContain('avonni-hide-check-mark');
        });
    });

    it('hideCheckMark = true', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.hideCheckMark = true;
        element.items = ITEMS;
        element.variant = 'coverable';

        return Promise.resolve().then(() => {
            const type = element.shadowRoot.querySelector(
                '.slds-visual-picker__figure'
            );
            const notSelected = element.shadowRoot.querySelector(
                '.slds-is-not-selected'
            );

            expect(notSelected).toBeFalsy();
            expect(type.classList).toContain('avonni-hide-check-mark');
        });
    });

    // items
    it('items', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('input');
            const figureIcons = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__figure lightning-icon'
            );
            const figureTitles = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__figure .slds-text-heading_large'
            );
            const figureDescriptions = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__figure .slds-text-title'
            );
            const titles = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__body .slds-text-heading_small'
            );
            const descriptions = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__body .slds-text-title'
            );

            ITEMS.forEach((item, index) => {
                expect(inputs[index].value).toBe(item.value);
                expect(inputs[index].disabled).toBe(item.disabled || false);
                expect(figureIcons[index].iconName).toBe(item.figure.iconName);
                expect(figureIcons[index].size).toBe(item.iconSize || 'medium');
                expect(figureIcons[index].alternativeText).toBe(
                    item.figure.iconAlternativeText
                );
                expect(figureIcons[index].src).toBe(item.figure.iconSrc);
                expect(figureTitles[index].textContent).toBe(item.figure.title);
                expect(figureDescriptions[index].textContent).toBe(
                    item.figure.description
                );
                expect(titles[index].textContent).toBe(item.title);
                expect(descriptions[index].textContent).toBe(item.description);
            });
        });
    });

    // label
    it('label', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
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

    // name
    it('name', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.name = 'a-string-name';

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('input');
            inputs.forEach((input) => {
                expect(input.name).toBe('a-string-name');
            });
        });
    });

    // ratio
    // Depends on items
    it('ratio = 1-by-1', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        const ratios = ['1-by-1', '4-by-3', '16-by-9'];
        const pickedRatio = '1-by-1';

        element.ratio = pickedRatio;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const wrappers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );

            wrappers.forEach((wrapper) => {
                ratios.forEach((ratio) => {
                    if (ratio === pickedRatio) {
                        expect(wrapper.classList).toContain(`ratio-${ratio}`);
                    } else {
                        expect(wrapper.classList).not.toContain(
                            `ratio-${ratio}`
                        );
                    }
                });
            });
        });
    });

    it('ratio = 4-by-3', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        const ratios = ['1-by-1', '4-by-3', '16-by-9'];
        const pickedRatio = '4-by-3';

        element.ratio = pickedRatio;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const wrappers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );

            wrappers.forEach((wrapper) => {
                ratios.forEach((ratio) => {
                    if (ratio === pickedRatio) {
                        expect(wrapper.classList).toContain(`ratio-${ratio}`);
                    } else {
                        expect(wrapper.classList).not.toContain(
                            `ratio-${ratio}`
                        );
                    }
                });
            });
        });
    });

    it('ratio = 16-by-9', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        const ratios = ['1-by-1', '4-by-3', '16-by-9'];
        const pickedRatio = '16-by-9';

        element.ratio = pickedRatio;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const wrappers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );

            wrappers.forEach((wrapper) => {
                ratios.forEach((ratio) => {
                    if (ratio === pickedRatio) {
                        expect(wrapper.classList).toContain(`ratio-${ratio}`);
                    } else {
                        expect(wrapper.classList).not.toContain(
                            `ratio-${ratio}`
                        );
                    }
                });
            });
        });
    });

    // required
    it('required = false', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.required = false;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector('abbr');
            const fieldset = element.shadowRoot.querySelector('fieldset');

            expect(abbr).toBeFalsy();
            expect(fieldset.ariaRequired).toBe('false');
        });
    });

    it('required = true', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.required = true;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector('abbr');
            const fieldset = element.shadowRoot.querySelector('fieldset');

            expect(abbr).toBeTruthy();
            expect(fieldset.ariaRequired).toBe('true');
        });
    });

    // size
    // Depends on items
    it('size = medium', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.size = 'medium';
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const visualPickers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            visualPickers.forEach((visualPicker) => {
                expect(visualPicker.classList).toContain(
                    'slds-visual-picker_medium'
                );
                expect(visualPicker.classList).not.toContain(
                    'slds-visual-picker_large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_x-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_xx-small'
                );
            });
        });
    });

    it('size = large', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.size = 'large';
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const visualPickers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            visualPickers.forEach((visualPicker) => {
                expect(visualPicker.classList).not.toContain(
                    'slds-visual-picker_medium'
                );
                expect(visualPicker.classList).toContain(
                    'slds-visual-picker_large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_x-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_xx-small'
                );
            });
        });
    });

    it('size = xx-small', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.size = 'xx-small';
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const visualPickers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            visualPickers.forEach((visualPicker) => {
                expect(visualPicker.classList).not.toContain(
                    'slds-visual-picker_medium'
                );
                expect(visualPicker.classList).not.toContain(
                    'slds-visual-picker_large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_x-small'
                );
                expect(visualPicker.classList).toContain(
                    'avonni-visual-picker_xx-small'
                );
            });
        });
    });

    it('size = x-small', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.size = 'x-small';
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const visualPickers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            visualPickers.forEach((visualPicker) => {
                expect(visualPicker.classList).not.toContain(
                    'slds-visual-picker_medium'
                );
                expect(visualPicker.classList).not.toContain(
                    'slds-visual-picker_large'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_small'
                );
                expect(visualPicker.classList).toContain(
                    'avonni-visual-picker_x-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_xx-small'
                );
            });
        });
    });

    it('size = small', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.size = 'small';
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const visualPickers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker'
            );
            visualPickers.forEach((visualPicker) => {
                expect(visualPicker.classList).not.toContain(
                    'slds-visual-picker_medium'
                );
                expect(visualPicker.classList).not.toContain(
                    'slds-visual-picker_large'
                );
                expect(visualPicker.classList).toContain(
                    'avonni-visual-picker_small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_x-small'
                );
                expect(visualPicker.classList).not.toContain(
                    'avonni-visual-picker_xx-small'
                );
            });
        });
    });

    // type
    // Depends on items
    it('type = radio', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.type = 'radio';
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('input');
            inputs.forEach((input) => {
                expect(input.type).toBe('radio');
            });
        });
    });

    it('type = checkbox', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.type = 'checkbox';
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('input');
            inputs.forEach((input) => {
                expect(input.type).toBe('checkbox');
            });
        });
    });

    // value
    // Depends on items and type
    it('value, with radio type', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.value = 'item-1';
        element.items = ITEMS;
        element.type = 'radio';

        return Promise.resolve().then(() => {
            const checkedItem = element.shadowRoot.querySelector(
                'input[value="item-1"]'
            );
            expect(checkedItem.checked).toBeTruthy();
        });
    });

    it('value, with checkbox type', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.value = ['item-1', 'item-3'];
        element.items = ITEMS;
        element.type = 'checkbox';

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('input');
            expect(inputs[0].checked).toBeTruthy();
            expect(inputs[1].checked).toBeFalsy();
            expect(inputs[2].checked).toBeTruthy();
        });
    });

    // variant
    // Depends on items
    it('variant = non-coverable', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.variant = 'non-coverable';
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const verticalVisualPickers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker_vertical'
            );
            const figures = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__figure'
            );
            const iconWrappers = element.shadowRoot.querySelectorAll(
                '.slds-icon_container'
            );
            const controls = element.shadowRoot.querySelectorAll(
                '.slds-form-element__control'
            );
            const largeHeadings = element.shadowRoot.querySelectorAll(
                '.slds-text-heading_large'
            );
            const mediumHeadings = element.shadowRoot.querySelectorAll(
                '.slds-text-heading_medium'
            );
            const selectedIcons = element.shadowRoot.querySelectorAll(
                '.slds-is-selected'
            );
            const notSelectedIcons = element.shadowRoot.querySelectorAll(
                '.slds-is-not-selected'
            );
            const verticalIconContainers = element.shadowRoot.querySelectorAll(
                '.verticalContainer'
            );

            expect(verticalVisualPickers).toHaveLength(0);
            expect(largeHeadings).toHaveLength(3);
            expect(mediumHeadings).toHaveLength(0);
            expect(selectedIcons).toHaveLength(0);
            expect(notSelectedIcons).toHaveLength(0);
            expect(verticalIconContainers).toHaveLength(0);

            figures.forEach((figure) => {
                expect(figure.classList).toContain('slds-visual-picker__text');
                expect(figure.classList).toContain(
                    'slds-align_absolute-center'
                );
                expect(figure.classList).not.toContain(
                    'slds-visual-picker__icon'
                );
                expect(figure.classList).not.toContain(
                    'slds-align_absolute-left'
                );
            });
            iconWrappers.forEach((icon) => {
                expect(icon.classList).toContain(
                    'slds-visual-picker__text-check'
                );
            });
            controls.forEach((control) => {
                expect(control.classList).toContain('slds-grid');
                expect(control.classList).toContain('slds-wrap');
            });
        });
    });

    it('variant = coverable', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.variant = 'coverable';
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const verticalVisualPickers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker_vertical'
            );
            const figures = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__figure'
            );
            const iconWrappers = element.shadowRoot.querySelectorAll(
                '.slds-icon_container'
            );
            const controls = element.shadowRoot.querySelectorAll(
                '.slds-form-element__control'
            );
            const largeHeadings = element.shadowRoot.querySelectorAll(
                '.slds-text-heading_large'
            );
            const mediumHeadings = element.shadowRoot.querySelectorAll(
                '.slds-text-heading_medium'
            );
            const selectedIcons = element.shadowRoot.querySelectorAll(
                '.slds-is-selected'
            );
            const notSelectedIcons = element.shadowRoot.querySelectorAll(
                '.slds-is-not-selected'
            );
            const verticalIconContainers = element.shadowRoot.querySelectorAll(
                '.verticalContainer'
            );

            expect(verticalVisualPickers).toHaveLength(0);
            expect(largeHeadings).toHaveLength(3);
            expect(mediumHeadings).toHaveLength(0);
            expect(selectedIcons).toHaveLength(3);
            expect(notSelectedIcons).toHaveLength(3);
            expect(verticalIconContainers).toHaveLength(0);

            figures.forEach((figure) => {
                expect(figure.classList).not.toContain(
                    'slds-visual-picker__text'
                );
                expect(figure.classList).toContain(
                    'slds-align_absolute-center'
                );
                expect(figure.classList).toContain('slds-visual-picker__icon');
                expect(figure.classList).not.toContain(
                    'slds-align_absolute-left'
                );
            });
            iconWrappers.forEach((icon) => {
                expect(icon.classList).not.toContain(
                    'slds-visual-picker__text-check'
                );
            });
            controls.forEach((control) => {
                expect(control.classList).toContain('slds-grid');
                expect(control.classList).toContain('slds-wrap');
            });
        });
    });

    it('variant = vertical', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        element.variant = 'vertical';
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const verticalVisualPickers = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker_vertical'
            );
            const figures = element.shadowRoot.querySelectorAll(
                '.slds-visual-picker__figure'
            );
            const iconWrappers = element.shadowRoot.querySelectorAll(
                '.slds-icon_container'
            );
            const controls = element.shadowRoot.querySelectorAll(
                '.slds-form-element__control'
            );
            const largeHeadings = element.shadowRoot.querySelectorAll(
                '.slds-text-heading_large'
            );
            const mediumHeadings = element.shadowRoot.querySelectorAll(
                '.slds-text-heading_medium'
            );
            const selectedIcons = element.shadowRoot.querySelectorAll(
                '.slds-is-selected'
            );
            const notSelectedIcons = element.shadowRoot.querySelectorAll(
                '.slds-is-not-selected'
            );
            const verticalIconContainers = element.shadowRoot.querySelectorAll(
                '.verticalContainer'
            );

            expect(verticalVisualPickers).toHaveLength(3);
            expect(largeHeadings).toHaveLength(0);
            expect(mediumHeadings).toHaveLength(3);
            expect(selectedIcons).toHaveLength(0);
            expect(notSelectedIcons).toHaveLength(0);
            expect(verticalIconContainers).toHaveLength(3);

            figures.forEach((figure) => {
                expect(figure.classList).toContain('slds-visual-picker__text');
                expect(figure.classList).not.toContain(
                    'slds-align_absolute-center'
                );
                expect(figure.classList).not.toContain(
                    'slds-visual-picker__icon'
                );
                expect(figure.classList).toContain('slds-align_absolute-left');
            });
            iconWrappers.forEach((icon) => {
                expect(icon.classList).toContain(
                    'slds-visual-picker__text-check'
                );
            });
            controls.forEach((control) => {
                expect(control.classList).not.toContain('slds-grid');
                expect(control.classList).not.toContain('slds-wrap');
            });
        });
    });

    /* ----- EVENTS ----- */

    // change
    // Depends on items and type
    it('change event, with radio type', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('change', handler);

        element.items = ITEMS;
        element.type = 'radio';

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('input');
            inputs[2].click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toBe('item-3');
        });
    });

    it('change event, with checkbox type', () => {
        const element = createElement('base-visual-picker', {
            is: VisualPicker
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('change', handler);

        element.items = ITEMS;
        element.type = 'checkbox';

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('input');
            inputs[2].click();
            inputs[1].click();

            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler.mock.calls[1][0].detail.value).toBe('item-2,item-3');
            expect(handler.mock.calls[1][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[1][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[1][0].composed).toBeFalsy();
        });
    });
});
