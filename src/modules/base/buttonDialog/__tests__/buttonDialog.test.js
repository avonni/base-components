import { createElement } from 'lwc';
import ButtonDialog from 'c/buttonDialog';

let element;
describe('Button Dialog', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-button-dialog', {
            is: ButtonDialog
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.accessKey).toBeUndefined();
            expect(element.alternativeText).toBeUndefined();
            expect(element.disabled).toBeFalsy();
            expect(element.iconName).toBeUndefined();
            expect(element.iconPosition).toBe('left');
            expect(element.iconSize).toBe('x-small');
            expect(element.iconSrc).toBeUndefined();
            expect(element.label).toBeUndefined();
            expect(element.stretch).toBeFalsy();
            expect(element.variant).toBe('neutral');
        });

        describe('Access Key', () => {
            it('accessKey', () => {
                element.accessKey = 'K';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.accessKey).toBe('K');
                });
            });
        });

        describe('Alternative Text', () => {
            it('alternativeText', () => {
                element.alternativeText = 'This is an alternative text';

                return Promise.resolve().then(() => {
                    const assistiveText = element.shadowRoot.querySelector(
                        '.slds-assistive-text'
                    );
                    expect(assistiveText.textContent).toBe(
                        'This is an alternative text'
                    );
                });
            });
        });

        describe('Disabled', () => {
            it('disabled', () => {
                element.disabled = true;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.disabled).toBeTruthy();
                });
            });
        });

        describe('Icon', () => {
            describe('Icon Name', () => {
                it('iconName', () => {
                    element.iconName = 'utility:lock';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.iconName).toBe('utility:lock');
                    });
                });
            });

            describe('Icon Position', () => {
                it('iconPosition = left', () => {
                    element.iconName = 'utility:lock';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.iconPosition).toBe('left');
                    });
                });

                it('iconPosition = right', () => {
                    element.iconName = 'utility:lock';
                    element.iconPosition = 'right';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.iconPosition).toBe('right');
                    });
                });
            });

            describe('Icon Size', () => {
                it('iconSize = x-small', () => {
                    element.iconName = 'utility:lock';
                    element.iconSize = 'x-small';

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );

                        expect(button.iconSize).toBe('x-small');
                    });
                });
            });

            describe('Icon Source', () => {
                it('iconSrc', () => {
                    element.iconSrc =
                        'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.iconSrc).toBe(
                            'https://www.lightningdesignsystem.com/assets/images/avatar2.jpg'
                        );
                    });
                });
            });
        });

        describe('Label', () => {
            it('label', () => {
                element.label = 'Button Label';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.label).toBe('Button Label');
                });
            });
        });

        describe('Stretch', () => {
            it('stretch', () => {
                element.stretch = true;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.stretch).toBeTruthy();
                });
            });
        });

        describe('Variant', () => {
            it('bare', () => {
                element.variant = 'bare';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('bare');
                });
            });

            it('bare-inverse', () => {
                element.variant = 'bare-inverse';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('bare-inverse');
                });
            });

            it('base', () => {
                element.variant = 'base';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('base');
                });
            });

            it('border', () => {
                element.variant = 'border';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('border');
                });
            });

            it('border-filled', () => {
                element.variant = 'border-filled';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('border-filled');
                });
            });

            it('border-inverse', () => {
                element.variant = 'border-inverse';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('border-inverse');
                });
            });

            it('brand', () => {
                element.variant = 'brand';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('brand');
                });
            });

            it('brand-outline', () => {
                element.variant = 'brand-outline';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('brand-outline');
                });
            });

            it('destructive', () => {
                element.variant = 'destructive';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('destructive');
                });
            });

            it('destructive-text', () => {
                element.variant = 'destructive-text';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('destructive-text');
                });
            });

            it('inverse', () => {
                element.variant = 'inverse';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('inverse');
                });
            });

            it('neutral', () => {
                element.variant = 'neutral';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('neutral');
                });
            });

            it('success', () => {
                element.variant = 'success';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('success');
                });
            });
        });
    });

    describe('Methods', () => {
        describe('Click', () => {
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
        });

        describe('Focus', () => {
            it('focus', () => {
                element.label = 'Button Label';

                const handler = jest.fn();
                element.addEventListener('focus', handler);

                return Promise.resolve().then(() => {
                    element.focus();

                    expect(handler).toHaveBeenCalled();
                });
            });
        });

        describe('Hide', () => {
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

        describe('Show', () => {
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
        });
    });
});
