import { ColorGradient } from '../__examples__/colorGradient';

export default {
    title: 'Example/Color Gradient',
    argTypes: {
        value: {
            control: 'text',
            description: 'Specifies the value of an input element.',
            table: {
                type: { summary: 'string' }
            }
        },
        messageWhenBadInput: {
            name: 'message-when-bad-input',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when a bad input is detected.',
            table: {
                type: { summary: 'string' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input field is disabled and users cannot interact with it.',
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        readOnly: {
            name: 'read-only',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the palette is read-only and cannot be edited by users.',
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        opacity: {
            control: {
                type: 'boolean'
            },
            description: 'Defines whether the alpha slider will be displayed.',
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        disabled: false,
        readOnly: false,
        opacity: false
    }
};

const Template = (args) => ColorGradient(args);

export const Base = Template.bind({});
Base.args = {
    value: '#419fec',
    messageWhenBadInput: 'Please ensure value is correct'
};

export const Disabled = Template.bind({});
Disabled.args = {
    value: '#eba1f2',
    messageWhenBadInput: 'Please ensure value is correct',
    disabled: 'true'
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    value: '#f5f232',
    messageWhenBadInput: 'Please ensure value is correct',
    readOnly: 'true'
};

export const BaseWithOpacity = Template.bind({});
BaseWithOpacity.args = {
    value: '#1aef41',
    messageWhenBadInput: 'Please ensure value is correct',
    opacity: 'true'
};
