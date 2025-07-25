export const ACTIONS = [
    {
        name: 'Standard.Tree.Edit',
        label: 'Edit'
    },
    {
        name: 'Standard.Tree.Add',
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
                noSlots: true,
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
    },
    {
        label: 'Infinite loading',
        name: 'infiniteLoading',
        enableInfiniteLoading: true
    },
    {
        label: 'Unselectable child',
        name: 'unselectableChild',
        items: [
            {
                label: 'First level unselectable',
                name: 'firstLevelUnselectable',
                unselectable: true,
                items: [
                    {
                        label: 'Second level selectable',
                        name: 'secondLevelSelectable'
                    },
                    {
                        label: 'Second level 2 unselectable',
                        name: 'secondLevel2Unselectable',
                        unselectable: true
                    },
                    {
                        label: 'Second level 3 selectable',
                        name: 'secondLevel3Selectable',
                        items: [
                            {
                                label: 'Third level selectable',
                                name: 'thirdLevelSelectable'
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        label: 'No slots',
        name: 'noSlots',
        noSlots: true
    },
    {
        label: 'Simple unselectable',
        name: 'simpleUnselectable',
        unselectable: true
    }
];

export const ITEMS_WITH_INVALID_SORTING = [
    {
        label: 'No slots',
        name: 'noSlots',
        noSlots: true,
        type: 'valid',
        slottableTypes: ['invalidSorting']
    },
    {
        label: 'Item to move',
        name: 'itemToMove',
        type: 'invalidSorting'
    },
    {
        label: 'Invalid sorting',
        name: 'invalidSorting',
        items: [
            {
                label: 'First level invalid sorting',
                name: 'firstLevelInvalidSorting',
                type: 'invalidSorting'
            },
            {
                label: 'First level invalid sorting2',
                name: 'firstLevelInvalidSorting2',
                type: 'invalidSorting'
            }
        ],
        type: 'valid',
        slottableTypes: ['valid'],
        expanded: true
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
