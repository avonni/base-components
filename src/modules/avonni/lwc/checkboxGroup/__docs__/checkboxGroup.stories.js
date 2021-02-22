import { CheckboxGroup } from '../__examples__/checkboxGroup';

export default {
    title: 'Example/Checkbox Group',
    argTypes: {
        label: {
            control: {
                type: 'text'
            }
        },
        messageWhenValueMissing: {
            control: {
                type: 'text'
            }
        },
        type: {
            control: {
                type: 'select',
                options: ['checkbox', 'button']
            },
            defaultValue: 'checkbox',
            table: {
                defaultValue: { summary: 'checkbox' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['standard', 'label-hidden', 'label-inline', 'label-stacked']
            },
            defaultValue: 'standard',
            table: {
                defaultValue: { summary: 'standard' }
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
        required: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        options: {
            control: {
                type: 'object'
            }
        },
        value: {
            control: {
                type: 'object'
            }
        }
    }
};

const Template = (args) => CheckboxGroup(args);

const options = [
    { label: 'Mon', value: 'mon' },
    { label: 'Tue', value: 'tue' },
    { label: 'Wed', value: 'wed' },
    { label: 'Thu', value: 'thu' },
    { label: 'Fri', value: 'fri' }
];
const value = ['wed', 'fri'];

export const Base = Template.bind({});
Base.args = {
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    options: options,
    value: value
};
