import { createElement } from 'lwc';
import PrimitiveCalendar from '../primitiveCalendar';

let element;
describe('Primitive Calendar', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-primitive-calendar', {
            is: PrimitiveCalendar
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
    it('Primitive Calendar: title', () => {
        // element.title = 'This is a title text';
        // return Promise.resolve().then(() => {
        //     const title = element.shadowRoot.querySelector(
        //         '[data-element-id="div-title"]'
        //     );
        //     expect(title.textContent).toBe('This is a title text');
        // });
    });
});
