import { createElement } from 'lwc';
import CheckboxGroup from 'c/checkboxGroup';

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

        expect(element.disabled).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.type).toBe('checkbox');
        expect(element.messageWhenValueMissing).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.options).toBeUndefined();
        expect(element.required).toBeUndefined();
        expect(element.validity).toBeUndefined();
        expect(element.value).toBeUndefined();
        expect(element.variant).toBe('standard');
    });

    /* ----- ATTRIBUTES ----- */

    // disabled
    it('Checkbox Group disabled', () => {
        const element = createElement('base-checkbox-group', {
            is: CheckboxGroup
        });
        document.body.appendChild(element);

        element.accessKey = 'K';
        const button = element.shadowRoot.querySelector('lightning-button');

        return Promise.resolve().then(() => {
            expect(button.accessKey).toBe('K');
        });
    });
});
