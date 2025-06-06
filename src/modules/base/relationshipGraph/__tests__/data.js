export const ACTIONS = [
    {
        label: 'Add relationship',
        name: 'add-relationship',
        iconName: 'utility:add'
    },
    {
        label: 'Remove relationship',
        name: 'remove-relationship',
        disabled: true
    }
];

export const GROUPS = [
    {
        label: 'Group Relationships with a very long label',
        name: 'group-relationships',
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
        avatarFallbackIconName: 'standard:account',
        href: 'https://www.avonni.app/',
        items: [
            {
                label: 'Symonds Household',
                name: 'symonds-household',
                avatarSrc:
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
                avatarFallbackIconName: 'standard:user',
                href: 'https://www.avonni.app/',
                data: [
                    {
                        label: 'Account Name',
                        value: 'Symonds Household'
                    },
                    {
                        label: 'Total Financial Accounts',
                        value: '$324,700.00'
                    }
                ],
                groups: [
                    {
                        label: 'Group Relationships',
                        name: 'symonds-household-group-relationships',
                        items: [
                            {
                                label: 'Amine Benachraf',
                                name: 'amine-benachraf',
                                hideDefaultActions: true
                            }
                        ]
                    },
                    {
                        label: 'Related Accounts',
                        name: 'symonds-household-related-accounts'
                    },
                    {
                        label: 'Members',
                        name: 'symonds-household-members',
                        items: [
                            {
                                label: 'Neil Symonds',
                                name: 'neil-symonds',
                                avatarFallbackIconName: 'standard:user',
                                href: 'https://www.avonni.app/',
                                data: [
                                    {
                                        label: 'Account name',
                                        value: 'Neil Symonds'
                                    },
                                    {
                                        label: 'Account phone number',
                                        value: '(628) 391-9393'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        label: 'Related Accounts',
        name: 'related-accounts',
        avatarFallbackIconName: 'standard:account',
        href: 'https://www.avonni.app/',
        expanded: false,
        items: [
            {
                label: 'Cumulus Restaurants',
                name: 'cumulus-restaurants',
                avatarFallbackIconName: 'custom:custom51',
                data: [
                    {
                        label: 'Account name',
                        value: 'Cumulus Restaurants'
                    },
                    {
                        label: 'Account phone number',
                        value: '(628) 391-9393'
                    }
                ],
                hideDefaultActions: true,
                groups: [
                    {
                        label: 'Group relationships',
                        name: 'related-accounts-cumulus-restaurants-group-relationships'
                    },
                    {
                        label: 'Related contacts',
                        name: 'related-accounts-cumulus-restaurants-related-contacts'
                    }
                ]
            }
        ],
        hideDefaultActions: true
    },
    {
        label: 'Member Relationships',
        name: 'member-relationships2',
        items: [
            {
                label: 'Community Recreation',
                name: 'community-recreation',
                avatarFallbackIconName: 'standard:campaign',
                data: [
                    {
                        label: 'Account name',
                        value: 'Community Recreation'
                    },
                    {
                        label: 'Account phone number',
                        value: '(628) 391-9393'
                    },
                    {
                        label: 'Total Financial Accounts',
                        value: '$1,330'
                    }
                ]
            },
            {
                label: 'Northern Trails Outfitter',
                name: 'northern-trail-outfitter',
                avatarFallbackIconName: 'standard:case',
                data: [
                    {
                        label: 'Account name',
                        value: 'Northern Trails Outfitter'
                    },
                    {
                        label: 'Account phone number',
                        value: '(628) 391-9393'
                    }
                ],
                hideDefaultActions: true,
                groups: [
                    {
                        label: 'Group Relationships',
                        name: 'northern-trails-outfitter-group-relationships',
                        avatarSrc:
                            'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
                        avatarFallbackIconName: 'standard:account'
                    },
                    {
                        label: 'Related Contacts',
                        name: 'northern-trails-outfitter-related-contacts',
                        href: 'https://www.avonni.app/',
                        items: [
                            {
                                label: 'Ines Akwan',
                                name: 'ines-akwan',
                                groups: [
                                    {
                                        label: 'Related Accounts',
                                        name: 'related-accounts-adams-household',
                                        items: [
                                            {
                                                label: 'Lin Akwan',
                                                name: 'lin-akwan'
                                            },
                                            {
                                                label: 'Northern Trails Outfitter',
                                                name: 'related-accounts-adams-household-northern-trails-outfitter',
                                                groups: [
                                                    {
                                                        label: 'Group Relationships',
                                                        name: 'northern-trails-outfitter-group-relationships2',
                                                        items: [
                                                            {
                                                                label: 'Neil Symonds',
                                                                name: 'northern-trails-outfitter-neil-symonds',
                                                                avatarFallbackIconName:
                                                                    'standard:user',
                                                                href: 'https://www.avonni.app/',
                                                                data: [
                                                                    {
                                                                        label: 'Account name',
                                                                        value: 'Neil Symonds'
                                                                    },
                                                                    {
                                                                        label: 'Account phone number',
                                                                        value: '(628) 391-9393'
                                                                    }
                                                                ],
                                                                groups: [
                                                                    {
                                                                        label: 'Related Accounts',
                                                                        name: 'northern-trails-outfitter-neil-symonds-related-accounts',
                                                                        items: [
                                                                            {
                                                                                label: 'Mary James',
                                                                                name: 'mary-james'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        label: 'Related Accounts',
                                                        name: 'northern-trails-outfitter-related-accounts2'
                                                    },
                                                    {
                                                        label: 'Members',
                                                        name: 'northern-trails-outfitter-members'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Related Accounts',
                        name: 'northern-trails-outfitter-related-accounts',
                        avatarFallbackIconName: 'standard:account',
                        href: 'https://www.avonni.app/',
                        items: [
                            {
                                label: 'Alpine Group',
                                name: 'alpine-group',
                                avatarSrc:
                                    'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
                                avatarFallbackIconName: 'standard:user',
                                data: [
                                    {
                                        label: 'Account name',
                                        value: 'Alpine Group'
                                    },
                                    {
                                        label: 'Total Financial Accounts',
                                        value: '$0'
                                    }
                                ]
                            },
                            {
                                label: 'Member Relationships',
                                name: 'member-relationships',
                                avatarFallbackIconName: 'standard:account'
                            },
                            {
                                label: 'Action Plans',
                                name: 'action-plans',
                                avatarFallbackIconName: 'standard:account'
                            },
                            {
                                label: 'Adams Household',
                                name: 'adams-household',
                                avatarSrc:
                                    'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
                                avatarFallbackIconName: 'standard:user',
                                data: [
                                    {
                                        label: 'Account name',
                                        value: 'Adams Household'
                                    },
                                    {
                                        label: 'Total Financial Accounts',
                                        value: '$1,778,911.21'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

export const SELECTED_GROUPS = [
    {
        label: 'Group Relationships with a very long label',
        name: 'group-relationships',
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
        avatarFallbackIconName: 'standard:account',
        href: 'https://www.avonni.app/',
        selected: true,
        items: [
            {
                label: 'Symonds Household',
                name: 'symonds-household',
                avatarSrc:
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
                avatarFallbackIconName: 'standard:user',
                href: 'https://www.avonni.app/',
                data: [
                    {
                        label: 'Account Name',
                        value: 'Symonds Household'
                    },
                    {
                        label: 'Total Financial Accounts',
                        value: '$324,700.00'
                    }
                ],
                selected: true,
                groups: [
                    {
                        label: 'Group Relationships',
                        name: 'symonds-household-group-relationships',
                        items: [
                            {
                                label: 'Amine Benachraf',
                                name: 'amine-benachraf',
                                hideDefaultActions: true
                            }
                        ]
                    },
                    {
                        label: 'Related Accounts',
                        name: 'symonds-household-related-accounts'
                    },
                    {
                        label: 'Members',
                        name: 'symonds-household-members',
                        selected: true,
                        items: [
                            {
                                label: 'Neil Symonds',
                                name: 'neil-symonds',
                                avatarFallbackIconName: 'standard:user',
                                href: 'https://www.avonni.app/',
                                data: [
                                    {
                                        label: 'Account name',
                                        value: 'Neil Symonds'
                                    },
                                    {
                                        label: 'Account phone number',
                                        value: '(628) 391-9393'
                                    }
                                ],
                                activeSelection: true,
                                selected: true
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        label: 'Related Accounts',
        name: 'related-accounts',
        avatarFallbackIconName: 'standard:account',
        href: 'https://www.avonni.app/',
        expanded: false,
        items: [
            {
                label: 'Cumulus Restaurants',
                name: 'cumulus-restaurants',
                avatarFallbackIconName: 'custom:custom51',
                data: [
                    {
                        label: 'Account name',
                        value: 'Cumulus Restaurants'
                    },
                    {
                        label: 'Account phone number',
                        value: '(628) 391-9393'
                    }
                ],
                hideDefaultActions: true,
                groups: [
                    {
                        label: 'Group relationships',
                        name: 'related-accounts-cumulus-restaurants-group-relationships'
                    },
                    {
                        label: 'Related contacts',
                        name: 'related-accounts-cumulus-restaurants-related-contacts'
                    }
                ]
            }
        ],
        hideDefaultActions: true
    },
    {
        label: 'Member Relationships',
        name: 'member-relationships2',
        items: [
            {
                label: 'Community Recreation',
                name: 'community-recreation',
                avatarFallbackIconName: 'standard:campaign',
                data: [
                    {
                        label: 'Account name',
                        value: 'Community Recreation'
                    },
                    {
                        label: 'Account phone number',
                        value: '(628) 391-9393'
                    },
                    {
                        label: 'Total Financial Accounts',
                        value: '$1,330'
                    }
                ]
            },
            {
                label: 'Northern Trails Outfitter',
                name: 'northern-trail-outfitter',
                avatarFallbackIconName: 'standard:case',
                data: [
                    {
                        label: 'Account name',
                        value: 'Northern Trails Outfitter'
                    },
                    {
                        label: 'Account phone number',
                        value: '(628) 391-9393'
                    }
                ],
                hideDefaultActions: true,
                groups: [
                    {
                        label: 'Group Relationships',
                        name: 'northern-trails-outfitter-group-relationships',
                        avatarSrc:
                            'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
                        avatarFallbackIconName: 'standard:account'
                    },
                    {
                        label: 'Related Contacts',
                        name: 'northern-trails-outfitter-related-contacts',
                        href: 'https://www.avonni.app/',
                        items: [
                            {
                                label: 'Ines Akwan',
                                name: 'ines-akwan',
                                groups: [
                                    {
                                        label: 'Related Accounts',
                                        name: 'related-accounts-adams-household',
                                        items: [
                                            {
                                                label: 'Lin Akwan',
                                                name: 'lin-akwan'
                                            },
                                            {
                                                label: 'Northern Trails Outfitter',
                                                name: 'related-accounts-adams-household-northern-trails-outfitter',
                                                groups: [
                                                    {
                                                        label: 'Group Relationships',
                                                        name: 'northern-trails-outfitter-group-relationships2',
                                                        items: [
                                                            {
                                                                label: 'Neil Symonds',
                                                                name: 'northern-trails-outfitter-neil-symonds',
                                                                avatarFallbackIconName:
                                                                    'standard:user',
                                                                href: 'https://www.avonni.app/',
                                                                data: [
                                                                    {
                                                                        label: 'Account name',
                                                                        value: 'Neil Symonds'
                                                                    },
                                                                    {
                                                                        label: 'Account phone number',
                                                                        value: '(628) 391-9393'
                                                                    }
                                                                ],
                                                                groups: [
                                                                    {
                                                                        label: 'Related Accounts',
                                                                        name: 'northern-trails-outfitter-neil-symonds-related-accounts',
                                                                        items: [
                                                                            {
                                                                                label: 'Mary James',
                                                                                name: 'mary-james'
                                                                            }
                                                                        ]
                                                                    }
                                                                ]
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        label: 'Related Accounts',
                                                        name: 'northern-trails-outfitter-related-accounts2'
                                                    },
                                                    {
                                                        label: 'Members',
                                                        name: 'northern-trails-outfitter-members'
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        label: 'Related Accounts',
                        name: 'northern-trails-outfitter-related-accounts',
                        avatarFallbackIconName: 'standard:account',
                        href: 'https://www.avonni.app/',
                        items: [
                            {
                                label: 'Alpine Group',
                                name: 'alpine-group',
                                avatarSrc:
                                    'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
                                avatarFallbackIconName: 'standard:user',
                                data: [
                                    {
                                        label: 'Account name',
                                        value: 'Alpine Group'
                                    },
                                    {
                                        label: 'Total Financial Accounts',
                                        value: '$0'
                                    }
                                ]
                            },
                            {
                                label: 'Member Relationships',
                                name: 'member-relationships',
                                avatarFallbackIconName: 'standard:account'
                            },
                            {
                                label: 'Action Plans',
                                name: 'action-plans',
                                avatarFallbackIconName: 'standard:account'
                            },
                            {
                                label: 'Adams Household',
                                name: 'adams-household',
                                avatarSrc:
                                    'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
                                avatarFallbackIconName: 'standard:user',
                                data: [
                                    {
                                        label: 'Account name',
                                        value: 'Adams Household'
                                    },
                                    {
                                        label: 'Total Financial Accounts',
                                        value: '$1,778,911.21'
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];
