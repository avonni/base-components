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
import Scheduler from 'c/scheduler';
import { DateTime } from 'c/luxon';
import {
    COLUMNS,
    ROWS,
    ROWS_KEY_FIELD,
    EVENTS,
    START,
    DISABLED_DATES_TIMES
} from './data';

// Not tested:
// getRowFromPosition() and getCellFromPosition(), because they depend on DOM measurements.
// openEditEventDialog(), because it depends on the primitive occurrences sending an event on focus.

let element;
describe('Scheduler', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-scheduler', {
            is: Scheduler
        });
    });

    it('Default attributes', () => {
        expect(element.availableDaysOfTheWeek).toMatchObject([
            0,
            1,
            2,
            3,
            4,
            5,
            6
        ]);
        expect(element.availableMonths).toMatchObject([
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11
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
        expect(element.editDialogLabels).toMatchObject({
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
            newEventTitle: 'New event'
        });
        expect(element.events).toMatchObject([]);
        expect(element.eventsLabels).toMatchObject({
            center: { fieldName: 'title' }
        });
        expect(element.eventsPalette).toBe('aurora');
        expect(element.eventsTheme).toBe('default');
        expect(element.headers).toBe('hourAndDay');
        expect(element.isLoading).toBeFalsy();
        expect(element.loadingStateAlternativeText).toBe('Loading');
        expect(element.readOnly).toBeFalsy();
        expect(element.recurrentEditModes).toMatchObject(['all', 'one']);
        expect(element.referenceLines).toMatchObject([]);
        expect(element.resizeColumnDisabled).toBeFalsy();
        expect(element.rows).toMatchObject([]);
        expect(element.rowsKeyField).toBeUndefined();
        expect(element.start).toBeInstanceOf(DateTime);
        expect(element.timeSpan).toMatchObject({ unit: 'hour', span: 12 });
    });

    /* ----- ATTRIBUTES ----- */

    // available-days-of-the-week
    it('availableDaysOfTheWeek', () => {
        document.body.appendChild(element);
        element.availableDaysOfTheWeek = [0, 1];

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                'c-primitive-scheduler-header-group'
            );
            expect(header.availableDaysOfTheWeek).toMatchObject([0, 1]);
        });
    });

    // available-months
    it('availableMonths', () => {
        document.body.appendChild(element);
        element.availableMonths = [0, 1];

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                'c-primitive-scheduler-header-group'
            );
            expect(header.availableMonths).toMatchObject([0, 1]);
        });
    });

    // available-time-frames
    it('availableTimeFrames', () => {
        document.body.appendChild(element);
        element.availableTimeFrames = ['12:00-17:00', '20:30-21:15'];

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                'c-primitive-scheduler-header-group'
            );
            expect(header.availableTimeFrames).toMatchObject([
                '12:00-17:00',
                '20:30-21:15'
            ]);
        });
    });

    // collapse-disabled
    // Depends on rows, rowsKeyField and columns
    it('collapseDisabled = false', () => {
        document.body.appendChild(element);
        element.collapseDisabled = false;

        return Promise.resolve().then(() => {
            const splitterIcons = element.shadowRoot.querySelectorAll(
                '.avonni-scheduler__splitter-icon'
            );
            expect(splitterIcons).toHaveLength(2);
        });
    });

    it('collapseDisabled = true', () => {
        document.body.appendChild(element);
        element.collapseDisabled = true;

        return Promise.resolve().then(() => {
            const splitterIcons = element.shadowRoot.querySelectorAll(
                '.avonni-scheduler__splitter-icon'
            );
            expect(splitterIcons).toHaveLength(0);
        });
    });

    it('collapse and open datatable column', () => {
        element.rows = ROWS;
        element.rowsKeyField = ROWS_KEY_FIELD;
        element.columns = COLUMNS;
        document.body.appendChild(element);

        const datatableCol = element.shadowRoot.querySelector(
            '.avonni-scheduler__datatable-col'
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
                    'avonni-scheduler__datatable-col_hidden'
                );
                expect(datatableCol.classList).not.toContain(
                    'avonni-scheduler__datatable-col_open'
                );

                leftIcon.click();
            })
            .then(() => {
                // Collapse
                expect(datatableCol.classList).toContain(
                    'avonni-scheduler__datatable-col_hidden'
                );
                expect(datatableCol.classList).not.toContain(
                    'avonni-scheduler__datatable-col_open'
                );

                rightIcon.click();
            })
            .then(() => {
                // Reset to initial state
                expect(datatableCol.classList).not.toContain(
                    'avonni-scheduler__datatable-col_hidden'
                );
                expect(datatableCol.classList).not.toContain(
                    'avonni-scheduler__datatable-col_open'
                );

                rightIcon.click();
            })
            .then(() => {
                // Open
                expect(datatableCol.classList).not.toContain(
                    'avonni-scheduler__datatable-col_hidden'
                );
                expect(datatableCol.classList).toContain(
                    'avonni-scheduler__datatable-col_open'
                );
            });
    });

    // columns
    it('columns', () => {
        document.body.appendChild(element);
        element.columns = COLUMNS;

        return Promise.resolve().then(() => {
            const datatable = element.shadowRoot.querySelector('c-datatable');
            expect(datatable.columns).toMatchObject(COLUMNS);
        });
    });

    // context-menu-event-actions
    // Depends on start, events, columns, rows and rowsKeyField
    it('contextMenuEventActions', () => {
        document.body.appendChild(element);

        element.start = START;
        element.rows = ROWS;
        element.rowsKeyField = ROWS_KEY_FIELD;
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
                    'c-primitive-scheduler-event-occurrence'
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
                    'c-primitive-dropdown-menu'
                );
                expect(dropdown).toBeTruthy();
                expect(dropdown.items).toMatchObject(menu);
                expect(dropdown.style.top).toBe('300px');
                expect(dropdown.style.left).toBe('20px');
            });
    });

    it('contextMenuEventActions, default edit action', () => {
        document.body.appendChild(element);

        element.start = START;
        element.rows = ROWS;
        element.rowsKeyField = ROWS_KEY_FIELD;
        element.events = EVENTS;

        let title;
        return Promise.resolve()
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    'c-primitive-scheduler-event-occurrence'
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
                    'c-primitive-dropdown-menu'
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
                const dialog = element.shadowRoot.querySelector('c-dialog');
                expect(dialog).toBeTruthy();
                expect(dialog.title).toBe(title);
            });
    });

    it('contextMenuEventActions, default delete action', () => {
        document.body.appendChild(element);

        element.start = START;
        element.rows = ROWS;
        element.rowsKeyField = ROWS_KEY_FIELD;
        element.events = EVENTS;

        let occurrenceKey;
        return Promise.resolve()
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    'c-primitive-scheduler-event-occurrence'
                );
                occurrenceKey = event.occurrenceKey;
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
                    'c-primitive-dropdown-menu'
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
                const event = element.shadowRoot.querySelector(
                    `c-primitive-scheduler-event-occurrence[data-key="${occurrenceKey}"]`
                );
                expect(event).toBeFalsy();
            });
    });

    // context-menu-empty-spot-actions
    // Depends on rows and rowsKeyField
    it('contextMenuEmptySpotActions', () => {
        document.body.appendChild(element);

        element.rows = ROWS;
        element.rowsKeyField = ROWS_KEY_FIELD;
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
                    '.avonni-scheduler__cell'
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
                    'c-primitive-dropdown-menu'
                );
                expect(dropdown).toBeTruthy();
                expect(dropdown.items).toMatchObject(menu);
                expect(dropdown.style.top).toBe('0px');
                expect(dropdown.style.left).toBe('0px');
            });
    });

    it('contextMenuEmptySpotActions, default add-event action (+ editDialogLabels.newEventTitle)', () => {
        document.body.appendChild(element);

        element.rows = ROWS;
        element.rowsKeyField = ROWS_KEY_FIELD;
        element.editDialogLabels = {
            newEventTitle: 'Title of the new event'
        };

        return Promise.resolve()
            .then(() => {
                const cell = element.shadowRoot.querySelector(
                    '.avonni-scheduler__cell'
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
                    'c-primitive-dropdown-menu'
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
                const dialog = element.shadowRoot.querySelector('c-dialog');
                expect(dialog).toBeTruthy();
                expect(dialog.title).toBe('Title of the new event');
            });
    });

    // custom-events-palette
    // Depends on rows, rowsKeyField, start and events
    it('customEventsPalette', () => {
        document.body.appendChild(element);

        element.start = START;
        element.events = EVENTS;
        element.rows = ROWS;
        element.rowsKeyField = ROWS_KEY_FIELD;
        const palette = ['#333', '#444', '#555'];
        element.customEventsPalette = palette;

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                'c-primitive-scheduler-event-occurrence'
            );
            event.rows.forEach((row, index) => {
                expect(row.color).toBe(palette[index]);
            });
        });
    });

    // custom-headers
    it('customHeaders', () => {
        document.body.appendChild(element);

        const headers = [
            {
                unit: 'year',
                label: 'yy',
                span: '2'
            },
            {
                unit: 'day',
                label: 'dd',
                span: '1'
            }
        ];
        element.customHeaders = headers;

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                'c-primitive-scheduler-header-group'
            );
            expect(header.headers).toMatchObject(headers);
        });
    });

    // date-format
    // Depends on start, events, rows and rowsKeyField
    it('dateFormat', () => {
        document.body.appendChild(element);

        element.start = START;
        element.rows = ROWS;
        element.rowsKeyField = ROWS_KEY_FIELD;
        element.events = EVENTS;
        element.dateFormat = 'hh:mm';

        return Promise.resolve().then(() => {
            const event = element.shadowRoot.querySelector(
                'c-primitive-scheduler-event-occurrence'
            );
            expect(event.dateFormat).toBe('hh:mm');
        });
    });

    it('dateFormat (detail popover)', () => {
        element.start = START;
        document.body.appendChild(element);

        element.rows = ROWS;
        element.rowsKeyField = ROWS_KEY_FIELD;
        element.events = EVENTS;
        element.dateFormat = 'HH:mm';

        let event;
        return Promise.resolve()
            .then(() => {
                event = element.shadowRoot.querySelector(
                    'c-primitive-scheduler-event-occurrence'
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
                expect(to.textContent).toBe('00:00');
            });
    });

    // disabled-dates-times
    // Depends on start, rows and rowsKeyField
    it('disabledDatesTimes', () => {
        element.start = START;
        document.body.appendChild(element);

        element.rows = ROWS;
        element.rowsKeyField = ROWS_KEY_FIELD;
        element.disabledDatesTimes = DISABLED_DATES_TIMES;

        return Promise.resolve().then(() => {
            const occurrences = element.shadowRoot.querySelectorAll(
                'c-primitive-scheduler-event-occurrence'
            );
            DISABLED_DATES_TIMES.forEach((event) => {
                event.keyFields.forEach((key) => {
                    const occurrence = Array.from(occurrences).find((occ) => {
                        return occ.rowKey === key && occ.title === event.title;
                    });
                    expect(occurrence).toBeTruthy();
                    expect(occurrence.color).toBeUndefined();
                    expect(occurrence.columns).not.toBeUndefined();
                    expect(occurrence.columnDuration).not.toBeUndefined();
                    expect(occurrence.columnWidth).toBe(0);
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
                    expect(occurrence.rowKey).toBe(key);
                    expect(occurrence.scrollLeftOffset).toBe(0);
                    expect(occurrence.title).toBe(event.title);
                    expect(occurrence.theme).toBe('default');
                    expect(occurrence.to.ts).toBe(event.to.getTime());
                });
            });
        });
    });

    it('disabledDatesTimes, recurrence', () => {
        element.start = START;
        document.body.appendChild(element);

        element.rows = ROWS;
        element.rowsKeyField = ROWS_KEY_FIELD;
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
                'c-primitive-scheduler-event-occurrence'
            );
            expect(events).toHaveLength(3);
        });
    });

    // edit-dialog-labels
    // Depends on the edit action flow
    it('editDialogLabels', () => {
        document.body.appendChild(element);

        element.start = START;
        element.rows = ROWS;
        element.rowsKeyField = ROWS_KEY_FIELD;
        element.events = EVENTS;
        const labels = {
            title: 'Title label',
            from: 'From label',
            to: 'To label',
            resources: 'Resources label',
            saveButton: 'Save button label',
            cancelButton: 'Cancel button label',
            deleteButton: 'Delete button label'
        };
        element.editDialogLabels = labels;

        return Promise.resolve()
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    'c-primitive-scheduler-event-occurrence'
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
                    'c-primitive-dropdown-menu'
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
                    'c-dialog lightning-input'
                );
                expect(titleInput.label).toBe(labels.title);

                const dates = element.shadowRoot.querySelector(
                    'c-dialog c-input-date-range'
                );
                expect(dates.labelStartDate).toBe(labels.from);
                expect(dates.labelEndDate).toBe(labels.to);

                const resources = element.shadowRoot.querySelector(
                    'c-dialog c-combobox'
                );
                expect(resources.label).toBe(labels.resources);

                const cancelButton = element.shadowRoot.querySelector(
                    'c-dialog lightning-button'
                );
                expect(cancelButton.label).toBe(labels.cancelButton);

                const deleteButton = element.shadowRoot.querySelector(
                    'c-dialog lightning-button:nth-of-type(2)'
                );
                expect(deleteButton.label).toBe(labels.deleteButton);

                const saveButton = element.shadowRoot.querySelector(
                    'c-dialog lightning-button:last-of-type'
                );
                expect(saveButton.label).toBe(labels.saveButton);
            });
    });

    it('editDialogLabels, recurring event, edit dialog buttons', () => {
        document.body.appendChild(element);

        element.start = START;
        element.rows = ROWS;
        element.rowsKeyField = ROWS_KEY_FIELD;
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
            editRecurrent: 'Edit recurrent label'
        };
        element.editDialogLabels = labels;

        return Promise.resolve()
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    'c-primitive-scheduler-event-occurrence'
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
                    'c-primitive-dropdown-menu'
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
                    'c-dialog lightning-button-menu'
                );
                expect(saveMenu).toBeTruthy();

                const saveOne = saveMenu.querySelector('lightning-menu-item');
                expect(saveOne.label).toBe(labels.saveOneRecurrent);

                const saveAll = saveMenu.querySelector(
                    'lightning-menu-item:last-of-type'
                );
                expect(saveAll.label).toBe(labels.saveAllRecurrent);
            });
    });

    it('editDialogLabels, recurring event edit choice dialog', () => {
        document.body.appendChild(element);

        element.start = START;
        element.rows = ROWS;
        element.rowsKeyField = ROWS_KEY_FIELD;
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
        element.editDialogLabels = labels;

        const wrapper = element.shadowRoot.querySelector(
            '.avonni-scheduler__wrapper'
        );

        return Promise.resolve()
            .then(() => {
                // Mouse down
                const event = element.shadowRoot.querySelector(
                    'c-primitive-scheduler-event-occurrence'
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
                const dialog = element.shadowRoot.querySelector('c-dialog');
                expect(dialog).toBeTruthy();

                const paragraph = dialog.querySelector('p');
                expect(paragraph.textContent).toBe(labels.editRecurrent);

                const cancelButton = dialog.querySelector('lightning-button');
                expect(cancelButton.label).toBe(labels.cancelButton);

                const saveOneRecurrent = dialog.querySelector(
                    'lightning-button:nth-of-type(2)'
                );
                expect(saveOneRecurrent.label).toBe(labels.saveOneRecurrent);

                const saveAllRecurrent = dialog.querySelector(
                    'lightning-button:last-of-type'
                );
                expect(saveAllRecurrent.label).toBe(labels.saveAllRecurrent);
            });
    });

    // events
    // Depends on start, rows, and rowsKeyField
    it('events', () => {
        element.start = START;
        document.body.appendChild(element);

        element.rows = ROWS;
        element.rowsKeyField = ROWS_KEY_FIELD;
        element.events = EVENTS;

        return Promise.resolve().then(() => {
            const occurrences = element.shadowRoot.querySelectorAll(
                'c-primitive-scheduler-event-occurrence'
            );
            EVENTS.forEach((event) => {
                event.keyFields.forEach((key) => {
                    const occurrence = Array.from(occurrences).find((occ) => {
                        return occ.rowKey === key && occ.title === event.title;
                    });
                    expect(occurrence).toBeTruthy();
                    expect(occurrence.color).toBe(event.color);
                    expect(occurrence.columns).not.toBeUndefined();
                    expect(occurrence.columnDuration).not.toBeUndefined();
                    expect(occurrence.columnWidth).toBe(0);
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
                    expect(occurrence.rowKey).toBe(key);
                    expect(occurrence.scrollLeftOffset).toBe(0);
                    expect(occurrence.title).toBe(event.title);
                    expect(occurrence.theme).toBe('default');
                    expect(occurrence.to.ts).toBe(event.to.getTime());
                });
            });
        });
    });

    it('events, recurrence', () => {
        element.start = START;
        document.body.appendChild(element);

        element.rows = ROWS;
        element.rowsKeyField = ROWS_KEY_FIELD;
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
                'c-primitive-scheduler-event-occurrence'
            );
            expect(events).toHaveLength(3);
        });
    });

    /* ----- EVENTS ----- */

    // actionclick
    // Depends on start, rows, rowsKeyField and events
    it('actionclick event', () => {
        document.body.appendChild(element);

        element.start = START;
        element.rows = ROWS;
        element.rowsKeyField = ROWS_KEY_FIELD;
        element.events = EVENTS;

        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        let eventName;
        return Promise.resolve()
            .then(() => {
                const event = element.shadowRoot.querySelector(
                    'c-primitive-scheduler-event-occurrence'
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
                    'c-primitive-dropdown-menu'
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
});

// expect(element.events).toMatchObject([]);
// expect(element.eventsLabels).toMatchObject({ center: { fieldName: 'title' } });
// expect(element.eventsPalette).toBe('aurora');
// expect(element.eventsTheme).toBe('default');
// expect(element.headers).toBe('hourAndDay');
// expect(element.isLoading).toBeFalsy();
// expect(element.loadingStateAlternativeText).toBe('Loading');
// expect(element.readOnly).toBeFalsy();
// expect(element.recurrentEditModes).toMatchObject(['all', 'one']);
// expect(element.referenceLines).toMatchObject([]);
// expect(element.resizeColumnDisabled).toBeFalsy();
// expect(element.rows).toMatchObject([]);
// expect(element.rowsKeyField).toBeUndefined();
// expect(element.start).toBeInstanceOf(DateTime);
// expect(element.timeSpan).toMatchObject({ unit: 'hour', span: 12 });
