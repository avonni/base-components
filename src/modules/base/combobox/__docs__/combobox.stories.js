import { Combobox } from '../__examples__/combobox';

export default {
    title: 'Example/Combobox',
    argTypes: {
        actions: {
            control: {
                type: 'object'
            },
            description:
                'Array of action objects. The actions are displayed at the end of the combobox options.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        allowSearch: {
            name: 'allow-search',
            control: {
                type: 'boolean'
            },
            description: 'If present, the combobox options are searchable.',
            defaultValue: false,
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
                'If present, the combobox is disabled and users cannot interact with it.',
            defaultValue: false,
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        dropdownAlignment: {
            name: 'dropdown-alignment',
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
            description:
                'Specifies where the drop-down list is aligned with or anchored to the selection field. Valid values include auto, left, center, right, bottom-left, bottom-center and bottom-right.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' }
            }
        },
        fieldLevelHelp: {
            name: 'field-level-help',
            control: {
                type: 'text'
            },
            description:
                'Help text detailing the purpose and function of the combobox.',
            table: {
                type: { summary: 'string' }
            }
        },
        groups: {
            control: {
                type: 'object'
            },
            description:
                'Array of group objects. The groups are used to separate the options inside the drop-down.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        hideSelectedOptions: {
            name: 'hide-selected-options',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If present, the selected options pills will be hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If true, the drop-down menu is in a loading state and shows a spinner.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        isMultiSelect: {
            name: 'is-multi-select',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If present, multiple options can be selected.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description: 'Text label for the combobox.',
            table: {
                type: { summary: 'string' }
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            defaultValue: 'Loading',
            description:
                'Message displayed while the combobox is in the loading state.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Loading' }
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
        multiLevelGroups: {
            name: 'multi-level-groups',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If present, groups can contain other groups. Each group added to an option will create a level of depth. \nIf false, there will be only one level of groups. If an option belongs to several groups, the option will be repeated in each group.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        name: {
            control: {
                type: 'text'
            },
            description: 'Specifies the name of the combobox.',
            table: {
                type: { summary: 'string' }
            }
        },
        options: {
            control: {
                type: 'object'
            },
            description: 'Array of option objects.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        placeholder: {
            control: {
                type: 'text'
            },
            description:
                'Text that is displayed before an option is selected, to prompt the user to select an option. The default value varies depending on the value of allow-search.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '"Select an Option" or "Search…"' }
            }
        },
        readOnly: {
            name: 'read-only',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If present, the combobox is read-only. A read-only combobox is also disabled.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        removeSelectedOptions: {
            name: 'remove-selected-options',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If present, the selected options will be removed from the options.\nIf false, a checkmark will be displayed next to the selected options.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        required: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If present, a value must be selected before the form can be submitted.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        scopes: {
            control: {
                type: 'object'
            },
            description:
                'Array of scope objects. The scopes are displayed in a drop-down menu, to the left of the combobox input.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        scopesTitle: {
            name: 'scopes-title',
            control: {
                type: 'text'
            },
            description: 'Title of the scopes drop-down menu.',
            table: {
                type: { summary: 'string' }
            }
        },
        search: {
            description:
                'Custom search function to execute instead of the default search. It has to: 1- Take an object with two keys as an argument: options and searchTerm. 2- Return the new options.',
            table: {
                type: { summary: 'function' }
            }
        },
        validity: {
            description:
                'Represents the validity states that an element can be in, with respect to constraint validation.',
            table: {
                type: { summary: 'string' }
            }
        },
        value: {
            control: {
                type: 'object'
            },
            description: 'Array of selected options value.',
            table: {
                type: { summary: 'string[]' }
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
            description:
                'The variant changes the appearance of the combobox. Accepted variants include standard, label-hidden, label-inline, and label-stacked. This value defaults to standard. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and combobox. Use label-stacked to place the label above the combobox.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'standard' }
            }
        }
    }
};

const options = [
    {
        label: 'Burlington Textiles Corp of America',
        value: 'burlington'
    },
    {
        label: 'Dickenson plc',
        value: 'dickenson'
    },
    {
        label: 'United Oil SLA',
        value: 'oil-sla'
    },
    {
        label: 'United Oil Standby Generators',
        value: 'united-oil'
    },
    {
        label: 'Edge Communication',
        value: 'edge'
    }
];

const optionsWithAvatars = [
    {
        label: 'Burlington Textiles Corp of America',
        value: 'burlington',
        avatarFallbackIconName: 'standard:account',
        secondaryText: 'Account - Burlington, NC'
    },
    {
        label: 'Dickenson plc',
        value: 'dickenson',
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        avatarFallbackIconName: 'standard:account',
        secondaryText: 'Account - Lawrence, KS'
    },
    {
        label: 'Edge Communication',
        value: 'edge',
        avatarFallbackIconName: 'standard:account',
        secondaryText: 'Account - Singapore'
    },
    {
        label: 'United Oil SLA',
        value: 'oil-sla',
        avatarFallbackIconName: 'standard:opportunity',
        secondaryText: 'Opportunity - Closed Won'
    },
    {
        label: 'United Oil Standby Generators',
        value: 'united-oil',
        avatarFallbackIconName: 'standard:opportunity',
        secondaryText: 'Opportunity - Closed Won'
    }
];

const actions = [
    {
        label: 'New Account',
        name: 'new-account',
        iconName: 'utility:add',
        position: 'bottom'
    },
    {
        label: 'New Opportunity',
        name: 'new-opportunity',
        iconName: 'utility:add',
        position: 'bottom'
    },
    {
        label: 'United',
        name: 'search-united',
        iconName: 'utility:search'
    }
];

const scopes = [
    {
        label: 'All',
        name: 'all'
    },
    {
        label: 'Accounts',
        name: 'accounts'
    },
    {
        label: 'Analytics',
        name: 'analytics'
    }
];

const scopesWithIcons = [
    {
        label: 'Apex',
        name: 'apex',
        iconName: 'utility:apex'
    },
    {
        label: 'Decisions',
        name: 'decisions',
        iconName: 'utility:signpost'
    },
    {
        label: 'Rules',
        name: 'rules',
        iconName: 'utility:rules'
    },
    {
        label: 'Snippets',
        name: 'snippets',
        iconName: 'utility:snippet'
    }
];

const search = (props) => {
    const optionsArray = props.options;
    const searchTerm = props.searchTerm;
    return optionsArray.filter((option) => {
        return option.secondaryText
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
    });
};

const Template = (args) => Combobox(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Simple combobox',
    options: options,
    scopes: scopes
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Disabled combobox',
    options: options,
    disabled: true
};

export const Loading = Template.bind({});
Loading.args = {
    label: 'Loading combobox',
    options: options,
    isLoading: true
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
    label: 'Multi-select combobox',
    options: options,
    isMultiSelect: true,
    required: true
};

export const Lookup = Template.bind({});
Lookup.args = {
    label: 'Multi-select lookup',
    options: optionsWithAvatars,
    value: ['burlington', 'edge'],
    isMultiSelect: true,
    removeSelectedOptions: true,
    actions: actions,
    allowSearch: true
};

export const Scopes = Template.bind({});
Scopes.args = {
    label: 'Combobox with scopes',
    options: options,
    scopes: scopes,
    scopesTitle: 'Suggested for you'
};

export const ScopesWithIcons = Template.bind({});
ScopesWithIcons.args = {
    label: 'Combobox with scopes',
    allowSearch: true,
    options: optionsWithAvatars,
    scopes: scopesWithIcons
};

export const CustomSearch = Template.bind({});
CustomSearch.args = {
    label: 'Custom search in secondary text',
    allowSearch: true,
    options: optionsWithAvatars,
    search: search
};
