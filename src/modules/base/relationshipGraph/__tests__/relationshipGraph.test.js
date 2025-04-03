import { createElement } from 'lwc';
import RelationshipGraph from 'c/relationshipGraph';
import { ACTIONS, GROUPS, SELECTED_GROUPS } from './data';

// Not tested due to impossibility of targetting child component (mediaObject) slot content:
// avatarFallbackIconName
// avatarSrc

let element;
describe('Relationship Graph', () => {
    beforeEach(() => {
        element = createElement('base-relationship-graph', {
            is: RelationshipGraph
        });
        document.body.appendChild(element);
    });

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Relationship graph: Default attributes', () => {
        expect(element.actions).toMatchObject([]);
        expect(element.avatarFallbackIconName).toBeUndefined();
        expect(element.avatarSrc).toBeUndefined();
        expect(element.expandIconName).toBe('utility:chevronright');
        expect(element.groupActions).toMatchObject([]);
        expect(element.groupActionsPosition).toBe('top');
        expect(element.groups).toMatchObject([]);
        expect(element.hideItemsCount).toBeFalsy();
        expect(element.href).toBeUndefined();
        expect(element.itemActions).toMatchObject([]);
        expect(element.label).toBeUndefined();
        expect(element.selectedItemName).toBeUndefined();
        expect(element.shrinkIconName).toBe('utility:chevrondown');
        expect(element.variant).toBe('horizontal');
    });

    /* ----- ATTRIBUTES ----- */

    // actions
    it('Relationship graph: actions', () => {
        element.actions = ACTIONS;

        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll('button');
            buttons.forEach((button, index) => {
                expect(button.name).toBe(ACTIONS[index].name);
                expect(button.disabled).toBe(ACTIONS[index].disabled || false);
                expect(button.value).toBe(ACTIONS[index].name);

                if (ACTIONS[index].iconName) {
                    const icon = button.querySelector('lightning-icon');
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect(icon.iconName).toBe(ACTIONS[index].iconName);
                }
            });
        });
    });

    // expand-icon-name
    it('Relationship graph: expandIconName', () => {
        element.expandIconName = 'standard:user';

        return Promise.resolve().then(() => {
            const level = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            expect(level.expandIconName).toBe('standard:user');
        });
    });

    // group-actions
    it('Relationship graph: groupActions', () => {
        element.groupActions = ACTIONS;

        return Promise.resolve().then(() => {
            const level = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            expect(level.groupActions).toMatchObject(ACTIONS);
        });
    });

    // group-actions-position
    it('Relationship graph: groupActionsPosition', () => {
        element.groupActionsPosition = 'bottom';

        return Promise.resolve().then(() => {
            const level = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            expect(level.groupActionsPosition).toBe('bottom');
        });
    });

    // groups
    it('Relationship graph: groups', () => {
        element.groups = GROUPS;

        return Promise.resolve().then(() => {
            const level = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            expect(level.groups).toMatchObject(GROUPS);
        });
    });

    // hide-items-count
    it('Relationship graph: hideItemsCount', () => {
        element.hideItemsCount = true;

        return Promise.resolve().then(() => {
            const level = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            expect(level.hideItemsCount).toBeTruthy();
        });
    });

    // href
    // Depends on label
    it('Relationship graph: href with label', () => {
        element.label = 'A string label';
        element.href = 'https://www.avonni.app/';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector('h1 a');
            expect(link).toBeTruthy();
            expect(link.href).toBe('https://www.avonni.app/');
        });
    });

    it('Relationship graph: href without label', () => {
        element.href = 'https://www.avonni.app/';

        return Promise.resolve().then(() => {
            const link = element.shadowRoot.querySelector('h1 a');
            expect(link).toBeFalsy();
        });
    });

    // item-actions
    it('Relationship graph: itemActions', () => {
        element.itemActions = ACTIONS;

        return Promise.resolve().then(() => {
            const level = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            expect(level.itemActions).toMatchObject(ACTIONS);
        });
    });

    // label
    it('Relationship graph: label', () => {
        element.label = 'A string label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector('h1');
            expect(label.textContent).toBe('A string label');
        });
    });

    // selected-item-name
    // Depends on groups
    it('Relationship graph: selectedItemName', () => {
        element.groups = GROUPS;
        element.selectedItemName = 'neil-symonds';

        return Promise.resolve().then(() => {
            const level = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            expect(level.groups).toMatchObject(SELECTED_GROUPS);
        });
    });

    // shrink-icon-name
    it('Relationship graph: shrinkIconName', () => {
        element.shrinkIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const level = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            expect(level.shrinkIconName).toBe('utility:apps');
        });
    });

    // variant
    // Depends on actions
    it('Relationship graph: variant = horizontal', () => {
        element.label = 'A string label';
        element.variant = 'horizontal';
        element.actions = ACTIONS;

        return Promise.resolve().then(() => {
            const level = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            const wrapper =
                element.shadowRoot.querySelector('div:nth-of-type(3)');
            const header = element.shadowRoot.querySelector('div');
            const actionsWrapper =
                element.shadowRoot.querySelector('div:nth-of-type(2)');
            const actionButtons = element.shadowRoot.querySelectorAll('button');
            const line = element.shadowRoot.querySelector(
                '[data-element-id="div-line"]'
            );

            expect(level.variant).toBe('horizontal');
            expect(wrapper.classList).toContain('slds-grid');
            expect(wrapper.classList).toContain('slds-m-left_medium');
            expect(header.classList).not.toContain('slds-box');
            expect(header.classList).not.toContain('group');
            expect(actionsWrapper.classList).not.toContain('actions_vertical');
            expect(actionsWrapper.classList).toContain('slds-p-vertical_small');
            expect(actionsWrapper.classList).not.toContain(
                'slds-p-vertical_large'
            );
            expect(line.classList).toContain('line_vertical');
            expect(line.classList).not.toContain('line_horizontal');

            actionButtons.forEach((button) => {
                expect(button.classList).not.toContain('slds-button_stretch');
                expect(button.classList).toContain('slds-m-bottom_xx-small');
            });
        });
    });

    it('Relationship graph: variant = vertical', () => {
        element.label = 'A string label';
        element.variant = 'vertical';
        element.actions = ACTIONS;

        return Promise.resolve().then(() => {
            const level = element.shadowRoot.querySelector(
                'c-primitive-relationship-graph-level'
            );
            const wrapper =
                element.shadowRoot.querySelector('div:nth-of-type(3)');
            const header = element.shadowRoot.querySelector('div');
            const actionsWrapper =
                element.shadowRoot.querySelector('div:nth-of-type(2)');
            const actionButtons = element.shadowRoot.querySelectorAll('button');
            const line = element.shadowRoot.querySelector(
                '[data-element-id="div-line"]'
            );

            expect(level.variant).toBe('vertical');
            expect(wrapper.classList).not.toContain('slds-grid');
            expect(wrapper.classList).not.toContain('slds-m-left_medium');
            expect(header.classList).toContain('slds-box');
            expect(header.classList).toContain('group');
            expect(actionsWrapper.classList).toContain('actions_vertical');
            expect(actionsWrapper.classList).not.toContain(
                'slds-p-vertical_small'
            );
            expect(actionsWrapper.classList).toContain('slds-p-vertical_large');
            expect(line.classList).not.toContain('line_vertical');
            expect(line.classList).toContain('line_horizontal');

            actionButtons.forEach((button) => {
                expect(button.classList).toContain('slds-button_stretch');
                expect(button.classList).not.toContain(
                    'slds-m-bottom_xx-small'
                );
            });
        });
    });

    /* ----- EVENTS ----- */

    // select
    it('Relationship graph: select event', () => {
        const handler = jest.fn();
        element.addEventListener('select', handler);

        const level = element.shadowRoot.querySelector(
            'c-primitive-relationship-graph-level'
        );

        level.dispatchEvent(
            new CustomEvent('select', {
                detail: {
                    name: 'neil-symonds'
                }
            })
        );

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.name).toBe('neil-symonds');
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });

    // actionclick
    it('Relationship graph: actionclick event', () => {
        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        const level = element.shadowRoot.querySelector(
            'c-primitive-relationship-graph-level'
        );

        level.dispatchEvent(
            new CustomEvent('actionclick', {
                detail: {
                    name: 'add-relationship',
                    targetName: 'neil-symonds',
                    itemData: {
                        label: 'A string label',
                        value: 450
                    }
                }
            })
        );

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.name).toBe('add-relationship');
        expect(handler.mock.calls[0][0].detail.targetName).toBe('neil-symonds');
        expect(handler.mock.calls[0][0].detail.itemData).toMatchObject({
            label: 'A string label',
            value: 450
        });
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });
});
