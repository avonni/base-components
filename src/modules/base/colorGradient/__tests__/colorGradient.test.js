import { createElement } from 'lwc';
import ColorGradient from 'c/colorGradient';

describe('Color Gradient', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Color Gradient Default attributes', () => {
        const element = createElement('base-color-gradient', {
            is: ColorGradient
        });

        expect(element.disabled).toBeFalsy();
        expect(element.value).toBe('#ffffff');
        expect(element.readOnly).toBeFalsy();
        expect(element.opacity).toBeFalsy();
        expect(element.messageWhenBadInput).toBe(
            'Please ensure value is correct'
        );
    });

    /* ----- ATTRIBUTES ----- */

    // disabled
    it('Color Gradient disabled', () => {
        const element = createElement('base-color-gradient', {
            is: ColorGradient
        });
        document.body.appendChild(element);

        element.disabled = true;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('input');
            inputs.forEach((input) => {
                expect(input.disabled).toBeTruthy();
            });
            const indicator = element.shadowRoot.querySelector(
                '.slds-color-picker__range-indicator'
            );
            expect(indicator).toBeFalsy();
            const gradient = element.shadowRoot.querySelector(
                '.slds-color-picker__custom-range'
            );
            expect(gradient.style.background).toBe('rgb(236, 235, 234)');
        });
    });

    it('Color Gradient disabled with opacity', () => {
        const element = createElement('base-color-gradient', {
            is: ColorGradient
        });
        document.body.appendChild(element);

        element.disabled = true;
        element.opacity = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '.avonni-opacity-input'
            );
            expect(input.disabled).toBeTruthy();
        });
    });

    // read only
    it('Color Gradient read only', () => {
        const element = createElement('base-color-gradient', {
            is: ColorGradient
        });
        document.body.appendChild(element);

        element.readOnly = true;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('input');
            inputs.forEach((input) => {
                expect(input.disabled).toBeTruthy();
            });
            const indicator = element.shadowRoot.querySelector(
                '.slds-color-picker__range-indicator'
            );
            expect(indicator).toBeTruthy();
        });
    });

    it('Color Gradient read only with opacity', () => {
        const element = createElement('base-color-gradient', {
            is: ColorGradient
        });
        document.body.appendChild(element);

        element.readOnly = true;
        element.opacity = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '.avonni-opacity-input'
            );
            expect(input.disabled).toBeTruthy();
        });
    });

    // opacity
    it('Color Gradient opacity', () => {
        const element = createElement('base-color-gradient', {
            is: ColorGradient
        });
        document.body.appendChild(element);

        element.opacity = true;

        return Promise.resolve().then(() => {
            const opacityInput = element.shadowRoot.querySelector(
                '.slds-color-picker__hue-and-preview.avonni-opacity'
            );
            expect(opacityInput).toBeTruthy();
        });
    });
});
