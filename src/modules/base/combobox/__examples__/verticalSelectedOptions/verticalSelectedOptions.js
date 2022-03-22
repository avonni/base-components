import { LightningElement } from 'lwc';

export default class ComboboxVerticalSelectedOptions extends LightningElement {
    actions = [
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

    options = [
        {
            label: 'Burlington Textiles Corp of America',
            value: 'burlington',
            avatarFallbackIconName: 'standard:account',
            secondaryText: 'Account - Burlington, NC'
        },
        {
            label: 'Dickenson plc',
            value: 'dickenson',
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            avatarFallbackIconName: 'standard:account',
            secondaryText: 'Account - Lawrence, KS'
        },
        {
            label: 'Edge Communication',
            value: 'edge',
            avatarFallbackIconName: 'standard:account',
            secondaryText: 'Account - Singapore'
        },
        {
            label: 'Tyrell Corp',
            value: 'tyrell',
            avatarFallbackIconName: 'standard:opportunity',
            secondaryText: 'Opportunity',
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
            ]
        },
        {
            label: 'United Oil SLA',
            value: 'oil-sla',
            avatarFallbackIconName: 'standard:opportunity',
            secondaryText: 'Opportunity - Closed'
        },
        {
            label: 'United Oil Standby Generators',
            value: 'united-oil',
            avatarFallbackIconName: 'standard:opportunity',
            secondaryText: 'Opportunity - Closed Won'
        }
    ];

    value = ['tyrell', 'oil-sla', 'dickenson'];
}
