import { createElement } from 'lwc';
import PrimitiveSchedulerCalendarPopover from '../primitiveSchedulerCalendarPopover';

const EVENTS = [
    {
        from: '2025-03-14T10:00:00.000Z',
        to: '2025-03-14T11:00:00.000Z',
        key: '001',
        resourceName: 'firstResource',
        title: 'First event',
        event: {
            disabled: false,
            data: {
                title: 'First event',
                location: 'Paris',
                description: 'First event description'
            },
            name: 'first',
            iconName: 'standard:account',
            labels: {
                center: {
                    value: 'Custom label and icon specific to this event',
                    iconName: 'utility:key_dates'
                }
            },
            referenceLine: false,
            theme: 'line'
        }
    },
    {
        from: '2025-03-12T12:00:00.000Z',
        to: '2025-03-14T14:00:00.000Z',
        key: '002',
        resourceName: 'firstResource',
        title: 'Second event',
        event: {
            disabled: true,
            data: {
                title: 'Second event'
            },
            name: 'second',
            labels: {
                center: {
                    value: 'Custom label and icon specific to this event',
                    iconName: 'utility:key_dates'
                }
            }
        }
    },
    {
        from: '2025-03-14T15:00:00.000Z',
        to: '2025-03-14T18:30:00.000Z',
        key: '003',
        resourceName: 'secondResource',
        title: 'Third event',
        event: {
            data: {
                title: 'Third event'
            },
            name: 'third',
            referenceLine: true,
            labels: {
                center: {
                    value: 'Custom label and icon specific to this event',
                    iconName: 'utility:key_dates'
                }
            }
        }
    }
];
const MANY_EVENTS = [];
for (let i = 0; i < 100; i++) {
    MANY_EVENTS.push({
        key: i.toString(),
        event: {}
    });
}

