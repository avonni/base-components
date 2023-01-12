/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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

    it('Default attributes', () => {
        expect(element.availableDaysOfTheWeek).toEqual([0, 1, 2, 3, 4, 5, 6]);
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
        expect(element.readOnly).toBeFalsy();
        expect(element.recurrentEditModes).toEqual(['all', 'one']);
        expect(element.resizeColumnDisabled).toBeFalsy();
        expect(element.resources).toEqual([]);

        const today = new Date();
        expect(element.start.hour).toBe(today.getHours());
        expect(element.start.day).toBe(today.getDate());
        expect(element.start.month - 1).toBe(today.getMonth());
        expect(element.start.year).toBe(today.getFullYear());

        expect(element.selectedResources).toEqual([]);
        expect(element.timeSpan).toEqual({ unit: 'day', span: 1 });
        expect(element.orientation).toBe('horizontal');
        expect(element.zoomToFit).toBeFalsy();
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    // available-days-of-the-week
    it('Primitive Scheduler Timeline: availableDaysOfTheWeek', () => {
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

    it('Primitive Scheduler Timeline: availableDaysOfTheWeek, vertical orientation', () => {
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

    // available-months
    it('Primitive Scheduler Timeline: availableMonths', () => {
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

    it('Primitive Scheduler Timeline: availableMonths, vertical orientation', () => {
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

    // available-time-frames
    it('Primitive Scheduler Timeline: availableTimeFrames', () => {
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

    it('Primitive Scheduler Timeline: availableTimeFrames, vertical orientation', () => {
        element.availableTimeFrames = ['07:10-18:00'];
        element.orientation = 'vertical';
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;

        return Promise.resolve().then(() => {
            const headers = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group"]'
            );
            expect(headers.availableTimeFrames).toEqual(['07:10-18:00']);
        });
    });

    // available-time-spans
    it('Primitive Scheduler Timeline: availableTimeSpans', () => {
        element.availableTimeSpans = [
            { unit: 'day', span: 2, label: 'Few Days', headers: 'hourAndDay' },
            { unit: 'week', span: 2, label: 'Sprint', headers: 'dayAndMonth' }
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

    it('Primitive Scheduler Timeline: availableTimeSpans, vertical orientation', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.orientation = 'vertical';
        element.availableTimeSpans = [
            { unit: 'day', span: 2, label: 'Few Days', headers: 'hourAndDay' },
            { unit: 'week', span: 2, label: 'Sprint', headers: 'dayAndMonth' }
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

    // collapse-disabled
    it('Primitive Scheduler Timeline: collapseDisabled = false', () => {
        element.collapseDisabled = false;

        return Promise.resolve().then(() => {
            const leftPanel = element.shadowRoot.querySelector(
                '[data-element-id="avonni-splitter-pane-left"]'
            );
            const rightPanel = element.shadowRoot.querySelector(
                '[data-element-id="avonni-splitter-pane-right"]'
            );
            expect(leftPanel.collapsible).toBeTruthy();
            expect(rightPanel.collapsible).toBeTruthy();
        });
    });

    it('Primitive Scheduler Timeline: collapseDisabled = true', () => {
        element.collapseDisabled = true;

        return Promise.resolve().then(() => {
            const leftPanel = element.shadowRoot.querySelector(
                '[data-element-id="avonni-splitter-pane-left"]'
            );
            const rightPanel = element.shadowRoot.querySelector(
                '[data-element-id="avonni-splitter-pane-right"]'
            );
            expect(leftPanel.collapsible).toBeFalsy();
            expect(rightPanel.collapsible).toBeFalsy();
        });
    });

    // columns
    it('Primitive Scheduler Timeline: columns', () => {
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
    it('Primitive Scheduler Timeline: dateFormat', () => {
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
    it('Primitive Scheduler Timeline: events', () => {
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
                        ? from.endOf('day').ts
                        : original.to.getTime();
                    expect(event.color).toBe(original.color);
                    expect(event.disabled).toBe(original.disabled || false);
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
                    expect(event.theme).toBe(original.theme || 'default');
                    expect(event.to.ts).toBe(to);
                });
            });
    });

    it('Primitive Scheduler Timeline: events, cellHeight and cellWidth are set by the headers', () => {
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

    it('Primitive Scheduler Timeline: event starts before or after visible time span', () => {
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
                expect(events[0].to.ts).toBe(originalEvents[0].to.getTime());
                expect(events[1].from.ts).toBe(
                    originalEvents[1].from.getTime()
                );
                expect(events[1].to.ts).toBe(endOfDay);
                expect(events[2].from.ts).toBe(startOfDay);
                expect(events[2].to.ts).toBe(endOfDay);
            });
    });

    it('Primitive Scheduler Timeline: all day event', () => {
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

    it('Primitive Scheduler Timeline: multi-resources event', () => {
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

    it('Primitive Scheduler Timeline: recurring event', () => {
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

    // events-labels
    it('Primitive Scheduler Timeline: eventsLabels', () => {
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
    it('Primitive Scheduler Timeline: eventsTheme', () => {
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

    // read-only
    it('Primitive Scheduler Timeline: readOnly', () => {
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
    it('Primitive Scheduler Timeline: resizeColumnDisabled = false', () => {
        element.resizeColumnDisabled = false;

        return Promise.resolve().then(() => {
            const leftPanel = element.shadowRoot.querySelector(
                '[data-element-id="avonni-splitter-pane-left"]'
            );
            const rightPanel = element.shadowRoot.querySelector(
                '[data-element-id="avonni-splitter-pane-right"]'
            );
            expect(leftPanel.resizable).toBeTruthy();
            expect(rightPanel.resizable).toBeTruthy();
        });
    });

    it('Primitive Scheduler Timeline: resizeColumnDisabled = true', () => {
        element.resizeColumnDisabled = true;

        return Promise.resolve().then(() => {
            const leftPanel = element.shadowRoot.querySelector(
                '[data-element-id="avonni-splitter-pane-left"]'
            );
            const rightPanel = element.shadowRoot.querySelector(
                '[data-element-id="avonni-splitter-pane-right"]'
            );
            expect(leftPanel.resizable).toBeFalsy();
            expect(rightPanel.resizable).toBeFalsy();
        });
    });

    // resources
    it('Primitive Scheduler Timeline: resources', () => {
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

    it('Primitive Scheduler Timeline: resources with vertical orientation', () => {
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

            const firstResourceAvatar = resourceHeaders[0].querySelector(
                '[data-element-id="avonni-primitive-avatar"]'
            );
            expect(firstResourceAvatar).toBeTruthy();
            expect(firstResourceAvatar.fallbackIconName).toBe(
                RESOURCES[0].avatarFallbackIconName
            );
            expect(firstResourceAvatar.initials).toBe(
                RESOURCES[0].avatarInitials
            );
            expect(firstResourceAvatar.src).toBe(RESOURCES[0].avatarSrc);
            [1, 2].forEach((index) => {
                const avatar = resourceHeaders[index].querySelector(
                    '[data-element-id="avonni-primitive-avatar"]'
                );
                expect(avatar).toBeFalsy();
            });
        });
    });

    // start
    it('Primitive Scheduler Timeline: start', () => {
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
    it('Primitive Scheduler Timeline: selectedResources', () => {
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

    it('Primitive Scheduler Timeline: selectedResources with vertical orientation', () => {
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

    // time-span
    it('Primitive Scheduler Timeline: timeSpan', () => {
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
                expect(cellStart).toBe(new Date(2022, 8, 18, 12, 40).getTime());

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

    it('Primitive Scheduler Timeline: timeSpan, customHeaders', () => {
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

    it('Primitive Scheduler Timeline: timeSpan, vertical orientation', () => {
        element.start = START;
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        const timeSpan = { unit: 'month', span: 2, headers: 'hourDayAndWeek' };
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

    // orientation
    it('Primitive Scheduler Timeline: orientation = horizontal', () => {
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
                const scheduleWrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-schedule-wrapper"]'
                );
                const horizontalHeaders = scheduleWrapper.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group"]'
                );
                const verticalHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="div-vertical-header-wrapper"]'
                );
                const resourceHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="div-vertical-resource-headers"]'
                );
                const resourceRow = element.shadowRoot.querySelector(
                    '[data-element-id="div-resource"]'
                );
                const leftPanel = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-splitter-pane-left"]'
                );
                const firstCol = element.shadowRoot.querySelector(
                    '[data-element-id="div-first-column"]'
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
                expect(leftPanel.size).toBe('300px');
                expect(firstCol.className).toBe(
                    'avonni-scheduler__first-col slds-grid'
                );
                expect(scheduleWrapper.className).toBe(
                    'slds-grid slds-is-relative avonni-scheduler__wrapper'
                );
                expect(scheduleBody.className).toBe('slds-is-relative');
                expect(cell.classList).toContain('avonni-scheduler__flex-col');
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

    it('Primitive Scheduler Timeline: orientation = vertical', () => {
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
                const scheduleWrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-schedule-wrapper"]'
                );
                const horizontalHeaders = scheduleWrapper.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group"]'
                );
                const verticalHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="div-vertical-header-wrapper"]'
                );
                const resourceHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="div-vertical-resource-headers"]'
                );
                const resourceRow = element.shadowRoot.querySelector(
                    '[data-element-id="div-resource"]'
                );
                const leftPanel = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-splitter-pane-left"]'
                );
                const firstCol = element.shadowRoot.querySelector(
                    '[data-element-id="div-first-column"]'
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
                expect(leftPanel.size).toBe('110px');
                expect(firstCol.className).toBe(
                    'avonni-scheduler__first-col slds-grid avonni-scheduler__first-col_vertical avonni-scheduler__grid_align-end'
                );
                expect(scheduleWrapper.className).toBe(
                    'slds-grid slds-is-relative avonni-scheduler__wrapper avonni-scheduler__wrapper_vertical'
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

    it('Primitive Scheduler Timeline: zoomToFit = false', () => {
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
                expect(nestedCol.className).toBe('avonni-scheduler__flex-col');

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

    it('Primitive Scheduler Timeline: zoomToFit = true', () => {
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

    /*
     * ------------------------------------------------------------
     *  METHODS
     * -------------------------------------------------------------
     */

    // createEvent
    it('Primitive Scheduler Timeline: createEvent() method', () => {
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
    it('Primitive Scheduler Timeline: deleteEvent() method', () => {
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

    // newEvent and saveSelection
    it('Primitive Scheduler Timeline: newEvent() and saveSelection() methods', () => {
        element.start = START;
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;

        let from, to;
        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const resourceRows = element.shadowRoot.querySelectorAll(
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
                jest.spyOn(cell, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 0, right: 130 };
                    }
                );
                element.newEvent({ x: 102, y: 150 });
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

    it('Primitive Scheduler Timeline: newEvent() and saveSelection() methods, with no given position', () => {
        element.start = START;
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                element.newEvent();
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

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    // emptyspotcontextmenu
    it('Primitive Scheduler Timeline: emptyspotcontextmenu', () => {
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
            cell.dispatchEvent(contextMenuEvent);
            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.selection.y).toBe(100);
            expect(call.detail.selection.x).toBe(120);
            expect(call.bubbles).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
            expect(call.composed).toBeFalsy();
        });
    });

    it('Primitive Scheduler Timeline: emptyspotcontextmenu dispatched by a disabled event', () => {
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
                event.dispatchEvent(contextMenuEvent);
                expect(handler).toHaveBeenCalled();
                const detail = handler.mock.calls[0][0].detail;
                expect(detail.selection.y).toBe(12);
                expect(detail.selection.x).toBe(5);
            });
    });

    // eventchange
    it('Primitive Scheduler Timeline: eventchange event when resizing the end of an event', () => {
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
        jest.spyOn(body, 'getBoundingClientRect').mockImplementation(() => {
            return { left: 0, right: 1000, top: 0, bottom: 1000 };
        });

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
                jest.spyOn(event, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { right: 31, width: 10 };
                    }
                );
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
                const mouseup = new CustomEvent('mouseup', { bubbles: true });
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

    it('Primitive Scheduler Timeline: eventchange event when resizing the start of an event', () => {
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
        jest.spyOn(body, 'getBoundingClientRect').mockImplementation(() => {
            return { left: 0, right: 1000, top: 0, bottom: 1000 };
        });

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
                jest.spyOn(event, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 31, width: 10 };
                    }
                );
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
                const mouseup = new CustomEvent('mouseup', { bubbles: true });
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

    it('Primitive Scheduler Timeline: eventchange event when drag and dropping', () => {
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
        jest.spyOn(body, 'getBoundingClientRect').mockImplementation(() => {
            return { left: 0, right: 1000, top: 0, bottom: 1000 };
        });

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
                jest.spyOn(event, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 2, width: 60 };
                    }
                );
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
                const mouseup = new CustomEvent('mouseup', { bubbles: true });
                mouseup.clientX = 38;
                mouseup.clientY = 150;
                wrapper.dispatchEvent(mouseup);

                expect(handler).toHaveBeenCalled();
                const from = new Date(Number(resourceTwoCell.dataset.start));
                const call = handler.mock.calls[0][0];
                expect(call.detail.name).toBe(event.eventName);
                expect(call.detail.draftValues).toMatchObject({
                    from: from.toISOString(),
                    resourceNames: ['resource-2']
                });
            });
    });

    it('Primitive Scheduler Timeline: eventchange event when drag and dropping a recurrent event', () => {
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
        jest.spyOn(body, 'getBoundingClientRect').mockImplementation(() => {
            return { left: 0, right: 1000, top: 0, bottom: 1000 };
        });

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
                jest.spyOn(event, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 80, width: 150 };
                    }
                );
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
                const mouseup = new CustomEvent('mouseup', { bubbles: true });
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

    // eventcontextmenu
    it('Primitive Scheduler Timeline: eventcontextmenu event', () => {
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
    it('Primitive Scheduler Timeline: eventmouseenter event', () => {
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

    // eventselect
    it('Primitive Scheduler Timeline: eventselect', () => {
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
                expect(call.detail.recurrenceDates.to).toBe(to.toUTC().toISO());
                expect(call.bubbles).toBeTruthy();
                expect(call.cancelable).toBeFalsy();
                expect(call.composed).toBeFalsy();
            });
    });

    // hidepopovers
    it('Primitive Scheduler Timeline: hidepopovers on event mouse leave and blur', () => {
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
                event.dispatchEvent(new CustomEvent('privatemouseleave'));

                expect(handler).toHaveBeenCalledTimes(1);
                const call = handler.mock.calls[0][0];
                expect(call.detail.list).toEqual(['detail']);
                expect(call.bubbles).toBeFalsy();
                expect(call.composed).toBeFalsy();
                expect(call.cancelable).toBeFalsy();

                event.dispatchEvent(new CustomEvent('privateblur'));
                expect(handler).toHaveBeenCalledTimes(2);
                expect(handler.mock.calls[1][0].detail.list).toEqual([
                    'detail'
                ]);
            });
    });

    it('Primitive Scheduler Timeline: hidepopovers on event double click', () => {
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

    it('Primitive Scheduler Timeline: hidepopovers on scroll', () => {
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
                const verticalHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="div-vertical-header-wrapper"]'
                );
                const resourceHeaders = element.shadowRoot.querySelector(
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
                    '[data-element-id="avonni-splitter-pane-right"]'
                );
                jest.spyOn(event, 'getBoundingClientRect').mockReturnValue({
                    right: -10
                });
                jest.spyOn(rightPanel, 'scrollLeft', 'get').mockReturnValue(38);
                jest.spyOn(rightPanel, 'scrollTop', 'get').mockReturnValue(59);
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

    // openeditdialog
    it('Primitive Scheduler Timeline: openeditdialog on event double click', () => {
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
                expect(call.detail.selection.event.name).toBe(event.eventName);
                expect(call.bubbles).toBeFalsy();
                expect(call.composed).toBeFalsy();
                expect(call.cancelable).toBeFalsy();
            });
    });

    it('Primitive Scheduler Timeline: openeditdialog on empty spot double click', () => {
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
            const cell = resource.querySelector('[data-element-id="div-cell"]');
            jest.spyOn(resource, 'getBoundingClientRect').mockImplementation(
                () => {
                    return { left: 260, right: 476 };
                }
            );
            jest.spyOn(cell, 'getBoundingClientRect').mockImplementation(() => {
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

    it('Primitive Scheduler Timeline: openeditdialog on disabled event double click', () => {
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
                const dblclick = new CustomEvent('privatedisableddblclick');
                dblclick.clientY = 45;
                dblclick.clientX = 130;
                event.dispatchEvent(dblclick);

                expect(handler).toHaveBeenCalledTimes(1);
                const selection = handler.mock.calls[0][0].detail.selection;
                expect(selection.event.name).toBe('new-event');
                expect(selection.x).toBe(130);
                expect(selection.y).toBe(45);
            });
    });

    it('Primitive Scheduler Timeline: openeditdialog on dragging of a new event', () => {
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
        jest.spyOn(body, 'getBoundingClientRect').mockImplementation(() => {
            return { left: 0, right: 1000, top: 0, bottom: 1000 };
        });

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
                jest.spyOn(cell, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 100, right: 150 };
                    }
                );
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
                const mouseup = new CustomEvent('mouseup', { bubbles: true });
                mouseup.clientX = 118;
                mouseup.clientY = 35;
                wrapper.dispatchEvent(mouseup);

                expect(handler).toHaveBeenCalled();
                const selection = handler.mock.calls[0][0].detail.selection;
                expect(selection.event.from.ts).toBe(from.getTime());
                expect(selection.event.to.ts).toBe(to.getTime());
            });
    });
});
