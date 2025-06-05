import { createElement } from 'lwc';
import Qrcode from 'c/qrcode';

// Not tested due to impossibility of targetting svg:
// background
// color

// Not tested because depends on an external library:
// encoding
// errorCorrection
// value

// Mock function to avoid error in canvas logic
HTMLCanvasElement.prototype.getContext = () => {
    return true;
};

let element;
describe('Qrcode', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-qrcode', {
            is: Qrcode
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.alternativeText).toBeUndefined();
            expect(element.background).toBeUndefined();
            expect(element.borderColor).toBeUndefined();
            expect(element.borderWidth).toBe(0);
            expect(element.color).toBeUndefined();
            expect(element.encoding).toBe('ISO_8859_1');
            expect(element.errorCorrection).toBe('L');
            expect(element.padding).toBe(0);
            expect(element.renderAs).toBe('svg');
            expect(element.size).toBe(200);
            expect(element.value).toBeUndefined();
        });

        describe('alternative text', () => {
            it('Passed to the component', () => {
                element.alternativeText = 'Test';

                return Promise.resolve().then(() => {
                    const assistiveText = element.shadowRoot.querySelector(
                        '[data-element-id="qrcode-assistive-text"]'
                    );
                    expect(assistiveText.textContent).toBe('Test');
                });
            });
        });

        describe('background', () => {
            it('Passed to the component', () => {
                element.background = '#000000';

                return Promise.resolve().then(() => {
                    expect(element.background).toBe('#000000');
                });
            });
        });

        describe('borderColor and borderWidth', () => {
            it('Passed to the component', () => {
                element.borderColor = 'tomato';
                element.borderWidth = 25;
                element.renderAs = 'canvas';
                element.value = 'A string value';

                return Promise.resolve().then(() => {
                    const canvas = element.shadowRoot.querySelector(
                        '[data-element-id="canvas"]'
                    );
                    expect(canvas.style.border).toBe('25px solid tomato');
                });
            });
        });

        describe('color', () => {
            it('Passed to the component', () => {
                element.color = '#ffffff';

                return Promise.resolve().then(() => {
                    expect(element.color).toBe('#ffffff');
                });
            });
        });

        // Depends on renderAs and value
        describe('padding', () => {
            it('Passed to the component', () => {
                element.padding = 34;
                element.renderAs = 'canvas';
                element.value = 'A string value';

                return Promise.resolve().then(() => {
                    const canvas = element.shadowRoot.querySelector(
                        '[data-element-id="canvas"]'
                    );
                    expect(canvas.style.padding).toBe('34px');
                });
            });
        });

        describe('Render As', () => {
            it('renderAs = svg', () => {
                element.renderAs = 'svg';

                return Promise.resolve().then(() => {
                    const canvas = element.shadowRoot.querySelector(
                        '[data-element-id="canvas"]'
                    );
                    const svg = element.shadowRoot.querySelector(
                        '[data-element-id="span"]'
                    );

                    expect(canvas).toBeFalsy();
                    expect(svg).toBeTruthy();
                });
            });

            it('renderAs = canvas', () => {
                element.renderAs = 'canvas';

                return Promise.resolve().then(() => {
                    const canvas = element.shadowRoot.querySelector(
                        '[data-element-id="canvas"]'
                    );
                    const svg = element.shadowRoot.querySelector(
                        '[data-element-id="span"]'
                    );

                    expect(canvas).toBeTruthy();
                    expect(svg).toBeFalsy();
                });
            });
        });

        // Depends on value and renderAs
        describe('size', () => {
            it('Passed to the component', () => {
                element.renderAs = 'canvas';
                element.value = 'A string value';
                element.size = 45;

                return Promise.resolve().then(() => {
                    const canvas = element.shadowRoot.querySelector(
                        '[data-element-id="canvas"]'
                    );
                    expect(canvas.width).toBe(45);
                    expect(canvas.height).toBe(45);
                    expect(canvas.style.maxWidth).toBe('45px');
                });
            });
        });
    });
});
