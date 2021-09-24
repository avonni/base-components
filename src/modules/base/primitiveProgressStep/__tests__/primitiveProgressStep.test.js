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
import PrimitiveProgressStep from 'c/primitiveProgressStep';

describe('PrimitiveProgressStep', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        expect(element.assistiveText).toBeUndefined();
        expect(element.buttonLabel).toBeUndefined();
        expect(element.buttonName).toBeUndefined();
        expect(element.buttonIconName).toBeUndefined();
        expect(element.buttonIconPosition).toBe('left');
        expect(element.buttonDisabled).toBeFalsy();
        expect(element.buttonTitle).toBeUndefined();
        expect(element.buttonVariant).toBe('neutral');
        expect(element.completedSteps).toMatchObject([]);
        expect(element.description).toBeUndefined();
        expect(element.descriptionPosition).toBe('top');
        expect(element.disabledSteps).toMatchObject([]);
        expect(element.label).toBeUndefined();
        expect(element.labelPosition).toBe('top');
        expect(element.popoverDescription).toBeUndefined();
        expect(element.popoverHidden).toBeFalsy();
        expect(element.popoverIconName).toBeUndefined();
        expect(element.popoverIconNameWhenHover).toBeUndefined();
        expect(element.popoverIconSrc).toBeUndefined();
        expect(element.popoverIconSrcWhenHover).toBeUndefined();
        expect(element.popoverLabel).toBeUndefined();
        expect(element.popoverRatio).toBe('1-by-1');
        expect(element.popoverSize).toBe('medium');
        expect(element.popoverVariant).toBe('base');
        expect(element.value).toBeUndefined();
        expect(element.warningSteps).toBeUndefined();
    });

    // assistive-text
    it('assistiveText', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.assistiveText = 'A string help';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            expect(span.textContent).toBe('A string help');
        });
    });

    // button-label
    it('buttonLabel', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');
            expect(button.label).toBe('A string label');
        });
    });

    // button-name
    // Depends on buttonLabel
    it('buttonName', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.buttonName = 'a-string-name';
        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');
            expect(button.name).toBe('a-string-name');
        });
    });

    // button-icon-name
    // Depends on buttonLabel
    it('buttonIconName', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.buttonIconName = 'utility:apps';
        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');
            expect(button.iconName).toBe('utility:apps');
        });
    });

    // button-icon-position
    // Depends on buttonLabel
    it('buttonIconPosition', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.buttonIconPosition = 'right';
        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');
            expect(button.iconPosition).toBe('right');
        });
    });

    // button-disabled
    // Depends on buttonLabel
    it('buttonDisabled', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.buttonDisabled = true;
        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');
            expect(button.disabled).toBeTruthy();
        });
    });

    // button-title
    // Depends on buttonLabel
    it('buttonTitle', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.buttonTitle = 'A string title';
        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');
            expect(button.title).toBe('A string title');
        });
    });

    // button-variant
    // Depends on buttonLabel
    it('buttonVariant', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.buttonVariant = 'destructive';
        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('[data-element-id="lightning-button"]');
            expect(button.variant).toBe('destructive');
        });
    });

    // completed-steps
    // Depends on value and popoverLabel
    it('completedSteps includes this step', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.completedSteps = ['3', '4'];
        element.value = '3';
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.classList).toContain(
                'avonni-progress-step-popover-completed'
            );
        });
    });

    it('completedSteps excludes this step', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.completedSteps = ['3', '4'];
        element.value = '18';
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.classList).not.toContain(
                'avonni-progress-step-popover-completed'
            );
        });
    });

    // description
    it('description', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.description = 'A string description';

        return Promise.resolve().then(() => {
            const description = element.shadowRoot.querySelector(
                '[data-element-id="p-top-description"]'
            );
            expect(description.textContent).toBe('A string description');
        });
    });

    // description-position
    // Depends on description
    it('descriptionPosition = top', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.description = 'A string description';
        element.descriptionPosition = 'top';

        return Promise.resolve().then(() => {
            const descriptionTop = element.shadowRoot.querySelector(
                '[data-element-id="p-top-description"]'
            );
            const descriptionBottom = element.shadowRoot.querySelector(
                '[data-element-id="p-bottom-description"]'
            );

            expect(descriptionTop).toBeTruthy();
            expect(descriptionBottom).toBeFalsy();
        });
    });

    it('descriptionPosition = bottom', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.description = 'A string description';
        element.descriptionPosition = 'bottom';

        return Promise.resolve().then(() => {
            const descriptionTop = element.shadowRoot.querySelector(
                '[data-element-id="p-top-description"]'
            );
            const descriptionBottom = element.shadowRoot.querySelector(
                '[data-element-id="p-bottom-description"]'
            );

            expect(descriptionTop).toBeFalsy();
            expect(descriptionBottom).toBeTruthy();
        });
    });

    // disabled-steps
    // Depends on value and buttonLabel
    it('disabledSteps includes this step', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.value = '5';
        element.disabledSteps = ['2', '5', '12'];
        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('[data-element-id="button"]');
            const lightningButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );

            buttons.forEach((button) => {
                expect(button.disabled).toBeTruthy();
            });

            expect(lightningButton.disabled).toBeTruthy();
        });
    });

    it('disabledSteps excludes this step', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.value = '5';
        element.disabledSteps = ['2', '8', '12'];
        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('[data-element-id="button"]');
            const lightningButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );

            buttons.forEach((button) => {
                expect(button.disabled).toBeFalsy();
            });

            expect(lightningButton.disabled).toBeFalsy();
        });
    });

    // label
    it('label', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="p-top-label"]'
            );

            expect(label.textContent).toBe('A string label');
        });
    });

    // label-position
    // Depends on label
    it('label-position = top', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.label = 'A string label';
        element.labelPosition = 'top';

        return Promise.resolve().then(() => {
            const labelTop = element.shadowRoot.querySelector(
                '[data-element-id="p-top-label"]'
            );
            const labelBottom = element.shadowRoot.querySelector(
                '[data-element-id="p-bottom-label"]'
            );

            expect(labelTop).toBeTruthy();
            expect(labelBottom).toBeFalsy();
        });
    });

    it('label-position = bottom', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.label = 'A string label';
        element.labelPosition = 'bottom';

        return Promise.resolve().then(() => {
            const labelTop = element.shadowRoot.querySelector(
                '[data-element-id="p-top-label"]'
            );
            const labelBottom = element.shadowRoot.querySelector(
                '[data-element-id="p-bottom-label"]'
            );

            expect(labelTop).toBeFalsy();
            expect(labelBottom).toBeTruthy();
        });
    });

    // popover-description
    it('popoverDescription', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.popoverDescription = 'A string description';

        return Promise.resolve().then(() => {
            const description = element.shadowRoot.querySelector(
                '[data-element-id="p-popover-description"]'
            );
            expect(description.textContent).toBe('A string description');
        });
    });

    // popover-hidden
    // Depends on popoverLabel
    it('popoverHidden = false', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.popoverHidden = false;
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover).toBeTruthy();
        });
    });

    it('popoverHidden = true', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.popoverHidden = true;
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover).toBeFalsy();
        });
    });

    // popover-icon-name
    it('popoverIconName', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.popoverIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-popover-no-button"]'
            );
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // popover-icon-name-when-hover
    // Depends on popoverVariant and popoverIconName
    it('popoverIconNameWhenHover', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.popoverIconNameWhenHover = 'utility:apps';
        element.popoverIconName = 'utility:user';
        element.popoverVariant = 'button';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-popover-hover"]'
            );
            expect(icon.iconName).toBe('utility:apps');
        });
    });

    // popover-icon-src
    it('popoverIconSrc', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.popoverIconSrc =
            '/assets/icons/standard-sprite/svg/test.svg#icon-heart';
        element.popoverIconName = 'utility:user';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-popover-no-button"]'
            );
            expect(icon.src).toBe(
                '/assets/icons/standard-sprite/svg/test.svg#icon-heart'
            );
        });
    });

    // popover-icon-src-when-hover
    // Depends on popoverVariant and popoverIconName
    it('popoverIconSrcWhenHover', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.popoverIconSrcWhenHover =
            '/assets/icons/standard-sprite/svg/test.svg#icon-heart';
        element.popoverIconName = 'utility:user';
        element.popoverVariant = 'button';

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-popover-hover"]'
            );
            expect(icon.src).toBe(
                '/assets/icons/standard-sprite/svg/test.svg#icon-heart'
            );
        });
    });

    // popover-label
    it('popoverLabel', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="p-popover-label"]'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // popover-ratio
    // Depends on popoverLabel
    it('popoverRatio = 1-by-1', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.popoverRatio = '1-by-1';
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.ratio-1-by-1');
            expect(popover).toBeTruthy();
        });
    });

    it('popoverRatio = 4-by-3', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.popoverRatio = '4-by-3';
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.ratio-4-by-3');
            expect(popover).toBeTruthy();
        });
    });

    it('popoverRatio = 16-by-9', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.popoverRatio = '16-by-9';
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.ratio-16-by-9');
            expect(popover).toBeTruthy();
        });
    });

    it('popoverRatio is not in the valid list', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.popoverRatio = 'Not a valid entry';
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.ratio-1-by-1');
            expect(popover).toBeTruthy();
        });
    });

    // popover-size
    // Depends on popoverLabel and popoverIconName
    it('popoverSize = small', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.popoverSize = 'small';
        element.popoverLabel = 'A string label';
        element.popoverIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const popoverSmall = element.shadowRoot.querySelector(
                '.avonni-progress-step-popover_small'
            );
            const popoverMedium = element.shadowRoot.querySelector(
                '.avonni-progress-step-popover_medium'
            );
            const popoverLarge = element.shadowRoot.querySelector(
                '.avonni-progress-step-popover_large'
            );
            const popoverIcon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-popover-no-button"]'
            );

            expect(popoverIcon.size).toBe('small');
            expect(popoverSmall).toBeTruthy();
            expect(popoverMedium || popoverLarge).toBeFalsy();
        });
    });

    it('popoverSize = medium', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.popoverSize = 'medium';
        element.popoverLabel = 'A string label';
        element.popoverIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const popoverSmall = element.shadowRoot.querySelector(
                '.avonni-progress-step-popover_small'
            );
            const popoverMedium = element.shadowRoot.querySelector(
                '.avonni-progress-step-popover_medium'
            );
            const popoverLarge = element.shadowRoot.querySelector(
                '.avonni-progress-step-popover_large'
            );
            const popoverIcon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-popover-no-button"]'
            );

            expect(popoverIcon.size).toBe('medium');
            expect(popoverMedium).toBeTruthy();
            expect(popoverSmall || popoverLarge).toBeFalsy();
        });
    });

    it('popoverSize = large', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.popoverSize = 'large';
        element.popoverLabel = 'A string label';
        element.popoverIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const popoverSmall = element.shadowRoot.querySelector(
                '.avonni-progress-step-popover_small'
            );
            const popoverMedium = element.shadowRoot.querySelector(
                '.avonni-progress-step-popover_medium'
            );
            const popoverLarge = element.shadowRoot.querySelector(
                '.avonni-progress-step-popover_large'
            );
            const popoverIcon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-popover-no-button"]'
            );

            expect(popoverIcon.size).toBe('large');
            expect(popoverLarge).toBeTruthy();
            expect(popoverSmall || popoverMedium).toBeFalsy();
        });
    });

    // popoverVariant
    // Depends on popoverLabel
    it('popoverVariant = base', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.popoverVariant = 'base';
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.classList).not.toContain(
                'avonni-progress-step-popover-button'
            );
        });
    });

    it('popoverVariant = button', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.popoverVariant = 'button';
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.classList).toContain(
                'avonni-progress-step-popover-button'
            );
        });
    });

    // waring-steps
    // Depends on value and setIcon
    it('warningSteps', () => {
        const element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });

        document.body.appendChild(element);

        element.warningSteps = ['2', '3', '12'];
        element.value = '3';
        element.setIcon('utility:apps');

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-step"]'
            );
            expect(icon.variant).toBe('warning');
        });
    });
});
