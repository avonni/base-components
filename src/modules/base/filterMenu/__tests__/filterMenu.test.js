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
// focus with vertical variant (the test can't catch the focus dispacthed by lightning-checkbox-group)

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

describe('FilterMenu', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

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
    it('accessKey', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.accessKey = 'K';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.accessKey).toBe('K');
        });
    });

    // alternative-text
    it('alternativeText', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.alternativeText = 'A string alt text';

        return Promise.resolve().then(() => {
            const altText = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            expect(altText.textContent).toBe('A string alt text');
        });
    });

    // apply-button-label
    it('applyButtonLabel', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.applyButtonLabel = 'A string label';
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const submitButton = element.shadowRoot.querySelector(
                '.slds-dropdown lightning-button:last-of-type'
            );
            expect(submitButton.label).toBe('A string label');
        });
    });

    // button-variant
    // Depends on iconName and label
    it('buttonVariant = border', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.buttonVariant = 'border';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-border'
            );
        });
    });

    it('buttonVariant = border, with label', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.buttonVariant = 'border';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_neutral'
            );
        });
    });

    it('buttonVariant = border, with icon', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.buttonVariant = 'border';
        element.iconName = 'utility:user';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon slds-button_icon-more'
            );
        });
    });

    it('buttonVariant = bare', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.buttonVariant = 'bare';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-bare'
            );
        });
    });

    it('buttonVariant = bare, with label', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.buttonVariant = 'bare';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe('slds-button');
        });
    });

    it('buttonVariant = bare, with icon', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.buttonVariant = 'bare';
        element.iconName = 'standard:user';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon slds-button_icon-bare slds-button_icon-more'
            );
        });
    });

    it('buttonVariant = container', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.buttonVariant = 'container';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-container'
            );
        });
    });

    it('buttonVariant = container, with label', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.buttonVariant = 'container';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe('slds-button');
        });
    });

    it('buttonVariant = container, with icon', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.buttonVariant = 'container';
        element.icon = 'utility:user';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-container'
            );
        });
    });

    it('buttonVariant = border-filled', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.buttonVariant = 'border-filled';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-border-filled'
            );
        });
    });

    it('buttonVariant = border-filled, with label', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.buttonVariant = 'border-filled';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe('slds-button');
        });
    });

    it('buttonVariant = border-filled, with icon', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.buttonVariant = 'border-filled';
        element.iconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon slds-button_icon-more slds-button_icon-border-filled'
            );
        });
    });

    it('buttonVariant = bare-inverse', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.buttonVariant = 'bare-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-bare slds-button_icon-inverse'
            );
        });
    });

    it('buttonVariant = bare-inverse, with label', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.buttonVariant = 'bare-inverse';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe('slds-button');
        });
    });

    it('buttonVariant = bare-inverse, with icon', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.buttonVariant = 'bare-inverse';
        element.iconName = 'standard:apps';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon slds-button_icon-bare slds-button_icon-container-more slds-button_icon-inverse'
            );
        });
    });

    it('buttonVariant = border-inverse', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.buttonVariant = 'border-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-border-inverse'
            );
        });
    });

    it('buttonVariant = border-inverse, with label', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.buttonVariant = 'border-inverse';
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_inverse'
            );
        });
    });

    it('buttonVariant = border-inverse, with icon', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.buttonVariant = 'border-inverse';
        element.icon = 'utility:apps';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList.value).toBe(
                'slds-button slds-button_icon-border-inverse'
            );
        });
    });

    // disabled
    it('disabled = false', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.disabled = false;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.disabled).toBeFalsy();
        });
    });

    it('disabled = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.disabled = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.disabled).toBeTruthy();
        });
    });

    // dropdown-alignment and dropdownNubbin
    it('dropdownAlignment = left and dropdownNubbin = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.dropdownAlignment = 'left';
        element.dropdownNubbin = true;
        const button = element.shadowRoot.querySelector('button');
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

    it('dropdownAlignment = auto and dropdownNubbin = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.dropdownAlignment = 'auto';
        element.dropdownNubbin = true;
        const button = element.shadowRoot.querySelector('button');
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

    it('dropdownAlignment = center and dropdownNubbin = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.dropdownAlignment = 'center';
        element.dropdownNubbin = true;
        const button = element.shadowRoot.querySelector('button');
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

    it('dropdownAlignment = right and dropdownNubbin = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.dropdownAlignment = 'right';
        element.dropdownNubbin = true;
        const button = element.shadowRoot.querySelector('button');
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

    it('dropdownAlignment = bottom-left and dropdownNubbin = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.dropdownAlignment = 'bottom-left';
        element.dropdownNubbin = true;
        const button = element.shadowRoot.querySelector('button');
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

    it('dropdownAlignment = bottom-center and dropdownNubbin = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.dropdownAlignment = 'bottom-center';
        element.dropdownNubbin = true;
        const button = element.shadowRoot.querySelector('button');
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

    it('dropdownAlignment = bottom-right and dropdownNubbin = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.dropdownAlignment = 'bottom-right';
        element.dropdownNubbin = true;
        const button = element.shadowRoot.querySelector('button');
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

    it('dropdownNubbin = false', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.dropdownNubbin = false;
        const button = element.shadowRoot.querySelector('button');
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
    it('dropdownLength = 7-items', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.dropdownLength = '7-items';
        const button = element.shadowRoot.querySelector('button');
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

    it('dropdownLength = 5-items', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.dropdownLength = '5-items';
        const button = element.shadowRoot.querySelector('button');
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

    it('dropdownLength = 10-items', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.dropdownLength = '10-items';
        const button = element.shadowRoot.querySelector('button');
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
    it('dropdownWidth = small', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.dropdownWidth = 'small';
        const button = element.shadowRoot.querySelector('button');
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

    it('dropdownWidth = xx-small', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.dropdownWidth = 'xx-small';
        const button = element.shadowRoot.querySelector('button');
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

    it('dropdownWidth = x-small', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.dropdownWidth = 'x-small';
        const button = element.shadowRoot.querySelector('button');
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

    it('dropdownWidth = medium', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.dropdownWidth = 'medium';
        const button = element.shadowRoot.querySelector('button');
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

    it('dropdownWidth = large', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.dropdownWidth = 'large';
        const button = element.shadowRoot.querySelector('button');
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
    it('hideApplyResetButtons = false, with horizontal variant', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.hideApplyResetButtons = false;

        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            expect(buttons).toHaveLength(2);
        });
    });

    it('hideApplyResetButtons = false, with vertical variant', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.hideApplyResetButtons = false;
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            expect(buttons).toHaveLength(2);
        });
    });

    it('hideApplyResetButtons = true, with horizontal variant', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.hideApplyResetButtons = true;

        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            expect(buttons).toHaveLength(0);
        });
    });

    it('hideApplyResetButtons = true, with vertical variant', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.hideApplyResetButtons = true;
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            expect(buttons).toHaveLength(0);
        });
    });

    // hide-selected-items
    // Depends on items, value and variant
    it('hideSelectedItems = false, with horizontal variant', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.hideSelectedItems = false;
        element.items = ITEMS;
        element.value = VALUE;

        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                'lightning-pill-container'
            );
            expect(pills).toBeTruthy();
        });
    });

    it('hideSelectedItems = false, with vertical variant', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.hideSelectedItems = false;
        element.variant = 'vertical';
        element.items = ITEMS;
        element.value = VALUE;

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                'lightning-pill-container'
            );
            expect(pills).toBeTruthy();
        });
    });

    it('hideSelectedItems = true, with horizontal variant', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.hideSelectedItems = true;
        element.items = ITEMS;
        element.value = VALUE;

        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                'lightning-pill-container'
            );
            expect(pills).toBeFalsy();
        });
    });

    it('hideSelectedItems = true, with vertical variant', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.hideSelectedItems = true;
        element.variant = 'vertical';
        element.items = ITEMS;
        element.value = VALUE;

        return Promise.resolve().then(() => {
            const pills = element.shadowRoot.querySelector(
                'lightning-pill-container'
            );
            expect(pills).toBeFalsy();
        });
    });

    // icon-name
    it('iconName is down arrow', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.iconName = 'utility:chevrondown';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            const icons = element.shadowRoot.querySelectorAll(
                '[data-element-id^="avonni-primitive-icon"]'
            );
            expect(icons).toHaveLength(1);
            expect(icons[0].iconName).toBe('utility:chevrondown');
            expect(button.classList).not.toContain('slds-button_icon');
        });
    });

    it('iconName is not down arrow', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.iconName = 'standard:user';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
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
    it('iconSize = xx-small', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.iconSize = 'xx-small';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList).toContain('slds-button_icon-xx-small');
            expect(button.classList).not.toContain('slds-button_icon-x-small');
            expect(button.classList).not.toContain('slds-button_icon-small');
            expect(button.classList).not.toContain('slds-button_icon-large');
        });
    });

    it('iconSize = x-small', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.iconSize = 'x-small';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList).not.toContain('slds-button_icon-xx-small');
            expect(button.classList).toContain('slds-button_icon-x-small');
            expect(button.classList).not.toContain('slds-button_icon-small');
            expect(button.classList).not.toContain('slds-button_icon-large');
        });
    });

    it('iconSize = medium', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.iconSize = 'medium';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList).not.toContain('slds-button_icon-xx-small');
            expect(button.classList).not.toContain('slds-button_icon-x-small');
            expect(button.classList).not.toContain('slds-button_icon-small');
            expect(button.classList).not.toContain('slds-button_icon-large');
        });
    });

    it('iconSize = large', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.iconSize = 'large';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.classList).not.toContain('slds-button_icon-xx-small');
            expect(button.classList).not.toContain('slds-button_icon-x-small');
            expect(button.classList).not.toContain('slds-button_icon-small');
            expect(button.classList).toContain('slds-button_icon-large');
        });
    });

    // is-loading
    it('isLoading = false', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.isLoading = false;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                'lightning-spinner'
            );
            const list = element.shadowRoot.querySelector(
                '.slds-dropdown__list'
            );

            expect(spinner).toBeFalsy();
            expect(list).toBeTruthy();
        });
    });

    it('isLoading = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.isLoading = true;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                'lightning-spinner'
            );
            const list = element.shadowRoot.querySelector(
                '.slds-dropdown__list'
            );

            expect(spinner).toBeTruthy();
            expect(list).toBeFalsy();
        });
    });

    // items
    it('items', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.items = ITEMS;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                'lightning-menu-item'
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
                    expect(item.tabIndex).toBe(0);
                    firstFocusableItem = true;
                } else {
                    expect(item.tabIndex).toBe(-1);
                }
            });
        });
    });

    // label
    it('label', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.textContent).toContain('A string label');
        });
    });

    // loading-state-alternative-text
    // Depends in isLoading
    it('loadingStateAlternativeText', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.loadingStateAlternativeText = 'A string alt text';
        element.isLoading = true;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                'lightning-spinner'
            );
            expect(spinner.alternativeText).toBe('A string alt text');
        });
    });

    // reset-button-label
    it('resetButtonLabel', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.resetButtonLabel = 'A string label';
        const button = element.shadowRoot.querySelector('button');
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
    it('searchInputPlaceholder', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.searchInputPlaceholder = 'A string placeholder';
        element.showSearchBox = true;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.placeholder).toBe('A string placeholder');
        });
    });

    // show-search-box
    it('showSearchBox = false', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.showSearchBox = false;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input).toBeFalsy();
        });
    });

    it('showSearchBox = true', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.showSearchBox = true;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input).toBeTruthy();
        });
    });

    // title
    it('title', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.title).toBe('A string title');
        });
    });

    // tooltip
    // Depends on variant
    it('tooltip with vertical variant', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.tooltip = 'A string tooltip';
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector('lightning-helptext');
            expect(help).toBeTruthy();
            expect(help.content).toBe('A string tooltip');
        });
    });

    // value
    // Depends on items
    it('value', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.value = VALUE;
        element.items = ITEMS;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                'lightning-menu-item'
            );
            expect(items[0].checked).toBeTruthy();
            expect(items[1].checked).toBeTruthy();
            expect(items[2].checked).toBeFalsy();
        });
    });

    // variant
    it('variant = horizontal', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'horizontal';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');

            expect(button).toBeTruthy();
            expect(element.shadowRoot.host.classList).toContain(
                'slds-dropdown-trigger'
            );
            expect(element.shadowRoot.host.classList).toContain(
                'slds-dropdown-trigger_click'
            );
        });
    });

    it('variant = vertical', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const checkbox = element.shadowRoot.querySelector(
                'lightning-checkbox-group'
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
    it('clear method', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.value = VALUE;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            element.clear();
            expect(element.value).toMatchObject([]);
        });
    });

    // apply
    // Depends on value and items
    it('apply method', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.value = VALUE;
        element.items = ITEMS;

        return Promise.resolve()
            .then(() => {
                element.apply();
            })
            .then(() => {
                const pills = element.shadowRoot.querySelector(
                    'lightning-pill-container'
                );
                expect(pills).toBeTruthy();
            });
    });

    // focus
    it('focus method', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        const button = element.shadowRoot.querySelector('button');
        button.addEventListener('focus', handler);

        element.focus();
        expect(handler).toHaveBeenCalled();
    });

    /* ----- EVENTS ----- */

    // select
    // Depends on items and variant
    it('select event, with horizontal variant', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('select', handler);

        element.items = ITEMS;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve()
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    'lightning-menu-item'
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
                    'lightning-menu-item'
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
                    'lightning-menu-item'
                );
                expect(items[2].checked).toBeFalsy();
            });
    });

    it('select event, with vertical variant', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('select', handler);
        element.variant = 'vertical';
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const checkbox = element.shadowRoot.querySelector(
                'lightning-checkbox-group'
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
    it('apply event', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('apply', handler);

        element.items = ITEMS;
        element.value = VALUE;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const applyButton = element.shadowRoot.querySelector(
                '.slds-dropdown lightning-button:last-of-type'
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
    it('reset event', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('reset', handler);

        element.items = ITEMS;
        element.value = VALUE;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const applyButton = element.shadowRoot.querySelector(
                '.slds-dropdown lightning-button:first-of-type'
            );
            applyButton.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();

            expect(element.value).toMatchObject([]);
        });
    });

    // close
    it('close event', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('close', handler);

        const button = element.shadowRoot.querySelector('button');
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
    it('search event', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('search', handler);

        element.items = ITEMS;
        element.showSearchBox = true;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    'lightning-input'
                );
                input.value = 'Searchable';
                input.dispatchEvent(new CustomEvent('change'));

                expect(handler).toHaveBeenCalled();
            })
            .then(() => {
                const items = element.shadowRoot.querySelectorAll(
                    'lightning-menu-item'
                );
                expect(items).toHaveLength(1);
                expect(items[0].value).toBe('item-3');
            });
    });

    // blur
    it('blur event (button blur)', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('blur', handler);

        const button = element.shadowRoot.querySelector('button');
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
    it('blur of an inside element', () => {
        const element = createElement('base-filter-menu', {
            is: FilterMenu
        });

        document.body.appendChild(element);

        element.items = ITEMS;
        const button = element.shadowRoot.querySelector('button');
        button.click();

        return Promise.resolve().then(() => {
            const item = element.shadowRoot.querySelector(
                'lightning-menu-item'
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
    it('privatebuttonregister event', () => {
        const element = createElement('base-filter-menu', {
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
