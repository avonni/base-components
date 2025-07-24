import { createElement } from 'lwc';
import PrimitiveRelationshipGraphGroup from 'c/primitiveRelationshipGraphGroup';

// Not tested due to impossibility of targetting child component (mediaObject) slot content:
// avatarFallbackIconName
// avatarSrc

let element;
describe('PrimitiveRelationshipGraphGroup', () => {
    beforeEach(() => {
        element = createElement('data-primitive-relationship-graph-group', {
            is: PrimitiveRelationshipGraphGroup
        });
        document.body.appendChild(element);
    });

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.actionsMenuAlternativeText).toBe('Show menu');
            expect(element.actionsPosition).toBe('top');
            expect(element.activeChild).toBeFalsy();
            expect(element.avatarFallbackIconName).toBeUndefined();
            expect(element.avatarSrc).toBeUndefined();
            expect(element.customActions).toMatchObject([]);
            expect(element.defaultActions).toMatchObject([]);
            expect(element.expanded).toBeTruthy();
            expect(element.expandIconName).toBe('utility:chevronright');
            expect(element.hideDefaultActions).toBeFalsy();
            expect(element.hideItemsCount).toBeFalsy();
            expect(element.href).toBeUndefined();
            expect(element.isFirstChild).toBeFalsy();
            expect(element.isFirstLevel).toBeFalsy();
            expect(element.isLoading).toBeFalsy();
            expect(element.items).toMatchObject([]);
            expect(element.itemActions).toBeUndefined();
            expect(element.label).toBeUndefined();
            expect(element.loadingStateAlternativeText).toBe('Loading...');
            expect(element.name).toBeUndefined();
            expect(element.noResultsMessage).toBe('No items to display.');
            expect(element.selected).toBeFalsy();
            expect(element.shrinkIconName).toBe('utility:chevrondown');
            expect(element.variant).toBe('horizontal');
        });

        describe('actionsMenuAlternativeText', () => {
            it('Passed to the component', () => {
                element.actionsMenuAlternativeText = 'Show menus';

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-relationship-graph-item"]'
                    );
                    items.forEach((item) => {
                        expect(item.actionsMenuAlternativeText).toBe(
                            'Show menus'
                        );
                    });
                });
            });
        });

        describe('actionsPosition', () => {
            it('top', () => {
                element.actionsPosition = 'top';
                element.defaultActions = [
                    {
                        label: 'A string label',
                        name: 'a-string-name'
                    }
                ];

                return Promise.resolve().then(() => {
                    const bottomActions = element.shadowRoot.querySelector(
                        '[data-bottom-actions]'
                    );
                    expect(bottomActions).toBeFalsy();
                });
            });

            it('bottom', () => {
                element.actionsPosition = 'bottom';
                element.defaultActions = [
                    {
                        label: 'A string label',
                        name: 'a-string-name'
                    }
                ];

                return Promise.resolve().then(() => {
                    const bottomActions = element.shadowRoot.querySelector(
                        '[data-bottom-actions]'
                    );
                    expect(bottomActions).toBeTruthy();
                });
            });
        });

        describe('activeChild', () => {
            it('false', () => {
                element.activeChild = false;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '.slds-box.group_active-child'
                    );
                    expect(wrapper).toBeFalsy();
                });
            });

            it('true', () => {
                element.activeChild = true;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector(
                        '.slds-box.group_active-child'
                    );
                    expect(wrapper).toBeTruthy();
                });
            });
        });

        describe('customActions', () => {
            it('Passed to the component', () => {
                element.customActions = [
                    {
                        label: 'custom 1',
                        name: 'custom-1',
                        iconName: 'utility:apps'
                    },
                    {
                        label: 'custom 2',
                        name: 'custom-2',
                        disabled: true
                    }
                ];
                element.actionsPosition = 'bottom';

                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-relationship-graph-group-action-button"]'
                    );
                    const icons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-relationship-graph-group-action-button-icon"]'
                    );

                    expect(buttons).toHaveLength(2);
                    expect(buttons[0].textContent).toBe('custom 1');
                    expect(buttons[0].name).toBe('custom-1');
                    expect(buttons[0].value).toBe('custom-1');
                    expect(buttons[0].disabled).toBeFalsy();
                    expect(buttons[1].textContent).toBe('custom 2');
                    expect(buttons[1].name).toBe('custom-2');
                    expect(buttons[1].value).toBe('custom-2');
                    expect(buttons[1].disabled).toBeTruthy();

                    expect(icons).toHaveLength(1);
                    expect(icons[0].iconName).toBe('utility:apps');
                });
            });
        });

        describe('defaultActions', () => {
            it('Passed to the component', () => {
                element.defaultActions = [
                    {
                        label: 'default 1',
                        name: 'default-1',
                        iconName: 'utility:apps'
                    },
                    {
                        label: 'default 2',
                        name: 'default-2',
                        disabled: true
                    }
                ];
                element.actionsPosition = 'bottom';

                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-relationship-graph-group-action-button"]'
                    );
                    const icons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-relationship-graph-group-action-button-icon"]'
                    );

                    expect(buttons).toHaveLength(2);
                    expect(buttons[0].textContent).toBe('default 1');
                    expect(buttons[0].name).toBe('default-1');
                    expect(buttons[0].value).toBe('default-1');
                    expect(buttons[0].disabled).toBeFalsy();
                    expect(buttons[1].textContent).toBe('default 2');
                    expect(buttons[1].name).toBe('default-2');
                    expect(buttons[1].value).toBe('default-2');
                    expect(buttons[1].disabled).toBeTruthy();

                    expect(icons).toHaveLength(1);
                    expect(icons[0].iconName).toBe('utility:apps');
                });
            });
        });

        describe('expanded', () => {
            it('false', () => {
                element.expanded = false;

                return Promise.resolve().then(() => {
                    const section = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-relationship-graph-group"]'
                    );
                    expect(section.classList).not.toContain('slds-is-open');
                });
            });

            it('true', () => {
                element.expanded = true;

                return Promise.resolve().then(() => {
                    const section = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-relationship-graph-group"]'
                    );
                    expect(section.classList).toContain('slds-is-open');
                });
            });
        });

        describe('expandIconName', () => {
            it('Passed to the component', () => {
                element.expanded = false;
                element.expandIconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-icon-closed"]'
                    );
                    expect(icon.iconName).toBe('utility:apps');
                });
            });
        });

        describe('hideDefaultActions', () => {
            it('false', () => {
                element.defaultActions = [
                    {
                        label: 'default 1',
                        name: 'default-1',
                        iconName: 'utility:apps'
                    },
                    {
                        label: 'default 2',
                        name: 'default-2',
                        disabled: true
                    }
                ];

                element.customActions = [
                    {
                        label: 'custom 1',
                        name: 'custom-1',
                        iconName: 'utility:apps'
                    },
                    {
                        label: 'custom 2',
                        name: 'custom-2',
                        disabled: true
                    },
                    {
                        label: 'custom 3',
                        name: 'custom-3',
                        disabled: true,
                        iconName: 'utility:user'
                    }
                ];
                element.hideDefaultActions = false;
                element.actionsPosition = 'bottom';

                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-relationship-graph-group-action-button"]'
                    );
                    expect(buttons).toHaveLength(5);
                });
            });

            it('true', () => {
                element.defaultActions = [
                    {
                        label: 'default 1',
                        name: 'default-1',
                        iconName: 'utility:apps'
                    },
                    {
                        label: 'default 2',
                        name: 'default-2',
                        disabled: true
                    }
                ];

                element.customActions = [
                    {
                        label: 'custom 1',
                        name: 'custom-1',
                        iconName: 'utility:apps'
                    },
                    {
                        label: 'custom 2',
                        name: 'custom-2',
                        disabled: true
                    },
                    {
                        label: 'custom 3',
                        name: 'custom-3',
                        disabled: true,
                        iconName: 'utility:user'
                    }
                ];
                element.hideDefaultActions = true;
                element.actionsPosition = 'bottom';

                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-relationship-graph-group-action-button"]'
                    );
                    expect(buttons).toHaveLength(3);
                });
            });
        });

        describe('hideItemsCount', () => {
            it('false', () => {
                element.hideItemsCount = false;
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const title = element.shadowRoot.querySelector(
                        '[data-element-id="title"]'
                    );
                    expect(title.textContent).toContain('(0)');
                });
            });

            it('true', () => {
                element.hideItemsCount = true;
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const title = element.shadowRoot.querySelector(
                        '[data-element-id="title"]'
                    );
                    expect(title.textContent).not.toContain('(0)');
                });
            });
        });

        describe('href', () => {
            it('defined', () => {
                element.href = 'https://www.avonni.app/';

                return Promise.resolve().then(() => {
                    const link = element.shadowRoot.querySelector(
                        '[data-element-id="title"]'
                    );
                    expect(link.href).toBe('https://www.avonni.app/');
                });
            });

            it('undefined', () => {
                const link = element.shadowRoot.querySelector(
                    '[data-element-id="title"]'
                );
                expect(link.href).toBeUndefined();
            });
        });

        describe('isFirstChild', () => {
            it('true', () => {
                element.isFirstChild = true;
                element.activeChild = true;

                return Promise.resolve().then(() => {
                    const group = element.shadowRoot.querySelector(
                        '.avonni-relationship-graph-group__header-title-button'
                    );

                    expect(
                        element.shadowRoot.activeElement === group
                    ).toBeTruthy();
                });
            });
        });

        describe('hasRootHeader', () => {
            it('true', () => {
                element.hasRootHeader = true;
                element.isFirstLevel = true;

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector('.group');

                    expect(wrapper.classList).toContain(
                        'avonni-relationship-graph-group__parent-line'
                    );
                });
            });
        });

        describe('isLoading', () => {
            it('Passed to the component', () => {
                element.isLoading = true;

                return Promise.resolve().then(() => {
                    const spinner = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-spinner"]'
                    );

                    expect(spinner).toBeTruthy();
                });
            });
        });

        describe('items and itemActions', () => {
            it('Passed to the component', () => {
                const items = [
                    {
                        label: 'item 1',
                        name: 'item-1',
                        avatarSrc:
                            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
                        avatarFallbackIconName: 'standard:user',
                        href: 'https://www.avonni.app/',
                        data: [
                            {
                                label: 'A string label',
                                value: 'Some value'
                            }
                        ],
                        groups: [
                            {
                                label: 'Group 1',
                                name: 'group-1'
                            },
                            {
                                label: 'Group 2',
                                name: 'group-2'
                            }
                        ],
                        hideDefaultActions: true,
                        actions: [
                            {
                                label: 'Action 1',
                                name: 'action-1'
                            }
                        ],
                        selected: true,
                        activeSelection: true
                    },
                    {
                        label: 'item 2',
                        name: 'item-2'
                    }
                ];

                element.items = items;
                element.itemActions = [
                    {
                        label: 'Default action',
                        name: 'default-action'
                    }
                ];

                return Promise.resolve().then(() => {
                    const itemsComponents = element.shadowRoot.querySelectorAll(
                        'c-primitive-relationship-graph-item'
                    );

                    expect(itemsComponents).toHaveLength(2);
                    expect(itemsComponents[0].label).toBe(items[0].label);
                    expect(itemsComponents[0].name).toBe(items[0].name);
                    expect(itemsComponents[0].avatarSrc).toBe(
                        items[0].avatarSrc
                    );
                    expect(itemsComponents[0].avatarFallbackIconName).toBe(
                        items[0].avatarFallbackIconName
                    );
                    expect(itemsComponents[0].href).toBe(items[0].href);
                    expect(itemsComponents[0].contentData).toMatchObject(
                        items[0].data
                    );
                    expect(itemsComponents[0].groups).toMatchObject(
                        items[0].groups
                    );
                    expect(itemsComponents[0].hideDefaultActions).toBe(
                        items[0].hideDefaultActions
                    );
                    expect(itemsComponents[0].customActions).toMatchObject(
                        items[0].actions
                    );
                    expect(itemsComponents[0].selected).toBe(items[0].selected);
                    expect(itemsComponents[0].activeSelection).toBe(
                        items[0].activeSelection
                    );
                });
            });
        });

        describe('label', () => {
            it('Passed to the component', () => {
                element.label = 'A string label';

                return Promise.resolve().then(() => {
                    const title = element.shadowRoot.querySelector(
                        '[data-element-id="title"]'
                    );
                    expect(title.textContent).toContain('A string label');
                });
            });
        });

        describe('loadingStateAlternativeText', () => {
            it('Passed to the component', () => {
                element.loadingStateAlternativeText = 'Loading';
                element.isLoading = true;

                return Promise.resolve().then(() => {
                    const spinner = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-spinner"]'
                    );
                    expect(spinner.alternativeText).toBe('Loading');
                });
            });
        });

        describe('noResultsMessage', () => {
            it('Passed to the component', () => {
                element.noResultsMessage = 'No items to display';
                element.items = [];

                return Promise.resolve().then(() => {
                    const emptyMessage = element.shadowRoot.querySelector(
                        '[data-element-id="no-results-message"]'
                    );
                    expect(emptyMessage.textContent).toBe(
                        'No items to display'
                    );
                });
            });
        });

        describe('selected', () => {
            it('true', () => {
                element.selected = true;
                element.items = [
                    {
                        label: 'Item',
                        name: 'item',
                        selected: true,
                        groups: [
                            {
                                label: 'Group',
                                name: 'group'
                            }
                        ]
                    }
                ];

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector('.group');
                    expect(wrapper.classList).toContain('group_selected');
                });
            });

            it('false', () => {
                element.selected = false;
                element.items = [
                    {
                        label: 'Item',
                        name: 'item',
                        selected: true,
                        groups: [
                            {
                                label: 'Group',
                                name: 'group'
                            }
                        ]
                    }
                ];

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector('.group');
                    expect(wrapper.classList).not.toContain('group_selected');
                });
            });
        });

        describe('selectedItemComponent', () => {
            it('Passed to the component', () => {
                element.items = [
                    {
                        label: 'Item',
                        name: 'item',
                        selected: true
                    },
                    {
                        label: 'Item',
                        name: 'item-2'
                    }
                ];

                return Promise.resolve().then(() => {
                    const items = element.shadowRoot.querySelectorAll(
                        'c-primitive-relationship-graph-item'
                    );

                    let selectedItem;
                    items.forEach((item) => {
                        if (item.selected) selectedItem = item;
                    });
                    expect(element.selectedItemComponent).toBe(selectedItem);
                });
            });
        });

        describe('shrinkIconName', () => {
            it('Passed to the component', () => {
                element.shrinkIconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector([
                        '[data-element-id="lightning-icon-opened"]'
                    ]);
                    expect(icon.iconName).toBe('utility:apps');
                });
            });
        });

        describe('variant', () => {
            it('horizontal', () => {
                element.variant = 'horizontal';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector('.group');

                    expect(wrapper.classList).toContain('group_horizontal');
                    expect(wrapper.classList).not.toContain('group_vertical');
                });
            });

            it('vertical', () => {
                element.variant = 'vertical';

                return Promise.resolve().then(() => {
                    const wrapper = element.shadowRoot.querySelector('.group');

                    expect(wrapper.classList).not.toContain('group_horizontal');
                    expect(wrapper.classList).toContain('group_vertical');
                });
            });
        });
    });

    describe('Events', () => {
        describe('select', () => {
            it('Passed to the component', () => {
                element.items = [
                    {
                        label: 'Item',
                        name: 'item-1'
                    }
                ];

                const handler = jest.fn();
                element.addEventListener('select', handler);

                return Promise.resolve().then(() => {
                    const item = element.shadowRoot.querySelector(
                        'c-primitive-relationship-graph-item'
                    );

                    item.dispatchEvent(
                        new CustomEvent('select', {
                            detail: {
                                name: 'item-1'
                            }
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.name).toBe('item-1');
                });
            });
        });

        describe('toggle', () => {
            it('with horizontal variant, selected item, and expanded = true', () => {
                element.expanded = true;
                element.name = 'group';
                element.variant = 'horizontal';
                element.items = [
                    {
                        label: 'Item',
                        name: 'item',
                        selected: true
                    }
                ];

                const heightChangeHandler = jest.fn();
                element.addEventListener('heightchange', heightChangeHandler);

                const toggleHandler = jest.fn();
                element.addEventListener('toggle', toggleHandler);

                return Promise.resolve()
                    .then(() => {
                        const section = element.shadowRoot.querySelector(
                            '[data-element-id="section-title-button"]'
                        );

                        section.dispatchEvent(new CustomEvent('click'));
                    })
                    .then(() => {
                        expect(heightChangeHandler).toHaveBeenCalled();
                        expect(toggleHandler).toHaveBeenCalled();
                        expect(toggleHandler.mock.calls[0][0].detail.name).toBe(
                            'group'
                        );
                        expect(
                            toggleHandler.mock.calls[0][0].detail.closed
                        ).toBeTruthy();
                        expect(
                            toggleHandler.mock.calls[0][0].detail.isActiveGroup
                        ).toBeTruthy();
                    });
            });

            it('with horizontal variant, selected item, and expanded = false', () => {
                element.expanded = false;
                element.name = 'group';
                element.variant = 'horizontal';
                element.items = [
                    {
                        label: 'Item',
                        name: 'item',
                        selected: true
                    }
                ];

                const heightChangeHandler = jest.fn();
                element.addEventListener('heightchange', heightChangeHandler);

                const toggleHandler = jest.fn();
                element.addEventListener('toggle', toggleHandler);

                return Promise.resolve()
                    .then(() => {
                        const section = element.shadowRoot.querySelector(
                            '[data-element-id="section-title-button"]'
                        );

                        section.dispatchEvent(new CustomEvent('click'));
                    })
                    .then(() => {
                        expect(heightChangeHandler).toHaveBeenCalled();
                        expect(toggleHandler).toHaveBeenCalled();
                        expect(toggleHandler.mock.calls[0][0].detail.name).toBe(
                            'group'
                        );
                        expect(
                            toggleHandler.mock.calls[0][0].detail.closed
                        ).toBeFalsy();
                        expect(
                            toggleHandler.mock.calls[0][0].detail.isActiveGroup
                        ).toBeTruthy();
                    });
            });

            it('with vertical variant, and no selected item', () => {
                element.name = 'group';
                element.variant = 'vertical';

                const heightChangeHandler = jest.fn();
                element.addEventListener('heightchange', heightChangeHandler);

                const toggleHandler = jest.fn();
                element.addEventListener('toggle', toggleHandler);

                return Promise.resolve()
                    .then(() => {
                        const section = element.shadowRoot.querySelector(
                            '[data-element-id="section-title-button"]'
                        );

                        section.dispatchEvent(new CustomEvent('click'));
                    })
                    .then(() => {
                        expect(heightChangeHandler).not.toHaveBeenCalled();
                        expect(toggleHandler).toHaveBeenCalled();
                        expect(toggleHandler.mock.calls[0][0].detail.name).toBe(
                            'group'
                        );
                        expect(
                            toggleHandler.mock.calls[0][0].detail.closed
                        ).toBeTruthy();
                        expect(
                            toggleHandler.mock.calls[0][0].detail.isActiveGroup
                        ).toBeFalsy();
                    });
            });
        });

        describe('actionclick', () => {
            it('on group action', () => {
                const handler = jest.fn();
                element.addEventListener('actionclick', handler);

                element.defaultActions = [
                    {
                        label: 'Group action',
                        name: 'group-action'
                    }
                ];
                element.actionsPosition = 'bottom';
                element.name = 'a-string-name';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-relationship-graph-group-action-button"]'
                    );
                    button.click();

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.name).toBe(
                        'group-action'
                    );
                    expect(handler.mock.calls[0][0].detail.targetName).toBe(
                        'a-string-name'
                    );
                });
            });

            it('on item action', () => {
                const handler = jest.fn();
                element.addEventListener('actionclick', handler);

                element.items = [
                    {
                        label: 'Item',
                        name: 'item-1'
                    }
                ];

                return Promise.resolve().then(() => {
                    const item = element.shadowRoot.querySelector(
                        'c-primitive-relationship-graph-item'
                    );
                    item.dispatchEvent(
                        new CustomEvent('actionclick', {
                            detail: {
                                name: 'action-name',
                                targetName: 'item-1'
                            }
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.name).toBe(
                        'action-name'
                    );
                    expect(handler.mock.calls[0][0].detail.targetName).toBe(
                        'item-1'
                    );
                });
            });
        });
    });
});
