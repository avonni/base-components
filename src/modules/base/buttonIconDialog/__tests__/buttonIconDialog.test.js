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
            expect(element.cancelButtonLabel).toBe('Cancel');
            expect(element.disabled).toBeFalsy();
            expect(element.iconClass).toBeUndefined();
            expect(element.iconName).toBeUndefined();
            expect(element.iconSrc).toBeUndefined();
            expect(element.isButtonLoading).toBeFalsy();
            expect(element.loadingStateAlternativeText).toBe('Loading...');
            expect(element.saveButtonLabel).toBe('Save');
            expect(element.size).toBe('medium');
            expect(element.tooltip).toBeUndefined();
            expect(element.variant).toBe('border');
        });

        describe('Access Key', () => {
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
                element.disabled = true;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.disabled).toBeTruthy();
                });
            });
        });

        describe('Icon', () => {
            describe('Icon Class', () => {
                it('Passed to the component', () => {
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
                it('Passed to the component', () => {
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
                it('Passed to the component', () => {
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
                it('Xx-small', () => {
                    element.size = 'xx-small';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.size).toBe('xx-small');
                    });
                });

                it('X-small', () => {
                    element.size = 'x-small';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.size).toBe('x-small');
                    });
                });

                it('Small', () => {
                    element.size = 'small';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.size).toBe('small');
                    });
                });

                it('Medium', () => {
                    element.size = 'medium';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.size).toBe('medium');
                    });
                });

                it('Large for non bare', () => {
                    element.size = 'large';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.size).toBe('medium');
                    });
                });

                it('Large for bare', () => {
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

        describe('Is Button Loading', () => {
            it('Passed to the component', () => {
                element.isButtonLoading = true;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    expect(button.isButtonLoading).toBeTruthy();
                });
            });
        });

        describe('Loading State Alternative Text', () => {
            it('Passed to the component', () => {
                element.loadingStateAlternativeText = 'Loading';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    expect(button.loadingStateAlternativeText).toBe('Loading');
                });
            });
        });

        describe('Tooltip', () => {
            it('Passed to the component', () => {
                element.tooltip = 'This is a tooltip';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.tooltip).toBe('This is a tooltip');
                });
            });
        });

        describe('Variant', () => {
            it('Border', () => {
                element.variant = 'border';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('border');
                });
            });

            it('Bare', () => {
                element.variant = 'bare';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('bare');
                });
            });

            it('Container', () => {
                element.variant = 'container';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('container');
                });
            });

            it('Brand', () => {
                element.variant = 'brand';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('brand');
                });
            });

            it('Border-filled', () => {
                element.variant = 'border-filled';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('border-filled');
                });
            });

            it('Bare-inverse', () => {
                element.variant = 'bare-inverse';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('bare-inverse');
                });
            });

            it('Border-inverse', () => {
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
