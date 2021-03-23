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
                options: [
                    'standard',
                    'label-hidden',
                    'label-inline',
                    'label-stacked'
                ]
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
const primaryValue = ['wed', 'fri'];
const secondaryValue = ['mon', 'tue'];
const thirdValue = ['thu'];

export const Checkbox = Template.bind({});
Checkbox.args = {
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    options: options,
    value: primaryValue
};

export const CheckboxDisabled = Template.bind({});
CheckboxDisabled.args = {
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    options: options,
    value: secondaryValue,
    disabled: 'true'
};

export const CheckboxWithNoLabel = Template.bind({});
CheckboxWithNoLabel.args = {
    label: 'Please select a value',
    variant: 'label-hidden',
    messageWhenValueMissing: 'Value missing',
    options: options,
    value: thirdValue
};

export const CheckboxWithLabelStacked = Template.bind({});
CheckboxWithLabelStacked.args = {
    label: 'Please select a value',
    variant: 'label-stacked',
    messageWhenValueMissing: 'Value missing',
    options: options,
    value: primaryValue
};

export const CheckboxRequired = Template.bind({});
CheckboxRequired.args = {
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    required: 'true',
    options: options,
    value: secondaryValue
};

export const Button = Template.bind({});
Button.args = {
    label: 'Please select a value',
    type: 'button',
    messageWhenValueMissing: 'Value missing',
    options: options,
    value: primaryValue
};

export const ButtonWithLabelInline = Template.bind({});
ButtonWithLabelInline.args = {
    label: 'Please select a value',
    type: 'button',
    variant: 'label-inline',
    messageWhenValueMissing: 'Value missing',
    options: options,
    value: secondaryValue
};

export const ButtonDisabled = Template.bind({});
ButtonDisabled.args = {
    label: 'Please select a value',
    type: 'button',
    disabled: 'true',
    messageWhenValueMissing: 'Value missing',
    options: options,
    value: thirdValue
};
