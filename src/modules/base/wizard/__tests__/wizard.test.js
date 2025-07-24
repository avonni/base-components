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

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.actionPosition).toBe('left');
            expect(element.buttonAlignmentBump).toBeUndefined();
            expect(element.currentStep).toBeUndefined();
            expect(element.finishButtonIconName).toBeUndefined();
            expect(element.finishButtonIconPosition).toBe('left');
            expect(element.finishButtonLabel).toBe('Finish');
            expect(element.finishButtonVariant).toBe('neutral');
            expect(element.fractionLabel).toBe('of');
            expect(element.fractionPrefixLabel).toBe('Step');
            expect(element.hideIndicator).toBeFalsy();
            expect(element.hideNavigation).toBeFalsy();
            expect(element.iconName).toBeUndefined();
            expect(element.indicatorPosition).toBe('bottom');
            expect(element.indicatorType).toBe('base');
            expect(element.nextButtonIconName).toBeUndefined();
            expect(element.nextButtonIconPosition).toBe('left');
            expect(element.nextButtonLabel).toBe('Next');
            expect(element.nextButtonVariant).toBe('neutral');
            expect(element.previousButtonIconName).toBeUndefined();
            expect(element.previousButtonIconPosition).toBe('left');
            expect(element.previousButtonLabel).toBe('Previous');
            expect(element.previousButtonVariant).toBe('neutral');
            expect(element.title).toBeUndefined();
            expect(element.variant).toBe('base');
        });

        describe('actionPosition', () => {
            it('Passed to the component', () => {
                element.actionPosition = 'right';

                return Promise.resolve().then(() => {
                    const primitiveNavigation =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
                        );
                    expect(primitiveNavigation.actionPosition).toBe('right');
                });
            });
        });

        describe('buttonAlignmentBump', () => {
            it('Passed to the component', () => {
                element.buttonAlignmentBump = 'right';

                return Promise.resolve().then(() => {
                    const primitiveNavigation =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
                        );
                    expect(primitiveNavigation.buttonAlignmentBump).toBe(
                        'right'
                    );
                });
            });
        });

        describe('currentStep', () => {
            it('Passed to the component', () => {
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
                    expect(STEPS[1].callbacks.setClass).toHaveBeenCalledWith(
                        undefined
                    );
                    expect(STEPS[2].callbacks.setClass).toHaveBeenCalledWith(
                        'slds-hide'
                    );
                });
            });
        });

        describe('finishButtonIconName', () => {
            it('Passed to the component', () => {
                element.finishButtonIconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const primitiveNavigation =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
                        );
                    expect(primitiveNavigation.finishButtonIconName).toBe(
                        'utility:apps'
                    );
                });
            });
        });

        describe('finishButtonIconPosition', () => {
            it('Passed to the component', () => {
                element.finishButtonIconPosition = 'right';

                return Promise.resolve().then(() => {
                    const primitiveNavigation =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
                        );
                    expect(primitiveNavigation.finishButtonIconPosition).toBe(
                        'right'
                    );
                });
            });
        });

        describe('finishButtonLabel', () => {
            it('Passed to the component', () => {
                element.finishButtonLabel = 'The end';

                return Promise.resolve().then(() => {
                    const primitiveNavigation =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
                        );
                    expect(primitiveNavigation.finishButtonLabel).toBe(
                        'The end'
                    );
                });
            });
        });

        describe('finishButtonVariant', () => {
            it('Passed to the component', () => {
                element.finishButtonVariant = 'brand';

                return Promise.resolve().then(() => {
                    const primitiveNavigation =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
                        );
                    expect(primitiveNavigation.finishButtonVariant).toBe(
                        'brand'
                    );
                });
            });
        });

        describe('fractionLabel', () => {
            it('Passed to the component', () => {
                element.fractionLabel = '/';

                return Promise.resolve().then(() => {
                    const primitiveNavigation =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
                        );
                    expect(primitiveNavigation.fractionLabel).toBe('/');
                });
            });
        });

        describe('fractionPrefixLabel', () => {
            it('Passed to the component', () => {
                element.fractionPrefixLabel = 'Page';

                return Promise.resolve().then(() => {
                    const primitiveNavigation =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
                        );
                    expect(primitiveNavigation.fractionPrefixLabel).toBe(
                        'Page'
                    );
                });
            });
        });

        describe('hideIndicator', () => {
            it('Passed to the component', () => {
                element.hideIndicator = true;

                return Promise.resolve().then(() => {
                    const primitiveNavigation =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
                        );
                    expect(primitiveNavigation.hideIndicator).toBeTruthy();
                });
            });
        });

        describe('hideNavigation', () => {
            it('false', () => {
                element.hideNavigation = false;

                return Promise.resolve().then(() => {
                    const footer = element.shadowRoot.querySelector(
                        '[data-element-id="footer"]'
                    );
                    expect(footer).toBeTruthy();
                });
            });

            it('true', () => {
                element.hideNavigation = true;

                return Promise.resolve().then(() => {
                    const footer = element.shadowRoot.querySelector(
                        '[data-element-id="footer"]'
                    );
                    expect(footer).toBeFalsy();
                });
            });
        });

        describe('indicatorPosition', () => {
            it('bottom', () => {
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
                    const mainCol =
                        element.shadowRoot.querySelector('.main-col');
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="article-base"]'
                    );

                    expect(footerNavigation.indicatorPosition).toBe('bottom');
                    expect(headerNavigation).toBeFalsy();
                    expect(sideNavigation).toBeFalsy();
                    expect(mainCol.classList).not.toContain(
                        'avonni-wizard__flex-col'
                    );
                    expect(wrapper.classList).not.toContain('slds-grid');
                });
            });

            it('left', () => {
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
                    const mainCol =
                        element.shadowRoot.querySelector('.main-col');
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="article-base"]'
                    );

                    expect(footerNavigation.indicatorPosition).toBe('left');
                    expect(headerNavigation).toBeFalsy();
                    expect(sideNavigation.indicatorPosition).toBe('left');
                    expect(mainCol.classList).toContain(
                        'avonni-wizard__flex-col'
                    );
                    expect(mainCol.classList).toContain('slds-order_2');
                    expect(wrapper.classList).toContain('slds-grid');
                });
            });

            it('right', () => {
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
                    const mainCol =
                        element.shadowRoot.querySelector('.main-col');
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="article-base"]'
                    );

                    expect(footerNavigation.indicatorPosition).toBe('right');
                    expect(headerNavigation).toBeFalsy();
                    expect(sideNavigation.indicatorPosition).toBe('right');
                    expect(mainCol.classList).toContain(
                        'avonni-wizard__flex-col'
                    );
                    expect(mainCol.classList).not.toContain('slds-order_2');
                    expect(wrapper.classList).toContain('slds-grid');
                });
            });

            it('top', () => {
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
                    const mainCol =
                        element.shadowRoot.querySelector('.main-col');
                    const wrapper = element.shadowRoot.querySelector(
                        '[data-element-id="article-base"]'
                    );

                    expect(footerNavigation.indicatorPosition).toBe('top');
                    expect(headerNavigation).toBeTruthy();
                    expect(headerNavigation.indicatorPosition).toBe('top');
                    expect(sideNavigation).toBeFalsy();
                    expect(mainCol.classList).not.toContain(
                        'avonni-wizard__flex-col'
                    );
                    expect(wrapper.classList).not.toContain('slds-grid');
                });
            });
        });

        describe('indicatorType', () => {
            it('Passed to the component', () => {
                element.indicatorType = 'path';

                return Promise.resolve().then(() => {
                    const primitiveNavigation =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
                        );
                    expect(primitiveNavigation.indicatorType).toBe('path');
                });
            });
        });

        describe('nextButtonIconName', () => {
            it('Passed to the component', () => {
                element.nextButtonIconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const primitiveNavigation =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
                        );
                    expect(primitiveNavigation.nextButtonIconName).toBe(
                        'utility:apps'
                    );
                });
            });
        });

        describe('nextButtonIconPosition', () => {
            it('Passed to the component', () => {
                element.nextButtonIconPosition = 'right';

                return Promise.resolve().then(() => {
                    const primitiveNavigation =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
                        );
                    expect(primitiveNavigation.nextButtonIconPosition).toBe(
                        'right'
                    );
                });
            });
        });

        describe('nextButtonLabel', () => {
            it('Passed to the component', () => {
                element.nextButtonLabel = 'The end';

                return Promise.resolve().then(() => {
                    const primitiveNavigation =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
                        );
                    expect(primitiveNavigation.nextButtonLabel).toBe('The end');
                });
            });
        });

        describe('nextButtonVariant', () => {
            it('Passed to the component', () => {
                element.nextButtonVariant = 'brand';

                return Promise.resolve().then(() => {
                    const primitiveNavigation =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
                        );
                    expect(primitiveNavigation.nextButtonVariant).toBe('brand');
                });
            });
        });

        describe('previousButtonIconName', () => {
            it('Passed to the component', () => {
                element.previousButtonIconName = 'utility:apps';

                return Promise.resolve().then(() => {
                    const primitiveNavigation =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
                        );
                    expect(primitiveNavigation.previousButtonIconName).toBe(
                        'utility:apps'
                    );
                });
            });
        });

        describe('previousButtonIconPosition', () => {
            it('Passed to the component', () => {
                element.previousButtonIconPosition = 'right';

                return Promise.resolve().then(() => {
                    const primitiveNavigation =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
                        );
                    expect(primitiveNavigation.previousButtonIconPosition).toBe(
                        'right'
                    );
                });
            });
        });

        describe('previousButtonLabel', () => {
            it('Passed to the component', () => {
                element.previousButtonLabel = 'The end';

                return Promise.resolve().then(() => {
                    const primitiveNavigation =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
                        );
                    expect(primitiveNavigation.previousButtonLabel).toBe(
                        'The end'
                    );
                });
            });
        });

        describe('previousButtonVariant', () => {
            it('Passed to the component', () => {
                element.previousButtonVariant = 'brand';

                return Promise.resolve().then(() => {
                    const primitiveNavigation =
                        element.shadowRoot.querySelector(
                            '[data-element-id="avonni-primitive-wizard-navigation-bottom"]'
                        );
                    expect(primitiveNavigation.previousButtonVariant).toBe(
                        'brand'
                    );
                });
            });
        });

        describe('title', () => {
            it('Passed to the component', () => {
                element.title = 'A string title';

                return Promise.resolve().then(() => {
                    const title = element.shadowRoot.querySelector(
                        '[data-element-id="title"]'
                    );
                    expect(title.textContent).toBe('A string title');
                });
            });
        });

        describe('variant', () => {
            it('base', () => {
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

            it('card', () => {
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

            it('modal', () => {
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

            it('quickActionPanel', () => {
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
        });
    });

    describe('Methods', () => {
        describe('next and previous methods', () => {
            it('next', () => {
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
                        expect(
                            STEPS[0].callbacks.setClass
                        ).toHaveBeenCalledWith(undefined);
                        expect(
                            STEPS[1].callbacks.setClass
                        ).toHaveBeenCalledWith('slds-hide');
                        expect(
                            STEPS[2].callbacks.setClass
                        ).toHaveBeenCalledWith('slds-hide');

                        element.next();
                    })
                    .then(() => {
                        expect(
                            STEPS[0].callbacks.setClass
                        ).toHaveBeenCalledWith('slds-hide');
                        expect(
                            STEPS[1].callbacks.setClass
                        ).toHaveBeenCalledWith(undefined);
                        expect(
                            STEPS[2].callbacks.setClass
                        ).toHaveBeenCalledWith('slds-hide');

                        element.previous();
                    })
                    .then(() => {
                        expect(
                            STEPS[0].callbacks.setClass
                        ).toHaveBeenCalledWith(undefined);
                        expect(
                            STEPS[1].callbacks.setClass
                        ).toHaveBeenCalledWith('slds-hide');
                        expect(
                            STEPS[2].callbacks.setClass
                        ).toHaveBeenCalledWith('slds-hide');
                    });
            });
        });
        describe('show and hide methods', () => {
            it('show', () => {
                const article = element.shadowRoot.querySelector(
                    '[data-element-id="article-base"]'
                );
                expect(article).toBeTruthy();

                element.hide();

                return Promise.resolve()
                    .then(() => {
                        const articleAfterHide =
                            element.shadowRoot.querySelector(
                                '[data-element-id="article-base"]'
                            );
                        expect(articleAfterHide).toBeFalsy();

                        element.show();
                    })
                    .then(() => {
                        const articleAfterShow =
                            element.shadowRoot.querySelector(
                                '[data-element-id="article-base"]'
                            );
                        expect(articleAfterShow).toBeTruthy();
                    });
            });
        });
    });

    describe('Events', () => {
        describe('change event', () => {
            it('based on next()', () => {
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
                expect(handler.mock.calls[0][0].detail.currentStep).toBe(
                    'second-step'
                );
                expect(handler.mock.calls[0][0].detail.oldStep).toBe(
                    'first-step'
                );
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
            });
        });
    });
});
