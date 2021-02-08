import { ColorPicker } from '../__examples__/colorPicker';

export default {
    title: 'Example/Color Picker',
    argTypes: {
        label: {
            control: {
                type: 'text'
            }
        },
        fieldLevelHelp: {
            control: {
                type: 'text'
            }
        },
        value: {
            control: {
                type: 'text'
            }
        },
        messageWhenBadInput: {
            control: {
                type: 'text'
            }
        },
        variant: {
            control: {
                type: 'select',
                options: ['standard', 'label-inline', 'label-hidden', 'label-stacked']
            },
            defaultValue: 'standard',
            table: {
                defaultValue: { summary: 'standard' }
            }
        },
        type: {
            control: {
                type: 'select',
                options: ['base', 'custom', 'predefined']
            },
            defaultValue: 'base',
            table: {
                defaultValue: { summary: 'base' }
            }
        },
        menuVariant: {
            control: {
                type: 'select',
                options: ['bare', 'container', 'border', 'border-filled', 'bare-inverse', 'border-inverse']
            },
            defaultValue: 'border',
            table: {
                defaultValue: { summary: 'border' }
            }
        },
        menuIconName: {
            control: {
                type: 'text'
            }
        },
        menuLabel: {
            control: {
                type: 'text'
            }
        },
        menuIconSize: {
            control: {
                type: 'select',
                options: ['xx-small', 'x-small', 'small', 'medium', 'large']
            },
            defaultValue: 'x-small',
            table: {
                defaultValue: { summary: 'x-small' }
            }
        },
        menuAlignment: {
            control: {
                type: 'select',
                options: ['auto', 'left', 'center', 'right', 'bottom-left', 'bottom-center', 'bottom-right']
            },
            defaultValue: 'left',
            table: {
                defaultValue: { summary: 'left' }
            }
        },
        colorsValue: {
            control: {
                type: 'object'
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            }
        },
        readOnly: {
            control: {
                type: 'boolean'
            }
        },
        isLoading: {
            control: {
                type: 'boolean'
            }
        },
        menuNubbin: {
            control: {
                type: 'boolean'
            }
        },
        hideColorInput: {
            control: {
                type: 'boolean'
            }
        },
        opacity: {
            control: {
                type: 'boolean'
            }
        }
    }
};

const colorsValue = [
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

const Template = (args) => ColorPicker(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Color label',
    fieldLevelHelp: 'Help text',
    value: '#419fec',
    messageWhenBadInput: 'bad input',
    colorsValue: colorsValue
};
