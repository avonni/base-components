import { Tree } from '../__examples__/tree';
import { ACTIONS, ITEMS } from './data';

export default {
    title: 'Example/Tree',
    argTypes: {
        actions: {
            control: {
                type: 'object'
            },
            description:
                'Array of action objects to display to the right of each item.',
            table: {
                type: { summary: 'object[]' }
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
                defaultValue: { summary: false }
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
        }
    },
    args: {
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
        sortable: false
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
