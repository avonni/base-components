import { createElement } from 'lwc';
import AvatarGroup from 'c/avatarGroup';

const items = [
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
        fallbackIconName: 'standard:user',
        alternativeText: 'This is the alternative text',
        primaryText: 'John Doe',
        secondaryText: 'VP, Human Resources',
        tertiaryText: 'FakeCompany Inc.'
    },
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        fallbackIconName: 'standard:user',
        initials: 'UA',
        alternativeText: 'This is the alternative text',
        primaryText: 'Jane Doe',
        secondaryText: 'VP, Engineering',
        tertiaryText: 'FakeCompany Inc.'
    }
];

describe('Avatar Group', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        expect(element.size).toBe('medium');
        expect(element.variant).toBe('square');
        expect(element.items).toMatchObject([]);
        expect(element.layout).toBe('stack');
        expect(element.maxCount).toBeUndefined();
        expect(element.listButtonLabel).toBe('Show more');
        expect(element.listButtonVariant).toBe('neutral');
        expect(element.listButtonIconName).toBeUndefined();
        expect(element.listButtonIconPosition).toBe('left');
    });

    /* ----- ATTRIBUTES ----- */

    // size
    it('Avatar group size x-small', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.size = 'x-small';
        element.items = items;

        return Promise.resolve().then(() => {
            const avatars = element.shadowRoot.querySelectorAll(
                '.slds-avatar-group'
            );
            avatars.forEach((avatar) => {
                expect(avatar.className).toContain('slds-avatar-group_x-small');
            });
        });
    });

    it('Avatar group size small', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.size = 'small';
        element.items = items;

        return Promise.resolve().then(() => {
            const avatars = element.shadowRoot.querySelectorAll(
                '.slds-avatar-group'
            );
            avatars.forEach((avatar) => {
                expect(avatar.className).toContain('slds-avatar-group_small');
            });
        });
    });

    it('Avatar group size medium', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.size = 'medium';
        element.items = items;

        return Promise.resolve().then(() => {
            const avatars = element.shadowRoot.querySelectorAll(
                '.slds-avatar-group'
            );
            avatars.forEach((avatar) => {
                expect(avatar.className).toContain('slds-avatar-group_medium');
            });
        });
    });

    it('Avatar group size large', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.size = 'large';
        element.items = items;

        return Promise.resolve().then(() => {
            const avatars = element.shadowRoot.querySelectorAll(
                '.slds-avatar-group'
            );
            avatars.forEach((avatar) => {
                expect(avatar.className).toContain('slds-avatar-group_large');
            });
        });
    });

    it('Avatar group size xx-large', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.size = 'xx-large';
        element.items = items;

        return Promise.resolve().then(() => {
            const avatars = element.shadowRoot.querySelectorAll(
                '.slds-avatar-group'
            );
            avatars.forEach((avatar) => {
                expect(avatar.className).toContain(
                    'avonni-avatar-group_xx-large'
                );
            });
        });
    });

    // Variant
    it('Avatar group variant square', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.variant = 'square';
        element.items = items;

        return Promise.resolve().then(() => {
            const avatars = element.shadowRoot.querySelectorAll(
                '.slds-avatar-group'
            );
            avatars.forEach((avatar) => {
                expect(avatar.className).not.toContain(
                    'avonni-avatar-group_circle'
                );
            });
        });
    });

    it('Avatar group variant circle', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.variant = 'circle';
        element.items = items;

        return Promise.resolve().then(() => {
            const avatars = element.shadowRoot.querySelectorAll(
                '.slds-avatar-group'
            );
            avatars.forEach((avatar) => {
                expect(avatar.className).toContain(
                    'avonni-avatar-group_circle'
                );
            });
        });
    });

    // items
    it('Avatar group items', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        const item = [
            {
                src:
                    'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
                fallbackIconName: 'standard:user',
                alternativeText: 'This is the alternative text',
                status: 'locked',
                statusTitle: 'Locked',
                statusPosition: 'top-left',
                entityIconName: 'standard:account',
                entitySrc:
                    'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
                entityInitials: 'FC',
                entityVariant: 'circle',
                entityPosition: 'bottom-right',
                primaryText: 'John Doe',
                secondaryText: 'VP, Human Resources',
                tertiaryText: 'FakeCompany Inc.',
                initials: 'JD',
                presence: 'busy',
                presenceTitle: 'Busy',
                presencePosition: 'top-right'
            }
        ];

        element.variant = 'circle';
        element.size = 'xx-large';
        element.items = item;

        return Promise.resolve().then(() => {
            const avatars = element.shadowRoot.querySelectorAll('c-avatar');
            avatars.forEach((avatar, index) => {
                const correspondingField = item[index];
                expect(correspondingField).toBeTruthy();
                expect(avatar.alternativeText).toBe(
                    correspondingField.alternativeText
                );
                expect(avatar.fallbackIconName).toBe(
                    correspondingField.fallbackIconName
                );
                expect(avatar.initials).toBe(correspondingField.initials);
                expect(avatar.src).toBe(correspondingField.src);
                expect(avatar.status).toBe(correspondingField.status);
                expect(avatar.statusTitle).toBe(correspondingField.statusTitle);
                expect(avatar.statusPosition).toBe(
                    correspondingField.statusPosition
                );
                expect(avatar.presence).toBe(correspondingField.presence);
                expect(avatar.presenceTitle).toBe(
                    correspondingField.presenceTitle
                );
                expect(avatar.presencePosition).toBe(
                    correspondingField.presencePosition
                );
                expect(avatar.entityIconName).toBe(
                    correspondingField.entityIconName
                );
                expect(avatar.entityInitials).toBe(
                    correspondingField.entityInitials
                );
                expect(avatar.entityVariant).toBe(
                    correspondingField.entityVariant
                );
                expect(avatar.entitySrc).toBe(correspondingField.entitySrc);
                expect(avatar.entityPosition).toBe(
                    correspondingField.entityPosition
                );
                expect(avatar.primaryText).toBe(correspondingField.primaryText);
                expect(avatar.secondaryText).toBe(
                    correspondingField.secondaryText
                );
                expect(avatar.tertiaryText).toBe(
                    correspondingField.tertiaryText
                );
            });
        });
    });
});
