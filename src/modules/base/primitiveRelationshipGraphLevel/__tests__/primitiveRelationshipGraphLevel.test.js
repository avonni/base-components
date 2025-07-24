import { createElement } from 'lwc';
import PrimitiveRelationshipGraphLevel from 'c/primitiveRelationshipGraphLevel';
import { ACTIONS, GROUPS, SELECTED_GROUPS } from './data';

let element;
describe('Primitive Relationship Graph Level', () => {
    beforeEach(() => {
        element = createElement('data-primitive-relationship-graph-level', {
            is: PrimitiveRelationshipGraphLevel
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
            expect(element.actionsMenuAlternativeText).toBeUndefined();
            expect(element.activeGroups).toBeUndefined();
            expect(element.currentLevelHeight).toBe(0);
            expect(element.currentLevelWidth).toBe(0);
            expect(element.expandIconName).toBeUndefined();
            expect(element.groupActions).toBeUndefined();
            expect(element.groupActionsPosition).toBeUndefined();
            expect(element.groups).toMatchObject([]);
            expect(element.hasRootHeader).toBeFalsy();
            expect(element.hideItemsCount).toBeFalsy();
            expect(element.isFirstLevel).toBeFalsy();
            expect(element.itemActions).toBeUndefined();
            expect(element.loadingStateAlternativeText).toBeUndefined();
            expect(element.noResultsMessage).toBeUndefined();
            expect(element.selectedGroups).toBeUndefined();
            expect(element.shrinkIconName).toBeUndefined();
            expect(element.variant).toBeUndefined();
        });

        describe('actionsMenuAlternativeText', () => {
            it('Passed to the component', () => {
                element.actionsMenuAlternativeText = 'Show menus';

                return Promise.resolve().then(() => {
                    const groups = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-relationship-graph-group"]'
                    );

                    groups.forEach((group) => {
                        expect(group.actionsMenuAlternativeText).toBe(
                            'Show menus'
                        );
                    });
                });
            });
        });

        describe('activeGroups', () => {
            it('Passed to the component', () => {
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
        });

        describe('currentLevelHeight', () => {
            it('Passed to the component', () => {
                element.groups = GROUPS;

                return Promise.resolve().then(() => {
                    expect(element.currentLevelHeight).toBe(0);
                });
            });
        });

        describe('currentLevelWidth', () => {
            it('Passed to the component', () => {
                return Promise.resolve().then(() => {
                    expect(element.currentLevelWidth).toBe(0);
                });
            });
        });

        describe('expandIconName', () => {
            it('Passed to the component', () => {
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
        });

        describe('groupActions', () => {
            it('Passed to the component', () => {
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
        });

        describe('groupActionsPosition', () => {
            it('Passed to the component', () => {
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
        });

        describe('groups', () => {
            it('Passed to the component', () => {
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
                        expect(group.items).toMatchObject(
                            GROUPS[index].items || []
                        );
                        expect(group.expanded).toBe(
                            GROUPS[index].expanded || true
                        );
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
        });

        describe('hasRootHeader', () => {
            it('Passed to the component', () => {
                element.hasRootHeader = true;
                element.groups = GROUPS;

                return Promise.resolve().then(() => {
                    const groups = element.shadowRoot.querySelectorAll(
                        'c-primitive-relationship-graph-group'
                    );

                    groups.forEach((group) => {
                        expect(group.hasRootHeader).toBeTruthy();
                    });
                });
            });
        });

        describe('hideItemsCount', () => {
            it('Passed to the component', () => {
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
        });

        describe('isFirstLevel', () => {
            it('Passed to the component', () => {
                element.isFirstLevel = true;
                element.groups = GROUPS;

                return Promise.resolve().then(() => {
                    const groups = element.shadowRoot.querySelectorAll(
                        'c-primitive-relationship-graph-group'
                    );

                    groups.forEach((group) => {
                        expect(group.isFirstLevel).toBeTruthy();
                    });
                });
            });
        });

        describe('itemActions', () => {
            it('Passed to the component', () => {
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
        });

        describe('loadingStateAlternativeText', () => {
            it('Passed to the component', () => {
                element.loadingStateAlternativeText = 'Loading';
                element.groups = GROUPS;

                return Promise.resolve().then(() => {
                    const groups = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-relationship-graph-group"]'
                    );

                    groups.forEach((group) => {
                        expect(group.loadingStateAlternativeText).toBe(
                            'Loading'
                        );
                    });
                });
            });
        });

        describe('noResultsMessage', () => {
            it('Passed to the component', () => {
                element.noResultsMessage = 'No items to display';
                element.groups = GROUPS;

                return Promise.resolve().then(() => {
                    const groups = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-primitive-relationship-graph-group"]'
                    );

                    groups.forEach((group) => {
                        expect(group.noResultsMessage).toBe(
                            'No items to display'
                        );
                    });
                });
            });
        });

        describe('selectedGroups', () => {
            it('Passed to the component', () => {
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
        });

        describe('shrinkIconName', () => {
            it('Passed to the component', () => {
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
        });

        describe('variant', () => {
            it('horizontal', () => {
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
                    const currentLevelWrapper =
                        element.shadowRoot.querySelector(
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
                    expect(currentLevel.classList).toContain(
                        'slds-m-left_x-large'
                    );
                    expect(currentLevel.classList).not.toContain('slds-grid');
                });
            });

            it('vertical', () => {
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
                    const currentLevelWrapper =
                        element.shadowRoot.querySelector(
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
                    expect(currentLevel.classList).not.toContain(
                        'slds-m-left_x-large'
                    );
                    expect(currentLevel.classList).toContain('slds-grid');
                });
            });
        });
    });

    describe('Events', () => {
        describe('actionclick', () => {
            it('Received from a child group', () => {
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
                    expect(handler.mock.calls[0][0].detail.name).toBe(
                        'action-clicked'
                    );
                    expect(handler.mock.calls[0][0].detail.targetName).toBe(
                        'item-of-the-action'
                    );
                    expect(
                        handler.mock.calls[0][0].detail.itemData
                    ).toMatchObject({
                        label: 'A string label',
                        value: 'Some value'
                    });
                });
            });

            it('Received from the child level', () => {
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
                    expect(handler.mock.calls[0][0].detail.name).toBe(
                        'action-clicked'
                    );
                    expect(handler.mock.calls[0][0].detail.targetName).toBe(
                        'item-of-the-action'
                    );
                    expect(
                        handler.mock.calls[0][0].detail.itemData
                    ).toMatchObject({
                        label: 'A string label',
                        value: 'Some value'
                    });
                });
            });
        });

        describe('heightchange', () => {
            it('Received from a child group', () => {
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

            it('Received from the child level', () => {
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
        });

        describe('select', () => {
            it('Received from a child group', () => {
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
                    expect(handler.mock.calls[0][0].detail.name).toBe(
                        'item-selected'
                    );
                    expect(element.selectedGroups).toBeUndefined();
                });
            });

            it('Received from the child level', () => {
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
                    expect(handler.mock.calls[0][0].detail.name).toBe(
                        'item-selected'
                    );
                });
            });
        });

        describe('toggle', () => {
            it('Received from a child group', () => {
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

            it('On active group', () => {
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
    });
});
