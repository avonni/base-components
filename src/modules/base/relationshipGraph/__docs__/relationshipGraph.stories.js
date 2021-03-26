import { RelationshipGraph } from '../__examples__/relationshipGraph';

export default {
    title: 'Example/Relationship Graph',
    argTypes: {
        label: {
            control: {
                type: 'text'
            },
            description: 'Root label.',
            type: { required: true },
            table: {
                type: { summary: 'string' }
            }
        },
        avatarSrc: {
            name: 'avatar-src',
            control: {
                type: 'text'
            },
            description:
                'Image URL for the avatar of the root item. If present, the avatar is displayed before the label.',
            table: {
                type: { summary: 'string' }
            }
        },
        avatarFallbackIconName: {
            name: 'avatar-fallback-icon-name',
            control: {
                type: 'text'
            },
            description:
                "The Lightning Design System name of the icon used as a fallback when the root avatar image fails to load. \nSpecify the name in the format 'utility:down' where 'utility' is the category, and 'down' is the specific icon to be displayed.",
            table: {
                type: { summary: 'string' }
            }
        },
        href: {
            control: {
                type: 'text'
            },
            description: 'URL for the root label link.',
            table: {
                type: { summary: 'string' }
            }
        },
        variant: {
            control: {
                type: 'text'
            },
            description: 'Valid values include horizontal, vertical.',
            defaultValue: 'horizontal',
            table: {
                type: { summary: 'string' },
                defaultValue: { summary: 'horizontal' }
            }
        },
        selectedItemName: {
            name: 'selected-item-name',
            control: {
                type: 'text'
            },
            description: 'Name of the selected item.',
            table: {
                type: { summary: 'string' }
            }
        },
        groups: {
            control: {
                type: 'object'
            },
            description: 'Array of item groups.',
            table: {
                type: { summary: 'object[]' }
            }
        },
        shrinkIconName: {
            name: 'shrink-icon-name',
            control: {
                type: 'text'
            },
            defaultValue: 'utility:chevrondown',
            description: 'Icon used to shrink an expanded group of items.',
            table: {
                type: { summary: 'object[]' },
                defaultValue: { summary: 'utility:chevrondown' }
            }
        },
        expandIconName: {
            name: 'expand-icon-name',
            control: {
                type: 'text'
            },
            defaultValue: 'utility:chevronright',
            description: 'Icon used to expand a closed group of items.',
            table: {
                type: { summary: 'object[]' },
                defaultValue: { summary: 'utility:chevronright' }
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
        name: 'group-custom-action3',
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
        name: 'group-relationships',
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
                ],
                groups: [
                    {
                        label: 'Group Relationships',
                        name: 'symonds-household-group-relationships'
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
    // Group
    {
        label: 'Related Accounts',
        name: 'related-accounts',
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
                        name: 'northern-trails-outfitter-group-relationships',
                        avatarSrc:
                            'https://www.lightningdesignsystem.com/assets/images/welcome-mat/bg-info@2x.png',
                        avatarFallbackIconName: 'standard:account'
                    },
                    {
                        label: 'Related Contacts',
                        name: 'northern-trails-outfitter-related-contacts',
                        href: 'https://www.avonni.app/'
                    },
                    {
                        label: 'Related Accounts',
                        name: 'northern-trails-outfitter-related-accounts',
                        avatarFallbackIconName: 'standard:account',
                        href: 'https://www.avonni.app/',
                        // Items
                        items: [
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
                                ],
                                groups: [
                                    {
                                        label: 'Related Accounts',
                                        name:
                                            'related-accounts-adams-household',
                                        items: [
                                            {
                                                label:
                                                    'Northern Trails Outfitter',
                                                name:
                                                    'related-accounts-adams-household-northern-trails-outfitter'
                                            }
                                        ]
                                    }
                                ]
                            },
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
            }
        ]
    }
];

const Template = (args) => RelationshipGraph(args);

export const Base = Template.bind({});
Base.args = {
    label: 'Root label',
    avatarSrc:
        'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
    href: 'https://www.avonni.app/',
    groups: groups,
    groupActions: groupActions,
    itemActions: itemActions,
    selectedItemName: 'adams-household'
};

export const Vertical = Template.bind({});
Vertical.args = {
    label: 'Root label',
    avatarFallbackIconName: 'standard:user',
    groups: groups,
    groupActions: groupActions,
    itemActions: itemActions,
    variant: 'vertical'
};
