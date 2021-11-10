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

import { DualListbox } from '../__examples__/dualListbox';
import {
    LanguagesOptions,
    OptionsWithAvatar,
    OptionsWithAvatarSrc,
    Options,
    OptionsWithGroups
} from './data';

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
        allowSearch: {
            name: 'allow-search',
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
        buttonSize: {
            name: 'button-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
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
                type: 'select'
            },
            options: [
                'bare',
                'container',
                'brand',
                'border',
                'border-filled',
                'bare-inverse',
                'border-inverse'
            ],
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
        draggable: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If present, the options are draggable.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
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
        hideBottomDivider: {
            name: 'hide-bottom-divider',
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description: 'If present, hides the bottom divider.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: false }
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
            type: { name: 'string' },
            control: {
                type: 'text'
            },
            description: 'Label for the dual listbox.',
            table: {
                type: { summary: 'string' }
            }
        },
        maxVisibleOptions: {
            name: 'max-visible-options',
            control: {
                type: 'number'
            },
            defaultValue: 5,
            description:
                'Number of items that display in the listboxes before vertical scrollbars are displayed. Determines the vertical size of the listbox.',
            table: {
                type: { summary: 'number' },
                defaultValue: { summary: 5 }
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
        selectedLabel: {
            name: 'selected-label',
            type: { name: 'string' },
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
        size: {
            control: {
                type: 'select'
            },
            options: ['small', 'medium', 'large', 'responsive'],
            defaultValue: 'medium',
            description:
                'It defines the width of the source options listbox and the selected options listbox. Valid values include small, medium, large and responsive.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        },
        sourceLabel: {
            name: 'source-label',
            type: { name: 'string' },
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
                type: 'select'
            },
            options: ['standard', 'label-hidden', 'label-stacked'],
            defaultValue: 'standard',
            description:
                'The variant changes the appearance of the dual listbox. Valid variants include standard, label-hidden and label-stacked. Use label-hidden to hide the label but make it available to assistive technology. Use label-stacked to place the label above the dual listbox.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'standard' }
            }
        },
        args: {
            allowSearch: false,
            disableReordering: false,
            disabled: false,
            draggable: false,
            hideBottomDivider: false,
            isLoading: false,
            required: false
        }
    }
};

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
    value: ['3', '2', '4', '5', '6'],
    draggable: true,
    hideBottomDivider: true
};

export const BaseWithGroups = Template.bind({});
BaseWithGroups.args = {
    label: 'Select Options',
    fieldLevelHelp: 'This is a Dual Listbox',
    sourceLabel: 'Available Items',
    selectedLabel: 'Selected Items',
    addButtonLabel: 'Add Button Label',
    removeButtonLabel: 'Remove Button Label',
    downButtonLabel: 'Down Button Label',
    upButtonLabel: 'Up Button Label',
    options: OptionsWithGroups,
    value: ['B', '3', '2', '4', '5', '6'],
    draggable: true,
    hideBottomDivider: true
};

export const BaseSmall = Template.bind({});
BaseSmall.args = {
    label: 'Select Options',
    fieldLevelHelp: 'This is a Dual Listbox',
    sourceLabel: 'Available Items',
    selectedLabel: 'Selected Items',
    addButtonLabel: 'Add Button Label',
    removeButtonLabel: 'Remove Button Label',
    downButtonLabel: 'Down Button Label',
    upButtonLabel: 'Up Button Label',
    options: Options,
    value: ['2', '3', '4', '5', '6'],
    size: 'small'
};

export const BaseLarge = Template.bind({});
BaseLarge.args = {
    label: 'Select Options',
    fieldLevelHelp: 'This is a Dual Listbox',
    sourceLabel: 'Available Items',
    selectedLabel: 'Selected Items',
    addButtonLabel: 'Add Button Label',
    removeButtonLabel: 'Remove Button Label',
    downButtonLabel: 'Down Button Label',
    upButtonLabel: 'Up Button Label',
    options: Options,
    value: ['2', '3', '4', '5', '6'],
    size: 'large'
};

export const BaseResponsive = Template.bind({});
BaseResponsive.args = {
    label: 'Select Options',
    fieldLevelHelp: 'This is a Dual Listbox',
    sourceLabel: 'Available Items',
    selectedLabel: 'Selected Items',
    addButtonLabel: 'Add Button Label',
    removeButtonLabel: 'Remove Button Label',
    downButtonLabel: 'Down Button Label',
    upButtonLabel: 'Up Button Label',
    options: Options,
    value: ['2', '3', '4', '5', '6'],
    size: 'responsive'
};

export const BaseNoBorder = Template.bind({});
BaseNoBorder.args = {
    label: 'Select Options',
    fieldLevelHelp: 'This is a Dual Listbox',
    sourceLabel: 'Available Items',
    selectedLabel: 'Selected Items',
    addButtonLabel: 'Add Button Label',
    removeButtonLabel: 'Remove Button Label',
    downButtonLabel: 'Down Button Label',
    upButtonLabel: 'Up Button Label',
    options: Options,
    hideBottomDivider: true,
    value: ['2', '3', '4', '5', '6']
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
    isLoading: true,
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
    hideBottomDivider: true,
    variant: 'label-hidden'
};

export const BaseWithAvatarVisibleOptions10 = Template.bind({});
BaseWithAvatarVisibleOptions10.args = {
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
    maxVisibleOptions: 10,
    value: ['2', '3']
};

export const BaseWithAvatarDescriptionVisibleOptions6 = Template.bind({});
BaseWithAvatarDescriptionVisibleOptions6.args = {
    label: 'Invitations',
    sourceLabel: 'Available',
    selectedLabel: 'Invited',
    addButtonLabel: 'Add Button Label',
    removeButtonLabel: 'Remove Button Label',
    downButtonLabel: 'Down Button Label',
    upButtonLabel: 'Up Button Label',
    options: OptionsWithAvatarSrc,
    requiredOptions: ['1'],
    maxVisibleOptions: 6,
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
    allowSearch: true,
    value: ['en', 'fr']
};

export const LanguagesStacked = Template.bind({});
LanguagesStacked.args = {
    label: 'Languages',
    fieldLevelHelp: 'Choose a language',
    sourceLabel: 'Available',
    selectedLabel: 'Selected',
    addButtonLabel: 'Add Button Label',
    removeButtonLabel: 'Remove Button Label',
    downButtonLabel: 'Down Button Label',
    upButtonLabel: 'Up Button Label',
    options: LanguagesOptions,
    variant: 'label-stacked',
    value: ['en', 'fr']
};
