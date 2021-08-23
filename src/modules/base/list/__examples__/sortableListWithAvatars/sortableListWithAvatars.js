import { LightningElement } from 'lwc';

export default class ListSortableListWithAvatars extends LightningElement {
    actions = [
        {
            label: 'Completed',
            name: 'completed-action',
            iconName: 'utility:check',
            disabled: false
        },
        {
            label: 'Pending',
            name: 'prending-action',
            iconName: 'utility:spinner',
            disabled: false
        },
        {
            label: 'Delete',
            name: 'delete-action',
            iconName: 'utility:delete',
            disabled: true
        }
    ];

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
