import { DualListbox } from '../__examples__/dualListbox';

export default {
    title: 'Example/Dual Listbox',
    argTypes: {
        addButtonIconName: {
            name: 'add-button-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The name of the icon to be used in the format 'utility:right'.",
            defaultValue: 'utility:right',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'utility:right' }
            }
        },
        addButtonLabel: {
            name: 'add-button-label',
            control: {
                type: 'text'
            },
            description: 'Label for add button.',
            table: {
                type: { summary: 'string' }
            }
        },
        buttonSize: {
            name: 'button-size',
            control: {
                type: 'select',
                options: ['xx-small', 'x-small', 'small', 'medium', 'large']
            },
            defaultValue: 'medium',
            description:
                'For the bare variant, valid values include x-small, small, medium, and large. For non-bare variants, valid values include xx-small, x-small, small, and medium.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        },
        buttonVariant: {
            name: 'button-variant',
            control: {
                type: 'select',
                options: [
                    'bare',
                    'container',
                    'brand',
                    'border',
                    'border-filled',
                    'bare-inverse',
                    'border-inverse'
                ]
            },
            defaultValue: 'border',
            description:
                'Use this variant for all button icons (add, up, down and remove). Valid values inlcude bare, container, brand, border, border-filled, bare-inverse and border-inverse.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'border' }
            }
        },
        disableReordering: {
            name: 'disable-reordering',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If present, the Up and Down buttons used for reordering are hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If present, the listbox is disabled and users cannot interact with it.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            }
        },
        downButtonIconName: {
            name: 'down-button-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The name of the icon to be used in the format 'utility:down'.",
            defaultValue: 'utility:down',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'utility:down' }
            }
        },
        downButtonLabel: {
            name: 'down-button-label',
            control: {
                type: 'text'
            },
            description: 'Label for down button.',
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
                'Help text detailing the purpose and function of the dual listbox.',
            table: {
                type: { summary: 'string' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If present, the source options listbox is in a loading state and shows a spinner.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            }
        },
        label: {
            type: { name: 'string', required: true },
            control: {
                type: 'text'
            },
            description: 'Label for the dual listbox.',
            table: {
                type: { summary: 'string' }
            }
        },
        max: {
            control: {
                type: 'number'
            },
            description:
                'Maximum number of options allowed in the selected options listbox.',
            table: {
                type: { summary: 'number' }
            }
        },
        min: {
            control: {
                type: 'number'
            },
            defaultValue: '0',
            description:
                'Minimum number of options required in the selected options listbox.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: '0' }
            }
        },
        messageWhenRangeOverflow: {
            name: 'message-when-range-overflow',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when a range overflow is detected.',
            table: {
                type: { summary: 'string' }
            }
        },
        messageWhenRangeUnderflow: {
            name: 'message-when-range-underflow',
            control: {
                type: 'text'
            },
            description:
                'Error message to be displayed when a range underflow is detected.',
            table: {
                type: { summary: 'string' }
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
        options: {
            type: { name: 'object', required: true },
            control: {
                type: 'object'
            },
            description:
                'A list of options that are available for selection. Each option has the following attributes: optionLabel, description, value, iconName, iconSrc, initials and variant.',
            table: {
                type: { summary: 'object []' }
            }
        },
        removeButtonIconName: {
            name: 'remove-button-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The name of the icon to be used in the format 'utility:left'.",
            defaultValue: 'utility:left',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'utility:left' }
            }
        },
        removeButtonLabel: {
            name: 'remove-button-label',
            control: {
                type: 'text'
            },
            description: 'Label for remove button.',
            table: {
                type: { summary: 'string' }
            }
        },
        required: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If present, the user must add an item to the selected listbox before submitting the form.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            }
        },
        requiredOptions: {
            control: {
                type: 'text'
            },
            description:
                'A list of required options that cannot be removed from selected options listbox. This list is populated with values from the options attribute.',
            table: {
                type: { summary: 'string []' }
            }
        },
        searchEngine: {
            name: 'search-engine',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If present, a search box is added to the first listbox.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            }
        },
        selectedLabel: {
            name: 'selected-label',
            type: { name: 'string', required: true },
            control: {
                type: 'text'
            },
            description: 'Label for the selected options listbox.',
            table: {
                type: { summary: 'string' }
            }
        },
        selectedPlaceholder: {
            name: 'selected-placeholder',
            control: {
                type: 'text'
            },
            description: 'Text displayed when no options are selected.',
            table: {
                type: { summary: 'string' }
            }
        },
        showActivityIndicator: {
            name: 'show-activity-indicator',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If present, a spinner is displayed in the first listbox to indicate loading activity.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
            }
        },
        size: {
            control: {
                type: 'number'
            },
            description:
                'Number of items that display in the listboxes before vertical scrollbars are displayed. Determines the vertical size of the listbox.',
            table: {
                type: { summary: 'number' }
            }
        },
        sourceLabel: {
            name: 'source-label',
            type: { name: 'string', required: true },
            control: {
                type: 'text'
            },
            description: 'Label for the source options listbox.',
            table: {
                type: { summary: 'string' }
            }
        },
        upButtonIconName: {
            name: 'up-button-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The name of the icon to be used in the format 'utility:up'.",
            defaultValue: 'utility:up',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'utility:up' }
            }
        },
        upButtonLabel: {
            name: 'up-button-label',
            control: {
                type: 'text'
            },
            description: 'Label for up button.',
            table: {
                type: { summary: 'string' }
            }
        },
        validity: {
            control: {
                type: 'text'
            },
            description:
                'Represents the validity states that an element can be in, with respect to constraint validation.',
            table: {
                type: { summary: 'string' }
            }
        },
        value: {
            control: {
                type: 'text'
            },
            description:
                'A list of default options that are included in the selected options listbox. This list is populated with values from the options attribute.',
            table: {
                type: { summary: 'string []' }
            }
        },
        variant: {
            control: {
                type: 'select',
                options: [
                    'standard',
                    'label-hidden',
                    'label-inline',
                    'label-stacked'
                ]
            },
            defaultValue: 'standard',
            description:
                'The variant changes the appearance of the dual listbox. Valid variants include standard, label-hidden, label-inline, and label-stacked. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and dual listbox. Use label-stacked to place the label above the dual listbox.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'standard' }
            }
        }
    }
};

