import { SortableMenu } from '../__examples__/sortableMenu';

export default {
    title: 'Example/Sortable Menu',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            description: 'Label of the sortable menu.',
            table: {
                type: { summary: 'string' }
            }
        },
        disabled: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If true, it will not be possible to reorder the sortable items, and the reorder icon will be hidden.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
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
        }
    }
};

const Template = (args) => SortableMenu(args);

const items = [
    {
        label: 'Item 1'
    },
    {
        label: 'Item 2'
    },
    {
        label: 'Item 3'
    },
    {
        label: 'Item 4'
    },
    {
        label: 'Item 5'
    }
];

export const Base = Template.bind({});
Base.args = {
    items: items
};
