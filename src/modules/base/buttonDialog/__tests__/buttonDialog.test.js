import ButtonDialog from 'c/buttonDialog';
import { createElement } from 'lwc';

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
            expect(element.cancelButtonLabel).toBe('Cancel');
            expect(element.disabled).toBeFalsy();
            expect(element.groupOrder).toBe('');
            expect(element.iconName).toBeUndefined();
            expect(element.iconPosition).toBe('left');
            expect(element.iconSize).toBe('x-small');
            expect(element.iconSrc).toBeUndefined();
            expect(element.isButtonLoading).toBeFalsy();
            expect(element.label).toBeUndefined();
            expect(element.loadingStateAlternativeText).toBe('Loading...');
            expect(element.saveButtonLabel).toBe('Save');
            expect(element.stretch).toBeFalsy();
            expect(element.variant).toBe('neutral');
        });

        describe('Access Key', () => {
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
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
            it('Passed to the component', () => {
                element.disabled = true;
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.disabled).toBeTruthy();
                });
            });
        });

        describe('Group Order', () => {
            it('Passed to the component', () => {
                element.groupOrder = 'first';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.groupOrder).toBe('first');
                });
            });
        });

        describe('Icon', () => {
            describe('Icon Name', () => {
                it('Passed to the component', () => {
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
                it('Left', () => {
                    element.iconName = 'utility:lock';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.iconPosition).toBe('left');
                    });
                });

                it('Right', () => {
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
                it('X-small', () => {
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
                it('Passed to the component', () => {
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

        describe('Is Button Loading', () => {
            it('Passed to the component', () => {
                element.isButtonLoading = true;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    expect(button.isButtonLoading).toBeTruthy();
                });
            });
        });

        describe('Label', () => {
            it('Passed to the component', () => {
                element.label = 'Button Label';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.label).toBe('Button Label');
                });
            });
        });

        describe('Loading State Alternative Text', () => {
            it('Passed to the component', () => {
                element.loadingStateAlternativeText = 'Loading';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    expect(button.loadingStateAlternativeText).toBe('Loading');
                });
            });
        });

        describe('Stretch', () => {
            it('Passed to the component', () => {
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
            it('Bare', () => {
                element.variant = 'bare';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('bare');
                });
            });

            it('Bare-inverse', () => {
                element.variant = 'bare-inverse';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('bare-inverse');
                });
            });

            it('Base', () => {
                element.variant = 'base';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('base');
                });
            });

            it('Border', () => {
                element.variant = 'border';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('border');
                });
            });

            it('Border-filled', () => {
                element.variant = 'border-filled';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('border-filled');
                });
            });

            it('Border-inverse', () => {
                element.variant = 'border-inverse';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('border-inverse');
                });
            });

            it('Brand', () => {
                element.variant = 'brand';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('brand');
                });
            });

            it('Brand-outline', () => {
                element.variant = 'brand-outline';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('brand-outline');
                });
            });

            it('Destructive', () => {
                element.variant = 'destructive';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('destructive');
                });
            });

            it('Destructive-text', () => {
                element.variant = 'destructive-text';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('destructive-text');
                });
            });

            it('Inverse', () => {
                element.variant = 'inverse';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('inverse');
                });
            });

            it('Neutral', () => {
                element.variant = 'neutral';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('neutral');
                });
            });

            it('Success', () => {
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
