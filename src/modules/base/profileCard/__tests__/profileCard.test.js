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

        return Promise.resolve()
            .then(() => {
                const image = element.shadowRoot.querySelector(
                    '[data-element-id="img"]'
                );
                image.dispatchEvent(new CustomEvent('error'));
            })
            .then(() => {
                const icon = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-icon"]'
                );
                expect(icon.alternativeText).toBe('A string alternative text');
            });
    });

    // avatar-fallback-icon-name
    it('Profile card: avatarFallbackIconName', () => {
        element.avatarFallbackIconName = 'standard:user';

        return Promise.resolve()
            .then(() => {
                const image = element.shadowRoot.querySelector(
                    '[data-element-id="img"]'
                );
                image.dispatchEvent(new CustomEvent('error'));
            })
            .then(() => {
                const avatarWrapper = element.shadowRoot.querySelector(
                    '.avonni-profile-card__avatar-img'
                );
                const icon = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-icon"]'
                );
                expect(icon.iconName).toBe('standard:user');
                expect(avatarWrapper.classList).toContain(
                    'avonni-profile-card__icon-container'
                );
            });
    });

    // avatar-position
    it('Profile card: avatarPosition = top-left', () => {
        element.avatarPosition = 'top-left';
        element.showActions = true;

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-profile-card__flex-container'
            );
            const mainContainer =
                element.shadowRoot.querySelector('.top-left-desktop');
            expect(container.className).toBe(
                'avonni-profile-card__flex-container'
            );
            expect(mainContainer).toBeTruthy();
        });
    });

    it('Profile card: avatarPosition = top-center', () => {
        element.avatarPosition = 'top-center';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-profile-card__flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '.top-center-desktop'
            );
            expect(container.classList).toContain(
                'avonni-profile-card__flex-container_align-center'
            );
            expect(mainContainer).toBeTruthy();
        });
    });

    it('Profile card: avatarPosition = top-right', () => {
        element.avatarPosition = 'top-right';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-profile-card__flex-container'
            );
            const mainContainer =
                element.shadowRoot.querySelector('.top-right-desktop');
            expect(container.classList).toContain(
                'avonni-profile-card__flex-container_align-end'
            );
            expect(mainContainer).toBeTruthy();
        });
    });

    it('Profile card: avatarPosition = bottom-left', () => {
        element.avatarPosition = 'bottom-left';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-profile-card__flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '.bottom-left-desktop'
            );
            expect(container.className).toBe(
                'avonni-profile-card__flex-container'
            );
            expect(mainContainer).toBeTruthy();
        });
    });

    it('Profile card: avatarPosition = bottom-center', () => {
        element.avatarPosition = 'bottom-center';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-profile-card__flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '.bottom-center-desktop'
            );
            expect(container.classList).toContain(
                'avonni-profile-card__flex-container_align-center'
            );
            expect(mainContainer).toBeTruthy();
        });
    });

    it('Profile card: avatarPosition = bottom-right', () => {
        element.avatarPosition = 'bottom-right';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-profile-card__flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '.bottom-right-desktop'
            );
            expect(container.classList).toContain(
                'avonni-profile-card__flex-container_align-end'
            );
            expect(mainContainer).toBeTruthy();
        });
    });

    // avatar-mobile-position
    it('Profile card: avatarMobilePosition = top-left', () => {
        window.innerWidth = 200;

        element.avatarMobilePosition = 'top-left';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-profile-card__flex-container'
            );
            const mainContainer =
                element.shadowRoot.querySelector('.mobile-top-left');
            expect(container.className).toBe(
                'avonni-profile-card__flex-container'
            );
            expect(mainContainer).toBeTruthy();
        });
    });

    it('Profile card: avatarMobilePosition = top-center', () => {
        window.innerWidth = 200;

        element.avatarMobilePosition = 'top-center';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-profile-card__flex-container'
            );
            const mainContainer =
                element.shadowRoot.querySelector('.mobile-top-center');
            expect(container.classList).toContain(
                'avonni-profile-card__flex-container-mobile_align-center'
            );
            expect(mainContainer).toBeTruthy();
        });
    });

    it('Profile card: avatarMobilePosition = top-right', () => {
        window.innerWidth = 200;

        element.avatarMobilePosition = 'top-right';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-profile-card__flex-container'
            );
            const mainContainer =
                element.shadowRoot.querySelector('.mobile-top-right');
            expect(container.classList).toContain(
                'avonni-profile-card__flex-container-mobile_align-end'
            );
            expect(mainContainer).toBeTruthy();
        });
    });

    it('Profile card: avatarMobilePosition = bottom-left', () => {
        window.innerWidth = 200;

        element.avatarMobilePosition = 'bottom-left';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-profile-card__flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '.mobile-bottom-left'
            );
            expect(container.className).toBe(
                'avonni-profile-card__flex-container'
            );
            expect(mainContainer).toBeTruthy();
        });
    });

    it('Profile card: avatarMobilePosition = bottom-center', () => {
        window.innerWidth = 200;

        element.avatarMobilePosition = 'bottom-center';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-profile-card__flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '.mobile-bottom-center'
            );
            expect(container.classList).toContain(
                'avonni-profile-card__flex-container-mobile_align-center'
            );
            expect(mainContainer).toBeTruthy();
        });
    });

    it('Profile card: avatarMobilePosition = bottom-right', () => {
        window.innerWidth = 200;

        element.avatarMobilePosition = 'bottom-right';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-profile-card__flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '.mobile-bottom-right'
            );
            expect(container.classList).toContain(
                'avonni-profile-card__flex-container-mobile_align-end'
            );
            expect(mainContainer).toBeTruthy();
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
                '.avonni-profile-card__card_size-medium'
            );
            const header = element.shadowRoot.querySelector(
                '.avonni-profile-card__background_size-medium'
            );
            const avatar = element.shadowRoot.querySelector(
                '.avonni-profile-card__avatar_size-medium'
            );
            expect(mainContainer).toBeTruthy();
            expect(header).toBeTruthy();
            expect(avatar).toBeTruthy();
        });
    });

    it('Profile card: avatarSize = x-small', () => {
        element.avatarSize = 'x-small';

        return Promise.resolve().then(() => {
            const mainContainer = element.shadowRoot.querySelector(
                '.avonni-profile-card__card_size-x-small'
            );
            const header = element.shadowRoot.querySelector(
                '.avonni-profile-card__background_size-x-small'
            );
            const avatar = element.shadowRoot.querySelector(
                '.avonni-profile-card__avatar_size-x-small'
            );
            expect(mainContainer).toBeTruthy();
            expect(header).toBeTruthy();
            expect(avatar).toBeTruthy();
        });
    });

    it('Profile card: avatarSize = small', () => {
        element.avatarSize = 'small';

        return Promise.resolve().then(() => {
            const mainContainer = element.shadowRoot.querySelector(
                '.avonni-profile-card__card_size-small'
            );
            const header = element.shadowRoot.querySelector(
                '.avonni-profile-card__background_size-small'
            );
            const avatar = element.shadowRoot.querySelector(
                '.avonni-profile-card__avatar_size-small'
            );
            expect(mainContainer).toBeTruthy();
            expect(header).toBeTruthy();
            expect(avatar).toBeTruthy();
        });
    });

    it('Profile card: avatarSize = large', () => {
        element.avatarSize = 'large';

        return Promise.resolve().then(() => {
            const mainContainer = element.shadowRoot.querySelector(
                '.avonni-profile-card__card_size-large'
            );
            const header = element.shadowRoot.querySelector(
                '.avonni-profile-card__background_size-large'
            );
            const avatar = element.shadowRoot.querySelector(
                '.avonni-profile-card__avatar_size-large'
            );
            expect(mainContainer).toBeTruthy();
            expect(header).toBeTruthy();
            expect(avatar).toBeTruthy();
        });
    });

    it('Profile card: avatarSize = x-large', () => {
        element.avatarSize = 'x-large';

        return Promise.resolve().then(() => {
            const mainContainer = element.shadowRoot.querySelector(
                '.avonni-profile-card__card_size-x-large'
            );
            const header = element.shadowRoot.querySelector(
                '.avonni-profile-card__background_size-x-large'
            );
            const avatar = element.shadowRoot.querySelector(
                '.avonni-profile-card__avatar_size-x-large'
            );
            expect(mainContainer).toBeTruthy();
            expect(header).toBeTruthy();
            expect(avatar).toBeTruthy();
        });
    });

    // avatar-variant
    // Depends on avatarSrc and avatarFallbackIconName
    it('Profile card: avatarVariant = circle, with image', () => {
        element.avatarVariant = 'circle';
        element.avatarSrc =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatarWrapper = element.shadowRoot.querySelector(
                '.avonni-profile-card__avatar-img'
            );
            const image = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );

            expect(avatarWrapper.classList).toContain(
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

        return Promise.resolve()
            .then(() => {
                const image = element.shadowRoot.querySelector(
                    '[data-element-id="img"]'
                );
                image.dispatchEvent(new CustomEvent('error'));
            })
            .then(() => {
                const avatarWrapper = element.shadowRoot.querySelector(
                    '.avonni-profile-card__avatar-img'
                );
                const iconWrapper = element.shadowRoot.querySelector(
                    '.avonni-profile-card__avatar-img > div'
                );

                expect(avatarWrapper.classList).toContain(
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
            const avatarWrapper = element.shadowRoot.querySelector(
                '.avonni-profile-card__avatar-img'
            );
            const image = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );

            expect(avatarWrapper.classList).not.toContain(
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

        return Promise.resolve()
            .then(() => {
                const image = element.shadowRoot.querySelector(
                    '[data-element-id="img"]'
                );
                image.dispatchEvent(new CustomEvent('error'));
            })
            .then(() => {
                const avatarWrapper = element.shadowRoot.querySelector(
                    '.avonni-profile-card__avatar-img'
                );
                const iconWrapper = element.shadowRoot.querySelector(
                    '.avonni-profile-card__avatar-img > div'
                );

                expect(avatarWrapper.classList).not.toContain(
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
});
