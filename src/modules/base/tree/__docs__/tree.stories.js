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

import { Tree } from '../__examples__/tree';
import {
    ACTIONS,
    ACTIONS_WHEN_DISABLED,
    ITEMS,
    ITEMS_WITH_FIELDS
} from './data';

export default {
    title: 'Example/Tree',
    argTypes: {
        actions: {
            control: {
                type: 'object'
            },
            description:
                'Array of action objects to display to the right of each item. These actions are not visible on disabled items.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        actionsWhenDisabled: {
            name: 'actions-when-disabled',
            control: {
                type: 'object'
            },
            description:
                'Array of action objects to display to the right of disabled items.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        allowInlineEdit: {
            name: 'allow-inline-edit',
            control: {
                type: 'boolean'
            },
            description:
                "If present, the items' label can be edited by double-clicking on it. NB: If inline editing is allowed, the label link will be disabled.",
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        disableSelectionCascade: {
            name: 'disable-selection-cascade',
            control: {
                type: 'boolean'
            },
            description:
                'Used only if `is-multi-select` is true. If present, the parent and children nodes will be selected independently of each other. If empty, when all children of a node are selected, the node is selected automatically. If a node is selected, all its children are also selected by default.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        editableFields: {
            name: 'editable-fields',
            control: {
                type: 'object'
            },
            description:
                'Array of fields that should be visible in the item edit form. The item edit form can be opened through the standard edit action.',
            table: {
                type: { summary: 'string[]' }
            }
        },
        header: {
            control: {
                type: 'text'
            },
            description: 'Tree heading.',
            table: {
                type: { summary: 'string' }
            }
        },
        items: {
            control: {
                type: 'object'
            },
            description: 'Array of item objects.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        selectedItems: {
            name: 'selected-items',
            control: {
                type: 'object'
            },
            description:
                'Array of tree item names to select and highlight. If the tree is not multi-select:  only the first item of the list will be selected ; if it is nested, selecting this item also expands the parent branches.',
            table: {
                type: { summary: 'string[]' }
            }
        },
        isLoading: {
            name: 'is-loading',
            control: {
                type: 'boolean'
            },
            description: 'If present, the tree is loading and shows a spinner.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        loadingStateAlternativeText: {
            name: 'loading-state-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'The alternative text used to describe the reason for the wait and need for a spinner.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Loading...' }
            }
        },
        sortable: {
            control: {
                type: 'boolean'
            },
            description: 'If present, the tree items are sortable.',
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
            description:
                'If present, multiple items can be selected and a checkbox is displayed to the left of the items.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        }
    },
    args: {
        allowInlineEdit: false,
        disableSelectionCascade: false,
        editableFields: [
            'label',
            'metatext',
            'name',
            'href',
            'expanded',
            'disabled',
            'isLoading'
        ],
        isLoading: false,
        loadingStateAlternativeText: 'Loading...',
        sortable: false,
        isMultiSelect: false
    }
};

const Template = (args) => Tree(args);

export const Base = Template.bind({});
Base.args = {
    items: ITEMS,
    header: 'Tree With a Selected Item',
    selectedItems: 'node1-1-1'
};

export const Actions = Template.bind({});
Actions.args = {
    actions: ACTIONS,
    actionsWhenDisabled: ACTIONS_WHEN_DISABLED,
    items: ITEMS,
    header: 'Tree With All Standard Actions'
};

export const Sortable = Template.bind({});
Sortable.args = {
    items: ITEMS,
    header: 'Tree With Sortable Items',
    sortable: true
};

export const CustomEditableFields = Template.bind({});
CustomEditableFields.args = {
    actions: [
        {
            name: 'edit',
            label: 'Edit Item'
        }
    ],
    items: ITEMS,
    header: 'Tree With Custom Edit Fields',
    editableFields: ['label', 'metatext']
};

export const InlineEditing = Template.bind({});
InlineEditing.args = {
    items: ITEMS,
    header: 'Tree With Inline Editing',
    allowInlineEdit: true
};

export const FieldsAndAvatars = Template.bind({});
FieldsAndAvatars.args = {
    items: ITEMS_WITH_FIELDS,
    header: 'Tree With Fields and Avatars'
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
    actions: ACTIONS,
    items: ITEMS,
    header: 'Multi Select Tree',
    isMultiSelect: true,
    sortable: true,
    selectedItems: ['node1-2-1', 'node1-1', 'node2', 'node1-1-1-2', 'node6']
};

export const MultiSelectNoCascade = Template.bind({});
MultiSelectNoCascade.args = {
    items: ITEMS,
    header: 'Multi Select Tree With no Selection Cascade',
    isMultiSelect: true,
    selectedItems: ['node1-2-1', 'node1-1', 'node2', 'node1-1-1-2', 'node6'],
    disableSelectionCascade: true
};
