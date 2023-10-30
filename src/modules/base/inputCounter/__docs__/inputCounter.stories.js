import { InputCounter } from '../__examples__/inputCounter';

export default {
    title: 'Example/Input Counter',
    argTypes: {
        disabled: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input field is disabled and users cannot interact with it.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Validation'
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
        fractionDigits: {
            name: 'fraction-digits',
            control: {
                type: 'number'
            },
            description:
                'Granularity of the value - precision of significant decimal digits ( specified as a positive integer. ex: 2 formats the value to 2 digits after the decimal  )',
            table: {
                type: { summary: 'number' },
                category: 'Validation'
            }
        },
        hideValue: {
            name: 'hide-value',
            control: {
                type: 'boolean'
            },
            description: 'If present, the input value is hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
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
        max: {
            control: {
                type: 'number'
            },
            description:
                'The maximum acceptable value for the input. Constrains the incrementer to stop at the specified max. If the entered value is above the max, incrementing or decrementing will then set the value to the specified max',
            table: {
                type: { summary: 'number' },
                category: 'Validation'
            }
        },

        messageWhenBadInput: {
            name: 'message-when-bad-input',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when a bad input is detected.',
            table: {
                category: 'Validation',
                subcategory: 'Error messages',
                type: { summary: 'string' }
            }
        },
        messageWhenPatternMismatch: {
            name: 'message-when-pattern-mismatch',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when a pattern mismatch is detected.',
            table: {
                category: 'Validation',
                subcategory: 'Error messages',
                type: { summary: 'string' }
            }
        },
        messageWhenRangeOverflow: {
            name: 'message-when-range-overflow',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when a range overflow is detected.',
            table: {
                category: 'Validation',
                subcategory: 'Error messages',
                type: { summary: 'string' }
            }
        },
        messageWhenRangeUnderflow: {
            name: 'message-when-range-underflow',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when a range underflow is detected.',
            table: {
                category: 'Validation',
                subcategory: 'Error messages',
                type: { summary: 'string' }
            }
        },
        messageWhenStepMismatch: {
            name: 'message-when-step-mismatch',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when a step mismatch is detected.',
            table: {
                category: 'Validation',
                subcategory: 'Error messages',
                type: { summary: 'string' }
            }
        },
        messageWhenValueMissing: {
            name: 'message-when-value-missing',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when the value is missing.',
            table: {
                category: 'Validation',
                subcategory: 'Error messages',
                type: { summary: 'string' }
            }
        },
        min: {
            control: {
                type: 'number'
            },
            description:
                'The minimum acceptable value for the input. Constrains the decrementer to stop at the specified min. If an entered value is below the min, incrementing or decrementing will then set the value to the specified min',
            table: {
                type: { summary: 'number' },
                category: 'Validation'
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
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validation'
            }
        },
        required: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input field must be filled out before the form is submitted.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validation'
            }
        },
        step: {
            name: 'step',
            control: {
                type: 'number'
            },
            description: 'Amount to add or substract from the value',
            table: {
                type: { summary: 'number' },
                defaultValue: 1,
                category: 'Validation'
            }
        },
        type: {
            name: 'type',
            control: {
                type: 'select'
            },
            options: ['number', 'currency', 'percent'],
            description:
                'Input counter type. Valid values include number (default), currency, percent.',
            table: {
                default: { summary: 'number' },
                type: { summary: 'string' }
            }
        },
        value: {
            control: {
                type: 'number'
            },
            description: 'Specifies the value of an input element.',
            table: {
                type: { summary: 'number' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'standard',
                'label-inline',
                'label-hidden',
                'label-stacked'
            ],
            description:
                'The variant changes the appearance of an input field. Accepted variants include standard, label-inline, label-hidden, and label-stacked. This value defaults to standard, which displays the label above the field. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and input field. Use label-stacked to place the label above the input field.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'standard' }
            }
        }
    },
    args: {
        disabled: false,
        hideValue: false,
        readOnly: false,
        required: false,
        step: 1,
        type: 'number',
        variant: 'standard'
    }
};

const Template = (args) => InputCounter(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Text label'
};
export const InlineLabel = Template.bind({});
InlineLabel.args = {
    label: 'Input with inline label',
    fieldLevelHelp: 'Help text',
    variant: 'label-inline'
};
export const HiddenLabel = Template.bind({});
HiddenLabel.args = {
    label: 'Input with hidden label',
    variant: 'label-hidden'
};
export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Read only input',
    fieldLevelHelp: 'The value has been set to 3',
    value: 3,
    readOnly: true
};
export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Disabled input',
    fieldLevelHelp: 'The value has been set to 16',
    value: 16,
    disabled: true
};
export const Validations = Template.bind({});
Validations.args = {
    label: 'Input with validations',
    fieldLevelHelp: 'max is set to 6, min is set to 3',
    min: 3,
    max: 6,
    messageWhenRangeOverflow: 'The value needs to be equal or lesser than 6',
    messageWhenRangeUnderflow: 'The value needs to be equal or greater than 3'
};
export const FractionDigitsTypeCurrency = Template.bind({});
FractionDigitsTypeCurrency.args = {
    label: 'Input with fraction digits, type currency and min/max',
    fieldLevelHelp:
        'Max is set to $20, Min is set to $3.50, Step is set to $5.50, Fraction-Digits is 2 decimal spots',
    type: 'currency',
    step: 5.5,
    fractionDigits: 2,
    min: 3.5,
    max: 20,
    messageWhenRangeOverflow: 'The value needs to be equal or lesser than 20',
    messageWhenRangeUnderflow:
        'The value needs to be equal or greater than 3.50'
};
