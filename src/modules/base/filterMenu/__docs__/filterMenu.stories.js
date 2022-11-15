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

import { FilterMenu } from '../__examples__/filterMenu';

export default {
    title: 'Example/Filter Menu',
    argTypes: {
        accessKey: {
            name: 'access-key',
            control: {
                type: 'text'
            },
            description:
                'The keyboard shortcut for the button menu (horizontal variant) or the checkbox group (vertical variant).',
            table: {
                type: { summary: 'string' }
            }
        },
        alternativeText: {
            name: 'alternative-text',
            control: {
                type: 'text'
            },
            description:
                'The assistive text for the button menu. This attribute isn’t supported for the vertical variant.',
            table: {
                type: { summary: 'string' }
            }
        },
        applyButtonLabel: {
            name: 'apply-button-label',
            control: {
                type: 'text'
            },
            description: 'Label of the apply button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Apply' },
                category: 'Button'
            }
        },
        buttonVariant: {
            control: {
                type: 'select'
            },
            options: [
                'border',
                'bare',
                'container',
                'border-filled',
                'bare-inverse',
                'border-inverse'
            ],
            description:
                'The button variant changes the look of the horizontal variant’s button. Accepted variants include bare, container, border, border-filled, bare-inverse, and border-inverse. This attribute isn’t supported for the vertical variant.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'border' },
                category: 'Button'
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description: 'If present, the menu cannot be used by users.',
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
            description:
                'Determines the alignment of the dropdown menu relative to the button. Available options are: auto, left, center, right, bottom-left, bottom-center, bottom-right. The auto option aligns the dropdown menu based on available space. This attribute isn’t supported for the vertical variant.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'left' },
                category: 'Dropdown menu'
            }
        },
        dropdownLength: {
            name: 'dropdown-length',
            control: {
                type: 'select'
            },
            options: ['5-items', '7-items', '10-items'],
            description:
                'Maximum length of the dropdown menu. Valid values include 5-items, 7-items and 10-items. This attribute isn’t supported for the vertical variant.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: '7-items' },
                category: 'Dropdown menu'
            }
        },
        dropdownNubbin: {
            name: 'dropdown-nubbin',
            control: {
                type: 'boolean'
            },
            description:
                'If present, a nubbin is present on the dropdown menu. A nubbin is a stub that protrudes from the menu item towards the button menu. The nubbin position is based on the menu-alignment. This attribute isn’t supported for the vertical variant.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Dropdown menu'
            }
        },
        dropdownWidth: {
            name: 'dropdown-width',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            description:
                'Minimum width of the dropdown menu. Valid values include xx-small, x-small, small, medium and large. This attribute isn’t supported for the vertical variant.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'small' },
                category: 'Dropdown menu'
            }
        },
        hideApplyResetButtons: {
            name: 'hide-apply-reset-buttons',
            control: {
                type: 'boolean'
            },
            description: 'If present, the apply and reset buttons are hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Button'
            }
        },
        hideSelectedItems: {
            name: 'hide-selected-items',
            control: {
                type: 'boolean'
            },
            description: 'If present, the selected items are hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                "The name of the icon to be used in the format 'utility:down'. For the horizontal variant, if an icon other than 'utility:down' or 'utility:chevrondown' is used, a utility:down icon is appended to the right of that icon. This value defaults to utility:down.",
            table: {
                type: { summary: 'string' },
                defaultValue: {
                    summary: 'utility:down',
                    detail: 'Only for horizontal variant'
                }
            }
        },
        iconSize: {
            name: 'icon-size',
            control: {
                type: 'select'
            },
            options: ['xx-small', 'x-small', 'small', 'medium', 'large'],
            description:
                'The size of the icon. Options include xx-small, x-small, small, medium or large. This value defaults to medium.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'medium' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the menu is in a loading state and shows a spinner.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' },
                category: 'Search'
            }
        },
        label: {
            control: {
                type: 'text'
            },
            description: 'Label of the menu.',
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
                'Message displayed while the menu is in the loading state.',
            table: {
                type: { summary: 'string' },
                category: 'Search'
            }
        },
        name: {
            control: {
                type: 'text'
            },
            description: 'Specifies the name of the filter menu.',
            table: {
                type: { summary: 'string' }
            }
        },
        resetButtonLabel: {
            name: 'reset-button-label',
            control: {
                type: 'text'
            },
            description: 'Label of the reset button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Reset' },
                category: 'Button'
            }
        },
        title: {
            control: {
                type: 'text'
            },
            description:
                'Title of the button (horizontal variant) or the label (vertical variant).',
            table: {
                type: { summary: 'string' }
            }
        },
        tooltip: {
            control: {
                type: 'text'
            },
            description:
                'The tooltip is displayed on hover or focus on the button (horizontal variant), or on the help icon (vertical variant).',
            table: {
                type: { summary: 'string' }
            }
        },
        type: {
            control: {
                type: 'text'
            },
            description:
                'Type of the filter menu. Valid values include list, range and date-range.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'list' }
            }
        },
        typeAttributes: {
            name: 'type-attributes',
            control: {
                type: 'object'
            },
            description: 'Attributes specific to the type.',
            table: {
                type: { summary: 'object' }
            }
        },
        value: {
            control: {
                type: 'object'
            },
            description: "Array of selected item's values.",
            table: {
                type: { summary: 'string[]' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['horizontal', 'vertical'],
            description:
                'The variant changes the look of the menu. Accepted variants include horizontal and vertical.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'horizontal' }
            }
        }
    },
    args: {
        applyButtonLabel: 'Apply',
        buttonVariant: 'border',
        disabled: false,
        dropdownAlignment: 'left',
        dropdownLength: '7-items',
        dropdownNubbin: false,
        dropdownWidth: 'small',
        hideApplyResetButtons: false,
        hideSelectedItems: false,
        iconSize: 'medium',
        isLoading: false,
        resetButtonLabel: 'Reset',
        type: 'list',
        variant: 'horizontal'
    }
};

