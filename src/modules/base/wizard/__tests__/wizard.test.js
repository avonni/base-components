import { createElement } from 'lwc';
import Wizard from 'c/wizard';

// Not tested due to impossibility of targetting child component (mediaObject) slot content:
// iconName

// Not tested because it is asynchronous:
// handleChange

const STEPS = [
    {
        callbacks: {
            setClass: jest.fn(),
            beforeChange: jest.fn().mockReturnValue(true)
        },
        name: 'first-step',
        label: 'Step 1',
        hidePreviousButton: true,
        hideNextFinishButton: true,
        beforeChangeErrorMessage: 'Error in step 1'
    },
    {
        callbacks: {
            setClass: jest.fn(),
            beforeChange: jest.fn().mockReturnValue(true)
        },
        name: 'second-step',
        label: 'Step 2',
        beforeChangeErrorMessage: 'Error in step 2'
    },
    {
        callbacks: {
            setClass: jest.fn(),
            beforeChange: jest.fn().mockReturnValue(true)
        },
        name: 'third-step',
        label: 'Step 3',
        beforeChangeErrorMessage: 'Error in step 3'
    }
];

let element;
describe('Wizard', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);
    });

    it('Wizard: Default attributes', () => {
        expect(element.actionPosition).toBe('left');
        expect(element.finishButtonIconName).toBeUndefined();
        expect(element.finishButtonIconPosition).toBe('left');
        expect(element.finishButtonLabel).toBe('Finish');
        expect(element.finishButtonVariant).toBe('neutral');
        expect(element.nextButtonIconName).toBeUndefined();
        expect(element.nextButtonIconPosition).toBe('left');
        expect(element.nextButtonLabel).toBe('Next');
        expect(element.nextButtonVariant).toBe('neutral');
        expect(element.previousButtonIconName).toBeUndefined();
        expect(element.previousButtonIconPosition).toBe('left');
        expect(element.previousButtonLabel).toBe('Previous');
        expect(element.previousButtonVariant).toBe('neutral');
        expect(element.buttonAlignmentBump).toBeUndefined();
        expect(element.currentStep).toBeUndefined();
        expect(element.fractionLabel).toBe('of');
        expect(element.fractionPrefixLabel).toBe('Step');
        expect(element.hideIndicator).toBeFalsy();
        expect(element.hideNavigation).toBeFalsy();
        expect(element.iconName).toBeUndefined();
        expect(element.indicatorType).toBe('base');
        expect(element.indicatorPosition).toBe('bottom');
        expect(element.title).toBeUndefined();
        expect(element.variant).toBe('base');
    });

    /* ----- ATTRIBUTES ----- */

    // action-position
    it('Wizard: actionPosition', () => {
        element.actionPosition = 'right';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            expect(primitiveNavigation.actionPosition).toBe('right');
        });
    });

    // button-finish-icon-name
    it('Wizard: finishButtonIconName', () => {
        element.finishButtonIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            expect(primitiveNavigation.finishButtonIconName).toBe(
                'utility:apps'
            );
        });
    });

    // button-finish-icon-position
    it('Wizard: finishButtonIconPosition', () => {
        element.finishButtonIconPosition = 'right';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            expect(primitiveNavigation.finishButtonIconPosition).toBe('right');
        });
    });

    // button-finish-label
    it('Wizard: finishButtonLabel', () => {
        element.finishButtonLabel = 'The end';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            expect(primitiveNavigation.finishButtonLabel).toBe('The end');
        });
    });

    // button-finish-variant
    it('Wizard: finishButtonVariant', () => {
        element.finishButtonVariant = 'brand';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            expect(primitiveNavigation.finishButtonVariant).toBe('brand');
        });
    });

    // button-next-icon-name
    it('Wizard: nextButtonIconName', () => {
        element.nextButtonIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            expect(primitiveNavigation.nextButtonIconName).toBe('utility:apps');
        });
    });

    // button-next-icon-position
    it('Wizard: nextButtonIconPosition', () => {
        element.nextButtonIconPosition = 'right';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            expect(primitiveNavigation.nextButtonIconPosition).toBe('right');
        });
    });

    // button-next-label
    it('Wizard: nextButtonLabel', () => {
        element.nextButtonLabel = 'The end';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            expect(primitiveNavigation.nextButtonLabel).toBe('The end');
        });
    });

    // button-next-variant
    it('Wizard: nextButtonVariant', () => {
        element.nextButtonVariant = 'brand';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            expect(primitiveNavigation.nextButtonVariant).toBe('brand');
        });
    });

    // button-previous-icon-name
    it('Wizard: previousButtonIconName', () => {
        element.previousButtonIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            expect(primitiveNavigation.previousButtonIconName).toBe(
                'utility:apps'
            );
        });
    });

    // button-previous-icon-position
    it('Wizard: previousButtonIconPosition', () => {
        element.previousButtonIconPosition = 'right';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            expect(primitiveNavigation.previousButtonIconPosition).toBe(
                'right'
            );
        });
    });

    // button-previous-label
    it('Wizard: previousButtonLabel', () => {
        element.previousButtonLabel = 'The end';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            expect(primitiveNavigation.previousButtonLabel).toBe('The end');
        });
    });

    // button-previous-variant
    it('Wizard: previousButtonVariant', () => {
        element.previousButtonVariant = 'brand';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            expect(primitiveNavigation.previousButtonVariant).toBe('brand');
        });
    });

    // button-alignment-bump
    it('Wizard: buttonAlignmentBump', () => {
        element.buttonAlignmentBump = 'right';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            expect(primitiveNavigation.buttonAlignmentBump).toBe('right');
        });
    });

    // current-step
    it('Wizard: currentStep', () => {
        element.currentStep = 'second-step';

        const slot = element.shadowRoot.querySelector(
            '[data-element-id="slot-default"]'
        );
        STEPS.forEach((step) => {
            slot.dispatchEvent(
                new CustomEvent('wizardstepregister', {
                    bubbles: true,
                    detail: step
                })
            );
        });

        return Promise.resolve().then(() => {
            expect(STEPS[0].callbacks.setClass).toHaveBeenCalledWith(
                'slds-hide'
            );
            expect(STEPS[1].callbacks.setClass).toHaveBeenCalledWith(undefined);
            expect(STEPS[2].callbacks.setClass).toHaveBeenCalledWith(
                'slds-hide'
            );
        });
    });

    // fraction-label
    it('Wizard: fractionLabel', () => {
        element.fractionLabel = '/';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            expect(primitiveNavigation.fractionLabel).toBe('/');
        });
    });

    // fraction-prefix-label
    it('Wizard: fractionPrefixLabel', () => {
        element.fractionPrefixLabel = 'Page';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            expect(primitiveNavigation.fractionPrefixLabel).toBe('Page');
        });
    });

    // hide-indicator
    it('Wizard: hideIndicator', () => {
        element.hideIndicator = true;

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            expect(primitiveNavigation.hideIndicator).toBeTruthy();
        });
    });

    // hide-navigation
    it('Wizard: hideNavigation = false', () => {
        element.hideNavigation = false;

        return Promise.resolve().then(() => {
            const footer = element.shadowRoot.querySelector(
                '[data-element-id="footer"]'
            );
            expect(footer).toBeTruthy();
        });
    });

    it('Wizard: hideNavigation = true', () => {
        element.hideNavigation = true;

        return Promise.resolve().then(() => {
            const footer = element.shadowRoot.querySelector(
                '[data-element-id="footer"]'
            );
            expect(footer).toBeFalsy();
        });
    });

    // indicator-type
    it('Wizard: indicatorType', () => {
        element.indicatorType = 'path';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            expect(primitiveNavigation.indicatorType).toBe('path');
        });
    });

    // indicator-position
    it('Wizard: indicatorPosition = bottom', () => {
        element.indicatorPosition = 'bottom';

        return Promise.resolve().then(() => {
            const footerNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            const headerNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-top"]'
            );
            const sideNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-side"]'
            );
            const mainCol = element.shadowRoot.querySelector('.main-col');
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="article-base"]'
            );

            expect(footerNavigation.indicatorPosition).toBe('bottom');
            expect(headerNavigation).toBeFalsy();
            expect(sideNavigation).toBeFalsy();
            expect(mainCol.classList).not.toContain('avonni-wizard__flex-col');
            expect(wrapper.classList).not.toContain('slds-grid');
        });
    });

    it('Wizard: indicatorPosition = top', () => {
        element.indicatorPosition = 'top';

        return Promise.resolve().then(() => {
            const footerNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            const headerNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-top"]'
            );
            const sideNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-side"]'
            );
            const mainCol = element.shadowRoot.querySelector('.main-col');
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="article-base"]'
            );

            expect(footerNavigation.indicatorPosition).toBe('top');
            expect(headerNavigation).toBeTruthy();
            expect(headerNavigation.indicatorPosition).toBe('top');
            expect(sideNavigation).toBeFalsy();
            expect(mainCol.classList).not.toContain('avonni-wizard__flex-col');
            expect(wrapper.classList).not.toContain('slds-grid');
        });
    });

    it('Wizard: indicatorPosition = right', () => {
        element.indicatorPosition = 'right';

        return Promise.resolve().then(() => {
            const footerNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            const headerNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-top"]'
            );
            const sideNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-side"]'
            );
            const mainCol = element.shadowRoot.querySelector('.main-col');
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="article-base"]'
            );

            expect(footerNavigation.indicatorPosition).toBe('right');
            expect(headerNavigation).toBeFalsy();
            expect(sideNavigation.indicatorPosition).toBe('right');
            expect(mainCol.classList).toContain('avonni-wizard__flex-col');
            expect(mainCol.classList).not.toContain('slds-order_2');
            expect(wrapper.classList).toContain('slds-grid');
        });
    });

    it('Wizard: indicatorPosition = left', () => {
        element.indicatorPosition = 'left';

        return Promise.resolve().then(() => {
            const footerNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
            );
            const headerNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-top"]'
            );
            const sideNavigation = element.shadowRoot.querySelector(
                '[data-element-id="avonni-primitive-wizard-navigation-side"]'
            );
            const mainCol = element.shadowRoot.querySelector('.main-col');
            const wrapper = element.shadowRoot.querySelector(
                '[data-element-id="article-base"]'
            );

            expect(footerNavigation.indicatorPosition).toBe('left');
            expect(headerNavigation).toBeFalsy();
            expect(sideNavigation.indicatorPosition).toBe('left');
            expect(mainCol.classList).toContain('avonni-wizard__flex-col');
            expect(mainCol.classList).toContain('slds-order_2');
            expect(wrapper.classList).toContain('slds-grid');
        });
    });

    // title
    it('Wizard: title', () => {
        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector(
                '[data-element-id="title"]'
            );
            expect(title.textContent).toBe('A string title');
        });
    });

    // variant
    it('Wizard: variant = base', () => {
        element.variant = 'base';

        return Promise.resolve().then(() => {
            const base = element.shadowRoot.querySelector(
                '[data-element-id="article-base"]'
            );
            const card = element.shadowRoot.querySelector(
                '[data-element-id="lightning-card"]'
            );
            const modal = element.shadowRoot.querySelector(
                '[data-element-id="avonni-dialog"]'
            );
            const quickActionPanel = element.shadowRoot.querySelector(
                '[data-element-id="article-quick-action-panel"]'
            );

            expect(base).toBeTruthy();
            expect(card).toBeFalsy();
            expect(modal).toBeFalsy();
            expect(quickActionPanel).toBeFalsy();
        });
    });

    it('Wizard: variant = card', () => {
        element.variant = 'card';

        return Promise.resolve().then(() => {
            const base = element.shadowRoot.querySelector(
                '[data-element-id="article-base"]'
            );
            const card = element.shadowRoot.querySelector(
                '[data-element-id="lightning-card"]'
            );
            const modal = element.shadowRoot.querySelector(
                '[data-element-id="avonni-dialog"]'
            );
            const quickActionPanel = element.shadowRoot.querySelector(
                '[data-element-id="article-quick-action-panel"]'
            );

            expect(base).toBeFalsy();
            expect(card).toBeTruthy();
            expect(modal).toBeFalsy();
            expect(quickActionPanel).toBeFalsy();
        });
    });

    it('Wizard: variant = modal', () => {
        element.variant = 'modal';

        return Promise.resolve().then(() => {
            const base = element.shadowRoot.querySelector(
                '[data-element-id="article-base"]'
            );
            const card = element.shadowRoot.querySelector(
                '[data-element-id="lightning-card"]'
            );
            const modal = element.shadowRoot.querySelector(
                '[data-element-id="avonni-dialog"]'
            );
            const quickActionPanel = element.shadowRoot.querySelector(
                '[data-element-id="article-quick-action-panel"]'
            );

            expect(base).toBeFalsy();
            expect(card).toBeFalsy();
            expect(modal).toBeTruthy();
            expect(quickActionPanel).toBeFalsy();
        });
    });

    it('Wizard: variant = quickActionPanel', () => {
        element.variant = 'quickActionPanel';

        return Promise.resolve().then(() => {
            const base = element.shadowRoot.querySelector(
                '[data-element-id="article-base"]'
            );
            const card = element.shadowRoot.querySelector(
                '[data-element-id="lightning-card"]'
            );
            const modal = element.shadowRoot.querySelector(
                '[data-element-id="avonni-dialog"]'
            );
            const quickActionPanel = element.shadowRoot.querySelector(
                '[data-element-id="article-quick-action-panel"]'
            );

            expect(base).toBeFalsy();
            expect(card).toBeFalsy();
            expect(modal).toBeFalsy();
            expect(quickActionPanel).toBeTruthy();
        });
    });

    /* ----- METHODS ----- */

    // show and hide
    it('Wizard: show and hide methods', () => {
        const article = element.shadowRoot.querySelector(
            '[data-element-id="article-base"]'
        );
        expect(article).toBeTruthy();

        element.hide();

        return Promise.resolve()
            .then(() => {
                const articleAfterHide = element.shadowRoot.querySelector(
                    '[data-element-id="article-base"]'
                );
                expect(articleAfterHide).toBeFalsy();

                element.show();
            })
            .then(() => {
                const articleAfterShow = element.shadowRoot.querySelector(
                    '[data-element-id="article-base"]'
                );
                expect(articleAfterShow).toBeTruthy();
            });
    });

    // next and previous
    it('Wizard: next and previous methods', () => {
        const slot = element.shadowRoot.querySelector(
            '[data-element-id="slot-default"]'
        );
        STEPS.forEach((step) => {
            slot.dispatchEvent(
                new CustomEvent('wizardstepregister', {
                    bubbles: true,
                    detail: step
                })
            );
        });

        return Promise.resolve()
            .then(() => {
                expect(STEPS[0].callbacks.setClass).toHaveBeenCalledWith(
                    undefined
                );
                expect(STEPS[1].callbacks.setClass).toHaveBeenCalledWith(
                    'slds-hide'
                );
                expect(STEPS[2].callbacks.setClass).toHaveBeenCalledWith(
                    'slds-hide'
                );

                element.next();
            })
            .then(() => {
                expect(STEPS[0].callbacks.setClass).toHaveBeenCalledWith(
                    'slds-hide'
                );
                expect(STEPS[1].callbacks.setClass).toHaveBeenCalledWith(
                    undefined
                );
                expect(STEPS[2].callbacks.setClass).toHaveBeenCalledWith(
                    'slds-hide'
                );

                element.previous();
            })
            .then(() => {
                expect(STEPS[0].callbacks.setClass).toHaveBeenCalledWith(
                    undefined
                );
                expect(STEPS[1].callbacks.setClass).toHaveBeenCalledWith(
                    'slds-hide'
                );
                expect(STEPS[2].callbacks.setClass).toHaveBeenCalledWith(
                    'slds-hide'
                );
            });
    });

    /* ----- EVENTS ----- */

    // change
    // Depends on next()
    it('Wizard: change event based on next()', () => {
        const slot = element.shadowRoot.querySelector(
            '[data-element-id="slot-default"]'
        );
        STEPS.forEach((step) => {
            slot.dispatchEvent(
                new CustomEvent('wizardstepregister', {
                    bubbles: true,
                    detail: step
                })
            );
        });

        const handler = jest.fn();
        element.addEventListener('change', handler);

        element.next();

        expect(handler).toHaveBeenCalled();
        expect(handler.mock.calls[0][0].detail.currentStep).toBe('second-step');
        expect(handler.mock.calls[0][0].detail.oldStep).toBe('first-step');
        expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
        expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        expect(handler.mock.calls[0][0].composed).toBeFalsy();
    });
});
