import { createElement } from 'lwc';
import Path from 'c/path';
import { ACTIONS, STEPS } from '../__docs__/data';

const CUSTOM_ACTIONS = [
    {
        name: 'action-1',
        label: 'Action 1',
        iconName: 'utility:apps'
    },
    {
        name: 'action-2',
        label: 'Action 2',
        disabled: true
    },
    {
        name: 'action-3',
        label: 'Action 3'
    }
];

describe('Path', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-path', {
            is: Path
        });

        expect(element.actions).toMatchObject([]);
        expect(element.currentStep).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.format).toBe('linear');
        expect(element.guidanceLabel).toBe('Guidance for Success');
        expect(element.hideButton).toBeFalsy();
        expect(element.hideCoaching).toBeFalsy();
        expect(element.keyFieldsLabel).toBe('Key Fields');
        expect(element.nextButtonIconName).toBeUndefined();
        expect(element.nextButtonIconPosition).toBe('left');
        expect(element.nextButtonLabel).toBe('Mark as Complete');
        expect(element.selectButtonIconName).toBeUndefined();
        expect(element.selectButtonIconPosition).toBe('left');
        expect(element.selectButtonLabel).toBe('Mark as Current Stage');
        expect(element.selectLastStepButtonIconName).toBeUndefined();
        expect(element.selectLastStepButtonIconPosition).toBe('left');
        expect(element.selectLastStepButtonLabel).toBe('Select Closed Stage');
        expect(element.changeClosedStatusButtonIconName).toBeUndefined();
        expect(element.changeClosedStatusButtonIconPosition).toBe('left');
        expect(element.changeClosedStatusButtonLabel).toBe(
            'Change Closed Stage'
        );
        expect(element.steps).toMatchObject([]);
    });

    /* ---- ATTRIBUTES ----- */

    // actions
    // Depends on toggle coaching button working
    it('actions, only default actions visible on step', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = [
            {
                name: 'only-default-actions'
            }
        ];

        document.body.appendChild(element);

        element.actions = ACTIONS;
        const coachingToggle = element.shadowRoot.querySelector(
            '.slds-path__trigger'
        );
        coachingToggle.click();

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('button');
            buttons.forEach((button, index) => {
                expect(button.textContent).toBe(ACTIONS[index].label);
                expect(button.name).toBe(ACTIONS[index].name);
                expect(button.disabled).toBe(ACTIONS[index].disabled || false);

                const icon = button.querySelector('lightning-icon');
                if (ACTIONS[index].iconName) {
                    expect(icon).toBeTruthy();
                    expect(icon.iconName).toBe(ACTIONS[index].iconName);
                } else {
                    expect(icon).toBeFalsy();
                }
            });
        });
    });

    it('actions, only custom actions visible on step', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = [
            {
                name: 'only-custom-actions',
                hideDefaultActions: true,
                actions: CUSTOM_ACTIONS
            }
        ];

        document.body.appendChild(element);

        element.actions = ACTIONS;
        const coachingToggle = element.shadowRoot.querySelector(
            '.slds-path__trigger'
        );
        coachingToggle.click();

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('button');
            buttons.forEach((button, index) => {
                expect(button.textContent).toBe(CUSTOM_ACTIONS[index].label);
                expect(button.name).toBe(CUSTOM_ACTIONS[index].name);
                expect(button.disabled).toBe(
                    CUSTOM_ACTIONS[index].disabled || false
                );

                const icon = button.querySelector('lightning-icon');
                if (CUSTOM_ACTIONS[index].iconName) {
                    expect(icon).toBeTruthy();
                    expect(icon.iconName).toBe(CUSTOM_ACTIONS[index].iconName);
                } else {
                    expect(icon).toBeFalsy();
                }
            });
        });
    });

    it('actions, no actions visible on step', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = [
            {
                name: 'no-actions',
                hideDefaultActions: true
            }
        ];

        document.body.appendChild(element);

        element.actions = ACTIONS;
        const coachingToggle = element.shadowRoot.querySelector(
            '.slds-path__trigger'
        );
        coachingToggle.click();

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('button');
            expect(buttons).toHaveLength(0);
        });
    });

    it('actions, custom and default actions visible on step', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = [
            {
                name: 'default-and-custom-actions',
                actions: CUSTOM_ACTIONS
            }
        ];

        document.body.appendChild(element);

        element.actions = ACTIONS;
        const coachingToggle = element.shadowRoot.querySelector(
            '.slds-path__trigger'
        );
        coachingToggle.click();

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('button');

            let index = 0;
            let actions = CUSTOM_ACTIONS;

            buttons.forEach((button) => {
                if (index === CUSTOM_ACTIONS.length) {
                    index = 0;
                    actions = ACTIONS;
                }
                expect(button.textContent).toBe(actions[index].label);
                expect(button.name).toBe(actions[index].name);
                expect(button.disabled).toBe(actions[index].disabled || false);

                const icon = button.querySelector('lightning-icon');
                if (actions[index].iconName) {
                    expect(icon).toBeTruthy();
                    expect(icon.iconName).toBe(actions[index].iconName);
                } else {
                    expect(icon).toBeFalsy();
                }

                index += 1;
            });
        });
    });

    // current-step
    // Depends on toggle coaching button working
    it('currentStep, valid step name given', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;

        document.body.appendChild(element);

        element.currentStep = STEPS[2].name;

        const coachingToggle = element.shadowRoot.querySelector(
            '.slds-path__trigger'
        );
        coachingToggle.click();

        return Promise.resolve().then(() => {
            expect(element.steps[0].isCurrentStep).toBeFalsy();
            expect(element.steps[0].class).not.toContain('slds-is-current');

            expect(element.steps[2].isCurrentStep).toBeTruthy();
            expect(element.steps[2].class).toContain('slds-is-current');

            const steps = element.shadowRoot.querySelectorAll('li');
            steps.forEach((step, index) => {
                const link = step.querySelector('a');
                const ariaSelected = index === 2 ? 'true' : 'false';
                expect(link.getAttribute('aria-selected')).toBe(ariaSelected);

                const assistiveText = step.querySelector(
                    '.slds-assistive-text'
                );
                if (index < 2) {
                    expect(assistiveText.textContent).toBe('Stage Complete');
                } else if (index === 2) {
                    expect(assistiveText.textContent).toBe('Current Stage:');
                } else {
                    expect(assistiveText).toBeFalsy();
                }
            });

            const stageTitle = element.shadowRoot.querySelector(
                '.slds-path__stage-name'
            );
            expect(stageTitle.textContent).toContain(STEPS[2].label);

            const fieldLabels = element.shadowRoot.querySelectorAll(
                '.slds-form-element__label'
            );
            expect(fieldLabels).toHaveLength(STEPS[2].keyFields.length);
            fieldLabels.forEach((field, index) => {
                expect(field.textContent).toBe(STEPS[2].keyFields[index].label);
            });

            const fieldValues = element.shadowRoot.querySelectorAll(
                '.slds-form-element__static'
            );
            expect(fieldValues).toHaveLength(STEPS[2].keyFields.length);
            fieldValues.forEach((field, index) => {
                expect(field.textContent).toBe(STEPS[2].keyFields[index].value);
            });

            const guidance = element.shadowRoot.querySelector(
                '.slds-path__guidance-content'
            );
            expect(guidance.textContent).toBe(STEPS[2].guidance);
        });
    });

    it('currentStep, invalid step name given', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;

        document.body.appendChild(element);

        element.currentStep = 'Some wrong name';

        const coachingToggle = element.shadowRoot.querySelector(
            '.slds-path__trigger'
        );
        coachingToggle.click();

        return Promise.resolve().then(() => {
            expect(element.steps[0].isCurrentStep).toBeTruthy();
            expect(element.steps[0].class).toContain('slds-is-current');
        });
    });

    // disabled
    // Depends on step click working
    it('disabled = false', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;

        document.body.appendChild(element);

        element.disabled = false;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    'lightning-button'
                );
                expect(button.disabled).toBeFalsy();

                const steps = element.shadowRoot.querySelectorAll('li a');
                steps[2].click();
            })
            .then(() => {
                const steps = element.shadowRoot.querySelectorAll('li');
                expect(steps[2].classList).toContain('slds-is-active');
            });
    });

    it('disabled = true', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;

        document.body.appendChild(element);

        element.disabled = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    'lightning-button'
                );
                expect(button.disabled).toBeTruthy();

                const steps = element.shadowRoot.querySelectorAll('li a');
                steps[2].click();
            })
            .then(() => {
                const steps = element.shadowRoot.querySelectorAll('li');
                expect(steps[2].classList).not.toContain('slds-is-active');
            });
    });

    // format
    // Depends on currentStep and closing process
    it('format = linear', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;

        document.body.appendChild(element);

        element.format = 'linear';
        element.currentStep = STEPS[2].name;
        const dialog = element.shadowRoot.querySelector('c-dialog');

        return Promise.resolve()
            .then(() => {
                const steps = element.shadowRoot.querySelectorAll('li');
                steps.forEach((step, index) => {
                    if (index < 2) {
                        // Past steps are completed
                        expect(step.classList).toContain('slds-is-complete');
                    } else {
                        // Current and future steps are not completed
                        expect(step.classList).not.toContain(
                            'slds-is-complete'
                        );
                    }
                });

                dialog.show();
            })
            .then(() => {
                // Change status to won
                const combobox = element.shadowRoot.querySelector(
                    'lightning-combobox'
                );
                combobox.value = 'won';
                const saveButton = dialog.querySelector(
                    'lightning-button:nth-of-type(2)'
                );
                saveButton.click();
            })
            .then(() => {
                const steps = element.shadowRoot.querySelectorAll('li');
                steps.forEach((step, index) => {
                    if (index < steps.length - 1) {
                        // All steps except the last one should be completed
                        expect(step.classList).toContain('slds-is-complete');
                    }
                });
            });
    });

    it('format = non-linear', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;

        document.body.appendChild(element);

        element.format = 'non-linear';
        element.currentStep = STEPS[2].name;
        const dialog = element.shadowRoot.querySelector('c-dialog');

        return Promise.resolve()
            .then(() => {
                const steps = element.shadowRoot.querySelectorAll('li');
                steps.forEach((step) => {
                    // No steps should be completed
                    expect(step.classList).not.toContain('slds-is-complete');
                });

                dialog.show();
            })
            .then(() => {
                // Change status to won
                const combobox = element.shadowRoot.querySelector(
                    'lightning-combobox'
                );
                combobox.value = 'won';
                const saveButton = dialog.querySelector(
                    'lightning-button:nth-of-type(2)'
                );
                saveButton.click();
            })
            .then(() => {
                const steps = element.shadowRoot.querySelectorAll('li');
                steps.forEach((step) => {
                    // No steps should be completed
                    expect(step.classList).not.toContain('slds-is-complete');
                });
            });
    });

    // guidance-label
    // Depends on toggle coaching button working
    it('guidanceLabel', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;

        document.body.appendChild(element);

        element.guidanceLabel = 'A string label';
        const coachingToggle = element.shadowRoot.querySelector(
            '.slds-path__trigger'
        );
        coachingToggle.click();

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-path__guidance .slds-path__coach-title'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // hide-button
    it('hideButton = false', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;

        document.body.appendChild(element);

        element.hideButton = false;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button).toBeTruthy();
        });
    });

    it('hideButton = true', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;

        document.body.appendChild(element);

        element.hideButton = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button).toBeFalsy();
        });
    });

    // hide-coaching
    it('hideCoaching = false', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;

        document.body.appendChild(element);

        element.hideCoaching = false;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );
            expect(button).toBeTruthy();
        });
    });

    it('hideCoaching = true', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;

        document.body.appendChild(element);

        element.hideCoaching = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                'lightning-button-icon'
            );
            expect(button).toBeFalsy();
        });
    });

    // key-fields-label
    // Depends on toggle coaching button working
    it('keyFieldsLabel', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;

        document.body.appendChild(element);

        element.keyFieldsLabel = 'A string label';
        const coachingToggle = element.shadowRoot.querySelector(
            '.slds-path__trigger'
        );
        coachingToggle.click();

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-path__keys h2'
            );
            expect(label.textContent).toBe('A string label');
        });
    });

    // next-button-icon-name, next-button-icon-position and next-button-label
    it('nextButtonIconName, nextButtonIconPosition and nextButtonLabel', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;

        document.body.appendChild(element);

        element.nextButtonIconName = 'utility:apps';
        element.nextButtonIconPosition = 'right';
        element.nextButtonLabel = 'A string label';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.label).toBe('A string label');
            expect(button.iconPosition).toBe('right');
            expect(button.iconName).toBe('utility:apps');
        });
    });

    // select-button-icon-name, select-button-icon-position and select-button-label
    // Depends on step click working
    it('selectButtonIconName, selectButtonIconPosition and selectButtonLabel', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;

        document.body.appendChild(element);

        element.selectButtonIconName = 'utility:apps';
        element.selectButtonIconPosition = 'right';
        element.selectButtonLabel = 'A string label';

        const secondStep = element.shadowRoot.querySelector(
            `a[data-step-name="${STEPS[1].name}"]`
        );
        secondStep.click();

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.label).toBe('A string label');
            expect(button.iconPosition).toBe('right');
            expect(button.iconName).toBe('utility:apps');
        });
    });

    // select-last-step-button-icon-name, select-last-step-button-icon-position and select-last-step-button-label
    // Depends on step click working
    it('selectLastStepButtonIconName, selectLastStepButtonIconPosition and selectLastStepButtonLabel', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;

        document.body.appendChild(element);

        element.selectLastStepButtonIconName = 'utility:apps';
        element.selectLastStepButtonIconPosition = 'right';
        element.selectLastStepButtonLabel = 'A string label';

        const lastStepName = STEPS[STEPS.length - 1].name;
        const secondStep = element.shadowRoot.querySelector(
            `a[data-step-name="${lastStepName}"]`
        );
        secondStep.click();

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.label).toBe('A string label');
            expect(button.iconPosition).toBe('right');
            expect(button.iconName).toBe('utility:apps');
        });
    });

    // change-closed-status-button-icon-name, change-closed-status-button-icon-position and change-closed-status-button-label
    // Depends on step click working and closing process
    it('changeClosedStatusButtonIconName, changeClosedStatusButtonIconPosition and changeClosedStatusButtonLabel', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;

        document.body.appendChild(element);

        element.changeClosedStatusButtonIconName = 'utility:apps';
        element.changeClosedStatusButtonIconPosition = 'right';
        element.changeClosedStatusButtonLabel = 'A string label';

        const dialog = element.shadowRoot.querySelector('c-dialog');
        dialog.show();

        return Promise.resolve()
            .then(() => {
                // Change status to lost
                const combobox = element.shadowRoot.querySelector(
                    'lightning-combobox'
                );
                combobox.value = 'lost';
                const saveButton = dialog.querySelector(
                    'lightning-button:nth-of-type(2)'
                );
                saveButton.click();
            })
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    'lightning-button'
                );
                expect(button.label).toBe('A string label');
                expect(button.iconPosition).toBe('right');
                expect(button.iconName).toBe('utility:apps');
            });
    });

    // steps
    it('steps', () => {
        const element = createElement('base-path', {
            is: Path
        });

        // Make sure that steps can be changed after connectedCallback
        element.steps = [{ name: 'temporary-step' }];
        document.body.appendChild(element);
        element.steps = STEPS;

        return Promise.resolve().then(() => {
            const steps = element.shadowRoot.querySelectorAll('li');
            expect(steps).toHaveLength(STEPS.length);

            steps.forEach((step, index) => {
                expect(step.classList.toString()).toBe(
                    element.steps[index].class
                );

                const link = step.querySelector('a');
                expect(link.dataset.stepName).toBe(STEPS[index].name);

                const title = step.querySelector('.slds-path__title');
                expect(title.textContent).toBe(STEPS[index].label);
            });

            const stageTitle = element.shadowRoot.querySelector(
                '.slds-path__stage-name'
            );
            expect(stageTitle.textContent).toContain(STEPS[0].label);
        });
    });

    /* ---- METHODS ----- */

    // next
    // Depends on currentStep
    it('next method', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('change', handler);

        element.next();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.currentStep).toBe(STEPS[1].name);
        expect(handler.mock.calls[0][0].detail.oldStep).toBe(STEPS[0].name);
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });

    it('next method on penultimate step', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;
        document.body.appendChild(element);

        const changeHandler = jest.fn();
        element.addEventListener('change', changeHandler);
        element.currentStep = STEPS[STEPS.length - 2].name;

        const dialog = element.shadowRoot.querySelector('c-dialog');
        const openDialog = jest.spyOn(dialog, 'show');

        return Promise.resolve().then(() => {
            element.next();
            expect(changeHandler).not.toHaveBeenCalled();
            expect(openDialog).toHaveBeenCalled();
        });
    });

    // previous
    // Depends on current step
    it('previous method', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('change', handler);
        element.currentStep = STEPS[2].name;

        return Promise.resolve().then(() => {
            element.previous();
            expect(element.currentStep).toBe(STEPS[1].name);
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.currentStep).toBe(
                STEPS[1].name
            );
            expect(handler.mock.calls[0][0].detail.oldStep).toBe(STEPS[2].name);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    it('previous method on first step', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            element.previous();
            expect(element.currentStep).toBe(STEPS[0].name);
            expect(handler).not.toHaveBeenCalled();
        });
    });

    /* ---- EVENTS ----- */

    // change
    it('change event, linear progression', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('change', handler);

        const button = element.shadowRoot.querySelector('lightning-button');
        button.click();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.currentStep).toBe(STEPS[1].name);
        expect(handler.mock.calls[0][0].detail.oldStep).toBe(STEPS[0].name);
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });

    it('change event, click on a specific step', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('change', handler);

        const steps = element.shadowRoot.querySelectorAll('li a');
        steps[2].click();

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            button.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.currentStep).toBe(
                STEPS[2].name
            );
            expect(handler.mock.calls[0][0].detail.oldStep).toBe(STEPS[0].name);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    // close
    it('close event', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('close', handler);

        const dialog = element.shadowRoot.querySelector('c-dialog');
        dialog.show();

        return Promise.resolve().then(() => {
            // Change status to won
            const combobox = element.shadowRoot.querySelector(
                'lightning-combobox'
            );
            combobox.value = 'won';
            const saveButton = dialog.querySelector(
                'lightning-button:nth-of-type(2)'
            );
            saveButton.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.value).toBe('won');
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    // actionclick
    // Depends on custom actions and toggle coaching button working
    it('actionclick event', () => {
        const element = createElement('base-path', {
            is: Path
        });

        element.steps = STEPS;
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        const coachingToggle = element.shadowRoot.querySelector(
            '.slds-path__trigger'
        );
        coachingToggle.click();

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.slds-path__coach-edit'
            );
            actionButton.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.name).toBe(
                STEPS[0].actions[0].name
            );
            expect(handler.mock.calls[0][0].detail.targetName).toBe(
                STEPS[0].name
            );
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });
});
