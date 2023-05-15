const ITEMS = [
    {
        label: 'First chip',
        name: 'first',
        variant: 'base',
        prefixIconName: 'utility:check'
    },
    {
        label: 'Second chip',
        name: 'second',
        variant: 'base',
        avatar: {
            fallbackIconName: 'custom:custom1',
            variant: 'circle',
            position: 'left'
        }
    },
    {
        label: 'Third chip',
        name: 'third',
        variant: 'warning',
        suffixIconName: 'utility:bug',
        outline: true
    },
    {
        label: 'Fourth chip',
        name: 'fourth',
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
        name: 'fifth',
        outline: false
    },
    {
        label: 'Sixth chip',
        name: 'sixth',
        outline: true,
        prefixIconName: 'utility:check',
        suffixIconName: 'utility:table',
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
            position: 'right',
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar3.jpg'
        },
        variant: 'offline',
        outline: true
    },
    {
        label: 'Eight chip',
        name: 'eight'
    }
];

const ITEMS_NO_MEDIA = [
    {
        label: 'First chip',
        name: 'first',
        variant: 'base'
    },
    {
        label: 'Second chip',
        name: 'second',
        variant: 'offline'
    },
    {
        label: 'Third chip',
        name: 'third',
        variant: 'error'
    },
    {
        label: 'Fourth chip',
        name: 'fourth',
        variant: 'warning'
    },
    {
        label: 'Fifth chip',
        name: 'fifth',
        variant: 'success'
    },
    {
        label: 'Sixth chip',
        name: 'sixth',
        variant: 'brand'
    }
];

export { ITEMS, ITEMS_NO_MEDIA };
