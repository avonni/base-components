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

import { Kanban } from '../__examples__/kanban';
import { GROUP_VALUES, FIELDS, RECORDS, ACTIONS } from './data';

export default {
    title: 'Example/Kanban',
    argTypes: {
        actions: {
            control: {
                type: 'object'
            },
            description:
                ' Array of action objects. The actions are displayed on each card and refer to tasks you can perform, such as updating or deleting the card.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        fields: {
            control: {
                type: 'object'
            },
            description:
                ' Array of field objects, used to define the allowed data fields.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        groupValues: {
            name: 'group-values',
            control: {
                type: 'object'
            },
            description:
                ' Array of group objects. Each group represents one step of the path.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        coverImageFieldName: {
            name: 'cover-image-field-name',
            control: {
                type: 'text'
            },
            description:
                ' Name of the field that contains the cover image for the tile.',
            table: {
                type: { summary: 'String' }
            }
        },
        groupFieldName: {
            name: 'group-field-name',
            control: {
                type: 'text'
            },
            description:
                ' Name of the data field containing the group label the data belongs to. ',
            table: {
                type: { summary: 'String' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            description:
                '  If present, the Kanban is in a loading state and shows a spinner.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        disableColumnDragAndDrop: {
            name: 'disable-column-drag-and-drop',
            control: {
                type: 'boolean'
            },
            description: ' If present, the columns cannot be dragged by users.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        disableItemDragAndDrop: {
            name: 'disable-item-drag-and-drop',
            control: {
                type: 'boolean'
            },
            description: ' If present, the tiles cannot be dragged by users.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        hideHeader: {
            name: 'hide-header',
            control: {
                type: 'boolean'
            },
            description: ' If present, the group headers are hidden.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        records: {
            control: {
                type: 'object'
            },
            description:
                ' Array of data objects. Each object will be displayed as a data card in one of the steps. The objects should have a key <code>id</code>, used as their unique identifier. The other keys should correspond to the available fields, and/or the summarize and group field names.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        summarizeFieldName: {
            name: 'summarize-field-name',
            control: {
                type: 'text'
            },
            description:
                ' Name of the data field containing the number to add to the group summarization, at the top of each column.',
            table: {
                type: { summary: 'String' }
            }
        },
        subGroupFieldName: {
            name: 'sub-group-field-name',
            control: {
                type: 'text'
            },
            description:
                ' Name of the data field containing the sub-group label the data belongs to. ',
            table: {
                type: { summary: 'String' }
            }
        },
        variant: {
            name: 'variant',
            control: {
                type: 'select'
            },
            options: ['base', 'path'],
            description:
                'The variant change the apparence of the kanban. Valid values include base and path. Default to base.',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'String' }
            }
        }
    },
    args: {
        groupValues: GROUP_VALUES,
        fields: FIELDS,
        records: RECORDS,
        actions: ACTIONS,
        disableItemDragAndDrop: false,
        disableColumnDragAndDrop: false,
        coverImageFieldName: 'coverImage',
        isLoading: false,
        hideHeader: false,
        summarizeFieldName: 'Amount',
        groupFieldName: 'status',
        variant: 'base'
    }
};

const Template = (args) => Kanban(args);

export const Base = Template.bind({});

export const avatar = Template.bind({});
avatar.args = {
    groupValues: [
        {
            label: 'John Doe',
            value: 'johnDoe',
            avatar: {
                fallbackIconName: 'utility:down',
                initials: 'AS',
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
                variant: 'circle'
            },
            footerActions: [
                {
                    disabled: false,
                    label: 'Email',
                    name: 'Email',
                    iconName: 'utility:email'
                }
            ]
        },
        {
            label: 'Jane Doe',
            value: 'janeDoe',
            avatar: {
                fallbackIconName: 'utility:down',
                initials: 'AS',
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
                variant: 'circle'
            },
            footerActions: [
                {
                    disabled: false,
                    label: 'Email',
                    name: 'Email',
                    iconName: 'utility:email'
                }
            ]
        },
        {
            label: 'John Smith',
            value: 'johnSmith',
            avatar: {
                fallbackIconName: 'utility:down',
                initials: 'AS',
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
                variant: 'circle'
            },
            footerActions: [
                {
                    disabled: false,
                    label: 'Email',
                    name: 'Email',
                    iconName: 'utility:email'
                }
            ]
        }
    ],
    records: [
        {
            id: '001',
            responsible: 'johnDoe',
            opportunityName: 'Opportunity 1',
            amount: 25000,
            warningIcon: 'utility:warning',
            phone: '+375292567896',
            date: '1547250828000',
            percent: 0.28,
            available: true
        },
        {
            id: '002',
            responsible: 'johnDoe',
            opportunityName: 'Opportunity 2',
            amount: 13200,
            phone: '+375292567896',
            date: '1347250828000',
            percent: 0.77,
            available: true
        },
        {
            id: '003',
            responsible: 'janeDoe',
            opportunityName: 'Opportunity 3',
            amount: 5100,
            phone: '+37529888888',
            date: '1547250828000',
            percent: 0.83,
            available: false
        },
        {
            id: '004',
            responsible: 'johnDoe',
            opportunityName: 'Opportunity 4',
            amount: 21570,
            phone: '+375292567896',
            date: '1647250828000',
            percent: 0.2,
            available: false
        },
        {
            id: '005',
            responsible: 'johnSmith',
            opportunityName: 'Opportunity 5',
            amount: 200,
            phone: '+375299999999',
            date: '1347250828000',
            percent: 0.18,
            available: true
        },
        {
            id: '006',
            responsible: 'janeDoe',
            opportunityName: 'Opportunity 6',
            amount: 17500,
            phone: '+375292567896',
            date: '1547250828000',
            percent: 0.92,
            available: true
        }
    ],
    groupFieldName: 'responsible'
};

export const hideHeader = Template.bind({});
hideHeader.args = {
    hideHeader: true
};

export const path = Template.bind({});
path.args = {
    variant: 'path',
    summarizeFieldName: 'Percent'
};

export const subGroups = Template.bind({});
subGroups.args = {
    subGroupFieldName: 'assignee'
};

export const disabledItemDrag = Template.bind({});
disabledItemDrag.args = {
    disableItemDragAndDrop: true,
    summarizeFieldName: 'Percent'
};

export const disabledColumnDrag = Template.bind({});
disabledColumnDrag.args = {
    disableColumnDragAndDrop: true
};
