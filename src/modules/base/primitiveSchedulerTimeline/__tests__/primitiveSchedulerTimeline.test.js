import { createElement } from 'lwc';
import { DateTime } from 'c/luxon';
import PrimitiveSchedulerTimeline from '../primitiveSchedulerTimeline';

/*
--------------------------------------------------------------
  The primitive headers set the visible interval.
  
  As a consequence:
  - A lot of the tests need to wait for a second rerender.
  - The mock component of the primitive headers dispatches
  a partially mocked privateheaderchange event.
--------------------------------------------------------------
*/

// Not tested:
// - The cell duration passed to the events and the number of cells displayed, because it depends on the privateheaderchange event.
// - The loading spinner and loadingAlternativeText, because it is automatically removed when the primitive headers dispatch the privateheaderchange event.
// - The update of the cell width when the splitter moves, because we can't trigger the resize observer.

const EVENTS = [
    {
        resourceNames: ['resource-2', 'resource-1'],
        name: 'event-1',
        title: 'Event 1',
        from: new Date(2022, 8, 20, 10),
        to: new Date(2022, 8, 20, 10, 30),
        color: '#333'
    },
    {
        resourceNames: ['resource-3'],
        name: 'event-2',
        title: 'Event 2',
        allDay: true,
        from: new Date(2022, 8, 19, 18),
        labels: {
            center: {
                fieldName: 'from',
                iconName: 'utility:apps'
            },
            right: {
                value: 'Great event'
            }
        }
    },
    {
        resourceNames: ['resource-3'],
        name: 'disabled-event',
        title: 'Disabled event',
        from: new Date(2022, 8, 16, 7),
        to: new Date(2022, 8, 26, 21, 57),
        iconName: 'standard:apps',
        disabled: true
    },
    {
        resourceNames: ['resource-1'],
        name: 'long-event',
        title: 'Long event',
        from: new Date(2022, 8, 2, 3, 30),
        to: new Date(2022, 8, 6, 19, 12)
    },
    {
        name: 'reference-line',
        title: 'Reference line',
        from: new Date(2022, 9, 4, 14, 34),
        referenceLine: true,
        theme: 'success'
    },
    {
        name: 'winter-event',
        resourceNames: ['resource-2'],
        title: 'Winter event',
        from: new Date(2022, 0, 20),
        to: new Date(2022, 1, 8, 13),
        theme: 'transparent',
        color: 'tomato'
    }
];

const RECURRING_EVENT = {
    name: 'simple-event',
    recurrence: 'daily',
    from: new Date(2022, 8, 19, 12),
    to: new Date(2022, 8, 19, 14),
    recurrenceEndDate: new Date(2022, 10, 1),
    resourceNames: ['resource-1']
};

const RESOURCES = [
    {
        name: 'resource-1',
        label: 'Resource 1',
        avatarSrc: 'some fake avatar src',
        avatarFallbackIconName: 'utility:user',
        avatarInitials: 'R1',
        col1: 'Resource 1, column 1',
        col2: 'Resource 1, column 2',
        col3: 'Resource 1, column 3',
        color: '#454545'
    },
    {
        name: 'resource-2',
        label: 'Resource 2',
        color: '#fff',
        col1: 'Resource 2, column 1',
        col2: 'Resource 2, column 2',
        col3: 'Resource 2, column 3'
    },
    {
        name: 'resource-3',
        label: 'Resource 3',
        color: '#444',
        col1: 'Resource 3, column 1',
        col2: 'Resource 3, column 2',
        col3: 'Resource 3, column 3'
    }
];
const ALL_RESOURCES = RESOURCES.map((res) => res.name);
const START = new Date(2022, 8, 19);

