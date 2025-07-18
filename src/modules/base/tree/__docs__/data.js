export const ACTIONS = [
    {
        name: 'Standard.Tree.Edit',
        label: 'Edit',
        iconName: 'utility:edit',
        visible: true
    },
    {
        name: 'Standard.Tree.Add',
        label: 'Add',
        visible: true,
        iconName: 'utility:add'
    },
    {
        name: 'Standard.Tree.Duplicate',
        label: 'Duplicate'
    },
    {
        name: 'Standard.Tree.Delete',
        label: 'Delete'
    },
    {
        name: 'customAction',
        label: 'Custom action'
    }
];

export const ACTIONS_WHEN_DISABLED = [
    {
        name: 'Standard.Tree.Edit',
        label: 'Edit',
        iconName: 'utility:edit',
        visible: true
    },
    {
        name: 'Standard.Tree.Delete',
        label: 'Delete',
        iconName: 'utility:delete',
        visible: true
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
                iconName: 'utility:record_alt',
                href: '#record1',
                name: 'node1-1',
                unselectable: true,
                items: [
                    {
                        label: 'Go to Record 1.1.1',
                        href: '#record1',
                        name: 'node1-1-1',
                        items: [
                            {
                                label: 'Go to Record 1.1.1.1',
                                href: '#record1',
                                name: 'node1-1-1-1',
                                noSlots: true
                            },
                            {
                                label: 'Go to Record 1.1.1.2',
                                href: '#record1',
                                name: 'node1-1-1-2',
                                noSlots: true
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
        enableInfiniteLoading: true,
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
        name: 'node5',
        actions: [{ name: 'record5Action', label: 'Record 5 action' }]
    },
    {
        label: 'Go to Record 6',
        href: '#record6',
        name: 'node6'
    },
    {
        label: 'Go to Record 7',
        href: '#record7',
        name: 'node7',
        actions: [{ name: 'record7Action', label: 'Record 7 action' }]
    },
    {
        label: 'Go to Record 8',
        href: '#record8',
        name: 'node8',
        slottableTypes: ['type2'],
        type: 'type1',
        hiddenActions: ['Standard.Tree.Edit', 'Standard.Tree.Duplicate']
    },
    {
        label: 'Go to Record 9',
        href: '#record9',
        name: 'node9',
        slottableTypes: ['type1', 'type2'],
        type: 'type1'
    }
];

export const ITEMS_WITH_WITH_TYPES = [
    {
        label: 'Go to Record 1',
        href: '#record1',
        name: 'node1',
        metatext: 'example of metatext',
        items: [
            {
                label: 'Go to Record 1.1',
                iconName: 'utility:record_alt',
                href: '#record1',
                name: 'node1-1',
                unselectable: true,
                type: 'child'
            },
            {
                label: 'Go to Record 1.2',
                href: '#record1',
                name: 'node1-2',
                type: 'child'
            },
            {
                label: 'Go to Record 1.3',
                href: '#record1',
                name: 'node1-3',
                type: 'child',
                slottableTypes: ['standard', 'child']
            }
        ]
    },
    {
        label: 'Loading Record',
        href: '#record2',
        isLoading: true,
        enableInfiniteLoading: true,
        name: 'node2',
        items: [
            {
                label: 'Already loaded record',
                name: 'loaded-record'
            }
        ],
        type: 'standard',
        slottableTypes: ['child']
    },
    {
        label: 'Go to Record 3',
        href: '#record3',
        name: 'node3',
        type: 'standard',
        slottableTypes: ['standard']
    },
    {
        label: 'Go to Record 4',
        href: '#record4',
        name: 'node4',
        type: 'standard',
        slottableTypes: []
    },
    {
        label: 'Go to Record 5',
        href: '#record5',
        name: 'node5',
        type: 'standard'
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
