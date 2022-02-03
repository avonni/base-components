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
        }
    },
    args: {
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
