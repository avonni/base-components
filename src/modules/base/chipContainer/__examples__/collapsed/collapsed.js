import { LightningElement } from 'lwc';

export default class ChipContainerBase extends LightningElement {
    items = [
        {
            label: 'First chip',
            variant: 'base',
            prefixIconName: 'utility:table',
            iconSize: 'xx-small'
        },
        {
            label: 'Second chip',
            variant: 'base',
            mediaPosition: 'left',
            avatar: {
                fallbackIconName: 'custom:custom1',
                variant: 'circle'
            }
        },
        {
            label: 'Third chip',
            variant: 'warning',
            avatar: {
                fallbackIconName: 'standard:user',
                variant: 'circle',
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
            },
            outline: true
        },
        {
            label: 'Fourth chip',
            variant: 'base',
            mediaPosition: 'left',
            avatar: {
                fallbackIconName: 'standard:user',
                variant: 'circle',
                initials: 'FP'
            }
        },
        {
            label: 'Fifth chip',
            outline: false
        },
        {
            label: 'Sixth chip',
            outline: true,
            prefixIconName: 'utility:down',
            avatar: {
                variant: 'circle',
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
            }
        },
        {
            label: 'Seventh chip',
            avatar: {
                variant: 'circle',
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg'
            },
            variant: 'offline',
            mediaPosition: 'right',
            outline: true
        },
        {
            label: 'Eighth chip'
        }
    ];
}
