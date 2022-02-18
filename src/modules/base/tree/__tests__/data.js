export const ACTIONS = [
    {
        name: 'edit',
        label: 'Edit'
    },
    {
        name: 'add',
        label: 'Add',
        iconName: 'utility:add',
        visible: true
    },
    {
        name: 'custom',
        label: 'Custom action'
    }
];

export const ITEMS = [
    {
        label: 'Disabled',
        name: 'disabled',
        disabled: true,
        metatext: 'Some disabled meta',
        href: '#disabledLink',
        items: [
            {
                label: 'Hidden',
                name: 'hidden'
            }
        ]
    },
    {
        label: 'Loading',
        name: 'loading',
        isLoading: true,
        expanded: true,
        avatar: {
            src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
            size: 'small',
            variant: 'circle'
        },
        items: [
            {
                label: 'Child of loading',
                name: 'childOfLoading'
            }
        ]
    },
    {
        label: 'Regular',
        name: 'regular',
        href: '#link',
        metatext: 'Some meta',
        avatar: {
            fallbackIconName: 'standard:account'
        },
        fields: [
            {
                label: 'Field 1',
                value: 'field one'
            },
            {
                label: 'Date field',
                value: new Date(2023, 0, 28).toISOString(),
                type: 'date'
            }
        ],
        items: [
            {
                label: 'First level',
                name: 'firstLevel',
                items: [
                    {
                        label: 'Second level',
                        name: 'secondLevel'
                    },
                    {
                        label: 'Second level 2',
                        name: 'secondLevel2',
                        isLoading: true
                    },
                    {
                        label: 'Second level 3',
                        name: 'secondLevel3',
                        items: [
                            {
                                label: 'Third level',
                                name: 'thirdLevel'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        label: 'Simple',
        name: 'simple'
    }
];

const makeRegister = (item, key, fakeRegisters, y) => {
    fakeRegisters[item.name] = {
        bounds: jest.fn().mockReturnValue({
            top: 10 * y,
            left: 10,
            right: 20,
            bottom: 10 * y + 10,
            height: 10
        }),
        closePopover: jest.fn(),
        focus: jest.fn(),
        removeBorder: jest.fn(),
        setBorder: jest.fn(),
        setSelected: jest.fn(),
        unfocus: jest.fn(),
        key
    };

    y += 1;

    if (item.items && !item.disabled) {
        item.items.forEach((child, index) => {
            const childKey = `${key}.${index + 1}`;
            y = makeRegister(child, childKey, fakeRegisters, y);
        });
    }
    return y;
};

export const generateFakeRegisters = (items = ITEMS) => {
    const fakeRegisters = {};
    let y = 0;
    items.forEach((item, index) => {
        const key = (index + 1).toString();
        y = makeRegister(item, key, fakeRegisters, y);
    });
    return fakeRegisters;
};
