import { Scheduler } from '../__examples__/scheduler';
import {
    columns,
    resources,
    headers,
    events,
    eventsWithExtraKeys,
    eventsThemed,
    eventsWithLabels,
    disabledDatesTimes,
    referenceLines,
    start,
    basicEvents,
    oneColumn,
    longEvents
} from './data';

export default {
    title: 'Example/Scheduler',
    argTypes: {
        availableDaysOfTheWeek: {
            name: 'available-days-of-the-week',
            control: {
                type: 'object'
            },
            description:
                'Array of available days of the week. If present, the scheduler will only show the available days of the week. Defaults to all days being available. \nThe days are represented by a number, starting from 0 for Sunday, and ending with 6 for Saturday.',
            table: {
                type: { summary: 'object' },
                defaultValue: { summary: '[0, 1, 2, 3, 4, 5, 6]' },
                category: 'Available dates'
            }
        },
        availableMonths: {
            name: 'available-months',
            control: {
                type: 'object'
            },
            description:
                'Array of available months. If present, the scheduler will only show the available months. Defaults to all months being available. \nThe months are represented by a number, starting from 0 for January, and ending with 11 for December.',
            table: {
                type: { summary: 'object' },
                defaultValue: {
                    summary: '[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]'
                },
                category: 'Available dates'
            }
        },
        availableTimeFrames: {
            name: 'available-time-frames',
            control: {
                type: 'object'
            },
            description:
                'Array of available time frames. If present, the scheduler will only show the available time frames. Defaults to the full day being available. \nEach time frame string must follow the pattern ‘start-end’, with start and end being ISO8601 formatted time strings.',
            table: {
                type: { summary: 'object' },
                defaultValue: { summary: "['00:00-23:59']" },
                category: 'Available dates'
            }
        },
        collapseDisabled: {
            name: 'collapse-disabled',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the schedule column is not collapsible or expandable.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Panels and Toolbar'
            }
        },
        columns: {
            control: {
                type: 'object'
            },
            description:
                'Array of datatable column objects. The columns are displayed to the left of the schedule.',
            table: {
                type: { summary: 'object' },
                category: 'Panels and Toolbar'
            }
        },
        contextMenuEventActions: {
            name: 'context-menu-event-actions',
            control: {
                type: 'object'
            },
            description:
                'Array of action objects. These actions will be displayed in the context menu that appears when a user right-clicks on an event.',
            table: {
                type: { summary: 'object[]' },
                defaultValue: {
                    summary: 'edit and delete actions',
                    detail: `[{ name: 'Standard.Scheduler.EditEvent', label: 'Edit', iconName: 'utility:edit' }, { name: 'Standard.Scheduler.DeleteEvent', label: 'Delete', iconName: 'utility:delete' }]`
                },
                category: 'Events'
            }
        },
        contextMenuEmptySpotActions: {
            name: 'context-menu-empty-spot-actions',
            control: {
                type: 'object'
            },
            description:
                'Array of action objects. These actions will be displayed in the context menu that appears when a user right-clicks on an empty space of the schedule.',
            table: {
                type: { summary: 'object[]' },
                defaultValue: {
                    summary: 'Standard.Scheduler.AddEvent actions',
                    detail: `[{ name: 'Standard.Scheduler.AddEvent', label: 'Add event', iconName: 'utility:add' }]`
                }
            }
        },
        customEventsPalette: {
            name: 'custom-events-palette',
            control: {
                type: 'object'
            },
            description:
                'Array of colors to use as a palette for the events. If present, it will overwrite the events-palette selected. \nThe color strings have to be valid CSS color values.',
            table: {
                type: { summary: 'object' },
                category: 'Events'
            }
        },
        dateFormat: {
            name: 'date-format',
            control: {
                type: 'text'
            },
            description:
                "The date format to use in the events' details popup and the labels. See Luxon’s documentation for accepted format. If you want to insert text in the label, you need to escape it using single quote.\n For example, the format of “Jan 14 day shift” would be “LLL dd 'day shift'\". ",
            table: {
                type: { summary: 'string' },
                category: 'Events',
                defaultValue: { summary: 'ff' }
            }
        },
        dialogLabels: {
            name: 'dialog-labels',
            control: {
                type: 'object'
            },
            description: 'Labels used in the edit and delete dialogs.',
            table: {
                type: { summary: 'object' },
                defaultValue: {
                    summary: 'object containing key-label pairs',
                    detail: `{
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
                        deleteMessage: 'Are you sure you want to delete this event?'
                        newEventTitle: 'New event'
                    }`
                },
                category: 'Events'
            }
        },
        disabledDatesTimes: {
            name: 'disabled-dates-times',
            control: {
                type: 'object'
            },
            description: 'Array of disabled date/time objects.',
            table: {
                type: { summary: 'object' },
                category: 'Available dates'
            }
        },
        events: {
            control: {
                type: 'object'
            },
            description: 'Array of event objects.',
            table: {
                type: { summary: 'object' },
                category: 'Events'
            }
        },
        eventsLabels: {
            name: 'events-labels',
            control: {
                type: 'object'
            },
            description:
                'Labels of the events. Valid keys include top, bottom, left, right and center. The value of each key should be a label object. \nTop, bottom, left and right labels are only supported for the timeline display with a horizontal variant.',
            table: {
                type: { summary: 'object' },
                defaultValue: { summary: "{ center: { fieldName: 'title' } }" },
                category: 'Events'
            }
        },
        eventsPalette: {
            name: 'events-palette',
            control: {
                type: 'select'
            },
            options: [
                'aurora',
                'bluegrass',
                'dusk',
                'fire',
                'heat',
                'lake',
                'mineral',
                'nightfall',
                'ocean',
                'pond',
                'sunrise',
                'water',
                'watermelon',
                'wildflowers'
            ],
            description:
                'Default palette used for the event colors. Valid values include aurora, bluegrass, dusk, fire, heat, lake, mineral, nightfall, ocean, pond, sunrise, water, watermelon, wildflowers.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'aurora' },
                category: 'Events'
            }
        },
        eventsDisplayFields: {
            name: 'events-display-fields',
            control: {
                type: 'object'
            },
            description:
                'Array of data objects, displayed in the popover visible on hover on an event. See Output Data for valid keys. The value of each field should be a key of the selected event object.',
            table: {
                type: { summary: 'object[]' },
                category: 'Events'
            }
        },
        eventsTheme: {
            name: 'events-theme',
            control: {
                type: 'select'
            },
            options: ['default', 'transparent', 'line', 'hollow', 'rounded'],
            description:
                'Theme of the events. Valid values include default, transparent, line, hollow and rounded.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'default' },
                category: 'Events'
            }
        },
        hiddenActions: {
            name: 'hidden-actions',
            control: {
                type: 'object'
            },
            description:
                'Array of default action names that are not allowed. These actions will be hidden from the menus, and ignored when triggered by a user action (double click, drag, etc.). Valid values include `Standard.Scheduler.AddEvent`, `Standard.Scheduler.DeleteEvent` and `Standard.Scheduler.EditEvent`.',
            table: {
                type: { summary: 'string[]' },
                category: 'Events'
            }
        },
        hiddenDisplays: {
            name: 'hidden-displays',
            control: {
                type: 'object'
            },
            description:
                'Array of display names that should not appear in the toolbar options. Valid values include calendar, agenda and timeline.',
            table: {
                type: { summary: 'string[]' },
                category: 'Panels and Toolbar'
            }
        },
        hideResourcesFilter: {
            name: 'hide-resources-filter',
            control: {
                type: 'boolean'
            },
            description: 'If present, the resources filter is hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Panels and Toolbar'
            }
        },
        hideSidePanel: {
            name: 'hide-side-panel',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the side panel will be hidden. This attribute only affects the agenda and calendar displays.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Panels and Toolbar'
            }
        },
        hideToolbar: {
            name: 'hide-toolbar',
            control: {
                type: 'boolean'
            },
            description: 'If present, the toolbar is hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Panels and Toolbar'
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            description: 'If present, a loading spinner will be visible.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        labelNoEventsFound: {
            name: 'label-no-events-found',
            control: {
                type: 'text'
            },
            description:
                'Message shown in the agenda display, when there are no events for the selected date.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'No events for the selected date.' }
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            description: 'Alternative text of the loading spinner.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Loading' }
            }
        },
        readOnly: {
            name: 'read-only',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the scheduler is not editable. The events cannot be dragged and the default actions (edit, delete and add event) will be hidden from the context menus.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        recurrentEditModes: {
            name: 'recurrent-edit-modes',
            control: {
                type: 'object'
            },
            description:
                'Allowed edition modes for recurrent events. Available options are: - "all": All recurrent event occurrences will be updated when a change is made to one occurrence. - "one": Only the selected occurrence will be updated when a change is made.',
            table: {
                type: { summary: 'string[]' },
                defaultValue: { summary: ['all', 'one'] },
                category: 'Events'
            }
        },
        referenceLines: {
            name: 'reference-lines',
            control: {
                type: 'object'
            },
            description: 'Array of reference line objects.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        resizeColumnDisabled: {
            name: 'resize-column-disabled',
            control: {
                type: 'boolean'
            },
            description: 'If present, column resizing is disabled.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Panels and Toolbar'
            }
        },
        resources: {
            control: {
                type: 'object'
            },
            description:
                'Array of resource objects. The resources can be bound to events.',
            table: {
                type: { summary: 'object' }
            }
        },
        selectedDisplay: {
            name: 'selected-display',
            control: {
                type: 'text'
            },
            description:
                'Selected display of the scheduler. Valid values include agenda, calendar and timeline.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'timeline' },
                category: 'Panels and Toolbar'
            }
        },
        selectedResources: {
            name: 'selected-resources',
            control: {
                type: 'object'
            },
            description:
                'Array of selected resources names. Only the events of the selected resources will be visible.',
            table: {
                type: { summary: 'string[]' }
            }
        },
        selectedTimeSpan: {
            name: 'selected-time-span',
            control: {
                type: 'text'
            },
            description:
                'Unique name of the selected time span. The selected time span will determine the visible duration of the scheduler.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Standard.Scheduler.DayTimeSpan' },
                category: 'Panels and Toolbar'
            }
        },
        sidePanelPosition: {
            name: 'side-panel-position',
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            description:
                'Position of the side panel, relative to the schedule. This attribute only affects the agenda and calendar displays.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
                category: 'Panels and Toolbar'
            }
        },
        start: {
            control: {
                type: 'date'
            },
            description:
                'Specifies the minimum date the calendar can show. It can be a Date object, timestamp, or an ISO8601 formatted string.',
            table: {
                type: { summary: 'object' },
                defaultValue: { summary: 'Date()' },
                category: 'Available dates'
            }
        },
        toolbarActions: {
            name: 'toolbar-actions',
            control: {
                type: 'object'
            },
            description:
                'Array of action objects. If present, the actions will be shown in the toolbar.',
            table: {
                type: { summary: 'object[]' },
                category: 'Panels and Toolbar'
            }
        },
        timeSpans: {
            name: 'time-spans',
            control: {
                type: 'object'
            },
            description:
                'Array of time span objects. The time spans will be displayed in the toolbar. Only three options can be visible, the others will be listed in a button menu.',
            table: {
                type: { summary: 'object[]' },
                defaultValue: {
                    summary: `[
                        { unit: 'day', span: 1, label: 'Day', headers: 'hourAndDay', name: 'Standard.Scheduler.DayTimeSpan' },
                        { unit: 'week', span: 1, label: 'Week', headers: 'hourAndDay', name: 'Standard.Scheduler.WeekTimeSpan' },
                        { unit: 'month', span: 1, label: 'Month', headers: 'dayAndMonth', name: 'Standard.Scheduler.MonthTimeSpan' },
                        { unit: 'year', span: 1, label: 'Year', headers: 'dayAndMonth', name: 'Standard.Scheduler.YearTimeSpan' }
                    ]`
                },
                category: 'Panels and Toolbar'
            }
        },
        timezone: {
            control: {
                type: 'text'
            },
            description:
                "Time zone used, in a valid IANA format. If empty, the browser's time zone is used.",
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['horizontal', 'vertical'],
            description:
                'Orientation of the scheduler. Valid values include horizontal and vertical.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'horizontal' }
            }
        },
        zoomToFit: {
            name: 'zoom-to-fit',
            control: {
                type: 'boolean'
            },
            description:
                'If present, horizontal scrolling will be prevented in the timeline view, and vertical scrolling will be prevented in the calendar view.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        }
    },
    args: {
        availableDaysOfTheWeek: [0, 1, 2, 3, 4, 5, 6],
        availableMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        availableTimeFrames: ['00:00-23:59'],
        collapseDisabled: false,
        dateFormat: 'ff',
        dialogLabels: {
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
        },
        eventsLabels: {
            center: { fieldName: 'title' }
        },
        eventsPalette: 'aurora',
        eventsTheme: 'default',
        hideResourcesFilter: false,
        hideSidePanel: false,
        hideToolbar: false,
        isLoading: false,
        labelNoEventsFound: 'No events for the selected date.',
        loadingStateAlternativeText: 'Loading',
        recurrentEditModes: ['all', 'one'],
        readOnly: false,
        resizeColumnDisabled: false,
        selectedDisplay: 'timeline',
        selectedTimeSpan: 'Standard.Scheduler.DayTimeSpan',
        sidePanelPosition: 'left',
        start: new Date(),
        timeSpans: [
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
        ],
        variant: 'horizontal',
        zoomToFit: false
    }
};

