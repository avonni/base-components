import { createElement } from 'lwc';
import ButtonIconPopover from 'c/buttonIconPopover';

let element;
describe('Button Icon Popover', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-button-icon-popover', {
            is: ButtonIconPopover
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.accessKey).toBeUndefined();
            expect(element.alternativeText).toBeUndefined();
            expect(element.disabled).toBeFalsy();
            expect(element.hideCloseButton).toBeFalsy();
            expect(element.iconClass).toBeUndefined();
            expect(element.iconName).toBeUndefined();
            expect(element.iconSrc).toBeUndefined();
            expect(element.isLoading).toBeFalsy();
            expect(element.loadingStateAlternativeText).toBe('Loading');
            expect(element.placement).toBe('left');
            expect(element.popoverSize).toBe('medium');
            expect(element.popoverVariant).toBe('base');
            expect(element.size).toBe('medium');
            expect(element.title).toBeUndefined();
            expect(element.tooltip).toBeUndefined();
            expect(element.triggers).toBe('click');
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

        // tooltip
        it('tooltip', () => {
            element.tooltip = 'This is a tooltip';
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button-icon"]'
            );

            return Promise.resolve().then(() => {
                expect(button.tooltip).toBe('This is a tooltip');
            });
        });

        // hide close button
        it('hide close button', () => {
            element.hideCloseButton = true;
            const closeButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-close"]'
            );

            return Promise.resolve().then(() => {
                expect(closeButton).toBeTruthy();
                expect(closeButton.iconName).toBe('utility:close');
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

            describe('Icon Size', () => {
                it('size xx-small', () => {
                    element.size = 'xx-small';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.size).toBe('xx-small');
                    });
                });

                it('size x-small', () => {
                    element.size = 'x-small';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.size).toBe('x-small');
                    });
                });

                it('size small', () => {
                    element.size = 'small';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.size).toBe('small');
                    });
                });

                it('size medium', () => {
                    element.size = 'medium';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.size).toBe('medium');
                    });
                });

                it('size large for non bare', () => {
                    element.size = 'large';
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );

                    return Promise.resolve().then(() => {
                        expect(button.size).toBe('medium');
                    });
                });

                it('size large for bare', () => {
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
        });

        // popover size
        it('popoverSize small', () => {
            element.triggers = 'focus';
            element.popoverSize = 'small';

            return Promise.resolve().then(() => {
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                expect(popover.className).toContain('slds-popover_small');
            });
        });

        it('popoverSize medium', () => {
            element.triggers = 'focus';
            element.popoverSize = 'medium';

            return Promise.resolve().then(() => {
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                expect(popover.className).toContain('slds-popover_medium');
            });
        });

        it('popoverSize large', () => {
            element.triggers = 'focus';
            element.popoverSize = 'large';

            return Promise.resolve().then(() => {
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                expect(popover.className).toContain('slds-popover_large');
            });
        });

        // popover variant
        it('variant = base', () => {
            return Promise.resolve().then(() => {
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                expect(popover.className).not.toContain('slds-popover_warning');
                expect(popover.className).not.toContain('slds-popover_error');
                expect(popover.className).not.toContain(
                    'slds-popover_walkthrough'
                );
            });
        });

        it('variant = warning', () => {
            element.popoverVariant = 'warning';

            return Promise.resolve().then(() => {
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                expect(popover.className).toContain('slds-popover_warning');
                expect(popover.className).not.toContain('slds-popover_error');
                expect(popover.className).not.toContain(
                    'slds-popover_walkthrough'
                );
            });
        });

        it('variant = error', () => {
            element.popoverVariant = 'error';

            return Promise.resolve().then(() => {
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                expect(popover.className).not.toContain('slds-popover_warning');
                expect(popover.className).toContain('slds-popover_error');
                expect(popover.className).not.toContain(
                    'slds-popover_walkthrough'
                );
            });
        });

        it('variant = walkthrough', () => {
            element.popoverVariant = 'walkthrough';

            return Promise.resolve().then(() => {
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                expect(popover.className).not.toContain('slds-popover_warning');
                expect(popover.className).not.toContain('slds-popover_error');
                expect(popover.className).toContain('slds-popover_walkthrough');
            });
        });

        // placement
        it('placement left', () => {
            element.placement = 'left';

            return Promise.resolve().then(() => {
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                expect(popover.className).toContain('slds-nubbin_top-left');
                expect(popover.className).toContain('slds-dropdown_left');
            });
        });

        it('placement auto', () => {
            element.placement = 'auto';

            return Promise.resolve().then(() => {
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                expect(popover.className).toContain('slds-dropdown_left');
            });
        });

        it('placement center', () => {
            element.placement = 'center';

            return Promise.resolve().then(() => {
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                expect(popover.className).toContain('slds-nubbin_top');
                expect(popover.className).toContain('slds-dropdown_center');
            });
        });

        it('placement right', () => {
            element.placement = 'right';

            return Promise.resolve().then(() => {
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                expect(popover.className).toContain('slds-nubbin_top-right');
                expect(popover.className).toContain('slds-dropdown_right');
            });
        });

        it('placement bottom-left', () => {
            element.placement = 'bottom-left';

            return Promise.resolve().then(() => {
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                expect(popover.className).toContain('slds-nubbin_bottom-left');
                expect(popover.className).toContain('slds-dropdown_bottom');
                expect(popover.className).toContain('slds-dropdown_left');
                expect(popover.className).toContain(
                    'slds-dropdown_bottom-left'
                );
            });
        });

        it('placement bottom-right', () => {
            element.placement = 'bottom-right';

            return Promise.resolve().then(() => {
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                expect(popover.className).toContain('slds-nubbin_bottom-right');
                expect(popover.className).toContain(
                    'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right'
                );
            });
        });

        it('placement bottom-center', () => {
            element.placement = 'bottom-center';

            return Promise.resolve().then(() => {
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                expect(popover.className).toContain('slds-nubbin_bottom');
                expect(popover.className).toContain('slds-dropdown_bottom');
            });
        });

        // is loading
        it('is loading', () => {
            element.isLoading = true;

            return Promise.resolve()
                .then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );
                    button.focus();
                })
                .then(() => {
                    const spinner =
                        element.shadowRoot.querySelector('lightning-spinner');
                    expect(spinner).toBeTruthy();
                });
        });

        // loading state alternative text
        it('loading state alternative text', () => {
            element.isLoading = true;
            element.loadingStateAlternativeText = 'This is a loading text';

            return Promise.resolve()
                .then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );
                    button.focus();
                })
                .then(() => {
                    const spinner =
                        element.shadowRoot.querySelector('lightning-spinner');
                    expect(spinner.alternativeText).toBe(
                        'This is a loading text'
                    );
                });
        });

        describe('Title', () => {
            it('title', () => {
                element.title = 'This is a popover Title';
                element.triggers = 'focus';

                return Promise.resolve().then(() => {
                    const header = element.shadowRoot.querySelector(
                        '.slds-text-heading_small'
                    );
                    expect(header.textContent).toBe('This is a popover Title');
                });
            });
        });
    });

    describe('Triggers', () => {
        it('triggers focus', () => {
            element.triggers = 'focus';

            return Promise.resolve()
                .then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );
                    button.focus();
                })
                .then(() => {
                    expect(element.classList).toContain('slds-is-open');
                    const popover =
                        element.shadowRoot.querySelector('.slds-show');
                    expect(popover).toBeTruthy();
                });
        });

        it('triggers click', () => {
            element.triggers = 'click';

            return Promise.resolve()
                .then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );
                    button.click();
                })
                .then(() => {
                    expect(element.classList).toContain('slds-is-open');
                    const popover =
                        element.shadowRoot.querySelector('.slds-show');
                    expect(popover).toBeTruthy();
                });
        });

        it('triggers hover mouseenter', () => {
            element.triggers = 'hover';

            const button = element.shadowRoot.querySelector(
                '[data-element-id="button-icon"]'
            );
            return Promise.resolve()
                .then(() => {
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
                '[data-element-id="button-icon"]'
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
                '[data-element-id="button-icon"]'
            );
            return Promise.resolve()
                .then(() => {
                    button.focus();
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

            const button = element.shadowRoot.querySelector(
                '[data-element-id="button-icon"]'
            );
            const popover = element.shadowRoot.querySelector('.slds-popover');
            return Promise.resolve()
                .then(() => {
                    button.click();
                    popover.dispatchEvent(new CustomEvent('blur'));
                })
                .then(() => {
                    expect(element.classList).not.toContain('slds-is-open');
                    expect(popover.classList).not.toContain('slds-show');
                });
        });

        it('triggers hover popoverenter', () => {
            element.triggers = 'hover';

            const button = element.shadowRoot.querySelector(
                '[data-element-id="button-icon"]'
            );
            const popover = element.shadowRoot.querySelector('.slds-popover');
            return Promise.resolve()
                .then(() => {
                    button.dispatchEvent(new CustomEvent('mouseenter'));
                    expect(element.classList).toContain('slds-is-open');
                })
                .then(() => {
                    popover.dispatchEvent(new CustomEvent('mouseenter'));
                })
                .then(() => {
                    expect(element.classList).toContain('slds-is-open');
                    expect(popover.classList).toContain('slds-show');
                });
        });

        it('triggers hover popoverleave', () => {
            element.triggers = 'hover';

            const popover = element.shadowRoot.querySelector('.slds-popover');
            return Promise.resolve()
                .then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );
                    button.click();
                    popover.dispatchEvent(new CustomEvent('mouseleave'));
                })
                .then(() => {
                    expect(element.classList).not.toContain('slds-is-open');
                    expect(popover.classList).not.toContain('slds-show');
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

    describe('Methods', () => {
        it('method click', () => {
            let clickEvent = false;
            element.addEventListener('click', () => {
                clickEvent = true;
            });

            element.click();
            return Promise.resolve().then(() => {
                expect(clickEvent).toBeTruthy();
            });
        });

        it('method focus', () => {
            const buttonIcon = element.shadowRoot.querySelector(
                '[data-element-id="button-icon"]'
            );

            let focusEvent = false;

            buttonIcon.addEventListener('focus', () => {
                focusEvent = true;
            });

            buttonIcon.focus();
            return Promise.resolve().then(() => {
                expect(focusEvent).toBeTruthy();
            });
        });

        it('method close', () => {
            let closeEvent = false;

            element.addEventListener('close', () => {
                closeEvent = true;
            });
            element.open();
            element.close();

            return Promise.resolve().then(() => {
                expect(closeEvent).toBeTruthy();
                const buttonIcon = element.shadowRoot.querySelector(
                    'lightning-button-icon'
                );
                expect(buttonIcon.getAttribute('aria-expanded')).toBe('false');
                expect(element.className).not.toContain('slds-is-open');
            });
        });

        it('method open', () => {
            return Promise.resolve()
                .then(() => {
                    element.focus();
                    element.open();
                })
                .then(() => {
                    const popover =
                        element.shadowRoot.querySelector('.slds-popover');
                    expect(popover.className).toContain('slds-show');
                    const buttonIcon = element.shadowRoot.querySelector(
                        'lightning-button-icon'
                    );
                    expect(buttonIcon.getAttribute('aria-expanded')).toBe(
                        'true'
                    );
                    expect(element.className).toContain('slds-is-open');
                });
        });
    });

    describe('Events', () => {
        // button popover click
        it('event click', () => {
            const handler = jest.fn();
            element.addEventListener('click', handler);
            const button = element.shadowRoot.querySelector(
                '[data-element-id="button-icon"]'
            );
            button.click();

            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            element.click();
        });

        // button icon popover close
        it('event close and open', () => {
            const closeHandler = jest.fn();
            const openHandler = jest.fn();
            element.addEventListener('close', closeHandler);
            element.addEventListener('open', openHandler);

            let button = element.shadowRoot.querySelector(
                '[data-element-id="button-icon"]'
            );
            button.click();
            expect(openHandler).toHaveBeenCalled();
            expect(openHandler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(openHandler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(openHandler.mock.calls[0][0].composed).toBeFalsy();

            return Promise.resolve().then(() => {
                button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );
                button.click();
                expect(closeHandler).toHaveBeenCalled();
                expect(closeHandler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(closeHandler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(closeHandler.mock.calls[0][0].composed).toBeFalsy();
            });
        });
    });
});
