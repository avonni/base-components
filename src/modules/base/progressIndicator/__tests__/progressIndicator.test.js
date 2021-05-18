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
        buttonTitle: 'Some title',
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

describe('ProgressIndicator', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-progress-indicator', {
            is: ProgressIndicator
        });

        expect(element.completedSteps).toMatchObject([]);
        expect(element.currentStep).toBeUndefined();
        expect(element.disabledSteps).toMatchObject([]);
        expect(element.errorSteps).toMatchObject([]);
        expect(element.steps).toMatchObject([]);
        expect(element.type).toBe('base');
        expect(element.variant).toBe('base');
        expect(element.warningSteps).toMatchObject([]);
    });

    /* ----- ATTRIBUTES ----- */

    // completed-steps
    // Depends on steps
    it('completedSteps', () => {
        const element = createElement('base-progress-indicator', {
            is: ProgressIndicator
        });

        document.body.appendChild(element);

        element.steps = STEPS;
        element.completedSteps = STEPS_NAMES;

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                'c-primitive-progress-step'
            );
            primitives.forEach((primitive) => {
                expect(primitive.completedSteps).toMatchObject(STEPS_NAMES);

                if (STEPS_NAMES.includes(primitive.value)) {
                    expect(primitive.classList).toContain('slds-is-completed');
                }
            });
        });
    });

    // current-step
    // Depends on steps
    it('currentStep', () => {
        const element = createElement('base-progress-indicator', {
            is: ProgressIndicator
        });

        document.body.appendChild(element);

        element.steps = STEPS;
        element.currentStep = 'step-2';

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                'c-primitive-progress-step'
            );

            expect(primitives[1].classList).toContain('slds-is-active');
        });
    });

    // disabled-steps
    // Depends on steps
    it('disabledSteps', () => {
        const element = createElement('base-progress-indicator', {
            is: ProgressIndicator
        });

        document.body.appendChild(element);

        element.steps = STEPS;
        element.disabledSteps = STEPS_NAMES;

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                'c-primitive-progress-step'
            );

            primitives.forEach((primitive) => {
                expect(primitive.disabledSteps).toMatchObject(STEPS_NAMES);
            });
        });
    });

    // error-steps
    // Depends on steps
    it('errorSteps', () => {
        const element = createElement('base-progress-indicator', {
            is: ProgressIndicator
        });

        document.body.appendChild(element);

        element.steps = STEPS;
        element.errorSteps = STEPS_NAMES;

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                'c-primitive-progress-step'
            );

            primitives.forEach((primitive) => {
                if (STEPS_NAMES.includes(primitive.value)) {
                    expect(primitive.classList).toContain('slds-has-error');
                }
            });
        });
    });

    // steps
    it('steps', () => {
        const element = createElement('base-progress-indicator', {
            is: ProgressIndicator
        });

        document.body.appendChild(element);

        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                'c-primitive-progress-step'
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
                expect(primitive.buttonTitle).toBe(STEPS[index].buttonTitle);
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

    // type
    it('type', () => {
        const element = createElement('base-progress-indicator', {
            is: ProgressIndicator
        });

        document.body.appendChild(element);

        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                'c-primitive-progress-step'
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
                expect(primitive.buttonTitle).toBe(STEPS[index].buttonTitle);
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
    it('variant = base', () => {
        const element = createElement('base-progress-indicator', {
            is: ProgressIndicator
        });

        document.body.appendChild(element);

        element.variant = 'base';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.slds-progress');
            expect(wrapper.classList).not.toContain('slds-progress_shade');
        });
    });

    it('variant = shaded', () => {
        const element = createElement('base-progress-indicator', {
            is: ProgressIndicator
        });

        document.body.appendChild(element);

        element.variant = 'shaded';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.slds-progress');
            expect(wrapper.classList).toContain('slds-progress_shade');
        });
    });

    // warning-steps
    // Depends on variant and steps
    it('Warning steps', () => {
        const element = createElement('base-progress-indicator', {
            is: ProgressIndicator
        });

        document.body.appendChild(element);

        element.steps = STEPS;
        element.warningSteps = STEPS_NAMES;

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                'c-primitive-progress-step'
            );

            primitives.forEach((primitive) => {
                if (STEPS_NAMES.includes(primitive.value)) {
                    expect(primitive.classList).toContain('slds-has-warning');
                }
            });
        });
    });

    it('Warning steps, with variant shaded', () => {
        const element = createElement('base-progress-indicator', {
            is: ProgressIndicator
        });

        document.body.appendChild(element);

        element.variant = 'shaded';
        element.steps = STEPS;
        element.warningSteps = STEPS_NAMES;

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                'c-primitive-progress-step'
            );

            primitives.forEach((primitive) => {
                if (STEPS_NAMES.includes(primitive.value)) {
                    expect(primitive.classList).toContain(
                        'slds-has-warning-shaded'
                    );
                    expect(primitive.classList).not.toContain(
                        'slds-has-warning'
                    );
                }
            });
        });
    });

    /* ----- EVENTS ----- */

    // stepclick
    // Depends on steps
    it('stepclick event', () => {
        const element = createElement('base-progress-indicator', {
            is: ProgressIndicator
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.steps = STEPS;
        element.addEventListener('stepclick', handler);

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                'c-primitive-progress-step'
            );
            primitives[1].dispatchEvent(new CustomEvent('stepclick'));

            expect(handler).toHaveBeenCalledTimes(1);
        });
    });

    // stepblur
    // Depends on steps
    it('stepblur event', () => {
        const element = createElement('base-progress-indicator', {
            is: ProgressIndicator
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.steps = STEPS;
        element.addEventListener('stepblur', handler);

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                'c-primitive-progress-step'
            );
            primitives[1].dispatchEvent(new CustomEvent('stepblur'));

            expect(handler).toHaveBeenCalledTimes(1);
        });
    });

    // stepfocus
    // Depends on steps
    it('stepfocus event', () => {
        const element = createElement('base-progress-indicator', {
            is: ProgressIndicator
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.steps = STEPS;
        element.addEventListener('stepfocus', handler);

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                'c-primitive-progress-step'
            );
            primitives[1].dispatchEvent(new CustomEvent('stepfocus'));

            expect(handler).toHaveBeenCalledTimes(1);
        });
    });

    // stepmouseenter
    // Depends on steps
    it('stepmouseenter event', () => {
        const element = createElement('base-progress-indicator', {
            is: ProgressIndicator
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.steps = STEPS;
        element.addEventListener('stepmouseenter', handler);

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                'c-primitive-progress-step'
            );
            primitives[1].dispatchEvent(new CustomEvent('stepmouseenter'));

            expect(handler).toHaveBeenCalledTimes(1);
        });
    });

    // stepmouseleave
    // Depends on steps
    it('stepmouseleave event', () => {
        const element = createElement('base-progress-indicator', {
            is: ProgressIndicator
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.steps = STEPS;
        element.addEventListener('stepmouseleave', handler);

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                'c-primitive-progress-step'
            );
            primitives[1].dispatchEvent(new CustomEvent('stepmouseleave'));

            expect(handler).toHaveBeenCalledTimes(1);
        });
    });

    // stepbuttonclick
    // Depends on steps
    it('stepbuttonclick event', () => {
        const element = createElement('base-progress-indicator', {
            is: ProgressIndicator
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.steps = STEPS;
        element.addEventListener('stepbuttonclick', handler);

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                'c-primitive-progress-step'
            );
            primitives[1].dispatchEvent(new CustomEvent('stepbuttonclick'));

            expect(handler).toHaveBeenCalledTimes(1);
        });
    });

    // steppopoverclick
    // Depends on steps
    it('steppopoverclick event', () => {
        const element = createElement('base-progress-indicator', {
            is: ProgressIndicator
        });

        document.body.appendChild(element);

        const handler = jest.fn();
        element.steps = STEPS;
        element.addEventListener('steppopoverclick', handler);

        return Promise.resolve().then(() => {
            const primitives = element.shadowRoot.querySelectorAll(
                'c-primitive-progress-step'
            );
            primitives[1].dispatchEvent(new CustomEvent('steppopoverclick'));

            expect(handler).toHaveBeenCalledTimes(1);
        });
    });
});
