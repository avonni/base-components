

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

    it('Button Icon Popover: Default attributes', () => {
        expect(element.accessKey).toBeUndefined();
        expect(element.alternativeText).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.variant).toBe('border');
        expect(element.size).toBe('medium');
        expect(element.tooltip).toBeUndefined();
        expect(element.hideCloseButton).toBeFalsy();
        expect(element.iconClass).toBeUndefined();
        expect(element.iconName).toBeUndefined();
        expect(element.title).toBeUndefined();
        expect(element.popoverSize).toBe('medium');
        expect(element.placement).toBe('left');
        expect(element.isLoading).toBeFalsy();
        expect(element.loadingStateAlternativeText).toBe('Loading');
        expect(element.triggers).toBe('click');
        expect(element.popoverVariant).toBe('base');
    });

    /* ----- ATTRIBUTES ----- */

    // access-key
    it('Button Icon Popover: access-key', () => {
        element.accessKey = 'K';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.accessKey).toBe('K');
        });
    });

    // alternative-text
    it('Button Icon Popover: alternative-text', () => {
        element.alternativeText = 'This is an alternative text';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.alternativeText).toBe('This is an alternative text');
        });
    });

    // disabled
    it('Button Icon Popover: disabled', () => {
        element.disabled = true;
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.disabled).toBeTruthy();
        });
    });

    // variant
    it('Button Icon Popover: variant border', () => {
        element.variant = 'border';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('border');
        });
    });

    it('Button Icon Popover: variant bare', () => {
        element.variant = 'bare';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('bare');
        });
    });

    it('Button Icon Popover: variant container', () => {
        element.variant = 'container';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('container');
        });
    });

    it('Button Icon Popover: variant brand', () => {
        element.variant = 'brand';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('brand');
        });
    });

    it('Button Icon Popover: variant border-filled', () => {
        element.variant = 'border-filled';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('border-filled');
        });
    });

    it('Button Icon Popover: variant bare-inverse', () => {
        element.variant = 'bare-inverse';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('bare-inverse');
        });
    });

    it('Button Icon Popover: variant border-inverse', () => {
        element.variant = 'border-inverse';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.variant).toBe('border-inverse');
        });
    });

    // size
    it('Button Icon Popover: size xx-small', () => {
        element.size = 'xx-small';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('xx-small');
        });
    });

    it('Button Icon Popover: size x-small', () => {
        element.size = 'x-small';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('x-small');
        });
    });

    it('Button Icon Popover: size small', () => {
        element.size = 'small';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('small');
        });
    });

    it('Button Icon Popover: size medium', () => {
        element.size = 'medium';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('medium');
        });
    });

    it('Button Icon Popover: size large for non bare', () => {
        element.size = 'large';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('medium');
        });
    });

    it('Button Icon Popover: size large for bare', () => {
        element.variant = 'bare';
        element.size = 'large';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.size).toBe('large');
        });
    });

    // tooltip
    it('Button Icon Popover: tooltip', () => {
        element.tooltip = 'This is a tooltip';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.tooltip).toBe('This is a tooltip');
        });
    });

    // hide close button
    it('Button Icon Popover: hide close button', () => {
        element.hideCloseButton = true;
        const closeButton = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-close"]'
        );

        return Promise.resolve().then(() => {
            expect(closeButton).toBeTruthy();
            expect(closeButton.iconName).toBe('utility:close');
        });
    });

    // icon class
    it('Button Icon Popover: icon class', () => {
        element.iconClass = 'button-dialog-icon-class';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );

        return Promise.resolve().then(() => {
            expect(button.iconClass).toBe('button-dialog-icon-class');
        });
    });

    // icon name
    it('Button Icon Popover: icon name', () => {
        element.iconName = 'utility:lock';
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );
        return Promise.resolve().then(() => {
            expect(button.iconName).toBe('utility:lock');
        });
    });

    // title
    it('Button Icon Popover: title', () => {
        element.title = 'This is a popover Title';
        element.triggers = 'focus';

        return Promise.resolve().then(() => {
            const header = element.shadowRoot.querySelector(
                '.slds-text-heading_small'
            );
            expect(header.textContent).toBe('This is a popover Title');
        });
    });

    // popover size
    it('Button Icon Popover: popoverSize small', () => {
        element.triggers = 'focus';
        element.popoverSize = 'small';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.className).toContain('slds-popover_small');
        });
    });

    it('Button Icon Popover: popoverSize medium', () => {
        element.triggers = 'focus';
        element.popoverSize = 'medium';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.className).toContain('slds-popover_medium');
        });
    });

    it('Button Icon Popover: popoverSize large', () => {
        element.triggers = 'focus';
        element.popoverSize = 'large';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.className).toContain('slds-popover_large');
        });
    });

    // popover variant
    it('Button Icon Popover: variant base', () => {
        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.className).not.toContain('slds-popover_warning');
            expect(popover.className).not.toContain('slds-popover_error');
            expect(popover.className).not.toContain('slds-popover_walkthrough');
        });
    });

    it('Button Icon Popover: variant warning', () => {
        element.popoverVariant = 'warning';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.className).toContain('slds-popover_warning');
            expect(popover.className).not.toContain('slds-popover_error');
            expect(popover.className).not.toContain('slds-popover_walkthrough');
        });
    });

    it('Button Icon Popover: variant error', () => {
        element.popoverVariant = 'error';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.className).not.toContain('slds-popover_warning');
            expect(popover.className).toContain('slds-popover_error');
            expect(popover.className).not.toContain('slds-popover_walkthrough');
        });
    });

    it('Button Icon Popover: variant walkthrough', () => {
        element.popoverVariant = 'walkthrough';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.className).not.toContain('slds-popover_warning');
            expect(popover.className).not.toContain('slds-popover_error');
            expect(popover.className).toContain('slds-popover_walkthrough');
        });
    });

    // placement
    it('Button Icon Popover: placement left', () => {
        element.placement = 'left';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.className).toContain('slds-nubbin_top-left');
            expect(popover.className).toContain('slds-dropdown_left');
        });
    });

    it('Button Icon Popover: placement auto', () => {
        element.placement = 'auto';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.className).toContain('slds-dropdown_left');
        });
    });

    it('Button Icon Popover: placement center', () => {
        element.placement = 'center';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.className).toContain('slds-nubbin_top');
            expect(popover.className).toContain('slds-dropdown_center');
        });
    });

    it('Button Icon Popover: placement right', () => {
        element.placement = 'right';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.className).toContain('slds-nubbin_top-right');
            expect(popover.className).toContain('slds-dropdown_right');
        });
    });

    it('Button Icon Popover: placement bottom-left', () => {
        element.placement = 'bottom-left';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.className).toContain('slds-nubbin_bottom-left');
            expect(popover.className).toContain('slds-dropdown_bottom');
            expect(popover.className).toContain('slds-dropdown_left');
            expect(popover.className).toContain('slds-dropdown_bottom-left');
        });
    });

    it('Button Icon Popover: placement bottom-right', () => {
        element.placement = 'bottom-right';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.className).toContain('slds-nubbin_bottom-right');
            expect(popover.className).toContain(
                'slds-dropdown_bottom slds-dropdown_right slds-dropdown_bottom-right'
            );
        });
    });

    it('Button Icon Popover: placement bottom-center', () => {
        element.placement = 'bottom-center';

        return Promise.resolve().then(() => {
            const popover = element.shadowRoot.querySelector('.slds-popover');
            expect(popover.className).toContain('slds-nubbin_bottom');
            expect(popover.className).toContain('slds-dropdown_bottom');
        });
    });

    // is loading
    it('Button Icon Popover: is loading', () => {
        element.isLoading = true;

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
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
    it('Button Icon Popover: loading state alternative text', () => {
        element.isLoading = true;
        element.loadingStateAlternativeText = 'This is a loading text';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                button.focus();
            })
            .then(() => {
                const spinner =
                    element.shadowRoot.querySelector('lightning-spinner');
                expect(spinner.alternativeText).toBe('This is a loading text');
            });
    });

    // triggers
    it('Button Icon Popover: triggers focus', () => {
        element.triggers = 'focus';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                button.focus();
            })
            .then(() => {
                expect(element.classList).toContain('slds-is-open');
                const popover = element.shadowRoot.querySelector('.slds-show');
                expect(popover).toBeTruthy();
            });
    });

    it('Button Icon Popover: triggers click', () => {
        element.triggers = 'click';

        return Promise.resolve()
            .then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-main"]'
                );
                button.click();
            })
            .then(() => {
                expect(element.classList).toContain('slds-is-open');
                const popover = element.shadowRoot.querySelector('.slds-show');
                expect(popover).toBeTruthy();
            });
    });

    it('Button Icon Popover: triggers hover mouseenter', () => {
        element.triggers = 'hover';

        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );
        return Promise.resolve()
            .then(() => {
                button.dispatchEvent(new CustomEvent('mouseenter'));
            })
            .then(() => {
                expect(element.classList).toContain('slds-is-open');
                const popover = element.shadowRoot.querySelector('.slds-show');
                expect(popover).toBeTruthy();
            });
    });

    it('Button Icon Popover: triggers hover mouseleave', () => {
        element.triggers = 'hover';

        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );
        return Promise.resolve()
            .then(() => {
                element.focus();
                button.dispatchEvent(new CustomEvent('mouseleave'));
            })
            .then(() => {
                expect(element.classList).not.toContain('slds-is-open');
                const popover = element.shadowRoot.querySelector('.slds-show');
                expect(popover).toBeFalsy();
            });
    });

    it('Button Icon Popover: triggers focus blur', () => {
        element.triggers = 'focus';

        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );
        return Promise.resolve()
            .then(() => {
                button.focus();
                button.dispatchEvent(new CustomEvent('blur'));
            })
            .then(() => {
                expect(element.classList).not.toContain('slds-is-open');
                const popover = element.shadowRoot.querySelector('.slds-show');
                expect(popover).toBeFalsy();
            });
    });

    it('Button Icon Popover: triggers click popoverblur', () => {
        element.triggers = 'click';

        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
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

    it('Button Icon Popover: triggers hover popoverenter', () => {
        element.triggers = 'hover';

        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
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

    it('Button Icon Popover: triggers hover popoverleave', () => {
        element.triggers = 'hover';

        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );
        const popover = element.shadowRoot.querySelector('.slds-popover');
        return Promise.resolve()
            .then(() => {
                button.click();
                popover.dispatchEvent(new CustomEvent('mouseleave'));
            })
            .then(() => {
                expect(element.classList).not.toContain('slds-is-open');
                expect(popover.classList).not.toContain('slds-show');
            });
    });

    /* ---- METHODS ----- */
    it('Button Icon Popover: method click', () => {
        let clickEvent = false;
        element.addEventListener('click', () => {
            clickEvent = true;
        });

        element.click();
        return Promise.resolve().then(() => {
            expect(clickEvent).toBeTruthy();
        });
    });

    it('Button Icon Popover: method focus', () => {
        const buttonIcon = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
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

    it('Button Icon Popover: method close', () => {
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

    it('Button Icon Popover: method open', () => {
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
                expect(buttonIcon.getAttribute('aria-expanded')).toBe('true');
                expect(element.className).toContain('slds-is-open');
            });
    });

    /* ----- EVENTS ----- */

    // button popover click
    it('Button Icon Popover: event click', () => {
        const handler = jest.fn();
        element.addEventListener('click', handler);
        const button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );
        button.click();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
        element.click();
    });

    // button icon popover close
    it('Button icon Popover: event close and open', () => {
        const closeHandler = jest.fn();
        const openHandler = jest.fn();
        element.addEventListener('close', closeHandler);
        element.addEventListener('open', openHandler);

        let button = element.shadowRoot.querySelector(
            '[data-element-id="lightning-button-icon-main"]'
        );
        button.click();
        expect(openHandler).toHaveBeenCalled();
        expect(openHandler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(openHandler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(openHandler.mock.calls[0][0].composed).toBeFalsy();

        return Promise.resolve().then(() => {
            button = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-main"]'
            );
            button.click();
            expect(closeHandler).toHaveBeenCalled();
            expect(closeHandler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(closeHandler.mock.calls[0][0].cancelable).toBeFalsy();
            expect(closeHandler.mock.calls[0][0].composed).toBeFalsy();
        });
    });
});
