import { LightningElement } from 'lwc';

export default class AvatarGroupBaseWithMoreThanTwoAvatars extends LightningElement {
    items = [
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
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
            alternativeText: 'This is the alternative text',
            presence: 'blocked',
            presenceTitle: 'Blocked',
            primaryText: 'Jane Doe',
            secondaryText: 'VP, Engineering',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-2'
        },
        {
            fallbackIconName: 'standard:user',
            alternativeText: 'This is the alternative text',
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
            alternativeText: 'This is the alternative text',
            presence: 'busy',
            presenceTitle: 'Busy',
            primaryText: 'Eliott Beauchesne',
            secondaryText: 'CEO',
            tertiaryText: 'MadeUp Co.',
            name: 'user-4'
        }
    ];
}
