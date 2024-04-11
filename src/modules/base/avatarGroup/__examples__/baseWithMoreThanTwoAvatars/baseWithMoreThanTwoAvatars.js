import { LightningElement } from 'lwc';

const ITEMS = [
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
        fallbackIconName: 'standard:user',
        alternativeText: 'John Doe',
        presence: 'online',
        presenceTitle: 'Online',
        primaryText: 'John Doe',
        secondaryText: 'VP, Human Resources',
        tertiaryText: 'FakeCompany Inc.',
        name: 'user-1'
    },
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        fallbackIconName: 'standard:user',
        initials: 'UA',
        alternativeText: 'Jane Doe',
        presence: 'blocked',
        presenceTitle: 'Blocked',
        primaryText: 'Jane Doe',
        secondaryText: 'VP, Engineering',
        tertiaryText: 'FakeCompany Inc.',
        name: 'user-2'
    },
    {
        fallbackIconName: 'standard:user',
        alternativeText: 'Vishnu Doe',
        presence: 'offline',
        presenceTitle: 'Offline',
        primaryText: 'Vishnu Doe',
        secondaryText: 'VP, Research and Development',
        tertiaryText: 'MadeUp Co.',
        name: 'user-3'
    },
    {
        fallbackIconName: 'standard:user',
        initials: 'EB',
        alternativeText: 'Eliott Beauchesne',
        presence: 'busy',
        presenceTitle: 'Busy',
        primaryText: 'Eliott Beauchesne',
        secondaryText: 'CEO',
        tertiaryText: 'MadeUp Co.',
        name: 'user-4'
    }
];

export default class AvatarGroupBaseWithMoreThanTwoAvatars extends LightningElement {
    items = [
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS,
        ...ITEMS
    ];
}
