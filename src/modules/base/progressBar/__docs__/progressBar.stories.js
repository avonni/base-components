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

import { ProgressBar } from '../__examples__/progressBar';

export default {
    title: 'Example/Progress Bar',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            description: 'Label for the progress bar.',
            table: {
                type: { summary: 'string' }
            }
        },
        size: {
            control: {
                type: 'select'
            },
            options: ['x-small', 'small', 'medium', 'large', 'full'],
            defaultValue: 'full',
            description:
                'The size of the progress bar. Valid values are x-small, small, medium, large and full. The default value is medium.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'full' }
            }
        },
        value: {
            control: {
                type: 'number',
                min: 0,
                max: 100
            },
            defaultValue: 0,
            description: 'The percentage value of the progress bar.',
            table: {
                type: { summary: 'number', detail: 'From 0 to 100' },
                defaultValue: { summary: '0' },
                category: 'Value'
            }
        },
        showValue: {
            name: 'show-value',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If present, display the value.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Value'
            }
        },
        valuePosition: {
            name: 'value-position',
            control: {
                type: 'select'
            },
            options: [
                'left',
                'right',
                'top-right',
                'top-left',
                'bottom-right',
                'bottom-left'
            ],
            defaultValue: 'top-right',
            description:
                'Position of the value if present. Valid values include left, right, top-right, top-left, bottom-right and bottom-left.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'top-right' },
                category: 'Value'
            }
        },
        valueLabel: {
            name: 'value-label',
            control: {
                type: 'text'
            },
            description:
                'Text display next to the value. <br> Example: 25% Complete',
            table: {
                type: { summary: 'string' },
                category: 'Value'
            }
        },
        referenceLines: {
            control: {
                type: 'object'
            },
            description:
                'Field: <ul><li>label: string</li> <li>value: number</li> <li>variant: string (default, darker, lightest, success, warning, error)</li> <li>borderStyle: string (none, solid, dashed, dotted)</li></ul>',
            table: {
                type: { summary: 'object[]' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['base', 'circular'],
            defaultValue: 'base',
            description:
                'The variant changes the appearance of the progress bar. Accepted variants include base or circular. This value defaults to base.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' }
            }
        },
        theme: {
            control: {
                type: 'select'
            },
            options: [
                'base',
                'success',
                'inverse',
                'alt-inverse',
                'warning',
                'info',
                'error',
                'offline'
            ],
            defaultValue: 'base',
            description:
                'Defines the theme of the progress bar. Valid values includes base, success, inverse, alt-inverse, warning, info, error and offline.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'base' }
            }
        },
        textured: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If present, display a texture background.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        thickness: {
            control: {
                type: 'select'
            },
            options: ['x-small', 'small', 'medium', 'large'],
            defaultValue: 'medium',
            description:
                'Set progress bar thickness. Valid values include x-small, small, medium and large',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        },
        orientation: {
            control: {
                type: 'select'
            },
            options: ['horizontal', 'vertical'],
            defaultValue: 'horizontal',
            description:
                'Orientation of the progress bar to be used. Valid values include horizontal and vertical.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'horizontal' }
            }
        }
    },
    args: {
        showValue: false,
        textured: false
    }
};

const oneReferenceLine = [
    {
        label: 'Avg',
        value: 90,
        variant: 'darker',
        borderStyle: 'dashed'
    }
];

const multipleReferenceLines = [
    {
        label: '1st',
        value: 10,
        variant: 'darker',
        borderStyle: 'dashed'
    },
    {
        label: '2nd',
        value: 15,
        variant: 'lightest',
        borderStyle: 'dotted'
    },
    {
        label: '3rd',
        value: 53,
        variant: 'warning',
        borderStyle: 'solid'
    },
    {
        label: '4th',
        value: 87,
        variant: 'success',
        borderStyle: 'none'
    }
];

const Template = (args) => ProgressBar(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Label',
    value: 45,
    referenceLines: oneReferenceLine
};

export const Vertical = Template.bind({});
Vertical.args = {
    label: 'Vertical progress bar',
    value: 45,
    orientation: 'vertical',
    referenceLines: oneReferenceLine,
    size: 'large'
};

export const MultipleReferenceLines = Template.bind({});
MultipleReferenceLines.args = {
    label: 'Progress bar with multiple reference lines',
    value: 45,
    referenceLines: multipleReferenceLines
};

export const ThickWarningTheme = Template.bind({});
ThickWarningTheme.args = {
    label: 'Thick circular progress bar with warning theme',
    value: 87,
    referenceLines: oneReferenceLine,
    theme: 'warning',
    thickness: 'large',
    variant: 'circular'
};

export const TexturedVisibleValue = Template.bind({});
TexturedVisibleValue.args = {
    label: 'Textured progress bar with visible value',
    value: 24,
    referenceLines: oneReferenceLine,
    valueLabel: 'Value label',
    showValue: true,
    textured: true
};

export const ExtraSmallVertical = Template.bind({});
ExtraSmallVertical.args = {
    label: 'Extra small and thin vertical progress bar',
    value: 63,
    referenceLines: oneReferenceLine,
    valueLabel: 'Value label',
    valuePosition: 'bottom-right',
    showValue: true,
    size: 'x-small',
    orientation: 'vertical',
    thickness: 'x-small'
};
