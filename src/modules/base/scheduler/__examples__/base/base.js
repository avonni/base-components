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
                primaryText: { fieldName: 'label' }
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
            resourceNames: ['Jung', 'Lily', 'Reginald'],
            name: 'event-1',
            title: 'Event 1',
            from: 1639400400000,
            to: 1639407600000
        },
        {
            resourceNames: ['Reginald', 'Jung', 'Lily'],
            name: 'event-2',
            title: 'Event 2',
            from: 1639404000000,
            to: 1639411200000
        },
        {
            resourceNames: ['Jung', 'Lily', 'Dave'],
            name: 'event-3',
            title: 'Event 3',
            from: 1639407600000,
            to: 1639414800000
        },
        {
            resourceNames: ['Nina', 'Lily'],
            name: 'event-4',
            title: 'Event 4',
            from: 1639411200000,
            to: 1639418400000
        },
        {
            resourceNames: ['Dave', 'Nina'],
            name: 'event-5',
            title: 'Event 5',
            from: 1639414800000,
            to: 1639422000000
        },
        {
            resourceNames: ['Nina', 'Dave', 'Jung'],
            name: 'event-6',
            title: 'Event 6',
            from: 1639418400000,
            to: 1639425600000
        },
        {
            resourceNames: ['Nina'],
            name: 'event-7',
            title: 'Event 7',
            from: 1639422000000,
            to: 1639429200000
        },
        {
            resourceNames: ['Jung'],
            name: 'event-8',
            title: 'Event 8',
            from: 1639425600000,
            to: 1639432800000
        },
        {
            resourceNames: ['Nina'],
            name: 'event-9',
            title: 'Event 9',
            from: 1639429200000,
            to: 1639436400000
        },
        {
            resourceNames: ['Dave', 'Jung', 'Lily'],
            name: 'event-10',
            title: 'Event 10',
            from: 1639432800000,
            to: 1639440000000
        }
    ];

    resources = [
        {
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'NG',
            name: 'Nina',
            label: 'Nina G.',
            role: 'Lead developer',
            sharedField: `This shouldn't show up`
        },
        {
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'DM',
            name: 'Dave',
            label: 'Dave M.',
            role: 'UX Specialist',
            customRowField: 'Label coming from a custom field in the row'
        },
        {
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'JP',
            name: 'Jung',
            label: 'Jung P.',
            role: 'Product Owner'
        },
        {
            avatarFallbackIconName: 'standard:article',
            avatarInitials: 'LM',
            name: 'Lily',
            label: 'Lily M.',
            role: 'Graphic Designer',
            customField: "This comes from the row's custom field"
        },
        {
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
            avatarFallbackIconName: 'standard:person_account',
            avatarInitials: 'RM',
            name: 'Reginald',
            label: 'Reginald M.',
            role: 'Developer'
        }
    ];

    selectedResources = ['Dave', 'Reginald', 'Nina', 'Jung', 'Lily'];

    start = new Date(2021, 11, 13, 8);
}
