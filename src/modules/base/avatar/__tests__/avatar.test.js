import { createElement } from 'lwc';
import Avatar from 'c/avatar';

describe('Avatar', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });

        expect(element.alternativeText).toBe('Avatar');
        expect(element.fallbackIconName).toBeUndefined();
        expect(element.initials).toBeUndefined();
        expect(element.size).toBe('medium');
        expect(element.src).toBeUndefined();
        expect(element.variant).toBe('square');
        expect(element.status).toBeNull();
        expect(element.statusTitle).toBe('Status');
        expect(element.statusPosition).toBe('top-right');
        expect(element.presence).toBeNull();
        expect(element.presenceTitle).toBe('Presence');
        expect(element.presencePosition).toBe('bottom-right');
        expect(element.entityIconName).toBeUndefined();
        expect(element.entityVariant).toBe('square');
        expect(element.entitySrc).toBeUndefined();
        expect(element.entityTitle).toBe('Entity');
        expect(element.entityPosition).toBe('top-left');
        expect(element.hideAvatarDetails).toBeFalsy();
        expect(element.primaryText).toBeUndefined();
        expect(element.secondaryText).toBeUndefined();
        expect(element.tertiaryText).toBeUndefined();
        expect(element.textPosition).toBe('right');
    });

    /* ----- ATTRIBUTES ----- */

    // alternative-text
    it('Avatar alternative text with image', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.alternativeText = 'This is an alternative text';
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
        element.hideAvatarDetails = true;

        return Promise.resolve().then(() => {
            const image = element.shadowRoot.querySelector('img');
            expect(image.alt).toBe('This is an alternative text');
        });
    });

    it('Avatar alternative text with icon', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.alternativeText = 'This is an alternative text';
        element.fallbackIconName = 'standard:account';
        element.hideAvatarDetails = true;

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.title).toBe('This is an alternative text');
        });
    });

    it('Avatar alternative text with initials', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.alternativeText = 'This is an alternative text';
        element.initials = 'JD';
        element.hideAvatarDetails = true;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector('abbr');
            expect(abbr.title).toBe('This is an alternative text');
        });
    });

    // fallback icon name
    it('Avatar fallback icon name', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.fallbackIconName = 'standard:account';
        element.hideAvatarDetails = true;

        return Promise.resolve().then(() => {
            const icon = element.shadowRoot.querySelector('lightning-icon');
            expect(icon.iconName).toBe('standard:account');
        });
    });

    // Itinitals
    it('Avatar initials', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.initials = 'JD';
        element.hideAvatarDetails = true;

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector('abbr');
            expect(abbr.textContent).toBe('JD');
        });
    });

    //size
    it('Avatar Size xx-small', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.size = 'xx-small';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('div');
            expect(div.className).toContain('avonni-avatar_xx-small');
        });
    });

    it('Avatar Size x-small', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.size = 'x-small';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('div');
            expect(div.className).toContain('slds-avatar_x-small');
        });
    });

    it('Avatar Size small', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.size = 'small';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('div');
            expect(div.className).toContain('slds-avatar_small');
        });
    });

    it('Avatar Size medium', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.size = 'medium';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('div');
            expect(div.className).toContain('slds-avatar_medium');
        });
    });

    it('Avatar Size large', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.size = 'large';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('div');
            expect(div.className).toContain('slds-avatar_large');
        });
    });

    it('Avatar Size x-large', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.size = 'x-large';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('div');
            expect(div.className).toContain('avonni-avatar_x-large');
        });
    });

    it('Avatar Size xx-large', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.size = 'xx-large';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('div');
            expect(div.className).toContain('avonni-avatar_xx-large');
        });
    });

    // src
    it('Avatar Src', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.size = 'xx-large';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.src).toBe(
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
            );
        });
    });

    // variant
    it('Avatar variant square', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.variant = 'square';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('div');
            expect(div.className).toContain('avonni-avatar_square');
        });
    });

    it('Avatar variant circle', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.variant = 'circle';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const div = element.shadowRoot.querySelector('div');
            expect(div.className).toContain('avonni-avatar_circle');
        });
    });

    // status
    it('Avatar status approved', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.status = 'approved';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const status = element.shadowRoot.querySelector('c-primitive-icon');
            expect(status.className).toContain(
                'avonni-avatar__status_approved'
            );
            const icon = element.shadowRoot.querySelector('c-primitive-icon');
            expect(icon.iconName).toBe('utility:check');
        });
    });

    it('Avatar status locked', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.status = 'locked';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const status = element.shadowRoot.querySelector('c-primitive-icon');
            expect(status.className).toContain('avonni-avatar__status_locked');
            const icon = element.shadowRoot.querySelector('c-primitive-icon');
            expect(icon.iconName).toBe('utility:lock');
        });
    });

    it('Avatar status declined', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.status = 'declined';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const status = element.shadowRoot.querySelector('c-primitive-icon');
            expect(status.className).toContain(
                'avonni-avatar__status_declined'
            );
            const icon = element.shadowRoot.querySelector('c-primitive-icon');
            expect(icon.iconName).toBe('utility:close');
        });
    });

    it('Avatar status unknown', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.status = 'unknown';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const status = element.shadowRoot.querySelector('c-primitive-icon');
            expect(status.className).toContain('avonni-avatar__status_unknown');
            const icon = element.shadowRoot.querySelector('c-primitive-icon');
            expect(icon.iconName).toBe('utility:help');
        });
    });

    // status position
    it('Avatar status position top-right', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.status = 'approved';
        element.statusPosition = 'top-right';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const status = element.shadowRoot.querySelector('c-primitive-icon');
            expect(status.className).toContain('avonni-avatar_top-right');
        });
    });

    it('Avatar status position top-left', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.status = 'approved';
        element.statusPosition = 'top-left';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const status = element.shadowRoot.querySelector('c-primitive-icon');
            expect(status.className).toContain('avonni-avatar_top-left');
        });
    });

    it('Avatar status position bottom-right', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.status = 'approved';
        element.statusPosition = 'bottom-right';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const status = element.shadowRoot.querySelector('c-primitive-icon');
            expect(status.className).toContain('avonni-avatar_bottom-right');
        });
    });

    it('Avatar status position bottom-left', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.status = 'approved';
        element.statusPosition = 'bottom-left';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const status = element.shadowRoot.querySelector('c-primitive-icon');
            expect(status.className).toContain('avonni-avatar_bottom-left');
        });
    });

    // status title
    it('Avatar status title', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.status = 'approved';
        element.statusTitle = 'Status title';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const status = element.shadowRoot.querySelector('c-primitive-icon');
            expect(status.title).toBe('Status title');
            const assText = element.shadowRoot.querySelector(
                '.slds-assistive-text'
            );
            expect(assText.textContent).toBe('Status title');
        });
    });

    // presence
    it('Avatar presence online', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'online';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const presence = element.shadowRoot.querySelector(
                '.avonni-avatar__presence.avonni-avatar__presence_online'
            );
            expect(presence).toBeTruthy();
        });
    });

    it('Avatar presence busy', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'busy';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const presence = element.shadowRoot.querySelector(
                '.avonni-avatar__presence.avonni-avatar__presence_busy'
            );
            expect(presence).toBeTruthy();
        });
    });

    it('Avatar presence focus', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'focus';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const presence = element.shadowRoot.querySelector(
                '.avonni-avatar__presence.avonni-avatar__presence_focus'
            );
            expect(presence).toBeTruthy();
        });
    });

    it('Avatar presence offline', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'offline';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const presence = element.shadowRoot.querySelector(
                '.avonni-avatar__presence.avonni-avatar__presence_offline'
            );
            expect(presence).toBeTruthy();
        });
    });

    it('Avatar presence blocked', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'blocked';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const presence = element.shadowRoot.querySelector(
                '.avonni-avatar__presence.avonni-avatar__presence_blocked'
            );
            expect(presence).toBeTruthy();
        });
    });

    it('Avatar presence away', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'away';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const presence = element.shadowRoot.querySelector(
                '.avonni-avatar__presence.avonni-avatar__presence_away'
            );
            expect(presence).toBeTruthy();
        });
    });

    // presence title
    it('Avatar presence title', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'online';
        element.presenceTitle = 'Presence Title';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const presence = element.shadowRoot.querySelector(
                '.avonni-avatar__presence.avonni-avatar__presence_online'
            );
            expect(presence.title).toBe('Presence Title');
        });
    });

    // presence position
    it('Avatar presence bottom-right', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'online';
        element.presencePosition = 'bottom-right';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const presence = element.shadowRoot.querySelector(
                '.avonni-avatar__presence.avonni-avatar__presence_online.avonni-avatar_bottom-right'
            );
            expect(presence).toBeTruthy();
        });
    });

    it('Avatar presence bottom-left', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'online';
        element.presencePosition = 'bottom-left';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const presence = element.shadowRoot.querySelector(
                '.avonni-avatar__presence.avonni-avatar__presence_online.avonni-avatar_bottom-left'
            );
            expect(presence).toBeTruthy();
        });
    });

    it('Avatar presence top-left', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'online';
        element.presencePosition = 'top-left';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const presence = element.shadowRoot.querySelector(
                '.avonni-avatar__presence.avonni-avatar__presence_online.avonni-avatar_top-left'
            );
            expect(presence).toBeTruthy();
        });
    });

    it('Avatar presence top-right', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.presence = 'online';
        element.presencePosition = 'top-right';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const presence = element.shadowRoot.querySelector(
                '.avonni-avatar__presence.avonni-avatar__presence_online.avonni-avatar_top-right'
            );
            expect(presence).toBeTruthy();
        });
    });

    // entity-icon-name
    it('Avatar entity icon name', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.entityIconName = 'standard:account';
        element.entityInitials = 'JD';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const abbr = element.shadowRoot.querySelector('abbr');
            expect(abbr.textContent).toBe('JD');
        });
    });

    // entity position
    it('Avatar entity top-right', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.entityIconName = 'standard:account';
        element.entityInitials = 'JD';
        element.entityPosition = 'top-right';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const entity = element.shadowRoot.querySelector(
                '.slds-avatar.slds-current-color.avonni-avatar__entity.slds-icon-standard-account'
            );
            expect(entity.className).toContain('avonni-avatar_top-right');
        });
    });

    it('Avatar entity top-left', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.entityIconName = 'standard:account';
        element.entityInitials = 'JD';
        element.entityPosition = 'top-left';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const entity = element.shadowRoot.querySelector(
                '.slds-avatar.slds-current-color.avonni-avatar__entity.slds-icon-standard-account'
            );
            expect(entity.className).toContain('avonni-avatar_top-left');
        });
    });

    it('Avatar entity bottom-right', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.entityIconName = 'standard:account';
        element.entityInitials = 'JD';
        element.entityPosition = 'bottom-right';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const entity = element.shadowRoot.querySelector(
                '.slds-avatar.slds-current-color.avonni-avatar__entity.slds-icon-standard-account'
            );
            expect(entity.className).toContain('avonni-avatar_bottom-right');
        });
    });

    it('Avatar entity bottom-left', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.entityIconName = 'standard:account';
        element.entityInitials = 'JD';
        element.entityPosition = 'bottom-left';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const entity = element.shadowRoot.querySelector(
                '.slds-avatar.slds-current-color.avonni-avatar__entity.slds-icon-standard-account'
            );
            expect(entity.className).toContain('avonni-avatar_bottom-left');
        });
    });

    // entity src
    it('Avatar entity src', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.hideAvatarDetails = true;
        element.fallbackIconName = 'standard:account';
        element.entitySrc =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.src).toBe(
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
            );
        });
    });

    // entity title
    it('Avatar entity title', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.hideAvatarDetails = true;
        element.fallbackIconName = 'standard:account';
        element.entitySrc =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
        element.entityTitle = 'Entity Title';

        return Promise.resolve().then(() => {
            const img = element.shadowRoot.querySelector('img');
            expect(img.title).toBe('Entity Title');
        });
    });

    // entity variant
    it('Avatar entity circle', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.entityIconName = 'standard:account';
        element.entityPosition = 'bottom-right';
        element.entityVariant = 'circle';
        element.hideAvatarDetails = true;
        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const entity = element.shadowRoot.querySelector(
                '.slds-avatar.slds-current-color.avonni-avatar__entity.slds-icon-standard-account.avonni-avatar_bottom-right'
            );
            expect(entity.className).toContain('slds-avatar_circle');
        });
    });

    // primary text
    it('Avatar primary text', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
        element.primaryText = 'This is a primary text';

        return Promise.resolve().then(() => {
            const text = element.shadowRoot.querySelector(
                '.slds-text-title_bold'
            );
            expect(text.textContent).toBe('This is a primary text');
        });
    });

    // secondary text
    it('Avatar secondary text', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
        element.secondaryText = 'This is a secondary text';

        return Promise.resolve().then(() => {
            const text = element.shadowRoot.querySelector(
                '.avonni-avatar__light-text'
            );
            expect(text.textContent).toBe('This is a secondary text');
        });
    });

    // tertiary text
    it('Avatar tertiary text', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        element.secondaryText = 'This is a secondary text';
        element.tertiaryText = 'This is a tertiary text';
        element.size = 'xx-large';

        return Promise.resolve().then(() => {
            const text = element.shadowRoot.querySelectorAll(
                '.avonni-avatar__light-text'
            );
            expect(text[0].textContent).toBe('This is a secondary text');
            expect(text[1].textContent).toBe('This is a tertiary text');
        });
    });

    // text-position
    it('Avatar center', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg';
        element.primaryText = 'This is a primary Text';
        element.secondaryText = 'This is a secondary text';
        element.textPosition = 'center';
        element.size = 'large';

        return Promise.resolve().then(() => {
            const mediaObject = element.shadowRoot.querySelector(
                'c-media-object'
            );
            expect(mediaObject.inline).toBeTruthy();
            expect(mediaObject.className).toBe('slds-text-align_center');
        });
    });

    it('Avatar left', () => {
        const element = createElement('base-avatar', {
            is: Avatar
        });
        document.body.appendChild(element);

        element.src =
            'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg';
        element.primaryText = 'This is a primary Text';
        element.secondaryText = 'This is a secondary text';
        element.textPosition = 'left';
        element.size = 'large';

        return Promise.resolve().then(() => {
            const mediaObject = element.shadowRoot.querySelector(
                'c-media-object'
            );
            expect(mediaObject.className).toBe('slds-text-align_right');
        });
    });
});
