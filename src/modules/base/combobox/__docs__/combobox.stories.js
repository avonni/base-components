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

import { Combobox } from '../__examples__/combobox';
import {
    options,
    optionsWithAvatars,
    actions,
    scopes,
    scopesWithIcons,
    scopesGroups,
    groups
} from './data';

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
                type: { summary: 'object[]' },
                category: 'Data'
            }
        },
        allowSearch: {
            name: 'allow-search',
            control: {
                type: 'boolean'
            },
            description: 'If present, the combobox options are searchable.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Parameters'
            }
        },
        backAction: {
            name: 'back-action',
            control: {
                type: 'object'
            },
            description:
                'Action object. The back action is used to go back to the previous level, after clicking on an option that has nested options.',
            table: {
                type: { summary: 'object' },
                defaultValue: {
                    summary: `{
                        iconName: 'utility:chevronright',
                        label: Label of the parent option
                    }`
                },
                category: 'Data'
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the combobox is disabled and users cannot interact with it.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Parameters'
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
            description:
                'Specifies where the drop-down list is aligned with or anchored to the selection field. Valid values include auto, left, center, right, bottom-left, bottom-center and bottom-right.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
                category: 'Appearance'
            }
        },
        dropdownLength: {
            name: 'dropdown-length',
            control: {
                type: 'select'
            },
            options: ['5-items', '7-items', '10-items'],
            description:
                'Maximum length of the dropdown menu. Valid values include 5-items, 7-items and 10-items.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '7-items' },
                category: 'Appearance'
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
                type: { summary: 'string' },
                category: 'Parameters'
            }
        },
        groups: {
            control: {
                type: 'object'
            },
            description:
                'Array of group objects. The groups are used to separate the options inside the drop-down.',
            table: {
                type: { summary: 'object[]' },
                category: 'Data'
            }
        },
        hideClearIcon: {
            name: 'hide-clear-icon',
            control: {
                type: 'boolean'
            },
            description:
                'If present, it is not possible to clear a selected option.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Appearance'
            }
        },
        hideSelectedOptions: {
            name: 'hide-selected-options',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the selected options pills will be hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Appearance'
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If true, the drop-down menu is in a loading state and shows a spinner.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Parameters'
            }
        },
        isMultiSelect: {
            name: 'is-multi-select',
            control: {
                type: 'boolean'
            },
            description: 'If present, multiple options can be selected.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Parameters'
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description: 'Text label for the combobox.',
            table: {
                type: { summary: 'string' },
                category: 'Data'
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Message displayed while the combobox is in the loading state.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Loading' },
                category: 'Parameters'
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
                category: 'Parameters'
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
                category: 'Parameters'
            }
        },
        multiLevelGroups: {
            name: 'multi-level-groups',
            control: {
                type: 'boolean'
            },
            description:
                'If present, groups can contain other groups. Each group added to an option will create a level of depth. \nIf false, there will be only one level of groups. If an option belongs to several groups, the option will be repeated in each group.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Parameters'
            }
        },
        name: {
            control: {
                type: 'text'
            },
            description: 'Specifies the name of the combobox.',
            table: {
                type: { summary: 'string' },
                category: 'Data'
            }
        },
        options: {
            control: {
                type: 'object'
            },
            description: 'Array of option objects.',
            table: {
                type: { summary: 'object[]' },
                category: 'Data'
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
                defaultValue: { summary: '"Select an Option" or "Search…"' },
                category: 'Data'
            }
        },
        readOnly: {
            name: 'read-only',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the combobox is read-only. A read-only combobox is also disabled.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Parameters'
            }
        },
        removeSelectedOptions: {
            name: 'remove-selected-options',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the selected options will be removed from the options.\nIf false, a checkmark will be displayed next to the selected options.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Parameters'
            }
        },
        required: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, a value must be selected before the form can be submitted.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Parameters'
            }
        },
        scopes: {
            control: {
                type: 'object'
            },
            description:
                'Array of scope objects. The scopes are displayed in a drop-down menu, to the left of the combobox input.',
            table: {
                type: { summary: 'object[]' },
                category: 'Data'
            }
        },
        scopesGroups: {
            name: 'scopes-groups',
            control: {
                type: 'object'
            },
            description:
                'Array of group objects. The groups are used to separate the scopes inside the drop-down.',
            table: {
                type: { summary: 'object[]' },
                category: 'Data'
            }
        },
        search: {
            description:
                'Custom search function to execute instead of the default search. It has to: 1- Take an object with two keys as an argument: options and searchTerm. 2- Return the new options.',
            table: {
                type: { summary: 'function' },
                category: 'Parameters'
            }
        },
        selectedOptionsAriaLabel: {
            name: 'selected-options-aria-label',
            control: {
                type: 'text'
            },
            description:
                'Describes the selected options section to assistive technologies.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Selected Options' },
                category: 'Parameters'
            }
        },
        selectedOptionsDirection: {
            name: 'selected-options-direction',
            control: {
                type: 'text'
            },
            description:
                'Direction of the selected options. Horizontally, the selected options will be displayed as pills. Vertically, the selected options will be displayed as a list.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'horizontal' },
                category: 'Appearance'
            }
        },
        sortableSelectedOptions: {
            name: 'sortable-selected-options',
            control: {
                type: 'boolean'
            },
            description: 'If present, the selected options are sortable.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Parameters'
            }
        },
        sortableSelectedOptionsIconName: {
            name: 'sortable-selected-options-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon indicating that the selected options are sortable. Specify the name in the format 'utility:user' where 'utility' is the category, and 'user' is the specific icon to be displayed. The icon is visible only if sortable-selected-options is present, and selected-options-direction is vertical.",
            table: {
                type: { summary: 'string' },
                category: 'Parameters'
            }
        },
        validity: {
            description:
                'Represents the validity states that an element can be in, with respect to constraint validation.',
            table: {
                type: { summary: 'string' },
                category: 'Parameters'
            }
        },
        value: {
            control: {
                type: 'object'
            },
            description: 'Array of selected options value.',
            table: {
                type: { summary: 'string[]' },
                category: 'Data'
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
                'The variant changes the appearance of the combobox. Accepted variants include standard, label-hidden, label-inline, and label-stacked. This value defaults to standard. Use label-hidden to hide the label but make it available to assistive technology. Use label-inline to horizontally align the label and combobox. Use label-stacked to place the label above the combobox.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'standard' },
                category: 'Appearance'
            }
        }
    },
    args: {
        allowSearch: false,
        disabled: false,
        dropdownAlignment: 'left',
        dropdownLength: '7-items',
        hideClearIcon: false,
        hideSelectedOptions: false,
        isLoading: false,
        isMultiSelect: false,
        loadingStateAlternativeText: 'Loading',
        multiLevelGroups: false,
        readOnly: false,
        removeSelectedOptions: false,
        required: false,
        selectedOptionsAriaLabel: 'Selected Options',
        selectedOptionsDirection: 'horizontal',
        sortableSelectedOptions: false,
        variant: 'standard'
    }
};

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
    options: options
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    label: 'Read-only combobox',
    options: options,
    readOnly: true,
    value: 'no-avatar-oil-sla'
};

