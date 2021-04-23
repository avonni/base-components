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
                type: 'select'
            },
            options: [
                'standard',
                'label-inline',
                'label-hidden',
                'label-stacked'
            ],
            defaultValue: 'standard',
            table: {
                defaultValue: { summary: 'standard' }
            }
        },
        type: {
            control: {
                type: 'select'
            },
            options: ['base', 'custom', 'predefined'],
            defaultValue: 'base',
            table: {
                defaultValue: { summary: 'base' }
            }
        },
        menuVariant: {
            control: {
                type: 'select'
            },
            options: [
                'bare',
                'container',
                'border',
                'border-filled',
                'bare-inverse',
                'border-inverse'
            ],
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
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            defaultValue: 'x-small',
            table: {
                defaultValue: { summary: 'x-small' }
            }
        },
        menuAlignment: {
            control: {
                type: 'select'
            },
            options: [
                'auto',
                'left',
                'center',
                'right',
                'bottom-left',
                'bottom-center',
                'bottom-right'
            ],
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
        },
        menuNubbin: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        hideColorInput: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        },
        opacity: {
            control: {
                type: 'boolean'
            },
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' }
            }
        }
    },
    args: {
        disabled: false,
        readOnly: false,
        isLoading: false,
        menuNubbin: false,
        hideColorInput: false,
        opacity: false
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

export const Standard = Template.bind({});
Standard.args = {
    label: 'Color label',
    fieldLevelHelp: 'Help text',
    value: '#419fec',
    messageWhenBadInput: 'Please ensure value is correct',
    colorsValue: colorsValue
};

export const StandardWithIcon = Template.bind({});
StandardWithIcon.args = {
    label: 'Color label',
    fieldLevelHelp: 'Help text',
    value: '#419fec',
    messageWhenBadInput: 'Please ensure value is correct',
    menuIconName: 'utility:down',
    menuLabel: 'Pick a color',
    colorsValue: colorsValue
};

export const StandardWithIconWithoutColorInput = Template.bind({});
StandardWithIconWithoutColorInput.args = {
    label: 'Color label',
    fieldLevelHelp: 'Help text',
    value: '#419fec',
    messageWhenBadInput: 'Please ensure value is correct',
    menuIconName: 'utility:down',
    menuLabel: 'Pick a color',
    hideColorInput: 'true',
    colorsValue: colorsValue
};

export const LabelInlineWithMenuVariantContainer = Template.bind({});
LabelInlineWithMenuVariantContainer.args = {
    label: 'Color label',
    fieldLevelHelp: 'Help text',
    value: '#0a2399',
    messageWhenBadInput: 'Please ensure value is correct',
    variant: 'label-inline',
    menuVariant: 'container',
    colorsValue: colorsValue
};

export const LabelInlineWithoutColorInput = Template.bind({});
LabelInlineWithoutColorInput.args = {
    label: 'Color label',
    fieldLevelHelp: 'Help text',
    value: '#096a50',
    messageWhenBadInput: 'Please ensure value is correct',
    variant: 'label-inline',
    menuVariant: 'container',
    hideColorInput: 'true',
    colorsValue: colorsValue
};

export const LabelHiddenWithoutHelpMessage = Template.bind({});
LabelHiddenWithoutHelpMessage.args = {
    label: 'Color label',
    messageWhenBadInput: 'Please ensure value is correct',
    value: '#ffb758',
    variant: 'label-hidden',
    hideColorInput: 'true',
    menuVariant: 'bare-inverse',
    colorsValue: colorsValue
};

export const LabelHiddenWithoutHelpMessageBorderInverse = Template.bind({});
LabelHiddenWithoutHelpMessageBorderInverse.args = {
    label: 'Color label',
    messageWhenBadInput: 'Please ensure value is correct',
    value: '#3be281',
    variant: 'label-hidden',
    hideColorInput: 'true',
    menuVariant: 'border-inverse',
    colorsValue: colorsValue
};

export const LabelHiddenWithMenuLabel = Template.bind({});
LabelHiddenWithMenuLabel.args = {
    label: 'Color label',
    messageWhenBadInput: 'Please ensure value is correct',
    value: '#d073df',
    variant: 'label-hidden',
    hideColorInput: 'true',
    menuVariant: 'border-inverse',
    menuLabel: 'Pick a color',
    colorsValue: colorsValue
};

export const Xx_smallIconWithColorInput = Template.bind({});
Xx_smallIconWithColorInput.args = {
    label: 'Color label',
    fieldLevelHelp: 'Help text',
    value: '#419fec',
    messageWhenBadInput: 'Please ensure value is correct',
    menuIconName: 'utility:down',
    menuIconSize: 'xx-small',
    colorsValue: colorsValue
};

export const X_smallIconWithColorInput = Template.bind({});
X_smallIconWithColorInput.args = {
    label: 'Color label',
    fieldLevelHelp: 'Help text',
    value: '#419fec',
    messageWhenBadInput: 'Please ensure value is correct',
    menuIconName: 'utility:down',
    menuIconSize: 'x-small',
    colorsValue: colorsValue
};

export const SmallIconWithColorInput = Template.bind({});
SmallIconWithColorInput.args = {
    label: 'Color label',
    fieldLevelHelp: 'Help text',
    value: '#419fec',
    messageWhenBadInput: 'Please ensure value is correct',
    menuIconName: 'utility:down',
    menuIconSize: 'small',
    colorsValue: colorsValue
};

export const MediumIconWithColorInput = Template.bind({});
MediumIconWithColorInput.args = {
    label: 'Color label',
    fieldLevelHelp: 'Help text',
    value: '#419fec',
    messageWhenBadInput: 'Please ensure value is correct',
    menuIconName: 'utility:down',
    menuIconSize: 'medium',
    colorsValue: colorsValue
};

export const LargeIconWithColorInput = Template.bind({});
LargeIconWithColorInput.args = {
    label: 'Color label',
    fieldLevelHelp: 'Help text',
    value: '#419fec',
    messageWhenBadInput: 'Please ensure value is correct',
    menuIconName: 'utility:down',
    menuIconSize: 'large',
    colorsValue: colorsValue
};
