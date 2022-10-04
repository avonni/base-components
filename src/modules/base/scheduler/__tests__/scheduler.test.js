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
import { DateTime } from 'c/luxon';
import {
    ACTIONS,
    COLUMNS,
    RESOURCES,
    RECURRING_EVENT,
    EVENTS,
    MONTH_TIME_SPAN,
    TIME_SPANS
} from './data';

// Not tested:
// - Context menu popover positionning, because it depends on DOM measurements

let element;
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
        document.body.appendChild(element);

        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => {
                cb();
            }, 0);
        });
    });

    it('Scheduler: Default attributes', () => {
        expect(element.availableDaysOfTheWeek).toEqual([0, 1, 2, 3, 4, 5, 6]);
        expect(element.availableMonths).toEqual([
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11
        ]);
        expect(element.availableTimeFrames).toEqual(['00:00-23:59']);
        expect(element.collapseDisabled).toBeFalsy();
        expect(element.columns).toEqual([
            {
                label: 'Resource',
                fieldName: 'avatarSrc',
                type: 'avatar',
                typeAttributes: {
                    alternativeText: { fieldName: 'name' },
                    fallbackIconName: { fieldName: 'avatarFallbackIconName' },
                    initials: { fieldName: 'avatarInitials' },
                    primaryText: { fieldName: 'label' }
                }
            }
        ]);
        expect(element.contextMenuEmptySpotActions).toEqual([]);
        expect(element.contextMenuEventActions).toEqual([]);
        expect(element.customEventsPalette).toEqual([]);
        expect(element.dateFormat).toBe('ff');
        expect(element.dialogLabels).toEqual({
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
        expect(element.disabledDatesTimes).toEqual([]);
        expect(element.events).toEqual([]);
        expect(element.eventsLabels).toEqual({
            center: { fieldName: 'title' }
        });
        expect(element.eventsPalette).toBe('aurora');
        expect(element.eventsTheme).toBe('default');
        expect(element.hiddenDisplays).toEqual([]);
        expect(element.hideToolbar).toBeFalsy();
        expect(element.isLoading).toBeFalsy();
        expect(element.loadingStateAlternativeText).toBe('Loading');
        expect(element.readOnly).toBeFalsy();
        expect(element.recurrentEditModes).toEqual(['all', 'one']);
        expect(element.referenceLines).toEqual([]);
        expect(element.resizeColumnDisabled).toBeFalsy();
        expect(element.resources).toEqual([]);
        expect(element.selectedDisplay).toBe('timeline');
        expect(element.selectedResources).toEqual([]);
        expect(element.selectedTimeSpan).toBe('Standard.Scheduler.DayTimeSpan');
        expect(element.start).toBeInstanceOf(DateTime);
        expect(element.timeSpans).toEqual([
            {
                headers: 'hourAndDay',
                label: 'Day',
                name: 'Standard.Scheduler.DayTimeSpan',
                span: 1,
                unit: 'day'
            },
            {
                headers: 'hourAndDay',
                label: 'Week',
                name: 'Standard.Scheduler.WeekTimeSpan',
                span: 1,
                unit: 'week'
            },
            {
                headers: 'dayAndMonth',
                label: 'Month',
                name: 'Standard.Scheduler.MonthTimeSpan',
                span: 1,
                unit: 'month'
            },
            {
                headers: 'dayAndMonth',
                label: 'Year',
                name: 'Standard.Scheduler.YearTimeSpan',
                span: 1,
                unit: 'year'
            }
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
        element.availableDaysOfTheWeek = [3, 4, 6];

        return Promise.resolve()
            .then(() => {
                const toolbarCalendarButton = element.shadowRoot.querySelector(
                    '[data-element-id="button-toolbar-calendar"]'
                );
                toolbarCalendarButton.dispatchEvent(new CustomEvent('click'));
            })
            .then(() => {
                const toolbarCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-toolbar"]'
                );
                expect(toolbarCalendar.disabledDates).toEqual([
                    'Sun',
                    'Mon',
                    'Tue',
                    'Fri'
                ]);
            });
    });

    it('Scheduler: availableDaysOfTheWeek, agenda display', () => {
        element.selectedDisplay = 'agenda';
        element.availableDaysOfTheWeek = [3, 4];

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            expect(agenda.availableDaysOfTheWeek).toEqual([3, 4]);
        });
    });

    it('Scheduler: availableDaysOfTheWeek, calendar display', () => {
        element.selectedDisplay = 'calendar';
        element.availableDaysOfTheWeek = [3, 4];

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar.availableDaysOfTheWeek).toEqual([3, 4]);
        });
    });

    it('Scheduler: availableDaysOfTheWeek, timeline display', () => {
        element.selectedDisplay = 'timeline';
        element.availableDaysOfTheWeek = [3, 4];
        element.selectedResources = [RESOURCES[0].name];
        element.resources = RESOURCES;

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline.availableDaysOfTheWeek).toEqual([3, 4]);
        });
    });

    // available-months
    it('Scheduler: availableMonths, agenda display', () => {
        element.selectedDisplay = 'agenda';
        element.availableMonths = [1, 2, 5];

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            expect(agenda.availableMonths).toEqual([1, 2, 5]);
        });
    });

    it('Scheduler: availableMonths, calendar display', () => {
        element.selectedDisplay = 'calendar';
        element.availableMonths = [1, 2, 5];

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar.availableMonths).toEqual([1, 2, 5]);
        });
    });

    it('Scheduler: availableMonths, timeline display', () => {
        element.selectedDisplay = 'timeline';
        element.availableMonths = [1, 2, 5];
        element.selectedResources = [RESOURCES[0].name];
        element.resources = RESOURCES;

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline.availableMonths).toEqual([1, 2, 5]);
        });
    });

    // available-time-frames
    it('Scheduler: availableTimeFrames, agenda display', () => {
        element.selectedDisplay = 'agenda';
        element.availableTimeFrames = ['12:50-16:00', '08:09-10:04'];

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            expect(agenda.availableTimeFrames).toEqual([
                '12:50-16:00',
                '08:09-10:04'
            ]);
        });
    });

    it('Scheduler: availableTimeFrames, calendar display', () => {
        element.selectedDisplay = 'calendar';
        element.availableTimeFrames = ['12:50-16:00', '08:09-10:04'];

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar.availableTimeFrames).toEqual([
                '12:50-16:00',
                '08:09-10:04'
            ]);
        });
    });

    it('Scheduler: availableTimeFrames, timeline display', () => {
        element.selectedDisplay = 'timeline';
        element.availableTimeFrames = ['12:50-16:00', '08:09-10:04'];
        element.selectedResources = [RESOURCES[0].name];
        element.resources = RESOURCES;

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline.availableTimeFrames).toEqual([
                '12:50-16:00',
                '08:09-10:04'
            ]);
        });
    });

    // collapse-disabled
    it('Scheduler: collapseDisabled, agenda display', () => {
        element.selectedDisplay = 'agenda';
        element.collapseDisabled = true;

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            expect(agenda.collapseDisabled).toBeTruthy();
        });
    });

    it('Scheduler: collapseDisabled, calendar display', () => {
        element.selectedDisplay = 'calendar';
        element.collapseDisabled = true;

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar.collapseDisabled).toBeTruthy();
        });
    });

    it('Scheduler: collapseDisabled, timeline display', () => {
        element.selectedDisplay = 'timeline';
        element.collapseDisabled = true;
        element.selectedResources = [RESOURCES[0].name];
        element.resources = RESOURCES;

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline.collapseDisabled).toBeTruthy();
        });
    });

    // columns
    it('Scheduler: columns', () => {
        element.selectedResources = [RESOURCES[0].name];
        element.resources = RESOURCES;
        element.selectedDisplay = 'timeline';
        element.columns = COLUMNS;

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline.columns).toEqual(COLUMNS);
        });
    });

    // context-menu-empty-spot-actions
    it('Scheduler: contextMenuEmptySpotActions', () => {
        element.selectedResources = [RESOURCES[0].name];
        element.resources = RESOURCES;
        element.selectedDisplay = 'timeline';
        element.contextMenuEmptySpotActions = ACTIONS;

        return Promise.resolve()
            .then(() => {
                const timeline = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-timeline"]'
                );
                timeline.dispatchEvent(
                    new CustomEvent('emptyspotcontextmenu', {
                        detail: { selection: {} }
                    })
                );
            })
            .then(() => {
                const menu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                expect(menu.items).toEqual(ACTIONS);
            });
    });

    it('Scheduler: contextMenuEmptySpotActions are displayed even if the scheduler is read-only', () => {
        element.selectedResources = [RESOURCES[0].name];
        element.resources = RESOURCES;
        element.selectedDisplay = 'timeline';
        element.contextMenuEmptySpotActions = ACTIONS;
        element.readOnly = true;

        return Promise.resolve()
            .then(() => {
                const timeline = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-timeline"]'
                );
                timeline.dispatchEvent(
                    new CustomEvent('emptyspotcontextmenu', {
                        detail: { selection: {} }
                    })
                );
            })
            .then(() => {
                const menu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                expect(menu.items).toEqual(ACTIONS);
            });
    });

    // context-menu-event-actions
    it('Scheduler: contextMenuEventActions', () => {
        element.selectedDisplay = 'calendar';
        element.contextMenuEventActions = ACTIONS;

        return Promise.resolve()
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                const selectSpy = jest
                    .spyOn(calendar, 'selectEvent')
                    .mockImplementation(() => {
                        return {};
                    });
                const detail = {};
                calendar.dispatchEvent(
                    new CustomEvent('eventcontextmenu', {
                        detail
                    })
                );
                expect(selectSpy).toHaveBeenCalledWith(detail);
            })
            .then(() => {
                const menu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                expect(menu.items).toEqual(ACTIONS);
            });
    });

    it('Scheduler: contextMenuEventActions are displayed even if the scheduler is read-only', () => {
        element.selectedDisplay = 'calendar';
        element.contextMenuEventActions = ACTIONS;
        element.readOnly = true;

        return Promise.resolve()
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                const selectSpy = jest
                    .spyOn(calendar, 'selectEvent')
                    .mockImplementation(() => {
                        return {};
                    });
                const detail = {};
                calendar.dispatchEvent(
                    new CustomEvent('eventcontextmenu', {
                        detail
                    })
                );
                expect(selectSpy).toHaveBeenCalledWith(detail);
            })
            .then(() => {
                const menu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                expect(menu.items).toEqual(ACTIONS);
            });
    });

    // custom-events-palette
    it('Scheduler: customEventsPalette', () => {
        element.selectedResources = [RESOURCES[0].name];
        element.resources = RESOURCES;
        element.selectedDisplay = 'timeline';
        element.customEventsPalette = ['#333', '#444444'];

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline.resources[0].color).toBe('#333');
            expect(timeline.resources[1].color).toBe('#444444');
            expect(timeline.resources[2].color).toBe('#333');
        });
    });

    // date-format
    it('Scheduler: dateFormat, agenda display', () => {
        element.selectedDisplay = 'agenda';
        element.dateFormat = 'dd, yyyy';

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            expect(agenda.dateFormat).toBe('dd, yyyy');
        });
    });

    it('Scheduler: dateFormat, calendar display', () => {
        element.selectedDisplay = 'calendar';
        element.dateFormat = 'dd, yyyy';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar.dateFormat).toBe('dd, yyyy');
        });
    });

    it('Scheduler: dateFormat, timeline display', () => {
        element.selectedDisplay = 'timeline';
        element.dateFormat = 'dd, yyyy';
        element.selectedResources = [RESOURCES[0].name];
        element.resources = RESOURCES;

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline.dateFormat).toBe('dd, yyyy');
        });
    });

    it('Scheduler: dateFormat, event detail popover', () => {
        element.selectedDisplay = 'agenda';
        element.dateFormat = 'dd/LL/yyyy, T';
        element.start = new Date(2022, 10, 4);

        return Promise.resolve()
            .then(() => {
                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                jest.spyOn(agenda, 'selectEvent').mockImplementation(() => {
                    return {
                        occurrence: {
                            from: DateTime.fromJSDate(new Date(2022, 9, 4, 10)),
                            to: DateTime.fromJSDate(new Date(2022, 9, 4, 11))
                        }
                    };
                });
                agenda.dispatchEvent(new CustomEvent('eventmouseenter'));
            })
            .then(() => {
                const from = element.shadowRoot.querySelector(
                    '[data-element-id="div-event-detail-from"]'
                );
                const to = element.shadowRoot.querySelector(
                    '[data-element-id="div-event-detail-to"]'
                );
                expect(from.textContent).toBe('04/10/2022, 10:00');
                expect(to.textContent).toBe('04/10/2022, 11:00');
            });
    });

    // dialog-labels
    it('Scheduler: dialogLabels, edit event popover', () => {
        const labels = {
            newEventTitle: 'Some new event title',
            title: 'Title label',
            from: 'From label',
            to: 'To label',
            resources: 'Resources label',
            cancelButton: 'Cancel label',
            saveButton: 'Save label'
        };
        element.selectedDisplay = 'agenda';
        element.dialogLabels = labels;
        element.resources = RESOURCES;

        return Promise.resolve()
            .then(() => {
                // Open the edit event popover
                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                agenda.dispatchEvent(
                    new CustomEvent('openeditdialog', {
                        detail: {
                            selection: {
                                event: {},
                                occurrence: {}
                            }
                        }
                    })
                );
            })
            .then(() => {
                const dialog = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"]'
                );
                const title = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-event-title"]'
                );
                const dateRange = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-input-date-range-event-dates"]'
                );
                const resources = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-combobox-event-resources"]'
                );
                const cancelButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-cancel-edit"]'
                );
                const saveButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-save-edit"]'
                );
                expect(dialog.title).toBe(labels.newEventTitle);
                expect(title.label).toBe(labels.title);
                expect(dateRange.labelStartDate).toBe(labels.from);
                expect(dateRange.labelEndDate).toBe(labels.to);
                expect(resources.label).toBe(labels.resources);
                expect(cancelButton.label).toBe(labels.cancelButton);
                expect(saveButton.label).toBe(labels.saveButton);
            });
    });

    it('Scheduler: dialogLabels, edit recurrent event popover', () => {
        const labels = {
            saveButton: 'Save label',
            saveOneRecurrent: 'Save one recurrent label',
            saveAllRecurrent: 'Save all recurrent label'
        };
        element.selectedDisplay = 'calendar';
        element.dialogLabels = labels;

        return Promise.resolve()
            .then(() => {
                // Open the edit event popover
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                calendar.dispatchEvent(
                    new CustomEvent('openeditdialog', {
                        detail: {
                            selection: {
                                event: RECURRING_EVENT,
                                occurrence: {}
                            }
                        }
                    })
                );
            })
            .then(() => {
                const saveButtonMenu = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-menu-save-edit"]'
                );
                const saveOneButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-menu-item-save-one"]'
                );
                const saveAllButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-menu-item-save-all"]'
                );
                expect(saveButtonMenu.label).toBe(labels.saveButton);
                expect(saveOneButton.label).toBe(labels.saveOneRecurrent);
                expect(saveAllButton.label).toBe(labels.saveAllRecurrent);
            });
    });

    it('Scheduler: dialogLabels, save recurrent event popover', () => {
        const labels = {
            editRecurrent: 'Edit recurrent label',
            cancelButton: 'Cancel label',
            saveButton: 'Save label',
            saveOneRecurrent: 'Save one recurrent label',
            saveAllRecurrent: 'Save all recurrent label',
            newEventTitle: 'Some new event title'
        };
        element.selectedDisplay = 'calendar';
        element.dialogLabels = labels;

        return Promise.resolve()
            .then(() => {
                // Open the recurrent edit choice dialog
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                calendar.dispatchEvent(
                    new CustomEvent('openrecurrencedialog', {
                        detail: {
                            selection: {
                                event: RECURRING_EVENT,
                                occurrence: {}
                            }
                        }
                    })
                );
            })
            .then(() => {
                const dialog = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"]'
                );
                const description = element.shadowRoot.querySelector(
                    '[data-element-id="p-recurrence-dialog-description"]'
                );
                const cancelButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-recurrence-dialog-cancel"]'
                );
                const saveOneButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-recurrence-dialog-save-one"]'
                );
                const saveAllButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-recurrence-dialog-save-all"]'
                );
                expect(dialog.title).toBe(labels.newEventTitle);
                expect(description.textContent).toBe(labels.editRecurrent);
                expect(cancelButton.label).toBe(labels.cancelButton);
                expect(saveOneButton.label).toBe(labels.saveOneRecurrent);
                expect(saveAllButton.label).toBe(labels.saveAllRecurrent);
            });
    });

    it('Scheduler: dialogLabels, delete popover', () => {
        const labels = {
            deleteTitle: 'Delete title',
            deleteMessage: 'Delete message',
            cancelButton: 'Cancel label',
            deleteButton: 'Delete label'
        };
        element.selectedDisplay = 'calendar';
        element.contextMenuEventActions = ACTIONS;
        element.dialogLabels = labels;

        return Promise.resolve()
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                jest.spyOn(calendar, 'selectEvent').mockImplementation(() => {
                    return {};
                });
                calendar.dispatchEvent(
                    new CustomEvent('eventcontextmenu', {
                        detail: {}
                    })
                );
            })
            .then(() => {
                const menu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                menu.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            name: 'Standard.Scheduler.DeleteEvent'
                        }
                    })
                );
            })
            .then(() => {
                const dialog = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"]'
                );
                const description = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-delete-description"]'
                );
                const cancelButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-delete-dialog-cancel"]'
                );
                const deleteButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-delete-dialog-delete"]'
                );
                expect(dialog.title).toBe(labels.deleteTitle);
                expect(description.textContent).toBe(labels.deleteMessage);
                expect(cancelButton.label).toBe(labels.cancelButton);
                expect(deleteButton.label).toBe(labels.deleteButton);
            });
    });

    // disabled-dates-times, reference-lines and events
    it('Scheduler: disabledDatesTimes', () => {
        element.referenceLines = [
            {
                label: 'Some reference line',
                date: new Date(2022, 9, 3, 18, 9)
            }
        ];
        element.disabledDatesTimes = [
            {
                resourceNames: ['resource-3'],
                title: 'Disabled date 2',
                from: new Date(2022, 9, 4),
                to: new Date(2022, 9, 5)
            },
            {
                resourceNames: ['resource-2', 'resource-1'],
                title: 'Disabled date 1',
                iconName: 'utility:apps',
                from: new Date(2022, 9, 2, 10),
                to: new Date(2022, 9, 3)
            }
        ];
        element.events = [
            {
                resourceNames: ['resource-1'],
                title: 'Event 1',
                from: new Date(2022, 9, 3, 14, 30),
                to: new Date(2022, 9, 3, 18)
            }
        ];
        element.resources = RESOURCES;
        element.selectedResources = ['resource-1', 'resource-2', 'resource-3'];

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline.events).toMatchObject([
                {
                    resourceNames: ['resource-2', 'resource-1'],
                    title: 'Disabled date 1',
                    iconName: 'utility:apps',
                    from: new Date(2022, 9, 2, 10),
                    to: new Date(2022, 9, 3),
                    disabled: true
                },
                {
                    resourceNames: ['resource-1'],
                    title: 'Event 1',
                    from: new Date(2022, 9, 3, 14, 30),
                    to: new Date(2022, 9, 3, 18)
                },
                {
                    title: 'Some reference line',
                    from: DateTime.fromJSDate(new Date(2022, 9, 3, 18, 9)),
                    to: DateTime.fromMillis(
                        new Date(2022, 9, 3, 18, 9).getTime() + 1
                    ),
                    referenceLine: true
                },
                {
                    resourceNames: ['resource-3'],
                    title: 'Disabled date 2',
                    from: new Date(2022, 9, 4),
                    to: new Date(2022, 9, 5),
                    disabled: true
                }
            ]);
        });
    });

    // events-labels
    it('Scheduler: eventsLabels, agenda display', () => {
        const labels = {
            center: { fieldName: 'from' },
            right: { value: 'Some value' }
        };
        element.events = EVENTS;
        element.selectedDisplay = 'agenda';
        element.eventsLabels = labels;

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            expect(agenda.eventsLabels).toEqual(labels);
        });
    });

    it('Scheduler: eventsLabels, calendar display', () => {
        const labels = {
            center: { fieldName: 'from' },
            right: { value: 'Some value' }
        };
        element.events = EVENTS;
        element.selectedDisplay = 'calendar';
        element.eventsLabels = labels;

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar.eventsLabels).toEqual(labels);
        });
    });

    it('Scheduler: eventsLabels, timeline display', () => {
        const labels = {
            center: { fieldName: 'from' },
            right: { value: 'Some value' }
        };
        element.events = EVENTS;
        element.resources = RESOURCES;
        element.selectedResources = ['resource-1', 'resource-2', 'resource-3'];
        element.eventsLabels = labels;
        element.selectedDisplay = 'timeline';

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline.eventsLabels).toEqual(labels);
        });
    });

    // events-palette
    it('Scheduler: eventsPalette, agenda display', () => {
        element.events = EVENTS;
        element.selectedDisplay = 'agenda';
        element.eventsPalette = 'bluegrass';
        element.resources = RESOURCES;

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            expect(agenda.resources[0].color).toBe('#c7f296');
            expect(agenda.resources[1].color).toBe('#94e7a8');
            expect(agenda.resources[2].color).toBe('#51d2bb');
        });
    });

    it('Scheduler: eventsPalette, calendar display', () => {
        element.events = EVENTS;
        element.selectedDisplay = 'calendar';
        element.eventsPalette = 'bluegrass';
        element.resources = RESOURCES;

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar.resources[0].color).toBe('#c7f296');
            expect(calendar.resources[1].color).toBe('#94e7a8');
            expect(calendar.resources[2].color).toBe('#51d2bb');
        });
    });

    it('Scheduler: eventsPalette, timeline display', () => {
        element.events = EVENTS;
        element.resources = RESOURCES;
        element.selectedResources = ['resource-1', 'resource-2', 'resource-3'];
        element.eventsPalette = 'bluegrass';
        element.selectedDisplay = 'timeline';

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline.resources[0].color).toBe('#c7f296');
            expect(timeline.resources[1].color).toBe('#94e7a8');
            expect(timeline.resources[2].color).toBe('#51d2bb');
        });
    });

    // events-theme
    it('Scheduler: eventsTheme, calendar display', () => {
        element.events = EVENTS;
        element.selectedDisplay = 'calendar';
        element.eventsTheme = 'transparent';
        element.resources = RESOURCES;

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar.eventsTheme).toBe('transparent');
        });
    });

    it('Scheduler: eventsTheme, timeline display', () => {
        element.events = EVENTS;
        element.resources = RESOURCES;
        element.selectedResources = ['resource-1', 'resource-2', 'resource-3'];
        element.eventsTheme = 'transparent';
        element.selectedDisplay = 'timeline';

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline.eventsTheme).toBe('transparent');
        });
    });

    // hidden-displays
    it('Scheduler: hiddenDisplays', () => {
        element.hiddenDisplays = ['agenda'];

        return Promise.resolve().then(() => {
            const buttonMenu = element.shadowRoot.querySelector(
                '[data-element-id="avonni-button-menu-toolbar-display"]'
            );
            expect(buttonMenu).toBeTruthy();
            const displays = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-menu-item-display"]'
            );
            expect(displays).toHaveLength(2);
            expect(displays[0].value).toBe('calendar');
            expect(displays[0].checked).toBeFalsy();
            expect(displays[1].value).toBe('timeline');
            expect(displays[1].checked).toBeTruthy();
        });
    });

    it('Scheduler: hiddenDisplays, only one display visible', () => {
        element.hiddenDisplays = ['agenda', 'timeline'];
        element.selectedDisplay = 'calendar';

        return Promise.resolve().then(() => {
            const buttonMenu = element.shadowRoot.querySelector(
                '[data-element-id="avonni-button-menu-toolbar-display"]'
            );
            expect(buttonMenu).toBeFalsy();
        });
    });

    // hide-toolbar
    it('Scheduler: hideToolbar = false', () => {
        element.hideToolbar = false;

        return Promise.resolve().then(() => {
            const toolbar = element.shadowRoot.querySelector(
                '[data-element-id="div-toolbar"]'
            );
            expect(toolbar).toBeTruthy();
        });
    });

    it('Scheduler: hideToolbar = true', () => {
        element.hideToolbar = true;

        return Promise.resolve().then(() => {
            const toolbar = element.shadowRoot.querySelector(
                '[data-element-id="div-toolbar"]'
            );
            expect(toolbar).toBeFalsy();
        });
    });

    // is-loading
    it('Scheduler: isLoading = false', () => {
        element.isLoading = false;

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner"]'
            );
            expect(spinner).toBeFalsy();
        });
    });

    it('Scheduler: isLoading = true', () => {
        element.isLoading = true;

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner"]'
            );
            expect(spinner).toBeTruthy();
        });
    });

    // loading-state-alternative-text
    it('Scheduler: loadingStateAlternativeText', () => {
        element.loadingStateAlternativeText = 'Some alternative text';
        element.isLoading = true;

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner"]'
            );
            expect(spinner.alternativeText).toBe('Some alternative text');
        });
    });

    it('Scheduler: loadingStateAlternativeText, calendar display', () => {
        element.loadingStateAlternativeText = 'Some alternative text';
        element.selectedDisplay = 'calendar';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar.loadingStateAlternativeText).toBe(
                'Some alternative text'
            );
        });
    });

    it('Scheduler: loadingStateAlternativeText, timeline display', () => {
        element.loadingStateAlternativeText = 'Some alternative text';
        element.selectedDisplay = 'timeline';
        element.resources = RESOURCES;
        element.selectedResources = ['resource-1'];

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline.loadingStateAlternativeText).toBe(
                'Some alternative text'
            );
        });
    });

    // read-only
    it('Scheduler: readOnly, agenda display', () => {
        element.readOnly = true;
        element.selectedDisplay = 'agenda';

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            expect(agenda.readOnly).toBeTruthy();
        });
    });

    it('Scheduler: readOnly, calendar display', () => {
        element.readOnly = true;
        element.selectedDisplay = 'calendar';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar.readOnly).toBeTruthy();
        });
    });

    it('Scheduler: readOnly, timeline display', () => {
        element.readOnly = true;
        element.selectedDisplay = 'timeline';
        element.resources = RESOURCES;
        element.selectedResources = ['resource-1'];

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline.readOnly).toBeTruthy();
        });
    });

    it('Scheduler: readOnly, default empty spot actions are hidden when readOnly', () => {
        element.readOnly = false;
        element.selectedDisplay = 'calendar';

        return Promise.resolve()
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                calendar.dispatchEvent(
                    new CustomEvent('emptyspotcontextmenu', {
                        detail: { selection: {} }
                    })
                );
            })
            .then(() => {
                const menu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                expect(menu.items).toEqual([
                    {
                        name: 'Standard.Scheduler.AddEvent',
                        label: 'Add event',
                        iconName: 'utility:add'
                    }
                ]);
                menu.dispatchEvent(new CustomEvent('close'));
                element.readOnly = true;
            })
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                calendar.dispatchEvent(
                    new CustomEvent('emptyspotcontextmenu', {
                        detail: { selection: {} }
                    })
                );
            })
            .then(() => {
                const menu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                expect(menu).toBeFalsy();
            });
    });

    it('Scheduler: readOnly, default event actions are hidden when readOnly', () => {
        element.readOnly = false;
        element.selectedDisplay = 'calendar';

        return Promise.resolve()
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                jest.spyOn(calendar, 'selectEvent').mockImplementation(() => {
                    return {};
                });
                calendar.dispatchEvent(
                    new CustomEvent('eventcontextmenu', {
                        detail: { selection: {} }
                    })
                );
            })
            .then(() => {
                const menu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                expect(menu.items).toEqual([
                    {
                        name: 'Standard.Scheduler.EditEvent',
                        label: 'Edit',
                        iconName: 'utility:edit'
                    },
                    {
                        name: 'Standard.Scheduler.DeleteEvent',
                        label: 'Delete',
                        iconName: 'utility:delete'
                    }
                ]);
                menu.dispatchEvent(new CustomEvent('close'));
                element.readOnly = true;
            })
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                calendar.dispatchEvent(
                    new CustomEvent('emptyspotcontextmenu', {
                        detail: { selection: {} }
                    })
                );
            })
            .then(() => {
                const menu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                expect(menu).toBeFalsy();
            });
    });

    // recurrent-edit-modes
    it('Scheduler: recurrentEditModes', () => {
        element.resources = RESOURCES;
        element.selectedResources = ['resource-1', 'resource-2', 'resource-3'];
        element.recurrentEditModes = ['all', 'one', 'invalidMode'];
        element.selectedDisplay = 'timeline';

        return Promise.resolve()
            .then(() => {
                const timeline = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-timeline"]'
                );
                expect(timeline.recurrentEditModes).toEqual(['all', 'one']);

                timeline.dispatchEvent(
                    new CustomEvent('openeditdialog', {
                        detail: {
                            selection: {
                                event: RECURRING_EVENT,
                                occurrence: {}
                            }
                        }
                    })
                );
            })
            .then(() => {
                const saveButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-save-edit"]'
                );
                const saveOneButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-menu-item-save-one"]'
                );
                const saveAllButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-menu-item-save-all"]'
                );
                expect(saveButton).toBeFalsy();
                expect(saveOneButton).toBeTruthy();
                expect(saveAllButton).toBeTruthy();
            });
    });

    it('Scheduler: recurrentEditModes, only one mode', () => {
        element.recurrentEditModes = ['all'];
        element.selectedDisplay = 'agenda';

        return Promise.resolve()
            .then(() => {
                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );

                agenda.dispatchEvent(
                    new CustomEvent('openeditdialog', {
                        detail: {
                            selection: {
                                event: RECURRING_EVENT,
                                occurrence: {}
                            }
                        }
                    })
                );
            })
            .then(() => {
                const saveButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-save-edit"]'
                );
                const saveOneButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-menu-item-save-one"]'
                );
                const saveAllButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-menu-item-save-all"]'
                );
                expect(saveButton).toBeTruthy();
                expect(saveOneButton).toBeFalsy();
                expect(saveAllButton).toBeFalsy();
            });
    });

    // resize-column-disabled
    it('Scheduler: resizeColumnDisabled, agenda display', () => {
        element.selectedDisplay = 'agenda';
        element.resizeColumnDisabled = true;

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            expect(agenda.resizeColumnDisabled).toBeTruthy();
        });
    });

    it('Scheduler: resizeColumnDisabled, calendar display', () => {
        element.selectedDisplay = 'calendar';
        element.resizeColumnDisabled = true;

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar.resizeColumnDisabled).toBeTruthy();
        });
    });

    it('Scheduler: resizeColumnDisabled, timeline display', () => {
        element.selectedResources = ['resource-1', 'resource-2', 'resource-3'];
        element.selectedDisplay = 'timeline';
        element.resizeColumnDisabled = true;
        element.resources = RESOURCES;

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline.resizeColumnDisabled).toBeTruthy();
        });
    });

    // resources
    it('Scheduler: resources, agenda display', () => {
        element.selectedDisplay = 'agenda';
        element.resources = RESOURCES;

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            expect(agenda.resources).toMatchObject(RESOURCES);
        });
    });

    it('Scheduler: resources, calendar display', () => {
        element.selectedDisplay = 'calendar';
        element.resources = RESOURCES;

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar.resources).toMatchObject(RESOURCES);
        });
    });

    it('Scheduler: resources, timeline display', () => {
        element.selectedResources = ['resource-1'];
        element.selectedDisplay = 'timeline';
        element.resources = RESOURCES;

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline.resources).toMatchObject(RESOURCES);

            const filterMenu = element.shadowRoot.querySelector(
                '[data-element-id="avonni-filter-menu-resources"]'
            );
            expect(filterMenu.items).toEqual([
                {
                    label: 'Resource 1',
                    value: 'resource-1'
                },
                {
                    label: 'Resource 2',
                    value: 'resource-2'
                },
                {
                    label: 'Resource 3',
                    value: 'resource-3'
                }
            ]);
        });
    });

    // selected-display
    it('Scheduler: selectedDisplay = agenda', () => {
        element.selectedDisplay = 'agenda';

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            expect(agenda).toBeTruthy();

            const displayMenu = element.shadowRoot.querySelector(
                '[data-element-id="avonni-button-menu-toolbar-display"]'
            );
            expect(displayMenu.label.trim()).toBe('Agenda');

            const displayItems = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-menu-item-display"]'
            );
            expect(displayItems[0].checked).toBeTruthy();

            const resourceMenu = element.shadowRoot.querySelector(
                '[data-element-id="avonni-filter-menu-resources"]'
            );
            expect(resourceMenu).toBeFalsy();
        });
    });

    it('Scheduler: selectedDisplay = calendar', () => {
        element.selectedDisplay = 'calendar';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar).toBeTruthy();

            const displayMenu = element.shadowRoot.querySelector(
                '[data-element-id="avonni-button-menu-toolbar-display"]'
            );
            expect(displayMenu.label.trim()).toBe('Calendar');

            const displayItems = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-menu-item-display"]'
            );
            expect(displayItems[1].label.trim()).toBe('Calendar');
            expect(displayItems[1].checked).toBeTruthy();

            const resourceMenu = element.shadowRoot.querySelector(
                '[data-element-id="avonni-filter-menu-resources"]'
            );
            expect(resourceMenu).toBeFalsy();
        });
    });

    it('Scheduler: selectedDisplay = timeline', () => {
        element.selectedDisplay = 'timeline';
        element.resources = RESOURCES;
        element.selectedResources = ['resource-1'];

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline).toBeTruthy();

            const displayMenu = element.shadowRoot.querySelector(
                '[data-element-id="avonni-button-menu-toolbar-display"]'
            );
            expect(displayMenu.label.trim()).toBe('Timeline');

            const displayItems = element.shadowRoot.querySelectorAll(
                '[data-element-id="lightning-menu-item-display"]'
            );
            expect(displayItems[2].label.trim()).toBe('Timeline');
            expect(displayItems[2].checked).toBeTruthy();

            const resourceMenu = element.shadowRoot.querySelector(
                '[data-element-id="avonni-filter-menu-resources"]'
            );
            expect(resourceMenu).toBeTruthy();
        });
    });

    // selected-resources
    it('Scheduler: selectedResources, agenda display', () => {
        element.selectedResources = ['resource-1', 'resource-2'];
        element.resources = RESOURCES;
        element.selectedDisplay = 'agenda';

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            expect(agenda.selectedResources).toEqual([
                'resource-1',
                'resource-2'
            ]);
        });
    });

    it('Scheduler: selectedResources, calendar display', () => {
        element.selectedResources = ['resource-1', 'resource-2'];
        element.resources = RESOURCES;
        element.selectedDisplay = 'calendar';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar.selectedResources).toEqual([
                'resource-1',
                'resource-2'
            ]);
        });
    });

    it('Scheduler: selectedResources, timeline display', () => {
        element.resources = RESOURCES;
        element.selectedDisplay = 'timeline';

        return Promise.resolve()
            .then(() => {
                const timeline = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-timeline"]'
                );
                expect(timeline).toBeFalsy();

                const message = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-scoped-notification-empty-timeline"]'
                );
                expect(message).toBeTruthy();

                element.selectedResources = ['resource-1', 'resource-2'];
            })
            .then(() => {
                const timeline = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-timeline"]'
                );
                expect(timeline).toBeTruthy();
                expect(timeline.selectedResources).toEqual([
                    'resource-1',
                    'resource-2'
                ]);

                const message = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-scoped-notification-empty-timeline"]'
                );
                expect(message).toBeFalsy();

                const resourcesMenu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-filter-menu-resources"]'
                );
                expect(resourcesMenu.value).toEqual([
                    'resource-1',
                    'resource-2'
                ]);
            });
    });

    // selected-time-span
    it('Scheduler: selectedTimeSpan is a default time span', () => {
        element.selectedTimeSpan = 'Standard.Scheduler.MonthTimeSpan';
        element.selectedDisplay = 'agenda';

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            expect(agenda.timeSpan).toEqual({
                headers: 'dayAndMonth',
                label: 'Month',
                name: 'Standard.Scheduler.MonthTimeSpan',
                span: 1,
                unit: 'month'
            });
        });
    });

    it('Scheduler: selectedTimeSpan is a custom time span', () => {
        element.selectedTimeSpan = 'Custom.TimeSpan.Two';
        element.selectedDisplay = 'calendar';
        element.timeSpans = [
            {
                label: 'Custom time span one',
                name: 'Custom.TimeSpan.One',
                unit: 'day',
                span: 1
            },
            {
                label: 'Custom time span two',
                name: 'Custom.TimeSpan.Two',
                unit: 'year',
                span: 2
            }
        ];

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar.timeSpan).toEqual({
                headers: 'hourAndDay',
                label: 'Custom time span two',
                name: 'Custom.TimeSpan.Two',
                unit: 'year',
                span: 2
            });
        });
    });

    it('Scheduler: selectedTimeSpan does not exist in the time spans', () => {
        element.selectedTimeSpan = 'Custom.TimeSpan.Two';
        element.selectedDisplay = 'agenda';

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            expect(agenda.timeSpan).toEqual({
                headers: 'hourAndDay',
                label: 'Day',
                name: 'Standard.Scheduler.DayTimeSpan',
                span: 1,
                unit: 'day'
            });
        });
    });

    // start
    it('Scheduler: start', () => {
        element.start = new Date(2022, 9, 4);

        return Promise.resolve().then(() => {
            const toolbalCalendarButton = element.shadowRoot.querySelector('[data-element-id="button-toolbar-calendar"]');
            toolbalCalendarButton.dispatchEvent(new CustomEvent('click'));
        }).then(() => {
            const calendar = element.shadowRoot.querySelector('[data-element-id="calendar-toolbar"]');
            expect(calendar.value.ts).toBe(new Date(2022, 9, 4).getTime());

            const visibleInterval = element.shadowRoot.querySelector('[data-element-id="span-visible-interval-label"]');
            expect(visibleInterval.textContent).toBe('Tue, October 4, 2022');
        });
    });
    
    it('Scheduler: start, agenda display', () => {
        element.selectedDisplay = 'agenda';
        element.start = new Date(2022, 9, 4);

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            expect(agenda.selectedDate.ts).toBe(new Date(2022, 9, 4).getTime());
        });
    });

    it('Scheduler: start, calendar display', () => {
        element.selectedDisplay = 'calendar';
        element.start = new Date(2022, 9, 4);

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar.selectedDate.ts).toBe(new Date(2022, 9, 4).getTime());
        });
    });

    it('Scheduler: start, timeline display', () => {
        element.selectedDisplay = 'timeline';
        element.start = new Date(2022, 9, 4);
        element.resources = RESOURCES;
        element.selectedResources = ['resource-1', 'resource-2'];

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline.start.ts).toBe(new Date(2022, 9, 4).getTime());
        });
    });
});

// expect(element.timeSpans).toEqual([
//     {
//         headers: 'hourAndDay',
//         label: 'Day',
//         name: 'Standard.Scheduler.DayTimeSpan',
//         span: 1,
//         unit: 'day'
//     },
//     {
//         headers: 'hourAndDay',
//         label: 'Week',
//         name: 'Standard.Scheduler.WeekTimeSpan',
//         span: 1,
//         unit: 'week'
//     },
//     {
//         headers: 'dayAndMonth',
//         label: 'Month',
//         name: 'Standard.Scheduler.MonthTimeSpan',
//         span: 1,
//         unit: 'month'
//     },
//     {
//         headers: 'dayAndMonth',
//         label: 'Year',
//         name: 'Standard.Scheduler.YearTimeSpan',
//         span: 1,
//         unit: 'year'
//     }
// ]);
// expect(element.variant).toBe('horizontal');
// expect(element.zoomToFit).toBeFalsy();
