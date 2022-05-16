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
            editable: true,
            initialWidth: 200
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
            editable: true,
            initialWidth: 155
        },
        {
            label: 'Date Range',
            fieldName: 'dateRange',
            type: 'date-range',
            typeAttributes: {
                disabled: { fieldName: 'dateRangeDisabled' },
                dateStyle: 'short',
                labelStartDate: 'Start',
                labelEndDate: 'End',
                type: { fieldName: 'dateRangeType' }
            },
            editable: true,
            initialWidth: 320
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
                alternativeText: { fieldName: 'avatarPrimaryText' },
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
            image: 'https://react.lightningdesignsystem.com/assets/images/carousel/carousel-01.jpg',
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
            image: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=340&q=80',
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
            image: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=340&q=80',
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
            image: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
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
            image: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
            location: {
                latitude: '45.56',
                longitude: '-73.56'
            },
            number: '9'
        }
    ];
}
