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
        alternativeText: {
            control: {
                type: 'text'
            },
            description:
                'The alternative text used to describe the draggable items.',
            defaultValue: 'Drag item',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'Drag item' }
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
        },
        iconName: {
            name: 'icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon that is displayed on all items. Names are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' }
            }
        },
        iconPosition: {
            name: 'icon-position',
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            defaultValue: 'right',
            description:
                'Position of the icon. Valid values include left and right.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'right' }
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

const itemsWithIcons = [
    {
        label: 'Item 1',
        iconName: 'custom:custom5'
    },
    {
        label: 'Item 2',
        iconName: 'custom:custom9'
    },
    {
        label: 'Item 3',
        iconName: 'custom:custom1'
    },
    {
        label: 'Item 4',
        iconName: 'custom:custom11'
    },
    {
        label: 'Item 5',
        iconName: 'custom:custom51'
    }
];

export const Base = Template.bind({});
Base.args = {
    label: 'Sortable Menu',
    items: items
};

export const Icons = Template.bind({});
Icons.args = {
    label: 'Sortable Menu with Icons',
    items: itemsWithIcons,
    iconName: 'utility:drag_and_drop',
    iconPosition: 'left'
};

export const Disabled = Template.bind({});
Disabled.args = {
    label: 'Disabled Sortable Menu',
    items: itemsWithIcons,
    disabled: true,
    iconName: 'utility:drag_and_drop'
};
