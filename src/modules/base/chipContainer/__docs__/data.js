const ITEMS = [
    {
        label: 'First chip',
        name: 'first',
        variant: 'base',
        avatarPosition: 'left'
    },
    {
        label: 'Second chip',
        name: 'second',
        variant: 'base',
        avatar: {
            fallbackIconName: 'custom:custom1',
            variant: 'circle'
        }
    },
    {
        label: 'Third chip',
        name: 'third',
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
        name: 'fourth',
        variant: 'base',
        avatar: {
            fallbackIconName: 'standard:user',
            variant: 'circle',
            initials: 'FP'
        }
    },
    {
        label: 'Fifth chip',
        name: 'fifth',
        outline: false,
        avatarPosition: 'left'
    },
    {
        label: 'Sixth chip',
        name: 'sixth',
        outline: true,
        avatar: {
            variant: 'circle',
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
        }
    },
    {
        label: 'Seventh chip',
        name: 'seventh',
        avatar: {
            variant: 'circle',
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg'
        },
        variant: 'offline',
        outline: true
    },
    {
        label: 'Eighth chip',
        name: 'eighth'
    }
];

export { ITEMS };
