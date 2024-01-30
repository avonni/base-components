import { createElement } from 'lwc';
import ProgressIndicator from 'c/progressIndicator';

const STEPS = [
    {
        assistiveText: 'This is step 1',
        label: 'Step 1',
        labelPosition: 'top',
        description: 'Some description for step 1',
        descriptionPosition: 'bottom',
        value: 'step-1',
        buttonLabel: 'Step 1 button',
        buttonName: 'step-1-button',
        buttonIconName: 'utility:apps',
        buttonIconPosition: 'right',
        buttonDisabled: true,
        buttonVariant: 'brand',
        popoverVariant: 'button',
        popoverIconName: 'standard:user',
        popoverIconSrc: '/assets/fakeicon.ico',
        popoverIconNameWhenHover: 'standard:address',
        popoverIconSrcWhenHover: '/assets/fakeicon2.ico',
        popoverSize: 'large',
        popoverRatio: '16-by-9',
        popoverLabel: 'Popover 1',
        popoverDescription: 'Some description for the popover',
        popoverHidden: true
    },
    {
        assistiveText: 'This is step 2',
        label: 'Step 2',
        description: 'Some description for step 2',
        descriptionPosition: 'bottom',
        value: 'step-2',
        buttonLabel: 'Step 2 button',
        buttonName: 'step-2-button',
        buttonVariant: 'destructive'
    },
    {
        label: 'Step 3',
        value: 'step-3'
    },
    {
        assistiveText: 'This is step 4',
        label: 'Step 4',
        labelPosition: 'bottom',
        description: 'Some description for step 4',
        descriptionPosition: 'bottom',
        value: 'step-4',
        popoverIconName: 'standard:user',
        popoverIconNameWhenHover: 'standard:address',
        popoverSize: 'large',
        popoverRatio: '4-by-3',
        popoverLabel: 'Popover 4'
    }
];

const STEPS_NAMES = ['step-2', 'step-3'];

