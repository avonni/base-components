import { LightningElement } from 'lwc';

export default class SchedulerReadOnly extends LightningElement {
    columns = [
        {
            label: 'Employee',
            fieldName: 'name'
        }
    ];

    events = [
        {
            resourceNames: ['Jung', 'Lily', 'Reginald'],
            name: 'event-1',
            title: 'Event 1',
            from: new Date(2021, 2, 1),
            to: new Date(2021, 3, 1)
        },
        {
            resourceNames: ['Reginald', 'Jung', 'Lily'],
            name: 'event-2',
            title: 'Event 2',
            from: new Date(2021, 1, 15),
            to: new Date(2021, 3, 30)
        },
        {
            resourceNames: ['Jung', 'Lily', 'Dave'],
            name: 'event-3',
            title: 'Event 3',
            from: new Date(2020, 11, 26),
            to: new Date(2021, 0, 31)
        },
        {
            resourceNames: ['Nina', 'Lily'],
            name: 'event-4',
            title: 'Event 4',
            from: new Date(2021, 3, 12),
            to: new Date(2021, 4, 31)
        },
        {
            resourceNames: ['Dave', 'Nina'],
            name: 'event-5',
            title: 'Event 5',
            from: new Date(2021, 7, 1),
            to: new Date(2021, 8, 31)
        },
        {
            resourceNames: ['Nina', 'Dave', 'Jung'],
            name: 'event-6',
            title: 'Event 6',
            from: new Date(2021, 5, 20),
            to: new Date(2021, 6, 31)
        },
        {
            resourceNames: ['Nina'],
            name: 'event-7',
            title: 'Event 7',
            from: new Date(2021, 6, 1),
            to: new Date(2021, 7, 31)
        },
        {
            resourceNames: ['Jung'],
            name: 'event-8',
            title: 'Event 8',
            from: new Date(2021, 9, 10),
            to: new Date(2021, 10, 31)
        },
        {
            resourceNames: ['Nina'],
            name: 'event-9',
            title: 'Event 9',
            from: new Date(2021, 9, 1),
            to: new Date(2022, 2, 3)
        },
        {
            resourceNames: ['Dave', 'Jung', 'Lily'],
            name: 'event-10',
            title: 'Event 10',
            from: new Date(2021, 10, 1),
            to: new Date(2021, 11, 31)
        }
    ];

    resources = [
        {
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'NG',
            name: 'Nina',
            role: 'Lead developer',
            sharedField: `This shouldn't show up`
        },
        {
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'DM',
            name: 'Dave',
            role: 'UX Specialist',
            customRowField: 'Label coming from a custom field in the row'
        },
        {
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'JP',
            name: 'Jung',
            role: 'Product Owner'
        },
        {
            avatarFallbackIconName: 'standard:article',
            avatarInitials: 'LM',
            name: 'Lily',
            role: 'Graphic Designer',
            customField: "This comes from the row's custom field"
        },
        {
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'RM',
            name: 'Reginald',
            role: 'Developer'
        }
    ];

    start = new Date(2021, 0, 1);

    timeSpans = [
        {
            unit: 'week',
            span: 1,
            label: 'Week',
            headers: 'dayAndWeek',
            name: 'week'
        },
        {
            unit: 'month',
            span: 1,
            label: 'Month',
            headers: 'dayAndMonth',
            name: 'month'
        },
        {
            unit: 'year',
            span: 1,
            label: 'Year',
            headers: 'monthAndYear',
            name: 'year'
        }
    ];
}
