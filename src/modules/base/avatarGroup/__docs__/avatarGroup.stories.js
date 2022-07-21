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

import { AvatarGroup } from '../__examples__/avatarGroup';

export default {
    title: 'Example/Avatar Group',
    argTypes: {
        items: {
            control: {
                type: 'object'
            },
            description:
                'Fields: <ul><li>alternativeText</li> <li>fallbackIconName</li> <li>initials</li> <li>src</li> <li>status</li> <li>status-title</li> <li>status-position</li> <li>presence</li> <li>presence-title</li> <li>presence-position</li> <li>entity-icon-name</li> <li>entity-initials</li> <li>entity-variant</li> <li>entity-src</li> <li>entity-position</li> <li>primary-text</li> <li>secondary-text</li> <li>tertiary-text</li></ul>',
            table: {
                type: { summary: 'object[]' }
            }
        },
        size: {
            control: {
                type: 'select'
            },
            options: [
                'x-small',
                'small',
                'medium',
                'large',
                'x-large',
                'xx-large'
            ],
            description:
                'The size of the avatars. Valid values include x-small, small, medium, large, x-large and xx-large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['empty', 'circle', 'square'],
            description:
                'Shape of the avatars. Valid values include empty, circle or square.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'square' }
            }
        },
        layout: {
            control: {
                type: 'select'
            },
            options: ['stack', 'grid', 'list'],
            description:
                'Defines the layout of the avatar group. Valid values include stack, grid, list',
            table: {
                defaultValue: { summary: 'stack' },
                type: { summary: 'string' }
            }
        },
        maxCount: {
            name: 'max-count',
            control: {
                type: 'number',
                min: 0
            },
            description:
                'The maximum number of avatars allowed in the visible list.',
            table: {
                defaultValue: { summary: '5 for stack, 11 for grid and list' },
                type: { summary: 'number' }
            }
        },
        listButtonShowMoreLabel: {
            name: 'list-button-show-more-label',
            control: {
                type: 'text'
            },
            description:
                'Label of the button that appears in the list layout, when the number of avatars exceeds the max-count number.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Show more' },
                category: 'Buttons',
                subcategory: 'List'
            }
        },
        listButtonVariant: {
            name: 'list-button-variant',
            control: {
                type: 'select'
            },
            options: [
                'neutral',
                'base',
                'brand',
                'brand-outline',
                'destructive',
                'destructive-text',
                'inverse',
                'success'
            ],
            description:
                'Variant of the button that appears in the list layout, when the number of avatars exceeds the max-count number.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' },
                category: 'Buttons',
                subcategory: 'List'
            }
        },
        listButtonShowMoreIconName: {
            name: 'list-button-show-more-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the list button icon. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' },
                category: 'Buttons',
                subcategory: 'List'
            }
        },
        listButtonShowMoreIconPosition: {
            name: 'list-button-icon-position',
            control: {
                type: 'radio'
            },
            options: ['left', 'right'],
            description:
                'Position of the list button’s icon. Valid values include left and right.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
                category: 'Buttons',
                subcategory: 'List'
            }
        },
        listButtonShowLessLabel: {
            name: 'list-button-show-less-label',
            control: {
                type: 'text'
            },
            description:
                'Label of the button that appears in the list layout, when the list is expanded.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Show less' },
                category: 'Buttons',
                subcategory: 'List'
            }
        },
        listButtonShowLessIconName: {
            name: 'list-button-show-less-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the list button icon. Specify the name in the format 'utility:up' where 'utility' is the category, and 'up' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' },
                category: 'Buttons',
                subcategory: 'List'
            }
        },
        listButtonShowLessIconPosition: {
            name: 'list-button-icon-position',
            control: {
                type: 'radio'
            },
            options: ['left', 'right'],
            description:
                'Position of the list button’s icon. Valid values include left and right.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
                category: 'Buttons',
                subcategory: 'List'
            }
        },

        actionIconName: {
            name: 'action-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the action icon name. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' },
                category: 'Buttons',
                subcategory: 'Action'
            }
        },
        name: {
            control: {
                type: 'text'
            },
            description:
                'Name of the avatar group. It will be returned by the actionclick event.',
            table: {
                type: { summary: 'string' }
            }
        }
    },
    args: {
        layout: 'stack',
        listButtonShowLessLabel: 'Show less',
        listButtonShowLessIconPosition: 'left',
        listButtonShowMoreIconPosition: 'left',
        listButtonShowMoreLabel: 'Show more',
        listButtonVariant: 'base',
        size: 'medium',
        variant: 'square'
    }
};

