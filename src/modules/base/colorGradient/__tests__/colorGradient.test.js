import { createElement } from 'lwc';
import ColorGradient from 'avonni/colorGradient';

// not tested
// message when bad input

let element;
describe('Color Gradient', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-color-gradient', {
            is: ColorGradient
        });
        document.body.appendChild(element);
        jest.useFakeTimers();
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.disabled).toBeFalsy();
            expect(element.messageWhenBadInput).toBe(
                'Please ensure value is correct'
            );
            expect(element.readOnly).toBeFalsy();
            expect(element.opacity).toBeFalsy();
            expect(element.value).toBe('#ffffff');
        });

        describe('disabled', () => {
            it('Passed to the component', () => {
                element.disabled = true;

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="input"]'
                    );
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
                    expect(gradient.style.background).toBe(
                        'rgb(236, 235, 234)'
                    );
                });
            });

            it('disabled with opacity', () => {
                element.disabled = true;
                element.opacity = true;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '.avonni-opacity-input'
                    );
                    expect(input.disabled).toBeTruthy();
                });
            });
        });

        describe('opacity', () => {
            it('Passed to the component', () => {
                element.opacity = true;

                return Promise.resolve().then(() => {
                    const opacityInput = element.shadowRoot.querySelector(
                        '.slds-color-picker__hue-and-preview.avonni-opacity'
                    );
                    expect(opacityInput).toBeTruthy();
                });
            });
        });

        describe('read only', () => {
            it('Passed to the component', () => {
                element.readOnly = true;

                return Promise.resolve().then(() => {
                    const inputs = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="input"]'
                    );
                    inputs.forEach((input) => {
                        expect(input.disabled).toBeTruthy();
                    });
                    const indicator = element.shadowRoot.querySelector(
                        '.slds-color-picker__range-indicator'
                    );
                    expect(indicator).toBeTruthy();
                });
            });

            it('read only with opacity', () => {
                element.readOnly = true;
                element.opacity = true;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '.avonni-opacity-input'
                    );
                    expect(input.disabled).toBeTruthy();
                });
            });
        });

        describe('value', () => {
            it('Passed to the component', () => {
                element.value = '#b63e3e';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '.slds-form-element__control > [data-element-id="input"]'
                    );
                    expect(input.value).toBe('#b63e3e');
                });
            });
        });
    });
    describe('Methods', () => {
        describe('private focus', () => {
            it('Passed to the component', () => {
                let focusEvent = false;
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

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
        });

        describe('private blur', () => {
            it('Passed to the component', () => {
                let blurEvent = false;
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

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
        });

        describe('render value', () => {
            it('Passed to the component', () => {
                element.value = '#b63e3e';
                element.renderValue('#ffffff');
                return Promise.resolve().then(() => {
                    expect(element.value).toBe('#ffffff');
                });
            });
        });

        describe('set opacity and disabled', () => {
            it('Passed to the component', () => {
                element.value = '#b63e3e';
                element.opacity = true;
                element.disabled = true;
                return Promise.resolve().then(() => {
                    element.renderValue('#fffff');
                    const opacity = element.shadowRoot.querySelector(
                        '.avonni-opacity-input'
                    );
                    expect(opacity.style.backgroundImage).toBe('none');
                });
            });
        });
    });

    describe('Events', () => {
        it('change event', () => {
            element.value = '#ffffff';

            const handler = jest.fn();
            element.addEventListener('change', handler);

            return Promise.resolve().then(() => {
                const input = element.shadowRoot.querySelector('.slds-input');
                input.dispatchEvent(new CustomEvent('input'));
                jest.runAllTimers();
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
});
