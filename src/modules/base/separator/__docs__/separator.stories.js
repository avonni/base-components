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

import { Separator } from '../__examples__/separator';

export default {
    title: 'Example/Separator',
    argTypes: {
        label: {
            name: 'label',
            control: {
                type: 'text'
            },
            description: 'Text to display in the separator',
            table: {
                type: { summary: 'string' }
            }
        },
        alignContent: {
            name: 'align-content',
            control: {
                type: 'select'
            },
            options: ['start', 'center', 'end'],
            description:
                'Position of the content in the separator. Valid values include start, center and end.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'center' }
            }
        },
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                "The name of the icon to be used in the format 'utility:down'.",
            table: {
                type: { summary: 'string' }
            }
        },
        iconPosition: {
            name: 'icon-position',
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            description:
                'Describes the position of the icon. Valid values include left and right.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' }
            }
        },
        iconSize: {
            name: 'icon-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            description:
                'The size of the icon. Options include xx-small, x-small, small, medium and large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'small' }
            }
        },
        orientation: {
            name: 'orientation',
            control: {
                type: 'select'
            },
            options: ['horizontal', 'vertical'],
            description: 'Valid values include horizontal and vertical.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'horizontal' }
            }
        }
    },
    args: {
        alignContent: 'center',
        iconPosition: 'left',
        iconSize: 'small',
        orientation: 'horizontal'
    }
};

const Template = (args) => Separator(args);

export const Base = Template.bind({});
Base.args = {
    iconName: 'utility:event',
    label: 'Today',
    orientation: 'horizontal'
};
