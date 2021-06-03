import { List } from '../__examples__/list';

export default {
    title: 'Example/List',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            description: 'Label of the list.',
            table: {
                type: { summary: 'string' }
            }
        },
        alternativeText: {
            name: 'alternative-text',
            control: {
                type: 'text'
            },
            description:
                'Alternative text used to describe the list. If the list is sortable, it should describe its behavior, for example: “Sortable menu. Press spacebar to grab or drop an item. Press up and down arrow keys to change position. Press escape to cancel.”',
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
        sortable: {
            control: {
                type: 'boolean'
            },
            defaultValue: false,
            description:
                'If true, it will be possible to reorder the list items.',
            table: {
                defaultValue: { summary: 'false' },
                type: { summary: 'boolean' }
            }
        },
        sortableIconName: {
            name: 'sortable-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the sortable icon. \nNames are written in the format 'standard:account' where 'standard' is the category, and 'account' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' }
            }
        },
        sortableIconPosition: {
            name: 'sortable-icon-position',
            control: {
                type: 'select'
            },
            options: ['left', 'right'],
            defaultValue: 'right',
            description:
                'Position of the sortable icon. Valid values include left and right.',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'right' }
            }
        }
    }
};

const Template = (args) => List(args);

const items = [
    {
        label: 'Item 1',
        href: '',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        infos: [
            { label: 'info 1', href: '' },
            { label: 'info 2', href: '' }
        ],
        icons: [
            {
                iconName: 'utility:share',
                alternativeText: 'share button',
                title: 'Share'
            },
            {
                iconName: 'utility:refresh',
                alternativeText: 'refresh button',
                title: 'Refresh'
            }
        ]
    },
    {
        label: 'Item 2',
        href: '/path/to_somewhere',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        infos: [
            { label: 'info 1', href: '' },
            { label: 'info 2', href: '' }
        ],
        icons: [
            {
                iconName: 'utility:share',
                alternativeText: 'share button',
                title: 'Share'
            },
            {
                iconName: 'utility:refresh',
                alternativeText: 'refresh button',
                title: 'Refresh'
            }
        ]
    },
    {
        label: 'Item 3',
        href: '',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        infos: [
            { label: 'info 1', href: '' },
            { label: 'info 2', href: '' }
        ],
        icons: [
            {
                iconName: 'utility:share',
                alternativeText: 'share button',
                title: 'Share'
            },
            {
                iconName: 'utility:refresh',
                alternativeText: 'refresh button',
                title: 'Refresh'
            }
        ]
    },
    {
        label: 'Item 4',
        href: '',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        infos: [
            { label: 'info 1', href: '' },
            { label: 'info 2', href: '' }
        ],
        icons: [
            {
                iconName: 'utility:share',
                alternativeText: 'share button',
                title: 'Share'
            },
            {
                iconName: 'utility:refresh',
                alternativeText: 'refresh button',
                title: 'Refresh'
            }
        ]
    },
    {
        label: 'Item 5',
        href: '',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        infos: [
            { label: 'info 1', href: '' },
            { label: 'info 2', href: '' }
        ],
        icons: [
            {
                iconName: 'utility:share',
                alternativeText: 'share button',
                title: 'Share'
            },
            {
                iconName: 'utility:refresh',
                alternativeText: 'refresh button',
                title: 'Refresh'
            }
        ]
    }
];

const itemsWithAvatars = [
    {
        label: 'Item 1',
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        avatarFallbackIconName: 'custom:custom5',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        infos: [
            { label: 'info 1', href: '' },
            { label: 'info 2', href: '' }
        ],
        icons: []
    },
    {
        label: 'Item 2',
        avatarFallbackIconName: 'custom:custom9',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        infos: [
            { label: 'info 1', href: '' },
            { label: 'info 2', href: '' }
        ],
        icons: []
    },
    {
        label: 'Item 3',
        avatarFallbackIconName: 'custom:custom1',
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        infos: [
            { label: 'info 1', href: '' },
            { label: 'info 2', href: '' }
        ],
        icons: []
    },
    {
        label: 'Item 4',
        avatarFallbackIconName: 'custom:custom11',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        infos: [
            { label: 'info 1', href: '' },
            { label: 'info 2', href: '' }
        ],
        icons: []
    },
    {
        label: 'Item 5',
        avatarFallbackIconName: 'custom:custom51',
        description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        infos: [
            { label: 'info 1', href: '' },
            { label: 'info 2', href: '' }
        ],
        icons: []
    }
];

export const Base = Template.bind({});
Base.args = {
    items: items
};

export const ListWithAvatars = Template.bind({});
ListWithAvatars.args = {
    label: 'List with icons',
    items: itemsWithAvatars
};

export const SortableList = Template.bind({});
SortableList.args = {
    label: 'Sortable list',
    sortable: true,
    items: items
};

export const SortableListWithAvatars = Template.bind({});
SortableListWithAvatars.args = {
    label: 'Sortable list with Icons',
    items: itemsWithAvatars,
    sortableIconName: 'utility:drag_and_drop',
    sortableIconPosition: 'left',
    sortable: true
};
