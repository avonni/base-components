import { createElement } from 'lwc';
import AvatarGroup from 'c/avatarGroup';
import { Tooltip } from 'c/tooltipLibrary';

jest.mock('c/tooltipLibrary');

// Not tested:
// Focus handling on items and hidden items.

const item = [
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
        fallbackIconName: 'standard:user',
        href: 'url',
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
        presencePosition: 'top-right',
        name: 'avatar-name'
    }
];

const items = [
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
        fallbackIconName: 'standard:user',
        href: 'url',
        alternativeText: 'This is the alternative text',
        primaryText: 'John Doe',
        secondaryText: 'VP, Human Resources',
        tertiaryText: 'FakeCompany Inc.',
        name: 'avatar-name-1'
    },
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        fallbackIconName: 'standard:user',
        href: 'url',
        initials: 'UA',
        alternativeText: 'This is the alternative text',
        primaryText: 'Jane Doe',
        secondaryText: 'VP, Engineering',
        tertiaryText: 'FakeCompany Inc.',
        name: 'avatar-name-2',
        actions: [
            {
                label: 'Edit item',
                name: 'edit-item',
                iconName: 'utility:edit'
            }
        ]
    }
];

const longItems = [];
for (let i = 0; i < 100; i++) {
    const id = longItems.length + i;
    longItems.push({
        fallbackIconName: `custom:custom${id}`,
        name: `item-${id}`,
        primaryText: `Item ${id}`
    });
}

