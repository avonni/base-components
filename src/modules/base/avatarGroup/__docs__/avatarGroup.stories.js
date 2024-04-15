import { AvatarGroup } from '../__examples__/base';
import { InfiniteLoadingAvatarGroup } from '../__examples__/infiniteLoading';
import { InfiniteLoadingUsingShowMoreAvatarGroup } from '../__examples__/infiniteLoadingUsingShowMore';

export default {
    title: 'Example/Avatar Group',
    argTypes: {
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
        enableInfiniteLoading: {
            name: 'enable-infinite-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If present, you can load a subset of items and then display more when users scroll to the end of the list. Use with the loadmore event to retrieve more items. If present, max-count is ignored.',
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
            description:
                'If present, a spinner is shown to indicate that more items are loading.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
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
        loadMoreOffset: {
            name: 'load-more-offset',
            control: {
                type: 'number'
            },
            description:
                'Determines when to trigger infinite loading based on how many pixels the scroll position is from the end of the avatar group.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '20' }
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
        name: {
            control: {
                type: 'text'
            },
            description:
                'Name of the avatar group. It will be returned by the actionclick event.',
            table: {
                type: { summary: 'string' }
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
        }
    },
    args: {
        enableInfiniteLoading: false,
        isLoading: false,
        layout: 'stack',
        listButtonShowLessLabel: 'Show less',
        listButtonShowLessIconPosition: 'left',
        listButtonShowMoreIconPosition: 'left',
        listButtonShowMoreLabel: 'Show more',
        listButtonVariant: 'neutral',
        loadMoreOffset: 20,
        size: 'medium',
        variant: 'square'
    }
};

const Template = (args) => AvatarGroup(args);
const InfiniteLoadingTemplate = (args) => InfiniteLoadingAvatarGroup(args);
const InfiniteLoadingUsingShowMoreTemplate = (args) =>
    InfiniteLoadingUsingShowMoreAvatarGroup(args);

const items = [
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
        fallbackIconName: 'standard:user',
        alternativeText: 'John Doe',
        primaryText: 'John Doe',
        secondaryText: 'VP, Human Resources',
        tertiaryText: 'FakeCompany Inc.',
        name: 'user-1'
    },
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        fallbackIconName: 'standard:user',
        initials: 'UA',
        alternativeText: 'Jane Doe',
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
        alternativeText: 'John Doe',
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
        alternativeText: 'Jane Doe',
        presence: 'blocked',
        presenceTitle: 'Blocked',
        primaryText: 'Jane Doe',
        secondaryText: 'VP, Engineering',
        tertiaryText: 'FakeCompany Inc.',
        name: 'user-2'
    },
    {
        fallbackIconName: 'standard:user',
        alternativeText: 'Vishnu Doe',
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
        alternativeText: 'Eliott Beauchesne',
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
        alternativeText: 'John Doe',
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
        alternativeText: 'Jane Doe',
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
        alternativeText: 'Vishnu Doe',
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
        alternativeText: 'Eliott Beauchesne',
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

function createUniqueItems(avatarItems) {
    return avatarItems.map((item, index) => {
        return {
            ...item,
            name: `user-${index + 1}`
        };
    });
}

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
    items: createUniqueItems([
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence
    ])
};

export const BaseLargeWithMoreThanTwoAvatars = Template.bind({});
BaseLargeWithMoreThanTwoAvatars.args = {
    items: createUniqueItems([...items, ...items, ...items]),
    size: 'large',
    maxCount: 6,
    variant: 'circle',
    actionIconName: 'utility:add',
    name: 'avatar-group'
};

export const Grid = Template.bind({});
Grid.args = {
    items: createUniqueItems([
        ...items,
        ...items,
        ...items,
        ...items,
        ...items,
        ...items
    ]),
    layout: 'grid',
    maxCount: 6,
    name: 'avatar-group'
};

export const GridWithPresence = Template.bind({});
GridWithPresence.args = {
    items: createUniqueItems([
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence,
        ...itemsWithPresence
    ]),
    layout: 'grid',
    maxCount: 6,
    variant: 'circle',
    name: 'avatar-group'
};

export const GridSmall = Template.bind({});
GridSmall.args = {
    items: createUniqueItems([
        ...items,
        ...items,
        ...items,
        ...items,
        ...items,
        ...items
    ]),
    size: 'small',
    layout: 'grid',
    maxCount: 7,
    name: 'avatar-group'
};

export const ListDoubleExtraLarge = Template.bind({});
ListDoubleExtraLarge.args = {
    items: createUniqueItems([
        ...itemsWithStatusAndEntity,
        ...itemsWithStatusAndEntity,
        ...itemsWithStatusAndEntity
    ]),
    layout: 'list',
    maxCount: 3,
    size: 'xx-large',
    listButtonShowMoreIconName: 'utility:down',
    listButtonShowLessIconName: 'utility:up',
    name: 'avatar-group'
};

export const InfiniteLoading = InfiniteLoadingTemplate.bind({});
InfiniteLoading.args = {
    size: 'large'
};

export const InfiniteLoadingUsingShowMore =
    InfiniteLoadingUsingShowMoreTemplate.bind({});
InfiniteLoadingUsingShowMore.args = {
    maxCount: 4
};
