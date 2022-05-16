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

import { InputData } from '../__examples__/inputData';

export default {
    title: 'Example/Input Data',
    argTypes: {
        checked: {
            control: {
                type: 'boolean'
            },
            description:
                'Whether the input is checked. Only has an effect with type boolean.',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input field is disabled and users cannot interact with it.',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description:
                'Label of the input. If present, it will be displayed on top of the data.',
            table: {
                type: { summary: 'string' }
            }
        },
        latitude: {
            control: {
                type: 'number'
            },
            description:
                'Latitude of a location. Only has an effect with type location.',
            table: {
                type: { summary: 'number' }
            }
        },
        longitude: {
            control: {
                type: 'number'
            },
            description:
                'Longitude of a location. Only has an effect with type location.',
            table: {
                type: { summary: 'number' }
            }
        },
        name: {
            control: {
                type: 'text'
            },
            description: 'Specifies the name of an input element.',
            table: {
                type: { summary: 'string' }
            }
        },
        placeholder: {
            control: {
                type: 'text'
            },
            description:
                'Text that is displayed when the field is empty, to prompt the user for a valid entry.',
            table: {
                type: { summary: 'string' }
            }
        },
        readOnly: {
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
            description:
                'If present, the input field must be filled out before the form is submitted.',
            table: {
                defaultValue: { summary: false },
                type: { summary: 'boolean' }
            }
        },
        type: {
            control: {
                type: 'select'
            },
            options: [
                'boolean',
                'currency',
                'date',
                'email',
                'location',
                'number',
                'percent',
                'phone',
                'url',
                'text'
            ],
            description:
                'Type of the input. Accepted types include boolean, currency, date, email, location, number, percent, phone, url and text. This value defaults to text.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'text' }
            }
        },
        value: {
            control: {
                type: 'text'
            },
            description:
                'Value of the input. Has an effect with all types, except for boolean and location.',
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
            description:
                'The variant changes the appearance of an input field. Accepted variants include standard, label-inline, label-hidden, and label-stacked. This value defaults to standard, which displays the label above the field. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and input field. Use label-stacked to place the label above the input field.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'standard' }
            }
        }
    },
    args: {
        checked: false,
        disabled: false,
        readOnly: false,
        required: false,
        type: 'text',
        variant: 'standard'
    }
};

const Template = (args) => InputData(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Base input',
    placeholder: 'Placeholder...'
};

export const BaseAsDate = Template.bind({});
BaseAsDate.args = {
    label: 'Date input',
    placeholder: 'Placeholder...',
    type: 'date'
};

export const BaseAsPercent = Template.bind({});
BaseAsPercent.args = {
    label: 'Percent input',
    placeholder: 'Placeholder...',
    type: 'percent',
    value: 0.1
};

export const BaseAsLocation = Template.bind({});
BaseAsLocation.args = {
    label: 'Location input',
    placeholder: 'Placeholder...',
    type: 'location',
    latitude: 37.793846,
    longitude: -122.394837
};

export const BaseAsPhone = Template.bind({});
BaseAsPhone.args = {
    label: 'Phone input',
    placeholder: 'Placeholder...',
    type: 'phone',
    value: '1234567890'
};

export const BaseAsBoolean = Template.bind({});
BaseAsBoolean.args = {
    label: 'Boolean input',
    type: 'boolean',
    checked: true
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Disabled input',
    placeholder: 'Placeholder...',
    disabled: true
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Read-only input',
    placeholder: 'Placeholder...',
    readOnly: true
};

export const Required = Template.bind({});
Required.args = {
    label: 'Required input',
    placeholder: 'Placeholder...',
    required: true
};

export const LabelInline = Template.bind({});
LabelInline.args = {
    label: 'Inline label input',
    placeholder: 'Placeholder...',
    variant: 'label-inline'
};

export const LabelHidden = Template.bind({});
LabelHidden.args = {
    label: 'Hidden label input',
    placeholder: 'Placeholder...',
    variant: 'label-hidden'
};
