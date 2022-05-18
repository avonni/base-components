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
import { actions, items, yearlyItems, itemsWithoutIcons } from './data';

export default {
    title: 'Example/Activity Timeline',
    argTypes: {
        actions: {
            control: {
                type: 'object'
            },
            description: 'A list of different actions for dropdown menu.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        closed: {
            control: {
                type: 'boolean'
            },
            description: 'If true, close the section.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        collapsible: {
            control: {
                type: 'boolean'
            },
            description:
                'If true, the section is collapsible, the left icon is present.',
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
        iconSize: {
            name: 'icon-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            description:
                "The size of title's icon. Valid values are xx-small, x-small, small, medium and large.",
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' }
            }
        },
        itemIconSize: {
            name: 'item-icon-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            description:
                "The size of all the items' icon. Valid values are xx-small, x-small, small, medium and large.",
            table: {
                defaultValue: { summary: 'small' },
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
        position: {
            name: 'position',
            control: {
                type: 'select'
            },
            options: ['vertical', 'horizontal'],
            description:
                'Position of the activity timeline. Valid values include vertical and horizontal.',
            table: {
                defaultValue: { summary: 'vertical' },
                type: { summary: 'string' }
            }
        },
        sortedDirection: {
            name: 'sorted-direction',
            control: {
                type: 'select'
            },
            options: ['desc', 'asc'],
            description:
                'Specifies the sorting direction.  Valid values include asc and desc.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'desc' }
            }
        },
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title can include text, and is displayed in the header.',
            table: {
                type: { summary: 'string' }
            }
        }
    },
    args: {
        closed: false,
        collapsible: false,
        iconSize: 'medium',
        itemIconSize: 'small',
        position: 'vertical',
        sortedDirection: 'desc'
    }
};

const Template = (args) => ActivityTimeline(args);

export const Base = Template.bind({});
Base.args = {
    title: 'Activity Timeline',
    iconName: 'standard:timesheet_entry',
    items: items,
    collapsible: true,
    actions: actions
};

export const Ascending = Template.bind({});
Ascending.args = {
    title: 'Activity Timeline',
    iconName: 'standard:timesheet_entry',
    items: items,
    collapsible: true,
    actions: actions,
    sortedDirection: 'asc'
};

export const Horizontal = Template.bind({});
Horizontal.args = {
    title: 'Activity Timeline - Horizontal view',
    iconName: 'standard:timesheet_entry',
    position: 'horizontal',
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
    items: yearlyItems,
    collapsible: true,
    actions: actions
};

export const WithoutIcons = Template.bind({});
WithoutIcons.args = {
    title: 'Activity Timeline without some icons',
    iconName: 'standard:timesheet_entry',
    items: itemsWithoutIcons,
    collapsible: true,
    actions: actions
};
