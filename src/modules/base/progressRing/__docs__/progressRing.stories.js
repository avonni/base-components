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

import { ProgressRing } from '../__examples__/progressRing';

export default {
    title: 'Example/Progress Ring',
    argTypes: {
        value: {
            control: {
                type: 'number',
                min: 0,
                max: 100
            },
            description:
                'The percentage value of the progress ring. The value must be a number from 0 to 100. A value of 50 corresponds to a color fill of half the ring in a clockwise or counterclockwise direction, depending on the direction attribute.',
            table: {
                type: { summary: 'number', detail: 'From 0 to 100' },
                defaultValue: { summary: '0' }
            }
        },
        direction: {
            control: {
                type: 'select'
            },
            options: ['fill', 'drain'],
            description:
                'Controls which way the color flows from the top of the ring, either clockwise or counterclockwise Valid values include fill and drain. The fill value corresponds to a color flow in the clockwise direction. The drain value indicates a color flow in the counterclockwise direction.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'fill' }
            }
        },
        size: {
            control: {
                type: 'select'
            },
            options: ['medium', 'large'],
            description:
                'The size of the progress ring. Valid values include medium and large.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: [
                'base',
                'active-step',
                'warning',
                'expired',
                'base-autocomplete'
            ],
            description:
                'Changes the appearance of the progress ring. Accepted variants include base, active-step, warning, expired, base-autocomplete.',
            table: {
                type: { summary: 'String' },
                defaultValue: { summary: 'base' }
            }
        },
        hideIcon: {
            name: 'hide-icon',
            control: {
                type: 'boolean'
            },
            description:
                'If present and the variant is equal to warning, base-autocomplete or expired, hide the icon in the progress ring content',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        }
    },
    args: {
        direction: 'fill',
        hideIcon: false,
        size: 'medium',
        value: 0,
        variant: 'base'
    }
};

const Template = (args) => ProgressRing(args);

export const Base = Template.bind({});
Base.args = {
    value: 25
};

export const Large = Template.bind({});
Large.args = {
    value: 25,
    size: 'large'
};

export const ActiveStepDrain = Template.bind({});
ActiveStepDrain.args = {
    value: 25,
    variant: 'active-step',
    direction: 'drain'
};

export const Warning = Template.bind({});
Warning.args = {
    value: 45,
    variant: 'warning'
};

export const Expired = Template.bind({});
Expired.args = {
    value: 89,
    variant: 'expired'
};

export const BaseAutocomplete = Template.bind({});
BaseAutocomplete.args = {
    value: 100,
    variant: 'base-autocomplete'
};
