import { Tree } from '../__examples__/tree';
import {
    ACTIONS,
    ACTIONS_WHEN_DISABLED,
    ITEMS,
    ITEMS_WITH_FIELDS,
    ITEMS_WITH_WITH_TYPES
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
        addButtonLabel: {
            name: 'add-button-label',
            control: {
                type: 'text'
            },
            description: 'Label for the add button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Add Item' }
            }
        },
        cancelButtonLabel: {
            name: 'cancel-button-label',
            control: {
                type: 'text'
            },
            description: 'Label for the cancel button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Cancel' }
            }
        },
        doneButtonLabel: {
            name: 'done-button-label',
            control: {
                type: 'text'
            },
            description: 'Label for the done button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Done' }
            }
        },
        independentMultiSelect: {
            name: 'independent-multi-select',
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
        enableInfiniteLoading: {
            name: 'enable-infinite-loading',
            control: {
                type: 'boolean'
            },
            description:
                'If present, a "Load more" button is displayed at the end of the root items. On click, it will fire the `loadmore` event.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
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
        loadMoreButtonLabel: {
            name: 'load-more-button-label',
            control: {
                type: 'text'
            },
            description: 'Label for the load more button.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Load More' }
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
        },
        placeholder: {
            name: 'placeholder',
            control: {
                type: 'text'
            },
            description:
                'The default label given to a new branch when it is created.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'New branch' }
            }
        },
        disabled: {
            name: 'disabled',
            control: {
                type: 'boolean'
            },
            description:
                'If present, the component is disabled and items cannot be selected or edited.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        collapseDisabled: {
            name: 'collapse-disabled',
            control: {
                type: 'boolean'
            },
            description:
                'If present, all branches in the tree are expanded and cannot be collapsed.',
            table: {
                type: { summary: 'boolean' },
                defaultValue: { summary: 'false' }
            }
        },
        collapseButtonAlternativeText: {
            name: 'collapse-button-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'The alternative text used to describe the collapse button icon.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Collapse Branch' }
            }
        },
        closeButtonAlternativeText: {
            name: 'close-button-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'The alternative text used to describe the close button icon.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Close Dialog' }
            }
        },
        expandButtonAlternativeText: {
            name: 'expand-button-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'The alternative text used to describe the expand button icon.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Expand Branch' }
            }
        },
        saveButtonIconAlternativeText: {
            name: 'save-button-icon-alternative-text',
            control: {
                type: 'text'
            },
            description:
                'The alternative text used to describe the save button icon.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Save Label' }
            }
        },
        rootSlottableTypes: {
            name: 'root-slottable-types',
            control: {
                type: 'object'
            },
            description:
                'Array of types of items that can be slotted in the root of the tree.',
            table: {
                type: { summary: 'string[]' }
            }
        }
    },
    args: {
        addButtonLabel: 'Add Item',
        allowInlineEdit: false,
        cancelButtonLabel: 'Cancel',
        closeButtonAlternativeText: 'Close Dialog',
        collapseButtonAlternativeText: 'Collapse Branch',
        collapseDisabled: false,
        disabled: false,
        doneButtonLabel: 'Done',
        expandButtonAlternativeText: 'Expand Branch',
        editableFields: [
            'disabled',
            'expanded',
            'href',
            'isLoading',
            'label',
            'metatext',
            'name'
        ],
        independentMultiSelect: false,
        isLoading: false,
        isMultiSelect: false,
        loadingStateAlternativeText: 'Loading...',
        loadMoreButtonLabel: 'Load More',
        rootSlottableTypes: [],
        saveButtonIconAlternativeText: 'Save Label',
        sortable: false
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

export const RootSlottableTypes = Template.bind({});
RootSlottableTypes.args = {
    items: ITEMS_WITH_WITH_TYPES,
    header: 'Tree With Root Slottable Types',
    rootSlottableTypes: ['standard'],
    sortable: true
};

export const CustomEditableFields = Template.bind({});
CustomEditableFields.args = {
    actions: [
        {
            name: 'Standard.Tree.Edit',
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

export const IndependentMultiSelect = Template.bind({});
IndependentMultiSelect.args = {
    items: ITEMS,
    header: 'Multi Select Tree With no Selection Cascade',
    isMultiSelect: true,
    selectedItems: ['node1-2-1', 'node1-1', 'node2', 'node1-1-1-2', 'node6'],
    independentMultiSelect: true
};

export const Placeholder = Template.bind({});
Placeholder.args = {
    items: ITEMS,
    header: 'Tree With a Placeholder',
    placeholder: '-',
    actions: [
        {
            name: 'Standard.Tree.Add',
            label: 'Add Item'
        },
        {
            name: 'Standard.Tree.Edit',
            label: 'Edit Item'
        },
        {
            name: 'Standard.Tree.Delete',
            label: 'Delete Item'
        }
    ],
    editableFields: ['label', 'metatext']
};

export const CollapseDisabled = Template.bind({});
CollapseDisabled.args = {
    items: ITEMS,
    header: 'Collapse Disabled',
    collapseDisabled: true
};

export const InfiniteLoading = Template.bind({});
InfiniteLoading.args = {
    header: 'Infinite Loading Tree',
    enableInfiniteLoading: true
};
