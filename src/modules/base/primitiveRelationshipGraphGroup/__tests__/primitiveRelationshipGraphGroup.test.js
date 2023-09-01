

import { createElement } from 'lwc';
import PrimitiveRelationshipGraphGroup from 'c/primitiveRelationshipGraphGroup';

// Not tested due to impossibility of targetting child component (mediaObject) slot content:
// avatarFallbackIconName
// avatarSrc

describe('PrimitiveRelationshipGraphGroup', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Primitive relationship graph group: Default attributes', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        expect(element.actionsPosition).toBe('top');
        expect(element.activeChild).toBeFalsy();
        expect(element.avatarFallbackIconName).toBeUndefined();
        expect(element.avatarSrc).toBeUndefined();
        expect(element.customActions).toMatchObject([]);
        expect(element.defaultActions).toMatchObject([]);
        expect(element.expanded).toBeTruthy();
        expect(element.expandIconName).toBe('utility:chevronright');
        expect(element.hideDefaultActions).toBeUndefined();
        expect(element.hideItemsCount).toBeFalsy();
        expect(element.href).toBeUndefined();
        expect(element.isFirstChild).toBeUndefined();
        expect(element.items).toMatchObject([]);
        expect(element.itemActions).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.selected).toBeUndefined();
        expect(element.shrinkIconName).toBe('utility:chevrondown');
        expect(element.variant).toBe('horizontal');
    });

    /* ----- ATTRIBUTES ----- */

    // actions-position
    // Depends on defaultActions
    it('Primitive relationship graph group: actionsPosition = top', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

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

    it('Primitive relationship graph group: actionsPosition = bottom', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

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

    // active-child
    it('Primitive relationship graph group: activeChild = false', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

        element.activeChild = false;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-box.group_active-child'
            );
            expect(wrapper).toBeFalsy();
        });
    });

    it('Primitive relationship graph group: activeChild = true', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

        element.activeChild = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector(
                '.slds-box.group_active-child'
            );
            expect(wrapper).toBeTruthy();
        });
    });

    // custom-actions
    // Depends on actionsPosition
    it('Primitive relationship graph group: customActions', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

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
            const buttons = element.shadowRoot.querySelectorAll('button');
            const icons = element.shadowRoot.querySelectorAll(
                'button lightning-icon'
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

    // default-actions
    // Depends on actionsPosition
    it('Primitive relationship graph group: defaultActions', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

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
            const buttons = element.shadowRoot.querySelectorAll('button');
            const icons = element.shadowRoot.querySelectorAll(
                'button lightning-icon'
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

    // expanded
    it('Primitive relationship graph group: expanded = false', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

        element.expanded = false;

        return Promise.resolve().then(() => {
            const summaryDetail = element.shadowRoot.querySelector(
                'avonni-summary-detail'
            );
            expect(summaryDetail.closed).toBeTruthy();
        });
    });

    it('Primitive relationship graph group: expanded = true', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

        element.expanded = true;
        const summaryDetail = element.shadowRoot.querySelector(
            'avonni-summary-detail'
        );

        return Promise.resolve().then(() => {
            expect(summaryDetail.closed).toBeFalsy();
        });
    });

    // expand-icon-name
    it('Primitive relationship graph group: expandIconName', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

        element.expandIconName = 'utility:apps';
        const summaryDetail = element.shadowRoot.querySelector(
            'avonni-summary-detail'
        );

        return Promise.resolve().then(() => {
            expect(summaryDetail.expandIconName).toBe('utility:apps');
        });
    });

    // hide-default-actions
    // Depends on defaultActions, customActions and actionPositions
    it('Primitive relationship graph group: hideDefaultActions = false', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

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
            const buttons = element.shadowRoot.querySelectorAll('button');
            expect(buttons).toHaveLength(5);
        });
    });

    it('Primitive relationship graph group: hideDefaultActions = true', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

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
            const buttons = element.shadowRoot.querySelectorAll('button');
            expect(buttons).toHaveLength(3);
        });
    });

    // hide-items-count
    // Depends on label
    it('Primitive relationship graph group: hideItemsCount = false', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

        element.hideItemsCount = false;
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h2');
            expect(title.textContent).toContain('(0)');
        });
    });

    it('Primitive relationship graph group: hideItemsCount = true', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

        element.hideItemsCount = true;
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h2');
            expect(title.textContent).not.toContain('(0)');
        });
    });

    // href
    it('Primitive relationship graph group: href is defined', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

        element.href = 'https://www.avonni.app/';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector('h2 a');
            expect(link).toBeTruthy();
        });
    });

    it('Primitive relationship graph group: href is undefined', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);
        const link = element.shadowRoot.querySelector('h2 a');
        expect(link).toBeFalsy();
    });

    // is-first-child
    // Depends on activeChild
    it('Primitive relationship graph group: isFirstChild', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

        element.isFirstChild = true;
        element.activeChild = true;

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.group');

            expect(element.shadowRoot.activeElement === wrapper).toBeTruthy();
        });
    });

    // items and item-actions
    it('Primitive relationship graph group: items and itemActions', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

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
            expect(itemsComponents[0].avatarSrc).toBe(items[0].avatarSrc);
            expect(itemsComponents[0].avatarFallbackIconName).toBe(
                items[0].avatarFallbackIconName
            );
            expect(itemsComponents[0].href).toBe(items[0].href);
            expect(itemsComponents[0].contentData).toMatchObject(items[0].data);
            expect(itemsComponents[0].groups).toMatchObject(items[0].groups);
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

    // label
    it('Primitive relationship graph group: label', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h2');
            expect(title.textContent).toContain('A string label');
        });
    });

    // selected
    // Depends on items (needs to have an item selected with groups)
    it('Primitive relationship graph group: selected = true', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

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

    it('Primitive relationship graph group: selected = false', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

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

    // selected-item-component (only getter)
    // Depends on items (need to have a selected item)
    it('Primitive relationship graph group: selectedItemComponent (getter)', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

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

    // shrink-icon-name
    it('Primitive relationship graph group: shrinkIconName', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

        element.shrinkIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const summaryDetail = element.shadowRoot.querySelector(
                'avonni-summary-detail'
            );
            expect(summaryDetail.shrinkIconName).toBe('utility:apps');
        });
    });

    // variant
    it('Primitive relationship graph group: variant = horizontal', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

        element.variant = 'horizontal';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.group');

            expect(wrapper.classList).toContain('group_horizontal');
            expect(wrapper.classList).not.toContain('group_vertical');
        });
    });

    it('Primitive relationship graph group: variant = vertical', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const wrapper = element.shadowRoot.querySelector('.group');

            expect(wrapper.classList).not.toContain('group_horizontal');
            expect(wrapper.classList).toContain('group_vertical');
        });
    });

    /* ----- EVENTS ----- */

    // select
    // Depends on items
    it('Primitive relationship graph group: select event', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

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

    // toggle
    // Depends on variant and items (need to have a selected item)
    it('Primitive relationship graph group: toggle event, with horizontal variant, selected item, and close = true', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

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

        const closeHandler = jest.fn();
        element.addEventListener('closeactivegroup', closeHandler);

        return Promise.resolve()
            .then(() => {
                const summaryDetail = element.shadowRoot.querySelector(
                    'avonni-summary-detail'
                );

                summaryDetail.dispatchEvent(
                    new CustomEvent('toggle', {
                        detail: {
                            closed: true
                        }
                    })
                );
            })
            .then(() => {
                expect(heightChangeHandler).toHaveBeenCalled();
                expect(closeHandler).toHaveBeenCalled();
            });
    });

    it('Primitive relationship graph group: toggle event, with horizontal variant, selected item, and close = false', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

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

        const closeHandler = jest.fn();
        element.addEventListener('closeactivegroup', closeHandler);

        return Promise.resolve()
            .then(() => {
                const summaryDetail = element.shadowRoot.querySelector(
                    'avonni-summary-detail'
                );

                summaryDetail.dispatchEvent(
                    new CustomEvent('toggle', {
                        detail: {
                            closed: false
                        }
                    })
                );
            })
            .then(() => {
                expect(heightChangeHandler).toHaveBeenCalled();
                expect(closeHandler).not.toHaveBeenCalled();
            });
    });

    it('Primitive relationship graph group: toggle event, with vertical variant, and no selected item', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

        element.variant = 'vertical';

        const heightChangeHandler = jest.fn();
        element.addEventListener('heightchange', heightChangeHandler);

        const closeHandler = jest.fn();
        element.addEventListener('closeactivegroup', closeHandler);

        return Promise.resolve()
            .then(() => {
                const summaryDetail = element.shadowRoot.querySelector(
                    'avonni-summary-detail'
                );

                summaryDetail.dispatchEvent(
                    new CustomEvent('toggle', {
                        detail: {
                            closed: true
                        }
                    })
                );
            })
            .then(() => {
                expect(heightChangeHandler).not.toHaveBeenCalled();
                expect(closeHandler).not.toHaveBeenCalled();
            });
    });

    // actionclick event
    // Depends on name, defaultActions, actionsPosition and items
    it('Primitive relationship graph group: actionclick event, on group action', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

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
            const button = element.shadowRoot.querySelector('button');
            button.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.name).toBe('group-action');
            expect(handler.mock.calls[0][0].detail.targetName).toBe(
                'a-string-name'
            );
        });
    });

    it('Primitive relationship graph group: actionclick event, on item action', () => {
        const element = createElement(
            'data-primitive-relationship-graph-group',
            {
                is: PrimitiveRelationshipGraphGroup
            }
        );

        document.body.appendChild(element);

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
            expect(handler.mock.calls[0][0].detail.name).toBe('action-name');
            expect(handler.mock.calls[0][0].detail.targetName).toBe('item-1');
        });
    });
});
