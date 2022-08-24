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

let element;
describe('PrimitiveProgressStep', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-progress-step', {
            is: PrimitiveProgressStep
        });
        document.body.appendChild(element);
    });

    it('Primitive progress step: Default attributes', () => {
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
    it('Primitive progress step: assistiveText', () => {
        element.assistiveText = 'A string help';

        return Promise.resolve().then(() => {
            const span = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            expect(span.textContent).toBe('A string help');
        });
    });

    // button-label
    it('Primitive progress step: buttonLabel', () => {
        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.label).toBe('A string label');
        });
    });

    // button-name
    // Depends on buttonLabel
    it('Primitive progress step: buttonName', () => {
        element.buttonName = 'a-string-name';
        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.name).toBe('a-string-name');
        });
    });

    // button-icon-name
    // Depends on buttonLabel
    it('Primitive progress step: buttonIconName', () => {
        element.buttonIconName = 'utility:apps';
        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.iconName).toBe('utility:apps');
        });
    });

    // button-icon-position
    // Depends on buttonLabel
    it('Primitive progress step: buttonIconPosition', () => {
        element.buttonIconPosition = 'right';
        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.iconPosition).toBe('right');
        });
    });

    // button-disabled
    // Depends on buttonLabel
    it('Primitive progress step: buttonDisabled', () => {
        element.buttonDisabled = true;
        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.disabled).toBeTruthy();
        });
    });

    // button-title
    // Depends on buttonLabel
    it('Primitive progress step: buttonTitle', () => {
        element.buttonTitle = 'A string title';
        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.title).toBe('A string title');
        });
    });

    // button-variant
    // Depends on buttonLabel
    it('Primitive progress step: buttonVariant', () => {
        element.buttonVariant = 'destructive';
        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.variant).toBe('destructive');
        });
    });

    // completed-steps
    // Depends on value and popoverLabel
    it('Primitive progress step: completedSteps includes this step', () => {
        element.completedSteps = ['3', '4'];
        element.value = '3';
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.classList).toContain(
                'avonni-progress-step__popover-completed'
            );
        });
    });

    it('Primitive progress step: completedSteps excludes this step', () => {
        element.completedSteps = ['3', '4'];
        element.value = '18';
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.classList).not.toContain(
                'avonni-progress-step__popover-completed'
            );
        });
    });

    // description
    it('Primitive progress step: description', () => {
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
    it('Primitive progress step: descriptionPosition = top', () => {
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

    it('Primitive progress step: descriptionPosition = bottom', () => {
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
    it('Primitive progress step: disabledSteps includes this step', () => {
        element.value = '5';
        element.disabledSteps = ['2', '5', '12'];
        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="button"]'
            );
            const lightningButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );

            buttons.forEach((button) => {
                expect(button.disabled).toBeTruthy();
            });

            expect(lightningButton.disabled).toBeTruthy();
        });
    });

    it('Primitive progress step: disabledSteps excludes this step', () => {
        element.value = '5';
        element.disabledSteps = ['2', '8', '12'];
        element.buttonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="button"]'
            );
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
    it('Primitive progress step: label', () => {
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
    it('Primitive progress step: label-position = top', () => {
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

    it('Primitive progress step: label-position = bottom', () => {
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
    it('Primitive progress step: popoverDescription', () => {
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
    it('Primitive progress step: popoverHidden = false', () => {
        element.popoverHidden = false;
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover).toBeTruthy();
        });
    });

    it('Primitive progress step: popoverHidden = true', () => {
        element.popoverHidden = true;
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover).toBeFalsy();
        });
    });

    // popover-icon-name
    it('Primitive progress step: popoverIconName', () => {
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
    it('Primitive progress step: popoverIconNameWhenHover', () => {
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
    it('Primitive progress step: popoverIconSrc', () => {
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
    it('Primitive progress step: popoverIconSrcWhenHover', () => {
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
    it('Primitive progress step: popoverLabel', () => {
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
    it('Primitive progress step: popoverRatio = 1-by-1', () => {
        element.popoverRatio = '1-by-1';
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.ratio-1-by-1');
            expect(popover).toBeTruthy();
        });
    });

    it('Primitive progress step: popoverRatio = 4-by-3', () => {
        element.popoverRatio = '4-by-3';
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.ratio-4-by-3');
            expect(popover).toBeTruthy();
        });
    });

    it('Primitive progress step: popoverRatio = 16-by-9', () => {
        element.popoverRatio = '16-by-9';
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.ratio-16-by-9');
            expect(popover).toBeTruthy();
        });
    });

    it('Primitive progress step: popoverRatio is not in the valid list', () => {
        element.popoverRatio = 'Not a valid entry';
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.ratio-1-by-1');
            expect(popover).toBeTruthy();
        });
    });

    // popover-size
    // Depends on popoverLabel and popoverIconName
    it('Primitive progress step: popoverSize = small', () => {
        element.popoverSize = 'small';
        element.popoverLabel = 'A string label';
        element.popoverIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const popoverSmall = element.shadowRoot.querySelector(
                '.avonni-progress-step__popover_size-small'
            );
            const popoverMedium = element.shadowRoot.querySelector(
                '.avonni-progress-step__popover_size-medium'
            );
            const popoverLarge = element.shadowRoot.querySelector(
                '.avonni-progress-step__popover_size-large'
            );
            const popoverIcon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-popover-no-button"]'
            );

            expect(popoverIcon.size).toBe('small');
            expect(popoverSmall).toBeTruthy();
            expect(popoverMedium || popoverLarge).toBeFalsy();
        });
    });

    it('Primitive progress step: popoverSize = medium', () => {
        element.popoverSize = 'medium';
        element.popoverLabel = 'A string label';
        element.popoverIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const popoverSmall = element.shadowRoot.querySelector(
                '.avonni-progress-step__popover_size-small'
            );
            const popoverMedium = element.shadowRoot.querySelector(
                '.avonni-progress-step__popover_size-medium'
            );
            const popoverLarge = element.shadowRoot.querySelector(
                '.avonni-progress-step__popover_size-large'
            );
            const popoverIcon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-popover-no-button"]'
            );

            expect(popoverIcon.size).toBe('medium');
            expect(popoverMedium).toBeTruthy();
            expect(popoverSmall || popoverLarge).toBeFalsy();
        });
    });

    it('Primitive progress step: popoverSize = large', () => {
        element.popoverSize = 'large';
        element.popoverLabel = 'A string label';
        element.popoverIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const popoverSmall = element.shadowRoot.querySelector(
                '.avonni-progress-step__popover_size-small'
            );
            const popoverMedium = element.shadowRoot.querySelector(
                '.avonni-progress-step__popover_size-medium'
            );
            const popoverLarge = element.shadowRoot.querySelector(
                '.avonni-progress-step__popover_size-large'
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
    it('Primitive progress step: popoverVariant = base', () => {
        element.popoverVariant = 'base';
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.classList).not.toContain(
                'avonni-progress-step__popover-button'
            );
        });
    });

    it('Primitive progress step: popoverVariant = button', () => {
        element.popoverVariant = 'button';
        element.popoverLabel = 'A string label';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.classList).toContain(
                'avonni-progress-step__popover-button'
            );
        });
    });

    // waring-steps
    // Depends on value and setIcon
    it('Primitive progress step: warningSteps', () => {
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

    /* ----- EVENTS ----- */
    it('Primitive progress step: step click', () => {
        const handler = jest.fn();
        element.value = '1';
        element.addEventListener('stepclick', handler);

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            button.dispatchEvent(new CustomEvent('click'));

            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.value).toBe('1');
            expect(call.bubbles).toBeTruthy();
            expect(call.composed).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
        });
    });

    it('Primitive progress step: step mouseenter', () => {
        element.value = '1';
        const handler = jest.fn();
        element.addEventListener('stepmouseenter', handler);

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            button.dispatchEvent(new CustomEvent('mouseenter'));

            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.value).toBe('1');
            expect(call.bubbles).toBeTruthy();
            expect(call.composed).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
        });
    });

    it('Primitive progress step: step mouseleave', () => {
        element.value = '1';
        const handler = jest.fn();
        element.addEventListener('stepmouseleave', handler);

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            button.dispatchEvent(new CustomEvent('mouseleave'));

            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.value).toBe('1');
            expect(call.bubbles).toBeTruthy();
            expect(call.composed).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
        });
    });

    it('Primitive progress step: step focus', () => {
        element.value = '1';
        const handler = jest.fn();
        element.addEventListener('stepfocus', handler);

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            button.dispatchEvent(new CustomEvent('focus'));

            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.value).toBe('1');
            expect(call.bubbles).toBeTruthy();
            expect(call.composed).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
        });
    });

    it('Primitive progress step: step blur', () => {
        element.value = '1';
        const handler = jest.fn();
        element.addEventListener('stepblur', handler);

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            button.dispatchEvent(new CustomEvent('blur'));

            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.value).toBe('1');
            expect(call.bubbles).toBeTruthy();
            expect(call.composed).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
        });
    });

    it('Primitive progress step: popover click', () => {
        element.value = '1';
        const handler = jest.fn();
        element.popoverHidden = false;
        element.popoverLabel = 'A string label';
        element.addEventListener('steppopoverclick', handler);

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            popover.dispatchEvent(new CustomEvent('click'));

            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.value).toBe('1');
            expect(call.bubbles).toBeTruthy();
            expect(call.composed).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
        });
    });

    it('Primitive progress step: button click', () => {
        element.value = '1';
        const handler = jest.fn();
        element.buttonLabel = 'A string label';
        element.addEventListener('stepbuttonclick', handler);

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            button.dispatchEvent(new CustomEvent('click'));

            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.value).toBe('1');
            expect(call.bubbles).toBeTruthy();
            expect(call.composed).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
        });
    });
});
