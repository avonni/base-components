import { LightningElement } from 'lwc';

export default class DataTypesFromRToZ extends LightningElement {
    columns = [
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
            label: 'Slider',
            fieldName: 'slider',
            type: 'slider',
            typeAttributes: {
                disabled: { fieldName: 'sliderDisabled' },
                label: 'Slider',
                step: { fieldName: 'sliderStep' }
            },
            editable: true
        },
        {
            label: 'Text',
            fieldName: 'text',
            type: 'text',
            editable: true
        },
        {
            label: 'Text Area',
            fieldName: 'textarea',
            type: 'textarea',
            typeAttributes: {
                disabled: { fieldName: 'textareaDisabled' },
                label: 'Text area'
            },
            editable: true
        },
        {
            label: 'URL',
            fieldName: 'url',
            type: 'url',
            typeAttributes: {
                label: { fieldName: 'urlLabel' },
                target: '_blank'
            }
        },
        {
            label: 'URLS',
            fieldName: 'urls',
            type: 'urls',
            typeAttributes: {
                urls: { fieldName: 'urls' }
            }
        }
    ];

    records = [
        {
            id: 1,
            rating: '3',
            slider: 36,
            text: 'Nina Gomez',
            url: 'https://www.avonnicomponents.com/',
            urlLabel: 'Avonni Components Documentation',
            urls: [
                {
                    value: 'https://www.avonnicomponents.com/',
                    label: 'Avonni Components Documentation'
                },
                { value: 'https://www.avonni.app/', label: 'Avonni' },
                {
                    value: 'https://developer.salesforce.com/docs/component-library/overview/components',
                    label: 'Salesforce documentation'
                }
            ]
        },
        {
            id: 2,
            rating: '2',
            slider: 78,
            text: 'Dave McKinsley',
            url: 'https://www.avonni.app/',
            urlLabel: 'Avonni',
            urls: [
                { value: 'https://www.avonni.app/', label: 'Avonni' },
                {
                    value: 'https://www.avonnicomponents.com/',
                    label: 'Avonni Components Documentation'
                },
                {
                    value: 'https://developer.salesforce.com/docs/component-library/overview/components',
                    label: 'Salesforce documentation'
                }
            ]
        },
        {
            id: 3,
            sliderDisabled: true,
            ratingDisabled: true,
            text: 'Jung Phung',
            url: 'https://developer.salesforce.com/docs/component-library/overview/components',
            urlLabel: 'Salesforce documentation',
            urls: [
                {
                    value: 'https://developer.salesforce.com/docs/component-library/overview/components',
                    label: 'Salesforce documentation'
                },
                {
                    value: 'https://www.avonnicomponents.com/',
                    label: 'Avonni Components Documentation'
                },
                { value: 'https://www.avonni.app/', label: 'Avonni' }
            ]
        },
        {
            id: 4,
            rating: '5',
            slider: 36,
            sliderStep: 4,
            text: 'Lily Murray',
            url: 'https://www.lightningdesignsystem.com/',
            urlLabel: 'Lightning Design System',
            urls: [
                {
                    value: 'https://www.lightningdesignsystem.com/',
                    label: 'Lightning Design System'
                },
                { value: 'https://www.avonni.app/', label: 'Avonni' },
                {
                    value: 'https://developer.salesforce.com/docs/component-library/overview/components',
                    label: 'Salesforce documentation'
                }
            ]
        },
        {
            id: 5,
            rating: '4',
            slider: '0',
            text: 'Reginald Martin',
            textareaDisabled: true,
            url: 'https://lwc.dev/',
            urlLabel: 'LWC Documentation',
            urls: [
                { value: 'https://lwc.dev/', label: 'LWC Documentation' },
                { value: 'https://www.avonni.app/', label: 'Avonni' },
                {
                    value: 'https://developer.salesforce.com/docs/component-library/overview/components',
                    label: 'Salesforce documentation'
                }
            ]
        }
    ];
}
