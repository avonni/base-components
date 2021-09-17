import { LightningElement } from 'lwc';

export default class DynamicMenuInButtonGroup extends LightningElement {
    items = [
        {
            label: 'Acme',
            meta: ['Account', 'San Francisco'],
            id: 0,
            value: 'acme',
            avatar: {
                fallbackIconName: 'standard:account',
                alternativeText: 'Account'
            }
        },
        {
            label: 'Remo',
            meta: ['Contact', 'San Francisco'],
            id: 1,
            value: 'remo',
            avatar: {
                fallbackIconName: 'standard:contact',
                alternativeText: 'Contact'
            }
        },
        {
            label: 'Niko',
            meta: ['Lead', 'San Francisco'],
            id: 2,
            value: 'niko',
            avatar: {
                fallbackIconName: 'standard:lead',
                alternativeText: 'Lead'
            }
        }
    ];
}
