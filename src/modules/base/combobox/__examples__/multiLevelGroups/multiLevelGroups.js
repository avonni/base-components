import { LightningElement } from 'lwc';

export default class ComboboxMultiLevelGroups extends LightningElement {
    options = [
        {
            label: 'Burlington Textiles Corp of America',
            value: 'burlington',
            avatarFallbackIconName: 'standard:account',
            secondaryText: 'Account - Burlington, NC',
            groups: ['accounts']
        },
        {
            label: 'Dickenson plc',
            value: 'dickenson',
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            avatarFallbackIconName: 'standard:account',
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
            secondaryText: 'Opportunity',
            groups: ['opportunities'],
            options: [
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
                    label: 'Dickenson plc',
                    value: 'no-avatar-dickenson'
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
            ]
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

    groups = [
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
}