let element;
describe('Avatar Group', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllTimers();
        window.requestAnimationFrame.mockRestore();
    });

    beforeEach(() => {
        element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(), 0);
        });
        document.body.appendChild(element);
        Tooltip.mockClear();
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.actionIconName).toBeUndefined();
            expect(element.enableInfiniteLoading).toBeFalsy();
            expect(element.isLoading).toBeFalsy();
            expect(element.items).toEqual([]);
            expect(element.layout).toBe('stack');
            expect(element.listButtonShowLessIconName).toBeUndefined();
            expect(element.listButtonShowLessIconPosition).toBe('left');
            expect(element.listButtonShowLessLabel).toBe('Show less');
            expect(element.listButtonShowMoreIconName).toBeUndefined();
            expect(element.listButtonShowMoreIconPosition).toBe('left');
            expect(element.listButtonShowMoreLabel).toBe('Show more');
            expect(element.listButtonVariant).toBe('neutral');
            expect(element.maxCount).toBeUndefined();
            expect(element.name).toBeUndefined();
            expect(element.size).toBe('medium');
            expect(element.variant).toBe('square');
        });

        describe('Action button', () => {
            //Action button: absence of action-icon-name
            it('absence of action-icon-name makes action button disappear', () => {
                element.actionIconName = '';
                element.items = longItems;

                return Promise.resolve().then(() => {
                    const actionButton = element.shadowRoot.querySelector(
                        '.avonni-avatar-group__action-button'
                    );
                    expect(actionButton).toBeNull();
                });
            });

            it('action-icon-name button icon', () => {
                element.actionIconName = 'utility:check';
                element.items = longItems;

                return Promise.resolve().then(() => {
                    const actionButton = element.shadowRoot.querySelector(
                        '.avonni-avatar-group__action-button > [data-element-id="lightning-icon"]'
                    );
                    expect(actionButton.iconName).toBe('utility:check');
                });
            });

            describe('Button icon', () => {
                // Action button icon size predicated on switch case due to utility icon default sizing
                // size : x-small, small, medium = x-small icon // size: large, x-large = small icon // size: xx-large = medium icon
                it('size x-small', () => {
                    element.actionIconName = 'utility:check';
                    element.size = 'x-small';
                    element.items = longItems;

                    return Promise.resolve().then(() => {
                        const actionButton = element.shadowRoot.querySelector(
                            '.avonni-avatar-group__action-button > [data-element-id="lightning-icon"]'
                        );
                        expect(actionButton.size).toBe('x-small');
                    });
                });

                it('size small', () => {
                    element.actionIconName = 'utility:check';
                    element.size = 'small';
                    element.items = longItems;

                    return Promise.resolve().then(() => {
                        const actionButton = element.shadowRoot.querySelector(
                            '.avonni-avatar-group__action-button > [data-element-id="lightning-icon"]'
                        );
                        expect(actionButton.size).toBe('x-small');
                    });
                });

                it('size medium', () => {
                    element.actionIconName = 'utility:check';
                    element.size = 'medium';
                    element.items = longItems;

                    return Promise.resolve().then(() => {
                        const actionButton = element.shadowRoot.querySelector(
                            '.avonni-avatar-group__action-button > [data-element-id="lightning-icon"]'
                        );
                        expect(actionButton.size).toBe('x-small');
                    });
                });

                it('size large', () => {
                    element.actionIconName = 'utility:check';
                    element.size = 'large';
                    element.items = longItems;

                    return Promise.resolve().then(() => {
                        const actionButton = element.shadowRoot.querySelector(
                            '.avonni-avatar-group__action-button > [data-element-id="lightning-icon"]'
                        );
                        expect(actionButton.size).toBe('small');
                    });
                });

                it('size x-large', () => {
                    element.actionIconName = 'utility:check';
                    element.size = 'x-large';
                    element.items = longItems;

                    return Promise.resolve().then(() => {
                        const actionButton = element.shadowRoot.querySelector(
                            '.avonni-avatar-group__action-button > [data-element-id="lightning-icon"]'
                        );
                        expect(actionButton.size).toBe('small');
                    });
                });

                it('size xx-large', () => {
                    element.actionIconName = 'utility:check';
                    element.size = 'xx-large';
                    element.items = longItems;

                    return Promise.resolve().then(() => {
                        const actionButton = element.shadowRoot.querySelector(
                            '.avonni-avatar-group__action-button > [data-element-id="lightning-icon"]'
                        );
                        expect(actionButton.size).toBe('medium');
                    });
                });
            });
        });

        // items
        describe('Is loading', () => {
            it('true', () => {
                element.isLoading = true;

                return Promise.resolve().then(() => {
                    const spinner = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-spinner-line"]'
                    );
                    expect(spinner).toBeTruthy();
                });
            });

            it('list layout', () => {
                element.isLoading = true;
                element.layout = 'list';

                return Promise.resolve().then(() => {
                    const spinner = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-spinner-line"]'
                    );
                    expect(spinner).toBeTruthy();
                });
            });

            it('list layout, with show more button', () => {
                element.isLoading = true;
                element.maxCount = 3;
                element.items = longItems;
                element.layout = 'list';

                return Promise.resolve().then(() => {
                    const spinner = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-spinner-list"]'
                    );
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button"]'
                    );
                    expect(spinner).toBeTruthy();
                    expect(button.disabled).toBeTruthy();
                });
            });

            it('in hidden items popover', () => {
                element.maxCount = 3;
                element.items = longItems;
                element.isLoading = true;

                return Promise.resolve()
                    .then(() => {
                        const avatarShow = element.shadowRoot.querySelectorAll(
                            '[data-element-id^="avonni-avatar"]'
                        );
                        expect(avatarShow).toHaveLength(3);
                    })
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-show-more-dropdown"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const spinner = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-spinner-popover"]'
                        );
                        expect(spinner).toBeTruthy();
                    });
            });
        });

        // items
        it('items', () => {
            element.variant = 'circle';
            element.size = 'xx-large';
            element.items = item;

            return Promise.resolve().then(() => {
                const avatars = element.shadowRoot.querySelectorAll(
                    '[data-element-id="avonni-avatar"]'
                );
                avatars.forEach((avatar, index) => {
                    const correspondingField = item[index];
                    expect(correspondingField).toBeTruthy();
                    expect(avatar.fallbackIconName).toBe(
                        correspondingField.fallbackIconName
                    );
                    expect(avatar.href).toBe(correspondingField.href);
                    expect(avatar.initials).toBe(correspondingField.initials);
                    expect(avatar.src).toBe(correspondingField.src);
                    expect(avatar.status).toBe(correspondingField.status);
                    expect(avatar.statusTitle).toBe(
                        correspondingField.statusTitle
                    );
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
                    expect(avatar.primaryText).toBe(
                        correspondingField.primaryText
                    );
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
        describe('layout', () => {
            it('stack with less than 3', () => {
                element.layout = 'stack';
                element.items = items;
                element.actionIconName = '';

                return Promise.resolve().then(() => {
                    const group =
                        element.shadowRoot.querySelector('.slds-avatar-group');
                    expect(group.className).toContain(
                        'avonni-avatar-group__avatar'
                    );

                    const noGroup = element.shadowRoot.querySelector(
                        '.slds-avatar-grouped'
                    );
                    expect(noGroup).toBeTruthy();
                });
            });

            it('stack with more than 2', () => {
                element.layout = 'stack';
                element.items = longItems;

                return Promise.resolve().then(() => {
                    const avatars = element.shadowRoot.querySelectorAll(
                        '.avonni-avatar-group__avatar'
                    );
                    avatars.forEach((avatar) => {
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

            it('grid', () => {
                element.layout = 'grid';
                element.items = longItems;

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

            it('list', () => {
                element.layout = 'list';
                element.items = longItems;

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
        });

        describe('List button', () => {
            describe('Show less', () => {
                it('icon name', () => {
                    element.layout = 'list';
                    element.maxCount = 5;
                    element.listButtonShowLessIconName = 'utility:lock';
                    element.items = longItems;

                    return Promise.resolve()
                        .then(() => {
                            const button = element.shadowRoot.querySelector(
                                '[data-element-id="lightning-button"]'
                            );
                            button.click();
                        })
                        .then(() => {
                            const button = element.shadowRoot.querySelector(
                                '[data-element-id="lightning-button"]'
                            );
                            expect(button.iconName).toBe('utility:lock');
                        });
                });

                it('position right', () => {
                    element.layout = 'list';
                    element.maxCount = 5;
                    element.listButtonVariant = 'neutral';
                    element.listButtonIconName = 'utility:lock';
                    element.listButtonShowLessIconPosition = 'right';
                    element.items = longItems;

                    return Promise.resolve()
                        .then(() => {
                            const button = element.shadowRoot.querySelector(
                                '[data-element-id="lightning-button"]'
                            );
                            button.click();
                        })
                        .then(() => {
                            const button = element.shadowRoot.querySelector(
                                '[data-element-id="lightning-button"]'
                            );
                            expect(button.iconPosition).toBe('right');
                        });
                });

                it('label', () => {
                    element.layout = 'list';
                    element.maxCount = 5;
                    element.listButtonShowLessLabel =
                        'This is a list button label';
                    element.items = longItems;

                    return Promise.resolve()
                        .then(() => {
                            const button = element.shadowRoot.querySelector(
                                '[data-element-id="lightning-button"]'
                            );
                            button.click();
                        })
                        .then(() => {
                            const button = element.shadowRoot.querySelector(
                                '[data-element-id="lightning-button"]'
                            );
                            expect(button.label).toBe(
                                'This is a list button label'
                            );
                        });
                });
            });

            describe('Show more', () => {
                it('icon name', () => {
                    element.layout = 'list';
                    element.maxCount = 5;
                    element.listButtonShowMoreIconName = 'utility:lock';
                    element.items = longItems;

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button"]'
                        );
                        expect(button.iconName).toBe('utility:lock');
                    });
                });

                it('position right', () => {
                    element.layout = 'list';
                    element.maxCount = 5;
                    element.listButtonVariant = 'neutral';
                    element.listButtonIconName = 'utility:lock';
                    element.listButtonShowMoreIconPosition = 'right';
                    element.items = longItems;

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button"]'
                        );
                        expect(button.iconPosition).toBe('right');
                    });
                });

                it('label', () => {
                    element.layout = 'list';
                    element.maxCount = 5;
                    element.listButtonShowMoreLabel =
                        'This is a list button label';
                    element.items = longItems;

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button"]'
                        );
                        expect(button.label).toBe(
                            'This is a list button label'
                        );
                    });
                });
            });

            describe('Variant', () => {
                it('neutral', () => {
                    element.layout = 'list';
                    element.maxCount = 5;
                    element.listButtonLabel = 'button';
                    element.listButtonVariant = 'neutral';
                    element.items = longItems;

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button"]'
                        );
                        expect(button.variant).toBe('neutral');
                    });
                });

                it('base', () => {
                    element.layout = 'list';
                    element.maxCount = 5;
                    element.listButtonLabel = 'button';
                    element.listButtonVariant = 'base';
                    element.items = longItems;

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button"]'
                        );
                        expect(button.variant).toBe('base');
                    });
                });

                it('brand', () => {
                    element.layout = 'list';
                    element.maxCount = 5;
                    element.listButtonLabel = 'button';
                    element.listButtonVariant = 'brand';
                    element.items = longItems;

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button"]'
                        );
                        expect(button.variant).toBe('brand');
                    });
                });

                it('brand-outline', () => {
                    element.layout = 'list';
                    element.maxCount = 5;
                    element.listButtonLabel = 'button';
                    element.listButtonVariant = 'brand-outline';
                    element.items = longItems;

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button"]'
                        );
                        expect(button.variant).toBe('brand-outline');
                    });
                });

                it('destructive', () => {
                    element.layout = 'list';
                    element.maxCount = 5;
                    element.listButtonLabel = 'button';
                    element.listButtonVariant = 'destructive';
                    element.items = longItems;

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button"]'
                        );
                        expect(button.variant).toBe('destructive');
                    });
                });

                it('destructive-text', () => {
                    element.layout = 'list';
                    element.maxCount = 5;
                    element.listButtonLabel = 'button';
                    element.listButtonVariant = 'destructive-text';
                    element.items = longItems;

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button"]'
                        );
                        expect(button.variant).toBe('destructive-text');
                    });
                });

                it('inverse', () => {
                    element.layout = 'list';
                    element.maxCount = 5;
                    element.listButtonLabel = 'button';
                    element.listButtonVariant = 'inverse';
                    element.items = longItems;

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button"]'
                        );
                        expect(button.variant).toBe('inverse');
                    });
                });

                it('success', () => {
                    element.layout = 'list';
                    element.maxCount = 5;
                    element.listButtonLabel = 'button';
                    element.listButtonVariant = 'success';
                    element.items = longItems;

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button"]'
                        );
                        expect(button.variant).toBe('success');
                    });
                });
            });
        });

        // max count
        describe('max count', () => {
            it('max count', () => {
                element.items = longItems;
                element.maxCount = 3;

                return Promise.resolve().then(() => {
                    const avatars = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(avatars).toHaveLength(3);
                });
            });

            it('default max count stack', () => {
                element.layout = 'stack';
                element.items = longItems;

                return Promise.resolve().then(() => {
                    const avatars = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(avatars).toHaveLength(5);
                });
            });

            it('default max count grid', () => {
                element.layout = 'grid';
                element.items = longItems;

                return Promise.resolve().then(() => {
                    const avatars = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(avatars).toHaveLength(11);
                });
            });

            it('default max count list', () => {
                element.items = longItems;
                element.layout = 'list';

                return Promise.resolve().then(() => {
                    const avatars = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(avatars).toHaveLength(11);
                });
            });
        });

        // size
        describe('Size', () => {
            it('size x-small', () => {
                element.size = 'x-small';
                element.items = items;

                return Promise.resolve().then(() => {
                    const avatars =
                        element.shadowRoot.querySelectorAll(
                            '.slds-avatar-group'
                        );
                    avatars.forEach((avatar) => {
                        expect(avatar.className).toContain(
                            'slds-avatar-group_x-small'
                        );
                    });
                });
            });

            it('size small', () => {
                element.size = 'small';
                element.items = items;

                return Promise.resolve().then(() => {
                    const avatars =
                        element.shadowRoot.querySelectorAll(
                            '.slds-avatar-group'
                        );
                    avatars.forEach((avatar) => {
                        expect(avatar.className).toContain(
                            'slds-avatar-group_small'
                        );
                    });
                });
            });

            it('size medium', () => {
                element.size = 'medium';
                element.items = items;

                return Promise.resolve().then(() => {
                    const avatars =
                        element.shadowRoot.querySelectorAll(
                            '.slds-avatar-group'
                        );
                    avatars.forEach((avatar) => {
                        expect(avatar.className).toContain(
                            'slds-avatar-group_medium'
                        );
                    });
                });
            });

            it('size large', () => {
                element.size = 'large';
                element.items = items;

                return Promise.resolve().then(() => {
                    const avatars =
                        element.shadowRoot.querySelectorAll(
                            '.slds-avatar-group'
                        );
                    avatars.forEach((avatar) => {
                        expect(avatar.className).toContain(
                            'slds-avatar-group_large'
                        );
                    });
                });
            });

            it('size x-large', () => {
                element.size = 'x-large';
                element.items = items;

                return Promise.resolve().then(() => {
                    const avatars =
                        element.shadowRoot.querySelectorAll(
                            '.slds-avatar-group'
                        );
                    avatars.forEach((avatar) => {
                        expect(avatar.className).toContain(
                            'avonni-avatar-group_x-large'
                        );
                    });
                });
            });

            it('size xx-large', () => {
                element.size = 'xx-large';
                element.items = items;

                return Promise.resolve().then(() => {
                    const avatars =
                        element.shadowRoot.querySelectorAll(
                            '.slds-avatar-group'
                        );
                    avatars.forEach((avatar) => {
                        expect(avatar.className).toContain(
                            'avonni-avatar-group_xx-large'
                        );
                    });
                });
            });

            describe('Action button', () => {
                it('size x-small', () => {
                    element.size = 'x-small';
                    element.actionIconName = 'utility:add';
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

                it('size small', () => {
                    element.size = 'small';
                    element.actionIconName = 'utility:add';
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

                it('size medium', () => {
                    element.size = 'medium';
                    element.actionIconName = 'utility:add';
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

                it('size large', () => {
                    element.size = 'large';
                    element.actionIconName = 'utility:add';
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

                it('size x-large', () => {
                    element.size = 'x-large';
                    element.actionIconName = 'utility:add';
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

                it('size xx-large', () => {
                    element.size = 'xx-large';
                    element.actionIconName = 'utility:add';
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
            });
        });

        // variant
        describe('Variant', () => {
            it('square', () => {
                element.variant = 'square';
                element.items = items;

                return Promise.resolve().then(() => {
                    const avatars =
                        element.shadowRoot.querySelectorAll(
                            '.slds-avatar-group'
                        );
                    avatars.forEach((avatar) => {
                        expect(avatar.className).not.toContain(
                            'avonni-avatar-group_circle'
                        );
                    });
                });
            });

            it('circle', () => {
                element.variant = 'circle';
                element.items = items;

                return Promise.resolve().then(() => {
                    const avatars =
                        element.shadowRoot.querySelectorAll(
                            '.slds-avatar-group'
                        );
                    avatars.forEach((avatar) => {
                        expect(avatar.className).toContain(
                            'avonni-avatar-group_circle'
                        );
                    });
                });
            });

            describe('Action button', () => {
                it('Square', () => {
                    element.variant = 'square';
                    element.actionIconName = 'utility:add';
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

                it('Circle', () => {
                    element.variant = 'circle';
                    element.actionIconName = 'utility:add';
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
            });
        });
    });

    describe('User actions', () => {
        describe('Hidden items', () => {
            it('open hidden items', () => {
                element.maxCount = 3;
                element.items = longItems;

                return Promise.resolve()
                    .then(() => {
                        const avatarShow = element.shadowRoot.querySelectorAll(
                            '[data-element-id^="avonni-avatar"]'
                        );
                        expect(avatarShow).toHaveLength(3);
                    })
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-show-more-dropdown"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const avatarHidden =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="li-hidden"]'
                            );
                        const focusSpy = jest.spyOn(avatarHidden[0], 'focus');
                        expect(avatarHidden).toHaveLength(longItems.length - 3);
                        jest.runAllTimers();
                        expect(focusSpy).toHaveBeenCalled();
                    });
            });

            it('open hidden items, list layout', () => {
                element.layout = 'list';
                element.maxCount = 3;
                element.items = longItems;

                return Promise.resolve()
                    .then(() => {
                        const avatarShow = element.shadowRoot.querySelectorAll(
                            '[data-element-id^="avonni-avatar"]'
                        );
                        expect(avatarShow).toHaveLength(3);
                    })
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const avatarHidden =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="li-hidden"]'
                            );
                        expect(avatarHidden).toHaveLength(longItems.length - 3);
                    });
            });

            it('open hidden items using keyboard', () => {
                element.maxCount = 3;
                element.items = longItems;

                return Promise.resolve()
                    .then(() => {
                        const avatarShow = element.shadowRoot.querySelectorAll(
                            '[data-element-id^="avonni-avatar"]'
                        );
                        expect(avatarShow).toHaveLength(3);
                    })
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-show-more-dropdown"]'
                        );
                        const event = new CustomEvent('keydown');
                        event.key = 'Enter';
                        button.dispatchEvent(event);
                    })
                    .then(() => {
                        const avatarHidden =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="li-hidden"]'
                            );
                        expect(avatarHidden).toHaveLength(longItems.length - 3);
                    });
            });

            it('close hidden items', () => {
                element.maxCount = 3;
                element.items = longItems;

                return Promise.resolve()
                    .then(() => {
                        const avatarShow = element.shadowRoot.querySelectorAll(
                            '[data-element-id^="avonni-avatar"]'
                        );
                        expect(avatarShow).toHaveLength(3);
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-show-more-dropdown"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const avatarHidden =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="li-hidden"]'
                            );
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-show-more-dropdown"]'
                        );
                        const popover = element.shadowRoot.querySelector(
                            '[data-element-id="div-hidden-items-popover"]'
                        );

                        const avatarFocusSpy = jest.spyOn(
                            avatarHidden[0],
                            'focus'
                        );
                        const buttonFocusSpy = jest.spyOn(button, 'focus');
                        expect(avatarHidden).toHaveLength(longItems.length - 3);
                        jest.runAllTimers();
                        expect(avatarFocusSpy).toHaveBeenCalledTimes(1);
                        expect(buttonFocusSpy).toHaveBeenCalledTimes(0);

                        popover.dispatchEvent(new CustomEvent('focusout'));
                        jest.runAllTimers();
                        expect(avatarFocusSpy).toHaveBeenCalledTimes(1);
                        expect(buttonFocusSpy).toHaveBeenCalledTimes(1);
                    })
                    .then(() => {
                        const avatarHidden =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="li-hidden"]'
                            );
                        expect(avatarHidden).toHaveLength(0);
                    });
            });

            it('close hidden items using keyboard', () => {
                element.maxCount = 3;
                element.items = longItems;

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-show-more-dropdown"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const avatarHidden =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="li-hidden"]'
                            );
                        expect(avatarHidden).toHaveLength(longItems.length - 3);
                        jest.runAllTimers();
                        const event = new CustomEvent('keydown', {
                            bubbles: true
                        });
                        event.keyCode = 27;
                        avatarHidden[0].dispatchEvent(event);
                    })
                    .then(() => {
                        const avatarHidden =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="li-hidden"]'
                            );
                        expect(avatarHidden).toHaveLength(0);
                    });
            });
        });

        // Keyboard navigation
        it('change focus position on keyboard arrows', () => {
            element.items = [...items, ...item];

            return Promise.resolve().then(() => {
                const avatars = element.shadowRoot.querySelectorAll(
                    '[data-element-id="li-visible"]'
                );
                const firstAvatarFocus = jest.spyOn(avatars[0], 'focus');
                const secondAvatarFocus = jest.spyOn(avatars[1], 'focus');
                const thirdAvatarFocus = jest.spyOn(avatars[2], 'focus');

                // First focus on the group focuses the first avatar
                const ul = element.shadowRoot.querySelector(
                    '[data-element-id="ul"]'
                );
                ul.focus();
                expect(firstAvatarFocus).toHaveBeenCalledTimes(1);
                expect(secondAvatarFocus).toHaveBeenCalledTimes(0);
                expect(thirdAvatarFocus).toHaveBeenCalledTimes(0);

                // Move focus to the right
                const event = new CustomEvent('keydown', { bubbles: true });
                event.keyCode = 39;
                avatars[0].dispatchEvent(event);
                expect(firstAvatarFocus).toHaveBeenCalledTimes(1);
                expect(secondAvatarFocus).toHaveBeenCalledTimes(1);
                expect(thirdAvatarFocus).toHaveBeenCalledTimes(0);

                // Try to move to the right again: the focus stay on the last avatar
                avatars[1].dispatchEvent(event);
                expect(thirdAvatarFocus).toHaveBeenCalledTimes(1);
                avatars[2].dispatchEvent(event);
                expect(firstAvatarFocus).toHaveBeenCalledTimes(1);
                expect(secondAvatarFocus).toHaveBeenCalledTimes(1);
                expect(thirdAvatarFocus).toHaveBeenCalledTimes(2);

                // Move focus back to the left
                event.keyCode = 37;
                avatars[2].dispatchEvent(event);
                avatars[1].dispatchEvent(event);
                expect(firstAvatarFocus).toHaveBeenCalledTimes(2);
                expect(secondAvatarFocus).toHaveBeenCalledTimes(2);
                expect(thirdAvatarFocus).toHaveBeenCalledTimes(2);

                // Try to move to the left again: the focus stay on the first avatar
                avatars[0].dispatchEvent(event);
                expect(firstAvatarFocus).toHaveBeenCalledTimes(3);
                expect(secondAvatarFocus).toHaveBeenCalledTimes(2);
                expect(thirdAvatarFocus).toHaveBeenCalledTimes(2);
            });
        });

        it('Show tooltip by hovering the avatar', () => {
            element.items = items;

            return Promise.resolve().then(() => {
                const avatar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-avatar"]'
                );
                expect(avatar).toBeTruthy();
                avatar.dispatchEvent(new CustomEvent('mouseenter'));
                expect(Tooltip).toHaveBeenCalled();
                expect(Tooltip.mock.calls[0][0]).toBe(items[0].alternativeText);
                const instance = Tooltip.mock.instances[0];
                expect(instance.initialize).toHaveBeenCalled();
            });
        });
    });

    describe('Events', () => {
        // Avatar click
        describe('avatarclick', () => {
            // Action button click
            it('actionbuttonclick', () => {
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
                    expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });

            it('avatarclick', () => {
                element.items = item;

                const handler = jest.fn();
                element.addEventListener('avatarclick', handler);

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '.avonni-avatar-group__avatar'
                    );
                    avatar.click();
                    expect(handler).toHaveBeenCalled();
                    expect([
                        handler.mock.calls[0][0].detail.item
                    ]).toMatchObject(item);
                    expect(handler.mock.calls[0][0].detail.name).toBe(
                        item[0].name
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
                });
            });

            it('Using keyboard', () => {
                element.items = item;

                const handler = jest.fn();
                element.addEventListener('avatarclick', handler);

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="li-visible"]'
                    );
                    const event = new CustomEvent('keydown', { bubbles: true });
                    event.keyCode = 13;
                    avatar.dispatchEvent(event);
                    expect(handler).toHaveBeenCalled();
                    expect([
                        handler.mock.calls[0][0].detail.item
                    ]).toMatchObject(item);
                    expect(handler.mock.calls[0][0].detail.name).toBe(
                        item[0].name
                    );
                });
            });

            it('Closes hidden items popover', () => {
                element.items = longItems;

                const handler = jest.fn();
                element.addEventListener('avatarclick', handler);

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-show-more-dropdown"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const hiddenAvatar = element.shadowRoot.querySelector(
                            '[data-element-id="li-hidden"]'
                        );
                        hiddenAvatar.click();
                        expect(handler).toHaveBeenCalled();
                    })
                    .then(() => {
                        const hiddenAvatar = element.shadowRoot.querySelector(
                            '[data-element-id="li-hidden"]'
                        );
                        expect(hiddenAvatar).toBeNull();
                    });
            });
        });

        // Avatar action click
        // Depends on action name
        it('avataractionclick', () => {
            element.items = items;
            element.layout = 'grid';

            const handler = jest.fn();
            element.addEventListener('avataractionclick', handler);

            return Promise.resolve().then(() => {
                const avatar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-avatar"]'
                );
                expect(avatar).toBeTruthy();
                avatar.dispatchEvent(
                    new CustomEvent('actionclick', {
                        bubbles: true,
                        detail: {
                            name: items[1].actions[0].name
                        }
                    })
                );

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.name).toBe('edit-item');
                expect(handler.mock.calls[0][0].detail.targetName).toBe(
                    'avatar-name-1'
                );
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });

        describe('itemsvisibilitytoggle', () => {
            it('itemsvisibilitytoggle', () => {
                element.items = longItems;
                element.maxCount = 3;
                element.layout = 'list';

                const handler = jest.fn();
                element.addEventListener('itemsvisibilitytoggle', handler);

                return Promise.resolve()
                    .then(() => {
                        const popover = element.shadowRoot.querySelector(
                            '[data-element-id="div-hidden-items-popover"]'
                        );
                        expect(popover).toBeFalsy();
                    })
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button"]'
                        );
                        button.click();
                        expect(handler).toHaveBeenCalled();
                        const call = handler.mock.calls[0][0];
                        expect(call.bubbles).toBeFalsy();
                        expect(call.cancelable).toBeTruthy();
                        expect(call.composed).toBeFalsy();
                        expect(call.detail.show).toBeTruthy();
                    })
                    .then(() => {
                        const popover = element.shadowRoot.querySelector(
                            '[data-element-id="div-hidden-items-popover"]'
                        );
                        expect(popover).toBeTruthy();
                    });
            });

            it('itemsvisibilitytoggle, cancelled', () => {
                element.items = longItems;
                element.maxCount = 3;
                element.layout = 'list';

                const handler = jest.fn((event) => {
                    event.preventDefault();
                });
                element.addEventListener('itemsvisibilitytoggle', handler);

                return Promise.resolve()
                    .then(() => {
                        const popover = element.shadowRoot.querySelector(
                            '[data-element-id="div-hidden-items-popover"]'
                        );
                        expect(popover).toBeFalsy();
                    })
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button"]'
                        );
                        button.click();
                        expect(handler).toHaveBeenCalled();
                        const call = handler.mock.calls[0][0];
                        expect(call.bubbles).toBeFalsy();
                        expect(call.cancelable).toBeTruthy();
                        expect(call.composed).toBeFalsy();
                        expect(call.detail.show).toBeTruthy();
                    })
                    .then(() => {
                        const popover = element.shadowRoot.querySelector(
                            '[data-element-id="div-hidden-items-popover"]'
                        );
                        expect(popover).toBeFalsy();
                    });
            });
        });

        describe('loadmore', () => {
            it('Load more on first load if there are no items', () => {
                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                element.enableInfiniteLoading = true;
                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.bubbles).toBeFalsy();
                expect(call.cancelable).toBeFalsy();
                expect(call.composed).toBeFalsy();
            });

            it('Load more on first load if there are no items, list layout', () => {
                element.layout = 'list';

                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                element.enableInfiniteLoading = true;
                expect(handler).toHaveBeenCalled();
            });

            it('Load more on first load if there is room for more items', () => {
                jest.spyOn(window, 'getComputedStyle').mockReturnValue({
                    width: '10px',
                    marginLeft: '10px',
                    marginRight: '10px'
                });
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="avatar-group-wrapper"]'
                );
                jest.spyOn(wrapper, 'offsetWidth', 'get').mockReturnValue(100);

                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                element.items = items;
                element.enableInfiniteLoading = true;

                expect(handler).toHaveBeenCalledTimes(1);
            });

            it('Load more on hidden items open, if there is no scroll bar', () => {
                jest.spyOn(window, 'getComputedStyle').mockReturnValue({
                    width: '10px',
                    marginLeft: '10px',
                    marginRight: '10px'
                });
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="avatar-group-wrapper"]'
                );
                jest.spyOn(wrapper, 'offsetWidth', 'get').mockReturnValue(100);
                element.enableInfiniteLoading = true;
                element.items = longItems;

                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                return Promise.resolve()
                    .then(() => {
                        // Update the visible max count
                    })
                    .then(() => {
                        const avatarShow = element.shadowRoot.querySelectorAll(
                            '[data-element-id^="avonni-avatar"]'
                        );
                        expect(avatarShow).toHaveLength(4);
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-show-more-dropdown"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        jest.runAllTimers();
                        expect(handler).toHaveBeenCalledTimes(1);
                    });
            });

            it('Load more on hidden items open, if there is no hidden items', () => {
                jest.spyOn(window, 'getComputedStyle').mockReturnValue({
                    width: '10px',
                    marginLeft: '10px',
                    marginRight: '10px'
                });
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="avatar-group-wrapper"]'
                );
                jest.spyOn(wrapper, 'offsetWidth', 'get').mockReturnValue(100);
                element.enableInfiniteLoading = true;
                element.items = longItems.slice(0, 6);

                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                return Promise.resolve()
                    .then(() => {
                        // Update the visible max count
                    })
                    .then(() => {
                        const avatarShow = element.shadowRoot.querySelectorAll(
                            '[data-element-id^="avonni-avatar"]'
                        );
                        expect(avatarShow).toHaveLength(4);
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-show-more-dropdown"]'
                        );
                        button.click();
                        expect(handler).not.toHaveBeenCalled();
                    });
            });

            it('Load more on hidden items scroll', () => {
                jest.spyOn(window, 'getComputedStyle').mockReturnValue({
                    width: '10px',
                    marginLeft: '10px',
                    marginRight: '10px'
                });
                const wrapper = element.shadowRoot.querySelector(
                    '[data-element-id="avatar-group-wrapper"]'
                );
                jest.spyOn(wrapper, 'offsetWidth', 'get').mockReturnValue(100);
                element.enableInfiniteLoading = true;
                element.loadMoreOffset = 40;
                element.items = longItems;

                const handler = jest.fn();
                element.addEventListener('loadmore', handler);

                return Promise.resolve()
                    .then(() => {
                        // Update the visible max count
                    })
                    .then(() => {
                        const avatarShow = element.shadowRoot.querySelectorAll(
                            '[data-element-id^="avonni-avatar"]'
                        );
                        expect(avatarShow).toHaveLength(4);
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-show-more-dropdown"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const popover = element.shadowRoot.querySelector(
                            '[data-element-id="div-hidden-items-popover"]'
                        );
                        jest.spyOn(
                            popover,
                            'scrollHeight',
                            'get'
                        ).mockReturnValue(100);
                        jest.runAllTimers();
                        expect(handler).not.toHaveBeenCalled();

                        popover.scrollTop = 90;
                        popover.dispatchEvent(new CustomEvent('scroll'));
                        expect(handler).toHaveBeenCalled();
                    });
            });
        });
    });
});
