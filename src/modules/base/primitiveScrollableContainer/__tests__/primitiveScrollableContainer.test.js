import { createElement } from '@lwc/engine-dom';
import { callObserver } from 'c/resizeObserver';
import PrimitiveScrollableContainer from '../primitiveScrollableContainer';

let element;
describe('Primitive Scrollable Container', () => {
    beforeEach(() => {
        element = createElement('test-avonni-primitive-scrollable-container', {
            is: PrimitiveScrollableContainer
        });
        document.body.appendChild(element);
        const mainElement = element.shadowRoot.querySelector(
            '[data-element-id="div-main"]'
        );
        jest.spyOn(mainElement, 'scrollWidth', 'get').mockReturnValue(1000);
        jest.spyOn(mainElement, 'clientWidth', 'get').mockReturnValue(500);
        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(), 0);
        });
    });

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.disabled).toBeFalsy();
            expect(element.menuVariant).toBe('base');
            expect(element.scrollLeftButtonAlternativeText).toBe('Scroll Left');
            expect(element.scrollRightButtonAlternativeText).toBe(
                'Scroll Right'
            );
            expect(element.showMenu).toBeFalsy();
            expect(element.showScrollButtons).toBeFalsy();
        });

        describe('Disabled', () => {
            it('false', () => {
                element.disabled = false;
                element.showScrollButtons = true;

                return Promise.resolve().then(() => {
                    const main = element.shadowRoot.querySelector(
                        '[data-element-id="div-main"]'
                    );
                    expect(main.classList).toContain('slds-scrollable_x');

                    const leftButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-left"]'
                    );
                    const rightButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-right"]'
                    );
                    expect(leftButton.disabled).toBeFalsy();
                    expect(rightButton.disabled).toBeFalsy();
                });
            });

            it('true', () => {
                element.disabled = true;
                element.showScrollButtons = true;

                return Promise.resolve().then(() => {
                    const main = element.shadowRoot.querySelector(
                        '[data-element-id="div-main"]'
                    );
                    expect(main.classList).not.toContain('slds-scrollable_x');

                    const leftButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-left"]'
                    );
                    const rightButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-right"]'
                    );
                    expect(leftButton.disabled).toBeTruthy();
                    expect(rightButton.disabled).toBeTruthy();
                });
            });
        });

        describe('Menu variant', () => {
            it('Passed to the component', () => {
                element.showMenu = true;
                element.menuVariant = 'brand';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-show-more"]'
                    );
                    expect(button.variant).toBe('brand');
                });
            });
        });

        describe('Scroll left button alternative text', () => {
            it('Passed to the component', () => {
                element.showScrollButtons = true;
                element.scrollLeftButtonAlternativeText =
                    'This is a scroll left button alternative text';

                return Promise.resolve().then(() => {
                    const leftButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-left"]'
                    );
                    expect(leftButton.alternativeText).toBe(
                        'This is a scroll left button alternative text'
                    );
                });
            });
        });

        describe('Scroll right button alternative text', () => {
            it('Passed to the component', () => {
                element.showScrollButtons = true;
                element.scrollRightButtonAlternativeText =
                    'This is a scroll right button alternative text';

                return Promise.resolve().then(() => {
                    const rightButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-right"]'
                    );
                    expect(rightButton.alternativeText).toBe(
                        'This is a scroll right button alternative text'
                    );
                });
            });
        });

        describe('Show Menu', () => {
            it('false', () => {
                element.showMenu = false;
                element.showScrollButtons = true;

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-show-more"]'
                    );
                    expect(button).toBeFalsy();

                    const main = element.shadowRoot.querySelector(
                        '[data-element-id="div-main"]'
                    );
                    const mainContent = element.shadowRoot.querySelector(
                        '[data-element-id="div-main-content"]'
                    );
                    expect(main.classList).toContain('slds-scrollable_x');
                    expect(main.classList).not.toContain('slds-grid');
                    expect(mainContent.className).toBeFalsy();

                    const leftButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-left"]'
                    );
                    const rightButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-right"]'
                    );
                    expect(leftButton).toBeTruthy();
                    expect(rightButton).toBeTruthy();
                });
            });

            describe('True', () => {
                it('Content is not scrollable', () => {
                    element.showMenu = true;
                    element.showScrollButtons = true;

                    return Promise.resolve().then(() => {
                        const main = element.shadowRoot.querySelector(
                            '[data-element-id="div-main"]'
                        );
                        const mainContent = element.shadowRoot.querySelector(
                            '[data-element-id="div-main-content"]'
                        );
                        expect(main.classList).not.toContain(
                            'slds-scrollable_x'
                        );
                        expect(main.classList).toContain('slds-grid');
                        expect(mainContent.className).toBe(
                            'slds-col slds-has-flexi-truncate'
                        );

                        const leftButton = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-icon-left"]'
                        );
                        const rightButton = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-icon-right"]'
                        );
                        expect(leftButton).toBeFalsy();
                        expect(rightButton).toBeFalsy();
                    });
                });

                it('Menu is visible', () => {
                    element.showMenu = true;

                    return Promise.resolve().then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-show-more"]'
                        );
                        expect(button).toBeTruthy();
                        const menu = element.shadowRoot.querySelector(
                            '[data-element-id="div-hidden-content"]'
                        );
                        expect(menu.classList).toContain('slds-hide');
                        const focusTrap = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-focus-trap"]'
                        );
                        expect(focusTrap).toBeTruthy();
                        const focusSpy = jest.spyOn(focusTrap, 'focus');

                        const instructions = element.shadowRoot.querySelector(
                            '[data-element-id="span-instructions"]'
                        );
                        expect(instructions.textContent).toBeFalsy();

                        button.click();
                        expect(focusSpy).toHaveBeenCalled();
                        expect(instructions.textContent).toBe(
                            'Press escape to close this menu.'
                        );
                        expect(menu.classList).not.toContain('slds-hide');
                    });
                });

                it('Menu is closed when focus is lost', () => {
                    element.showMenu = true;

                    return Promise.resolve().then(() => {
                        const menu = element.shadowRoot.querySelector(
                            '[data-element-id="div-hidden-content"]'
                        );
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-show-more"]'
                        );
                        button.click();
                        const focusSpy = jest.spyOn(button, 'focus');

                        // Quick focus in and out does not close the menu
                        const focusTrap = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-focus-trap"]'
                        );
                        focusTrap.dispatchEvent(
                            new CustomEvent('focusout', { bubbles: true })
                        );
                        focusTrap.dispatchEvent(
                            new CustomEvent('focusin', { bubbles: true })
                        );
                        jest.runAllTimers();
                        expect(menu.classList).not.toContain('slds-hide');
                        expect(focusSpy).not.toHaveBeenCalled();

                        // Focus out without focusing closes the menu
                        focusTrap.dispatchEvent(
                            new CustomEvent('focusout', { bubbles: true })
                        );
                        jest.runAllTimers();
                        expect(menu.classList).toContain('slds-hide');
                        expect(focusSpy).toHaveBeenCalled();
                    });
                });

                it('Menu is closed when pressing escape', () => {
                    element.showMenu = true;

                    return Promise.resolve().then(() => {
                        const menu = element.shadowRoot.querySelector(
                            '[data-element-id="div-hidden-content"]'
                        );
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-show-more"]'
                        );
                        button.click();

                        const focusTrap = element.shadowRoot.querySelector(
                            '[data-element-id="avonni-focus-trap"]'
                        );
                        const event = new CustomEvent('keyup', {
                            bubbles: true
                        });
                        event.key = 'Escape';
                        focusTrap.dispatchEvent(event);
                        expect(menu.classList).toContain('slds-hide');
                    });
                });
            });
        });

        describe('Show scroll buttons', () => {
            it('false', () => {
                element.showScrollButtons = false;

                return Promise.resolve().then(() => {
                    const leftButton = element.shadowRoot.querySelector(
                        '[data-element-id="div-scroll-left-button"]'
                    );
                    const rightButton = element.shadowRoot.querySelector(
                        '[data-element-id="div-scroll-right-button"]'
                    );
                    expect(leftButton).toBeNull();
                    expect(rightButton).toBeNull();
                });
            });

            it('true', () => {
                element.showScrollButtons = true;

                return Promise.resolve().then(() => {
                    const leftButton = element.shadowRoot.querySelector(
                        '[data-element-id="div-scroll-left-button"]'
                    );
                    const rightButton = element.shadowRoot.querySelector(
                        '[data-element-id="div-scroll-right-button"]'
                    );
                    expect(leftButton).toBeTruthy();
                    expect(rightButton).toBeTruthy();
                });
            });
        });
    });

    describe('Methods', () => {
        it('Close menu', () => {
            element.showMenu = true;

            return Promise.resolve().then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-show-more"]'
                );
                button.click();

                const menu = element.shadowRoot.querySelector(
                    '[data-element-id="div-hidden-content"]'
                );
                expect(menu.classList).not.toContain('slds-hide');

                element.closeMenu();
                expect(menu.classList).toContain('slds-hide');
            });
        });
    });

    describe('Events', () => {
        describe('Width change', () => {
            it('On show menu attribute change', () => {
                const handler = jest.fn();
                element.addEventListener('widthchange', handler);
                element.showMenu = true;

                jest.runAllTimers();
                expect(handler).toHaveBeenCalledTimes(1);
                const call = handler.mock.calls[0][0];
                expect(call.detail.availableWidth).toBe(400);
            });

            it('On resize', () => {
                const handler = jest.fn();
                element.addEventListener('widthchange', handler);
                callObserver();

                expect(handler).toHaveBeenCalledTimes(1);
                const call = handler.mock.calls[0][0];
                expect(call.detail.availableWidth).toBe(500);
            });
        });
    });

    describe('User interactions', () => {
        describe('Scroll', () => {
            it('Update buttons visibility on scroll', () => {
                element.showScrollButtons = true;

                return Promise.resolve().then(() => {
                    // Initial state:
                    // Left button is hidden, right button is visible
                    const leftButton = element.shadowRoot.querySelector(
                        '[data-element-id="div-scroll-left-button"]'
                    );
                    const rightButton = element.shadowRoot.querySelector(
                        '[data-element-id="div-scroll-right-button"]'
                    );
                    expect(leftButton.classList).toContain('slds-hide');
                    expect(rightButton.classList).not.toContain('slds-hide');

                    // Scroll a little to the right:
                    // both buttons are visible
                    const mainElement = element.shadowRoot.querySelector(
                        '[data-element-id="div-main"]'
                    );
                    jest.spyOn(
                        mainElement,
                        'scrollLeft',
                        'get'
                    ).mockReturnValueOnce(100);
                    mainElement.dispatchEvent(new CustomEvent('scroll'));
                    jest.runAllTimers();
                    expect(leftButton.classList).not.toContain('slds-hide');
                    expect(rightButton.classList).not.toContain('slds-hide');

                    // Scroll to the end:
                    // right button is hidden, left button is visible
                    jest.spyOn(
                        mainElement,
                        'scrollLeft',
                        'get'
                    ).mockReturnValueOnce(500);
                    mainElement.dispatchEvent(new CustomEvent('scroll'));
                    jest.runAllTimers();
                    expect(leftButton.classList).not.toContain('slds-hide');
                    expect(rightButton.classList).toContain('slds-hide');
                });
            });

            it('Update buttons visibility on resize', () => {
                element.showScrollButtons = true;

                return Promise.resolve().then(() => {
                    // Initial state:
                    // Left button is hidden, right button is visible
                    const leftButton = element.shadowRoot.querySelector(
                        '[data-element-id="div-scroll-left-button"]'
                    );
                    const rightButton = element.shadowRoot.querySelector(
                        '[data-element-id="div-scroll-right-button"]'
                    );
                    expect(leftButton.classList).toContain('slds-hide');
                    expect(rightButton.classList).not.toContain('slds-hide');

                    // Increase the width of the main element:
                    const mainElement = element.shadowRoot.querySelector(
                        '[data-element-id="div-main"]'
                    );
                    jest.spyOn(
                        mainElement,
                        'clientWidth',
                        'get'
                    ).mockReturnValueOnce(1000);
                    callObserver();

                    expect(leftButton.classList).toContain('slds-hide');
                    expect(rightButton.classList).toContain('slds-hide');
                });
            });

            it('Scroll on right button click', () => {
                element.showScrollButtons = true;

                return Promise.resolve().then(() => {
                    const mainElement = element.shadowRoot.querySelector(
                        '[data-element-id="div-main"]'
                    );
                    mainElement.scrollTo = jest.fn();
                    const rightButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-right"]'
                    );
                    rightButton.click();

                    expect(mainElement.scrollTo).toHaveBeenCalledWith({
                        left: 150,
                        behavior: 'smooth'
                    });
                });
            });

            it('Scroll on left button click', () => {
                element.showScrollButtons = true;

                return Promise.resolve().then(() => {
                    const rightButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-right"]'
                    );
                    const mainElement = element.shadowRoot.querySelector(
                        '[data-element-id="div-main"]'
                    );
                    mainElement.scrollTo = jest.fn();
                    rightButton.click();
                    jest.runAllTimers();
                    jest.clearAllMocks();

                    const leftButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-left"]'
                    );
                    leftButton.click();
                    expect(mainElement.scrollTo).toHaveBeenCalledWith({
                        left: -150,
                        behavior: 'smooth'
                    });
                });
            });
        });
    });
});
