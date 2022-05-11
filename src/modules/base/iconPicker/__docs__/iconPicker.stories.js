import { IconPicker } from '../__examples__/iconPicker';

export default {
    title: 'Example/Icon Picker',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            description: 'Text label for the input.',
            table: {
                type: { summary: 'string' }
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
        value: {
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' }
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
                defaultValue: { summary: 'Please ensure the value is correct.' }
            }
        },
        placeholder: {
            name: 'placeholder',
            control: {
                type: 'text'
            },
            description: 'Message to be displayed when input field is empty.',
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
        },
        menuVariant: {
            name: 'menu-variant',
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
            description:
                'The variant changes the look of the button. Accepted variants include bare, container, border, border-filled, bare-inverse, and border-inverse. This value defaults to border.',
            table: {
                defaultValue: { summary: 'border' },
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
        menuIconSize: {
            name: 'menu-icon-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            description:
                'The size of the icon. Options include xx-small, x-small, small, medium, or large.',
            table: {
                defaultValue: { summary: 'medium' },
                type: { summary: 'string' },
                category: 'menu'
            }
        },
        hiddenCategories: {
            name: 'hidden-categories',
            control: {
                type: 'object'
            },
            description:
                'The Salesforce icon categories that will be hidden by default.',
            table: {
                type: { summary: 'string[]' }
            }
        },
        hideFooter: {
            name: 'hidden-categories',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the popover footer is hidden. The icons are selected on click.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
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
                'If present, the input field is read-only and cannot be edited by users.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        required: {
            name: 'required',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input field must be filled out before the form is submitted.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        hideInputText: {
            name: 'hide-input-text',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the input text next to the icon button is hidden.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        disabled: false,
        hideFooter: false,
        hideInputText: false,
        menuIconSize: 'medium',
        menuVariant: 'border',
        messageWhenBadInput: 'Please ensure the value is correct.',
        readOnly: false,
        required: false,
        variant: 'standard'
    }
};

const Template = (args) => IconPicker(args);

export const Standard = Template.bind({});
Standard.args = {
    label: 'Icon label'
};

export const HiddenFooter = Template.bind({});
HiddenFooter.args = {
    label: 'Hidden footer',
    hideFooter: true
};

export const StandardWithOneTab = Template.bind({});
StandardWithOneTab.args = {
    label: 'Icon label',
    fieldLevelHelp: 'Help text',
    value: 'standard:account',
    hiddenCategories: ['Custom', 'Utility', 'Doctype', 'Action'],
    placeholder: 'Type icon name'
};

export const StandardRequired = Template.bind({});
StandardRequired.args = {
    label: 'Icon label',
    fieldLevelHelp: 'Help text',
    required: true,
    value: 'standard:account',
    placeholder: 'Type icon name'
};

export const StandardReadOnly = Template.bind({});
StandardReadOnly.args = {
    label: 'Icon label',
    fieldLevelHelp: 'Help text',
    readOnly: true,
    value: 'standard:account',
    placeholder: 'Type icon name'
};

export const StandardDisabled = Template.bind({});
StandardDisabled.args = {
    label: 'Icon label',
    fieldLevelHelp: 'Help text',
    disabled: true,
    value: 'standard:account',
    placeholder: 'Type icon name'
};

export const StandardWithMenuLabel = Template.bind({});
StandardWithMenuLabel.args = {
    label: 'Icon label',
    menuLabel: 'Menu',
    fieldLevelHelp: 'Help text',
    value: 'standard:account',
    placeholder: 'Type icon name'
};

export const StandardWithoutInputText = Template.bind({});
StandardWithoutInputText.args = {
    label: 'Icon label',
    fieldLevelHelp: 'Help text',
    value: 'standard:account',
    placeholder: 'Type icon name',
    hideInputText: true
};

export const LabelInlineWithMenuVariantContainer = Template.bind({});
LabelInlineWithMenuVariantContainer.args = {
    label: 'Icon label',
    fieldLevelHelp: 'Help text',
    value: 'standard:account',
    variant: 'label-inline',
    menuVariant: 'container',
    placeholder: 'Type icon name'
};

export const LabelInlineWithoutInputText = Template.bind({});
LabelInlineWithoutInputText.args = {
    label: 'Icon label',
    fieldLevelHelp: 'Help text',
    value: 'standard:account',
    variant: 'label-inline',
    hideInputText: true
};

export const LabelHiddenWithoutHelpMessageBorderInverse = Template.bind({});
LabelHiddenWithoutHelpMessageBorderInverse.args = {
    label: 'Icon label',
    value: 'standard:account',
    variant: 'label-hidden',
    menuVariant: 'border-inverse',
    hideInputText: true
};

export const StandardWithXXSmallMenuIconSize = Template.bind({});
StandardWithXXSmallMenuIconSize.args = {
    label: 'Icon label',
    fieldLevelHelp: 'Help text',
    value: 'standard:account',
    menuIconSize: 'xx-small',
    placeholder: 'Type icon name'
};

export const StandardWithXSmallMenuIconSize = Template.bind({});
StandardWithXSmallMenuIconSize.args = {
    label: 'Icon label',
    fieldLevelHelp: 'Help text',
    value: 'standard:account',
    menuIconSize: 'x-small',
    placeholder: 'Type icon name'
};

export const StandardWithSmallMenuIconSize = Template.bind({});
StandardWithSmallMenuIconSize.args = {
    label: 'Icon label',
    fieldLevelHelp: 'Help text',
    value: 'standard:account',
    menuIconSize: 'small',
    placeholder: 'Type icon name'
};

export const StandardWithLargeMenuIconSize = Template.bind({});
StandardWithLargeMenuIconSize.args = {
    label: 'Icon label',
    fieldLevelHelp: 'Help text',
    value: 'standard:account',
    menuIconSize: 'large',
    placeholder: 'Type icon name'
};

export const StandardActionIcon = Template.bind({});
StandardActionIcon.args = {
    label: 'Icon label',
    fieldLevelHelp: 'Help text',
    value: 'action:add_file',
    menuIconSize: 'large',
    placeholder: 'Type icon name'
};
