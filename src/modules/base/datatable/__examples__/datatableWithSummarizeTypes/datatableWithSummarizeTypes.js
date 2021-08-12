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
            label: 'Date',
            fieldName: 'date',
            type: 'date',
            typeAttributes: {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                timeZone: 'Pacific/Honolulu'
            },
            editable: true,
            summarizeTypes: [
                'count',
                'countUnique',
                'average',
                'median',
                'max',
                'min',
                'mode'
            ],
            initialWidth: 280
        },
        {
            label: 'Progress Ring',
            fieldName: 'progress',
            type: 'progress-ring',
            typeAttributes: {
                variant: { fieldName: 'progressRingVariant' },
                size: 'large'
            },
            summarizeTypes: ['count', 'sum', 'average', 'min', 'max'],
            initialWidth: 130
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
            date: new Date('2021/09/24'),
            progress: 100,
            progressRingVariant: 'base-autocomplete',
            badge: 'approved',
            badgeVariant: 'success',
            currency: '5',
            number: '5',
            percent: '0.05'
        },
        {
            id: 2,
            date: new Date('2021/10/24'),
            badge: 'declined',
            progressRingVariant: 'expired',
            progress: 0,
            badgeVariant: 'error',
            currency: '5',
            number: '10',
            percent: '0.1'
        },
        {
            id: 3,
            date: new Date('2021/10/24'),
            progress: 75,
            progressRingVariant: 'warning',
            badge: 'unknown',
            badgeVariant: 'inverse',
            number: '15',
            percent: '0.15'
        },
        {
            id: 4,
            date: new Date('2021/11/24'),
            progress: 50,
            badge: 'approved',
            badgeVariant: 'success',
            currency: '20',
            number: '20',
            percent: '0.2'
        },
        {
            id: 5,
            date: new Date('2021/12/24'),
            progress: 35,
            badge: 'approved',
            badgeVariant: 'success',
            currency: '25',
            number: '25',
            percent: '0.25'
        },
        {
            id: 6,
            date: new Date('2022/01/24'),
            progress: 20,
            badge: 'approved',
            badgeVariant: 'success',
            currency: '25',
            number: '25',
            percent: '0.25'
        }
    ];
}
