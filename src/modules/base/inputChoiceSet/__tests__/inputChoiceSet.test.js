import { createElement } from 'lwc';
import InputChoiceSet from 'c/inputChoiceSet';

const options = [
    { label: 'Mon', value: 'mon' },
    { label: 'Tue', value: 'tue' },
    { label: 'Wed', value: 'wed' },
    { label: 'Thu', value: 'thu' },
    { label: 'Fri', value: 'fri' }
];

describe('Input Choice Set', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Input Choice Set Default attributes', () => {
        const element = createElement('base-input-choice-set', {
            is: InputChoiceSet
        });

        expect(element.disabled).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.type).toBe('checkbox');
        expect(element.messageWhenValueMissing).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.options).toBeUndefined();
        expect(element.required).toBeFalsy();
        expect(element.validity).toMatchObject({});
        expect(element.value).toMatchObject([]);
        expect(element.variant).toBe('standard');
    });

    /* ----- ATTRIBUTES ----- */

    // disabled
    it('Checkbox Group disabled', () => {
        const element = createElement('base-input-choice-set', {
            is: InputChoiceSet
        });
        document.body.appendChild(element);

        element.options = options;
        element.disabled = true;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('input');
            inputs.forEach((input) => {
                expect(input.disabled).toBeTruthy();
            });
        });
    });

    // label
    it('Checkbox Group label', () => {
        const element = createElement('base-input-choice-set', {
            is: InputChoiceSet
        });
        document.body.appendChild(element);

        element.options = options;
        element.label = 'This is a label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.textContent).toBe('This is a label');
        });
    });

    // type
    it('Checkbox Group type checkbox', () => {
        const element = createElement('base-input-choice-set', {
            is: InputChoiceSet
        });
        document.body.appendChild(element);

        element.options = options;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('div > span');
            inputs.forEach((input) => {
                expect(input.className).toBe('slds-checkbox');
                expect(input.className).not.toContain(
                    'slds-button slds-checkbox_button'
                );
            });
        });
    });

    it('Checkbox Group type button', () => {
        const element = createElement('base-input-choice-set', {
            is: InputChoiceSet
        });
        document.body.appendChild(element);

        element.options = options;
        element.type = 'button';

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('div > span');
            inputs.forEach((input) => {
                expect(input.className).toBe(
                    'slds-button slds-checkbox_button'
                );
                expect(input.className).not.toBe('slds-checkbox');
            });
        });
    });

    // Message when value is missing
    // Depends on required, focus(), blur() and showHelpMessageIfInvalid()
    it('Checkbox Group message when value is missing', () => {
        const element = createElement('base-input-choice-set', {
            is: InputChoiceSet
        });
        document.body.appendChild(element);

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

    // name
    it('Checkbox Group name', () => {
        const element = createElement('base-input-choice-set', {
            is: InputChoiceSet
        });
        document.body.appendChild(element);

        element.options = options;
        element.name = 'Checkbox group name';

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('input');
            inputs.forEach((input) => {
                expect(input.name).toBe('Checkbox group name');
            });
        });
    });

    // options
    it('Checkbox Group options', () => {
        const element = createElement('base-input-choice-set', {
            is: InputChoiceSet
        });
        document.body.appendChild(element);

        element.options = options;

        return Promise.resolve().then(() => {
            options.forEach((option, index) => {
                const correspondingOption = options[index];
                expect(correspondingOption).toBeTruthy();
                expect(option.label).toBe(correspondingOption.label);
                expect(option.value).toBe(correspondingOption.value);
            });
        });
    });

    // required
    it('Checkbox Group required', () => {
        const element = createElement('base-input-choice-set', {
            is: InputChoiceSet
        });
        document.body.appendChild(element);

        element.options = options;
        element.required = true;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector('abbr');
            expect(abbr).toBeTruthy();
        });
    });

    // value
    it('Checkbox Group value', () => {
        const element = createElement('base-input-choice-set', {
            is: InputChoiceSet
        });
        document.body.appendChild(element);

        element.options = options;
        element.value = ['mon', 'wed'];

        return Promise.resolve().then(() => {
            const values = [];
            const inputs = element.shadowRoot.querySelectorAll('input');
            inputs.forEach((input) => {
                if (input.checked) {
                    values.push(input.value);
                }
            });
            expect(values).toHaveLength(2);
        });
    });

    // variant
    it('Checkbox Group variant standard', () => {
        const element = createElement('base-input-choice-set', {
            is: InputChoiceSet
        });
        document.body.appendChild(element);

        element.options = options;

        return Promise.resolve().then(() => {
            expect(element.className).not.toContain(
                'slds-form-element_stacked'
            );
            expect(element.className).not.toContain(
                'slds-form-element_horizontal'
            );
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__legend.slds-form-element__label'
            );
            expect(label.className).not.toContain('slds-assistive-text');
        });
    });

    it('Checkbox Group variant label hidden', () => {
        const element = createElement('base-input-choice-set', {
            is: InputChoiceSet
        });
        document.body.appendChild(element);

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
                '.slds-form-element__legend.slds-form-element__label'
            );
            expect(label.className).toContain('slds-assistive-text');
        });
    });

    it('Checkbox Group variant label inline', () => {
        const element = createElement('base-input-choice-set', {
            is: InputChoiceSet
        });
        document.body.appendChild(element);

        element.options = options;
        element.variant = 'label-inline';

        return Promise.resolve().then(() => {
            expect(element.className).not.toContain(
                'slds-form-element_stacked'
            );
            expect(element.className).toContain('slds-form-element_horizontal');
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__legend.slds-form-element__label'
            );
            expect(label.className).not.toContain('slds-assistive-text');
        });
    });

    it('Checkbox Group variant label stacked', () => {
        const element = createElement('base-input-choice-set', {
            is: InputChoiceSet
        });
        document.body.appendChild(element);

        element.options = options;
        element.variant = 'label-stacked';

        return Promise.resolve().then(() => {
            expect(element.className).toContain('slds-form-element_stacked');
            expect(element.className).not.toContain(
                'slds-form-element_horizontal'
            );
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__legend.slds-form-element__label'
            );
            expect(label.className).not.toContain('slds-assistive-text');
        });
    });

    /* ----- EVENTS ----- */

    // change event
    it('Checkbox group change event', () => {
        const element = createElement('base-input-choice-set', {
            is: InputChoiceSet
        });
        document.body.appendChild(element);

        element.options = options;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('input');
            const handleChange = (event) => {
                expect(event.detail).toBeTruthy();
                expect(event.bubbles).toBeTruthy();
                expect(event.cancelable).toBeTruthy();
                expect(event.composed).toBeTruthy();
            };
            element.addEventListener('change', handleChange);
            input.click();
        });
    });

    // blur event
    it('Checkbox group blur event', () => {
        const element = createElement('base-input-choice-set', {
            is: InputChoiceSet
        });
        document.body.appendChild(element);

        element.options = options;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('input');
            const handleBlur = (event) => {
                expect(event.bubbles).toBeFalsy();
                expect(event.cancelable).toBeFalsy();
                expect(event.composed).toBeFalsy();
            };
            element.addEventListener('blur', handleBlur);
            input.blur();
        });
    });

    // focus event
    it('Checkbox group focus event', () => {
        const element = createElement('base-input-choice-set', {
            is: InputChoiceSet
        });
        document.body.appendChild(element);

        element.options = options;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('input');
            const handleFocus = (event) => {
                expect(event.bubbles).toBeFalsy();
                expect(event.cancelable).toBeFalsy();
                expect(event.composed).toBeFalsy();
            };
            element.addEventListener('focus', handleFocus);
            input.focus();
        });
    });
});
