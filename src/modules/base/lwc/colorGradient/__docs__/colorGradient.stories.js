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
    messageWhenBadInput: 'bad input'
};