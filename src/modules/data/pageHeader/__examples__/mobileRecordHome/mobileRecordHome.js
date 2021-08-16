import { LightningElement } from 'lwc';

export default class PageHeaderMobileRecordHome extends LightningElement {
    fields = [
        {
            label: 'Currency',
            value: 70,
            type: 'currency',
            typeAttributes: {
                currencyCode: 'EUR',
                currencyDisplayAs: 'name',
                minimumIntegerDigits: 2
            }
        },
        {
            label: 'Email',
            value: 'Avonni@Avonni.com',
            type: 'email',
            typeAttributes: {
                hideIcon: 'true'
            }
        },
        {
            label: 'Date',
            value: '1991-12-10',
            type: 'date',
            typeAttributes: {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            }
        },
        {
            label: 'Text',
            value: 'This is a text',
            typeAttributes: {
                linkify: 'false'
            }
        },
        {
            label: 'URL',
            value: 'salesforce.com',
            type: 'url',
            typeAttributes: {
                tooltip: 'Use full domain name',
                target: '_blank'
            }
        },
        {
            label: 'Number',
            value: '11',
            type: 'number',
            typeAttributes: {
                minimumIntegerDigits: 2,
                minimumFractionDigits: 2
            }
        }
    ];
}
