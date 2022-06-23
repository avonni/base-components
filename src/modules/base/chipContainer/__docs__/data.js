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
        suffixIconName: 'utility:bug',
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

const ITEMS_NO_MEDIA = [
    {
        label: 'First chip',
        variant: 'base'
    },
    {
        label: 'Second chip',
        variant: 'offline'
    },
    {
        label: 'Third chip',
        variant: 'error'
    },
    {
        label: 'Fourth chip',
        variant: 'warning'
    },
    {
        label: 'Fifth chip',
        variant: 'success'
    },
    {
        label: 'Sixth chip',
        variant: 'brand'
    }
];

const DEFAULT_ALTERNATIVE_TEXT = 'Selected Options:';

export { ITEMS, ITEMS_NO_MEDIA, DEFAULT_ALTERNATIVE_TEXT };
