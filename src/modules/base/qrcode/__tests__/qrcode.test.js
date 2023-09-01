

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

    it('Qrcode: Default attributes', () => {
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

    /* ----- ATTRIBUTES ----- */
    // background
    it('Qrcode: background', () => {
        element.background = '#000000';

        return Promise.resolve().then(() => {
            expect(element.background).toBe('#000000');
        });
    });

    // border-color and border-width
    // Depends on renderAs and value
    it('Qrcode: borderColor and borderWidth', () => {
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

    // color
    it('Qrcode: color', () => {
        element.color = '#ffffff';

        return Promise.resolve().then(() => {
            expect(element.color).toBe('#ffffff');
        });
    });

    // padding
    // Depends on renderAs and value
    it('Qrcode: padding', () => {
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

    // render-as
    it('Qrcode: renderAs = svg', () => {
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

    it('Qrcode: renderAs = canvas', () => {
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

    // size
    // Depends on value and renderAs
    it('Qrcode: size', () => {
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
