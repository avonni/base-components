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

import { Segment } from '../__examples__/segment';

export default {
    title: 'Example/Segment',
    argTypes: {
        value: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'number' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['shade', 'success', 'warning', 'error'],
            defaultValue: 'shade',
            table: {
                defaultValue: { summary: 'shade' },
                type: { summary: 'string' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        disabled: false
    }
};

const Template = (args) => Segment(args);

export const Base = Template.bind({});

export const Disabled = Template.bind({});
Disabled.args = {
    value: 1,
    disabled: true
};

export const Success = Template.bind({});
Success.args = {
    value: 1,
    variant: 'success'
};

export const Warning = Template.bind({});
Warning.args = {
    value: 3,
    variant: 'warning'
};

export const Error = Template.bind({});
Error.args = {
    variant: 'error',
    value: 2
};
