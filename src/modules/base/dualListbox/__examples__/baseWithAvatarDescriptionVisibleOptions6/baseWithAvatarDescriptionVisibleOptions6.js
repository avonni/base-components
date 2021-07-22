import { LightningElement } from 'lwc';

export default class DualListboxBaseWithAvatarDescriptionVisibleOptions6 extends LightningElement {
    values = ['2', '3'];
    requiredOptions = ['1'];

    optionsWithAvatarSrc = [
        {
            value: '1',
            label: 'Carl Smith',
            src:
                'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
        },
        {
            value: '2',
            label: 'Suzan White',
            description: 'SW',
            src:
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
        },
        {
            value: '3',
            label: 'Philipp Johnson',
            description: 'PJ',
            src:
                'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg'
        },
        {
            value: '4',
            label: 'Miles Williams',
            description: 'MW',
            src:
                'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
        },
        {
            value: '5',
            label: 'Jane Doe',
            description: 'JD',
            iconName: 'standard:account',
            initials: 'JD'
        },
        {
            value: '6',
            label: 'Gina Garcia',
            description: 'GG',
            src:
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
        },
        {
            value: '7',
            label: 'John Smith',
            iconName: 'standard:address',
            initials: 'JS'
        },
        {
            value: '8',
            label: 'Xavier Anderson',
            description: 'XA',
            src:
                'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg'
        },
        {
            value: '9',
            label: 'James Jackson',
            description: 'JJ',
            src:
                'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
        },
        {
            value: '10',
            label: 'Diane Wilson',
            description: 'DW',
            src:
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
        }
    ];
}
