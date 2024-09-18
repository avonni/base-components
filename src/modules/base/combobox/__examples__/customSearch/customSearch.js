import { LightningElement } from 'lwc';

export default class ComboboxCustomSearch extends LightningElement {
    actions = [
        {
            label: 'Create New Opportunity',
            name: 'new-opportunity',
            iconName: 'utility:add',
            displayOnSearch: true,
            displayWhenNoResults: true
        }
    ];

    options = [
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
            secondaryText: 'Account - Lawrence, KS'
        },
        {
            label: 'Edge Communication',
            value: 'edge',
            avatar: {
                fallbackIconName: 'standard:account'
            },
            secondaryText: 'Account - Singapore'
        },
        {
            label: 'Tyrell Corp',
            value: 'tyrell',
            avatar: {
                fallbackIconName: 'standard:opportunity'
            },
            secondaryText: 'Opportunity',
            options: [
                {
                    label: 'Burlington Textiles Corp of America',
                    value: 'no-avatar-burlington',
                    options: [
                        {
                            label: 'Nakatomi Investments',
                            value: 'nakatomi',
                            avatar: {
                                fallbackIconName: 'standard:account'
                            },
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
            avatar: {
                fallbackIconName: 'standard:opportunity'
            },
            secondaryText: 'Opportunity - Closed'
        },
        {
            label: 'United Oil Standby Generators',
            value: 'united-oil',
            avatar: {
                fallbackIconName: 'standard:opportunity'
            },
            secondaryText: 'Opportunity - Closed Won'
        }
    ];

    search = (props) => {
        const optionsArray = props.options;
        const searchTerm = props.searchTerm;
        return optionsArray.filter((option) => {
            return option.secondaryText
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        });
    };
}
