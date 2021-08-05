import { LightningElement } from 'lwc';

export default class DatatableWithSummarizeTypes extends LightningElement {
    columns = [
        {
            label: 'Status',
            fieldName: 'badge',
            type: 'badge',
            typeAttributes: {
                variant: { fieldName: 'badgeVariant' }
            }
        },
        {
            label: 'Price',
            fieldName: 'currency',
            type: 'currency',
            typeAttributes: {
                currencyCode: 'CAD'
            },
            editable: true,
            summarizeTypes: [
                'count',
                'countUnique',
                'average',
                'median',
                'min',
                'max'
            ]
        },
        {
            label: 'Amount',
            type: 'number',
            fieldName: 'number',
            typeAttributes: {
                minimumFractionDigits: 1
            },
            summarizeTypes: ['sum', 'min', 'max', 'mode']
        },
        {
            label: 'Percent',
            fieldName: 'percent',
            type: 'percent',
            editable: true,
            summarizeTypes: [
                'count',
                'countUnique',
                'average',
                'median',
                'min',
                'max',
                'mode'
            ]
        }
    ];

    data = [
        {
            id: 1,
            badge: 'approved',
            badgeVariant: 'success',
            currency: '5',
            number: '5',
            percent: '0.05'
        },
        {
            id: 2,
            badge: 'declined',
            badgeVariant: 'error',
            currency: '5',
            number: '10',
            percent: '0.1'
        },
        {
            id: 3,
            badge: 'unknown',
            badgeVariant: 'inverse',
            number: '15',
            percent: '0.15'
        },
        {
            id: 4,
            badge: 'approved',
            badgeVariant: 'success',
            currency: '20',
            number: '20',
            percent: '0.2'
        },
        {
            id: 5,
            badge: 'approved',
            badgeVariant: 'success',
            currency: '25',
            number: '25',
            percent: '0.25'
        },
        {
            id: 6,
            badge: 'approved',
            badgeVariant: 'success',
            currency: '25',
            number: '25',
            percent: '0.25'
        }
    ];
}
