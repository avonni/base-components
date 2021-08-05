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
        }
    ];

    data = [
        {
            id: 1,
            slider: 36,
            text: 'Nina Gomez',
            url: 'https://www.avonnicomponents.com/',
            urlLabel: 'Avonni Components Documentation'
        },
        {
            id: 2,
            slider: 78,
            text: 'Dave McKinsley',
            url: 'https://www.avonni.app/',
            urlLabel: 'Avonni'
        },
        {
            id: 3,
            sliderDisabled: true,
            ratingDisabled: true,
            text: 'Jung Phung',
            url:
                'https://developer.salesforce.com/docs/component-library/overview/components',
            urlLabel: 'Salesforce documentation'
        },
        {
            id: 4,
            slider: 3,
            sliderStep: 4,
            text: 'Lily Murray',
            url: 'https://www.lightningdesignsystem.com/',
            urlLabel: 'Lightning Design System'
        },
        {
            id: 5,
            text: 'Reginald Martin',
            url: 'https://lwc.dev/',
            urlLabel: 'LWC Documentation'
        }
    ];
}
