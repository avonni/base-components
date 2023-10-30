import { createElement } from 'lwc';
import Splitter from '../splitter';

let element;
describe('Splitter', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-splitter', {
            is: Splitter
        });
        document.body.appendChild(element);
    });

    it('Splitter: Default attributes', () => {
        expect(element.orientation).toBe('horizontal');
    });

    /* ----- ATTRIBUTES ----- */

    // orientation
    it('Splitter: orientation = horizontal', () => {
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div"]'
            );
            expect(wrapper.classList).not.toContain(
                'splitter-orientation-vertical'
            );
            expect(wrapper.classList).toContain(
                'splitter-orientation-horizontal'
            );
        });
    });

    it('Splitter: orientation = vertical', () => {
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div"]'
            );
            expect(wrapper.classList).toContain(
                'splitter-orientation-vertical'
            );
            expect(wrapper.classList).not.toContain(
                'splitter-orientation-horizontal'
            );
        });
    });

    /* ----- METHODS ----- */

    // changeHeight
    it('Splitter: changeHeight method', () => {
        element.changeHeight(300);

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div"]'
            );
            expect(wrapper.style.height).toBe('300px');
        });
    });
});
