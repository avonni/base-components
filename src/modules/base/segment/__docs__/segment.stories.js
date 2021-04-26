import { Segment } from '../__examples__/segment';

export default {
    title: 'Example/Segment',
    argTypes: {
        value: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'number' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['shade', 'success', 'warning', 'error'],
            defaultValue: 'shade',
            table: {
                defaultValue: { summary: 'shade' },
                type: { summary: 'string' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        disabled: false
    }
};

const Template = (args) => Segment(args);

export const Base = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
    value: 1,
    disabled: true
};

export const Success = Template.bind({});
Success.args = {
    value: 1,
    variant: 'success'
};

export const Warning = Template.bind({});
Warning.args = {
    value: 3,
    variant: 'warning'
};

export const Error = Template.bind({});
Error.args = {
    variant: 'error',
    value: 2
};
