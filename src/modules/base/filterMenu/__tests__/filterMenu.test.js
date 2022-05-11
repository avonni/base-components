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
import FilterMenu from 'c/filterMenu';

// Not tested:
// tooltip with horizontal variant (is injected outside of shadow dom)
// auto positionning
// mousedown events (we can't artificially dispatch an event with a button code)
// Keyboard navigation (we can't artificially dispatch an event with a key code)

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
    });

    beforeEach(() => {
        element = createElement('base-filter-menu', {
            is: FilterMenu
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
        expect(element.dropdownLength).toBe('7-items');
        expect(element.dropdownWidth).toBe('small');
        expect(element.dropdownNubbin).toBeFalsy();
        expect(element.hideApplyResetButtons).toBeFalsy();
        expect(element.hideSelectedItems).toBeFalsy();
        expect(element.iconName).toBe('utility:down');
        expect(element.iconSize).toBe('medium');
        expect(element.isLoading).toBeFalsy();
        expect(element.items).toMatchObject([]);
        expect(element.label).toBeUndefined();
        expect(element.loadingStateAlternativeText).toBe('Loading');
        expect(element.resetButtonLabel).toBe('Reset');
        expect(element.searchInputPlaceholder).toBe('Search...');
        expect(element.showSearchBox).toBeFalsy();
        expect(element.title).toBeUndefined();
        expect(element.tooltip).toBeUndefined();
        expect(element.value).toMatchObject([]);
        expect(element.variant).toBe('horizontal');
    });

    /* ----- ATTRIBUTES ----- */

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
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
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
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
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
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
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
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
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
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
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
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
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
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
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
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');

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

    // dropdown-length
    it('Filter menu: dropdownLength = 7-items', () => {
        element.dropdownLength = '7-items';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const itemList = element.shadowRoot.querySelector(
                '.slds-dropdown__list .slds-dropdown__list'
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

    it('Filter menu: dropdownLength = 5-items', () => {
        element.dropdownLength = '5-items';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const itemList = element.shadowRoot.querySelector(
                '.slds-dropdown__list .slds-dropdown__list'
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

    it('Filter menu: dropdownLength = 10-items', () => {
        element.dropdownLength = '10-items';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const itemList = element.shadowRoot.querySelector(
                '.slds-dropdown__list .slds-dropdown__list'
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

    // dropdown-width
    it('Filter menu: dropdownWidth = small', () => {
        element.dropdownWidth = 'small';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
            expect(dropdown.classList).toContain('slds-dropdown_small');
            expect(dropdown.classList).not.toContain('slds-dropdown_xx-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_x-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_medium');
            expect(dropdown.classList).not.toContain('slds-dropdown_large');
        });
    });

    it('Filter menu: dropdownWidth = xx-small', () => {
        element.dropdownWidth = 'xx-small';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
            expect(dropdown.classList).not.toContain('slds-dropdown_small');
            expect(dropdown.classList).toContain('slds-dropdown_xx-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_x-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_medium');
            expect(dropdown.classList).not.toContain('slds-dropdown_large');
        });
    });

    it('Filter menu: dropdownWidth = x-small', () => {
        element.dropdownWidth = 'x-small';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
            expect(dropdown.classList).not.toContain('slds-dropdown_small');
            expect(dropdown.classList).not.toContain('slds-dropdown_xx-small');
            expect(dropdown.classList).toContain('slds-dropdown_x-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_medium');
            expect(dropdown.classList).not.toContain('slds-dropdown_large');
        });
    });

    it('Filter menu: dropdownWidth = medium', () => {
        element.dropdownWidth = 'medium';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
            expect(dropdown.classList).not.toContain('slds-dropdown_small');
            expect(dropdown.classList).not.toContain('slds-dropdown_xx-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_x-small');
            expect(dropdown.classList).toContain('slds-dropdown_medium');
            expect(dropdown.classList).not.toContain('slds-dropdown_large');
        });
    });

    it('Filter menu: dropdownWidth = large', () => {
        element.dropdownWidth = 'large';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const dropdown = element.shadowRoot.querySelector('.slds-dropdown');
            expect(dropdown.classList).not.toContain('slds-dropdown_small');
            expect(dropdown.classList).not.toContain('slds-dropdown_xx-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_x-small');
            expect(dropdown.classList).not.toContain('slds-dropdown_medium');
            expect(dropdown.classList).toContain('slds-dropdown_large');
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
        element.items = ITEMS;
        element.value = VALUE;

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                '[data-element-id="lightning-pill-container"]'
            );
            expect(pills).toBeTruthy();
        });
    });

    it('Filter menu: hideSelectedItems = false, with vertical variant', () => {
        element.hideSelectedItems = false;
        element.variant = 'vertical';
        element.items = ITEMS;
        element.value = VALUE;

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                '[data-element-id="lightning-pill-container"]'
            );
            expect(pills).toBeTruthy();
        });
    });

    it('Filter menu: hideSelectedItems = true, with horizontal variant', () => {
        element.hideSelectedItems = true;
        element.items = ITEMS;
        element.value = VALUE;

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                '[data-element-id="lightning-pill-container"]'
            );
            expect(pills).toBeFalsy();
        });
    });

    it('Filter menu: hideSelectedItems = true, with vertical variant', () => {
        element.hideSelectedItems = true;
        element.variant = 'vertical';
        element.items = ITEMS;
        element.value = VALUE;

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                '[data-element-id="lightning-pill-container"]'
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
            const list = element.shadowRoot.querySelector(
                '.slds-dropdown__list'
            );

            expect(spinner).toBeFalsy();
            expect(list).toBeTruthy();
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
            const list = element.shadowRoot.querySelector(
                '.slds-dropdown__list'
            );

            expect(spinner).toBeTruthy();
            expect(list).toBeFalsy();
        });
    });

    // is-multi-select
    // Depends on items and variant
    it('Filter menu: isMultiSelect = false', () => {
        element.items = ITEMS;
        element.isMultiSelect = false;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

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
                expect(element.value).toMatchObject([ITEMS[0].value]);
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
                expect(element.value).toMatchObject([ITEMS[1].value]);
            });
    });

    it('Filter menu: isMultiSelect = false, vertical variant', () => {
        element.items = ITEMS;
        element.isMultiSelect = false;
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const choiceSet = element.shadowRoot.querySelector(
                '[data-element-id="avonni-input-choice-set"]'
            );
            expect(choiceSet.isMultiSelect).toBeFalsy();
        });
    });

    it('Filter menu: isMultiSelect = true', () => {
        element.items = ITEMS;
        element.isMultiSelect = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

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
                expect(element.value).toMatchObject([ITEMS[0].value]);
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
                expect(element.value).toMatchObject([
                    ITEMS[0].value,
                    ITEMS[1].value
                ]);
            });
    });

    it('Filter menu: isMultiSelect = true, vertical variant', () => {
        element.items = ITEMS;
        element.isMultiSelect = true;
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const choiceSet = element.shadowRoot.querySelector(
                '[data-element-id="avonni-input-choice-set"]'
            );
            expect(choiceSet.isMultiSelect).toBeTruthy();
        });
    });

    // items
    it('Filter menu: items', () => {
        element.items = ITEMS;
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

    // search-input-placeholder
    // Depends on showSearchBox
    it('Filter menu: searchInputPlaceholder', () => {
        element.searchInputPlaceholder = 'A string placeholder';
        element.showSearchBox = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );
            expect(input.placeholder).toBe('A string placeholder');
        });
    });

    // show-search-box
    it('Filter menu: showSearchBox = false', () => {
        element.showSearchBox = false;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );
            expect(input).toBeFalsy();
        });
    });

    it('Filter menu: showSearchBox = true', () => {
        element.showSearchBox = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );
            expect(input).toBeTruthy();
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

    // value
    // Depends on items
    it('Filter menu: value', () => {
        element.value = VALUE;
        element.items = ITEMS;
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
            expect(element.shadowRoot.host.classList).toContain(
                'slds-dropdown-trigger'
            );
            expect(element.shadowRoot.host.classList).toContain(
                'slds-dropdown-trigger_click'
            );
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

    /* ----- METHODS ----- */

    // clear
    // Depends on value and items
    it('Filter menu: clear method', () => {
        element.value = VALUE;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            element.clear();
            expect(element.value).toMatchObject([]);
        });
    });

    // apply
    // Depends on value and items
    it('Filter menu: apply method', () => {
        element.value = VALUE;
        element.items = ITEMS;

        return Promise.resolve()
            .then(() => {
                element.apply();
            })
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-pill-container"]'
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

    /* ----- EVENTS ----- */

    // select
    // Depends on items and variant
    it('Filter menu: select event, with horizontal variant', () => {
        const handler = jest.fn();
        element.addEventListener('select', handler);

        element.items = ITEMS;
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

                expect(handler).toHaveBeenCalled();
                expect(element.value).toMatchObject(['item-3']);
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
        element.items = ITEMS;

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
            expect(element.value).toMatchObject(['item-3']);
        });
    });

    // apply
    // Depends on items and value
    it('Filter menu: apply event', () => {
        const handler = jest.fn();
        element.addEventListener('apply', handler);

        element.items = ITEMS;
        element.value = VALUE;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const applyButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-apply"]'
            );
            applyButton.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toBe(VALUE[0]);
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    it('Filter menu: apply event, multi-select', () => {
        const handler = jest.fn();
        element.addEventListener('apply', handler);

        element.items = ITEMS;
        element.value = VALUE;
        element.isMultiSelect = true;

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const applyButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-apply"]'
            );
            applyButton.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toMatchObject(VALUE);
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    // reset
    // Depends on items and value
    it('Filter menu: reset event', () => {
        const handler = jest.fn();
        element.addEventListener('reset', handler);

        element.items = ITEMS;
        element.value = VALUE;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            const resetButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-reset"]'
            );
            resetButton.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();

            expect(element.value).toMatchObject([]);
        });
    });

    // close
    it('Filter menu: close event', () => {
        const handler = jest.fn();
        element.addEventListener('close', handler);

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
            expect(element.shadowRoot.host.classList).toContain('slds-is-open');
            button.click();
            expect(handler).toHaveBeenCalled();
            expect(element.shadowRoot.host.classList).not.toContain(
                'slds-is-open'
            );
        });
    });

    // search
    // Depends on items and showSearchBox
    it('Filter menu: search event', () => {
        const handler = jest.fn();
        element.addEventListener('search', handler);

        element.items = ITEMS;
        element.showSearchBox = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );
                input.value = 'Searchable';
                input.dispatchEvent(new CustomEvent('change'));

                expect(handler).toHaveBeenCalled();
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
        button.click();

        return Promise.resolve().then(() => {
            button.click();
            button.dispatchEvent(new CustomEvent('blur'));

            expect(handler).toHaveBeenCalled();
            expect(element.shadowRoot.host.classList).not.toContain(
                'slds-is-open'
            );
        });
    });

    // content blur
    // Depends on items
    it('Filter menu: blur of an inside element', () => {
        element.items = ITEMS;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        button.click();

        return Promise.resolve().then(() => {
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

            expect(element.shadowRoot.host.classList).not.toContain(
                'slds-is-open'
            );
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
});
