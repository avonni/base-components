import { BadgeIcon } from '../__examples__/badgeIcon';

export default {
    title: 'Example/Badge Icon',
    argTypes: {
        iconPosition: {
            control: {
                type: 'select',
                options: ['left', 'right']
            },
            defaultValue: 'left',
            table: {
                defaultValue: { summary: 'left' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['base', 'lightest', 'inverse']
            },
            defaultValue: 'base',
            table: {
                defaultValue: { summary: 'base' }
            }
        }
    }
};

const Template = (args) => BadgeIcon(args);

export const Base = Template.bind({});
Base.args = {
    iconName: 'utility:moneybag',
    label: '423 Credits Available'
};

export const BaseWithIconRight = Template.bind({});
BaseWithIconRight.args = {
    iconName: 'utility:moneybag',
    iconPosition: 'right',
    label: '423 Credits Available'
};

export const Lightest = Template.bind({});
Lightest.args = {
    variant: 'lightest',
    iconName: 'utility:currency',
    label: '100$ Available'
};

export const Inverse = Template.bind({});
Inverse.args = {
    iconName: 'utility:block_visitor',
    label: 'Contact Blocked'
};
