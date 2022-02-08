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
        editFields: {
            name: 'edit-fields',
            control: {
                type: 'object'
            },
            description:
                'Array of fields that should be visible in the item edit form. The item edit form can be opened through the standard edit action.',
            table: {
                type: { summary: 'object[]' }
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
        selectedItem: {
            name: 'selected-item',
            control: {
                type: 'text'
            },
            description:
                'Name of the tree item to select and highlight. Tree item names are case-sensitive. If the tree item is nested, selecting this item also expands the parent branches.',
            table: {
                type: { summary: 'string' }
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
        editFields: [
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
    header: 'Base tree with a selected item',
    selectedItem: 'node1-1-1'
};

export const Actions = Template.bind({});
Actions.args = {
    actions: ACTIONS,
    actionsWhenDisabled: ACTIONS_WHEN_DISABLED,
    items: ITEMS,
    header: 'Tree with all standard actions'
};

export const Sortable = Template.bind({});
Sortable.args = {
    items: ITEMS,
    header: 'Tree with sortable items',
    sortable: true
};

export const CustomEditFields = Template.bind({});
CustomEditFields.args = {
    actions: [
        {
            name: 'edit',
            label: 'Edit Item'
        }
    ],
    items: ITEMS,
    header: 'Tree with custom edit fields',
    editFields: ['label', 'metatext']
};

export const InlineEditing = Template.bind({});
InlineEditing.args = {
    items: ITEMS,
    header: 'Tree with inline editing',
    allowInlineEdit: true
};

export const FieldsAndAvatars = Template.bind({});
FieldsAndAvatars.args = {
    items: ITEMS_WITH_FIELDS,
    header: 'Tree with fields and avatars'
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
    items: ITEMS,
    header: 'Multi select tree',
    isMultiSelect: true,
    actions: ACTIONS,
    allowInlineEdit: true
};
