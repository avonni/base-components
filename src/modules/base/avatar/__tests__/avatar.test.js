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

        expect(element.alternativeText).toBeUndefined();
        expect(element.fallbackIconName).toBeUndefined();
        expect(element.initials).toBeUndefined();
        expect(element.size).toBe('medium');
        expect(element.src).toBeUndefined();
        expect(element.variant).toBe('square');
        expect(element.status).toBeNull();
        expect(element.statusTitle).toBeUndefined();
        expect(element.statusPosition).toBe('top-right');
        expect(element.presence).toBeNull();
        expect(element.presenceTitle).toBeUndefined();
        expect(element.presencePosition).toBe('bottom-right');
        expect(element.entityIconName).toBeUndefined();
        expect(element.entityVariant).toBe('square');
        expect(element.entitySrc).toBeUndefined();
        expect(element.entityTitle).toBeUndefined();
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
});
