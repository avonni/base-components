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
import { columns, rows, headers, events, disabledDatesTimes } from './data';

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
                type: 'object'
            },
            description:
                'Array of date/time scheduler header objects. \nThe headers are displayed in rows above the schedule, and used to create its columns.',
            table: {
                type: { summary: 'object' }
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
        visibleSpan: {
            name: 'visible-span',
            control: {
                type: 'object'
            },
            description:
                'Object used to set the visible date/time span on the screen. It has two keys: unit (valid values include minute, hour, day, month and year) and span (number).',
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
        theme: {
            control: {
                type: 'radio'
            },
            options: ['default', 'inverse'],
            defaultValue: 'default',
            description:
                'Theme of the scheduler. Valid values include default and inverse.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'default' }
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
    columns: columns,
    rowsKeyField: 'id',
    rows: rows,
    headers: headers,
    visibleSpan: {
        unit: 'week',
        span: 3
    },
    start: new Date(2021, 11, 13),
    availableTimeFrames: ['08:00-16:59'],
    availableDaysOfTheWeek: [1, 2, 3, 4, 5],
    events: events,
    disabledDatesTimes: disabledDatesTimes
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    columns: columns,
    rowsKeyField: 'id',
    rows: rows,
    headers: headers,
    visibleSpan: {
        unit: 'day',
        span: 5
    },
    start: new Date(2021, 11, 13),
    availableTimeFrames: ['09:00-17:59'],
    events: events,
    eventsTheme: 'line',
    readOnly: true,
    contextMenuEventActions: [
        {
            name: 'see-details',
            label: 'See details'
        }
    ]
};
