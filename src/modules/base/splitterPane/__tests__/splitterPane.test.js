import { createElement } from 'lwc';
import SplitterPane from 'c/splitterPane';

describe('SplitterPane', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-splitter-pane', {
            is: SplitterPane
        });

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
    it('collapsed = false', () => {
        const element = createElement('base-splitter-pane', {
            is: SplitterPane
        });

        document.body.appendChild(element);
        element.collapsed = false;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('collapsed')).toBe('false');
        });
    });

    it('collapsed = true', () => {
        const element = createElement('base-splitter-pane', {
            is: SplitterPane
        });

        document.body.appendChild(element);
        element.collapsed = true;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('collapsed')).toBe('true');
        });
    });

    // collapsed-size
    it('collapsedSize', () => {
        const element = createElement('base-splitter-pane', {
            is: SplitterPane
        });

        document.body.appendChild(element);
        element.collapsedSize = '100px';

        return Promise.resolve().then(() => {
            expect(element.getAttribute('collapsedSize')).toBe('100px');
        });
    });

    // collapsible
    it('collapsible = false', () => {
        const element = createElement('base-splitter-pane', {
            is: SplitterPane
        });

        document.body.appendChild(element);
        element.collapsible = false;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('collapsible')).toBe('false');
        });
    });

    it('collapsible = true', () => {
        const element = createElement('base-splitter-pane', {
            is: SplitterPane
        });

        document.body.appendChild(element);
        element.collapsible = true;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('collapsible')).toBe('true');
        });
    });

    // max
    it('max', () => {
        const element = createElement('base-splitter-pane', {
            is: SplitterPane
        });

        document.body.appendChild(element);
        element.max = '50%';

        return Promise.resolve().then(() => {
            expect(element.getAttribute('max')).toBe('50%');
        });
    });

    // min
    it('min', () => {
        const element = createElement('base-splitter-pane', {
            is: SplitterPane
        });

        document.body.appendChild(element);
        element.min = '300px';

        return Promise.resolve().then(() => {
            expect(element.getAttribute('min')).toBe('300px');
        });
    });

    // resizable
    it('resizable = false', () => {
        const element = createElement('base-splitter-pane', {
            is: SplitterPane
        });

        document.body.appendChild(element);
        element.resizable = false;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('resizable')).toBe('false');
        });
    });

    it('resizable = true', () => {
        const element = createElement('base-splitter-pane', {
            is: SplitterPane
        });

        document.body.appendChild(element);
        element.resizable = true;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('resizable')).toBe('true');
        });
    });

    // scrollable
    it('scrollable = false', () => {
        const element = createElement('base-splitter-pane', {
            is: SplitterPane
        });

        document.body.appendChild(element);
        element.scrollable = false;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('scrollable')).toBe('false');
        });
    });

    it('scrollable = true', () => {
        const element = createElement('base-splitter-pane', {
            is: SplitterPane
        });

        document.body.appendChild(element);
        element.scrollable = true;

        return Promise.resolve().then(() => {
            expect(element.getAttribute('scrollable')).toBe('true');
        });
    });

    // size
    it('size', () => {
        const element = createElement('base-splitter-pane', {
            is: SplitterPane
        });

        document.body.appendChild(element);
        element.size = '40%';

        return Promise.resolve().then(() => {
            expect(element.getAttribute('size')).toBe('40%');
        });
    });
});