let element;
describe('Primitive Scheduler Timeline', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-primitive-scheduler-timeline', {
            is: PrimitiveSchedulerTimeline
        });
        document.body.appendChild(element);
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.availableDaysOfTheWeek).toEqual([
                0, 1, 2, 3, 4, 5, 6
            ]);
            expect(element.availableMonths).toEqual([
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
            ]);
            expect(element.availableTimeFrames).toEqual(['00:00-23:59']);
            expect(element.availableTimeSpans).toEqual([]);
            expect(element.collapseDisabled).toBeFalsy();
            expect(element.columns).toEqual([]);
            expect(element.dateFormat).toBe('ff');
            expect(element.events).toEqual([]);
            expect(element.eventsLabels).toEqual({
                center: { fieldName: 'title' }
            });
            expect(element.eventsTheme).toBe('default');
            expect(element.loadingStateAlternativeText).toBeUndefined();
            expect(element.newEventTitle).toBe('New event');
            expect(element.preventPastEventCreation).toBeFalsy();
            expect(element.readOnly).toBeFalsy();
            expect(element.recurrentEditModes).toEqual(['all', 'one']);
            expect(element.resizeColumnDisabled).toBeFalsy();
            expect(element.resources).toEqual([]);

            const start = new Date(element.start);
            const today = new Date();
            expect(start.getHours()).toBe(today.getHours());
            expect(start.getDate()).toBe(today.getDate());
            expect(start.getMonth()).toBe(today.getMonth());
            expect(start.getFullYear()).toBe(today.getFullYear());

            expect(element.selectedResources).toEqual([]);
            expect(element.timeSpan).toEqual({ unit: 'day', span: 1 });
            expect(element.orientation).toBe('horizontal');
            expect(element.zoomToFit).toBeFalsy();
        });

        // available-days-of-the-week
        describe('Available days of the week', () => {
            it('Horizontal orientation', () => {
                element.availableDaysOfTheWeek = [2, 4];
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;

                return Promise.resolve().then(() => {
                    const headers = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-scheduler-header-group"]'
                    );
                    expect(headers.availableDaysOfTheWeek).toEqual([2, 4]);
                });
            });

            it('Vertical orientation', () => {
                element.availableDaysOfTheWeek = [6, 2, 4];
                element.orientation = 'vertical';
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;

                return Promise.resolve().then(() => {
                    const headers = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-scheduler-header-group"]'
                    );
                    expect(headers.availableDaysOfTheWeek).toEqual([2, 4, 6]);
                });
            });
        });

        // available-months
        describe('Available months', () => {
            it('Horizontal orientation', () => {
                element.availableMonths = [2, 4];
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;

                return Promise.resolve().then(() => {
                    const headers = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-scheduler-header-group"]'
                    );
                    expect(headers.availableMonths).toEqual([2, 4]);
                });
            });

            it('Vertical orientation', () => {
                element.availableMonths = [6, 2, 4];
                element.orientation = 'vertical';
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;

                return Promise.resolve().then(() => {
                    const headers = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-scheduler-header-group"]'
                    );
                    expect(headers.availableMonths).toEqual([2, 4, 6]);
                });
            });
        });

        // available-time-frames
        describe('Available time frame', () => {
            it('Horizontal orientation', () => {
                element.availableTimeFrames = ['12:30-16:00', '08:00-10:00'];
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;

                return Promise.resolve().then(() => {
                    const headers = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-scheduler-header-group"]'
                    );
                    expect(headers.availableTimeFrames).toEqual([
                        '12:30-16:00',
                        '08:00-10:00'
                    ]);
                });
            });

            it('Vertical orientation', () => {
                element.availableTimeFrames = ['07:10-18:00'];
                element.orientation = 'vertical';
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;

                return Promise.resolve().then(() => {
                    const headers = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-scheduler-header-group"]'
                    );
                    expect(headers.availableTimeFrames).toEqual([
                        '07:10-18:00'
                    ]);
                });
            });
        });

        // available-time-spans
        describe('Available time spans', () => {
            it('Horizontal orientation', () => {
                element.availableTimeSpans = [
                    {
                        unit: 'day',
                        span: 2,
                        label: 'Few Days',
                        headers: 'hourAndDay'
                    },
                    {
                        unit: 'week',
                        span: 2,
                        label: 'Sprint',
                        headers: 'dayAndMonth'
                    }
                ];

                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;

                return Promise.resolve().then(() => {
                    const headers = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-scheduler-header-group"]'
                    );
                    expect(headers.availableTimeSpans).toEqual([
                        {
                            unit: 'day',
                            span: 2,
                            label: 'Few Days',
                            headers: 'hourAndDay'
                        },
                        {
                            unit: 'week',
                            span: 2,
                            label: 'Sprint',
                            headers: 'dayAndMonth'
                        }
                    ]);
                });
            });

            it('Vertical orientation', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.orientation = 'vertical';
                element.availableTimeSpans = [
                    {
                        unit: 'day',
                        span: 2,
                        label: 'Few Days',
                        headers: 'hourAndDay'
                    },
                    {
                        unit: 'week',
                        span: 2,
                        label: 'Sprint',
                        headers: 'dayAndMonth'
                    }
                ];

                return Promise.resolve().then(() => {
                    const headers = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-scheduler-header-group"]'
                    );
                    expect(headers.availableTimeSpans).toEqual([
                        {
                            unit: 'day',
                            span: 2,
                            label: 'Few Days',
                            headers: 'hourAndDay'
                        },
                        {
                            unit: 'week',
                            span: 2,
                            label: 'Sprint',
                            headers: 'dayAndMonth'
                        }
                    ]);
                });
            });
        });

        // collapse-disabled
        it('collapseDisabled = false', () => {
            element.collapseDisabled = false;

            return Promise.resolve().then(() => {
                const collapseButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-splitter-collapse"]'
                );
                const expandButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-splitter-expand"]'
                );

                expect(collapseButton).toBeTruthy();
                expect(expandButton).toBeTruthy();
            });
        });

        it('collapseDisabled = true', () => {
            element.collapseDisabled = true;

            return Promise.resolve().then(() => {
                const collapseButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-splitter-collapse"]'
                );
                const expandButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-splitter-expand"]'
                );

                expect(collapseButton).toBeFalsy();
                expect(expandButton).toBeFalsy();
            });
        });

        // columns
        it('Columns', () => {
            const columns = [
                {
                    label: 'Column 1',
                    fieldName: 'col1'
                },
                {
                    label: 'Column 2',
                    fieldName: 'col2'
                }
            ];
            element.columns = columns;

            return Promise.resolve().then(() => {
                const datatable = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-datatable"]'
                );
                expect(datatable.columns).toEqual(columns);
            });
        });

        // date-format
        it('Date format', () => {
            element.dateFormat = 'dd/LL';
            element.events = EVENTS;
            element.start = START;
            element.selectedResources = ALL_RESOURCES;
            element.resources = RESOURCES;

            return Promise.resolve()
                .then(() => {
                    // Wait for the visible interval to be set
                })
                .then(() => {
                    const events = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                    );
                    events.forEach((event) => {
                        expect(event.dateFormat).toBe('dd/LL');
                    });
                });
        });

        // events
        describe('Events', () => {
            it('Displayed in the timeline', () => {
                const originalEvents = [
                    {
                        resourceNames: ['resource-1'],
                        name: 'few-hours',
                        title: 'Few hours',
                        from: new Date(2022, 8, 19, 12, 34),
                        to: new Date(2022, 8, 19, 15),
                        color: '#555555',
                        theme: 'rounded',
                        labels: {
                            center: { value: 'some custom value' },
                            left: { fieldName: 'name' }
                        }
                    },
                    {
                        resourceNames: ['resource-2'],
                        name: 'disabled-event',
                        title: 'Disabled event',
                        from: new Date(2022, 8, 19),
                        to: new Date(2022, 8, 19, 7),
                        disabled: true,
                        iconName: 'custom:custom1'
                    },
                    {
                        referenceLine: true,
                        name: 'reference-line',
                        title: 'Reference line',
                        from: new Date(2022, 8, 19, 19, 19),
                        theme: 'lightest'
                    }
                ];
                element.events = originalEvents;
                element.start = START;
                element.selectedResources = ALL_RESOURCES;
                element.resources = RESOURCES;

                const defaultLabels = { center: { fieldName: 'title' } };

                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const events = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(events).toHaveLength(3);
                        events.forEach((event) => {
                            expect(event.eventName).toBeTruthy();
                            const original = originalEvents.find(
                                (ev) => ev.name === event.eventName
                            );
                            const resourceName = original.referenceLine
                                ? undefined
                                : original.resourceNames[0];
                            const from = DateTime.fromJSDate(original.from);
                            const to = original.referenceLine
                                ? from.ts
                                : original.to.getTime();
                            expect(event.color).toBe(original.color);
                            expect(event.disabled).toBe(
                                original.disabled || false
                            );
                            expect(event.eventData).toMatchObject(original);
                            expect(event.from.ts).toBe(original.from.getTime());
                            expect(event.iconName).toBe(original.iconName);
                            expect(event.labels).toEqual(
                                original.labels || defaultLabels
                            );
                            expect(event.occurrence.title).toBe(original.title);
                            expect(event.referenceLine).toBe(
                                original.referenceLine || false
                            );
                            expect(event.resourceKey).toBe(resourceName);
                            expect(event.title).toBe(original.title);
                            expect(event.theme).toBe(
                                original.theme || 'default'
                            );
                            expect(event.to.ts).toBe(to);
                        });
                    });
            });

            it('cellHeight and cellWidth are set by the headers', () => {
                element.events = EVENTS;
                element.start = START;
                element.selectedResources = ALL_RESOURCES;
                element.resources = RESOURCES;

                return Promise.resolve()
                    .then(() => {
                        const header = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-header-group"]'
                        );
                        header.dispatchEvent(
                            new CustomEvent('privatecellsizechange', {
                                detail: {
                                    orientation: 'horizontal',
                                    cellSize: 300
                                }
                            })
                        );
                    })
                    .then(() => {
                        const events = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(events).toHaveLength(2);
                        events.forEach((ev) => {
                            expect(ev.cellWidth).toBe(300);
                        });

                        element.orientation = 'vertical';
                    })
                    .then(() => {
                        const header = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-header-group"]'
                        );
                        header.dispatchEvent(
                            new CustomEvent('privatecellsizechange', {
                                detail: {
                                    orientation: 'vertical',
                                    cellSize: 100
                                }
                            })
                        );
                    })
                    .then(() => {
                        const events = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(events).toHaveLength(2);
                        events.forEach((ev) => {
                            expect(ev.cellHeight).toBe(100);
                        });
                    });
            });

            it('Event starts before or after visible time span', () => {
                const originalEvents = [
                    {
                        resourceNames: ['resource-1'],
                        name: 'starts-before',
                        from: new Date(2022, 8, 12, 12, 34),
                        to: new Date(2022, 8, 19, 15)
                    },
                    {
                        resourceNames: ['resource-2'],
                        name: 'ends-after',
                        from: new Date(2022, 8, 19, 6, 32),
                        to: new Date(2022, 8, 20, 1),
                        disabled: true
                    },
                    {
                        resourceNames: ['resource-2'],
                        name: 'starts-before-and-ends-after',
                        title: 'Starts before and ends after',
                        from: new Date(2022, 8, 17),
                        to: new Date(2022, 8, 22)
                    }
                ];
                element.events = originalEvents;
                element.start = START;
                element.selectedResources = ALL_RESOURCES;
                element.resources = RESOURCES;

                const startOfDay = new Date(2022, 8, 19).getTime();
                const endOfDay = new Date(2022, 8, 20).getTime() - 1;

                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const events = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(events).toHaveLength(3);
                        expect(events[0].from.ts).toBe(startOfDay);
                        expect(events[0].to.ts).toBe(
                            originalEvents[0].to.getTime()
                        );
                        expect(events[1].from.ts).toBe(
                            originalEvents[1].from.getTime()
                        );
                        expect(events[1].to.ts).toBe(endOfDay);
                        expect(events[2].from.ts).toBe(startOfDay);
                        expect(events[2].to.ts).toBe(endOfDay);
                    });
            });

            it('All day event', () => {
                element.events = [
                    {
                        resourceNames: ['resource-1'],
                        name: 'all-day-no-to',
                        from: new Date(2022, 8, 19, 13),
                        allDay: true
                    },
                    {
                        resourceNames: ['resource-1'],
                        name: 'all-day',
                        from: new Date(2022, 8, 19, 13),
                        to: new Date(2022, 8, 19, 21, 45),
                        allDay: true
                    }
                ];
                element.start = START;
                element.selectedResources = ALL_RESOURCES;
                element.resources = RESOURCES;

                const startOfDay = new Date(2022, 8, 19).getTime();
                const endOfDay = new Date(2022, 8, 20).getTime() - 1;

                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const events = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(events).toHaveLength(2);
                        events.forEach((ev) => {
                            expect(ev.from.ts).toBe(startOfDay);
                            expect(ev.to.ts).toBe(endOfDay);
                        });
                    });
            });

            it('Multi-resources event', () => {
                element.events = [
                    {
                        resourceNames: ['resource-1', 'resource-2'],
                        name: 'multi-resources',
                        from: new Date(2022, 8, 19, 13),
                        to: new Date(2022, 8, 19, 14)
                    }
                ];
                element.start = START;
                element.selectedResources = ALL_RESOURCES;
                element.resources = RESOURCES;

                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const events = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(events).toHaveLength(2);
                        events.forEach((ev) => {
                            expect(ev.eventName).toBe('multi-resources');
                        });
                        expect(events[0].resourceKey).toBe('resource-1');
                        expect(events[1].resourceKey).toBe('resource-2');
                    });
            });

            it('Recurring event', () => {
                element.events = [
                    {
                        resourceNames: ['resource-1'],
                        name: 'recurring',
                        from: new Date(2022, 8, 19, 13),
                        to: new Date(2022, 8, 19, 14),
                        recurrence: 'daily'
                    }
                ];
                element.start = START;
                element.selectedResources = ALL_RESOURCES;
                element.resources = RESOURCES;
                element.timeSpan = { unit: 'day', span: 5 };

                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const events = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(events).toHaveLength(5);
                        events.forEach((ev) => {
                            expect(ev.eventName).toBe('recurring');
                        });
                        expect(events[0].from.day).toBe(19);
                        expect(events[1].from.day).toBe(20);
                        expect(events[2].from.day).toBe(21);
                        expect(events[3].from.day).toBe(22);
                        expect(events[4].from.day).toBe(23);
                    });
            });
        });

        // events-labels
        it('Events labels', () => {
            element.events = [EVENTS[2], EVENTS[1]];
            element.start = START;
            element.selectedResources = ALL_RESOURCES;
            element.resources = RESOURCES;
            element.timeSpan = { unit: 'week', span: 1 };
            const labels = {
                center: { value: 'some value' },
                top: { fieldName: 'from' }
            };
            element.eventsLabels = labels;

            return Promise.resolve()
                .then(() => {
                    // Wait for the visible interval to be set
                })
                .then(() => {
                    const events = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                    );
                    expect(events).toHaveLength(2);
                    expect(events[0].labels).toEqual(labels);
                    expect(events[1].labels).toEqual(EVENTS[1].labels);
                });
        });

        // events-theme
        it('Events theme', () => {
            element.events = [
                {
                    name: 'no-theme',
                    resourceNames: [ALL_RESOURCES[0]],
                    from: new Date(2022, 8, 19, 3),
                    to: new Date(2022, 9, 9)
                },
                {
                    name: 'themed',
                    resourceNames: [ALL_RESOURCES[0]],
                    from: new Date(2022, 8, 19),
                    to: new Date(2022, 8, 19, 18),
                    theme: 'transparent'
                }
            ];
            element.start = START;
            element.selectedResources = ALL_RESOURCES;
            element.resources = RESOURCES;
            element.eventsTheme = 'rounded';

            return Promise.resolve()
                .then(() => {
                    // Wait for the visible interval to be set
                })
                .then(() => {
                    const events = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                    );
                    expect(events).toHaveLength(2);
                    expect(events[0].theme).toBe('rounded');
                    expect(events[1].theme).toBe('transparent');
                });
        });

        it('Prevent past event creation', () => {
            element.events = EVENTS;
            element.start = START;
            element.selectedResources = ALL_RESOURCES;
            element.resources = RESOURCES;
            element.preventPastEventCreation = true;

            return Promise.resolve()
                .then(() => {
                    // Wait for the visible interval to be set
                })
                .then(() => {
                    const events = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                    );
                    expect(events.length).not.toBe(0);
                    events.forEach((ev) => {
                        expect(ev.preventPastEventCreation).toBeTruthy();
                    });
                });
        });

        // read-only
        it('Read only', () => {
            element.events = EVENTS;
            element.start = START;
            element.selectedResources = ALL_RESOURCES;
            element.resources = RESOURCES;
            element.readOnly = true;

            return Promise.resolve()
                .then(() => {
                    // Wait for the visible interval to be set
                })
                .then(() => {
                    const events = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                    );
                    expect(events.length).toBeTruthy();
                    events.forEach((ev) => {
                        expect(ev.readOnly).toBeTruthy();
                    });
                });
        });

        // resize-column-disabled
        describe('Resize column disabled', () => {
            it('false', () => {
                element.resizeColumnDisabled = false;

                return Promise.resolve().then(() => {
                    const resizeHandle = element.shadowRoot.querySelector(
                        '[data-element-id="div-splitter-resize-handle"]'
                    );
                    expect(resizeHandle).toBeTruthy();
                });
            });

            it('true', () => {
                element.resizeColumnDisabled = true;

                return Promise.resolve().then(() => {
                    const resizeHandle = element.shadowRoot.querySelector(
                        '[data-element-id="div-splitter-resize-handle"]'
                    );
                    expect(resizeHandle).toBeFalsy();
                });
            });
        });

        // resources
        describe('Resources', () => {
            it('Passed to the data table', () => {
                element.resources = RESOURCES;
                element.events = EVENTS;
                element.start = START;
                element.selectedResources = ALL_RESOURCES;

                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const events = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(events.length).toBeTruthy();
                        events.forEach((ev) => {
                            ev.resources.forEach((res, i) => {
                                expect(res.data).toMatchObject(RESOURCES[i]);
                            });
                        });

                        const datatable = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-datatable"]'
                        );
                        expect(datatable.records).toEqual(RESOURCES);
                    });
            });

            it('Vertical orientation', () => {
                element.resources = RESOURCES;
                element.events = EVENTS;
                element.orientation = 'vertical';
                element.start = START;
                element.selectedResources = ALL_RESOURCES;

                return Promise.resolve().then(() => {
                    const resourceHeaders = element.shadowRoot.querySelectorAll(
                        '[data-element-id="div-vertical-resource-header"]'
                    );
                    expect(resourceHeaders).toHaveLength(RESOURCES.length);
                    resourceHeaders.forEach((res, i) => {
                        const label = res.querySelector(
                            '[data-element-id="div-vertical-resource-header-label"]'
                        );
                        expect(label).toBeTruthy();
                        expect(label.textContent).toBe(RESOURCES[i].label);
                    });

                    const firstResourceAvatar =
                        resourceHeaders[0].querySelector(
                            '[data-element-id="avonni-primitive-avatar"]'
                        );
                    expect(firstResourceAvatar).toBeTruthy();
                    expect(firstResourceAvatar.fallbackIconName).toBe(
                        RESOURCES[0].avatarFallbackIconName
                    );
                    expect(firstResourceAvatar.initials).toBe(
                        RESOURCES[0].avatarInitials
                    );
                    expect(firstResourceAvatar.src).toBe(
                        RESOURCES[0].avatarSrc
                    );
                    [1, 2].forEach((index) => {
                        const avatar = resourceHeaders[index].querySelector(
                            '[data-element-id="avonni-primitive-avatar"]'
                        );
                        expect(avatar).toBeFalsy();
                    });
                });
            });
        });

        // start
        it('Start', () => {
            element.resources = RESOURCES;
            element.events = EVENTS;
            element.start = START;
            element.selectedResources = ALL_RESOURCES;

            return Promise.resolve()
                .then(() => {
                    const header = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-scheduler-header-group"]'
                    );
                    expect(header.start.ts).toBe(START.getTime());
                    // Wait for the visible interval to be set
                })
                .then(() => {
                    const events = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                    );
                    expect(events).toHaveLength(2);
                    const resource = element.shadowRoot.querySelector(
                        '[data-element-id="div-resource"]'
                    );
                    const cells = resource.querySelectorAll(
                        '[data-element-id="div-cell"]'
                    );
                    const cellStart = Number(cells[0].dataset.start);
                    expect(cellStart).toBe(START.getTime());
                });
        });

        // selected-resources
        describe('Selected resources', () => {
            it('Horizontal orientation', () => {
                element.resources = RESOURCES;
                element.events = [EVENTS[0]];
                element.selectedResources = ['resource-2'];
                element.start = new Date(2022, 8, 20);

                return Promise.resolve()
                    .then(() => {
                        const datatable = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-datatable"]'
                        );
                        expect(datatable.records).toEqual([RESOURCES[1]]);

                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const events = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(events).toHaveLength(1);
                        element.selectedResources = EVENTS[0].resourceNames;
                    })
                    .then(() => {
                        const events = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(events).toHaveLength(2);
                    });
            });

            it('Vertical orientation', () => {
                element.resources = RESOURCES;
                element.selectedResources = ['resource-2'];
                element.orientation = 'vertical';
                element.start = START;

                return Promise.resolve().then(() => {
                    const headers = element.shadowRoot.querySelectorAll(
                        '[data-element-id="div-vertical-resource-header-label"]'
                    );
                    expect(headers).toHaveLength(1);
                    expect(headers[0].textContent).toBe('Resource 2');
                });
            });
        });

        // time-span
        describe('Time span', () => {
            it('Passed to headers', () => {
                element.start = new Date(2022, 8, 18, 12, 40);
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.events = EVENTS;
                element.timeSpan = {
                    unit: 'day',
                    span: 2,
                    headers: 'minuteHourAndDay'
                };

                return Promise.resolve()
                    .then(() => {
                        const header = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-header-group"]'
                        );
                        expect(header.headers).toEqual([
                            {
                                unit: 'minute',
                                span: 30,
                                label: 'mm'
                            },
                            {
                                unit: 'hour',
                                span: 1,
                                label: 'h a'
                            },
                            {
                                unit: 'day',
                                span: 1,
                                label: 'ccc, LLL d'
                            }
                        ]);
                        expect(header.timeSpan).toEqual({
                            unit: 'day',
                            span: 2,
                            headers: 'minuteHourAndDay'
                        });
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const cell = element.shadowRoot.querySelector(
                            '[data-element-id="div-cell"]'
                        );
                        const cellStart = Number(cell.dataset.start);
                        expect(cellStart).toBe(
                            new Date(2022, 8, 18, 12, 40).getTime()
                        );

                        const events = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(events).toHaveLength(4);
                        events.forEach((ev) => {
                            ['event-1', 'event-2', 'disabled-event'].includes(
                                ev.eventName
                            );
                        });
                    });
            });

            it('Custom headers', () => {
                element.start = START;
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.events = EVENTS;
                const timeSpan = {
                    unit: 'week',
                    span: 4,
                    label: 'Two week sprint',
                    customHeaders: [
                        {
                            unit: 'week',
                            span: 2,
                            label: 'W'
                        },
                        {
                            unit: 'day',
                            span: 1,
                            label: 'dd'
                        }
                    ],
                    headers: 'hourDayAndWeek'
                };
                element.timeSpan = timeSpan;

                return Promise.resolve()
                    .then(() => {
                        const header = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-header-group"]'
                        );
                        expect(header.headers).toEqual(timeSpan.customHeaders);
                        expect(header.timeSpan).toEqual(timeSpan);
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const cell = element.shadowRoot.querySelector(
                            '[data-element-id="div-cell"]'
                        );
                        const cellStart = Number(cell.dataset.start);
                        expect(cellStart).toBe(START.getTime());

                        const events = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(events).toHaveLength(5);
                        events.forEach((ev) => {
                            [
                                'event-1',
                                'event-2',
                                'disabled-event',
                                'reference-line'
                            ].includes(ev.eventName);
                        });
                    });
            });

            it('Vertical orientation', () => {
                element.start = START;
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                const timeSpan = {
                    unit: 'month',
                    span: 2,
                    headers: 'hourDayAndWeek'
                };
                element.timeSpan = timeSpan;

                return Promise.resolve().then(() => {
                    const header = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-scheduler-header-group"]'
                    );
                    expect(header.headers).toEqual([
                        {
                            unit: 'hour',
                            span: 1,
                            label: 'h a'
                        },
                        {
                            unit: 'day',
                            span: 1,
                            label: 'ccc, LLL d'
                        },
                        {
                            unit: 'week',
                            span: 1,
                            label: "'w.'W 'of' yyyy"
                        }
                    ]);
                    expect(header.timeSpan).toEqual(timeSpan);
                });
            });
        });

        // orientation
        describe('Orientation', () => {
            it('horizontal', () => {
                element.start = START;
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.events = EVENTS;
                element.orientation = 'horizontal';

                return Promise.resolve()
                    .then(() => {
                        const datatable = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-datatable"]'
                        );
                        const scheduleWrapper =
                            element.shadowRoot.querySelector(
                                '[data-element-id="div-schedule-wrapper"]'
                            );
                        const horizontalHeaders = scheduleWrapper.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-header-group"]'
                        );
                        const verticalHeaders =
                            element.shadowRoot.querySelector(
                                '[data-element-id="div-vertical-header-wrapper"]'
                            );
                        const resourceHeaders =
                            element.shadowRoot.querySelector(
                                '[data-element-id="div-vertical-resource-headers"]'
                            );
                        const resourceRow = element.shadowRoot.querySelector(
                            '[data-element-id="div-resource"]'
                        );
                        const firstCol = element.shadowRoot.querySelector(
                            '[data-element-id="div-panel"]'
                        );
                        const scheduleBody = element.shadowRoot.querySelector(
                            '[data-element-id="div-schedule-body"]'
                        );
                        const cell = element.shadowRoot.querySelector(
                            '[data-element-id="div-cell"]'
                        );
                        expect(datatable).toBeTruthy();
                        expect(horizontalHeaders).toBeTruthy();
                        expect(verticalHeaders).toBeFalsy();
                        expect(resourceHeaders).toBeFalsy();
                        expect(resourceRow.className).toBe(
                            'slds-grid slds-is-relative'
                        );
                        expect(firstCol.className).toBe(
                            'avonni-scheduler__first-col slds-grid slds-scrollable avonni-scheduler__main-border_left avonni-scheduler__main-border_top avonni-scheduler__main-border_bottom avonni-scheduler__first-col_horizontal'
                        );
                        expect(scheduleWrapper.className).toBe(
                            'slds-grid slds-is-relative avonni-scheduler__schedule-wrapper'
                        );
                        expect(scheduleBody.className).toBe('slds-is-relative');
                        expect(cell.classList).toContain(
                            'avonni-scheduler__flex-col'
                        );
                        expect(cell.classList).not.toContain(
                            'avonni-scheduler__cell_vertical'
                        );
                    })
                    .then(() => {
                        const event = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(event.headerCells.xAxis).toBeTruthy();
                        expect(event.variant).toBe('timeline-horizontal');
                    });
            });

            it('vertical', () => {
                element.start = START;
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.events = EVENTS;
                element.orientation = 'vertical';

                return Promise.resolve()
                    .then(() => {
                        const datatable = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-datatable"]'
                        );
                        const scheduleWrapper =
                            element.shadowRoot.querySelector(
                                '[data-element-id="div-schedule-wrapper"]'
                            );
                        const horizontalHeaders = scheduleWrapper.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-header-group"]'
                        );
                        const verticalHeaders =
                            element.shadowRoot.querySelector(
                                '[data-element-id="div-vertical-header-wrapper"]'
                            );
                        const resourceHeaders =
                            element.shadowRoot.querySelector(
                                '[data-element-id="div-vertical-resource-headers"]'
                            );
                        const resourceRow = element.shadowRoot.querySelector(
                            '[data-element-id="div-resource"]'
                        );
                        const firstCol = element.shadowRoot.querySelector(
                            '[data-element-id="div-panel"]'
                        );
                        const scheduleBody = element.shadowRoot.querySelector(
                            '[data-element-id="div-schedule-body"]'
                        );
                        const cell = element.shadowRoot.querySelector(
                            '[data-element-id="div-cell"]'
                        );
                        expect(datatable).toBeFalsy();
                        expect(horizontalHeaders).toBeFalsy();
                        expect(verticalHeaders).toBeTruthy();
                        expect(resourceHeaders).toBeTruthy();
                        expect(resourceRow.className).toBe(
                            'slds-grid slds-is-relative slds-grid_vertical avonni-scheduler__flex-col'
                        );
                        expect(firstCol.className).toBe(
                            'avonni-scheduler__first-col slds-grid slds-scrollable avonni-scheduler__main-border_left avonni-scheduler__main-border_top avonni-scheduler__main-border_bottom avonni-scheduler__grid_align-end avonni-scheduler__first-col_vertical'
                        );
                        expect(scheduleWrapper.className).toBe(
                            'slds-grid slds-is-relative avonni-scheduler__schedule-wrapper avonni-scheduler__schedule-wrapper_vertical slds-border_top'
                        );
                        expect(scheduleBody.className).toBe(
                            'slds-is-relative slds-grid avonni-scheduler__schedule-body_vertical'
                        );
                        expect(cell.classList).not.toContain(
                            'avonni-scheduler__flex-col'
                        );
                        expect(cell.classList).toContain(
                            'avonni-scheduler__cell_vertical'
                        );
                    })
                    .then(() => {
                        const event = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(event.headerCells.yAxis).toBeTruthy();
                        expect(event.variant).toBe('timeline-vertical');
                    });
            });
        });

        // zoom-to-fit
        describe('Zoom to fit', () => {
            it('false', () => {
                element.start = START;
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.events = EVENTS;
                element.zoomToFit = false;

                return Promise.resolve()
                    .then(() => {
                        const cell = element.shadowRoot.querySelector(
                            '[data-element-id="div-cell"]'
                        );
                        const col = element.shadowRoot.querySelector(
                            '[data-element-id="div-schedule-col"]'
                        );
                        const nestedCol = element.shadowRoot.querySelector(
                            '[data-element-id="div-schedule-nested-col"]'
                        );
                        expect(cell.classList).not.toContain(
                            'avonni-scheduler__cell_zoom-to-fit'
                        );
                        expect(col.className).toBe(
                            'avonni-scheduler__flex-col slds-grid avonni-scheduler__schedule-col slds-theme_default'
                        );
                        expect(nestedCol.className).toBe(
                            'avonni-scheduler__flex-col'
                        );

                        element.orientation = 'vertical';
                    })
                    .then(() => {
                        const resourceHeader = element.shadowRoot.querySelector(
                            '[data-element-id="div-vertical-resource-header"]'
                        );
                        expect(resourceHeader.classList).not.toContain(
                            'avonni-scheduler__vertical-resource-header-cell_zoom-to-fit'
                        );
                    });
            });

            it('true', () => {
                element.start = START;
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.events = EVENTS;
                element.zoomToFit = true;

                return Promise.resolve()
                    .then(() => {
                        const cell = element.shadowRoot.querySelector(
                            '[data-element-id="div-cell"]'
                        );
                        const col = element.shadowRoot.querySelector(
                            '[data-element-id="div-schedule-col"]'
                        );
                        const nestedCol = element.shadowRoot.querySelector(
                            '[data-element-id="div-schedule-nested-col"]'
                        );
                        expect(cell.classList).toContain(
                            'avonni-scheduler__cell_zoom-to-fit'
                        );
                        expect(col.className).toBe(
                            'avonni-scheduler__flex-col slds-grid avonni-scheduler__schedule-col slds-theme_default avonni-scheduler__schedule-col_zoom-to-fit'
                        );
                        expect(nestedCol.className).toBe(
                            'avonni-scheduler__flex-col avonni-scheduler__schedule-col_zoom-to-fit'
                        );

                        element.orientation = 'vertical';
                    })
                    .then(() => {
                        const resourceHeader = element.shadowRoot.querySelector(
                            '[data-element-id="div-vertical-resource-header"]'
                        );
                        expect(resourceHeader.classList).toContain(
                            'avonni-scheduler__vertical-resource-header-cell_zoom-to-fit'
                        );
                    });
            });
        });
    });

    /*
     * ------------------------------------------------------------
     *  METHODS
     * -------------------------------------------------------------
     */

    describe('Methods', () => {
        // collapseSidePanel
        describe('Collapse side panel', () => {
            it('Close the side panel', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;

                return Promise.resolve()
                    .then(() => {
                        const collapseButton = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-icon-splitter-collapse"]'
                        );
                        const resizeButton = element.shadowRoot.querySelector(
                            '[data-element-id="div-splitter-resize-handle"]'
                        );
                        const sidePanel = element.shadowRoot.querySelector(
                            '[data-element-id="div-panel"]'
                        );
                        const splitter = element.shadowRoot.querySelector(
                            '[data-element-id="div-splitter"]'
                        );
                        expect(splitter.classList).toContain(
                            'avonni-scheduler__splitter_resizable'
                        );
                        expect(splitter.classList).toContain(
                            'avonni-scheduler__border_left'
                        );
                        expect(collapseButton).toBeTruthy();
                        expect(resizeButton).toBeTruthy();
                        expect(sidePanel.classList).toContain(
                            'avonni-scheduler__first-col_horizontal'
                        );
                        expect(sidePanel.classList).not.toContain(
                            'avonni-scheduler__panel_collapsed'
                        );
                        element.collapseSidePanel();
                    })
                    .then(() => {
                        const collapseButton = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-icon-splitter-collapse"]'
                        );
                        const resizeButton = element.shadowRoot.querySelector(
                            '[data-element-id="div-splitter-resize-handle"]'
                        );
                        const sidePanel = element.shadowRoot.querySelector(
                            '[data-element-id="div-panel"]'
                        );
                        const splitter = element.shadowRoot.querySelector(
                            '[data-element-id="div-splitter"]'
                        );
                        expect(splitter.classList).not.toContain(
                            'avonni-scheduler__splitter_resizable'
                        );
                        expect(splitter.classList).not.toContain(
                            'avonni-scheduler__border_left'
                        );
                        expect(collapseButton).toBeFalsy();
                        expect(resizeButton).toBeFalsy();
                        expect(sidePanel.classList).not.toContain(
                            'avonni-scheduler__first-col_horizontal'
                        );
                        expect(sidePanel.classList).toContain(
                            'avonni-scheduler__panel_collapsed'
                        );
                    });
            });

            it('User triggered', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;

                return Promise.resolve()
                    .then(() => {
                        const collapseButton = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-icon-splitter-collapse"]'
                        );
                        collapseButton.click();
                    })
                    .then(() => {
                        const sidePanel = element.shadowRoot.querySelector(
                            '[data-element-id="div-panel"]'
                        );
                        expect(sidePanel.classList).toContain(
                            'avonni-scheduler__panel_collapsed'
                        );
                    });
            });

            it('Triggering erases panel resizing', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;

                return Promise.resolve()
                    .then(() => {
                        const splitter = element.shadowRoot.querySelector(
                            '[data-element-id="div-splitter"]'
                        );
                        const panel = element.shadowRoot.querySelector(
                            '[data-element-id="div-panel"]'
                        );
                        jest.spyOn(panel, 'offsetWidth', 'get').mockReturnValue(
                            50
                        );

                        // Resize panel
                        const mousedown = new CustomEvent('mousedown');
                        mousedown.button = 0;
                        mousedown.clientX = 100;
                        splitter.dispatchEvent(mousedown);

                        const mousemove = new CustomEvent('mousemove');
                        mousemove.clientX = 200;
                        window.dispatchEvent(mousemove);

                        const mouseup = new CustomEvent('mouseup');
                        window.dispatchEvent(mouseup);

                        expect(panel.style.flexBasis).toBe('150px');

                        // Collapse panel
                        element.collapseSidePanel();
                    })
                    .then(() => {
                        const panel = element.shadowRoot.querySelector(
                            '[data-element-id="div-panel"]'
                        );
                        expect(panel.style.flexBasis).toBe('');
                    });
            });
        });

        it('Datatable resize overwrites panel width', () => {
            element.resources = RESOURCES;
            element.selectedResources = ALL_RESOURCES;

            return Promise.resolve().then(() => {
                const datatable = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-datatable"]'
                );
                const panel = element.shadowRoot.querySelector(
                    '[data-element-id="div-panel"]'
                );
                expect(panel.style.flexBasis).toBe('');

                datatable.dispatchEvent(
                    new CustomEvent('resize', {
                        detail: {
                            isUserTriggered: true,
                            columnWidths: [23, 37, 100]
                        }
                    })
                );
                expect(panel.style.flexBasis).toBe('160px');
            });
        });

        // createEvent
        it('Create event', () => {
            element.start = START;
            element.resources = RESOURCES;
            element.selectedResources = ALL_RESOURCES;

            return Promise.resolve()
                .then(() => {
                    // Wait for the visible interval to be set
                })
                .then(() => {
                    element.createEvent(EVENTS[1]);
                })
                .then(() => {
                    const events = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                    );
                    expect(events).toHaveLength(1);
                    expect(events[0].eventName).toBe(EVENTS[1].name);
                });
        });

        // deleteEvent
        it('Delete event', () => {
            element.start = START;
            element.resources = RESOURCES;
            element.selectedResources = ALL_RESOURCES;
            element.events = EVENTS;

            return Promise.resolve()
                .then(() => {
                    // Wait for the visible interval to be set
                })
                .then(() => {
                    const events = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                    );
                    expect(events).toHaveLength(2);
                    element.deleteEvent(events[0].eventName);
                })
                .then(() => {
                    const events = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                    );
                    expect(events).toHaveLength(1);
                });
        });

        // expandSidePanel
        describe('Expand side panel', () => {
            it('expandSidePanel() method', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;

                return Promise.resolve()
                    .then(() => {
                        const expandButton = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-icon-splitter-expand"]'
                        );
                        const resizeButton = element.shadowRoot.querySelector(
                            '[data-element-id="div-splitter-resize-handle"]'
                        );
                        const sidePanel = element.shadowRoot.querySelector(
                            '[data-element-id="div-panel"]'
                        );
                        const splitter = element.shadowRoot.querySelector(
                            '[data-element-id="div-splitter"]'
                        );
                        expect(splitter.classList).toContain(
                            'avonni-scheduler__splitter_resizable'
                        );
                        expect(splitter.classList).toContain(
                            'avonni-scheduler__border_right'
                        );
                        expect(expandButton).toBeTruthy();
                        expect(resizeButton).toBeTruthy();
                        expect(sidePanel.classList).not.toContain(
                            'avonni-scheduler__panel_expanded'
                        );
                        element.expandSidePanel();
                    })
                    .then(() => {
                        const expandButton = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-icon-splitter-expand"]'
                        );
                        const resizeButton = element.shadowRoot.querySelector(
                            '[data-element-id="div-splitter-resize-handle"]'
                        );
                        const sidePanel = element.shadowRoot.querySelector(
                            '[data-element-id="div-panel"]'
                        );
                        const splitter = element.shadowRoot.querySelector(
                            '[data-element-id="div-splitter"]'
                        );
                        expect(splitter.classList).not.toContain(
                            'avonni-scheduler__splitter_resizable'
                        );
                        expect(splitter.classList).not.toContain(
                            'avonni-scheduler__border_right'
                        );
                        expect(expandButton).toBeFalsy();
                        expect(resizeButton).toBeFalsy();
                        expect(sidePanel.classList).toContain(
                            'avonni-scheduler__panel_expanded'
                        );
                    });
            });

            it('expandSidePanel(), user triggered', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;

                return Promise.resolve()
                    .then(() => {
                        const expandButton = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-icon-splitter-expand"]'
                        );
                        expandButton.click();
                    })
                    .then(() => {
                        const sidePanel = element.shadowRoot.querySelector(
                            '[data-element-id="div-panel"]'
                        );
                        expect(sidePanel.classList).toContain(
                            'avonni-scheduler__panel_expanded'
                        );
                    });
            });

            it('expandSidePanel() erases panel resizing', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;

                return Promise.resolve()
                    .then(() => {
                        const splitter = element.shadowRoot.querySelector(
                            '[data-element-id="div-splitter"]'
                        );
                        const panel = element.shadowRoot.querySelector(
                            '[data-element-id="div-panel"]'
                        );
                        jest.spyOn(panel, 'offsetWidth', 'get').mockReturnValue(
                            50
                        );

                        // Resize panel
                        const mousedown = new CustomEvent('mousedown');
                        mousedown.button = 0;
                        mousedown.clientX = 100;
                        splitter.dispatchEvent(mousedown);

                        const mousemove = new CustomEvent('mousemove');
                        mousemove.clientX = 200;
                        window.dispatchEvent(mousemove);

                        const mouseup = new CustomEvent('mouseup');
                        window.dispatchEvent(mouseup);

                        expect(panel.style.flexBasis).toBe('150px');

                        // Expand panel
                        element.expandSidePanel();
                    })
                    .then(() => {
                        const panel = element.shadowRoot.querySelector(
                            '[data-element-id="div-panel"]'
                        );
                        expect(panel.style.flexBasis).toBe('');
                    });
            });

            it('expandSidePanel() and collapseSidePanel() in a row', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;

                return Promise.resolve()
                    .then(() => {
                        // Collapse
                        element.collapseSidePanel();
                    })
                    .then(() => {
                        const sidePanel = element.shadowRoot.querySelector(
                            '[data-element-id="div-panel"]'
                        );
                        expect(sidePanel.classList).toContain(
                            'avonni-scheduler__panel_collapsed'
                        );
                        expect(sidePanel.classList).not.toContain(
                            'avonni-scheduler__panel_expanded'
                        );
                        // Expand to original position
                        element.expandSidePanel();
                    })
                    .then(() => {
                        const sidePanel = element.shadowRoot.querySelector(
                            '[data-element-id="div-panel"]'
                        );
                        expect(sidePanel.classList).not.toContain(
                            'avonni-scheduler__panel_collapsed'
                        );
                        expect(sidePanel.classList).not.toContain(
                            'avonni-scheduler__panel_expanded'
                        );
                        // Expand to full width
                        element.expandSidePanel();
                    })
                    .then(() => {
                        const sidePanel = element.shadowRoot.querySelector(
                            '[data-element-id="div-panel"]'
                        );
                        expect(sidePanel.classList).not.toContain(
                            'avonni-scheduler__panel_collapsed'
                        );
                        expect(sidePanel.classList).toContain(
                            'avonni-scheduler__panel_expanded'
                        );
                        // Collapse to original position
                        element.collapseSidePanel();
                    })
                    .then(() => {
                        const sidePanel = element.shadowRoot.querySelector(
                            '[data-element-id="div-panel"]'
                        );
                        expect(sidePanel.classList).not.toContain(
                            'avonni-scheduler__panel_collapsed'
                        );
                        expect(sidePanel.classList).not.toContain(
                            'avonni-scheduler__panel_expanded'
                        );
                    });
            });
        });

        // newEvent and saveSelection
        describe('New event and save selection', () => {
            it('New event is created and saved', () => {
                element.start = START;
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;

                let from, to;
                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const resourceRows =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="div-resource"]'
                            );
                        const cell = resourceRows[1].querySelector(
                            '[data-element-id="div-cell"]'
                        );
                        from = Number(cell.dataset.start);
                        to = Number(cell.dataset.end);
                        jest.spyOn(
                            resourceRows[0],
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { top: 0, bottom: 99 };
                        });
                        jest.spyOn(
                            resourceRows[1],
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { top: 100, bottom: 300 };
                        });
                        jest.spyOn(
                            cell,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { left: 0, right: 130 };
                        });
                        const newEvent = element.newEvent({ x: 102, y: 150 });
                        expect(newEvent).toBeTruthy();
                    })
                    .then(() => {
                        const events = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(events).toHaveLength(0);
                        element.saveSelection();
                    })
                    .then(() => {
                        const events = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(events).toHaveLength(1);
                        expect(events[0].resourceKey).toBe(RESOURCES[1].name);
                        expect(events[0].from.ts).toBe(from);
                        expect(events[0].to.ts).toBe(to);
                    });
            });

            it('No given position to new event', () => {
                element.start = START;
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;

                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const newEvent = element.newEvent();
                        expect(newEvent).toBeTruthy();
                    })
                    .then(() => {
                        const events = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(events).toHaveLength(0);
                        element.saveSelection();
                    })
                    .then(() => {
                        const events = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        const resourceRow = element.shadowRoot.querySelector(
                            '[data-element-id="div-resource"]'
                        );
                        const cell = resourceRow.querySelector(
                            '[data-element-id="div-cell"]'
                        );
                        const from = Number(cell.dataset.start);
                        const to = Number(cell.dataset.end);
                        expect(events).toHaveLength(1);
                        expect(events[0].resourceKey).toBe(RESOURCES[0].name);
                        expect(events[0].from.ts).toBe(from);
                        expect(events[0].to.ts).toBe(to);
                    });
            });

            it('New event is prevented by preventPastEventCreation', () => {
                element.start = START;
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.preventPastEventCreation = true;

                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const resourceRows =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="div-resource"]'
                            );
                        const cell = resourceRows[1].querySelector(
                            '[data-element-id="div-cell"]'
                        );
                        jest.spyOn(
                            resourceRows[0],
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { top: 0, bottom: 99 };
                        });
                        jest.spyOn(
                            resourceRows[1],
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { top: 100, bottom: 300 };
                        });
                        jest.spyOn(
                            cell,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { left: 0, right: 130 };
                        });
                        const newEvent = element.newEvent({ x: 102, y: 150 });
                        expect(newEvent).toBeFalsy();
                    });
            });
        });
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    describe('Events', () => {
        // emptyspotcontextmenu
        describe('Empty spot context menu', () => {
            it('Fired on context menu event on an empty cell', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;

                const handler = jest.fn();
                element.addEventListener('emptyspotcontextmenu', handler);

                return Promise.resolve().then(() => {
                    const cell = element.shadowRoot.querySelector(
                        '[data-element-id="div-cell"]'
                    );
                    const contextMenuEvent = new CustomEvent('contextmenu');
                    contextMenuEvent.clientY = 100;
                    contextMenuEvent.clientX = 120;
                    const from = Number(cell.dataset.start);
                    const to = Number(cell.dataset.end);
                    cell.dispatchEvent(contextMenuEvent);

                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.detail.y).toBe(100);
                    expect(call.detail.x).toBe(120);
                    expect(new Date(call.detail.from).getTime()).toBe(from);
                    expect(new Date(call.detail.to).getTime()).toBe(to);
                    expect(call.bubbles).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                });
            });

            it('Fired by a disabled event', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.events = [EVENTS[2]];
                element.start = START;

                const handler = jest.fn();
                element.addEventListener('emptyspotcontextmenu', handler);

                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const event = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        const contextMenuEvent = new CustomEvent(
                            'privatedisabledcontextmenu'
                        );
                        contextMenuEvent.clientY = 12;
                        contextMenuEvent.clientX = 5;
                        const from = Number(event.dataset.start);
                        const to = Number(event.dataset.end);
                        event.dispatchEvent(contextMenuEvent);

                        expect(handler).toHaveBeenCalled();
                        const detail = handler.mock.calls[0][0].detail;
                        expect(detail.y).toBe(12);
                        expect(detail.x).toBe(5);
                        expect(new Date(detail.from).getTime()).toBe(from);
                        expect(new Date(detail.to).getTime()).toBe(to);
                    });
            });
        });

        // eventchange
        describe('Event change', () => {
            it('Resizing the end of an event', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.start = START;
                element.events = [
                    {
                        name: 'simple-event',
                        from: new Date(2022, 8, 19, 10),
                        to: new Date(2022, 8, 19, 11),
                        resourceNames: ['resource-1']
                    }
                ];

                const handler = jest.fn();
                const hidePopoversHandler = jest.fn();
                element.addEventListener('hidepopovers', hidePopoversHandler);
                element.addEventListener('eventchange', handler);

                const body = element.shadowRoot.querySelector(
                    '[data-element-id="div-schedule-body"]'
                );
                jest.spyOn(body, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 0, right: 1000, top: 0, bottom: 1000 };
                    }
                );

                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const event = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        const resourceRow = element.shadowRoot.querySelector(
                            '[data-element-id="div-resource"][data-name="resource-1"]'
                        );
                        const cells = resourceRow.querySelectorAll(
                            '[data-element-id="div-cell"]'
                        );
                        jest.spyOn(
                            event,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { right: 31, width: 10 };
                        });
                        jest.spyOn(
                            resourceRow,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { top: 0, bottom: 100 };
                        });
                        jest.spyOn(
                            cells[0],
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { left: 0, right: 150 };
                        });
                        jest.spyOn(
                            cells[1],
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { left: 151, right: 260 };
                        });

                        // mousedown on the event
                        event.dispatchEvent(
                            new CustomEvent('privatemousedown', {
                                detail: {
                                    eventName: event.eventName,
                                    from: event.from,
                                    key: event.occurrenceKey,
                                    side: 'end',
                                    x: 30,
                                    y: 50
                                }
                            })
                        );
                        expect(hidePopoversHandler).toHaveBeenCalledTimes(1);
                        expect(
                            hidePopoversHandler.mock.calls[0][0].detail.list
                        ).toBeUndefined();

                        // mousemove to the second cell
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-schedule-wrapper"]'
                        );
                        const mousemove = new CustomEvent('mousemove');
                        mousemove.clientX = 203;
                        mousemove.clientY = 51;
                        wrapper.dispatchEvent(mousemove);
                        expect(event.style.width).toBe('183px');

                        // mouseup
                        const mouseup = new CustomEvent('mouseup', {
                            bubbles: true
                        });
                        mouseup.clientX = 205;
                        mouseup.clientY = 50;
                        wrapper.dispatchEvent(mouseup);

                        expect(handler).toHaveBeenCalled();
                        const call = handler.mock.calls[0][0];
                        const to = new Date(Number(cells[1].dataset.end) + 1);
                        expect(call.detail.name).toBe(event.eventName);
                        expect(call.detail.draftValues).toEqual({
                            allDay: undefined,
                            to: to.toISOString()
                        });
                        expect(call.bubbles).toBeTruthy();
                        expect(call.cancelable).toBeFalsy();
                        expect(call.composed).toBeFalsy();
                    });
            });

            it('Resizing the start of an event', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.start = START;
                element.events = [
                    {
                        name: 'simple-event',
                        from: new Date(2022, 8, 19, 10),
                        to: new Date(2022, 8, 19, 11),
                        resourceNames: ['resource-1']
                    }
                ];

                const handler = jest.fn();
                const hidePopoversHandler = jest.fn();
                element.addEventListener('hidepopovers', hidePopoversHandler);
                element.addEventListener('eventchange', handler);

                const body = element.shadowRoot.querySelector(
                    '[data-element-id="div-schedule-body"]'
                );
                jest.spyOn(body, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 0, right: 1000, top: 0, bottom: 1000 };
                    }
                );

                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const event = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        const resourceRow = element.shadowRoot.querySelector(
                            '[data-element-id="div-resource"][data-name="resource-1"]'
                        );
                        const cells = resourceRow.querySelectorAll(
                            '[data-element-id="div-cell"]'
                        );
                        jest.spyOn(
                            event,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { left: 31, width: 10 };
                        });
                        jest.spyOn(
                            resourceRow,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { top: 0, bottom: 100 };
                        });
                        jest.spyOn(
                            cells[0],
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { left: 0, right: 150 };
                        });
                        jest.spyOn(
                            cells[1],
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { left: 151, right: 260 };
                        });

                        // mousedown on the event
                        event.dispatchEvent(
                            new CustomEvent('privatemousedown', {
                                detail: {
                                    eventName: event.eventName,
                                    from: event.from,
                                    key: event.occurrenceKey,
                                    side: 'start',
                                    x: 130,
                                    y: 50
                                }
                            })
                        );
                        expect(hidePopoversHandler).toHaveBeenCalledTimes(1);
                        expect(
                            hidePopoversHandler.mock.calls[0][0].detail.list
                        ).toBeUndefined();

                        // mousemove to the second cell
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-schedule-wrapper"]'
                        );
                        const mousemove = new CustomEvent('mousemove');
                        mousemove.clientX = 38;
                        mousemove.clientY = 51;
                        wrapper.dispatchEvent(mousemove);
                        expect(event.style.width).toBe('41px');

                        // mouseup
                        const mouseup = new CustomEvent('mouseup', {
                            bubbles: true
                        });
                        mouseup.clientX = 38;
                        mouseup.clientY = 50;
                        wrapper.dispatchEvent(mouseup);

                        expect(handler).toHaveBeenCalled();
                        const from = new Date(Number(cells[0].dataset.start));
                        const call = handler.mock.calls[0][0];
                        expect(call.detail.name).toBe(event.eventName);
                        expect(call.detail.draftValues).toEqual({
                            allDay: undefined,
                            from: from.toISOString()
                        });
                    });
            });

            it('Drag and dropping', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.start = START;
                element.events = [
                    {
                        name: 'simple-event',
                        from: new Date(2022, 8, 19, 10),
                        to: new Date(2022, 8, 19, 11),
                        resourceNames: ['resource-1']
                    }
                ];

                const handler = jest.fn();
                const hidePopoversHandler = jest.fn();
                element.addEventListener('hidepopovers', hidePopoversHandler);
                element.addEventListener('eventchange', handler);

                const body = element.shadowRoot.querySelector(
                    '[data-element-id="div-schedule-body"]'
                );
                jest.spyOn(body, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 0, right: 1000, top: 0, bottom: 1000 };
                    }
                );

                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const event = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        const resourceOne = element.shadowRoot.querySelector(
                            '[data-element-id="div-resource"][data-name="resource-1"]'
                        );
                        const resourceTwo = element.shadowRoot.querySelector(
                            '[data-element-id="div-resource"][data-name="resource-2"]'
                        );
                        const resourceTwoCell = resourceTwo.querySelector(
                            '[data-element-id="div-cell"]'
                        );
                        jest.spyOn(
                            event,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { left: 2, width: 60 };
                        });
                        jest.spyOn(
                            resourceOne,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { top: 0, bottom: 100 };
                        });
                        jest.spyOn(
                            resourceTwo,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { top: 101, bottom: 200 };
                        });
                        jest.spyOn(
                            resourceTwoCell,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { left: 0, right: 150 };
                        });

                        // mousedown on the event
                        event.dispatchEvent(
                            new CustomEvent('privatemousedown', {
                                detail: {
                                    eventName: event.eventName,
                                    from: event.from,
                                    key: event.occurrenceKey,
                                    x: 130,
                                    y: 50
                                }
                            })
                        );
                        expect(hidePopoversHandler).toHaveBeenCalledTimes(1);
                        expect(
                            hidePopoversHandler.mock.calls[0][0].detail.list
                        ).toBeUndefined();

                        // mousemove to the second resource
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-schedule-wrapper"]'
                        );
                        const mousemove = new CustomEvent('mousemove');
                        mousemove.clientX = 38;
                        mousemove.clientY = 151;
                        wrapper.dispatchEvent(mousemove);

                        // mouseup
                        const mouseup = new CustomEvent('mouseup', {
                            bubbles: true
                        });
                        mouseup.clientX = 38;
                        mouseup.clientY = 150;
                        wrapper.dispatchEvent(mouseup);

                        expect(handler).toHaveBeenCalled();
                        const from = new Date(
                            Number(resourceTwoCell.dataset.start)
                        );
                        const call = handler.mock.calls[0][0];
                        expect(call.detail.name).toBe(event.eventName);
                        expect(call.detail.draftValues).toMatchObject({
                            from: from.toISOString(),
                            resourceNames: ['resource-2']
                        });
                    });
            });

            it('Prevented if the dragged event is in the past and preventPastEventCreation is true', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.preventPastEventCreation = true;
                element.start = START;
                element.events = [
                    {
                        name: 'simple-event',
                        from: new Date(2022, 8, 19, 10),
                        to: new Date(2022, 8, 19, 11),
                        resourceNames: ['resource-1']
                    }
                ];

                const handler = jest.fn();
                const hidePopoversHandler = jest.fn();
                element.addEventListener('hidepopovers', hidePopoversHandler);
                element.addEventListener('eventchange', handler);

                const body = element.shadowRoot.querySelector(
                    '[data-element-id="div-schedule-body"]'
                );
                jest.spyOn(body, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 0, right: 1000, top: 0, bottom: 1000 };
                    }
                );

                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const event = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        const resourceOne = element.shadowRoot.querySelector(
                            '[data-element-id="div-resource"][data-name="resource-1"]'
                        );
                        const resourceTwo = element.shadowRoot.querySelector(
                            '[data-element-id="div-resource"][data-name="resource-2"]'
                        );
                        const resourceTwoCell = resourceTwo.querySelector(
                            '[data-element-id="div-cell"]'
                        );
                        jest.spyOn(
                            event,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { left: 2, width: 60 };
                        });
                        jest.spyOn(
                            resourceOne,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { top: 0, bottom: 100 };
                        });
                        jest.spyOn(
                            resourceTwo,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { top: 101, bottom: 200 };
                        });
                        jest.spyOn(
                            resourceTwoCell,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { left: 0, right: 150 };
                        });

                        // mousedown on the event
                        event.dispatchEvent(
                            new CustomEvent('privatemousedown', {
                                detail: {
                                    eventName: event.eventName,
                                    from: event.from,
                                    key: event.occurrenceKey,
                                    x: 130,
                                    y: 50
                                }
                            })
                        );
                        expect(hidePopoversHandler).not.toHaveBeenCalled();

                        // mousemove to the second resource
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-schedule-wrapper"]'
                        );
                        const mousemove = new CustomEvent('mousemove');
                        mousemove.clientX = 38;
                        mousemove.clientY = 151;
                        wrapper.dispatchEvent(mousemove);

                        // mouseup
                        const mouseup = new CustomEvent('mouseup', {
                            bubbles: true
                        });
                        mouseup.clientX = 38;
                        mouseup.clientY = 150;
                        wrapper.dispatchEvent(mouseup);

                        expect(handler).not.toHaveBeenCalled();
                    });
            });

            it('Drag and dropping a recurrent event', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.start = START;
                element.events = [RECURRING_EVENT];
                const eventDuration = 7200000;
                element.timeSpan = { unit: 'day', span: 3 };
                element.recurrentEditModes = ['one'];

                const handler = jest.fn();
                element.addEventListener('eventchange', handler);

                const body = element.shadowRoot.querySelector(
                    '[data-element-id="div-schedule-body"]'
                );
                jest.spyOn(body, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 0, right: 1000, top: 0, bottom: 1000 };
                    }
                );

                let from, to;
                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const event = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        const resourceRow = element.shadowRoot.querySelector(
                            '[data-element-id="div-resource"][data-name="resource-1"]'
                        );
                        const cells = resourceRow.querySelectorAll(
                            '[data-element-id="div-cell"]'
                        );
                        jest.spyOn(
                            event,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { left: 80, width: 150 };
                        });
                        jest.spyOn(
                            resourceRow,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { top: 0, bottom: 100 };
                        });
                        jest.spyOn(
                            cells[0],
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { left: 0, right: 150 };
                        });

                        jest.spyOn(
                            cells[1],
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { left: 151, right: 250 };
                        });

                        // mousedown on the event
                        event.x = 80;
                        event.y = 15;
                        event.dispatchEvent(
                            new CustomEvent('privatemousedown', {
                                detail: {
                                    eventName: event.eventName,
                                    from: event.from,
                                    key: event.occurrenceKey,
                                    x: 90,
                                    y: 18
                                }
                            })
                        );

                        // mousemove to the second cell
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-schedule-wrapper"]'
                        );
                        const mousemove = new CustomEvent('mousemove');
                        mousemove.clientX = 200;
                        mousemove.clientY = 13;
                        wrapper.dispatchEvent(mousemove);
                        expect(event.x).toBe(200 - 90 + 80);
                        expect(event.y).toBe(13 - 18 + 15);

                        // mouseup
                        const mouseup = new CustomEvent('mouseup', {
                            bubbles: true
                        });
                        mouseup.clientX = 189;
                        mouseup.clientY = 10;
                        wrapper.dispatchEvent(mouseup);

                        expect(handler).toHaveBeenCalled();
                        from = Number(cells[1].dataset.start);
                        to = from + eventDuration;
                        const call = handler.mock.calls[0][0];
                        expect(call.detail.name).toBe(event.eventName);
                        expect(call.detail.draftValues).toEqual({
                            from: new Date(from).toISOString(),
                            to: new Date(to).toISOString()
                        });
                        expect(call.detail.recurrenceDates).toEqual({
                            from: new Date(from).toISOString(),
                            to: new Date(to).toISOString()
                        });
                    })
                    .then(() => {
                        const event = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(event.from.ts).toBe(from);
                        expect(event.to.ts).toBe(to);
                    });
            });
        });

        // eventcontextmenu
        it('Event context menu', () => {
            element.resources = RESOURCES;
            element.selectedResources = ALL_RESOURCES;
            element.start = START;
            element.events = EVENTS;

            const handler = jest.fn();
            element.addEventListener('eventcontextmenu', handler);

            return Promise.resolve()
                .then(() => {
                    // Wait for the visible interval to be set
                })
                .then(() => {
                    const event = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                    );
                    const detail = {
                        eventName: event.eventName,
                        key: event.occurrenceKey,
                        x: 32,
                        y: 12
                    };
                    event.dispatchEvent(
                        new CustomEvent('privatecontextmenu', {
                            detail
                        })
                    );
                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.detail).toEqual(detail);
                    expect(call.bubbles).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                });
        });

        // eventmouseenter
        it('Event mouse enter', () => {
            element.resources = RESOURCES;
            element.selectedResources = ALL_RESOURCES;
            element.start = START;
            element.events = EVENTS;

            const handler = jest.fn();
            element.addEventListener('eventmouseenter', handler);

            return Promise.resolve()
                .then(() => {
                    // Wait for the visible interval to be set
                })
                .then(() => {
                    const event = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                    );
                    const detail = {
                        eventName: event.eventName,
                        key: event.occurrenceKey,
                        x: 23,
                        y: 67
                    };
                    event.dispatchEvent(
                        new CustomEvent('privatemouseenter', {
                            detail
                        })
                    );
                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.detail).toEqual(detail);
                    expect(call.bubbles).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                });
        });

        it('Event mouse leave on event mouse leave and blur', () => {
            element.resources = RESOURCES;
            element.selectedResources = ALL_RESOURCES;
            element.start = START;
            element.events = EVENTS;

            const handler = jest.fn();
            element.addEventListener('eventmouseleave', handler);

            return Promise.resolve()
                .then(() => {
                    // Wait for the visible interval to be set
                })
                .then(() => {
                    const event = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                    );
                    const detail = {
                        eventName: 'some name',
                        key: 'some key',
                        x: 34,
                        y: 56
                    };
                    event.dispatchEvent(
                        new CustomEvent('privatemouseleave', { detail })
                    );

                    expect(handler).toHaveBeenCalledTimes(1);
                    const call = handler.mock.calls[0][0];
                    expect(call.detail).toEqual(detail);
                    expect(call.bubbles).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();
                });
        });

        // eventselect
        it('Event select', () => {
            element.resources = RESOURCES;
            element.selectedResources = ALL_RESOURCES;
            element.start = START;
            element.events = [RECURRING_EVENT];

            const handler = jest.fn();
            const mouseEnterHandler = jest.fn();
            element.addEventListener('eventselect', handler);
            element.addEventListener('eventmouseenter', mouseEnterHandler);

            return Promise.resolve()
                .then(() => {
                    // Wait for the visible interval to be set
                })
                .then(() => {
                    const event = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                    );
                    const from = DateTime.fromJSDate(RECURRING_EVENT.from);
                    const to = DateTime.fromJSDate(RECURRING_EVENT.to);
                    event.dispatchEvent(
                        new CustomEvent('privatefocus', {
                            detail: {
                                eventName: RECURRING_EVENT.name,
                                from,
                                to
                            }
                        })
                    );
                    expect(handler).toHaveBeenCalled();
                    expect(mouseEnterHandler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.detail.name).toBe(RECURRING_EVENT.name);
                    expect(call.detail.recurrenceDates.from).toBe(
                        from.toUTC().toISO()
                    );
                    expect(call.detail.recurrenceDates.to).toBe(
                        to.toUTC().toISO()
                    );
                    expect(call.bubbles).toBeTruthy();
                    expect(call.cancelable).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                });
        });

        // hidepopovers
        describe('Hide popovers', () => {
            it('Event double click', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.start = START;
                element.events = EVENTS;

                const handler = jest.fn();
                element.addEventListener('hidepopovers', handler);

                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const event = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        event.dispatchEvent(
                            new CustomEvent('privatedblclick', {
                                detail: {
                                    eventName: event.eventName,
                                    from: event.from,
                                    x: 3,
                                    y: 120,
                                    key: event.occurrenceKey
                                }
                            })
                        );

                        expect(handler).toHaveBeenCalledTimes(1);
                        const call = handler.mock.calls[0][0];
                        expect(call.detail.list).toBeUndefined();
                    });
            });

            it('Scroll', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.start = START;
                element.events = EVENTS;
                element.orientation = 'vertical';

                const handler = jest.fn();
                element.addEventListener('hidepopovers', handler);

                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const event = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        const verticalHeaders =
                            element.shadowRoot.querySelector(
                                '[data-element-id="div-vertical-header-wrapper"]'
                            );
                        const resourceHeaders =
                            element.shadowRoot.querySelector(
                                '[data-element-id="div-resource-header-cells"]'
                            );
                        const verticalHeadersSpy = jest.spyOn(
                            verticalHeaders,
                            'scrollTop',
                            'set'
                        );
                        const resourceHeadersSpy = jest.spyOn(
                            resourceHeaders,
                            'scrollLeft',
                            'set'
                        );
                        const rightPanel = element.shadowRoot.querySelector(
                            '[data-element-id="div-schedule-wrapper"]'
                        );
                        jest.spyOn(
                            event,
                            'getBoundingClientRect'
                        ).mockReturnValue({
                            right: -10
                        });
                        jest.spyOn(
                            rightPanel,
                            'scrollLeft',
                            'get'
                        ).mockReturnValue(38);
                        jest.spyOn(
                            rightPanel,
                            'scrollTop',
                            'get'
                        ).mockReturnValue(59);
                        element.selectEvent({
                            eventName: event.eventName,
                            from: event.from,
                            x: 12,
                            y: 40,
                            key: event.occurrenceKey
                        });
                        rightPanel.dispatchEvent(new CustomEvent('scroll'));

                        expect(handler).toHaveBeenCalledTimes(2);
                        const firstCall = handler.mock.calls[0][0].detail;
                        const secondCall = handler.mock.calls[1][0].detail;
                        expect(firstCall.list).toEqual(['detail']);
                        expect(secondCall.list).toEqual(['context']);

                        expect(verticalHeadersSpy).toHaveBeenCalledWith(59);
                        expect(resourceHeadersSpy).toHaveBeenCalledWith(38);
                    });
            });
        });

        // openeditdialog
        describe('Open edit dialog', () => {
            it('Event double click', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.start = START;
                element.events = EVENTS;

                const handler = jest.fn();
                element.addEventListener('openeditdialog', handler);

                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const event = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        event.dispatchEvent(
                            new CustomEvent('privatedblclick', {
                                detail: {
                                    eventName: event.eventName,
                                    from: event.from,
                                    x: 3,
                                    y: 120,
                                    key: event.occurrenceKey
                                }
                            })
                        );

                        expect(handler).toHaveBeenCalledTimes(1);
                        const call = handler.mock.calls[0][0];
                        expect(call.detail.selection.event.name).toBe(
                            event.eventName
                        );
                        expect(call.bubbles).toBeFalsy();
                        expect(call.composed).toBeFalsy();
                        expect(call.cancelable).toBeTruthy();
                    });
            });

            it('Empty spot double click', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.start = START;
                element.newEventTitle = 'some new event title';

                const handler = jest.fn();
                element.addEventListener('openeditdialog', handler);

                return Promise.resolve().then(() => {
                    const resource = element.shadowRoot.querySelector(
                        '[data-element-id="div-resource"]'
                    );
                    const cell = resource.querySelector(
                        '[data-element-id="div-cell"]'
                    );
                    jest.spyOn(
                        resource,
                        'getBoundingClientRect'
                    ).mockImplementation(() => {
                        return { left: 260, right: 476 };
                    });
                    jest.spyOn(
                        cell,
                        'getBoundingClientRect'
                    ).mockImplementation(() => {
                        return { top: 0, bottom: 50 };
                    });
                    const dblclick = new CustomEvent('dblclick');
                    dblclick.clientY = 45;
                    dblclick.clientX = 300;
                    cell.dispatchEvent(dblclick);

                    expect(handler).toHaveBeenCalledTimes(1);
                    const selection = handler.mock.calls[0][0].detail.selection;
                    expect(selection.event.name).toBe('new-event');
                    expect(selection.event.title).toBe('some new event title');
                    expect(selection.x).toBe(300);
                    expect(selection.y).toBe(45);
                });
            });

            it('Disabled event double click', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.start = START;
                element.events = EVENTS;

                const handler = jest.fn();
                element.addEventListener('openeditdialog', handler);

                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const event = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"][data-disabled="true"]'
                        );
                        const dblclick = new CustomEvent(
                            'privatedisableddblclick'
                        );
                        dblclick.clientY = 45;
                        dblclick.clientX = 130;
                        event.dispatchEvent(dblclick);

                        expect(handler).toHaveBeenCalledTimes(1);
                        const selection =
                            handler.mock.calls[0][0].detail.selection;
                        expect(selection.event.name).toBe('new-event');
                        expect(selection.x).toBe(130);
                        expect(selection.y).toBe(45);
                    });
            });

            it('Dragging of a new event', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.start = START;

                const handler = jest.fn();
                const hidePopoversHandler = jest.fn();
                element.addEventListener('hidepopovers', hidePopoversHandler);
                element.addEventListener('openeditdialog', handler);

                const body = element.shadowRoot.querySelector(
                    '[data-element-id="div-schedule-body"]'
                );
                jest.spyOn(body, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 0, right: 1000, top: 0, bottom: 1000 };
                    }
                );

                let from, to;
                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const event = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(event).toBeFalsy();

                        // mousedown
                        const resource = element.shadowRoot.querySelector(
                            '[data-element-id="div-resource"]'
                        );
                        const cell = resource.querySelector(
                            '[data-element-id="div-cell"]'
                        );
                        from = new Date(Number(cell.dataset.start));
                        to = new Date(Number(cell.dataset.end) + 1);
                        jest.spyOn(
                            resource,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { top: 0, bottom: 50 };
                        });
                        jest.spyOn(
                            cell,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { left: 100, right: 150 };
                        });
                        const mousedown = new CustomEvent('mousedown');
                        mousedown.clientX = 112;
                        mousedown.clientY = 34;
                        cell.dispatchEvent(mousedown);
                        expect(hidePopoversHandler).toHaveBeenCalledTimes(1);
                        expect(
                            hidePopoversHandler.mock.calls[0][0].detail.list
                        ).toBeUndefined();

                        // First mousemove, the event will be created and appear on the calendar
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-schedule-wrapper"]'
                        );
                        wrapper.dispatchEvent(new CustomEvent('mousemove'));
                    })
                    .then(() => {
                        const event = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(event).toBeTruthy();
                        expect(event.eventName).toBe('new-event');
                        expect(event.style.height).toBeFalsy();

                        // Second mousemove, the event is resized
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-schedule-wrapper"]'
                        );
                        const mousemove = new CustomEvent('mousemove');
                        mousemove.clientX = 115;
                        mousemove.clientY = 35;
                        wrapper.dispatchEvent(mousemove);
                        expect(event.style.width).toBe('3px');

                        // mouseup
                        const mouseup = new CustomEvent('mouseup', {
                            bubbles: true
                        });
                        mouseup.clientX = 118;
                        mouseup.clientY = 35;
                        wrapper.dispatchEvent(mouseup);

                        expect(handler).toHaveBeenCalled();
                        const selection =
                            handler.mock.calls[0][0].detail.selection;
                        expect(selection.event.from.ts).toBe(from.getTime());
                        expect(selection.event.to.ts).toBe(to.getTime());
                    });
            });

            it('New past event drag is ignored if preventPastEventCreation is true', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.start = START;
                element.preventPastEventCreation = true;

                const handler = jest.fn();
                const hidePopoversHandler = jest.fn();
                element.addEventListener('hidepopovers', hidePopoversHandler);
                element.addEventListener('openeditdialog', handler);

                const body = element.shadowRoot.querySelector(
                    '[data-element-id="div-schedule-body"]'
                );
                jest.spyOn(body, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 0, right: 1000, top: 0, bottom: 1000 };
                    }
                );

                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const event = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(event).toBeFalsy();

                        // mousedown
                        const resource = element.shadowRoot.querySelector(
                            '[data-element-id="div-resource"]'
                        );
                        const cell = resource.querySelector(
                            '[data-element-id="div-cell"]'
                        );
                        jest.spyOn(
                            resource,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { top: 0, bottom: 50 };
                        });
                        jest.spyOn(
                            cell,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { left: 100, right: 150 };
                        });
                        const mousedown = new CustomEvent('mousedown');
                        mousedown.clientX = 112;
                        mousedown.clientY = 34;
                        cell.dispatchEvent(mousedown);
                        expect(hidePopoversHandler).not.toHaveBeenCalled();

                        // First mousemove, the event should not be created
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-schedule-wrapper"]'
                        );
                        wrapper.dispatchEvent(new CustomEvent('mousemove'));
                    })
                    .then(() => {
                        const event = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(event).toBeFalsy();

                        // mouseup
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-schedule-wrapper"]'
                        );
                        const mouseup = new CustomEvent('mouseup', {
                            bubbles: true
                        });
                        mouseup.clientX = 118;
                        mouseup.clientY = 35;
                        wrapper.dispatchEvent(mouseup);

                        expect(handler).not.toHaveBeenCalled();
                    });
            });

            it('Ignored if add action is hidden', () => {
                element.resources = RESOURCES;
                element.selectedResources = ALL_RESOURCES;
                element.start = START;
                element.hiddenActions = ['Standard.Scheduler.AddEvent'];

                const handler = jest.fn();
                const hidePopoversHandler = jest.fn();
                element.addEventListener('hidepopovers', hidePopoversHandler);
                element.addEventListener('openeditdialog', handler);

                const body = element.shadowRoot.querySelector(
                    '[data-element-id="div-schedule-body"]'
                );
                jest.spyOn(body, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 0, right: 1000, top: 0, bottom: 1000 };
                    }
                );

                return Promise.resolve()
                    .then(() => {
                        // Wait for the visible interval to be set
                    })
                    .then(() => {
                        const resource = element.shadowRoot.querySelector(
                            '[data-element-id="div-resource"]'
                        );
                        const cell = resource.querySelector(
                            '[data-element-id="div-cell"]'
                        );
                        jest.spyOn(
                            resource,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { top: 0, bottom: 50 };
                        });
                        jest.spyOn(
                            cell,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { left: 100, right: 150 };
                        });
                        const mousedown = new CustomEvent('mousedown');
                        mousedown.clientX = 112;
                        mousedown.clientY = 34;
                        cell.dispatchEvent(mousedown);
                        expect(hidePopoversHandler).not.toHaveBeenCalled();

                        // mousemove should also be ignored
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-schedule-wrapper"]'
                        );
                        wrapper.dispatchEvent(new CustomEvent('mousemove'));
                    })
                    .then(() => {
                        const event = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                        );
                        expect(event).toBeFalsy();

                        // mouseup should also be ignored
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-schedule-wrapper"]'
                        );
                        const mouseup = new CustomEvent('mouseup', {
                            bubbles: true
                        });
                        mouseup.clientX = 118;
                        mouseup.clientY = 35;
                        wrapper.dispatchEvent(mouseup);
                        expect(handler).not.toHaveBeenCalled();
                    });
            });
        });

        // scheduleclick
        it('Schedule click', () => {
            element.resources = RESOURCES;
            element.selectedResources = ALL_RESOURCES;
            element.start = START;

            const handler = jest.fn();
            element.addEventListener('scheduleclick', handler);

            const body = element.shadowRoot.querySelector(
                '[data-element-id="div-schedule-body"]'
            );
            jest.spyOn(body, 'getBoundingClientRect').mockImplementation(() => {
                return { left: 0, right: 1000, top: 0, bottom: 1000 };
            });

            return Promise.resolve()
                .then(() => {
                    // Wait for the visible interval to be set
                })
                .then(() => {
                    const cell = element.shadowRoot.querySelector(
                        '[data-element-id="div-cell"]'
                    );
                    const { start, end } = cell.dataset;
                    cell.dispatchEvent(
                        new CustomEvent('click', { bubbles: true })
                    );

                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(new Date(call.detail.from).getTime()).toBe(
                        Number(start)
                    );
                    expect(new Date(call.detail.to).getTime()).toBe(
                        Number(end)
                    );
                    expect(call.bubbles).toBeTruthy();
                    expect(call.cancelable).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                });
        });
    });
});
