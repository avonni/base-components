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
