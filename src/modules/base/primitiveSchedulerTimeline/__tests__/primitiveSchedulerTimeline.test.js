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
                expect(cell.classList).toContain('slds-col');
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
                    'slds-grid slds-is-relative slds-grid_vertical slds-col'
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
                expect(cell.classList).not.toContain('slds-col');
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
                    'slds-col slds-grid avonni-scheduler__schedule-col slds-theme_default'
                );
                expect(nestedCol.className).toBe('slds-col');

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
                    'slds-col slds-grid avonni-scheduler__schedule-col slds-theme_default avonni-scheduler__schedule-col_zoom-to-fit'
                );
                expect(nestedCol.className).toBe(
                    'slds-col avonni-scheduler__schedule-col_zoom-to-fit'
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
