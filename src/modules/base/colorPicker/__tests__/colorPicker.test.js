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
            expect(button.disabled).toBe(true);
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
    //     document.body.appendChild(element);

    //     element.isLoading = true;

    //     return Promise.resolve().then(() => {
    //         const button = element.shadowRoot.querySelector('button')
    //         const drop = element.shadowRoot.querySelector('.slds-dropdown-trigger')
    //         element.focus()
    //         button.click()
    //         console.log(drop.className)
    //         const spinner = element.shadowRoot.querySelector('lightning-spinner')
    //         expect(spinner).toBeTruthy();
    //     });
    // });
});
