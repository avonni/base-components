import { createElement } from 'lwc';
import PrimitiveRelationshipGraphLevel from 'c/primitiveRelationshipGraphLevel';

const GROUPS = [
    {
        label: 'Group 2',
        name: 'group-2'
    },
    {
        label: 'Group 1',
        name: 'group-1',
        avatarSrc:
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        avatarFallbackIconName: 'utility:user',
        href: 'https://www.avonni.app/',
        items: [
            {
                label: 'Item',
                name: 'item'
            }
        ],
        expanded: true,
        hideDefaultActions: true,
        actions: [
            {
                label: 'Action',
                name: 'action'
            }
        ],
        selected: true
    },
    {
        label: 'Group 3',
        name: 'group-3'
    }
];

const SELECTED_GROUPS = [
    {
        label: 'Child group 1',
        name: 'child-group-1'
    },
    {
        label: 'Child group 2',
        name: 'child-group-2'
    },
    {
        label: 'Child group 3',
        name: 'child-group-3'
    }
];

const ACTIONS = [
    {
        label: 'Action 1',
        name: 'action-1'
    },
    {
        label: 'Action 2',
        name: 'action-2'
    },
    {
        label: 'Action 3',
        name: 'action-3'
    }
];

describe('PrimitiveRelationshipGraphLevel', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Primitive relationship graph level: Default attributes', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        expect(element.activeGroups).toBeUndefined();
        expect(element.currentLevelHeight).toBe(0);
        expect(element.currentLevelWidth).toBe(0);
        expect(element.expandIconName).toBeUndefined();
        expect(element.groupActions).toBeUndefined();
        expect(element.groupActionsPosition).toBeUndefined();
        expect(element.groups).toMatchObject([]);
        expect(element.hideItemsCount).toBeUndefined();
        expect(element.itemActions).toBeUndefined();
        expect(element.selectedGroups).toBeUndefined();
        expect(element.shrinkIconName).toBeUndefined();
        expect(element.variant).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // active-groups
    // Depends on groups
    it('Primitive relationship graph level: activeGroups', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        element.groups = GROUPS;
        element.activeGroups = true;

        return Promise.resolve().then(() => {
            const groups = element.shadowRoot.querySelectorAll(
                'c-primitive-relationship-graph-group'
            );

            groups.forEach((group) => {
                expect(group.activeChild).toBeTruthy();
            });
        });
    });

    // current-level-height
    // Depends on groups
    it('Primitive relationship graph level: currentLevelHeight', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);
        element.groups = GROUPS;

        return Promise.resolve().then(() => {
            expect(element.currentLevelHeight).toBe(0);
        });
    });

    // current-level-width
    it('Primitive relationship graph level: currentLevelWidth', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            expect(element.currentLevelWidth).toBe(0);
        });
    });

    // expand-icon-name
    // Depends on groups and selectedGroups
    it('Primitive relationship graph level: expandIconName', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        element.groups = GROUPS;
        element.selectedGroups = SELECTED_GROUPS;
        element.expandIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const groups = element.shadowRoot.querySelectorAll(
                'c-primitive-relationship-graph-group'
            );
            const childLevel = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );

            groups.forEach((group) => {
                expect(group.expandIconName).toBe('utility:apps');
            });

            expect(childLevel.expandIconName).toBe('utility:apps');
        });
    });

    // group-actions
    // Depends on groups
    it('Primitive relationship graph level: groupActions', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        element.groups = GROUPS;
        element.groupActions = ACTIONS;

        return Promise.resolve().then(() => {
            const groups = element.shadowRoot.querySelectorAll(
                'c-primitive-relationship-graph-group'
            );

            groups.forEach((group) => {
                expect(group.defaultActions).toMatchObject(ACTIONS);
            });
        });
    });

    // group-actions-positions
    // Depends on groups
    it('Primitive relationship graph level: groupActionsPosition', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        element.groupActionsPosition = 'bottom';
        element.groups = GROUPS;

        return Promise.resolve().then(() => {
            const groups = element.shadowRoot.querySelectorAll(
                'c-primitive-relationship-graph-group'
            );

            groups.forEach((group) => {
                expect(group.actionsPosition).toBe('bottom');
            });
        });
    });

    // groups
    it('Primitive relationship graph level: groups', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        element.groups = GROUPS;

        return Promise.resolve().then(() => {
            const groups = element.shadowRoot.querySelectorAll(
                'c-primitive-relationship-graph-group'
            );

            expect(groups[0].isFirstChild).toBeTruthy();

            groups.forEach((group, index) => {
                expect(group.label).toBe(GROUPS[index].label);
                expect(group.name).toBe(GROUPS[index].name);
                expect(group.avatarSrc).toBe(GROUPS[index].avatarSrc);
                expect(group.avatarFallbackIconName).toBe(
                    GROUPS[index].avatarFallbackIconName
                );
                expect(group.href).toBe(GROUPS[index].href);
                expect(group.items).toMatchObject(GROUPS[index].items || []);
                expect(group.expanded).toBe(GROUPS[index].expanded || true);
                expect(group.hideDefaultActions).toBe(
                    GROUPS[index].hideDefaultActions
                );
                expect(group.customActions).toMatchObject(
                    GROUPS[index].actions || []
                );
                expect(group.selected).toBe(GROUPS[index].selected);
            });
        });
    });

    // hide-items-count
    // Depends on groups
    it('Primitive relationship graph level: hideItemsCount', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        element.hideItemsCount = true;
        element.groups = GROUPS;

        return Promise.resolve().then(() => {
            const groups = element.shadowRoot.querySelectorAll(
                'c-primitive-relationship-graph-group'
            );

            groups.forEach((group) => {
                expect(group.hideItemsCount).toBeTruthy();
            });
        });
    });

    // item-actions
    // Depends on groups
    it('Primitive relationship graph level: itemActions', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        element.itemActions = ACTIONS;
        element.groups = GROUPS;

        return Promise.resolve().then(() => {
            const groups = element.shadowRoot.querySelectorAll(
                'c-primitive-relationship-graph-group'
            );

            groups.forEach((group) => {
                expect(group.itemActions).toMatchObject(ACTIONS);
            });
        });
    });

    // selected-groups
    it('Primitive relationship graph level: selectedGroups', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        element.selectedGroups = GROUPS;

        return Promise.resolve().then(() => {
            const line = element.shadowRoot.querySelector('.line');
            const childLevel = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );

            expect(line).toBeTruthy();
            expect(childLevel).toBeTruthy();
        });
    });

    // shrink-icon-name
    // Depends on groups
    it('Primitive relationship graph level: shrinkIconName', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        element.groups = GROUPS;
        element.shrinkIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const groups = element.shadowRoot.querySelectorAll(
                'c-primitive-relationship-graph-group'
            );

            groups.forEach((group) => {
                expect(group.shrinkIconName).toBe('utility:apps');
            });
        });
    });

    // variant
    // Depends on groups, selectedGroups
    it('Primitive relationship graph level: variant = horizontal', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        element.groups = GROUPS;
        element.selectedGroups = SELECTED_GROUPS;
        element.variant = 'horizontal';

        return Promise.resolve().then(() => {
            const groups = element.shadowRoot.querySelectorAll(
                'c-primitive-relationship-graph-group'
            );
            const childLevel = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            const line = element.shadowRoot.querySelector('.line');
            const currentLevelWrapper = element.shadowRoot.querySelector(
                '.slds-show_inline-block'
            );
            const currentLevel =
                element.shadowRoot.querySelector('.current-level');

            groups.forEach((group) => {
                expect(group.variant).toBe('horizontal');
            });
            expect(childLevel.variant).toBe('horizontal');
            expect(line.classList).toContain('line_vertical');
            expect(line.classList).not.toContain('line_horizontal');
            expect(currentLevelWrapper).toBeFalsy();
            expect(currentLevel.classList).toContain('slds-m-left_x-large');
            expect(currentLevel.classList).not.toContain('slds-grid');
        });
    });

    // variant
    // Depends on groups, selectedGroups
    it('Primitive relationship graph level: variant = vertical', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        element.groups = GROUPS;
        element.selectedGroups = SELECTED_GROUPS;

        element.variant = 'vertical';

        return Promise.resolve().then(() => {
            const groups = element.shadowRoot.querySelectorAll(
                'c-primitive-relationship-graph-group'
            );
            const childLevel = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            const line = element.shadowRoot.querySelector('.line');
            const currentLevelWrapper = element.shadowRoot.querySelector(
                '.slds-show_inline-block'
            );
            const currentLevel =
                element.shadowRoot.querySelector('.current-level');

            groups.forEach((group) => {
                expect(group.variant).toBe('vertical');
            });
            expect(childLevel.variant).toBe('vertical');
            expect(line.classList).toContain('line_horizontal');
            expect(line.classList).not.toContain('line_vertical');
            expect(currentLevelWrapper).toBeTruthy();
            expect(currentLevel.classList).not.toContain('slds-m-left_x-large');
            expect(currentLevel.classList).toContain('slds-grid');
        });
    });

    /* ----- EVENTS ----- */

    // select
    // Depends on groups, selectedGroups
    it('Primitive relationship graph level: select event received from a child group', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        element.groups = GROUPS;
        element.selectedGroups = SELECTED_GROUPS;

        const handler = jest.fn();
        element.addEventListener('select', handler);

        return Promise.resolve().then(() => {
            const groups = element.shadowRoot.querySelectorAll(
                'c-primitive-relationship-graph-group'
            );

            groups[1].dispatchEvent(
                new CustomEvent('select', {
                    detail: {
                        name: 'item-selected'
                    }
                })
            );

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.name).toBe('item-selected');
            expect(element.selectedGroups).toBeUndefined();
        });
    });

    it('Primitive relationship graph level: select event received from the child level', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        element.groups = GROUPS;
        element.selectedGroups = SELECTED_GROUPS;

        const handler = jest.fn();
        element.addEventListener('select', handler);

        return Promise.resolve().then(() => {
            const childLevel = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );

            childLevel.dispatchEvent(
                new CustomEvent('select', {
                    detail: {
                        name: 'item-selected'
                    }
                })
            );

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.name).toBe('item-selected');
        });
    });

    // actionclick
    it('Primitive relationship graph level: actionclick event received from a child group', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        element.groups = GROUPS;
        element.selectedGroups = SELECTED_GROUPS;

        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        return Promise.resolve().then(() => {
            const groups = element.shadowRoot.querySelectorAll(
                'c-primitive-relationship-graph-group'
            );

            groups[1].dispatchEvent(
                new CustomEvent('actionclick', {
                    detail: {
                        name: 'action-clicked',
                        targetName: 'item-of-the-action',
                        itemData: {
                            label: 'A string label',
                            value: 'Some value'
                        }
                    }
                })
            );

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.name).toBe('action-clicked');
            expect(handler.mock.calls[0][0].detail.targetName).toBe(
                'item-of-the-action'
            );
            expect(handler.mock.calls[0][0].detail.itemData).toMatchObject({
                label: 'A string label',
                value: 'Some value'
            });
        });
    });

    it('Primitive relationship graph level: actionclick event received from the child level', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        element.groups = GROUPS;
        element.selectedGroups = SELECTED_GROUPS;

        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        return Promise.resolve().then(() => {
            const childLevel = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );

            childLevel.dispatchEvent(
                new CustomEvent('actionclick', {
                    detail: {
                        name: 'action-clicked',
                        targetName: 'item-of-the-action',
                        itemData: {
                            label: 'A string label',
                            value: 'Some value'
                        }
                    }
                })
            );

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.name).toBe('action-clicked');
            expect(handler.mock.calls[0][0].detail.targetName).toBe(
                'item-of-the-action'
            );
            expect(handler.mock.calls[0][0].detail.itemData).toMatchObject({
                label: 'A string label',
                value: 'Some value'
            });
        });
    });

    // heightchange
    it('Primitive relationship graph level: heightchange event received from a child group', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        element.groups = GROUPS;
        element.selectedGroups = SELECTED_GROUPS;

        const handler = jest.fn();
        element.addEventListener('heightchange', handler);

        return Promise.resolve().then(() => {
            const groups = element.shadowRoot.querySelectorAll(
                'c-primitive-relationship-graph-group'
            );

            groups[1].dispatchEvent(new CustomEvent('heightchange'));

            expect(handler).toHaveBeenCalled();
        });
    });

    it('Primitive relationship graph level: heightchange event received from the child level', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        element.groups = GROUPS;
        element.selectedGroups = SELECTED_GROUPS;

        const handler = jest.fn();
        element.addEventListener('heightchange', handler);

        return Promise.resolve().then(() => {
            const childLevel = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );

            childLevel.dispatchEvent(new CustomEvent('heightchange'));

            expect(handler).toHaveBeenCalled();
        });
    });

    // toggle
    it('Primitive relationship graph level: Handle toggle event', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        element.groups = GROUPS;
        element.selectedGroups = SELECTED_GROUPS;

        const toggleHandler = jest.fn();
        element.addEventListener('toggle', toggleHandler);

        return Promise.resolve().then(() => {
            const groups = element.shadowRoot.querySelectorAll(
                'c-primitive-relationship-graph-group'
            );

            groups[1].dispatchEvent(
                new CustomEvent('toggle', {
                    detail: {
                        name: GROUPS[1].name,
                        closed: true,
                        isActiveGroup: false
                    }
                })
            );
            expect(toggleHandler).toHaveBeenCalled();
        });
    });

    it('Primitive relationship graph level: Handle toggle event on active group', () => {
        const element = createElement(
            'data-primitive-relationship-graph-level',
            {
                is: PrimitiveRelationshipGraphLevel
            }
        );

        document.body.appendChild(element);

        element.groups = GROUPS;
        element.selectedGroups = SELECTED_GROUPS;

        const toggleHandler = jest.fn();
        element.addEventListener('toggle', toggleHandler);

        return Promise.resolve().then(() => {
            const groups = element.shadowRoot.querySelectorAll(
                'c-primitive-relationship-graph-group'
            );

            groups[1].dispatchEvent(
                new CustomEvent('toggle', {
                    detail: {
                        name: GROUPS[1].name,
                        closed: true,
                        isActiveGroup: true
                    }
                })
            );
            expect(toggleHandler).toHaveBeenCalled();
            expect(element.selectedGroups).toBeUndefined();
        });
    });
});
