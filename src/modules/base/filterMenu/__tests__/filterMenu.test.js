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
import FilterMenu from '../filterMenu';

// Not tested:
// tooltip with horizontal variant (is injected outside of shadow dom)
// auto positionning
// Deprecated attributes

const ITEMS = [
    {
        label: 'Item 1',
        value: 'item-1',
        disabled: true
    },
    {
        label: 'Item 2',
        value: 'item-2',
        iconName: 'utility:user',
        prefixIconName: 'standard:apps'
    },
    {
        label: 'Item 3 with more searchable text',
        value: 'item-3'
    },
    {
        label: 'Item 4',
        value: 'item-4'
    },
    {
        label: 'Item 5',
        value: 'item-5'
    },
    {
        label: 'Item 6',
        value: 'item-6'
    }
];

const VALUE = ['item-1', 'item-2'];

let element;
describe('FilterMenu', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        window.requestAnimationFrame.mockRestore();
        jest.clearAllTimers();
    });

    beforeEach(() => {
        element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(), 0);
        });
        document.body.appendChild(element);
    });

    it('Filter menu: Default attributes', () => {
        expect(element.accessKey).toBeUndefined();
        expect(element.alternativeText).toBe('Show Menu');
        expect(element.applyButtonLabel).toBe('Apply');
        expect(element.buttonVariant).toBe('border');
        expect(element.disabled).toBeFalsy();
        expect(element.dropdownAlignment).toBe('left');
        expect(element.dropdownNubbin).toBeFalsy();
        expect(element.hideApplyResetButtons).toBeFalsy();
        expect(element.hideSelectedItems).toBeFalsy();
        expect(element.iconName).toBe('utility:down');
        expect(element.iconSize).toBe('medium');
        expect(element.isLoading).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.loadingStateAlternativeText).toBe('Loading');
        expect(element.name).toBeUndefined();
        expect(element.resetButtonLabel).toBe('Reset');
        expect(element.title).toBeUndefined();
        expect(element.tooltip).toBeUndefined();
        expect(element.type).toBe('list');
        expect(element.typeAttributes).toEqual({});
        expect(element.value).toMatchObject([]);
        expect(element.variant).toBe('horizontal');
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    // access-key
    it('Filter menu: accessKey', () => {
        element.accessKey = 'K';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.accessKey).toBe('K');
        });
    });

    // alternative-text
    it('Filter menu: alternativeText', () => {
        element.alternativeText = 'A string alt text';

        return Promise.resolve().then(() => {
            const altText = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            expect(altText.textContent).toBe('A string alt text');
        });
    });

    // apply-button-label
    it('Filter menu: applyButtonLabel', () => {
        element.applyButtonLabel = 'A string label';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const submitButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-apply"]'
            );
            expect(submitButton.label).toBe('A string label');
        });
    });

    // button-variant
    // Depends on iconName and label
    it('Filter menu: buttonVariant = border', () => {
        element.buttonVariant = 'border';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-border'
            );
        });
    });

    it('Filter menu: buttonVariant = border, with label', () => {
        element.buttonVariant = 'border';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList.value).toBe(
                'slds-button slds-button_neutral'
            );
        });
    });

    it('Filter menu: buttonVariant = border, with icon', () => {
        element.buttonVariant = 'border';
        element.iconName = 'utility:user';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon slds-button_icon-more'
            );
        });
    });

    it('Filter menu: buttonVariant = bare', () => {
        element.buttonVariant = 'bare';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-bare'
            );
        });
    });

    it('Filter menu: buttonVariant = bare, with label', () => {
        element.buttonVariant = 'bare';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList.value).toBe('slds-button');
        });
    });

    it('Filter menu: buttonVariant = bare, with icon', () => {
        element.buttonVariant = 'bare';
        element.iconName = 'standard:user';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon slds-button_icon-bare slds-button_icon-more'
            );
        });
    });

    it('Filter menu: buttonVariant = container', () => {
        element.buttonVariant = 'container';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-container'
            );
        });
    });

    it('Filter menu: buttonVariant = container, with label', () => {
        element.buttonVariant = 'container';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList.value).toBe('slds-button');
        });
    });

    it('Filter menu: buttonVariant = container, with icon', () => {
        element.buttonVariant = 'container';
        element.icon = 'utility:user';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-container'
            );
        });
    });

    it('Filter menu: buttonVariant = border-filled', () => {
        element.buttonVariant = 'border-filled';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-border-filled'
            );
        });
    });

    it('Filter menu: buttonVariant = border-filled, with label', () => {
        element.buttonVariant = 'border-filled';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList.value).toBe('slds-button');
        });
    });

    it('Filter menu: buttonVariant = border-filled, with icon', () => {
        element.buttonVariant = 'border-filled';
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon slds-button_icon-more slds-button_icon-border-filled'
            );
        });
    });

    it('Filter menu: buttonVariant = bare-inverse', () => {
        element.buttonVariant = 'bare-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-bare slds-button_icon-inverse'
            );
        });
    });

    it('Filter menu: buttonVariant = bare-inverse, with label', () => {
        element.buttonVariant = 'bare-inverse';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList.value).toBe('slds-button');
        });
    });

    it('Filter menu: buttonVariant = bare-inverse, with icon', () => {
        element.buttonVariant = 'bare-inverse';
        element.iconName = 'standard:apps';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon slds-button_icon-bare slds-button_icon-container-more slds-button_icon-inverse'
            );
        });
    });

    it('Filter menu: buttonVariant = border-inverse', () => {
        element.buttonVariant = 'border-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-border-inverse'
            );
        });
    });

    it('Filter menu: buttonVariant = border-inverse, with label', () => {
        element.buttonVariant = 'border-inverse';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList.value).toBe(
                'slds-button slds-button_inverse'
            );
        });
    });

    it('Filter menu: buttonVariant = border-inverse, with icon', () => {
        element.buttonVariant = 'border-inverse';
        element.icon = 'utility:apps';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-border-inverse'
            );
        });
    });

    // disabled
    it('Filter menu: disabled = false', () => {
        element.disabled = false;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.disabled).toBeFalsy();
        });
    });

    it('Filter menu: disabled = true', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.disabled).toBeTruthy();
        });
    });

    // dropdown-alignment and dropdownNubbin
    it('Filter menu: dropdownAlignment = left and dropdownNubbin = true', () => {
        element.dropdownAlignment = 'left';
        element.dropdownNubbin = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
            );
            expect(dropdown.classList).toContain('slds-dropdown_left');
            expect(dropdown.classList).not.toContain('slds-dropdown_center');
            expect(dropdown.classList).not.toContain('slds-dropdown_right');
            expect(dropdown.classList).not.toContain('slds-dropdown_bottom');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );

            expect(dropdown.classList).toContain('slds-nubbin_top-left');
            expect(dropdown.classList).not.toContain('slds-nubbin_top-right');
            expect(dropdown.classList).not.toContain('slds-nubbin_top');
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom-left');
            expect(dropdown.classList).not.toContain(
                'slds-nubbin_bottom-right'
            );
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    it('Filter menu: dropdownAlignment = auto and dropdownNubbin = true', () => {
        element.dropdownAlignment = 'auto';
        element.dropdownNubbin = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
            );
            expect(dropdown.classList).toContain('slds-dropdown_left');
            expect(dropdown.classList).not.toContain('slds-dropdown_center');
            expect(dropdown.classList).not.toContain('slds-dropdown_right');
            expect(dropdown.classList).not.toContain('slds-dropdown_bottom');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );

            expect(dropdown.classList).not.toContain('slds-nubbin_top-left');
            expect(dropdown.classList).not.toContain('slds-nubbin_top-right');
            expect(dropdown.classList).not.toContain('slds-nubbin_top');
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom-left');
            expect(dropdown.classList).not.toContain(
                'slds-nubbin_bottom-right'
            );
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    it('Filter menu: dropdownAlignment = center and dropdownNubbin = true', () => {
        element.dropdownAlignment = 'center';
        element.dropdownNubbin = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
            );
            expect(dropdown.classList).not.toContain('slds-dropdown_left');
            expect(dropdown.classList).toContain('slds-dropdown_center');
            expect(dropdown.classList).not.toContain('slds-dropdown_right');
            expect(dropdown.classList).not.toContain('slds-dropdown_bottom');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );

            expect(dropdown.classList).not.toContain('slds-nubbin_top-left');
            expect(dropdown.classList).not.toContain('slds-nubbin_top-right');
            expect(dropdown.classList).toContain('slds-nubbin_top');
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom-left');
            expect(dropdown.classList).not.toContain(
                'slds-nubbin_bottom-right'
            );
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    it('Filter menu: dropdownAlignment = right and dropdownNubbin = true', () => {
        element.dropdownAlignment = 'right';
        element.dropdownNubbin = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
            );
            expect(dropdown.classList).not.toContain('slds-dropdown_left');
            expect(dropdown.classList).not.toContain('slds-dropdown_center');
            expect(dropdown.classList).toContain('slds-dropdown_right');
            expect(dropdown.classList).not.toContain('slds-dropdown_bottom');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );

            expect(dropdown.classList).not.toContain('slds-nubbin_top-left');
            expect(dropdown.classList).toContain('slds-nubbin_top-right');
            expect(dropdown.classList).not.toContain('slds-nubbin_top');
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom-left');
            expect(dropdown.classList).not.toContain(
                'slds-nubbin_bottom-right'
            );
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    it('Filter menu: dropdownAlignment = bottom-left and dropdownNubbin = true', () => {
        element.dropdownAlignment = 'bottom-left';
        element.dropdownNubbin = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
            );
            expect(dropdown.classList).toContain('slds-dropdown_left');
            expect(dropdown.classList).not.toContain('slds-dropdown_center');
            expect(dropdown.classList).not.toContain('slds-dropdown_right');
            expect(dropdown.classList).toContain('slds-dropdown_bottom');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(dropdown.classList).toContain('slds-dropdown_bottom-left');

            expect(dropdown.classList).not.toContain('slds-nubbin_top-left');
            expect(dropdown.classList).not.toContain('slds-nubbin_top-right');
            expect(dropdown.classList).not.toContain('slds-nubbin_top');
            expect(dropdown.classList).toContain('slds-nubbin_bottom-left');
            expect(dropdown.classList).not.toContain(
                'slds-nubbin_bottom-right'
            );
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    it('Filter menu: dropdownAlignment = bottom-center and dropdownNubbin = true', () => {
        element.dropdownAlignment = 'bottom-center';
        element.dropdownNubbin = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
            );
            expect(dropdown.classList).not.toContain('slds-dropdown_left');
            expect(dropdown.classList).not.toContain('slds-dropdown_center');
            expect(dropdown.classList).not.toContain('slds-dropdown_right');
            expect(dropdown.classList).toContain('slds-dropdown_bottom');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-right'
            );
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );

            expect(dropdown.classList).not.toContain('slds-nubbin_top-left');
            expect(dropdown.classList).not.toContain('slds-nubbin_top-right');
            expect(dropdown.classList).not.toContain('slds-nubbin_top');
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom-left');
            expect(dropdown.classList).not.toContain(
                'slds-nubbin_bottom-right'
            );
            expect(dropdown.classList).toContain('slds-nubbin_bottom');
        });
    });

    it('Filter menu: dropdownAlignment = bottom-right and dropdownNubbin = true', () => {
        element.dropdownAlignment = 'bottom-right';
        element.dropdownNubbin = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
            );
            expect(dropdown.classList).not.toContain('slds-dropdown_left');
            expect(dropdown.classList).not.toContain('slds-dropdown_center');
            expect(dropdown.classList).toContain('slds-dropdown_right');
            expect(dropdown.classList).toContain('slds-dropdown_bottom');
            expect(dropdown.classList).toContain('slds-dropdown_bottom-right');
            expect(dropdown.classList).not.toContain(
                'slds-dropdown_bottom-left'
            );

            expect(dropdown.classList).not.toContain('slds-nubbin_top-left');
            expect(dropdown.classList).not.toContain('slds-nubbin_top-right');
            expect(dropdown.classList).not.toContain('slds-nubbin_top');
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom-left');
            expect(dropdown.classList).toContain('slds-nubbin_bottom-right');
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    it('Filter menu: dropdownNubbin = false', () => {
        element.dropdownNubbin = false;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
            );

            expect(dropdown.classList).not.toContain('slds-nubbin_top-left');
            expect(dropdown.classList).not.toContain('slds-nubbin_top-right');
            expect(dropdown.classList).not.toContain('slds-nubbin_top');
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom-left');
            expect(dropdown.classList).not.toContain(
                'slds-nubbin_bottom-right'
            );
            expect(dropdown.classList).not.toContain('slds-nubbin_bottom');
        });
    });

    // hide-apply-reset-buttons
    // Depends on variant
    it('Filter menu: hideApplyResetButtons = false, with horizontal variant', () => {
        element.hideApplyResetButtons = false;

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button"]'
            );
            expect(buttons).toHaveLength(2);
        });
    });

    it('Filter menu: hideApplyResetButtons = false, with vertical variant', () => {
        element.hideApplyResetButtons = false;
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button"]'
            );
            expect(buttons).toHaveLength(2);
        });
    });

    it('Filter menu: hideApplyResetButtons = true, with horizontal variant', () => {
        element.hideApplyResetButtons = true;

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button"]'
            );
            expect(buttons).toHaveLength(0);
        });
    });

    it('Filter menu: hideApplyResetButtons = true, with vertical variant', () => {
        element.hideApplyResetButtons = true;
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button"]'
            );
            expect(buttons).toHaveLength(0);
        });
    });

    // hide-selected-items
    // Depends on items, value and variant
    it('Filter menu: hideSelectedItems = false, with horizontal variant', () => {
        element.hideSelectedItems = false;
        element.typeAttributes = { items: ITEMS };
        element.value = VALUE;

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                '[data-element-id="avonni-pill-container"]'
            );
            expect(pills).toBeTruthy();
        });
    });

    it('Filter menu: hideSelectedItems = false, with vertical variant', () => {
        element.hideSelectedItems = false;
        element.variant = 'vertical';
        element.typeAttributes = { items: ITEMS };
        element.value = VALUE;

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                '[data-element-id="avonni-pill-container"]'
            );
            expect(pills).toBeTruthy();
        });
    });

    it('Filter menu: hideSelectedItems = true, with horizontal variant', () => {
        element.hideSelectedItems = true;
        element.typeAttributes = { items: ITEMS };
        element.value = VALUE;

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                '[data-element-id="avonni-pill-container"]'
            );
            expect(pills).toBeFalsy();
        });
    });

    it('Filter menu: hideSelectedItems = true, with vertical variant', () => {
        element.hideSelectedItems = true;
        element.variant = 'vertical';
        element.typeAttributes = { items: ITEMS };
        element.value = VALUE;

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                '[data-element-id="avonni-pill-container"]'
            );
            expect(pills).toBeFalsy();
        });
    });

    // icon-name
    it('Filter menu: iconName is down arrow', () => {
        element.iconName = 'utility:chevrondown';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            const icons = element.shadowRoot.querySelectorAll(
                '[data-element-id^="avonni-primitive-icon"]'
            );
            expect(icons).toHaveLength(1);
            expect(icons[0].iconName).toBe('utility:chevrondown');
            expect(button.classList).not.toContain('slds-button_icon');
        });
    });

    it('Filter menu: iconName is not down arrow', () => {
        element.iconName = 'standard:user';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            const icons = element.shadowRoot.querySelectorAll(
                '[data-element-id^="avonni-primitive-icon"]'
            );
            expect(icons).toHaveLength(2);
            expect(icons[0].iconName).toBe('standard:user');
            expect(icons[1].iconName).toBe('utility:down');
            expect(button.classList).toContain('slds-button_icon');
        });
    });

    // icon-size
    it('Filter menu: iconSize = xx-small', () => {
        element.iconSize = 'xx-small';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList).toContain('slds-button_icon-xx-small');
            expect(button.classList).not.toContain('slds-button_icon-x-small');
            expect(button.classList).not.toContain('slds-button_icon-small');
            expect(button.classList).not.toContain('slds-button_icon-large');
        });
    });

    it('Filter menu: iconSize = x-small', () => {
        element.iconSize = 'x-small';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList).not.toContain('slds-button_icon-xx-small');
            expect(button.classList).toContain('slds-button_icon-x-small');
            expect(button.classList).not.toContain('slds-button_icon-small');
            expect(button.classList).not.toContain('slds-button_icon-large');
        });
    });

    it('Filter menu: iconSize = medium', () => {
        element.iconSize = 'medium';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList).not.toContain('slds-button_icon-xx-small');
            expect(button.classList).not.toContain('slds-button_icon-x-small');
            expect(button.classList).not.toContain('slds-button_icon-small');
            expect(button.classList).not.toContain('slds-button_icon-large');
        });
    });

    it('Filter menu: iconSize = large', () => {
        element.iconSize = 'large';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList).not.toContain('slds-button_icon-xx-small');
            expect(button.classList).not.toContain('slds-button_icon-x-small');
            expect(button.classList).not.toContain('slds-button_icon-small');
            expect(button.classList).toContain('slds-button_icon-large');
        });
    });

    // is-loading
    it('Filter menu: isLoading = false', () => {
        element.isLoading = false;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner"]'
            );

            expect(spinner).toBeFalsy();
        });
    });

    it('Filter menu: isLoading = true', () => {
        element.isLoading = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner"]'
            );

            expect(spinner).toBeTruthy();
        });
    });

    // items
    it('Filter menu: items', () => {
        element.typeAttributes = { items: ITEMS };
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-menu-item"]'
            );

            expect(items).toHaveLength(6);

            let firstFocusableItem;
            items.forEach((item, index) => {
                expect(item.label).toBe(ITEMS[index].label);
                expect(item.value).toBe(ITEMS[index].value);
                expect(item.iconName).toBe(ITEMS[index].iconName);
                expect(item.prefixIconName).toBe(ITEMS[index].prefixIconName);
                expect(item.disabled).toBe(ITEMS[index].disabled);

                if (!firstFocusableItem && !item.disabled) {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(item.tabIndex).toBe(0);
                    firstFocusableItem = true;
                } else {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(item.tabIndex).toBe(-1);
                }
            });
        });
    });

    // label
    it('Filter menu: label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.textContent).toContain('A string label');
        });
    });

    // loading-state-alternative-text
    // Depends in isLoading
    it('Filter menu: loadingStateAlternativeText', () => {
        element.loadingStateAlternativeText = 'A string alt text';
        element.isLoading = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner"]'
            );
            expect(spinner.alternativeText).toBe('A string alt text');
        });
    });

    // name
    it('Filter menu: name horizontal', () => {
        element.name = 'A string name';
        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.name).toBe('A string name');
        });
    });

    it('Filter menu: name vertical', () => {
        element.name = 'A string name';
        element.variant = 'vertical';
        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="avonni-input-choice-set"]'
            );
            expect(input.name).toBe('A string name');
        });
    });

    // reset-button-label
    it('Filter menu: resetButtonLabel', () => {
        element.resetButtonLabel = 'A string label';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const resetButton = element.shadowRoot.querySelector(
                '.slds-dropdown lightning-button:first-of-type'
            );
            expect(resetButton.label).toBe('A string label');
        });
    });

    // title
    it('Filter menu: title', () => {
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.title).toBe('A string title');
        });
    });

    // tooltip
    // Depends on variant
    it('Filter menu: tooltip with vertical variant', () => {
        element.tooltip = 'A string tooltip';
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector(
                '[data-element-id="lightning-helptext"]'
            );
            expect(help).toBeTruthy();
            expect(help.content).toBe('A string tooltip');
        });
    });

    // type
    it('Filter menu: type = list', () => {
        element.type = 'list';
        element.typeAttributes = { items: ITEMS };

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-menu-item"]'
            );
            expect(items).toHaveLength(ITEMS.length);
        });
    });

    it('Filter menu: type = list, vertical variant', () => {
        element.type = 'list';
        element.variant = 'vertical';
        element.typeAttributes = { items: ITEMS };

        return Promise.resolve().then(() => {
            const choiceSet = element.shadowRoot.querySelector(
                '[data-element-id="avonni-input-choice-set"]'
            );
            expect(choiceSet).toBeTruthy();
            expect(choiceSet.options).toHaveLength(ITEMS.length);
        });
    });

    it('Filter menu: type = date-range', () => {
        element.type = 'date-range';

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
            );
            expect(dropdown.classList).toContain('slds-dropdown_large');

            const dateRange = element.shadowRoot.querySelector(
                '[data-element-id="avonni-input-date-range"]'
            );
            expect(dateRange).toBeTruthy();
        });
    });

    it('Filter menu: type = date-range, vertical variant', () => {
        element.type = 'date-range';
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const dateRange = element.shadowRoot.querySelector(
                '[data-element-id="avonni-input-date-range"]'
            );
            expect(dateRange).toBeTruthy();
        });
    });

    it('Filter menu: type = range', () => {
        element.type = 'range';

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
            );
            expect(dropdown.classList).toContain('slds-dropdown_small');

            const range = element.shadowRoot.querySelector(
                '[data-element-id="avonni-slider"]'
            );
            expect(range).toBeTruthy();
        });
    });

    it('Filter menu: type = range, vertical variant', () => {
        element.type = 'range';
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const range = element.shadowRoot.querySelector(
                '[data-element-id="avonni-slider"'
            );
            expect(range).toBeTruthy();
        });
    });

    // type-attributes
    it('Filter menu: typeAttributes for date-range', () => {
        const typeAttributes = {
            dateStyle: 'long',
            labelEndDate: 'End date',
            labelStartDate: 'Start date',
            labelStartTime: 'Start time',
            labelEndTime: 'End time',
            timeStyle: 'long',
            type: 'datetime'
        };
        element.type = 'date-range';
        element.typeAttributes = typeAttributes;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dateRange = element.shadowRoot.querySelector(
                '[data-element-id="avonni-input-date-range"]'
            );
            expect(dateRange.dateStyle).toBe(typeAttributes.dateStyle);
            expect(dateRange.labelEndDate).toBe(typeAttributes.labelEndDate);
            expect(dateRange.labelStartDate).toBe(
                typeAttributes.labelStartDate
            );
            expect(dateRange.labelEndTime).toBe(typeAttributes.labelEndTime);
            expect(dateRange.labelStartTime).toBe(
                typeAttributes.labelStartTime
            );
            expect(dateRange.timeStyle).toBe(typeAttributes.timeStyle);
            expect(dateRange.type).toBe(typeAttributes.type);
        });
    });

    it('Filter menu: typeAttributes for list, allowSearch and searchInputPlaceholder', () => {
        let input = element.shadowRoot.querySelector(
            '[data-element-id="lightning-input"]'
        );
        expect(input).toBeFalsy();

        element.typeAttributes = {
            allowSearch: true,
            searchInputPlaceholder: 'A string placeholder'
        };

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );
            expect(input).toBeTruthy();
            expect(input.placeholder).toBe('A string placeholder');
        });
    });

    it('Filter menu: typeAttributes for list, dropdownLength = 7-items', () => {
        element.typeAttributes = {
            dropdownLength: '7-items'
        };

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const itemList = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown-content"]'
            );
            expect(itemList.classList).toContain(
                'slds-dropdown_length-with-icon-7'
            );
            expect(itemList.classList).not.toContain(
                'slds-dropdown_length-with-icon-5'
            );
            expect(itemList.classList).not.toContain(
                'slds-dropdown_length-with-icon-10'
            );
        });
    });

    it('Filter menu: typeAttributes for list, dropdownLength = 5-items', () => {
        element.typeAttributes = {
            dropdownLength: '5-items'
        };
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const itemList = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown-content"]'
            );
            expect(itemList.classList).not.toContain(
                'slds-dropdown_length-with-icon-7'
            );
            expect(itemList.classList).toContain(
                'slds-dropdown_length-with-icon-5'
            );
            expect(itemList.classList).not.toContain(
                'slds-dropdown_length-with-icon-10'
            );
        });
    });

    it('Filter menu: typeAttributes for list, dropdownLength = 10-items', () => {
        element.typeAttributes = {
            dropdownLength: '10-items'
        };
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const itemList = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown-content"]'
            );
            expect(itemList.classList).not.toContain(
                'slds-dropdown_length-with-icon-7'
            );
            expect(itemList.classList).not.toContain(
                'slds-dropdown_length-with-icon-5'
            );
            expect(itemList.classList).toContain(
                'slds-dropdown_length-with-icon-10'
            );
        });
    });

    it('Filter menu: typeAttributes for list, dropdownWidth = small', () => {
        element.typeAttributes = {
            dropdownWidth: 'small'
        };
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
            );
            expect(dropdown.classList).toContain('slds-dropdown_small');
            expect(dropdown.classList).not.toContain('slds-dropdown_xx-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_x-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_medium');
            expect(dropdown.classList).not.toContain('slds-dropdown_large');
        });
    });

    it('Filter menu: typeAttributes for list, dropdownWidth = xx-small', () => {
        element.typeAttributes = {
            dropdownWidth: 'xx-small'
        };
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
            );
            expect(dropdown.classList).not.toContain('slds-dropdown_small');
            expect(dropdown.classList).toContain('slds-dropdown_xx-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_x-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_medium');
            expect(dropdown.classList).not.toContain('slds-dropdown_large');
        });
    });

    it('Filter menu: typeAttributes for list, dropdownWidth = x-small', () => {
        element.typeAttributes = {
            dropdownWidth: 'x-small'
        };
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
            );
            expect(dropdown.classList).not.toContain('slds-dropdown_small');
            expect(dropdown.classList).not.toContain('slds-dropdown_xx-small');
            expect(dropdown.classList).toContain('slds-dropdown_x-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_medium');
            expect(dropdown.classList).not.toContain('slds-dropdown_large');
        });
    });

    it('Filter menu: typeAttributes for list, dropdownWidth = medium', () => {
        element.typeAttributes = {
            dropdownWidth: 'medium'
        };
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
            );
            expect(dropdown.classList).not.toContain('slds-dropdown_small');
            expect(dropdown.classList).not.toContain('slds-dropdown_xx-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_x-small');
            expect(dropdown.classList).toContain('slds-dropdown_medium');
            expect(dropdown.classList).not.toContain('slds-dropdown_large');
        });
    });

    it('Filter menu: typeAttributes for list, dropdownWidth = large', () => {
        element.typeAttributes = {
            dropdownWidth: 'large'
        };
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector(
                '[data-element-id="div-dropdown"]'
            );
            expect(dropdown.classList).not.toContain('slds-dropdown_small');
            expect(dropdown.classList).not.toContain('slds-dropdown_xx-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_x-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_medium');
            expect(dropdown.classList).toContain('slds-dropdown_large');
        });
    });

    it('Filter menu: typeAttributes for list, isMultiSelect = false', () => {
        element.typeAttributes = {
            items: ITEMS,
            isMultiSelect: false
        };
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();
        const handler = jest.fn();
        element.addEventListener('select', handler);

        return Promise.resolve()
            .then(() => {
                const item = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-menu-item"]'
                );
                item.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            value: ITEMS[0].value
                        },
                        bubbles: true
                    })
                );
                expect(handler.mock.calls[0][0].detail.value).toEqual([
                    ITEMS[0].value
                ]);
            })
            .then(() => {
                const item = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-menu-item"]'
                );
                item.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            value: ITEMS[1].value
                        },
                        bubbles: true
                    })
                );
                expect(handler.mock.calls[1][0].detail.value).toEqual([
                    ITEMS[1].value
                ]);
            });
    });

    it('Filter menu: typeAttributes for list, isMultiSelect = false, vertical variant', () => {
        element.typeAttributes = {
            items: ITEMS,
            isMultiSelect: false
        };
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const choiceSet = element.shadowRoot.querySelector(
                '[data-element-id="avonni-input-choice-set"]'
            );
            expect(choiceSet.isMultiSelect).toBeFalsy();
        });
    });

    it('Filter menu: typeAttributes for list, isMultiSelect = true', () => {
        element.typeAttributes = {
            items: ITEMS,
            isMultiSelect: true
        };
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        const handler = jest.fn();
        element.addEventListener('select', handler);

        return Promise.resolve()
            .then(() => {
                const item = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-menu-item"]'
                );
                item.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            value: ITEMS[0].value
                        },
                        bubbles: true
                    })
                );
                expect(handler.mock.calls[0][0].detail.value).toEqual([
                    ITEMS[0].value
                ]);
            })
            .then(() => {
                const item = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-menu-item"]'
                );
                item.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            value: ITEMS[1].value
                        },
                        bubbles: true
                    })
                );
                expect(handler.mock.calls[1][0].detail.value).toEqual([
                    ITEMS[0].value,
                    ITEMS[1].value
                ]);
            });
    });

    it('Filter menu: typeAttributes for list, isMultiSelect = true, vertical variant', () => {
        element.typeAttributes = {
            items: ITEMS,
            isMultiSelect: true
        };
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const choiceSet = element.shadowRoot.querySelector(
                '[data-element-id="avonni-input-choice-set"]'
            );
            expect(choiceSet.isMultiSelect).toBeTruthy();
        });
    });

    it('Filter menu: typeAttributes for range', () => {
        const typeAttributes = {
            hideMinMaxValues: true,
            max: 117,
            min: -45,
            showPin: true,
            showTickMarks: true,
            step: 3,
            tickMarkStyle: 'dot',
            unit: 'currency',
            unitAttributes: {
                currencyCode: 'CAD'
            }
        };
        element.type = 'range';
        element.typeAttributes = typeAttributes;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const slider = element.shadowRoot.querySelector(
                '[data-element-id="avonni-slider"]'
            );
            expect(slider.hideMinMaxValues).toBeTruthy();
            expect(slider.max).toBe(117);
            expect(slider.min).toBe(-45);
            expect(slider.showPin).toBeTruthy();
            expect(slider.showTickMarks).toBeTruthy();
            expect(slider.step).toBe(3);
            expect(slider.tickMarkStyle).toBe('dot');
            expect(slider.unit).toBe('currency');
            expect(slider.unitAttributes).toEqual(
                typeAttributes.unitAttributes
            );
            expect(slider.value).toEqual([-45, 117]);
        });
    });

    // value
    // Depends on items
    it('Filter menu: value', () => {
        element.value = VALUE;
        element.typeAttributes = { items: ITEMS, isMultiSelect: true };
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-menu-item"]'
            );
            expect(items[0].checked).toBeTruthy();
            expect(items[1].checked).toBeTruthy();
            expect(items[2].checked).toBeFalsy();

            const pillContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-pill-container"]'
            );
            expect(pillContainer.items).toEqual([
                {
                    label: 'Item 1',
                    name: 'item-1'
                },
                {
                    label: 'Item 2',
                    name: 'item-2'
                }
            ]);
        });
    });

    it('Filter menu: value, date range type', () => {
        element.value = [new Date(2020, 0, 1), new Date(2020, 0, 31)];
        element.type = 'date-range';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dateRange = element.shadowRoot.querySelector(
                '[data-element-id="avonni-input-date-range"]'
            );
            expect(dateRange.startDate).toEqual(new Date(2020, 0, 1));
            expect(dateRange.endDate).toEqual(new Date(2020, 0, 31));
        });
    });

    it('Filter menu: value, range type', () => {
        element.value = [0.35, 67];
        element.type = 'range';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const slider = element.shadowRoot.querySelector(
                '[data-element-id="avonni-slider"]'
            );
            expect(slider.value).toEqual([0.35, 67]);
        });
    });

    // variant
    it('Filter menu: variant = horizontal', () => {
        element.variant = 'horizontal';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );

            expect(button).toBeTruthy();
        });
    });

    it('Filter menu: variant = vertical', () => {
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const checkbox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-input-choice-set"]'
            );

            expect(checkbox).toBeTruthy();
            expect(element.shadowRoot.host.classList).not.toContain(
                'slds-dropdown-trigger'
            );
            expect(element.shadowRoot.host.classList).not.toContain(
                'slds-dropdown-trigger_click'
            );
        });
    });

    /*
     * ------------------------------------------------------------
     *  METHODS
     * -------------------------------------------------------------
     */

    // apply
    // Depends on value and items
    it('Filter menu: apply method', () => {
        element.value = VALUE;
        element.typeAttributes = { items: ITEMS };

        return Promise.resolve()
            .then(() => {
                element.apply();
            })
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-pill-container"]'
                );
                expect(pills).toBeTruthy();
            });
    });

    // focus
    // Depends on variant
    it('Filter menu: focus method', () => {
        const handler = jest.fn();
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.addEventListener('focus', handler);

        element.focus();
        expect(handler).toHaveBeenCalled();
    });

    it('Filter menu: focus method with vertical variant', () => {
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const inputChoiceSet = element.shadowRoot.querySelector(
                '[data-element-id="avonni-input-choice-set"]'
            );
            const spy = jest.spyOn(inputChoiceSet, 'focus');

            element.focus();
            expect(spy).toHaveBeenCalled();
        });
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    // loadmore
    it('Filter menu: loadmore event', () => {
        const handler = jest.fn();
        element.addEventListener('loadmore', handler);

        expect(handler).not.toHaveBeenCalled();

        element.typeAttributes = {
            enableInfiniteLoading: true
        };

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();
        return Promise.resolve()
            .then(() => {
                // Dispatch loadmore when there are no items on opening
                expect(handler).toHaveBeenCalledTimes(1);
                const call = handler.mock.calls[0][0];
                expect(call.bubbles).toBeTruthy();
                expect(call.cancelable).toBeFalsy();
                expect(call.composed).toBeFalsy();
            })
            .then(() => {
                // Dispatch loadmore when reaching the end of the list
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="div-dropdown-content"]'
                );
                jest.spyOn(dropdown, 'scrollHeight', 'get').mockReturnValue(
                    100
                );
                jest.spyOn(dropdown, 'offsetHeight', 'get').mockReturnValue(80);
                dropdown.scrollTop = 20;

                dropdown.dispatchEvent(new CustomEvent('scroll'));
                expect(handler).toHaveBeenCalledTimes(2);

                element.isLoading = true;
            })
            .then(() => {
                // Do not dispatch loadmore when loading
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="div-dropdown-content"]'
                );
                jest.spyOn(dropdown, 'scrollHeight', 'get').mockReturnValue(
                    100
                );
                jest.spyOn(dropdown, 'offsetHeight', 'get').mockReturnValue(80);
                dropdown.scrollTop = 20;

                dropdown.dispatchEvent(new CustomEvent('scroll'));
                expect(handler).toHaveBeenCalledTimes(2);
            });
    });

    it('Filter menu: loadmore event, vertical variant', () => {
        const handler = jest.fn();
        element.addEventListener('loadmore', handler);

        expect(handler).not.toHaveBeenCalled();

        element.variant = 'vertical';
        element.typeAttributes = {
            enableInfiniteLoading: true
        };

        return Promise.resolve()
            .then(() => {
                // Dispatch loadmore when there are no items
                expect(handler).toHaveBeenCalledTimes(1);
            })
            .then(() => {
                // Dispatch loadmore when clicking on the load more button
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-load-more"]'
                );
                expect(button).toBeTruthy();
                button.click();
                expect(handler).toHaveBeenCalledTimes(2);

                element.isLoading = true;
            })
            .then(() => {
                // Do not show the load more button when loading
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-load-more"]'
                );
                expect(button).toBeFalsy();
            });
    });

    // select
    // Depends on items and variant
    it('Filter menu: select event, with horizontal variant', () => {
        const handler = jest.fn();
        element.addEventListener('select', handler);

        const applyHandler = jest.fn();
        element.addEventListener('apply', applyHandler);

        element.typeAttributes = {
            items: ITEMS
        };
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve()
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="lightning-menu-item"]'
                );
                expect(items[2].checked).toBeFalsy();

                items[2].dispatchEvent(
                    new CustomEvent('privateselect', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            value: items[2].value
                        }
                    })
                );

                expect(applyHandler).not.toHaveBeenCalled();
                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.bubbles).toBeTruthy();
                expect(call.cancelable).toBeFalsy();
                expect(call.composed).toBeFalsy();
                expect(call.detail.value).toEqual(['item-3']);
            })
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="lightning-menu-item"]'
                );
                expect(items[2].checked).toBeTruthy();

                items[2].dispatchEvent(
                    new CustomEvent('privateselect', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            value: items[2].value
                        }
                    })
                );
            })
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="lightning-menu-item"]'
                );
                expect(items[2].checked).toBeFalsy();
            });
    });

    it('Filter menu: select event, with vertical variant', () => {
        const handler = jest.fn();
        element.addEventListener('select', handler);
        element.variant = 'vertical';
        element.typeAttributes = { items: ITEMS };

        return Promise.resolve().then(() => {
            const checkbox = element.shadowRoot.querySelector(
                '[data-element-id="avonni-input-choice-set"]'
            );

            checkbox.dispatchEvent(
                new CustomEvent('change', {
                    detail: {
                        value: ['item-3']
                    }
                })
            );

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toEqual(['item-3']);
        });
    });

    it('Filter menu: select event, date-range type', () => {
        const handler = jest.fn();
        element.addEventListener('select', handler);

        element.type = 'date-range';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dateRange = element.shadowRoot.querySelector(
                '[data-element-id="avonni-input-date-range"]'
            );
            const startDate = new Date(2022, 3, 4).toISOString();
            const endDate = new Date(2022, 3, 5).toISOString();
            dateRange.dispatchEvent(
                new CustomEvent('change', {
                    detail: {
                        startDate,
                        endDate
                    }
                })
            );

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toEqual([
                startDate,
                endDate
            ]);
        });
    });

    it('Filter menu: select event, range type', () => {
        const handler = jest.fn();
        element.addEventListener('select', handler);

        element.type = 'range';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dateRange = element.shadowRoot.querySelector(
                '[data-element-id="avonni-slider"]'
            );
            dateRange.dispatchEvent(
                new CustomEvent('change', {
                    detail: {
                        value: [20, 80]
                    }
                })
            );

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toEqual([20, 80]);
        });
    });

    // apply
    // Depends on items and value
    it('Filter menu: apply event', () => {
        const handler = jest.fn();
        element.addEventListener('apply', handler);

        element.typeAttributes = {
            items: ITEMS
        };
        element.value = VALUE;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve()
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-menu-item"]'
                );
                items[3].dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            value: 'item-4'
                        },
                        bubbles: true
                    })
                );
                const applyButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-apply"]'
                );
                applyButton.click();

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.value).toEqual([
                    'item-4'
                ]);
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(element.value).toEqual(['item-4']);
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="div-dropdown"]'
                );
                expect(dropdown).toBeFalsy();
            });
    });

    it('Filter menu: apply event on select, when hideapplyResetButtons is true', () => {
        const handler = jest.fn();
        element.addEventListener('apply', handler);

        element.hideApplyResetButtons = true;
        element.typeAttributes = {
            items: ITEMS
        };
        element.value = VALUE;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-menu-item"]'
            );
            items[3].dispatchEvent(
                new CustomEvent('privateselect', {
                    detail: {
                        value: 'item-4'
                    },
                    bubbles: true
                })
            );

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toEqual(['item-4']);
            expect(element.value).toEqual(['item-4']);
        });
    });

    it('Filter menu: apply event on selected item removal', () => {
        const handler = jest.fn();
        element.addEventListener('apply', handler);

        element.typeAttributes = {
            items: ITEMS
        };
        element.value = [ITEMS[1].value, ITEMS[0].value];

        return Promise.resolve().then(() => {
            const pillContainer = element.shadowRoot.querySelector(
                '[data-element-id="avonni-pill-container"]'
            );
            pillContainer.dispatchEvent(
                new CustomEvent('actionclick', {
                    detail: {
                        targetName: ITEMS[1].value,
                        index: 0
                    }
                })
            );

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toEqual([
                ITEMS[0].value
            ]);
            expect(element.value).toEqual([ITEMS[0].value]);
        });
    });

    it('Filter menu: apply event, multi-select', () => {
        const handler = jest.fn();
        element.addEventListener('apply', handler);

        element.typeAttributes = {
            items: ITEMS,
            isMultiSelect: true
        };
        element.value = VALUE;

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-menu-item"]'
            );
            items[3].dispatchEvent(
                new CustomEvent('privateselect', {
                    detail: {
                        value: 'item-4'
                    },
                    bubbles: true
                })
            );
            const applyButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-apply"]'
            );
            applyButton.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toEqual([
                ...VALUE,
                'item-4'
            ]);
        });
    });

    // reset
    // Depends on items and value
    it('Filter menu: reset event', () => {
        const handler = jest.fn();
        element.addEventListener('reset', handler);

        element.typeAttributes = {
            items: ITEMS
        };
        element.value = VALUE;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve()
            .then(() => {
                const resetButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-reset"]'
                );
                resetButton.click();

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
            })
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-menu-item"]'
                );
                items.forEach((item) => {
                    expect(item.checked).toBeFalsy();
                });
            });
    });

    // close and open
    it('Filter menu: close and open event', () => {
        const closeHandler = jest.fn();
        const openHandler = jest.fn();
        element.addEventListener('close', closeHandler);
        element.addEventListener('open', openHandler);

        let dropdown = element.shadowRoot.querySelector(
            '[data-element-id="div-dropdown"]'
        );
        expect(dropdown).toBeFalsy();

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve()
            .then(() => {
                expect(openHandler).toHaveBeenCalled();
                expect(openHandler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(openHandler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(openHandler.mock.calls[0][0].composed).toBeFalsy();

                dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="div-dropdown"]'
                );
                expect(dropdown).toBeTruthy();

                button.click();
            })
            .then(() => {
                expect(closeHandler).toHaveBeenCalled();
                expect(closeHandler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(closeHandler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(closeHandler.mock.calls[0][0].composed).toBeFalsy();

                dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="div-dropdown"]'
                );
                expect(dropdown).toBeFalsy();
            });
    });

    it('Filter menu: dropdown closes on blur', () => {
        const handler = jest.fn();
        element.addEventListener('close', handler);

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve()
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="div-dropdown"]'
                );
                expect(dropdown).toBeTruthy();

                // Blur and immediately focus: the dropdown should not close
                dropdown.dispatchEvent(new CustomEvent('focusout'));
                dropdown.dispatchEvent(new CustomEvent('focusin'));
                jest.runAllTimers();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="div-dropdown"]'
                );
                expect(dropdown).toBeTruthy();

                // Blur without focusing: the dropdown should close
                dropdown.dispatchEvent(new CustomEvent('focusout'));
                jest.runAllTimers();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="div-dropdown"]'
                );
                expect(dropdown).toBeFalsy();
                expect(handler).toHaveBeenCalled();
            });
    });

    it('Filter menu: dropdown closes on Escape key', () => {
        const handler = jest.fn();
        element.addEventListener('close', handler);

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve()
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="div-dropdown"]'
                );
                expect(dropdown).toBeTruthy();

                // For any other key, the drodpown should not close
                const keyEvent = new CustomEvent('keyup');
                keyEvent.key = 'Space';
                dropdown.dispatchEvent(keyEvent);
                expect(handler).not.toHaveBeenCalled();

                // For Escape key, the drodpown should close
                keyEvent.key = 'Escape';
                dropdown.dispatchEvent(keyEvent);
                expect(handler).toHaveBeenCalled();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="div-dropdown"]'
                );
                expect(dropdown).toBeFalsy();
            });
    });

    // search
    // Depends on items and allowSearch
    it('Filter menu: search event', () => {
        const handler = jest.fn();
        element.addEventListener('search', handler);
        jest.useFakeTimers();

        element.typeAttributes = {
            items: ITEMS,
            allowSearch: true
        };
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );
                input.dispatchEvent(
                    new CustomEvent('change', {
                        detail: {
                            value: 'Searchable'
                        }
                    })
                );

                jest.runAllTimers();
                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.detail.value).toBe('Searchable');
                expect(call.bubbles).toBeTruthy();
                expect(call.composed).toBeFalsy();
                expect(call.cancelable).toBeFalsy();
            })
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="lightning-menu-item"]'
                );
                expect(items).toHaveLength(1);
                expect(items[0].value).toBe('item-3');
            });
    });

    // blur
    it('Filter menu: blur event (button blur)', () => {
        const handler = jest.fn();
        element.addEventListener('blur', handler);

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.focus();
        button.blur();
        expect(handler).toHaveBeenCalled();
    });

    // content blur
    // Depends on items
    it('Filter menu: blur of an inside element', () => {
        element.typeAttributes = {
            items: ITEMS
        };
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve()
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="div-dropdown"]'
                );
                expect(dropdown).toBeTruthy();

                const item = element.shadowRoot.querySelector(
                    '[data-element-id^="lightning-menu-item"]'
                );
                item.dispatchEvent(
                    new CustomEvent('privatefocus', {
                        bubbles: true,
                        cancelable: true,
                        detail: {
                            value: item.value
                        }
                    })
                );
                item.dispatchEvent(
                    new CustomEvent('privateblur', {
                        composed: true,
                        bubbles: true,
                        cancelable: true
                    })
                );
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="div-dropdown"]'
                );
                expect(dropdown).toBeTruthy();
            });
    });

    // privatebuttonregister
    it('Filter menu: privatebuttonregister event', () => {
        element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        const mockDeRegistrationCallback = jest.fn();

        const handler = jest.fn().mockImplementation((event) => {
            event.detail.callbacks.setDeRegistrationCallback(
                mockDeRegistrationCallback
            );
        });
        element.addEventListener('privatebuttonregister', handler);

        document.body.appendChild(element);

        expect(handler).toHaveBeenCalled();
        expect(
            handler.mock.calls[0][0].detail.callbacks.setDeRegistrationCallback
        ).toBeTruthy();
        expect(handler.mock.calls[0][0].detail.callbacks.setOrder).toBeTruthy();
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();

        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }

        expect(mockDeRegistrationCallback).toHaveBeenCalled();
    });

    it('Filter menu: Keyboard navigation between the list items', () => {
        element.typeAttributes = { items: ITEMS };

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-menu-item"]'
            );
            const secondItemSpy = jest.spyOn(items[1], 'focus');
            const firstItemSpy = jest.spyOn(items[0], 'focus');
            const lastItemSpy = jest.spyOn(items[items.length - 1], 'focus');
            const keyEvent = new CustomEvent('keydown');
            keyEvent.key = 'ArrowDown';
            items[0].dispatchEvent(keyEvent);

            expect(secondItemSpy).toHaveBeenCalled();
            keyEvent.key = 'ArrowUp';
            items[1].dispatchEvent(keyEvent);
            expect(firstItemSpy).not.toHaveBeenCalled();
            expect(lastItemSpy).toHaveBeenCalled();
        });
    });
});
