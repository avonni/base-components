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

import { ProgressCircle } from '../__examples__/progressCircle';

export default {
    title: 'Base/Progress Circle',
    argTypes: {
        title: {
            control: {
                type: 'text'
            },
            description:
                'The title is displayed at the bottom or top of the progress circle.',
            table: {
                type: { summary: 'string' }
            }
        },
        titlePosition: {
            name: 'title-position',
            control: {
                type: 'select'
            },
            options: ['bottom', 'top'],
            defaultValue: 'bottom',
            description:
                'Position of the title. Valid values include top and bottom.',
            table: {
                defaultValue: { summary: 'bottom' },
                type: { summary: 'string' }
            }
        },
        color: {
            control: {
                type: 'color'
            },
            defaultValue: '#1589ee',
            description:
                'The color of the Progress Circle. Accepts a valid CSS color string, including hex and rgb.',
            table: {
                defaultValue: { summary: '#1589ee' },
                type: { summary: 'string' }
            }
        },
        value: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 0,
            description:
                'The percentage value of the progress ring. The value must be a number from 0 to 100. A value of 50 corresponds to a color fill of half the ring in a clockwise or counterclockwise direction, depending on the direction attribute.',
            table: {
                defaultValue: { summary: '0' },
                type: { summary: 'number' }
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description:
                'The label is displayed after the value in the progress circle.',
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['standard', 'value-hidden'],
            defaultValue: 'standard',
            description:
                'Accepted variants include standard, value-hidden.\nvalue-hidden: Hide the value in the progress circle (ex: 75%).',
            table: {
                defaultValue: { summary: 'standard' },
                type: { summary: 'string' }
            }
        },
        direction: {
            control: {
                type: 'select'
            },
            options: ['fill', 'drain'],
            defaultValue: 'fill',
            description:
                'Controls which way the color flows from the top of the ring, either clockwise or counterclockwise Valid values include fill and drain. The fill value corresponds to a color flow in the clockwise direction. The drain value indicates a color flow in the counterclockwise direction.',
            table: {
                defaultValue: { summary: 'fill' },
                type: { summary: 'string' }
            }
        },
        size: {
            control: {
                type: 'select'
            },
            options: ['x-small', 'small', 'medium', 'large', 'x-large'],
            defaultValue: 'medium',
            description:
                'The size of the progress circle. Valid values include x-small (26x26px), small (52x52px), medium (104x104px), large (152x152px) and x-large (208x208px).',
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' }
            }
        },
        thickness: {
            control: {
                type: 'select'
            },
            options: ['x-small', 'small', 'medium', 'large', 'x-large'],
            defaultValue: 'medium',
            description:
                'Set progress circle thickness. Valid values include x-small, small, medium, large and x-large.',
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' }
            }
        }
    },
    args: {
        round: false
    }
};

const Template = (args) => ProgressCircle(args);

export const Base = Template.bind({});
Base.args = {
    title: 'Text title',
    value: 45
};

export const BaseWithTitleTop = Template.bind({});
BaseWithTitleTop.args = {
    title: 'Text title',
    value: 45,
    titlePosition: 'top'
};

export const BaseWithThicknessX_SmallAndLabel = Template.bind({});
BaseWithThicknessX_SmallAndLabel.args = {
    title: 'Thickness X-small and label',
    value: 45,
    thickness: 'x-small',
    label: 'progress'
};

export const BaseWithThicknessSmall = Template.bind({});
BaseWithThicknessSmall.args = {
    title: 'Thickness Small',
    value: 55,
    thickness: 'small'
};

export const BaseWithThicknessLarge = Template.bind({});
BaseWithThicknessLarge.args = {
    title: 'Thickness large',
    value: 55,
    thickness: 'large'
};

export const BaseWithThicknessX_Large = Template.bind({});
BaseWithThicknessX_Large.args = {
    title: 'Thickness X-large',
    value: 55,
    thickness: 'x-large'
};

export const DrainDirection = Template.bind({});
DrainDirection.args = {
    title: 'Drain direction',
    value: 45,
    direction: 'drain'
};

export const NoLabelSmallValueHiddenGreen = Template.bind({});
NoLabelSmallValueHiddenGreen.args = {
    value: 45,
    variant: 'value-hidden',
    color: '#7ED321',
    size: 'small'
};

export const ExtraSmall = Template.bind({});
ExtraSmall.args = {
    title: 'Extra small',
    value: 45,
    size: 'x-small'
};

export const Small = Template.bind({});
Small.args = {
    title: 'Small',
    value: 45,
    size: 'small'
};

export const Large = Template.bind({});
Large.args = {
    title: 'Large',
    value: 45,
    size: 'large'
};

export const ExtraLarge = Template.bind({});
ExtraLarge.args = {
    title: 'Extra large',
    value: 45,
    size: 'x-large'
};