const Template = (args) => Scheduler(args);

export const Base = Template.bind({});
Base.args = {
    columns,
    resources,
    start,
    events: basicEvents,
    selectedResources: ['Dave', 'Reginald', 'Nina', 'Jung', 'Lily']
};

export const Calendar = Template.bind({});
Calendar.args = {
    resources,
    start,
    events: eventsWithExtraKeys,
    selectedDisplay: 'calendar',
    selectedResources: ['Dave', 'Jung', 'Reginald'],
    selectedTimeSpan: 'Standard.Scheduler.WeekTimeSpan',
    disabledDatesTimes,
    referenceLines,
    eventsDisplayFields: [
        {
            label: 'Start',
            value: 'from',
            type: 'date'
        },
        {
            label: 'End',
            value: 'to',
            type: 'date'
        },
        {
            label: 'Office',
            value: 'office'
        },
        {
            label: 'Cost',
            value: 'cost',
            type: 'currency',
            typeAttributes: {
                currencyCode: 'CAD',
                currencyDisplayAs: 'name',
                minimumFractionDigits: 2
            }
        }
    ]
};

export const Agenda = Template.bind({});
Agenda.args = {
    resources,
    start,
    events,
    selectedDisplay: 'agenda',
    selectedResources: ['Dave', 'Jung', 'Reginald'],
    selectedTimeSpan: 'Standard.Scheduler.WeekTimeSpan',
    disabledDatesTimes,
    referenceLines
};

