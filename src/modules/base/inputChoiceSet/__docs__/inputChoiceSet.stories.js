import { InputChoiceSet } from '../__examples__/inputChoiceSet';

export default {
    title: 'Example/Input Choice Set',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            type: { required: true },
            description: 'Text label for the input.',
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
                'Optional message to be displayed when no option is selected and the required attribute is set.',
            table: {
                type: { summary: 'string' }
            }
        },
        type: {
            control: {
                type: 'radio'
            },
            description:
                'Type of the input. Valid value include default and button.',
            options: ['default', 'button'],
            defaultValue: 'default',
            table: {
                defaultValue: { summary: 'default' },
                type: { summary: 'string' }
            }
        },
        orientation: {
            control: {
                type: 'radio'
            },
            description:
                'Orientation of the input options. Valid values include vertical and horizontal.',
            options: ['vertical', 'horizontal'],
            defaultValue: 'vertical',
            table: {
                defaultValue: { summary: 'vertical' },
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
                'The variant changes the appearance of the input label. Accepted variants include standard, label-hidden, label-inline, and label-stacked. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and checkbox group. Use label-stacked to place the label above the checkbox group.',
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
                "If present, the input is disabled.",
            defaultValue: 0,
            table: {
                defaultValue: { summary: false },
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
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        isMultiSelect: {
            name: "is-multi-select",
            control: {
                type: 'boolean'
            },
            description: 'If present, multiple choices can be selected.',
            defaultValue: 0,
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        options: {
            control: {
                type: 'object'
            },
            description: 'Array of option objects.',
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
                'The list of selected options. Each array entry contains the value of a selected option. The value of each option is set in the options attribute.',
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
    { label: 'Mon', value: 'mon', iconName: 'utility:smiley_and_people', iconPosition: 'left' },
    { label: 'Tue', value: 'tue', iconName: 'utility:smiley_and_people', iconPosition: 'right' },
    { label: 'Wed', value: 'wed', iconName: 'utility:smiley_and_people', iconPosition: 'top' },
    { label: 'Thu', value: 'thu', iconName: 'utility:smiley_and_people', iconPosition: 'bottom' },
    { label: 'Fri', value: 'fri', iconName: 'utility:smiley_and_people', iconPosition: 'left' }
];
const primaryValue = ['wed', 'fri'];
const secondaryValue = ['mon', 'tue'];
const thirdValue = ['thu'];

export const InputSet = Template.bind({});
InputSet.args = {
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    options: options,
    value: primaryValue,
    isMultiSelect: false,
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
