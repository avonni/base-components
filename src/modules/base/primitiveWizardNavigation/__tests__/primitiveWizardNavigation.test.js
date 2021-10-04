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
import PrimitiveWizardNavigation from 'c/primitiveWizardNavigation';

// Note:
// Use of duplicate then() to make sure rendering is done before testing these attributes:
// finishButtonIconName
// finishButtonIconPosition
// finishButtonLabel
// finishButtonVariant
// currentStep

const STEPS = [
    {
        name: 'step-1',
        label: 'Step 1'
    },
    {
        name: 'step-2',
        label: 'Step 2'
    },
    {
        name: 'step-3',
        label: 'Step 3'
    },
    {
        name: 'step-4',
        label: 'Step 4'
    }
];

let element;
describe('PrimitiveWizardNavigation', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.actionPosition).toBe('left');
        expect(element.buttonAlignmentBump).toBeUndefined();
        expect(element.currentStepHasError).toBeFalsy();
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
        expect(element.currentStep).toBeUndefined();
        expect(element.fractionLabel).toBe('of');
        expect(element.fractionPrefixLabel).toBe('Step');
        expect(element.hideIndicator).toBeFalsy();
        expect(element.indicatorPosition).toBe('bottom');
        expect(element.indicatorType).toBe('base');
        expect(element.steps).toMatchObject([]);
        expect(element.position).toBe('bottom');
    });

    /* ----- ATTRIBUTES ----- */

    // action-position
    it('actionPosition = left', () => {
        element.actionPosition = 'left';

        return Promise.resolve().then(() => {
            const nextFinishButtonCol = element.shadowRoot.querySelector(
                'lightning-layout-item.slds-order_1'
            );
            const actionSlotCol = element.shadowRoot.querySelector(
                'lightning-layout-item.slds-order_2'
            );
            expect(nextFinishButtonCol).toBeFalsy();
            expect(actionSlotCol).toBeFalsy();
        });
    });

    it('actionPosition = right', () => {
        element.actionPosition = 'right';

        return Promise.resolve().then(() => {
            const nextFinishButtonCol = element.shadowRoot.querySelector(
                'lightning-layout-item.slds-order_1'
            );
            const actionSlotCol = element.shadowRoot.querySelector(
                'lightning-layout-item.slds-order_2'
            );
            expect(nextFinishButtonCol).toBeTruthy();
            expect(actionSlotCol).toBeTruthy();
        });
    });

    // button-alignment-bump
    it('buttonAlignmentBump = left', () => {
        element.buttonAlignmentBump = 'left';

        return Promise.resolve().then(() => {
            const leftActionsNextFinishButtonCol = element.shadowRoot.querySelector(
                'lightning-layout-item.slds-order_2'
            );
            const leftProgressCol = element.shadowRoot.querySelector(
                'lightning-layout-item.slds-order_3.slds-text-align_right'
            );
            const leftPreviousButtonCol = element.shadowRoot.querySelector(
                'lightning-layout-item.slds-order_1'
            );

            const rightActionsNextFinishButtonCol = element.shadowRoot.querySelector(
                'lightning-layout-item.slds-order_3'
            );
            const rightProgressCol = element.shadowRoot.querySelector(
                'lightning-layout-item.slds-order_1.slds-text-align_left'
            );
            const rightPreviousButtonCol = element.shadowRoot.querySelector(
                'lightning-layout-item.slds-order_2'
            );

            expect(
                leftActionsNextFinishButtonCol &&
                    leftProgressCol &&
                    leftPreviousButtonCol
            ).toBeTruthy();
            expect(
                rightActionsNextFinishButtonCol &&
                    rightProgressCol &&
                    rightPreviousButtonCol
            ).toBeFalsy();
        });
    });

    it('buttonAlignmentBump = right', () => {
        element.buttonAlignmentBump = 'right';

        return Promise.resolve().then(() => {
            const leftActionsNextFinishButtonCol = element.shadowRoot.querySelector(
                'lightning-layout-item.slds-order_2'
            );
            const leftProgressCol = element.shadowRoot.querySelector(
                'lightning-layout-item.slds-order_3.slds-text-align_right'
            );
            const leftPreviousButtonCol = element.shadowRoot.querySelector(
                'lightning-layout-item.slds-order_1'
            );

            const rightActionsNextFinishButtonCol = element.shadowRoot.querySelector(
                'lightning-layout-item.slds-order_3'
            );
            const rightProgressCol = element.shadowRoot.querySelector(
                'lightning-layout-item.slds-order_1.slds-text-align_left'
            );
            const rightPreviousButtonCol = element.shadowRoot.querySelector(
                'lightning-layout-item.slds-order_2'
            );

            expect(
                leftActionsNextFinishButtonCol &&
                    leftProgressCol &&
                    leftPreviousButtonCol
            ).toBeFalsy();
            expect(
                rightActionsNextFinishButtonCol &&
                    rightProgressCol &&
                    rightPreviousButtonCol
            ).toBeTruthy();
        });
    });

    // button-finish-icon-name
    // Depends on steps and currentStep
    it('finishButtonIconName', () => {
        element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        element.finishButtonIconName = 'utility:apps';
        element.currentStep = 'step-4';
        element.steps = STEPS;

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const lastButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-last"]'
            );
            expect(lastButton.iconName).toBe('utility:apps');
        });
    });

    // button-finish-icon-position
    // Depends on steps and currentStep
    it('finishButtonIconPosition', () => {
        element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        element.finishButtonIconPosition = 'right';
        element.currentStep = 'step-4';
        element.steps = STEPS;

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const lastButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-last"]'
            );

            expect(lastButton.iconPosition).toBe('right');
        });
    });

    // button-finish-label
    // Depends on steps and currentStep
    it('finishButtonLabel', () => {
        element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        element.finishButtonLabel = 'A string label';
        element.currentStep = 'step-4';
        element.steps = STEPS;

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const lastButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-last"]'
            );

            expect(lastButton.label).toBe('A string label');
        });
    });

    // button-finish-variant
    // Depends on steps and currentStep
    it('finishButtonVariant', () => {
        element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        element.finishButtonVariant = 'inverse';
        element.currentStep = 'step-4';
        element.steps = STEPS;

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const lastButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-last"]'
            );

            expect(lastButton.variant).toBe('inverse');
        });
    });

    // button-next-icon-name
    // Depends on steps
    it('nextButtonIconName', () => {
        element.nextButtonIconName = 'utility:apps';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const nextButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-next"]'
            );
            expect(nextButton.iconName).toBe('utility:apps');
        });
    });

    // button-next-icon-position
    // Depends on steps
    it('nextButtonIconPosition', () => {
        element.nextButtonIconPosition = 'right';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const nextButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-next"]'
            );
            expect(nextButton.iconPosition).toBe('right');
        });
    });

    // button-next-label
    // Depends on steps
    it('nextButtonLabel', () => {
        element.nextButtonLabel = 'A string label';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const nextButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-next"]'
            );

            expect(nextButton.label).toBe('A string label');
        });
    });

    // button-next-variant
    // Depends on steps
    it('nextButtonVariant', () => {
        element.nextButtonVariant = 'brand';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const nextButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-next"]'
            );

            expect(nextButton.variant).toBe('brand');
        });
    });

    // button-previous-icon-name
    // Depends on steps
    it('previousButtonIconName', () => {
        element.previousButtonIconName = 'utility:user';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const firstButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-previous"]'
            );

            expect(firstButton.iconName).toBe('utility:user');
        });
    });

    // button-previous-icon-position
    // Depends on steps
    it('previousButtonIconPosition', () => {
        element.previousButtonIconPosition = 'right';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const firstButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-previous"]'
            );

            expect(firstButton.iconPosition).toBe('right');
        });
    });

    // button-previous-label
    // Depends on steps
    it('previousButtonLabel', () => {
        element.previousButtonLabel = 'A string label';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const firstButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-previous"]'
            );

            expect(firstButton.label).toBe('A string label');
        });
    });

    // button-previous-variant
    // Depends on steps
    it('previousButtonVariant', () => {
        element.previousButtonVariant = 'destructive';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const firstButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-previous"]'
            );

            expect(firstButton.variant).toBe('destructive');
        });
    });

    // current-step
    // Depends on steps
    it('currentStep = last step', () => {
        element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        element.steps = STEPS;
        element.currentStep = 'step-4';

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const lastButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-last"]'
            );
            expect(lastButton.dataset.action).toBe('finish');
        });
    });

    it('currentStep = first step', () => {
        element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        element.currentStep = 'step-1';
        element.steps = STEPS;

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const nextButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-next"]'
            );
            expect(nextButton.dataset.action).toBe('next');
        });
    });

    it('currentStep = middle step', () => {
        element.currentStep = 'step-2';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const firstButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-previous"]'
            );
            const lastButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-next"]'
            );
            expect(firstButton.dataset.action).toBe('previous');
            expect(lastButton.dataset.action).toBe('next');
        });
    });

    // indicatorPosition and position
    it('indicatorPosition = top and position = top', () => {
        element.indicatorPosition = 'top';
        element.position = 'top';

        return Promise.resolve().then(() => {
            const actionsSlotCol = element.shadowRoot.querySelector(
                'lightning-layout-item.slds-hide'
            );
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-button"]'
            );
            expect(buttons).toHaveLength(0);
            expect(actionsSlotCol).toBeTruthy();
        });
    });

    it('indicatorPosition = top and position = bottom', () => {
        element.indicatorPosition = 'top';
        element.position = 'bottom';

        return Promise.resolve().then(() => {
            expect(element.hideIndicator).toBeTruthy();
        });
    });

    it('indicatorPosition = left and position = side', () => {
        element.indicatorPosition = 'left';
        element.position = 'side';

        return Promise.resolve().then(() => {
            const indicator = element.shadowRoot.querySelector(
                '[data-element-id="avonni-vertical-progress-indicator"]'
            );
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button"]'
            );

            expect(indicator).toBeTruthy();
            expect(buttons).toHaveLength(0);
        });
    });

    // indicator-type
    // Depends on steps
    it('indicatorType = base', () => {
        element.indicatorType = 'base';

        return Promise.resolve().then(() => {
            const progressIndicator = element.shadowRoot.querySelector(
                '[data-element-id="lightning-progress-indicator"]'
            );
            const bulletIndicator = element.shadowRoot.querySelector(
                '.slds-carousel__indicators'
            );
            const fractionsIndicator = element.shadowRoot.querySelector(
                '.fractions-indicator'
            );
            const barIndicator = element.shadowRoot.querySelector(
                '[data-element-id="avonni-progress-bar"]'
            );

            expect(progressIndicator).toBeTruthy();
            expect(progressIndicator.variant).toBe('base');
            expect(bulletIndicator).toBeFalsy();
            expect(fractionsIndicator).toBeFalsy();
            expect(barIndicator).toBeFalsy();
        });
    });

    it('indicatorType = base-shaded', () => {
        element.indicatorType = 'base-shaded';

        return Promise.resolve().then(() => {
            const progressIndicator = element.shadowRoot.querySelector(
                '[data-element-id="lightning-progress-indicator"]'
            );
            const bulletIndicator = element.shadowRoot.querySelector(
                '.slds-carousel__indicators'
            );
            const fractionsIndicator = element.shadowRoot.querySelector(
                '.fractions-indicator'
            );
            const barIndicator = element.shadowRoot.querySelector(
                '[data-element-id="avonni-progress-bar"]'
            );

            expect(progressIndicator).toBeTruthy();
            expect(progressIndicator.variant).toBe('shade');
            expect(bulletIndicator).toBeFalsy();
            expect(fractionsIndicator).toBeFalsy();
            expect(barIndicator).toBeFalsy();
        });
    });

    it('indicatorType = path', () => {
        element.indicatorType = 'path';

        return Promise.resolve().then(() => {
            const progressIndicator = element.shadowRoot.querySelector(
                '[data-element-id="lightning-progress-indicator"]'
            );
            const bulletIndicator = element.shadowRoot.querySelector(
                '.slds-carousel__indicators'
            );
            const fractionsIndicator = element.shadowRoot.querySelector(
                '.fractions-indicator'
            );
            const barIndicator = element.shadowRoot.querySelector(
                '[data-element-id="avonni-progress-bar"]'
            );

            expect(progressIndicator).toBeTruthy();
            expect(progressIndicator.type).toBe('path');
            expect(bulletIndicator).toBeFalsy();
            expect(fractionsIndicator).toBeFalsy();
            expect(barIndicator).toBeFalsy();
        });
    });

    it('indicatorType = bullet', () => {
        element.indicatorType = 'bullet';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const progressIndicator = element.shadowRoot.querySelector(
                '[data-element-id="lightning-progress-indicator"]'
            );
            const bulletIndicator = element.shadowRoot.querySelector(
                '.slds-carousel__indicators'
            );
            const fractionsIndicator = element.shadowRoot.querySelector(
                '.fractions-indicator'
            );
            const barIndicator = element.shadowRoot.querySelector(
                '[data-element-id="avonni-progress-bar"]'
            );

            const bullets = element.shadowRoot.querySelectorAll(
                '[data-element-id="span-bullet"]'
            );

            expect(progressIndicator).toBeFalsy();
            expect(bulletIndicator).toBeTruthy();
            expect(bullets).toHaveLength(4);
            expect(fractionsIndicator).toBeFalsy();
            expect(barIndicator).toBeFalsy();
        });
    });

    it('indicatorType = fractions', () => {
        element.indicatorType = 'fractions';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const progressIndicator = element.shadowRoot.querySelector(
                '[data-element-id="lightning-progress-indicator"]'
            );
            const bulletIndicator = element.shadowRoot.querySelector(
                '.slds-carousel__indicators'
            );
            const fractionsIndicator = element.shadowRoot.querySelector(
                '.fractions-indicator'
            );
            const barIndicator = element.shadowRoot.querySelector(
                '[data-element-id="avonni-progress-bar"]'
            );

            expect(progressIndicator).toBeFalsy();
            expect(bulletIndicator).toBeFalsy();
            expect(fractionsIndicator).toBeTruthy();
            expect(barIndicator).toBeFalsy();
        });
    });

    it('indicatorType = bar', () => {
        element.indicatorType = 'bar';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const progressIndicator = element.shadowRoot.querySelector(
                '[data-element-id="lightning-progress-indicator"]'
            );
            const bulletIndicator = element.shadowRoot.querySelector(
                '.slds-carousel__indicators'
            );
            const fractionsIndicator = element.shadowRoot.querySelector(
                '.fractions-indicator'
            );
            const barIndicator = element.shadowRoot.querySelector(
                '[data-element-id="avonni-progress-bar"]'
            );

            expect(progressIndicator).toBeFalsy();
            expect(bulletIndicator).toBeFalsy();
            expect(fractionsIndicator).toBeFalsy();
            expect(barIndicator).toBeTruthy();
        });
    });

    // fraction-label and fraction-prefix-label
    // Depends on indicatorType and steps
    it('fractionLabel and prefixFractionLabel', () => {
        element.indicatorType = 'fractions';
        element.steps = STEPS;
        element.fractionLabel = 'Label';
        element.fractionPrefixLabel = 'Prefix';

        return Promise.resolve().then(() => {
            const fractionsIndicator = element.shadowRoot.querySelector(
                '.fractions-indicator'
            );

            expect(fractionsIndicator.textContent).toContain('Prefix');
            expect(fractionsIndicator.textContent).toContain('Label');
        });
    });

    // hide-indicator
    // Depends on steps
    it('hideIndicator = true', () => {
        element.hideIndicator = true;
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const indicator = element.shadowRoot.querySelector(
                '[data-element-id="lightning-progress-indicator"]'
            );

            expect(indicator).toBeFalsy();
        });
    });

    it('hideIndicator = false', () => {
        element.hideIndicator = false;
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const indicator = element.shadowRoot.querySelector(
                '[data-element-id="lightning-progress-indicator"]'
            );

            expect(indicator).toBeTruthy();
        });
    });

    // Attributes updates after first render
    // Depends on steps, indicatorType and currentStep
    it('Attributes updated after first render', () => {
        // Only steps are set
        element.steps = [STEPS[0], STEPS[2]];

        return Promise.resolve()
            .then(() => {
                // Steps, indicatorType and currentStep are changed after first render
                element.steps = STEPS;
                element.currentStep = 'step-2';
                element.indicatorType = 'fractions';
            })
            .then(() => {
                // We should have a fraction indicator, displaying the current step (2) and the total number of steps (4)
                const fractionsIndicator = element.shadowRoot.querySelector(
                    '.fractions-indicator'
                );

                expect(fractionsIndicator.textContent).toContain('2');
                expect(fractionsIndicator.textContent).toContain('4');
            });
    });

    /* ----- EVENTS ----- */

    // change
    // Depends on steps
    it('change event', () => {
        const handler = jest.fn();
        element.addEventListener('change', handler);
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button"]'
            );

            // Click on next button
            buttons[buttons.length - 1].click();

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler.mock.calls[0][0].detail.action).toBe('next');

            // Click on previous button
            buttons[0].click();
            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler.mock.calls[1][0].detail.action).toBe('previous');
        });
    });
});
