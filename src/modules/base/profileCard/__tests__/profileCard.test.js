import { createElement } from 'lwc';
import ProfileCard from 'c/profileCard';
import { callObserver } from 'c/resizeObserver';

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

    describe('Attributes', () => {
        it('Default attributes', () => {
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

        describe('avatarAlternativeText', () => {
            it('Passed to the component with an image', () => {
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

            it('Passed to the component with an icon', () => {
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
                    expect(icon.alternativeText).toBe(
                        'A string alternative text'
                    );
                });
            });
        });

        describe('avatarFallbackIconName', () => {
            it('Passed to the component', () => {
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
                    expect(icon.iconName).toBe('standard:user');
                    expect(avatarWrapper.classList).toContain(
                        'slds-align_absolute-center'
                    );
                });
            });
        });

        describe('avatarPosition', () => {
            it('top-left', () => {
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
                        'avonni-profile-card__avatar-desktop'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-top'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-left'
                    );
                });
            });

            it('top-center', () => {
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
                        'avonni-profile-card__avatar-desktop'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-top'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-center'
                    );
                });
            });

            it('top-right', () => {
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
                        'avonni-profile-card__avatar-desktop'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-top'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-right'
                    );
                });
            });

            it('bottom-left', () => {
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
                        'avonni-profile-card__avatar-desktop'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-bottom'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-left'
                    );
                });
            });

            it('bottom-center', () => {
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
                        'avonni-profile-card__avatar-desktop'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-bottom'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-center'
                    );
                });
            });

            it('bottom-right', () => {
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
                        'avonni-profile-card__avatar-desktop'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-bottom'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-right'
                    );
                });
            });
        });

        describe('avatarMobilePosition', () => {
            it('top-left', () => {
                const mainContainer = element.shadowRoot.querySelector(
                    '[data-element-id="main-container"]'
                );
                jest.spyOn(mainContainer, 'clientWidth', 'get').mockReturnValue(
                    200
                );
                element.avatarMobilePosition = 'top-left';
                callObserver();

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="container"]'
                    );
                    expect(container.className).toBe(
                        'avonni-profile-card__flex-container'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-mobile'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-top'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-left'
                    );
                });
            });

            it('top-center', () => {
                const mainContainer = element.shadowRoot.querySelector(
                    '[data-element-id="main-container"]'
                );
                jest.spyOn(mainContainer, 'clientWidth', 'get').mockReturnValue(
                    200
                );
                element.avatarMobilePosition = 'top-center';
                callObserver();

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="container"]'
                    );
                    expect(container.classList).toContain(
                        'avonni-profile-card__flex-container-mobile_align-center'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-mobile'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-top'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-center'
                    );
                });
            });

            it('top-right', () => {
                const mainContainer = element.shadowRoot.querySelector(
                    '[data-element-id="main-container"]'
                );
                jest.spyOn(mainContainer, 'clientWidth', 'get').mockReturnValue(
                    200
                );
                element.avatarMobilePosition = 'top-right';
                callObserver();

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="container"]'
                    );
                    expect(container.classList).toContain(
                        'avonni-profile-card__flex-container-mobile_align-end'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-mobile'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-top'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-right'
                    );
                });
            });

            it('bottom-left', () => {
                const mainContainer = element.shadowRoot.querySelector(
                    '[data-element-id="main-container"]'
                );
                jest.spyOn(mainContainer, 'clientWidth', 'get').mockReturnValue(
                    200
                );
                element.avatarMobilePosition = 'bottom-left';
                callObserver();

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="container"]'
                    );
                    expect(container.className).toBe(
                        'avonni-profile-card__flex-container'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-mobile'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-bottom'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-left'
                    );
                });
            });

            it('bottom-center', () => {
                const mainContainer = element.shadowRoot.querySelector(
                    '[data-element-id="main-container"]'
                );
                jest.spyOn(mainContainer, 'clientWidth', 'get').mockReturnValue(
                    200
                );
                element.avatarMobilePosition = 'bottom-center';
                callObserver();

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="container"]'
                    );
                    expect(container.classList).toContain(
                        'avonni-profile-card__flex-container-mobile_align-center'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-mobile'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-bottom'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-center'
                    );
                });
            });

            it('bottom-right', () => {
                const mainContainer = element.shadowRoot.querySelector(
                    '[data-element-id="main-container"]'
                );
                jest.spyOn(mainContainer, 'clientWidth', 'get').mockReturnValue(
                    200
                );
                element.avatarMobilePosition = 'bottom-right';
                callObserver();

                return Promise.resolve().then(() => {
                    const container = element.shadowRoot.querySelector(
                        '[data-element-id="container"]'
                    );
                    expect(container.classList).toContain(
                        'avonni-profile-card__flex-container-mobile_align-end'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-mobile'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-bottom'
                    );
                    expect(mainContainer.classList).toContain(
                        'avonni-profile-card__avatar-right'
                    );
                });
            });
        });

        describe('avatarSrc', () => {
            it('Passed to the component', () => {
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
        });

        describe('avatarSize', () => {
            it('medium', () => {
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

            it('x-small', () => {
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

            it('small', () => {
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

            it('large', () => {
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

            it('x-large', () => {
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
        });

        describe('avatarVariant', () => {
            it('circle, with image', () => {
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

            it('circle, with icon', () => {
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
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="avatar-lightning-icon"]'
                    );

                    expect(avatar.classList).toContain(
                        'avonni-profile-card__avatar-img-circle'
                    );
                    expect(icon.classList).toContain(
                        'avonni-profile-card__avatar-img-circle'
                    );
                });
            });

            it('square, with image', () => {
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

            it('square, with icon', () => {
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
        });

        describe('backgroundAlternativeText', () => {
            it('Passed to the component', () => {
                element.backgroundAlternativeText = 'An alternative text';

                return Promise.resolve().then(() => {
                    const altText = element.shadowRoot.querySelector(
                        'span.slds-assistive-text'
                    );
                    expect(altText.textContent).toBe('An alternative text');
                });
            });
        });

        describe('backgroundSrc', () => {
            it('Passed to the component', () => {
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
        });

        describe('subtitle', () => {
            it('Passed to the component', () => {
                element.subtitle = 'A string subtitle';

                return Promise.resolve().then(() => {
                    const subtitle = element.shadowRoot.querySelector(
                        '.avonni-profile-card__subtitle'
                    );
                    expect(subtitle.textContent).toBe('A string subtitle');
                });
            });
        });

        describe('title', () => {
            it('Passed to the component', () => {
                element.title = 'A string title';

                return Promise.resolve().then(() => {
                    const title = element.shadowRoot.querySelector(
                        '.avonni-profile-card__title'
                    );
                    expect(title.textContent).toBe('A string title');
                });
            });
        });
    });

    describe('Events', () => {
        it('privateprofilecardrendered event', () => {
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
});
