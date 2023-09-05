import { Separator } from '../__examples__/separator';

export default {
    title: 'Example/Separator',
    argTypes: {
        label: {
            name: 'label',
            control: {
                type: 'text'
            },
            description: 'Text to display in the separator',
            table: {
                type: { summary: 'string' }
            }
        },
        alignContent: {
            name: 'align-content',
            control: {
                type: 'select'
            },
            options: ['start', 'center', 'end'],
            description:
                'Position of the content in the separator. Valid values include start, center and end.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'center' }
            }
        },
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                "The name of the icon to be used in the format 'utility:down'.",
            table: {
                type: { summary: 'string' }
            }
        },
        iconPosition: {
            name: 'icon-position',
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            description:
                'Describes the position of the icon. Valid values include left and right.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' }
            }
        },
        iconSize: {
            name: 'icon-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            description:
                'The size of the icon. Options include xx-small, x-small, small, medium and large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'small' }
            }
        },
        orientation: {
            name: 'orientation',
            control: {
                type: 'select'
            },
            options: ['horizontal', 'vertical'],
            description: 'Valid values include horizontal and vertical.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'horizontal' }
            }
        }
    },
    args: {
        alignContent: 'center',
        iconPosition: 'left',
        iconSize: 'small',
        orientation: 'horizontal'
    }
};

const Template = (args) => Separator(args);

export const Base = Template.bind({});
Base.args = {
    iconName: 'utility:event',
    label: 'Today'
};

export const Vertical = Template.bind({});
Vertical.args = {
    iconName: 'utility:event',
    label: 'Today',
    orientation: 'vertical'
};
