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

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.collapsed).toBeFalsy();
            expect(element.collapsedSize).toBeUndefined();
            expect(element.collapsible).toBeFalsy();
            expect(element.max).toBeUndefined();
            expect(element.min).toBeUndefined();
            expect(element.resizable).toBeFalsy();
            expect(element.scrollable).toBeFalsy();
            expect(element.size).toBeUndefined();
        });

        describe('collapsed', () => {
            it('false', () => {
                element.collapsed = false;

                return Promise.resolve().then(() => {
                    expect(element.getAttribute('collapsed')).toBe('false');
                });
            });

            it('true', () => {
                element.collapsed = true;

                return Promise.resolve().then(() => {
                    expect(element.getAttribute('collapsed')).toBe('true');
                });
            });
        });

        describe('collapsedSize', () => {
            it('Passed to the component', () => {
                element.collapsedSize = '100px';

                return Promise.resolve().then(() => {
                    expect(element.getAttribute('collapsedSize')).toBe('100px');
                });
            });
        });

        describe('collapsible', () => {
            it('false', () => {
                element.collapsible = false;

                return Promise.resolve().then(() => {
                    expect(element.getAttribute('collapsible')).toBe('false');
                });
            });

            it('true', () => {
                element.collapsible = true;

                return Promise.resolve().then(() => {
                    expect(element.getAttribute('collapsible')).toBe('true');
                });
            });
        });

        describe('max', () => {
            it('Passed to the component', () => {
                element.max = '50%';

                return Promise.resolve().then(() => {
                    expect(element.getAttribute('max')).toBe('50%');
                });
            });
        });

        describe('min', () => {
            it('Passed to the component', () => {
                element.min = '300px';

                return Promise.resolve().then(() => {
                    expect(element.getAttribute('min')).toBe('300px');
                });
            });
        });

        describe('resizable', () => {
            it('false', () => {
                element.resizable = false;

                return Promise.resolve().then(() => {
                    expect(element.getAttribute('resizable')).toBe('false');
                });
            });

            it('true', () => {
                element.resizable = true;

                return Promise.resolve().then(() => {
                    expect(element.getAttribute('resizable')).toBe('true');
                });
            });
        });

        describe('scrollable', () => {
            it('false', () => {
                element.scrollable = false;

                return Promise.resolve().then(() => {
                    expect(element.getAttribute('scrollable')).toBe('false');
                });
            });

            it('true', () => {
                element.scrollable = true;

                return Promise.resolve().then(() => {
                    expect(element.getAttribute('scrollable')).toBe('true');
                });
            });
        });

        describe('size', () => {
            it('Passed to the component', () => {
                element.size = '40%';

                return Promise.resolve().then(() => {
                    expect(element.getAttribute('size')).toBe('40%');
                });
            });
        });
    });
});
