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

import { Scheduler } from '../__examples__/scheduler';
import {
    columns,
    oneColumn,
    rows,
    headers,
    events,
    eventsThemed,
    eventsWithLabels,
    disabledDatesTimes,
    referenceLines,
    start,
    lotsOfEvents,
    lotsOfRows
} from './data';

export default {
    title: 'Example/Scheduler',
    argTypes: {
        start: {
            control: {
                type: 'date'
            },
            description:
                'Specifies the minimum date the calendar can show. It can be a Date object, timestamp, or an ISO8601 formatted string.',
            defaultValue: new Date(),
            table: {
                type: { summary: 'object' },
                defaultValue: { summary: 'Date()' },
                category: 'Available dates'
            }
        },
        headers: {
            control: {
                type: 'select'
            },
            options: [
                'minuteAndHour',
                'minuteHourAndDay',
                'hourAndDay',
                'hourDayAndWeek',
                'dayAndWeek',
                'dayLetterAndWeek',
                'dayWeekAndMonth',
                'weekAndMonth',
                'weekMonthAndYear',
                'monthAndYear',
                'quartersAndYear',
                'fiveYears'
            ],
            defaultValue: 'hourAndDay',
            description:
                'Name of the header preset to use. The headers are displayed in rows above the schedule, and used to create its columns. ',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'hourAndDay' }
            }
        },
        customHeaders: {
            name: 'custom-headers',
            control: {
                type: 'object'
            },
            description:
                'Array of date/time scheduler header objects. If present, it will overwrite the headers.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        columns: {
            control: {
                type: 'object'
            },
            description:
                'Array of datatable column objects. The columns are displayed to the left of the schedule.',
            table: {
                type: { summary: 'object' }
            }
        },
        resizeColumnDisabled: {
            name: 'resize-column-disabled',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If present, column resizing is disabled.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        collapseDisabled: {
            name: 'collapse-disabled',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If present, the schedule column is not collapsible or expandable.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        rows: {
            control: {
                type: 'object'
            },
            description:
                'Array of datatable data objects. Each object represent a row of the scheduler.',
            table: {
                type: { summary: 'object' }
            }
        },
        rowsKeyField: {
            name: 'rows-key-field',
            control: {
                type: 'text'
            },
            description:
                'Name of a key of the row objects. This key needs to be present in all row objects. Its value needs to be unique to a row, as it will be used as the row identifier.',
            table: {
                type: { summary: 'string' }
            }
        },
        timeSpan: {
            name: 'time-span',
            control: {
                type: 'object'
            },
            description:
                'Object used to set the duration of the scheduler. It has two keys: unit (valid values include minute, hour, day, month and year) and span (number).',
            defaultValue: { unit: 'hour', span: 12 },
            table: {
                type: { summary: 'object' },
                defaultValue: { summary: "{ unit: 'hour', span: 12 }" }
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
        readOnly: {
            name: 'read-only',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If present, the scheduler is not editable. The events cannot be dragged and the default actions (edit, delete and add event) will be hidden from the context menus.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If present, a loading spinner will be visible.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            defaultValue: 'Loading',
            description: 'Alternative text of the loading spinner.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Loading' }
            }
        },
        recurrentEditModes: {
            name: 'recurrent-edit-modes',
            control: {
                type: 'object'
            },
            defaultValue: ['all', 'one'],
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
        availableTimeFrames: {
            name: 'available-time-frames',
            control: {
                type: 'object'
            },
            defaultValue: ['00:00-23:59'],
            description:
                'Array of available time frames. If present, the scheduler will only show the available time frames. Defaults to the full day being available. \nEach time frame string must follow the pattern ‘start-end’, with start and end being ISO8601 formatted time strings.',
            table: {
                type: { summary: 'object' },
                defaultValue: { summary: "['00:00-23:59']" },
                category: 'Available dates'
            }
        },
        availableDaysOfTheWeek: {
            name: 'available-days-of-the-week',
            control: {
                type: 'object'
            },
            defaultValue: [0, 1, 2, 3, 4, 5, 6],
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
            defaultValue: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
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
        dateFormat: {
            name: 'date-format',
            control: {
                type: 'text'
            },
            defaultValue: 'ff',
            description:
                "The date format to use in the events' details popup and the labels. See Luxon’s documentation for accepted format. If you want to insert text in the label, you need to escape it using single quote.\n For example, the format of “Jan 14 day shift” would be “LLL dd 'day shift'\". ",
            table: {
                type: { summary: 'string' },
                category: 'Events',
                defaultValue: { summary: 'ff' }
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
        eventsLabels: {
            name: 'events-labels',
            control: {
                type: 'object'
            },
            defaultValue: {
                center: { fieldName: 'title' }
            },
            description:
                'Labels of the events, by their position. Valid keys include: top, bottom, left, right, center. \nThe values can be the name of a row key, or the name of an event key. If the row and the event both have a key with the same name, the event value will be used.',
            table: {
                type: { summary: 'object' },
                defaultValue: { summary: "{ center: { fieldName: 'title' } }" },
                category: 'Events'
            }
        },
        eventsTheme: {
            name: 'events-theme',
            control: {
                type: 'select'
            },
            options: ['default', 'transparent', 'line', 'hollow', 'rounded'],
            defaultValue: 'default',
            description:
                'Theme of the events. Valid values include default, transparent, line, hollow and rounded.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'default' },
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
            defaultValue: 'aurora',
            description:
                'Default palette used for the event colors. Valid values include aurora, bluegrass, dusk, fire, heat, lake, mineral, nightfall, ocean, pond, sunrise, water, watermelon, wildflowers.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'aurora' },
                category: 'Events'
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
                    detail: `[{ name: 'edit', label: 'Edit', iconName: 'utility:edit' }, { name: 'delete', label: 'Delete', iconName: 'utility:delete' }]`
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
                    summary: 'add-event actions',
                    detail: `[{ name: 'add-event', label: 'Add event', iconName: 'utility:add' }]`
                }
            }
        },
        editDialogLabels: {
            name: 'edit-dialog-labels',
            control: {
                type: 'object'
            },
            defaultValue: {
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
            },
            description: 'Labels of the elements in the event edit dialog.',
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
                        newEventTitle: 'New event'
                    }`
                },
                category: 'Events'
            }
        }
    }
};

const Template = (args) => Scheduler(args);

export const Base = Template.bind({});
Base.args = {
    columns,
    rowsKeyField: 'id',
    rows,
    start,
    events: lotsOfEvents(5).slice(0, 10)
};

export const BigDataSet = Template.bind({});
BigDataSet.args = {
    columns: oneColumn,
    rowsKeyField: 'id',
    rows: lotsOfRows(),
    start,
    events: lotsOfEvents(),
    timeSpan: {
        unit: 'year',
        span: 3
    }
};

export const AvailableAndDisabledTimes = Template.bind({});
AvailableAndDisabledTimes.args = {
    columns,
    rowsKeyField: 'id',
    rows,
    customHeaders: headers,
    timeSpan: {
        unit: 'week',
        span: 2
    },
    start,
    availableTimeFrames: ['08:00-17:00'],
    availableDaysOfTheWeek: [1, 2, 3, 4, 5],
    events,
    disabledDatesTimes: disabledDatesTimes,
    referenceLines: referenceLines
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    columns,
    rowsKeyField: 'id',
    rows,
    timeSpan: {
        unit: 'day',
        span: 5
    },
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
    ]
};

export const Labels = Template.bind({});
Labels.args = {
    columns,
    rowsKeyField: 'id',
    rows,
    start,
    events: eventsWithLabels,
    timeSpan: {
        unit: 'day',
        span: '2'
    },
    headers: 'minuteHourAndDay',
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
            fieldName: 'firstName',
            iconName: 'utility:user'
        }
    },
    dateFormat: 'hh:mm'
};

export const ThemesAndColors = Template.bind({});
ThemesAndColors.args = {
    columns,
    rowsKeyField: 'id',
    rows,
    start,
    events: eventsThemed,
    eventsPalette: 'wildflowers'
};
