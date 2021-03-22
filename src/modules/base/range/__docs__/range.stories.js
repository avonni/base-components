import { Range } from '../__examples__/range';

export default {
    title: 'Example/Range',
    argTypes: {
        label: {
            control: {
                type: 'text'
            }
        },
        size: {
            control: {
                type: 'select',
                options: ['', 'x-small', 'small', 'medium', 'large']
            },
            defaultValue: '',
            table: {
                defaultValue: { summary: '' }
            }
        },
        type: {
            control: {
                type: 'select',
                options: ['horizontal', 'vertical']
            },
            defaultValue: 'horizontal',
            table: {
                defaultValue: { summary: 'horizontal' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['standard', 'label-hidden']
            },
            defaultValue: 'standard',
            table: {
                defaultValue: { summary: 'standard' }
            }
        },
        unit: {
            control: {
                type: 'select',
                options: ['decimal', 'currency', 'percent']
            },
            defaultValue: 'decimal',
            table: {
                defaultValue: { summary: 'decimal' }
            }
        },
        unitAttributes: {
            control: {
                type: 'object'
            }
        },
        valueLower: {
            control: {
                type: 'number'
            }
        },
        valueUpper: {
            control: {
                type: 'number'
            }
        },
        min: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: '0' }
            }
        },
        max: {
            control: {
                type: 'number',
                min: 100
            },
            defaultValue: 100,
            table: {
                defaultValue: { summary: '100' }
            }
        },
        step: {
            control: {
                type: 'number',
                min: 1
            },
            defaultValue: 1,
            table: {
                defaultValue: { summary: '1' }
            }
        },
        pin: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
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
        messageWhenRangeOverflow: {
            control: {
                type: 'text'
            }
        },
        messageWhenRangeUnderflow: {
            control: {
                type: 'text'
            }
        },
        messageWhenStepMismatch: {
            control: {
                type: 'text'
            }
        },
        messageWhenValueMissing: {
            control: {
                type: 'text'
            }
        },
        messageWhenTooLong: {
            control: {
                type: 'text'
            }
        },
        messageWhenBadInput: {
            control: {
                type: 'text'
            }
        },
        messageWhenPatternMismatch: {
            control: {
                type: 'text'
            }
        },
        messageWhenTypeMismatch: {
            control: {
                type: 'text'
            }
        }
    }
};

const Template = (args) => Range(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Label',
    valueLower: 28,
    valueUpper: 73,
    messageWhenRangeOverflow: 'Range overflow',
    messageWhenRangeUnderflow: 'Range underflow',
    messageWhenStepMismatch: 'Step mismatch',
    messageWhenValueMissing: 'Value missing',
    messageWhenTooLong: 'Too long',
    messageWhenBadInput: 'Bad input',
    messageWhenPatternMismatch: 'Pattern mismatch',
    messageWhenTypeMismatch: 'Type mismatch'
};