const LanguagesOptions = [
    {
        value: 'fr',
        label: 'French'
    },
    {
        value: 'en',
        label: 'English'
    },
    {
        value: 'es',
        label: 'Spanish'
    },
    {
        value: 'de',
        label: 'German'
    },
    {
        value: 'it',
        label: 'Italian'
    },
    {
        value: 'ja',
        label: 'Japanese'
    },
    {
        value: 'hi',
        label: 'Hindi'
    },
    {
        value: 'md',
        label: 'Mandarin'
    }
];

const OptionsWithAvatar = [
    {
        value: '1',
        label: 'Jobs',
        iconName: 'custom:custom91'
    },
    {
        value: '2',
        label: 'Leads & Referrals',
        iconName: 'standard:lead'
    },
    {
        value: '3',
        label: 'Legal Entities',
        iconName: 'custom:custom87'
    },
    {
        value: '4',
        label: 'Contacts',
        iconName: 'standard:contact'
    },
    {
        value: '5',
        label: 'Cases',
        iconName: 'standard:case'
    },
    {
        value: '6',
        label: 'Accounts',
        iconName: 'standard:account'
    },
    {
        value: '7',
        label: 'Reports',
        iconName: 'standard:report'
    },
    {
        value: '8',
        label: 'Knowledge',
        iconName: 'standard:knowledge'
    },
    {
        value: '9',
        label: 'List Emails',
        iconName: 'standard:list_email'
    },
    {
        value: '10',
        label: 'Dashboards',
        iconName: 'standard:dashboard'
    }
];

