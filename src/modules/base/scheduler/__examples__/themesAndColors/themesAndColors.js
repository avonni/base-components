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
            keyFields: ['1', '5', '4'],
            name: 'event-1',
            title: 'Theme hollow',
            from: 1639400400000,
            to: 1639407600000,
            theme: 'hollow'
        },
        {
            keyFields: ['4'],
            name: 'event-2',
            title: 'Theme line',
            from: 1639404000000,
            to: 1639411200000,
            theme: 'line'
        },
        {
            keyFields: ['5', '3'],
            name: 'event-3',
            title: 'Custom color',
            from: 1639432800000,
            to: 1639440000000,
            color: 'tomato'
        },
        {
            keyFields: ['2', '4'],
            name: 'event-4',
            title: 'Theme transparent',
            from: 1639411200000,
            to: 1639418400000,
            theme: 'transparent'
        },
        {
            keyFields: ['2', '1'],
            name: 'event-5',
            title: 'Theme rounded',
            from: 1639414800000,
            to: 1639422000000,
            theme: 'rounded'
        },
        {
            keyFields: ['4', '1'],
            name: 'event-6',
            title: 'Default theme',
            from: 1639425600000,
            to: 1639432800000
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
