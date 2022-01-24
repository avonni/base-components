import { LightningElement } from 'lwc';

export default class VisualPickerCoverable extends LightningElement {
    items = [
        {
            title: 'Lightning Professional',
            description: 'Complete service CRM for teams of any size',
            value: 'lightning-professional',
            figure: {
                title: '$30',
                description: 'USD/user/month *',
                avatar: {
                    iconName: 'standard:user'
                }
            }
        },
        {
            title: 'Lightning Enterprise',
            description:
                'Everything you need to take support to the next level',
            value: 'lightning-enterprise',
            figure: {
                title: '$150',
                description: 'USD/user/month *',
                avatar: {
                    iconName: 'standard:groups'
                }
            }
        },
        {
            title: 'Lightning Enterprise Plus',
            description: 'Example of a disabled tile',
            value: 'lightning-enterprise-plus',
            disabled: true,
            figure: {
                title: '$220',
                description: 'USD/user/month *',
                avatar: {
                    iconName: 'standard:account'
                }
            }
        },
        {
            title: 'Lightning Unlimited',
            description: 'Complete support with enterprise-grade customization',
            value: 'lightning-unlimited',
            figure: {
                title: '$300',
                description: 'USD/user/month *',
                avatar: {
                    iconName: 'custom:custom68'
                }
            }
        }
    ];
}
