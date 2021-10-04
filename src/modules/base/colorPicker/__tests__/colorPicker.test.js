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
import ColorPicker from 'c/colorPicker';

// not tested
// change event because cannot select color in c-color-palette
// opacity and type custom because of issues with canvas

let element;
describe('Color Picker', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);
    });

    it('Color Picker Default attributes', () => {
        expect(element.accessKey).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.isLoading).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.readOnly).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.value).toBeUndefined();
        expect(element.variant).toBe('standard');
        expect(element.type).toBe('base');
        expect(element.menuVariant).toBe('border');
        expect(element.menuIconName).toBeUndefined();
        expect(element.menuIconSize).toBe('x-small');
        expect(element.menuLabel).toBeUndefined();
        expect(element.menuAlignment).toBe('left');
        expect(element.menuNubbin).toBeFalsy();
        expect(element.colors).toMatchObject([
            '#e3abec',
            '#c2dbf6',
            '#9fd6ff',
            '#9de7da',
            '#9df0bf',
            '#fff099',
            '#fed49a',
            '#d073df',
            '#86b9f3',
            '#5ebbff',
            '#44d8be',
            '#3be281',
            '#ffe654',
            '#ffb758',
            '#bd35bd',
            '#5778c1',
            '#5ebbff',
            '#00aea9',
            '#3bba4c',
            '#f4bc25',
            '#f99120',
            '#580d8c',
            '#001870',
            '#0a2399',
            '#097476',
            '#096a50',
            '#b67d11',
            '#b85d0d'
        ]);
        expect(element.hideColorInput).toBeFalsy();
        expect(element.opacity).toBeFalsy();
        expect(element.messageWhenBadInput).toBe(
            'Please ensure value is correct'
        );
    });

    /* ----- ATTRIBUTES ----- */

    // access key
    it('Color Picker access key', () => {
        element.accessKey = 'K';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.accessKey).toBe('K');
        });
    });

    // // disabled
    it('Color Picker disabled', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.disabled).toBeTruthy();
        });
    });

    // field level help
    it('Color Picker field level help', () => {
        element.fieldLevelHelp = 'This is a field level help text';

        return Promise.resolve().then(() => {
            const helpText = element.shadowRoot.querySelector(
                '[data-element-id="lightning-helptext"]'
            );
            expect(helpText.content).toBe('This is a field level help text');
        });
    });

    // isLoading
    it('Color Picker isLoading', () => {
        element.isLoading = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
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

    // label
    it('Color Picker label', () => {
        element.label = 'This is a label text';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="label"]'
            );
            expect(label.textContent).toBe('This is a label text');
        });
    });

    // name
    it('Color Picker name', () => {
        element.name = 'This is a name text';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );
            expect(input.name).toBe('This is a name text');
        });
    });

    // readOnly
    it('Color Picker readOnly', () => {
        element.readOnly = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );
            expect(input.disabled).toBeTruthy();
        });
    });

    // required
    it('Color Picker required', () => {
        element.required = true;

        return Promise.resolve().then(() => {
            const required = element.shadowRoot.querySelector('.slds-required');
            expect(required).toBeTruthy();
            expect(required.textContent).toBe('*');
        });
    });

    // value
    it('Color Picker value', () => {
        element.value = 'rgb(65, 159, 236)';

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );
                expect(input.value).toBe('rgb(65, 159, 236)');
            })
            .then(() => {
                const swatch = element.shadowRoot.querySelector(
                    '[data-element-id="span"]'
                );
                expect(swatch.style.background).toBe('rgb(65, 159, 236)');
            });
    });

    // variant
    it('Color Picker variant standard', () => {
        element.variant = 'standard';

        return Promise.resolve().then(() => {
            const labelHidden = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            const labelStacked = element.shadowRoot.querySelector(
                '.slds-form-element_stacked'
            );
            const labelInline = element.shadowRoot.querySelector(
                '.avonni-label-inline'
            );
            expect(labelInline).toBeFalsy();
            expect(labelStacked).toBeFalsy();
            expect(labelHidden).toBeFalsy();
        });
    });

    it('Color Picker variant label-stacked', () => {
        element.variant = 'label-stacked';

        return Promise.resolve().then(() => {
            const labelHidden = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            const labelStacked = element.shadowRoot.querySelector(
                '.slds-form-element_stacked'
            );
            const labelInline = element.shadowRoot.querySelector(
                '.avonni-label-inline'
            );
            expect(labelInline).toBeFalsy();
            expect(labelStacked).toBeTruthy();
            expect(labelHidden).toBeFalsy();
        });
    });

    it('Color Picker variant label-hidden', () => {
        element.variant = 'label-hidden';
        element.label = 'label-hidden';

        return Promise.resolve().then(() => {
            const labelHidden = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            const labelStacked = element.shadowRoot.querySelector(
                '.slds-form-element_stacked'
            );
            const labelInline = element.shadowRoot.querySelector(
                '.avonni-label-inline'
            );
            expect(labelInline).toBeFalsy();
            expect(labelStacked).toBeFalsy();
            expect(labelHidden).toBeTruthy();
            expect(labelHidden.textContent).toBe('label-hidden');
        });
    });

    it('Color Picker variant label-inline', () => {
        element.variant = 'label-inline';

        return Promise.resolve().then(() => {
            const labelHidden = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            const labelStacked = element.shadowRoot.querySelector(
                '.slds-form-element_stacked'
            );
            const labelInline = element.shadowRoot.querySelector(
                '.avonni-label-inline'
            );
            expect(labelInline).toBeTruthy();
            expect(labelStacked).toBeFalsy();
            expect(labelHidden).toBeFalsy();
        });
    });

    // type
    it('Color Picker type base', () => {
        element.type = 'base';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const palette = element.shadowRoot.querySelector(
                    '.slds-tabs_default'
                );
                expect(palette).toBeTruthy();
            });
    });

    it('Color Picker type predefined', () => {
        element.type = 'predefined';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const gradient = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-color-palette-custom"]'
                );
                expect(gradient).toBeTruthy();
            });
    });

    // Menu variant without menu icon name
    it('Color Picker menu variant bare', () => {
        element.menuVariant = 'bare';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toBe(
                'slds-button slds-button_icon slds-button_icon-more slds-button_icon-bare'
            );
        });
    });

    it('Color Picker menu variant container', () => {
        element.menuVariant = 'container';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toBe(
                'slds-button slds-button_icon slds-button_icon-container-more'
            );
        });
    });

    it('Color Picker menu variant border', () => {
        element.menuVariant = 'border';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toBe(
                'slds-button slds-button_icon slds-button_icon-more'
            );
        });
    });

    it('Color Picker menu variant border-filled', () => {
        element.menuVariant = 'border-filled';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toBe(
                'slds-button slds-button_icon slds-button_icon-more slds-button_icon-border-filled'
            );
        });
    });

    it('Color Picker menu variant bare-inverse', () => {
        element.menuVariant = 'bare-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toBe(
                'slds-button slds-button_icon slds-button_icon-bare slds-button_icon-container-more slds-button_icon-inverse'
            );
        });
    });

    it('Color Picker menu variant border-inverse', () => {
        element.menuVariant = 'border-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toBe(
                'slds-button slds-button_icon slds-button_icon-container-more slds-button_icon-border-inverse'
            );
        });
    });

    // Menu variant with menu icon name
    it('Color Picker menu variant bare without menu icon down', () => {
        element.menuIconName = 'utility:down';
        element.menuVariant = 'bare';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toBe('slds-button slds-button_icon-bare');
        });
    });

    it('Color Picker menu variant container without menu icon down', () => {
        element.menuIconName = 'utility:down';
        element.menuVariant = 'container';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toBe(
                'slds-button slds-button_icon-container'
            );
        });
    });

    it('Color Picker menu variant border without menu icon down', () => {
        element.menuIconName = 'utility:down';
        element.menuVariant = 'border';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toBe(
                'slds-button slds-button_icon-border'
            );
        });
    });

    it('Color Picker menu variant border-filled without menu icon down', () => {
        element.menuIconName = 'utility:down';
        element.menuVariant = 'border-filled';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toBe(
                'slds-button slds-button_icon-border-filled'
            );
        });
    });

    it('Color Picker menu variant bare-inverse without menu icon down', () => {
        element.menuIconName = 'utility:down';
        element.menuVariant = 'bare-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toBe(
                'slds-button slds-button_icon-bare slds-button_icon-inverse'
            );
        });
    });

    it('Color Picker menu variant border-inverse without menu icon down', () => {
        element.menuIconName = 'utility:down';
        element.menuVariant = 'border-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toBe(
                'slds-button slds-button_icon-border-inverse'
            );
        });
    });

    // Menu icon size without menu icon name
    it('Color Picker menu icon size xx-small', () => {
        element.menuIconSize = 'xx-small';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon-no-menu-icon-name"]'
            );
            expect(icon.size).toBe('xx-small');
        });
    });

    it('Color Picker menu icon size x-small', () => {
        element.menuIconSize = 'x-small';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon-no-menu-icon-name"]'
            );
            expect(icon.size).toBe('xx-small');
        });
    });

    it('Color Picker menu icon size medium', () => {
        element.menuIconSize = 'medium';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon-no-menu-icon-name"]'
            );
            expect(icon.size).toBe('xx-small');
        });
    });

    it('Color Picker menu icon size large', () => {
        element.menuIconSize = 'large';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon-no-menu-icon-name"]'
            );
            expect(icon.size).toBe('xx-small');
        });
    });

    // Menu icon size with menu icon name
    it('Color Picker menu icon size xx-small with menu icon name', () => {
        element.menuIconSize = 'xx-small';
        element.menuIconName = 'utility:down';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon-menu-icon-name"]'
            );
            expect(icon.size).toBe('xx-small');
        });
    });

    it('Color Picker menu icon size x-small with menu icon name', () => {
        element.menuIconSize = 'x-small';
        element.menuIconName = 'utility:down';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon-menu-icon-name"]'
            );
            expect(icon.size).toBe('x-small');
        });
    });

    it('Color Picker menu icon size medium with menu icon name', () => {
        element.menuIconSize = 'medium';
        element.menuIconName = 'utility:down';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon-menu-icon-name"]'
            );
            expect(icon.size).toBe('medium');
        });
    });

    it('Color Picker menu icon size large with menu icon name', () => {
        element.menuIconSize = 'large';
        element.menuIconName = 'utility:down';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="lightning-icon-menu-icon-name"]'
            );
            expect(icon.size).toBe('large');
        });
    });

    // Menu label
    it('Color Picker menu label border', () => {
        element.menuLabel = 'This is a menu label text';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.textContent).toBe('This is a menu label text');
            expect(button.className).toContain('slds-button');
        });
    });

    it('Color Picker menu label border-inverse', () => {
        element.menuLabel = 'This is a menu label text';
        element.menuVariant = 'border-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.textContent).toBe('This is a menu label text');
            expect(button.className).toContain('slds-button_inverse');
        });
    });

    // Menu alignement & menu nubbin
    it('Color Picker menu alignement left', () => {
        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain('slds-dropdown_left');
            });
    });

    it('Color Picker menu alignement left and menu nubbin', () => {
        element.menuNubbin = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain('slds-dropdown_left');
                expect(dropdown.className).toContain('slds-nubbin_top-left');
            });
    });

    it('Color Picker menu alignement right', () => {
        element.menuAlignment = 'right';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain('slds-dropdown_right');
            });
    });

    it('Color Picker menu alignement right and menu nubbin', () => {
        element.menuAlignment = 'right';
        element.menuNubbin = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain('slds-dropdown_right');
                expect(dropdown.className).toContain('slds-nubbin_top-right');
            });
    });

    it('Color Picker menu alignement center', () => {
        element.menuAlignment = 'center';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain('slds-dropdown_center');
            });
    });

    it('Color Picker menu alignement center and menu nubbin', () => {
        element.menuAlignment = 'center';
        element.menuNubbin = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain('slds-dropdown_center');
                expect(dropdown.className).toContain('slds-nubbin_top');
            });
    });

    it('Color Picker menu alignement bottom-center', () => {
        element.menuAlignment = 'bottom-center';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain('slds-dropdown_bottom');
            });
    });

    it('Color Picker menu alignement bottom-center and menu nubbin', () => {
        element.menuAlignment = 'bottom-center';
        element.menuNubbin = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain('slds-dropdown_bottom');
                expect(dropdown.className).toContain('slds-nubbin_bottom');
            });
    });

    it('Color Picker menu alignement bottom-left', () => {
        element.menuAlignment = 'bottom-left';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain(
                    'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left'
                );
            });
    });

    it('Color Picker menu alignement bottom-left and menu nubbin', () => {
        element.menuAlignment = 'bottom-left';
        element.menuNubbin = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain(
                    'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left'
                );
                expect(dropdown.className).toContain('slds-nubbin_bottom-left');
            });
    });

    it('Color Picker menu alignement bottom-right', () => {
        element.menuAlignment = 'bottom-right';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain(
                    'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right'
                );
            });
    });

    it('Color Picker menu alignement bottom-right and menu nubbin', () => {
        element.menuAlignment = 'bottom-right';
        element.menuNubbin = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '.slds-dropdown'
                );
                expect(dropdown.className).toContain(
                    'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right'
                );
                expect(dropdown.className).toContain(
                    'slds-nubbin_bottom-right'
                );
            });
    });

    // message when bad input
    it('Color Picker message when bad input value', () => {
        element.messageWhenBadInput = 2;

        return Promise.resolve().then(() => {
            expect(element.messageWhenBadInput).toBe(
                'Please ensure value is correct'
            );
        });
    });

    // colors
    it('Color Picker colors', () => {
        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const palette = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-color-palette-default"]'
                );
                expect(palette.colors).toMatchObject([
                    '#e3abec',
                    '#c2dbf6',
                    '#9fd6ff',
                    '#9de7da',
                    '#9df0bf',
                    '#fff099',
                    '#fed49a',
                    '#d073df',
                    '#86b9f3',
                    '#5ebbff',
                    '#44d8be',
                    '#3be281',
                    '#ffe654',
                    '#ffb758',
                    '#bd35bd',
                    '#5778c1',
                    '#5ebbff',
                    '#00aea9',
                    '#3bba4c',
                    '#f4bc25',
                    '#f99120',
                    '#580d8c',
                    '#001870',
                    '#0a2399',
                    '#097476',
                    '#096a50',
                    '#b67d11',
                    '#b85d0d'
                ]);
            });
    });

    // Hide color input
    it('Color Picker hide color input', () => {
        element.hideColorInput = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );
            expect(input).toBeFalsy();
        });
    });

    /* ----- JS ----- */

    // done button
    it('Color Picker done button ', () => {
        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const doneButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-done"]'
                );
                expect(doneButton).toBeTruthy();
                doneButton.click();
            });
    });

    // cancel button
    it('Color Picker cancel button ', () => {
        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const cancelButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-cancel"]'
                );
                expect(cancelButton).toBeTruthy();
                cancelButton.click();
            });
    });

    // focus and blur on tab
    it('Color Picker focus', () => {
        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const tab = element.shadowRoot.querySelector('li > a');
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover__body'
                );

                element.addEventListener('handleprivatefocus', (event) => {
                    expect(event.bubbles).toBeFalsy();
                    expect(event.cancelable).toBeFalsy();
                    expect(event.composed).toBeFalsy();
                });

                element.addEventListener('handleprivateblur', (event) => {
                    expect(event.bubbles).toBeFalsy();
                    expect(event.cancelable).toBeFalsy();
                    expect(event.composed).toBeFalsy();
                });

                tab.focus();
                tab.blur();
                popover.focus();
                popover.blur();
            });
    });

    // color picker clear
    it('Color picker clear', () => {
        element.value = '#ffffff';
        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    'lightning-input'
                );
                input.value = '#ffffff';
            })
            .then(() => {
                const clearButton = element.shadowRoot.querySelector(
                    '.avonni-builder-icon-picker-clear-icon'
                );
                clearButton.click();
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.hex).toBeUndefined();
                expect(handler.mock.calls[0][0].detail.hexa).toBeUndefined();
                expect(handler.mock.calls[0][0].detail.rgb).toBeUndefined();
                expect(handler.mock.calls[0][0].detail.rgba).toBeUndefined();
                expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
            });
    });

    /* ----- EVENTS ----- */

    // color picker change
    it('Color picker change event', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);
        const input = element.shadowRoot.querySelector(
            '[data-element-id="lightning-input"]'
        );
        input.value = '#ffffff';

        return Promise.resolve().then(() => {
            input.value = '#e3abec';
            input.dispatchEvent(new CustomEvent('change'));
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.hex).toBe('#e3abec');
            expect(handler.mock.calls[0][0].detail.hexa).toBe('#e3abecff');
            expect(handler.mock.calls[0][0].detail.rgb).toBe(
                'rgb(227,171,236)'
            );
            expect(handler.mock.calls[0][0].detail.rgba).toBe(
                'rgba(227,171,236,1)'
            );
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        });
    });

    // color picker focus event and method
    it('Color Picker focus event and method', () => {
        element.addEventListener('focus', (event) => {
            expect(event.bubbles).toBeFalsy();
            expect(event.cancelable).toBeFalsy();
            expect(event.composed).toBeFalsy();
        });

        element.focus();
    });

    // color picker blur event and method
    it('Color Picker blur event', () => {
        element.addEventListener('blur', (event) => {
            expect(event.bubbles).toBeFalsy();
            expect(event.cancelable).toBeFalsy();
            expect(event.composed).toBeFalsy();
        });

        element.focus();
        element.blur();
    });
});
