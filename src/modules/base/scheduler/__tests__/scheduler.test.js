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
import Scheduler from '../scheduler';
import { DateTime, Interval } from 'c/luxon';
import {
    COLUMNS,
    RESOURCES,
    RESOURCES_KEY_FIELD,
    EVENTS,
    START,
    DISABLED_DATES_TIMES,
    MONTH_TIME_SPAN
} from './data';

// Not tested:
// getResourceElementFromPosition() and getCellFromPosition(), because they depend on DOM measurements.
// openEditEventDialog() and eventselect, because it depends on the primitive occurrences sending an event on focus.
// Resize observer
// Resizing and dragging events
// Keyboard navigation

jest.useFakeTimers();
let element;

const setVisibleInterval = (
    start = START,
    timeSpan = { unit: 'day', span: 1 }
) => {
    const { unit, span } = timeSpan;
    const header = element.shadowRoot.querySelector(
        '[data-element-id="avonni-primitive-scheduler-header-group"]'
    );
    const s = DateTime.fromJSDate(start);
    let e = s.plus({ [unit]: span });
    e = DateTime.fromMillis(e.ts - 1);
    header.visibleInterval = Interval.fromDateTimes(s, e);
};

describe('Scheduler', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        window.requestAnimationFrame.mockRestore();
    });

    beforeEach(() => {
        element = createElement('base-scheduler', {
            is: Scheduler
        });
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => {
                cb();
            }, 0);
        });
    });

    it('Scheduler: Default attributes', () => {
        expect(element.availableDaysOfTheWeek).toMatchObject([
            0, 1, 2, 3, 4, 5, 6
        ]);
        expect(element.availableMonths).toMatchObject([
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
        ]);
        expect(element.availableTimeFrames).toMatchObject(['00:00-23:59']);
        expect(element.collapseDisabled).toBeFalsy();
        expect(element.columns).toMatchObject([]);
        expect(element.contextMenuEventActions).toMatchObject([]);
        expect(element.contextMenuEmptySpotActions).toMatchObject([]);
        expect(element.customEventsPalette).toMatchObject([]);
        expect(element.customHeaders).toMatchObject([]);
        expect(element.dateFormat).toBe('ff');
        expect(element.disabledDatesTimes).toMatchObject([]);
        expect(element.dialogLabels).toMatchObject({
            title: 'Title',
            from: 'From',
            to: 'To',
            resources: 'Resources',
            saveButton: 'Save',
            saveOneRecurrent: 'Only this event',
            saveAllRecurrent: 'All events',
            editRecurrent: 'Edit recurring event.',
            cancelButton: 'Cancel',
            deleteButton: 'Delete',
            deleteTitle: 'Delete Event',
            deleteMessage: 'Are you sure you want to delete this event?',
            newEventTitle: 'New event'
        });
        expect(element.events).toMatchObject([]);
        expect(element.eventsLabels).toMatchObject({
            center: { fieldName: 'title' }
        });
        expect(element.eventsPalette).toBe('aurora');
        expect(element.eventsTheme).toBe('default');
        expect(element.headers).toBe('hourAndDay');
        expect(element.hideToolbar).toBeFalsy();
        expect(element.isLoading).toBeFalsy();
        expect(element.loadingStateAlternativeText).toBe('Loading');
        expect(element.readOnly).toBeFalsy();
        expect(element.recurrentEditModes).toMatchObject(['all', 'one']);
        expect(element.referenceLines).toMatchObject([]);
        expect(element.resizeColumnDisabled).toBeFalsy();
        expect(element.resources).toMatchObject([]);
        expect(element.resourcesKeyField).toBeUndefined();
        expect(element.start).toBeInstanceOf(DateTime);
        expect(element.timeSpan).toMatchObject({ unit: 'day', span: 1 });
        expect(element.toolbarTimeSpans).toEqual([
            { unit: 'day', span: 1, label: 'Day', headers: 'hourAndDay' },
            { unit: 'week', span: 1, label: 'Week', headers: 'hourAndDay' },
            { unit: 'month', span: 1, label: 'Month', headers: 'dayAndMonth' },
            { unit: 'year', span: 1, label: 'Year', headers: 'dayAndMonth' }
        ]);
        expect(element.variant).toBe('horizontal');
        expect(element.zoomToFit).toBeFalsy();
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    // available-days-of-the-week
    it('Scheduler: availableDaysOfTheWeek', () => {
        document.body.appendChild(element);
        element.availableDaysOfTheWeek = [0, 1];

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group"]'
            );
            expect(header.availableDaysOfTheWeek).toMatchObject([0, 1]);
        });
    });

    // available-months
    it('Scheduler: availableMonths', () => {
        document.body.appendChild(element);
        element.availableMonths = [0, 1];

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group"]'
            );
            expect(header.availableMonths).toMatchObject([0, 1]);
        });
    });

    // available-time-frames
    it('Scheduler: availableTimeFrames', () => {
        document.body.appendChild(element);
        element.availableTimeFrames = ['12:00-17:00', '20:30-21:15'];

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group"]'
            );
            expect(header.availableTimeFrames).toMatchObject([
                '12:00-17:00',
                '20:30-21:15'
            ]);
        });
    });

    // collapse-disabled
    // Depends on resources, resourcesKeyField and columns
    it('Scheduler: collapseDisabled = false', () => {
        document.body.appendChild(element);
        element.collapseDisabled = false;

        return Promise.resolve().then(() => {
            const splitterIcons = element.shadowRoot.querySelectorAll(
                '.avonni-scheduler__splitter-icon'
            );
            expect(splitterIcons).toHaveLength(2);
        });
    });

    it('Scheduler: collapseDisabled = true', () => {
        document.body.appendChild(element);
        element.collapseDisabled = true;

        return Promise.resolve().then(() => {
            const splitterIcons = element.shadowRoot.querySelectorAll(
                '.avonni-scheduler__splitter-icon'
            );
            expect(splitterIcons).toHaveLength(0);
        });
    });

    it('Scheduler: collapse and open first column', () => {
        document.body.appendChild(element);
        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.columns = COLUMNS;

        const datatableCol = element.shadowRoot.querySelector(
            '.avonni-scheduler__first-col'
        );
        const splitterIcons = element.shadowRoot.querySelectorAll(
            '.avonni-scheduler__splitter-icon'
        );
        const leftIcon = splitterIcons[0];
        const rightIcon = splitterIcons[1];

        return Promise.resolve()
            .then(() => {
                // Initial state
                expect(datatableCol.classList).not.toContain(
                    'avonni-scheduler__first-col_hidden'
                );
                expect(datatableCol.classList).not.toContain(
                    'avonni-scheduler__first-col_open'
                );

                leftIcon.click();
            })
            .then(() => {
                // Collapse
                expect(datatableCol.classList).toContain(
                    'avonni-scheduler__first-col_hidden'
                );
                expect(datatableCol.classList).not.toContain(
                    'avonni-scheduler__first-col_open'
                );

                rightIcon.click();
            })
            .then(() => {
                // Reset to initial state
                expect(datatableCol.classList).not.toContain(
                    'avonni-scheduler__first-col_hidden'
                );
                expect(datatableCol.classList).not.toContain(
                    'avonni-scheduler__first-col_open'
                );

                rightIcon.click();
            })
            .then(() => {
                // Open
                expect(datatableCol.classList).not.toContain(
                    'avonni-scheduler__first-col_hidden'
                );
                expect(datatableCol.classList).toContain(
                    'avonni-scheduler__first-col_open'
                );
            });
    });

    // columns
    it('Scheduler: columns', () => {
        document.body.appendChild(element);
        element.columns = COLUMNS;

        return Promise.resolve().then(() => {
            const datatable = element.shadowRoot.querySelector(
                '[data-element-id="avonni-datatable"]'
            );
            expect(datatable.columns).toMatchObject(COLUMNS);
        });
    });

    // context-menu-event-actions
    // Depends on start, events, columns, resources and resourcesKeyField
    it('Scheduler: contextMenuEventActions', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval(START);

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = EVENTS;
        const menu = [
            {
                name: 'first-action',
                label: 'First action',
                iconName: 'utility:apps'
            },
            {
                name: 'second-action',
                label: 'Second action'
            }
        ];
        element.contextMenuEventActions = menu;

        return Promise.resolve()
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                event.dispatchEvent(
                    new CustomEvent('privatecontextmenu', {
                        detail: {
                            eventName: event.eventName,
                            key: event.occurrenceKey,
                            from: event.from,
                            to: event.to,
                            x: 20,
                            y: 300
                        }
                    })
                );
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                expect(dropdown).toBeTruthy();
                expect(dropdown.items).toMatchObject(menu);
                expect(dropdown.style.top).toBe('300px');
                expect(dropdown.style.left).toBe('20px');
            });
    });

    it('Scheduler: contextMenuEventActions, default edit action', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval(START);

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = EVENTS;

        let title;
        return Promise.resolve()
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                title = event.title;
                event.dispatchEvent(
                    new CustomEvent('privatecontextmenu', {
                        detail: {
                            eventName: event.eventName,
                            key: event.occurrenceKey,
                            from: event.from,
                            to: event.to,
                            x: 20,
                            y: 300
                        }
                    })
                );
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                dropdown.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            name: 'edit'
                        }
                    })
                );
            })
            .then(() => {
                const dialog = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"]'
                );
                expect(dialog).toBeTruthy();
                expect(dialog.title).toBe(title);
            });
    });

    it('Scheduler: contextMenuEventActions, default delete action', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval(START);

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = EVENTS;

        return Promise.resolve()
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                event.dispatchEvent(
                    new CustomEvent('privatecontextmenu', {
                        detail: {
                            eventName: event.eventName,
                            key: event.occurrenceKey,
                            from: event.from,
                            to: event.to,
                            x: 20,
                            y: 300
                        }
                    })
                );
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                dropdown.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            name: 'delete'
                        }
                    })
                );
            })
            .then(() => {
                const deleteMessage = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"] p'
                );
                expect(deleteMessage).toBeTruthy();
            });
    });

    // context-menu-empty-spot-actions
    // Depends on resources and resourcesKeyField
    it('Scheduler: contextMenuEmptySpotActions', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval(START);

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        const menu = [
            {
                name: 'first-action',
                label: 'First action',
                iconName: 'utility:apps'
            },
            {
                name: 'second-action',
                label: 'Second action'
            }
        ];
        element.contextMenuEmptySpotActions = menu;

        return Promise.resolve()
            .then(() => {
                const cell = element.shadowRoot.querySelector(
                    '[data-element-id="div-cell"]'
                );
                cell.dispatchEvent(
                    new CustomEvent('contextmenu', {
                        detail: {
                            x: 0,
                            y: 0
                        }
                    })
                );
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                expect(dropdown).toBeTruthy();
                expect(dropdown.items).toMatchObject(menu);
                expect(dropdown.style.top).toBe('0px');
                expect(dropdown.style.left).toBe('0px');
            });
    });

    it('Scheduler: contextMenuEmptySpotActions, default add-event action (+ dialogLabels.newEventTitle)', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.dialogLabels = {
            newEventTitle: 'Title of the new event'
        };

        return Promise.resolve()
            .then(() => {
                const cell = element.shadowRoot.querySelector(
                    '[data-element-id="div-cell"]'
                );
                cell.dispatchEvent(
                    new CustomEvent('contextmenu', {
                        detail: {
                            x: 0,
                            y: 0
                        }
                    })
                );
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                dropdown.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            name: 'add-event'
                        }
                    })
                );
            })
            .then(() => {
                const dialog = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"]'
                );
                expect(dialog).toBeTruthy();
                expect(dialog.title).toBe('Title of the new event');
            });
    });

    // custom-events-palette
    // Depends on resources, resourcesKeyField, start and events
    it('Scheduler: customEventsPalette', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.events = EVENTS;
        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        const palette = ['#333', '#444', '#555'];
        element.customEventsPalette = palette;

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            event.resources.forEach((row, index) => {
                expect(row.color).toBe(palette[index]);
            });
        });
    });

    // custom-headers
    it('Scheduler: customHeaders', () => {
        document.body.appendChild(element);

        const headers = [
            {
                unit: 'year',
                label: 'yy',
                span: 2
            },
            {
                unit: 'day',
                label: 'dd',
                span: 1
            }
        ];
        element.customHeaders = headers;

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group"]'
            );
            expect(header.headers).toMatchObject(headers);
        });
    });

    // date-format
    // Depends on start, events, resources and resourcesKeyField
    it('Scheduler: dateFormat', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = EVENTS;
        element.dateFormat = 'hh:mm';

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(event.dateFormat).toBe('hh:mm');
        });
    });

    it('Scheduler: dateFormat (detail popover)', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = EVENTS;
        element.dateFormat = 'HH:mm';

        let event;
        return Promise.resolve()
            .then(() => {
                event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                event.dispatchEvent(
                    new CustomEvent('privatemouseenter', {
                        detail: {
                            eventName: event.eventName,
                            key: event.occurrenceKey,
                            from: event.from,
                            to: event.to,
                            x: 0,
                            y: 0
                        }
                    })
                );
            })
            .then(() => {
                const popoverTitle = element.shadowRoot.querySelector(
                    '.avonni-scheduler__event-detail-popover strong'
                );
                expect(popoverTitle).toBeTruthy();
                expect(popoverTitle.textContent).toBe(event.title);

                const from = element.shadowRoot.querySelector(
                    '.avonni-scheduler__event-detail-popover .slds-grid'
                );
                expect(from.textContent).toBe('00:00');

                const to = element.shadowRoot.querySelector(
                    '.avonni-scheduler__event-detail-popover .slds-grid:last-of-type'
                );
                expect(to.textContent).toBe('23:59');
            });
    });

    // disabled-dates-times
    // Depends on start, resources and resourcesKeyField
    it('Scheduler: disabledDatesTimes', () => {
        const start = new Date(2021, 0, 1);
        const timeSpan = {
            unit: 'year',
            span: 1
        };
        element.start = start;
        element.timeSpan = timeSpan;
        document.body.appendChild(element);
        setVisibleInterval(start, timeSpan);

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.disabledDatesTimes = DISABLED_DATES_TIMES;

        return Promise.resolve().then(() => {
            const occurrences = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            DISABLED_DATES_TIMES.forEach((event) => {
                event.keyFields.forEach((key) => {
                    const occurrence = Array.from(occurrences).find((occ) => {
                        return (
                            occ.resourceKey === key && occ.title === event.title
                        );
                    });
                    expect(occurrence).toBeTruthy();
                    expect(occurrence.color).toBeUndefined();
                    expect(occurrence.headerCells).not.toBeUndefined();
                    expect(occurrence.cellDuration).not.toBeUndefined();
                    expect(occurrence.cellHeight).toBe(0);
                    expect(occurrence.cellWidth).toBe(0);
                    expect(occurrence.dateFormat).toBe(element.dateFormat);
                    expect(occurrence.disabled).toBeTruthy();
                    expect(occurrence.eventData).toMatchObject(event);
                    expect(occurrence.eventName).toBe('disabled');
                    expect(occurrence.from.ts).toBe(event.from.getTime());
                    expect(occurrence.iconName).toBe(event.iconName);
                    expect(occurrence.labels).toMatchObject(
                        element.eventsLabels
                    );
                    expect(occurrence.occurrence).not.toBeUndefined();
                    expect(occurrence.occurrenceKey).not.toBeUndefined();
                    expect(occurrence.readOnly).toBeFalsy();
                    expect(occurrence.referenceLine).toBeFalsy();
                    expect(occurrence.resourceKey).toBe(key);
                    expect(occurrence.scrollLeftOffset).toBe(0);
                    expect(occurrence.title).toBe(event.title);
                    expect(occurrence.theme).toBe('default');
                    expect(occurrence.to.ts).toBe(event.to.getTime());
                });
            });
        });
    });

    it('Scheduler: disabledDatesTimes, recurrence', () => {
        const start = new Date(2021, 0, 1);
        const timeSpan = {
            unit: 'year',
            span: 1
        };
        element.start = start;
        element.timeSpan = timeSpan;
        document.body.appendChild(element);
        setVisibleInterval(start, timeSpan);

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.disabledDatesTimes = [
            {
                keyFields: ['row-3'],
                title: 'Event 2',
                from: new Date(2021, 8, 2),
                to: new Date(2021, 8, 3),
                recurrence: 'daily',
                recurrenceCount: 3
            }
        ];

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(events).toHaveLength(3);
        });
    });

    // edit-dialog-labels
    // Depends on the edit and delete action flow
    it('Scheduler: dialogLabels', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = EVENTS;
        const labels = {
            title: 'Title label',
            from: 'From label',
            to: 'To label',
            resources: 'Resources label',
            saveButton: 'Save button label',
            cancelButton: 'Cancel button label'
        };
        element.dialogLabels = labels;

        return Promise.resolve()
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                event.dispatchEvent(
                    new CustomEvent('privatecontextmenu', {
                        detail: {
                            eventName: event.eventName,
                            key: event.occurrenceKey,
                            from: event.from,
                            to: event.to,
                            x: 20,
                            y: 300
                        }
                    })
                );
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                dropdown.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            name: 'edit'
                        }
                    })
                );
            })
            .then(() => {
                const titleInput = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-event-title"]'
                );
                expect(titleInput.label).toBe(labels.title);

                const dates = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-input-date-range-event-dates"]'
                );
                expect(dates.labelStartDate).toBe(labels.from);
                expect(dates.labelEndDate).toBe(labels.to);

                const resources = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-combobox-event-resources"]'
                );
                expect(resources.label).toBe(labels.resources);

                const cancelButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-cancel-edit"]'
                );
                expect(cancelButton.label).toBe(labels.cancelButton);

                const saveButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-save-edit"]'
                );
                expect(saveButton.label).toBe(labels.saveButton);
            });
    });

    it('Scheduler: dialogLabels, recurring event, edit dialog buttons', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = [
            {
                keyFields: ['row-2', 'row1'],
                name: 'event-1',
                title: 'Event 1',
                from: new Date(2021, 8, 1, 14),
                to: new Date(2021, 8, 5, 16),
                recurrence: 'daily',
                recurrenceCount: 5
            }
        ];
        const labels = {
            saveOneRecurrent: 'Save one recurrent label',
            saveAllRecurrent: 'Save all recurrent label',
            editRecurrent: 'Edit recurrent label'
        };
        element.dialogLabels = labels;

        return Promise.resolve()
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                event.dispatchEvent(
                    new CustomEvent('privatecontextmenu', {
                        detail: {
                            eventName: event.eventName,
                            key: event.occurrenceKey,
                            from: event.from,
                            to: event.to,
                            x: 20,
                            y: 300
                        }
                    })
                );
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                dropdown.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            name: 'edit'
                        }
                    })
                );
            })
            .then(() => {
                const saveMenu = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-menu-save-edit"]'
                );
                expect(saveMenu).toBeTruthy();

                const saveOne = saveMenu.querySelector(
                    '[data-element-id="lightning-menu-item-save-one"]'
                );
                expect(saveOne.label).toBe(labels.saveOneRecurrent);

                const saveAll = saveMenu.querySelector(
                    '[data-element-id="lightning-menu-item-save-all"]'
                );
                expect(saveAll.label).toBe(labels.saveAllRecurrent);
            });
    });

    it('Scheduler: dialogLabels, recurring event edit choice dialog', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = [
            {
                keyFields: ['row-2', 'row1'],
                name: 'event-1',
                title: 'Event 1',
                from: new Date(2021, 8, 2, 14),
                to: new Date(2021, 8, 5, 16),
                recurrence: 'daily',
                recurrenceCount: 5
            }
        ];
        const labels = {
            saveOneRecurrent: 'Save one recurrent label',
            saveAllRecurrent: 'Save all recurrent label',
            editRecurrent: 'Edit recurrent label',
            cancelButton: 'Cancel button label'
        };
        element.dialogLabels = labels;

        const wrapper = element.shadowRoot.querySelector(
            '.avonni-scheduler__wrapper'
        );

        return Promise.resolve()
            .then(() => {
                // Mouse down
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                event.dispatchEvent(
                    new CustomEvent('privatemousedown', {
                        detail: {
                            eventName: event.eventName,
                            key: event.occurrenceKey,
                            from: event.from,
                            to: event.to,
                            x: 0,
                            y: 0
                        }
                    })
                );
                // Mouse move
                wrapper.dispatchEvent(new CustomEvent('mousemove'));

                // Mouse up
                const mouseUp = new CustomEvent('mouseup');
                mouseUp.clientX = 0;
                mouseUp.clientY = 0;
                mouseUp.button = 0;
                wrapper.dispatchEvent(mouseUp);
            })
            .then(() => {
                const dialog = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"]'
                );
                expect(dialog).toBeTruthy();

                const paragraph = dialog.querySelector(
                    '[data-element-id="p-recurrence-dialog-description"]'
                );
                expect(paragraph.textContent).toBe(labels.editRecurrent);

                const cancelButton = dialog.querySelector(
                    '[data-element-id="lightning-button-recurrence-dialog-cancel"]'
                );
                expect(cancelButton.label).toBe(labels.cancelButton);

                const saveOneRecurrent = dialog.querySelector(
                    '[data-element-id="lightning-button-recurrence-dialog-save-one"]'
                );
                expect(saveOneRecurrent.label).toBe(labels.saveOneRecurrent);

                const saveAllRecurrent = dialog.querySelector(
                    '[data-element-id="lightning-button-recurrence-dialog-save-all"]'
                );
                expect(saveAllRecurrent.label).toBe(labels.saveAllRecurrent);

                // Make sure dialog closes after saving
                saveAllRecurrent.click();
            })
            .then(() => {
                const dialog = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"]'
                );
                expect(dialog).toBeFalsy();
            });
    });

    it('Scheduler: dialogLabels, delete confirmation dialog', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = EVENTS;
        const labels = {
            deleteButton: 'This is the delete',
            cancelButton: 'This is the cancel',
            deleteMessage: 'This is the delete message',
            deleteTitle: 'This is the title'
        };
        element.dialogLabels = labels;

        return Promise.resolve()
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                event.dispatchEvent(
                    new CustomEvent('privatecontextmenu', {
                        detail: {
                            eventName: event.eventName,
                            key: event.occurrenceKey,
                            from: event.from,
                            to: event.to,
                            x: 20,
                            y: 300
                        }
                    })
                );
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                dropdown.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            name: 'delete'
                        }
                    })
                );
            })
            .then(() => {
                const dialog = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"]'
                );
                expect(dialog.title).toBe(labels.deleteTitle);

                const deleteMessage = dialog.querySelector(
                    '[data-element-id="lightning-button-delete-description"]'
                );
                expect(deleteMessage.textContent).toBe(labels.deleteMessage);

                const deleteButton = dialog.querySelector(
                    '[data-element-id="lightning-button-delete-dialog-delete"]'
                );
                expect(deleteButton.label).toBe(labels.deleteButton);

                const cancelButton = dialog.querySelector(
                    '[data-element-id="lightning-button-delete-dialog-cancel"]'
                );
                expect(cancelButton.label).toBe(labels.cancelButton);
            });
    });

    // events
    // Depends on start, resources, and resourcesKeyField
    it('Scheduler: events', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval(START, MONTH_TIME_SPAN);

        element.resources = RESOURCES;
        element.timeSpan = MONTH_TIME_SPAN;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = EVENTS;

        return Promise.resolve().then(() => {
            const occurrences = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            EVENTS.forEach((event) => {
                event.keyFields.forEach((key) => {
                    const occurrence = Array.from(occurrences).find((occ) => {
                        return (
                            occ.resourceKey === key && occ.title === event.title
                        );
                    });
                    expect(occurrence).toBeTruthy();
                    expect(occurrence.color).toBe(event.color);
                    expect(occurrence.headerCells).not.toBeUndefined();
                    expect(occurrence.cellDuration).not.toBeUndefined();
                    expect(occurrence.cellHeight).toBe(0);
                    expect(occurrence.cellWidth).toBe(0);
                    expect(occurrence.dateFormat).toBe(element.dateFormat);
                    expect(occurrence.disabled).toBeFalsy();
                    expect(occurrence.eventData).toMatchObject(event);
                    expect(occurrence.eventName).toBe(event.name);
                    expect(occurrence.from.ts).toBe(event.from.getTime());
                    expect(occurrence.iconName).toBeUndefined();
                    expect(occurrence.labels).toMatchObject(
                        element.eventsLabels
                    );
                    expect(occurrence.occurrence).not.toBeUndefined();
                    expect(occurrence.occurrenceKey).not.toBeUndefined();
                    expect(occurrence.readOnly).toBeFalsy();
                    expect(occurrence.referenceLine).toBeFalsy();
                    expect(occurrence.resourceKey).toBe(key);
                    expect(occurrence.scrollLeftOffset).toBe(0);
                    expect(occurrence.title).toBe(event.title);
                    expect(occurrence.theme).toBe('default');
                    expect(occurrence.to.ts).toBe(event.to.getTime());
                });
            });
        });
    });

    it('Scheduler: events, recurrence', () => {
        element.start = START;
        element.timeSpan = MONTH_TIME_SPAN;
        document.body.appendChild(element);
        setVisibleInterval(START, MONTH_TIME_SPAN);

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = [
            {
                keyFields: ['row-3'],
                title: 'Event 2',
                from: new Date(2021, 8, 2),
                to: new Date(2021, 8, 3),
                recurrence: 'daily',
                recurrenceCount: 3
            }
        ];

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(events).toHaveLength(3);
        });
    });

    // events-labels
    // Depends on start, resources, events and resourcesKeyField
    it('Scheduler: eventsLabels', () => {
        element.timeSpan = MONTH_TIME_SPAN;
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval(START, MONTH_TIME_SPAN);

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        const events = [
            {
                keyFields: ['row-2', 'row1'],
                name: 'event-1',
                title: 'Event 1',
                from: new Date(2021, 8, 2),
                to: new Date(2021, 8, 3),
                labels: {
                    top: {
                        fieldName: 'from'
                    }
                }
            },
            {
                keyFields: ['row-3'],
                name: 'event-2',
                title: 'Event 2',
                from: new Date(2021, 8, 2),
                to: new Date(2021, 8, 3)
            },
            {
                keyFields: ['row-3'],
                name: 'event-3',
                title: 'Event 3',
                from: new Date(2021, 8, 3),
                to: new Date(2021, 8, 5)
            }
        ];
        element.events = events;
        const defaultLabels = {
            top: {
                fieldName: 'title',
                iconName: 'utility:user'
            },
            center: {
                value: 'Some string'
            },
            right: {
                value: 'Right label',
                iconName: 'standard:apps'
            }
        };
        element.eventsLabels = defaultLabels;

        return Promise.resolve().then(() => {
            const occurrences = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            events.forEach((event) => {
                const labelled = [];
                const nonLabelled = [];
                event.keyFields.forEach((key) => {
                    const occurrence = Array.from(occurrences).find((occ) => {
                        return (
                            occ.resourceKey === key && occ.title === event.title
                        );
                    });
                    if (event.labels) {
                        labelled.push(occurrence);
                    } else {
                        nonLabelled.push(occurrence);
                    }
                });

                labelled.forEach((occurrence) => {
                    expect(occurrence.labels).toMatchObject(event.labels);
                });
                nonLabelled.forEach((occurrence) => {
                    expect(occurrence.labels).toMatchObject(defaultLabels);
                });
            });
        });
    });

    // events-palette
    // Depends on resources, resourcesKeyField, start and events
    it('Scheduler: eventsPalette', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.events = EVENTS;
        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.eventsPalette = 'lake';
        const lake = [
            '#98c9f5',
            '#72c9bd',
            '#44c972',
            '#38ab3d',
            '#4d6719',
            '#613102'
        ];

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            event.resources.forEach((row, index) => {
                expect(row.color).toBe(lake[index]);
            });
        });
    });

    // events-theme
    // Depends on resources, resourcesKeyField, start and events
    it('Scheduler: eventsTheme', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.events = EVENTS;
        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.eventsTheme = 'line';

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            events.forEach((event) => {
                expect(event.theme).toBe('line');
            });
        });
    });

    // headers
    it('Scheduler: headers', () => {
        document.body.appendChild(element);

        const dayLetterAndWeek = [
            {
                unit: 'day',
                span: 1,
                label: 'ccccc'
            },
            {
                unit: 'week',
                span: 1,
                label: "'w.'W 'of' yyyy"
            }
        ];
        element.headers = 'dayLetterAndWeek';

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group"]'
            );
            expect(header.headers).toMatchObject(dayLetterAndWeek);
        });
    });

    // is-loading
    it('Scheduler: isLoading', () => {
        document.body.appendChild(element);

        element.isLoading = true;

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner"]'
            );
            expect(spinner).toBeTruthy();
        });
    });

    // hide-toolbar
    it('Scheduler: hideToolbar = false', () => {
        document.body.appendChild(element);

        element.hideToolbar = false;

        return Promise.resolve().then(() => {
            const toolbar = element.shadowRoot.querySelector(
                '[data-element-id="div-toolbar"]'
            );
            expect(toolbar).toBeTruthy();
        });
    });

    it('Scheduler: hideToolbar = true', () => {
        document.body.appendChild(element);

        element.hideToolbar = true;

        return Promise.resolve().then(() => {
            const toolbar = element.shadowRoot.querySelector(
                '[data-element-id="div-toolbar"]'
            );
            expect(toolbar).toBeFalsy();
        });
    });

    // loading-state-alternative-text
    // Depends on isLoading
    it('Scheduler: loadingStateAlternativeText', () => {
        document.body.appendChild(element);

        element.loadingStateAlternativeText = 'Some alternative text';
        element.isLoading = true;

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner"]'
            );
            expect(spinner.alternativeText).toBe('Some alternative text');
        });
    });

    // read-only
    // Depends on start, resources, resourcesKeyField and events
    it('Scheduler: readOnly', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = EVENTS;
        element.readOnly = true;

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            events.forEach((event) => {
                expect(event.readOnly).toBeTruthy();
            });
        });
    });

    it('Scheduler: readOnly, no default context menu on events', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = EVENTS;
        element.readOnly = true;

        return Promise.resolve()
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                event.dispatchEvent(
                    new CustomEvent('privatecontextmenu', {
                        detail: {
                            eventName: event.eventName,
                            key: event.occurrenceKey,
                            from: event.from,
                            to: event.to,
                            x: 20,
                            y: 300
                        }
                    })
                );
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                expect(dropdown).toBeFalsy();
            });
    });

    it('Scheduler: readOnly, no default context menu on empty spots', () => {
        document.body.appendChild(element);

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.readOnly = true;

        return Promise.resolve()
            .then(() => {
                const cell = element.shadowRoot.querySelector(
                    '[data-element-id="div-cell"]'
                );
                cell.dispatchEvent(
                    new CustomEvent('contextmenu', {
                        detail: {
                            x: 0,
                            y: 0
                        }
                    })
                );
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                expect(dropdown).toBeFalsy();
            });
    });

    it('Scheduler: readOnly, mouse drag', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = EVENTS;
        element.readOnly = true;

        const wrapper = element.shadowRoot.querySelector(
            '.avonni-scheduler__wrapper'
        );

        return Promise.resolve()
            .then(() => {
                // Mouse down
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                event.dispatchEvent(
                    new CustomEvent('privatemousedown', {
                        detail: {
                            eventName: event.eventName,
                            key: event.occurrenceKey,
                            from: event.from,
                            to: event.to,
                            x: 0,
                            y: 0
                        }
                    })
                );
                // Mouse move
                wrapper.dispatchEvent(new CustomEvent('mousemove'));

                // Mouse up
                const mouseUp = new CustomEvent('mouseup');
                mouseUp.clientX = 0;
                mouseUp.clientY = 0;
                mouseUp.button = 0;
                wrapper.dispatchEvent(mouseUp);
            })
            .then(() => {
                const dialog = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"]'
                );
                expect(dialog).toBeFalsy();
            });
    });

    // recurrent-edit-modes
    // Depends on start, resources, resourcesKeyField, events and the edit/save flow
    it('Scheduler: recurrentEditModes, all', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = [
            {
                keyFields: ['row-2', 'row1'],
                name: 'event-1',
                title: 'Event 1',
                from: new Date(2021, 8, 2, 14),
                to: new Date(2021, 8, 5, 16),
                recurrence: 'daily',
                recurrenceCount: 5
            }
        ];
        element.recurrentEditModes = ['all'];

        return Promise.resolve()
            .then(() => {
                // Open the context menu
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                event.dispatchEvent(
                    new CustomEvent('privatecontextmenu', {
                        detail: {
                            eventName: event.eventName,
                            key: event.occurrenceKey,
                            from: event.from,
                            to: event.to,
                            x: 0,
                            y: 0
                        }
                    })
                );
            })
            .then(() => {
                // Pick the edit menu
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                dropdown.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            name: 'edit'
                        }
                    })
                );
            })
            .then(() => {
                // Change the title
                const title = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-event-title"]'
                );
                title.value = 'Some new title';
                title.dispatchEvent(new CustomEvent('change'));

                // Save
                const saveButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-save-edit"]'
                );
                saveButton.click();
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                events.forEach((event) => {
                    expect(event.title).toBe('Some new title');
                });
            });
    });

    it('Scheduler: recurrentEditModes, one', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = [
            {
                keyFields: ['row-2', 'row1'],
                name: 'event-1',
                title: 'Event 1',
                from: new Date(2021, 8, 2, 14),
                to: new Date(2021, 8, 5, 16),
                recurrence: 'daily',
                recurrenceCount: 5
            }
        ];
        element.recurrentEditModes = ['one'];

        let from;
        let to;
        return Promise.resolve()
            .then(() => {
                // Open the context menu
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                from = event.from;
                to = event.to;
                event.dispatchEvent(
                    new CustomEvent('privatecontextmenu', {
                        detail: {
                            eventName: event.eventName,
                            key: event.occurrenceKey,
                            from: event.from,
                            to: event.to,
                            x: 0,
                            y: 0
                        }
                    })
                );
            })
            .then(() => {
                // Pick the edit menu
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                dropdown.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            name: 'edit'
                        }
                    })
                );
            })
            .then(() => {
                // Change the title
                const title = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-event-title"]'
                );
                title.value = 'Some new title';
                title.dispatchEvent(new CustomEvent('change'));

                // Save
                const saveButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-save-edit"]'
                );
                saveButton.click();
            })
            .then(() => {
                const events = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                let targetEvent;
                const otherEvents = [];
                events.forEach((event) => {
                    if (event.from === from && event.to === to) {
                        targetEvent = event;
                    } else {
                        otherEvents.push(event);
                    }
                });
                expect(targetEvent.title).toBe('Some new title');
                otherEvents.forEach((event) => {
                    expect(event.title).toBe('Event 1');
                });
            });
    });

    it('Scheduler: recurrentEditModes, no edit choice dialog when only one option', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = [
            {
                keyFields: ['row-2', 'row1'],
                name: 'event-1',
                title: 'Event 1',
                from: new Date(2021, 8, 2, 14),
                to: new Date(2021, 8, 5, 16),
                recurrence: 'daily',
                recurrenceCount: 5
            }
        ];
        element.recurrentEditModes = ['all'];

        const wrapper = element.shadowRoot.querySelector(
            '.avonni-scheduler__wrapper'
        );

        return Promise.resolve()
            .then(() => {
                // Mouse down
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                event.dispatchEvent(
                    new CustomEvent('privatemousedown', {
                        detail: {
                            eventName: event.eventName,
                            key: event.occurrenceKey,
                            from: event.from,
                            to: event.to,
                            x: 0,
                            y: 0
                        }
                    })
                );
                // Mouse move
                wrapper.dispatchEvent(new CustomEvent('mousemove'));

                // Mouse up
                const mouseUp = new CustomEvent('mouseup');
                mouseUp.clientX = 0;
                mouseUp.clientY = 0;
                mouseUp.button = 0;
                wrapper.dispatchEvent(mouseUp);
            })
            .then(() => {
                const dialog = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"]'
                );
                expect(dialog).toBeFalsy();
            });
    });

    // reference-lines
    // Depends on start, resources and resourcesKeyField
    it('Scheduler: referenceLines', () => {
        element.start = START;
        element.timeSpan = MONTH_TIME_SPAN;
        document.body.appendChild(element);
        setVisibleInterval(START, MONTH_TIME_SPAN);

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        const references = [
            {
                label: 'Reference 1',
                variant: 'success',
                date: new Date(2021, 8, 2, 14)
            },
            {
                label: 'Reference 2',
                date: new Date(2021, 8, 3, 14)
            }
        ];
        element.referenceLines = references;

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            events.forEach((event, index) => {
                expect(event.referenceLine).toBeTruthy();
                expect(event.theme).toBe(
                    references[index].variant || 'default'
                );
                expect(event.title).toBe(references[index].label);
                expect(event.from.ts).toBe(references[index].date.getTime());
                expect(event.to.ts).toBe(references[index].date.getTime() + 1);
            });
        });
    });

    it('Scheduler: referenceLines, recurrent', () => {
        element.start = START;
        element.timeSpan = MONTH_TIME_SPAN;
        document.body.appendChild(element);
        setVisibleInterval(START, MONTH_TIME_SPAN);

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        const references = [
            {
                label: 'Reference 1',
                variant: 'success',
                date: new Date(2021, 8, 2, 14),
                recurrence: 'daily',
                recurrenceCount: 5
            }
        ];
        element.referenceLines = references;

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(events).toHaveLength(5);
        });
    });

    // resize-column-disabled
    // Depends on columns, resources and resourcesKeyField
    it('Scheduler: resizeColumnDisabled = false', () => {
        document.body.appendChild(element);

        element.resizeColumnDisabled = false;
        element.columns = COLUMNS;
        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;

        const wrapper = element.shadowRoot.querySelector(
            '.avonni-scheduler__wrapper'
        );
        return Promise.resolve()
            .then(() => {
                const datatable = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-datatable"]'
                );
                expect(datatable.resizeColumnDisabled).toBeFalsy();

                // Mouse down
                const splitter = element.shadowRoot.querySelector(
                    '.avonni-scheduler__splitter'
                );
                const mouseDown = new CustomEvent('mousedown');
                mouseDown.clientX = 30;
                mouseDown.button = 0;
                splitter.dispatchEvent(mouseDown);

                // Mouse move
                const mouseMove = new CustomEvent('mousemove');
                mouseMove.clientX = 10;
                wrapper.dispatchEvent(mouseMove);

                // Mouse up
                const mouseUp = new CustomEvent('mouseup');
                mouseUp.button = 0;
                wrapper.dispatchEvent(mouseUp);
            })
            .then(() => {
                const datatableCol = element.shadowRoot.querySelector(
                    '.avonni-scheduler__first-col'
                );
                const datatable = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-datatable"]'
                );
                // The datatable will originally have a width of 0px
                expect(datatableCol.style.width).toBe('-20px');
                expect(datatable.style.width).toBe('-20px');
            });
    });

    it('Scheduler: resizeColumnDisabled = false with vertical variant', () => {
        document.body.appendChild(element);

        element.resizeColumnDisabled = false;
        element.columns = COLUMNS;
        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.variant = 'vertical';

        const wrapper = element.shadowRoot.querySelector(
            '[data-element-id="div-schedule-wrapper"]'
        );
        return Promise.resolve().then(() => {
            // Mouse down
            const splitter = element.shadowRoot.querySelector(
                '[data-element-id="div-splitter"]'
            );
            const firstCol = element.shadowRoot.querySelector(
                '[data-element-id="div-first-column"]'
            );
            const firstResourceHeaderCell = element.shadowRoot.querySelector(
                '[data-element-id="div-vertical-resource-header-first-cell"]'
            );

            const mouseDown = new CustomEvent('mousedown');
            mouseDown.clientX = 30;
            mouseDown.button = 0;
            splitter.dispatchEvent(mouseDown);
            expect(firstCol.style.width).toBe('');
            expect(firstCol.style.minWidth).toBe('');
            expect(firstResourceHeaderCell.style.width).toBe('0px');
            expect(firstResourceHeaderCell.style.minWidth).toBe('0px');

            // Mouse move
            const mouseMove = new CustomEvent('mousemove');
            mouseMove.clientX = 10;
            wrapper.dispatchEvent(mouseMove);
            expect(firstCol.style.width).toBe('-20px');
            expect(firstCol.style.minWidth).toBe('-20px');
            expect(firstResourceHeaderCell.style.width).toBe('-20px');
            expect(firstResourceHeaderCell.style.minWidth).toBe('-20px');

            // Mouse up
            const mouseUp = new CustomEvent('mouseup');
            mouseUp.button = 0;
            wrapper.dispatchEvent(mouseUp);
        });
    });

    it('Scheduler: resizeColumnDisabled = true', () => {
        document.body.appendChild(element);
        element.resizeColumnDisabled = true;

        const wrapper = element.shadowRoot.querySelector(
            '.avonni-scheduler__wrapper'
        );
        return Promise.resolve()
            .then(() => {
                const datatable = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-datatable"]'
                );
                expect(datatable.resizeColumnDisabled).toBeTruthy();

                // Mouse down
                const splitter = element.shadowRoot.querySelector(
                    '.avonni-scheduler__splitter'
                );
                expect(splitter.classList).toContain(
                    'avonni-scheduler__splitter_disabled'
                );
                const mousedown = new CustomEvent('mousedown');
                mousedown.clientX = 30;
                splitter.dispatchEvent(mousedown);

                // Mouse move
                wrapper.dispatchEvent(new CustomEvent('mousemove'));

                // Mouse up
                const mouseUp = new CustomEvent('mouseup');
                mouseUp.clientX = 100;
                mouseUp.button = 0;
                wrapper.dispatchEvent(mouseUp);
            })
            .then(() => {
                const datatableCol = element.shadowRoot.querySelector(
                    '.avonni-scheduler__first-col'
                );
                const datatable = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-datatable"]'
                );
                expect(datatableCol.style.width).toBeFalsy();
                expect(datatable.style.width).toBeFalsy();
            });
    });

    // resources
    // Depends on resourcesKeyField
    it('Scheduler: resources', () => {
        document.body.appendChild(element);

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;

        return Promise.resolve().then(() => {
            const resources = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-resource"]'
            );
            expect(resources).toHaveLength(RESOURCES.length);

            const datatable = element.shadowRoot.querySelector(
                '[data-element-id="avonni-datatable"]'
            );
            expect(datatable.records).toMatchObject(RESOURCES);
        });
    });

    // resources-key-field
    // Depends on resources
    it('Scheduler: resourcesKeyField', () => {
        document.body.appendChild(element);

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;

        return Promise.resolve().then(() => {
            const datatable = element.shadowRoot.querySelector(
                '[data-element-id="avonni-datatable"]'
            );
            expect(datatable.keyField).toBe(RESOURCES_KEY_FIELD);
        });
    });

    // start
    it('Scheduler: start', () => {
        document.body.appendChild(element);

        element.start = START;

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group"]'
            );
            expect(header.start.ts).toBe(START.getTime());
        });
    });

    // time-span
    it('Scheduler: timeSpan', () => {
        document.body.appendChild(element);

        const timeSpan = {
            unit: 'month',
            span: 3
        };
        element.timeSpan = timeSpan;

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group"]'
            );
            expect(header.timeSpan).toMatchObject(timeSpan);
        });
    });

    // toolbar-time-spans
    it('Scheduler: toolbarTimeSpans', () => {
        document.body.appendChild(element);

        const timeSpans = [
            {
                unit: 'month',
                span: 3,
                label: '3 months',
                headers: 'weekMonthAndYear'
            },
            {
                unit: 'day',
                span: 1,
                label: '1 day',
                headers: 'dayAndWeek'
            },
            {
                unit: 'hour',
                span: 6,
                label: '6 hours',
                headers: 'hourDayAndWeek'
            },
            {
                unit: 'year',
                span: 2,
                label: '2 years',
                headers: 'quartersAndYear'
            }
        ];
        element.toolbarTimeSpans = timeSpans;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-button-toolbar-time-span"]'
            );
            expect(buttons).toHaveLength(3);

            buttons.forEach((button, index) => {
                expect(button.label).toBe(timeSpans[index].label);
                expect(button.dataset.headers).toBe(timeSpans[index].headers);
                expect(Number(button.dataset.span)).toBe(timeSpans[index].span);
                expect(button.dataset.unit).toBe(timeSpans[index].unit);
            });

            expect(buttons[1].variant).toBe('brand');
            [0, 2].forEach((index) => {
                expect(buttons[index].variant).toBe('neutral');
            });

            const menu = element.shadowRoot.querySelector(
                '[data-element-id="avonni-button-menu-toolbar-spans"]'
            );
            expect(menu).toBeTruthy();
        });
    });

    // variant
    it('Scheduler: horizontal variant', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();
        jest.runAllTimers();

        element.resources = RESOURCES;
        element.columns = COLUMNS;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.variant = 'horizontal';

        return Promise.resolve().then(() => {
            expect(element.style.cssText).toBe('');
            const cell = element.shadowRoot.querySelector(
                '[data-element-id="div-cell"]'
            );
            expect(cell.classList).toContain('slds-col');

            const datatable = element.shadowRoot.querySelector(
                '[data-element-id="avonni-datatable"]'
            );
            expect(datatable).toBeTruthy();
            expect(datatable.style.marginTop).toBe('-39px');

            const firstCol = element.shadowRoot.querySelector(
                '[data-element-id="div-first-column"]'
            );
            expect(firstCol.classList).toContain(
                'avonni-scheduler__first-col_horizontal'
            );
            expect(firstCol.classList).not.toContain(
                'avonni-scheduler__first-col_vertical'
            );
            expect(firstCol.classList).not.toContain('slds-p-right_x-small');
            expect(firstCol.classList).not.toContain(
                'avonni-scheduler__grid_align-end'
            );

            const verticalHeaders = firstCol.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group"]'
            );
            expect(verticalHeaders).toBeFalsy();

            const resource = element.shadowRoot.querySelector(
                '[data-element-id="div-resource"]'
            );
            expect(resource.classList).not.toContain('slds-col');
            expect(resource.classList).not.toContain('slds-grid_vertical');

            const scheduleBody = element.shadowRoot.querySelector(
                '[data-element-id="div-schedule-body"]'
            );
            expect(scheduleBody.classList).not.toContain('slds-grid');
            expect(scheduleBody.classList).not.toContain(
                'avonni-scheduler__schedule-body_vertical'
            );
            expect(scheduleBody.style.cssText).toBe('');

            const scheduleCol = element.shadowRoot.querySelector(
                '[data-element-id="div-schedule-col"]'
            );
            expect(scheduleCol.classList).not.toContain(
                'avonni-scheduler__schedule-col_vertical'
            );

            const horizontalHeaders = scheduleCol.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group"]'
            );
            expect(horizontalHeaders).toBeTruthy();

            const splitter = element.shadowRoot.querySelector(
                '[data-element-id="div-splitter"]'
            );
            expect(splitter.classList).not.toContain(
                'avonni-scheduler__splitter_vertical'
            );

            const verticalResourceHeaders = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-vertical-resource-header"]'
            );
            expect(verticalResourceHeaders).toHaveLength(0);
        });
    });

    it('Scheduler: vertical variant', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();
        jest.runAllTimers();

        element.resources = RESOURCES;
        element.columns = COLUMNS;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            expect(element.style.cssText).toBe(
                '--avonni-scheduler-cell-height: 0px;'
            );
            const cell = element.shadowRoot.querySelector(
                '[data-element-id="div-cell"]'
            );
            expect(cell.classList).not.toContain('slds-col');

            const datatable = element.shadowRoot.querySelector(
                '[data-element-id="avonni-datatable"]'
            );
            expect(datatable).toBeFalsy();

            const firstCol = element.shadowRoot.querySelector(
                '[data-element-id="div-first-column"]'
            );
            expect(firstCol.classList).not.toContain(
                'avonni-scheduler__first-col_horizontal'
            );
            expect(firstCol.classList).toContain(
                'avonni-scheduler__first-col_vertical'
            );
            expect(firstCol.classList).toContain('slds-p-right_x-small');
            expect(firstCol.classList).toContain(
                'avonni-scheduler__grid_align-end'
            );

            const resource = element.shadowRoot.querySelector(
                '[data-element-id="div-resource"]'
            );
            expect(resource.classList).toContain('slds-col');
            expect(resource.classList).toContain('slds-grid_vertical');

            const scheduleBody = element.shadowRoot.querySelector(
                '[data-element-id="div-schedule-body"]'
            );
            expect(scheduleBody.classList).toContain('slds-grid');
            expect(scheduleBody.classList).toContain(
                'avonni-scheduler__schedule-body_vertical'
            );
            expect(scheduleBody.style.cssText).toBe(
                '--avonni-primitive-scheduler-event-reference-line-length: 0px;'
            );

            const scheduleCol = element.shadowRoot.querySelector(
                '[data-element-id="div-schedule-col"]'
            );
            expect(scheduleCol.classList).toContain(
                'avonni-scheduler__schedule-col_vertical'
            );

            const splitter = element.shadowRoot.querySelector(
                '[data-element-id="div-splitter"]'
            );
            expect(splitter.classList).toContain(
                'avonni-scheduler__splitter_vertical'
            );

            const verticalResourceHeaders = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-vertical-resource-header"]'
            );
            expect(verticalResourceHeaders).toHaveLength(RESOURCES.length);
            const firstAvatar = verticalResourceHeaders[0].querySelector(
                '[data-element-id="avonni-primitive-avatar"]'
            );
            expect(firstAvatar).toBeTruthy();
            expect(firstAvatar.src).toBe(RESOURCES[0].resourceAvatarSrc);
            expect(firstAvatar.initials).toBe(
                RESOURCES[0].resourceAvatarInitials
            );
            expect(firstAvatar.fallbackIconName).toBe(
                RESOURCES[0].resourceAvatarFallbackIconName
            );

            for (let i = 1; i < RESOURCES.length; i++) {
                const avatar = verticalResourceHeaders[i].querySelector(
                    '[data-element-id="avonni-primitive-avatar"]'
                );
                expect(avatar).toBeFalsy();
            }

            verticalResourceHeaders.forEach((res, index) => {
                const label = res.querySelector(
                    '[data-element-id="div-vertical-resource-header-label"]'
                );
                expect(label).toBeTruthy();
                expect(label.textContent).toBe(RESOURCES[index].resourceName);
            });
        });
    });

    // zoom-to-fit
    it('Scheduler: zoomToFit = false', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();
        jest.runAllTimers();

        element.resources = RESOURCES;
        element.columns = COLUMNS;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.zoomToFit = false;

        return Promise.resolve().then(() => {
            const cell = element.shadowRoot.querySelector(
                '[data-element-id="div-cell"]'
            );
            expect(cell.classList).not.toContain(
                'avonni-scheduler__cell_zoom-to-fit'
            );

            const scheduleCol = element.shadowRoot.querySelector(
                '[data-element-id="div-schedule-col"]'
            );
            expect(scheduleCol.classList).not.toContain(
                'avonni-scheduler__schedule-col_zoom-to-fit'
            );
            const scheduleNestedCol = element.shadowRoot.querySelector(
                '[data-element-id="div-schedule-nested-col"]'
            );
            expect(scheduleNestedCol.classList).not.toContain(
                'avonni-scheduler__schedule-col_zoom-to-fit'
            );
        });
    });

    it('Scheduler: zoomToFit = true', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();
        jest.runAllTimers();

        element.resources = RESOURCES;
        element.columns = COLUMNS;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.zoomToFit = true;

        return Promise.resolve().then(() => {
            const cell = element.shadowRoot.querySelector(
                '[data-element-id="div-cell"]'
            );
            expect(cell.classList).toContain(
                'avonni-scheduler__cell_zoom-to-fit'
            );

            const scheduleCol = element.shadowRoot.querySelector(
                '[data-element-id="div-schedule-col"]'
            );
            expect(scheduleCol.classList).toContain(
                'avonni-scheduler__schedule-col_zoom-to-fit'
            );
            const scheduleNestedCol = element.shadowRoot.querySelector(
                '[data-element-id="div-schedule-nested-col"]'
            );
            expect(scheduleNestedCol.classList).toContain(
                'avonni-scheduler__schedule-col_zoom-to-fit'
            );
        });
    });

    it('Scheduler: zoomToFit = true, with vertical variant', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();
        jest.runAllTimers();

        element.resources = RESOURCES;
        element.columns = COLUMNS;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.zoomToFit = true;
        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const resourceHeader = element.shadowRoot.querySelector(
                '[data-element-id="div-vertical-resource-header"]'
            );
            expect(resourceHeader.classList).toContain(
                'avonni-scheduler__vertical-resource-header-cell_zoom-to-fit'
            );
        });
    });

    /* ----- METHODS ----- */

    // createEvent
    // Depends on resources, resourcesKeyField and start
    it('Scheduler: createEvent method', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval(START);

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.createEvent(EVENTS[0]);

        return Promise.resolve().then(() => {
            const events = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            expect(events).toHaveLength(EVENTS[0].keyFields.length);
        });
    });

    // deleteEvent
    // Depends on resources, resourcesKeyField, start and events
    it('Scheduler: deleteEvent method', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = EVENTS;

        let eventName;
        return Promise.resolve()
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                eventName = event.eventName;

                element.deleteEvent(eventName);
            })
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    `[data-element-id="avonni-primitive-scheduler-event-occurrence"][data-event-name="${eventName}"]`
                );
                expect(event).toBeFalsy();
            });
    });

    // focusEvent
    // Depends on resources, resourcesKeyField, start and events
    it('Scheduler: focusEvent method', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = EVENTS;

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
            );
            const handler = jest.fn();
            event.focus = handler;

            element.focusEvent(event.eventName);
            expect(handler).toHaveBeenCalled();
        });
    });

    // goToDate
    it('Scheduler: goToDate method', () => {
        element.start = START;
        document.body.appendChild(element);

        element.goToDate(new Date(2022, 0, 1));

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group"]'
            );
            expect(header.start.ts).toBe(new Date(2022, 0, 1).getTime());
        });
    });

    // openNewEventDialog
    // Depends on resources, resourcesKeyField and start
    it('Scheduler: openNewEventDialog method', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.openNewEventDialog();

        return Promise.resolve().then(() => {
            const dialog = element.shadowRoot.querySelector(
                '[data-element-id="avonni-dialog"]'
            );
            expect(dialog).toBeTruthy();
        });
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    // actionclick
    // Depends on start, resources, resourcesKeyField and events
    it('Scheduler: actionclick event', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = EVENTS;

        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        let eventName;
        return Promise.resolve()
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                eventName = event.eventName;
                event.dispatchEvent(
                    new CustomEvent('privatecontextmenu', {
                        detail: {
                            eventName,
                            key: event.occurrenceKey,
                            from: event.from,
                            to: event.to,
                            x: 20,
                            y: 300
                        }
                    })
                );
            })
            .then(() => {
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                dropdown.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            name: 'some-action'
                        }
                    })
                );
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.name).toBe(
                    'some-action'
                );
                expect(handler.mock.calls[0][0].detail.targetName).toBe(
                    eventName
                );
            });
    });

    // eventchange
    // Depends on start, resources, resourcesKeyField and events
    it('Scheduler: eventchange event', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = [
            {
                keyFields: ['row-2'],
                name: 'event-1',
                title: 'Event 1',
                from: new Date(2021, 8, 2),
                to: new Date(2021, 8, 3),
                recurrence: 'daily',
                recurrenceCount: 4
            }
        ];

        const handler = jest.fn();
        element.addEventListener('eventchange', handler);

        let eventName;
        let from;
        let to;
        return Promise.resolve()
            .then(() => {
                // Open event context menu
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                eventName = event.eventName;
                from = event.from;
                to = event.to;
                event.dispatchEvent(
                    new CustomEvent('privatecontextmenu', {
                        detail: {
                            eventName,
                            key: event.occurrenceKey,
                            from,
                            to,
                            x: 20,
                            y: 300
                        }
                    })
                );
            })
            .then(() => {
                // Select the edit menu
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                dropdown.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            name: 'edit'
                        }
                    })
                );
            })
            .then(() => {
                const title = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-event-title"]'
                );
                title.value = 'New event title';
                title.dispatchEvent(new CustomEvent('change'));

                const resources = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-combobox-event-resources"]'
                );
                resources.dispatchEvent(
                    new CustomEvent('change', {
                        detail: {
                            value: [
                                RESOURCES[0][RESOURCES_KEY_FIELD],
                                RESOURCES[1][RESOURCES_KEY_FIELD]
                            ]
                        }
                    })
                );

                const saveButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-menu-save-edit"]'
                );
                saveButton.dispatchEvent(
                    new CustomEvent('select', {
                        cancelable: true,
                        detail: {
                            value: 'one'
                        }
                    })
                );

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.name).toBe(eventName);
                expect(
                    handler.mock.calls[0][0].detail.recurrenceDates
                ).toMatchObject({
                    from: from.toUTC().toISO(),
                    to: to.toUTC().toISO()
                });
                expect(
                    handler.mock.calls[0][0].detail.draftValues
                ).toMatchObject({
                    keyFields: [
                        RESOURCES[0][RESOURCES_KEY_FIELD],
                        RESOURCES[1][RESOURCES_KEY_FIELD]
                    ],
                    title: 'New event title'
                });
                expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
            });
    });

    // eventcreate
    // Depends on openNewEventDialog(), resources, and resourcesKeyField
    it('Scheduler: eventcreate event', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        const from = new Date(2021, 8, 2, 4).toISOString();
        const to = new Date(2021, 8, 2, 13).toISOString();
        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;

        const handler = jest.fn();
        element.addEventListener('eventcreate', handler);
        element.openNewEventDialog();

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-event-title"]'
            );
            title.value = 'New event title';
            title.dispatchEvent(new CustomEvent('change'));

            const resources = element.shadowRoot.querySelector(
                '[data-element-id="avonni-combobox-event-resources"]'
            );
            resources.dispatchEvent(
                new CustomEvent('change', {
                    detail: {
                        value: [
                            RESOURCES[0][RESOURCES_KEY_FIELD],
                            RESOURCES[1][RESOURCES_KEY_FIELD]
                        ]
                    }
                })
            );

            const dateRange = element.shadowRoot.querySelector(
                '[data-element-id="avonni-input-date-range-event-dates"]'
            );
            dateRange.dispatchEvent(
                new CustomEvent('change', {
                    detail: {
                        startDate: from,
                        endDate: to
                    }
                })
            );

            const saveButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-save-edit"]'
            );
            saveButton.click();

            expect(handler).toHaveBeenCalled();
            expect(
                handler.mock.calls[0][0].detail.event.keyFields
            ).toMatchObject([
                RESOURCES[0][RESOURCES_KEY_FIELD],
                RESOURCES[1][RESOURCES_KEY_FIELD]
            ]);
            expect(
                handler.mock.calls[0][0].detail.event.name
            ).not.toBeUndefined();
            expect(handler.mock.calls[0][0].detail.event.from).toBe(from);
            expect(handler.mock.calls[0][0].detail.event.to).toBe(to);
            expect(handler.mock.calls[0][0].detail.event.title).toBe(
                'New event title'
            );
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    // eventdelete
    // Depends on deleteEvent(), events, start, resources, and resourcesKeyField
    it('Scheduler: eventdelete event', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = EVENTS;

        const handler = jest.fn();
        element.addEventListener('eventdelete', handler);
        element.deleteEvent(EVENTS[0].name);

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.name).toBe(EVENTS[0].name);
        expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });

    // privatecellsizechange from the headers
    it('Scheduler: privatecellsizechange', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;

        return Promise.resolve().then(() => {
            const headers = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-header-group"]'
            );
            headers.dispatchEvent(
                new CustomEvent('privatecellsizechange', {
                    detail: {
                        cellSize: 56
                    }
                })
            );

            const resources = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-resource"]'
            );
            resources.forEach((res) => {
                expect(res.style.cssText).toContain(
                    '--avonni-scheduler-cell-width: 56px'
                );
            });
        });
    });

    /* ----- USER ACTIONS ----- */

    // Datatable resize
    // Depends on the splitter resize flow, resources, resourcesKeyField and columns
    it('Scheduler: User resizes a datatable column', () => {
        document.body.appendChild(element);

        element.columns = COLUMNS;
        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;

        const wrapper = element.shadowRoot.querySelector(
            '.avonni-scheduler__wrapper'
        );
        return Promise.resolve()
            .then(() => {
                // Resize the column using the splitter
                const splitter = element.shadowRoot.querySelector(
                    '.avonni-scheduler__splitter'
                );
                const mouseDown = new CustomEvent('mousedown');
                mouseDown.clientX = 30;
                mouseDown.button = 0;
                splitter.dispatchEvent(mouseDown);
                const firstCol = element.shadowRoot.querySelector(
                    '[ data-element-id="div-first-column"]'
                );
                expect(firstCol.style.width).toBe('');
                expect(firstCol.style.minWidth).toBe('');

                const mouseMove = new CustomEvent('mousemove');
                mouseMove.clientX = 10;
                wrapper.dispatchEvent(mouseMove);
                expect(firstCol.style.width).toBe('-20px');
                expect(firstCol.style.minWidth).toBe('-20px');

                const mouseUp = new CustomEvent('mouseup');
                mouseUp.button = 0;
                wrapper.dispatchEvent(mouseUp);
            })
            .then(() => {
                const datatable = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-datatable"]'
                );
                expect(datatable.style.width).toBe('-20px');

                // Send a resize event from the datatable, it should reset the datatable width
                datatable.dispatchEvent(
                    new CustomEvent('resize', {
                        detail: {
                            columnWidths: [100, 36, 48],
                            isUserTriggered: true
                        }
                    })
                );

                expect(datatable.style.width).toBeFalsy();
                const firstCol = element.shadowRoot.querySelector(
                    '[ data-element-id="div-first-column"]'
                );
                expect(firstCol.style.width).toBe('');
                expect(firstCol.style.minWidth).toBe('');
            });
    });

    // Event delete
    // Depends on resources, resourcesKeyField, events and start
    it('Scheduler: User deletes an event', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.events = EVENTS;
        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;

        let eventName;
        return Promise.resolve()
            .then(() => {
                // Open event context menu
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                eventName = event.eventName;
                event.dispatchEvent(
                    new CustomEvent('privatecontextmenu', {
                        detail: {
                            eventName,
                            key: event.occurrenceKey,
                            from: event.from,
                            to: event.to,
                            x: 20,
                            y: 300
                        }
                    })
                );
            })
            .then(() => {
                // Select the delete menu
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                dropdown.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            name: 'delete'
                        }
                    })
                );
            })
            .then(() => {
                const deleteButton = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"] lightning-button:nth-of-type(2)'
                );
                deleteButton.click();
            })
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    `[data-element-id="avonni-primitive-scheduler-event-occurrence"][data-event-name="${eventName}"]`
                );
                expect(event).toBeFalsy();
            });
    });

    // Double click
    // Depends on start, events, resources and resourcesKeyField
    it('Scheduler: User double-clicks on an event', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.events = EVENTS;
        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;

        let eventTitle;
        return Promise.resolve()
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                eventTitle = event.title;
                event.dispatchEvent(
                    new CustomEvent('privatedblclick', {
                        detail: {
                            eventName: event.eventName,
                            key: event.occurrenceKey,
                            from: event.from,
                            to: event.to,
                            x: 20,
                            y: 300
                        }
                    })
                );
            })
            .then(() => {
                const dialog = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"]'
                );
                expect(dialog).toBeTruthy();
                expect(dialog.title).toBe(eventTitle);
            });
    });

    it('Scheduler: User double-clicks on an empty spot', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;

        return Promise.resolve()
            .then(() => {
                const cell = element.shadowRoot.querySelector(
                    '[data-element-id="div-cell"]'
                );
                const doubleClick = new CustomEvent('dblclick');
                doubleClick.clientX = 0;
                doubleClick.clientY = 0;
                cell.dispatchEvent(doubleClick);
            })
            .then(() => {
                const dialog = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"]'
                );
                expect(dialog).toBeTruthy();
                expect(dialog.title).toBe(element.dialogLabels.newEventTitle);
            });
    });

    // Cancel button of the edit dialog
    // Depends on start, events, resources and resourcesKeyField
    it('Scheduler: User cancels an event edition', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = EVENTS;

        let eventName;
        let eventTitle;
        return Promise.resolve()
            .then(() => {
                // Open event context menu
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                eventName = event.eventName;
                eventTitle = event.title;
                event.dispatchEvent(
                    new CustomEvent('privatecontextmenu', {
                        detail: {
                            eventName,
                            key: event.occurrenceKey,
                            from: event.from,
                            to: event.to,
                            x: 0,
                            y: 0
                        }
                    })
                );
            })
            .then(() => {
                // Select the edit menu
                const dropdown = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                dropdown.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            name: 'edit'
                        }
                    })
                );
            })
            .then(() => {
                const titleInput = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-event-title"]'
                );
                titleInput.value = 'Some new title';
                titleInput.dispatchEvent(new CustomEvent('change'));

                const cancelButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-cancel-edit"]'
                );
                cancelButton.click();
            })
            .then(() => {
                const dialog = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"]'
                );
                expect(dialog).toBeFalsy();

                const event = element.shadowRoot.querySelector(
                    `[data-element-id="avonni-primitive-scheduler-event-occurrence"][data-event-name="${eventName}"]`
                );
                expect(event.title).toBe(eventTitle);
            });
    });

    it('Scheduler: User cancels a recurring event drag and drop', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.events = [
            {
                keyFields: ['row-2', 'row1'],
                name: 'event-1',
                title: 'Event 1',
                from: new Date(2021, 8, 2, 14),
                to: new Date(2021, 8, 5, 16),
                recurrence: 'daily',
                recurrenceCount: 5
            }
        ];

        let occurrenceKey, eventFrom;
        return Promise.resolve()
            .then(() => {
                // Mouse down
                const wrapper = element.shadowRoot.querySelector(
                    '.avonni-scheduler__wrapper'
                );
                const event = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-event-occurrence"]'
                );
                occurrenceKey = event.occurrenceKey;
                eventFrom = event.from;

                event.dispatchEvent(
                    new CustomEvent('privatemousedown', {
                        detail: {
                            eventName: event.eventName,
                            key: event.occurrenceKey,
                            from: event.from,
                            to: event.to,
                            x: 0,
                            y: 0
                        }
                    })
                );
                // Mouse move
                wrapper.dispatchEvent(new CustomEvent('mousemove'));

                // Mouse up
                const mouseUp = new CustomEvent('mouseup');
                mouseUp.clientX = 0;
                mouseUp.clientY = 0;
                mouseUp.button = 0;
                wrapper.dispatchEvent(mouseUp);
            })
            .then(() => {
                const cancelButton = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"] lightning-button'
                );
                cancelButton.click();
            })
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    `[data-element-id="avonni-primitive-scheduler-event-occurrence"][data-key="${occurrenceKey}"]`
                );
                expect(event.from).toBe(eventFrom);
            });
    });

    it('Scheduler: privatecellsizechange with vertical variant', () => {
        element.start = START;
        document.body.appendChild(element);
        setVisibleInterval();

        element.resources = RESOURCES;
        element.resourcesKeyField = RESOURCES_KEY_FIELD;
        element.variant = 'vertical';

        return Promise.resolve()
            .then(() => {
                const headers = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group"]'
                );
                headers.dispatchEvent(
                    new CustomEvent('privatecellsizechange', {
                        detail: {
                            cellSize: 56
                        }
                    })
                );
            })
            .then(() => {
                expect(element.style.cssText).toContain(
                    '--avonni-scheduler-cell-height: 56px'
                );
            });
    });

    // Toolbar
    it('Scheduler: User clicks on a toolbar time span button', () => {
        element.start = START;
        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-toolbar-time-span"][data-unit="week"]'
                );
                button.click();
            })
            .then(() => {
                const header = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group"]'
                );
                expect(header.timeSpan).toEqual({
                    unit: 'week',
                    span: 1
                });
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
                    }
                ]);
            });
    });

    it('Scheduler: User selects a date in the toolbar calendar', () => {
        element.start = START;
        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-toolbar-calendar"]'
                );
                button.click();
            })
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-toolbar"]'
                );
                calendar.dispatchEvent(
                    new CustomEvent('change', {
                        detail: {
                            value: new Date(2022, 4, 18).toISOString()
                        }
                    })
                );
            })
            .then(() => {
                const header = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group"]'
                );
                expect(header.start.ts).toBe(new Date(2022, 4, 18).getTime());
            });
    });

    it('Scheduler: The toolbar calendar closes when it looses focus', () => {
        element.start = START;
        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-toolbar-calendar"]'
                );
                button.click();
            })
            .then(() => {
                // Calendar is focused on opening
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-toolbar"]'
                );
                const spy = jest.spyOn(calendar, 'focus');
                jest.runAllTimers();
                expect(spy).toHaveBeenCalled();
            })
            .then(() => {
                // A focusout followed by a focusin won't close the calendar
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-toolbar"]'
                );
                calendar.dispatchEvent(
                    new CustomEvent('focusout', { bubbles: true })
                );
                calendar.dispatchEvent(
                    new CustomEvent('focusin', { bubbles: true })
                );
                jest.runAllTimers();
            })
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-toolbar"]'
                );
                expect(calendar).toBeTruthy();

                // A focus out alone will close the calendar
                calendar.dispatchEvent(
                    new CustomEvent('focusout', { bubbles: true })
                );
                jest.runAllTimers();
            })
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-toolbar"]'
                );
                expect(calendar).toBeFalsy();
            });
    });

    it('Scheduler: User clicks on the previous button of the toolbar', () => {
        element.start = START;
        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-toolbar-prev"]'
                );
                button.click();
            })
            .then(() => {
                const header = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group"]'
                );
                expect(header.start.ts).toBe(new Date(2021, 8, 1).getTime());
            });
    });

    it('Scheduler: User clicks on the today button of the toolbar', () => {
        element.start = START;
        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-toolbar-today"]'
                );
                button.click();
            })
            .then(() => {
                const header = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group"]'
                );
                const today = new Date().setHours(0, 0, 0, 0);
                expect(header.start.ts).toBe(today);
            });
    });

    it('Scheduler: User clicks on the next button of the toolbar', () => {
        element.start = START;
        document.body.appendChild(element);

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-toolbar-next"]'
                );
                button.click();
            })
            .then(() => {
                const header = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-header-group"]'
                );
                expect(header.start.ts).toBe(new Date(2021, 8, 3).getTime());
            });
    });
});
