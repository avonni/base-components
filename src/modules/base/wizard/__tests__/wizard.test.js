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
import Wizard from 'c/wizard';

// Not tested due to impossibility of targetting child component (mediaObject) slot content:
// iconName

// Not tested because it is asynchronous:
// handleChange

const STEPS = [
    {
        callbacks: {
            setClass: jest.fn(),
            beforeChange: jest.fn().mockReturnValue(true)
        },
        name: 'first-step',
        label: 'Step 1',
        hidePreviousButton: true,
        hideNextFinishButton: true,
        beforeChangeErrorMessage: 'Error in step 1'
    },
    {
        callbacks: {
            setClass: jest.fn(),
            beforeChange: jest.fn().mockReturnValue(true)
        },
        name: 'second-step',
        label: 'Step 2',
        beforeChangeErrorMessage: 'Error in step 2'
    },
    {
        callbacks: {
            setClass: jest.fn(),
            beforeChange: jest.fn().mockReturnValue(true)
        },
        name: 'third-step',
        label: 'Step 3',
        beforeChangeErrorMessage: 'Error in step 3'
    }
];

describe('Wizard', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        expect(element.actionPosition).toBe('left');
        expect(element.finishButtonIconName).toBeUndefined();
        expect(element.finishButtonIconPosition).toBe('left');
        expect(element.finishButtonLabel).toBe('Finish');
        expect(element.finishButtonVariant).toBe('neutral');
        expect(element.nextButtonIconName).toBeUndefined();
        expect(element.nextButtonIconPosition).toBe('left');
        expect(element.nextButtonLabel).toBe('Next');
        expect(element.nextButtonVariant).toBe('neutral');
        expect(element.previousButtonIconName).toBeUndefined();
        expect(element.previousButtonIconPosition).toBe('left');
        expect(element.previousButtonLabel).toBe('Previous');
        expect(element.previousButtonVariant).toBe('neutral');
        expect(element.buttonAlignmentBump).toBeUndefined();
        expect(element.currentStep).toBeUndefined();
        expect(element.fractionLabel).toBe('of');
        expect(element.fractionPrefixLabel).toBe('Step');
        expect(element.hideIndicator).toBeFalsy();
        expect(element.hideNavigation).toBeFalsy();
        expect(element.iconName).toBeUndefined();
        expect(element.indicatorType).toBe('base');
        expect(element.indicatorPosition).toBe('bottom');
        expect(element.title).toBeUndefined();
        expect(element.variant).toBe('base');
    });

    /* ----- ATTRIBUTES ----- */

    // action-position
    it('actionPosition', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.actionPosition = 'right';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.actionPosition).toBe('right');
        });
    });

    // button-finish-icon-name
    it('finishButtonIconName', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.finishButtonIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.finishButtonIconName).toBe(
                'utility:apps'
            );
        });
    });

    // button-finish-icon-position
    it('finishButtonIconPosition', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.finishButtonIconPosition = 'right';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.finishButtonIconPosition).toBe('right');
        });
    });

    // button-finish-label
    it('finishButtonLabel', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.finishButtonLabel = 'The end';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.finishButtonLabel).toBe('The end');
        });
    });

    // button-finish-variant
    it('finishButtonVariant', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.finishButtonVariant = 'brand';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.finishButtonVariant).toBe('brand');
        });
    });

    // button-next-icon-name
    it('nextButtonIconName', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.nextButtonIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.nextButtonIconName).toBe('utility:apps');
        });
    });

    // button-next-icon-position
    it('nextButtonIconPosition', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.nextButtonIconPosition = 'right';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.nextButtonIconPosition).toBe('right');
        });
    });

    // button-next-label
    it('nextButtonLabel', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.nextButtonLabel = 'The end';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.nextButtonLabel).toBe('The end');
        });
    });

    // button-next-variant
    it('nextButtonVariant', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.nextButtonVariant = 'brand';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.nextButtonVariant).toBe('brand');
        });
    });

    // button-previous-icon-name
    it('previousButtonIconName', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.previousButtonIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.previousButtonIconName).toBe(
                'utility:apps'
            );
        });
    });

    // button-previous-icon-position
    it('previousButtonIconPosition', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.previousButtonIconPosition = 'right';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.previousButtonIconPosition).toBe(
                'right'
            );
        });
    });

    // button-previous-label
    it('previousButtonLabel', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.previousButtonLabel = 'The end';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.previousButtonLabel).toBe('The end');
        });
    });

    // button-previous-variant
    it('previousButtonVariant', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.previousButtonVariant = 'brand';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.previousButtonVariant).toBe('brand');
        });
    });

    // button-alignment-bump
    it('buttonAlignmentBump', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.buttonAlignmentBump = 'right';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.buttonAlignmentBump).toBe('right');
        });
    });

    // current-step
    it('currentStep', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.currentStep = 'second-step';

        const slot = element.shadowRoot.querySelector('main slot');
        STEPS.forEach((step) => {
            slot.dispatchEvent(
                new CustomEvent('wizardstepregister', {
                    bubbles: true,
                    detail: step
                })
            );
        });

        return Promise.resolve().then(() => {
            expect(STEPS[0].callbacks.setClass).toHaveBeenCalledWith(
                'slds-hide'
            );
            expect(STEPS[1].callbacks.setClass).toHaveBeenCalledWith(undefined);
            expect(STEPS[2].callbacks.setClass).toHaveBeenCalledWith(
                'slds-hide'
            );
        });
    });

    // fraction-label
    it('fractionLabel', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.fractionLabel = '/';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.fractionLabel).toBe('/');
        });
    });

    // fraction-prefix-label
    it('fractionPrefixLabel', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.fractionPrefixLabel = 'Page';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.fractionPrefixLabel).toBe('Page');
        });
    });

    // hide-indicator
    it('hideIndicator', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.hideIndicator = true;

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.hideIndicator).toBeTruthy();
        });
    });

    // hide-navigation
    it('hideNavigation = false', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.hideNavigation = false;

        return Promise.resolve().then(() => {
            const footer = element.shadowRoot.querySelector('footer');
            expect(footer).toBeTruthy();
        });
    });

    it('hideNavigation = true', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.hideNavigation = true;

        return Promise.resolve().then(() => {
            const footer = element.shadowRoot.querySelector('footer');
            expect(footer).toBeFalsy();
        });
    });

    // indicator-type
    it('indicatorType', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.indicatorType = 'path';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.indicatorType).toBe('path');
        });
    });

    // indicator-position
    it('indicatorPosition = bottom', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.indicatorPosition = 'bottom';

        return Promise.resolve().then(() => {
            const footerNavigation = element.shadowRoot.querySelector(
                'footer c-primitive-wizard-navigation'
            );
            const headerNavigation = element.shadowRoot.querySelector(
                'header c-primitive-wizard-navigation'
            );
            const sideNavigation = element.shadowRoot.querySelector(
                '.side-col c-primitive-wizard-navigation'
            );
            const mainCol = element.shadowRoot.querySelector('.main-col');
            const wrapper = element.shadowRoot.querySelector('article');

            expect(footerNavigation.indicatorPosition).toBe('bottom');
            expect(headerNavigation).toBeFalsy();
            expect(sideNavigation).toBeFalsy();
            expect(mainCol.classList).not.toContain('slds-col');
            expect(wrapper.classList).not.toContain('slds-grid');
        });
    });

    it('indicatorPosition = top', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.indicatorPosition = 'top';

        return Promise.resolve().then(() => {
            const footerNavigation = element.shadowRoot.querySelector(
                'footer c-primitive-wizard-navigation'
            );
            const headerNavigation = element.shadowRoot.querySelector(
                'header c-primitive-wizard-navigation'
            );
            const sideNavigation = element.shadowRoot.querySelector(
                '.side-col c-primitive-wizard-navigation'
            );
            const mainCol = element.shadowRoot.querySelector('.main-col');
            const wrapper = element.shadowRoot.querySelector('article');

            expect(footerNavigation.indicatorPosition).toBe('top');
            expect(headerNavigation).toBeTruthy();
            expect(headerNavigation.indicatorPosition).toBe('top');
            expect(sideNavigation).toBeFalsy();
            expect(mainCol.classList).not.toContain('slds-col');
            expect(wrapper.classList).not.toContain('slds-grid');
        });
    });

    it('indicatorPosition = right', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.indicatorPosition = 'right';

        return Promise.resolve().then(() => {
            const footerNavigation = element.shadowRoot.querySelector(
                'footer c-primitive-wizard-navigation'
            );
            const headerNavigation = element.shadowRoot.querySelector(
                'header c-primitive-wizard-navigation'
            );
            const sideNavigation = element.shadowRoot.querySelector(
                '.side-col c-primitive-wizard-navigation'
            );
            const mainCol = element.shadowRoot.querySelector('.main-col');
            const wrapper = element.shadowRoot.querySelector('article');

            expect(footerNavigation.indicatorPosition).toBe('right');
            expect(headerNavigation).toBeFalsy();
            expect(sideNavigation.indicatorPosition).toBe('right');
            expect(mainCol.classList).toContain('slds-col');
            expect(mainCol.classList).not.toContain('slds-order_2');
            expect(wrapper.classList).toContain('slds-grid');
        });
    });

    it('indicatorPosition = left', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.indicatorPosition = 'left';

        return Promise.resolve().then(() => {
            const footerNavigation = element.shadowRoot.querySelector(
                'footer c-primitive-wizard-navigation'
            );
            const headerNavigation = element.shadowRoot.querySelector(
                'header c-primitive-wizard-navigation'
            );
            const sideNavigation = element.shadowRoot.querySelector(
                '.side-col c-primitive-wizard-navigation'
            );
            const mainCol = element.shadowRoot.querySelector('.main-col');
            const wrapper = element.shadowRoot.querySelector('article');

            expect(footerNavigation.indicatorPosition).toBe('left');
            expect(headerNavigation).toBeFalsy();
            expect(sideNavigation.indicatorPosition).toBe('left');
            expect(mainCol.classList).toContain('slds-col');
            expect(mainCol.classList).toContain('slds-order_2');
            expect(wrapper.classList).toContain('slds-grid');
        });
    });

    // title
    it('title', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h1');
            expect(title.textContent).toBe('A string title');
        });
    });

    // variant
    it('variant = base', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.variant = 'base';

        return Promise.resolve().then(() => {
            const base = element.shadowRoot.querySelector('article');
            const card = element.shadowRoot.querySelector('lightning-card');
            const modal = element.shadowRoot.querySelector('c-dialog');

            expect(base).toBeTruthy();
            expect(card).toBeFalsy();
            expect(modal).toBeFalsy();
        });
    });

    it('variant = card', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.variant = 'card';

        return Promise.resolve().then(() => {
            const base = element.shadowRoot.querySelector('article');
            const card = element.shadowRoot.querySelector('lightning-card');
            const modal = element.shadowRoot.querySelector('c-dialog');

            expect(base).toBeFalsy();
            expect(card).toBeTruthy();
            expect(modal).toBeFalsy();
        });
    });

    it('variant = modal', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.variant = 'modal';

        return Promise.resolve().then(() => {
            const base = element.shadowRoot.querySelector('article');
            const card = element.shadowRoot.querySelector('lightning-card');
            const modal = element.shadowRoot.querySelector('c-dialog');

            expect(base).toBeFalsy();
            expect(card).toBeFalsy();
            expect(modal).toBeTruthy();
        });
    });

    /* ----- METHODS ----- */

    // show and hide
    it('show and hide methods', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);
        const article = element.shadowRoot.querySelector('article');
        expect(article).toBeTruthy();

        element.hide();

        return Promise.resolve()
            .then(() => {
                const articleAfterHide = element.shadowRoot.querySelector(
                    'article'
                );
                expect(articleAfterHide).toBeFalsy();

                element.show();
            })
            .then(() => {
                const articleAfterShow = element.shadowRoot.querySelector(
                    'article'
                );
                expect(articleAfterShow).toBeTruthy();
            });
    });

    // next and previous
    it('next and previous methods', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        const slot = element.shadowRoot.querySelector('main slot');
        STEPS.forEach((step) => {
            slot.dispatchEvent(
                new CustomEvent('wizardstepregister', {
                    bubbles: true,
                    detail: step
                })
            );
        });

        return Promise.resolve()
            .then(() => {
                expect(STEPS[0].callbacks.setClass).toHaveBeenCalledWith(
                    undefined
                );
                expect(STEPS[1].callbacks.setClass).toHaveBeenCalledWith(
                    'slds-hide'
                );
                expect(STEPS[2].callbacks.setClass).toHaveBeenCalledWith(
                    'slds-hide'
                );

                element.next();
            })
            .then(() => {
                expect(STEPS[0].callbacks.setClass).toHaveBeenCalledWith(
                    'slds-hide'
                );
                expect(STEPS[1].callbacks.setClass).toHaveBeenCalledWith(
                    undefined
                );
                expect(STEPS[2].callbacks.setClass).toHaveBeenCalledWith(
                    'slds-hide'
                );

                element.previous();
            })
            .then(() => {
                expect(STEPS[0].callbacks.setClass).toHaveBeenCalledWith(
                    undefined
                );
                expect(STEPS[1].callbacks.setClass).toHaveBeenCalledWith(
                    'slds-hide'
                );
                expect(STEPS[2].callbacks.setClass).toHaveBeenCalledWith(
                    'slds-hide'
                );
            });
    });

    /* ----- EVENTS ----- */

    // change
    // Depends on next()
    it('change event based on next()', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        const slot = element.shadowRoot.querySelector('main slot');
        STEPS.forEach((step) => {
            slot.dispatchEvent(
                new CustomEvent('wizardstepregister', {
                    bubbles: true,
                    detail: step
                })
            );
        });

        const handler = jest.fn();
        element.addEventListener('change', handler);

        element.next();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.currentStep).toBe('second-step');
        expect(handler.mock.calls[0][0].detail.oldStep).toBe('first-step');
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });
});
