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
    });

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.scrollLeftButtonAlternativeText).toBe('Scroll Left');
            expect(element.scrollRightButtonAlternativeText).toBe(
                'Scroll Right'
            );
            expect(element.showScrollButtons).toBeFalsy();
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
