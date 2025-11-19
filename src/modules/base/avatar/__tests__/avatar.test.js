import { createElement } from 'lwc';
import Avatar from 'c/avatar';

let element;
describe('Avatar', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.actionMenuIcon).toBeUndefined();
            expect(element.actionPosition).toBe('bottom-left');
            expect(element.actions).toMatchObject([]);
            expect(element.alternativeText).toBe('Avatar');
            expect(element.entityIconName).toBeUndefined();
            expect(element.entityPosition).toBe('top-left');
            expect(element.entitySrc).toBeUndefined();
            expect(element.entityTitle).toBe('Entity');
            expect(element.entityVariant).toBe('square');
            expect(element.fallbackIconName).toBeUndefined();
            expect(element.hideAvatarDetails).toBeFalsy();
            expect(element.href).toBeUndefined();
            expect(element.iconPosition).toBe('center');
            expect(element.initials).toBeUndefined();
            expect(element.presence).toBeNull();
            expect(element.presencePosition).toBe('bottom-right');
            expect(element.presenceTitle).toBe('Presence');
            expect(element.primaryText).toBeUndefined();
            expect(element.secondaryText).toBeUndefined();
            expect(element.size).toBe('medium');
            expect(element.src).toBeUndefined();
            expect(element.status).toBeNull();
            expect(element.statusPosition).toBe('top-right');
            expect(element.statusTitle).toBe('Status');
            expect(element.tags).toMatchObject([]);
            expect(element.tertiaryText).toBeUndefined();
            expect(element.textPosition).toBe('right');
            expect(element.variant).toBe('square');
        });

        describe('Actions', () => {
            it('actions', () => {
                element.fallbackIconName = 'standard:account';
                const actions = [
                    {
                        label: 'Edit item',
                        name: 'edit-item',
                        iconName: 'utility:edit'
                    },
                    {
                        label: 'Add item',
                        name: 'add-item',
                        iconName: 'utility:add'
                    }
                ];
                element.actions = actions;
                element.actionMenuIcon = 'utility:threedots';
                element.actionPosition = 'top-right';
                element.hideAvatarDetails = true;

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.actions).toEqual([
                        {
                            label: 'Edit item',
                            name: 'edit-item',
                            iconName: 'utility:edit'
                        },
                        {
                            label: 'Add item',
                            name: 'add-item',
                            iconName: 'utility:add'
                        }
                    ]);
                    expect(avatar.actionMenuIcon).toEqual('utility:threedots');
                    expect(avatar.actionPosition).toEqual('top-right');
                });
            });
        });

        describe('Alternative Text', () => {
            it('with image', () => {
                element.alternativeText = 'This is an alternative text';
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                element.hideAvatarDetails = true;

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.alternativeText).toBe(
                        'This is an alternative text'
                    );
                });
            });

            it('with icon', () => {
                element.alternativeText = 'This is an alternative text';
                element.fallbackIconName = 'standard:account';
                element.hideAvatarDetails = true;

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.alternativeText).toBe(
                        'This is an alternative text'
                    );
                });
            });

            it('with initials', () => {
                element.alternativeText = 'This is an alternative text';
                element.initials = 'JD';
                element.hideAvatarDetails = true;

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.alternativeText).toBe(
                        'This is an alternative text'
                    );
                });
            });
        });

        describe('Entity', () => {
            it('icon name', () => {
                element.entityIconName = 'standard:account';
                element.entityInitials = 'JD';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.entityIconName).toBe('standard:account');
                });
            });

            describe('Entity Position', () => {
                it('top-right', () => {
                    element.entityIconName = 'standard:account';
                    element.entityInitials = 'JD';
                    element.entityPosition = 'top-right';
                    element.hideAvatarDetails = true;
                    element.src =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-no-details"]'
                        );
                        expect(avatar.entityPosition).toBe('top-right');
                    });
                });

                it('top-left', () => {
                    element.entityIconName = 'standard:account';
                    element.entityInitials = 'JD';
                    element.entityPosition = 'top-left';
                    element.hideAvatarDetails = true;
                    element.src =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-no-details"]'
                        );
                        expect(avatar.entityPosition).toBe('top-left');
                    });
                });

                it('bottom-right', () => {
                    element.entityIconName = 'standard:account';
                    element.entityInitials = 'JD';
                    element.entityPosition = 'bottom-right';
                    element.hideAvatarDetails = true;
                    element.src =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-no-details"]'
                        );
                        expect(avatar.entityPosition).toBe('bottom-right');
                    });
                });

                it('bottom-left', () => {
                    element.entityIconName = 'standard:account';
                    element.entityInitials = 'JD';
                    element.entityPosition = 'bottom-left';
                    element.hideAvatarDetails = true;
                    element.src =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-no-details"]'
                        );
                        expect(avatar.entityPosition).toBe('bottom-left');
                    });
                });
            });

            describe('Entity Src', () => {
                it('src', () => {
                    element.hideAvatarDetails = true;
                    element.fallbackIconName = 'standard:account';
                    element.entitySrc =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-no-details"]'
                        );
                        expect(avatar.entitySrc).toBe(
                            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
                        );
                    });
                });
            });

            describe('Entity Title', () => {
                it('title', () => {
                    element.hideAvatarDetails = true;
                    element.fallbackIconName = 'standard:account';
                    element.entitySrc =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                    element.entityTitle = 'Entity Title';

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-no-details"]'
                        );
                        expect(avatar.entityTitle).toBe('Entity Title');
                    });
                });
            });

            describe('Entity Variant', () => {
                it('circle', () => {
                    element.entityIconName = 'standard:account';
                    element.entityPosition = 'bottom-right';
                    element.entityVariant = 'circle';
                    element.hideAvatarDetails = true;
                    element.src =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-no-details"]'
                        );
                        expect(avatar.entityVariant).toBe('circle');
                    });
                });

                it('square', () => {
                    element.entityIconName = 'standard:account';
                    element.entityPosition = 'bottom-right';
                    element.entityVariant = 'square';
                    element.hideAvatarDetails = true;
                    element.src =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-no-details"]'
                        );
                        expect(avatar.entityVariant).toBe('square');
                    });
                });
            });
        });

        describe('Fallback Icon Name', () => {
            it('fallbackIconName', () => {
                element.fallbackIconName = 'standard:account';
                element.hideAvatarDetails = true;

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.fallbackIconName).toBe('standard:account');
                });
            });
        });

        describe('Href', () => {
            it('url', () => {
                element.fallbackIconName = 'standard:account';
                element.href = 'url';
                element.hideAvatarDetails = true;

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.href).toBe('url');
                });
            });
        });

        describe('Icon Position', () => {
            it('Start', () => {
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                element.iconPosition = 'start';

                return Promise.resolve().then(() => {
                    const mediaObject = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-media-object"]'
                    );
                    expect(mediaObject.verticalAlign).toBe('start');
                });
            });

            it('Center', () => {
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                element.iconPosition = 'center';

                return Promise.resolve().then(() => {
                    const mediaObject = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-media-object"]'
                    );
                    expect(mediaObject.verticalAlign).toBe('center');
                });
            });

            it('End', () => {
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                element.iconPosition = 'end';

                return Promise.resolve().then(() => {
                    const mediaObject = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-media-object"]'
                    );
                    expect(mediaObject.verticalAlign).toBe('end');
                });
            });
        });

        describe('Initials', () => {
            it('initials', () => {
                element.initials = 'JD';
                element.hideAvatarDetails = true;

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.initials).toBe('JD');
                });
            });
        });

        describe('Presence', () => {
            it('online', () => {
                element.presence = 'online';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.presence).toBe('online');
                });
            });

            it('busy', () => {
                element.presence = 'busy';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.presence).toBe('busy');
                });
            });

            it('focus', () => {
                element.presence = 'focus';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.presence).toBe('focus');
                });
            });

            it('offline', () => {
                element.presence = 'offline';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.presence).toBe('offline');
                });
            });

            it('blocked', () => {
                element.presence = 'blocked';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.presence).toBe('blocked');
                });
            });

            it('away', () => {
                element.presence = 'away';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.presence).toBe('away');
                });
            });

            describe('Presence Position', () => {
                it('bottom-right', () => {
                    element.presence = 'online';
                    element.presencePosition = 'bottom-right';
                    element.hideAvatarDetails = true;
                    element.src =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-no-details"]'
                        );
                        expect(avatar.presencePosition).toBe('bottom-right');
                    });
                });

                it('bottom-left', () => {
                    element.presence = 'online';
                    element.presencePosition = 'bottom-left';
                    element.hideAvatarDetails = true;
                    element.src =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-no-details"]'
                        );
                        expect(avatar.presencePosition).toBe('bottom-left');
                    });
                });

                it('top-left', () => {
                    element.presence = 'online';
                    element.presencePosition = 'top-left';
                    element.hideAvatarDetails = true;
                    element.src =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-no-details"]'
                        );
                        expect(avatar.presencePosition).toBe('top-left');
                    });
                });

                it('top-right', () => {
                    element.presence = 'online';
                    element.presencePosition = 'top-right';
                    element.hideAvatarDetails = true;
                    element.src =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-no-details"]'
                        );
                        expect(avatar.presencePosition).toBe('top-right');
                    });
                });
            });

            describe('Presence Title', () => {
                it('title', () => {
                    element.presence = 'online';
                    element.presenceTitle = 'Title';
                    element.hideAvatarDetails = true;
                    element.src =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-no-details"]'
                        );
                        expect(avatar.presenceTitle).toBe('Title');
                    });
                });
            });
        });

        describe('Primary Text', () => {
            it('primaryText', () => {
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                element.primaryText = 'This is a primary text';

                return Promise.resolve().then(() => {
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-avatar-primary-text"]'
                    );
                    expect(text.textContent).toBe('This is a primary text');
                });
            });
        });

        describe('Secondary Text', () => {
            it('secondaryText', () => {
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                element.secondaryText = 'This is a secondary text';

                return Promise.resolve().then(() => {
                    const text = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-avatar-secondary-text"]'
                    );
                    expect(text.textContent).toBe('This is a secondary text');
                });
            });
        });

        describe('Size', () => {
            it('xx-small', () => {
                element.size = 'xx-small';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.size).toBe('xx-small');
                });
            });

            it('x-small', () => {
                element.size = 'x-small';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.size).toBe('x-small');
                });
            });

            it('small', () => {
                element.size = 'small';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.size).toBe('small');
                });
            });

            it('medium', () => {
                element.size = 'medium';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.size).toBe('medium');
                });
            });

            it('large', () => {
                element.size = 'large';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.size).toBe('large');
                });
            });

            it('x-large', () => {
                element.size = 'x-large';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.size).toBe('x-large');
                });
            });

            it('xx-large', () => {
                element.size = 'xx-large';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.size).toBe('xx-large');
                });
            });

            it('xxx-large', () => {
                element.size = 'xxx-large';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.size).toBe('xxx-large');
                });
            });
        });

        describe('Src', () => {
            it('Src', () => {
                element.size = 'xx-large';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.src).toBe(
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
                    );
                });
            });
        });

        describe('Status', () => {
            it('approved', () => {
                element.status = 'approved';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.status).toBe('approved');
                });
            });

            it('declined', () => {
                element.status = 'declined';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.status).toBe('declined');
                });
            });

            it('locked', () => {
                element.status = 'locked';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.status).toBe('locked');
                });
            });

            it('unknown', () => {
                element.status = 'unknown';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.status).toBe('unknown');
                });
            });

            describe('Status Position', () => {
                it('top-right', () => {
                    element.status = 'approved';
                    element.statusPosition = 'top-right';
                    element.hideAvatarDetails = true;
                    element.src =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-no-details"]'
                        );
                        expect(avatar.statusPosition).toBe('top-right');
                    });
                });

                it('top-left', () => {
                    element.status = 'approved';
                    element.statusPosition = 'top-left';
                    element.hideAvatarDetails = true;
                    element.src =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-no-details"]'
                        );
                        expect(avatar.statusPosition).toBe('top-left');
                    });
                });

                it('bottom-right', () => {
                    element.status = 'approved';
                    element.statusPosition = 'bottom-right';
                    element.hideAvatarDetails = true;
                    element.src =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-no-details"]'
                        );
                        expect(avatar.statusPosition).toBe('bottom-right');
                    });
                });

                it('bottom-left', () => {
                    element.status = 'approved';
                    element.statusPosition = 'bottom-left';
                    element.hideAvatarDetails = true;
                    element.src =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-no-details"]'
                        );
                        expect(avatar.statusPosition).toBe('bottom-left');
                    });
                });
            });

            describe('Status Title', () => {
                it('title', () => {
                    element.status = 'approved';
                    element.statusTitle = 'Status title';
                    element.hideAvatarDetails = true;
                    element.src =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                    return Promise.resolve().then(() => {
                        const avatar = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-avatar-no-details"]'
                        );
                        expect(avatar.statusTitle).toBe('Status title');
                    });
                });
            });
        });

        describe('Tags', () => {
            it('tags', async () => {
                element.fallbackIconName = 'standard:account';
                element.tags = [
                    { label: 'base', variant: 'base' },
                    { label: 'outline', variant: 'brand', outline: true }
                ];

                await new Promise((resolve) => setTimeout(resolve));

                const chipContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-avatar-tags"]'
                );
                expect(chipContainer).toBeTruthy();
            });
        });

        describe('Tertiary Text', () => {
            it('tertiary text', () => {
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                element.secondaryText = 'This is a secondary text';
                element.tertiaryText = 'This is a tertiary text';
                element.size = 'xx-large';

                return Promise.resolve().then(() => {
                    const secondaryText = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-avatar-secondary-text"]'
                    );
                    const tertiaryText = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-avatar-tertiary-text"]'
                    );
                    expect(secondaryText.textContent).toBe(
                        'This is a secondary text'
                    );
                    expect(tertiaryText.textContent).toBe(
                        'This is a tertiary text'
                    );
                });
            });
        });

        describe('Text Position', () => {
            it('Center', () => {
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg';
                element.primaryText = 'This is a primary Text';
                element.secondaryText = 'This is a secondary text';
                element.textPosition = 'center';
                element.size = 'large';

                return Promise.resolve().then(() => {
                    const mediaObject = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-media-object"]'
                    );
                    expect(mediaObject.inline).toBeTruthy();
                    expect(mediaObject.className).toBe(
                        'slds-text-align_center avonni-avatar__media-object'
                    );
                });
            });

            it('Left', () => {
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg';
                element.primaryText = 'This is a primary Text';
                element.secondaryText = 'This is a secondary text';
                element.textPosition = 'left';
                element.size = 'large';

                return Promise.resolve().then(() => {
                    const mediaObject = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-media-object"]'
                    );
                    expect(mediaObject.className).toBe('slds-text-align_right');
                });
            });
        });

        describe('Variant', () => {
            it('Square', () => {
                element.variant = 'square';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.variant).toBe('square');
                });
            });

            it('Circle', () => {
                element.variant = 'circle';
                element.hideAvatarDetails = true;
                element.src =
                    'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    expect(avatar.variant).toBe('circle');
                });
            });
        });
    });

    describe('Method', () => {
        describe('Get Background Color', () => {
            it('getBackgroundColor()', () => {
                element.hideAvatarDetails = true;
                element.fallbackIconName = 'standard:account';

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-no-details"]'
                    );
                    const spy = jest
                        .spyOn(avatar, 'getBackgroundColor')
                        .mockImplementation(() => {
                            return 'blue';
                        });
                    const iconBackgroundColor = element.getBackgroundColor();
                    expect(spy).toHaveBeenCalled();
                    expect(iconBackgroundColor).toBe('blue');
                });
            });
        });
    });

    describe('Event', () => {
        describe('Actionclick', () => {
            it('actionclick', () => {
                element.initials = 'LG';
                const ACTIONS = [
                    {
                        label: 'Edit item',
                        name: 'edit-item',
                        iconName: 'utility:edit'
                    },
                    {
                        label: 'Add item',
                        name: 'add-item',
                        iconName: 'utility:add'
                    }
                ];
                element.actions = ACTIONS;

                const handler = jest.fn();
                element.addEventListener('actionclick', handler);

                return Promise.resolve().then(() => {
                    const primitiveAvatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-primitive-avatar-figure"]'
                    );
                    expect(primitiveAvatar).toBeTruthy();
                    primitiveAvatar.dispatchEvent(
                        new CustomEvent('actionclick', {
                            bubbles: true,
                            detail: {
                                name: ACTIONS[0].name
                            }
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.name).toBe(
                        'edit-item'
                    );
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeFalsy();
                    expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                });
            });
        });
    });
});
