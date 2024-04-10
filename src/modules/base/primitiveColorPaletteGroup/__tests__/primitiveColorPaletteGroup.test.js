import { createElement } from 'lwc';
import PrimitiveColorPaletteGroup from '../primitiveColorPaletteGroup';

let element;
describe('Primitive Color Palette Group', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-primitive-color-palette-group', {
            is: PrimitiveColorPaletteGroup
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        // expect(element.title).toBeUndefined();
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    // title
    it('Primitive Color Palette Group: title', () => {
        // element.title = 'This is a title text';
        // return Promise.resolve().then(() => {
        //     const title = element.shadowRoot.querySelector(
        //         '[data-element-id="div-title"]'
        //     );
        //     expect(title.textContent).toBe('This is a title text');
        // });
    });
});
