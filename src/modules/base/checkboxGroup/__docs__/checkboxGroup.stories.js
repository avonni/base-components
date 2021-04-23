import { CheckboxGroup } from '../__examples__/checkboxGroup';

export default {
    title: 'Example/Checkbox Group',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            type: { required: true },
            description: 'Text label for the checkbox group.',
            table: {
                type: { summary: 'string' }
            }
        },
        messageWhenValueMissing: {
            name: 'message-when-value-missing',
            control: {
                type: 'text'
            },
            description:
                'Optional message to be displayed when no checkbox is selected and the required attribute is set.',
            table: {
                type: { summary: 'string' }
            }
        },
        type: {
            control: {
                type: 'radio'
            },
            description:
                'The style of the checkbox group. Options are checkbox or button.',
            options: ['checkbox', 'button'],
            defaultValue: 'checkbox',
            table: {
                defaultValue: { summary: 'checkbox' },
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'standard',
                'label-hidden',
                'label-inline',
                'label-stacked'
            ],
            type: { required: true },
            defaultValue: 'standard',
            description:
                'The variant changes the appearance of the checkbox group. Accepted variants include standard, label-hidden, label-inline, and label-stacked. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and checkbox group. Use label-stacked to place the label above the checkbox group.',
            table: {
                defaultValue: { summary: 'standard' },
                type: { summary: 'string' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description:
                "If present, the checkbox group is disabled. Checkbox selections can't be changed for a disabled checkbox group.",
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        required: {
            control: {
                type: 'boolean'
            },
            description: 'If present, at least one checkbox must be selected.',
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        options: {
            control: {
                type: 'object'
            },
            description: 'Array of label-value pairs for each checkbox.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        value: {
            control: {
                type: 'object'
            },
            type: { required: true },
            description:
                'The list of selected checkboxes. Each array entry contains the value of a selected checkbox. The value of each checkbox is set in the options attribute.',
            table: {
                type: { summary: 'string[]' }
            }
        }
    },
    args: {
        disabled: false,
        required: false
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
