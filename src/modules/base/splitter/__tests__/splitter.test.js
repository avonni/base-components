import { createElement } from 'lwc';
import Splitter from 'c/splitter';

describe('Splitter', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-splitter', {
            is: Splitter
        });

        expect(element.orientation).toBe('horizontal');
    });

    /* ----- ATTRIBUTES ----- */

    // orientation
    it('orientation = horizontal', () => {
        const element = createElement('base-splitter', {
            is: Splitter
        });

        document.body.appendChild(element);
        element.orientation = 'horizontal';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('div');
            expect(wrapper.classList).not.toContain(
                'splitter-orientation-vertical'
            );
            expect(wrapper.classList).toContain(
                'splitter-orientation-horizontal'
            );
        });
    });

    it('orientation = vertical', () => {
        const element = createElement('base-splitter', {
            is: Splitter
        });

        document.body.appendChild(element);
        element.orientation = 'vertical';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('div');
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
    it('changeHeight method', () => {
        const element = createElement('base-splitter', {
            is: Splitter
        });

        document.body.appendChild(element);
        element.changeHeight(300);

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('div');
            expect(wrapper.style.height).toBe('300px');
        });
    });
});
