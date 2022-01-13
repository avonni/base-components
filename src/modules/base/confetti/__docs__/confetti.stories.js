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

import { Confetti } from '../__examples__/confetti';

export default {
    title: 'Example/Confetti',
    argTypes: {
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'base',
                'random-direction',
                'realistic',
                'fireworks',
                'snow',
                'pride'
            ],
            defaultValue: 'base',
            description:
                'The variant changes the appearance of the confetti. Accepted variants include include base, random-direction, realistic, fireworks, snow and pride.',
            table: {
                defaultValue: { summary: 'base' },
                type: { summary: 'string' }
            }
        },
        colors: {
            control: {
                type: 'object'
            },
            description: 'An array of color strings, in the HEX format',
            table: {
                defaultValue: {
                    summary:
                        "['#529EE0','#F0E442','#FFB03B','#E16032','#4FD2D2','#006699','#E287B2']"
                },
                type: { summary: 'string[]' }
            }
        },
        originX: {
            name: 'origin-x',
            control: {
                type: 'number',
                min: 0
            },
            description:
                'The x position on the page, with 0 being the left edge and 1 being the right edge.',
            defaultValue: 0.5,
            table: {
                defaultValue: { summary: 0.5 },
                type: { summary: 'number' }
            }
        },
        originY: {
            name: 'origin-y',
            control: {
                type: 'number',
                min: 0
            },
            description:
                'The y position on the page, with 0 being the top edge and 1 being the bottom edge.',
            defaultValue: 0.5,
            table: {
                defaultValue: { summary: 0.5 },
                type: { summary: 'number' }
            }
        }
    }
};

const Template = (args) => Confetti(args);

export const Base = Template.bind({});

export const RandomDirection = Template.bind({});
RandomDirection.args = {
    variant: 'random-direction'
};

export const Realistic = Template.bind({});
Realistic.args = {
    variant: 'realistic'
};

export const Fireworks = Template.bind({});
Fireworks.args = {
    variant: 'fireworks'
};

export const Snow = Template.bind({});
Snow.args = {
    colors: ["e63946","f1faee","a8dadc","457b9d","1d3557"],
    variant: 'snow'
};

export const Pride = Template.bind({});
Pride.args = {
    variant: 'pride'
};
