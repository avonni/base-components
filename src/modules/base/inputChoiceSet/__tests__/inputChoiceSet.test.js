import { createElement } from 'lwc';
import InputChoiceSet from '../inputChoiceSet';

const options = [
    { label: 'Mon', value: 'mon' },
    { label: 'Tue', value: 'tue' },
    { label: 'Wed', value: 'wed' },
    { label: 'Thu', value: 'thu' },
    { label: 'Fri', value: 'fri' }
];

const optionsWithColors = [
    { label: 'First option', value: 'first', color: 'red' },
    { label: 'Second option', value: 'second', color: 'blue' }
];

const optionsWithIcon = [
    {
        label: 'Left',
        value: 'left',
        iconName: 'utility:left_align_text',
        iconPosition: 'right',
        alternativeText: 'Left'
    },
    {
        label: 'Center',
        value: 'center',
        iconName: 'utility:center_align_text',
        iconPosition: 'right',
        alternativeText: 'Center'
    },
    {
        label: 'Right',
        value: 'right',
        iconName: 'utility:right_align_text',
        iconPosition: 'right',
        alternativeText: 'Right'
    }
];

let element;
describe('Input choice set', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-input-choice-set', {
            is: InputChoiceSet
        });
        document.body.appendChild(element);
    });
    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.checkPosition).toBe('left');
            expect(element.disabled).toBeFalsy();
            expect(element.fieldLevelHelp).toBeUndefined();
            expect(element.isLoading).toBe(false);
            expect(element.isMultiSelect).toBe(false);
            expect(element.label).toBeUndefined();
            expect(element.loadingStateAlternativeText).toBe('Loading...');
            expect(element.messageWhenValueMissing).toBeUndefined();
            expect(element.name).toBeUndefined();
            expect(element.options).toMatchObject([]);
            expect(element.orientation).toBe('vertical');
            expect(element.orientationAttributes).toMatchObject({});
            expect(element.readOnly).toBeFalsy();
            expect(element.required).toBeFalsy();
            expect(element.requiredAlternativeText).toBe('Required');
            expect(element.stretch).toBeFalsy();
            expect(element.type).toBe('default');
            expect(element.typeAttributes).toMatchObject({});
            expect(element.validity).toMatchObject({});
            expect(element.value).toMatchObject([]);
            expect(element.variant).toBe('standard');
        });

        describe('Check Position', () => {
            it('left', () => {
                element.options = options;
                element.checkPosition = 'left';

                return Promise.resolve().then(() => {
                    const checkContainer = element.shadowRoot.querySelector(
                        '[data-element-id="div-check-container"]'
                    );
                    expect(checkContainer.className).not.toContain(
                        'slds-order_3'
                    );
                });
            });

            it('right', () => {
                element.options = options;
                element.checkPosition = 'right';

                return Promise.resolve().then(() => {
                    const checkContainer = element.shadowRoot.querySelector(
                        '[data-element-id="div-check-container"]'
                    );
                    expect(checkContainer.className).toContain('slds-order_3');
                });
            });
        });

        describe('Disabled', () => {
            it('disabled = false', () => {
                element.options = options;
                element.disabled = false;

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.disabled).toBeFalsy();
                    });

                    const labels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="label"]'
                    );
                    labels.forEach((label) => {
                        expect(label.classList).toContain(
                            'avonni-input-choice-set__option-label'
                        );
                    });
                });
            });

            it('disabled = true', () => {
                element.options = options;
                element.disabled = true;

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.disabled).toBeTruthy();
                    });

                    const labels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="label"]'
                    );
                    labels.forEach((label) => {
                        expect(label.classList).not.toContain(
                            'avonni-input-choice-set__option-label'
                        );
                    });
                });
            });

            it('disabled = false, some options are disabled', () => {
                element.options = [
                    { value: '1', label: 'First', disabled: true },
                    { value: '2', label: 'Second' },
                    { value: '3', label: 'Third', disabled: true }
                ];
                element.disabled = false;

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    expect(inputs).toHaveLength(3);
                    expect(inputs[0].disabled).toBeTruthy();
                    expect(inputs[1].disabled).toBeFalsy();
                    expect(inputs[2].disabled).toBeTruthy();

                    const labels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="label"]'
                    );
                    expect(labels).toHaveLength(3);
                    expect(labels[0].classList).not.toContain(
                        'avonni-input-choice-set__option-label'
                    );
                    expect(labels[1].classList).toContain(
                        'avonni-input-choice-set__option-label'
                    );
                    expect(labels[2].classList).not.toContain(
                        'avonni-input-choice-set__option-label'
                    );
                });
            });
        });

        describe('Field Level Help', () => {
            it('fieldLevelHelp', () => {
                element.options = options;
                element.fieldLevelHelp = 'This is a field level help';

                return Promise.resolve().then(() => {
                    const fieldLevelHelp =
                        element.shadowRoot.querySelector('lightning-helptext');
                    expect(fieldLevelHelp.content).toBe(
                        'This is a field level help'
                    );
                });
            });
        });

        describe('Is Loading', () => {
            it('isLoading = false', () => {
                element.options = options;
                element.isLoading = false;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    const loader = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-spinner-loading"]'
                    );
                    expect(input).toBeTruthy();
                    expect(loader).toBeFalsy();
                });
            });

            it('isLoading = true', () => {
                element.options = options;
                element.isLoading = true;
                element.loadingStateAlternativeText = 'Loading';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    const loader = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-spinner-loading"]'
                    );
                    expect(input).toBeFalsy();
                    expect(loader).toBeTruthy();
                    expect(loader.alternativeText).toBe('Loading');
                });
            });
        });

        describe('Label', () => {
            it('label', () => {
                element.options = options;
                element.label = 'This is a label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '.slds-form-element__label'
                    );
                    expect(label.textContent).toBe('This is a label');
                });
            });
        });

        describe('Message when value is missing', () => {
            // Depends on required, focus(), blur() and showHelpMessageIfInvalid()
            it('message when value is missing', () => {
                element.options = options;
                element.required = true;
                element.messageWhenValueMissing = 'Value is Missing';

                return Promise.resolve()
                    .then(() => {
                        element.focus();
                        element.blur();
                        element.showHelpMessageIfInvalid();
                    })
                    .then(() => {
                        const message = element.shadowRoot.querySelector(
                            '.slds-form-element__help'
                        );
                        expect(message.textContent).toBe('Value is Missing');
                    });
            });
        });

        describe('Name', () => {
            it('name', () => {
                element.options = options;
                element.name = 'Checkbox group name';

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.name).toBe('Checkbox group name');
                    });
                });
            });
        });

        describe('Options', () => {
            it('options', () => {
                element.options = options;

                return Promise.resolve().then(() => {
                    const labels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="label"]'
                    );
                    let index = 0;
                    labels.forEach((label) => {
                        expect(label.control.value).toBe(
                            element.options[index++].value
                        );
                    });
                });
            });

            it('options with icons', () => {
                element.options = optionsWithIcon;

                return Promise.resolve().then(() => {
                    const icons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="lightning-icon-checkbox"]'
                    );
                    let index = 0;
                    icons.forEach((icon) => {
                        expect(icon.iconName).toBe(
                            element.options[index++].iconName
                        );
                    });

                    const labels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="label"]'
                    );
                    index = 0;
                    labels.forEach((label) => {
                        expect(label.control.value).toBe(
                            element.options[index++].value
                        );
                    });
                });
            });

            it('options with icons only', () => {
                element.type = 'button';
                element.options = optionsWithIcon.map((opt) => ({
                    ...opt,
                    label: undefined
                }));

                return Promise.resolve().then(() => {
                    const icons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="lightning-icon-button"]'
                    );
                    let index = 0;
                    icons.forEach((icon) => {
                        expect(icon.iconName).toBe(
                            element.options[index].iconName
                        );
                        expect(icon.alternativeText).toBe(
                            element.options[index].alternativeText
                        );
                        index++;
                    });
                });
            });

            describe('Colors', () => {
                it('Radio with colors', () => {
                    element.options = optionsWithColors;

                    return Promise.resolve().then(() => {
                        const containers = element.shadowRoot.querySelectorAll(
                            '[data-element-id="div-check-container"]'
                        );
                        containers.forEach((container, index) => {
                            const color = optionsWithColors[index].color;
                            expect(container.style.cssText).toBe(
                                `--slds-c-checkbox-color-border: ${color}; --slds-c-checkbox-mark-color-foreground: ${color}; --slds-c-checkbox-color-border-checked: ${color}; --slds-c-checkbox-color-border-focus: ${color}; --slds-c-radio-color-border-checked: ${color}; --slds-c-radio-color-border: ${color}; --slds-c-radio-mark-color-foreground: ${color}; --slds-c-radio-color-border-focus: ${color};`
                            );
                        });

                        const labels = element.shadowRoot.querySelectorAll(
                            '[data-element-id="label"]'
                        );
                        labels.forEach((label) => {
                            expect(label.style.cssText).toBe('');
                        });
                    });
                });

                it('Button with colors', () => {
                    element.options = optionsWithColors;
                    element.type = 'button';

                    return Promise.resolve().then(() => {
                        element.value = optionsWithColors[1].value;
                        const labels = element.shadowRoot.querySelectorAll(
                            '[data-element-id="label"]'
                        );
                        expect(labels[0].style.cssText).toBe('color: red;');
                        expect(labels[1].style.cssText).toBe(
                            'color: white; background-color: blue; border-color: blue;'
                        );
                    });
                });

                it('Toggle with colors', () => {
                    element.options = optionsWithColors;
                    element.type = 'toggle';
                    element.value = optionsWithColors[1].value;

                    return Promise.resolve().then(() => {
                        const labels = element.shadowRoot.querySelectorAll(
                            '[data-element-id="label"]'
                        );
                        labels.forEach((label) => {
                            expect(label.style.cssText).toBe('');
                        });

                        const containers = element.shadowRoot.querySelectorAll(
                            '[data-element-id="div-check-container"]'
                        );
                        containers.forEach((container, index) => {
                            const color = optionsWithColors[index].color;
                            expect(container.style.cssText).toBe(
                                `--sds-c-checkbox-toggle-color-border-checked: ${color}; --sds-c-checkbox-toggle-color-background-checked: ${color}; --slds-c-checkbox-toggle-color-background-checked-focus: ${color};`
                            );
                        });
                    });
                });
            });

            it('Hidden options', () => {
                element.options = [
                    { value: '1', label: 'First' },
                    { value: '2', label: 'Second', hidden: true },
                    { value: '3', label: 'Third' }
                ];

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    expect(inputs).toHaveLength(2);
                    expect(inputs[0].value).toBe('1');
                    expect(inputs[1].value).toBe('3');
                });
            });
        });

        describe('Orientation', () => {
            it('vertical', () => {
                element.options = options;
                element.orientation = 'vertical';

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="span-checkbox-container"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.className).not.toContain(
                            'avonni-input-choice-set__horizontal'
                        );
                        expect(input.className).toContain(
                            'avonni-input-choice-set__vertical'
                        );
                    });
                });
            });

            it('horizontal', () => {
                element.options = options;
                element.orientation = 'horizontal';

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="span-checkbox-container"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.className).not.toContain(
                            'avonni-input-choice-set__vertical'
                        );
                        expect(input.className).toContain(
                            'avonni-input-choice-set__horizontal'
                        );
                    });
                });
            });
        });

        describe('Orientation Attributes', () => {
            it('vertical', () => {
                element.options = options;
                element.orientation = 'vertical';
                element.orientationAttributes = {
                    cols: 3,
                    multipleRows: false
                };

                return Promise.resolve().then(() => {
                    // When vertical orientation, cols and multipleRows are ignored
                    // and multipleRows is always true and cols is always 100%
                    const layout = element.shadowRoot.querySelector(
                        '[data-element-id="layout"]'
                    );
                    expect(layout.multipleRows).toBeTruthy();
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="layout-item"]'
                    );
                    expect(items).toHaveLength(5);
                    items.forEach((item) => {
                        expect(item.size).toBe(12);
                    });
                });
            });

            it('horizontal', () => {
                element.options = options;
                element.orientation = 'horizontal';
                element.orientationAttributes = {
                    cols: 4,
                    multipleRows: false
                };

                return Promise.resolve().then(() => {
                    // When vertical orientation, cols and multipleRows are ignored
                    // and multipleRows is always true and cols is always 100%
                    const layout = element.shadowRoot.querySelector(
                        '[data-element-id="layout"]'
                    );
                    expect(layout.multipleRows).toBeFalsy();
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="layout-item"]'
                    );
                    expect(items).toHaveLength(5);
                    items.forEach((item) => {
                        expect(item.size).toBe(3);
                    });
                });
            });
        });

        describe('Read Only', () => {
            it('readOnly', () => {
                element.options = options;
                element.readOnly = true;
                element.value = options[0].value;

                const handler = jest.fn();
                element.addEventListener('change', handler);

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    input.click();
                    expect(handler).not.toHaveBeenCalled();
                    expect(element.value).toBe(options[0].value);
                });
            });
        });

        describe('Required', () => {
            it('required', () => {
                element.options = options;
                element.required = true;
                element.requiredAlternativeText = 'Required field';

                return Promise.resolve().then(() => {
                    const abbr = element.shadowRoot.querySelector(
                        '[data-element-id="abbr"]'
                    );
                    expect(abbr).toBeTruthy();
                    expect(abbr.title).toBe('Required field');
                });
            });
        });

        describe('Type', () => {
            it('checkbox', () => {
                element.options = options;
                element.orientation = 'vertical';
                element.isMultiSelect = true;

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="span-checkbox-container"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.className).toContain(
                            'slds-checkbox avonni-input-choice-set__vertical'
                        );
                        expect(input.className).not.toContain(
                            'slds-button slds-checkbox_button'
                        );
                    });
                });
            });

            it('button', () => {
                element.options = options;
                element.type = 'button';
                element.orientation = 'vertical';

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="span-checkbox-container"]'
                    );
                    inputs.forEach((input) => {
                        const expected =
                            input.className ===
                            'slds-button slds-checkbox_button';
                        expect(expected).toBe(true);
                        expect(input.className).not.toBe('slds-checkbox');
                    });
                });
            });

            it('button display as row', () => {
                element.options = options;
                element.type = 'button';
                element.orientation = 'horizontal';
                element.typeAttributes = {
                    displayAsRow: true
                };

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="span-checkbox-container"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.className).toBe(
                            'slds-button avonni-input-choice-set__button__row'
                        );
                    });
                });
            });

            it('toggle', () => {
                element.options = options;
                element.type = 'toggle';
                element.orientation = 'vertical';

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="span-checkbox-container"]'
                    );
                    inputs.forEach((input) => {
                        const expected =
                            input.className ===
                                'slds-checkbox_toggle slds-grid slds-grid_vertical slds-grid_align-spread avonni-input-choice-set__vertical' ||
                            input.className === 'slds-checkbox_faux';
                        expect(expected).toBe(true);
                        expect(input.className).not.toBe('slds-checkbox');
                    });
                });
            });
        });

        describe('Type Attributes', () => {
            it('showCheckmark', () => {
                element.options = options;
                element.type = 'button';
                element.typeAttributes = {
                    showCheckmark: true
                };
                element.value = 'mon';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-check"]'
                    );
                    expect(icon.className).toBe(
                        'avonni-input-choice-set__checkmark slds-order_0 slds-p-left_x-small slds-align_absolute-center'
                    );
                });
            });

            it('button: checkmarkPosition', () => {
                element.options = options;
                element.type = 'button';
                element.typeAttributes = {
                    showCheckmark: true,
                    checkmarkPosition: 'right'
                };
                element.value = 'mon';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-check"]'
                    );
                    expect(icon.className).toBe(
                        'avonni-input-choice-set__checkmark slds-order_2 slds-p-right_x-small slds-align_absolute-center'
                    );
                });
            });

            it('button: stretch', () => {
                element.options = options;
                element.type = 'button';
                element.typeAttributes = {
                    stretch: true
                };

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input-group"]'
                    );
                    expect(input.className).toContain(
                        'avonni-input-choice-set__button_stretch'
                    );
                });
            });

            it('toggle: showCheckmark', () => {
                element.options = options;
                element.type = 'toggle';
                element.typeAttributes = {
                    showCheckmark: false
                };

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input-toggle"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.hideMark).toBeTruthy();
                    });
                });
            });

            it('toggle: stretch', () => {
                element.options = options;
                element.type = 'toggle';
                element.typeAttributes = {
                    stretch: true
                };

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="div-check-label"]'
                    );
                    expect(container.className).toContain(
                        'avonni-input-choice-set__toggle_stretch'
                    );
                });
            });
        });

        describe('Value', () => {
            it('value', () => {
                element.options = options;
                element.value = ['mon', 'wed'];

                return Promise.resolve().then(() => {
                    const values = [];
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs.forEach((input) => {
                        if (input.checked || input.dataset.checked === 'true') {
                            values.push(input.value);
                        }
                    });
                    expect(values).toHaveLength(2);
                });
            });
        });

        describe('Variant', () => {
            it('standard', () => {
                element.options = options;

                return Promise.resolve().then(() => {
                    expect(element.className).not.toContain(
                        'slds-form-element_stacked'
                    );
                    expect(element.className).not.toContain(
                        'slds-form-element_horizontal'
                    );
                    const label = element.shadowRoot.querySelector(
                        '.slds-form-element__label'
                    );
                    expect(label.className).not.toContain(
                        'slds-assistive-text'
                    );
                });
            });

            it('label hidden', () => {
                element.options = options;
                element.variant = 'label-hidden';

                return Promise.resolve().then(() => {
                    expect(element.className).not.toContain(
                        'slds-form-element_stacked'
                    );
                    expect(element.className).not.toContain(
                        'slds-form-element_horizontal'
                    );
                    const label = element.shadowRoot.querySelector(
                        '.slds-assistive-text'
                    );
                    expect(label.className).toBeTruthy();
                });
            });

            it('label inline', () => {
                element.options = options;
                element.variant = 'label-inline';

                return Promise.resolve().then(() => {
                    expect(element.className).not.toContain(
                        'slds-form-element_stacked'
                    );
                    expect(element.className).toContain(
                        'slds-form-element_horizontal'
                    );
                    const label = element.shadowRoot.querySelector(
                        '.slds-form-element__label'
                    );
                    expect(label.className).not.toContain(
                        'slds-assistive-text'
                    );
                });
            });

            it('label stacked', () => {
                element.options = options;
                element.variant = 'label-stacked';

                return Promise.resolve().then(() => {
                    expect(element.className).toContain(
                        'slds-form-element_stacked'
                    );
                    expect(element.className).not.toContain(
                        'slds-form-element_horizontal'
                    );
                    const label = element.shadowRoot.querySelector(
                        '.slds-form-element__label'
                    );
                    expect(label.className).not.toContain(
                        'slds-assistive-text'
                    );
                });
            });
        });
    });

    describe('Methods', () => {
        describe('Validity Methods', () => {
            it('checkValidity method', () => {
                const spy = jest.spyOn(element, 'checkValidity');

                element.checkValidity();
                expect(spy).toHaveBeenCalled();
            });

            it('setCustomValidity method', () => {
                const spy = jest.spyOn(element, 'setCustomValidity');

                element.setCustomValidity('Something');
                expect(spy).toHaveBeenCalled();
            });

            // Depends on required
            it('reportValidity method', () => {
                element.required = true;
                element.reportValidity();

                return Promise.resolve().then(() => {
                    const help = element.shadowRoot.querySelector(
                        '.slds-form-element__help'
                    );
                    expect(help).toBeTruthy();
                });
            });

            // Depends on required
            it('showHelpMessageIfInvalid method', () => {
                element.required = true;
                element.showHelpMessageIfInvalid();

                return Promise.resolve().then(() => {
                    const help = element.shadowRoot.querySelector(
                        '.slds-form-element__help'
                    );
                    expect(help).toBeTruthy();
                });
            });
        });
    });

    describe('Events', () => {
        describe('Blur Events', () => {
            it('blur event', () => {
                element.options = options;

                const handler = jest.fn();
                element.addEventListener('blur', handler);

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );

                    input.addEventListener('blur', handler);
                    input.dispatchEvent(new CustomEvent('blur', {}));
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });
        });

        describe('Change Events', () => {
            it('keyup', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);
                element.options = options;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    input.dispatchEvent(
                        new KeyboardEvent('keyup', { key: 'Enter' })
                    );

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toBe('mon');
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeTruthy();
                });
            });

            it('keyup not enter', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);
                element.options = options;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    input.dispatchEvent(
                        new KeyboardEvent('keyup', { key: 'f' })
                    );

                    expect(handler).not.toHaveBeenCalled();
                });
            });

            it('single', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);
                element.options = options;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    input.click();
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toBe('mon');
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeTruthy();
                });
            });

            it('multiple', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);
                element.options = options;
                element.value = 'mon';
                element.isMultiSelect = true;

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id="input"]'
                    );
                    inputs[1].click();
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toMatchObject(
                        ['mon', 'tue']
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeTruthy();
                });
            });

            it('toggle', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);
                element.options = options;
                element.type = 'toggle';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input-toggle"]'
                    );
                    input.click();
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toBe('mon');
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeTruthy();
                });
            });

            it('toggle change', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);
                element.options = options;
                element.type = 'toggle';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input-toggle"]'
                    );
                    input.dispatchEvent(
                        new CustomEvent('change', {
                            detail: {
                                checked: true
                            }
                        })
                    );
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeTruthy();
                });
            });

            it('button already selected and not multiselect', () => {
                const handler = jest.fn();
                element.addEventListener('change', handler);
                element.options = options;
                element.type = 'button';
                element.value = 'mon';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    input.click();
                    expect(handler).not.toHaveBeenCalled();
                });
            });
        });

        describe('Focus Event', () => {
            it('focus event', () => {
                element.options = options;

                const handler = jest.fn();
                element.addEventListener('focus', handler);

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );

                    input.addEventListener('focus', handler);
                    input.dispatchEvent(new CustomEvent('focus', {}));
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });
        });
    });
});
