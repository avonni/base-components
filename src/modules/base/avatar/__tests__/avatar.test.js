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

    // alternative-text with image
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

    // alternative-text with icon
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

    // alternative-text with initials
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
});
