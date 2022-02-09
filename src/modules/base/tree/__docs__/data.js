export const ACTIONS = [
    {
        name: 'edit',
        label: 'Edit',
        iconName: 'utility:edit',
        alwaysVisible: true
    },
    {
        name: 'add',
        label: 'Add',
        alwaysVisible: true,
        iconName: 'utility:add'
    },
    {
        name: 'duplicate',
        label: 'Duplicate'
    },
    {
        name: 'delete',
        label: 'Delete'
    },
    {
        name: 'customAction',
        label: 'Custom action'
    }
];

export const ACTIONS_WHEN_DISABLED = [
    {
        name: 'edit',
        label: 'Edit',
        iconName: 'utility:edit',
        alwaysVisible: true
    },
    {
        name: 'delete',
        label: 'Delete',
        iconName: 'utility:delete',
        alwaysVisible: true
    },
    {
        name: 'enable',
        label: 'Custom action for disabled items',
        iconName: 'utility:all'
    }
];

export const ITEMS = [
    {
        label: 'Go to Record 1',
        href: '#record1',
        name: 'node1',
        metatext: 'example of metatext',
        items: [
            {
                label: 'Go to Record 1.1',
                href: '#record1',
                name: 'node1-1',
                items: [
                    {
                        label: 'Go to Record 1.1.1',
                        href: '#record1',
                        name: 'node1-1-1',
                        items: [
                            {
                                label: 'Go to Record 1.1.1.1',
                                href: '#record1',
                                name: 'node1-1-1-1'
                            },
                            {
                                label: 'Go to Record 1.1.1.2',
                                href: '#record1',
                                name: 'node1-1-1-2'
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Go to Record 1.2',
                href: '#record1',
                name: 'node1-2',
                items: [
                    {
                        label: 'Go to Record 1.2.1',
                        href: '#record1',
                        name: 'node1-2-1',
                        items: [
                            {
                                label: 'Go to Record 1.2.1.1',
                                href: '#record1',
                                name: 'node1-2-1-1'
                            }
                        ],
                        expanded: true
                    },
                    {
                        label: 'Go to Record 1.2.2',
                        href: '#record1',
                        name: 'node1-2-2'
                    }
                ]
            }
        ]
    },
    {
        label: 'Loading Record',
        href: '#record2',
        isLoading: true,
        name: 'node2',
        items: [
            {
                label: 'Already loaded record',
                name: 'loaded-record'
            }
        ]
    },
    {
        label: 'Go to Record 3',
        href: '#record3',
        name: 'node3'
    },
    {
        label: 'Disabled Record',
        href: '#record4',
        name: 'node4',
        disabled: true,
        isLoading: true
    },
    {
        label: 'Go to Record 5',
        href: '#record5',
        name: 'node5'
    },
    {
        label: 'Go to Record 6',
        href: '#record6',
        name: 'node6'
    },
    {
        label: 'Go to Record 7',
        href: '#record7',
        name: 'node7'
    }
];

export const ITEMS_WITH_FIELDS = [
    {
        label: 'Employee 1',
        name: 'employee1',
        avatar: {
            fallbackIconName: 'standard:account',
            size: 'small',
            initials: 'HK'
        }
    },
    {
        label: 'Employee 2',
        name: 'employee2',
        fields: [
            {
                label: 'Status',
                value: 40,
                type: 'percent'
            }
        ],
        avatar: {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
            size: 'small',
            variant: 'circle'
        },
        items: [
            {
                label: 'Employee 2.1',
                name: 'employee2-1',
                avatar: {
                    src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
                    size: 'small',
                    variant: 'circle'
                },
                fields: [
                    {
                        label: 'Product',
                        value: 'Super Software'
                    },
                    {
                        label: 'Start Date',
                        value: new Date(2022, 0, 28),
                        type: 'date'
                    }
                ]
            },
            {
                label: 'Employee 2.2',
                name: 'employee2-2',
                avatar: {
                    fallbackIconName: 'standard:account',
                    size: 'small',
                    variant: 'circle',
                    initials: 'JG'
                }
            },
            {
                label: 'Employee 2.3',
                name: 'employee2-3',
                avatar: {
                    size: 'small',
                    variant: 'circle',
                    fallbackIconName: 'standard:user',
                    presence: 'online',
                    presencePosition: 'top-right'
                },
                fields: [
                    {
                        label: 'Product',
                        value: 'Another Software'
                    },
                    {
                        label: 'Contact',
                        value: '+15145550000',
                        type: 'phone'
                    },
                    {
                        label: 'Start Date',
                        value: new Date(2021, 10, 10),
                        type: 'date'
                    }
                ]
            }
        ]
    },
    {
        label: 'Employee 3',
        name: 'employee3',
        metatext: 'Metatext is always visible',
        avatar: {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
            size: 'small',
            variant: 'circle'
        },
        fields: [
            {
                label: 'Status',
                value: 60,
                type: 'percent'
            }
        ],
        items: [
            {
                label: 'Employee 3.1',
                name: 'employee3-1'
            },
            {
                label: 'Employee 3.2',
                name: 'employee3-2',
                fields: [
                    {
                        label: 'Employees Assigned',
                        value: 56,
                        type: 'number'
                    },
                    {
                        label: 'Employees Available',
                        value: 32,
                        type: 'number'
                    }
                ]
            }
        ]
    }
];