export const VerticalTimeline = Template.bind({});
VerticalTimeline.args = {
    resources,
    start,
    availableTimeFrames: ['08:00-17:00'],
    availableDaysOfTheWeek: [1, 2, 3, 4, 5],
    events,
    disabledDatesTimes,
    referenceLines,
    variant: 'vertical',
    selectedResources: ['Dave', 'Reginald', 'Nina']
};

export const AvailableAndDisabledTimes = Template.bind({});
AvailableAndDisabledTimes.args = {
    columns,
    resources,
    start,
    timeSpans: [
        {
            unit: 'day',
            span: 1,
            label: 'Day',
            headers: 'hourAndDay',
            name: 'day'
        },
        {
            unit: 'week',
            span: 2,
            label: 'Sprint',
            name: 'sprint',
            customHeaders: headers
        },
        {
            unit: 'month',
            span: 1,
            label: 'Month',
            headers: 'dayAndMonth',
            name: 'month'
        }
    ],
    selectedTimeSpan: 'sprint',
    availableTimeFrames: ['08:00-17:00'],
    availableDaysOfTheWeek: [1, 2, 3, 4, 5],
    events,
    disabledDatesTimes,
    referenceLines,
    selectedResources: ['Dave', 'Reginald', 'Nina', 'Jung', 'Lily']
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    columns,
    resources,
    selectedTimeSpan: 'workWeek',
    availableDaysOfTheWeek: [1, 2, 3, 4, 5],
    timeSpans: [
        {
            name: 'day',
            label: 'Day'
        },
        {
            name: 'workWeek',
            label: 'Work Week',
            unit: 'day',
            span: 5
        },
        {
            name: 'trimester',
            label: 'Trimester',
            unit: 'month',
            span: 3,
            headers: 'monthAndYear'
        }
    ],
    start,
    events,
    eventsTheme: 'line',
    eventsPalette: 'dusk',
    readOnly: true,
    contextMenuEventActions: [
        {
            name: 'see-details',
            label: 'See details'
        }
    ],
    contextMenuEmptySpotActions: [],
    selectedResources: ['Dave', 'Reginald', 'Nina', 'Jung']
};

