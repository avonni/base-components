import { InputChoiceSet } from '../__examples__/inputChoiceSet';

export default {
    title: 'Example/Input Choice Set',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            type: { required: true },
            description: 'Text label for the input choice set.',
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
                'Optional message to be displayed when no input is selected and the required attribute is set.',
            table: {
                type: { summary: 'string' }
            }
        },
        type: {
            control: {
                type: 'radio'
            },
            description:
                'The style of the input choice set. Options are checkbox or button.',
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
                'The variant changes the appearance of the input choice set. Accepted variants include standard, label-hidden, label-inline, and label-stacked. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and input choice set. Use label-stacked to place the label above the input choice set.',
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
                "If present, the input choice set is disabled. Input selections can't be changed for a disabled input choice set.",
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
            description: 'If present, at least one input must be selected.',
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
            description: 'Array of label-value pairs for each checkbox or button.',
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
                'The list of selected checkboxes or buttons. Each array entry contains the value of a selected checkbox or button. The value of each input is set in the options attribute.',
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

const Template = (args) => InputChoiceSet(args);

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

export const InputSet = Template.bind({});
InputSet.args = {
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    options: options,
    value: primaryValue
};

export const InputChoiceSetDisabled = Template.bind({});
InputChoiceSetDisabled.args = {
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    options: options,
    value: secondaryValue,
    disabled: true
};

export const InputChoiceSetWithNoLabel = Template.bind({});
InputChoiceSetWithNoLabel.args = {
    label: 'Please select a value',
    variant: 'label-hidden',
    messageWhenValueMissing: 'Value missing',
    options: options,
    value: thirdValue
};

export const InputChoiceSetWithLabelStacked = Template.bind({});
InputChoiceSetWithLabelStacked.args = {
    label: 'Please select a value',
    variant: 'label-stacked',
    messageWhenValueMissing: 'Value missing',
    options: options,
    value: primaryValue
};

export const InputChoiceSetRequired = Template.bind({});
InputChoiceSetRequired.args = {
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    required: true,
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
    disabled: true,
    messageWhenValueMissing: 'Value missing',
    options: options,
    value: thirdValue
};
