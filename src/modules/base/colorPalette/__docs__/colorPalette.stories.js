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

import { ColorPalette } from '../__examples__/colorPalette';

export default {
    title: 'Example/Color Palette',
    argTypes: {
        colors: {
            control: {
                type: 'object'
            },
            description: 'Color values displayed in the palette.',
            table: {
                defaultValue: {
                    summary:
                        '[“#e3abec”, “#c2dbf6”, ”#9fd6ff”, ”#9de7da”, ”#9df0bf”, ”#fff099”, ”#fed49a”, ”#d073df”, ”#86b9f3”, ”#5ebbff”, ”#44d8be”, ”#3be281”, ”#ffe654”, ”#ffb758”, ”#bd35bd”, ”#5778c1”, ”#5ebbff”, ”#00aea9”, ”#3bba4c”, ”#f4bc25”, ”#f99120”, ”#580d8c”, ”#001870”, ”#0a2399”, ”#097476”, ”#096a50”, ”#b67d11”, ”#b85d0d”]'
                },
                type: { summary: 'string[]' }
            }
        },
        columns: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 7,
            description:
                'Specifies the number of columns that will be displayed. ',
            table: {
                defaultValue: { summary: 7 },
                type: { summary: 'number' }
            }
        },
        tileWidth: {
            name: 'tile-width',
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 20,
            description: 'Tile width in px.',
            table: {
                defaultValue: { summary: 20 },
                type: { summary: 'number' }
            }
        },
        tileHeight: {
            name: 'tile-height',
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 20,
            description: 'Tile height in px.',
            table: {
                defaultValue: { summary: 20 },
                type: { summary: 'number' }
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
                type: { summary: 'boolean' }
            }
        },
        readOnly: {
            name: 'read-only',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If present, the palette is read-only and cannot be edited by users.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            description:
                'If present, a spinner is displayed to indicate that data is loading. ',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        disabled: false,
        readOnly: false,
        isLoading: false
    }
};

const colors = [
    '#e3abec',
    '#c2dbf7',
    '#9fd6ff',
    '#9de7da',
    '#9df0bf',
    '#fff099',
    '#fed49a',
    '#d073df',
    '#86b9f3',
    '#5ebbff',
    '#44d8be',
    '#3be281',
    '#ffe654',
    '#ffb758',
    '#bd35bd',
    '#5778c1',
    '#5ebbff',
    '#00aea9',
    '#3bba4c',
    '#f4bc25',
    '#f99120',
    '#580d8c',
    '#001870',
    '#0a2399',
    '#097476',
    '#096a50',
    '#b67d11',
    '#b85d0d'
];

const colorsWithLabel = [
    {
        label: 'brand-accessible',
        color: '#0176d3',
        value: '--lwc-brandAccessible'
    },
    {
        label: 'brand-active',
        color: '#014486',
        value: '--lwc-brandAccessibleActive'
    },
    {
        label: 'brand-dark',
        color: '#014486',
        value: '--lwc-brandBackgroundDark'
    },
    {
        label: 'dark-transparent',
        color: 'rgba(1, 68, 134, 0)',
        value: '--lwc-brandBackgroundDarkTransparent'
    },
    {
        label: 'background-primary',
        color: '#eef4ff',
        value: '--lwc-brandBackgroundPrimary'
    },
    {
        label: 'primary-transparent',
        color: 'rgba(176,196,223,0)',
        value: '--lwc-brandBackgroundPrimaryTransparent'
    },
    {
        label: 'brand-contrast',
        color: 'rgb(26, 27, 30)',
        value: '--lwc-brandContrast'
    }
];

const Template = (args) => ColorPalette(args);

export const Base = Template.bind({});
Base.args = {
    colors: colors
};

export const WithLabels = Template.bind({});
WithLabels.args = {
    colors: colorsWithLabel
};

export const BaseSmall = Template.bind({});
BaseSmall.args = {
    colors: colors,
    tileWidth: '10',
    tileHeight: '10'
};

export const BaseLarge = Template.bind({});
BaseLarge.args = {
    colors: colors,
    tileWidth: '30',
    tileHeight: '30',
    columns: '7'
};

export const Disabled = Template.bind({});
Disabled.args = {
    colors: colors,
    disabled: 'true'
};
