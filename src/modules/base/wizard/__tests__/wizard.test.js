import { createElement } from 'lwc';
import Wizard from 'c/wizard';

// Not tested due to impossibility of targetting child component (mediaObject) slot content:
// iconName

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

describe('Wizard', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        expect(element.actionPosition).toBe('left');
        expect(element.buttonFinishIconName).toBeUndefined();
        expect(element.buttonFinishIconPosition).toBe('left');
        expect(element.buttonFinishLabel).toBe('Finish');
        expect(element.buttonFinishVariant).toBe('neutral');
        expect(element.buttonNextIconName).toBeUndefined();
        expect(element.buttonNextIconPosition).toBe('left');
        expect(element.buttonNextLabel).toBe('Next');
        expect(element.buttonNextVariant).toBe('neutral');
        expect(element.buttonPreviousIconName).toBeUndefined();
        expect(element.buttonPreviousIconPosition).toBe('left');
        expect(element.buttonPreviousLabel).toBe('Previous');
        expect(element.buttonPreviousVariant).toBe('neutral');
        expect(element.buttonAlignmentBump).toBeUndefined();
        expect(element.currentStep).toBeUndefined();
        expect(element.fractionLabel).toBe('of');
        expect(element.fractionPrefixLabel).toBe('Step');
        expect(element.hideIndicator).toBeFalsy();
        expect(element.hideNavigation).toBeFalsy();
        expect(element.iconName).toBeUndefined();
        expect(element.indicatorType).toBe('base');
        expect(element.indicatorPosition).toBe('footer');
        expect(element.title).toBeUndefined();
        expect(element.variant).toBe('base');
    });

    /* ----- ATTRIBUTES ----- */

    // action-position
    it('actionPosition', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.actionPosition = 'right';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.actionPosition).toBe('right');
        });
    });

    // button-finish-icon-name
    it('buttonFinishIconName', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.buttonFinishIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.buttonFinishIconName).toBe(
                'utility:apps'
            );
        });
    });

    // button-finish-icon-position
    it('buttonFinishIconPosition', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.buttonFinishIconPosition = 'right';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.buttonFinishIconPosition).toBe('right');
        });
    });

    // button-finish-label
    it('buttonFinishLabel', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.buttonFinishLabel = 'The end';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.buttonFinishLabel).toBe('The end');
        });
    });

    // button-finish-variant
    it('buttonFinishVariant', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.buttonFinishVariant = 'brand';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.buttonFinishVariant).toBe('brand');
        });
    });

    // button-next-icon-name
    it('buttonNextIconName', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.buttonNextIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.buttonNextIconName).toBe('utility:apps');
        });
    });

    // button-next-icon-position
    it('buttonNextIconPosition', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.buttonNextIconPosition = 'right';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.buttonNextIconPosition).toBe('right');
        });
    });

    // button-next-label
    it('buttonNextLabel', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.buttonNextLabel = 'The end';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.buttonNextLabel).toBe('The end');
        });
    });

    // button-next-variant
    it('buttonNextVariant', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.buttonNextVariant = 'brand';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.buttonNextVariant).toBe('brand');
        });
    });

    // button-previous-icon-name
    it('buttonPreviousIconName', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.buttonPreviousIconName = 'utility:apps';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.buttonPreviousIconName).toBe(
                'utility:apps'
            );
        });
    });

    // button-previous-icon-position
    it('buttonPreviousIconPosition', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.buttonPreviousIconPosition = 'right';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.buttonPreviousIconPosition).toBe(
                'right'
            );
        });
    });

    // button-previous-label
    it('buttonPreviousLabel', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.buttonPreviousLabel = 'The end';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.buttonPreviousLabel).toBe('The end');
        });
    });

    // button-previous-variant
    it('buttonPreviousVariant', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.buttonPreviousVariant = 'brand';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.buttonPreviousVariant).toBe('brand');
        });
    });

    // button-alignment-bump
    it('buttonAlignmentBump', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.buttonAlignmentBump = 'right';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.buttonAlignmentBump).toBe('right');
        });
    });

    // current-step
    it('currentStep', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.currentStep = 'second-step';

        const slotWrapper = element.shadowRoot.querySelector('main div');
        STEPS.forEach((step) => {
            slotWrapper.dispatchEvent(
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
    it('fractionLabel', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.fractionLabel = '/';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.fractionLabel).toBe('/');
        });
    });

    // fraction-prefix-label
    it('fractionPrefixLabel', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.fractionPrefixLabel = 'Page';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.fractionPrefixLabel).toBe('Page');
        });
    });

    // hide-indicator
    it('hideIndicator', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.hideIndicator = true;

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.hideIndicator).toBeTruthy();
        });
    });

    // hide-navigation
    it('hideNavigation = false', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.hideNavigation = false;

        return Promise.resolve().then(() => {
            const footer = element.shadowRoot.querySelector('footer');
            expect(footer).toBeTruthy();
        });
    });

    it('hideNavigation = true', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.hideNavigation = true;

        return Promise.resolve().then(() => {
            const footer = element.shadowRoot.querySelector('footer');
            expect(footer).toBeFalsy();
        });
    });

    // indicator-type
    it('indicatorType', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.indicatorType = 'path';

        return Promise.resolve().then(() => {
            const primitiveNavigation = element.shadowRoot.querySelector(
                'c-primitive-wizard-navigation'
            );
            expect(primitiveNavigation.indicatorType).toBe('path');
        });
    });

    // indicator-position
    it('indicatorPosition = footer', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.indicatorPosition = 'footer';

        return Promise.resolve().then(() => {
            const footerNavigation = element.shadowRoot.querySelector(
                'footer c-primitive-wizard-navigation'
            );
            const headerNavigation = element.shadowRoot.querySelector(
                'header c-primitive-wizard-navigation'
            );

            expect(footerNavigation.indicatorPosition).toBe('footer');
            expect(headerNavigation).toBeFalsy();
        });
    });

    it('indicatorPosition = header', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.indicatorPosition = 'header';

        return Promise.resolve().then(() => {
            const footerNavigation = element.shadowRoot.querySelector(
                'footer c-primitive-wizard-navigation'
            );
            const headerNavigation = element.shadowRoot.querySelector(
                'header c-primitive-wizard-navigation'
            );

            expect(footerNavigation.indicatorPosition).toBe('header');
            expect(headerNavigation).toBeTruthy();
            expect(headerNavigation.indicatorPosition).toBe('header');
        });
    });

    // title
    it('title', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.title = 'A string title';

        return Promise.resolve().then(() => {
            const title = element.shadowRoot.querySelector('h1');
            expect(title.textContent).toBe('A string title');
        });
    });

    // variant
    it('variant = base', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.variant = 'base';

        return Promise.resolve().then(() => {
            const base = element.shadowRoot.querySelector('article');
            const card = element.shadowRoot.querySelector('lightning-card');
            const modal = element.shadowRoot.querySelector('c-dialog');

            expect(base).toBeTruthy();
            expect(card).toBeFalsy();
            expect(modal).toBeFalsy();
        });
    });

    it('variant = card', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.variant = 'card';

        return Promise.resolve().then(() => {
            const base = element.shadowRoot.querySelector('article');
            const card = element.shadowRoot.querySelector('lightning-card');
            const modal = element.shadowRoot.querySelector('c-dialog');

            expect(base).toBeFalsy();
            expect(card).toBeTruthy();
            expect(modal).toBeFalsy();
        });
    });

    it('variant = modal', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        element.variant = 'modal';

        return Promise.resolve().then(() => {
            const base = element.shadowRoot.querySelector('article');
            const card = element.shadowRoot.querySelector('lightning-card');
            const modal = element.shadowRoot.querySelector('c-dialog');

            expect(base).toBeFalsy();
            expect(card).toBeFalsy();
            expect(modal).toBeTruthy();
        });
    });

    /* ----- METHODS ----- */

    // show and hide
    it('show and hide methods', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);
        const article = element.shadowRoot.querySelector('article');
        expect(article).toBeTruthy();

        element.hide();

        return Promise.resolve()
            .then(() => {
                const articleAfterHide = element.shadowRoot.querySelector(
                    'article'
                );
                expect(articleAfterHide).toBeFalsy();

                element.show();
            })
            .then(() => {
                const articleAfterShow = element.shadowRoot.querySelector(
                    'article'
                );
                expect(articleAfterShow).toBeTruthy();
            });
    });

    // next and previous
    it('next and previous methods', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        const slotWrapper = element.shadowRoot.querySelector('main div');
        STEPS.forEach((step) => {
            slotWrapper.dispatchEvent(
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
    it('change event', () => {
        const element = createElement('base-wizard', {
            is: Wizard
        });

        document.body.appendChild(element);

        const slotWrapper = element.shadowRoot.querySelector('main div');
        STEPS.forEach((step) => {
            slotWrapper.dispatchEvent(
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
