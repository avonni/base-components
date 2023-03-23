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
import ButtonMenu from '../buttonMenu';

// not tested
// tooltip
// selected event
// Keyboard navigation (focus)

let element;
describe('Button Menu', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-button-menu', {
            is: ButtonMenu
        });
        document.body.appendChild(element);
    });

    it('Button Menu: Default attributes', () => {
        expect(element.accessKey).toBeUndefined();
        expect(element.alternativeText).toBe('Show Menu');
        expect(element.disabled).toBeFalsy();
        expect(element.draftAlternativeText).toBeUndefined();
        expect(element.groupOrder).toBeUndefined();
        expect(element.hideDownArrow).toBeFalsy();
        expect(element.iconName).toBe('utility:down');
        expect(element.iconSize).toBe('medium');
        expect(element.isDraft).toBeFalsy();
        expect(element.isLoading).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.loadingStateAlternativeText).toBe('Loading');
        expect(element.menuAlignment).toBe('left');
        expect(element.nubbin).toBeFalsy();
        expect(element.title).toBeUndefined();
        expect(element.tooltip).toBeUndefined();
        expect(element.value).toBe('');
        expect(element.variant).toBe('border');
    });

    /* ----- ATTRIBUTES ----- */

    // access-key
    it('Button Menu: access-key', () => {
        element.accessKey = 'K';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.accessKey).toBe('K');
        });
    });

    // alternative text
    it('Button Menu: alternative text', () => {
        element.alternativeText = 'This is an alternative text';
        const assistiveText = element.shadowRoot.querySelector(
            '.slds-assistive-text'
        );

        return Promise.resolve().then(() => {
            expect(assistiveText.textContent).toBe(
                'This is an alternative text'
            );
        });
    });

    // disabled
    it('Button Menu: disabled', () => {
        element.disabled = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.disabled).toBeTruthy();
        });
    });

    // draft & draft alternative text
    it('Button Menu: draft alternative text', () => {
        element.isDraft = true;
        element.draftAlternativeText = 'This is a draft alternative text';

        return Promise.resolve().then(() => {
            const draft = element.shadowRoot.querySelector(
                '.slds-indicator_unsaved'
            );
            expect(draft.title).toBe('This is a draft alternative text');
            expect(draft.textContent).toBe('*');
        });
    });

    // hide down arrow
    it('Button menu: down arrow hidden', () => {
        element.iconName = 'utility:threedots';
        element.hideDownArrow = true;

        return Promise.resolve().then(() => {
            const downArrow = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-down"]'
            );
            expect(downArrow).toBeFalsy();
        });
    });

    it('Button menu: down arrow not hidden', () => {
        element.iconName = 'utility:threedots';

        return Promise.resolve().then(() => {
            const downArrow = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-down"]'
            );
            expect(downArrow).toBeTruthy();
        });
    });

    // icon name
    it('Button Menu: icon name', () => {
        element.iconName = 'utility:close';
        const icon = element.shadowRoot.querySelector(
            '[data-element-id="avonni-primitive-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(icon.iconName).toBe('utility:close');
        });
    });

    // icon size
    it('Button Menu: icon size xx-small', () => {
        element.iconSize = 'xx-small';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.className).toContain('slds-button_icon-xx-small');
        });
    });

    it('Button Menu: icon size x-small', () => {
        element.iconSize = 'x-small';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.className).toContain('slds-button_icon-x-small');
        });
    });

    it('Button Menu: icon size small', () => {
        element.iconSize = 'small';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.className).toContain('slds-button_icon-small');
        });
    });

    it('Button Menu: icon size medium', () => {
        element.iconSize = 'medium';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.className).not.toContain('slds-button_icon-xx-small');
            expect(button.className).not.toContain('slds-button_icon-x-small');
            expect(button.className).not.toContain('slds-button_icon-small');
        });
    });

    it('Button Menu: icon size medium with added variant', () => {
        element.iconSize = 'medium';
        element.variant = 'success';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.className).not.toContain('slds-button_icon-xx-small');
            expect(button.className).not.toContain('slds-button_icon-x-small');
            expect(button.className).not.toContain('slds-button_icon-small');
            expect(button.className).toContain(
                'avonni-button-menu__button-icon_medium'
            );
        });
    });

    // is loading & loading state alternative text
    it('Button Menu: is loading & loading state alternative text', () => {
        element.isLoading = true;
        element.loadingStateAlternativeText =
            'This is a loading state alternative text';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );

        return Promise.resolve()
            .then(() => {
                button.click();
            })
            .then(() => {
                const spinner = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-spinner"]'
                );
                expect(spinner).toBeTruthy();
                expect(spinner.alternativeText).toBe(
                    'This is a loading state alternative text'
                );
            });
    });

    // label
    it('Button Menu: label', () => {
        element.label = 'This is a label';

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.textContent).toContain('This is a label');
            expect(button.className).toContain(
                'avonni-button-menu__button_label'
            );
        });
    });

    // Menu alignment & menu nubbin
    it('Button menu: menu alignment left', () => {
        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown =
                    element.shadowRoot.querySelector('.slds-dropdown');
                expect(dropdown.className).toContain('slds-dropdown_left');
            });
    });

    it('Button menu: menu alignment left and menu nubbin', () => {
        element.nubbin = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown =
                    element.shadowRoot.querySelector('.slds-dropdown');
                expect(dropdown.className).toContain('slds-dropdown_left');
                expect(dropdown.className).toContain('slds-nubbin_top-left');
            });
    });

    it('Button menu: menu alignment right', () => {
        element.menuAlignment = 'right';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown =
                    element.shadowRoot.querySelector('.slds-dropdown');
                expect(dropdown.className).toContain('slds-dropdown_right');
            });
    });

    it('Button menu: menu alignment right and menu nubbin', () => {
        element.menuAlignment = 'right';
        element.nubbin = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown =
                    element.shadowRoot.querySelector('.slds-dropdown');
                expect(dropdown.className).toContain('slds-dropdown_right');
                expect(dropdown.className).toContain('slds-nubbin_top-right');
            });
    });

    it('Button menu: menu alignment center', () => {
        element.menuAlignment = 'center';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown =
                    element.shadowRoot.querySelector('.slds-dropdown');
                expect(dropdown.className).toContain('slds-dropdown_center');
            });
    });

    it('Button menu: menu alignment center and menu nubbin', () => {
        element.menuAlignment = 'center';
        element.nubbin = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown =
                    element.shadowRoot.querySelector('.slds-dropdown');
                expect(dropdown.className).toContain('slds-dropdown_center');
                expect(dropdown.className).toContain('slds-nubbin_top');
            });
    });

    it('Button menu: menu alignment bottom-center', () => {
        element.menuAlignment = 'bottom-center';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown =
                    element.shadowRoot.querySelector('.slds-dropdown');
                expect(dropdown.className).toContain('slds-dropdown_bottom');
            });
    });

    it('Button menu: menu alignment bottom-center and menu nubbin', () => {
        element.menuAlignment = 'bottom-center';
        element.nubbin = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown =
                    element.shadowRoot.querySelector('.slds-dropdown');
                expect(dropdown.className).toContain('slds-dropdown_bottom');
                expect(dropdown.className).toContain('slds-nubbin_bottom');
            });
    });

    it('Button menu: menu alignment bottom-left', () => {
        element.menuAlignment = 'bottom-left';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown =
                    element.shadowRoot.querySelector('.slds-dropdown');
                expect(dropdown.className).toContain(
                    'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left'
                );
            });
    });

    it('Button menu: menu alignment bottom-left and menu nubbin', () => {
        element.menuAlignment = 'bottom-left';
        element.nubbin = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown =
                    element.shadowRoot.querySelector('.slds-dropdown');
                expect(dropdown.className).toContain(
                    'slds-dropdown_bottom slds-dropdown_left slds-dropdown_bottom-left'
                );
                expect(dropdown.className).toContain('slds-nubbin_bottom-left');
            });
    });

    it('Button menu: menu alignment bottom-right', () => {
        element.menuAlignment = 'bottom-right';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown =
                    element.shadowRoot.querySelector('.slds-dropdown');
                expect(dropdown.className).toContain(
                    'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right'
                );
            });
    });

    it('Button menu: menu alignment bottom-right and menu nubbin', () => {
        element.menuAlignment = 'bottom-right';
        element.nubbin = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();
            })
            .then(() => {
                const dropdown =
                    element.shadowRoot.querySelector('.slds-dropdown');
                expect(dropdown.className).toContain(
                    'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right'
                );
                expect(dropdown.className).toContain(
                    'slds-nubbin_bottom-right'
                );
            });
    });

    // title
    it('Button Menu: title', () => {
        element.title = 'This is a title';

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.title).toBe('This is a title');
        });
    });

    // value
    it('Button Menu: value', () => {
        element.value = 'This is a value';

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );

        return Promise.resolve().then(() => {
            expect(button.value).toBe('This is a value');
        });
    });

    // variant
    it('Button menu: no variant without label', () => {
        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain('slds-button_icon-border');
            expect(button.className).toContain(
                'avonni-button-menu__button_border'
            );
        });
    });

    it('Button menu: no variant with label', () => {
        element.variant = undefined;
        element.label = 'Button menu';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain('slds-button_neutral');
            expect(button.className).toContain(
                'avonni-button-menu__button_neutral'
            );
        });
    });

    it('Button menu: variant bare without label', () => {
        element.variant = 'bare';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain('slds-button_icon-bare');
            expect(button.className).toContain(
                'avonni-button-menu__button_bare'
            );
        });
    });

    it('Button menu: variant bare with label', () => {
        element.variant = 'bare';
        element.label = 'Button menu';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).not.toContain('slds-button_icon-bare');
            expect(button.className).toContain(
                'avonni-button-menu__button_bare'
            );
        });
    });

    it('Button menu: variant bare-inverse without label', () => {
        element.variant = 'bare-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain('slds-button_icon-inverse');
            expect(button.className).toContain(
                'avonni-button-menu__button_bare-inverse'
            );
        });
    });

    it('Button menu: variant bare-inverse with label', () => {
        element.variant = 'bare-inverse';
        element.label = 'Button menu';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).not.toContain('slds-button_icon-inverse');
            expect(button.className).toContain(
                'avonni-button-menu__button_bare-inverse'
            );
        });
    });

    it('Button menu: variant border without label', () => {
        element.variant = 'border';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain('slds-button_icon-border');
            expect(button.className).toContain(
                'avonni-button-menu__button_border'
            );
        });
    });

    it('Button menu: variant border with label', () => {
        element.variant = 'border';
        element.label = 'label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain('slds-button_neutral');
        });
    });

    it('Button menu: variant border-filled without label', () => {
        element.variant = 'border-filled';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain(
                'slds-button_icon-border-filled'
            );
            expect(button.className).toContain(
                'avonni-button-menu__button_border-filled'
            );
        });
    });

    it('Button menu: variant border-filled with label', () => {
        element.variant = 'border-filled';
        element.label = 'Button menu';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).not.toContain(
                'slds-button_icon-border-filled'
            );
            expect(button.className).toContain(
                'avonni-button-menu__button_border-filled'
            );
        });
    });

    it('Button menu: variant border-inverse without label', () => {
        element.variant = 'border-inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain(
                'slds-button_icon-border-inverse'
            );
            expect(button.className).toContain(
                'avonni-button-menu__button_border-inverse'
            );
        });
    });

    it('Button menu: variant border-inverse with label', () => {
        element.variant = 'border-inverse';
        element.label = 'label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain('slds-button_inverse');
            expect(button.className).toContain(
                'avonni-button-menu__button_border-inverse'
            );
        });
    });

    it('Button menu: variant brand without label', () => {
        element.variant = 'brand';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain('slds-button_icon-brand');
            expect(button.className).toContain(
                'avonni-button-menu__button_brand'
            );
        });
    });

    it('Button menu: variant brand with label', () => {
        element.variant = 'brand';
        element.label = 'label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain('slds-button_brand');
            expect(button.className).toContain(
                'avonni-button-menu__button_brand'
            );
            expect(button.textContent).toContain('label');
        });
    });

    it('Button menu: variant brand-outline without label', () => {
        element.variant = 'brand-outline';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );

            expect(button.className).toContain(
                'avonni-button-menu__button_brand-outline'
            );
        });
    });

    it('Button menu: variant brand-outline with label', () => {
        element.variant = 'brand-outline';
        element.label = 'label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain('slds-button_outline-brand');
            expect(button.className).toContain(
                'avonni-button-menu__button_brand-outline'
            );
            expect(button.textContent).toContain('label');
        });
    });

    it('Button menu: variant container without label', () => {
        element.variant = 'container';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain('slds-button_icon-container');
            expect(button.className).toContain(
                'avonni-button-menu__button_container'
            );
        });
    });

    it('Button menu: variant container with label', () => {
        element.variant = 'container';
        element.label = 'Button menu';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain(
                'avonni-button-menu__button_container'
            );
        });
    });

    it('Button menu: variant destructive without label', () => {
        element.variant = 'destructive';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );

            expect(button.className).toContain(
                'avonni-button-menu__button_destructive'
            );
        });
    });

    it('Button menu: variant destructive with label', () => {
        element.variant = 'destructive';
        element.label = 'Button menu';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain('slds-button_destructive');
            expect(button.className).toContain(
                'avonni-button-menu__button_destructive'
            );
        });
    });

    it('Button menu: variant destructive-text without label', () => {
        element.variant = 'destructive-text';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain(
                'avonni-button-menu__button_destructive-text'
            );
        });
    });

    it('Button menu: variant destructive-text with label', () => {
        element.variant = 'destructive-text';
        element.label = 'Button menu';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain('slds-button_text-destructive');
            expect(button.className).toContain(
                'avonni-button-menu__button_destructive-text'
            );
        });
    });

    it('Button menu: variant inverse without label', () => {
        element.variant = 'inverse';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );

            expect(button.className).toContain(
                'avonni-button-menu__button_inverse'
            );
        });
    });

    it('Button menu: variant inverse with label', () => {
        element.variant = 'inverse';
        element.label = 'Button menu';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain('slds-button_inverse');
            expect(button.className).toContain(
                'avonni-button-menu__button_inverse'
            );
        });
    });

    it('Button menu: variant neutral without label', () => {
        element.variant = 'neutral';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );

            expect(button.className).toContain(
                'avonni-button-menu__button_neutral'
            );
        });
    });

    it('Button menu: variant neutral with label', () => {
        element.variant = 'neutral';
        element.label = 'Button menu';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain('slds-button_neutral');
            expect(button.className).toContain(
                'avonni-button-menu__button_neutral'
            );
        });
    });

    it('Button menu: variant success without label', () => {
        element.variant = 'success';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );

            expect(button.className).toContain(
                'avonni-button-menu__button_success'
            );
        });
    });

    it('Button menu: variant success with label', () => {
        element.variant = 'success';
        element.label = 'Button menu';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain('slds-button_success');
            expect(button.className).toContain(
                'avonni-button-menu__button_success'
            );
        });
    });

    it('Button menu: variant border-inverse with icon name', () => {
        element.variant = 'border-inverse';
        element.iconName = 'utility:close';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain(
                'avonni-button-menu__button-icon-container-more'
            );
        });
    });

    it('Button menu: variant bare with icon name', () => {
        element.variant = 'bare';
        element.iconName = 'utility:close';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.className).toContain('slds-button_icon-bare');
            expect(button.className).toContain(
                'avonni-button-menu__button-icon-more'
            );
        });
    });

    /* ---- JS ----- */
    it('Button menu: method blur', () => {
        let blurEvent = false;
        element.addEventListener('blur', () => {
            blurEvent = true;
        });

        element.focus();
        element.blur();
        return Promise.resolve().then(() => {
            expect(blurEvent).toBeTruthy();
        });
    });

    /* ---- METHODS ----- */
    it('Button menu: method click', () => {
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

    it('Button menu: method focus', () => {
        let focusEvent = false;
        element.addEventListener('focus', () => {
            focusEvent = true;
        });

        element.focus();
        return Promise.resolve().then(() => {
            expect(focusEvent).toBeTruthy();
        });
    });

    /* ----- EVENTS ----- */

    // Button menu close
    it('Button menu: event close', () => {
        const handler = jest.fn();
        element.addEventListener('close', handler);
        element.click();
        element.blur();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });

    // Button menu open
    it('Button menu: event open', () => {
        const handler = jest.fn();
        element.addEventListener('open', handler);
        element.click();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });

    it('Button menu: event open triggered by keyboard', () => {
        const handler = jest.fn();
        element.addEventListener('open', handler);

        const button = element.shadowRoot.querySelector(
            '[data-element-id="button"]'
        );
        const event = new CustomEvent('keydown');
        event.key = 'Enter';
        button.dispatchEvent(event);

        expect(handler).toHaveBeenCalled();
    });
});
