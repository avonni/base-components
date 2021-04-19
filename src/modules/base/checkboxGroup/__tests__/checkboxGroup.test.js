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
});
