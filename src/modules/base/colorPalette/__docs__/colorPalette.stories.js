import { ColorPalette } from '../__examples__/colorPalette';
import { colors, tokens, groups } from './data';

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
                    summary: `['#e3abec', '#c2dbf6', '#9fd6ff', '#9de7da', '#9df0bf', '#fff099', '#fed49a', '#d073df', '#86b9f3', '#5ebbff', '#44d8be', '#3be281', '#ffe654', '#ffb758', '#bd35bd', '#5778c1', '#1b96ff', '#00aea9', '#3bba4c', '#f4bc25', '#f99120', '#580d8c', '#001870', '#0a2399', '#097476', '#096a50', '#b67d11', '#b85d0d']`
                },
                type: { summary: 'string[]' }
            }
        },
        columns: {
            control: {
                type: 'number',
                min: 0
            },
            description:
                'Specifies the number of columns displayed. If unspecified, the tiles spread to the width of the container.',
            table: {
                defaultValue: { summary: 7 },
                type: { summary: 'number' }
            }
        },
        groups: {
            control: {
                type: 'object'
            },
            description: 'Array of group objects.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        hideOutline: {
            name: 'hide-outline',
            control: {
                type: 'boolean'
            },
            description: 'If present, the selected outline is hidden.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        tileWidth: {
            name: 'tile-width',
            control: {
                type: 'number',
                min: 0
            },
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
            description:
                'If present, the palette is read-only and cannot be edited by users.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        showCheckmark: {
            name: 'show-checkmark',
            control: {
                type: 'boolean'
            },
            description: 'If present, the selected checkmark is shown.',
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
            description:
                'If present, a spinner is displayed to indicate that data is loading.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Message displayed while the palette is in the loading state.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Loading...' }
            }
        },
        variant: {
            control: {
                type: 'radio'
            },
            options: ['grid', 'list'],
            description:
                'Changes the appearance of the palette. Valid values include grid and list.',
            table: {
                defaultValue: { summary: 'grid' },
                type: { summary: 'string' }
            }
        },
        value: {
            control: {
                type: 'text'
            },
            description: 'Specifies the value of an input element.',
            table: {
                type: { summary: 'string' }
            }
        }
    },
    args: {
        colors: [
            '#e3abec',
            '#c2dbf6',
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
            '#1b96ff',
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
        ],
        disabled: false,
        isLoading: false,
        loadingStateAlternativeText: 'Loading...',
        readOnly: false,
        tileHeight: 20,
        tileWidth: 20,
        variant: 'grid'
    }
};

const Template = (args) => ColorPalette(args);

export const Base = Template.bind({});

export const SmallTiles = Template.bind({});
SmallTiles.args = {
    tileWidth: 10,
    tileHeight: 10
};

export const LargeTiles = Template.bind({});
LargeTiles.args = {
    tileWidth: 30,
    tileHeight: 30
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true
};

export const List = Template.bind({});
List.args = {
    colors: tokens,
    variant: 'list'
};

export const ListWithGroups = Template.bind({});
ListWithGroups.args = {
    colors: tokens,
    variant: 'list',
    groups: [
        {
            name: 'background',
            label: 'Background'
        },
        {
            name: 'text',
            label: 'Text'
        },
        {
            name: 'border',
            label: 'Border'
        }
    ]
};

export const GridWithGroups = Template.bind({});
GridWithGroups.args = {
    colors,
    groups,
    columns: 6
};
