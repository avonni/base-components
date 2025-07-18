import { createElement } from 'lwc';
import Timer from 'c/timer';

let element;
let dateMock;
describe('Timer', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        window.requestAnimationFrame.mockRestore();
    });

    beforeEach(() => {
        dateMock = 0;
        jest.useFakeTimers();
        Date.now = jest.spyOn(Date, 'now').mockImplementation(() => {
            return (dateMock += 50);
        });
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) =>
            cb()
        );
        element = createElement('base-timer', {
            is: Timer
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.autoStart).toBeFalsy();
            expect(element.duration).toBe(10000);
            expect(element.format).toBe('hh:mm:ss');
            expect(element.iconName).toBeUndefined();
            expect(element.iconPosition).toBe('left');
            expect(element.repeat).toBeFalsy();
            expect(element.type).toBe('count-up');
            expect(element.value).toBe(0);
            expect(element.variant).toBe('neutral');
        });

        describe('autoStart', () => {
            it('false', () => {
                element.autoStart = false;
                element.value = 0;
                const initialValue = element.value;

                return Promise.resolve().then(() => {
                    expect(requestAnimationFrame).not.toHaveBeenCalled();
                    jest.advanceTimersToNextTimer(10);
                    expect(initialValue).toEqual(element.value);
                });
            });

            it('true', () => {
                element.autoStart = true;
                element.value = 0;
                const initialValue = element.value;

                return Promise.resolve().then(() => {
                    expect(requestAnimationFrame).toHaveBeenCalled();
                    jest.advanceTimersToNextTimer(10);
                    expect(initialValue).toBeLessThan(element.value);
                });
            });
        });

        describe('duration', () => {
            it('duration = 86200000', () => {
                element.duration = 86200000;

                return Promise.resolve().then(() => {
                    expect(element.duration).toBe(86200000);
                });
            });

            it('duration > 86400000', () => {
                element.duration = 86500000;

                return Promise.resolve().then(() => {
                    expect(element.duration).toBe(86400000);
                });
            });

            it('duration negative value', () => {
                element.duration = -86200000;

                return Promise.resolve().then(() => {
                    expect(element.duration).toBe(10000);
                });
            });
        });

        describe('format', () => {
            it('hh', () => {
                element.format = 'hh';
                element.value = 46789000;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.label).toBe('12');
                });
            });

            it('hh:mm', () => {
                element.format = 'hh:mm';
                element.value = 46789000;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.label).toBe('12:59');
                });
            });

            it('hh:mm:ss', () => {
                element.format = 'hh:mm:ss';
                element.value = 46789000;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.label).toBe('12:59:49');
                });
            });

            it('mm', () => {
                element.format = 'mm';
                element.value = 46789000;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.label).toBe('779');
                });
            });

            it('mm:ss', () => {
                element.format = 'mm:ss';
                element.value = 46789000;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.label).toBe('779:49');
                });
            });

            it('mm:ss.ms', () => {
                element.format = 'mm:ss.ms';
                element.value = 46789020;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.label).toBe('779:49.020');
                });
            });

            it('ss', () => {
                element.format = 'ss';
                element.value = 46789000;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.label).toBe('46789');
                });
            });

            it('ss.ms', () => {
                element.format = 'ss.ms';
                element.value = 46789020;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.label).toBe('46789.020');
                });
            });
        });

        describe('iconName', () => {
            it('Passed to the component', () => {
                element.iconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.iconName).toBe('utility:apps');
                });
            });
        });

        describe('iconPosition', () => {
            it('Passed to the component', () => {
                element.iconPosition = 'right';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.iconPosition).toBe('right');
                });
            });
        });

        describe('repeat', () => {
            it('false', () => {
                element.repeat = false;
                element.value = 0;
                element.duration = 100;
                const handler = jest.fn();
                element.addEventListener('timerreset', handler);
                const finalDurationValue = element.duration;

                return Promise.resolve().then(() => {
                    element.start();
                    expect(setInterval).toHaveBeenCalledTimes(1);
                    jest.advanceTimersToNextTimer(3);
                    expect(handler).not.toHaveBeenCalled();
                    expect(element.value).toEqual(finalDurationValue);
                });
            });

            it('true', () => {
                element.repeat = true;
                element.value = 0;
                element.duration = 100;
                const handler = jest.fn();
                element.addEventListener('timerreset', handler);
                const finalDurationValue = element.duration;

                return Promise.resolve().then(() => {
                    element.start();
                    expect(setInterval).toHaveBeenCalledTimes(1);
                    jest.advanceTimersToNextTimer(3);
                    expect(handler).toHaveBeenCalledTimes(1);
                    jest.advanceTimersToNextTimer(20);
                    expect(element.value).toBeLessThan(finalDurationValue);
                });
            });
        });

        describe('type', () => {
            it('count-down', () => {
                element.type = 'count-down';
                element.value = 10;
                element.duration = 10;
                const handler = jest.fn();
                element.addEventListener('timerstop', handler);
                const intialValue = element.value;

                return Promise.resolve().then(() => {
                    expect(element.type).toBe('count-down');
                    element.start();
                    jest.advanceTimersToNextTimer(2);
                    expect(handler).toHaveBeenCalled();
                    expect(intialValue).toBeGreaterThan(element.value);
                });
            });

            it('count-up', () => {
                element.type = 'count-up';
                element.value = 0;
                element.duration = 10;
                const handler = jest.fn();
                element.addEventListener('timerstop', handler);
                const intialValue = element.value;

                return Promise.resolve().then(() => {
                    expect(element.type).toBe('count-up');
                    element.start();
                    jest.advanceTimersToNextTimer(2);
                    expect(handler).toHaveBeenCalled();
                    expect(intialValue).toBeLessThan(element.value);
                });
            });

            it('type', () => {
                element.type = 86400000;
                const DEFAULT_TYPE = 'count-up';

                return Promise.resolve().then(() => {
                    expect(element.type).toBe(DEFAULT_TYPE);
                });
            });
        });

        describe('variant', () => {
            it('base', () => {
                element.variant = 'base';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.variant).toBe('base');
                });
            });

            it('brand', () => {
                element.variant = 'brand';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.variant).toBe('brand');
                });
            });

            it('brand-outline', () => {
                element.variant = 'brand-outline';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.variant).toBe('brand-outline');
                });
            });

            it('destructive', () => {
                element.variant = 'destructive';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.variant).toBe('destructive');
                });
            });

            it('destructive-text', () => {
                element.variant = 'destructive-text';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.variant).toBe('destructive-text');
                });
            });

            it('inverse', () => {
                element.variant = 'inverse';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.variant).toBe('inverse');
                });
            });

            it('neutral', () => {
                element.variant = 'neutral';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.variant).toBe('neutral');
                });
            });

            it('success', () => {
                element.variant = 'success';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(button.variant).toBe('success');
                });
            });
        });
    });

    describe('Methods and events', () => {
        describe('pause', () => {
            it('pause method and timerpause event', () => {
                const handler = jest.fn();
                element.addEventListener('timerpause', handler);

                element.pause();

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.time).toBe('00:00:00');
                expect(handler.mock.calls[0][0].detail.minutes).toBe(0);
                expect(handler.mock.calls[0][0].detail.hours).toBe(0);
                expect(handler.mock.calls[0][0].detail.seconds).toBe(0);
                expect(handler.mock.calls[0][0].detail.duration).toBe(10000);
                expect(handler.mock.calls[0][0].detail.format).toBe('hh:mm:ss');
                expect(handler.mock.calls[0][0].detail.type).toBe('count-up');
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composable).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });

            it('pause and start behaviour (positive timer)', () => {
                element.value = 0;
                element.duration = 150;
                const handler = jest.fn();
                element.addEventListener('timerstop', handler);

                return Promise.resolve().then(() => {
                    element.start();
                    expect(setInterval).toHaveBeenCalledTimes(1);
                    jest.advanceTimersToNextTimer(1);
                    element.pause();
                    jest.advanceTimersToNextTimer(2);
                    element.start();
                    expect(handler).not.toHaveBeenCalled();
                    jest.advanceTimersToNextTimer(2);
                    expect(handler).toHaveBeenCalled();
                });
            });

            it('pause and start behaviour (negative timer)', () => {
                element.type = 'count-down';
                element.value = 0;
                element.duration = 150;
                const handler = jest.fn();
                element.addEventListener('timerstop', handler);

                return Promise.resolve().then(() => {
                    element.start();
                    expect(setInterval).toHaveBeenCalledTimes(1);
                    jest.advanceTimersToNextTimer(1);
                    element.pause();
                    jest.advanceTimersToNextTimer(2);
                    element.start();
                    expect(handler).not.toHaveBeenCalled();
                    jest.advanceTimersToNextTimer(2);
                    expect(handler).toHaveBeenCalled();
                });
            });
        });

        describe('reset', () => {
            it('reset method and timerreset event', () => {
                const handler = jest.fn();
                element.addEventListener('timerreset', handler);

                element.reset();

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.time).toBe('00:00:00');
                expect(handler.mock.calls[0][0].detail.minutes).toBe(0);
                expect(handler.mock.calls[0][0].detail.hours).toBe(0);
                expect(handler.mock.calls[0][0].detail.seconds).toBe(0);
                expect(handler.mock.calls[0][0].detail.duration).toBe(10000);
                expect(handler.mock.calls[0][0].detail.format).toBe('hh:mm:ss');
                expect(handler.mock.calls[0][0].detail.type).toBe('count-up');
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composable).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });
        describe('start', () => {
            it('start method and timerstart event', () => {
                const handler = jest.fn();
                element.addEventListener('timerstart', handler);

                expect(setInterval).not.toHaveBeenCalled();
                element.start();
                expect(setInterval).toHaveBeenCalled();
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.time).toBe('00:00:00');
                expect(handler.mock.calls[0][0].detail.minutes).toBe(0);
                expect(handler.mock.calls[0][0].detail.hours).toBe(0);
                expect(handler.mock.calls[0][0].detail.seconds).toBe(0);
                expect(handler.mock.calls[0][0].detail.duration).toBe(10000);
                expect(handler.mock.calls[0][0].detail.format).toBe('hh:mm:ss');
                expect(handler.mock.calls[0][0].detail.type).toBe('count-up');
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composable).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });

        describe('stop', () => {
            it('stop method and timerstop event', () => {
                const handler = jest.fn();
                element.addEventListener('timerstop', handler);

                element.stop();

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.time).toBe('00:00:00');
                expect(handler.mock.calls[0][0].detail.minutes).toBe(0);
                expect(handler.mock.calls[0][0].detail.hours).toBe(0);
                expect(handler.mock.calls[0][0].detail.seconds).toBe(0);
                expect(handler.mock.calls[0][0].detail.duration).toBe(10000);
                expect(handler.mock.calls[0][0].detail.format).toBe('hh:mm:ss');
                expect(handler.mock.calls[0][0].detail.type).toBe('count-up');
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composable).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });
    });
});
