import ButtonIconPopover from 'c/buttonIconPopover';
import { AutoPosition } from 'c/positionLibrary';
import { createElement } from 'lwc';

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
        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(), 0);
        });
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.accessKey).toBeUndefined();
            expect(element.alternativeText).toBeUndefined();
            expect(element.disabled).toBeFalsy();
            expect(element.hideCloseButton).toBeFalsy();
            expect(element.groupOrder).toBe('');
            expect(element.iconClass).toBeUndefined();
            expect(element.iconName).toBeUndefined();
            expect(element.iconSrc).toBeUndefined();
            expect(element.isButtonLoading).toBeFalsy();
            expect(element.isLoading).toBeFalsy();
            expect(element.loadingStateAlternativeText).toBe('Loading...');
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

        describe('Group Order', () => {
            it('Passed to the component', () => {
                element.groupOrder = 'first';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="button-icon"]'
                    );
                    expect(button.groupOrder).toBe('first');
                });
            });
        });

        describe('Hide Close Button', () => {
            it('Passed to the component', () => {
                element.hideCloseButton = true;
                const closeButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-close"]'
                );

                return Promise.resolve().then(() => {
                    expect(closeButton).toBeTruthy();
                    expect(closeButton.iconName).toBe('utility:close');
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
        });

        describe('Loading', () => {
            describe('Is Loading', () => {
                it('Passed to the component', () => {
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
                                element.shadowRoot.querySelector(
                                    'lightning-spinner'
                                );
                            expect(spinner).toBeTruthy();
                        });
                });
            });

            describe('Loading State Alternative Text', () => {
                it('Passed to the component', () => {
                    element.isLoading = true;
                    element.isButtonLoading = true;
                    element.loadingStateAlternativeText =
                        'This is a loading text';

                    return Promise.resolve()
                        .then(() => {
                            const button = element.shadowRoot.querySelector(
                                '[data-element-id="button-icon"]'
                            );
                            expect(button.isButtonLoading).toBeTruthy();
                            expect(button.loadingStateAlternativeText).toBe(
                                'This is a loading text'
                            );
                            button.focus();
                        })
                        .then(() => {
                            const spinner =
                                element.shadowRoot.querySelector(
                                    'lightning-spinner'
                                );
                            expect(spinner.alternativeText).toBe(
                                'This is a loading text'
                            );
                        });
                });
            });
        });

        describe('Popover', () => {
            describe('Popover Placement', () => {
                it('Left', () => {
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

                it('Auto', () => {
                    element.placement = 'auto';

                    const startPositioning = jest.spyOn(
                        AutoPosition.prototype,
                        'start'
                    );

                    return Promise.resolve()
                        .then(() => {
                            const button = element.shadowRoot.querySelector(
                                '[data-element-id="button-icon"]'
                            );
                            button.dispatchEvent(new CustomEvent('click'));
                        })
                        .then(() => {
                            jest.runAllTimers();
                            expect(startPositioning).toHaveBeenCalledTimes(1);

                            const stopPositioning = jest.spyOn(
                                AutoPosition.prototype,
                                'stop'
                            );
                            element.close();
                            expect(stopPositioning).toHaveBeenCalledTimes(1);
                        });
                });

                it('Center', () => {
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

                it('Right', () => {
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

                it('Bottom-left', () => {
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

                it('Bottom-right', () => {
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

                it('Bottom-center', () => {
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
                it('Small', () => {
                    element.triggers = 'focus';
                    element.popoverSize = 'small';

                    return Promise.resolve().then(() => {
                        const popover =
                            element.shadowRoot.querySelector('.slds-popover');
                        expect(popover.className).toContain(
                            'slds-popover_small'
                        );
                    });
                });

                it('Medium', () => {
                    element.triggers = 'focus';
                    element.popoverSize = 'medium';

                    return Promise.resolve().then(() => {
                        const popover =
                            element.shadowRoot.querySelector('.slds-popover');
                        expect(popover.className).toContain(
                            'slds-popover_medium'
                        );
                    });
                });

                it('Large', () => {
                    element.triggers = 'focus';
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
                it('Base', () => {
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

                it('Warning', () => {
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

                it('Error', () => {
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

                it('Walkthrough', () => {
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

        describe('Title', () => {
            it('Passed to the component', () => {
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

        describe('Triggers', () => {
            it('Focus', () => {
                element.iconName = 'utility:lock';
                element.triggers = 'focus';

                return Promise.resolve()
                    .then(() => {
                        element.focus();
                    })
                    .then(() => {
                        expect(element.classList).toContain('slds-is-open');
                        const popover =
                            element.shadowRoot.querySelector('.slds-show');
                        expect(popover).toBeTruthy();
                    });
            });

            it('Click', () => {
                element.triggers = 'click';

                return Promise.resolve()
                    .then(() => {
                        element.click();
                    })
                    .then(() => {
                        expect(element.classList).toContain('slds-is-open');
                        const popover =
                            element.shadowRoot.querySelector('.slds-show');
                        expect(popover).toBeTruthy();
                    });
            });

            it('Hover mouseenter', () => {
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

            it('Hover mouseleave', () => {
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
                        const popover = element.shadowRoot.querySelector(
                            '[data-element-id="div-popover"]'
                        );
                        expect(popover.classList).not.toContain('slds-show');
                    });
            });

            it('Click popoverblur', () => {
                element.triggers = 'click';

                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
                return Promise.resolve()
                    .then(() => {
                        element.click();
                        popover.dispatchEvent(new CustomEvent('blur'));
                    })
                    .then(() => {
                        expect(element.classList).not.toContain('slds-is-open');
                        expect(popover.classList).not.toContain('slds-show');
                    });
            });

            it('Hover popoverenter', () => {
                element.triggers = 'hover';

                const button = element.shadowRoot.querySelector(
                    '[data-element-id="button-icon"]'
                );
                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
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

            it('Hover popoverleave', () => {
                element.triggers = 'hover';

                const popover =
                    element.shadowRoot.querySelector('.slds-popover');
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

    describe('Methods', () => {
        it('click', () => {
            let clickEvent = false;
            element.addEventListener('click', () => {
                clickEvent = true;
            });

            return Promise.resolve()
                .then(() => {
                    element.click();
                })
                .then(() => {
                    expect(clickEvent).toBeTruthy();
                });
        });

        it('close', () => {
            let closeEvent = false;

            element.addEventListener('close', () => {
                closeEvent = true;
            });
            element.open();
            element.close();

            return Promise.resolve().then(() => {
                expect(closeEvent).toBeTruthy();
                expect(element.className).not.toContain('slds-is-open');
            });
        });

        it('open', () => {
            return Promise.resolve()
                .then(() => {
                    element.focus();
                    element.open();
                })
                .then(() => {
                    const popover =
                        element.shadowRoot.querySelector('.slds-popover');
                    expect(popover.className).toContain('slds-show');
                    expect(element.className).toContain('slds-is-open');
                });
        });
    });

    describe('Events', () => {
        it('click', () => {
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

        it('close & open', () => {
            const closeHandler = jest.fn();
            const openHandler = jest.fn();
            element.addEventListener('close', closeHandler);
            element.addEventListener('open', openHandler);

            return Promise.resolve()
                .then(() => {
                    element.click();
                    expect(openHandler).toHaveBeenCalled();
                    expect(openHandler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(openHandler.mock.calls[0][0].cancelable).toBeFalsy();
                    expect(openHandler.mock.calls[0][0].composed).toBeFalsy();
                })
                .then(() => {
                    element.click();
                    expect(closeHandler).toHaveBeenCalled();
                    expect(closeHandler.mock.calls[0][0].bubbles).toBeFalsy();
                    expect(
                        closeHandler.mock.calls[0][0].cancelable
                    ).toBeFalsy();
                    expect(closeHandler.mock.calls[0][0].composed).toBeFalsy();
                });
        });

        it('handlePopoverBlur dispatches close when clicking outside the popover', () => {
            const closeHandler = jest.fn();
            const openHandler = jest.fn();
            element.addEventListener('close', closeHandler);
            element.addEventListener('open', openHandler);

            return Promise.resolve()
                .then(() => {
                    element.click();
                    expect(openHandler).toHaveBeenCalled();
                })
                .then(() => {
                    const divPopover = element.shadowRoot.querySelector(
                        '[data-element-id="div-popover"]'
                    );
                    divPopover.dispatchEvent(
                        new FocusEvent('blur', {
                            relatedTarget: undefined
                        })
                    );
                    expect(closeHandler).toHaveBeenCalled();
                });
        });

        it('handlePopoverBlur does not dispatch close when clicking inside the popover', () => {
            const closeHandler = jest.fn();
            const openHandler = jest.fn();
            element.addEventListener('close', closeHandler);
            element.addEventListener('open', openHandler);
            const testDiv = document.createElement('div');
            testDiv.setAttribute('data-element-id', 'div-in-slot');
            testDiv.tabIndex = 0;

            element.appendChild(testDiv);

            return Promise.resolve()
                .then(() => {
                    element.click();
                    expect(openHandler).toHaveBeenCalled();
                })
                .then(() => {
                    const divPopover = element.shadowRoot.querySelector(
                        '[data-element-id="div-popover"]'
                    );
                    const divInSlot = element.shadowRoot.querySelector(
                        '[data-element-id="div-in-slot"]'
                    );

                    divPopover.dispatchEvent(
                        new FocusEvent('blur', {
                            relatedTarget: divInSlot
                        })
                    );
                    expect(closeHandler).not.toHaveBeenCalled();
                });
        });
    });
});
