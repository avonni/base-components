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

import { Slider } from '../__examples__/slider';
import { VerticalSlider } from '../__examples__/verticalSlider';
import { ColoredSlider } from '../__examples__/coloredSlider';
import { CustomLabelSlider } from '../__examples__/customLabelSlider';

export default {
    title: 'Example/Slider',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            description:
                'Text label to describe the slider. Provide your own label to describe the slider.',
            table: {
                type: { summary: 'string' },
                category: 'View'
            }
        },
        disableSwap: {
            name: 'disable-swap',
            control: {
                type: 'boolean'
            },
            description: 'If present, the slider thumbs can swap order.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'View'
            }
        },
        value: {
            name: 'value',
            control: {
                type: 'array'
            },
            description: 'The value of the slider.',
            table: {
                type: { summary: 'number' },
                category: 'Value'
            }
        },
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
        showPin: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, a pin with integer value is shown when the knob is pressed.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'View'
            }
        },
        size: {
            control: {
                type: 'select'
            },
            options: ['x-small', 'small', 'medium', 'large', 'responsive'],
            description:
                'The size of the slider. The default is an empty string, which sets the slider to the width of the viewport. Accepted values are x-small, small, medium, and large.',
            table: {
                defaultValue: { summary: 'responsive' },
                type: { summary: 'string' },
                category: 'View'
            }
        },
        step: {
            control: {
                type: 'number',
                min: 1
            },
            description:
                'The step increment value of the input slider. Example steps include 0.1, 1, or 10. The default is 1.',
            table: {
                defaultValue: { summary: '1' },
                type: { summary: 'number' },
                category: 'Value'
            }
        },
        tickMarkStyle: {
            name: 'tick-mark-style',
            control: {
                type: 'select'
            },
            options: ['inner-tick', 'tick', 'dot'],
            description:
                'If present, tick marks are displayed with the according style. Accepted styles are inner-tick, tick, dot',
            table: {
                defaultValue: { summary: 'inner-tick' },
                type: { summary: 'string' },
                category: 'Value'
            }
        },
        showTickMarks: {
            name: 'show-tick-marks',
            control: {
                type: 'boolean'
            },
            description:
                'If present, minor tick marks are displayed at every step.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'string' },
                category: 'Value'
            }
        },
        hideMinMaxValues: {
            name: 'hide-min-max-values',
            control: {
                type: 'boolean'
            },
            description:
                'If present, min and max value indicators are removed.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'string' },
                category: 'View'
            }
        },
        hideTrack: {
            name: 'hide-track',
            control: {
                type: 'boolean'
            },
            description: 'If present, track progress is removed.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'string' },
                category: 'View'
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
                type: { summary: 'string' },
                category: 'View'
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
        variant: {
            control: {
                type: 'select'
            },
            options: ['standard', 'label-hidden'],
            description:
                'The variant changes the appearance of the slider. Accepted variants include standard and label-hidden. The default is standard.',
            table: {
                defaultValue: { summary: 'standard' },
                type: { summary: 'string' },
                category: 'View'
            }
        },
        min: {
            control: {
                type: 'number',
                min: 0
            },
            description:
                'The minimum value of the input slider. The default is 0.',
            table: {
                defaultValue: { summary: '0' },
                type: { summary: 'number' },
                category: 'Validation'
            }
        },
        minimumDistance: {
            name: 'minimum-distance',
            control: {
                type: 'number',
                min: 0
            },
            description:
                'The minimum distance between nodes if there are many.',
            table: {
                defaultValue: { summary: 0 },
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
                'The maximum value of the input slider. The default is 100.',
            table: {
                defaultValue: { summary: '100' },
                type: { summary: 'number' },
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
                category: 'Error messages'
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
                category: 'Error messages'
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
                category: 'Error messages'
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
                category: 'Error messages'
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
                category: 'Error messages'
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
                category: 'Error messages'
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
                category: 'Error messages'
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
                category: 'Error messages'
            }
        }
    },
    args: {
        disabled: false,
        max: 0,
        min: 0,
        showPin: false,
        tickMarkStyle: 'inner-tick',
        showTickMarks: false,
        hideMinMaxValues: false,
        hideTrack: false,
        disableSwap: false,
        minimumDistance: 0,
        size: 'responsive',
        step: 1,
        type: 'horizontal',
        unit: 'decimal',
        variant: 'standard'
    }
};

const Template = (args) => Slider(args);
const VerticalTemplate = (args) => VerticalSlider(args);
const ColoredTemplate = (args) => ColoredSlider(args);
const CustomLabelTemplate = (args) => CustomLabelSlider(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Slider label'
};

export const Pin = Template.bind({});
Pin.args = {
    label: 'Slide to view value pin',
    showPin: true
};

export const UnitPercent = Template.bind({});
UnitPercent.args = {
    label: 'Unit percent slider',
    unit: 'percent',
    value: 0.5,
    step: 0.01,
    min: 0,
    max: 1,
    showPin: true
};

export const UnitCurrencyCAD = Template.bind({});
UnitCurrencyCAD.args = {
    label: 'Unit currency (CAD) slider',
    unit: 'currency',
    step: 0.05,
    unitAttributes: {
        currencyCode: 'CAD'
    },
    showPin: true
};

export const StepMinMax = Template.bind({});
StepMinMax.args = {
    label: 'StepMinMax',
    value: 0,
    min: -20,
    max: 20,
    step: 5,
    showTickMarks: true,
    showPin: true
};

export const Range = Template.bind({});
Range.args = {
    label: 'Range slider',
    value: [25, 75]
};

export const RangeCollision = Template.bind({});
RangeCollision.args = {
    label: 'Range slider (with Collision)',
    value: [25, 75],
    disableSwap: true
};

export const MultipleRange = Template.bind({});
MultipleRange.args = {
    label: 'Multiple range slider',
    value: [25, 50, 75]
};

export const CustomLabels = CustomLabelTemplate.bind({});
CustomLabels.args = {
    label: 'Custom labels slider (inner-tick style)',
    value: 5,
    min: 0,
    max: 10,
    unit: 'custom',
    unitAttributes: {
        customLabels: [
            {
                label: 'Jan 1',
                value: 0
            },
            {
                label: 'Jan 3',
                value: 2
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

export const CustomLabelsDot = CustomLabelTemplate.bind({});
CustomLabelsDot.args = {
    label: 'Custom labels slider (dot style)',
    value: 20,
    min: 0,
    max: 40,
    tickMarkStyle: 'dot',
    unit: 'custom',
    unitAttributes: {
        customLabels: [
            {
                label: 'Very Sad',
                value: 0
            },
            {
                label: 'Sad',
                value: 10
            },
            {
                label: 'Average',
                value: 20
            },
            {
                label: 'Happy',
                value: 30
            },
            {
                label: 'Very Happy',
                value: 40
            }
        ]
    }
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Disabled slider',
    disabled: true
};

export const Vertical = VerticalTemplate.bind({});
Vertical.args = {
    size: 'x-small',
    variant: 'label-hidden',
    type: 'vertical',
    unitAttributes: {
        customLabels: [
            {
                label: 'Jan 1',
                value: 0
            },
            {
                label: 'Jan 28',
                value: 27
            },
            {
                label: 'Fev 9',
                value: 60
            },
            {
                label: 'Fev 31',
                value: 100
            }
        ]
    }
};

export const Colored = ColoredTemplate.bind({});
Colored.args = {
    label: 'Colored slider',
    showTickMarks: true,
    step: 5,
    showPin: true
};
