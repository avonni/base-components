import { createElement } from 'lwc';
import PrimitiveAvatar from '../primitiveAvatar';

const ACTIONS = [
    {
        label: 'Edit item',
        name: 'edit-item',
        iconName: 'utility:edit'
    },
    {
        label: 'Add item',
        name: 'add-item',
        iconName: 'utility:add',
        disabled: true
    }
];

let element;
describe('PrimitiveAvatar', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('primitive-avatar', {
            is: PrimitiveAvatar
        });
        document.body.appendChild(element);
    });

    it('Primitive Avatar: Default attributes', () => {
        expect(element.initials).toBeFalsy();
        expect(element.href).toBeUndefined();
        expect(element.variant).toBe('square');
        expect(element.size).toBe('medium');

        expect(element.actions).toEqual([]);
        expect(element.actionMenuIcon).toEqual('utility:down');
        expect(element.actionPosition).toEqual('bottom-left');

        expect(element.entityIconName).toBeFalsy();
        expect(element.entityPosition).toBe('top-left');
        expect(element.entityTitle).toBe('Entity');
        expect(element.entitySrc).toBeFalsy();
        expect(element.entityVariant).toBe('square');

        expect(element.presence).toBeFalsy();
        expect(element.presencePosition).toBe('bottom-right');
        expect(element.presenceTitle).toBe('Presence');

        expect(element.status).toBeFalsy();
        expect(element.statusTitle).toBe('Status');
        expect(element.statusPosition).toBe('top-right');
    });

    /* ----- ATTRIBUTES ----- */

    // actions
    it('Primitive Avatar: Avatar with action menu', () => {
        element.initials = 'LG';
        element.actions = ACTIONS;

        return Promise.resolve().then(() => {
            const actionSection = element.shadowRoot.querySelector(
                '[data-element-id="action-section"]'
            );
            const actionMenu = element.shadowRoot.querySelector(
                '[data-element-id="action-menu-icon"]'
            );
            const actionButton = element.shadowRoot.querySelector(
                '[data-element-id="action-icon"]'
            );

            expect(actionSection).toBeTruthy();
            expect(actionMenu).toBeTruthy();
            expect(actionButton).toBeFalsy();
        });
    });

    it('Primitive Avatar: Avatar with one action', () => {
        element.initials = 'LG';
        element.actions = new Array(ACTIONS[0]);

        return Promise.resolve().then(() => {
            const actionSection = element.shadowRoot.querySelector(
                '[data-element-id="action-section"]'
            );
            const avatarInitials = element.shadowRoot.querySelector(
                '[data-element-id="avatar-initials"]'
            );
            const actionMenu = element.shadowRoot.querySelector(
                '[data-element-id="action-menu-icon"]'
            );
            const actionButton = element.shadowRoot.querySelector(
                '[data-element-id="action-icon"]'
            );

            expect(avatarInitials.innerHTML.trim()).toContain('LG');
            expect(actionSection).toBeTruthy();
            expect(actionMenu).toBeFalsy();
            expect(actionButton).toBeTruthy();
        });
    });

    it('Primitive Avatar: Avatar with one action and no icon name', () => {
        element.initials = 'LG';
        element.actions = [
            {
                label: 'Edit item',
                name: 'edit-item'
            }
        ];

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '[data-element-id="primitive-icon-action"]'
            );

            expect(actionButton.iconName).toBe('utility:down');
        });
    });

    it('Primitive Avatar: href', () => {
        element.initials = 'LG';

        return Promise.resolve()
            .then(() => {
                const avatarContainerLink = element.shadowRoot.querySelector(
                    'a[data-element-id="avatar-container"]'
                );
                const avatarContainerNoLink = element.shadowRoot.querySelector(
                    'div[data-element-id="avatar-container"]'
                );

                expect(avatarContainerLink).toBeNull();
                expect(avatarContainerNoLink).not.toBeNull();
                element.href = 'url';
            })
            .then(() => {
                const avatarContainerLink = element.shadowRoot.querySelector(
                    'a[data-element-id="avatar-container"]'
                );
                const avatarContainerNoLink = element.shadowRoot.querySelector(
                    'div[data-element-id="avatar-container"]'
                );
                expect(avatarContainerLink).not.toBeNull();
                expect(avatarContainerLink.href).not.toBeUndefined();
                expect(avatarContainerNoLink).toBeNull();
            });
    });

    /* ----- METHODS ----- */

    // getBackgroundColor()
    it('Primitive Avatar: method getBackgroundColor()', () => {
        element.fallbackIconName = 'standard:account';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                '[data-element-id="avatar-container"]'
            );
            avatar.style.backgroundColor = 'blue';
            expect(element.getBackgroundColor()).toBe('blue');
        });
    });

    /* ----- EVENTS ----- */

    // actionclick event
    // Depends on action name
    it('Primitive Avatar: actionclick event', () => {
        element.initials = 'LG';
        element.actions = new Array(ACTIONS[0]);
        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '[data-element-id="action-icon"]'
            );
            expect(actionButton).toBeTruthy();
            actionButton.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.name).toBe('edit-item');
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });

    it('Primitive Avatar: disabled action actionclick event', () => {
        element.initials = 'LG';
        element.actions = new Array(ACTIONS[1]);
        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '[data-element-id="action-icon"]'
            );
            expect(actionButton).toBeTruthy();
            actionButton.click();

            expect(handler).not.toHaveBeenCalled();
        });
    });
});
