import { createElement } from 'lwc';
import PrimitiveVisualPickerHeader from '../primitiveVisualPickerHeader';

let element;
describe('Primitive Visual Picker Header', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-primitive-visual-picker-header', {
            is: PrimitiveVisualPickerHeader
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.alternativeText).toBeUndefined();
            expect(element.avatar).toMatchObject({});
            expect(element.avatarPosition).toBe('left');
            expect(element.checked).toBeFalsy();
            expect(element.description).toBeUndefined();
            expect(element.hideAvatarTopBottom).toBeFalsy();
            expect(element.hideDescription).toBeFalsy();
            expect(element.hideTitle).toBeFalsy();
            expect(element.size).toBe('medium');
            expect(element.title).toBeUndefined();
        });

        it('Alternative Text', () => {
            element.alternativeText = 'some text';

            return Promise.resolve().then(() => {
                const title = element.shadowRoot.querySelector(
                    '[data-element-id="primitive-visual-picker-title"]'
                );
                expect(title.alternativeText).toBe('some text');
            });
        });

        it('Avatar', () => {
            const avatar = {
                iconName: 'standard:account',
                initials: 'AB',
                presence: 'online',
                presencePosition: 'bottom-right',
                size: 'large',
                imgSrc: 'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg',
                variant: 'circle'
            };
            element.avatar = avatar;

            return Promise.resolve().then(() => {
                const title = element.shadowRoot.querySelector(
                    '[data-element-id="primitive-visual-picker-title"]'
                );
                expect(title).not.toBeNull();
                expect(title.avatar).toMatchObject(avatar);
            });
        });

        describe('Avatar Position', () => {
            describe('Horizontal', () => {
                it('Right of content', () => {
                    const avatar = {
                        iconName: 'standard:account'
                    };
                    element.avatar = avatar;
                    element.avatarPosition = 'right-of-content';

                    return Promise.resolve().then(() => {
                        const container = element.shadowRoot.querySelector(
                            '[data-element-id="container"]'
                        );
                        const avatarHorizontal =
                            element.shadowRoot.querySelector(
                                '[data-element-id="primitive-avatar-horizontal"]'
                            );
                        const avatarTop = element.shadowRoot.querySelector(
                            '[data-element-id="primitive-avatar-top"]'
                        );
                        const avatarBottom = element.shadowRoot.querySelector(
                            '[data-element-id="primitive-avatar-bottom"]'
                        );
                        expect(container.classList).toContain(
                            'avonni-visual-picker__figure-header-container-avatar-right'
                        );
                        expect(avatarHorizontal).not.toBeNull();
                        expect(avatarHorizontal.fallbackIconName).toBe(
                            avatar.iconName
                        );
                        expect(avatarTop).toBeNull();
                        expect(avatarBottom).toBeNull();
                    });
                });

                it('Left of content', () => {
                    const avatar = {
                        iconName: 'standard:account'
                    };
                    element.avatar = avatar;
                    element.avatarPosition = 'left-of-content';

                    return Promise.resolve().then(() => {
                        const container = element.shadowRoot.querySelector(
                            '[data-element-id="container"]'
                        );
                        const avatarHorizontal =
                            element.shadowRoot.querySelector(
                                '[data-element-id="primitive-avatar-horizontal"]'
                            );
                        const avatarTop = element.shadowRoot.querySelector(
                            '[data-element-id="primitive-avatar-top"]'
                        );
                        const avatarBottom = element.shadowRoot.querySelector(
                            '[data-element-id="primitive-avatar-bottom"]'
                        );
                        expect(container.classList).toContain(
                            'avonni-visual-picker__figure-header-container-avatar-left'
                        );
                        expect(avatarHorizontal).not.toBeNull();
                        expect(avatarHorizontal.fallbackIconName).toBe(
                            avatar.iconName
                        );
                        expect(avatarTop).toBeNull();
                        expect(avatarBottom).toBeNull();
                    });
                });
            });

            it('Bottom', () => {
                const avatar = {
                    iconName: 'standard:account'
                };
                element.avatar = avatar;
                element.avatarPosition = 'bottom';

                return Promise.resolve().then(() => {
                    const avatarHorizontal = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-avatar-horizontal"]'
                    );
                    const avatarTop = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-avatar-top"]'
                    );
                    const avatarBottom = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-avatar-bottom"]'
                    );
                    expect(avatarHorizontal).toBeNull();
                    expect(avatarTop).toBeNull();
                    expect(avatarBottom).not.toBeNull();
                    expect(avatarBottom.fallbackIconName).toBe(avatar.iconName);
                });
            });

            it('Top', () => {
                const avatar = {
                    iconName: 'standard:account'
                };
                element.avatar = avatar;
                element.avatarPosition = 'top';

                return Promise.resolve().then(() => {
                    const avatarHorizontal = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-avatar-horizontal"]'
                    );
                    const avatarTop = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-avatar-top"]'
                    );
                    const avatarBottom = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-avatar-bottom"]'
                    );
                    expect(avatarHorizontal).toBeNull();
                    expect(avatarTop).not.toBeNull();
                    expect(avatarTop.fallbackIconName).toBe(avatar.iconName);
                    expect(avatarBottom).toBeNull();
                });
            });
        });

        it('Checked', () => {
            element.checked = true;

            return Promise.resolve().then(() => {
                const title = element.shadowRoot.querySelector(
                    '[data-element-id="primitive-visual-picker-title"]'
                );
                expect(title.checked).toBeTruthy();
            });
        });

        describe('Description', () => {
            it('Plain Text', () => {
                element.description = 'Content';

                return Promise.resolve().then(() => {
                    const description = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-rich-text-description"]'
                    );
                    expect(description.value).toBe('Content');
                    expect(description.title).toBe('Content');
                });
            });

            it('Rich Text', () => {
                element.description = '<b>Content</b>';

                return Promise.resolve().then(() => {
                    const description = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-rich-text-description"]'
                    );
                    expect(description.value).toBe('<b>Content</b>');
                    expect(description.title).toBe('Content');
                });
            });
        });

        describe('Hide Avatar Top and Bottom', () => {
            it('True', () => {
                const avatar = {
                    iconName: 'standard:account'
                };
                element.avatar = avatar;
                element.avatarPosition = 'top';
                element.hideAvatarTopBottom = true;

                return Promise.resolve().then(() => {
                    const avatarTop = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-avatar-top"]'
                    );
                    const avatarBottom = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-avatar-bottom"]'
                    );
                    expect(avatarTop).toBeNull();
                    expect(avatarBottom).toBeNull();
                });
            });

            it('False', () => {
                const avatar = {
                    iconName: 'standard:account'
                };
                element.avatar = avatar;
                element.avatarPosition = 'top';
                element.hideAvatarTopBottom = false;

                return Promise.resolve().then(() => {
                    const avatarTop = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-avatar-top"]'
                    );
                    const avatarBottom = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-avatar-bottom"]'
                    );
                    expect(avatarTop).not.toBeNull();
                    expect(avatarBottom).toBeNull();
                });
            });
        });

        describe('Hide Description', () => {
            it('True', () => {
                element.hideDescription = true;

                return Promise.resolve().then(() => {
                    const description = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-rich-text-description"]'
                    );
                    expect(description).toBeNull();
                });
            });

            it('True with avatar position = left-of-content', () => {
                element.hideDescription = true;
                element.avatarPosition = 'left-of-content';

                return Promise.resolve().then(() => {
                    const title = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-visual-picker-title"]'
                    );
                    const description = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-rich-text-description"]'
                    );
                    const avatarHorizontal = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-avatar-horizontal"]'
                    );
                    const avatarTop = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-avatar-top"]'
                    );
                    const avatarBottom = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-avatar-bottom"]'
                    );
                    expect(title).not.toBeNull();
                    expect(description).toBeNull();
                    expect(avatarHorizontal).toBeNull();
                    expect(avatarTop).toBeNull();
                    expect(avatarBottom).toBeNull();
                });
            });

            it('True with avatar position = right-of-content', () => {
                element.hideDescription = true;
                element.avatarPosition = 'right-of-content';

                return Promise.resolve().then(() => {
                    const title = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-visual-picker-title"]'
                    );
                    const description = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-formatted-rich-text-description"]'
                    );
                    const avatarHorizontal = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-avatar-horizontal"]'
                    );
                    const avatarTop = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-avatar-top"]'
                    );
                    const avatarBottom = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-avatar-bottom"]'
                    );
                    expect(title).not.toBeNull();
                    expect(description).toBeNull();
                    expect(avatarHorizontal).toBeNull();
                    expect(avatarTop).toBeNull();
                    expect(avatarBottom).toBeNull();
                });
            });
        });

        it('Hide Title', () => {
            element.hideTitle = true;

            return Promise.resolve().then(() => {
                const title = element.shadowRoot.querySelector(
                    '[data-element-id="primitive-visual-picker-title"]'
                );
                expect(title).toBeNull();
            });
        });

        it('Size', () => {
            element.size = 'large';

            return Promise.resolve().then(() => {
                const title = element.shadowRoot.querySelector(
                    '[data-element-id="primitive-visual-picker-title"]'
                );
                expect(title.size).toBe('large');
            });
        });

        it('Title', () => {
            element.title = 'Some Title';

            return Promise.resolve().then(() => {
                const title = element.shadowRoot.querySelector(
                    '[data-element-id="primitive-visual-picker-title"]'
                );
                expect(title.title).toBe('Some Title');
            });
        });
    });
});
