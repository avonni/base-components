

import { createElement } from 'lwc';
import SplitterPane from '../splitterPane';

let element;
describe('SplitterPane', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-splitter-pane', {
            is: SplitterPane
        });
        document.body.appendChild(element);
    });

    it('Splitter pane: Default attributes', () => {
        expect(element.collapsed).toBeFalsy();
        expect(element.collapsedSize).toBeUndefined();
        expect(element.collapsible).toBeFalsy();
        expect(element.max).toBeUndefined();
        expect(element.min).toBeUndefined();
        expect(element.resizable).toBeFalsy();
        expect(element.scrollable).toBeFalsy();
        expect(element.size).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // collapsed
    it('Splitter pane: collapsed = false', () => {
        element.collapsed = false;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('collapsed')).toBe('false');
        });
    });

    it('Splitter pane: collapsed = true', () => {
        element.collapsed = true;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('collapsed')).toBe('true');
        });
    });

    // collapsed-size
    it('Splitter pane: collapsedSize', () => {
        element.collapsedSize = '100px';

        return Promise.resolve().then(() => {
            expect(element.getAttribute('collapsedSize')).toBe('100px');
        });
    });

    // collapsible
    it('Splitter pane: collapsible = false', () => {
        element.collapsible = false;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('collapsible')).toBe('false');
        });
    });

    it('Splitter pane: collapsible = true', () => {
        element.collapsible = true;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('collapsible')).toBe('true');
        });
    });

    // max
    it('Splitter pane: max', () => {
        element.max = '50%';

        return Promise.resolve().then(() => {
            expect(element.getAttribute('max')).toBe('50%');
        });
    });

    // min
    it('Splitter pane: min', () => {
        element.min = '300px';

        return Promise.resolve().then(() => {
            expect(element.getAttribute('min')).toBe('300px');
        });
    });

    // resizable
    it('Splitter pane: resizable = false', () => {
        element.resizable = false;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('resizable')).toBe('false');
        });
    });

    it('Splitter pane: resizable = true', () => {
        element.resizable = true;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('resizable')).toBe('true');
        });
    });

    // scrollable
    it('Splitter pane: scrollable = false', () => {
        element.scrollable = false;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('scrollable')).toBe('false');
        });
    });

    it('Splitter pane: scrollable = true', () => {
        element.scrollable = true;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('scrollable')).toBe('true');
        });
    });

    // size
    it('Splitter pane: size', () => {
        element.size = '40%';

        return Promise.resolve().then(() => {
            expect(element.getAttribute('size')).toBe('40%');
        });
    });
});
