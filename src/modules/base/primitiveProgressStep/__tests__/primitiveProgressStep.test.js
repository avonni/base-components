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
        expect(element.buttonDisabled).toBeFalsy();
        expect(element.buttonLabel).toBeUndefined();
        expect(element.buttonName).toBeUndefined();
        expect(element.buttonIconName).toBeUndefined();
        expect(element.buttonIconPosition).toBe('left');
        expect(element.buttonVariant).toBe('neutral');
        expect(element.description).toBeUndefined();
        expect(element.descriptionPosition).toBe('top');
        expect(element.isCompleted).toBeFalsy();
        expect(element.isCurrent).toBeFalsy();
        expect(element.isDisabled).toBeFalsy();
        expect(element.isError).toBeFalsy();
        expect(element.isWarning).toBeFalsy();
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
        expect(element.variant).toBe('base');
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

    // is-completed
    it('Primitive progress step: isCompleted = false', () => {
        element.isCompleted = false;
        element.popoverLabel = 'some label';
        element.popoverIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            expect(element.classList).not.toContain('slds-is-completed');
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-step"]'
            );
            expect(icon).toBeFalsy();
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList).not.toContain(
                'avonni-progress-step__button_completed'
            );
            const popoverIcon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-popover-no-button"]'
            );
            expect(popoverIcon.variant).toBe('');
        });
    });

    it('Primitive progress step: isCompleted = false, button popover', () => {
        element.isCompleted = false;
        element.popoverLabel = 'some label';
        element.popoverVariant = 'button';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector(
                '[data-element-id="button-propover"]'
            );
            expect(popover.classList).not.toContain(
                'avonni-progress-step__popover-button-completed'
            );
            expect(popover.classList).toContain(
                'avonni-progress-step__popover-button_background-color'
            );
        });
    });

    it('Primitive progress step: isCompleted = true', () => {
        element.isCompleted = true;
        element.popoverLabel = 'some label';
        element.popoverIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            expect(element.classList).toContain('slds-is-completed');
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-step"]'
            );
            expect(icon).toBeTruthy();
            expect(icon.iconName).toBe('utility:success');
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList).toContain(
                'avonni-progress-step__button_completed'
            );
            const popoverIcon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-popover-no-button"]'
            );
            expect(popoverIcon.variant).toBe('inverse');
        });
    });

    it('Primitive progress step: isCompleted = true, button popover', () => {
        element.isCompleted = true;
        element.popoverLabel = 'some label';
        element.popoverVariant = 'button';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector(
                '[data-element-id="button-propover"]'
            );
            expect(popover.classList).toContain(
                'avonni-progress-step__popover-button-completed'
            );
            expect(popover.classList).not.toContain(
                'avonni-progress-step__popover-button_background-color'
            );
        });
    });

    // is-current
    it('Primitive progress step: isCurrent = false', () => {
        element.isCurrent = false;

        return Promise.resolve().then(() => {
            expect(element.classList).not.toContain('slds-is-active');
        });
    });

    it('Primitive progress step: isCurrent = true', () => {
        element.isCurrent = true;

        return Promise.resolve().then(() => {
            expect(element.classList).toContain('slds-is-active');
        });
    });

    // is-disabled
    it('Primitive progress step: isDisabled = false', () => {
        element.isDisabled = false;
        element.buttonLabel = 'some label';
        element.popoverVariant = 'button';
        element.popoverLabel = 'another label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            const stepButton = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            const buttonPopover = element.shadowRoot.querySelector(
                '[data-element-id="button-propover"]'
            );
            expect(stepButton.disabled).toBeFalsy();
            expect(button.disabled).toBeFalsy();
            expect(buttonPopover.disabled).toBeFalsy();
        });
    });

    it('Primitive progress step: isDisabled = true', () => {
        element.isDisabled = true;
        element.buttonLabel = 'some label';
        element.popoverVariant = 'button';
        element.popoverLabel = 'another label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            const stepButton = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            const buttonPopover = element.shadowRoot.querySelector(
                '[data-element-id="button-propover"]'
            );
            expect(stepButton.disabled).toBeTruthy();
            expect(button.disabled).toBeTruthy();
            expect(buttonPopover.disabled).toBeTruthy();
        });
    });

    // is-error
    it('Primitive progress step: isError = false', () => {
        element.isError = false;
        element.popoverIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            expect(element.classList).not.toContain('slds-has-error');
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList).not.toContain(
                'avonni-progress-step__button_error'
            );
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-step"]'
            );
            expect(icon).toBeFalsy();
        });
    });

    it('Primitive progress step: isError = true', () => {
        element.isError = true;
        element.popoverIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            expect(element.classList).toContain('slds-has-error');
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList).toContain(
                'avonni-progress-step__button_error'
            );
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-step"]'
            );
            expect(icon).toBeTruthy();
            expect(icon.iconName).toBe('utility:error');
        });
    });

    // is-warning
    it('Primitive progress step: isWarning = false', () => {
        element.isWarning = false;
        element.popoverIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            expect(element.classList).not.toContain('slds-has-warning');
            expect(element.classList).not.toContain('slds-has-warning-shaded');
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList).not.toContain(
                'avonni-progress-step__button_warning'
            );
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-step"]'
            );
            expect(icon).toBeFalsy();
        });
    });

    it('Primitive progress step: isWarning = false, shaded variant', () => {
        element.isWarning = false;
        element.variant = 'shaded';

        return Promise.resolve().then(() => {
            expect(element.classList).not.toContain('slds-has-warning');
            expect(element.classList).not.toContain('slds-has-warning-shaded');
        });
    });

    it('Primitive progress step: isWarning = true', () => {
        element.isWarning = true;
        element.popoverIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            expect(element.classList).toContain('slds-has-warning');
            expect(element.classList).not.toContain('slds-has-warning-shaded');
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button"]'
            );
            expect(button.classList).toContain(
                'avonni-progress-step__button_warning'
            );
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-icon-step"]'
            );
            expect(icon).toBeTruthy();
            expect(icon.iconName).toBe('utility:warning');
        });
    });

    it('Primitive progress step: isWarning = true, shaded variant', () => {
        element.isWarning = true;
        element.variant = 'shaded';

        return Promise.resolve().then(() => {
            expect(element.classList).not.toContain('slds-has-warning');
            expect(element.classList).toContain('slds-has-warning-shaded');
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
            expect(handler.mock.calls[0][0].detail.value).toBe('1');
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
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
            expect(handler.mock.calls[0][0].detail.value).toBe('1');
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
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
            expect(handler.mock.calls[0][0].detail.value).toBe('1');
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
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
            expect(handler.mock.calls[0][0].detail.value).toBe('1');
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
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
            expect(handler.mock.calls[0][0].detail.value).toBe('1');
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
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
            expect(handler.mock.calls[0][0].detail.value).toBe('1');
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
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
            expect(handler.mock.calls[0][0].detail.value).toBe('1');
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });
});