let element;
describe('Primitive Scheduler Calendar Popover', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.runAllTimers();
    });

    beforeEach(() => {
        element = createElement('avonni-primitive-scheduler-calendar', {
            is: PrimitiveSchedulerCalendarPopover
        });
        document.body.appendChild(element);
        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) =>
            setTimeout(cb, 0)
        );
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.dateFormat).toBeUndefined();
            expect(element.enableInfiniteLoading).toBeUndefined();
            expect(element.hiddenActions).toBeUndefined();
            expect(element.isLoading).toBeUndefined();
            expect(element.preventPastEventCreation).toBeUndefined();
            expect(element.readOnly).toBeUndefined();
            expect(element.resources).toBeUndefined();
            expect(element.timezone).toBeUndefined();
        });

        it('Date format', () => {
            element.dateFormat = 'yyyy-MM-dd';
            element.open({ events: EVENTS });

            return Promise.resolve().then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );

                events.forEach((event) => {
                    expect(event.dateFormat).toBe('yyyy-MM-dd');
                });
            });
        });

        it('Hidden actions', () => {
            element.hiddenActions = [
                'Standard.Scheduler.AddEvent',
                'Standard.Scheduler.EditEvent'
            ];
            element.open({ events: EVENTS });

            return Promise.resolve().then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );

                events.forEach((event) => {
                    expect(event.hiddenActions).toEqual([
                        'Standard.Scheduler.AddEvent',
                        'Standard.Scheduler.EditEvent'
                    ]);
                });
            });
        });

        it('Is loading', () => {
            element.open({ events: EVENTS });
            element.isLoading = false;

            return Promise.resolve()
                .then(() => {
                    const spinner = element.shadowRoot.querySelector(
                        '[data-element-id="div-loading-spinner"]'
                    );
                    expect(spinner).toBeFalsy();
                    element.isLoading = true;
                })
                .then(() => {
                    const spinner = element.shadowRoot.querySelector(
                        '[data-element-id="div-loading-spinner"]'
                    );
                    expect(spinner).toBeTruthy();
                });
        });

        it('Prevent past event creation', () => {
            element.preventPastEventCreation = true;
            element.open({ events: EVENTS });

            return Promise.resolve().then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );

                events.forEach((event) => {
                    expect(event.preventPastEventCreation).toBeTruthy();
                });
            });
        });

        it('Read only', () => {
            element.readOnly = true;
            element.open({ events: EVENTS });

            return Promise.resolve().then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );

                events.forEach((event) => {
                    expect(event.readOnly).toBeTruthy();
                });
            });
        });

        it('Resources', () => {
            element.resources = [
                { name: 'firstResource' },
                { name: 'secondResource' }
            ];
            element.open({ events: EVENTS });

            return Promise.resolve().then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );

                events.forEach((event) => {
                    expect(event.resources).toEqual([
                        { name: 'firstResource' },
                        { name: 'secondResource' }
                    ]);
                });
            });
        });

        it('Time zone', () => {
            element.timezone = 'Europe/Paris';
            element.open({ events: EVENTS });

            return Promise.resolve().then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );

                events.forEach((event) => {
                    expect(event.timezone).toBe('Europe/Paris');
                });
            });
        });
    });

    describe('Methods', () => {
        it('Add events', () => {
            element.open({ events: EVENTS });

            return Promise.resolve()
                .then(() => {
                    element.addEvents(MANY_EVENTS.slice(0, 10));
                })
                .then(() => {
                    const events = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                    );
                    expect(events).toHaveLength(EVENTS.length + 10);
                });
        });

        describe('Focus', () => {
            it('Focus', () => {
                element.open({ events: EVENTS });

                return Promise.resolve().then(() => {
                    const closeButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-show-more-close"]'
                    );
                    const spy = jest.spyOn(closeButton, 'focus');
                    element.focus();
                    expect(spy).toHaveBeenCalledTimes(1);
                });
            });

            it('Component is focused on render', () => {
                element.open({ events: EVENTS });

                let spy;
                return Promise.resolve()
                    .then(() => {
                        const closeButton = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-icon-show-more-close"]'
                        );
                        spy = jest.spyOn(closeButton, 'focus');
                        element.readOnly = true;
                    })
                    .then(() => {
                        expect(spy).toHaveBeenCalledTimes(1);
                    });
            });

            it('Component is refocused when the mouse is on it', () => {
                element.open({ events: EVENTS });

                return Promise.resolve().then(() => {
                    const closeButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-show-more-close"]'
                    );
                    const spy = jest.spyOn(closeButton, 'focus');

                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="div-wrapper"]'
                    );
                    wrapper.dispatchEvent(new CustomEvent('mouseenter'));

                    const focusTrap = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-focus-trap"]'
                    );
                    expect(spy).not.toHaveBeenCalled();
                    focusTrap.dispatchEvent(new CustomEvent('focusout'));
                    jest.runAllTimers();
                    expect(spy).toHaveBeenCalledTimes(1);
                });
            });
        });

        it('Open', () => {
            let wrapper = element.shadowRoot.querySelector(
                '[data-element-id="div-wrapper"]'
            );
            expect(wrapper).toBeNull();

            element.open({ events: EVENTS, label: 'Some popover label' });

            return Promise.resolve().then(() => {
                wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-wrapper"]'
                );
                expect(wrapper).toBeTruthy();

                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(EVENTS.length);
                events.forEach((event, index) => {
                    const original = EVENTS[index];
                    expect(event.color).toBe(original.event.color);
                    expect(event.disabled).toBe(!!original.event.disabled);
                    expect(event.eventData).toEqual(original.event.data);
                    expect(event.eventName).toBe(original.event.name);
                    expect(new Date(event.from)).toEqual(
                        new Date(original.from)
                    );
                    expect(event.iconName).toBe(original.event.iconName);
                    expect(event.labels).toEqual(original.event.labels);
                    expect(event.occurrence).toMatchObject(original);
                    expect(event.occurrenceKey).toBe(original.key);
                    expect(event.referenceLine).toBe(
                        !!original.event.referenceLine
                    );
                    expect(event.resourceKey).toBe(original.resourceName);
                    expect(event.title).toBe(original.title);
                    expect(event.theme).toBe(original.event.theme);
                    expect(new Date(event.to)).toEqual(new Date(original.to));
                });

                const label = element.shadowRoot.querySelector(
                    '[data-element-id="div-label"]'
                );
                expect(label.textContent).toBe('Some popover label');
            });
        });
    });

    describe('Events', () => {
        describe('Close', () => {
            it('On click on the close button', () => {
                const handler = jest.fn();
                element.addEventListener('close', handler);

                element.open({ events: EVENTS });

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-icon-show-more-close"]'
                        );
                        button.click();
                        expect(handler).toHaveBeenCalled();
                        const call = handler.mock.calls[0][0];
                        expect(call.bubbles).toBeFalsy();
                        expect(call.cancelable).toBeTruthy();
                        expect(call.composed).toBeFalsy();
                    })
                    .then(() => {
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-wrapper"]'
                        );
                        expect(wrapper).toBeNull();
                    });
            });

            it('On click on an event', () => {
                const handler = jest.fn();
                element.addEventListener('close', handler);
                element.open({ events: EVENTS });

                return Promise.resolve()
                    .then(() => {
                        const event = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        event.dispatchEvent(
                            new CustomEvent('privatemousedown')
                        );
                        expect(handler).toHaveBeenCalled();
                    })
                    .then(() => {
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-wrapper"]'
                        );
                        expect(wrapper).toBeNull();
                    });
            });

            it('On focusing out of the popover', () => {
                const handler = jest.fn();
                element.addEventListener('close', handler);
                element.open({ events: EVENTS });

                return Promise.resolve()
                    .then(() => {
                        const focusTrap = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-focus-trap"]'
                        );
                        focusTrap.dispatchEvent(new CustomEvent('focusout'));
                        jest.runAllTimers();
                        expect(handler).toHaveBeenCalled();
                    })
                    .then(() => {
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-wrapper"]'
                        );
                        expect(wrapper).toBeNull();
                    });
            });

            it('Close was cancelled', () => {
                const handler = jest.fn((event) => {
                    event.preventDefault();
                });
                element.addEventListener('close', handler);

                element.open({ events: EVENTS });

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-icon-show-more-close"]'
                        );
                        button.click();
                        expect(handler).toHaveBeenCalled();
                    })
                    .then(() => {
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-wrapper"]'
                        );
                        expect(wrapper).toBeTruthy();
                    });
            });
        });

        describe('Context menu', () => {
            it('Fired on event context menu', () => {
                const handler = jest.fn();
                element.addEventListener('eventcontextmenu', handler);
                element.open({ events: EVENTS });

                return Promise.resolve().then(() => {
                    const event = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                    );
                    event.dispatchEvent(
                        new CustomEvent('privatecontextmenu', {
                            detail: {
                                someKey: 'someValue'
                            }
                        })
                    );
                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.bubbles).toBeTruthy();
                    expect(call.cancelable).toBeFalsy();
                    expect(call.composed).toBeTruthy();
                    expect(call.detail.someKey).toBe('someValue');
                    expect(call.detail.focusPopover).toBeInstanceOf(Function);
                });
            });

            it('Not fired if the event is disabled or a reference line', () => {
                const handler = jest.fn();
                element.addEventListener('eventcontextmenu', handler);
                element.open({ events: EVENTS });

                return Promise.resolve().then(() => {
                    const events = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                    );
                    events[1].dispatchEvent(
                        new CustomEvent('privatecontextmenu', {
                            detail: {
                                someKey: 'someValue'
                            }
                        })
                    );
                    events[2].dispatchEvent(
                        new CustomEvent('privatecontextmenu', {
                            detail: {
                                someKey: 'someValue'
                            }
                        })
                    );
                    expect(handler).not.toHaveBeenCalled();
                });
            });
        });

        it('Event double click', () => {
            const handler = jest.fn();
            element.addEventListener('eventdblclick', handler);
            element.open({ events: EVENTS });

            return Promise.resolve().then(() => {
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                event.dispatchEvent(
                    new CustomEvent('privatedblclick', {
                        detail: {
                            someKey: 'someValue'
                        }
                    })
                );
                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.bubbles).toBeFalsy();
                expect(call.cancelable).toBeFalsy();
                expect(call.composed).toBeFalsy();
                expect(call.detail).toEqual({ someKey: 'someValue' });
            });
        });

        it('Mouse down', () => {
            const handler = jest.fn();
            element.addEventListener('eventmousedown', handler);
            element.open({ events: EVENTS });

            return Promise.resolve().then(() => {
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                event.dispatchEvent(
                    new CustomEvent('privatemousedown', {
                        detail: {
                            someKey: 'someValue'
                        }
                    })
                );
                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.bubbles).toBeFalsy();
                expect(call.cancelable).toBeFalsy();
                expect(call.composed).toBeFalsy();
                expect(call.detail).toEqual({ someKey: 'someValue' });
            });
        });

        describe('Load more', () => {
            it('A maximum of 25 events are displayed at a time', () => {
                element.open({ events: MANY_EVENTS });

                return Promise.resolve().then(() => {
                    const events = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                    );

                    expect(events).toHaveLength(25);
                    events.forEach((event, index) => {
                        expect(event.occurrenceKey).toBe(
                            MANY_EVENTS[index].key
                        );
                    });
                });
            });

            it('Display more events when scrolling', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                element.open({ events: MANY_EVENTS });

                return Promise.resolve()
                    .then(() => {
                        // Scroll down
                        const div = element.shadowRoot.querySelector(
                            '[data-element-id="div-body"]'
                        );
                        jest.spyOn(
                            div,
                            'getBoundingClientRect'
                        ).mockReturnValue({
                            top: 20
                        });
                        jest.spyOn(div, 'scrollHeight', 'get').mockReturnValue(
                            1000
                        );
                        jest.spyOn(div, 'clientHeight', 'get').mockReturnValue(
                            350
                        );
                        jest.spyOn(div, 'scrollTop', 'get').mockReturnValue(
                            650
                        );
                        div.dispatchEvent(new CustomEvent('scroll'));
                    })
                    .then(() => {
                        const events = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(events).toHaveLength(25);
                        events.forEach((event, index) => {
                            expect(event.occurrenceKey).toBe(
                                MANY_EVENTS[index + 10].key
                            );
                        });

                        // Scroll up
                        const div = element.shadowRoot.querySelector(
                            '[data-element-id="div-body"]'
                        );
                        jest.spyOn(div, 'scrollTop', 'get').mockReturnValue(52);
                        div.dispatchEvent(new CustomEvent('scroll'));
                    })
                    .then(() => {
                        const events = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(events).toHaveLength(25);
                        events.forEach((event, index) => {
                            expect(event.occurrenceKey).toBe(
                                MANY_EVENTS[index].key
                            );
                        });
                        expect(handler).not.toHaveBeenCalled();
                    });
            });

            it('Fire loadmore event when all events are displayed', () => {
                element.enableInfiniteLoading = true;
                element.open({ events: MANY_EVENTS.slice(0, 15) });

                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                return Promise.resolve().then(() => {
                    // Scroll down
                    const div = element.shadowRoot.querySelector(
                        '[data-element-id="div-body"]'
                    );
                    jest.spyOn(div, 'getBoundingClientRect').mockReturnValue({
                        top: 20
                    });
                    jest.spyOn(div, 'scrollHeight', 'get').mockReturnValue(
                        1000
                    );
                    jest.spyOn(div, 'clientHeight', 'get').mockReturnValue(350);
                    jest.spyOn(div, 'scrollTop', 'get').mockReturnValue(650);
                    div.dispatchEvent(new CustomEvent('scroll'));

                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.bubbles).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                });
            });
        });
    });
});