const items = [
    {
        label: 'Call',
        value: 'call',
        prefixIconName: 'standard:call',
        iconName: 'utility:voicemail_drop'
    },
    {
        label: 'Email',
        value: 'email',
        prefixIconName: 'standard:email'
    },
    {
        label: 'Meeting',
        value: 'meeting',
        prefixIconName: 'standard:service_appointment',
        disabled: true
    },
    {
        label: 'Other',
        value: 'other',
        prefixIconName: 'standard:all'
    },
    {
        label: 'Menu item 5',
        value: 'item-5'
    },
    {
        label: 'Menu item 6',
        value: 'item-6'
    },
    {
        label: 'Menu item 7',
        value: 'item-7'
    }
];

const Template = (args) => FilterMenu(args);

export const Base = Template.bind({});
Base.args = {
    typeAttributes: { items }
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
    typeAttributes: {
        isMultiSelect: true,
        items
    }
};

export const Search = Template.bind({});
Search.args = {
    typeAttributes: {
        allowSearch: true,
        items
    }
};

export const Disabled = Template.bind({});
Disabled.args = {
    disabled: true,
    typeAttributes: { items }
};

export const Loading = Template.bind({});
Loading.args = {
    isLoading: true,
    tooltip: 'is-loading is set to true'
};

export const XSmallIcon = Template.bind({});
XSmallIcon.args = {
    typeAttributes: { items },
    iconSize: 'x-small',
    iconName: 'utility:apps',
    value: ['item-5', 'meeting', 'wrong-value']
};

export const ContainerVariantWithCustomButtonLabels = Template.bind({});
ContainerVariantWithCustomButtonLabels.args = {
    typeAttributes: { items },
    buttonVariant: 'container',
    label: 'Open menu',
    resetButtonLabel: 'Erase',
    applyButtonLabel: 'Save'
};

export const DropdownCustomization = Template.bind({});
DropdownCustomization.args = {
    typeAttributes: { items },
    dropdownWidth: 'large',
    dropdownNubbin: true,
    dropdownLength: '5-items'
};

export const Vertical = Template.bind({});
Vertical.args = {
    typeAttributes: { items },
    variant: 'vertical',
    label: 'Contact'
};

export const VerticalWithSearchAndIcon = Template.bind({});
VerticalWithSearchAndIcon.args = {
    typeAttributes: {
        allowSearch: true,
        isMultiSelect: true,
        items
    },
    variant: 'vertical',
    label: 'Contact',
    iconName: 'custom:custom22',
    iconSize: 'small'
};

export const VerticalLoading = Template.bind({});
VerticalLoading.args = {
    label: 'Contact',
    isLoading: true,
    tooltip: 'is-loading is set to true',
    variant: 'vertical'
};
