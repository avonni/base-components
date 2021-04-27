import { createElement } from 'lwc';
import ColorPicker from 'c/colorPicker';

describe('Color Picker', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Color Picker Default attributes', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        expect(element.accessKey).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.isLoading).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.readOnly).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.value).toBeUndefined();
        expect(element.variant).toBe('standard');
        expect(element.type).toBe('base');
        expect(element.menuVariant).toBe('border');
        expect(element.menuIconName).toBe('utility:down');
        expect(element.menuIconSize).toBe('x-small');
        expect(element.menuLabel).toBeUndefined();
        expect(element.menuAlignment).toBe('left');
        expect(element.menuNubbin).toBeFalsy();
        expect(element.colors).toMatchObject([
            '#e3abec',
            '#c2dbf6',
            '#9fd6ff',
            '#9de7da',
            '#9df0bf',
            '#fff099',
            '#fed49a',
            '#d073df',
            '#86b9f3',
            '#5ebbff',
            '#44d8be',
            '#3be281',
            '#ffe654',
            '#ffb758',
            '#bd35bd',
            '#5778c1',
            '#5ebbff',
            '#00aea9',
            '#3bba4c',
            '#f4bc25',
            '#f99120',
            '#580d8c',
            '#001870',
            '#0a2399',
            '#097476',
            '#096a50',
            '#b67d11',
            '#b85d0d'
        ]);
        expect(element.hideColorInput).toBeFalsy();
        expect(element.opacity).toBeFalsy();
        expect(element.messageWhenBadInput).toBe(
            'Please ensure value is correct'
        );
    });

    /* ----- ATTRIBUTES ----- */

    // access key
    it('Color Picker access key', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.accessKey = 'K';

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.accessKey).toBe('K');
        });
    });

    // disabled
    it('Color Picker disabled', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.disabled = true;

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('button');
            expect(button.disabled).toBeTruthy();
        });
    });

    // field level help
    it('Color Picker field level help', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.fieldLevelHelp = 'This is a field level help text';

        return Promise.resolve().then(() => {
            const helpText = element.shadowRoot.querySelector(
                'lightning-helptext'
            );
            expect(helpText.content).toBe('This is a field level help text');
        });
    });

    // isLoading
    // it('Color Picker isLoading', () => {
    //     const element = createElement('base-color-picker', {
    //         is: ColorPicker
    //     });

    //     element.isLoading = true;
    //     document.body.appendChild(element);

    //     return Promise.resolve().then(() => {
    // const button = element.shadowRoot.querySelector('button')
    // element.focus()
    // button.click()
    //         const spinner = element.shadowRoot.querySelector('lightning-spinner')
    //         expect(spinner).toBeTruthy();
    //     });
    // });

    // label
    it('Color Picker label', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.label = 'This is a label text';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector('label');
            expect(label.textContent).toBe('This is a label text');
        });
    });

    // name
    it('Color Picker name', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.name = 'This is a name text';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.name).toBe('This is a name text');
        });
    });

    // readOnly
    it('Color Picker readOnly', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.readOnly = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.disabled).toBeTruthy();
        });
    });

    // required
    it('Color Picker required', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.required = true;

        return Promise.resolve().then(() => {
            const required = element.shadowRoot.querySelector('.slds-required');
            expect(required).toBeTruthy();
            expect(required.textContent).toBe('*');
        });
    });

    // value
    it('Color Picker value', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.value = '#419fec';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.value).toBe('#419fec');
        });
    });

    // variant
    it('Color Picker variant standard', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.variant = 'standard';

        return Promise.resolve().then(() => {
            const labelHidden = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            const labelStacked = element.shadowRoot.querySelector(
                '.slds-form-element_stacked'
            );
            const labelInline = element.shadowRoot.querySelector(
                '.avonni-label-inline'
            );
            expect(labelInline).toBeFalsy();
            expect(labelStacked).toBeFalsy();
            expect(labelHidden).toBeFalsy();
        });
    });

    it('Color Picker variant label-stacked', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.variant = 'label-stacked';

        return Promise.resolve().then(() => {
            const labelHidden = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            const labelStacked = element.shadowRoot.querySelector(
                '.slds-form-element_stacked'
            );
            const labelInline = element.shadowRoot.querySelector(
                '.avonni-label-inline'
            );
            expect(labelInline).toBeFalsy();
            expect(labelStacked).toBeTruthy();
            expect(labelHidden).toBeFalsy();
        });
    });

    it('Color Picker variant label-hidden', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.variant = 'label-hidden';
        element.label = 'label-hidden';

        return Promise.resolve().then(() => {
            const labelHidden = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            const labelStacked = element.shadowRoot.querySelector(
                '.slds-form-element_stacked'
            );
            const labelInline = element.shadowRoot.querySelector(
                '.avonni-label-inline'
            );
            expect(labelInline).toBeFalsy();
            expect(labelStacked).toBeFalsy();
            expect(labelHidden).toBeTruthy();
            expect(labelHidden.textContent).toBe('label-hidden');
        });
    });

    it('Color Picker variant label-inline', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });
        document.body.appendChild(element);

        element.variant = 'label-inline';

        return Promise.resolve().then(() => {
            const labelHidden = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            const labelStacked = element.shadowRoot.querySelector(
                '.slds-form-element_stacked'
            );
            const labelInline = element.shadowRoot.querySelector(
                '.avonni-label-inline'
            );
            expect(labelInline).toBeTruthy();
            expect(labelStacked).toBeFalsy();
            expect(labelHidden).toBeFalsy();
        });
    });

    // type
    it('Color Picker type', () => {
        const element = createElement('base-color-picker', {
            is: ColorPicker
        });

        element.type = 'base';
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            element.focus();
            const button = element.shadowRoot.querySelector('button');
            button.click();
            const palette = element.shadowRoot.querySelector(
                '.slds-tabs_default'
            );
            expect(palette).toBeTruthy();
        });
    });
});
