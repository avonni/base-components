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

import { MediaObject } from '../__examples__/mediaObject';
import { InverseMediaObject } from '../__examples__/inverseMediaObject';
import { DoubleMediaObject } from '../__examples__/doubleMediaObject';

export default {
    title: 'Example/Media Object',
    argTypes: {
        verticalAlign: {
            name: 'vertical-align',
            control: {
                type: 'select'
            },
            options: ['start', 'center', 'end'],
            defaultValue: 'start',
            description:
                'Determines how to align the media object items vertically in the container. The alignment options are start, center and end.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'start' }
            }
        },
        responsive: {
            control: {
                type: 'boolean'
            },
            description: 'Figure and body stack on smaller screens.',
            defaultValue: 0,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        inline: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'Aligns the figure and body to be inline-block of each other.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        size: {
            control: {
                type: 'select'
            },
            options: ['medium', 'small', 'large'],
            description:
                'The size of the media object. Valid values include small, medium and large.',
            defaultValue: 'medium',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        }
    },
    args: {
        responsive: false,
        inline: false
    }
};

const BaseTemplate = (args) => MediaObject(args);
const InverseTemplate = (args) => InverseMediaObject(args);
const DoubleTemplate = (args) => DoubleMediaObject(args);

export const Base = BaseTemplate.bind({});
export const Inverse = InverseTemplate.bind({});
export const Double = DoubleTemplate.bind({});

export const CenterSmall = BaseTemplate.bind({});
CenterSmall.args = {
    verticalAlign: 'center',
    size: 'small'
};

export const EndLarge = BaseTemplate.bind({});
EndLarge.args = {
    verticalAlign: 'end',
    size: 'large'
};

export const Inline = BaseTemplate.bind({});
Inline.args = {
    inline: true
};
