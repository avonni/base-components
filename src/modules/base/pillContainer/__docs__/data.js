const ACTIONS = [
    {
        label: 'Delete',
        name: 'delete',
        iconName: 'utility:close'
    },
    {
        label: 'See record',
        name: 'see',
        iconName: 'utility:search'
    },
    {
        label: 'Edit',
        name: 'edit',
        disabled: true
    }
];

const generateItems = (total) => {
    const items = [];
    for (let i = 0; i < total; i++) {
        items.push({
            label: `Item ${i}`,
            name: `item-${i}`
        });
    }
    return items;
};

const ITEMS = [
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

export { ACTIONS, ITEMS, generateItems };
