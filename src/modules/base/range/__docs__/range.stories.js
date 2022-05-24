/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { Range } from '../__examples__/range';

export default {
    title: 'Example/Range',
    argTypes: {
        disabled: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the slider is disabled and users cannot interact with it.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validation'
            }
        },
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
        },
        min: {
            control: {
                type: 'number',
                min: 0
            },
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
            description:
                'The maximum value of the input range. The default is 100.',
            table: {
                defaultValue: { summary: '100' },
                type: { summary: 'number' },
                category: 'Validation'
            }
        },
        pin: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, a pin with integer value is shown when the knob is pressed.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Value'
            }
        },
        size: {
            control: {
                type: 'select'
            },
            options: ['x-small', 'small', 'medium', 'large', 'full'],
            description:
                'The size of the slider. The default is an empty string, which sets the slider to the width of the viewport. Accepted values are x-small, small, medium, and large.',
            table: {
                defaultValue: { summary: 'full' },
                type: { summary: 'string' }
            }
        },
        step: {
            control: {
                type: 'number',
                min: 1
            },
            description:
                'The step increment value of the input range. Example steps include 0.1, 1, or 10. The default is 1.',
            table: {
                defaultValue: { summary: '1' },
                type: { summary: 'number' },
                category: 'Validation'
            }
        },
        type: {
            control: {
                type: 'select'
            },
            options: ['horizontal', 'vertical'],
            description:
                'The type determines the orientation of the slider. Accepted values are vertical and horizontal. The default is horizontal.',
            table: {
                defaultValue: { summary: 'horizontal' },
                type: { summary: 'string' }
            }
        },
        unit: {
            control: {
                type: 'select'
            },
            options: ['decimal', 'currency', 'percent', 'custom'],
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
        variant: {
            control: {
                type: 'select'
            },
            options: ['standard', 'label-hidden'],
            description:
                'The variant changes the appearance of the slider. Accepted variants include standard and label-hidden. The default is standard.',
            table: {
                defaultValue: { summary: 'standard' },
                type: { summary: 'string' }
            }
        }
    },
    args: {
        disabled: false,
        max: 0,
        min: 0,
        pin: false,
        size: 'full',
        step: 1,
        type: 'horizontal',
        unit: 'decimal',
        variant: 'standard'
    }
};

const Template = (args) => Range(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Text label',
    valueLower: 28,
    valueUpper: 73
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

export const CustomLabel = Template.bind({});
CustomLabel.args = {
    label: 'Custom label range',
    step: 1,
    valueUpper: 5,
    min: 0,
    max: 10,
    size: 'full',
    unit: 'custom',
    unitAttributes: {
        customLabels: [
            {
                label: 'Jan 1',
                value: 0
            },
            {
                label: 'Jan 6',
                value: 5
            },
            {
                label: 'Jan 11',
                value: 10
            }
        ]
    }
};

export const MinMaxStep = Template.bind({});
MinMaxStep.args = {
    label: 'Input with min 30, max 80 and step 3',
    valueLower: 30,
    valueUpper: 71,
    min: 30,
    max: 80,
    step: 3
};

export const Vertical = Template.bind({});
Vertical.args = {
    label: 'Vertical input',
    valueLower: 28,
    valueUpper: 73,
    type: 'vertical'
};

export const VerticalSmall = Template.bind({});
VerticalSmall.args = {
    label: 'Small vertical input',
    valueLower: 28,
    valueUpper: 73,
    type: 'vertical',
    size: 'small'
};

export const VerticalLarge = Template.bind({});
VerticalLarge.args = {
    label: 'Large vertical input',
    valueLower: 28,
    valueUpper: 73,
    type: 'vertical',
    size: 'large'
};
