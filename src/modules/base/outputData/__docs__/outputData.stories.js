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

import { OutputData } from '../__examples__/outputData';

export default {
    title: 'Base/Output Data',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            description: 'Label of the output data',
            table: {
                type: { summary: 'string' }
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
            description: 'Data type',
            defaultValue: 'text',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'text' }
            }
        },
        typeAttributes: {
            control: {
                type: 'object'
            },
            description: 'Object of attributes specific to the type.',
            table: {
                type: { summary: 'object' }
            }
        },
        value: {
            control: {
                type: 'text'
            },
            description: 'Value of the output data.',
            table: {
                type: { summary: 'string' }
            }
        }
    }
};

const Template = (args) => OutputData(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Text',
    value: 'Some text value'
};

export const DateTime = Template.bind({});
DateTime.args = {
    label: 'Date',
    type: 'date',
    value: new Date().toISOString(),
    typeAttributes: {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
    }
};

export const Percent = Template.bind({});
Percent.args = {
    label: 'Percentage',
    type: 'percent',
    value: 0.4567,
    typeAttributes: {
        maximumFractionDigits: 1
    }
};

export const URL = Template.bind({});
URL.args = {
    label: 'URL',
    type: 'url',
    value: 'https://www.avonnicomponents.com/',
    typeAttributes: {
        label: 'Avonni components'
    }
};
