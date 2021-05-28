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

describe('Qrcode', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-qrcode', {
            is: Qrcode
        });

        expect(element.background).toBe('#fff');
        expect(element.borderColor).toBeUndefined();
        expect(element.borderWidth).toBe(0);
        expect(element.color).toBe('#000');
        expect(element.encoding).toBe('ISO_8859_1');
        expect(element.errorCorrection).toBe('L');
        expect(element.padding).toBe(0);
        expect(element.renderAs).toBe('svg');
        expect(element.size).toBe(200);
        expect(element.value).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // border-color and border-width
    // Depends on renderAs and value
    it('borderColor and borderWidth', () => {
        const element = createElement('base-qrcode', {
            is: Qrcode
        });

        document.body.appendChild(element);

        element.borderColor = 'tomato';
        element.borderWidth = 25;
        element.renderAs = 'canvas';
        element.value = 'A string value';

        return Promise.resolve().then(() => {
            const canvas = element.shadowRoot.querySelector('canvas');
            expect(canvas.style.border).toBe('25px solid tomato');
        });
    });

    // padding
    // Depends on renderAs and value
    it('padding', () => {
        const element = createElement('base-qrcode', {
            is: Qrcode
        });

        document.body.appendChild(element);

        element.padding = 34;
        element.renderAs = 'canvas';
        element.value = 'A string value';

        return Promise.resolve().then(() => {
            const canvas = element.shadowRoot.querySelector('canvas');
            expect(canvas.style.padding).toBe('34px');
        });
    });

    // render-as
    it('renderAs = svg', () => {
        const element = createElement('base-qrcode', {
            is: Qrcode
        });

        document.body.appendChild(element);

        element.renderAs = 'svg';

        return Promise.resolve().then(() => {
            const canvas = element.shadowRoot.querySelector('canvas');
            const svg = element.shadowRoot.querySelector('span');

            expect(canvas).toBeFalsy();
            expect(svg).toBeTruthy();
        });
    });

    it('renderAs = canvas', () => {
        const element = createElement('base-qrcode', {
            is: Qrcode
        });

        document.body.appendChild(element);

        element.renderAs = 'canvas';

        return Promise.resolve().then(() => {
            const canvas = element.shadowRoot.querySelector('canvas');
            const svg = element.shadowRoot.querySelector('span');

            expect(canvas).toBeTruthy();
            expect(svg).toBeFalsy();
        });
    });

    // size
    // Depends on value and renderAs
    it('size', () => {
        const element = createElement('base-qrcode', {
            is: Qrcode
        });

        document.body.appendChild(element);

        element.renderAs = 'canvas';
        element.value = 'A string value';
        element.size = 45;

        return Promise.resolve().then(() => {
            const canvas = element.shadowRoot.querySelector('canvas');
            expect(canvas.width).toBe(45);
            expect(canvas.height).toBe(45);
            expect(canvas.style.maxWidth).toBe('45px');
        });
    });
});
