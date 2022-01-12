import { LightningElement } from 'lwc';

export default class ListSortableWithAvatarsAndSingleAction extends LightningElement {
    action = [
        {
            label: 'Completed',
            name: 'completed-action',
            iconName: 'utility:check',
            disabled: false
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
