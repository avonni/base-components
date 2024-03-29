export const options = [
    {
        label: 'Burlington Textiles Corp of America',
        value: 'no-avatar-burlington',
        options: [
            {
                label: 'Nakatomi Investments',
                value: 123,
                avatar: {
                    fallbackIconName: 'standard:account'
                },
                secondaryText: 'Account - Chicago, IL'
            }
        ]
    },
    {
        label: 'Dickenson plc',
        value: 45
    },
    {
        label: 'United Oil SLA',
        value: 'no-avatar-oil-sla',
        isLoading: true
    },
    {
        label: 'United Oil Standby Generators',
        value: 'no-avatar-united-oil'
    },
    {
        label: 'Edge Communication',
        value: 'no-avatar-edge'
    }
];

export const optionsWithAvatars = [
    {
        label: 'Burlington Textiles Corp of America',
        value: 'burlington',
        avatar: {
            fallbackIconName: 'standard:account'
        },
        secondaryText: 'Account - Burlington, NC',
        groups: ['accounts']
    },
    {
        label: 'Dickenson plc',
        value: 'dickenson',
        avatar: {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            fallbackIconName: 'standard:account'
        },
        secondaryText: 'Account - Lawrence, KS',
        groups: ['accounts']
    },
    {
        label: 'Edge Communication',
        value: 'edge',
        avatar: {
            fallbackIconName: 'standard:account'
        },
        secondaryText: 'Account - Singapore',
        groups: ['accounts']
    },
    {
        label: 'Tyrell Corp',
        value: 'tyrell',
        avatar: {
            fallbackIconName: 'standard:opportunity'
        },
        secondaryText: 'Opportunity',
        groups: ['opportunities'],
        options: options
    },
    {
        label: 'United Oil SLA',
        value: 'oil-sla',
        disabled: true,
        avatar: {
            fallbackIconName: 'standard:opportunity'
        },
        secondaryText: 'Opportunity - Closed',
        groups: ['opportunities', 'closed']
    },
    {
        label: 'United Oil Standby Generators',
        value: 'united-oil',
        avatar: {
            fallbackIconName: 'standard:opportunity'
        },
        secondaryText: 'Opportunity - Closed Won',
        groups: ['opportunities', 'closed', 'won']
    }
];

export const actions = [
    {
        label: 'New Account',
        name: 'new-account',
        iconName: 'utility:add',
        position: 'bottom',
        fixed: true
    },
    {
        label: 'New Opportunity',
        name: 'new-opportunity',
        iconName: 'utility:add',
        position: 'bottom',
        disabled: true
    },
    {
        label: 'United',
        name: 'search-united',
        iconName: 'utility:search',
        fixed: true
    }
];

export const scopes = [
    {
        label: 'All',
        value: 'all',
        groups: ['suggested']
    },
    {
        label: 'Accounts',
        value: 'accounts',
        groups: ['suggested']
    },
    {
        label: 'Analytics',
        value: 'analytics',
        groups: ['suggested']
    }
];

export const scopesWithIcons = [
    {
        label: 'Apex',
        value: 'apex',
        iconName: 'utility:apex'
    },
    {
        label: 'Decisions',
        value: 'decisions',
        iconName: 'utility:signpost'
    },
    {
        label: 'Rules',
        value: 'rules',
        iconName: 'utility:rules'
    },
    {
        label: 'Snippets',
        value: 'snippets',
        iconName: 'utility:snippet'
    }
];

export const scopesGroups = [
    {
        label: 'Suggested for you',
        name: 'suggested'
    }
];

export const groups = [
    {
        label: 'Accounts',
        name: 'accounts'
    },
    {
        label: 'Opportunities',
        name: 'opportunities'
    },
    {
        label: 'Closed',
        name: 'closed'
    },
    {
        label: 'Won',
        name: 'won'
    }
];
