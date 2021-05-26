import { createElement } from 'lwc';
import AvatarGroup from 'c/avatarGroup';

const item = [
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
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
        expect(element.actionIconName).toBe('utility:add');
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

    it('Action Button size x-small', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.size = 'x-small';
        element.items = items;

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button'
            );
            expect(actionButton.className).toContain(
                'avonni-avatar-group__action-button_x-small'
            );
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

    it('Action Button size small', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.size = 'small';
        element.items = items;

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button'
            );
            expect(actionButton.className).toContain(
                'avonni-avatar-group__action-button_small'
            );
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

    it('Action Button size medium', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.size = 'medium';
        element.items = items;

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button'
            );
            expect(actionButton.className).toContain(
                'avonni-avatar-group__action-button_medium'
            );
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

    it('Action Button size large', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.size = 'large';
        element.items = items;

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button'
            );
            expect(actionButton.className).toContain(
                'avonni-avatar-group__action-button_large'
            );
        });
    });

    it('Avatar group size x-large', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.size = 'x-large';
        element.items = items;

        return Promise.resolve().then(() => {
            const avatars = element.shadowRoot.querySelectorAll(
                '.slds-avatar-group'
            );
            avatars.forEach((avatar) => {
                expect(avatar.className).toContain(
                    'avonni-avatar-group_x-large'
                );
            });
        });
    });

    it('Action Button size x-large', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.size = 'x-large';
        element.items = items;

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button'
            );
            expect(actionButton.className).toContain(
                'avonni-avatar-group__action-button_x-large'
            );
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

    it('Action Button size xx-large', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.size = 'xx-large';
        element.items = items;

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button'
            );
            expect(actionButton.className).toContain(
                'avonni-avatar-group__action-button_xx-large'
            );
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

    it('Action button variant square', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.variant = 'square';
        element.items = items;

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button'
            );
            expect(actionButton.className).not.toContain(
                '.avonni-avatar-group__action-button_circle'
            );
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

    it('Action button variant circle', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.variant = 'circle';
        element.items = items;

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button'
            );
            expect(actionButton.className).not.toContain(
                '.avonni-avatar-group__action-button_square'
            );
        });
    });

    // items
    it('Avatar group items', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

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

    // layout
    it('Avatar group layout stack with less than 3', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.layout = 'stack';
        element.items = items;
        element.actionIconName = '';

        return Promise.resolve().then(() => {
            const group = element.shadowRoot.querySelector(
                '.slds-avatar-group'
            );
            expect(group.className).toContain('avonni-avatar-group__avatar');

            const noGroup = element.shadowRoot.querySelector(
                '.slds-avatar-grouped'
            );
            expect(noGroup).toBeTruthy();
        });
    });

    it('Avatar group layout stack with more than 2', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.layout = 'stack';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const avatars = element.shadowRoot.querySelectorAll(
                '.avonni-avatar-group__avatar'
            );
            avatars.forEach((avatar, index) => {
                // Checking for avatars. Last element is ActionButton which has 'avonni-avatar-group_in-line' nested deeper on button
                if (index < avatars.length - 2)
                    expect(avatar.className).toContain(
                        'avonni-avatar-group_in-line'
                    );
            });

            const groups = element.shadowRoot.querySelectorAll(
                '.avonni-avatar-group__avatar-container'
            );
            groups.forEach((group) => {
                expect(group.className).not.toContain('slds-show');
            });
        });
    });

    it('Avatar group layout grid', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.layout = 'grid';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const avatars = element.shadowRoot.querySelectorAll(
                '.avonni-avatar-group__avatar'
            );
            avatars.forEach((avatar) => {
                expect(avatar.className).not.toContain(
                    'avonni-avatar-group_in-line'
                );
            });

            const groups = element.shadowRoot.querySelectorAll(
                '.avonni-avatar-group__avatar-container'
            );
            groups.forEach((group) => {
                expect(group.className).not.toContain('slds-show');
            });
        });
    });

    it('Avatar group layout list', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.layout = 'list';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const avatars = element.shadowRoot.querySelectorAll(
                '.avonni-avatar-group__avatar'
            );
            avatars.forEach((avatar) => {
                expect(avatar.className).not.toContain(
                    'avonni-avatar-group_in-line'
                );
            });

            const groups = element.shadowRoot.querySelectorAll(
                '.avonni-avatar-group__avatar-container'
            );
            groups.forEach((group) => {
                expect(group.className).toContain('slds-show');
            });
        });
    });

    //max count
    it('Avatar group max count stack', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.layout = 'stack';
        element.items = [
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items
        ];

        return Promise.resolve().then(() => {
            expect(element.maxCount).toBe(5);
            const avatars = element.shadowRoot.querySelectorAll(
                '.avonni-avatar-group__avatar-container'
            );
            expect(avatars).toHaveLength(6);
        });
    });

    it('Avatar group max count grid', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.maxCount = '11';
        element.layout = 'grid';
        element.items = [
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items
        ];

        return Promise.resolve().then(() => {
            const avatars = element.shadowRoot.querySelectorAll(
                '.avonni-avatar-group__avatar-container'
            );
            expect(avatars).toHaveLength(12);
        });
    });

    it('Avatar group max count list', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.maxCount = '11';
        element.items = [
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items
        ];
        element.layout = 'list';

        return Promise.resolve().then(() => {
            const avatars = element.shadowRoot.querySelectorAll(
                '.avonni-avatar-group__avatar-container'
            );
            expect(avatars).toHaveLength(11);
        });
    });

    // list button label
    it('Avatar group list button label', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.layout = 'list';
        element.maxCount = 5;
        element.listButtonLabel = 'This is a list button label';
        element.items = [
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items
        ];

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.label).toBe('This is a list button label');
        });
    });

    // list button variant
    it('Avatar group list button variant neutral', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.layout = 'list';
        element.maxCount = 5;
        element.listButtonLabel = 'button';
        element.listButtonVariant = 'neutral';
        element.items = [
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items
        ];

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('neutral');
        });
    });

    it('Avatar group list button variant base', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.layout = 'list';
        element.maxCount = 5;
        element.listButtonLabel = 'button';
        element.listButtonVariant = 'base';
        element.items = [
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items
        ];

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('base');
        });
    });

    it('Avatar group list button variant brand', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.layout = 'list';
        element.maxCount = 5;
        element.listButtonLabel = 'button';
        element.listButtonVariant = 'brand';
        element.items = [
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items
        ];

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('brand');
        });
    });

    it('Avatar group list button variant brand-outline', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.layout = 'list';
        element.maxCount = 5;
        element.listButtonLabel = 'button';
        element.listButtonVariant = 'brand-outline';
        element.items = [
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items
        ];

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('brand-outline');
        });
    });

    it('Avatar group list button variant destructive', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.layout = 'list';
        element.maxCount = 5;
        element.listButtonLabel = 'button';
        element.listButtonVariant = 'destructive';
        element.items = [
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items
        ];

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('destructive');
        });
    });

    it('Avatar group list button variant destructive-text', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.layout = 'list';
        element.maxCount = 5;
        element.listButtonLabel = 'button';
        element.listButtonVariant = 'destructive-text';
        element.items = [
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items
        ];

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('destructive-text');
        });
    });

    it('Avatar group list button variant inverse', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.layout = 'list';
        element.maxCount = 5;
        element.listButtonLabel = 'button';
        element.listButtonVariant = 'inverse';
        element.items = [
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items
        ];

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('inverse');
        });
    });

    it('Avatar group list button variant success', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.layout = 'list';
        element.maxCount = 5;
        element.listButtonLabel = 'button';
        element.listButtonVariant = 'success';
        element.items = [
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items
        ];

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.variant).toBe('success');
        });
    });

    // list button icon name
    it('Avatar group list button icon name', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.layout = 'list';
        element.maxCount = 5;
        element.listButtonVariant = 'neutral';
        element.listButtonIconName = 'utility:lock';
        element.items = [
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items
        ];

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.iconName).toBe('utility:lock');
        });
    });

    // list button position
    it('Avatar group list button position right', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.layout = 'list';
        element.maxCount = 5;
        element.listButtonVariant = 'neutral';
        element.listButtonIconName = 'utility:lock';
        element.listButtonIconPosition = 'right';
        element.items = [
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items
        ];

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.iconPosition).toBe('right');
        });
    });

    it('Avatar group list button position left', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.layout = 'list';
        element.maxCount = 5;
        element.listButtonVariant = 'neutral';
        element.listButtonIconName = 'utility:lock';
        element.listButtonIconPosition = 'left';
        element.items = [
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items
        ];

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector('lightning-button');
            expect(button.iconPosition).toBe('left');
        });
    });

    //Action button: absence of action-icon-name
    it('Action Button absence of action-icon-name makes action button disappear', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.actionIconName = '';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button'
            );
            expect(actionButton).toBeNull();
        });
    });

    it('Action Button action-icon-name button icon', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.actionIconName = 'utility:check';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button > lightning-icon'
            );
            expect(actionButton.iconName).toBe('utility:check');
        });
    });

    // Action button icon size predicated on switch case due to utility icon default sizing
    // size : x-small, small, medium = x-small icon // size: large, x-large = small icon // size: xx-large = medium icon
    it('Action Button button icon size x-small', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.actionIconName = 'utility:check';
        element.size = 'x-small';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button > lightning-icon'
            );
            expect(actionButton.size).toBe('x-small');
        });
    });

    it('Action Button button icon size small', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.actionIconName = 'utility:check';
        element.size = 'small';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button > lightning-icon'
            );
            expect(actionButton.size).toBe('x-small');
        });
    });

    it('Action Button button icon size medium', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.actionIconName = 'utility:check';
        element.size = 'medium';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button > lightning-icon'
            );
            expect(actionButton.size).toBe('x-small');
        });
    });

    it('Action Button button icon size large', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.actionIconName = 'utility:check';
        element.size = 'large';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button > lightning-icon'
            );
            expect(actionButton.size).toBe('small');
        });
    });

    it('Action Button button icon size x-large', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.actionIconName = 'utility:check';
        element.size = 'x-large';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button > lightning-icon'
            );
            expect(actionButton.size).toBe('small');
        });
    });

    it('Action Button button icon size xx-large', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.actionIconName = 'utility:check';
        element.size = 'xx-large';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button > lightning-icon'
            );
            expect(actionButton.size).toBe('medium');
        });
    });

    /* ----- JS ----- */

    // list hidden items
    it('Avatar group list hidden items', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.layout = 'list';
        element.maxCount = 3;
        element.items = [
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items
        ];

        return Promise.resolve()
            .then(() => {
                const avatarShow = element.shadowRoot.querySelectorAll(
                    'c-avatar'
                );
                expect(avatarShow).toHaveLength(3);
            })
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    'lightning-button'
                );
                button.click();
            })
            .then(() => {
                const avatarHidden = element.shadowRoot.querySelectorAll(
                    'c-primitive-avatar'
                );
                expect(avatarHidden).toHaveLength(9);
            });
    });

    /* ----- EVENTS ----- */

    // avatar click
    it('Avatar group avatar click event', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.items = item;

        const handler = jest.fn();
        element.addEventListener('avatarclick', handler);

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                '.avonni-avatar-group__avatar'
            );
            avatar.click();
            expect(handler).toHaveBeenCalled();
            expect([handler.mock.calls[0][0].detail.item]).toMatchObject(item);
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        });
    });

    // Action button click
    it('Avatar Action button click event', () => {
        const element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);

        element.items = item;
        element.name = 'Avatar group name';
        element.actionIconName = 'utility:add';

        const handler = jest.fn();
        element.addEventListener('actionclick', handler);

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button'
            );
            actionButton.click();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].detail.name).toBe(
                'Avatar group name'
            );
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        });
    });
});
