export const options = [
    {
        avatar: {
            fallbackIconName: 'standard:account'
        },
        groups: ['accounts'],
        label: 'Burlington Textiles Corp of America',
        secondaryText: 'Account - Burlington, NC',
        value: 'burlington',
        hasAvatar: true,
        computedClass: 'combobox__option',
        options: []
    },
    {
        label: 'Dickenson plc',
        value: 'dickenson',
        computedClass: 'combobox__option',
        hasChildren: true,
        options: [
            {
                avatar: {
                    fallbackIconName: 'standard:opportunity'
                },
                groups: ['opportunities'],
                label: 'Tyrell Corp',
                options: [],
                secondaryText: 'Opportunity',
                value: 'tyrell',
                hasAvatar: true,
                computedClass: 'combobox__option'
            }
        ],
        groups: [
            {
                label: 'Some group',
                name: 'some-group',
                options: [
                    {
                        label: 'Sub-option',
                        name: 'suboption'
                    }
                ]
            }
        ]
    },
    {
        avatar: {
            fallbackIconName: 'standard:account'
        },
        groups: ['accounts'],
        label: 'Edge Communication',
        secondaryText: 'Account - Singapore',
        value: 'edge',
        hasAvatar: true,
        showCheckmark: true,
        computedClass: 'combobox__option',
        options: []
    }
];

export const groups = [
    {
        label: 'Accounts',
        name: 'accounts',
        options: options
    },
    {
        label: 'Opportunities',
        name: 'opportunities',
        options: [
            {
                avatar: {
                    fallbackIconName: 'standard:opportunity'
                },
                groups: ['opportunities'],
                label: 'Tyrell Corp',
                options: options,
                secondaryText: 'Opportunity',
                value: 'tyrell',
                hasAvatar: true,
                computedClass: 'combobox__option'
            }
        ],
        groups: [
            {
                label: 'Closed',
                name: 'closed',
                options: [
                    {
                        avatar: {
                            fallbackIconName: 'standard:opportunity'
                        },
                        groups: ['opportunities', 'closed'],
                        label: 'United Oil SLA',
                        secondaryText: 'Opportunity - Closed',
                        value: 'oil-sla',
                        hasAvatar: true,
                        computedClass: 'combobox__option',
                        options: []
                    }
                ],
                groups: [
                    {
                        label: 'Won',
                        name: 'won',
                        options: [
                            {
                                avatar: {
                                    fallbackIconName: 'standard:opportunity'
                                },
                                groups: ['opportunities', 'closed', 'won'],
                                label: 'United Oil Standby Generators',
                                secondaryText: 'Opportunity - Closed Won',
                                value: 'united-oil',
                                hasAvatar: true,
                                showCheckmark: true,
                                computedClass: 'combobox__option',
                                options: []
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
