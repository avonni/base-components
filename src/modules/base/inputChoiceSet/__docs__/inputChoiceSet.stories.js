import { InputChoiceSet } from '../__examples__/inputChoiceSet';

export default {
    title: 'Example/Input Choice Set',
    argTypes: {
        checkPosition: {
            name: 'check-position',
            control: {
                type: 'radio'
            },
            options: ['left', 'right'],
            description:
                'Describes the position of the toggle, radio or checkbox. Options include left and right and is not available for type button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description: 'If present, the input is disabled.',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        fieldLevelHelp: {
            name: 'field-level-help',
            control: {
                type: 'text'
            },
            description:
                'Help text detailing the purpose and function of the input.',
            table: {
                type: { summary: 'string' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input is loading and a spinner is visible where the options should be.',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        isMultiSelect: {
            name: 'is-multi-select',
            control: {
                type: 'boolean'
            },
            description: 'If present, multiple choices can be selected.',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
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
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Message displayed while the input is in the loading state.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Loading...' }
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
        options: {
            control: {
                type: 'object'
            },
            description: 'Array of option objects.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        orientation: {
            control: {
                type: 'radio'
            },
            description:
                'Orientation of the input options. Valid values include vertical and horizontal.',
            options: ['vertical', 'horizontal'],
            table: {
                defaultValue: { summary: 'vertical' },
                type: { summary: 'string' }
            }
        },
        orientationAttributes: {
            name: 'orientation-attributes',
            control: {
                type: 'object'
            },
            description:
                'An object of attributes for the orientation containing the cols, smallContainerCols, mediumContainerCols and largeContainerCols.',
            table: {
                type: { summary: 'object' }
            }
        },
        readOnly: {
            name: 'read-only',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input field is read-only and cannot be edited by users.',
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
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        requiredAlternativeText: {
            name: 'required-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'The assistive text when the required attribute is set to true.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Required' }
            }
        },
        type: {
            control: {
                type: 'radio'
            },
            description:
                'Type of the input. Valid values include default, button and toggle.',
            options: ['default', 'button', 'toggle'],
            table: {
                defaultValue: { summary: 'default' },
                type: { summary: 'string' }
            }
        },
        typeAttributes: {
            name: 'type-attributes',
            control: {
                type: 'object'
            },
            description: 'Attributes specific to the type.',
            table: {
                type: { summary: 'object' }
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
            description:
                'The variant changes the appearance of the input label. Accepted variants include standard, label-hidden, label-inline, and label-stacked. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and checkbox group. Use label-stacked to place the label above the checkbox group.',
            table: {
                defaultValue: { summary: 'standard' },
                type: { summary: 'string' }
            }
        }
    },
    args: {
        checkPosition: 'left',
        disabled: false,
        isLoading: false,
        isMultiSelect: false,
        loadingStateAlternativeText: 'Loading...',
        orientation: 'vertical',
        readOnly: false,
        required: false,
        requiredAlternativeText: 'Required',
        type: 'default',
        variant: 'standard'
    }
};

const Template = (args) => InputChoiceSet(args);

const optionsWithIcon = [
    {
        label: 'Left',
        value: 'left',
        iconName: 'utility:left_align_text',
        iconPosition: 'right',
        alternativeText: 'Left'
    },
    {
        label: 'Center',
        value: 'center',
        iconName: 'utility:center_align_text',
        iconPosition: 'right',
        alternativeText: 'Center'
    },
    {
        label: 'Right',
        value: 'right',
        iconName: 'utility:right_align_text',
        iconPosition: 'right',
        alternativeText: 'Right'
    }
];
const optionsWithoutIcon = [
    { label: 'Mon', value: 'mon', tooltip: 'Monday' },
    { label: 'Tue', value: 'tue', tooltip: 'Tuesday' },
    { label: 'Wed', value: 'wed', tooltip: 'Wednesday' },
    { label: 'Thu', value: 'thu', tooltip: 'Thursday' },
    { label: 'Fri', value: 'fri', tooltip: 'Friday' }
];
const optionsWithColors = [
    { label: 'Pacific Cyan', value: 'pacificCyan', color: '#06AED5' },
    { label: 'Cerulean', value: 'cerulean', color: '#086788' },
    { label: 'School Bus Yellow', value: 'schoolBusYellow', color: '#F8D525' },
    { label: 'Harvest Gold', value: 'harvestGold', color: '#F5AB00' },
    { label: 'Rojo', value: 'rojo', color: '#DD1C1A' }
];
const optionsWithLongLabel = [
    { label: 'A very long long long long long Monday', value: 'mon' },
    { label: 'A very long long long long long Tuesday', value: 'tue' },
    { label: 'A very long long long long long Wednesday', value: 'wed' },
    { label: 'A very long long long long long Thursday', value: 'thu' },
    { label: 'A very long long long long long Friday', value: 'fri' }
];
const dayValue = 'fri';
const daysValue = ['thu', 'fri'];
const alignmentValue = ['center'];

export const RadioButtons = Template.bind({});
RadioButtons.args = {
    label: 'Please select a value',
    checkPosition: 'right',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    value: dayValue,
    fieldLevelHelp: 'Input choice set with radio buttons'
};

export const Checkboxes = Template.bind({});
Checkboxes.args = {
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    required: true,
    isMultiSelect: true,
    options: optionsWithoutIcon,
    value: daysValue
};

export const HorizontalCheckboxes = Template.bind({});
HorizontalCheckboxes.args = {
    isMultiSelect: true,
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    orientation: 'horizontal',
    value: dayValue
};

export const CheckboxesDisabled = Template.bind({});
CheckboxesDisabled.args = {
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    value: dayValue,
    disabled: true,
    isMultiSelect: true
};

export const CheckboxesWithNoLabel = Template.bind({});
CheckboxesWithNoLabel.args = {
    label: 'Please select a value',
    variant: 'label-hidden',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithColors,
    isMultiSelect: true
};

export const CheckboxesWithLabelStacked = Template.bind({});
CheckboxesWithLabelStacked.args = {
    label: 'Please select a value',
    variant: 'label-stacked',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    value: dayValue,
    isMultiSelect: true
};

export const CheckboxesRequired = Template.bind({});
CheckboxesRequired.args = {
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    required: true,
    options: optionsWithoutIcon,
    value: dayValue,
    isMultiSelect: true
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

export const CheckboxesWithLongLabelOptions = Template.bind({});
CheckboxesWithLongLabelOptions.args = {
    isMultiSelect: true,
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithLongLabel,
    orientation: 'horizontal',
    value: dayValue
};

export const Buttons = Template.bind({});
Buttons.args = {
    label: 'Please select a value',
    type: 'button',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    value: dayValue
};

export const ButtonsCheckmark = Template.bind({});
ButtonsCheckmark.args = {
    label: 'Please select a value',
    type: 'button',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithColors,
    typeAttributes: {
        showCheckmark: true
    }
};

export const buttonsHorizontal = Template.bind({});
buttonsHorizontal.args = {
    label: 'Please select a value',
    type: 'button',
    typeAttributes: {
        stretch: true
    },
    orientation: 'horizontal',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    value: dayValue
};

export const buttonsHorizontalStretchRow = Template.bind({});
buttonsHorizontalStretchRow.args = {
    isMultiSelect: true,
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    orientation: 'horizontal',
    orientationAttributes: {
        multipleRows: false
    },
    type: 'button',
    typeAttributes: {
        displayAsRow: true,
        stretch: true
    },
    value: dayValue
};

export const buttonsHorizontalStretchCols = Template.bind({});
buttonsHorizontalStretchCols.args = {
    isMultiSelect: true,
    label: 'Please select a value',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    orientation: 'horizontal',
    orientationAttributes: {
        cols: 2,
        multipleRows: true
    },
    type: 'button',
    typeAttributes: {
        displayAsRow: true,
        stretch: true
    },
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
    isMultiSelect: true,
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    value: daysValue
};

export const ButtonsWithRightIcons = Template.bind({});
ButtonsWithRightIcons.args = {
    label: 'Please select a value',
    type: 'button',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithIcon,
    value: alignmentValue
};

export const ButtonsWithIconsOnly = Template.bind({});
ButtonsWithIconsOnly.args = {
    label: 'Please select a value',
    type: 'button',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithIcon.map((opt) => ({
        ...opt,
        label: undefined
    })),
    value: alignmentValue
};

export const Toggle = Template.bind({});
Toggle.args = {
    label: 'Please select a value',
    type: 'toggle',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    value: dayValue
};

export const ToggleStretch = Template.bind({});
ToggleStretch.args = {
    label: 'Please select a value',
    type: 'toggle',
    options: optionsWithColors,
    typeAttributes: {
        stretch: true
    }
};

export const ToggleHorizontal = Template.bind({});
ToggleHorizontal.args = {
    label: 'Please select a value',
    type: 'toggle',
    orientation: 'horizontal',
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    value: dayValue
};

export const ToggleHorizontalCols = Template.bind({});
ToggleHorizontalCols.args = {
    label: 'Please select a value',
    type: 'toggle',
    orientation: 'horizontal',
    typeAttributes: {
        size: 'small'
    },
    orientationAttributes: {
        cols: 2,
        multipleRows: true
    },
    messageWhenValueMissing: 'Value missing',
    options: optionsWithoutIcon,
    value: dayValue
};
