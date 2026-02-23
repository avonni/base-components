import { LightningElement } from 'lwc';

export default class ListEqualHeights extends LightningElement {
    items = [
        {
            label: 'Item 1',
            avatar: {
                fallbackIconName: 'custom:custom5',
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
                size: 'x-small'
            },
            name: 'name-item-1'
        },
        {
            label: 'Item 2',
            avatar: {
                fallbackIconName: 'custom:custom9',
                size: 'small'
            },
            name: 'name-item-2'
        },
        {
            label: 'Item 3',
            avatar: {
                fallbackIconName: 'custom:custom1',
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg',
                size: 'medium'
            },
            name: 'name-item-3'
        },
        {
            label: 'Item 4',
            avatar: {
                fallbackIconName: 'custom:custom11',
                size: 'large'
            },
            name: 'name-item-4'
        },
        {
            label: 'Item 5',
            avatar: {
                fallbackIconName: 'custom:custom51',
                size: 'xx-large'
            },
            name: 'name-item-5'
        }
    ];
}
