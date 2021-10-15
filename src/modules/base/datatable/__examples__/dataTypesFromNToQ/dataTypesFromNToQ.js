import { LightningElement } from 'lwc';

export default class DataTypesFromNToQ extends LightningElement {
    columns = [
        {
            label: 'Number',
            type: 'number',
            fieldName: 'number',
            editable: true,
            typeAttributes: {
                minimumFractionDigits: 2
            }
        },
        {
            label: 'Percent',
            fieldName: 'percent',
            type: 'percent',
            editable: true
        },
        {
            label: 'Phone',
            fieldName: 'phone',
            type: 'phone',
            editable: true
        },
        {
            label: 'Progress Bar',
            fieldName: 'progress',
            type: 'progress-bar',
            typeAttributes: {
                referenceLines: { fieldName: 'progressBarReferenceLines' },
                theme: { fieldName: 'progressBarTheme' },
                variant: 'circular',
                thickness: 'large'
            },
            initialWidth: 150
        },
        {
            label: 'Progress Circle',
            fieldName: 'progress',
            type: 'progress-circle',
            typeAttributes: {
                thickness: 'large',
                size: 'small',
                color: { fieldName: 'progressCircleColor' }
            }
        },
        {
            label: 'Progress Ring',
            fieldName: 'progress',
            type: 'progress-ring',
            typeAttributes: {
                variant: { fieldName: 'progressRingVariant' },
                size: 'large'
            }
        },
        {
            label: 'QR Code',
            fieldName: 'qrcode',
            type: 'qrcode',
            typeAttributes: {
                borderColor: { fieldName: 'qrcodeBorderColor' },
                borderWidth: { fieldName: 'qrcodeBorderWidth' },
                size: 50
            }
        }
    ];

    records = [
        {
            id: 1,
            number: '1789',
            percent: 0.34,
            phone: '5142223333',
            progress: 34,
            progressBarReferenceLines: [
                {
                    label: 'IT',
                    value: 12,
                    variant: 'warning'
                },
                {
                    label: 'R&D',
                    value: 45,
                    variant: 'success'
                }
            ],
            progressRingVariant: 'warning',
            qrcode: 'https://www.avonni.app/'
        },
        {
            id: 2,
            number: '1',
            percent: 0.45,
            phone: '5144546767',
            progress: 100,
            progressBarTheme: 'success',
            progressRingVariant: 'base-autocomplete',
            progressCircleColor: '#45c65a',
            qrcode: 'https://www.avonni.app/',
            qrcodeBorderColor: '#45c65a',
            qrcodeBorderWidth: 5
        },
        {
            id: 3,
            number: '1,234',
            percent: 0.67,
            phone: '6785643214',
            progress: 43,
            qrcode: 'https://www.avonni.app/'
        },
        {
            id: 4,
            number: '345',
            percent: 4,
            phone: '3547789900',
            progress: 5,
            progressBarTheme: 'info',
            progressRingVariant: 'expired',
            qrcode: 'https://www.avonni.app/'
        },
        {
            id: 5,
            number: '9',
            percent: 0.05,
            phone: '5143245564',
            progress: 66,
            progressBarTheme: 'alt-inverse',
            progressBarReferenceLines: [
                {
                    label: 'IT',
                    value: 78,
                    borderStyle: 'solid'
                },
                {
                    label: 'R&D',
                    value: 33,
                    borderStyle: 'solid'
                }
            ],
            qrcode: 'https://www.avonni.app/'
        }
    ];

    selectedRows = ['2'];
}
