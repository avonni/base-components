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

import { MenuItemDialog } from '../__examples__/menuItemDialog';

export default {
    title: 'Base/Menu Item Dialog (only with avonni-button-menu)',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            description: 'Text of the menu item.',
            table: {
                type: { summary: 'string' }
            }
        },
        value: {
            control: {
                type: 'text'
            },
            description:
                'A value associated with the menu item. This value will be the same with dialog (dialog-name === value)',
            table: {
                type: { summary: 'string' }
            }
        },
        accessKey: {
            name: 'access-key',
            control: {
                type: 'text'
            },
            description: 'The keyboard shortcut for the menu item.',
            table: {
                type: { summary: 'string' },
                category: 'Accessibility'
            }
        },
        draftAlternativeText: {
            name: 'draft-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Describes the reason for showing the draft indicator. This is required when is-draft is present on the lightning-menu-item tag.',
            table: {
                type: { summary: 'string' },
                category: 'Accessibility'
            }
        },
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                'The name of an icon to display after the text of the menu item.',
            table: {
                type: { summary: 'string' }
            }
        },
        prefixIconName: {
            name: 'prefix-icon-name',
            control: {
                type: 'text'
            },
            description:
                'The name of an icon to display before the text of the menu item.',
            table: {
                type: { summary: 'string' }
            }
        },
        tabIndex: {
            name: 'tab-index',
            control: {
                type: 'text'
            },
            description:
                'Reserved for internal use. Use tabindex instead to indicate if an element should be focusable. tabindex can be set to 0 or -1. The default tabindex value is 0, which means that the menu item is focusable and participates in sequential keyboard navigation. The value -1 means that the menu item is focusable but does not participate in keyboard navigation.',
            table: {
                type: { summary: 'string' },
                category: 'Accessibility'
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            description:
                'If present, the menu item is disabled and users cannot interact with it.',
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        isDraft: {
            name: 'is-draft',
            control: {
                type: 'boolean'
            },
            description:
                'If present, a draft indicator is shown on the menu item. A draft indicator is denoted by blue asterisk on the left of the menu item. When you use a draft indicator, include alternative text for accessibility using draft-alternative-text.',
            defaultValue: 0,
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        }
    },
    args: {
        disabled: false,
        isDraft: false
    }
};

const Template = (args) => MenuItemDialog(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Menu Item Dialog One',
    value: 'Dialog-1'
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Menu Item Dialog One',
    value: 'Dialog-1',
    disabled: true
};

export const Icons = Template.bind({});
Icons.args = {
    label: 'Menu Item Dialog One',
    value: 'Dialog-1',
    iconName: 'utility:delete',
    prefixIconName: 'utility:success'
};

export const Draft = Template.bind({});
Draft.args = {
    label: 'Menu Item Dialog One',
    value: 'Dialog-1',
    isDraft: true,
    draftAlternativeText: 'This is the draft alternative text'
};
