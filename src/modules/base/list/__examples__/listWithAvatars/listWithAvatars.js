import { LightningElement } from 'lwc';

export default class ListWithAvatars extends LightningElement {
    itemsWithAvatars = [
        {
            label: 'Item 1',
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
            avatarFallbackIconName: 'custom:custom5'
        },
        {
            label: 'Item 2',
            avatarFallbackIconName: 'custom:custom9'
        },
        {
            label: 'Item 3',
            avatarFallbackIconName: 'custom:custom1',
            avatarSrc:
                'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg'
        },
        {
            label: 'Item 4',
            avatarFallbackIconName: 'custom:custom11'
        },
        {
            label: 'Item 5',
            avatarFallbackIconName: 'custom:custom51'
        }
    ];
}
