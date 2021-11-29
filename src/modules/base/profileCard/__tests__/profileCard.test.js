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

    it('Default attributes', () => {
        expect(element.avatarAlternativeText).toBeUndefined();
        expect(element.avatarFallbackIconName).toBeUndefined();
        expect(element.avatarPosition).toBe('top-left');
        expect(element.avatarMobilePosition).toBe('top-left');
        expect(element.avatarSrc).toBeUndefined();
        expect(element.avatarVariant).toBe('circle');
        expect(element.backgroundAlternativeText).toBeUndefined();
        expect(element.backgroundSrc).toBeUndefined();
        expect(element.size).toBe('medium');
        expect(element.subtitle).toBeUndefined();
        expect(element.title).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // avatar-alternative-text
    // Depends on avatarFallbackIconName and avatarSrc
    it('avatarAlternativeText, with an image', () => {
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

    it('avatarAlternativeText, with an icon', () => {
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
    it('avatarFallbackIconName', () => {
        element.avatarFallbackIconName = 'standard:user';

        return Promise.resolve()
            .then(() => {
                const image = element.shadowRoot.querySelector(
                    '[data-element-id="img"]'
                );
                image.dispatchEvent(new CustomEvent('error'));
            })
            .then(() => {
                const avatarWrapper =
                    element.shadowRoot.querySelector('.avatar-img');
                const icon = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-icon"]'
                );
                expect(icon.iconName).toBe('standard:user');
                expect(avatarWrapper.classList).toContain(
                    'avonni-icon-container'
                );
            });
    });

    // avatar-position
    it('avatarPosition = top-left', () => {
        element.avatarPosition = 'top-left';
        element.showActions = true;

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-flex-container'
            );
            const mainContainer =
                element.shadowRoot.querySelector('.top-left-desktop');
            expect(container.className).toBe('avonni-flex-container');
            expect(mainContainer).toBeTruthy();
        });
    });

    it('avatarPosition = top-center', () => {
        element.avatarPosition = 'top-center';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '.top-center-desktop'
            );
            expect(container.classList).toContain('avonni-flex-align-center');
            expect(mainContainer).toBeTruthy();
        });
    });

    it('avatarPosition = top-right', () => {
        element.avatarPosition = 'top-right';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-flex-container'
            );
            const mainContainer =
                element.shadowRoot.querySelector('.top-right-desktop');
            expect(container.classList).toContain('avonni-flex-align-end');
            expect(mainContainer).toBeTruthy();
        });
    });

    it('avatarPosition = bottom-left', () => {
        element.avatarPosition = 'bottom-left';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '.bottom-left-desktop'
            );
            expect(container.className).toBe('avonni-flex-container');
            expect(mainContainer).toBeTruthy();
        });
    });

    it('avatarPosition = bottom-center', () => {
        element.avatarPosition = 'bottom-center';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '.bottom-center-desktop'
            );
            expect(container.classList).toContain('avonni-flex-align-center');
            expect(mainContainer).toBeTruthy();
        });
    });

    it('avatarPosition = bottom-right', () => {
        element.avatarPosition = 'bottom-right';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '.bottom-right-desktop'
            );
            expect(container.classList).toContain('avonni-flex-align-end');
            expect(mainContainer).toBeTruthy();
        });
    });

    // avatar-mobile-position
    it('avatarMobilePosition = top-left', () => {
        window.innerWidth = 200;

        element.avatarMobilePosition = 'top-left';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-flex-container'
            );
            const mainContainer =
                element.shadowRoot.querySelector('.mobile-top-left');
            expect(container.className).toBe('avonni-flex-container');
            expect(mainContainer).toBeTruthy();
        });
    });

    it('avatarMobilePosition = top-center', () => {
        window.innerWidth = 200;

        element.avatarMobilePosition = 'top-center';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-flex-container'
            );
            const mainContainer =
                element.shadowRoot.querySelector('.mobile-top-center');
            expect(container.classList).toContain(
                'avonni-flex-mobile-align-center'
            );
            expect(mainContainer).toBeTruthy();
        });
    });

    it('avatarMobilePosition = top-right', () => {
        window.innerWidth = 200;

        element.avatarMobilePosition = 'top-right';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-flex-container'
            );
            const mainContainer =
                element.shadowRoot.querySelector('.mobile-top-right');
            expect(container.classList).toContain(
                'avonni-flex-mobile-align-end'
            );
            expect(mainContainer).toBeTruthy();
        });
    });

    it('avatarMobilePosition = bottom-left', () => {
        window.innerWidth = 200;

        element.avatarMobilePosition = 'bottom-left';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '.mobile-bottom-left'
            );
            expect(container.className).toBe('avonni-flex-container');
            expect(mainContainer).toBeTruthy();
        });
    });

    it('avatarMobilePosition = bottom-center', () => {
        window.innerWidth = 200;

        element.avatarMobilePosition = 'bottom-center';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '.mobile-bottom-center'
            );
            expect(container.classList).toContain(
                'avonni-flex-mobile-align-center'
            );
            expect(mainContainer).toBeTruthy();
        });
    });

    it('avatarMobilePosition = bottom-right', () => {
        window.innerWidth = 200;

        element.avatarMobilePosition = 'bottom-right';

        return Promise.resolve().then(() => {
            const container = element.shadowRoot.querySelector(
                '.avonni-flex-container'
            );
            const mainContainer = element.shadowRoot.querySelector(
                '.mobile-bottom-right'
            );
            expect(container.classList).toContain(
                'avonni-flex-mobile-align-end'
            );
            expect(mainContainer).toBeTruthy();
        });
    });

    // avatar-src
    it('avatarSrc', () => {
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

    // avatar-variant
    // Depends on avatarSrc and avatarFallbackIconName
    it('avatarVariant = circle, with image', () => {
        element.avatarVariant = 'circle';
        element.avatarSrc =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatarWrapper =
                element.shadowRoot.querySelector('.avatar-img');
            const image = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );

            expect(avatarWrapper.classList).toContain('avatar-img-circle');
            expect(image.classList).toContain('avatar-img-circle');
        });
    });

    it('avatarVariant = circle, with icon', () => {
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
                const avatarWrapper =
                    element.shadowRoot.querySelector('.avatar-img');
                const iconWrapper =
                    element.shadowRoot.querySelector('.avatar-img > div');

                expect(avatarWrapper.classList).toContain('avatar-img-circle');
                expect(iconWrapper.classList).toContain('avatar-img-circle');
            });
    });

    it('avatarVariant = square, with image', () => {
        element.avatarVariant = 'square';
        element.avatarSrc =
            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';

        return Promise.resolve().then(() => {
            const avatarWrapper =
                element.shadowRoot.querySelector('.avatar-img');
            const image = element.shadowRoot.querySelector(
                '[data-element-id="img"]'
            );

            expect(avatarWrapper.classList).not.toContain('avatar-img-circle');
            expect(image.classList).not.toContain('avatar-img-circle');
        });
    });

    it('avatarVariant = square, with icon', () => {
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
                const avatarWrapper =
                    element.shadowRoot.querySelector('.avatar-img');
                const iconWrapper =
                    element.shadowRoot.querySelector('.avatar-img > div');

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
        element.backgroundAlternativeText = 'An alternative text';

        return Promise.resolve().then(() => {
            const altText = element.shadowRoot.querySelector(
                'span.slds-assistive-text'
            );
            expect(altText.textContent).toBe('An alternative text');
        });
    });

    // background-src
    it('backgroundSrc', () => {
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

    // size
    it('size = medium', () => {
        element.size = 'medium';

        return Promise.resolve().then(() => {
            const mainContainer =
                element.shadowRoot.querySelector('.card-medium');
            const header =
                element.shadowRoot.querySelector('.background-medium');
            const avatar = element.shadowRoot.querySelector('.avatar-medium');
            expect(mainContainer).toBeTruthy();
            expect(header).toBeTruthy();
            expect(avatar).toBeTruthy();
        });
    });

    it('size = x-small', () => {
        element.size = 'x-small';

        return Promise.resolve().then(() => {
            const mainContainer =
                element.shadowRoot.querySelector('.card-x-small');
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
        element.size = 'small';

        return Promise.resolve().then(() => {
            const mainContainer =
                element.shadowRoot.querySelector('.card-small');
            const header =
                element.shadowRoot.querySelector('.background-small');
            const avatar = element.shadowRoot.querySelector('.avatar-small');
            expect(mainContainer).toBeTruthy();
            expect(header).toBeTruthy();
            expect(avatar).toBeTruthy();
        });
    });

    it('size = large', () => {
        element.size = 'large';

        return Promise.resolve().then(() => {
            const mainContainer =
                element.shadowRoot.querySelector('.card-large');
            const header =
                element.shadowRoot.querySelector('.background-large');
            const avatar = element.shadowRoot.querySelector('.avatar-large');
            expect(mainContainer).toBeTruthy();
            expect(header).toBeTruthy();
            expect(avatar).toBeTruthy();
        });
    });

    it('size = x-large', () => {
        element.size = 'x-large';

        return Promise.resolve().then(() => {
            const mainContainer =
                element.shadowRoot.querySelector('.card-x-large');
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
        element.subtitle = 'A string subtitle';

        return Promise.resolve().then(() => {
            const subtitle =
                element.shadowRoot.querySelector('.avonni-subtitle');
            expect(subtitle.textContent).toBe('A string subtitle');
        });
    });

    // title
    it('title', () => {
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('.avonni-title');
            expect(title.textContent).toBe('A string title');
        });
    });
});
