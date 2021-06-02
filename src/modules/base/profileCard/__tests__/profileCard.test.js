import { createElement } from 'lwc';
import ProfileCard from 'c/profileCard';

// not tested avatar mobile position

describe('ProfileCard', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        expect(element.avatarAlternativeText).toBeUndefined();
        expect(element.avatarFallbackIconName).toBeUndefined();
        expect(element.avatarPosition).toBe('top-left');
        expect(element.avatarMobilePosition).toBe('top-left');
        expect(element.avatarSrc).toBeUndefined();
        expect(element.avatarVariant).toBe('circle');
        expect(element.backgroundAlternativeText).toBeUndefined();
        expect(element.backgroundColor).toBeUndefined();
        expect(element.backgroundSrc).toBeUndefined();
        expect(element.size).toBe('medium');
        expect(element.subtitle).toBeUndefined();
        expect(element.title).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // avatar-alternative-text
    // Depends on avatarFallbackIconName and avatarSrc
    it('avatarAlternativeText, with an image', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.avatarAlternativeText = 'A string alternative text';
        element.avatarSrc =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const image = element.shadowRoot.querySelector('img');
            expect(image.alt).toBe('A string alternative text');
        });
    });

    it('avatarAlternativeText, with an icon', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.avatarAlternativeText = 'A string alternative text';
        element.avatarFallbackIconName = 'standard:user';

        return Promise.resolve()
            .then(() => {
                const image = element.shadowRoot.querySelector('img');
                image.dispatchEvent(new CustomEvent('error'));
            })
            .then(() => {
                const icon = element.shadowRoot.querySelector('lightning-icon');
                expect(icon.alternativeText).toBe('A string alternative text');
            });
    });

    // avatar-fallback-icon-name
    it('avatarFallbackIconName', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.avatarFallbackIconName = 'standard:user';

        return Promise.resolve()
            .then(() => {
                const image = element.shadowRoot.querySelector('img');
                image.dispatchEvent(new CustomEvent('error'));
            })
            .then(() => {
                const avatarWrapper = element.shadowRoot.querySelector(
                    '.avatar-img'
                );
                const icon = element.shadowRoot.querySelector('lightning-icon');
                expect(icon.iconName).toBe('standard:user');
                expect(avatarWrapper.classList).toContain(
                    'avonni-icon-container'
                );
            });
    });

    // avatar-position
    it('avatarPosition = top-left', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.avatarPosition = 'top-left';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector('.top-left');
            expect(container.classList).toContain('avonni-flex-align-start');
            expect(mainContainer).toBeTruthy();
        });
    });

    it('avatarPosition = top-center', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.avatarPosition = 'top-center';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '.top-center'
            );
            expect(container.classList).toContain('avonni-flex-align-center');
            expect(mainContainer).toBeTruthy();
        });
    });

    it('avatarPosition = top-right', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.avatarPosition = 'top-right';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '.top-right'
            );
            expect(container.classList).toContain('avonni-flex-align-end');
            expect(mainContainer).toBeTruthy();
        });
    });

    it('avatarPosition = bottom-left', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.avatarPosition = 'bottom-left';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '.bottom-left'
            );
            expect(container.classList).toContain('avonni-flex-align-start');
            expect(mainContainer).toBeTruthy();
        });
    });

    it('avatarPosition = bottom-center', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.avatarPosition = 'bottom-center';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '.bottom-center'
            );
            expect(container.classList).toContain('avonni-flex-align-center');
            expect(mainContainer).toBeTruthy();
        });
    });

    it('avatarPosition = bottom-right', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.avatarPosition = 'bottom-right';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '.bottom-right'
            );
            expect(container.classList).toContain('avonni-flex-align-end');
            expect(mainContainer).toBeTruthy();
        });
    });

    // avatar-src
    it('avatarSrc', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.avatarSrc =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const image = element.shadowRoot.querySelector('img');
            expect(image.src).toBe(
                'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
            );
        });
    });

    // avatar-variant
    // Depends on avatarSrc and avatarFallbackIconName
    it('avatarVariant = circle, with image', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.avatarVariant = 'circle';
        element.avatarSrc =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatarWrapper = element.shadowRoot.querySelector(
                '.avatar-img'
            );
            const image = element.shadowRoot.querySelector('img');

            expect(avatarWrapper.classList).toContain('avatar-img-circle');
            expect(image.classList).toContain('avatar-img-circle');
        });
    });

    it('avatarVariant = circle, with icon', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.avatarVariant = 'circle';
        element.avatarFallbackIconName = 'standard:user';

        return Promise.resolve()
            .then(() => {
                const image = element.shadowRoot.querySelector('img');
                image.dispatchEvent(new CustomEvent('error'));
            })
            .then(() => {
                const avatarWrapper = element.shadowRoot.querySelector(
                    '.avatar-img'
                );
                const iconWrapper = element.shadowRoot.querySelector(
                    '.avatar-img > div'
                );

                expect(avatarWrapper.classList).toContain('avatar-img-circle');
                expect(iconWrapper.classList).toContain('avatar-img-circle');
            });
    });

    it('avatarVariant = square, with image', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.avatarVariant = 'square';
        element.avatarSrc =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatarWrapper = element.shadowRoot.querySelector(
                '.avatar-img'
            );
            const image = element.shadowRoot.querySelector('img');

            expect(avatarWrapper.classList).not.toContain('avatar-img-circle');
            expect(image.classList).not.toContain('avatar-img-circle');
        });
    });

    it('avatarVariant = square, with icon', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.avatarVariant = 'square';
        element.avatarFallbackIconName = 'standard:user';

        return Promise.resolve()
            .then(() => {
                const image = element.shadowRoot.querySelector('img');
                image.dispatchEvent(new CustomEvent('error'));
            })
            .then(() => {
                const avatarWrapper = element.shadowRoot.querySelector(
                    '.avatar-img'
                );
                const iconWrapper = element.shadowRoot.querySelector(
                    '.avatar-img > div'
                );

                expect(avatarWrapper.classList).not.toContain(
                    'avatar-img-circle'
                );
                expect(iconWrapper.classList).not.toContain(
                    'avatar-img-circle'
                );
            });
    });

    // background-alternative-text
    it('backgroundAlternativeText', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.backgroundAlternativeText = 'An alternative text';

        return Promise.resolve().then(() => {
            const altText = element.shadowRoot.querySelector(
                'span.slds-assistive-text'
            );
            expect(altText.textContent).toBe('An alternative text');
        });
    });

    // background-color
    it('backgroundColor', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.backgroundColor = 'tomato';

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector('header');
            expect(header.style.backgroundColor).toBe('tomato');
        });
    });

    // background-src
    it('backgroundSrc', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.backgroundSrc =
            'https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg';

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector('header');
            expect(header.style.backgroundImage).toBe(
                'url(https://dutchsfcommunity.org/wp-content/uploads/2020/01/SF-Amsterdam-Background.jpg)'
            );
        });
    });

    // size
    it('size = medium', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.size = 'medium';

        return Promise.resolve().then(() => {
            const mainContainer = element.shadowRoot.querySelector(
                '.card-medium'
            );
            const header = element.shadowRoot.querySelector(
                '.background-medium'
            );
            const avatar = element.shadowRoot.querySelector('.avatar-medium');
            expect(mainContainer).toBeTruthy();
            expect(header).toBeTruthy();
            expect(avatar).toBeTruthy();
        });
    });

    it('size = x-small', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.size = 'x-small';

        return Promise.resolve().then(() => {
            const mainContainer = element.shadowRoot.querySelector(
                '.card-x-small'
            );
            const header = element.shadowRoot.querySelector(
                '.background-x-small'
            );
            const avatar = element.shadowRoot.querySelector('.avatar-x-small');
            expect(mainContainer).toBeTruthy();
            expect(header).toBeTruthy();
            expect(avatar).toBeTruthy();
        });
    });

    it('size = small', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.size = 'small';

        return Promise.resolve().then(() => {
            const mainContainer = element.shadowRoot.querySelector(
                '.card-small'
            );
            const header = element.shadowRoot.querySelector(
                '.background-small'
            );
            const avatar = element.shadowRoot.querySelector('.avatar-small');
            expect(mainContainer).toBeTruthy();
            expect(header).toBeTruthy();
            expect(avatar).toBeTruthy();
        });
    });

    it('size = large', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.size = 'large';

        return Promise.resolve().then(() => {
            const mainContainer = element.shadowRoot.querySelector(
                '.card-large'
            );
            const header = element.shadowRoot.querySelector(
                '.background-large'
            );
            const avatar = element.shadowRoot.querySelector('.avatar-large');
            expect(mainContainer).toBeTruthy();
            expect(header).toBeTruthy();
            expect(avatar).toBeTruthy();
        });
    });

    it('size = x-large', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.size = 'x-large';

        return Promise.resolve().then(() => {
            const mainContainer = element.shadowRoot.querySelector(
                '.card-x-large'
            );
            const header = element.shadowRoot.querySelector(
                '.background-x-large'
            );
            const avatar = element.shadowRoot.querySelector('.avatar-x-large');
            expect(mainContainer).toBeTruthy();
            expect(header).toBeTruthy();
            expect(avatar).toBeTruthy();
        });
    });

    // subtitle
    it('subtitle', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.subtitle = 'A string subtitle';

        return Promise.resolve().then(() => {
            const subtitle = element.shadowRoot.querySelector(
                '.avonni-subtitle'
            );
            expect(subtitle.textContent).toBe('A string subtitle');
        });
    });

    // title
    it('title', () => {
        const element = createElement('base-profile-card', {
            is: ProfileCard
        });

        document.body.appendChild(element);

        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('.avonni-title');
            expect(title.textContent).toBe('A string title');
        });
    });
});
