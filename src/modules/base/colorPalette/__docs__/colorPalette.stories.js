import { ColorPalette } from '../__examples__/colorPalette';

export default {
    title: 'Example/Color Palette',
    argTypes: {
        colors: {
            control: {
                type: 'object'
            }
        },
        columns: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 7,
            table: {
                defaultValue: { summary: 7 }
            }
        },
        tileWidth: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 20,
            table: {
                defaultValue: { summary: 20 }
            }
        },
        tileHeight: {
            control: {
                type: 'number',
                min: 0
            },
            defaultValue: 20,
            table: {
                defaultValue: { summary: 20 }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        readOnly: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        isLoading: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        }
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
