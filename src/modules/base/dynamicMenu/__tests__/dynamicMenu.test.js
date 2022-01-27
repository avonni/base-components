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
import DynamicMenu from 'c/dynamicMenu';

const items = [
    {
        label: 'Acme',
        meta: ['Account', 'San Francisco'],
        value: 'acme',
        avatar: {
            fallbackIconName: 'standard:account',
            alternativeText: 'Account'
        }
    },
    {
        label: 'Remo',
        meta: ['Contact', 'San Francisco'],
        value: 'remo',
        avatar: {
            fallbackIconName: 'standard:contact',
            alternativeText: 'Contact'
        }
    },
    {
        label: 'Niko',
        meta: ['Lead', 'San Francisco'],
        value: 'niko',
        avatar: {
            fallbackIconName: 'standard:lead',
            alternativeText: 'Lead'
        }
    }
];

let element;
describe('Dynamic Menu', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-dynamic-menu', {
            is: DynamicMenu
        });
        document.body.appendChild(element);
    });

    it('Dynamic Menu: Default attributes', () => {
        expect(element.buttonSize).toBe('auto');
        expect(element.label).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.iconSize).toBe('medium');
        expect(element.items).toMatchObject([]);
        expect(element.alternativeText).toBeUndefined();
        expect(element.menuAlignment).toBe('left');
        expect(element.disabled).toBeFalsy();
        expect(element.isLoading).toBeFalsy();
        expect(element.loadingStateAlternativeText).toBeUndefined();
        expect(element.withSearch).toBeFalsy();
        expect(element.searchInputPlaceholder).toBe('Search…');
        expect(element.title).toBeUndefined();
        expect(element.variant).toBe('border');
        expect(element.value).toBeUndefined();
        expect(element.accessKey).toBeUndefined();
        expect(element.tooltip).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // accesskey
    it('Dynamic Menu: accesskey without label', () => {
        element.accessKey = 'K';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(button.accessKey).toBe('K');
        });
    });

    it('Dynamic Menu: accesskey with label', () => {
        element.label = 'label';
        element.accessKey = 'K';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.accessKey).toBe('K');
        });
    });

    // alternative text
    it('Dynamic Menu: alternative text', () => {
        element.alternativeText = 'This is an alternative text';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(button.alternativeText).toBe('This is an alternative text');
        });
    });

    // button-size
    // Depends on label
    it('Dynamic Menu: buttonSize = auto', () => {
        element.label = 'Some label';
        element.buttonSize = 'auto';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList).not.toContain('slds-button_stretch');
            expect(element.classList).not.toContain('slds-button_stretch');
        });
    });

    it('Dynamic Menu: buttonSize = stretch', () => {
        element.label = 'Some label';
        element.buttonSize = 'stretch';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList).toContain('slds-button_stretch');
            expect(element.classList).toContain('slds-button_stretch');
        });
    });

    // disabled
    it('Dynamic Menu: disabled without label', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(button.disabled).toBeTruthy();
        });
    });

    it('Dynamic Menu: disabled with label', () => {
        element.label = 'label';
        element.disabled = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.disabled).toBeTruthy();
        });
    });

    // icon name
    it('Dynamic Menu: icon name without label', () => {
        element.iconName = 'utility:close';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(button.iconName).toBe('utility:close');
        });
    });

    it('Dynamic Menu: icon name with label', () => {
        element.label = 'Label';
        element.iconName = 'utility:close';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon"]'
            );
            expect(icon).toBeTruthy();
            expect(icon.iconName).toBe('utility:close');
        });
    });

    //icon position
    // depends on label
    it('Dynamic Menu: icon position left', () => {
        element.iconName = 'utility:add';
        element.label = 'label';
        element.iconPosition = 'left';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon"]'
            );
            expect(icon).toBeTruthy();
            expect(icon.svgClass).toContain('slds-button__icon_left');
        });
    });

    it('Dynamic Menu: icon position right', () => {
        element.iconName = 'utility:add';
        element.label = 'label';
        element.iconPosition = 'right';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon"]'
            );
            expect(icon).toBeTruthy();
            expect(icon.svgClass).toContain('slds-button__icon_right');
        });
    });

    //icon size
    it('Dynamic Menu: icon size without label', () => {
        element.iconName = 'utility:add';
        element.iconSize = 'medium';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(button.iconName).toBe('utility:add');
            expect(button.size).toBe('medium');
        });
    });

    // is loading
    it('Dynamic Menu: is loading', () => {
        element.isLoading = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon"]'
                );
                button.click();
            })
            .then(() => {
                const spinner = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-spinner"]'
                );
                expect(spinner).toBeTruthy();
            });
    });

    // items
    it('Dynamic Menu: items', () => {
        element.items = items;

        return Promise.resolve().then(() => {
            items.forEach((item, index) => {
                const correspondingItem = items[index];
                expect(correspondingItem).toBeTruthy();
                expect(item.label).toBe(correspondingItem.label);
                expect(item.value).toBe(correspondingItem.value);
                expect(item.meta).toBe(correspondingItem.meta);
                expect(item.id).toBe(correspondingItem.id);
                expect(item.avatar).toBe(correspondingItem.avatar);
            });
        });
    });

    // label
    it('Dynamic Menu: label', () => {
        element.label = 'This is a label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button).toBeTruthy();
            expect(button.textContent).toBe('This is a label');
        });
    });

    // loading state alternative text
    it('Dynamic Menu: loading state alternative text', () => {
        element.isLoading = true;
        element.loadingStateAlternativeText = 'This is a loading text';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon"]'
                );
                button.click();
            })
            .then(() => {
                const spinner = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-spinner"]'
                );
                expect(spinner.alternativeText).toBe('This is a loading text');
            });
    });

    // menu alignment
    it('Dynamic Menu: menu alignment left', () => {
        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown =
                    element.shadowRoot.querySelector('.slds-dropdown ');
                expect(dropdown.className).toBe(
                    'slds-dropdown slds-popover slds-dynamic-menu slds-dropdown_left slds-nubbin_top-left'
                );
            });
    });

    it('Dynamic Menu: menu alignment right', () => {
        element.menuAlignment = 'right';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown =
                    element.shadowRoot.querySelector('.slds-dropdown ');
                expect(dropdown.className).toBe(
                    'slds-dropdown slds-popover slds-dynamic-menu slds-dropdown_right slds-nubbin_top-right'
                );
            });
    });

    it('Dynamic Menu: menu alignment center', () => {
        element.menuAlignment = 'center';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown =
                    element.shadowRoot.querySelector('.slds-dropdown ');
                expect(dropdown.className).toBe(
                    'slds-dropdown slds-popover slds-dynamic-menu slds-dropdown_center slds-nubbin_top'
                );
            });
    });

    it('Dynamic Menu: menu alignment bottom-left', () => {
        element.menuAlignment = 'bottom-left';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown =
                    element.shadowRoot.querySelector('.slds-dropdown ');
                expect(dropdown.className).toBe(
                    'slds-dropdown slds-popover slds-dynamic-menu slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left slds-nubbin_bottom-left'
                );
            });
    });

    it('Dynamic Menu: menu alignment bottom-right', () => {
        element.menuAlignment = 'bottom-right';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown =
                    element.shadowRoot.querySelector('.slds-dropdown ');
                expect(dropdown.className).toBe(
                    'slds-dropdown slds-popover slds-dynamic-menu slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right slds-nubbin_bottom-right'
                );
            });
    });

    it('Dynamic Menu: menu alignment bottom-center', () => {
        element.menuAlignment = 'bottom-center';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown =
                    element.shadowRoot.querySelector('.slds-dropdown ');
                expect(dropdown.className).toBe(
                    'slds-dropdown slds-popover slds-dynamic-menu slds-dropdown_bottom slds-nubbin_bottom'
                );
            });
    });

    // search input placeholder
    it('Dynamic Menu: search input placeholder', () => {
        element.withSearch = true;
        element.searchInputPlaceholder = 'This is a search input placeholder';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon"]'
                );
                button.click();
            })
            .then(() => {
                const searchInput = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );
                expect(searchInput).toBeTruthy();
                expect(searchInput.placeholder).toBe(
                    'This is a search input placeholder'
                );
            });
    });

    // title
    it('Dynamic Menu: title without label', () => {
        element.title = 'This is a title text';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(button.title).toBe('This is a title text');
        });
    });

    it('Dynamic Menu: title with label', () => {
        element.label = 'label';
        element.title = 'This is a title text';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.title).toBe('This is a title text');
        });
    });

    // tooltip
    it('Dynamic Menu: tooltip without label', () => {
        element.tooltip = 'This is a tooltip text';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(button.tooltip).toBe('This is a tooltip text');
        });
    });

    // value
    it('Dynamic Menu: value without label', () => {
        element.value = '1';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(button.value).toBe('1');
        });
    });

    it('Dynamic Menu: value with label', () => {
        element.label = 'label';
        element.value = '1';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.value).toBe('1');
        });
    });

    // variant
    it('Dynamic Menu: variant bare without label', () => {
        element.variant = 'bare';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(button.variant).toBe('bare');
        });
    });

    it('Dynamic Menu: variant container without label', () => {
        element.variant = 'container';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(button.variant).toBe('container');
        });
    });

    it('Dynamic Menu: variant brand without label', () => {
        element.variant = 'brand';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(button.variant).toBe('brand');
        });
    });

    it('Dynamic Menu: variant brand with label', () => {
        element.variant = 'brand';
        element.label = 'Some label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList).toContain('slds-button_brand');
        });
    });

    it('Dynamic Menu: variant border-filled without label', () => {
        element.variant = 'border-filled';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(button.variant).toBe('border-filled');
        });
    });

    it('Dynamic Menu: variant bare-inverse without label', () => {
        element.variant = 'bare-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(button.variant).toBe('bare-inverse');
        });
    });

    it('Dynamic Menu: variant border-inverse without label', () => {
        element.variant = 'border-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(button.variant).toBe('border-inverse');
        });
    });

    // with search
    it('Dynamic Menu: with search', () => {
        element.withSearch = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon"]'
                );
                button.click();
            })
            .then(() => {
                const searchInput = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );
                expect(searchInput).toBeTruthy();
                expect(searchInput.type).toBe('search');
            });
    });

    /* ---- JS ----- */
    // blur
    it('Dynamic Menu: blur without label', () => {
        const button = element.shadowRoot.querySelector(
            'lightning-button-icon'
        );
        button.click();
        return Promise.resolve().then(() => {
            button.dispatchEvent(new CustomEvent('blur'));
            expect(element.classList).not.toContain('slds-is-open');
        });
    });

    /* ---- EVENTS ----- */

    it('Dynamic Menu: event: click on item', () => {
        element.items = items;

        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon"]'
        );

        const handler = jest.fn();
        element.addEventListener('select', handler);

        return Promise.resolve()
            .then(() => {
                button.click();
            })
            .then(() => {
                const dropdown =
                    element.shadowRoot.querySelector('.slds-dropdown');
                expect(dropdown).toBeTruthy();
                const item = element.shadowRoot.querySelector(
                    '.slds-listbox__item'
                );
                item.click();
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.item).toMatchObject({
                    label: 'Acme',
                    meta: ['Account', 'San Francisco'],
                    value: 'acme',
                    avatar: {
                        fallbackIconName: 'standard:account',
                        alternativeText: 'Account'
                    }
                });
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
    });

    it('Dynamic Menu: event: privatebuttonregister', () => {
        const handler = jest.fn();
        element.addEventListener('privatebuttonregister', handler);
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].canceled).toBeFalsy();
            expect(
                handler.mock.calls[0][0].detail.callbacks.setOrder
            ).toBeInstanceOf(Function);
            expect(
                handler.mock.calls[0][0].detail.callbacks
                    .setDeRegistrationCallback
            ).toBeInstanceOf(Function);
        });
    });

    it('Dynamic Menu: event: open', () => {
        const handler = jest.fn();
        element.addEventListener('open', handler);
        element.click();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });

    /* ---- METHODS ----- */
    it('Dynamic Menu: method: click with label', () => {
        let clickEvent = false;
        element.addEventListener('click', () => {
            clickEvent = true;
        });

        element.click();
        return Promise.resolve()
            .then(() => {
                element.label = 'label';
            })
            .then(() => {
                expect(clickEvent).toBeTruthy();
            });
    });

    it('Dynamic Menu: method: click without label', () => {
        let clickEvent = false;
        element.addEventListener('click', () => {
            clickEvent = true;
        });

        element.click();
        return Promise.resolve().then(() => {
            expect(clickEvent).toBeTruthy();
            expect(element.classList).toContain('slds-is-open');
        });
    });

    it('Dynamic Menu: method: focus without label', () => {
        let focusEvent = false;

        element.addEventListener('focus', () => {
            focusEvent = true;
        });

        element.focus();

        return Promise.resolve().then(() => {
            expect(focusEvent).toBeTruthy();
        });
    });

    it('Dynamic Menu: method: focus with label', () => {
        let focusEvent = false;

        element.addEventListener('focus', () => {
            focusEvent = true;
        });

        element.focus();

        return Promise.resolve()
            .then(() => {
                element.label = 'label';
            })
            .then(() => {
                expect(focusEvent).toBeTruthy();
            });
    });
});
