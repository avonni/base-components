import { AvatarGroup } from '../__examples__/avatarGroup';

export default {
    title: 'Example/Avatar Group',
    argTypes: {
        items: {
            control: {
                type: 'object'
            },
            description:
                'Fields: alternativeText, fallbackIconName, initials, src, status, status-title, status-position, presence, presence-title, presence-position, entity-icon-name, entity-initials, entity-variant, entity-src, entity-position, primary-text, secondary-text, tertiary-text',
            table: {
                type: { summary: 'object[]' }
            }
        },
        size: {
            control: {
                type: 'select',
                options: [
                    'x-small',
                    'small',
                    'medium',
                    'large',
                    'x-large',
                    'xx-large'
                ]
            },
            defaultValue: 'medium',
            description: 'x-small, small, medium and large.',
            table: {
                defaultValue: { summary: 'medium' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['empty', 'circle', 'square']
            },
            defaultValue: 'square',
            description:
                'Shape of the avatars. Valid values include empty, circle or square.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'square' }
            }
        },
        layout: {
            control: {
                type: 'select',
                options: ['stack', 'grid', 'list']
            },
            defaultValue: 'stack',
            description: 'Valid values include stack, grid, list',
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
        listButtonLabel: {
            name: 'list-button-label',
            control: {
                type: 'text'
            },
            defaultValue: 'Show more',
            description:
                'Label of the button that appears in the list layout, when the number of avatars exceeds the max-count number.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Show more' },
                category: 'List button'
            }
        },
        listButtonVariant: {
            name: 'list-button-variant',
            control: {
                type: 'select',
                options: [
                    'neutral',
                    'base',
                    'brand',
                    'brand-outline',
                    'destructive',
                    'destructive-text',
                    'inverse',
                    'success'
                ]
            },
            defaultValue: 'neutral',
            description:
                'Variant of the button that appears in the list layout, when the number of avatars exceeds the max-count number.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'neutral' },
                category: 'List button'
            }
        },
        listButtonIconName: {
            name: 'list-button-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the list button icon. Specify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' },
                category: 'List button'
            }
        },
        listButtonIconPosition: {
            name: 'list-button-icon-position',
            control: {
                type: 'radio',
                options: ['left', 'right']
            },
            defaultValue: 'left',
            description:
                'Position of the list button’s icon. Valid values include left and right.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
                category: 'List button'
            }
        }
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
        tertiaryText: 'FakeCompany Inc.'
    },
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        fallbackIconName: 'standard:user',
        initials: 'UA',
        alternativeText: 'This is the alternative text',
        primaryText: 'Jane Doe',
        secondaryText: 'VP, Engineering',
        tertiaryText: 'FakeCompany Inc.'
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
        tertiaryText: 'FakeCompany Inc.'
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
        tertiaryText: 'FakeCompany Inc.'
    },
    {
        fallbackIconName: 'standard:user',
        alternativeText: 'This is the alternative text',
        presence: 'offline',
        presenceTitle: 'Offline',
        primaryText: 'Vishnu Doe',
        secondaryText: 'VP, Research and Development',
        tertiaryText: 'MadeUp Co.'
    },
    {
        fallbackIconName: 'standard:user',
        initials: 'EB',
        alternativeText: 'This is the alternative text',
        presence: 'busy',
        presenceTitle: 'Busy',
        primaryText: 'Eliott Beauchesne',
        secondaryText: 'CEO',
        tertiaryText: 'MadeUp Co.'
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
        tertiaryText: 'FakeCompany Inc.'
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
        tertiaryText: 'FakeCompany Inc.'
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
        tertiaryText: 'MadeUp Co.'
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
        tertiaryText: 'MadeUp Co.'
    }
];

export const BaseWithTwoAvatars = Template.bind({});
BaseWithTwoAvatars.args = {
    items: items
};

export const BaseExtraLargeWithTwoAvatars = Template.bind({});
BaseExtraLargeWithTwoAvatars.args = {
    items: items,
    size: 'x-large',
    variant: 'circle'
};

export const BaseWithMoreThanTwoAvatars = Template.bind({});
BaseWithMoreThanTwoAvatars.args = {
    items: [...itemsWithPresence, ...itemsWithPresence, ...itemsWithPresence]
};

export const BaseLargeWithMoreThanTwoAvatars = Template.bind({});
BaseLargeWithMoreThanTwoAvatars.args = {
    items: [...items, ...items, ...items],
    size: 'large',
    maxCount: '6',
    variant: 'circle'
};

export const Grid = Template.bind({});
Grid.args = {
    items: [...items, ...items, ...items, ...items, ...items, ...items],
    layout: 'grid',
    maxCount: '6'
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
    maxCount: '6',
    variant: 'circle'
};

export const GridSmall = Template.bind({});
GridSmall.args = {
    items: [...items, ...items, ...items, ...items, ...items, ...items],
    size: 'small',
    layout: 'grid',
    maxCount: '7'
};

export const ListDoubleExtraLarge = Template.bind({});
ListDoubleExtraLarge.args = {
    items: [
        ...itemsWithStatusAndEntity,
        ...itemsWithStatusAndEntity,
        ...itemsWithStatusAndEntity
    ],
    layout: 'list',
    maxCount: '3',
    size: 'xx-large'
};
