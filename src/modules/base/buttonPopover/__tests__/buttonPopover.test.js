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
import ButtonPopover from 'c/buttonPopover';

// not tested
// triggers : hover

describe('Button Popover', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });

        expect(element.accessKey).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.variant).toBe('neutral');
        expect(element.hideCloseButton).toBeFalsy();
        expect(element.iconName).toBeUndefined();
        expect(element.iconPosition).toBe('left');
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
    it('Button Popover access-key', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.accessKey = 'K';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.accessKey).toBe('K');
        });
    });

    // disabled
    it('Button Popover disabled', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.disabled = true;
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.disabled).toBeTruthy();
        });
    });

    // label
    it('Button Popover label', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.label = 'Button Label';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.label).toBe('Button Label');
        });
    });

    // variant
    it('Button Popover variant neutral', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.variant = 'neutral';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('neutral');
        });
    });

    it('Button Popover variant base', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.variant = 'base';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('base');
        });
    });

    it('Button Popover variant brand', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.variant = 'brand';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('brand');
        });
    });

    it('Button Popover variant brand-outline', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.variant = 'brand-outline';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('brand-outline');
        });
    });

    it('Button Popover variant destructive', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.variant = 'destructive';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('destructive');
        });
    });

    it('Button Popover variant destructive-text', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.variant = 'destructive-text';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('destructive-text');
        });
    });

    it('Button Popover variant inverse', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.variant = 'inverse';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('inverse');
        });
    });

    it('Button Popover variant success', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.variant = 'success';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('success');
        });
    });

    // hide close button
    it('Button Popover hide close button', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const closeButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(closeButton.iconName).toBe('utility:close');
        });
    });

    it('Button Popover hide close button true', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.hideCloseButton = true;

        return Promise.resolve().then(() => {
            const closeButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon"]'
            );
            expect(closeButton).toBeFalsy();
        });
    });

    // icon name
    it('Button Popover icon name', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.iconName = 'utility:lock';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.iconName).toBe('utility:lock');
        });
    });

    // icon position
    it('Button Popover icon position left', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.iconName = 'utility:lock';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.iconPosition).toBe('left');
        });
    });

    it('Button Popover icon position right', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.iconName = 'utility:lock';
        element.iconPosition = 'right';
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');

        return Promise.resolve().then(() => {
            expect(button.iconPosition).toBe('right');
        });
    });

    // title
    it('Button Popover title', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.title = 'This is a popover Title';
        element.triggers = 'focus';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
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
    it('Button Popover popoverSize small', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.popoverSize = 'small';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
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

    it('Button Popover popoverSize medium', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.popoverSize = 'medium';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
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

    it('Button Popover popoverSize large', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.popoverSize = 'large';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
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
    it('Button Popover popoverVariant base', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
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

    it('Button Popover popoverVariant warning', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.popoverVariant = 'warning';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
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

    it('Button Popover popoverVariant error', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.popoverVariant = 'error';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
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

    it('Button Popover popoverVariant walkthrough', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.popoverVariant = 'walkthrough';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
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
    it('Button Popover placement left', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.placement = 'left';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
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

    it('Button Popover placement auto', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.placement = 'auto';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
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

    it('Button Popover placement center', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.placement = 'center';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
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

    it('Button Popover placement right', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.placement = 'right';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
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

    it('Button Popover placement bottom-left', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.placement = 'bottom-left';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
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

    it('Button Popover placement bottom-right', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.placement = 'bottom-right';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
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

    it('Button Popover placement bottom-center', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.placement = 'bottom-center';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
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
    it('Button Popover is loading', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.isLoading = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const spinner = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-spinner"]'
                );
                expect(spinner).toBeTruthy();
            });
    });

    // loading state alternative text
    it('Button Popover loading state alternative text', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';
        element.isLoading = true;
        element.loadingStateAlternativeText = 'This is a loading text';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
                );
                element.focus();
                button.focus();
            })
            .then(() => {
                const spinner = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-spinner"]'
                );
                expect(spinner.alternativeText).toBe('This is a loading text');
            });
    });

    // triggers
    it('Button Popover triggers focus', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';

        return Promise.resolve()
            .then(() => {
                element.focus();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover).toBeTruthy();
            });
    });

    it('Button Popover triggers click', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.triggers = 'click';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
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

    it('Button Popover method: click', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
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

    it('Button Popover method: focus', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        element.triggers = 'focus';

        return Promise.resolve()
            .then(() => {
                element.focus();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover).toBeTruthy();
            });
    });

    it('Button Popover method: open', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
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

    it('Button Popover method: close', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                element.focus();
                element.close();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '.slds-popover'
                );
                expect(popover.className).toContain('slds-hide');
            });
    });

    /* ----- EVENTS ----- */

    // button popover click
    it('Button Popover event click', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);
        const handler = jest.fn();
        element.addEventListener('click', handler);
        const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');
        button.click();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
        element.click();
    });

    // button popover close
    it('Button Popover event close', () => {
        const element = createElement('base-button-popover', {
            is: ButtonPopover
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
