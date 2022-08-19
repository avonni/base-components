import { LightningElement } from 'lwc';

export default class SchedulerThemesAndColors extends LightningElement {
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
            resourceNames: ['Nina', 'Reginald', 'Lily'],
            name: 'event-1',
            title: 'Theme hollow',
            from: 1639400400000,
            to: 1639407600000,
            theme: 'hollow'
        },
        {
            resourceNames: ['Lily'],
            name: 'event-2',
            title: 'Theme line',
            from: 1639404000000,
            to: 1639411200000,
            theme: 'line'
        },
        {
            resourceNames: ['Reginald', 'Jung'],
            name: 'event-3',
            title: 'Custom color',
            from: 1639432800000,
            to: 1639440000000,
            color: 'tomato'
        },
        {
            resourceNames: ['Dave', 'Lily'],
            name: 'event-4',
            title: 'Theme transparent',
            from: 1639411200000,
            to: 1639418400000,
            theme: 'transparent'
        },
        {
            resourceNames: ['Dave', 'Nina'],
            name: 'event-5',
            title: 'Theme rounded',
            from: 1639414800000,
            to: 1639422000000,
            theme: 'rounded'
        },
        {
            resourceNames: ['Lily', 'Nina'],
            name: 'event-6',
            title: 'Default theme',
            from: 1639425600000,
            to: 1639432800000
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
