const ITEMS = [
    {
        label: 'First chip',
        variant: 'base'
    },
    {
        label: 'Second chip',
        variant: 'base',
        avatarPosition: 'left',
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
        avatarPosition: 'left',
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
        avatarPosition: 'right',
        outline: true
    },
    {
        label: 'Eighth chip'
    }
];

export { ITEMS };
