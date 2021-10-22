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

import { InputDateRange } from '../__examples__/inputDateRange';

export default {
    title: 'Example/Input Date Range',
    argTypes: {
        type: {
            control: {
                type: 'select'
            },
            options: ['date', 'datetime'],
            defaultValue: 'date',
            description: 'Valid types include date and datetime.',
            table: {
                defaultValue: { summary: 'date' },
                type: { summary: 'string' }
            }
        },
        label: {
            control: {
                type: 'text'
            },
            type: {
                required: true
            },
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
        labelStartDate: {
            name: 'label-start-date',
            control: {
                type: 'text'
            },
            description: 'Text label for the start input.',
            table: {
                type: { summary: 'string' }
            }
        },
        labelEndDate: {
            name: 'label-end-date',
            control: {
                type: 'text'
            },
            description: 'Text label for the end input.',
            table: {
                type: { summary: 'string' }
            }
        },
        startDate: {
            name: 'start-date',
            control: {
                type: 'text'
            },
            description: 'Specifies the value of the start date input.',
            table: {
                type: { summary: 'string' }
            }
        },
        endDate: {
            name: 'end-date',
            control: {
                type: 'text'
            },
            description: 'Specifies the value of the end date input.',
            table: {
                type: { summary: 'string' }
            }
        },
        dateStyle: {
            name: 'date-style',
            control: {
                type: 'select'
            },
            options: ['short', 'medium', 'long'],
            defaultValue: 'medium',
            description:
                "The display style of the date when type='date' or type='datetime'. Valid values are short, medium and long. The format of each style is specific to the locale. On mobile devices this attribute has no effect.",
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' }
            }
        },
        readOnly: {
            name: 'read-only',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If present, the input is read-only and cannot be edited by users.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Validation'
            }
        },
        timeStyle: {
            name: 'time-style',
            control: {
                type: 'select'
            },
            options: ['short', 'medium', 'long'],
            defaultValue: 'short',
            description:
                "The display style of the time when type='time' or type='datetime'. Valid values are short (default), medium, and long. Currently, medium and long styles look the same. On mobile devices this attribute has no effect.",
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'short' }
            }
        },
        timezone: {
            control: {
                type: 'text'
            },
            description:
                "Specifies the time zone used when type='datetime' only. This value defaults to the user's Salesforce time zone setting.",
            table: {
                type: { summary: 'string' }
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
        messageWhenValueMissing: {
            name: 'message-when-value-missing',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when the start-date is missing.',
            table: {
                category: 'Validation',
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
                defaultValue: { summary: 'standard' },
                type: { summary: 'string' }
            }
        }
    },
    args: {
        disabled: false,
        required: false
    }
};

const Template = (args) => InputDateRange(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Text label',
    endDate: '7/21/2021'
};

export const Prefilled = Template.bind({});
Prefilled.args = {
    label: 'Input with prefilled values',
    required: true,
    fieldLevelHelp: 'The date format has been set to long',
    labelStartDate: 'Start date',
    labelEndDate: 'End date',
    startDate: new Date('7/20/2021 10:00'),
    endDate: new Date('7/21/2021 18:15'),
    dateStyle: 'long'
};

export const DateTime = Template.bind({});
DateTime.args = {
    label: 'Input with dates and times',
    type: 'datetime',
    required: true,
    fieldLevelHelp: 'The date format has been set to short',
    labelStartDate: 'Start date',
    labelEndDate: 'End date',
    dateStyle: 'short'
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Disabled input',
    disabled: true,
    fieldLevelHelp: 'Disabled input with prefilled start and end dates',
    labelStartDate: 'Start date',
    labelEndDate: 'End date',
    startDate: new Date('7/20/2021 10:00'),
    endDate: new Date('7/21/2021 18:15')
};
