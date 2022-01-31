import { LightningElement } from 'lwc';

export default class VerticalVisualPickerBaseWithIcons extends LightningElement {
    items = [
        {
            title: 'Lightning Professional',
            description: 'Complete service CRM for teams of any size.',
            value: 'lightning-professional',
            avatar: {
                alternativeText: 'Icon',
                iconName: 'standard:user'
            }
        },
        {
            title: 'Lightning Enterprise',
            description:
                'Everything you need to take support to the next level.',
            value: 'lightning-enterprise',
            avatar: {
                alternativeText: 'Icon',
                iconName: 'standard:groups'
            }
        },
        {
            title: 'Lightning Enterprise Plus',
            description: 'Example of a disabled tile.',
            value: 'lightning-enterprise-plus',
            disabled: true,
            avatar: {
                alternativeText: 'Icon',
                iconName: 'standard:account'
            }
        },
        {
            title: 'Lightning Unlimited',
            description:
                'Complete support with enterprise-grade customization.',
            value: 'lightning-unlimited',
            avatar: {
                alternativeText: 'Icon',
                iconName: 'custom:custom68'
            }
        }
    ];
}
