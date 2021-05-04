import { createElement } from 'lwc';
import ColorGradient from 'c/colorGradient';

// not tested
// message when bad input

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

    // value
    it('Color Gradient value', () => {
        const element = createElement('base-color-gradient', {
            is: ColorGradient
        });

        document.body.appendChild(element);

        element.value = '#b63e3e';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '.slds-form-element__control > input'
            );
            expect(input.value).toBe('#b63e3e');
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

    /* ----- JS ----- */

    // private focus
    it('Color Gradient private focus', () => {
        const element = createElement('base-color-gradient', {
            is: ColorGradient
        });
        document.body.appendChild(element);

        let focusEvent = false;
        const input = element.shadowRoot.querySelector('input');

        element.addEventListener('privatefocus', (event) => {
            focusEvent = true;
            expect(event.bubbles).toBeTruthy();
            expect(event.cancelable).toBeTruthy();
            expect(event.composed).toBeFalsy();
        });

        input.focus();
        return Promise.resolve().then(() => {
            expect(focusEvent).toBeTruthy();
        });
    });

    // private blur
    it('Color Gradient private blur', () => {
        const element = createElement('base-color-gradient', {
            is: ColorGradient
        });
        document.body.appendChild(element);

        let blurEvent = false;
        const input = element.shadowRoot.querySelector('input');

        element.addEventListener('privateblur', (event) => {
            blurEvent = true;
            expect(event.bubbles).toBeTruthy();
            expect(event.cancelable).toBeTruthy();
            expect(event.composed).toBeTruthy();
        });

        input.focus();
        input.blur();
        return Promise.resolve().then(() => {
            expect(blurEvent).toBeTruthy();
        });
    });

    /* ----- EVENTS ----- */

    // color gradient change
    it('Color Gradient change event', () => {
        const element = createElement('base-color-gradient', {
            is: ColorGradient
        });
        document.body.appendChild(element);
        element.value = '#ffffff';

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('.slds-input');
            input.dispatchEvent(new CustomEvent('input'));
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.hex).toBe('#ffffff');
            expect(handler.mock.calls[0][0].detail.hexa).toBe('#ffffffff');
            expect(handler.mock.calls[0][0].detail.rgb).toBe(
                'rgb(255,255,255)'
            );
            expect(handler.mock.calls[0][0].detail.rgba).toBe(
                'rgba(255,255,255,1)'
            );
            expect(handler.mock.calls[0][0].detail.alpha).toBe('1');
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        });
    });
});