const OptionsWithAvatarSrc = [
    {
        value: '1',
        label: 'Carl Smith',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
    },
    {
        value: '2',
        label: 'Suzan White',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
    },
    {
        value: '3',
        label: 'Philipp Johnson',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg'
    },
    {
        value: '4',
        label: 'Miles Williams',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
    },
    {
        value: '5',
        label: 'Jane Doe',
        iconName: 'standard:account',
        initials: 'JD'
    },
    {
        value: '6',
        label: 'Gina Garcia',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
    },
    {
        value: '7',
        label: 'John Smith',
        iconName: 'standard:address',
        initials: 'JS'
    },
    {
        value: '8',
        label: 'Xavier Anderson',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg'
    },
    {
        value: '9',
        label: 'James Jackson',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
    },
    {
        value: '10',
        label: 'Diane Wilson',
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
    }
];

const Options = [
    {
        value: '1',
        label: 'Option 1'
    },
    {
        value: '2',
        label: 'Option 2'
    },
    {
        value: '3',
        label: 'Option 3'
    },
    {
        value: '4',
        label: 'Option 4'
    },
    {
        value: '5',
        label: 'Option 5'
    },
    {
        value: '6',
        label: 'Option 6'
    },
    {
        value: '7',
        label: 'Option 7'
    },
    {
        value: '8',
        label: 'Option 8'
    },
    {
        value: '9',
        label: 'Option 9'
    },
    {
        value: '10',
        label: 'Option 10'
    }
];

const Template = (args) => DualListbox(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Select Options',
    fieldLevelHelp: 'This is a Dual Listbox',
    sourceLabel: 'Available Items',
    selectedLabel: 'Selected Items',
    addButtonLabel: 'Add Button Label',
    removeButtonLabel: 'Remove Button Label',
    downButtonLabel: 'Down Button Label',
    upButtonLabel: 'Up Button Label',
    options: Options,
    value: ['2', '3']
};

export const BaseDisabled = Template.bind({});
BaseDisabled.args = {
    label: 'Select Options',
    fieldLevelHelp: 'This is a Dual Listbox',
    disabled: true,
    sourceLabel: 'Available Items',
    selectedLabel: 'Selected Items',
    addButtonLabel: 'Add Button Label',
    removeButtonLabel: 'Remove Button Label',
    downButtonLabel: 'Down Button Label',
    upButtonLabel: 'Up Button Label',
    options: Options,
    value: ['2', '3']
};

export const BaseLoading = Template.bind({});
BaseLoading.args = {
    label: 'Select Options',
    fieldLevelHelp: 'This is a Dual Listbox',
    sourceLabel: 'Available Items',
    selectedLabel: 'Selected Items',
    addButtonLabel: 'Add Button Label',
    removeButtonLabel: 'Remove Button Label',
    downButtonLabel: 'Down Button Label',
    upButtonLabel: 'Up Button Label',
    showActivityIndicator: true,
    options: Options,
    value: ['2', '3']
};

export const BaseWithMaximumMinimum = Template.bind({});
BaseWithMaximumMinimum.args = {
    label: 'Select Options (at least 3 and at most 8)',
    fieldLevelHelp: 'This is a Dual Listbox',
    sourceLabel: 'Available Items',
    selectedLabel: 'Selected Items',
    addButtonLabel: 'Add Button Label',
    removeButtonLabel: 'Remove Button Label',
    downButtonLabel: 'Down Button Label',
    upButtonLabel: 'Up Button Label',
    required: true,
    max: '8',
    min: '3',
    options: Options,
    requiredOptions: ['1'],
    value: ['2', '3']
};

export const BaseWithAvatar = Template.bind({});
BaseWithAvatar.args = {
    label: 'Select Items',
    fieldLevelHelp: 'This is a Dual Listbox',
    sourceLabel: 'Available Items',
    selectedLabel: 'Selected Items',
    addButtonLabel: 'Add Button Label',
    removeButtonLabel: 'Remove Button Label',
    downButtonLabel: 'Down Button Label',
    upButtonLabel: 'Up Button Label',
    options: OptionsWithAvatar,
    required: true,
    requiredOptions: ['1'],
    value: ['2', '3']
};

