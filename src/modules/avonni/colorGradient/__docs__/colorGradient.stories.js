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
            }
        },
        readOnly: {
            control: {
                type: 'boolean'
            }
        },
        opacity: {
            control: {
                type: 'boolean'
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