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

const optionsWithIcon = [
    { label: 'Left', value: 'left', iconName: 'utility:left_align_text', iconPosition: 'right' },
    { label: 'Center', value: 'center', iconName: 'utility:center_align_text', iconPosition: 'right' },
    { label: 'Right', value: 'right', iconName: 'utility:right_align_text', iconPosition: 'right' },
];
const optionsWithoutIcon = [
    { label: 'Mon', value: 'mon', },
    { label: 'Tue', value: 'tue', },
    { label: 'Wed', value: 'wed', },
    { label: 'Thu', value: 'thu', },
    { label: 'Fri', value: 'fri', }
];
const dayValue = ['fri'];
const alignmentValue = ['center'];

export const RadioButtons = Template.bind({});
RadioButtons.args = {
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    value: dayValue,
    isMultiSelect: false,
};

export const Checkboxes = Template.bind({});
Checkboxes.args = {
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    required: true,
    isMultiSelect: true,
    options: optionsWithoutIcon,
    value: dayValue
};

export const HorizontalCheckboxes = Template.bind({});
HorizontalCheckboxes.args = {
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    orientation: 'horizontal',
    value: dayValue,
    isMultiSelect: true,
};

export const CheckboxesDisabled = Template.bind({});
CheckboxesDisabled.args = {
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    value: dayValue,
    disabled: true,
    isMultiSelect: true,
};

export const CheckboxesWithNoLabel = Template.bind({});
CheckboxesWithNoLabel.args = {
    label: 'Please select a value',
    variant: 'label-hidden',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    value: dayValue,
    isMultiSelect: true,
};

export const CheckboxesWithLabelStacked = Template.bind({});
CheckboxesWithLabelStacked.args = {
    label: 'Please select a value',
    variant: 'label-stacked',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    value: dayValue,
    isMultiSelect: true,
};

export const CheckboxesRequired = Template.bind({});
CheckboxesRequired.args = {
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    required: true,
    options: optionsWithoutIcon,
    value: dayValue,
    isMultiSelect: true,
};


export const CheckboxesWithRightIcons = Template.bind({});
CheckboxesWithRightIcons.args = {
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    required: true,
    isMultiSelect: true,
    options: optionsWithIcon,
    value: alignmentValue
};

export const Buttons = Template.bind({});
Buttons.args = {
    label: 'Please select a value',
    type: 'button',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    value: dayValue
};

export const HorizontalButtons = Template.bind({});
HorizontalButtons.args = {
    label: 'Please select a value',
    type: 'button',
    orientation: 'horizontal',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    value: dayValue
};

export const ButtonsWithLabelInline = Template.bind({});
ButtonsWithLabelInline.args = {
    label: 'Please select a value',
    type: 'button',
    variant: 'label-inline',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    value: dayValue
};

export const ButtonsDisabled = Template.bind({});
ButtonsDisabled.args = {
    label: 'Please select a value',
    type: 'button',
    disabled: true,
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    value: dayValue
};

export const ButtonsWithMultiSelect = Template.bind({});
ButtonsWithMultiSelect.args = {
    label: 'Please select a value',
    type: 'button',
    disabled: false,
    isMultiSelect : true,
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    value: dayValue
};

export const ButtonsWithRightIcons = Template.bind({});
ButtonsWithRightIcons.args = {
    label: 'Please select a value',
    type: 'button',
    disabled: false,
    messageWhenValueMissing: 'Value missing',
    options: optionsWithIcon,
    value: alignmentValue
};