export const BaseWithAvatarReorderingDisabled = Template.bind({});
BaseWithAvatarReorderingDisabled.args = {
    label: 'Select Items',
    disableReordering: true,
    fieldLevelHelp: 'This is a Dual Listbox',
    sourceLabel: 'Available Items',
    selectedLabel: 'Selected Items',
    addButtonLabel: 'Add Button Label',
    removeButtonLabel: 'Remove Button Label',
    downButtonLabel: 'Down Button Label',
    upButtonLabel: 'Up Button Label',
    options: OptionsWithAvatar,
    required: true,
    requiredOptions: ['1'],
    value: ['2', '3']
};

export const BaseWithAvatarLabelHidden = Template.bind({});
BaseWithAvatarLabelHidden.args = {
    label: 'Select Items',
    sourceLabel: 'Available Items',
    selectedLabel: 'Selected Items',
    addButtonLabel: 'Add Button Label',
    removeButtonLabel: 'Remove Button Label',
    downButtonLabel: 'Down Button Label',
    upButtonLabel: 'Up Button Label',
    options: OptionsWithAvatar,
    required: true,
    requiredOptions: ['1'],
    value: ['2', '3'],
    variant: 'label-hidden'
};

export const BaseWithAvatarSize10 = Template.bind({});
BaseWithAvatarSize10.args = {
    label: 'Select Items',
    sourceLabel: 'Available Items',
    selectedLabel: 'Selected Items',
    addButtonLabel: 'Add Button Label',
    removeButtonLabel: 'Remove Button Label',
    downButtonLabel: 'Down Button Label',
    upButtonLabel: 'Up Button Label',
    options: OptionsWithAvatar,
    required: true,
    requiredOptions: ['1'],
    size: '10',
    value: ['2', '3']
};

export const BaseWithAvatarSrcSize6 = Template.bind({});
BaseWithAvatarSrcSize6.args = {
    label: 'Invitations',
    sourceLabel: 'Available',
    selectedLabel: 'Invited',
    addButtonLabel: 'Add Button Label',
    removeButtonLabel: 'Remove Button Label',
    downButtonLabel: 'Down Button Label',
    upButtonLabel: 'Up Button Label',
    options: OptionsWithAvatarSrc,
    requiredOptions: ['1'],
    size: '6',
    value: ['2', '3']
};

export const Languages = Template.bind({});
Languages.args = {
    label: 'Languages',
    fieldLevelHelp: 'Required',
    sourceLabel: 'Available',
    selectedLabel: 'Selected',
    addButtonLabel: 'Add Button Label',
    removeButtonLabel: 'Remove Button Label',
    downButtonLabel: 'Down Button Label',
    upButtonLabel: 'Up Button Label',
    options: LanguagesOptions,
    required: true,
    value: ['en', 'fr']
};

export const LanguagesWithSearchEngine = Template.bind({});
LanguagesWithSearchEngine.args = {
    label: 'Languages',
    sourceLabel: 'Available',
    selectedLabel: 'Selected',
    addButtonLabel: 'Add Button Label',
    removeButtonLabel: 'Remove Button Label',
    downButtonLabel: 'Down Button Label',
    upButtonLabel: 'Up Button Label',
    options: LanguagesOptions,
    searchEngine: true,
    value: ['en', 'fr']
};

export const LanguagesInline = Template.bind({});
LanguagesInline.args = {
    label: 'Languages',
    fieldLevelHelp: 'Choose a language',
    sourceLabel: 'Available',
    selectedLabel: 'Selected',
    addButtonLabel: 'Add Button Label',
    removeButtonLabel: 'Remove Button Label',
    downButtonLabel: 'Down Button Label',
    upButtonLabel: 'Up Button Label',
    options: LanguagesOptions,
    variant: 'label-inline',
    value: ['en', 'fr']
};
