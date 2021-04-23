import { Range } from '../__examples__/range';

export default {
    title: 'Example/Range',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            description:
                'Text label to describe the slider. Provide your own label to describe the slider.',
            table: {
                type: { summary: 'string' }
            }
        },
        size: {
            control: {
                type: 'select'
            },
            options: ['', 'x-small', 'small', 'medium', 'large'],
            defaultValue: '',
            description:
                'The size of the slider. The default is an empty string, which sets the slider to the width of the viewport. Accepted values are x-small, small, medium, and large.',
            table: {
                defaultValue: { summary: '' },
                type: { summary: 'string' }
            }
        },
        type: {
            control: {
                type: 'select'
            },
            options: ['horizontal', 'vertical'],
            defaultValue: 'horizontal',
            description:
                'The type determines the orientation of the slider. Accepted values are vertical and horizontal. The default is horizontal.',
            table: {
                defaultValue: { summary: 'horizontal' },
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['standard', 'label-hidden'],
            defaultValue: 'standard',
            description:
                'The variant changes the appearance of the slider. Accepted variants include standard and label-hidden. The default is standard.',
            table: {
                defaultValue: { summary: 'standard' },
                type: { summary: 'string' }
            }
        },
        unit: {
            control: {
                type: 'select'
            },
            options: ['decimal', 'currency', 'percent'],
            defaultValue: 'decimal',
            description:
                'Accepted unit include decimal, currency and percent. \nFormat the value displayed (lightning-formatted-number)',
            table: {
                defaultValue: { summary: 'decimal' },
                type: { summary: 'string' },
                category: 'Value'
            }
        },
        unitAttributes: {
            name: 'unit-attributes',
            control: {
                type: 'object'
            },
            description:
                'Fields: \ncurrencyCode, currencyDisplayAs, minimumIntegerDigits, minimumFractionDigits, maximumFractionDigits, minimumSignificantDigits, maximumSignificantDigits',
            table: {
                type: { summary: 'object' },
                category: 'Value'
            }
        },
        valueLower: {
            name: 'value-lower',
            control: {
                type: 'number'
            },
            description: 'The lower value of the range.',
            table: {
                type: { summary: 'number' },
                category: 'Value'
            }
        },
        valueUpper: {
            name: 'value-upper',
            control: {
                type: 'number'
            },
            description: 'The upper value of the range.',
            table: {
                type: { summary: 'number' },
                category: 'Value'
            }
        },
        min: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 0,
            description:
                'The minimum value of the input range. The default is 0.',
            table: {
                defaultValue: { summary: '0' },
                type: { summary: 'number' },
                category: 'Validation'
            }
        },
        max: {
            control: {
                type: 'number',
                min: 100
            },
            defaultValue: 100,
            description:
                'The maximum value of the input range. The default is 100.',
            table: {
                defaultValue: { summary: '100' },
                type: { summary: 'number' },
                category: 'Validation'
            }
        },
        step: {
            control: {
                type: 'number',
                min: 1
            },
            defaultValue: 1,
            description:
                'The step increment value of the input range. Example steps include 0.1, 1, or 10. The default is 1.',
            table: {
                defaultValue: { summary: '1' },
                type: { summary: 'number' },
                category: 'Validation'
            }
        },
        pin: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If true, a pin with integer value is shown when the knob is pressed.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Value'
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If present, the slider is disabled and users cannot interact with it.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validation'
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
                type: { summary: 'string' },
                category: 'Validation',
                subcategory: 'Error messages'
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
                type: { summary: 'string' },
                category: 'Validation',
                subcategory: 'Error messages'
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
                type: { summary: 'string' },
                category: 'Validation',
                subcategory: 'Error messages'
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
                type: { summary: 'string' },
                category: 'Validation',
                subcategory: 'Error messages'
            }
        },
        messageWhenTooLong: {
            name: 'message-when-too-long',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when the value is too long.',
            table: {
                type: { summary: 'string' },
                category: 'Validation',
                subcategory: 'Error messages'
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
                type: { summary: 'string' },
                category: 'Validation',
                subcategory: 'Error messages'
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
                type: { summary: 'string' },
                category: 'Validation',
                subcategory: 'Error messages'
            }
        },
        messageWhenTypeMismatch: {
            name: 'message-when-type-mismatch',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when a type mismatch is detected.',
            table: {
                type: { summary: 'string' },
                category: 'Validation',
                subcategory: 'Error messages'
            }
        }
    },
    args: {
        disabled: false,
        pin: false
    }
};

const Template = (args) => Range(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Text label',
    valueLower: 28,
    valueUpper: 73
};

export const Vertical = Template.bind({});
Vertical.args = {
    label: 'Vertical input',
    valueLower: 28,
    valueUpper: 73,
    type: 'vertical'
};

export const ExtraSmallPercent = Template.bind({});
ExtraSmallPercent.args = {
    label: 'Extra small percent input',
    valueLower: 28,
    valueUpper: 73,
    unit: 'percent',
    size: 'x-small'
};

export const Small = Template.bind({});
Small.args = {
    label: 'Small input',
    valueLower: 28,
    valueUpper: 73,
    size: 'small'
};

export const CurrencyLarge = Template.bind({});
CurrencyLarge.args = {
    label: 'Currency large input',
    valueLower: 28,
    valueUpper: 73,
    size: 'large',
    unit: 'currency',
    unitAttributes: {
        currencyCode: 'CAD'
    },
    pin: true
};

export const MinMaxStep = Template.bind({});
MinMaxStep.args = {
    label: 'Input with min 30, max 80 and step 3',
    valueLower: 28,
    valueUpper: 73,
    min: 30,
    max: 80,
    step: 3
};
