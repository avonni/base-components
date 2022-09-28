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
import { DateTime } from 'c/luxon';
import { SchedulerEventOccurrence } from 'c/schedulerUtils';

/*
--------------------------------------------------------------
  The primitive headers set the visible interval, unless
  the time span is year.
  
  As a consequence:
  - A lot of the tests need to wait for a second rerender.
  - The mock component of the primitive headers dispatches
  a partially mocked privateheaderchange event.
--------------------------------------------------------------
*/

// Not tested:
// - The visibleWidth passed to the day headers because it depends on DOM measurements
// - The headerCells and cellDuration passed to the events, because it depends on the primitive header privateheaderchange event.
// - The loading spinner and loadingAlternativeText, because it is automatically removed when the primitive headers dispatch the privateheaderchange event.
// - The events position, because it depends on DOM measurements.

// Partially tested:
// - Creation of a new event through drag and drop: we can't test a mouseup outside of the first cell it was created in, because we can't mock the event height on render, when the dragged event position is saved.
// - Drag and drop of events has not been fully tested with the month display (placeholders, events coming dragged from the popover).

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
    name: 'recurring-event',
    title: 'Recurring event',
    recurrence: 'daily',
    from: new Date(2022, 7, 18, 13),
    to: new Date(2022, 7, 18, 14, 50),
    resourceNames: ['resource-1']
};

