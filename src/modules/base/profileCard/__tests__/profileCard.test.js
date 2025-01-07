import { createElement } from 'lwc';
import ProfileCard from 'c/profileCard';

let element;
describe('ProfileCard', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-profile-card', {
            is: ProfileCard
        });
        document.body.appendChild(element);
    });

    it('Profile card: Default attributes', () => {
        expect(element.avatarAlternativeText).toBeUndefined();
        expect(element.avatarFallbackIconName).toBeUndefined();
        expect(element.avatarPosition).toBe('top-left');
        expect(element.avatarMobilePosition).toBe('top-left');
        expect(element.avatarSrc).toBeUndefined();
        expect(element.avatarSize).toBe('medium');
        expect(element.avatarVariant).toBe('circle');
        expect(element.backgroundAlternativeText).toBeUndefined();
        expect(element.backgroundSrc).toBeUndefined();
        expect(element.subtitle).toBeUndefined();
        expect(element.title).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // avatar-alternative-text
    // Depends on avatarFallbackIconName and avatarSrc
    it('Profile card: avatarAlternativeText, with an image', () => {
        element.avatarAlternativeText = 'A string alternative text';
        element.avatarSrc =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const image = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(image.alt).toBe('A string alternative text');
        });
    });

    it('Profile card: avatarAlternativeText, with an icon', () => {
        element.avatarAlternativeText = 'A string alternative text';
        element.avatarFallbackIconName = 'standard:user';

        return Promise.resolve().then(() => {
            const image = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(image).toBeNull();
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avatar-lightning-icon"]'
            );
            expect(icon.alternativeText).toBe('A string alternative text');
        });
    });

    // avatar-fallback-icon-name
    it('Profile card: avatarFallbackIconName', () => {
        element.avatarFallbackIconName = 'standard:user';

        return Promise.resolve().then(() => {
            const image = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(image).toBeNull();
            const avatarWrapper = element.shadowRoot.querySelector(
                '[data-element-id="avatar"]'
            );
            const icon = element.shadowRoot.querySelector(
                '[data-element-id="avatar-lightning-icon"]'
            );
            expect(icon.fallbackIconName).toBe('standard:user');
            expect(avatarWrapper.classList).toContain(
                'slds-align_absolute-center'
            );
        });
    });

    // avatar-position
    it('Profile card: avatarPosition = top-left', () => {
        element.avatarPosition = 'top-left';
        element.showActions = true;

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '[data-element-id="container"]'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '[data-element-id="main-container"]'
            );
            expect(container.className).toBe(
                'avonni-profile-card__flex-container'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-top'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-left'
            );
        });
    });

    it('Profile card: avatarPosition = top-center', () => {
        element.avatarPosition = 'top-center';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '[data-element-id="container"]'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '[data-element-id="main-container"]'
            );
            expect(container.classList).toContain(
                'avonni-profile-card__flex-container_align-center'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-top'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-center'
            );
        });
    });

    it('Profile card: avatarPosition = top-right', () => {
        element.avatarPosition = 'top-right';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '[data-element-id="container"]'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '[data-element-id="main-container"]'
            );
            expect(container.classList).toContain(
                'avonni-profile-card__flex-container_align-end'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-top'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-right'
            );
        });
    });

    it('Profile card: avatarPosition = bottom-left', () => {
        element.avatarPosition = 'bottom-left';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '[data-element-id="container"]'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '[data-element-id="main-container"]'
            );
            expect(container.className).toBe(
                'avonni-profile-card__flex-container'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-bottom'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-left'
            );
        });
    });

    it('Profile card: avatarPosition = bottom-center', () => {
        element.avatarPosition = 'bottom-center';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '[data-element-id="container"]'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '[data-element-id="main-container"]'
            );
            expect(container.classList).toContain(
                'avonni-profile-card__flex-container_align-center'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-bottom'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-center'
            );
        });
    });

    it('Profile card: avatarPosition = bottom-right', () => {
        element.avatarPosition = 'bottom-right';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '[data-element-id="container"]'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '[data-element-id="main-container"]'
            );
            expect(container.classList).toContain(
                'avonni-profile-card__flex-container_align-end'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-bottom'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-right'
            );
        });
    });

    // avatar-mobile-position
    it('Profile card: avatarMobilePosition = top-left', () => {
        window.innerWidth = 200;

        element.avatarMobilePosition = 'top-left';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '[data-element-id="container"]'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '[data-element-id="main-container"]'
            );
            expect(container.className).toBe(
                'avonni-profile-card__flex-container'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-mobile-top'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-mobile-left'
            );
        });
    });

    it('Profile card: avatarMobilePosition = top-center', () => {
        window.innerWidth = 200;

        element.avatarMobilePosition = 'top-center';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '[data-element-id="container"]'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '[data-element-id="main-container"]'
            );
            expect(container.classList).toContain(
                'avonni-profile-card__flex-container-mobile_align-center'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-mobile-top'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-mobile-center'
            );
        });
    });

    it('Profile card: avatarMobilePosition = top-right', () => {
        window.innerWidth = 200;

        element.avatarMobilePosition = 'top-right';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '[data-element-id="container"]'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '[data-element-id="main-container"]'
            );
            expect(container.classList).toContain(
                'avonni-profile-card__flex-container-mobile_align-end'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-mobile-top'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-mobile-right'
            );
        });
    });

    it('Profile card: avatarMobilePosition = bottom-left', () => {
        window.innerWidth = 200;

        element.avatarMobilePosition = 'bottom-left';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '[data-element-id="container"]'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '[data-element-id="main-container"]'
            );
            expect(container.className).toBe(
                'avonni-profile-card__flex-container'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-mobile-bottom'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-mobile-left'
            );
        });
    });

    it('Profile card: avatarMobilePosition = bottom-center', () => {
        window.innerWidth = 200;

        element.avatarMobilePosition = 'bottom-center';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '[data-element-id="container"]'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '[data-element-id="main-container"]'
            );
            expect(container.classList).toContain(
                'avonni-profile-card__flex-container-mobile_align-center'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-mobile-bottom'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-mobile-center'
            );
        });
    });

    it('Profile card: avatarMobilePosition = bottom-right', () => {
        window.innerWidth = 200;

        element.avatarMobilePosition = 'bottom-right';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '[data-element-id="container"]'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '[data-element-id="main-container"]'
            );
            expect(container.classList).toContain(
                'avonni-profile-card__flex-container-mobile_align-end'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-mobile-bottom'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__avatar-mobile-right'
            );
        });
    });

    // avatar-src
    it('Profile card: avatarSrc', () => {
        element.avatarSrc =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const image = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(image.src).toBe(
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
            );
        });
    });

    // avatar-size
    it('Profile card: avatarSize = medium', () => {
        element.avatarSize = 'medium';

        return Promise.resolve().then(() => {
            const mainContainer = element.shadowRoot.querySelector(
                '[data-element-id="main-container"]'
            );
            const header = element.shadowRoot.querySelector(
                '[data-element-id="header"]'
            );
            const avatar = element.shadowRoot.querySelector(
                '[data-element-id="avatar"]'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__card_size-medium'
            );
            expect(header.classList).toContain(
                'avonni-profile-card__background_size-medium'
            );
            expect(avatar.classList).toContain(
                'avonni-profile-card__avatar_size-medium'
            );
        });
    });

    it('Profile card: avatarSize = x-small', () => {
        element.avatarSize = 'x-small';

        return Promise.resolve().then(() => {
            const mainContainer = element.shadowRoot.querySelector(
                '[data-element-id="main-container"]'
            );
            const header = element.shadowRoot.querySelector(
                '[data-element-id="header"]'
            );
            const avatar = element.shadowRoot.querySelector(
                '[data-element-id="avatar"]'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__card_size-x-small'
            );
            expect(header.classList).toContain(
                'avonni-profile-card__background_size-x-small'
            );
            expect(avatar.classList).toContain(
                'avonni-profile-card__avatar_size-x-small'
            );
        });
    });

    it('Profile card: avatarSize = small', () => {
        element.avatarSize = 'small';

        return Promise.resolve().then(() => {
            const mainContainer = element.shadowRoot.querySelector(
                '[data-element-id="main-container"]'
            );
            const header = element.shadowRoot.querySelector(
                '[data-element-id="header"]'
            );
            const avatar = element.shadowRoot.querySelector(
                '[data-element-id="avatar"]'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__card_size-small'
            );
            expect(header.classList).toContain(
                'avonni-profile-card__background_size-small'
            );
            expect(avatar.classList).toContain(
                'avonni-profile-card__avatar_size-small'
            );
        });
    });

    it('Profile card: avatarSize = large', () => {
        element.avatarSize = 'large';

        return Promise.resolve().then(() => {
            const mainContainer = element.shadowRoot.querySelector(
                '[data-element-id="main-container"]'
            );
            const header = element.shadowRoot.querySelector(
                '[data-element-id="header"]'
            );
            const avatar = element.shadowRoot.querySelector(
                '[data-element-id="avatar"]'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__card_size-large'
            );
            expect(header.classList).toContain(
                'avonni-profile-card__background_size-large'
            );
            expect(avatar.classList).toContain(
                'avonni-profile-card__avatar_size-large'
            );
        });
    });

    it('Profile card: avatarSize = x-large', () => {
        element.avatarSize = 'x-large';

        return Promise.resolve().then(() => {
            const mainContainer = element.shadowRoot.querySelector(
                '[data-element-id="main-container"]'
            );
            const header = element.shadowRoot.querySelector(
                '[data-element-id="header"]'
            );
            const avatar = element.shadowRoot.querySelector(
                '[data-element-id="avatar"]'
            );
            expect(mainContainer.classList).toContain(
                'avonni-profile-card__card_size-x-large'
            );
            expect(header.classList).toContain(
                'avonni-profile-card__background_size-x-large'
            );
            expect(avatar.classList).toContain(
                'avonni-profile-card__avatar_size-x-large'
            );
        });
    });

    // avatar-variant
    // Depends on avatarSrc and avatarFallbackIconName
    it('Profile card: avatarVariant = circle, with image', () => {
        element.avatarVariant = 'circle';
        element.avatarSrc =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                '[data-element-id="avatar"]'
            );
            const image = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );

            expect(avatar.classList).toContain(
                'avonni-profile-card__avatar-img-circle'
            );
            expect(image.classList).toContain(
                'avonni-profile-card__avatar-img-circle'
            );
        });
    });

    it('Profile card: avatarVariant = circle, with icon', () => {
        element.avatarVariant = 'circle';
        element.avatarFallbackIconName = 'standard:user';

        return Promise.resolve().then(() => {
            const image = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(image).toBeNull();
            const avatar = element.shadowRoot.querySelector(
                '[data-element-id="avatar"]'
            );
            const iconWrapper = element.shadowRoot.querySelector(
                '[data-element-id="icon-wrapper"]'
            );

            expect(avatar.classList).toContain(
                'avonni-profile-card__avatar-img-circle'
            );
            expect(iconWrapper.classList).toContain(
                'avonni-profile-card__avatar-img-circle'
            );
        });
    });

    it('Profile card: avatarVariant = square, with image', () => {
        element.avatarVariant = 'square';
        element.avatarSrc =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                '[data-element-id="avatar"]'
            );
            const image = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );

            expect(avatar.classList).not.toContain(
                'avonni-profile-card__avatar-img-circle'
            );
            expect(image.classList).not.toContain(
                'avonni-profile-card__avatar-img-circle'
            );
        });
    });

    it('Profile card: avatarVariant = square, with icon', () => {
        element.avatarVariant = 'square';
        element.avatarFallbackIconName = 'standard:user';

        return Promise.resolve().then(() => {
            const image = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );
            expect(image).toBeNull();
            const avatar = element.shadowRoot.querySelector(
                '[data-element-id="avatar"]'
            );
            const iconWrapper = element.shadowRoot.querySelector(
                '[data-element-id="icon-wrapper"]'
            );

            expect(avatar.classList).not.toContain(
                'avonni-profile-card__avatar-img-circle'
            );
            expect(iconWrapper.classList).not.toContain(
                'avonni-profile-card__avatar-img-circle'
            );
        });
    });

    // background-alternative-text
    it('Profile card: backgroundAlternativeText', () => {
        element.backgroundAlternativeText = 'An alternative text';

        return Promise.resolve().then(() => {
            const altText = element.shadowRoot.querySelector(
                'span.slds-assistive-text'
            );
            expect(altText.textContent).toBe('An alternative text');
        });
    });

    // background-src
    it('Profile card: backgroundSrc', () => {
        element = createElement('base-profile-card', {
            is: ProfileCard
        });
        document.body.appendChild(element);

        element.backgroundSrc =
            'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg';

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                '[data-element-id="header"]'
            );
            expect(header.style.backgroundImage).toBe(
                'url(https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg)'
            );
        });
    });

    // subtitle
    it('Profile card: subtitle', () => {
        element.subtitle = 'A string subtitle';

        return Promise.resolve().then(() => {
            const subtitle = element.shadowRoot.querySelector(
                '.avonni-profile-card__subtitle'
            );
            expect(subtitle.textContent).toBe('A string subtitle');
        });
    });

    // title
    it('Profile card: title', () => {
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '.avonni-profile-card__title'
            );
            expect(title.textContent).toBe('A string title');
        });
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    // privateprofilecardrendered
    it('Profile Card: privateprofilecardrendered event', () => {
        const handler = jest.fn();
        element.addEventListener('privateprofilecardrendered', handler);
        element.title = 'some title';
        expect(handler).not.toHaveBeenCalled();

        return Promise.resolve().then(() => {
            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.bubbles).toBeTruthy();
            expect(call.cancelable).toBeFalsy();
            expect(call.composed).toBeFalsy();
        });
    });
});
