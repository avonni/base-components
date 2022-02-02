import { LightningElement } from 'lwc';

export default class VisualPickerItemsWithTags extends LightningElement {
    items = [
        {
            itemTitle: 'Lightning Professional',
            itemDescription: 'Complete service CRM for teams of any size',
            value: 'lightning-professional',
            title: '$30',
            description: 'USD/user/month *',
            avatar: {
                iconName: 'standard:user'
            },
            tags: [
                {
                    label: 'Best Value'
                }
            ]
        },
        {
            itemTitle: 'Lightning Enterprise',
            itemDescription:
                'Everything you need to take support to the next level',
            value: 'lightning-enterprise',
            title: '$150',
            description: 'USD/user/month *',
            avatar: {
                iconName: 'standard:groups'
            },
            tags: [
                {
                    label: 'Best Seller',
                    variant: 'success'
                }
            ]
        },
        {
            itemTitle: 'Lightning Enterprise Plus',
            itemDescription: 'Example of a disabled tile',
            value: 'lightning-enterprise-plus',
            disabled: true,
            title: '$220',
            description: 'USD/user/month *',
            avatar: {
                iconName: 'standard:account'
            },
            tags: [
                {
                    label: 'Unavailable',
                    variant: 'error'
                }
            ]
        },
        {
            itemTitle: 'Lightning Unlimited',
            itemDescription:
                'Complete support with enterprise-grade customization',
            value: 'lightning-unlimited',
            title: '$300',
            description: 'USD/user/month *',
            avatar: {
                iconName: 'custom:custom68'
            }
        }
    ];
}
