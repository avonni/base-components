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
import PrimitiveSchedulerCalendar from '../primitiveSchedulerCalendar';

/*
--------------------------------------------------------------
  The primitive headers set the visible interval, unless
  the time span is year.
  
  As a consequence:
  - A lot of the tests need to wait for a second rerender.
  - The mock component of the primitive headers dispatches
  the privateheaderchange event.
--------------------------------------------------------------
*/

// Not tested:
// - The visible width passed to the day headers because it depends on DOM measurements
// - The header cells passed to the evens, because it depends on the primitive header
//   privateheaderchange event.

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
const SELECTED_DATE = new Date(2022, 8, 19);

let element;
describe('Primitive Scheduler Calendar', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-primitive-scheduler-calendar', {
            is: PrimitiveSchedulerCalendar
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
        expect(element.dateFormat).toBe('ff');
        expect(element.events).toEqual([]);
        expect(element.eventsLabels).toEqual({
            center: { fieldName: 'title' }
        });
        expect(element.eventsTheme).toBe('default');
        expect(element.loadingStateAlternativeText).toBeUndefined();
        expect(element.newEventTitle).toBe('New event');
        expect(element.readOnly).toBeFalsy();
        expect(element.resizeColumnDisabled).toBeFalsy();
        expect(element.resources).toEqual([]);

        const today = new Date();
        expect(element.selectedDate.hour).toBe(today.getHours());
        expect(element.selectedDate.day).toBe(today.getDate());
        expect(element.selectedDate.month - 1).toBe(today.getMonth());
        expect(element.selectedDate.year).toBe(today.getFullYear());

        expect(element.selectedResources).toEqual([]);
        expect(element.timeSpan).toEqual({ unit: 'day', span: 1 });
        expect(element.zoomToFit).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */

    // available-days-of-the-week
    it('Primitive Scheduler Calendar: availableDaysOfTheWeek', () => {
        element.availableDaysOfTheWeek = [2, 4];
        element.selectedDate = SELECTED_DATE;
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.events = EVENTS;

        return Promise.resolve()
            .then(() => {
                const dayHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group-horizontal"]'
                );
                const hourHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group-vertical"]'
                );
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-calendar-left-panel"]'
                );
                const start = new Date(2022, 8, 20).getTime();
                expect(dayHeaders.start.ts).toEqual(start);
                expect(dayHeaders.availableDaysOfTheWeek).toEqual([2, 4]);
                expect(hourHeaders.start.ts).toEqual(start);
                expect(hourHeaders.availableDaysOfTheWeek).toBeUndefined();
                expect(calendar.disabledDates).toEqual([
                    'Sun',
                    'Mon',
                    'Wed',
                    'Fri',
                    'Sat'
                ]);
                expect(calendar.value.ts).toBe(start);
                // Wait for the visible interval to be set
            })
            .then(() => {
                const multiDayEvents = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                expect(multiDayEvents).toHaveLength(1);
                expect(multiDayEvents[0].eventName).toBe('disabled-event');

                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(events).toHaveLength(2);
                events.forEach((ev) => {
                    expect(ev.eventName).toBe('event-1');
                });
            });
    });

    it('Primitive Scheduler Calendar: availableDaysOfTheWeek, week time span', () => {
        element.availableDaysOfTheWeek = [1, 2, 6];
        element.selectedDate = SELECTED_DATE;
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.events = EVENTS;
        element.timeSpan = { unit: 'week', span: 1 };

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const multiDayEvents = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                expect(multiDayEvents).toHaveLength(2);
                expect(multiDayEvents[0].eventName).toBe('event-2');
                expect(multiDayEvents[1].eventName).toBe('disabled-event');

                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(events).toHaveLength(2);
                events.forEach((ev) => {
                    expect(ev.eventName).toBe('event-1');
                });
            });
    });

    it('Primitive Scheduler Calendar: availableDaysOfTheWeek, month time span', () => {
        element.availableDaysOfTheWeek = [6, 0, 2];
        element.selectedDate = SELECTED_DATE;
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.events = EVENTS;
        element.timeSpan = { unit: 'month', span: 1 };

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(events).toHaveLength(4);
                events.forEach((ev) => {
                    expect(
                        ['Event 1', 'Disabled event', 'Long event'].includes(
                            ev.title
                        )
                    ).toBeTruthy();
                });
            });
    });

    it('Primitive Scheduler Calendar: availableDaysOfTheWeek, year time span', () => {
        element.availableDaysOfTheWeek = [5];
        element.selectedDate = SELECTED_DATE;
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.events = EVENTS;
        element.timeSpan = { unit: 'year', span: 1 };

        return Promise.resolve().then(() => {
            const calendars = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-calendar-year-month"]'
            );
            calendars.forEach((calendar) => {
                expect(calendar.disabledDates).toEqual([
                    'Sun',
                    'Mon',
                    'Tue',
                    'Wed',
                    'Thu',
                    'Sat'
                ]);
            });
            expect(calendars[0].markedDates).toHaveLength(2);
            expect(calendars[1].markedDates).toHaveLength(1);
            expect(calendars[8].markedDates).toHaveLength(3);
        });
    });

    // available-months
    it('Primitive Scheduler Calendar: availableMonths', () => {
        element.availableMonths = [9];
        element.selectedDate = SELECTED_DATE;
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.events = EVENTS;

        return Promise.resolve()
            .then(() => {
                const dayHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group-horizontal"]'
                );
                const hourHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group-vertical"]'
                );
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-calendar-left-panel"]'
                );
                const start = new Date(2022, 9, 1).getTime();
                expect(dayHeaders.start.ts).toBe(start);
                expect(hourHeaders.start.ts).toBe(start);
                expect(dayHeaders.availableMonths).toBeUndefined();
                expect(hourHeaders.availableMonths).toBeUndefined();
                expect(calendar.disabledDates).toEqual([]);
                expect(calendar.value.ts).toBe(start);
                // Wait for the visible interval to be set
            })
            .then(() => {
                const multiDayEvents = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                expect(multiDayEvents).toHaveLength(0);

                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(events).toHaveLength(0);
            });
    });

    it('Primitive Scheduler Calendar: availableMonths is taken into account when navigating in the left panel calendar', () => {
        element.availableMonths = [9];
        element.selectedDate = SELECTED_DATE;
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.events = EVENTS;

        return Promise.resolve()
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-calendar-left-panel"]'
                );
                calendar.dispatchEvent(
                    new CustomEvent('navigate', {
                        detail: {
                            date: new Date(2022, 10, 1)
                        }
                    })
                );
            })
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-calendar-left-panel"]'
                );
                const disabledDates = [];
                for (let i = 1; i <= 31; i++) {
                    disabledDates.push(i);
                }
                expect(calendar.disabledDates).toEqual(disabledDates);
            });
    });

    it('Primitive Scheduler Calendar: availableMonths, week time span', () => {
        element.availableMonths = [8, 9, 3];
        element.selectedDate = new Date(2022, 4, 6);
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.events = EVENTS;
        element.timeSpan = { unit: 'day', span: 7 };

        return Promise.resolve()
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-calendar-left-panel"]'
                );
                expect(calendar.value.ts).toBe(new Date(2022, 8, 1).getTime());
                // Wait for the visible interval to be set
            })
            .then(() => {
                const multiDayEvents = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                expect(multiDayEvents).toHaveLength(1);
                expect(multiDayEvents[0].eventName).toBe('long-event');

                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(events).toHaveLength(0);
            });
    });

    it('Primitive Scheduler Calendar: availableMonths, month time span', () => {
        element.availableMonths = [8, 0, 3];
        element.selectedDate = new Date(2021, 10, 14);
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.events = EVENTS;
        element.timeSpan = { unit: 'month', span: 1 };

        const openDialogHandler = jest.fn();
        const contextMenuDialog = jest.fn();
        element.addEventListener('openeditdialog', openDialogHandler);
        element.addEventListener('emptyspotcontextmenu', contextMenuDialog);

        return Promise.resolve()
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-calendar-left-panel"]'
                );
                expect(calendar.value.ts).toBe(new Date(2022, 0, 1).getTime());
                // Wait for the visible interval to be set
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(events).toHaveLength(1);

                // First visible cell belongs to december, a disabled month
                const disabledCell = element.shadowRoot.querySelector(
                    '[data-element-id="div-cell"]'
                );
                disabledCell.dispatchEvent(new CustomEvent('dblclick'));
                disabledCell.dispatchEvent(new CustomEvent('contextmenu'));
                expect(openDialogHandler).not.toHaveBeenCalled();
                expect(contextMenuDialog).not.toHaveBeenCalled();
            });
    });

    it('Primitive Scheduler Calendar: availableMonths, year time span', () => {
        element.availableMonths = [0, 5, 8];
        element.selectedDate = SELECTED_DATE;
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.events = [EVENTS[0], EVENTS[1], EVENTS[5]];
        element.timeSpan = { unit: 'year', span: 1 };

        return Promise.resolve().then(() => {
            const calendars = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-calendar-year-month"]'
            );
            expect(calendars).toHaveLength(3);
            calendars.forEach((calendar) => {
                expect(calendar.disabledDates).toEqual([]);
            });
            expect(calendars[0].markedDates).toHaveLength(12);
            expect(calendars[1].markedDates).toHaveLength(0);
            expect(calendars[2].markedDates).toHaveLength(3);
        });
    });

    // available-time-frames
    it('Primitive Scheduler Calendar: availableTimeFrames', () => {
        element.events = [
            {
                name: 'visible-event',
                from: new Date(2022, 8, 19, 6, 12),
                to: new Date(2022, 8, 19, 7, 30),
                resourceNames: ['resource-1']
            },
            {
                name: 'partly-visible-event',
                from: new Date(2022, 8, 19, 12, 30),
                to: new Date(2022, 8, 19, 21),
                resourceNames: ['resource-1']
            },
            {
                name: 'all-day-event',
                from: new Date(2022, 8, 19),
                allDay: true,
                resourceNames: ['resource-1']
            },
            {
                name: 'hidden-event',
                from: new Date(2022, 8, 19, 12, 45),
                to: new Date(2022, 8, 19, 13),
                resourceNames: ['resource-1']
            }
        ];
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.availableTimeFrames = ['05:30-08:00', '20:07-23:00'];

        return Promise.resolve()
            .then(() => {
                const hourHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group-vertical"]'
                );
                expect(hourHeaders.availableTimeFrames).toEqual([
                    '05:30-08:00',
                    '20:07-23:00'
                ]);
                // Wait for the visible interval to be set
            })
            .then(() => {
                const multiDayEvents = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(events).toHaveLength(2);
                expect(multiDayEvents).toHaveLength(1);
            });
    });

    it('Primitive Scheduler Calendar: availableTimeFrames, several weeks time span', () => {
        element.events = [
            {
                name: 'visible-event',
                from: new Date(2022, 8, 19, 6, 12),
                to: new Date(2022, 8, 19, 7, 30),
                resourceNames: ['resource-1']
            },
            {
                name: 'partly-visible-event',
                from: new Date(2022, 8, 19, 12, 30),
                to: new Date(2022, 8, 19, 21),
                resourceNames: ['resource-1']
            },
            {
                name: 'all-day-event',
                from: new Date(2022, 8, 19),
                allDay: true,
                resourceNames: ['resource-1']
            },
            {
                name: 'hidden-event',
                from: new Date(2022, 8, 19, 12, 45),
                to: new Date(2022, 8, 19, 13),
                resourceNames: ['resource-1']
            }
        ];
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.availableTimeFrames = ['05:30-08:00', '20:07-23:00'];
        element.timeSpan = { unit: 'week', span: '2' };

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(events).toHaveLength(3);
            });
    });

    // collapse-disabled
    it('Primitive Scheduler Calendar: collapseDisabled = false', () => {
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

    it('Primitive Scheduler Calendar: collapseDisabled = true', () => {
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

    // date-format
    it('Primitive Scheduler Calendar: dateFormat', () => {
        element.events = EVENTS;
        element.selectedResources = ALL_RESOURCES;
        element.resources = RESOURCES;
        element.selectedDate = new Date(2022, 8, 20);
        element.dateFormat = 'dd/LL';

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const multiDayEvents = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                multiDayEvents.forEach((ev) => {
                    expect(ev.dateFormat).toBe('dd/LL');
                });
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                events.forEach((ev) => {
                    expect(ev.dateFormat).toBe('dd/LL');
                });
            });
    });

    it('Primitive Scheduler Calendar: dateFormat, applied to month placeholders', () => {
        element.events = EVENTS;
        element.selectedResources = ALL_RESOURCES;
        element.resources = RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.dateFormat = 'dd/LL';
        element.timeSpan = { unit: 'month', span: 1 };

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const placeholders = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-placeholder"]'
                );
                placeholders.forEach((ev) => {
                    expect(ev.dateFormat).toBe('dd/LL');
                });
            });
    });

    // events
    it('Primitive Scheduler Calendar: events', () => {
        const events19September = [
            {
                resourceNames: ['resource-1'],
                name: 'few-hours',
                title: 'Few hours',
                from: new Date(2022, 8, 19, 12, 34),
                to: new Date(2022, 8, 19, 15),
                color: '#555555',
                theme: 'rounded'
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
                resourceNames: ['resource-3'],
                name: 'all-day',
                title: 'All day',
                allDay: true,
                from: new Date(2022, 8, 19, 4),
                labels: {
                    center: { value: 'some custom value' },
                    left: { fieldName: 'name' }
                }
            },
            {
                referenceLine: true,
                name: 'reference-line',
                title: 'Reference line',
                from: new Date(2022, 8, 19, 19, 19),
                theme: 'lightest'
            },
            {
                resourceNames: ['resource-3'],
                name: 'multi-day',
                title: 'Multi day',
                from: new Date(2022, 8, 16, 12),
                to: new Date(2022, 8, 22)
            }
        ];
        element.events = events19September;
        element.selectedResources = ALL_RESOURCES;
        element.resources = RESOURCES;
        element.selectedDate = SELECTED_DATE;

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                const multiDayEvents = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                expect(events).toHaveLength(3);
                expect(multiDayEvents).toHaveLength(2);
                multiDayEvents.forEach((ev) => {
                    const original = events19September.find(
                        (or) => or.name === ev.eventName
                    );
                    expect(ev.color).toBe(original.color);
                    expect(ev.readOnly).toBeTruthy();
                });
            });
    });
});

// expect(element.events).toEqual([]);
// expect(element.eventsLabels).toEqual({
//     center: { fieldName: 'title' }
// });
// expect(element.eventsTheme).toBe('default');
// expect(element.loadingStateAlternativeText).toBeUndefined();
// expect(element.newEventTitle).toBe('New event');
// expect(element.readOnly).toBeFalsy();
// expect(element.resizeColumnDisabled).toBeFalsy();
// expect(element.resources).toEqual([]);

// const today = new Date();
// expect(element.selectedDate.hour).toBe(today.getHours());
// expect(element.selectedDate.day).toBe(today.getDate());
// expect(element.selectedDate.month - 1).toBe(today.getMonth());
// expect(element.selectedDate.year).toBe(today.getFullYear());

// expect(element.selectedResources).toEqual([]);
// expect(element.timeSpan).toEqual({ unit: 'day', span: 1 });
// expect(element.zoomToFit).toBeFalsy();
