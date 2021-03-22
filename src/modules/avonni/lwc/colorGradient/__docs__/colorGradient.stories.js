import { ColorGradient } from '../__examples__/colorGradient';

export default {
    title: 'Example/Color Gradient',
    argTypes: {
        value: {
            control: 'text'
        },
        messageWhenBadInput: {
            control: {
                type: 'text'
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        readOnly: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        opacity: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        }
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
