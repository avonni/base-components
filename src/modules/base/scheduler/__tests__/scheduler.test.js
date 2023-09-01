

import { createElement } from 'lwc';
import Scheduler from '../scheduler';
import { DateTime, Interval } from 'c/luxon';
import { ACTIONS, COLUMNS, RESOURCES, RECURRING_EVENT, EVENTS } from './data';

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

        jest.useFakeTimers();
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
        expect(element.eventsDisplayFields).toEqual([
            {
                type: 'date',
                value: 'from'
            },
            {
                type: 'date',
                value: 'to'
            }
        ]);
        expect(element.eventsLabels).toEqual({
            center: { fieldName: 'title' }
        });
        expect(element.eventsPalette).toBe('aurora');
        expect(element.eventsTheme).toBe('default');
        expect(element.hiddenDisplays).toEqual([]);
        expect(element.hideResourcesFilter).toBeFalsy();
        expect(element.hideSidePanel).toBeFalsy();
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
        expect(element.sidePanelPosition).toBe('left');

        const today = new Date();
        expect(element.start.getHours()).toBe(today.getHours());
        expect(element.start.getDate()).toBe(today.getDate());
        expect(element.start.getMonth()).toBe(today.getMonth());
        expect(element.start.getFullYear()).toBe(today.getFullYear());

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
        expect(element.timezone).toBeUndefined();
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

    // events-display-fields
    it('Scheduler: eventsDisplayFields', () => {
        element.dateFormat = 'dd/LL/yyyy';
        element.resources = RESOURCES;
        element.selectedResources = [RESOURCES[0].name];
        element.events = [
            {
                title: 'Event 1',
                name: 'event-1',
                resourceNames: [RESOURCES[0].name],
                from: new Date(2023, 1, 20, 12),
                to: new Date(2023, 1, 20, 14, 30)
            },
            {
                title: 'Event 2',
                name: 'event-2',
                resourceNames: [RESOURCES[0].name],
                from: new Date(2023, 1, 21, 15),
                allDay: true
            }
        ];
        element.eventsDisplayFields = [
            {
                value: 'title',
                variant: 'label-hidden',
                label: 'Title'
            },
            {
                value: 'from',
                label: 'Starting date',
                type: 'date'
            },
            {
                value: 'allDay',
                type: 'boolean'
            }
        ];

        return Promise.resolve()
            .then(() => {
                const timeline = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-timeline"]'
                );
                jest.spyOn(timeline, 'selectEvent').mockImplementation(() => {
                    return {
                        event: {
                            data: {
                                title: 'Event 2',
                                name: 'event-2',
                                resourceNames: [RESOURCES[0].name],
                                from: new Date(2023, 1, 21, 15),
                                allDay: true
                            }
                        },
                        occurrence: {
                            from: DateTime.fromJSDate(new Date(2023, 1, 21)),
                            to: DateTime.fromJSDate(new Date(2023, 1, 22) - 1),
                            key: `event-2-${RESOURCES[0].name}-${new Date(
                                2023,
                                1,
                                21
                            ).getTime()}`
                        }
                    };
                });
                timeline.dispatchEvent(
                    new CustomEvent('eventmouseenter', {
                        detail: {
                            key: `event-2-${RESOURCES[0].name}-${new Date(
                                2023,
                                1,
                                21
                            ).getTime()}`,
                            eventName: 'event-2',
                            x: 0,
                            y: 0
                        }
                    })
                );
                jest.runAllTimers();
            })
            .then(() => {
                const fields = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-output-data-detail-popover-field"]'
                );
                expect(fields).toHaveLength(3);
                expect(fields[0].label).toBe('Title');
                expect(fields[0].value).toBe('Event 2');
                expect(fields[0].variant).toBe('label-hidden');
                expect(fields[0].type).toBeUndefined();
                expect(fields[1].value).toBe('21/02/2023');
                expect(fields[1].label).toBe('Starting date');
                expect(fields[1].type).toBe('text');
                expect(fields[2].value).toBeTruthy();
                expect(fields[2].label).toBeUndefined();
                expect(fields[2].type).toBe('boolean');
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

    // hide-resources-filter
    it('Scheduler: hideResourcesFilter = false', () => {
        element.hideResourcesFilter = false;

        return Promise.resolve()
            .then(() => {
                const filterMenu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-filter-menu-resources"]'
                );
                expect(filterMenu).toBeTruthy();

                element.selectedDisplay = 'agenda';
            })
            .then(() => {
                const filterMenu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-filter-menu-resources"]'
                );
                expect(filterMenu).toBeFalsy();

                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                expect(agenda.hideResourcesFilter).toBeFalsy();
            });
    });

    it('Scheduler: hideResourcesFilter = true', () => {
        element.hideResourcesFilter = true;

        return Promise.resolve()
            .then(() => {
                const filterMenu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-filter-menu-resources"]'
                );
                expect(filterMenu).toBeFalsy();

                element.selectedDisplay = 'agenda';
            })
            .then(() => {
                const filterMenu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-filter-menu-resources"]'
                );
                expect(filterMenu).toBeFalsy();

                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                expect(agenda.hideResourcesFilter).toBeTruthy();
            });
    });

    it('Scheduler: hideResourcesFilter = true, calendar', () => {
        element.hideResourcesFilter = true;
        element.selectedDisplay = 'calendar';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar.hideResourcesFilter).toBeTruthy();
        });
    });

    // hide-side-panel
    it('Scheduler: hideSidePanel = false', () => {
        element.hideSidePanel = false;
        element.selectedDisplay = 'agenda';

        return Promise.resolve()
            .then(() => {
                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                expect(agenda.hideSidePanel).toBeFalsy();

                element.selectedDisplay = 'calendar';
            })
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                expect(calendar.hideSidePanel).toBeFalsy();
            });
    });

    it('Scheduler: hideSidePanel = true', () => {
        element.hideSidePanel = true;
        element.selectedDisplay = 'agenda';

        return Promise.resolve()
            .then(() => {
                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                expect(agenda.hideSidePanel).toBeTruthy();

                element.selectedDisplay = 'calendar';
            })
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                expect(calendar.hideSidePanel).toBeTruthy();
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
            expect(filterMenu.typeAttributes.items).toEqual([
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
                // If no resources are selected, the timeline is hidden
                const timeline = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-timeline"]'
                );
                expect(timeline).toBeFalsy();

                const message = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-scoped-notification-empty-timeline"]'
                );
                expect(message).toBeTruthy();

                const timeSpansButtons = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-button-toolbar-time-span"]'
                );
                timeSpansButtons.forEach((button) => {
                    expect(button.disabled).toBeTruthy();
                });
                const timeSpansButtonMenu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-button-menu-toolbar-spans"]'
                );
                expect(timeSpansButtonMenu.disabled).toBeTruthy();

                const calendarButton = element.shadowRoot.querySelector(
                    '[data-element-id="button-toolbar-calendar"]'
                );
                expect(calendarButton.disabled).toBeTruthy();

                const navButtons = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="lightning-button-icon-toolbar"]'
                );
                navButtons.forEach((button) => {
                    expect(button.disabled).toBeTruthy();
                });

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

    // side-panel-position
    it('Scheduler: sidePanelPosition', () => {
        element.sidePanelPosition = 'right';
        element.selectedDisplay = 'agenda';

        return Promise.resolve()
            .then(() => {
                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                expect(agenda.sidePanelPosition).toBe('right');

                element.selectedDisplay = 'calendar';
            })
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                expect(calendar.sidePanelPosition).toBe('right');
            });
    });

    // start
    it('Scheduler: start', () => {
        element.start = new Date(2022, 9, 4);
        const label = DateTime.fromJSDate(new Date(2022, 9, 4)).toFormat(
            'ccc, LLLL d, yyyy'
        );
        jest.useFakeTimers();

        return Promise.resolve()
            .then(() => {
                const toolbalCalendarButton = element.shadowRoot.querySelector(
                    '[data-element-id="button-toolbar-calendar"]'
                );
                toolbalCalendarButton.dispatchEvent(new CustomEvent('click'));
            })
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-toolbar"]'
                );
                const focusSpy = jest.spyOn(calendar, 'focus');
                jest.runAllTimers();
                expect(focusSpy).toHaveBeenCalled();
                expect(calendar.value.ts).toBe(new Date(2022, 9, 4).getTime());

                const visibleInterval = element.shadowRoot.querySelector(
                    '[data-element-id="span-visible-interval-label"]'
                );
                expect(visibleInterval.textContent).toBe(label);
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
            expect(calendar.selectedDate.ts).toBe(
                new Date(2022, 9, 4).getTime()
            );
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

    // time-spans
    it('Scheduler: timeSpans are displayed in the toolbar', () => {
        const timeSpans = [
            {
                label: 'Custom time span one',
                name: 'Custom.TimeSpan.One',
                unit: 'day',
                span: 3,
                headers: 'minuteAndHour'
            },
            {
                label: 'Custom time span two',
                name: 'Custom.TimeSpan.Two'
            },
            {
                label: 'Custom time span three',
                name: 'Custom.TimeSpan.Three',
                unit: 'month',
                span: 2,
                headers: 'weekMonthAndYear'
            },
            {
                label: 'Custom time span four',
                name: 'Custom.TimeSpan.Four',
                unit: 'year',
                span: 1,
                headers: 'quartersAndYear'
            }
        ];
        element.timeSpans = timeSpans.slice(0, 3);

        return Promise.resolve()
            .then(() => {
                const buttons = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-button-toolbar-time-span"]'
                );
                expect(buttons).toHaveLength(3);
                buttons.forEach((button, index) => {
                    expect(button.label).toBe(timeSpans[index].label);
                    expect(button.value).toBe(timeSpans[index].name);
                });

                // The button menu is hidden if there are less than 4 time spans
                const buttonMenu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-button-menu-toolbar-spans"]'
                );
                expect(buttonMenu).toBeFalsy();

                element.timeSpans = timeSpans;
            })
            .then(() => {
                const buttonMenu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-button-menu-toolbar-spans"]'
                );
                expect(buttonMenu).toBeTruthy();

                const menuItems = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-menu-item-toolbar-time-span"]'
                );
                expect(menuItems).toHaveLength(1);
                expect(menuItems[0].label).toBe(timeSpans[3].label);
                expect(menuItems[0].value).toBe(timeSpans[3].name);
            });
    });

    it('Scheduler: timeSpans, calendar display', () => {
        const timeSpans = [
            {
                headers: 'dayAndMonth',
                label: 'Custom time span one',
                name: 'Custom.TimeSpan.One',
                unit: 'day',
                span: 3
            }
        ];
        element.selectedDisplay = 'calendar';
        element.timeSpans = timeSpans;

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar.availableTimeSpans).toEqual(timeSpans);
        });
    });

    it('Scheduler: timeSpans, timeline display', () => {
        const timeSpans = [
            {
                customHeaders: [
                    {
                        label: 'Custom header',
                        unit: 'day',
                        span: 1
                    }
                ],
                headers: 'hourAndDay',
                label: 'Custom time span one',
                name: 'Custom.TimeSpan.One',
                unit: 'day',
                span: 3
            }
        ];
        element.timeSpans = timeSpans;
        element.selectedDisplay = 'timeline';
        element.resources = RESOURCES;
        element.selectedResources = ['resource-1', 'resource-2'];

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline.availableTimeSpans).toEqual(timeSpans);
        });
    });

    // timezone
    it('Scheduler: timezone', () => {
        element.selectedDisplay = 'calendar';
        element.timezone = 'Europe/Paris';
        element.start = '2020-01-01T00:00:00.000Z';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar.timezone).toBe('Europe/Paris');
            expect(calendar.selectedDate.toISO()).toBe(
                '2020-01-01T01:00:00.000+01:00'
            );
        });
    });

    // variant
    it('Scheduler: variant', () => {
        element.selectedDisplay = 'timeline';
        element.resources = RESOURCES;
        element.variant = 'vertical';
        element.selectedResources = ['resource-1', 'resource-2'];

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline.orientation).toEqual('vertical');
        });
    });

    // zoom-to-fit
    it('Scheduler: zoomToFit, calendar display', () => {
        element.selectedDisplay = 'calendar';
        element.zoomToFit = true;

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            expect(calendar.zoomToFit).toBeTruthy();
        });
    });

    it('Scheduler: zoomToFit, timeline display', () => {
        element.selectedDisplay = 'timeline';
        element.resources = RESOURCES;
        element.zoomToFit = true;
        element.selectedResources = ['resource-1', 'resource-2'];

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            expect(timeline.zoomToFit).toBeTruthy();
        });
    });

    /*
     * ------------------------------------------------------------
     *  METHODS
     * -------------------------------------------------------------
     */

    // collapseSidePanel
    it('Scheduler: collapseSidePanel() method, agenda display', () => {
        element.selectedDisplay = 'agenda';

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            const spy = jest.spyOn(agenda, 'collapseSidePanel');
            element.collapseSidePanel();
            expect(spy).toHaveBeenCalled();
        });
    });

    it('Scheduler: createEvent() method, agenda display', () => {
        element.selectedDisplay = 'agenda';

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            const spy = jest.spyOn(agenda, 'createEvent');
            const event = { eventName: 'some name' };
            element.createEvent(event);
            expect(spy).toHaveBeenCalledWith(event);
        });
    });

    it('Scheduler: createEvent() method, calendar display', () => {
        element.selectedDisplay = 'calendar';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            const spy = jest.spyOn(calendar, 'createEvent');
            const event = { eventName: 'some name' };
            element.createEvent(event);
            expect(spy).toHaveBeenCalledWith(event);
        });
    });

    it('Scheduler: createEvent() method, timeline display', () => {
        element.selectedDisplay = 'timeline';
        element.selectedResources = ['resource-3'];
        element.resources = RESOURCES;

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            const spy = jest.spyOn(timeline, 'createEvent');
            const event = { eventName: 'some name' };
            element.createEvent(event);
            expect(spy).toHaveBeenCalledWith(event);
        });
    });

    // deleteEvent
    it('Scheduler: deleteEvent() method, agenda display', () => {
        element.selectedDisplay = 'agenda';

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            const spy = jest.spyOn(agenda, 'deleteEvent');
            element.deleteEvent('someName');
            expect(spy).toHaveBeenCalledWith('someName');
        });
    });

    it('Scheduler: deleteEvent() method, calendar display', () => {
        element.selectedDisplay = 'calendar';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            const spy = jest.spyOn(calendar, 'deleteEvent');
            element.deleteEvent('someName');
            expect(spy).toHaveBeenCalledWith('someName');
        });
    });

    it('Scheduler: deleteEvent() method, timeline display', () => {
        element.selectedDisplay = 'timeline';
        element.selectedResources = ['resource-3'];
        element.resources = RESOURCES;

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            const spy = jest.spyOn(timeline, 'deleteEvent');
            element.deleteEvent('someName');
            expect(spy).toHaveBeenCalledWith('someName');
        });
    });

    // expandSidePanel
    it('Scheduler: expandSidePanel() method, agenda display', () => {
        element.selectedDisplay = 'agenda';

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            const spy = jest.spyOn(agenda, 'expandSidePanel');
            element.expandSidePanel();
            expect(spy).toHaveBeenCalled();
        });
    });

    // focusEvent
    it('Scheduler: focusEvent() method, agenda display', () => {
        element.selectedDisplay = 'agenda';

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            const spy = jest.spyOn(agenda, 'focusEvent');
            element.focusEvent('someName');
            expect(spy).toHaveBeenCalledWith('someName');
        });
    });

    it('Scheduler: focusEvent() method, calendar display', () => {
        element.selectedDisplay = 'calendar';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            const spy = jest.spyOn(calendar, 'focusEvent');
            element.focusEvent('someName');
            expect(spy).toHaveBeenCalledWith('someName');
        });
    });

    it('Scheduler: focusEvent() method, timeline display', () => {
        element.selectedDisplay = 'timeline';
        element.selectedResources = ['resource-3'];
        element.resources = RESOURCES;

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            const spy = jest.spyOn(timeline, 'focusEvent');
            element.focusEvent('someName');
            expect(spy).toHaveBeenCalledWith('someName');
        });
    });

    // goToDate
    it('Scheduler: goToDate() method', () => {
        const start = new Date(2022, 0, 1, 13).getTime();
        element.selectedDisplay = 'timeline';
        element.resources = RESOURCES;
        element.selectedResources = ['resource-3'];
        element.selectedTimeSpan = 'Standard.Scheduler.WeekTimeSpan';
        element.start = start;

        return Promise.resolve()
            .then(() => {
                const timeline = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-timeline"]'
                );
                expect(timeline.start.ts).toBe(start);

                const calendarButton = element.shadowRoot.querySelector(
                    '[data-element-id="button-toolbar-calendar"]'
                );
                calendarButton.dispatchEvent(new CustomEvent('click'));
            })
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-toolbar"]'
                );
                expect(calendar.value.ts).toBe(start);

                element.goToDate(new Date(2022, 9, 5, 16, 12));
            })
            .then(() => {
                // The start is set at the beginning of the time span unit (week)
                const timeline = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-timeline"]'
                );
                expect(timeline.start.ts).toBe(new Date(2022, 9, 2).getTime());

                // The calendar is still open, and the selected date is updated
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-toolbar"]'
                );
                expect(calendar.value.ts).toBe(
                    new Date(2022, 9, 5, 16, 12).getTime()
                );
            });
    });

    it('Scheduler: goToDate() method, go to a Sunday with a week time span', () => {
        const start = new Date(2022, 0, 1, 13).getTime();
        element.selectedDisplay = 'timeline';
        element.resources = RESOURCES;
        element.selectedResources = ['resource-3'];
        element.selectedTimeSpan = 'Standard.Scheduler.WeekTimeSpan';
        element.start = start;

        return Promise.resolve()
            .then(() => {
                const timeline = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-timeline"]'
                );
                expect(timeline.start.ts).toBe(start);

                const calendarButton = element.shadowRoot.querySelector(
                    '[data-element-id="button-toolbar-calendar"]'
                );
                calendarButton.dispatchEvent(new CustomEvent('click'));
            })
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-toolbar"]'
                );
                expect(calendar.value.ts).toBe(start);

                element.goToDate(new Date(2022, 9, 2, 16, 12));
            })
            .then(() => {
                // The start is set at the beginning of the time span unit (week)
                const timeline = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-timeline"]'
                );
                expect(timeline.start.ts).toBe(new Date(2022, 9, 2).getTime());

                // The calendar is still open, and the selected date is updated
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-toolbar"]'
                );
                expect(calendar.value.ts).toBe(
                    new Date(2022, 9, 2, 16, 12).getTime()
                );
            });
    });

    it('Scheduler: goToDate() method, triggered by the calendar', () => {
        const start = new Date(2022, 0, 1).getTime();
        element.selectedDisplay = 'calendar';
        element.start = start;

        return Promise.resolve()
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                expect(calendar.selectedDate.ts).toBe(start);
                calendar.dispatchEvent(
                    new CustomEvent('datechange', {
                        detail: {
                            value: new Date(2022, 9, 6)
                        }
                    })
                );
            })
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                expect(calendar.selectedDate.ts).toBe(
                    new Date(2022, 9, 6).getTime()
                );
            });
    });

    // openEditEventDialog
    it('Scheduler: openEditEventDialog() method', () => {
        element.selectedDisplay = 'calendar';
        element.events = EVENTS;

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            const focusSpy = jest
                .spyOn(calendar, 'focusEvent')
                .mockImplementation(() => {
                    // When focusing the event, it dispatches the mouse enter event
                    // which triggers the calendar.selectEvent() method
                    calendar.dispatchEvent(
                        new CustomEvent('eventmouseenter', {
                            detail: {
                                eventName: EVENTS[0].name,
                                key: `${EVENTS[0].name}-${
                                    EVENTS[0].resourceNames[0]
                                }-${EVENTS[0].from.getTime()}`,
                                x: 0,
                                y: 0
                            },
                            bubbles: true
                        })
                    );
                    jest.runAllTimers();
                });
            jest.spyOn(calendar, 'selectEvent').mockImplementation(() => {
                // The selectEvent() method returns the selection
                return { occurrence: {}, event: { data: {} } };
            });
            element.openEditEventDialog(EVENTS[0].name);
            expect(focusSpy).toHaveBeenCalledWith(EVENTS[0].name);
        });
    });

    // openNewEventDialog
    it('Scheduler: openNewEventDialog() method, agenda display', () => {
        element.selectedDisplay = 'agenda';

        return Promise.resolve()
            .then(() => {
                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                const spy = jest
                    .spyOn(agenda, 'newEvent')
                    .mockImplementation(() => {
                        return { occurrence: {}, event: {} };
                    });
                element.openNewEventDialog();
                expect(spy).toHaveBeenCalled();
            })
            .then(() => {
                const dialog = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"]'
                );
                expect(dialog).toBeTruthy();
                expect(dialog.title).toBe('New event');
            });
    });

    it('Scheduler: openNewEventDialog() method, calendar display', () => {
        element.selectedDisplay = 'calendar';

        return Promise.resolve()
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                const spy = jest
                    .spyOn(calendar, 'newEvent')
                    .mockImplementation(() => {
                        return { occurrence: {}, event: {} };
                    });
                element.openNewEventDialog();
                expect(spy).toHaveBeenCalled();
            })
            .then(() => {
                const dialog = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"]'
                );
                expect(dialog).toBeTruthy();
                expect(dialog.title).toBe('New event');
            });
    });

    it('Scheduler: openNewEventDialog() method, timeline display', () => {
        element.selectedDisplay = 'timeline';
        element.selectedResources = ['resource-3'];
        element.resources = RESOURCES;

        return Promise.resolve()
            .then(() => {
                const timeline = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-timeline"]'
                );
                const spy = jest
                    .spyOn(timeline, 'newEvent')
                    .mockImplementation(() => {
                        return { occurrence: {}, event: {} };
                    });
                element.openNewEventDialog();
                expect(spy).toHaveBeenCalled();
            })
            .then(() => {
                const dialog = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"]'
                );
                expect(dialog).toBeTruthy();
                expect(dialog.title).toBe('New event');
            });
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    // actionclick
    it('Scheduler: actionclick event', () => {
        element.selectedDisplay = 'timeline';
        element.selectedResources = ['resource-3'];
        element.resources = RESOURCES;

        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        return Promise.resolve()
            .then(() => {
                // Open the context menu
                const timeline = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-timeline"]'
                );
                jest.spyOn(timeline, 'selectEvent').mockImplementation(() => {
                    return {
                        event: EVENTS[0]
                    };
                });
                timeline.dispatchEvent(
                    new CustomEvent('eventcontextmenu', {
                        detail: {}
                    })
                );
            })
            .then(() => {
                const contextMenu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                contextMenu.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            name: 'someCustomAction'
                        }
                    })
                );

                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.detail.name).toBe('someCustomAction');
                expect(call.detail.targetName).toBe(EVENTS[0].name);
                expect(call.bubbles).toBeTruthy();
                expect(call.cancellable).toBeFalsy();
                expect(call.composed).toBeFalsy();
            });
    });

    // displayselect
    it('Scheduler: displayselect event', () => {
        const handler = jest.fn();
        element.addEventListener('displayselect', handler);

        const displayMenu = element.shadowRoot.querySelector(
            '[data-element-id="avonni-button-menu-toolbar-display"]'
        );
        displayMenu.dispatchEvent(
            new CustomEvent('select', {
                detail: {
                    value: 'agenda'
                }
            })
        );

        expect(handler).toHaveBeenCalled();
        const call = handler.mock.calls[0][0];
        expect(call.detail.name).toBe('agenda');
        expect(call.bubbles).toBeFalsy();
        expect(call.cancellable).toBeFalsy();
        expect(call.composed).toBeFalsy();

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            expect(agenda).toBeTruthy();
        });
    });

    // eventchange
    it('Scheduler: eventchange event', () => {
        element.selectedDisplay = 'agenda';
        element.selectedResources = ['resource-3'];
        element.resources = RESOURCES;

        const handler = jest.fn();
        element.addEventListener('eventchange', handler);

        const selection = {
            event: EVENTS[0],
            occurrence: EVENTS[0],
            draftValues: {}
        };

        return Promise.resolve()
            .then(() => {
                // Open the context menu
                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                jest.spyOn(agenda, 'selectEvent').mockImplementation(() => {
                    return selection;
                });
                agenda.dispatchEvent(
                    new CustomEvent('eventcontextmenu', {
                        detail: {}
                    })
                );
            })
            .then(() => {
                const contextMenu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                contextMenu.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            name: 'Standard.Scheduler.EditEvent'
                        }
                    })
                );
            })
            .then(() => {
                const title = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-event-title"]'
                );
                title.value = 'new title';
                title.dispatchEvent(new CustomEvent('change'));

                expect(selection.draftValues.title).toBe('new title');

                const dateRange = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-input-date-range-event-dates"]'
                );
                dateRange.dispatchEvent(
                    new CustomEvent('change', {
                        detail: {
                            startDate: new Date(2022, 0, 3).toISOString(),
                            endDate: new Date(2022, 0, 4).toISOString()
                        }
                    })
                );

                expect(selection.draftValues.from).toBe(
                    new Date(2022, 0, 3).toISOString()
                );
                expect(selection.draftValues.to).toBe(
                    new Date(2022, 0, 4).toISOString()
                );

                const resources = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-combobox-event-resources"]'
                );
                resources.dispatchEvent(
                    new CustomEvent('change', {
                        detail: { value: ['resource-1'] }
                    })
                );

                expect(selection.draftValues.resourceNames).toEqual([
                    'resource-1'
                ]);

                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                const saveSelectionSpy = jest
                    .spyOn(agenda, 'saveSelection')
                    .mockImplementation(() => {
                        agenda.dispatchEvent(
                            new CustomEvent('eventchange', {
                                detail: {
                                    name: selection.event.name,
                                    draftValues: selection.draftValues
                                }
                            })
                        );
                    });

                const saveButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-save-edit"]'
                );
                saveButton.click();

                expect(saveSelectionSpy).toHaveBeenCalled();
                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.bubbles).toBeTruthy();
                expect(call.cancellable).toBeFalsy();
                expect(call.composed).toBeFalsy();
            });
    });

    it('Scheduler: eventchange event from the recurrent event dialog', () => {
        element.selectedDisplay = 'calendar';

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
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                const spy = jest.spyOn(calendar, 'saveSelection');
                const saveButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-recurrence-dialog-save-one"]'
                );
                saveButton.click();
                expect(spy).toHaveBeenCalled();
            });
    });

    it('Scheduler: eventchange close the recurrent event dialog without saving', () => {
        element.selectedDisplay = 'calendar';

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
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                const spy = jest.spyOn(calendar, 'cleanSelection');
                const cancelButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-recurrence-dialog-cancel"]'
                );
                cancelButton.click();
                expect(spy).toHaveBeenCalled();
            });
    });

    it('Scheduler: eventchange event, close the edit dialog without saving', () => {
        element.selectedDisplay = 'agenda';
        element.selectedResources = ['resource-3'];
        element.resources = RESOURCES;

        const handler = jest.fn();
        element.addEventListener('eventchange', handler);

        const selection = {
            event: { data: EVENTS[0] },
            occurrence: EVENTS[0],
            draftValues: {},
            from: EVENTS[0].from,
            to: EVENTS[0].to
        };

        return Promise.resolve()
            .then(() => {
                // Open the context menu
                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                jest.spyOn(agenda, 'selectEvent').mockImplementation(() => {
                    return selection;
                });
                agenda.dispatchEvent(new CustomEvent('eventcontextmenu'));
            })
            .then(() => {
                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                jest.spyOn(agenda, 'newEvent').mockImplementation(() => {
                    return selection;
                });
                const contextMenu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                contextMenu.dispatchEvent(
                    new CustomEvent('privateselect', {
                        detail: {
                            name: 'Standard.Scheduler.AddEvent'
                        }
                    })
                );
            })
            .then(() => {
                const title = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-event-title"]'
                );
                title.value = 'new title';
                title.dispatchEvent(new CustomEvent('change'));

                expect(selection.draftValues.title).toBe('new title');

                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                const cleanSelectionSpy = jest.spyOn(agenda, 'cleanSelection');

                const cancelButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-cancel-edit"]'
                );
                cancelButton.click();

                expect(cleanSelectionSpy).toHaveBeenCalled();
                expect(handler).not.toHaveBeenCalled();
            });
    });

    it('Scheduler: eventchange event, dispatched by the timeline', () => {
        element.selectedDisplay = 'timeline';
        element.selectedResources = ['resource-3'];
        element.resources = RESOURCES;
        element.events = EVENTS;

        const handler = jest.fn();
        element.addEventListener('eventchange', handler);

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            const detail = {
                name: EVENTS[0].name,
                draftValues: {
                    title: 'Some new title'
                },
                recurrenceDates: {
                    from: new Date(2020, 0, 1),
                    to: new Date(2020, 0, 2)
                }
            };
            timeline.dispatchEvent(
                new CustomEvent('eventchange', {
                    detail
                })
            );

            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail).toEqual(detail);
        });
    });

    // eventcreate
    it('Scheduler: eventcreate event, dispatched by the agenda', () => {
        element.selectedDisplay = 'agenda';

        const handler = jest.fn();
        element.addEventListener('eventcreate', handler);

        return Promise.resolve().then(() => {
            const agenda = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-agenda"]'
            );
            const detail = {
                event: EVENTS[1]
            };
            agenda.dispatchEvent(
                new CustomEvent('eventcreate', {
                    detail
                })
            );

            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail).toEqual(detail);
            expect(call.bubbles).toBeTruthy();
            expect(call.cancellable).toBeFalsy();
            expect(call.composed).toBeFalsy();
        });
    });

    // eventdelete
    it('Scheduler: eventdelete event', () => {
        element.selectedDisplay = 'calendar';

        const handler = jest.fn();
        element.addEventListener('eventdelete', handler);

        return Promise.resolve()
            .then(() => {
                // Open the context menu
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                jest.spyOn(calendar, 'selectEvent').mockImplementation(() => {
                    return {
                        event: EVENTS[0]
                    };
                });
                calendar.dispatchEvent(
                    new CustomEvent('eventcontextmenu', {
                        detail: {}
                    })
                );
            })
            .then(() => {
                const contextMenu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                contextMenu.dispatchEvent(
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
                expect(dialog).toBeTruthy();
                const deleteButton = dialog.querySelector(
                    '[data-element-id="lightning-button-delete-dialog-delete"]'
                );
                deleteButton.click();

                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.detail.name).toBe(EVENTS[0].name);
                expect(call.bubbles).toBeTruthy();
                expect(call.cancellable).toBeFalsy();
                expect(call.composed).toBeFalsy();
            })
            .then(() => {
                const dialog = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"]'
                );
                expect(dialog).toBeFalsy();
            });
    });

    it('Scheduler: eventdelete event, cancel the deletion', () => {
        element.selectedDisplay = 'agenda';

        const handler = jest.fn();
        element.addEventListener('eventdelete', handler);

        return Promise.resolve()
            .then(() => {
                // Open the context menu
                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                jest.spyOn(agenda, 'selectEvent').mockImplementation(() => {
                    return {
                        event: EVENTS[0]
                    };
                });
                agenda.dispatchEvent(
                    new CustomEvent('eventcontextmenu', {
                        detail: {}
                    })
                );
            })
            .then(() => {
                const contextMenu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-dropdown-menu"]'
                );
                contextMenu.dispatchEvent(
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
                expect(dialog).toBeTruthy();
                const cancelButton = dialog.querySelector(
                    '[data-element-id="lightning-button-delete-dialog-cancel"]'
                );
                cancelButton.click();

                expect(handler).not.toHaveBeenCalled();
            })
            .then(() => {
                const dialog = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"]'
                );
                expect(dialog).toBeFalsy();
            });
    });

    // eventselect
    it('Scheduler: eventselect event', () => {
        element.selectedDisplay = 'calendar';

        const handler = jest.fn();
        element.addEventListener('eventselect', handler);

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-calendar"]'
            );
            const detail = {
                name: 'someName',
                recurrenceDates: {
                    from: new Date(2020, 0, 1),
                    to: new Date(2020, 0, 2)
                }
            };
            calendar.dispatchEvent(
                new CustomEvent('eventselect', {
                    detail,
                    bubbles: true
                })
            );

            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail).toEqual(detail);
            expect(call.bubbles).toBeTruthy();
            expect(call.cancellable).toBeFalsy();
            expect(call.composed).toBeFalsy();
        });
    });

    // timespanselect
    it('Scheduler: timespanselect event', () => {
        element.selectedDisplay = 'calendar';

        const handler = jest.fn();
        element.addEventListener('timespanselect', handler);

        return Promise.resolve()
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                expect(calendar.timeSpan).toMatchObject({
                    span: 1,
                    unit: 'day'
                });

                const timeSpanButtons = element.shadowRoot.querySelectorAll(
                    '[data-element-id="lightning-button-toolbar-time-span"]'
                );
                timeSpanButtons[1].click();

                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.detail.name).toBe(
                    'Standard.Scheduler.WeekTimeSpan'
                );
                expect(call.bubbles).toBeFalsy();
                expect(call.cancellable).toBeFalsy();
                expect(call.composed).toBeFalsy();
            })
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                expect(calendar.timeSpan).toMatchObject({
                    span: 1,
                    unit: 'week'
                });
            });
    });

    // resourceselect
    it('Scheduler: resourceselect event, coming from the calendar', () => {
        element.selectedDisplay = 'calendar';
        element.resources = RESOURCES;
        element.selectedResources = ['resource-3'];

        const handler = jest.fn();
        element.addEventListener('resourceselect', handler);

        return Promise.resolve()
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                expect(calendar.selectedResources).toEqual(['resource-3']);
                calendar.dispatchEvent(
                    new CustomEvent('resourceselect', {
                        detail: {
                            selectedResources: ['resource-1', 'resource-3'],
                            name: 'resource-1'
                        }
                    })
                );

                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.detail.name).toBe('resource-1');
                expect(call.detail.selectedResources).toEqual([
                    'resource-1',
                    'resource-3'
                ]);
                expect(call.bubbles).toBeFalsy();
                expect(call.cancellable).toBeFalsy();
                expect(call.composed).toBeFalsy();
            })
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                expect(calendar.selectedResources).toEqual([
                    'resource-1',
                    'resource-3'
                ]);
            });
    });

    it('Scheduler: resourceselect event, coming from the toolbar', () => {
        element.selectedDisplay = 'timeline';
        element.resources = RESOURCES;
        element.selectedResources = ['resource-3'];

        const handler = jest.fn();
        element.addEventListener('resourceselect', handler);

        return Promise.resolve()
            .then(() => {
                const timeline = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-timeline"]'
                );
                expect(timeline.selectedResources).toEqual(['resource-3']);

                const resourceMenu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-filter-menu-resources"]'
                );
                resourceMenu.dispatchEvent(
                    new CustomEvent('select', {
                        detail: {
                            value: ['resource-1', 'resource-3']
                        }
                    })
                );

                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.detail.name).toBe('resource-1');
                expect(call.detail.selectedResources).toEqual([
                    'resource-1',
                    'resource-3'
                ]);
            })
            .then(() => {
                const timeline = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-timeline"]'
                );
                expect(timeline.selectedResources).toEqual([
                    'resource-1',
                    'resource-3'
                ]);
            });
    });

    it('Scheduler: resourceselect event, unselect a resource from the toolbar', () => {
        element.selectedDisplay = 'timeline';
        element.resources = RESOURCES;
        element.selectedResources = ['resource-3'];

        const handler = jest.fn();
        element.addEventListener('resourceselect', handler);

        return Promise.resolve()
            .then(() => {
                const timeline = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-timeline"]'
                );
                expect(timeline.selectedResources).toEqual(['resource-3']);

                const resourceMenu = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-filter-menu-resources"]'
                );
                resourceMenu.dispatchEvent(
                    new CustomEvent('select', {
                        detail: {
                            value: []
                        }
                    })
                );

                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.detail.name).toBe('resource-3');
                expect(call.detail.selectedResources).toEqual([]);
            })
            .then(() => {
                const timeline = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-timeline"]'
                );
                expect(timeline).toBeFalsy();
            });
    });

    it('Scheduler: scheduleclick event', () => {
        element.resources = RESOURCES;
        element.selectedResources = ['resource-3'];
        element.start = new Date(2022, 9, 5);

        const handler = jest.fn();
        element.addEventListener('scheduleclick', handler);

        return Promise.resolve().then(() => {
            const timeline = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-scheduler-timeline"]'
            );
            const detail = {
                from: new Date(2022, 9, 5, 8).toISOString(),
                to: new Date(2022, 9, 5, 9).toISOString()
            };
            timeline.dispatchEvent(
                new CustomEvent('scheduleclick', {
                    detail,
                    bubbles: true
                })
            );

            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.detail.from).toBe(detail.from);
            expect(call.detail.to).toBe(detail.to);
            expect(call.bubbles).toBeFalsy();
            expect(call.cancellable).toBeFalsy();
            expect(call.composed).toBeFalsy();
        });
    });

    // Change of the visible interval by a primitive
    it('Scheduler: visible interval update by a primitive', () => {
        element.selectedDisplay = 'timeline';
        element.start = new Date(2022, 9, 5);
        element.selectedTimeSpan = 'Standard.Scheduler.MonthTimeSpan';
        element.resources = RESOURCES;
        element.selectedResources = ['resource-3'];

        return Promise.resolve()
            .then(() => {
                const label = DateTime.fromJSDate(
                    new Date(2022, 9, 5)
                ).toFormat('LLLL yyyy');
                const visibleIntervalLabel = element.shadowRoot.querySelector(
                    '[data-element-id="span-visible-interval-label"]'
                );
                expect(visibleIntervalLabel.textContent).toBe(label);

                const timeline = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-timeline"]'
                );
                const newStart = DateTime.fromJSDate(new Date(2022, 8, 10));
                const interval = Interval.fromDateTimes(
                    new Date(2022, 8, 1),
                    new Date(2022, 8, 30)
                );
                timeline.dispatchEvent(
                    new CustomEvent('visibleintervalchange', {
                        detail: {
                            start: newStart,
                            visibleInterval: interval
                        }
                    })
                );
            })
            .then(() => {
                const label = DateTime.fromJSDate(
                    new Date(2022, 8, 1)
                ).toFormat('LLLL yyyy');
                const visibleIntervalLabel = element.shadowRoot.querySelector(
                    '[data-element-id="span-visible-interval-label"]'
                );
                expect(visibleIntervalLabel.textContent).toBe(label);
            });
    });

    /*
     * ------------------------------------------------------------
     *  USER ACTIONS
     * -------------------------------------------------------------
     */

    // Close the toolbar calendar on focus out
    it('Scheduler: close the toolbar calendar on focus out', () => {
        element.selectedDisplay = 'agenda';
        jest.useFakeTimers();

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
                expect(calendar).toBeTruthy();

                // Do not close if the focus goes back to the calendar
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

                // Close if the focus is really out
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

    // Update the disabled dates in the toolbar calendar when navigating it
    it('Scheduler: update the disabled dates in the toolbar calendar when navigating it', () => {
        element.selectedDisplay = 'agenda';
        element.start = new Date(2022, 1, 5);
        element.availableMonths = [0, 1];

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
                expect(calendar.disabledDates).toEqual([]);
                calendar.dispatchEvent(
                    new CustomEvent('navigate', {
                        detail: {
                            date: new Date(2022, 2, 6)
                        }
                    })
                );
            })
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-toolbar"]'
                );
                const disabledDates = [];
                for (let i = 1; i < 32; i++) {
                    disabledDates.push(i);
                }
                expect(calendar.disabledDates).toEqual(disabledDates);
            });
    });

    // Move the selected date using the toolbar
    it('Scheduler: click on the Today button', () => {
        const start = new Date(2022, 0, 1, 13).getTime();
        element.selectedDisplay = 'calendar';
        element.start = start;

        return Promise.resolve()
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                expect(calendar.selectedDate.ts).toBe(start);

                const todayButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-toolbar-today"]'
                );
                todayButton.click();
            })
            .then(() => {
                const today = new Date().setHours(0, 0, 0, 0);
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                expect(calendar.selectedDate.ts).toBe(today);
            });
    });

    it('Scheduler: click on the Today button ignored if the current date is today', () => {
        const start = new Date();
        const spy = jest.spyOn(element, 'goToDate');
        element.start = start;

        return Promise.resolve().then(() => {
            const todayButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-toolbar-today"]'
            );
            todayButton.click();
            expect(spy).not.toHaveBeenCalled();
        });
    });

    it('Scheduler: click on the toolbar calendar', () => {
        const start = new Date(2022, 0, 1, 13).getTime();
        element.selectedDisplay = 'calendar';
        element.start = start;

        return Promise.resolve()
            .then(() => {
                const calendarButton = element.shadowRoot.querySelector(
                    '[data-element-id="button-toolbar-calendar"]'
                );
                calendarButton.click();
            })
            .then(() => {
                const toolbarCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-toolbar"]'
                );
                expect(toolbarCalendar.value.ts).toBe(start);
                toolbarCalendar.dispatchEvent(
                    new CustomEvent('change', {
                        detail: {
                            value: new Date(2022, 9, 18).toISOString()
                        }
                    })
                );
            })
            .then(() => {
                const toolbarCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-toolbar"]'
                );
                expect(toolbarCalendar).toBeFalsy();

                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                expect(calendar.selectedDate.ts).toBe(
                    new Date(2022, 9, 18).getTime()
                );
            });
    });

    it('Scheduler: click on the toolbar calendar is ignored if the value is empty', () => {
        const spy = jest.spyOn(element, 'goToDate');
        const calendarButton = element.shadowRoot.querySelector(
            '[data-element-id="button-toolbar-calendar"]'
        );
        calendarButton.click();
        expect(spy).not.toHaveBeenCalled();
    });

    it('Scheduler: click on Next and Previous buttons', () => {
        const start = new Date(2022, 0, 1, 13).getTime();
        element.selectedDisplay = 'calendar';
        element.selectedTimeSpan = 'Standard.Scheduler.MonthTimeSpan';
        element.start = start;

        return Promise.resolve()
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                expect(calendar.selectedDate.ts).toBe(start);

                const nextButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-toolbar-next"]'
                );
                nextButton.click();
            })
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                expect(calendar.selectedDate.ts).toBe(
                    new Date(2022, 1, 1).getTime()
                );

                const previousButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-toolbar-prev"]'
                );
                previousButton.click();
            })
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                expect(calendar.selectedDate.ts).toBe(
                    new Date(2022, 0, 1).getTime()
                );
            });
    });

    it('Scheduler: click on Previous button take available times into account', () => {
        const start = new Date(2022, 9, 6).getTime();
        element.selectedDisplay = 'calendar';
        element.availableDaysOfTheWeek = [0, 1, 2, 4, 5, 6];
        element.start = start;

        return Promise.resolve()
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                expect(calendar.selectedDate.ts).toBe(start);

                const previous = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-toolbar-prev"]'
                );
                previous.click();
            })
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-calendar"]'
                );
                expect(calendar.selectedDate.ts).toBe(
                    new Date(2022, 9, 4).getTime()
                );
            });
    });

    // Hide popovers
    it('Scheduler: hide detail popover on hidepopovers event', () => {
        element.selectedDisplay = 'agenda';

        return Promise.resolve()
            .then(() => {
                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                jest.spyOn(agenda, 'selectEvent').mockImplementation(() => {
                    return {
                        event: { data: {} },
                        occurrence: {
                            from: DateTime.fromJSDate(new Date(2022, 9, 4, 10)),
                            to: DateTime.fromJSDate(new Date(2022, 9, 4, 11))
                        }
                    };
                });
                agenda.dispatchEvent(new CustomEvent('eventmouseenter'));
                jest.runAllTimers();
            })
            .then(() => {
                const detailPopover = element.shadowRoot.querySelector(
                    '[data-element-id="div-detail-popover"]'
                );
                expect(detailPopover).toBeTruthy();

                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                agenda.dispatchEvent(
                    new CustomEvent('hidepopovers', {
                        detail: {
                            list: ['detail']
                        }
                    })
                );
            })
            .then(() => {
                const detailPopover = element.shadowRoot.querySelector(
                    '[data-element-id="div-detail-popover"]'
                );
                expect(detailPopover).toBeFalsy();
            });
    });

    it('Scheduler: hide detail popover on event mouse leave', () => {
        element.selectedDisplay = 'agenda';

        return Promise.resolve()
            .then(() => {
                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                jest.spyOn(agenda, 'selectEvent').mockImplementation(() => {
                    return {
                        event: { data: {} },
                        occurrence: {
                            from: DateTime.fromJSDate(new Date(2022, 9, 4, 10)),
                            to: DateTime.fromJSDate(new Date(2022, 9, 4, 11)),
                            key: 'someKey'
                        }
                    };
                });
                agenda.dispatchEvent(new CustomEvent('eventmouseenter'));
                jest.runAllTimers();
            })
            .then(() => {
                const detailPopover = element.shadowRoot.querySelector(
                    '[data-element-id="div-detail-popover"]'
                );
                expect(detailPopover).toBeTruthy();

                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                agenda.dispatchEvent(
                    new CustomEvent('eventmouseleave', {
                        detail: {
                            key: 'someKey'
                        }
                    })
                );
                jest.runAllTimers();
            })
            .then(() => {
                const detailPopover = element.shadowRoot.querySelector(
                    '[data-element-id="div-detail-popover"]'
                );
                expect(detailPopover).toBeFalsy();
            });
    });

    it('Scheduler: hide detail popover on escape key', () => {
        element.selectedDisplay = 'agenda';

        return Promise.resolve()
            .then(() => {
                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                jest.spyOn(agenda, 'selectEvent').mockImplementation(() => {
                    return {
                        event: { data: {} },
                        occurrence: {
                            from: DateTime.fromJSDate(new Date(2022, 9, 4, 10)),
                            to: DateTime.fromJSDate(new Date(2022, 9, 4, 11))
                        }
                    };
                });
                agenda.dispatchEvent(new CustomEvent('eventmouseenter'));
                jest.runAllTimers();
            })
            .then(() => {
                const detailPopover = element.shadowRoot.querySelector(
                    '[data-element-id="div-detail-popover"]'
                );
                expect(detailPopover).toBeTruthy();
                const keyup = new CustomEvent('keyup');
                keyup.key = 'Escape';
                detailPopover.dispatchEvent(keyup);
            })
            .then(() => {
                const detailPopover = element.shadowRoot.querySelector(
                    '[data-element-id="div-detail-popover"]'
                );
                expect(detailPopover).toBeFalsy();
            });
    });

    it('Scheduler: hide detail popover on popover mouse leave', () => {
        element.selectedDisplay = 'agenda';

        return Promise.resolve()
            .then(() => {
                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                jest.spyOn(agenda, 'selectEvent').mockImplementation(() => {
                    return {
                        event: { data: {} },
                        occurrence: {
                            from: DateTime.fromJSDate(new Date(2022, 9, 4, 10)),
                            to: DateTime.fromJSDate(new Date(2022, 9, 4, 11))
                        }
                    };
                });
                agenda.dispatchEvent(new CustomEvent('eventmouseenter'));
                jest.runAllTimers();
            })
            .then(() => {
                const detailPopover = element.shadowRoot.querySelector(
                    '[data-element-id="div-detail-popover"]'
                );
                expect(detailPopover).toBeTruthy();
                detailPopover.dispatchEvent(new CustomEvent('mouseleave'));
                jest.runAllTimers();
            })
            .then(() => {
                const detailPopover = element.shadowRoot.querySelector(
                    '[data-element-id="div-detail-popover"]'
                );
                expect(detailPopover).toBeFalsy();
            });
    });

    it('Scheduler: do not hide detail popover on popover mouse leave + mouse enter', () => {
        element.selectedDisplay = 'agenda';

        return Promise.resolve()
            .then(() => {
                const agenda = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-agenda"]'
                );
                jest.spyOn(agenda, 'selectEvent').mockImplementation(() => {
                    return {
                        event: { data: {} },
                        occurrence: {
                            from: DateTime.fromJSDate(new Date(2022, 9, 4, 10)),
                            to: DateTime.fromJSDate(new Date(2022, 9, 4, 11))
                        }
                    };
                });
                agenda.dispatchEvent(new CustomEvent('eventmouseenter'));
                jest.runAllTimers();
            })
            .then(() => {
                const detailPopover = element.shadowRoot.querySelector(
                    '[data-element-id="div-detail-popover"]'
                );
                expect(detailPopover).toBeTruthy();
                detailPopover.dispatchEvent(new CustomEvent('mouseleave'));
                detailPopover.dispatchEvent(new CustomEvent('mouseenter'));
                jest.runAllTimers();
            })
            .then(() => {
                const detailPopover = element.shadowRoot.querySelector(
                    '[data-element-id="div-detail-popover"]'
                );
                expect(detailPopover).toBeTruthy();
            });
    });

    it('Scheduler: hide context menu on hidepopovers event', () => {
        element.selectedResources = [RESOURCES[0].name];
        element.resources = RESOURCES;
        element.selectedDisplay = 'timeline';

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
                expect(menu).toBeTruthy();

                const timeline = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-primitive-scheduler-timeline"]'
                );
                timeline.dispatchEvent(
                    new CustomEvent('hidepopovers', {
                        detail: {
                            list: ['context']
                        }
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

    // Trap focus inside the popovers
    it('Scheduler: trap the focus in the edit popover', () => {
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
                                event: {},
                                occurrence: {
                                    from: DateTime.fromJSDate(
                                        new Date(2022, 9, 4, 10)
                                    ),
                                    to: DateTime.fromJSDate(
                                        new Date(2022, 9, 4, 11)
                                    )
                                }
                            }
                        }
                    })
                );
            })
            .then(() => {
                const dialog = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-dialog"]'
                );
                const spy = jest.spyOn(dialog, 'focusOnCloseButton');
                const saveButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-save-edit"]'
                );
                const tab = new CustomEvent('keydown');
                tab.key = 'Tab';
                saveButton.dispatchEvent(tab);
                expect(spy).toHaveBeenCalled();
            });
    });
});
