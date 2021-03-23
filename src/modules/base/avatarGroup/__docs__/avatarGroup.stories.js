import { AvatarGroup } from '../__examples__/avatarGroup';

export default {
    title: 'Example/Avatar Group',
    argTypes: {
        items: {
            control: {
                type: 'object'
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
            table: {
                defaultValue: { summary: 'medium' }
            }
        },
        layout: {
            control: {
                type: 'select',
                options: ['stack', 'grid', 'list']
            },
            defaultValue: 'stack',
            table: {
                defaultValue: { summary: 'stack' }
            }
        },
        maxCount: {
            control: {
                type: 'number',
                min: 0
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
    size: 'x-large'
};

export const BaseWithMoreThanTwoAvatars = Template.bind({});
BaseWithMoreThanTwoAvatars.args = {
    items: [...itemsWithPresence, ...itemsWithPresence, ...itemsWithPresence]
};

export const BaseLargeWithMoreThanTwoAvatars = Template.bind({});
BaseLargeWithMoreThanTwoAvatars.args = {
    items: [...items, ...items, ...items],
    size: 'large',
    maxCount: '6'
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
    maxCount: '6'
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
