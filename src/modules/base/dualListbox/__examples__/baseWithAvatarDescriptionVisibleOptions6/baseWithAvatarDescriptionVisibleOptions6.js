import { LightningElement } from 'lwc';

export default class DualListboxBaseWithAvatarDescriptionVisibleOptions6 extends LightningElement {
    values = ['2', '3'];
    requiredOptions = ['1'];

    optionsWithAvatarSrc = [
        {
            value: '1',
            label: 'Carl Smith',
            avatar: {
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
            }
        },
        {
            value: '2',
            label: 'Suzan White',
            description: 'SW',
            avatar: {
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
            }
        },
        {
            value: '3',
            label: 'Philipp Johnson',
            description: 'PJ',
            avatar: {
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg'
            }
        },
        {
            value: '4',
            label: 'Miles Williams',
            description: 'MW',
            avatar: {
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
            }
        },
        {
            value: '5',
            label: 'Jane Doe',
            description: 'JD',
            avatar: {
                fallbackIconName: 'standard:account',
                initials: 'JD'
            }
        },
        {
            value: '6',
            label: 'Gina Garcia',
            description: 'GG',
            avatar: {
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
            }
        },
        {
            value: '7',
            label: 'John Smith',
            avatar: {
                fallbackIconName: 'standard:address',
                initials: 'JS'
            }
        },
        {
            value: '8',
            label: 'Xavier Anderson',
            description: 'XA',
            avatar: {
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg'
            }
        },
        {
            value: '9',
            label: 'James Jackson',
            description: 'JJ',
            avatar: {
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
            }
        },
        {
            value: '10',
            label: 'Diane Wilson',
            description: 'DW',
            avatar: {
                src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
            }
        }
    ];
}
