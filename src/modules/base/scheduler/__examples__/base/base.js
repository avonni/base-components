import { LightningElement } from 'lwc';

export default class SchedulerBase extends LightningElement {
    columns = [
        {
            label: 'Staff',
            fieldName: 'avatarSrc',
            type: 'avatar',
            typeAttributes: {
                alternativeText: 'Avatar',
                fallbackIconName: { fieldName: 'avatarFallbackIconName' },
                initials: { fieldName: 'avatarInitials' },
                primaryText: { fieldName: 'firstName' }
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

    rows = [
        {
            id: '1',
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'NG',
            firstName: 'Nina',
            role: 'Lead developer'
        },
        {
            id: '2',
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'DM',
            firstName: 'Dave',
            role: 'UX Specialist'
        },
        {
            id: '3',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'JP',
            firstName: 'Jung',
            role: 'Product Owner'
        },
        {
            id: '4',
            avatarFallbackIconName: 'standard:article',
            avatarInitials: 'LM',
            firstName: 'Lily',
            role: 'Graphic Designer'
        },
        {
            id: '5',
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'RM',
            firstName: 'Reginald',
            role: 'Developer'
        }
    ];

    start = new Date(2021, 11, 13, 8);
}
