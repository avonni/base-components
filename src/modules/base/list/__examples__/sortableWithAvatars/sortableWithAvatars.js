import { LightningElement } from 'lwc';

export default class ListSortableWithAvatars extends LightningElement {
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

    items = [
        {
            label: 'Item 1',
            avatar: {
                fallbackIconName: 'custom:custom5',
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
            }
        },
        {
            label: 'Item 2',
            avatar: {
                fallbackIconName: 'custom:custom9'
            }
        },
        {
            label: 'Item 3',
            avatar: {
                fallbackIconName: 'custom:custom1',
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg'
            }
        },
        {
            label: 'Item 4',
            avatar: {
                fallbackIconName: 'custom:custom11'
            }
        },
        {
            label: 'Item 5',
            avatar: {
                fallbackIconName: 'custom:custom51'
            }
        }
    ];
}
