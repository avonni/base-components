import { LightningElement } from 'lwc';

export default class VerticalVisualPickerBase extends LightningElement {
    items = [
        {
            title: 'Lightning Professional',
            description: 'Complete service CRM for teams of any size.',
            value: 'lightning-professional',
            iconName: 'standard:user'
        },
        {
            title: 'Lightning Enterprise',
            description:
                'Everything you need to take support to the next level.',
            value: 'lightning-enterprise',
            iconName: 'standard:groups'
        },
        {
            title: 'Lightning Enterprise Plus',
            description: 'Example of a disabled tile.',
            value: 'lightning-enterprise-plus',
            disabled: true,
            iconName: 'standard:account'
        },
        {
            title: 'Lightning Unlimited',
            description:
                'Complete support with enterprise-grade customization.',
            value: 'lightning-unlimited',
            iconName: 'custom:custom68'
        }
    ];
}
