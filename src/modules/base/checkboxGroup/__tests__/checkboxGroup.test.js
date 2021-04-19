import { createElement } from 'lwc';
import CheckboxGroup from 'c/checkboxGroup';

const options = [
    { label: 'Mon', value: 'mon' },
    { label: 'Tue', value: 'tue' },
    { label: 'Wed', value: 'wed' },
    { label: 'Thu', value: 'thu' },
    { label: 'Fri', value: 'fri' }
];

describe('Checkbox Group', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Checkbox Group Default attributes', () => {
        const element = createElement('base-checkbox-group', {
            is: CheckboxGroup
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
        const element = createElement('base-checkbox-group', {
            is: CheckboxGroup
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
        const element = createElement('base-checkbox-group', {
            is: CheckboxGroup
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
        const element = createElement('base-checkbox-group', {
            is: CheckboxGroup
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
        const element = createElement('base-checkbox-group', {
            is: CheckboxGroup
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
    it('Checkbox Group message when value is missing', () => {
        const element = createElement('base-checkbox-group', {
            is: CheckboxGroup
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

    // required
    it('Checkbox Group required', () => {
        const element = createElement('base-checkbox-group', {
            is: CheckboxGroup
        });
        document.body.appendChild(element);

        element.options = options;
        element.required = true;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector('abbr');
            expect(abbr).toBeTruthy();
        });
    });
});
