import { createElement } from 'lwc';
import Button from '../button';

let element;
describe('Button', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-button', {
            is: Button
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.accessKey).toBeUndefined();
            expect(element.disableAnimation).toBeFalsy();
            expect(element.disabled).toBeFalsy();
            expect(element.iconName).toBeUndefined();
            expect(element.iconPosition).toBe('left');
            expect(element.iconSize).toBe('small');
            expect(element.iconSrc).toBeUndefined();
            expect(element.label).toBeUndefined();
            expect(element.name).toBeUndefined();
            expect(element.stretch).toBeFalsy();
            expect(element.type).toBe('button');
            expect(element.value).toBeUndefined();
            expect(element.variant).toBe('neutral');
        });

        describe('Access Key', () => {
            it('Passed to the component', () => {
                element.accessKey = 'K';
                element.label = 'Label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.accessKey).toBe('K');
                });
            });
        });

        describe('Disabled', () => {
            it('Passed to the component', () => {
                element.disabled = true;
                element.label = 'Label';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.disabled).toBeTruthy();
                });
            });
        });

        describe('Icon Name', () => {
            it('Passed to the component', () => {
                element.iconName = 'utility:close';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-icon"]'
                    );
                    expect(icon.iconName).toBe('utility:close');
                });
            });
        });

        describe('Icon Position', () => {
            it('Left', () => {
                element.iconName = 'utility:close';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="icon-container"]'
                    );
                    expect(icon.classList).toContain('slds-order_0');
                });
            });

            it('Right', () => {
                element.iconName = 'utility:close';
                element.iconPosition = 'right';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="icon-container"]'
                    );
                    expect(icon.classList).toContain('slds-order_2');
                });
            });
        });

        describe('Icon Size', () => {
            it('Xx-small', () => {
                element.iconName = 'utility:close';
                element.iconSize = 'xx-small';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-icon"]'
                    );
                    expect(icon.size).toBe('');
                });
            });

            it('X-small', () => {
                element.iconName = 'utility:close';
                element.iconSize = 'x-small';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-icon"]'
                    );
                    expect(icon.size).toBe('');
                });
            });

            it('Small', () => {
                element.iconName = 'utility:close';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-icon"]'
                    );
                    expect(icon.size).toBe('');
                });
            });

            it('Medium', () => {
                element.iconName = 'utility:close';
                element.iconSize = 'medium';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-icon"]'
                    );
                    expect(icon.size).toBe('x-small');
                });
            });

            it('Large', () => {
                element.iconName = 'utility:close';
                element.iconSize = 'large';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-icon"]'
                    );
                    expect(icon.size).toBe('small');
                });
            });
        });

        describe('Icon Src', () => {
            it('Passed to the component', () => {
                element.iconSrc =
                    'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="image"]'
                    );
                    expect(icon.src).toBe(
                        'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg'
                    );
                });
            });
        });

        describe('Icon Src Size', () => {
            it('Xx-small', () => {
                element.iconSrc =
                    'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg';
                element.iconSize = 'xx-small';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="image"]'
                    );
                    expect(icon.classList).toContain(
                        'avonni-button__image_xx-small'
                    );
                });
            });

            it('X-small', () => {
                element.iconSrc =
                    'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg';
                element.iconSize = 'x-small';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="image"]'
                    );
                    expect(icon.classList).toContain(
                        'avonni-button__image_x-small'
                    );
                });
            });

            it('Small', () => {
                element.iconSrc =
                    'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="image"]'
                    );
                    expect(icon.classList).toContain(
                        'avonni-button__image_small'
                    );
                });
            });

            it('Medium', () => {
                element.iconSrc =
                    'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg';
                element.iconSize = 'medium';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="image"]'
                    );
                    expect(icon.classList).toContain(
                        'avonni-button__image_medium'
                    );
                });
            });

            it('Large', () => {
                element.iconSrc =
                    'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg';
                element.iconSize = 'large';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="image"]'
                    );
                    expect(icon.classList).toContain(
                        'avonni-button__image_large'
                    );
                });
            });
        });

        describe('Label', () => {
            it('Passed to the component', () => {
                element.label = 'Label';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="label"]'
                    );
                    expect(label.textContent).toBe('Label');
                });
            });
        });

        describe('Name', () => {
            it('Passed to the component', () => {
                element.label = 'Label';
                element.name = 'name';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.name).toBe('name');
                });
            });
        });

        describe('Stretch', () => {
            it('Passed to the component', () => {
                element.label = 'Label';
                element.stretch = true;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain('slds-button_stretch');
                });
            });
        });

        describe('Type', () => {
            it('Passed to the component', () => {
                element.label = 'Label';
                element.type = 'submit';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.type).toBe('submit');
                });
            });
        });

        describe('Value', () => {
            it('Passed to the component', () => {
                element.label = 'Label';
                element.value = 'value';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.value).toBe('value');
                });
            });
        });

        describe('Variant', () => {
            it('Bare', () => {
                element.label = 'Label';
                element.variant = 'bare';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain('avonni-button_bare');
                });
            });

            it('Bare-inverse', () => {
                element.label = 'Label';
                element.variant = 'bare-inverse';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button_bare-inverse'
                    );
                });
            });

            it('Base', () => {
                element.label = 'Label';
                element.variant = 'base';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain('avonni-button_base');
                });
            });

            it('Border', () => {
                element.label = 'Label';
                element.variant = 'border';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain('avonni-button_border');
                });
            });

            it('Border-filled', () => {
                element.label = 'Label';
                element.variant = 'border-filled';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button_border-filled'
                    );
                });
            });

            it('Border-inverse', () => {
                element.label = 'Label';
                element.variant = 'border-inverse';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button_border-inverse'
                    );
                });
            });

            it('Brand', () => {
                element.label = 'Label';
                element.variant = 'brand';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain('avonni-button_brand');
                });
            });

            it('Brand-outline', () => {
                element.label = 'Label';
                element.variant = 'brand-outline';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button_brand-outline'
                    );
                });
            });

            it('Container', () => {
                element.label = 'Label';
                element.variant = 'container';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button_container'
                    );
                });
            });

            it('Destructive', () => {
                element.label = 'Label';
                element.variant = 'destructive';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button_destructive'
                    );
                });
            });

            it('Destructive-text', () => {
                element.label = 'Label';
                element.variant = 'destructive-text';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button_destructive-text'
                    );
                });
            });

            it('Inverse', () => {
                element.label = 'Label';
                element.variant = 'inverse';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain('avonni-button_inverse');
                });
            });

            it('Neutral', () => {
                element.label = 'Label';
                element.variant = 'neutral';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain('avonni-button_neutral');
                });
            });

            it('Success', () => {
                element.label = 'Label';
                element.variant = 'success';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain('avonni-button_success');
                });
            });
        });
    });

    describe('Methods', () => {
        it('click', () => {
            element.label = 'Label';

            const handler = jest.fn();
            element.addEventListener('click', handler);

            return Promise.resolve().then(() => {
                element.click();
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.addEventListener('click', handler);

                expect(handler).toHaveBeenCalled();
            });
        });

        it('focus', () => {
            element.label = 'Label';

            const handler = jest.fn();
            element.addEventListener('focus', handler);

            return Promise.resolve().then(() => {
                element.focus();
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.addEventListener('focus', handler);

                expect(handler).toHaveBeenCalled();
            });
        });
    });

    describe('Events', () => {
        it('blur', () => {
            element.label = 'Label';

            const handler = jest.fn();
            element.addEventListener('blur', handler);

            return Promise.resolve().then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.focus();
                button.blur();

                expect(handler).toHaveBeenCalled();
            });
        });

        it('click', () => {
            element.label = 'Label';

            const handler = jest.fn();
            element.addEventListener('click', handler);

            return Promise.resolve().then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.click();

                expect(handler).toHaveBeenCalled();
            });
        });

        it('focus', () => {
            element.label = 'Label';

            const handler = jest.fn();
            element.addEventListener('focus', handler);

            return Promise.resolve().then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                button.focus();

                expect(handler).toHaveBeenCalled();
            });
        });
    });
});
