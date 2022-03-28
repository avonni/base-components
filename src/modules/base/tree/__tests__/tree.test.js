import { createElement } from 'lwc';
import Tree from '../tree';
import { ACTIONS, generateFakeRegisters, ITEMS } from './data';

// Not tested:
// Focus moving on keyboard navigation

let element;
describe('Tree', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-tree-item', {
            is: Tree
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.actions).toEqual([]);
        expect(element.actionsWhenDisabled).toEqual([]);
        expect(element.allowInlineEdit).toBeFalsy();
        expect(element.independentMultiSelect).toBeFalsy();
        expect(element.editableFields).toEqual([
            'label',
            'metatext',
            'name',
            'href',
            'expanded',
            'disabled',
            'isLoading'
        ]);
        expect(element.header).toBeUndefined();
        expect(element.isLoading).toBeFalsy();
        expect(element.isMultiSelect).toBeFalsy();
        expect(element.items).toEqual([]);
        expect(element.loadingStateAlternativeText).toBe('Loading...');
        expect(element.selectedItems).toEqual([]);
        expect(element.sortable).toBeFalsy();
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    // actions
    it('actions', () => {
        const addButton = element.shadowRoot.querySelector(
            '[data-element-id="button-add-action"]'
        );
        expect(addButton).toBeFalsy();

        element.actions = ACTIONS;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            items.forEach((item) => expect(item.actions).toEqual(ACTIONS));

            const addButtonAction = element.shadowRoot.querySelector(
                '[data-element-id="button-add-action"]'
            );
            expect(addButtonAction).toBeTruthy();
            const icon = addButtonAction.querySelector(
                '[data-element-id="lightning-icon-add-action"]'
            );
            expect(icon.iconName).toBe('utility:add');
        });
    });

    // actions-when-disabled
    it('actionsWhenDisabled', () => {
        element.actionsWhenDisabled = ACTIONS;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            items.forEach((item) =>
                expect(item.actionsWhenDisabled).toEqual(ACTIONS)
            );

            const addButtonAction = element.shadowRoot.querySelector(
                '[data-element-id="button-add-action"]'
            );
            expect(addButtonAction).toBeFalsy();
        });
    });

    // allow-inline-edit
    it('allowInlineEdit', () => {
        element.allowInlineEdit = true;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            items.forEach((item) => expect(item.allowInlineEdit).toBeTruthy());
        });
    });

    // edit-field
    it('editableFields', () => {
        const editableFields = ['metatext', 'href'];
        element.editableFields = editableFields;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            items.forEach((item) =>
                expect(item.editableFields).toEqual(editableFields)
            );
        });
    });

    // header
    it('header', () => {
        element.header = 'Some header';

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                '[data-element-id="h4-header"]'
            );
            expect(header.textContent).toBe('Some header');
        });
    });

    // is-loading and loading-state-alternative-text
    it('isLoading and loadingStateAlternativeText', () => {
        element.isLoading = true;
        element.loadingStateAlternativeText = 'Some loading text';
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const spinner = element.shadowRoot.querySelector(
                '[data-element-id="lightning-spinner"]'
            );
            expect(spinner).toBeTruthy();
            expect(spinner.alternativeText).toBe('Some loading text');

            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            expect(items).toHaveLength(0);
        });
    });

    // is-multi-select, disable-selection-cascade and selected-items
    it('isMultiSelect = false and selectedItems', () => {
        element.isMultiSelect = false;
        element.selectedItems = ['secondLevel2', 'loading'];
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            items.forEach((item) => expect(item.showCheckbox).toBeFalsy());

            const regular = Array.from(items).find(
                (item) => item.name === 'regular'
            );
            expect(regular.expanded).toBeTruthy();
            expect(regular.selected).toBeFalsy();

            const loading = Array.from(items).find(
                (item) => item.name === 'loading'
            );
            expect(loading.selected).toBeFalsy();
        });
    });

    it('isMultiSelect = true and selectedItems', () => {
        element.isMultiSelect = true;
        const handler = jest.fn();
        element.addEventListener('select', handler);
        element.selectedItems = [
            'thirdLevel',
            'secondLevel',
            'secondLevel2',
            'loading'
        ];
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            items.forEach((item) => expect(item.showCheckbox).toBeTruthy());

            const regular = Array.from(items).find(
                (item) => item.name === 'regular'
            );
            expect(regular.expanded).toBeFalsy();
            expect(regular.selected).toBeTruthy();

            const loading = Array.from(items).find(
                (item) => item.name === 'loading'
            );
            expect(loading.selected).toBeTruthy();
            expect(handler).toHaveBeenCalled();
            expect(element.selectedItems).toEqual([
                'thirdLevel',
                'secondLevel',
                'secondLevel2',
                'loading',
                'secondLevel3',
                'firstLevel',
                'regular',
                'childOfLoading'
            ]);
        });
    });

    it('isMultiSelect = true, selectedItems and independentMultiSelect', () => {
        element.isMultiSelect = true;
        element.independentMultiSelect = true;
        const handler = jest.fn();
        element.addEventListener('select', handler);
        const selectedItems = [
            'thirdLevel',
            'secondLevel',
            'secondLevel2',
            'loading'
        ];
        element.selectedItems = selectedItems;
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );

            const regular = Array.from(items).find(
                (item) => item.name === 'regular'
            );
            expect(regular.expanded).toBeFalsy();
            expect(regular.selected).toBeFalsy();

            const loading = Array.from(items).find(
                (item) => item.name === 'loading'
            );
            expect(loading.selected).toBeTruthy();
            expect(handler).not.toHaveBeenCalled();
            expect(element.selectedItems).toEqual(selectedItems);
        });
    });

    // items
    it('items', () => {
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            expect(items).toHaveLength(ITEMS.length);
            items.forEach((item, index) => {
                const originalItem = ITEMS[index];
                expect(item.ariaDisabled).toBe(
                    originalItem.disabled ? 'true' : 'false'
                );
                expect(item.ariaExpanded).toBe(
                    originalItem.expanded || !originalItem.items
                        ? 'true'
                        : 'false'
                );
                expect(item.ariaLabel).toBe(originalItem.label);
                expect(item.ariaLevel).toBe('1');
                expect(item.avatar).toEqual(originalItem.avatar);
                expect(item.disabled).toBe(originalItem.disabled || false);
                expect(item.expanded).toBe(
                    originalItem.expanded || !originalItem.items || false
                );
                expect(item.fields).toEqual(originalItem.fields);
                expect(item.href).toBe(originalItem.href);
                expect(item.isLoading).toBe(originalItem.isLoading || false);
                expect(item.label).toBe(originalItem.label);
                expect(item.level).toBe(1);
                expect(item.metatext).toBe(originalItem.metatext);
                expect(item.name).toBe(originalItem.name);
                expect(item.nodeKey).toBe((index + 1).toString());
            });

            [items[0], items[1], items[2]].forEach((item) =>
                expect(item.isLeaf).toBeFalsy()
            );
            expect(items[3].isLeaf).toBeTruthy();
            expect(items[2].childItems).toMatchObject([
                {
                    label: 'First level',
                    name: 'firstLevel',
                    children: [
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
                            children: [
                                {
                                    label: 'Third level',
                                    name: 'thirdLevel'
                                }
                            ]
                        }
                    ]
                }
            ]);
        });
    });

    // sortable
    it('sortable', () => {
        element.items = ITEMS;
        element.sortable = true;

        return Promise.resolve().then(() => {
            // Register the items
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            items.forEach((item) => expect(item.sortable).toBeTruthy());
        });
    });

    /*
     * ------------------------------------------------------------
     *  METHODS
     * -------------------------------------------------------------
     */

    // blur and focus
    it('blur() and focus() methods', () => {
        element.items = ITEMS;
        const fakeRegisters = generateFakeRegisters();

        return Promise.resolve().then(() => {
            // Register the items, including the nested ones
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            Object.values(fakeRegisters).forEach((register) => {
                items[0].dispatchEvent(
                    new CustomEvent('privateregisteritem', {
                        bubbles: true,
                        detail: register
                    })
                );
            });

            const item = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            const focusSpy = jest.spyOn(item, 'focus');
            element.focus();
            expect(focusSpy).toHaveBeenCalled();

            element.blur();
            expect(fakeRegisters[ITEMS[0].name].unfocus).toHaveBeenCalled();
        });
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    // actionclick
    it('actionclick event', () => {
        element.items = ITEMS;

        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            const event = new CustomEvent('privateactionclick', {
                detail: {
                    bounds: { x: 3, y: 3 },
                    name: 'custom',
                    key: '2'
                },
                bubbles: true
            });
            items[1].dispatchEvent(event);

            expect(handler).toHaveBeenCalledTimes(1);
            const detail = handler.mock.calls[0][0].detail;
            expect(detail.bounds).toEqual({ x: 3, y: 3 });
            expect(detail.levelPath).toEqual([1]);
            expect(detail.name).toBe('custom');
            expect(detail.targetName).toBe(ITEMS[1].name);
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });

    it('actionclick event, close edit popover if a standard action is clicked', () => {
        element.items = ITEMS;
        element.actions = ACTIONS;
        const fakeRegisters = generateFakeRegisters();

        return Promise.resolve().then(() => {
            // Register the items, including the nested ones
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            Object.values(fakeRegisters).forEach((register) => {
                items[0].dispatchEvent(
                    new CustomEvent('privateregisteritem', {
                        bubbles: true,
                        detail: register
                    })
                );
            });

            items[1].dispatchEvent(
                new CustomEvent('privateactionclick', {
                    detail: {
                        name: 'edit',
                        key: '2'
                    },
                    bubbles: true
                })
            );
            items[2].dispatchEvent(
                new CustomEvent('privateactionclick', {
                    detail: {
                        name: 'add',
                        key: '3'
                    },
                    bubbles: true
                })
            );
            expect(
                fakeRegisters[ITEMS[1].name].closePopover
            ).toHaveBeenCalled();
        });
    });

    it('actionclick event can cancel standard action', () => {
        element.items = ITEMS;

        const handler = jest.fn();
        element.addEventListener('change', handler);
        element.addEventListener('actionclick', (event) => {
            event.preventDefault();
        });

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            const event = new CustomEvent('privateactionclick', {
                detail: {
                    name: 'add',
                    key: '2'
                },
                bubbles: true
            });
            items[1].dispatchEvent(event);
            expect(handler).not.toHaveBeenCalled();
        });
    });

    // change
    it('change event, collapse and expand', () => {
        element.items = ITEMS;

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            const event = new CustomEvent('privateitemclick', {
                detail: {
                    target: 'chevron',
                    key: '3'
                },
                bubbles: true
            });
            items[2].dispatchEvent(event);

            const item = { ...ITEMS[2] };
            item.expanded = true;

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler.mock.calls[0][0].detail.action).toBe('expand');
            expect(handler.mock.calls[0][0].detail.levelPath).toEqual([2]);
            expect(handler.mock.calls[0][0].detail.name).toBe('regular');
            expect(handler.mock.calls[0][0].detail.items[2]).toMatchObject(
                item
            );
            expect(
                handler.mock.calls[0][0].detail.previousName
            ).toBeUndefined();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();

            expect(element.items[2]).toMatchObject(item);

            items[2].dispatchEvent(event);
            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler.mock.calls[1][0].detail.action).toBe('collapse');
        });
    });

    it('change event, collapse and expand triggered by keyboard', () => {
        element.items = ITEMS;

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            const event = new CustomEvent('privateitemkeydown', {
                detail: {
                    key: '3',
                    keyCode: 39
                },
                bubbles: true
            });
            items[2].dispatchEvent(event);

            const item = { ...ITEMS[2] };
            item.expanded = true;

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler.mock.calls[0][0].detail.action).toBe('expand');
            expect(handler.mock.calls[0][0].detail.levelPath).toEqual([2]);
            expect(handler.mock.calls[0][0].detail.name).toBe('regular');
            expect(handler.mock.calls[0][0].detail.items[2]).toMatchObject(
                item
            );
            expect(
                handler.mock.calls[0][0].detail.previousName
            ).toBeUndefined();
            expect(element.items[2]).toMatchObject(item);

            event.detail.keyCode = 37;
            items[2].dispatchEvent(event);
            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler.mock.calls[1][0].detail.action).toBe('collapse');
        });
    });

    it('change event, add', () => {
        element.items = ITEMS;

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            const event = new CustomEvent('privateactionclick', {
                detail: {
                    name: 'add',
                    key: '4'
                },
                bubbles: true
            });
            items[3].dispatchEvent(event);

            const item = { ...ITEMS[3] };
            item.items = [
                {
                    label: 'New branch'
                }
            ];

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler.mock.calls[0][0].detail.action).toBe('add');
            expect(handler.mock.calls[0][0].detail.levelPath).toEqual([3]);
            expect(handler.mock.calls[0][0].detail.name).toBe('simple');
            expect(handler.mock.calls[0][0].detail.items[3]).toMatchObject(
                item
            );
            expect(
                handler.mock.calls[0][0].detail.previousName
            ).toBeUndefined();
            expect(element.items[3]).toMatchObject(item);
        });
    });

    it('change event, add to root', () => {
        element.items = ITEMS;
        element.actions = ACTIONS;

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button-add-action"]'
            );
            button.click();

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler.mock.calls[0][0].detail.action).toBe('add');
            expect(handler.mock.calls[0][0].detail.levelPath).toEqual([
                ITEMS.length - 1
            ]);
            expect(handler.mock.calls[0][0].detail.name).toBeNull();
            expect(handler.mock.calls[0][0].detail.items).toHaveLength(5);
            expect(handler.mock.calls[0][0].detail.items[4]).toMatchObject({
                label: 'New branch'
            });
            expect(
                handler.mock.calls[0][0].detail.previousName
            ).toBeUndefined();
        });
    });

    it('change event, delete', () => {
        element.items = ITEMS;

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            const event = new CustomEvent('privateactionclick', {
                detail: {
                    name: 'delete',
                    key: '4'
                },
                bubbles: true
            });
            items[3].dispatchEvent(event);

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler.mock.calls[0][0].detail.action).toBe('delete');
            expect(handler.mock.calls[0][0].detail.levelPath).toEqual([3]);
            expect(handler.mock.calls[0][0].detail.name).toBe('simple');
            expect(handler.mock.calls[0][0].detail.items).toHaveLength(3);
            expect(
                handler.mock.calls[0][0].detail.previousName
            ).toBeUndefined();
        });
    });

    it('change event, duplicate', () => {
        element.items = ITEMS;

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            const event = new CustomEvent('privateactionclick', {
                detail: {
                    name: 'duplicate',
                    key: '4'
                },
                bubbles: true
            });
            items[3].dispatchEvent(event);

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler.mock.calls[0][0].detail.action).toBe('duplicate');
            expect(handler.mock.calls[0][0].detail.levelPath).toEqual([3]);
            expect(handler.mock.calls[0][0].detail.name).not.toBe(
                ITEMS[3].name
            );
            expect(typeof handler.mock.calls[0][0].detail.name).toBe('string');
            expect(handler.mock.calls[0][0].detail.items).toHaveLength(5);
            expect(handler.mock.calls[0][0].detail.items[4].label).toBe(
                ITEMS[3].label
            );
            expect(handler.mock.calls[0][0].detail.previousName).toBe(
                ITEMS[3].name
            );
        });
    });

    it('change event, edit', () => {
        element.items = ITEMS;

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            items[0].dispatchEvent(
                new CustomEvent('privateactionclick', {
                    detail: {
                        name: 'edit',
                        key: '1'
                    }
                })
            );
            items[0].dispatchEvent(
                new CustomEvent('change', {
                    detail: {
                        values: {
                            disabled: false,
                            label: 'new label',
                            name: 'new name'
                        },
                        key: '1'
                    },
                    bubbles: true
                })
            );

            const item = { ...ITEMS[0] };
            item.disabled = false;
            item.label = 'new label';
            item.name = 'new name';

            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler.mock.calls[0][0].detail.action).toBe('edit');
            expect(handler.mock.calls[0][0].detail.levelPath).toEqual([0]);
            expect(handler.mock.calls[0][0].detail.name).toBe('new name');
            expect(handler.mock.calls[0][0].detail.items[0]).toMatchObject(
                item
            );
            expect(handler.mock.calls[0][0].detail.previousName).toBe(
                'disabled'
            );

            expect(element.items[0]).toMatchObject(item);
        });
    });

    it('change event, move an item down', () => {
        const fakeRegisters = generateFakeRegisters();
        element.items = ITEMS;
        element.sortable = true;
        jest.useFakeTimers();

        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            // Register the items, including the nested ones
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            Object.values(fakeRegisters).forEach((register) => {
                items[0].dispatchEvent(
                    new CustomEvent('privateregisteritem', {
                        bubbles: true,
                        detail: register
                    })
                );
            });

            // Mouse down
            items[1].dispatchEvent(
                new CustomEvent('privatemousedown', {
                    detail: {
                        name: ITEMS[1].name,
                        key: '2'
                    },
                    bubbles: true
                })
            );

            jest.runAllTimers();
            expect(element.items[1].expanded).toBeFalsy();
            expect(handler).toHaveBeenCalledTimes(1);
            expect(handler.mock.calls[0][0].detail.action).toBe('collapse');
            expect(handler.mock.calls[0][0].detail.name).toBe(ITEMS[1].name);
            expect(
                handler.mock.calls[0][0].detail.previousName
            ).toBeUndefined();
            const updatedItems = JSON.parse(JSON.stringify(ITEMS));
            updatedItems[1].expanded = false;
            expect(handler.mock.calls[0][0].detail.items).toMatchObject(
                updatedItems
            );
            const tree = element.shadowRoot.querySelector(
                '[data-element-id="div-tree-wrapper"]'
            );
            expect(tree.style.cssText).toBe(
                '--avonni-tree-item-color-background-hover: transparent;'
            );

            // Mouse move to bottom of item
            const mouseMove = new CustomEvent('mousemove', {
                bubbles: true,
                composed: true
            });
            mouseMove.clientY = 18;
            const setBorderCallback = fakeRegisters.loading.setBorder;
            tree.dispatchEvent(mouseMove);
            expect(setBorderCallback).toHaveBeenCalled();
            expect(setBorderCallback.mock.calls[0][0]).toBe('bottom');

            // Mouse move below the item
            mouseMove.clientY = 35;
            const boundsCallback = fakeRegisters.regular.bounds;
            tree.dispatchEvent(mouseMove);
            expect(boundsCallback).toHaveBeenCalled();

            tree.dispatchEvent(
                new CustomEvent('mouseup', {
                    bubbles: true,
                    composed: true
                })
            );
            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler.mock.calls[1][0].detail.action).toBe('move');
            expect(handler.mock.calls[1][0].detail.levelPath).toEqual([1]);
            expect(handler.mock.calls[1][0].detail.name).toBe(ITEMS[1].name);
            expect(
                handler.mock.calls[1][0].detail.previousName
            ).toBeUndefined();
            expect(handler.mock.calls[1][0].detail.items[1].name).toBe(
                ITEMS[2].name
            );
            expect(handler.mock.calls[1][0].detail.items[2].name).toBe(
                ITEMS[1].name
            );
        });
    });

    it('change event, move an item up', () => {
        const fakeRegisters = generateFakeRegisters();
        element.items = ITEMS;
        element.sortable = true;

        jest.useFakeTimers();
        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            // Register the items, including the nested ones
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            Object.values(fakeRegisters).forEach((register) => {
                items[0].dispatchEvent(
                    new CustomEvent('privateregisteritem', {
                        bubbles: true,
                        detail: register
                    })
                );
            });

            // Mouse down
            items[1].dispatchEvent(
                new CustomEvent('privatemousedown', {
                    detail: {
                        name: ITEMS[1].name,
                        key: '2'
                    },
                    bubbles: true
                })
            );
            jest.runAllTimers();

            // Mouse to top of item
            const mouseMove = new CustomEvent('mousemove', {
                bubbles: true,
                composed: true
            });
            mouseMove.clientY = 10;
            const setBorderCallback = fakeRegisters.loading.setBorder;
            const tree = element.shadowRoot.querySelector(
                '[data-element-id="div-tree-wrapper"]'
            );
            tree.dispatchEvent(mouseMove);
            expect(setBorderCallback).toHaveBeenCalled();
            expect(setBorderCallback.mock.calls[0][0]).toBe('top');

            // Mouse above the item
            mouseMove.clientY = 5;
            const boundsCallback = fakeRegisters.disabled.bounds;
            tree.dispatchEvent(mouseMove);
            expect(boundsCallback).toHaveBeenCalled();

            tree.dispatchEvent(
                new CustomEvent('mouseup', {
                    bubbles: true,
                    composed: true
                })
            );
            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler.mock.calls[1][0].detail.action).toBe('move');
            expect(handler.mock.calls[1][0].detail.levelPath).toEqual([1]);
            expect(handler.mock.calls[1][0].detail.name).toBe(ITEMS[1].name);
            expect(
                handler.mock.calls[1][0].detail.previousName
            ).toBeUndefined();
            expect(handler.mock.calls[1][0].detail.items[1].name).toBe(
                ITEMS[0].name
            );
            expect(handler.mock.calls[1][0].detail.items[0].name).toBe(
                ITEMS[1].name
            );
        });
    });

    it('change event, move an item inside another', () => {
        const fakeRegisters = generateFakeRegisters();
        element.items = ITEMS;
        element.sortable = true;

        jest.useFakeTimers();
        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            // Register the items, including the nested ones
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            Object.values(fakeRegisters).forEach((register) => {
                items[0].dispatchEvent(
                    new CustomEvent('privateregisteritem', {
                        bubbles: true,
                        detail: register
                    })
                );
            });

            // Mouse down
            items[1].dispatchEvent(
                new CustomEvent('privatemousedown', {
                    detail: {
                        name: ITEMS[1].name,
                        key: '2'
                    },
                    bubbles: true
                })
            );
            jest.runAllTimers();

            // Move to the bottom item
            const mouseMove = new CustomEvent('mousemove', {
                bubbles: true,
                composed: true
            });
            mouseMove.clientY = 34;
            const tree = element.shadowRoot.querySelector(
                '[data-element-id="div-tree-wrapper"]'
            );
            tree.dispatchEvent(mouseMove);

            // Mouse on the center of the item
            mouseMove.clientY = 35;
            const setBorderCallback = fakeRegisters.regular.setBorder;
            tree.dispatchEvent(mouseMove);
            expect(setBorderCallback).toHaveBeenCalled();
            expect(setBorderCallback.mock.calls[0][0]).toBeUndefined();
            // The item is expanded
            jest.runAllTimers();
            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler.mock.calls[1][0].detail.action).toBe('expand');
            expect(handler.mock.calls[1][0].detail.name).toBe(ITEMS[2].name);

            tree.dispatchEvent(
                new CustomEvent('mouseup', {
                    bubbles: true,
                    composed: true
                })
            );
            expect(handler).toHaveBeenCalledTimes(3);
            expect(handler.mock.calls[2][0].detail.action).toBe('move');
            expect(handler.mock.calls[2][0].detail.levelPath).toEqual([1]);
            expect(handler.mock.calls[2][0].detail.name).toBe(ITEMS[1].name);
            expect(
                handler.mock.calls[2][0].detail.previousName
            ).toBeUndefined();
            expect(handler.mock.calls[2][0].detail.items).toHaveLength(3);
            expect(handler.mock.calls[2][0].detail.items[1].items).toHaveLength(
                2
            );
            expect(handler.mock.calls[2][0].detail.items[1].items[0].name).toBe(
                ITEMS[1].name
            );
        });
    });

    it('change event, move an item to a more nested position', () => {
        const fakeRegisters = generateFakeRegisters();
        element.sortable = true;
        element.items = ITEMS;
        element.selectedItems = ['thirdLevel'];

        jest.useFakeTimers();
        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            // Register the items, including the nested ones
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            Object.values(fakeRegisters).forEach((register) => {
                items[0].dispatchEvent(
                    new CustomEvent('privateregisteritem', {
                        bubbles: true,
                        detail: register
                    })
                );
            });

            // Mouse down
            items[3].dispatchEvent(
                new CustomEvent('privatemousedown', {
                    detail: {
                        name: ITEMS[3].name,
                        key: '4'
                    },
                    bubbles: true
                })
            );
            jest.runAllTimers();

            // Move to the top of the item
            const mouseMove = new CustomEvent('mousemove', {
                bubbles: true,
                composed: true
            });
            mouseMove.clientY = 88;
            mouseMove.clientX = 10;
            const tree = element.shadowRoot.querySelector(
                '[data-element-id="div-tree-wrapper"]'
            );
            tree.dispatchEvent(mouseMove);

            // Move to the bottom of the item above
            mouseMove.clientY = 84;
            tree.dispatchEvent(mouseMove);
            mouseMove.clientY = 87;
            const setBorderCallback = fakeRegisters.thirdLevel.setBorder;
            tree.dispatchEvent(mouseMove);
            tree.dispatchEvent(mouseMove);
            expect(setBorderCallback).toHaveBeenCalledTimes(2);

            // Move to the right, to the most nested item above the current item
            mouseMove.clientX = 22;
            tree.dispatchEvent(mouseMove);

            // Move to the left twice
            mouseMove.clientX = 11;
            tree.dispatchEvent(mouseMove);
            mouseMove.clientX = 0;
            tree.dispatchEvent(mouseMove);
            expect(setBorderCallback).toHaveBeenCalledTimes(4);
            expect(setBorderCallback.mock.calls[2][1]).toBe(3);
            expect(setBorderCallback.mock.calls[3][1]).toBe(2);

            // Move back to the right once
            mouseMove.clientX = 12;
            tree.dispatchEvent(mouseMove);
            expect(setBorderCallback).toHaveBeenCalledTimes(5);
            expect(setBorderCallback.mock.calls[4][1]).toBe(3);

            tree.dispatchEvent(
                new CustomEvent('mouseup', {
                    bubbles: true,
                    composed: true
                })
            );
            expect(handler).toHaveBeenCalledTimes(1);
            const detail = handler.mock.calls[0][0].detail;
            expect(detail.action).toBe('move');
            expect(detail.levelPath).toEqual([3]);
            expect(detail.name).toBe(ITEMS[3].name);
            expect(detail.previousName).toBeUndefined();
            expect(detail.items).toHaveLength(3);
            expect(detail.items[2].items[0].items[3]).toMatchObject(ITEMS[3]);
        });
    });

    // keyboard navigation
    it('keyboard navigation, up', () => {
        const fakeRegisters = generateFakeRegisters();
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            // Register the items, including the nested ones
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            Object.values(fakeRegisters).forEach((register) => {
                items[0].dispatchEvent(
                    new CustomEvent('privateregisteritem', {
                        bubbles: true,
                        detail: register
                    })
                );
            });

            // Focus an item
            items[1].dispatchEvent(
                new CustomEvent('focus', {
                    detail: {
                        key: '2'
                    },
                    bubbles: true
                })
            );

            // Press up
            const event = new CustomEvent('privateitemkeydown', {
                detail: {
                    key: '2',
                    keyCode: 38
                },
                bubbles: true
            });
            items[1].dispatchEvent(event);
            expect(items[0].tabIndex).toBe(0);
            expect(items[0].ariaSelected).toBe('true');
        });
    });

    it('keyboard navigation, down', () => {
        const fakeRegisters = generateFakeRegisters();
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            // Register the items, including the nested ones
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            Object.values(fakeRegisters).forEach((register) => {
                items[0].dispatchEvent(
                    new CustomEvent('privateregisteritem', {
                        bubbles: true,
                        detail: register
                    })
                );
            });

            // Focus an item
            items[1].dispatchEvent(
                new CustomEvent('focus', {
                    detail: {
                        key: '2'
                    },
                    bubbles: true
                })
            );

            // Press down
            const event = new CustomEvent('privateitemkeydown', {
                detail: {
                    key: '2',
                    keyCode: 40
                },
                bubbles: true
            });
            items[1].dispatchEvent(event);
            expect(fakeRegisters.loading.focus).toHaveBeenCalled();
        });
    });

    it('keyboard navigation, home', () => {
        const fakeRegisters = generateFakeRegisters();
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            // Register the items, including the nested ones
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            Object.values(fakeRegisters).forEach((register) => {
                items[0].dispatchEvent(
                    new CustomEvent('privateregisteritem', {
                        bubbles: true,
                        detail: register
                    })
                );
            });

            // Focus an item
            items[2].dispatchEvent(
                new CustomEvent('focus', {
                    detail: {
                        key: '3'
                    },
                    bubbles: true
                })
            );

            // Press down
            const event = new CustomEvent('privateitemkeydown', {
                detail: {
                    key: '3',
                    keyCode: 36
                },
                bubbles: true
            });
            items[2].dispatchEvent(event);
            expect(items[0].tabIndex).toBe(0);
            expect(items[0].ariaSelected).toBe('true');
        });
    });

    it('keyboard navigation, end', () => {
        const fakeRegisters = generateFakeRegisters();
        element.items = ITEMS;

        return Promise.resolve().then(() => {
            // Register the items, including the nested ones
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            Object.values(fakeRegisters).forEach((register) => {
                items[0].dispatchEvent(
                    new CustomEvent('privateregisteritem', {
                        bubbles: true,
                        detail: register
                    })
                );
            });

            // Focus an item
            items[0].dispatchEvent(
                new CustomEvent('focus', {
                    detail: {
                        key: '1'
                    },
                    bubbles: true
                })
            );

            // Press down
            const event = new CustomEvent('privateitemkeydown', {
                detail: {
                    key: '1',
                    keyCode: 35
                },
                bubbles: true
            });
            items[0].dispatchEvent(event);
            expect(items[3].tabIndex).toBe(0);
            expect(items[3].ariaSelected).toBe('true');
        });
    });

    // select
    it('select event', () => {
        element.items = ITEMS;
        element.selectedItems = ['thirdLevel'];

        const handler = jest.fn();
        element.addEventListener('select', handler);

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            items[1].dispatchEvent(
                new CustomEvent('privateitemclick', {
                    detail: {
                        bounds: { x: 5, y: 12 },
                        target: 'anchor',
                        key: '2'
                    },
                    bubbles: true
                })
            );

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeTruthy();
            expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
            expect(handler.mock.calls[0][0].detail.bounds).toEqual({
                x: 5,
                y: 12
            });
            expect(handler.mock.calls[0][0].detail.levelPath).toEqual([1]);
            expect(handler.mock.calls[0][0].detail.selectedItems).toEqual([
                'loading'
            ]);
        });
    });

    it('select event, for multi-select tree', () => {
        const fakeRegisters = generateFakeRegisters();
        const handler = jest.fn();
        element.addEventListener('select', handler);

        element.items = ITEMS;
        element.selectedItems = ['thirdLevel', 'secondLevel'];
        element.isMultiSelect = true;
        expect(handler).toHaveBeenCalledTimes(1);
        expect(handler.mock.calls[0][0].detail.selectedItems).toEqual([
            'thirdLevel',
            'secondLevel',
            'secondLevel3'
        ]);

        return Promise.resolve().then(() => {
            // Register the items, including the nested ones
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            Object.values(fakeRegisters).forEach((register) => {
                items[0].dispatchEvent(
                    new CustomEvent('privateregisteritem', {
                        bubbles: true,
                        detail: register
                    })
                );
            });

            items[2].dispatchEvent(
                new CustomEvent('privateitemclick', {
                    detail: {
                        target: 'anchor',
                        key: '3.1.2',
                        bounds: { x: 5, y: 12 }
                    },
                    bubbles: true
                })
            );

            expect(handler).toHaveBeenCalledTimes(2);
            expect(handler.mock.calls[1][0].detail.bounds).toEqual({
                x: 5,
                y: 12
            });
            expect(handler.mock.calls[1][0].detail.levelPath).toEqual([
                2, 0, 1
            ]);
            expect(handler.mock.calls[1][0].detail.selectedItems).toEqual([
                'thirdLevel',
                'secondLevel',
                'secondLevel3',
                'secondLevel2',
                'firstLevel',
                'regular'
            ]);
        });
    });

    it('select event, for multi-select tree with independent-multi-select = true', () => {
        const fakeRegisters = generateFakeRegisters();
        const handler = jest.fn();
        element.addEventListener('select', handler);

        element.independentMultiSelect = true;
        element.items = ITEMS;
        element.selectedItems = ['thirdLevel', 'secondLevel'];
        element.isMultiSelect = true;

        return Promise.resolve().then(() => {
            // Register the items, including the nested ones
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            Object.values(fakeRegisters).forEach((register) => {
                items[0].dispatchEvent(
                    new CustomEvent('privateregisteritem', {
                        bubbles: true,
                        detail: register
                    })
                );
            });

            items[2].dispatchEvent(
                new CustomEvent('privateitemclick', {
                    detail: {
                        target: 'anchor',
                        key: '3.1.2',
                        bounds: { x: 5, y: 12 }
                    },
                    bubbles: true
                })
            );

            expect(handler).toHaveBeenCalledTimes(1);
            const detail = handler.mock.calls[0][0].detail;
            expect(detail.bounds).toEqual({ x: 5, y: 12 });
            expect(detail.levelPath).toEqual([2, 0, 1]);
            expect(detail.selectedItems).toEqual([
                'thirdLevel',
                'secondLevel',
                'secondLevel2'
            ]);
        });
    });

    it('select event is delayed when inline edit is allowed', () => {
        element.items = ITEMS;
        element.selectedItems = ['thirdLevel'];
        element.allowInlineEdit = true;

        jest.useFakeTimers();
        const handler = jest.fn();
        element.addEventListener('select', handler);

        return Promise.resolve().then(() => {
            const items = element.shadowRoot.querySelectorAll(
                '[data-element-id="avonni-primitive-tree-item"]'
            );
            items[1].dispatchEvent(
                new CustomEvent('privateitemclick', {
                    detail: {
                        target: 'anchor',
                        key: '2'
                    },
                    bubbles: true
                })
            );

            expect(handler).not.toHaveBeenCalled();
            jest.runAllTimers();
            expect(handler).toHaveBeenCalled();
        });
    });
});
