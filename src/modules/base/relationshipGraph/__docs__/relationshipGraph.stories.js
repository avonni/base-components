import { RelationshipGraph } from '../__examples__/relationshipGraph';

export default {
    title: 'Example/Relationship Graph',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            table: {
                type: { summary: 'string' }
            }
        }
    }
};

const groupActions = [
    {
        label: 'New',
        name: 'newGroup'
    }
];

const customGroupActions = [
    {
        label: 'Custom action 1',
        name: 'group-custom-action1',
        iconName: 'utility:add'
    },
    {
        label: 'Custom action 2',
        name: 'group-custom-action2',
        iconName: 'utility:close'
    },
    {
        label: 'Custom action 2',
        name: 'group-custom-action2',
        disabled: true
    }
];

const itemActions = [
    {
        label: 'Edit',
        name: 'edit-item'
    },
    {
        label: 'Remove',
        name: 'remove-item',
        iconName: 'utility:close'
    }
];

const customItemActions = [
    {
        label: 'Edit',
        name: 'custom-edit-item',
        iconName: 'utility:edit'
    }
];

const groups = [
    {
        // Group
        label: 'Group Relationships',
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/welcome-mat/bg-info@2x.png',
        avatarFallbackIconName: 'standard:account',
        href: 'https://www.avonni.app/',
        // Items
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
                ]
            }
        ]
    },
    // Group
    {
        label: 'Related Accounts',
        avatarFallbackIconName: 'standard:account',
        href: 'https://www.avonni.app/',
        // Items
        items: [
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
                actions: customItemActions,
                // Groups
                groups: [
                    {
                        label: 'Group Relationships',
                        avatarSrc:
                            'https://www.lightningdesignsystem.com/assets/images/welcome-mat/bg-info@2x.png',
                        avatarFallbackIconName: 'standard:account'
                    },
                    {
                        label: 'Related Contacts',
                        href: 'https://www.avonni.app/'
                    },
                    {
                        label: 'Related Accounts',
                        avatarFallbackIconName: 'standard:account',
                        href: 'https://www.avonni.app/',
                        // Items
                        items: [
                            {
                                label: 'Adams Household',
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
                            },
                            {
                                label: 'Alpine Group',
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
                                label: 'Member Relatoionships',
                                avatarFallbackIconName: 'standard:account'
                            },
                            {
                                label: 'Action Plans',
                                avatarFallbackIconName: 'standard:account'
                            }
                        ]
                    }
                ]
            },
            // Item
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
                hideDefaultActions: true
            }
        ],
        hideDefaultActions: true,
        actions: customGroupActions
    },
    // Group
    {
        label: 'Member Relationships',
        items: [
            {
                label: 'Community Recreation',
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
            }
        ]
    }
];

const Template = (args) => RelationshipGraph(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Root label',
    groups: groups,
    groupActions: groupActions,
    itemActions: itemActions
};
