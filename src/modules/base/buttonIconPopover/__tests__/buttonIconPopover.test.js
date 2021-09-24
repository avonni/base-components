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
import ButtonIconPopover from 'c/buttonIconPopover';

// not tested
// triggers : hover

describe('Button Icon Popover', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });

        expect(element.accessKey).toBeUndefined();
        expect(element.alternativeText).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.variant).toBe('border');
        expect(element.size).toBe('medium');
        expect(element.tooltip).toBeUndefined();
        expect(element.hideCloseButton).toBeFalsy();
        expect(element.iconClass).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.title).toBeUndefined();
        expect(element.popoverSize).toBe('medium');
        expect(element.placement).toBe('left');
        expect(element.isLoading).toBeFalsy();
        expect(element.loadingStateAlternativeText).toBe('Loading');
        expect(element.triggers).toBe('click');
        expect(element.popoverVariant).toBe('base');
    });

    /* ----- ATTRIBUTES ----- */

    // access-key
    it('Button Icon Popover access-key', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.accessKey = 'K';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.accessKey).toBe('K');
        });
    });

    // alternative-text
    it('Button Icon Popover alternative-text', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.alternativeText = 'This is an alternative text';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.alternativeText).toBe('This is an alternative text');
        });
    });

    // disabled
    it('Button Icon Popover disabled', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.disabled = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.disabled).toBeTruthy();
        });
    });

    // variant
    it('Button Icon Popover variant border', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.variant = 'border';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('border');
        });
    });

    it('Button Icon Popover variant bare', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.variant = 'bare';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('bare');
        });
    });

    it('Button Icon Popover variant container', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.variant = 'container';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('container');
        });
    });

    it('Button Icon Popover variant brand', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.variant = 'brand';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('brand');
        });
    });

    it('Button Icon Popover variant border-filled', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.variant = 'border-filled';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('border-filled');
        });
    });

    it('Button Icon Popover variant bare-inverse', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.variant = 'bare-inverse';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('bare-inverse');
        });
    });

    it('Button Icon Popover variant border-inverse', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.variant = 'border-inverse';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('border-inverse');
        });
    });

    // size
    it('Button Icon Popover size xx-small', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.size = 'xx-small';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('xx-small');
        });
    });

    it('Button Icon Popover size x-small', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.size = 'x-small';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('x-small');
        });
    });

    it('Button Icon Popover size small', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.size = 'small';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('small');
        });
    });

    it('Button Icon Popover size medium', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.size = 'medium';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('medium');
        });
    });

    it('Button Icon Popover size large for non bare', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.size = 'large';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('medium');
        });
    });

    it('Button Icon Popover size large for bare', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.variant = 'bare';
        element.size = 'large';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('large');
        });
    });

    // tooltip
    it('Button Icon Popover tooltip', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.tooltip = 'This is a tooltip';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.tooltip).toBe('This is a tooltip');
        });
    });

    // hide close button
    it('Button Icon Popover hide close button', () => {
        const element = createElement('base-button-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        const closeButton = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-close"]'
        );

        return Promise.resolve().then(() => {
            expect(closeButton.iconName).toBe('utility:close');
        });
    });

    it('Button Icon Popover hide close button true', () => {
        const element = createElement('base-button-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.hideCloseButton = true;

        return Promise.resolve().then(() => {
            const closeButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-close"]'
            );
            expect(closeButton).toBeFalsy();
        });
    });

    // icon class
    it('Button Icon Popover icon class', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.iconClass = 'button-dialog-icon-class';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.iconClass).toBe('button-dialog-icon-class');
        });
    });

    // icon name
    it('Button Icon Popover icon name', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.iconName = 'utility:lock';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.iconName).toBe('utility:lock');
        });
    });

    // title
    it('Button Icon Popover title', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.title = 'This is a popover Title';
        element.triggers = 'focus';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const header = element.shadowRoot.querySelector(
                    '.slds-text-heading_small'
                );
                expect(header.textContent).toBe('This is a popover Title');
            });
    });

    // popover size
    it('Button Icon Popover popoverSize small', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.popoverSize = 'small';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover.className).toContain('slds-popover_small');
            });
    });

    it('Button Icon Popover popoverSize medium', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.popoverSize = 'medium';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover.className).toContain('slds-popover_medium');
            });
    });

    it('Button Icon Popover popoverSize large', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.popoverSize = 'large';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover.className).toContain('slds-popover_large');
            });
    });

    // popover variant
    it('Button Icon Popover variant base', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover.className).not.toContain('slds-popover_warning');
                expect(popover.className).not.toContain('slds-popover_error');
                expect(popover.className).not.toContain(
                    'slds-popover_walkthrough'
                );
            });
    });

    it('Button Icon Popover variant warning', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.popoverVariant = 'warning';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover.className).toContain('slds-popover_warning');
                expect(popover.className).not.toContain('slds-popover_error');
                expect(popover.className).not.toContain(
                    'slds-popover_walkthrough'
                );
            });
    });

    it('Button Icon Popover variant error', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.popoverVariant = 'error';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover.className).not.toContain('slds-popover_warning');
                expect(popover.className).toContain('slds-popover_error');
                expect(popover.className).not.toContain(
                    'slds-popover_walkthrough'
                );
            });
    });

    it('Button Icon Popover variant walkthrough', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.popoverVariant = 'walkthrough';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover.className).not.toContain('slds-popover_warning');
                expect(popover.className).not.toContain('slds-popover_error');
                expect(popover.className).toContain('slds-popover_walkthrough');
            });
    });

    // placement
    it('Button Icon Popover placement left', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.placement = 'left';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover.className).toContain('slds-nubbin_top-left');
                expect(popover.className).toContain('slds-dropdown_left');
            });
    });

    it('Button Icon Popover placement auto', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.placement = 'auto';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover.className).toContain('slds-dropdown_left');
            });
    });

    it('Button Icon Popover placement center', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.placement = 'center';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover.className).toContain('slds-nubbin_top');
                expect(popover.className).toContain('slds-dropdown_center');
            });
    });

    it('Button Icon Popover placement right', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.placement = 'right';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover.className).toContain('slds-nubbin_top-right');
                expect(popover.className).toContain('slds-dropdown_right');
            });
    });

    it('Button Icon Popover placement bottom-left', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.placement = 'bottom-left';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover.className).toContain('slds-nubbin_bottom-left');
                expect(popover.className).toContain('slds-dropdown_bottom');
                expect(popover.className).toContain('slds-dropdown_left');
                expect(popover.className).toContain(
                    'slds-dropdown_bottom-left'
                );
            });
    });

    it('Button Icon Popover placement bottom-right', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.placement = 'bottom-right';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover.className).toContain('slds-nubbin_bottom-right');
                expect(popover.className).toContain(
                    'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right'
                );
            });
    });

    it('Button Icon Popover placement bottom-center', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.placement = 'bottom-center';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover.className).toContain('slds-nubbin_bottom');
                expect(popover.className).toContain('slds-dropdown_bottom');
            });
    });

    // is loading
    it('Button Icon Popover is loading', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.isLoading = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const spinner = element.shadowRoot.querySelector(
                    'lightning-spinner'
                );
                expect(spinner).toBeTruthy();
            });
    });

    // loading state alternative text
    it('Button Icon Popover loading state alternative text', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.isLoading = true;
        element.loadingStateAlternativeText = 'This is a loading text';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const spinner = element.shadowRoot.querySelector(
                    'lightning-spinner'
                );
                expect(spinner.alternativeText).toBe('This is a loading text');
            });
    });

    // triggers
    it('Button Icon Popover triggers focus', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover).toBeTruthy();
            });
    });

    it('Button Icon Popover triggers click', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        element.triggers = 'click';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                element.focus();
                button.click();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover).toBeTruthy();
            });
    });

    /* ---- METHODS ----- */
    it('Button Icon Popover method: click', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        let clickEvent = false;
        element.addEventListener('click', () => {
            clickEvent = true;
        });

        element.click();
        return Promise.resolve().then(() => {
            expect(clickEvent).toBeTruthy();
        });
    });

    it('Button Icon Popover method: focus', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        const buttonIcon = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        let focusEvent = false;

        buttonIcon.addEventListener('focus', () => {
            focusEvent = true;
        });

        buttonIcon.focus();
        return Promise.resolve().then(() => {
            expect(focusEvent).toBeTruthy();
        });
    });

    it('Button Icon Popover method: close', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        let closeEvent = false;

        element.addEventListener('close', () => {
            closeEvent = true;
        });

        element.close();

        return Promise.resolve().then(() => {
            expect(closeEvent).toBeTruthy();
        });
    });

    it('Button Icon Popover method: open', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                element.focus();
                element.open();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover.className).toContain('slds-show');
            });
    });

    /* ----- EVENTS ----- */

    // button popover click
    it('Button Icon Popover event click', () => {
        const element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);
        const handler = jest.fn();
        element.addEventListener('click', handler);
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );
        button.click();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
        element.click();
    });

    // button icon popover close
    it('Button icon Popover event close', () => {
        const element = createElement('base-button-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);
        const handler = jest.fn();
        element.addEventListener('close', handler);
        element.close();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });
});
