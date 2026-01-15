import { createElement } from 'lwc';
import LayoutItem from '../layoutItem';

let element;
describe('Layout Item', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-layout-item', {
            is: LayoutItem
        });
        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(), 0);
        });
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */
    describe('Attributes', () => {
        it('Default attributes', () => {
            document.body.appendChild(element);
            expect(element.alignmentBump).toBeUndefined();
            expect(element.grow).toBe(0);
            expect(element.largeContainerOrder).toBeUndefined();
            expect(element.largeContainerSize).toBeUndefined();
            expect(element.mediumContainerOrder).toBeUndefined();
            expect(element.mediumContainerSize).toBeUndefined();
            expect(element.order).toBeUndefined();
            expect(element.shrink).toBe(1);
            expect(element.size).toBeUndefined();
            expect(element.smallContainerOrder).toBeUndefined();
            expect(element.smallContainerSize).toBeUndefined();
        });

        describe('Alignment bump', () => {
            it('alignmentBump = left', () => {
                document.body.appendChild(element);
                element.alignmentBump = 'left';
                expect(element.classList).toContain('slds-col_bump-left');
            });

            it('alignmentBump = right', () => {
                document.body.appendChild(element);
                element.alignmentBump = 'right';
                expect(element.classList).toContain('slds-col_bump-right');
            });

            it('alignmentBump = top', () => {
                document.body.appendChild(element);
                element.alignmentBump = 'top';
                expect(element.classList).toContain('slds-col_bump-top');
            });

            it('alignmentBump = bottom', () => {
                document.body.appendChild(element);
                element.alignmentBump = 'bottom';
                expect(element.classList).toContain('slds-col_bump-bottom');
            });
        });

        describe('Container orders', () => {
            it('container orders', () => {
                let setContainerSize;
                element.addEventListener(
                    'privatelayoutitemconnected',
                    (event) => {
                        setContainerSize =
                            event.detail.callbacks.setContainerSize;
                    }
                );
                document.body.appendChild(element);
                expect(element.style.order).toBe('0');

                element.largeContainerOrder = 3;
                element.mediumContainerOrder = 2;
                element.smallContainerOrder = 1;
                element.order = 6;

                expect(element.style.order).toBe('6');
                setContainerSize('large');
                expect(element.style.order).toBe('3');
                setContainerSize('medium');
                expect(element.style.order).toBe('2');
                setContainerSize('small');
                expect(element.style.order).toBe('1');
            });

            it('Inheritance', () => {
                let setContainerSize;
                element.addEventListener(
                    'privatelayoutitemconnected',
                    (event) => {
                        setContainerSize =
                            event.detail.callbacks.setContainerSize;
                    }
                );
                document.body.appendChild(element);
                setContainerSize('large');
                expect(element.style.order).toBe('0');

                element.order = 6;
                expect(element.style.order).toBe('6');
                element.largeContainerOrder = 3;
                expect(element.style.order).toBe('3');
            });
        });

        it('container sizes', () => {
            let setContainerSize;
            element.addEventListener('privatelayoutitemconnected', (event) => {
                setContainerSize = event.detail.callbacks.setContainerSize;
            });
            document.body.appendChild(element);
            expect(element.style.flex).toBe('0 1 auto');

            element.largeContainerSize = '3';
            element.mediumContainerSize = 12;
            element.smallContainerSize = 'auto';
            element.size = '4rem';
            expect(element.style.flex).toBe('0 1 4rem');
            setContainerSize('large');
            expect(element.style.flex).toBe('0 1 25%');
            setContainerSize('medium');
            expect(element.style.flex).toBe('0 1 100%');
            setContainerSize('small');
            expect(element.style.flex).toBe('0 1 auto');
        });

        describe('Grow', () => {
            it('Ignore invalid value', () => {
                document.body.appendChild(element);
                element.grow = -3;
                expect(element.style.flex).toBe('0 1 auto');

                element.grow = 'some text';
                expect(element.style.flex).toBe('0 1 auto');
            });

            it('Applied to the host', () => {
                document.body.appendChild(element);
                element.grow = 3;

                expect(element.style.flex).toBe('3 1 auto');
            });
        });

        describe('Shrink', () => {
            it('Ignore invalid value', () => {
                document.body.appendChild(element);
                element.shrink = -3;
                expect(element.style.flex).toBe('0 1 auto');

                element.shrink = 'some text';
                expect(element.style.flex).toBe('0 1 auto');
            });

            it('Applied to the host', () => {
                document.body.appendChild(element);
                element.shrink = 3;

                expect(element.style.flex).toBe('0 3 auto');
            });
        });
    });

    describe('Events', () => {
        // Connected and disconnected event
        it('connected and disconnected events', () => {
            const connectedHandler = jest.fn();
            const disconnectedHandler = jest.fn();
            element.addEventListener(
                'privatelayoutitemconnected',
                connectedHandler
            );
            element.addEventListener(
                'privatelayoutitemdisconnected',
                disconnectedHandler
            );
            document.body.appendChild(element);

            expect(connectedHandler).toHaveBeenCalled();
            const connectedCall = connectedHandler.mock.calls[0][0];
            expect(connectedCall.detail.name).toBeTruthy();
            expect(typeof connectedCall.detail.name).toBe('string');
            expect(
                connectedCall.detail.callbacks.setContainerSize
            ).toBeInstanceOf(Function);
            expect(connectedCall.detail.callbacks.getHeight).toBeInstanceOf(
                Function
            );
            expect(connectedCall.detail.callbacks.setHeight).toBeInstanceOf(
                Function
            );
            expect(connectedCall.bubbles).toBeTruthy();
            expect(connectedCall.composed).toBeFalsy();
            expect(connectedCall.cancelable).toBeFalsy();

            while (document.body.firstChild) {
                document.body.removeChild(document.body.firstChild);
            }
            expect(disconnectedHandler).toHaveBeenCalled();
            const disconnectedCall = disconnectedHandler.mock.calls[0][0];
            expect(disconnectedCall.detail.name).toBeTruthy();
            expect(typeof disconnectedCall.detail.name).toBe('string');
            expect(disconnectedCall.bubbles).toBeTruthy();
            expect(disconnectedCall.composed).toBeFalsy();
            expect(disconnectedCall.cancelable).toBeFalsy();
        });

        it('getHeight and setHeight callbacks', () => {
            const connectedHandler = jest.fn();
            element.addEventListener(
                'privatelayoutitemconnected',
                connectedHandler
            );

            jest.spyOn(element, 'getBoundingClientRect').mockImplementation(
                () => ({
                    height: 75,
                    width: 200,
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 200
                })
            );

            document.body.appendChild(element);

            const connectedCall = connectedHandler.mock.calls[0][0];
            const getHeight = connectedCall.detail.callbacks.getHeight;

            expect(getHeight()).toBe(75);
        });

        it('setHeight callback functionality', () => {
            const connectedHandler = jest.fn();
            element.addEventListener(
                'privatelayoutitemconnected',
                connectedHandler
            );

            document.body.appendChild(element);

            const connectedCall = connectedHandler.mock.calls[0][0];
            const setHeight = connectedCall.detail.callbacks.setHeight;

            setHeight(100);
            expect(element.style.height).toBe('100px');

            setHeight(0);
            expect(element.style.height).toBe('0px');
        });
    });
});
