import { LightningElement } from 'lwc';

export default class PillContainerSingleLine extends LightningElement {
    actions = [
        {
            label: 'Delete',
            name: 'delete',
            iconName: 'utility:close'
        }
    ];

    items = [
        {
            label: 'First pill',
            name: 'first',
            href: '#first-pill'
        },
        {
            label: 'Second pill',
            name: 'second',
            avatar: {
                fallbackIconName: 'custom:custom1',
                variant: 'circle'
            }
        },
        {
            label: 'Third pill',
            name: 'third',
            avatar: {
                fallbackIconName: 'standard:user',
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
            },
            href: '#third-pill'
        },
        {
            label: 'Fourth pill',
            name: 'fourth',
            avatar: {
                fallbackIconName: 'standard:user',
                initials: 'FP'
            }
        },
        {
            label: 'Fifth pill',
            name: 'fifth',
            href: '#fifth-pill'
        },
        {
            label: 'Sixth pill',
            name: 'sixth',
            avatar: {
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
            }
        },
        {
            label: 'Seventh pill',
            name: 'seventh',
            avatar: {
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg'
            }
        },
        {
            label: 'Eighth pill',
            name: 'eighth'
        }
    ];
}
