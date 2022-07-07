import { LightningElement } from 'lwc';

export default class SchedulerReadOnly extends LightningElement {
    columns = [
        {
            label: 'Employee',
            fieldName: 'resourceName'
        }
    ];

    events = [
        {
            keyFields: ['3', '4', '5'],
            name: 'event-1',
            title: 'Event 1',
            from: new Date(2021, 2, 1),
            to: new Date(2021, 3, 1)
        },
        {
            keyFields: ['5', '3', '4'],
            name: 'event-2',
            title: 'Event 2',
            from: new Date(2021, 1, 15),
            to: new Date(2021, 3, 30)
        },
        {
            keyFields: ['3', '4', '2'],
            name: 'event-3',
            title: 'Event 3',
            from: new Date(2020, 11, 26),
            to: new Date(2021, 0, 31)
        },
        {
            keyFields: ['1', '4'],
            name: 'event-4',
            title: 'Event 4',
            from: new Date(2021, 3, 12),
            to: new Date(2021, 4, 31)
        },
        {
            keyFields: ['2', '1'],
            name: 'event-5',
            title: 'Event 5',
            from: new Date(2021, 7, 1),
            to: new Date(2021, 8, 31)
        },
        {
            keyFields: ['1', '2', '3'],
            name: 'event-6',
            title: 'Event 6',
            from: new Date(2021, 5, 20),
            to: new Date(2021, 6, 31)
        },
        {
            keyFields: ['1'],
            name: 'event-7',
            title: 'Event 7',
            from: new Date(2021, 6, 1),
            to: new Date(2021, 7, 31)
        },
        {
            keyFields: ['3'],
            name: 'event-8',
            title: 'Event 8',
            from: new Date(2021, 9, 10),
            to: new Date(2021, 10, 31)
        },
        {
            keyFields: ['1'],
            name: 'event-9',
            title: 'Event 9',
            from: new Date(2021, 9, 1),
            to: new Date(2022, 2, 3)
        },
        {
            keyFields: ['2', '3', '4'],
            name: 'event-10',
            title: 'Event 10',
            from: new Date(2021, 10, 1),
            to: new Date(2021, 11, 31)
        }
    ];

    resources = [
        {
            id: '1',
            resourceAvatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            resourceAvatarFallbackIconName: 'standard:person_account',
            resourceAvatarInitials: 'NG',
            resourceName: 'Nina',
            role: 'Lead developer',
            sharedField: `This shouldn't show up`
        },
        {
            id: '2',
            resourceAvatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
            resourceAvatarFallbackIconName: 'standard:person_account',
            resourceAvatarInitials: 'DM',
            resourceName: 'Dave',
            role: 'UX Specialist',
            customRowField: 'Label coming from a custom field in the row'
        },
        {
            id: '3',
            resourceAvatarFallbackIconName: 'standard:person_account',
            resourceAvatarInitials: 'JP',
            resourceName: 'Jung',
            role: 'Product Owner'
        },
        {
            id: '4',
            resourceAvatarFallbackIconName: 'standard:article',
            resourceAvatarInitials: 'LM',
            resourceName: 'Lily',
            role: 'Graphic Designer',
            customField: "This comes from the row's custom field"
        },
        {
            id: '5',
            resourceAvatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
            resourceAvatarFallbackIconName: 'standard:person_account',
            resourceAvatarInitials: 'RM',
            resourceName: 'Reginald',
            role: 'Developer'
        }
    ];

    start = new Date(2021, 0, 1);

    timeSpan = {
        unit: 'year',
        span: 1
    };

    toolbarTimeSpans = [
        { unit: 'week', span: 1, label: 'Week', headers: 'dayAndWeek' },
        { unit: 'month', span: 1, label: 'Month', headers: 'dayAndMonth' },
        { unit: 'year', span: 1, label: 'Year', headers: 'monthAndYear' }
    ];
}
