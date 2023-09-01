

import { createElement } from 'lwc';
import PrimitiveSvgIcon from '../primitiveSvgIcon';

let element;
describe('Primitive Svg Icon', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-primitive-svg-icon', {
            is: PrimitiveSvgIcon
        });
        document.body.appendChild(element);
    });

    it('Primitive Svg Icon: Default attributes', () => {
        expect(element.name).toBe('eraser');
        expect(element.svgClass).toBeUndefined();
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    // name
    it('Primitive Svg Icon: name = eraser', () => {
        element.name = 'eraser';

        return Promise.resolve().then(() => {
            const svg = element.shadowRoot.querySelector(
                '[data-element-id="svg-eraser"]'
            );
            expect(svg).toBeTruthy();
        });
    });

    it('Primitive Svg Icon: name = inkPen', () => {
        element.name = 'inkPen';

        return Promise.resolve().then(() => {
            const svg = element.shadowRoot.querySelector(
                '[data-element-id="svg-ink-pen"]'
            );
            expect(svg).toBeTruthy();
        });
    });

    // svg-class
    it('Primitive Svg Icon: svgClass', () => {
        element.svgClass = 'slds-button__icon';

        return Promise.resolve().then(() => {
            const svg = element.shadowRoot.querySelector(
                '[data-element-id="svg-eraser"]'
            );
            expect(svg.classList).toContain('slds-button__icon');
        });
    });
});
