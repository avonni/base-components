import { LightningElement } from 'lwc';

export default class DynamicMenuStretched extends LightningElement {
    items = [
        {
            label: 'Acme',
            meta: ['Account', 'San Francisco'],
            value: 'acme',
            avatar: {
                fallbackIconName: 'standard:account',
                alternativeText: 'Account'
            }
        },
        {
            label: 'Remo',
            meta: ['Contact', 'San Francisco'],
            value: 'remo',
            avatar: {
                fallbackIconName: 'standard:contact',
                alternativeText: 'Contact'
            }
        },
        {
            label: 'Niko',
            meta: ['Lead', 'San Francisco'],
            value: 'niko',
            avatar: {
                fallbackIconName: 'standard:lead',
                alternativeText: 'Lead'
            }
        }
    ];
}
