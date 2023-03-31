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

import { Layout } from '../__examples__/layout';

export default {
    title: 'Example/Layout',
    argTypes: {
        direction: {
            control: {
                type: 'select'
            },
            options: ['row', 'row-reverse', 'column', 'column-reverse'],
            description:
                'Direction in which the items are placed in the container. Valid values include row, row-reverse, column and column-reverse.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'row' }
            }
        },
        horizontalAlign: {
            name: 'horizontal-align',
            control: {
                type: 'select'
            },
            options: ['start', 'center', 'end', 'space', 'spread'],
            description:
                'Determines how to spread the layout items horizontally. Valid values include start, center, space, spread, and end.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'start' }
            }
        },
        multipleRows: {
            name: 'multiple-rows',
            control: {
                type: 'boolean'
            },
            description:
                'If present, layout items wrap to the following line when they exceed the layout width.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        verticalAlign: {
            name: 'vertical-align',
            control: {
                type: 'select'
            },
            options: ['start', 'center', 'end', 'stretch'],
            description:
                'Determines how to align the layout items vertically in the container. Valid values include start, center, end, and stretch.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        }
    },
    args: {
        direction: 'row',
        horizontalAlign: 'start',
        multipleRows: false,
        verticalAlign: 'stretch'
    }
};

const Template = (args) => Layout(args);

export const Base = Template.bind({});

export const MultipleRows = Template.bind({});
MultipleRows.args = {
    multipleRows: true
};
