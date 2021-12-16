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
import Path from 'c/path';
import { ACTIONS, STEPS, COMPLETED_OPTIONS } from '../__docs__/data';

// Not tested:
// changeCompletionStatusLabel (is in the slot of a child component)

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
    },
    {
        name: 'action-4',
        iconName: 'standard:user'
    }
];

describe('Path', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        expect(element.actions).toMatchObject([]);
        expect(element.currentStep).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.format).toBe('linear');
        expect(element.guidanceLabel).toBe('Guidance for Success');
        expect(element.hideButtons).toBeFalsy();
        expect(element.hideCoaching).toBeFalsy();
        expect(element.keyFieldsLabel).toBe('Key Fields');
        expect(element.nextButtonIconName).toBeUndefined();
        expect(element.nextButtonIconPosition).toBe('left');
        expect(element.nextButtonLabel).toBe('Mark as Complete');
        expect(element.selectButtonIconName).toBeUndefined();
        expect(element.selectButtonIconPosition).toBe('left');
        expect(element.selectButtonLabel).toBe('Mark as Current Stage');
        expect(element.changeCompletionStatusLabel).toBe(
            'Change Completion Status'
        );
        expect(element.steps).toMatchObject([]);
    });

    /* ---- ATTRIBUTES ----- */

    // actions
    // Depends on toggle coaching button working
    it('actions, only default actions visible on step', () => {
        const element = createElement('avonni-path', {
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
            const buttons = element.shadowRoot.querySelectorAll(
                '.slds-path__coach-edit'
            );
            expect(buttons).toHaveLength(ACTIONS.length);

            buttons.forEach((button, index) => {
                const action = ACTIONS[index];
                if (action.label) {
                    expect(button.label).toBe(action.label);
                    expect(button.tagName).toBe('LIGHTNING-BUTTON');
                } else {
                    expect(button.tagName).toBe('LIGHTNING-BUTTON-ICON');
                }
                expect(button.name).toBe(action.name);
                expect(button.disabled).toBe(action.disabled);
                expect(button.iconName).toBe(action.iconName);
            });
        });
    });

    it('actions, only custom actions visible on step', () => {
        const element = createElement('avonni-path', {
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
            const buttons = element.shadowRoot.querySelectorAll(
                '.slds-path__coach-edit'
            );
            expect(buttons).toHaveLength(CUSTOM_ACTIONS.length);
            buttons.forEach((button, index) => {
                const action = CUSTOM_ACTIONS[index];
                if (action.label) {
                    expect(button.label).toBe(action.label);
                    expect(button.tagName).toBe('LIGHTNING-BUTTON');
                } else {
                    expect(button.tagName).toBe('LIGHTNING-BUTTON-ICON');
                }
                expect(button.name).toBe(action.name);
                expect(button.disabled).toBe(action.disabled);
                expect(button.iconName).toBe(action.iconName);
            });
        });
    });

    it('actions, no actions visible on step', () => {
        const element = createElement('avonni-path', {
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
            const buttons = element.shadowRoot.querySelectorAll(
                '.slds-path__coach-edit'
            );
            expect(buttons).toHaveLength(0);
        });
    });

    it('actions, custom and default actions visible on step', () => {
        const element = createElement('avonni-path', {
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
        const actions = CUSTOM_ACTIONS.concat(ACTIONS);
        const coachingToggle = element.shadowRoot.querySelector(
            '.slds-path__trigger'
        );
        coachingToggle.click();

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '.slds-path__coach-edit'
            );
            expect(buttons).toHaveLength(actions.length);

            buttons.forEach((button, index) => {
                const action = actions[index];
                if (action.label) {
                    expect(button.label).toBe(action.label);
                    expect(button.tagName).toBe('LIGHTNING-BUTTON');
                } else {
                    expect(button.tagName).toBe('LIGHTNING-BUTTON-ICON');
                }
                expect(button.name).toBe(action.name);
                expect(button.disabled).toBe(action.disabled);
                expect(button.iconName).toBe(action.iconName);
            });
        });
    });

    // Change completion button presence
    // Depends on completed options and next()
    it('Change completion button present only when completed options', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        const steps = JSON.parse(JSON.stringify(STEPS));
        steps[0].completedOptions = [COMPLETED_OPTIONS[2]];
        steps[2].completedOptions = COMPLETED_OPTIONS;

        element.steps = steps;

        document.body.appendChild(element);
        element.next();

        return Promise.resolve()
            .then(() => {
                // First step only has one completed option
                // The button should not appear
                const buttonMenu = element.shadowRoot.querySelector(
                    '.slds-path__action lightning-button-menu'
                );
                expect(buttonMenu).toBeFalsy();

                element.next();
            })
            .then(() => {
                // Second step has no completed option
                // The button should not appear
                const buttonMenu = element.shadowRoot.querySelector(
                    '.slds-path__action lightning-button-menu'
                );
                expect(buttonMenu).toBeFalsy();

                element.next();
            })
            .then(() => {
                // Third step has several completed options
                // Going to fourth step should trigger the dialog
                const combobox = element.shadowRoot.querySelector(
                    'lightning-combobox'
                );
                combobox.value = COMPLETED_OPTIONS[0].value;
                const saveButton = element.shadowRoot.querySelector(
                    'avonni-dialog lightning-button:nth-of-type(2)'
                );
                saveButton.click();
            })
            .then(() => {
                // On fourth step, the button should be present
                const buttonMenu = element.shadowRoot.querySelector(
                    'lightning-button-menu'
                );
                expect(buttonMenu).toBeTruthy();
            });
    });

    // current-step
    // Depends on toggle coaching button working
    it('currentStep, valid step name given', () => {
        const element = createElement('avonni-path', {
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
                'avonni-output-data'
            );
            expect(fieldValues).toHaveLength(STEPS[2].keyFields.length);
            fieldValues.forEach((field, index) => {
                // Normalize data to be able to compare
                const originalType = STEPS[2].keyFields[index].type || 'text';
                const originalValue = JSON.parse(
                    JSON.stringify(STEPS[2].keyFields[index].value)
                );
                const originalTypeAttributes =
                    JSON.stringify(STEPS[2].keyFields[index].typeAttributes) ||
                    '{}';
                const typeAttributes = JSON.stringify(field.typeAttributes);

                expect(field.value).toBe(originalValue);
                expect(field.type).toBe(originalType);
                expect(typeAttributes).toBe(originalTypeAttributes);
            });

            const guidance = element.shadowRoot.querySelector(
                '.slds-path__guidance-content'
            );
            expect(guidance.textContent).toBe(STEPS[2].guidance);
        });
    });

    it('currentStep, invalid step name given', () => {
        const element = createElement('avonni-path', {
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
        const element = createElement('avonni-path', {
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
        const element = createElement('avonni-path', {
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
    // Depends on next
    it('format = linear, path element has no styling when not on last step', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        const steps = [
            {
                name: 'first-step',
                completedOptions: [
                    {
                        value: 'base-step',
                        variant: 'base'
                    }
                ]
            },
            {
                name: 'second-step'
            },
            {
                name: 'last-step'
            }
        ];
        element.steps = steps;
        document.body.appendChild(element);
        element.format = 'linear';

        return Promise.resolve()
            .then(() => {
                element.next();
            })
            .then(() => {
                const path = element.shadowRoot.querySelector('.slds-path');
                expect(path.classList).toHaveLength(2);
                expect(path.classList).toContain('slds-path');
                expect(path.classList).toContain('slds-path_has-coaching');
            });
    });

    it('format = linear, base styling', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        const steps = [
            {
                name: 'first-step',
                completedOptions: [
                    {
                        value: 'base-step',
                        variant: 'base'
                    }
                ]
            },
            {
                name: 'second-step'
            }
        ];
        element.steps = steps;
        document.body.appendChild(element);
        element.format = 'linear';

        return Promise.resolve()
            .then(() => {
                element.next();
            })
            .then(() => {
                const path = element.shadowRoot.querySelector('.slds-path');
                expect(path.classList).toHaveLength(4);
                expect(path.classList).toContain('slds-path');
                expect(path.classList).toContain('slds-path_has-coaching');
                expect(path.classList).toContain('path-is-complete');
                expect(path.classList).toContain('path-is-complete_base');

                const stepElements = element.shadowRoot.querySelectorAll(
                    '.slds-path__item'
                );
                stepElements.forEach((step, index) => {
                    if (index === 1) {
                        expect(step.classList).toHaveLength(4);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('slds-is-current');
                        expect(step.classList).toContain('slds-is-active');
                        expect(step.classList).toContain('path__item-last');
                    } else {
                        expect(step.classList).toHaveLength(2);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('slds-is-incomplete');

                        const icon = step.querySelector('lightning-icon');
                        expect(icon.iconName).toBe('utility:check');
                    }
                });
            });
    });

    it('format = linear, success styling', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        const steps = [
            {
                name: 'first-step',
                completedOptions: [
                    {
                        value: 'success-step',
                        variant: 'success'
                    }
                ]
            },
            {
                name: 'second-step'
            }
        ];
        element.steps = steps;
        document.body.appendChild(element);
        element.format = 'linear';

        return Promise.resolve()
            .then(() => {
                element.next();
            })
            .then(() => {
                const path = element.shadowRoot.querySelector('.slds-path');
                expect(path.classList).toHaveLength(4);
                expect(path.classList).toContain('slds-path');
                expect(path.classList).toContain('slds-path_has-coaching');
                expect(path.classList).toContain('path-is-complete');
                expect(path.classList).toContain('slds-is-won');

                const stepElements = element.shadowRoot.querySelectorAll(
                    '.slds-path__item'
                );
                stepElements.forEach((step, index) => {
                    if (index === 1) {
                        expect(step.classList).toHaveLength(4);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('slds-is-current');
                        expect(step.classList).toContain('slds-is-active');
                        expect(step.classList).toContain('path__item-last');
                    } else {
                        expect(step.classList).toHaveLength(2);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('slds-is-complete');

                        const icon = step.querySelector('lightning-icon');
                        expect(icon.iconName).toBe('utility:check');
                    }
                });
            });
    });

    it('format = linear, error styling', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        const steps = [
            {
                name: 'first-step',
                completedOptions: [
                    {
                        value: 'error-step',
                        variant: 'error'
                    }
                ]
            },
            {
                name: 'second-step'
            }
        ];
        element.steps = steps;
        document.body.appendChild(element);
        element.format = 'linear';

        return Promise.resolve()
            .then(() => {
                element.next();
            })
            .then(() => {
                const path = element.shadowRoot.querySelector('.slds-path');
                expect(path.classList).toHaveLength(4);
                expect(path.classList).toContain('slds-path');
                expect(path.classList).toContain('slds-path_has-coaching');
                expect(path.classList).toContain('path-is-complete');
                expect(path.classList).toContain('slds-is-lost');

                const stepElements = element.shadowRoot.querySelectorAll(
                    '.slds-path__item'
                );
                stepElements.forEach((step, index) => {
                    if (index === 1) {
                        expect(step.classList).toHaveLength(4);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('slds-is-current');
                        expect(step.classList).toContain('slds-is-active');
                        expect(step.classList).toContain('path__item-last');
                    } else {
                        expect(step.classList).toHaveLength(3);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('path__item_error');

                        const icon = step.querySelector('lightning-icon');
                        expect(icon.iconName).toBe('utility:error');
                    }
                });
            });
    });

    it('format = linear, warning styling', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        const steps = [
            {
                name: 'first-step',
                completedOptions: [
                    {
                        value: 'warning-step',
                        variant: 'warning'
                    }
                ]
            },
            {
                name: 'second-step'
            }
        ];
        element.steps = steps;
        document.body.appendChild(element);
        element.format = 'linear';

        return Promise.resolve()
            .then(() => {
                element.next();
            })
            .then(() => {
                const path = element.shadowRoot.querySelector('.slds-path');
                expect(path.classList).toHaveLength(4);
                expect(path.classList).toContain('slds-path');
                expect(path.classList).toContain('slds-path_has-coaching');
                expect(path.classList).toContain('path-is-complete');
                expect(path.classList).toContain('path-is-complete_warning');

                const stepElements = element.shadowRoot.querySelectorAll(
                    '.slds-path__item'
                );
                stepElements.forEach((step, index) => {
                    if (index === 1) {
                        expect(step.classList).toHaveLength(4);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('slds-is-current');
                        expect(step.classList).toContain('slds-is-active');
                        expect(step.classList).toContain('path__item-last');
                    } else {
                        expect(step.classList).toHaveLength(3);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('path__item_warning');

                        const icon = step.querySelector('lightning-icon');
                        expect(icon.iconName).toBe('utility:warning');
                    }
                });
            });
    });

    it('format = linear, offline styling', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        const steps = [
            {
                name: 'first-step',
                completedOptions: [
                    {
                        value: 'offline-step',
                        variant: 'offline'
                    }
                ]
            },
            {
                name: 'second-step'
            }
        ];
        element.steps = steps;
        document.body.appendChild(element);
        element.format = 'linear';

        return Promise.resolve()
            .then(() => {
                element.next();
            })
            .then(() => {
                const path = element.shadowRoot.querySelector('.slds-path');
                expect(path.classList).toHaveLength(4);
                expect(path.classList).toContain('slds-path');
                expect(path.classList).toContain('slds-path_has-coaching');
                expect(path.classList).toContain('path-is-complete');
                expect(path.classList).toContain('path-is-complete_offline');

                const stepElements = element.shadowRoot.querySelectorAll(
                    '.slds-path__item'
                );
                stepElements.forEach((step, index) => {
                    if (index === 1) {
                        expect(step.classList).toHaveLength(4);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('slds-is-current');
                        expect(step.classList).toContain('slds-is-active');
                        expect(step.classList).toContain('path__item-last');
                    } else {
                        expect(step.classList).toHaveLength(3);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('path__item_offline');
                        const icon = step.querySelector('lightning-icon');
                        expect(icon.iconName).toBe('utility:routing_offline');
                    }
                });
            });
    });

    it('format = non-linear, base styling', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        const steps = [
            {
                name: 'first-step',
                completedOptions: [
                    {
                        value: 'base-step',
                        variant: 'base'
                    }
                ]
            },
            {
                name: 'second-step'
            },
            {
                name: 'last-step'
            }
        ];
        element.steps = steps;
        document.body.appendChild(element);
        element.format = 'non-linear';

        return Promise.resolve()
            .then(() => {
                element.next();
            })
            .then(() => {
                const path = element.shadowRoot.querySelector('.slds-path');
                expect(path.classList).toHaveLength(4);
                expect(path.classList).toContain('slds-path');
                expect(path.classList).toContain('slds-path_has-coaching');
                expect(path.classList).toContain('path-is-complete');
                expect(path.classList).toContain('path-is-complete_base');

                const stepElements = element.shadowRoot.querySelectorAll(
                    '.slds-path__item'
                );
                stepElements.forEach((step, index) => {
                    if (index === 1) {
                        expect(step.classList).toHaveLength(4);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('slds-is-current');
                        expect(step.classList).toContain('slds-is-active');
                        expect(step.classList).toContain('path__item-last');
                    } else {
                        expect(step.classList).toHaveLength(2);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('slds-is-incomplete');
                    }
                });
            });
    });

    it('format = non-linear, success styling', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        const steps = [
            {
                name: 'first-step',
                completedOptions: [
                    {
                        value: 'success-step',
                        variant: 'success'
                    }
                ]
            },
            {
                name: 'second-step'
            },
            {
                name: 'last-step'
            }
        ];
        element.steps = steps;
        document.body.appendChild(element);
        element.format = 'non-linear';

        return Promise.resolve()
            .then(() => {
                element.next();
            })
            .then(() => {
                const path = element.shadowRoot.querySelector('.slds-path');
                expect(path.classList).toHaveLength(4);
                expect(path.classList).toContain('slds-path');
                expect(path.classList).toContain('slds-path_has-coaching');
                expect(path.classList).toContain('path-is-complete');
                expect(path.classList).toContain('slds-is-won');

                const stepElements = element.shadowRoot.querySelectorAll(
                    '.slds-path__item'
                );
                stepElements.forEach((step, index) => {
                    if (index === 1) {
                        expect(step.classList).toHaveLength(4);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('slds-is-current');
                        expect(step.classList).toContain('slds-is-active');
                        expect(step.classList).toContain('path__item-last');
                    } else {
                        expect(step.classList).toHaveLength(2);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('slds-is-incomplete');
                    }
                });
            });
    });

    it('format = non-linear, error styling', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        const steps = [
            {
                name: 'first-step',
                completedOptions: [
                    {
                        value: 'error-step',
                        variant: 'error'
                    }
                ]
            },
            {
                name: 'second-step'
            },
            {
                name: 'last-step'
            }
        ];
        element.steps = steps;
        document.body.appendChild(element);
        element.format = 'non-linear';

        return Promise.resolve()
            .then(() => {
                element.next();
            })
            .then(() => {
                const path = element.shadowRoot.querySelector('.slds-path');
                expect(path.classList).toHaveLength(4);
                expect(path.classList).toContain('slds-path');
                expect(path.classList).toContain('slds-path_has-coaching');
                expect(path.classList).toContain('path-is-complete');
                expect(path.classList).toContain('slds-is-lost');

                const stepElements = element.shadowRoot.querySelectorAll(
                    '.slds-path__item'
                );
                stepElements.forEach((step, index) => {
                    if (index === 1) {
                        expect(step.classList).toHaveLength(4);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('slds-is-current');
                        expect(step.classList).toContain('slds-is-active');
                        expect(step.classList).toContain('path__item-last');
                    } else {
                        expect(step.classList).toHaveLength(2);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('slds-is-incomplete');
                    }
                });
            });
    });

    it('format = non-linear, warning styling', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        const steps = [
            {
                name: 'first-step',
                completedOptions: [
                    {
                        value: 'warning-step',
                        variant: 'warning'
                    }
                ]
            },
            {
                name: 'second-step'
            },
            {
                name: 'last-step'
            }
        ];
        element.steps = steps;
        document.body.appendChild(element);
        element.format = 'non-linear';

        return Promise.resolve()
            .then(() => {
                element.next();
            })
            .then(() => {
                const path = element.shadowRoot.querySelector('.slds-path');
                expect(path.classList).toHaveLength(4);
                expect(path.classList).toContain('slds-path');
                expect(path.classList).toContain('slds-path_has-coaching');
                expect(path.classList).toContain('path-is-complete');
                expect(path.classList).toContain('path-is-complete_warning');

                const stepElements = element.shadowRoot.querySelectorAll(
                    '.slds-path__item'
                );
                stepElements.forEach((step, index) => {
                    if (index === 1) {
                        expect(step.classList).toHaveLength(4);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('slds-is-current');
                        expect(step.classList).toContain('slds-is-active');
                        expect(step.classList).toContain('path__item-last');
                    } else {
                        expect(step.classList).toHaveLength(2);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('slds-is-incomplete');
                    }
                });
            });
    });

    it('format = non-linear, offline styling', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        const steps = [
            {
                name: 'first-step',
                completedOptions: [
                    {
                        value: 'offline-step',
                        variant: 'offline'
                    }
                ]
            },
            {
                name: 'second-step'
            },
            {
                name: 'last-step'
            }
        ];
        element.steps = steps;
        document.body.appendChild(element);
        element.format = 'non-linear';

        return Promise.resolve()
            .then(() => {
                element.next();
            })
            .then(() => {
                const path = element.shadowRoot.querySelector('.slds-path');
                expect(path.classList).toHaveLength(4);
                expect(path.classList).toContain('slds-path');
                expect(path.classList).toContain('slds-path_has-coaching');
                expect(path.classList).toContain('path-is-complete');
                expect(path.classList).toContain('path-is-complete_offline');

                const stepElements = element.shadowRoot.querySelectorAll(
                    '.slds-path__item'
                );
                stepElements.forEach((step, index) => {
                    if (index === 1) {
                        expect(step.classList).toHaveLength(4);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('slds-is-current');
                        expect(step.classList).toContain('slds-is-active');
                        expect(step.classList).toContain('path__item-last');
                    } else {
                        expect(step.classList).toHaveLength(2);
                        expect(step.classList).toContain('slds-path__item');
                        expect(step.classList).toContain('slds-is-incomplete');
                    }
                });
            });
    });

    // guidance-label
    // Depends on toggle coaching button working
    it('guidanceLabel', () => {
        const element = createElement('avonni-path', {
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

    // hide-buttons
    it('hideButtons = false', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        element.steps = STEPS;

        document.body.appendChild(element);

        element.hideButtons = false;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button).toBeTruthy();
        });
    });

    it('hideButtons = true', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        element.steps = STEPS;

        document.body.appendChild(element);

        element.hideButtons = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button).toBeFalsy();
        });
    });

    // hide-coaching
    it('hideCoaching = false', () => {
        const element = createElement('avonni-path', {
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
        const element = createElement('avonni-path', {
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
        const element = createElement('avonni-path', {
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
        const element = createElement('avonni-path', {
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
        const element = createElement('avonni-path', {
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

    // steps
    it('steps', () => {
        const element = createElement('avonni-path', {
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

    // Close dialog without picking an option
    // Depends on next
    it('Close dialog without picking an option', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        const steps = JSON.parse(JSON.stringify(STEPS));
        steps[0].completedOptions = COMPLETED_OPTIONS;
        element.steps = steps;
        document.body.appendChild(element);

        const dialog = element.shadowRoot.querySelector('avonni-dialog');
        element.next();

        return Promise.resolve()
            .then(() => {
                const cancelButton = element.shadowRoot.querySelector(
                    'avonni-dialog lightning-button'
                );
                cancelButton.click();
            })
            .then(() => {
                expect(dialog.showDialog).toBeFalsy();
            });
    });

    // next
    // Depends on step classes and currentStep
    it('next method', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        element.steps = STEPS;
        document.body.appendChild(element);

        const steps = element.shadowRoot.querySelectorAll('.slds-path__item');
        expect(steps[0].classList).toContain('slds-is-current');
        expect(steps[1].classList).not.toContain('slds-is-current');

        element.next();

        return Promise.resolve().then(() => {
            const newSteps = element.shadowRoot.querySelectorAll(
                '.slds-path__item'
            );
            expect(newSteps[0].classList).not.toContain('slds-is-current');
            expect(newSteps[1].classList).toContain('slds-is-current');
        });
    });

    it('next method on step with completed option', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        const steps = JSON.parse(JSON.stringify(STEPS));
        steps[0].completedOptions = COMPLETED_OPTIONS;
        element.steps = steps;
        document.body.appendChild(element);

        const dialog = element.shadowRoot.querySelector('avonni-dialog');
        expect(dialog.showDialog).toBeFalsy();
        element.next();

        return Promise.resolve().then(() => {
            expect(dialog.showDialog).toBeTruthy();
        });
    });

    it('next method on last step', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        element.steps = STEPS;
        document.body.appendChild(element);

        element.currentStep = STEPS[STEPS.length - 1].name;

        return Promise.resolve()
            .then(() => {
                const steps = element.shadowRoot.querySelectorAll(
                    '.slds-path__item'
                );
                expect(steps[steps.length - 1].classList).toContain(
                    'slds-is-current'
                );
                element.next();
            })
            .then(() => {
                const steps = element.shadowRoot.querySelectorAll(
                    '.slds-path__item'
                );
                expect(steps[steps.length - 1].classList).toContain(
                    'slds-is-current'
                );
                element.next();
            });
    });

    // previous
    // Depends on current step
    it('previous method', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        element.steps = STEPS;
        document.body.appendChild(element);

        element.currentStep = STEPS[2].name;

        return Promise.resolve()
            .then(() => {
                const steps = element.shadowRoot.querySelectorAll(
                    '.slds-path__item'
                );
                expect(steps[2].classList).toContain('slds-is-current');
                expect(steps[1].classList).not.toContain('slds-is-current');

                element.previous();
            })
            .then(() => {
                const steps = element.shadowRoot.querySelectorAll(
                    '.slds-path__item'
                );
                expect(steps[2].classList).not.toContain('slds-is-current');
                expect(steps[1].classList).toContain('slds-is-current');
            });
    });

    it('previous method on step with completed option', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        const steps = JSON.parse(JSON.stringify(STEPS));
        steps[0].completedOptions = COMPLETED_OPTIONS;
        element.steps = steps;
        document.body.appendChild(element);

        const dialog = element.shadowRoot.querySelector('avonni-dialog');
        expect(dialog.showDialog).toBeFalsy();

        element.currentStep = steps[2].name;

        return Promise.resolve()
            .then(() => {
                element.previous();
            })
            .then(() => {
                expect(dialog.showDialog).toBeTruthy();
            });
    });

    it('previous method on first step', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        element.steps = STEPS;
        document.body.appendChild(element);

        const steps = element.shadowRoot.querySelectorAll('.slds-path__item');
        expect(steps[0].classList).toContain('slds-is-current');
        element.previous();

        return Promise.resolve().then(() => {
            const stepsAfterPrevious = element.shadowRoot.querySelectorAll(
                '.slds-path__item'
            );
            expect(stepsAfterPrevious[0].classList).toContain(
                'slds-is-current'
            );
            element.previous();
        });
    });

    /* ---- EVENTS ----- */

    // change
    // Depends on currentStep
    it('change event, no completed option, not on last step', () => {
        const element = createElement('avonni-path', {
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
        expect(handler.mock.calls[0][0].detail.completedValue).toBeUndefined();
        expect(handler.mock.calls[0][0].detail.lastStep).toBeFalsy();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });

    it('change event, completed option, last step', () => {
        const element = createElement('avonni-path', {
            is: Path
        });

        const steps = JSON.parse(JSON.stringify(STEPS));
        steps[steps.length - 2].completedOptions = COMPLETED_OPTIONS;
        element.steps = steps;
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('change', handler);
        element.currentStep = steps[steps.length - 2].name;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    'lightning-button'
                );
                button.click();
            })
            .then(() => {
                const combobox = element.shadowRoot.querySelector(
                    'lightning-combobox'
                );
                combobox.value = COMPLETED_OPTIONS[2].value;
                const saveButton = element.shadowRoot.querySelector(
                    'avonni-dialog lightning-button:nth-of-type(2)'
                );
                saveButton.click();

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.currentStep).toBe(
                    steps[steps.length - 1].name
                );
                expect(handler.mock.calls[0][0].detail.oldStep).toBe(
                    steps[steps.length - 2].name
                );
                expect(handler.mock.calls[0][0].detail.completedValue).toBe(
                    COMPLETED_OPTIONS[2].value
                );
                expect(handler.mock.calls[0][0].detail.lastStep).toBeTruthy();
            });
    });

    it('change event, click on a specific step', () => {
        const element = createElement('avonni-path', {
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
        });
    });

    // actionclick
    // Depends on custom actions and toggle coaching button working
    it('actionclick event', () => {
        const element = createElement('avonni-path', {
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
