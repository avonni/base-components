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

    describe('Attributes', () => {
        it('Default attributes', () => {
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

        describe('assistiveText', () => {
            it('Passed to the component', () => {
                element.assistiveText = 'A string help';

                return Promise.resolve().then(() => {
                    const span = element.shadowRoot.querySelector(
                        '.slds-assistive-text'
                    );
                    expect(span.textContent).toBe('A string help');
                });
            });
        });

        describe('buttonLabel', () => {
            it('Passed to the component', () => {
                element.buttonLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.label).toBe('A string label');
                });
            });
        });

        describe('buttonName', () => {
            it('Passed to the component', () => {
                element.buttonName = 'a-string-name';
                element.buttonLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.name).toBe('a-string-name');
                });
            });
        });

        describe('buttonIconName', () => {
            it('Passed to the component', () => {
                element.buttonIconName = 'utility:apps';
                element.buttonLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.iconName).toBe('utility:apps');
                });
            });
        });

        describe('buttonIconPosition', () => {
            it('Passed to the component', () => {
                element.buttonIconPosition = 'right';
                element.buttonLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.iconPosition).toBe('right');
                });
            });
        });

        describe('buttonDisabled', () => {
            it('Passed to the component', () => {
                element.buttonDisabled = true;
                element.buttonLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.disabled).toBeTruthy();
                });
            });
        });

        describe('buttonVariant', () => {
            it('Passed to the component', () => {
                element.buttonVariant = 'destructive';
                element.buttonLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.variant).toBe('destructive');
                });
            });
        });

        describe('description', () => {
            it('Passed to the component', () => {
                element.description = 'A string description';

                return Promise.resolve().then(() => {
                    const description = element.shadowRoot.querySelector(
                        '[data-element-id="p-top-description"]'
                    );
                    expect(description.textContent).toBe(
                        'A string description'
                    );
                });
            });
        });

        describe('descriptionPosition', () => {
            it('top', () => {
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

            it('bottom', () => {
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
        });

        describe('isCompleted', () => {
            it('false', () => {
                element.isCompleted = false;
                element.popoverLabel = 'some label';
                element.popoverIconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    expect(element.classList).not.toContain(
                        'slds-is-completed'
                    );
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

            it('false, button popover', () => {
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

            it('true', () => {
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

            it('true, button popover', () => {
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
        });

        describe('isCurrent', () => {
            it('false', () => {
                element.isCurrent = false;

                return Promise.resolve().then(() => {
                    expect(element.classList).not.toContain('slds-is-active');
                });
            });

            it('true', () => {
                element.isCurrent = true;

                return Promise.resolve().then(() => {
                    expect(element.classList).toContain('slds-is-active');
                });
            });
        });

        describe('isDisabled', () => {
            it('false', () => {
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

            it('true', () => {
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
        });

        describe('isError', () => {
            it('false', () => {
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

            it('true', () => {
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
        });

        describe('isWarning', () => {
            it('false', () => {
                element.isWarning = false;
                element.popoverIconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    expect(element.classList).not.toContain('slds-has-warning');
                    expect(element.classList).not.toContain(
                        'slds-has-warning-shaded'
                    );
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

            it('false, shaded variant', () => {
                element.isWarning = false;
                element.variant = 'shaded';

                return Promise.resolve().then(() => {
                    expect(element.classList).not.toContain('slds-has-warning');
                    expect(element.classList).not.toContain(
                        'slds-has-warning-shaded'
                    );
                });
            });

            it('true', () => {
                element.isWarning = true;
                element.popoverIconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    expect(element.classList).toContain('slds-has-warning');
                    expect(element.classList).not.toContain(
                        'slds-has-warning-shaded'
                    );
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

            it('true, shaded variant', () => {
                element.isWarning = true;
                element.variant = 'shaded';

                return Promise.resolve().then(() => {
                    expect(element.classList).not.toContain('slds-has-warning');
                    expect(element.classList).toContain(
                        'slds-has-warning-shaded'
                    );
                });
            });
        });

        describe('label', () => {
            it('Passed to the component', () => {
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="p-top-label"]'
                    );

                    expect(label.textContent).toBe('A string label');
                });
            });
        });

        describe('labelPosition', () => {
            it('top', () => {
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

            it('bottom', () => {
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
        });

        describe('popoverDescription', () => {
            it('Passed to the component', () => {
                element.popoverDescription = 'A string description';

                return Promise.resolve().then(() => {
                    const description = element.shadowRoot.querySelector(
                        '[data-element-id="p-popover-description"]'
                    );
                    expect(description.textContent).toBe(
                        'A string description'
                    );
                });
            });
        });

        describe('popoverHidden', () => {
            it('false', () => {
                element.popoverHidden = false;
                element.popoverLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const popover =
                        element.shadowRoot.querySelector('.slds-popover');
                    expect(popover).toBeTruthy();
                });
            });

            it('true', () => {
                element.popoverHidden = true;
                element.popoverLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const popover =
                        element.shadowRoot.querySelector('.slds-popover');
                    expect(popover).toBeFalsy();
                });
            });
        });

        describe('popoverIconName', () => {
            it('Passed to the component', () => {
                element.popoverIconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-icon-popover-no-button"]'
                    );
                    expect(icon.iconName).toBe('utility:apps');
                });
            });
        });

        describe('popoverIconNameWhenHover', () => {
            it('Passed to the component', () => {
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
        });

        describe('popoverIconSrc', () => {
            it('Passed to the component', () => {
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
        });

        describe('popoverIconSrcWhenHover', () => {
            it('Passed to the component', () => {
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
        });

        describe('popoverLabel', () => {
            it('Passed to the component', () => {
                element.popoverLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="p-popover-label"]'
                    );
                    expect(label.textContent).toBe('A string label');
                });
            });
        });

        describe('popoverRatio', () => {
            it('1-by-1', () => {
                element.popoverRatio = '1-by-1';
                element.popoverLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const popover =
                        element.shadowRoot.querySelector('.ratio-1-by-1');
                    expect(popover).toBeTruthy();
                });
            });

            it('4-by-3', () => {
                element.popoverRatio = '4-by-3';
                element.popoverLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const popover =
                        element.shadowRoot.querySelector('.ratio-4-by-3');
                    expect(popover).toBeTruthy();
                });
            });

            it('16-by-9', () => {
                element.popoverRatio = '16-by-9';
                element.popoverLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const popover =
                        element.shadowRoot.querySelector('.ratio-16-by-9');
                    expect(popover).toBeTruthy();
                });
            });

            it('popoverRatio is not in the valid list', () => {
                element.popoverRatio = 'Not a valid entry';
                element.popoverLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const popover =
                        element.shadowRoot.querySelector('.ratio-1-by-1');
                    expect(popover).toBeTruthy();
                });
            });
        });

        describe('popoverSize', () => {
            it('small', () => {
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

            it('medium', () => {
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

            it('large', () => {
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
        });

        describe('popoverVariant', () => {
            it('base', () => {
                element.popoverVariant = 'base';
                element.popoverLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const popover =
                        element.shadowRoot.querySelector('.slds-popover');
                    expect(popover.classList).not.toContain(
                        'avonni-progress-step__popover-button'
                    );
                });
            });

            it('button', () => {
                element.popoverVariant = 'button';
                element.popoverLabel = 'A string label';

                return Promise.resolve().then(() => {
                    const popover =
                        element.shadowRoot.querySelector('.slds-popover');
                    expect(popover.classList).toContain(
                        'avonni-progress-step__popover-button'
                    );
                });
            });
        });
    });

    describe('Events', () => {
        it('step click', () => {
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

        it('step mouseenter', () => {
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

        it('step mouseleave', () => {
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

        it('step focus', () => {
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

        it('step blur', () => {
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

        it('popover click', () => {
            element.value = '1';
            const handler = jest.fn();
            element.popoverHidden = false;
            element.popoverLabel = 'A string label';
            element.addEventListener('steppopoverclick', handler);

            return Promise.resolve().then(() => {
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                popover.dispatchEvent(new CustomEvent('click'));

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.value).toBe('1');
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });

        it('button click', () => {
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
});