const SELECTED_DATE_EVENTS = [
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
        resourceNames: ['resource-1'],
        name: 'disabled-multi-day-event',
        title: 'Disabled multi-day event',
        from: new Date(2022, 8, 19),
        to: new Date(2022, 8, 20),
        disabled: true,
        iconName: 'standard:apps'
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
const SELECTED_DATE = new Date(2022, 8, 19, 6, 35);

let element;
describe('Primitive Scheduler Calendar', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.restoreAllMocks();
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
        expect(element.recurrentEditModes).toEqual(['all', 'one']);
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
                const start = DateTime.fromJSDate(new Date(2022, 9, 1));
                const selection = start.set({
                    hour: SELECTED_DATE.getHours(),
                    minute: SELECTED_DATE.getMinutes()
                });
                expect(dayHeaders.start.ts).toBe(start.ts);
                expect(hourHeaders.start.ts).toBe(start.ts);
                expect(dayHeaders.availableMonths).toBeUndefined();
                expect(hourHeaders.availableMonths).toBeUndefined();
                expect(calendar.disabledDates).toEqual([]);
                expect(calendar.value.ts).toBe(selection.ts);
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
        element.events = SELECTED_DATE_EVENTS;
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
                expect(multiDayEvents).toHaveLength(3);
                multiDayEvents.forEach((ev) => {
                    const original = SELECTED_DATE_EVENTS.find(
                        (or) => or.name === ev.eventName
                    );
                    const from = DateTime.fromJSDate(original.from);
                    const to = DateTime.fromJSDate(
                        original.allDay ? original.from : original.to
                    );
                    expect(ev.color).toBe(original.color);
                    expect(ev.disabled).toBe(original.disabled || false);
                    expect(ev.eventData).toMatchObject(original);
                    expect(ev.eventName).toBe(original.name);
                    expect(ev.from.ts).toBe(from.startOf('day').ts);
                    expect(ev.iconName).toBe(original.iconName);
                    const centerLabel = original.labels
                        ? original.labels.center
                        : { fieldName: 'title' };
                    expect(ev.labels.center).toEqual(centerLabel);
                    expect(ev.occurrence).toBeInstanceOf(
                        SchedulerEventOccurrence
                    );
                    expect(typeof ev.occurrenceKey).toBe('string');
                    expect(ev.readOnly).toBeTruthy();
                    expect(ev.resourceKey).toBe(original.resourceNames[0]);
                    expect(ev.title).toBe(original.title);
                    expect(ev.theme).toBe(original.theme || 'default');
                    expect(ev.to.ts).toBe(to.endOf('day').ts);
                    expect(ev.variant).toBe('calendar-horizontal');
                });

                events.forEach((ev) => {
                    const original = SELECTED_DATE_EVENTS.find(
                        (or) => or.name === ev.eventName
                    );
                    const from = DateTime.fromJSDate(original.from);
                    const to = original.to
                        ? DateTime.fromJSDate(original.to)
                        : from.endOf('day');
                    const resourceName = original.resourceNames
                        ? original.resourceNames[0]
                        : undefined;
                    expect(ev.color).toBe(original.color);
                    expect(ev.disabled).toBe(original.disabled || false);
                    expect(ev.eventData).toMatchObject(original);
                    expect(ev.eventName).toBe(original.name);
                    expect(ev.from.ts).toBe(from.ts);
                    expect(ev.iconName).toBe(original.iconName);
                    const centerLabel = original.labels
                        ? original.labels.center
                        : { fieldName: 'title' };
                    expect(ev.labels.center).toEqual(centerLabel);
                    expect(ev.occurrence).toBeInstanceOf(
                        SchedulerEventOccurrence
                    );
                    expect(typeof ev.occurrenceKey).toBe('string');
                    expect(ev.readOnly).toBeFalsy();
                    expect(ev.referenceLine).toBe(
                        original.referenceLine || false
                    );
                    expect(ev.resourceKey).toBe(resourceName);
                    expect(ev.title).toBe(original.title);
                    expect(ev.theme).toBe(original.theme || 'default');
                    expect(ev.to.ts).toBe(to.ts);
                    expect(ev.variant).toBe('calendar-vertical');
                });
            });
    });

    it('Primitive Scheduler Calendar: events, month time span', () => {
        const monthEvents = [
            {
                resourceNames: ['resource-1'],
                name: 'one-day',
                title: 'One day',
                from: new Date(2022, 8, 3, 12),
                to: new Date(2022, 8, 3, 13)
            },
            {
                resourceNames: ['resource-1'],
                name: 'several-days',
                title: 'Several days',
                from: new Date(2022, 8, 7),
                to: new Date(2022, 8, 9)
            },
            {
                resourceNames: ['resource-1'],
                name: 'several-weeks',
                from: new Date(2022, 8, 16, 4),
                to: new Date(2022, 8, 19, 16)
            }
        ];
        element.events = monthEvents;
        element.selectedResources = ALL_RESOURCES;
        element.resources = RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.timeSpan = { unit: 'month', span: 1 };

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                const placeholders = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-placeholder"]'
                );

                expect(events).toHaveLength(3);
                expect(placeholders).toHaveLength(5);
                const placeholderArray = Array.from(placeholders);

                events.forEach((ev) => {
                    expect(ev.variant).toBe('calendar-month');
                });
                placeholders.forEach((pl) => {
                    expect(pl.variant).toBe('calendar-month');
                });

                const severalDays = placeholderArray.filter((pl) => {
                    return pl.occurrenceKey.startsWith('several-days');
                });
                expect(severalDays).toHaveLength(2);
                severalDays.forEach((pl) => {
                    // There should be no visible placeholder
                    expect(pl.occurrence.weekStart).toBeUndefined();
                });

                const severalWeeks = placeholderArray.filter((pl) => {
                    return pl.occurrenceKey.startsWith('several-weeks');
                });
                expect(severalWeeks).toHaveLength(3);
                // One placeholder is on the same row than th original event
                expect(severalWeeks[2].occurrence.weekStart).toBeUndefined();
                const startOfNewWeek = DateTime.fromJSDate(
                    new Date(2022, 8, 18)
                );
                // Two placeholders are on the next week row
                expect(severalWeeks[0].occurrence.weekStart.ts).toBe(
                    startOfNewWeek.ts
                );
                expect(severalWeeks[1].occurrence.weekStart.ts).toBe(
                    startOfNewWeek.ts
                );
            });
    });

    it('Primitive Scheduler Calendar: events, month time span, show more popover', () => {
        element.events = SELECTED_DATE_EVENTS;
        element.selectedResources = ALL_RESOURCES;
        element.resources = RESOURCES;
        element.selectedDate = new Date(2022, 8, 19);
        element.timeSpan = { unit: 'month', span: 1 };

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '[data-element-id="div-popover"]'
                );
                expect(popover).toBeFalsy();
                const cellStart = new Date(2022, 8, 19).getTime();
                const showMoreButton = element.shadowRoot.querySelector(
                    `[data-element-id="lightning-button-month-show-more"][data-start="${cellStart}"]`
                );
                expect(showMoreButton.label).toBe(
                    `+${SELECTED_DATE_EVENTS.length} more`
                );
                showMoreButton.click();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '[data-element-id="div-popover"]'
                );
                expect(popover).toBeTruthy();
                const popoverEvents = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-show-more-popover"]'
                );
                expect(popoverEvents).toHaveLength(SELECTED_DATE_EVENTS.length);

                popoverEvents.forEach((ev) => {
                    const original = SELECTED_DATE_EVENTS.find((event) => {
                        return event.name === ev.eventName;
                    });
                    const fromDateTime = DateTime.fromJSDate(original.from);
                    const from = original.allDay
                        ? fromDateTime.startOf('day')
                        : fromDateTime;
                    const to = original.to
                        ? DateTime.fromJSDate(original.to)
                        : from.endOf('day');
                    const resourceName = original.resourceNames
                        ? original.resourceNames[0]
                        : undefined;
                    expect(ev.color).toBe(original.color);
                    expect(ev.dateFormat).toBe('ff');
                    expect(ev.disabled).toBe(original.disabled || false);
                    expect(ev.eventData).toMatchObject(original);
                    expect(ev.eventName).toBe(original.name);
                    expect(ev.from.ts).toBe(from.ts);
                    expect(ev.iconName).toBe(original.iconName);
                    const centerLabel = original.labels
                        ? original.labels.center
                        : { fieldName: 'title' };
                    expect(ev.labels.center).toEqual(centerLabel);
                    expect(ev.readOnly).toBeFalsy();
                    expect(ev.referenceLine).toBe(
                        original.referenceLine || false
                    );
                    expect(ev.resourceKey).toBe(resourceName);
                    expect(ev.resources).toMatchObject(RESOURCES);
                    expect(ev.title).toBe(original.title);
                    expect(ev.theme).toBe(original.theme || 'default');
                    expect(ev.to.ts).toBe(to.ts);
                    expect(ev.variant).toBe('calendar-month');
                });

                const closeButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-show-more-close"]'
                );
                closeButton.click();
            })
            .then(() => {
                const popover = element.shadowRoot.querySelector(
                    '[data-element-id="div-popover"]'
                );
                expect(popover).toBeFalsy();
            });
    });

    it('Primitive Scheduler Calendar: events, one occurrence per resource is created', () => {
        element.events = [
            {
                name: 'double-resources',
                title: 'Double resources',
                resourceNames: ['resource-1', 'resource-3'],
                from: new Date(2022, 8, 19, 16),
                to: new Date(2022, 8, 19, 23)
            },
            {
                name: 'double-resources-multi-day',
                title: 'Double resources mutil-day',
                resourceNames: ['resource-1', 'resource-2'],
                from: new Date(2022, 8, 12, 12, 8),
                to: new Date(2022, 8, 28, 14, 57)
            }
        ];
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
                expect(events).toHaveLength(2);
                expect(multiDayEvents).toHaveLength(2);

                multiDayEvents.forEach((ev) => {
                    expect(ev.eventName).toBe('double-resources-multi-day');
                });
                events.forEach((ev) => {
                    expect(ev.eventName).toBe('double-resources');
                });
                expect(events[0].resourceKey).toBe('resource-1');
                expect(events[1].resourceKey).toBe('resource-3');
                expect(multiDayEvents[0].resourceKey).toBe('resource-1');
                expect(multiDayEvents[1].resourceKey).toBe('resource-2');
            });
    });

    it('Primitive Scheduler Calendar: events, recurring event', () => {
        element.events = [RECURRING_EVENT];
        element.selectedResources = ALL_RESOURCES;
        element.resources = RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.timeSpan = { unit: 'week', span: 1 };

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(events).toHaveLength(7);
                events.forEach((ev) => {
                    expect(ev.eventName).toBe('recurring-event');
                });
                expect(events[0].from.weekday).toBe(7);
                expect(events[1].from.weekday).toBe(1);
                expect(events[2].from.weekday).toBe(2);
                expect(events[3].from.weekday).toBe(3);
                expect(events[4].from.weekday).toBe(4);
                expect(events[5].from.weekday).toBe(5);
                expect(events[6].from.weekday).toBe(6);
            });
    });

    it('Primitive Scheduler Calendar: events cell height', () => {
        element.events = EVENTS;
        element.selectedResources = ALL_RESOURCES;
        element.resources = RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.timeSpan = { unit: 'day', span: 5 };

        return Promise.resolve()
            .then(() => {
                const dayHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group-horizontal"]'
                );
                const hourHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group-vertical"]'
                );
                dayHeaders.dispatchEvent(
                    new CustomEvent('privatecellsizechange', {
                        detail: {
                            orientation: 'horizontal',
                            cellSize: 30
                        }
                    })
                );
                hourHeaders.dispatchEvent(
                    new CustomEvent('privatecellsizechange', {
                        detail: {
                            orientation: 'vertical',
                            cellSize: 55
                        }
                    })
                );
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                const multiDayEvents = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                events.forEach((ev) => {
                    expect(ev.cellHeight).toBe(55);
                    expect(ev.cellWidth).toBe(30);
                });
                multiDayEvents.forEach((ev) => {
                    expect(ev.cellHeight).toBe(55);
                    expect(ev.cellWidth).toBe(30);
                });
            });
    });

    // events-labels
    it('Primitive Scheduler Calendar: eventsLabels', () => {
        const labels = {
            left: { fieldName: 'from' },
            right: { value: 'some value' },
            center: { iconName: 'utility:user', value: 'center value' }
        };
        element.events = [EVENTS[0], EVENTS[2]];
        element.eventsLabels = labels;
        element.selectedResources = ALL_RESOURCES;
        element.resources = RESOURCES;
        element.selectedDate = SELECTED_DATE;

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const multiDayEvent = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(multiDayEvent.labels).toEqual(labels);
                events.forEach((ev) => {
                    expect(ev.labels).toEqual(labels);
                });
            });
    });

    it('Primitive Scheduler Calendar: eventsLabels is overwritten by event labels', () => {
        const labelledEvents = [
            EVENTS[1],
            {
                name: 'one-day',
                from: new Date(2022, 8, 19),
                to: new Date(2022, 8, 19, 4),
                resourceNames: ['resource-1'],
                labels: {
                    center: { value: 'some value' }
                }
            }
        ];
        element.events = labelledEvents;
        element.eventsLabels = {
            left: { fieldName: 'from' },
            right: { value: 'some value' },
            center: { iconName: 'utility:user', value: 'center value' }
        };
        element.selectedResources = ALL_RESOURCES;
        element.resources = RESOURCES;
        element.selectedDate = SELECTED_DATE;

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const multiDayEvent = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(multiDayEvent.labels).toEqual(labelledEvents[0].labels);
                expect(event.labels).toEqual(labelledEvents[1].labels);
            });
    });

    // events-theme
    it('Primitive Scheduler Calendar: eventsTheme', () => {
        element.events = [
            {
                name: 'long',
                from: new Date(2022, 8, 19, 12),
                to: new Date(2022, 8, 20, 4),
                resourceNames: ['resource-2']
            },
            {
                name: 'short',
                from: new Date(2022, 8, 19, 19),
                to: new Date(2022, 8, 19, 21, 30),
                resourceNames: ['resource-2']
            }
        ];
        element.eventsTheme = 'line';
        element.selectedResources = ALL_RESOURCES;
        element.resources = RESOURCES;
        element.selectedDate = SELECTED_DATE;

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const multiDayEvent = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(multiDayEvent.theme).toEqual('line');
                expect(event.theme).toEqual('line');
            });
    });

    it('Primitive Scheduler Calendar: eventsTheme is overwritten by event theme', () => {
        const themedEvents = [
            {
                name: 'long',
                from: new Date(2022, 8, 19, 12),
                to: new Date(2022, 8, 20, 4),
                resourceNames: ['resource-2'],
                theme: 'rounded'
            },
            {
                name: 'short',
                from: new Date(2022, 8, 19, 19),
                to: new Date(2022, 8, 19, 21, 30),
                resourceNames: ['resource-2'],
                theme: 'transparent'
            }
        ];
        element.events = themedEvents;
        element.eventsTheme = 'line';
        element.selectedResources = ALL_RESOURCES;
        element.resources = RESOURCES;
        element.selectedDate = SELECTED_DATE;

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const multiDayEvent = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(multiDayEvent.theme).toEqual(themedEvents[0].theme);
                expect(event.theme).toEqual(themedEvents[1].theme);
            });
    });

    // read-only
    it('Primitive Scheduler Calendar: readOnly = false', () => {
        element.events = EVENTS;
        element.selectedResources = ALL_RESOURCES;
        element.resources = RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.readOnly = false;
        element.timeSpan = { unit: 'week', span: 1 };

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const multiDayEvents = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                multiDayEvents.forEach((ev) => {
                    expect(ev.readOnly).toBeFalsy();
                });
                events.forEach((ev) => {
                    expect(ev.readOnly).toBeFalsy();
                });
            });
    });

    it('Primitive Scheduler Calendar: readOnly = true', () => {
        element.events = EVENTS;
        element.selectedResources = ALL_RESOURCES;
        element.resources = RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.readOnly = true;
        element.timeSpan = { unit: 'week', span: 1 };

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const multiDayEvents = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                multiDayEvents.forEach((ev) => {
                    expect(ev.readOnly).toBeTruthy();
                });
                events.forEach((ev) => {
                    expect(ev.readOnly).toBeTruthy();
                });
            });
    });

    // resize-column-disabled
    it('Primitive Scheduler Calendar: resizeColumnDisabled = false', () => {
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

    it('Primitive Scheduler Calendar: resizeColumnDisabled = true', () => {
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
    it('Primitive Scheduler Calendar: resources', () => {
        element.events = SELECTED_DATE_EVENTS;
        element.selectedResources = ALL_RESOURCES;
        element.resources = RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.readOnly = true;

        return Promise.resolve()
            .then(() => {
                const checkboxes = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-input-resource"]'
                );
                expect(checkboxes).toHaveLength(RESOURCES.length);
                // Wait for the visible interval to be set
            })
            .then(() => {
                const multiDayEvents = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                multiDayEvents.forEach((ev) => {
                    expect(ev.resources).toMatchObject(RESOURCES);
                });
                events.forEach((ev) => {
                    expect(ev.resources).toMatchObject(RESOURCES);
                });
            });
    });

    // selected-date
    it('Primitive Scheduler Calendar: selectedDate', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-calendar-left-panel"]'
            );
            expect(calendar.value.ts).toBe(SELECTED_DATE.getTime());
        });
    });

    // selected-resources
    it('Primitive Scheduler Calendar: selectedResources', () => {
        element.resources = RESOURCES;
        element.selectedResources = ['resource-1', 'resource-3'];
        element.selectedDate = EVENTS[0].from;
        element.events = [EVENTS[0]];

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(events).toHaveLength(1);

                const checkboxes = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-input-resource"]'
                );
                expect(checkboxes[0].checked).toBeTruthy();
                expect(checkboxes[1].checked).toBeFalsy();
                expect(checkboxes[2].checked).toBeTruthy();
            });
    });

    it('Primitive Scheduler Calendar: reference lines do not depend on selectedResources', () => {
        element.resources = RESOURCES;
        element.selectedDate = EVENTS[4].from;
        element.events = EVENTS;

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(events).toHaveLength(1);
                expect(events[0].eventName).toBe(EVENTS[4].name);

                const checkboxes = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-input-resource"]'
                );
                checkboxes.forEach((checkbox) => {
                    expect(checkbox.checked).toBeFalsy();
                });
            });
    });

    // time-span
    it('Primitive Scheduler Calendar: timeSpan, one day', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;
        element.timeSpan = { unit: 'day', span: 1 };
        const start = DateTime.fromJSDate(SELECTED_DATE).startOf('day');

        return Promise.resolve()
            .then(() => {
                const dayHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group-horizontal"]'
                );
                expect(dayHeaders.className).toBe(
                    'avonni-scheduler__calendar-header slds-border_left'
                );
                expect(dayHeaders.headers).toEqual([
                    {
                        label: 'ccc dd',
                        unit: 'day',
                        span: 1
                    }
                ]);
                expect(dayHeaders.start.ts).toBe(start.ts);
                expect(dayHeaders.timeSpan).toEqual({
                    unit: 'day',
                    span: 1
                });

                const hourHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group-vertical"]'
                );
                expect(hourHeaders).toBeTruthy();
                expect(hourHeaders.start.ts).toBe(start.ts);
                expect(hourHeaders.timeSpan).toEqual({
                    unit: 'day',
                    span: 1
                });

                const monthCells = element.shadowRoot.querySelectorAll(
                    '[data-element-id="div-month-cell-content"]'
                );
                expect(monthCells).toHaveLength(0);
                // Wait for the visible interval to be set
            })
            .then(() => {
                const multiDayEvents = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                expect(multiDayEvents).toHaveLength(2);
                multiDayEvents.forEach((ev) => {
                    expect(ev.readOnly).toBeTruthy();
                });
            });
    });

    it('Primitive Scheduler Calendar: timeSpan, several days but less than a week', () => {
        element.timeSpan = { unit: 'day', span: 6 };

        return Promise.resolve().then(() => {
            const dayHeaders = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group-horizontal"]'
            );
            expect(dayHeaders.timeSpan).toEqual({
                unit: 'day',
                span: 6
            });
        });
    });

    it('Primitive Scheduler Calendar: timeSpan, one week', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;
        element.timeSpan = { unit: 'week', span: 1 };
        const start = DateTime.fromJSDate(new Date(2022, 8, 18)).startOf('day');

        return Promise.resolve()
            .then(() => {
                const dayHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group-horizontal"]'
                );
                expect(dayHeaders.className).toBe(
                    'avonni-scheduler__calendar-header slds-border_left'
                );
                expect(dayHeaders.headers).toEqual([
                    {
                        label: 'ccc dd',
                        unit: 'day',
                        span: 1
                    }
                ]);
                expect(dayHeaders.start.ts).toBe(start.ts);
                expect(dayHeaders.timeSpan).toEqual({
                    unit: 'week',
                    span: 1
                });

                const hourHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group-vertical"]'
                );
                expect(hourHeaders).toBeTruthy();
                expect(hourHeaders.start.ts).toBe(start.ts);
                expect(hourHeaders.timeSpan).toEqual({
                    unit: 'day',
                    span: 1
                });

                const monthCells = element.shadowRoot.querySelectorAll(
                    '[data-element-id="div-month-cell-content"]'
                );
                expect(monthCells).toHaveLength(0);

                const calendars = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-calendar-year-month"]'
                );
                expect(calendars).toHaveLength(0);
                // Wait for the visible interval to be set
            })
            .then(() => {
                const multiDayEvents = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                expect(multiDayEvents).toHaveLength(2);
                multiDayEvents.forEach((ev) => {
                    expect(ev.readOnly).toBeFalsy();
                });
            });
    });

    it('Primitive Scheduler Calendar: timeSpan, several weeks but less than a month', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;
        element.timeSpan = { unit: 'week', span: 3 };
        const start = DateTime.fromJSDate(new Date(2022, 8, 18)).startOf('day');

        return Promise.resolve()
            .then(() => {
                const dayHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group-horizontal"]'
                );
                expect(dayHeaders.className).toBe(
                    'avonni-scheduler__calendar-header'
                );
                expect(dayHeaders.headers).toEqual([
                    {
                        label: 'ccc',
                        unit: 'day',
                        span: 1
                    }
                ]);
                expect(dayHeaders.start.ts).toBe(start.ts);
                expect(dayHeaders.timeSpan).toEqual({
                    unit: 'week',
                    span: 1
                });

                const hourHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group-vertical"]'
                );
                expect(hourHeaders).toBeFalsy();

                const cells = element.shadowRoot.querySelectorAll(
                    '[data-element-id="div-cell"]'
                );
                expect(cells).toHaveLength(21);
                cells.forEach((cell) => {
                    const monthContent = cell.querySelector(
                        '[data-element-id="div-month-cell-content"]'
                    );
                    expect(monthContent).toBeTruthy();
                });
                const cellStart = Number(cells[0].dataset.start);
                const cellEnd = Number(cells[cells.length - 1].dataset.end);
                const end = DateTime.fromJSDate(new Date(2022, 9, 8)).endOf(
                    'day'
                );
                expect(cellStart).toBe(start.ts);
                expect(cellEnd).toBe(end.ts);

                const calendars = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-calendar-year-month"]'
                );
                expect(calendars).toHaveLength(0);

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
                expect(events).toHaveLength(5);
            });
    });

    it('Primitive Scheduler Calendar: timeSpan, one month', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;
        element.timeSpan = { unit: 'month', span: 1 };
        const start = DateTime.fromJSDate(new Date(2022, 7, 28)).startOf('day');

        return Promise.resolve()
            .then(() => {
                const dayHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group-horizontal"]'
                );
                expect(dayHeaders.className).toBe(
                    'avonni-scheduler__calendar-header'
                );
                expect(dayHeaders.headers).toEqual([
                    {
                        label: 'ccc',
                        unit: 'day',
                        span: 1
                    }
                ]);
                expect(dayHeaders.start.ts).toBe(start.ts);
                expect(dayHeaders.timeSpan).toEqual({
                    unit: 'week',
                    span: 1
                });

                const hourHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group-vertical"]'
                );
                expect(hourHeaders).toBeFalsy();

                const cells = element.shadowRoot.querySelectorAll(
                    '[data-element-id="div-cell"]'
                );
                expect(cells).toHaveLength(35);
                cells.forEach((cell) => {
                    const monthContent = cell.querySelector(
                        '[data-element-id="div-month-cell-content"]'
                    );
                    expect(monthContent).toBeTruthy();
                });
                const cellStart = Number(cells[0].dataset.start);
                const cellEnd = Number(cells[cells.length - 1].dataset.end);
                const end = DateTime.fromJSDate(new Date(2022, 9, 1)).endOf(
                    'day'
                );
                expect(cellStart).toBe(start.ts);
                expect(cellEnd).toBe(end.ts);

                const calendars = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-calendar-year-month"]'
                );
                expect(calendars).toHaveLength(0);

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
                expect(events).toHaveLength(5);
            });
    });

    it('Primitive Scheduler Calendar: timeSpan, several months but less than a year', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;
        element.timeSpan = { unit: 'month', span: 3 };

        return Promise.resolve().then(() => {
            const dayHeaders = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group-horizontal"]'
            );
            expect(dayHeaders).toBeFalsy();

            const hourHeaders = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group-vertical"]'
            );
            expect(hourHeaders).toBeFalsy();

            const cells = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-cell"]'
            );
            expect(cells).toHaveLength(0);

            const calendars = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-calendar-year-month"]'
            );
            expect(calendars).toHaveLength(3);
            expect(calendars[0].value.ts).toBe(SELECTED_DATE.getTime());
            expect(calendars[1].value).toBeNull();
            expect(calendars[2].value).toBeNull();

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

    it('Primitive Scheduler Calendar: timeSpan, one year', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;
        element.timeSpan = { unit: 'year', span: 1 };

        return Promise.resolve().then(() => {
            const dayHeaders = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group-horizontal"]'
            );
            expect(dayHeaders).toBeFalsy();

            const hourHeaders = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group-vertical"]'
            );
            expect(hourHeaders).toBeFalsy();

            const cells = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-cell"]'
            );
            expect(cells).toHaveLength(0);

            const calendars = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-calendar-year-month"]'
            );
            expect(calendars).toHaveLength(12);
            expect(calendars[8].value.ts).toBe(SELECTED_DATE.getTime());

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

    // zoom-to-fit
    it('Primitive Scheduler Calendar: zoomToFit', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;
        element.zoomToFit = true;
        element.timeSpan = { unit: 'week', span: 1 };

        return Promise.resolve()
            .then(() => {
                const dayHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group-horizontal"]'
                );
                expect(dayHeaders.zoomToFit).toBeTruthy();

                const hourHeaders = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group-vertical"]'
                );
                expect(hourHeaders.zoomToFit).toBeTruthy();
                // Wait for the visible interval to be set
            })
            .then(() => {
                const multiDayEvents = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                expect(multiDayEvents).toHaveLength(2);
                multiDayEvents.forEach((ev) => {
                    expect(ev.zoomToFit).toBeTruthy();
                });

                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(events).toHaveLength(2);
                events.forEach((ev) => {
                    expect(ev.zoomToFit).toBeTruthy();
                });
            });
    });

    /*
     * ------------------------------------------------------------
     *  METHODS
     * -------------------------------------------------------------
     */

    // createEvent
    it('Primitive Scheduler Calendar: createEvent() method', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;

        return Promise.resolve()
            .then(() => {
                element.createEvent({
                    title: 'New event',
                    name: 'brand-new-event',
                    from: new Date(2022, 8, 19, 16, 3),
                    to: new Date(2022, 8, 19, 21),
                    resourceNames: ['resource-1']
                });
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(events).toHaveLength(1);
                expect(events[0].title).toBe('New event');
                expect(events[0].eventName).toBe('brand-new-event');
            });
    });

    // deleteEvent
    it('Primitive Scheduler Calendar: deleteEvent() method', () => {
        element.resources = RESOURCES;
        element.events = SELECTED_DATE_EVENTS;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(events).toHaveLength(3);
                expect(events[0].eventName).toBe('few-hours');
                element.deleteEvent('few-hours');
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(events).toHaveLength(2);
                events.forEach((ev) => {
                    expect(ev.eventName).not.toBe('few-hours');
                });
            });
    });

    // newEvent and saveSelection
    it('Primitive Scheduler Calendar: newEvent() and saveSelection() methods', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        let from, to;

        return Promise.resolve()
            .then(() => {
                const column = element.shadowRoot.querySelector(
                    '[data-element-id="div-column"]'
                );
                const cell = column.querySelector(
                    '[data-element-id="div-cell"]'
                );
                from = new Date(Number(cell.dataset.start));
                to = new Date(Number(cell.dataset.end));
                jest.spyOn(column, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 5, right: 50 };
                    }
                );
                jest.spyOn(cell, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { top: 100, bottom: 150 };
                    }
                );

                element.newEvent(25, 125);
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(events).toHaveLength(0);
                element.saveSelection();
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(events).toHaveLength(1);
                expect(events[0].resourceKey).toBe(RESOURCES[0].name);
                expect(events[0].from.ts).toBe(from.getTime());
                expect(events[0].to.ts).toBe(to.getTime());
            });
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    // datechange
    it('Primitive Scheduler Calendar: datechange event', () => {
        element.selectedDate = SELECTED_DATE;

        const handler = jest.fn();
        element.addEventListener('datechange', handler);

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-calendar-left-panel"]'
            );
            const newDate = new Date(2022, 8, 20);
            calendar.dispatchEvent(
                new CustomEvent('change', {
                    detail: {
                        value: newDate
                    }
                })
            );
            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.value.ts).toBe(newDate.getTime());
            expect(call.bubbles).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
            expect(call.composed).toBeFalsy();
        });
    });

    it('Primitive Scheduler Calendar: datechange event is not dispatched if date was unselected', () => {
        element.selectedDate = SELECTED_DATE;

        const handler = jest.fn();
        element.addEventListener('datechange', handler);

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-calendar-left-panel"]'
            );
            calendar.dispatchEvent(
                new CustomEvent('change', {
                    detail: {
                        value: null
                    }
                })
            );
            expect(handler).not.toHaveBeenCalled();
        });
    });

    // emptyspotcontextmenu
    it('Primitive Scheduler Calendar: emptyspotcontextmenu event', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;

        const handler = jest.fn();
        element.addEventListener('emptyspotcontextmenu', handler);

        return Promise.resolve().then(() => {
            const column = element.shadowRoot.querySelector(
                '[data-element-id="div-column"]'
            );
            const cell = column.querySelector('[data-element-id="div-cell"]');
            jest.spyOn(column, 'getBoundingClientRect').mockImplementation(
                () => {
                    return { left: 260, right: 476 };
                }
            );
            jest.spyOn(cell, 'getBoundingClientRect').mockImplementation(() => {
                return { top: 0, bottom: 50 };
            });
            const event = new CustomEvent('contextmenu');
            event.clientX = 283;
            event.clientY = 38;
            cell.dispatchEvent(event);
            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.selection.y).toBe(38);
            expect(call.detail.selection.x).toBe(283);
            expect(call.bubbles).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
            expect(call.composed).toBeFalsy();
        });
    });

    it('Primitive Scheduler Calendar: emptyspotcontextmenu event is not dispatched on disabled month cell', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.availableMonths = [8];
        element.timeSpan = { unit: 'month', span: 1 };

        const handler = jest.fn();
        element.addEventListener('emptyspotcontextmenu', handler);

        return Promise.resolve().then(() => {
            const column = element.shadowRoot.querySelector(
                '[data-element-id="div-column"]'
            );
            const cell = column.querySelector('[data-element-id="div-cell"]');
            jest.spyOn(column, 'getBoundingClientRect').mockImplementation(
                () => {
                    return { left: 260, right: 476 };
                }
            );
            jest.spyOn(cell, 'getBoundingClientRect').mockImplementation(() => {
                return { top: 0, bottom: 50 };
            });
            const event = new CustomEvent('contextmenu');
            event.clientX = 283;
            event.clientY = 38;
            cell.dispatchEvent(event);
            expect(handler).not.toHaveBeenCalled();
        });
    });

    it('Primitive Scheduler Calendar: emptyspotcontextmenu event is not dispatched if no resource is selected', () => {
        element.resources = RESOURCES;
        element.selectedDate = SELECTED_DATE;

        const handler = jest.fn();
        element.addEventListener('emptyspotcontextmenu', handler);

        return Promise.resolve().then(() => {
            const column = element.shadowRoot.querySelector(
                '[data-element-id="div-column"]'
            );
            const cell = column.querySelector('[data-element-id="div-cell"]');
            jest.spyOn(column, 'getBoundingClientRect').mockImplementation(
                () => {
                    return { left: 260, right: 476 };
                }
            );
            jest.spyOn(cell, 'getBoundingClientRect').mockImplementation(() => {
                return { top: 0, bottom: 50 };
            });
            const event = new CustomEvent('contextmenu');
            event.clientX = 283;
            event.clientY = 38;
            cell.dispatchEvent(event);
            expect(handler).not.toHaveBeenCalled();
        });
    });

    // eventchange
    it('Primitive Scheduler Calendar: eventchange event when resizing the end of an event', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = SELECTED_DATE_EVENTS;

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
                const column = element.shadowRoot.querySelector(
                    '[data-element-id="div-column"]'
                );

                jest.spyOn(column, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 0, right: 100, top: 0, bottom: 1000 };
                    }
                );
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );

                // mousedown in the first cell
                const cells = column.querySelectorAll(
                    '[data-element-id="div-cell"]'
                );
                const to = new Date(Number(cells[1].dataset.end) + 1);
                jest.spyOn(
                    cells[0],
                    'getBoundingClientRect'
                ).mockImplementation(() => {
                    return { top: 0, bottom: 150 };
                });
                jest.spyOn(
                    cells[1],
                    'getBoundingClientRect'
                ).mockImplementation(() => {
                    return { top: 151, bottom: 260 };
                });
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
                    '[data-element-id="div-wrapper"]'
                );
                const mousemove = new CustomEvent('mousemove');
                mousemove.clientX = 30;
                mousemove.clientY = 203;
                wrapper.dispatchEvent(mousemove);
                expect(event.style.height).toBe('153px');

                // mouseup
                const mouseup = new CustomEvent('mouseup', { bubbles: true });
                mouseup.clientX = 31;
                mouseup.clientY = 205;
                wrapper.dispatchEvent(mouseup);

                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.detail.name).toBe(event.eventName);
                expect(call.detail.draftValues).toEqual({
                    allDay: false,
                    to: to.toISOString()
                });
                expect(call.bubbles).toBeTruthy();
                expect(call.cancelable).toBeFalsy();
                expect(call.composed).toBeFalsy();
            });
    });

    it('Primitive Scheduler Calendar: eventchange event when resizing the start of an event', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = SELECTED_DATE_EVENTS;

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
                const column = element.shadowRoot.querySelector(
                    '[data-element-id="div-column"]'
                );

                jest.spyOn(column, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 0, right: 100, top: 0, bottom: 1000 };
                    }
                );
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                jest.spyOn(event, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { top: 151, bottom: 300, height: 100 };
                    }
                );

                // mousedown in the first cell
                const cells = column.querySelectorAll(
                    '[data-element-id="div-cell"]'
                );
                jest.spyOn(
                    cells[0],
                    'getBoundingClientRect'
                ).mockImplementation(() => {
                    return { top: 0, bottom: 150 };
                });
                jest.spyOn(
                    cells[1],
                    'getBoundingClientRect'
                ).mockImplementation(() => {
                    return { top: 151, bottom: 260 };
                });
                event.dispatchEvent(
                    new CustomEvent('privatemousedown', {
                        detail: {
                            eventName: event.eventName,
                            from: event.from,
                            key: event.occurrenceKey,
                            side: 'start',
                            x: 30,
                            y: 155
                        }
                    })
                );
                expect(hidePopoversHandler).toHaveBeenCalledTimes(1);
                expect(
                    hidePopoversHandler.mock.calls[0][0].detail.list
                ).toBeUndefined();

                // mousemove to the second cell
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-wrapper"]'
                );
                const mousemove = new CustomEvent('mousemove');
                mousemove.clientX = 30;
                mousemove.clientY = 88;
                wrapper.dispatchEvent(mousemove);
                expect(event.style.height).toBe('167px');

                // mouseup
                const mouseup = new CustomEvent('mouseup', { bubbles: true });
                mouseup.clientX = 31;
                mouseup.clientY = 85;
                wrapper.dispatchEvent(mouseup);

                expect(handler).toHaveBeenCalled();
                const from = new Date(Number(cells[0].dataset.start));
                const call = handler.mock.calls[0][0];
                expect(call.detail.name).toBe(event.eventName);
                expect(call.detail.draftValues).toEqual({
                    allDay: false,
                    from: from.toISOString()
                });
                expect(call.bubbles).toBeTruthy();
                expect(call.cancelable).toBeFalsy();
                expect(call.composed).toBeFalsy();
            });
    });

    it('Primitive Scheduler Calendar: eventchange when resizing a multi-day event', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;
        element.timeSpan = { unit: 'week', span: 1 };

        const handler = jest.fn();
        const hidePopoversHandler = jest.fn();
        element.addEventListener('hidepopovers', hidePopoversHandler);
        element.addEventListener('eventchange', handler);

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const row = element.shadowRoot.querySelector(
                    '[data-element-id="div-multi-day-events-wrapper"]'
                );
                jest.spyOn(row, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 0, right: 1000, top: 0, bottom: 1000 };
                    }
                );
                const event = row.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );

                // mousedown in the first cell
                const cells = row.querySelectorAll(
                    '[data-element-id="div-cell"]'
                );
                const to = new Date(Number(cells[1].dataset.end) + 1);
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
                    '[data-element-id="div-wrapper"]'
                );
                const mousemove = new CustomEvent('mousemove');
                mousemove.clientX = 200;
                mousemove.clientY = 55;
                wrapper.dispatchEvent(mousemove);
                expect(event.style.width).toBe('170px');

                // mouseup
                const mouseup = new CustomEvent('mouseup', { bubbles: true });
                mouseup.clientX = 210;
                mouseup.clientY = 55;
                wrapper.dispatchEvent(mouseup);

                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.detail.name).toBe(event.eventName);
                expect(call.detail.draftValues).toEqual({
                    allDay: true,
                    to: to.toISOString()
                });
            });
    });

    it('Primitive Scheduler Calendar: eventchange when drag and dropping', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = [
            {
                name: 'some-event',
                from: new Date(2022, 8, 19, 12),
                to: new Date(2022, 8, 19, 14),
                resourceNames: [ALL_RESOURCES[0]]
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
                const column = element.shadowRoot.querySelector(
                    '[data-element-id="div-column"]'
                );

                jest.spyOn(column, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 0, right: 100, top: 0, bottom: 1000 };
                    }
                );
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );

                // mousedown in the first cell
                const cells = column.querySelectorAll(
                    '[data-element-id="div-cell"]'
                );
                jest.spyOn(
                    cells[0],
                    'getBoundingClientRect'
                ).mockImplementation(() => {
                    return { top: 0, bottom: 150 };
                });
                jest.spyOn(
                    cells[1],
                    'getBoundingClientRect'
                ).mockImplementation(() => {
                    return { top: 151, bottom: 260 };
                });
                event.dispatchEvent(
                    new CustomEvent('privatemousedown', {
                        detail: {
                            eventName: event.eventName,
                            from: event.from,
                            key: event.occurrenceKey,
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
                    '[data-element-id="div-wrapper"]'
                );
                const mousemove = new CustomEvent('mousemove');
                mousemove.clientX = 30;
                mousemove.clientY = 203;
                wrapper.dispatchEvent(mousemove);

                // mouseup
                const mouseup = new CustomEvent('mouseup', { bubbles: true });
                mouseup.clientX = 31;
                mouseup.clientY = 205;
                wrapper.dispatchEvent(mouseup);

                expect(handler).toHaveBeenCalled();
                const from = Number(cells[1].dataset.start);
                const to = from + 7200000;
                const call = handler.mock.calls[0][0];
                expect(call.detail.name).toBe(event.eventName);
                expect(call.detail.draftValues).toEqual({
                    from: new Date(from).toISOString(),
                    to: new Date(to).toISOString()
                });
            });
    });

    it('Primitive Scheduler Calendar: eventchange when drag and dropping a recurrent event', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = [
            {
                name: 'some-event',
                recurrence: 'weekly',
                recurrenceCount: 2,
                from: new Date(2022, 8, 19, 12),
                to: new Date(2022, 8, 19, 14),
                resourceNames: [ALL_RESOURCES[1]]
            }
        ];
        element.recurrentEditModes = ['one'];
        element.timeSpan = {
            unit: 'week',
            span: 1
        };

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
                const column = element.shadowRoot.querySelector(
                    '[data-element-id="div-column"]'
                );

                jest.spyOn(column, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 0, right: 100, top: 0, bottom: 1000 };
                    }
                );
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );

                // mousedown in the first cell
                const cells = column.querySelectorAll(
                    '[data-element-id="div-cell"]'
                );
                jest.spyOn(
                    cells[0],
                    'getBoundingClientRect'
                ).mockImplementation(() => {
                    return { top: 0, bottom: 150 };
                });
                jest.spyOn(
                    cells[1],
                    'getBoundingClientRect'
                ).mockImplementation(() => {
                    return { top: 151, bottom: 260 };
                });
                event.dispatchEvent(
                    new CustomEvent('privatemousedown', {
                        detail: {
                            eventName: event.eventName,
                            from: event.from,
                            key: event.occurrenceKey,
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
                    '[data-element-id="div-wrapper"]'
                );
                const mousemove = new CustomEvent('mousemove');
                mousemove.clientX = 30;
                mousemove.clientY = 203;
                wrapper.dispatchEvent(mousemove);

                // mouseup
                const mouseup = new CustomEvent('mouseup', { bubbles: true });
                mouseup.clientX = 31;
                mouseup.clientY = 205;
                wrapper.dispatchEvent(mouseup);

                expect(handler).toHaveBeenCalled();
                const from = Number(cells[1].dataset.start);
                const to = from + 7200000;
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
            });
    });

    // eventcontextmenu
    it('Primitive Scheduler Calendar: eventcontextmenu event', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = SELECTED_DATE_EVENTS;

        const handler = jest.fn();
        element.addEventListener('eventcontextmenu', handler);

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
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

    it('Primitive Scheduler Calendar: eventcontextmenu event is not dispatched for disabled and referenceline events', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = [SELECTED_DATE_EVENTS[1], SELECTED_DATE_EVENTS[4]];

        const handler = jest.fn();
        element.addEventListener('eventcontextmenu', handler);

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(events).toHaveLength(2);
                events.forEach((event) => {
                    event.dispatchEvent(
                        new CustomEvent('privatecontextmenu', {
                            detail: {}
                        })
                    );
                });
                expect(handler).not.toHaveBeenCalled();
            });
    });

    // eventmouseenter
    it('Primitive Scheduler Calendar: eventmouseenter', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = SELECTED_DATE_EVENTS;

        const handler = jest.fn();
        element.addEventListener('eventmouseenter', handler);

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
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
    it('Primitive Scheduler Calendar: eventselect', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
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
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
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
    it('Primitive Scheduler Calendar: hidepopovers on event mouse leave and blur', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = SELECTED_DATE_EVENTS;

        const handler = jest.fn();
        element.addEventListener('hidepopovers', handler);

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
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

    it('Primitive Scheduler Calendar: hidepopovers on event double click', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = SELECTED_DATE_EVENTS;

        const handler = jest.fn();
        element.addEventListener('hidepopovers', handler);

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
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

    // openeditdialog
    it('Primitive Scheduler Calendar: openeditdialog on event double click', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = SELECTED_DATE_EVENTS;

        const handler = jest.fn();
        element.addEventListener('openeditdialog', handler);

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
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

    it('Primitive Scheduler Calendar: openeditdialog on empty spot double click', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.newEventTitle = 'some new event title';

        const handler = jest.fn();
        element.addEventListener('openeditdialog', handler);

        return Promise.resolve().then(() => {
            const column = element.shadowRoot.querySelector(
                '[data-element-id="div-column"]'
            );
            const cell = column.querySelector('[data-element-id="div-cell"]');
            jest.spyOn(column, 'getBoundingClientRect').mockImplementation(
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

    it('Primitive Scheduler Calendar: openeditdialog on disabled event double click', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = SELECTED_DATE_EVENTS;

        const handler = jest.fn();
        element.addEventListener('openeditdialog', handler);

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"][data-disabled="true"]'
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

    it('Primitive Scheduler Calendar: openeditdialog on dragging of a new event', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;

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
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(event).toBeFalsy();

                // mousedown
                const column = element.shadowRoot.querySelector(
                    '[data-element-id="div-column"]'
                );
                const cell = column.querySelector(
                    '[data-element-id="div-cell"]'
                );
                from = new Date(Number(cell.dataset.start));
                to = new Date(Number(cell.dataset.end) + 1);
                jest.spyOn(column, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 5, right: 50 };
                    }
                );
                jest.spyOn(cell, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { top: 100, bottom: 150 };
                    }
                );
                const mousedown = new CustomEvent('mousedown');
                mousedown.clientX = 34;
                mousedown.clientY = 130;
                cell.dispatchEvent(mousedown);
                expect(hidePopoversHandler).toHaveBeenCalledTimes(1);
                expect(
                    hidePopoversHandler.mock.calls[0][0].detail.list
                ).toBeUndefined();

                // First mousemove, the event will be created and appear on the calendar
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-wrapper"]'
                );
                wrapper.dispatchEvent(new CustomEvent('mousemove'));
            })
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-main-grid"]'
                );
                expect(event).toBeTruthy();
                expect(event.eventName).toBe('new-event');
                expect(event.style.height).toBeFalsy();

                // Second mousemove, the event is resized
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-wrapper"]'
                );
                const mousemove = new CustomEvent('mousemove');
                mousemove.clientX = 25;
                mousemove.clientY = 135;
                wrapper.dispatchEvent(mousemove);
                expect(event.style.height).toBe('5px');

                // mouseup
                const mouseup = new CustomEvent('mouseup', { bubbles: true });
                mouseup.clientX = 25;
                mouseup.clientY = 140;
                wrapper.dispatchEvent(mouseup);

                expect(handler).toHaveBeenCalled();
                const selection = handler.mock.calls[0][0].detail.selection;
                expect(selection.event.from.ts).toBe(from.getTime());
                expect(selection.event.to.ts).toBe(to.getTime());
            });
    });

    it('Primitive Scheduler Calendar: openeditdialog on dragging of a new multi-day event', () => {
        element.resources = RESOURCES;
        element.selectedResources = ALL_RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.timeSpan = { unit: 'week', span: 1 };
        element.events = [EVENTS[1]];

        const handler = jest.fn();
        const hidePopoversHandler = jest.fn();
        element.addEventListener('hidepopovers', hidePopoversHandler);
        element.addEventListener('openeditdialog', handler);

        let from, to;
        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const row = element.shadowRoot.querySelector(
                    '[data-element-id="div-multi-day-events-wrapper"]'
                );
                jest.spyOn(row, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 0, right: 1000, top: 0, bottom: 1000 };
                    }
                );
                const events = row.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                expect(events).toHaveLength(1);

                // mousedown
                const cell = row.querySelector('[data-element-id="div-cell"]');
                from = new Date(Number(cell.dataset.start));
                to = new Date(Number(cell.dataset.end) + 1);
                jest.spyOn(cell, 'getBoundingClientRect').mockImplementation(
                    () => {
                        return { left: 0, right: 150 };
                    }
                );
                const mousedown = new CustomEvent('mousedown');
                mousedown.clientX = 34;
                mousedown.clientY = 130;
                cell.dispatchEvent(mousedown);
                expect(hidePopoversHandler).toHaveBeenCalledTimes(1);
                expect(
                    hidePopoversHandler.mock.calls[0][0].detail.list
                ).toBeUndefined();

                // First mousemove, the event will be created and appear on the calendar
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-wrapper"]'
                );
                wrapper.dispatchEvent(new CustomEvent('mousemove'));
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence-multi-day"]'
                );
                expect(events).toHaveLength(2);
                expect(events[1].eventName).toBe('new-event');
                expect(events[1].style.width).toBeFalsy();

                // Second mousemove, the event is resized
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="div-wrapper"]'
                );
                const mousemove = new CustomEvent('mousemove');
                mousemove.clientX = 40;
                mousemove.clientY = 130;
                wrapper.dispatchEvent(mousemove);
                expect(events[1].style.width).toBe('6px');

                // mouseup
                const mouseup = new CustomEvent('mouseup', { bubbles: true });
                mouseup.clientX = 40;
                mouseup.clientY = 131;
                wrapper.dispatchEvent(mouseup);

                expect(handler).toHaveBeenCalled();
                const selection = handler.mock.calls[0][0].detail.selection;
                expect(selection.event.from.ts).toBe(from.getTime());
                expect(selection.event.to.ts).toBe(to.getTime());
            });
    });

    // resourceselect
    it('Primitive Scheduler Calendar: resourceselect when selecting a resource', () => {
        element.resources = RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.events = EVENTS;
        element.timeSpan = { unit: 'week', span: 1 };

        const handler = jest.fn();
        element.addEventListener('resourceselect', handler);

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(0);

                const firstResource = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-resource"]'
                );
                firstResource.dispatchEvent(
                    new CustomEvent('change', {
                        detail: { checked: true }
                    })
                );
                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.detail.name).toBe(RESOURCES[0].name);
                expect(call.detail.selectedResources).toEqual([
                    RESOURCES[0].name
                ]);
                expect(call.bubbles).toBeFalsy();
                expect(call.cancelable).toBeFalsy();
                expect(call.composed).toBeFalsy();
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(1);
            });
    });

    it('Primitive Scheduler Calendar: resourceselect when unselecting a resource', () => {
        element.resources = RESOURCES;
        element.selectedDate = SELECTED_DATE;
        element.selectedResources = ALL_RESOURCES;
        element.events = EVENTS;
        element.timeSpan = { unit: 'week', span: 1 };

        const handler = jest.fn();
        element.addEventListener('resourceselect', handler);

        return Promise.resolve()
            .then(() => {
                // Wait for the visible interval to be set
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(4);

                const firstResource = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-resource"]'
                );
                firstResource.dispatchEvent(
                    new CustomEvent('change', {
                        detail: { checked: false }
                    })
                );
                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.detail.name).toBe(RESOURCES[0].name);
                expect(call.detail.selectedResources).toEqual([
                    RESOURCES[1].name,
                    RESOURCES[2].name
                ]);
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="avonni-primitive-scheduler-event-occurrence"]'
                );
                expect(events).toHaveLength(3);
            });
    });
});
