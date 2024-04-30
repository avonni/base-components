import { LightningElement } from 'lwc';

export default class AvatarGroupBaseExtraLargeWithTwoAvatars extends LightningElement {
    items = [
        {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
            fallbackIconName: 'standard:user',
            alternativeText: 'John Doe',
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
            primaryText: 'Jane Doe',
            secondaryText: 'VP, Engineering',
            tertiaryText: 'FakeCompany Inc.',
            name: 'user-2'
        }
    ];
}
