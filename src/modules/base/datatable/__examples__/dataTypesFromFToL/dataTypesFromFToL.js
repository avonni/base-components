import { LightningElement } from 'lwc';

export default class DataTypesFromFtoL extends LightningElement {
    columns = [
        {
            label: 'Formatted Rich Text',
            fieldName: 'formattedRichText',
            type: 'formatted-rich-text',
            editable: true
        },
        {
            label: 'Image',
            fieldName: 'image',
            type: 'image',
            typeAttributes: {
                alt: { fieldName: 'avatarPrimaryText' },
                blank: { fieldName: 'imageBlank' },
                blankColor: { fieldName: 'imageBlankColor' },
                width: 100,
                height: { fieldName: 'imageHeight' }
            },
            actions: [
                { label: 'All', checked: true, name: 'all' },
                { label: 'Published', checked: false, name: 'show_published' },
                {
                    label: 'Unpublished',
                    checked: false,
                    name: 'show_unpublished'
                }
            ]
        },
        {
            label: 'Input Counter',
            fieldName: 'inputCounter',
            type: 'input-counter',
            typeAttributes: {
                disabled: { fieldName: 'inputCounterDisabled' },
                label: 'Counter',
                step: { fieldName: 'inputCounterStep' }
            },
            editable: true,
            cellAttributes: {
                alignment: 'center'
            }
        },
        {
            label: 'Input Date Range',
            fieldName: 'inputDateRange',
            type: 'input-date-range',
            typeAttributes: {
                label: 'Date range',
                disabled: { fieldName: 'inputDateRangeDisabled' },
                dateStyle: 'short',
                labelStartDate: 'Start',
                labelEndDate: 'End'
            },
            editable: true
        },
        {
            label: 'Input Rich Text',
            fieldName: 'inputRichText',
            type: 'input-rich-text',
            typeAttributes: {
                disabled: { fieldName: 'inputRichTextDisabled' }
            },
            editable: true
        },
        {
            label: 'Input Toggle',
            fieldName: 'inputToggle',
            type: 'input-toggle',
            typeAttributes: {
                disabled: { fieldName: 'inputToggleDisabled' },
                size: 'large',
                label: 'Toggle'
            },
            editable: true,
            cellAttributes: {
                alignment: 'center'
            }
        },
        {
            label: 'Location',
            type: 'location',
            fieldName: 'location',
            editable: true
        }
    ];

    records = [
        {
            id: 1,
            formattedRichText: '<h1>Header 1</h1>',
            image: 'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
            inputCounter: 1,
            inputDateRange: {
                startDate: new Date('2021/10/02'),
                endDate: new Date('2021/10/05')
            },
            location: {
                latitude: '45.53',
                longitude: '-73.61'
            }
        },
        {
            id: 2,
            formattedRichText: '<h2>Header 2</h2>',
            image: 'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tbc_banner_2x.jpg',
            inputCounter: 3,
            inputDateRange: {
                startDate: new Date('2021/09/12'),
                endDate: new Date('2021/10/05')
            },
            inputToggle: true,
            location: {
                latitude: '45.53',
                longitude: '-73.58'
            }
        },
        {
            id: 3,
            formattedRichText: '<h3>Header 3</h3>',
            image: 'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tbc_banner_2x.jpg',
            imageBlank: true,
            imageBlankColor: '#CCC',
            imageHeight: 50,
            inputCounterDisabled: true,
            inputDateRangeDisabled: true,
            inputToggleDisabled: true,
            location: {
                latitude: '45.54',
                longitude: '-73.60'
            }
        },
        {
            id: 4,
            formattedRichText: '<h4>Header 4</h4>',
            image: 'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tdx-home-bg_2x.png',
            inputCounter: 5,
            inputDateRange: {
                startDate: new Date('2021/09/17'),
                endDate: new Date('2021/09/25')
            },
            location: {
                latitude: '45.55',
                longitude: '-73.62'
            }
        },
        {
            id: 5,
            formattedRichText: '<h5>Header 5</h5>',
            image: 'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tdx-header-bg_2x.png',
            inputCounterStep: 2,
            inputCounter: 0,
            inputDateRange: {
                startDate: new Date('2021/08/02'),
                endDate: new Date('2021/09/15')
            },
            location: {
                latitude: '45.56',
                longitude: '-73.56'
            }
        }
    ];
}
