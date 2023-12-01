import { createElement } from 'lwc';
import ButtonIcon from 'c/buttonIcon';

let element;
describe('Button Icon', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-button-icon', {
            is: ButtonIcon
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.accessKey).toBeUndefined();
            expect(element.disabled).toBeFalsy();
            expect(element.iconName).toBeUndefined();
            expect(element.iconPosition).toBe('left');
            expect(element.iconSize).toBe('x-small');
            expect(element.iconSrc).toBeUndefined();
            expect(element.label).toBeUndefined();
            expect(element.name).toBeUndefined();
            expect(element.stretch).toBeFalsy();
            expect(element.type).toBe('button');
            expect(element.value).toBeUndefined();
            expect(element.variant).toBe('neutral');
        });

        describe('Access Key', () => {
            it('accessKey', () => {
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
            it('disabled', () => {
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
            it('iconName', () => {
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
            it('iconPosition = left', () => {
                element.iconName = 'utility:close';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="icon-container"]'
                    );
                    expect(icon.classList).toContain('slds-order_0');
                });
            });

            it('iconPosition = right', () => {
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
            it('iconSize = x-small', () => {
                element.iconName = 'utility:close';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-icon"]'
                    );
                    expect(icon.size).toBe('xx-small');
                });
            });

            it('iconSize = small', () => {
                element.iconName = 'utility:close';
                element.iconSize = 'small';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-icon"]'
                    );
                    expect(icon.size).toBe('x-small');
                });
            });

            it('iconSize = medium', () => {
                element.iconName = 'utility:close';
                element.iconSize = 'medium';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-icon"]'
                    );
                    expect(icon.size).toBe('small');
                });
            });

            it('iconSize = large', () => {
                element.iconName = 'utility:close';
                element.iconSize = 'large';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="primitive-icon"]'
                    );
                    expect(icon.size).toBe('large');
                });
            });
        });

        describe('Icon Src', () => {
            it('iconSrc', () => {
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
            it('iconSize = x-small', () => {
                element.iconSrc =
                    'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="image"]'
                    );
                    expect(icon.classList).toContain(
                        'avonni-button__image_x-small'
                    );
                });
            });

            it('iconSize = small', () => {
                element.iconSrc =
                    'https://www.lightningdesignsystem.com/assets/images/avatar1.jpg';
                element.iconSize = 'small';

                return Promise.resolve().then(() => {
                    const icon = element.shadowRoot.querySelector(
                        '[data-element-id="image"]'
                    );
                    expect(icon.classList).toContain(
                        'avonni-button__image_small'
                    );
                });
            });

            it('iconSize = medium', () => {
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

            it('iconSize = large', () => {
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
            it('label', () => {
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
            it('name', () => {
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
            it('stretch', () => {
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
            it('type', () => {
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
            it('value', () => {
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
            it('variant = bare', () => {
                element.label = 'Label';
                element.variant = 'bare';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain('avonni-button_bare');
                });
            });

            it('variant = bare-inverse', () => {
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

            it('variant = base', () => {
                element.label = 'Label';
                element.variant = 'base';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain('avonni-button_base');
                });
            });

            it('variant = border', () => {
                element.label = 'Label';
                element.variant = 'border';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain('avonni-button_border');
                });
            });

            it('variant = border-filled', () => {
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

            it('variant = border-inverse', () => {
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

            it('variant = brand', () => {
                element.label = 'Label';
                element.variant = 'brand';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain('avonni-button_brand');
                });
            });

            it('variant = brand-outline', () => {
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

            it('variant = container', () => {
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

            it('variant = destructive', () => {
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

            it('variant = destructive-text', () => {
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

            it('variant = inverse', () => {
                element.label = 'Label';
                element.variant = 'inverse';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain('avonni-button_inverse');
                });
            });

            it('variant = neutral', () => {
                element.label = 'Label';
                element.variant = 'neutral';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain('avonni-button_neutral');
                });
            });

            it('variant = success', () => {
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
