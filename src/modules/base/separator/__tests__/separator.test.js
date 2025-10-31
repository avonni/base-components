import { createElement } from 'lwc';
import Separator from 'c/separator';

let element;
describe('Separator', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-separator', {
            is: Separator
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.alignContent).toBe('center');
        expect(element.label).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.iconPosition).toBe('left');
        expect(element.iconSize).toBe('small');
        expect(element.iconSrc).toBeUndefined();
        expect(element.iconVariant).toBe('square');
        expect(element.orientation).toBe('horizontal');
    });

    describe('Align Content', () => {
        it('Start', () => {
            element.iconName = 'utility:check';
            element.iconSize = 'x-small';
            element.alignContent = 'start';

            return Promise.resolve().then(() => {
                const lineOne = element.shadowRoot.querySelector(
                    '[data-element-id="line-one"]'
                );
                expect(lineOne.classList).toContain('slds-hide');
            });
        });

        it('End', () => {
            element.iconName = 'utility:check';
            element.iconSize = 'x-small';
            element.alignContent = 'end';

            return Promise.resolve().then(() => {
                const lineTwo = element.shadowRoot.querySelector(
                    '[data-element-id="line-two"]'
                );
                expect(lineTwo.classList).toContain('slds-hide');
            });
        });
    });

    describe('Icon', () => {
        it('IconName', () => {
            element.iconName = 'utility:check';

            return Promise.resolve().then(() => {
                const avatar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-avatar"]'
                );
                expect(avatar.fallbackIconName).toBe('utility:check');
            });
        });

        it('IconPosition', () => {
            element.iconName = 'utility:check';
            element.iconPosition = 'right';

            return Promise.resolve().then(() => {
                const content = element.shadowRoot.querySelector(
                    '.avonni-separator_content'
                );
                expect(content.classList).toContain('slds-grid_reverse');
            });
        });

        describe('IconSize', () => {
            it('Xx-Small', () => {
                element.iconName = 'utility:check';
                element.iconSize = 'xx-small';

                return Promise.resolve().then(() => {
                    const content = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(content.size).toBe('xx-small');
                });
            });

            it('X-Small', () => {
                element.iconName = 'utility:check';
                element.iconSize = 'x-small';

                return Promise.resolve().then(() => {
                    const content = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(content.size).toBe('x-small');
                });
            });

            it('Small', () => {
                element.iconName = 'utility:check';
                element.iconSize = 'small';

                return Promise.resolve().then(() => {
                    const content = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(content.size).toBe('small');
                });
            });

            it('Medium', () => {
                element.iconName = 'utility:check';
                element.iconSize = 'medium';

                return Promise.resolve().then(() => {
                    const content = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(content.size).toBe('medium');
                });
            });

            it('Large', () => {
                element.iconName = 'utility:check';
                element.iconSize = 'large';

                return Promise.resolve().then(() => {
                    const content = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(content.size).toBe('large');
                });
            });

            it('X-Large', () => {
                element.iconName = 'utility:check';
                element.iconSize = 'x-large';

                return Promise.resolve().then(() => {
                    const content = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(content.size).toBe('x-large');
                });
            });

            it('Xx-Large', () => {
                element.iconName = 'utility:check';
                element.iconSize = 'xx-large';

                return Promise.resolve().then(() => {
                    const content = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(content.size).toBe('xx-large');
                });
            });

            it('Invalid value (Defaults to small)', () => {
                element.iconName = 'utility:check';
                element.iconSize = 'xxx-small';

                return Promise.resolve().then(() => {
                    const content = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(content.size).toBe('small');
                });
            });
        });

        it('IconSrc', () => {
            element.iconSrc =
                'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg';

            return Promise.resolve().then(() => {
                const avatar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-avatar"]'
                );

                expect(avatar.src).toBe(
                    'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
                );
            });
        });

        it('IconVariant', () => {
            element.iconName = 'utility:check';
            element.iconVariant = 'circle';

            return Promise.resolve().then(() => {
                const avatar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-avatar"]'
                );
                expect(avatar.variant).toBe('circle');
            });
        });

        it('Icon Margin left', () => {
            element.label = 'Tester';
            element.iconName = 'utility:check';
            element.iconSize = 'small';
            element.iconPosition = 'left';

            return Promise.resolve().then(() => {
                const avatar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-avatar"]'
                );
                expect(avatar.classList).toContain('slds-m-right_x-small');
            });
        });

        it('Icon Margin Right', () => {
            element.label = 'Tester';
            element.iconName = 'utility:check';
            element.iconSize = 'small';
            element.iconPosition = 'right';

            return Promise.resolve().then(() => {
                const avatar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-avatar"]'
                );
                expect(avatar.classList).toContain('slds-m-left_x-small');
            });
        });
    });

    describe('Label', () => {
        it('Label', () => {
            element.label = 'Today';

            return Promise.resolve().then(() => {
                const header = element.shadowRoot.querySelector(
                    '[data-element-id="label"]'
                );
                expect(header.textContent).toBe('Today');
            });
        });
    });

    describe('Orientation', () => {
        it('Horizontal', () => {
            element.orientation = 'horizontal';

            return Promise.resolve().then(() => {
                const container = element.shadowRoot.querySelector(
                    '[data-element-id="container"]'
                );
                expect(container.classList).not.toContain('slds-grid_vertical');
            });
        });

        it('Vertical', () => {
            element.orientation = 'vertical';

            return Promise.resolve().then(() => {
                const container = element.shadowRoot.querySelector(
                    '[data-element-id="container"]'
                );
                expect(container.classList).toContain('slds-grid_vertical');
            });
        });
    });
});
