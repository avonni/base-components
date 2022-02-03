import { Tree } from '../__examples__/tree';
import { ITEMS } from './data';

export default {
    title: 'Example/Tree',
    argTypes: {
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
        readOnly: {
            name: 'read-only',
            control: {
                type: 'boolean'
            },
            description: 'If true, the tree is read only and cannot be edited.',
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
        }
    },
    args: {
        isLoading: false,
        loadingStateAlternativeText: 'Loading...',
        readOnly: false
    }
};

const Template = (args) => Tree(args);

export const Base = Template.bind({});
Base.args = {
    items: ITEMS,
    header: 'Base tree with a selected item',
    selectedItem: 'node1-1-1'
};

export const ReadOnly = Template.bind({});
ReadOnly.args = {
    items: ITEMS,
    header: 'Read-only tree',
    readOnly: true
};
