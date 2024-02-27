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
                type: { summary: 'string' },
                category: 'icon'
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
                defaultValue: { summary: 'left' },
                category: 'icon'
            }
        },
        iconSize: {
            name: 'icon-size',
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
                'The size of the icon. Valid values include x-small, small, medium, large, x-large and xx-large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'small' },
                category: 'icon'
            }
        },
        iconSrc: {
            name: 'icon-src',
            control: {
                type: 'text'
            },
            description: 'URL to set for the image attribute',
            table: {
                type: { summary: 'string' },
                category: 'icon'
            }
        },
        iconVariant: {
            name: 'icon-variant',
            control: {
                type: 'select'
            },
            options: ['circle', 'square'],
            description:
                'The variant changes the shape of the icon. Valid values include circle and square',
            table: {
                defaultValue: { summary: 'square' },
                type: { summary: 'string' },
                category: 'icon'
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
        iconVariant: 'square',
        orientation: 'horizontal'
    }
};

const Template = (args) => Separator(args);

export const Base = Template.bind({});
Base.args = {
    iconName: 'utility:event',
    label: 'Today'
};

export const Image = Template.bind({});
Image.args = {
    iconSrc: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    label: 'Today'
};

export const Vertical = Template.bind({});
Vertical.args = {
    iconName: 'utility:event',
    label: 'Today',
    orientation: 'vertical'
};
