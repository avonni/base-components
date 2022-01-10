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

import { ActivityTimeline } from '../__examples__/activityTimeline';

export default {
    title: 'Example/Activity Timeline',
    argTypes: {
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text, and is displayed in the header.',
            table: {
                type: { summary: 'string' }
            }
        },
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed. The icon is displayed in the header before the title.",
            table: {
                type: { summary: 'string' }
            }
        },
        collapsible: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If true, the section is collapsible, the left icon is present.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        closed: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description: 'If true, close the section.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        groupBy: {
            name: 'group-by',
            control: {
                type: 'select'
            },
            options: ['week', 'month', 'year', ''],
            description: 'Values include week, month, year.',
            table: {
                type: { summary: 'string' }
            }
        },
        items: {
            control: {
                type: 'object'
            },
            table: {
                type: { summary: 'object[]' }
            }
        },
        actions: {
            control: {
                type: 'object'
            },
            description: 'A list of different actions for dropdown menu.',
            table: {
                type: { summary: 'object[]' }
            }
        }
    },
    args: {
        closed: false,
        collapsible: false
    }
};

const items = [
    {
        name: 'item1',
        title: 'Review proposals for EBC deck with larger team and have marketing review this',
        description: 'You created a task with Charlie Gomez',
        datetimeValue: '01/01/2022',
        href: 'salesforce.com',
        iconName: 'standard:task',
        icons: ['utility:refresh'],
        hasCheckbox: true,
        fields: [
            {
                label: 'Name',
                value: 'Charlie Gomez',
                type: 'url',
                typeAttributes: {
                    label: 'Charlie Gomez'
                }
            },
            {
                label: 'Related To',
                value: 'Tesla Cloudhub + Anypoint Connectors',
                type: 'url',
                typeAttributes: {
                    label: 'Tesla Cloudhub + Anypoint Connectors'
                }
            },
            {
                label: 'Description',
                value: 'Need to finalize proposals and brand details before the meeting',
                type: 'text'
            }
        ]
    },
    {
        name: 'item2',
        title: 'Mobile conversation on Monday',
        description: 'You logged a call with Adam Chan',
        href: '#',
        datetimeValue: '01/10/2022',
        iconName: 'standard:log_a_call',
        fields: [
            {
                label: 'Name',
                value: 'Adam Chan',
                type: 'url',
                typeAttributes: {
                    label: 'Adam Chan'
                }
            },
            {
                label: 'Related To',
                value: 'Tesla Cloudhub + Anypoint Connectors',
                type: 'url',
                typeAttributes: {
                    label: 'Tesla Cloudhub + Anypoint Connectors'
                }
            },
            {
                label: 'Description',
                value: 'Adam seemed interested in closing this deal quickly! Let’s move.',
                type: 'text'
            }
        ]
    },
    {
        name: 'item3',
        title: 'Re: Mobile conversation on Monday with the new global team',
        description: 'You emailed Lea Chan',
        datetimeValue: '01/20/2022 8:00',
        href: '#',
        iconName: 'standard:email',
        icons: ['utility:groups', 'utility:attach'],
        fields: [
            {
                label: 'Name',
                value: 'Jackie Dewar',
                type: 'url',
                typeAttributes: {
                    label: 'Jackie Dewar'
                }
            },
            {
                label: 'To Address',
                value: 'Lea Chan',
                type: 'url',
                typeAttributes: {
                    label: 'Lea Chan'
                }
            },
            {
                label: 'Text Body',
                value: 'Hi everyone, Thanks for meeting with the team today and going through the proposals we saw. This goes on and wraps if needed.',
                type: 'text'
            }
        ],
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:world'
    },
    {
        name: 'item4',
        title: 'EBC Follow up call',
        description: 'You created an event with Aida Lee and 5 others',
        icons: ['utility:world'],
        datetimeValue: 1619006400000,
        href: '#',
        iconName: 'standard:event',
        fields: [
            {
                label: 'Location',
                value: 'Westen St. Francis, San Francisco, CA, 94622',
                type: 'url',
                typeAttributes: {
                    label: 'Westen St. Francis, San Francisco, CA, 94622'
                }
            },
            {
                label: 'Attendees',
                value: 'Jason Dewar (Organizer) + 5 others',
                type: 'url',
                typeAttributes: {
                    label: 'Jason Dewar (Organizer) + 5 others'
                }
            },
            {
                label: 'When',
                value: 'March 26, 10:00 AM - 11:00 AM',
                type: 'url',
                typeAttributes: {
                    label: 'March 26, 10:00 AM - 11:00 AM'
                }
            },
            {
                label: 'Description',
                value: "Let's discuss the 2017 product roadmap and address any questions",
                type: 'text'
            }
        ],
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:world',
        closed: true
    },
    {
        name: 'item5',
        title: 'Create one task',
        description: 'Fields are loading',
        datetimeValue: 1621605600000,
        href: '#',
        iconName: 'standard:dashboard',
        loadingStateAlternativeText: 'Is Loading',
        hasCheckbox: true,
        isLoading: true,
        buttonLabel: 'Public Sharing',
        buttonIconName: 'utility:world'
    },
    {
        name: 'item6',
        title: 'Create another task',
        datetimeValue: 1621611000000,
        href: '#',
        iconName: 'standard:case',
        hasCheckbox: true,
        hasError: true
    }
];

const actions = [
    {
        label: 'Add item',
        name: 'add-item',
        iconName: 'utility:add'
    },
    {
        label: 'Edit item',
        name: 'edit-item',
        iconName: 'utility:edit'
    }
];

const Template = (args) => ActivityTimeline(args);

export const Base = Template.bind({});
Base.args = {
    title: 'Activity Timeline',
    iconName: 'standard:timesheet_entry',
    items: items,
    collapsible: true,
    actions: actions
};

export const Weekly = Template.bind({});
Weekly.args = {
    title: 'Activity Timeline grouped by week',
    iconName: 'standard:timesheet_entry',
    items: items,
    collapsible: true,
    actions: actions,
    groupBy: 'week'
};

export const WeeklyNotCollapsible = Template.bind({});
WeeklyNotCollapsible.args = {
    title: 'Activity Timeline not collapsible',
    iconName: 'standard:timesheet_entry',
    items: items,
    collapsible: false,
    actions: actions,
    groupBy: 'week'
};

export const Monthly = Template.bind({});
Monthly.args = {
    title: 'Activity Timeline grouped by month',
    iconName: 'standard:timesheet_entry',
    groupBy: 'month',
    items: items,
    collapsible: true,
    actions: actions
};

export const Yearly = Template.bind({});
Yearly.args = {
    title: 'Activity Timeline grouped by year',
    iconName: 'standard:timesheet_entry',
    groupBy: 'year',
    items: items,
    collapsible: true,
    actions: actions
};