let element;
describe('Progress Indicator', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-progress-indicator', {
            is: ProgressIndicator
        });
        document.body.appendChild(element);
    });

    it('Progress Indicator: Default attributes', () => {
        expect(element.completedSteps).toMatchObject([]);
        expect(element.currentStep).toBeUndefined();
        expect(element.disabledSteps).toMatchObject([]);
        expect(element.errorSteps).toMatchObject([]);
        expect(element.steps).toMatchObject([]);
        expect(element.variant).toBe('base');
        expect(element.warningSteps).toMatchObject([]);
    });

    /* ----- ATTRIBUTES ----- */

    // completed-steps
    // Depends on steps
    it('Progress Indicator: completed steps', () => {
        element.steps = STEPS;
        element.completedSteps = STEPS_NAMES;

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-progress-step"]'
            );
            [1, 2].forEach((i) => {
                expect(primitives[i].isCompleted).toBeTruthy();
            });
            [0, 3].forEach((i) => {
                expect(primitives[i].isCompleted).toBeFalsy();
            });
        });
    });

    // current-step
    // Depends on steps
    it('Progress Indicator: current step', () => {
        element.steps = STEPS;
        element.currentStep = 'step-2';

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-progress-step"]'
            );
            [0, 2, 3].forEach((i) => {
                expect(primitives[i].isCurrent).toBeFalsy();
            });
            expect(primitives[1].isCurrent).toBeTruthy();
        });
    });

    // disabled-steps
    // Depends on steps
    it('Progress Indicator: disabled steps', () => {
        element.steps = STEPS;
        element.disabledSteps = STEPS_NAMES;

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-progress-step"]'
            );
            [1, 2].forEach((i) => {
                expect(primitives[i].isDisabled).toBeTruthy();
            });
            [0, 3].forEach((i) => {
                expect(primitives[i].isDisabled).toBeFalsy();
            });
        });
    });

    // error-steps
    // Depends on steps
    it('Progress Indicator: error steps', () => {
        element.steps = STEPS;
        element.errorSteps = STEPS_NAMES;

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-progress-step"]'
            );

            [1, 2].forEach((i) => {
                expect(primitives[i].isError).toBeTruthy();
            });
            [0, 3].forEach((i) => {
                expect(primitives[i].isError).toBeFalsy();
            });
        });
    });

    // steps
    it('Progress Indicator: steps', () => {
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-progress-step"]'
            );

            expect(primitives).toHaveLength(4);

            primitives.forEach((primitive, index) => {
                expect(primitive.label).toBe(STEPS[index].label);
                expect(primitive.labelPosition).toBe(
                    STEPS[index].labelPosition || 'top'
                );
                expect(primitive.description).toBe(STEPS[index].description);
                expect(primitive.descriptionPosition).toBe(
                    STEPS[index].descriptionPosition || 'top'
                );
                expect(primitive.value).toBe(STEPS[index].value);
                expect(primitive.buttonLabel).toBe(STEPS[index].buttonLabel);
                expect(primitive.buttonName).toBe(STEPS[index].buttonName);
                expect(primitive.buttonIconName).toBe(
                    STEPS[index].buttonIconName
                );
                expect(primitive.buttonIconPosition).toBe(
                    STEPS[index].buttonIconPosition || 'left'
                );
                expect(primitive.buttonDisabled).toBe(
                    STEPS[index].buttonDisabled || false
                );
                expect(primitive.buttonVariant).toBe(
                    STEPS[index].buttonVariant || 'neutral'
                );
                expect(primitive.popoverVariant).toBe(
                    STEPS[index].popoverVariant || 'base'
                );
                expect(primitive.popoverIconName).toBe(
                    STEPS[index].popoverIconName
                );
                expect(primitive.popoverIconSrc).toBe(
                    STEPS[index].popoverIconSrc
                );
                expect(primitive.popoverIconNameWhenHover).toBe(
                    STEPS[index].popoverIconNameWhenHover
                );
                expect(primitive.popoverIconSrcWhenHover).toBe(
                    STEPS[index].popoverIconSrcWhenHover
                );
                expect(primitive.popoverSize).toBe(
                    STEPS[index].popoverSize || 'medium'
                );
                expect(primitive.popoverRatio).toBe(
                    STEPS[index].popoverRatio || '1-by-1'
                );
                expect(primitive.popoverLabel).toBe(STEPS[index].popoverLabel);
                expect(primitive.popoverDescription).toBe(
                    STEPS[index].popoverDescription
                );
                expect(primitive.popoverHidden).toBe(
                    STEPS[index].popoverHidden || false
                );
                expect(primitive.assistiveText).toBe(
                    STEPS[index].assistiveText
                );
            });
        });
    });

    // variant
    it('Progress Indicator: variant = base', () => {
        element.variant = 'base';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.classList).not.toContain('slds-progress_shade');

            const primitives = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-progress-step"]'
            );
            primitives.forEach((primitive) => {
                expect(primitive.variant).toBe('base');
            });
        });
    });

    it('Progress Indicator: variant = shaded', () => {
        element.variant = 'shaded';
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper.classList).toContain('slds-progress_shade');

            const primitives = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-progress-step"]'
            );
            primitives.forEach((primitive) => {
                expect(primitive.variant).toBe('shaded');
            });
        });
    });

    // warning-steps
    // Depends on variant and steps
    it('Progress Indicator: warning steps', () => {
        element.steps = STEPS;
        element.warningSteps = STEPS_NAMES;

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-progress-step"]'
            );

            [1, 2].forEach((i) => {
                expect(primitives[i].isWarning).toBeTruthy();
            });
            [0, 3].forEach((i) => {
                expect(primitives[i].isWarning).toBeFalsy();
            });
        });
    });

    /* ----- EVENTS ----- */

    // stepclick
    // Depends on steps
    it('Progress Indicator: stepclick event', () => {
        const handler = jest.fn();
        element.steps = STEPS;
        element.addEventListener('stepclick', handler);

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-progress-step"]'
            );
            primitives[1].dispatchEvent(
                new CustomEvent('stepclick', { detail: { value: 'step-1' } })
            );

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toBe('step-1');
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    // stepblur
    // Depends on steps
    it('Progress Indicator: stepblur event', () => {
        const handler = jest.fn();
        element.steps = STEPS;
        element.addEventListener('stepblur', handler);

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-progress-step"]'
            );
            primitives[1].dispatchEvent(
                new CustomEvent('stepblur', { detail: { value: 'step-1' } })
            );

            expect(handler.mock.calls[0][0].detail.value).toBe('step-1');
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    // stepfocus
    // Depends on steps
    it('Progress Indicator: stepfocus event', () => {
        const handler = jest.fn();
        element.steps = STEPS;
        element.addEventListener('stepfocus', handler);

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-progress-step"]'
            );
            primitives[1].dispatchEvent(
                new CustomEvent('stepfocus', { detail: { value: 'step-1' } })
            );

            expect(handler.mock.calls[0][0].detail.value).toBe('step-1');
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    // stepmouseenter
    // Depends on steps
    it('Progress Indicator: stepmouseenter event', () => {
        const handler = jest.fn();
        element.steps = STEPS;
        element.addEventListener('stepmouseenter', handler);

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-progress-step"]'
            );
            primitives[1].dispatchEvent(
                new CustomEvent('stepmouseenter', {
                    detail: { value: 'step-1' }
                })
            );

            expect(handler.mock.calls[0][0].detail.value).toBe('step-1');
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    // stepmouseleave
    // Depends on steps
    it('Progress Indicator: stepmouseleave event', () => {
        const handler = jest.fn();
        element.steps = STEPS;
        element.addEventListener('stepmouseleave', handler);

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-progress-step"]'
            );
            primitives[1].dispatchEvent(
                new CustomEvent('stepmouseleave', {
                    detail: { value: 'step-1' }
                })
            );

            expect(handler.mock.calls[0][0].detail.value).toBe('step-1');
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    // stepbuttonclick
    // Depends on steps
    it('Progress Indicator: stepbuttonclick event', () => {
        const handler = jest.fn();
        element.steps = STEPS;
        element.addEventListener('stepbuttonclick', handler);

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-progress-step"]'
            );
            primitives[1].dispatchEvent(
                new CustomEvent('stepbuttonclick', {
                    detail: { value: 'step-1' }
                })
            );

            expect(handler.mock.calls[0][0].detail.value).toBe('step-1');
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    // steppopoverclick
    // Depends on steps
    it('Progress Indicator: steppopoverclick event', () => {
        const handler = jest.fn();
        element.steps = STEPS;
        element.addEventListener('steppopoverclick', handler);

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-progress-step"]'
            );
            primitives[1].dispatchEvent(
                new CustomEvent('steppopoverclick', {
                    detail: { value: 'step-1' }
                })
            );

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toBe('step-1');
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });
});
