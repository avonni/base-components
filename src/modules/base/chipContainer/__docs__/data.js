const ITEMS = [
    {
        label: 'First chip',
        variant: 'base',
        prefixIconName: 'utility:table'
    },
    {
        label: 'Second chip',
        variant: 'base',
        avatar: {
            fallbackIconName: 'custom:custom1',
            variant: 'circle',
            position: 'left'
        }
    },
    {
        label: 'Third chip',
        variant: 'warning',
        suffixIconName: 'utility:table',
        outline: true
    },
    {
        label: 'Fourth chip',
        variant: 'base',
        avatar: {
            fallbackIconName: 'standard:user',
            variant: 'circle',
            initials: 'FP',
            position: 'left'
        }
    },
    {
        label: 'Fifth chip',
        outline: false
    },
    {
        label: 'Sixth chip',
        outline: true,
        prefixIconName: 'utility',
        suffixIconName: 'down', // not shown since there is an avatar
        avatar: {
            variant: 'circle',
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
        }
    },
    {
        label: 'Seventh chip',
        avatar: {
            variant: 'circle',
            position: 'right',
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg'
        },
        variant: 'offline',
        outline: true
    },
    {
        label: 'Eighth chip'
    }
];

const DEFAULT_ALTERNATIVE_TEXT = 'Selected Options:';

export { ITEMS, DEFAULT_ALTERNATIVE_TEXT };
