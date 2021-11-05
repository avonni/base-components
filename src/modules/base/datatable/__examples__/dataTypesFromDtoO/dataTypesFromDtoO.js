import { LightningElement } from 'lwc';

export default class DataTypesFromDtoO extends LightningElement {
    columns = [
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
            editable: true
        },
        {
            label: 'Date local',
            fieldName: 'dateLocal',
            type: 'date-local',
            typeAttributes: {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            },
            editable: true
        },
        {
            label: 'Date Range',
            fieldName: 'dateRange',
            type: 'date-range',
            typeAttributes: {
                label: 'Date range',
                disabled: { fieldName: 'dateRangeDisabled' },
                dateStyle: 'short',
                labelStartDate: 'Start',
                labelEndDate: 'End',
                type: { fieldName: 'dateRangeType' }
            },
            editable: true
        },
        {
            label: 'Dynamic icon',
            fieldName: 'dynamicIcon',
            type: 'dynamic-icon',
            typeAttributes: {
                alternativeText: { fieldName: 'dynamicIcon' },
                option: { fieldName: 'dynamicIconOption' }
            }
        },
        {
            label: 'Email',
            fieldName: 'email',
            type: 'email',
            editable: true,
            initialWidth: 225
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

    records = [
        {
            id: 1,
            dynamicIcon: 'ellie',
            date: new Date('2022/03/24'),
            dateLocal: new Date('2022/03/24'),
            dateRange: {
                startDate: new Date('2021/10/02'),
                endDate: new Date('2021/10/05')
            },
            email: 'nina.gomez@email.com',
            image: 'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/header_about_background_2x.jpg',
            location: {
                latitude: '45.53',
                longitude: '-73.61'
            },
            number: '1789'
        },
        {
            id: 2,
            date: new Date('2022/03/21'),
            dateLocal: new Date('2022/03/21'),
            dateRange: {
                startDate: new Date('2021/09/12, 13:00:00'),
                endDate: new Date('2021/10/05, 14:00:00')
            },
            dynamicIcon: 'score',
            dynamicIconOption: 'negative',
            email: 'dave.mckinsley@email.com',
            image: 'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tbc_banner_2x.jpg',
            toggle: true,
            location: {
                latitude: '45.53',
                longitude: '-73.58'
            },
            number: '1'
        },
        {
            id: 3,
            date: new Date('2022/05/04'),
            dateLocal: new Date('2022/05/04'),
            dateRangeDisabled: true,
            dynamicIcon: 'strength',
            dynamicIconOption: -3,
            email: 'jung.phung@email.com',
            image: 'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tbc_banner_2x.jpg',
            imageBlank: true,
            imageBlankColor: '#CCC',
            imageHeight: 50,
            location: {
                latitude: '45.54',
                longitude: '-73.60'
            },
            number: '1234'
        },
        {
            id: 4,
            dynamicIcon: 'eq',
            date: new Date('2021/02/14'),
            dateLocal: new Date('2021/02/14'),
            dateRange: {
                startDate: new Date('2021/09/17'),
                endDate: new Date('2021/09/25')
            },
            dateRangeType: 'datetime',
            email: 'lily.murray@email.com',
            image: 'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tdx-home-bg_2x.png',
            location: {
                latitude: '45.55',
                longitude: '-73.62'
            },
            number: '345'
        },
        {
            id: 5,
            dynamicIcon: 'waffle',
            date: new Date('2021/02/14'),
            dateLocal: new Date('2022/10/12'),
            dateRange: {
                startDate: new Date('2021/08/02'),
                endDate: new Date('2021/09/15')
            },
            email: 'mike.mickelson@email.com',
            image: 'https://trailblazers.salesforce.com/resource/1618442007000/tdxlib/img/tdx-header-bg_2x.png',
            location: {
                latitude: '45.56',
                longitude: '-73.56'
            },
            number: '9'
        }
    ];
}