export const ReadOnlyMultiSelect = Template.bind({});
ReadOnlyMultiSelect.args = {
    label: 'Read-only multi-select combobox',
    options: options,
    isMultiSelect: true,
    readOnly: true,
    value: ['no-avatar-dickenson', 'no-avatar-oil-sla']
};

export const VerticalSelectedOptions = Template.bind({});
VerticalSelectedOptions.args = {
    label: 'Vertical selected options',
    isMultiSelect: true,
    options: optionsWithAvatars,
    dropdownLength: '5-items',
    actions,
    selectedOptionsDirection: 'vertical',
    sortableSelectedOptions: true,
    sortableSelectedOptionsIconName: 'utility:drag_and_drop',
    value: ['tyrell', 'oil-sla', 'dickenson']
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

export const Grouped = Template.bind({});
Grouped.args = {
    label: 'Combobox with grouped options',
    options: optionsWithAvatars,
    groups: groups
};

export const MultiLevelGroups = Template.bind({});
MultiLevelGroups.args = {
    label: 'Combobox with multi-level groups',
    options: optionsWithAvatars,
    groups: groups,
    multiLevelGroups: true,
    allowSearch: true,
    fieldLevelHelp: 'This combobox is also searchable'
};

export const Lookup = Template.bind({});
Lookup.args = {
    label: 'Multi-select lookup',
    options: optionsWithAvatars,
    value: ['burlington', 'edge'],
    isMultiSelect: true,
    removeSelectedOptions: true,
    actions: actions,
    allowSearch: true,
    sortableSelectedOptions: true
};

export const Scopes = Template.bind({});
Scopes.args = {
    label: 'Combobox with scopes',
    options: options,
    scopes: scopes,
    scopesGroups: scopesGroups
};

export const ScopesWithIcons = Template.bind({});
ScopesWithIcons.args = {
    label: 'Combobox with scopes',
    allowSearch: true,
    options: optionsWithAvatars,
    scopes: scopesWithIcons,
    dropdownLength: '5-items',
    backAction: {
        label: 'Back',
        iconName: 'utility:back',
        fixed: true,
        position: 'bottom'
    }
};

export const CustomSearch = Template.bind({});
CustomSearch.args = {
    label: 'Custom search in secondary text',
    allowSearch: true,
    options: optionsWithAvatars,
    search: search
};
