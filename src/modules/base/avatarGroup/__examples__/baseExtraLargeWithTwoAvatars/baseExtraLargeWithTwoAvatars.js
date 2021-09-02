import { LightningElement } from 'lwc';

export default class AvatarGroupBaseExtraLargeWithTwoAvatars extends LightningElement {
    items = [{
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
        fallbackIconName: 'standard:user',
        alternativeText: 'This is the alternative text',
        primaryText: 'John Doe',
        secondaryText: 'VP, Human Resources',
        tertiaryText: 'FakeCompany Inc.'
    },
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        fallbackIconName: 'standard:user',
        initials: 'UA',
        alternativeText: 'This is the alternative text',
        primaryText: 'Jane Doe',
        secondaryText: 'VP, Engineering',
        tertiaryText: 'FakeCompany Inc.'
    }
    ]
}
