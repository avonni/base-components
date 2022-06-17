/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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
        presencePosition: 'top-right',
        name: 'avatar-name'
    }
];

const items = [
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg',
        fallbackIconName: 'standard:user',
        alternativeText: 'This is the alternative text',
        primaryText: 'John Doe',
        secondaryText: 'VP, Human Resources',
        tertiaryText: 'FakeCompany Inc.',
        name: 'avatar-name-1'
    },
    {
        src: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
        fallbackIconName: 'standard:user',
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

let element;
describe('Avatar Group', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-avatar-group', {
            is: AvatarGroup
        });
        document.body.appendChild(element);
    });

    it('Avatar Group:: Default attributes', () => {
        expect(element.size).toBe('medium');
        expect(element.variant).toBe('square');
        expect(element.items).toMatchObject([]);
        expect(element.layout).toBe('stack');
        expect(element.maxCount).toBe(5);
        expect(element.listButtonShowLessIconName).toBeUndefined();
        expect(element.listButtonShowLessIconPosition).toBe('left');
        expect(element.listButtonShowLessLabel).toBe('Show less');
        expect(element.listButtonShowMoreIconName).toBeUndefined();
        expect(element.listButtonShowMoreIconPosition).toBe('left');
        expect(element.listButtonShowMoreLabel).toBe('Show more');
        expect(element.listButtonVariant).toBe('neutral');
        expect(element.actionIconName).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // size
    // Depends on actionIconName
    it('Avatar group: size x-small', () => {
        element.size = 'x-small';
        element.items = items;

        return Promise.resolve().then(() => {
            const avatars =
                element.shadowRoot.querySelectorAll('.slds-avatar-group');
            avatars.forEach((avatar) => {
                expect(avatar.className).toContain('slds-avatar-group_x-small');
            });
        });
    });

    it('Avatar group: Action Button size x-small', () => {
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

    it('Avatar group: size small', () => {
        element.size = 'small';
        element.items = items;

        return Promise.resolve().then(() => {
            const avatars =
                element.shadowRoot.querySelectorAll('.slds-avatar-group');
            avatars.forEach((avatar) => {
                expect(avatar.className).toContain('slds-avatar-group_small');
            });
        });
    });

    it('Avatar group: Action Button size small', () => {
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

    it('Avatar group: size medium', () => {
        element.size = 'medium';
        element.items = items;

        return Promise.resolve().then(() => {
            const avatars =
                element.shadowRoot.querySelectorAll('.slds-avatar-group');
            avatars.forEach((avatar) => {
                expect(avatar.className).toContain('slds-avatar-group_medium');
            });
        });
    });

    it('Avatar group: Action Button size medium', () => {
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

    it('Avatar group: size large', () => {
        element.size = 'large';
        element.items = items;

        return Promise.resolve().then(() => {
            const avatars =
                element.shadowRoot.querySelectorAll('.slds-avatar-group');
            avatars.forEach((avatar) => {
                expect(avatar.className).toContain('slds-avatar-group_large');
            });
        });
    });

    it('Avatar group: Action Button size large', () => {
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

    it('Avatar group: size x-large', () => {
        element.size = 'x-large';
        element.items = items;

        return Promise.resolve().then(() => {
            const avatars =
                element.shadowRoot.querySelectorAll('.slds-avatar-group');
            avatars.forEach((avatar) => {
                expect(avatar.className).toContain(
                    'avonni-avatar-group_x-large'
                );
            });
        });
    });

    it('Avatar group: Action Button size x-large', () => {
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

    it('Avatar group: size xx-large', () => {
        element.size = 'xx-large';
        element.items = items;

        return Promise.resolve().then(() => {
            const avatars =
                element.shadowRoot.querySelectorAll('.slds-avatar-group');
            avatars.forEach((avatar) => {
                expect(avatar.className).toContain(
                    'avonni-avatar-group_xx-large'
                );
            });
        });
    });

    it('Avatar group: Action Button size xx-large', () => {
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

    // Variant
    // Depends on actionIconName
    it('Avatar group: variant square', () => {
        element.variant = 'square';
        element.items = items;

        return Promise.resolve().then(() => {
            const avatars =
                element.shadowRoot.querySelectorAll('.slds-avatar-group');
            avatars.forEach((avatar) => {
                expect(avatar.className).not.toContain(
                    'avonni-avatar-group_circle'
                );
            });
        });
    });

    it('Avatar group: Action button variant square', () => {
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

    it('Avatar group: variant circle', () => {
        element.variant = 'circle';
        element.items = items;

        return Promise.resolve().then(() => {
            const avatars =
                element.shadowRoot.querySelectorAll('.slds-avatar-group');
            avatars.forEach((avatar) => {
                expect(avatar.className).toContain(
                    'avonni-avatar-group_circle'
                );
            });
        });
    });

    it('Avatar group: Action button variant circle', () => {
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

    // items
    it('Avatar group: items', () => {
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
    it('Avatar group: layout stack with less than 3', () => {
        element.layout = 'stack';
        element.items = items;
        element.actionIconName = '';

        return Promise.resolve().then(() => {
            const group =
                element.shadowRoot.querySelector('.slds-avatar-group');
            expect(group.className).toContain('avonni-avatar-group__avatar');

            const noGroup = element.shadowRoot.querySelector(
                '.slds-avatar-grouped'
            );
            expect(noGroup).toBeTruthy();
        });
    });

    it('Avatar group: layout stack with more than 2', () => {
        element.layout = 'stack';
        element.items = [...items, ...items, ...items];

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

    it('Avatar group: layout grid', () => {
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

    it('Avatar group: layout list', () => {
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
    it('Avatar group: max count stack', () => {
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

    it('Avatar group: max count grid', () => {
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

    it('Avatar group: max count list', () => {
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

    // list button show less icon name
    it('Avatar group: list button show less icon name', () => {
        element.layout = 'list';
        element.maxCount = 5;
        element.listButtonShowLessIconName = 'utility:lock';
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

    // list button show less icon position
    it('Avatar group: list button show less position right', () => {
        element.layout = 'list';
        element.maxCount = 5;
        element.listButtonVariant = 'neutral';
        element.listButtonIconName = 'utility:lock';
        element.listButtonShowLessIconPosition = 'right';
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

    // list button show less label
    it('Avatar group: list button show less label', () => {
        element.layout = 'list';
        element.maxCount = 5;
        element.listButtonShowLessLabel = 'This is a list button label';
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
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
                );
                button.click();
            })
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button"]'
                );
                expect(button.label).toBe('This is a list button label');
            });
    });

    // list button show more icon name
    it('Avatar group: list button show more icon name', () => {
        element.layout = 'list';
        element.maxCount = 5;
        element.listButtonShowMoreIconName = 'utility:lock';
        element.items = [
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items
        ];

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.iconName).toBe('utility:lock');
        });
    });

    // list button show more icon position
    it('Avatar group: list button show more position right', () => {
        element.layout = 'list';
        element.maxCount = 5;
        element.listButtonVariant = 'neutral';
        element.listButtonIconName = 'utility:lock';
        element.listButtonShowMoreIconPosition = 'right';
        element.items = [
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items
        ];

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.iconPosition).toBe('right');
        });
    });

    // list button show more label
    it('Avatar group: list button show more label', () => {
        element.layout = 'list';
        element.maxCount = 5;
        element.listButtonShowMoreLabel = 'This is a list button label';
        element.items = [
            ...items,
            ...items,
            ...items,
            ...items,
            ...items,
            ...items
        ];

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.label).toBe('This is a list button label');
        });
    });

    // list button variant
    it('Avatar group: list button variant neutral', () => {
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
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.variant).toBe('neutral');
        });
    });

    it('Avatar group: list button variant base', () => {
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
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.variant).toBe('base');
        });
    });

    it('Avatar group: list button variant brand', () => {
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
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.variant).toBe('brand');
        });
    });

    it('Avatar group: list button variant brand-outline', () => {
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
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.variant).toBe('brand-outline');
        });
    });

    it('Avatar group: list button variant destructive', () => {
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
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.variant).toBe('destructive');
        });
    });

    it('Avatar group: list button variant destructive-text', () => {
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
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.variant).toBe('destructive-text');
        });
    });

    it('Avatar group: list button variant inverse', () => {
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
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.variant).toBe('inverse');
        });
    });

    it('Avatar group: list button variant success', () => {
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
            const button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button"]'
            );
            expect(button.variant).toBe('success');
        });
    });

    //Action button: absence of action-icon-name
    it('Avatar group: action Button absence of action-icon-name makes action button disappear', () => {
        element.actionIconName = '';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button'
            );
            expect(actionButton).toBeNull();
        });
    });

    it('Avatar group: action Button action-icon-name button icon', () => {
        element.actionIconName = 'utility:check';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button > [data-element-id="lightning-icon"]'
            );
            expect(actionButton.iconName).toBe('utility:check');
        });
    });

    // Action button icon size predicated on switch case due to utility icon default sizing
    // size : x-small, small, medium = x-small icon // size: large, x-large = small icon // size: xx-large = medium icon
    it('Avatar group: action Button button icon size x-small', () => {
        element.actionIconName = 'utility:check';
        element.size = 'x-small';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button > [data-element-id="lightning-icon"]'
            );
            expect(actionButton.size).toBe('x-small');
        });
    });

    it('Avatar group: action Button button icon size small', () => {
        element.actionIconName = 'utility:check';
        element.size = 'small';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button > [data-element-id="lightning-icon"]'
            );
            expect(actionButton.size).toBe('x-small');
        });
    });

    it('Avatar group: action Button button icon size medium', () => {
        element.actionIconName = 'utility:check';
        element.size = 'medium';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button > [data-element-id="lightning-icon"]'
            );
            expect(actionButton.size).toBe('x-small');
        });
    });

    it('Avatar group: action Button button icon size large', () => {
        element.actionIconName = 'utility:check';
        element.size = 'large';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button > [data-element-id="lightning-icon"]'
            );
            expect(actionButton.size).toBe('small');
        });
    });

    it('Avatar group: action Button button icon size x-large', () => {
        element.actionIconName = 'utility:check';
        element.size = 'x-large';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button > [data-element-id="lightning-icon"]'
            );
            expect(actionButton.size).toBe('small');
        });
    });

    it('Avatar group: action Button button icon size xx-large', () => {
        element.actionIconName = 'utility:check';
        element.size = 'xx-large';
        element.items = [...items, ...items, ...items];

        return Promise.resolve().then(() => {
            const actionButton = element.shadowRoot.querySelector(
                '.avonni-avatar-group__action-button > [data-element-id="lightning-icon"]'
            );
            expect(actionButton.size).toBe('medium');
        });
    });

    /* ----- JS ----- */

    // list hidden items
    it('Avatar group: list hidden items', () => {
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
                const avatarHidden = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="avonni-primitive-avatar"]'
                );
                expect(avatarHidden).toHaveLength(9);
            });
    });
    /* ----- EVENTS ----- */

    // avatar click
    it('Avatar group: avatar click event', () => {
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
            expect(handler.mock.calls[0][0].detail.name).toBe(item[0].name);
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        });
    });

    // Action button click
    it('Avatar group: action button click event', () => {
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

    // actionclick event
    // Depends on action name
    it('Avatar group: actionclick event', () => {
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
});
