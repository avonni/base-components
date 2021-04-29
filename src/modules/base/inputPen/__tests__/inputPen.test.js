import { createElement } from 'lwc';
import InputPen from 'c/inputPen';

describe('Input pen', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Input pen Default attributes', () => {
        const element = createElement('base-input-pen', {
            is: InputPen
        });

        expect(element.disabled).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.readOnly).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.variant).toBe('bottom-toolbar');
        expect(element.hideControls).toBeFalsy();
        expect(element.value).toBeUndefined();
        expect(element.disabledButtons).toMatchObject([]);
        expect(element.invalid).toBeFalsy();
        expect(element.color).toBe('#000');
        expect(element.size).toBe(2);
        expect(element.mode).toBe('draw');
    });

    /* ----- ATTRIBUTES ----- */

    // disabled
    it('Input pen disabled', () => {
        const element = createElement('base-input-pen', {
            is: InputPen
        });
        document.body.appendChild(element);

        element.disabled = true;

        return Promise.resolve().then(() => {
            const buttonIcons = element.shadowRoot.querySelectorAll(
                'lightning-button-icon'
            );
            buttonIcons.forEach((button) => {
                expect(button.disabled).toBeTruthy();
            });
            const combobox = element.shadowRoot.querySelector(
                'lightning-combobox'
            );
            expect(combobox.disabled).toBeTruthy();
            const colorPicker = element.shadowRoot.querySelector(
                'c-color-picker'
            );
            expect(colorPicker.disabled).toBeTruthy();
            expect(element.classList).toContain('avonni-disabled');
        });
    });

    // label
    it('Input pen label', () => {
        const element = createElement('base-input-pen', {
            is: InputPen
        });
        document.body.appendChild(element);

        element.label = 'This is a label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.textContent).toBe('This is a label');
        });
    });

    // field level help
    it('Input pen field level help', () => {
        const element = createElement('base-input-pen', {
            is: InputPen
        });
        document.body.appendChild(element);

        element.fieldLevelHelp = 'This is a fieldLevelHelp text';

        return Promise.resolve().then(() => {
            const helpText = element.shadowRoot.querySelector(
                'lightning-helptext'
            );
            expect(helpText.content).toBe('This is a fieldLevelHelp text');
        });
    });

    // read only
    it('Input pen read only', () => {
        const element = createElement('base-input-pen', {
            is: InputPen
        });
        document.body.appendChild(element);

        element.readOnly = true;

        return Promise.resolve().then(() => {
            expect(element.classList).toContain('avonni-disabled');
        });
    });

    // required needs label
    it('Input pen required', () => {
        const element = createElement('base-input-pen', {
            is: InputPen
        });
        document.body.appendChild(element);

        element.label = 'label';
        element.required = true;

        return Promise.resolve().then(() => {
            const required = element.shadowRoot.querySelector('.slds-required');
            expect(required).toBeTruthy();
            expect(required.textContent).toBe('*');
        });
    });

    // variant
    it('Input pen variant bottom-toolbar', () => {
        const element = createElement('base-input-pen', {
            is: InputPen
        });
        document.body.appendChild(element);

        element.variant = 'bottom-toolbar';

        return Promise.resolve().then(() => {
            expect(element.classList).toContain('avonni-reverse');
        });
    });

    it('Input pen variant top-toolbar', () => {
        const element = createElement('base-input-pen', {
            is: InputPen
        });
        document.body.appendChild(element);

        element.variant = 'top-toolbar';

        return Promise.resolve().then(() => {
            expect(element.classList).not.toContain('avonni-reverse');
        });
    });

    // hide controls
    it('Input pen hide controls', () => {
        const element = createElement('base-input-pen', {
            is: InputPen
        });
        document.body.appendChild(element);

        element.hideControls = true;

        return Promise.resolve().then(() => {
            const toolbar = element.shadowRoot.querySelector(
                '.slds-rich-text-editor__toolbar'
            );
            expect(toolbar).toBeFalsy();
        });
    });

    // disabled buttons
    it('Input pen disabled buttons pen', () => {
        const element = createElement('base-input-pen', {
            is: InputPen
        });
        document.body.appendChild(element);

        element.disabledButtons = 'pen';

        return Promise.resolve().then(() => {
            const draw = element.shadowRoot.querySelector(
                "lightning-button-icon[title='Draw']"
            );
            expect(draw).toBeFalsy();
        });
    });

    it('Input pen disabled buttons eraser', () => {
        const element = createElement('base-input-pen', {
            is: InputPen
        });
        document.body.appendChild(element);

        element.disabledButtons = 'eraser';

        return Promise.resolve().then(() => {
            const erase = element.shadowRoot.querySelector(
                "lightning-button-icon[title='Erase']"
            );
            expect(erase).toBeFalsy();
        });
    });

    it('Input pen disabled buttons clear', () => {
        const element = createElement('base-input-pen', {
            is: InputPen
        });
        document.body.appendChild(element);

        element.disabledButtons = 'clear';

        return Promise.resolve().then(() => {
            const erase = element.shadowRoot.querySelector(
                "lightning-button-icon[title='Clear']"
            );
            expect(erase).toBeFalsy();
        });
    });

    it('Input pen disabled buttons size', () => {
        const element = createElement('base-input-pen', {
            is: InputPen
        });
        document.body.appendChild(element);

        element.disabledButtons = 'size';

        return Promise.resolve().then(() => {
            const size = element.shadowRoot.querySelector('lightning-combobox');
            expect(size).toBeFalsy();
        });
    });

    it('Input pen disabled buttons color', () => {
        const element = createElement('base-input-pen', {
            is: InputPen
        });
        document.body.appendChild(element);

        element.disabledButtons = 'color';

        return Promise.resolve().then(() => {
            const color = element.shadowRoot.querySelector('c-color-picker');
            expect(color).toBeFalsy();
        });
    });

    // invalid
    it('Input pen invalid', () => {
        const element = createElement('base-input-pen', {
            is: InputPen
        });

        element.invalid = true;
        element.value =
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAD4AAAAfCAYAAAC/MX7XAAACBElEQVRYR+2XT0sbQRjGnzdGCj1I9Sb2mJv4KcSjIEraQjz00ssOTnY+SWY3WYMIHkoppYdqDp7sN+ixnntrKfTPTUE0eUUwNgSTmdnddDdk9zrvn+f3PjPsDGFGP5pRbhTgs+Z84Xjh+IxMYKq2upLiiIFdAPOD/jDjZ9CMll08mxbwUn3PuyKi8jg4pl4tCNrvbQaQa/B7h7cALNrAAGAdRiWb2LyCl3wpLgE8sYEYjCHC90YQPTfl5Q5cKbHau+GvRBRXm5XrcYubBuq87ktxCOAFgAXn5KEEHUZGLmPAKBFKihMGNgA8vY/5C+Yz3dx/5SJcSfGRgW0Acy5542InAq48r8JlOo9z/tICM9SZzFb3pbgYcPk/sTi1+aHDaMWU4bTV/br3AUwvTUWzXLfZ5nf63MCl+ANgKUuw8RcYqgVBK/0LjC8F5xGamblU5kqj0f5mq8/V8RyC07kOW2u2wP04J/C6FBf07/fl2ivNeCbgbSOMXsct6gSupPjMwHrcZinkdUHU0UFrJ2ktJ/C7Zr4U1wDGvpKSinokvwvgnU7g8HBNZ3ClvAp36QuAZxMAHC7ZA/BJh1E17V7O4H0Bft07BtNmmlfNAbjfBJwmOcOmQcUGfxiAFAfMqBJZv5lHafoFoKPD6I1JdBrricHTEJFFjQI8i6ln2bNwPMvpZ9H7FthrgyBtDlzVAAAAAElFTkSuQmCC';
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const form = element.shadowRoot.querySelector('.slds-form-element');
            expect(form.classList).toBe('slds-form-element slds-has-error');
        });
    });
});
