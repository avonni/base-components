import { createElement } from 'lwc';
import ButtonIcon from 'c/buttonIcon';
import { Tooltip } from 'c/tooltipLibrary';

jest.mock('c/tooltipLibrary');

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
        Tooltip.mockClear();
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.accessKey).toBeUndefined();
            expect(element.alternativeText).toBeUndefined();
            expect(element.disabled).toBeFalsy();
            expect(element.iconClass).toBeUndefined();
            expect(element.iconName).toBeUndefined();
            expect(element.iconSrc).toBeUndefined();
            expect(element.name).toBeUndefined();
            expect(element.size).toBe('medium');
            expect(element.tabIndex).toBeUndefined();
            expect(element.tooltip).toBeUndefined();
            expect(element.type).toBe('button');
            expect(element.value).toBeUndefined();
            expect(element.variant).toBe('border');
        });

        describe('Access Key', () => {
            it('Passed to the component', () => {
                element.accessKey = 'K';
                element.iconName = 'utility:down';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.accessKey).toBe('K');
                });
            });
        });

        describe('Alternative Text', () => {
            it('Passed to the component', () => {
                element.alternativeText = 'text';
                element.iconName = 'utility:down';

                return Promise.resolve().then(() => {
                    const alternativeText = element.shadowRoot.querySelector(
                        '[data-element-id="alternative-text"]'
                    );
                    expect(alternativeText.textContent).toBe('text');
                });
            });
        });

        describe('Disabled', () => {
            it('Passed to the component', () => {
                element.disabled = true;
                element.iconName = 'utility:close';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.disabled).toBeTruthy();
                });
            });
        });

        describe('Icon', () => {
            describe('Icon Class', () => {
                it('Passed to the component', () => {
                    element.iconClass = 'custom-class';
                    element.iconName = 'utility:close';

                    return Promise.resolve().then(() => {
                        const icon = element.shadowRoot.querySelector(
                            '[data-element-id="primitive-icon"]'
                        );
                        expect(icon.svgClass).toContain('custom-class');
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

            describe('Size Bare', () => {
                it('X-small', () => {
                    element.iconName = 'utility:close';
                    element.size = 'x-small';
                    element.variant = 'bare';

                    return Promise.resolve().then(() => {
                        const icon = element.shadowRoot.querySelector(
                            '[data-element-id="primitive-icon"]'
                        );
                        expect(icon.svgClass).toContain(
                            'slds-button__icon_x-small'
                        );
                    });
                });

                it('Small', () => {
                    element.iconName = 'utility:close';
                    element.size = 'small';
                    element.variant = 'bare';

                    return Promise.resolve().then(() => {
                        const icon = element.shadowRoot.querySelector(
                            '[data-element-id="primitive-icon"]'
                        );
                        expect(icon.svgClass).toContain(
                            'slds-button__icon_small'
                        );
                    });
                });

                it('Medium', () => {
                    element.iconName = 'utility:close';
                    element.size = 'medium';
                    element.variant = 'bare';

                    return Promise.resolve().then(() => {
                        const icon = element.shadowRoot.querySelector(
                            '[data-element-id="primitive-icon"]'
                        );
                        expect(icon.svgClass).toContain('slds-button__icon');
                    });
                });

                it('Large', () => {
                    element.iconName = 'utility:close';
                    element.size = 'large';
                    element.variant = 'bare';

                    return Promise.resolve().then(() => {
                        const icon = element.shadowRoot.querySelector(
                            '[data-element-id="primitive-icon"]'
                        );
                        expect(icon.svgClass).toContain(
                            'slds-button__icon_large'
                        );
                    });
                });
            });

            describe('Size Non Bare', () => {
                it('Xx-small', () => {
                    element.iconName = 'utility:close';
                    element.size = 'xx-small';

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        expect(button.classList).toContain(
                            'slds-button_icon-xx-small'
                        );
                    });
                });

                it('X-small', () => {
                    element.iconName = 'utility:close';
                    element.size = 'x-small';

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        expect(button.classList).toContain(
                            'slds-button_icon-x-small'
                        );
                    });
                });

                it('Small', () => {
                    element.iconName = 'utility:close';
                    element.size = 'small';

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        expect(button.classList).toContain(
                            'slds-button_icon-small'
                        );
                    });
                });

                it('Medium', () => {
                    element.iconName = 'utility:close';
                    element.size = 'medium';

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        expect(button.classList).toContain('slds-button_icon');
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
        });

        describe('Name', () => {
            it('Passed to the component', () => {
                element.iconName = 'utility:close';
                element.name = 'name';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.name).toBe('name');
                });
            });
        });

        describe('Tooltip', () => {
            it('Passed to the component', () => {
                element.tooltip = 'some tooltip';
                expect(Tooltip).toHaveBeenCalled();
                expect(Tooltip.mock.calls[0][0]).toBe('some tooltip');

                const instance = Tooltip.mock.instances[0];
                expect(instance.initialize).toHaveBeenCalled();
            });
        });

        describe('Type', () => {
            it('Passed to the component', () => {
                element.iconName = 'utility:close';
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
                element.iconName = 'utility:close';
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
                element.iconName = 'utility:close';
                element.variant = 'bare';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button-icon_bare'
                    );
                });
            });

            it('Bare-inverse', () => {
                element.iconName = 'utility:close';
                element.variant = 'bare-inverse';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button-icon_bare-inverse'
                    );
                });
            });

            it('Base', () => {
                element.iconName = 'utility:close';
                element.variant = 'base';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button-icon_base'
                    );
                });
            });

            it('Border', () => {
                element.iconName = 'utility:close';
                element.variant = 'border';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button-icon_border'
                    );
                });
            });

            it('Border-filled', () => {
                element.iconName = 'utility:close';
                element.variant = 'border-filled';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button-icon_border-filled'
                    );
                });
            });

            it('Border-inverse', () => {
                element.iconName = 'utility:close';
                element.variant = 'border-inverse';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button-icon_border-inverse'
                    );
                });
            });

            it('Brand', () => {
                element.iconName = 'utility:close';
                element.variant = 'brand';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button-icon_brand'
                    );
                });
            });

            it('Brand-outline', () => {
                element.iconName = 'utility:close';
                element.variant = 'brand-outline';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button-icon_brand-outline'
                    );
                });
            });

            it('Container', () => {
                element.iconName = 'utility:close';
                element.variant = 'container';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button-icon_container'
                    );
                });
            });

            it('Destructive', () => {
                element.iconName = 'utility:close';
                element.variant = 'destructive';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button-icon_destructive'
                    );
                });
            });

            it('Destructive-text', () => {
                element.iconName = 'utility:close';
                element.variant = 'destructive-text';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button-icon_destructive-text'
                    );
                });
            });

            it('Inverse', () => {
                element.iconName = 'utility:close';
                element.variant = 'inverse';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button-icon_inverse'
                    );
                });
            });

            it('Neutral', () => {
                element.iconName = 'utility:close';
                element.variant = 'neutral';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button-icon_neutral'
                    );
                });
            });

            it('Success', () => {
                element.iconName = 'utility:close';
                element.variant = 'success';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.classList).toContain(
                        'avonni-button-icon_success'
                    );
                });
            });
        });
    });

    describe('Methods', () => {
        it('click', () => {
            element.iconName = 'utility:close';
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
            element.iconName = 'utility:close';
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
            element.iconName = 'utility:close';
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
            element.iconName = 'utility:close';
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
            element.iconName = 'utility:close';

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
