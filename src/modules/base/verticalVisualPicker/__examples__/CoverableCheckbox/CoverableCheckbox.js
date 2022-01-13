import { LightningElement } from 'lwc';

export default class VerticalVisualPickerBaseWithoutIcon extends LightningElement {
    value = ['lightning-professional', 'lightning-unlimited'];

    items = [
        {
            title: 'Lightning Professional',
            description: 'Complete service CRM for teams of any size.',
            value: 'lightning-professional'
        },
        {
            title: 'Lightning Enterprise',
            description:
                'Everything you need to take support to the next level.',
            value: 'lightning-enterprise'
        },
        {
            title: 'Lightning Enterprise Plus',
            description: 'Example of a disabled tile.',
            value: 'lightning-enterprise-plus',
            disabled: true
        },
        {
            title: 'Lightning Unlimited',
            description:
                'Complete support with enterprise-grade customization.',
            value: 'lightning-unlimited'
        }
    ];
}
