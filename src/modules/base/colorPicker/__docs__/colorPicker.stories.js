import { ColorPicker } from '../__examples__/colorPicker';
import { colors, groups, tokens, tokenGroups } from './data';

export default {
    title: 'Example/Color Picker',
    argTypes: {
        accessKey: {
            name: 'access-key',
            control: {
                type: 'text'
            },
            description:
                'Specifies a shortcut key to activate or focus an element.',
            table: {
                type: { summary: 'string' }
            }
        },
        cancelButtonLabel: {
            name: 'cancel-button-label',
            control: {
                type: 'text'
            },
            description: 'The label for the cancel button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Cancel' }
            }
        },
        colors: {
            control: {
                type: 'object'
            },
            description: 'Color values displayed in the default palette.',
            table: {
                type: { summary: 'string[]' }
            }
        },
        columns: {
            control: {
                type: 'number'
            },
            description: 'Number of columns in the palette.',
            table: {
                type: { summary: 'number' }
            }
        },
        customTabLabel: {
            name: 'custom-tab-label',
            control: {
                type: 'text'
            },
            description: 'The label for the custom tab.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Custom' },
                category: 'Tabs'
            }
        },
        defaultTabLabel: {
            name: 'default-tab-label',
            control: {
                type: 'text'
            },
            description: 'The label for the default tab.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Default' },
                category: 'Tabs'
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
                type: { summary: 'boolean' },
                category: 'Validation'
            }
        },
        doneButtonLabel: {
            name: 'done-button-label',
            control: {
                type: 'text'
            },
            description: 'The label for the done button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Done' }
            }
        },
        fieldLevelHelp: {
            name: 'field-level-help',
            control: {
                type: 'text'
            },
            description:
                "Help text detailing the purpose and function of the input. This attribute isn't supported for file, radio, toggle, and checkbox-button types.",
            table: {
                type: { summary: 'string' }
            }
        },
        groups: {
            control: {
                type: 'object'
            },
            description:
                'Array of group objects. Groups can be used by the tokens and the predefined palette.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        hideClearIcon: {
            name: 'hide-clear-icon',
            control: {
                type: 'boolean'
            },
            description:
                'If present, it is not possible to clear a selected color using the input clear icon.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        hideColorInput: {
            name: 'hide-color-input',
            control: {
                type: 'boolean'
            },
            description: 'If true, hide the input color value.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        inline: {
            name: 'inline',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the popover is deactivated and its content is directly shown on the page.',
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
        label: {
            control: {
                type: 'text'
            },
            description: 'Text label for the input.',
            table: {
                type: { summary: 'string' }
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Message displayed while the color picker is in the loading state.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Loading...' }
            }
        },
        menuAlignment: {
            name: 'menu-alignment',
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
            description:
                'Determines the alignment of the menu relative to the button. Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right. The auto option aligns the dropdown menu based on available space. ',
            table: {
                defaultValue: { summary: 'left' },
                type: { summary: 'string' },
                category: 'menu'
            }
        },
        menuIconName: {
            name: 'menu-icon-name',
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' },
                category: 'menu'
            }
        },
        menuIconSize: {
            name: 'menu-icon-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            description:
                'The size of the icon. Options include xx-small, x-small, small, medium, or large.',
            table: {
                defaultValue: { summary: 'x-small' },
                type: { summary: 'string' },
                category: 'menu'
            }
        },
        menuLabel: {
            name: 'menu-label',
            control: {
                type: 'text'
            },
            description: 'Optional text to be shown on the button.',
            table: {
                type: { summary: 'string' },
                category: 'menu'
            }
        },
        menuNubbin: {
            name: 'menu-nubbin',
            control: {
                type: 'boolean'
            },
            description:
                'If present, a nubbin is present on the menu. A nubbin is a stub that protrudes from the menu item towards the button menu. The nubbin position is based on the menu-alignment.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'menu'
            }
        },
        menuVariant: {
            name: 'menu-variant',
            control: {
                type: 'select'
            },
            options: [
                'bare',
                'bare-inverse',
                'border',
                'border-filled',
                'border-inverse',
                'container',
                'neutral'
            ],
            description:
                'The variant changes the look of the button. Accepted variants include bare, bare-inverse, border, border-filled,border-inverse and container.',
            table: {
                defaultValue: { summary: 'border' },
                type: { summary: 'string' },
                category: 'menu'
            }
        },
        messageWhenBadInput: {
            name: 'message-when-bad-input',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when a bad input is detected.',
            table: {
                type: { summary: 'string' },
                category: 'Validation'
            }
        },
        messageWhenValueMissing: {
            name: 'message-when-value-missing',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when the value is missing and input is required.',
            table: {
                type: { summary: 'string' },
                category: 'Validation'
            }
        },
        name: {
            control: {
                type: 'text'
            },
            description: 'Specifies the name of an input element.',
            table: {
                type: { summary: 'string' }
            }
        },
        opacity: {
            control: {
                type: 'boolean'
            },
            description: 'Defines whether the alpha slider will be displayed.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        paletteHideOutline: {
            name: 'palette-hide-outline',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the selected palette swatch outline is hidden.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        paletteShowCheckmark: {
            name: 'palette-show-checkmark',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the selected palette swatch shows a checkmark.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        paletteTileHeight: {
            name: 'palette-tile-height',
            control: {
                type: 'number'
            },
            description: 'Specifies the palette swatches tile height.',
            table: {
                type: { summary: 'number' }
            }
        },
        paletteTileWidth: {
            name: 'palette-tile-width',
            control: {
                type: 'number'
            },
            description: 'Specifies the palette swatches tile width.',
            table: {
                type: { summary: 'number' }
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
                type: { summary: 'boolean' },
                category: 'Validation'
            }
        },
        required: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input field must be filled out before the form is submitted.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' },
                category: 'Validation'
            }
        },
        requiredAlternativeText: {
            name: 'required-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'The assistive text when the required attribute is set to true.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'required' }
            }
        },
        tokens: {
            control: {
                type: 'object'
            },
            description:
                'Array of token objects. If present, a token tab will be added in the menu.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        tokensTabLabel: {
            name: 'tokens-tab-label',
            control: {
                type: 'text'
            },
            description: 'The label for the tokens tab.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Tokens' },
                category: 'Tabs'
            }
        },
        type: {
            control: {
                type: 'select'
            },
            options: ['base', 'custom', 'predefined', 'tokens'],
            description:
                'Type of the color picker. The base type uses tabs for all the other types.Valid values include base, custom, predefined and tokens.',
            table: {
                defaultValue: { summary: 'base' },
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
            description:
                'The variant changes the appearance of an input field. Accepted variants include standard, label-inline, label-hidden, and label-stacked. This value defaults to standard, which displays the label above the field. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and input field. Use label-stacked to place the label above the input field.',
            table: {
                defaultValue: { summary: 'standard' },
                type: { summary: 'string' }
            }
        }
    },
    args: {
        cancelButtonLabel: 'Cancel',
        customTabLabel: 'Custom',
        defaultTabLabel: 'Default',
        disabled: false,
        doneButtonLabel: 'Done',
        hideClearIcon: false,
        hideColorInput: false,
        inline: false,
        isLoading: false,
        loadingStateAlternativeText: 'Loading...',
        menuAlignment: 'left',
        menuIconSize: 'x-small',
        menuNubbin: false,
        menuVariant: 'border',
        opacity: false,
        paletteHideOutline: false,
        paletteShowCheckmark: false,
        readOnly: false,
        required: false,
        requiredAlternativeText: 'required',
        tokensTabLabel: 'Tokens',
        type: 'base',
        variant: 'standard'
    }
};