const Template = (args) => AvatarGroup(args);

const items = [
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
        fallbackIconName: 'standard:user',
        alternativeText: 'This is the alternative text',
        primaryText: 'John Doe',
        secondaryText: 'VP, Human Resources',
        tertiaryText: 'FakeCompany Inc.',
        name: 'user-1'
    },
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        fallbackIconName: 'standard:user',
        initials: 'UA',
        alternativeText: 'This is the alternative text',
        primaryText: 'Jane Doe',
        secondaryText: 'VP, Engineering',
        tertiaryText: 'FakeCompany Inc.',
        name: 'user-2'
    }
];
const itemsWithPresence = [
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
        fallbackIconName: 'standard:user',
        alternativeText: 'This is the alternative text',
        presence: 'online',
        presenceTitle: 'Online',
        primaryText: 'John Doe',
        secondaryText: 'VP, Human Resources',
        tertiaryText: 'FakeCompany Inc.',
        name: 'user-1'
    },
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        fallbackIconName: 'standard:user',
        initials: 'UA',
        alternativeText: 'This is the alternative text',
        presence: 'blocked',
        presenceTitle: 'Blocked',
        primaryText: 'Jane Doe',
        secondaryText: 'VP, Engineering',
        tertiaryText: 'FakeCompany Inc.',
        name: 'user-2'
    },
    {
        fallbackIconName: 'standard:user',
        alternativeText: 'This is the alternative text',
        presence: 'offline',
        presenceTitle: 'Offline',
        primaryText: 'Vishnu Doe',
        secondaryText: 'VP, Research and Development',
        tertiaryText: 'MadeUp Co.',
        name: 'user-3'
    },
    {
        fallbackIconName: 'standard:user',
        initials: 'EB',
        alternativeText: 'This is the alternative text',
        presence: 'busy',
        presenceTitle: 'Busy',
        primaryText: 'Eliott Beauchesne',
        secondaryText: 'CEO',
        tertiaryText: 'MadeUp Co.',
        name: 'user-4'
    }
];
const itemsWithStatusAndEntity = [
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
        fallbackIconName: 'standard:user',
        alternativeText: 'This is the alternative text',
        status: 'locked',
        statusTitle: 'Locked',
        statusPosition: 'top-left',
        entityIconName: 'standard:account',
        entityInitials: 'FC',
        entityVariant: 'circle',
        entityPosition: 'bottom-right',
        primaryText: 'John Doe',
        secondaryText: 'VP, Human Resources',
        tertiaryText: 'FakeCompany Inc.',
        name: 'user-1',
        tags: [
            { label: 'tag-01', variant: 'default' },
            { label: 'tag-02', variant: 'brand', outline: true },
            { label: 'tag-03', variant: 'warning' },
            { label: 'tag-04', variant: 'success' }
        ],
        actions: [
            {
                label: 'Edit item',
                name: 'edit-item',
                iconName: 'utility:edit'
            },
            {
                label: 'Action without an icon',
                name: 'action-name'
            }
        ]
    },
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        fallbackIconName: 'standard:user',
        initials: 'UA',
        alternativeText: 'This is the alternative text',
        status: 'approved',
        statusTitle: 'Approved',
        statusPosition: 'top-left',
        entityIconName: 'standard:account',
        entityInitials: 'FC',
        entityPosition: 'bottom-right',
        entityVariant: 'circle',
        primaryText: 'Jane Doe',
        secondaryText: 'VP, Engineering',
        tertiaryText: 'FakeCompany Inc.',
        name: 'user-2',
        tags: [
            { label: 'tag-01', variant: 'warning' },
            { label: 'tag-02', variant: 'error' }
        ]
    },
    {
        fallbackIconName: 'standard:user',
        alternativeText: 'This is the alternative text',
        status: 'declined',
        statusTitle: 'Declined',
        statusPosition: 'top-left',
        entityIconName: 'standard:case',
        entityPosition: 'bottom-right',
        primaryText: 'Vishnu Doe',
        secondaryText: 'VP, Research and Development',
        tertiaryText: 'MadeUp Co.',
        name: 'user-3',
        tags: [
            { label: 'tag-01', variant: 'default' },
            { label: 'tag-02', variant: 'inverse' },
            { label: 'tag-03', variant: 'warning' },
            { label: 'tag-04', variant: 'success' }
        ]
    },
    {
        fallbackIconName: 'standard:user',
        initials: 'EB',
        alternativeText: 'This is the alternative text',
        status: 'unknown',
        statusTitle: 'Unknown',
        statusPosition: 'top-left',
        entityIconName: 'standard:case',
        entityPosition: 'bottom-right',
        primaryText: 'Eliott Beauchesne',
        secondaryText: 'CEO',
        tertiaryText: 'MadeUp Co.',
        name: 'user-4',
        tags: [
            { label: 'tag-01', variant: 'default' },
            { label: 'tag-02', variant: 'inverse' },
            { label: 'tag-03', variant: 'warning' },
            { label: 'tag-04', variant: 'success' }
        ]
    }
];