export const ZoomToFit = Template.bind({});
ZoomToFit.args = {
    zoomToFit: true,
    columns: oneColumn,
    resources,
    selectedTimeSpan: 'year',
    timeSpans: [
        {
            unit: 'week',
            span: 1,
            label: 'Week',
            headers: 'dayAndWeek',
            name: 'week'
        },
        {
            unit: 'month',
            span: 1,
            label: 'Month',
            headers: 'dayAndMonth',
            name: 'month'
        },
        {
            unit: 'year',
            span: 1,
            label: 'Year',
            headers: 'monthAndYear',
            name: 'year'
        }
    ],
    start: new Date(2021, 0, 1),
    events: longEvents,
    eventsPalette: 'pond',
    selectedResources: ['Dave', 'Reginald', 'Nina', 'Jung', 'Lily']
};

export const Labels = Template.bind({});
Labels.args = {
    columns,
    resources,
    start,
    events: eventsWithLabels,
    selectedTimeSpan: 'twoDays',
    timeSpans: [{ span: 2, label: 'Two days', name: 'twoDays' }],
    eventsLabels: {
        left: {
            fieldName: 'from'
        },
        top: {
            fieldName: 'title'
        },
        bottom: {
            fieldName: 'role'
        },
        right: {
            fieldName: 'to'
        },
        center: {
            fieldName: 'name',
            iconName: 'utility:user'
        }
    },
    dateFormat: 'hh:mm',
    hideToolbar: true,
    selectedResources: ['Dave', 'Reginald', 'Nina', 'Jung']
};

export const ThemesAndColors = Template.bind({});
ThemesAndColors.args = {
    columns,
    resources,
    start,
    events: eventsThemed,
    eventsPalette: 'wildflowers',
    selectedResources: ['Dave', 'Reginald', 'Nina', 'Jung', 'Lily'],
    toolbarActions: [
        {
            label: 'Action 1',
            name: 'actionOne'
        },
        {
            label: 'Action 2',
            name: 'actionTwo'
        }
    ]
};