const Template = (args) => ColorPicker(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Base Color Picker'
};

export const Tokens = Template.bind({});
Tokens.args = {
    label: 'Base Color Picker With Tokens',
    fieldLevelHelp: 'The tokens need to be defined for the tab to appear.',
    value: '--lwc-colorTextActionLabel',
    tokens
};

export const Groups = Template.bind({});
Groups.args = {
    label: 'Color label',
    tokens,
    groups: groups.concat(tokenGroups),
    columns: 6,
    colors
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Color label',
    fieldLevelHelp: 'Read only',
    value: '#419fec',
    readOnly: true
};

export const Menu = Template.bind({});
Menu.args = {
    label: 'Color label',
    fieldLevelHelp: 'A menu icon name and a menu label have been set.',
    menuIconName: 'utility:down',
    menuLabel: 'Pick a color',
    value: '#419fec'
};

export const MenuNoInput = Template.bind({});
MenuNoInput.args = {
    label: 'Color label',
    fieldLevelHelp:
        'A menu icon name and a menu label have been set. The color input is hidden.',
    value: '#419fec',
    menuIconName: 'utility:down',
    menuLabel: 'Pick a color',
    hideColorInput: true
};

export const Inline = Template.bind({});
Inline.args = {
    inline: true,
    tokens,
    variant: 'label-hidden'
};

export const LabelInline = Template.bind({});
LabelInline.args = {
    label: 'Color label',
    fieldLevelHelp: 'The variant is "label-inline".',
    value: '#0a2399',
    variant: 'label-inline',
    menuVariant: 'container'
};

export const LabelInlineNoInput = Template.bind({});
LabelInlineNoInput.args = {
    label: 'Color label',
    fieldLevelHelp:
        'The variant is "label-inline" and the color input is hidden.',
    value: '#096a50',
    variant: 'label-inline',
    menuVariant: 'container',
    hideColorInput: true
};

export const LabelHiddenBorderInverseMenu = Template.bind({});
LabelHiddenBorderInverseMenu.args = {
    label: 'Color label',
    value: '#d073df',
    variant: 'label-hidden',
    hideColorInput: true,
    menuVariant: 'border-inverse',
    menuLabel: 'Pick a color'
};

export const xxSmallMenuIcon = Template.bind({});
xxSmallMenuIcon.args = {
    label: 'Color label',
    value: '#419fec',
    menuIconName: 'utility:down',
    menuIconSize: 'xx-small'
};

export const mediumMenuIcon = Template.bind({});
mediumMenuIcon.args = {
    label: 'Color label',
    value: '#419fec',
    menuIconName: 'utility:down',
    menuIconSize: 'medium'
};
