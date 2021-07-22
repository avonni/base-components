import { LightningElement } from 'lwc';

export default class ComboboxScopesWithIcons extends LightningElement {
    options = [
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
    ];

    scopes = [
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

    scopesGroups = [
        {
            label: 'Suggested for you',
            name: 'suggested'
        }
    ];
}
