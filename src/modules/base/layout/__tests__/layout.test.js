import { callObserver } from 'c/resizeObserver';
import { createElement } from 'lwc';
import Layout from '../layout';

let element;
describe('Layout', () => {
    function addLayoutToDOM() {
        document.body.appendChild(element);
    }
    function clearDOM() {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    }
    function createLayout() {
        element = createElement('avonni-layout', {
            is: Layout
        });
    }

    afterEach(() => {
        clearDOM();
    });

    beforeEach(() => {
        createLayout();
        addLayoutToDOM();
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
            expect(element.direction).toBe('row');
            expect(element.horizontalAlign).toBe('start');
            expect(element.multipleRows).toBeFalsy();
            expect(element.verticalAlign).toBe('stretch');
        });

        describe('direction', () => {
            it('row', () => {
                element.direction = 'row';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.className).toBe(
                        'slds-grid avonni-layout-wrapper slds-grid_vertical-stretch'
                    );
                });
            });

            it('column', () => {
                element.direction = 'column';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.className).toBe(
                        'slds-grid avonni-layout-wrapper slds-grid_vertical-stretch slds-grid_vertical'
                    );
                });
            });

            it('row-reverse', () => {
                element.direction = 'row-reverse';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.className).toBe(
                        'slds-grid avonni-layout-wrapper slds-grid_vertical-stretch slds-grid_reverse'
                    );
                });
            });

            it('column-reverse', () => {
                element.direction = 'column-reverse';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.className).toBe(
                        'slds-grid avonni-layout-wrapper slds-grid_vertical-stretch slds-grid_vertical-reverse'
                    );
                });
            });
        });

        describe('horizontal-align', () => {
            it('start', () => {
                element.horizontalAlign = 'start';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.className).toBe(
                        'slds-grid avonni-layout-wrapper slds-grid_vertical-stretch'
                    );
                });
            });

            it('center', () => {
                element.horizontalAlign = 'center';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.className).toBe(
                        'slds-grid avonni-layout-wrapper slds-grid_vertical-stretch slds-grid_align-center'
                    );
                });
            });

            it('end', () => {
                element.horizontalAlign = 'end';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.className).toBe(
                        'slds-grid avonni-layout-wrapper slds-grid_vertical-stretch slds-grid_align-end'
                    );
                });
            });

            it('space', () => {
                element.horizontalAlign = 'space';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.className).toBe(
                        'slds-grid avonni-layout-wrapper slds-grid_vertical-stretch slds-grid_align-space'
                    );
                });
            });

            it('spread', () => {
                element.horizontalAlign = 'spread';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.className).toBe(
                        'slds-grid avonni-layout-wrapper slds-grid_vertical-stretch slds-grid_align-spread'
                    );
                });
            });
        });

        describe('multiple-rows', () => {
            it('false', () => {
                element.multipleRows = false;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.className).toBe(
                        'slds-grid avonni-layout-wrapper slds-grid_vertical-stretch'
                    );
                });
            });

            it('true', () => {
                element.multipleRows = true;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.className).toBe(
                        'slds-grid avonni-layout-wrapper slds-grid_vertical-stretch slds-wrap'
                    );
                });
            });
        });

        describe('vertical-align', () => {
            it('stretch', () => {
                element.verticalAlign = 'stretch';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.className).toBe(
                        'slds-grid avonni-layout-wrapper slds-grid_vertical-stretch'
                    );
                });
            });

            it('start', () => {
                element.verticalAlign = 'start';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.className).toBe(
                        'slds-grid avonni-layout-wrapper slds-grid_vertical-align-start'
                    );
                });
            });

            it('end', () => {
                element.verticalAlign = 'end';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.className).toBe(
                        'slds-grid avonni-layout-wrapper slds-grid_vertical-align-end'
                    );
                });
            });

            it('center', () => {
                element.verticalAlign = 'center';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    expect(wrapper.className).toBe(
                        'slds-grid avonni-layout-wrapper slds-grid_vertical-align-center'
                    );
                });
            });
        });
    });

    describe('Events', () => {
        describe('Size handling', () => {
            it('By default, set container size on item connexion', () => {
                const callback = jest.fn();
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-wrapper"]'
                );
                wrapper.dispatchEvent(
                    new CustomEvent('privatelayoutitemconnected', {
                        detail: {
                            name: 'numberOne',
                            callbacks: {
                                setContainerSize: callback
                            }
                        }
                    })
                );
                jest.runAllTimers();
                expect(callback).toHaveBeenCalledTimes(1);
                expect(callback.mock.calls[0][0]).toBe('default');
            });

            it('privatelayoutconnected is fired on connection', () => {
                clearDOM();
                createLayout();

                const handler = jest.fn();
                element.addEventListener('privatelayoutconnected', handler);
                addLayoutToDOM();

                expect(handler).toHaveBeenCalledTimes(1);
                const call = handler.mock.calls[0][0];
                expect(call.detail.name).toBeTruthy();
                expect(typeof call.detail.name).toBe('string');
                expect(call.detail.callbacks.setItemsSize).toBeInstanceOf(
                    Function
                );
                expect(call.bubbles).toBeTruthy();
                expect(call.cancelable).toBeFalsy();
                expect(call.composed).toBeTruthy();
            });

            it('privatelayoutconnected allows the setting of the items size', () => {
                clearDOM();
                createLayout();

                const handler = jest.fn();
                element.addEventListener('privatelayoutconnected', handler);
                addLayoutToDOM();

                const setItemsSize =
                    handler.mock.calls[0][0].detail.callbacks.setItemsSize;

                return Promise.resolve().then(() => {
                    const callback = jest.fn();
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    wrapper.dispatchEvent(
                        new CustomEvent('privatelayoutitemconnected', {
                            detail: {
                                name: 'numberOne',
                                callbacks: {
                                    setContainerSize: callback
                                }
                            }
                        })
                    );
                    jest.runAllTimers();
                    expect(callback).toHaveBeenCalledTimes(1);
                    jest.spyOn(
                        wrapper,
                        'getBoundingClientRect'
                    ).mockReturnValue({ width: 1000 });
                    setItemsSize();
                    jest.runAllTimers();
                    expect(callback).toHaveBeenCalledTimes(2);
                    expect(callback.mock.calls[1][0]).toBe('medium');
                });
            });

            describe('privatelayoutconnected allows the setting of the items size with a width', () => {
                it('size is large', () => {
                    clearDOM();
                    createLayout();

                    const handler = jest.fn();
                    element.addEventListener('privatelayoutconnected', handler);
                    addLayoutToDOM();

                    const setItemsSize =
                        handler.mock.calls[0][0].detail.callbacks.setItemsSize;

                    return Promise.resolve().then(() => {
                        const callback = jest.fn();
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-wrapper"]'
                        );
                        wrapper.dispatchEvent(
                            new CustomEvent('privatelayoutitemconnected', {
                                detail: {
                                    name: 'numberOne',
                                    callbacks: {
                                        setContainerSize: callback
                                    }
                                }
                            })
                        );
                        jest.runAllTimers();
                        expect(callback).toHaveBeenCalledTimes(1);
                        expect(callback.mock.calls[0][0]).toBe('default');
                        setItemsSize(1025);
                        jest.runAllTimers();
                        expect(callback).toHaveBeenCalledTimes(2);
                        expect(callback.mock.calls[1][0]).toBe('large');
                    });
                });

                it('size is medium', () => {
                    clearDOM();
                    createLayout();

                    const handler = jest.fn();
                    element.addEventListener('privatelayoutconnected', handler);
                    addLayoutToDOM();

                    const setItemsSize =
                        handler.mock.calls[0][0].detail.callbacks.setItemsSize;

                    return Promise.resolve().then(() => {
                        const callback = jest.fn();
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-wrapper"]'
                        );
                        wrapper.dispatchEvent(
                            new CustomEvent('privatelayoutitemconnected', {
                                detail: {
                                    name: 'numberOne',
                                    callbacks: {
                                        setContainerSize: callback
                                    }
                                }
                            })
                        );
                        jest.runAllTimers();
                        expect(callback).toHaveBeenCalledTimes(1);
                        expect(callback.mock.calls[0][0]).toBe('default');
                        setItemsSize(769);
                        jest.runAllTimers();
                        expect(callback).toHaveBeenCalledTimes(2);
                        expect(callback.mock.calls[1][0]).toBe('medium');
                    });
                });

                it('size is small', () => {
                    clearDOM();
                    createLayout();

                    const handler = jest.fn();
                    element.addEventListener('privatelayoutconnected', handler);
                    addLayoutToDOM();

                    const setItemsSize =
                        handler.mock.calls[0][0].detail.callbacks.setItemsSize;

                    return Promise.resolve().then(() => {
                        const callback = jest.fn();
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-wrapper"]'
                        );
                        wrapper.dispatchEvent(
                            new CustomEvent('privatelayoutitemconnected', {
                                detail: {
                                    name: 'numberOne',
                                    callbacks: {
                                        setContainerSize: callback
                                    }
                                }
                            })
                        );
                        jest.runAllTimers();
                        expect(callback).toHaveBeenCalledTimes(1);
                        expect(callback.mock.calls[0][0]).toBe('default');
                        setItemsSize(481);
                        jest.runAllTimers();
                        expect(callback).toHaveBeenCalledTimes(2);
                        expect(callback.mock.calls[1][0]).toBe('small');
                    });
                });

                it('size is default', () => {
                    clearDOM();
                    createLayout();

                    const handler = jest.fn();
                    element.addEventListener('privatelayoutconnected', handler);
                    addLayoutToDOM();

                    const setItemsSize =
                        handler.mock.calls[0][0].detail.callbacks.setItemsSize;

                    return Promise.resolve().then(() => {
                        const callback = jest.fn();
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-wrapper"]'
                        );
                        wrapper.dispatchEvent(
                            new CustomEvent('privatelayoutitemconnected', {
                                detail: {
                                    name: 'numberOne',
                                    callbacks: {
                                        setContainerSize: callback
                                    }
                                }
                            })
                        );
                        jest.runAllTimers();
                        expect(callback).toHaveBeenCalledTimes(1);
                        expect(callback.mock.calls[0][0]).toBe('default');
                        setItemsSize(400);
                        jest.runAllTimers();
                        expect(callback).toHaveBeenCalledTimes(2);
                        expect(callback.mock.calls[1][0]).toBe('default');
                    });
                });
            });

            it('sizechange is fired on first render', () => {
                clearDOM();
                createLayout();

                const handler = jest.fn();
                element.addEventListener('sizechange', handler);
                addLayoutToDOM();

                expect(handler).toHaveBeenCalledTimes(1);
                const call = handler.mock.calls[0][0];
                expect(call.detail.width).toBe('default');
                expect(call.bubbles).toBeFalsy();
                expect(call.cancelable).toBeFalsy();
                expect(call.composed).toBeFalsy();
            });

            it('sizechange is fired on resize', () => {
                const sizeChangeHandler = jest.fn();
                element.addEventListener('sizechange', sizeChangeHandler);

                const callback = jest.fn();
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-wrapper"]'
                );
                wrapper.dispatchEvent(
                    new CustomEvent('privatelayoutitemconnected', {
                        detail: {
                            name: 'numberOne',
                            callbacks: {
                                setContainerSize: callback
                            }
                        }
                    })
                );

                jest.spyOn(wrapper, 'getBoundingClientRect').mockReturnValue({
                    width: 500
                });

                callback.mockClear();
                callObserver();
                expect(sizeChangeHandler).toHaveBeenCalledTimes(1);
                expect(sizeChangeHandler.mock.calls[0][0].detail.width).toBe(
                    'small'
                );

                // Skip the debounce
                jest.runAllTimers();
                expect(callback).toHaveBeenCalledTimes(1);
                expect(callback.mock.calls[0][0]).toBe('small');
            });

            it('If true is passed to setIsResizedByParent(), do not fire sizechange on render', () => {
                clearDOM();
                createLayout();

                const connexionHandler = jest.fn((event) => {
                    event.detail.callbacks.setIsResizedByParent(true);
                });
                const sizeChangeHandler = jest.fn();
                element.addEventListener('sizechange', sizeChangeHandler);
                element.addEventListener(
                    'privatelayoutconnected',
                    connexionHandler
                );
                addLayoutToDOM();
                // Clear the inital renderedCallback call
                sizeChangeHandler.mockClear();
                jest.runAllTimers();
                expect(sizeChangeHandler).not.toHaveBeenCalled();
            });

            it('If true is passed to setIsResizedByParent(), do not fire sizechange on resize', () => {
                clearDOM();
                createLayout();

                const connexionHandler = jest.fn((event) => {
                    event.detail.callbacks.setIsResizedByParent(true);
                });
                element.addEventListener(
                    'privatelayoutconnected',
                    connexionHandler
                );
                const sizeChangeHandler = jest.fn();
                element.addEventListener('sizechange', sizeChangeHandler);
                addLayoutToDOM();
                sizeChangeHandler.mockClear();
                jest.runAllTimers();

                return Promise.resolve().then(() => {
                    const callback = jest.fn();
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    wrapper.dispatchEvent(
                        new CustomEvent('privatelayoutitemconnected', {
                            detail: {
                                name: 'numberOne',
                                callbacks: {
                                    setContainerSize: callback
                                }
                            }
                        })
                    );

                    jest.spyOn(
                        wrapper,
                        'getBoundingClientRect'
                    ).mockReturnValue({
                        width: 500
                    });

                    callback.mockClear();
                    callObserver();
                    expect(callback).not.toHaveBeenCalled();
                    expect(sizeChangeHandler).not.toHaveBeenCalled();
                });
            });

            it('If true is passed to setIsResizedByParent(), newly connected items do not get sized after the debounce', () => {
                clearDOM();
                createLayout();

                const connexionHandler = jest.fn((event) => {
                    event.detail.callbacks.setIsResizedByParent(true);
                });
                element.addEventListener(
                    'privatelayoutconnected',
                    connexionHandler
                );
                addLayoutToDOM();

                return Promise.resolve().then(() => {
                    const callback = jest.fn();
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );

                    // Mock the width to ensure we have a known value
                    jest.spyOn(
                        wrapper,
                        'getBoundingClientRect'
                    ).mockReturnValue({
                        width: 500
                    });

                    wrapper.dispatchEvent(
                        new CustomEvent('privatelayoutitemconnected', {
                            detail: {
                                name: 'numberOne',
                                callbacks: {
                                    setContainerSize: callback
                                }
                            }
                        })
                    );

                    jest.runAllTimers();
                    expect(callback).not.toHaveBeenCalled();
                });
            });
        });
    });
});
