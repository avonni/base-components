import { LightningElement } from 'lwc';

export default class DataTypesFromEtoN extends LightningElement {
    columns = [
        {
            label: 'Email',
            fieldName: 'email',
            type: 'email',
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
        },
        {
            label: 'Number',
            type: 'number',
            fieldName: 'number',
            editable: true,
            typeAttributes: {
                minimumFractionDigits: 2
            }
        }
    ];

    data = [
        {
            id: 1,
            email: 'nina.gomez@email.com',
            image:
                'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
            inputDateRange: {
                startDate: new Date('2021/10/02'),
                endDate: new Date('2021/10/05')
            },
            location: {
                latitude: '45.53',
                longitude: '-73.61'
            },
            number: '6'
        },
        {
            id: 2,
            email: 'dave.mckinsley@email.com',
            image:
                'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tbc_banner_2x.jpg',
            inputCounter: 3,
            inputDateRange: {
                startDate: new Date('2021/09/12'),
                endDate: new Date('2021/10/05')
            },
            inputToggle: true,
            location: {
                latitude: '45.53',
                longitude: '-73.58'
            },
            number: '18'
        },
        {
            id: 3,
            email: 'jung.phung@email.com',
            image:
                'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tbc_banner_2x.jpg',
            imageBlank: true,
            imageBlankColor: '#CCC',
            imageHeight: 50,
            inputCounterDisabled: true,
            inputDateRangeDisabled: true,
            inputToggleDisabled: true,
            location: {
                latitude: '45.54',
                longitude: '-73.60'
            },
            number: '1789'
        },
        {
            id: 4,
            email: 'lily.murray@email.com',
            image:
                'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tdx-home-bg_2x.png',
            inputCounter: 5,
            inputDateRange: {
                startDate: new Date('2021/09/17'),
                endDate: new Date('2021/09/25')
            },
            location: {
                latitude: '45.55',
                longitude: '-73.62'
            },
            number: '345'
        },
        {
            id: 5,
            email: 'reginald.martin@email.com',
            image:
                'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tdx-header-bg_2x.png',
            inputCounterStep: 2,
            inputCounter: 0,
            inputDateRange: {
                startDate: new Date('2021/08/02'),
                endDate: new Date('2021/09/15')
            },
            location: {
                latitude: '45.56',
                longitude: '-73.56'
            },
            number: '9'
        }
    ];
}
