import { createElement } from 'lwc';
import ButtonIconDialog from 'c/buttonIconDialog';

let element;
describe('Button Icon Dialog', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-button-icon-dialog', {
            is: ButtonIconDialog
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.accessKey).toBeUndefined();
            expect(element.alternativeText).toBeUndefined();
            expect(element.disabled).toBeFalsy();
            expect(element.iconClass).toBeUndefined();
            expect(element.iconName).toBeUndefined();
            expect(element.iconSrc).toBeUndefined();
            expect(element.size).toBe('medium');
            expect(element.tooltip).toBeUndefined();
            expect(element.variant).toBe('border');
        });

        describe('Access Key', () => {
            it('accessKey', () => {
                element.accessKey = 'K';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.accessKey).toBe('K');
                });
            });
        });

        describe('Alternative Text', () => {
            it('alternativeText', () => {
                element.alternativeText = 'This is an alternative text';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.alternativeText).toBe(
                        'This is an alternative text'
                    );
                });
            });
        });

        describe('Disabled', () => {
            it('disabled', () => {
                element.disabled = true;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.disabled).toBeTruthy();
                });
            });
        });

        describe('Tooltip', () => {
            it('tooltip', () => {
                element.tooltip = 'This is a tooltip';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.tooltip).toBe('This is a tooltip');
                });
            });
        });

        describe('Icon', () => {
            describe('Icon Class', () => {
                it('iconClass', () => {
                    element.iconClass = 'button-dialog-icon-class';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.iconClass).toBe(
                            'button-dialog-icon-class'
                        );
                    });
                });
            });

            describe('Icon Name', () => {
                it('iconName', () => {
                    element.iconName = 'utility:lock';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.iconName).toBe('utility:lock');
                    });
                });
            });

            describe('Icon Src', () => {
                it('iconSrc', () => {
                    element.iconSrc =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.iconSrc).toBe(
                            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
                        );
                    });
                });
            });

            describe('Icon Size', () => {
                it('size = xx-small', () => {
                    element.size = 'xx-small';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.size).toBe('xx-small');
                    });
                });

                it('size = x-small', () => {
                    element.size = 'x-small';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.size).toBe('x-small');
                    });
                });

                it('size = small', () => {
                    element.size = 'small';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.size).toBe('small');
                    });
                });

                it('size = medium', () => {
                    element.size = 'medium';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.size).toBe('medium');
                    });
                });

                it('size = large for non bare', () => {
                    element.size = 'large';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.size).toBe('medium');
                    });
                });

                it('size = large for bare', () => {
                    element.variant = 'bare';
                    element.size = 'large';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.size).toBe('large');
                    });
                });
            });
        });

        describe('Variant', () => {
            it('variant = border', () => {
                element.variant = 'border';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('border');
                });
            });

            it('variant = bare', () => {
                element.variant = 'bare';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('bare');
                });
            });

            it('variant = container', () => {
                element.variant = 'container';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('container');
                });
            });

            it('variant = brand', () => {
                element.variant = 'brand';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('brand');
                });
            });

            it('variant = border-filled', () => {
                element.variant = 'border-filled';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('border-filled');
                });
            });

            it('variant = bare-inverse', () => {
                element.variant = 'bare-inverse';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('bare-inverse');
                });
            });

            it('variant = border-inverse', () => {
                element.variant = 'border-inverse';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('border-inverse');
                });
            });
        });
    });

    describe('Method', () => {
        it('click', () => {
            let clickEvent = false;
            element.addEventListener('click', () => {
                clickEvent = true;
            });

            element.click();
            return Promise.resolve().then(() => {
                expect(clickEvent).toBeTruthy();
            });
        });

        it('focus', () => {
            let focusEvent = false;
            element.addEventListener('focus', () => {
                focusEvent = true;
            });

            element.focus();
            return Promise.resolve().then(() => {
                expect(focusEvent).toBeTruthy();
            });
        });

        it('show', () => {
            let showEvent = false;
            element.addEventListener('show', () => {
                showEvent = true;
            });

            element.show();
            return Promise.resolve().then(() => {
                expect(showEvent).toBeTruthy();
            });
        });

        it('hide', () => {
            let hideEvent = false;
            element.addEventListener('hide', () => {
                hideEvent = true;
            });

            element.hide();
            return Promise.resolve().then(() => {
                expect(hideEvent).toBeTruthy();
            });
        });
    });
});
