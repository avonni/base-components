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
// buttonFinishIconName
// buttonFinishIconPosition
// buttonFinishLabel
// buttonFinishVariant
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

describe('PrimitiveWizardNavigation', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        expect(element.actionPosition).toBe('left');
        expect(element.buttonAlignmentBump).toBeUndefined();
        expect(element.buttonFinishIconName).toBeUndefined();
        expect(element.buttonFinishIconPosition).toBe('left');
        expect(element.buttonFinishLabel).toBe('Finish');
        expect(element.buttonFinishVariant).toBe('neutral');
        expect(element.buttonNextIconName).toBeUndefined();
        expect(element.buttonNextIconPosition).toBe('left');
        expect(element.buttonNextLabel).toBe('Next');
        expect(element.buttonNextVariant).toBe('neutral');
        expect(element.buttonPreviousIconName).toBeUndefined();
        expect(element.buttonPreviousIconPosition).toBe('left');
        expect(element.buttonPreviousLabel).toBe('Previous');
        expect(element.buttonPreviousVariant).toBe('neutral');
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
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

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
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

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
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

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
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

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
    it('buttonFinishIconName', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        element.buttonFinishIconName = 'utility:apps';
        element.currentStep = 'step-4';
        element.steps = STEPS;

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            const lastButton = buttons[buttons.length - 1];
            expect(lastButton.iconName).toBe('utility:apps');
        });
    });

    // button-finish-icon-position
    // Depends on steps and currentStep
    it('buttonFinishIconPosition', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        element.buttonFinishIconPosition = 'right';
        element.currentStep = 'step-4';
        element.steps = STEPS;

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            const lastButton = buttons[buttons.length - 1];

            expect(lastButton.iconPosition).toBe('right');
        });
    });

    // button-finish-label
    // Depends on steps and currentStep
    it('buttonFinishLabel', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        element.buttonFinishLabel = 'A string label';
        element.currentStep = 'step-4';
        element.steps = STEPS;

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            const lastButton = buttons[buttons.length - 1];

            expect(lastButton.label).toBe('A string label');
        });
    });

    // button-finish-variant
    // Depends on steps and currentStep
    it('buttonFinishVariant', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        element.buttonFinishVariant = 'inverse';
        element.currentStep = 'step-4';
        element.steps = STEPS;

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            const lastButton = buttons[buttons.length - 1];

            expect(lastButton.variant).toBe('inverse');
        });
    });

    // button-next-icon-name
    // Depends on steps
    it('buttonNextIconName', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.buttonNextIconName = 'utility:apps';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            const lastButton = buttons[buttons.length - 1];

            expect(lastButton.iconName).toBe('utility:apps');
        });
    });

    // button-next-icon-position
    // Depends on steps
    it('buttonNextIconPosition', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.buttonNextIconPosition = 'right';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            const lastButton = buttons[buttons.length - 1];

            expect(lastButton.iconPosition).toBe('right');
        });
    });

    // button-next-label
    // Depends on steps
    it('buttonNextLabel', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.buttonNextLabel = 'A string label';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            const lastButton = buttons[buttons.length - 1];

            expect(lastButton.label).toBe('A string label');
        });
    });

    // button-next-variant
    // Depends on steps
    it('buttonNextVariant', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.buttonNextVariant = 'brand';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            const lastButton = buttons[buttons.length - 1];

            expect(lastButton.variant).toBe('brand');
        });
    });

    // button-previous-icon-name
    // Depends on steps
    it('buttonPreviousIconName', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.buttonPreviousIconName = 'utility:user';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            const firstButton = buttons[0];

            expect(firstButton.iconName).toBe('utility:user');
        });
    });

    // button-previous-icon-position
    // Depends on steps
    it('buttonPreviousIconPosition', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.buttonPreviousIconPosition = 'right';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            const firstButton = buttons[0];

            expect(firstButton.iconPosition).toBe('right');
        });
    });

    // button-previous-label
    // Depends on steps
    it('buttonPreviousLabel', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.buttonPreviousLabel = 'A string label';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            const firstButton = buttons[0];

            expect(firstButton.label).toBe('A string label');
        });
    });

    // button-previous-variant
    // Depends on steps
    it('buttonPreviousVariant', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.buttonPreviousVariant = 'destructive';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            const firstButton = buttons[0];

            expect(firstButton.variant).toBe('destructive');
        });
    });

    // current-step
    // Depends on steps
    it('currentStep = last step', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        element.steps = STEPS;
        element.currentStep = 'step-4';

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            const lastButton = buttons[buttons.length - 1];
            expect(lastButton.dataset.action).toBe('finish');
        });
    });

    it('currentStep = first step', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        element.currentStep = 'step-1';
        element.steps = STEPS;

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            const firstButton = buttons[0];
            expect(firstButton.dataset.action).toBe('next');
        });
    });

    it('currentStep = middle step', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.currentStep = 'step-2';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            const firstButton = buttons[0];
            const lastButton = buttons[buttons.length - 1];
            expect(firstButton.dataset.action).toBe('previous');
            expect(lastButton.dataset.action).toBe('next');
        });
    });

    // indicatorPosition and position
    it('indicatorPosition = top and position = top', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.indicatorPosition = 'top';
        element.position = 'top';

        return Promise.resolve().then(() => {
            const actionsSlotCol = element.shadowRoot.querySelector(
                'lightning-layout-item.slds-hide'
            );
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );
            expect(buttons).toHaveLength(0);
            expect(actionsSlotCol).toBeTruthy();
        });
    });

    it('indicatorPosition = top and position = bottom', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.indicatorPosition = 'top';
        element.position = 'bottom';

        return Promise.resolve().then(() => {
            expect(element.hideIndicator).toBeTruthy();
        });
    });

    it('indicatorPosition = left and position = side', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.indicatorPosition = 'left';
        element.position = 'side';

        return Promise.resolve().then(() => {
            const indicator = element.shadowRoot.querySelector(
                'c-vertical-progress-indicator'
            );
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
            );

            expect(indicator).toBeTruthy();
            expect(buttons).toHaveLength(0);
        });
    });

    // indicator-type
    // Depends on steps
    it('indicatorType = base', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.indicatorType = 'base';

        return Promise.resolve().then(() => {
            const progressIndicator = element.shadowRoot.querySelector(
                'lightning-progress-indicator'
            );
            const bulletIndicator = element.shadowRoot.querySelector(
                '.slds-carousel__indicators'
            );
            const fractionsIndicator = element.shadowRoot.querySelector(
                '.fractions-indicator'
            );
            const barIndicator = element.shadowRoot.querySelector(
                'c-progress-bar'
            );

            expect(progressIndicator).toBeTruthy();
            expect(progressIndicator.variant).toBe('base');
            expect(bulletIndicator).toBeFalsy();
            expect(fractionsIndicator).toBeFalsy();
            expect(barIndicator).toBeFalsy();
        });
    });

    it('indicatorType = base-shaded', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.indicatorType = 'base-shaded';

        return Promise.resolve().then(() => {
            const progressIndicator = element.shadowRoot.querySelector(
                'lightning-progress-indicator'
            );
            const bulletIndicator = element.shadowRoot.querySelector(
                '.slds-carousel__indicators'
            );
            const fractionsIndicator = element.shadowRoot.querySelector(
                '.fractions-indicator'
            );
            const barIndicator = element.shadowRoot.querySelector(
                'c-progress-bar'
            );

            expect(progressIndicator).toBeTruthy();
            expect(progressIndicator.variant).toBe('shade');
            expect(bulletIndicator).toBeFalsy();
            expect(fractionsIndicator).toBeFalsy();
            expect(barIndicator).toBeFalsy();
        });
    });

    it('indicatorType = path', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.indicatorType = 'path';

        return Promise.resolve().then(() => {
            const progressIndicator = element.shadowRoot.querySelector(
                'lightning-progress-indicator'
            );
            const bulletIndicator = element.shadowRoot.querySelector(
                '.slds-carousel__indicators'
            );
            const fractionsIndicator = element.shadowRoot.querySelector(
                '.fractions-indicator'
            );
            const barIndicator = element.shadowRoot.querySelector(
                'c-progress-bar'
            );

            expect(progressIndicator).toBeTruthy();
            expect(progressIndicator.type).toBe('path');
            expect(bulletIndicator).toBeFalsy();
            expect(fractionsIndicator).toBeFalsy();
            expect(barIndicator).toBeFalsy();
        });
    });

    it('indicatorType = bullet', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.indicatorType = 'bullet';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const progressIndicator = element.shadowRoot.querySelector(
                'lightning-progress-indicator'
            );
            const bulletIndicator = element.shadowRoot.querySelector(
                '.slds-carousel__indicators'
            );
            const fractionsIndicator = element.shadowRoot.querySelector(
                '.fractions-indicator'
            );
            const barIndicator = element.shadowRoot.querySelector(
                'c-progress-bar'
            );

            const bullets = element.shadowRoot.querySelectorAll(
                '.slds-carousel__indicator > span'
            );

            expect(progressIndicator).toBeFalsy();
            expect(bulletIndicator).toBeTruthy();
            expect(bullets).toHaveLength(4);
            expect(fractionsIndicator).toBeFalsy();
            expect(barIndicator).toBeFalsy();
        });
    });

    it('indicatorType = fractions', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.indicatorType = 'fractions';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const progressIndicator = element.shadowRoot.querySelector(
                'lightning-progress-indicator'
            );
            const bulletIndicator = element.shadowRoot.querySelector(
                '.slds-carousel__indicators'
            );
            const fractionsIndicator = element.shadowRoot.querySelector(
                '.fractions-indicator'
            );
            const barIndicator = element.shadowRoot.querySelector(
                'c-progress-bar'
            );

            expect(progressIndicator).toBeFalsy();
            expect(bulletIndicator).toBeFalsy();
            expect(fractionsIndicator).toBeTruthy();
            expect(barIndicator).toBeFalsy();
        });
    });

    it('indicatorType = bar', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.indicatorType = 'bar';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const progressIndicator = element.shadowRoot.querySelector(
                'lightning-progress-indicator'
            );
            const bulletIndicator = element.shadowRoot.querySelector(
                '.slds-carousel__indicators'
            );
            const fractionsIndicator = element.shadowRoot.querySelector(
                '.fractions-indicator'
            );
            const barIndicator = element.shadowRoot.querySelector(
                'c-progress-bar'
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
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

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
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.hideIndicator = true;
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const indicator = element.shadowRoot.querySelector(
                'lightning-progress-indicator'
            );

            expect(indicator).toBeFalsy();
        });
    });

    it('hideIndicator = false', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        element.hideIndicator = false;
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const indicator = element.shadowRoot.querySelector(
                'lightning-progress-indicator'
            );

            expect(indicator).toBeTruthy();
        });
    });

    // Attributes updates after first render
    // Depends on steps, indicatorType and currentStep
    it('Attributes updated after first render', () => {
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

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
        const element = createElement('base-primitive-wizard-navigation', {
            is: PrimitiveWizardNavigation
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('change', handler);
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                'lightning-button'
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
