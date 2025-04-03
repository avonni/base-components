export const ACTIONS = [
    {
        label: 'Action 1',
        name: 'action-1'
    },
    {
        label: 'Action 2',
        name: 'action-2'
    },
    {
        label: 'Action 3',
        name: 'action-3'
    }
];

export const GROUPS = [
    {
        label: 'Group 2',
        name: 'group-2'
    },
    {
        label: 'Group 1',
        name: 'group-1',
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        avatarFallbackIconName: 'utility:user',
        href: 'https://www.avonni.app/',
        items: [
            {
                label: 'Item',
                name: 'item'
            }
        ],
        expanded: true,
        hideDefaultActions: true,
        actions: [
            {
                label: 'Action',
                name: 'action'
            }
        ],
        selected: true
    },
    {
        label: 'Group 3',
        name: 'group-3'
    }
];

export const SELECTED_GROUPS = [
    {
        label: 'Child group 1',
        name: 'child-group-1'
    },
    {
        label: 'Child group 2',
        name: 'child-group-2'
    },
    {
        label: 'Child group 3',
        name: 'child-group-3'
    }
];
