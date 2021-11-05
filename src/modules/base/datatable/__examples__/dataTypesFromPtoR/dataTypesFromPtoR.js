import { LightningElement } from 'lwc';

export default class DataTypesFromPtoR extends LightningElement {
    columns = [
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
            },
            initialWidth: 100
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
        },
        {
            label: 'Rating',
            fieldName: 'rating',
            type: 'rating',
            typeAttributes: {
                iconName: 'utility:favorite',
                label: 'Rating on 5',
                disabled: { fieldName: 'ratingDisabled' }
            },
            editable: true,
            initialWidth: 200
        },
        {
            label: 'Rich Text',
            fieldName: 'richText',
            type: 'rich-text',
            typeAttributes: {
                disabled: { fieldName: 'richTextDisabled' }
            },
            editable: true,
            initialWidth: 275
        }
    ];

    records = [
        {
            id: 1,
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
            qrcode: 'https://www.avonni.app/',
            rating: '3',
            richText: '<h1 style="text-align: left">With Value Left</h1>'
        },
        {
            id: 2,
            percent: 0.45,
            phone: '5144546767',
            progress: 100,
            progressBarTheme: 'success',
            progressRingVariant: 'base-autocomplete',
            progressCircleColor: '#45c65a',
            qrcode: 'https://www.avonni.app/',
            qrcodeBorderColor: '#45c65a',
            qrcodeBorderWidth: 5,
            rating: '2',
            richText: '<h2 style="text-align: center">With Value Centered</h2>'
        },
        {
            id: 3,
            percent: 0.67,
            phone: '6785643214',
            progress: 43,
            qrcode: 'https://www.avonni.app/',
            ratingDisabled: true,
            richText:
                '<h3 style="text-align: right">Disabled With Value Right</h3>',
            richTextDisabled: true
        },
        {
            id: 4,
            percent: 4,
            phone: '3547789900',
            progress: 5,
            progressBarTheme: 'info',
            progressRingVariant: 'expired',
            qrcode: 'https://www.avonni.app/',
            rating: '5',
            richText: '<h4 style="text-align: center">With Value Centered</h4>'
        },
        {
            id: 5,
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
            qrcode: 'https://www.avonni.app/',
            rating: '4',
            richText: '<h5 style="text-align: left">With Value Left</h5>'
        }
    ];

    selectedRows = ['2'];
}
