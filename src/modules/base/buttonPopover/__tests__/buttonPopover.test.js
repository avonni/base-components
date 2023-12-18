import { createElement } from 'lwc';
import ButtonPopover from 'c/buttonPopover';

let element;
describe('Button Popover', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-button-popover', {
            is: ButtonPopover
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.accessKey).toBeUndefined();
            expect(element.disabled).toBeFalsy();
            expect(element.hideCloseButton).toBeFalsy();
            expect(element.iconName).toBeUndefined();
            expect(element.iconPosition).toBe('left');
            expect(element.iconSize).toBe('x-small');
            expect(element.iconSrc).toBeUndefined();
            expect(element.isLoading).toBeFalsy();
            expect(element.label).toBeUndefined();
            expect(element.loadingStateAlternativeText).toBe('Loading');
            expect(element.placement).toBe('left');
            expect(element.popoverSize).toBe('medium');
            expect(element.popoverVariant).toBe('base');
            expect(element.stretch).toBeFalsy();
            expect(element.title).toBeUndefined();
            expect(element.triggers).toBe('click');
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

        describe('Hide Close Button', () => {
            it('hideCloseButton', () => {
                return Promise.resolve().then(() => {
                    const closeButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon"]'
                    );
                    expect(closeButton.iconName).toBe('utility:close');
                });
            });

            it('hideCloseButton = true', () => {
                element.hideCloseButton = true;

                return Promise.resolve().then(() => {
                    const closeButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon"]'
                    );
                    expect(closeButton).toBeFalsy();
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
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.iconSize).toBe('x-small');
                    });
                });

                it('iconSize = small', () => {
                    element.iconName = 'utility:lock';
                    element.iconSize = 'small';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.iconSize).toBe('small');
                    });
                });

                it('iconSize = medium', () => {
                    element.iconName = 'utility:lock';
                    element.iconSize = 'medium';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.iconSize).toBe('medium');
                    });
                });

                it('iconSize = large', () => {
                    element.iconName = 'utility:lock';
                    element.iconSize = 'large';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.iconSize).toBe('large');
                    });
                });
            });

            describe('Icon Src', () => {
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

        describe('Is Loading', () => {
            it('is loading', () => {
                element.isLoading = true;

                return Promise.resolve().then(() => {
                    const spinner = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-spinner"]'
                    );
                    expect(spinner).toBeTruthy();
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

        describe('Loading State Alternative Text', () => {
            it('loadingStateAlternativeText', () => {
                element.isLoading = true;
                element.loadingStateAlternativeText = 'This is a loading text';

                return Promise.resolve().then(() => {
                    const spinner = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-spinner"]'
                    );
                    expect(spinner.alternativeText).toBe(
                        'This is a loading text'
                    );
                });
            });
        });

        describe('Popover', () => {
            describe('Placement', () => {
                it('placement = left', () => {
                    element.placement = 'left';

                    return Promise.resolve().then(() => {
                        const popover =
                            element.shadowRoot.querySelector('.slds-popover');
                        expect(popover.className).toContain(
                            'slds-nubbin_top-left'
                        );
                        expect(popover.className).toContain(
                            'slds-dropdown_left'
                        );
                    });
                });

                it('placement = auto', () => {
                    element.placement = 'auto';

                    return Promise.resolve().then(() => {
                        const popover =
                            element.shadowRoot.querySelector('.slds-popover');
                        expect(popover.className).toContain(
                            'slds-dropdown_left'
                        );
                    });
                });

                it('placement = center', () => {
                    element.placement = 'center';

                    return Promise.resolve().then(() => {
                        const popover =
                            element.shadowRoot.querySelector('.slds-popover');
                        expect(popover.className).toContain('slds-nubbin_top');
                        expect(popover.className).toContain(
                            'slds-dropdown_center'
                        );
                    });
                });

                it('placement = right', () => {
                    element.placement = 'right';

                    return Promise.resolve().then(() => {
                        const popover =
                            element.shadowRoot.querySelector('.slds-popover');
                        expect(popover.className).toContain(
                            'slds-nubbin_top-right'
                        );
                        expect(popover.className).toContain(
                            'slds-dropdown_right'
                        );
                    });
                });

                it('placement = bottom-left', () => {
                    element.placement = 'bottom-left';

                    return Promise.resolve().then(() => {
                        const popover =
                            element.shadowRoot.querySelector('.slds-popover');
                        expect(popover.className).toContain(
                            'slds-nubbin_bottom-left'
                        );
                        expect(popover.className).toContain(
                            'slds-dropdown_bottom'
                        );
                        expect(popover.className).toContain(
                            'slds-dropdown_left'
                        );
                        expect(popover.className).toContain(
                            'slds-dropdown_bottom-left'
                        );
                    });
                });

                it('placement = bottom-right', () => {
                    element.placement = 'bottom-right';

                    return Promise.resolve().then(() => {
                        const popover =
                            element.shadowRoot.querySelector('.slds-popover');
                        expect(popover.className).toContain(
                            'slds-nubbin_bottom-right'
                        );
                        expect(popover.className).toContain(
                            'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right'
                        );
                    });
                });

                it('placement = bottom-center', () => {
                    element.placement = 'bottom-center';

                    return Promise.resolve().then(() => {
                        const popover =
                            element.shadowRoot.querySelector('.slds-popover');
                        expect(popover.className).toContain(
                            'slds-nubbin_bottom'
                        );
                        expect(popover.className).toContain(
                            'slds-dropdown_bottom'
                        );
                    });
                });
            });

            describe('Popover Size', () => {
                it('popoverSize = small', () => {
                    element.popoverSize = 'small';

                    return Promise.resolve().then(() => {
                        const popover =
                            element.shadowRoot.querySelector('.slds-popover');
                        expect(popover.className).toContain(
                            'slds-popover_small'
                        );
                    });
                });

                it('popoverSize = medium', () => {
                    element.popoverSize = 'medium';

                    return Promise.resolve().then(() => {
                        const popover =
                            element.shadowRoot.querySelector('.slds-popover');
                        expect(popover.className).toContain(
                            'slds-popover_medium'
                        );
                    });
                });

                it('popoverSize = large', () => {
                    element.popoverSize = 'large';

                    return Promise.resolve().then(() => {
                        const popover =
                            element.shadowRoot.querySelector('.slds-popover');
                        expect(popover.className).toContain(
                            'slds-popover_large'
                        );
                    });
                });
            });

            describe('Popover Variant', () => {
                it('popoverVariant = base', () => {
                    return Promise.resolve().then(() => {
                        const popover =
                            element.shadowRoot.querySelector('.slds-popover');
                        expect(popover.className).not.toContain(
                            'slds-popover_warning'
                        );
                        expect(popover.className).not.toContain(
                            'slds-popover_error'
                        );
                        expect(popover.className).not.toContain(
                            'slds-popover_walkthrough'
                        );
                    });
                });

                it('popoverVariant = warning', () => {
                    element.popoverVariant = 'warning';

                    return Promise.resolve().then(() => {
                        const popover =
                            element.shadowRoot.querySelector('.slds-popover');
                        expect(popover.className).toContain(
                            'slds-popover_warning'
                        );
                        expect(popover.className).not.toContain(
                            'slds-popover_error'
                        );
                        expect(popover.className).not.toContain(
                            'slds-popover_walkthrough'
                        );
                    });
                });

                it('popoverVariant = error', () => {
                    element.popoverVariant = 'error';

                    return Promise.resolve().then(() => {
                        const popover =
                            element.shadowRoot.querySelector('.slds-popover');
                        expect(popover.className).not.toContain(
                            'slds-popover_warning'
                        );
                        expect(popover.className).toContain(
                            'slds-popover_error'
                        );
                        expect(popover.className).not.toContain(
                            'slds-popover_walkthrough'
                        );
                    });
                });

                it('popoverVariant = walkthrough', () => {
                    element.popoverVariant = 'walkthrough';

                    return Promise.resolve().then(() => {
                        const popover =
                            element.shadowRoot.querySelector('.slds-popover');
                        expect(popover.className).not.toContain(
                            'slds-popover_warning'
                        );
                        expect(popover.className).not.toContain(
                            'slds-popover_error'
                        );
                        expect(popover.className).toContain(
                            'slds-popover_walkthrough'
                        );
                    });
                });
            });
        });

        describe('Stretch', () => {
            it('stretch', () => {
                element.stretch = true;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button"]'
                    );
                    expect(button.stretch).toBeTruthy();
                });
            });
        });

        describe('Title', () => {
            it('title', () => {
                element.title = 'This is a popover Title';

                return Promise.resolve().then(() => {
                    const header = element.shadowRoot.querySelector(
                        '.slds-text-heading_small'
                    );
                    expect(header.textContent).toBe('This is a popover Title');
                });
            });
        });

        describe('Triggers', () => {
            it('triggers hover mouseenter', () => {
                element.triggers = 'hover';

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="button"]'
                        );
                        element.focus();
                        button.dispatchEvent(new CustomEvent('mouseenter'));
                    })
                    .then(() => {
                        expect(element.classList).toContain('slds-is-open');
                        const popover =
                            element.shadowRoot.querySelector('.slds-show');
                        expect(popover).toBeTruthy();
                    });
            });

            it('triggers hover mouseleave', () => {
                element.triggers = 'hover';

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                return Promise.resolve()
                    .then(() => {
                        element.focus();
                        button.dispatchEvent(new CustomEvent('mouseleave'));
                    })
                    .then(() => {
                        expect(element.classList).not.toContain('slds-is-open');
                        const popover =
                            element.shadowRoot.querySelector('.slds-show');
                        expect(popover).toBeFalsy();
                    });
            });

            it('triggers focus blur', () => {
                element.triggers = 'focus';

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                return Promise.resolve()
                    .then(() => {
                        button.focus();
                        element.focus();
                        button.dispatchEvent(new CustomEvent('blur'));
                    })
                    .then(() => {
                        expect(element.classList).not.toContain('slds-is-open');
                        const popover =
                            element.shadowRoot.querySelector('.slds-show');
                        expect(popover).toBeFalsy();
                    });
            });

            it('triggers click popoverblur', () => {
                element.triggers = 'click';
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                return Promise.resolve()
                    .then(() => {
                        element.focus();
                        element.click();
                        popover.dispatchEvent(new CustomEvent('blur'));
                    })
                    .then(() => {
                        expect(element.classList).not.toContain('slds-is-open');
                        expect(popover.classList).not.toContain('slds-show');
                    });
            });

            it('triggers hover popoverleave', () => {
                element.triggers = 'hover';

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                return Promise.resolve()
                    .then(() => {
                        element.focus();
                        button.click();
                        popover.dispatchEvent(new CustomEvent('mouseleave'));
                    })
                    .then(() => {
                        expect(element.classList).not.toContain('slds-is-open');
                        expect(popover.classList).not.toContain('slds-show');
                    });
            });

            it('triggers click slot click', () => {
                element.triggers = 'click';

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                const slot = element.shadowRoot.querySelector('slot');
                return Promise.resolve()
                    .then(() => {
                        element.focus();
                        button.click();
                        slot.dispatchEvent(new CustomEvent('click'));
                    })
                    .then(() => {
                        expect(element.classList).toContain('slds-is-open');
                        expect(popover.classList).toContain('slds-show');
                    });
            });
        });

        describe('Variant', () => {
            it('variant = neutral', () => {
                element.variant = 'neutral';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('neutral');
                });
            });

            it('variant = base', () => {
                element.variant = 'base';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('base');
                });
            });

            it('variant = brand', () => {
                element.variant = 'brand';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('brand');
                });
            });

            it('variant = brand-outline', () => {
                element.variant = 'brand-outline';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('brand-outline');
                });
            });

            it('variant = destructive', () => {
                element.variant = 'destructive';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('destructive');
                });
            });

            it('variant = destructive-text', () => {
                element.variant = 'destructive-text';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('destructive-text');
                });
            });

            it('variant = inverse', () => {
                element.variant = 'inverse';
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button"]'
                );

                return Promise.resolve().then(() => {
                    expect(button.variant).toBe('inverse');
                });
            });

            it('variant = success', () => {
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
        it('method click', () => {
            element.triggers = 'click';

            return Promise.resolve()
                .then(() => {
                    element.focus();
                    element.click();
                })
                .then(() => {
                    const popover =
                        element.shadowRoot.querySelector('.slds-popover');
                    expect(popover.className).toContain('slds-show');
                });
        });

        it('method focus', () => {
            element.triggers = 'focus';

            return Promise.resolve()
                .then(() => {
                    element.focus();
                    element.shadowRoot.querySelector('slot').click();
                })
                .then(() => {
                    const popover =
                        element.shadowRoot.querySelector('.slds-popover');
                    expect(popover.className).toContain('slds-show');
                });
        });

        it('method open', () => {
            element.label = 'Button Label';

            return Promise.resolve()
                .then(() => {
                    element.open();
                })
                .then(() => {
                    const popover =
                        element.shadowRoot.querySelector('.slds-popover');
                    expect(popover.className).toContain('slds-show');
                });
        });

        it('method close', () => {
            return Promise.resolve()
                .then(() => {
                    element.open();
                    element.close();
                })
                .then(() => {
                    const popover =
                        element.shadowRoot.querySelector('.slds-popover');
                    expect(popover.className).toContain('slds-hide');
                });
        });
    });

    describe('Events', () => {
        it('click', () => {
            element.label = 'Button Label';
            const handler = jest.fn();
            element.addEventListener('click', handler);

            return Promise.resolve().then(() => {
                element.click();

                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
            });
        });

        // button popover close
        it('event close', () => {
            const handler = jest.fn();
            element.addEventListener('close', handler);
            element.close();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
        });
    });
});
