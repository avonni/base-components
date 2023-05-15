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

import { FilterMenuGroup } from '../__examples__/filterMenuGroup';
import { COLLAPSIBLE_MENUS, MENUS, ICONS_MENUS } from './data';

export default {
    title: 'Example/Filter Menu Group',
    argTypes: {
        menus: {
            control: {
                type: 'object'
            },
            description: 'Array of menu objects.',
            table: {
                type: { summary: 'object[]' }
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
                defaultValue: { summary: 'Apply' }
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
                defaultValue: { summary: 'Reset' }
            }
        },
        hideApplyResetButtons: {
            name: 'hide-apply-reset-buttons',
            control: {
                type: 'boolean'
            },
            description: 'If present, the selected items are hidden.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
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
        value: {
            control: {
                type: 'object'
            },
            description:
                'Value of the menus. The object follows the structure { menuName: menuValue }.',
            table: {
                type: { summary: 'object' }
            }
        },
        variant: {
            control: {
                type: 'select'
            },
            options: ['horizontal', 'vertical'],
            description:
                'The variant changes the look of the menu group. Accepted variants include horizontal and vertical.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'horizontal' }
            }
        }
    },
    args: {
        applyButtonLabel: 'Apply',
        hideApplyResetButtons: false,
        hideSelectedItems: false,
        resetButtonLabel: 'Reset',
        variant: 'horizontal'
    }
};

const Template = (args) => FilterMenuGroup(args);

export const Base = Template.bind({});
Base.args = {
    menus: MENUS
};

export const ButtonIcons = Template.bind({});
ButtonIcons.args = {
    menus: ICONS_MENUS,
    applyButtonLabel: 'Save',
    resetButtonLabel: 'Clear',
    value: {
        contact: 'email',
        languages: ['dutch', 'english'],
        price: [45, 67],
        publication: [new Date(2022, 11, 4, 13, 45)]
    }
};

export const Vertical = Template.bind({});
Vertical.args = {
    menus: MENUS,
    variant: 'vertical',
    value: {
        contact: 'email',
        languages: ['dutch', 'english'],
        price: [45, 67],
        publication: [new Date(2022, 11, 4, 13, 45)]
    }
};

export const CollapsibleVertical = Template.bind({});
CollapsibleVertical.args = {
    menus: COLLAPSIBLE_MENUS,
    variant: 'vertical',
    value: {
        contact: 'email',
        languages: ['dutch', 'english'],
        price: [45, 67],
        publication: [new Date(2022, 11, 4, 13, 45)]
    }
};
