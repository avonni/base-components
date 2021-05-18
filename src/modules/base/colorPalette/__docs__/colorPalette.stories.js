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

const Template = (args) => ColorPalette(args);

export const Base = Template.bind({});
Base.args = {
    colors: colors
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
