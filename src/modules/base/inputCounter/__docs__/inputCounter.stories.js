import { InputCounter } from '../__examples__/inputCounter';

export default {
    title: 'Example/Input Counter',
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
        max: {
            control: {
                type: 'number'
            },
            description: 'The maximum acceptable value for the input.',
            table: {
                type: { summary: 'number' },
                category: 'Validation'
            }
        },
        min: {
            control: {
                type: 'number'
            },
            description: 'The minimum acceptable value for the input.',
            table: {
                type: { summary: 'number' },
                category: 'Validation'
            }
        },
        step: {
            control: {
                type: 'number'
            },
            defaultValue: 1,
            description:
                'Granularity of the value, specified as a positive floating point number.',
            table: {
                type: { summary: 'number' },
                defaultValue: 1,
                category: 'Validation'
            }
        },
        value: {
            control: {
                type: 'text'
            },
            description: 'Specifies the value of an input element.',
            table: {
                type: { summary: 'string' }
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
            defaultValue: 'standard',
            description:
                'The variant changes the appearance of an input field. Accepted variants include standard, label-inline, label-hidden, and label-stacked. This value defaults to standard, which displays the label above the field. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and input field. Use label-stacked to place the label above the input field.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'standard' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If present, the input field is disabled and users cannot interact with it.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Validation'
            }
        },
        readOnly: {
            name: 'read-only',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
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
            defaultValue: 0,
            description:
                'If present, the input field must be filled out before the form is submitted.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
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
        type: {
            name: 'type',
            control: {
                type: 'select'
            },
            options: [
                'number',
                'currency',
                'percent'
            ],
            defaultValue: 'number',
            description:
            'Input counter type. Valid values include number (default), currency, percent.',
            table: {
                default: { summary: 'number' },
                type: { summary: 'string' }
            }
        },
        typeAttributes: {
            name: 'type-attributes',
            control: {
                type: 'object'
            },
            description:
                'Type attributes object',
            table: {
                type: { summary: 'object[]' }
            }
        },
    },
    args: {
        disabled: false,
        readOnly: false,
        required: false
    }
};

const typeAttributes = {
    number : {
        minimumIntegerDigits: 1, 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 4, 
        minimumSignificantDigits: 1, 
        maximumSignificantDigits: 21
    },
    currency : {
        currencyCode: 'USD', 
        currencyDisplayAs: 'code', 
        minimumIntegerDigits: 1, 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 4, 
        minimumSignificantDigits: 1, 
        maximumSignificantDigits: 21, 
        step: 1
    },
    percent : {
        minimumIntegerDigits: 1, 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 4, 
        minimumSignificantDigits: 1, 
        maximumSignificantDigits: 21, 
        step: 1
    }
}

const Template = (args) => InputCounter(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Text label',
    typeAttributes: typeAttributes
};
export const InlineLabel = Template.bind({});
InlineLabel.args = {
    label: 'Input with inline label',
    fieldLevelHelp: 'Help text',
    variant: 'label-inline',
    typeAttributes: typeAttributes
};
export const HiddenLabel = Template.bind({});
HiddenLabel.args = {
    label: 'Input with hidden label',
    variant: 'label-hidden',
    typeAttributes: typeAttributes
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Read only input',
    fieldLevelHelp: 'The value has been set to 3',
    value: 3,
    readOnly: true,
    typeAttributes: typeAttributes
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Disabled input',
    fieldLevelHelp: 'The value has been set to 16',
    value: 16,
    disabled: true,
    typeAttributes: typeAttributes
};

export const Validations = Template.bind({});
Validations.args = {
    label: 'Input with validations',
    fieldLevelHelp: 'max is set to 6, min is set to 3',
    min: 3,
    max: 6,
    messageWhenRangeOverflow: 'The value needs to be equal or lesser than 6',
    messageWhenRangeUnderflow: 'The value needs to be equal or greater than 3',
    typeAttributes: typeAttributes
};
