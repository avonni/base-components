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
        variant: {
            control: {
                type: 'select',
                options: ['stack', 'grid']
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
        alternativeText: 'User avatar'
    },
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        fallbackIconName: 'standard:user',
        initials: 'UA',
        alternativeText: 'User avatar'
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
    items: [...items, ...items, ...items, ...items, ...items, ...items]
};

export const BaseLargeWithMoreThanTwoAvatars = Template.bind({});
BaseLargeWithMoreThanTwoAvatars.args = {
    items: [...items, ...items, ...items, ...items, ...items, ...items],
    size: 'large',
    maxCount: '6'
};

export const Grid = Template.bind({});
Grid.args = {
    items: [...items, ...items, ...items, ...items, ...items, ...items],
    variant: 'grid',
    maxCount: '6'
};

export const GridSmall = Template.bind({});
GridSmall.args = {
    items: [...items, ...items, ...items, ...items, ...items, ...items],
    size: 'small',
    variant: 'grid',
    maxCount: '7'
};
