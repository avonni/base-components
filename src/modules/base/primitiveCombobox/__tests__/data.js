const suboptions = [
    {
        label: 'Burlington Textiles Corp of America',
        value: 'no-avatar-burlington',
        options: [
            {
                label: 'Nakatomi Investments',
                value: 'nakatomi',
                avatarFallbackIconName: 'standard:account',
                secondaryText: 'Account - Chicago, IL'
            }
        ]
    },
    {
        label: 'United Oil SLA',
        value: 'no-avatar-oil-sla'
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

export const options = [
    {
        label: 'Burlington Textiles Corp of America',
        value: 'burlington',
        avatarFallbackIconName: 'standard:account',
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
        secondaryText: 'Account - Burlington, NC'
    },
    {
        label: 'Dickenson plc',
        value: 'dickenson',
        secondaryText: 'Account - Lawrence, KS',
        groups: ['accounts']
    },
    {
        label: 'Edge Communication',
        value: 'edge',
        avatarFallbackIconName: 'standard:account',
        secondaryText: 'Account - Singapore',
        groups: ['accounts']
    },
    {
        label: 'Tyrell Corp',
        value: 'tyrell',
        avatarFallbackIconName: 'standard:opportunity',
        groups: ['opportunities'],
        options: suboptions
    },
    {
        label: 'United Oil SLA',
        value: 'oil-sla',
        avatarFallbackIconName: 'standard:opportunity',
        secondaryText: 'Opportunity - Closed',
        groups: ['opportunities', 'closed']
    },
    {
        label: 'United Oil Standby Generators',
        value: 'united-oil',
        avatarFallbackIconName: 'standard:opportunity',
        secondaryText: 'Opportunity - Closed Won',
        groups: ['opportunities', 'closed', 'won']
    }
];

export const actions = [
    {
        label: 'Action 1',
        name: 'action-1'
    },
    {
        label: 'Action 2',
        name: 'action-2',
        disabled: true,
        position: 'bottom'
    },
    {
        label: 'Action 3',
        name: 'action-3',
        iconName: 'utility:user',
        position: 'top'
    },
    {
        label: 'Action 4',
        name: 'action-4',
        position: 'top',
        iconName: 'utility:user',
        disabled: true
    },
    {
        label: 'Action 5',
        name: 'action-5',
        position: 'bottom',
        iconName: 'standard:apps'
    },
    {
        label: 'Action 6',
        name: 'action-6',
        position: 'bottom'
    }
];

export const topActions = actions.filter(
    (action) => action.position !== 'bottom'
);
export const bottomActions = actions.filter(
    (action) => action.position === 'bottom'
);

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
    },
    {
        label: 'Unused group',
        name: 'unused'
    }
];
