import { LightningElement } from 'lwc';

export default class SchedulerBase extends LightningElement {
    columns = [
        {
            label: 'Staff',
            fieldName: 'resourceAvatarSrc',
            type: 'avatar',
            typeAttributes: {
                alternativeText: 'Avatar',
                fallbackIconName: {
                    fieldName: 'resourceAvatarFallbackIconName'
                },
                initials: { fieldName: 'resourceAvatarInitials' },
                primaryText: { fieldName: 'resourceName' }
            }
        },
        {
            label: 'Role',
            fieldName: 'role',
            hideDefaultActions: true
        }
    ];

    events = [
        {
            keyFields: ['3', '4', '5'],
            name: 'event-1',
            title: 'Event 1',
            from: 1639400400000,
            to: 1639407600000
        },
        {
            keyFields: ['5', '3', '4'],
            name: 'event-2',
            title: 'Event 2',
            from: 1639404000000,
            to: 1639411200000
        },
        {
            keyFields: ['3', '4', '2'],
            name: 'event-3',
            title: 'Event 3',
            from: 1639407600000,
            to: 1639414800000
        },
        {
            keyFields: ['1', '4'],
            name: 'event-4',
            title: 'Event 4',
            from: 1639411200000,
            to: 1639418400000
        },
        {
            keyFields: ['2', '1'],
            name: 'event-5',
            title: 'Event 5',
            from: 1639414800000,
            to: 1639422000000
        },
        {
            keyFields: ['1', '2', '3'],
            name: 'event-6',
            title: 'Event 6',
            from: 1639418400000,
            to: 1639425600000
        },
        {
            keyFields: ['1'],
            name: 'event-7',
            title: 'Event 7',
            from: 1639422000000,
            to: 1639429200000
        },
        {
            keyFields: ['3'],
            name: 'event-8',
            title: 'Event 8',
            from: 1639425600000,
            to: 1639432800000
        },
        {
            keyFields: ['1'],
            name: 'event-9',
            title: 'Event 9',
            from: 1639429200000,
            to: 1639436400000
        },
        {
            keyFields: ['2', '3', '4'],
            name: 'event-10',
            title: 'Event 10',
            from: 1639432800000,
            to: 1639440000000
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

    start = new Date(2021, 11, 13, 8);
}