export const BaseWithTwoAvatars = Template.bind({});
BaseWithTwoAvatars.args = {
    items: items,
    name: 'avatar-group'
};

export const BaseExtraLargeWithTwoAvatars = Template.bind({});
BaseExtraLargeWithTwoAvatars.args = {
    items: items,
    size: 'x-large',
    variant: 'circle',
    name: 'avatar-group'
};

export const BaseWithMoreThanTwoAvatars = Template.bind({});
BaseWithMoreThanTwoAvatars.args = {
    items: [...itemsWithPresence, ...itemsWithPresence, ...itemsWithPresence]
};

export const BaseLargeWithMoreThanTwoAvatars = Template.bind({});
BaseLargeWithMoreThanTwoAvatars.args = {
    items: [...items, ...items, ...items],
    size: 'large',
    maxCount: 6,
    variant: 'circle',
    actionIconName: 'utility:add',
    name: 'avatar-group'
};

export const Grid = Template.bind({});
Grid.args = {
    items: [...items, ...items, ...items, ...items, ...items, ...items],
    layout: 'grid',
    maxCount: 6,
    name: 'avatar-group'
};

export const GridWithPresence = Template.bind({});
GridWithPresence.args = {
    items: [
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence
    ],
    layout: 'grid',
    maxCount: 6,
    variant: 'circle',
    name: 'avatar-group'
};

export const GridSmall = Template.bind({});
GridSmall.args = {
    items: [...items, ...items, ...items, ...items, ...items, ...items],
    size: 'small',
    layout: 'grid',
    maxCount: 7,
    name: 'avatar-group'
};

export const ListDoubleExtraLarge = Template.bind({});
ListDoubleExtraLarge.args = {
    items: [
        ...itemsWithStatusAndEntity,
        ...itemsWithStatusAndEntity,
        ...itemsWithStatusAndEntity
    ],
    layout: 'list',
    maxCount: 3,
    size: 'xx-large',
    listButtonShowMoreIconName: 'utility:down',
    listButtonShowLessIconName: 'utility:up',
    name: 'avatar-group'
};
