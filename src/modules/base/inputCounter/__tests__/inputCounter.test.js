import { createElement } from 'lwc';
import InputCounter from '../inputCounter';

let element;
describe('Input Counter', () => {
    beforeEach(() => {
        element = createElement('ac-test-primitive-input-counter', {
            is: InputCounter
        });
        document.body.appendChild(element);
    });

    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.resetAllMocks();
    });

    describe('Attributes', () => {
        it('Default attributes', () => {
            expect(element.accessKey).toBeUndefined();
            expect(element.ariaControls).toBeUndefined();
            expect(element.ariaLabel).toBeUndefined();
            expect(element.ariaLabelledBy).toBeUndefined();
            expect(element.ariaDescribedBy).toBeUndefined();
            expect(element.decrementButtonTitle).toBe('Decrement counter');
            expect(element.disabled).toBeFalsy();
            expect(element.fieldLevelHelp).toBeUndefined();
            expect(element.fractionDigits).toBeUndefined();
            expect(element.incrementButtonTitle).toBe('Increment counter');
            expect(element.label).toBeUndefined();
            expect(element.max).toBeUndefined();
            expect(element.messageWhenBadInput).toBeUndefined();
            expect(element.messageWhenPatternMismatch).toBeUndefined();
            expect(element.messageWhenRangeOverflow).toBeUndefined();
            expect(element.messageWhenRangeUnderflow).toBeUndefined();
            expect(element.messageWhenStepMismatch).toBeUndefined();
            expect(element.messageWhenValueMissing).toBeUndefined();
            expect(element.min).toBeUndefined();
            expect(element.name).toBeUndefined();
            expect(element.readOnly).toBeFalsy();
            expect(element.required).toBeFalsy();
            expect(element.requiredAlternativeText).toBe('Required');
            expect(element.step).toBe(1);
            expect(element.type).toBe('number');
            expect(element.value).toBeNull();
            expect(element.variant).toBe('standard');
        });

        describe('Access Key', () => {
            it('Passed to the component', () => {
                element.accessKey = 'k';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    expect(input.accessKey).toBe('k');
                });
            });
        });

        describe('Aria', () => {
            it('Passed to the component', () => {
                element.ariaLabel = 'Aria-label';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    expect(input.ariaLabel).toBe('Aria-label');
                });
            });
        });

        describe('Disabled', () => {
            it('Passed to the component', () => {
                element.disabled = true;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    expect(input.disabled).toBeTruthy();
                });
            });
        });

        describe('Decrement Button Title', () => {
            it('Passed to the component', () => {
                element.decrementButtonTitle = 'Decrement';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-decrement"]'
                    );
                    expect(button.alternativeText).toBe('Decrement');
                    expect(button.title).toBe('Decrement');
                });
            });
        });

        describe('Field Level Help', () => {
            it('Passed to the component', () => {
                element.fieldLevelHelp = 'This is a field level help';
                element.variant = 'label-inline';

                return Promise.resolve().then(() => {
                    const helpText = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-helptext"]'
                    );
                    expect(helpText).toBeTruthy();
                    expect(helpText.content).toBe('This is a field level help');
                });
            });
        });

        describe('Fraction Digits', () => {
            it('Passed to the component', () => {
                element.value = 3;
                element.fractionDigits = 2;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    expect(input.value).toBe('3.00');
                });
            });
        });

        describe('Increment Button Title', () => {
            it('Passed to the component', () => {
                element.incrementButtonTitle = 'Increment';

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-increment"]'
                    );
                    expect(button.alternativeText).toBe('Increment');
                    expect(button.title).toBe('Increment');
                });
            });
        });

        describe('Label', () => {
            it('Passed to the component', () => {
                element.label = 'This is a label text';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="input-counter-label"]'
                    );
                    expect(label.textContent).toBe('This is a label text');
                });
            });
        });

        describe('Max', () => {
            it('Max and value unchanged on increment', () => {
                element.max = 5;
                element.value = 5;
                element.step = 6;
                element.messageWhenRangeOverflow = 'Maximum';

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-icon-increment"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const input = element.shadowRoot.querySelector(
                            '[data-element-id="input"]'
                        );
                        expect(input.value).toBe('5');
                    });
            });
        });

        describe('Min', () => {
            it('Min and value unchanged on decrement', () => {
                element.min = 5;
                element.value = 5;
                element.step = 6;
                element.messageWhenRangeOverflow = 'Maximum';

                return Promise.resolve()
                    .then(() => {
                        const button = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-icon-decrement"]'
                        );
                        button.click();
                    })
                    .then(() => {
                        const input = element.shadowRoot.querySelector(
                            '[data-element-id="input"]'
                        );
                        expect(input.value).toBe('5');
                    });
            });
        });

        describe('Name', () => {
            it('Passed to the component', () => {
                element.name = 'This is a name text';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    expect(input.name).toBe('This is a name text');
                });
            });
        });

        describe('Step', () => {
            it('Passed to the component', () => {
                element.value = 0;
                element.step = 2;
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

                return Promise.resolve()
                    .then(() => {
                        expect(input.step).toBe('2');
                        expect(element.value).toBe(0);
                    })
                    .then(() => {
                        const addButton = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-icon-increment"]'
                        );
                        addButton.click();
                        expect(input.value).toBe('2');
                        expect(element.value).toBe(2);
                    });
            });

            it('decimal step with percent type', () => {
                element.type = 'percent';
                element.step = 0.2;

                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

                return Promise.resolve()
                    .then(() => {
                        expect(input.step).toBe('0.2');
                        expect(element.value).toBeNull();
                    })
                    .then(() => {
                        const addButton = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-icon-increment"]'
                        );
                        addButton.click();
                        expect(input.value).toBe('20%');
                        expect(element.value).toBe(0.2);
                    });
            });
        });

        describe('Read Only', () => {
            it('Passed to the component', () => {
                element.readOnly = true;

                return Promise.resolve().then(() => {
                    const buttonIcon = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button-icon"]'
                    );
                    expect(buttonIcon).toHaveLength(0);
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    expect(input.readOnly).toBeTruthy();
                });
            });
        });

        describe('Required', () => {
            it('Passed to the component', () => {
                element.required = true;
                element.requiredAlternativeText = 'Required field';

                return Promise.resolve().then(() => {
                    const required = element.shadowRoot.querySelector(
                        '[data-element-id="abbr"]'
                    );
                    expect(required).toBeTruthy();
                    expect(required.textContent).toBe('*');
                    expect(required.title).toBe('Required field');
                });
            });
        });

        describe('Type', () => {
            it('number', () => {
                element.type = 'number';
                element.value = 3;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    expect(input.value).toBe('3');
                });
            });

            it('percent', () => {
                element.type = 'percent';
                element.value = 3;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    expect(input.value).toBe('300%');
                });
            });

            it('currency', () => {
                element.type = 'currency';
                element.value = 3;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    expect(input.value).toBe('$3');
                });
            });
        });

        describe('Value', () => {
            it('Passed to the component', () => {
                element.value = 5;
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="input"]'
                );

                return Promise.resolve()
                    .then(() => {
                        expect(input.value).toBe('5');
                    })
                    .then(() => {
                        const minus = element.shadowRoot.querySelector(
                            '[data-element-id="lightning-button-icon-decrement"]'
                        );
                        minus.click();
                        expect(element.value).toBe(4);
                        expect(input.value).toBe('4');
                    });
            });
        });

        describe('Variant', () => {
            it('label-inline', () => {
                element.label = 'This is a label text';
                element.variant = 'label-inline';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="input-counter-label"]'
                    );
                    expect(label.textContent).toBe('This is a label text');
                });
            });
        });
    });

    describe('Methods', () => {
        it('Focus and blur', () => {
            return Promise.resolve()
                .then(() => {
                    element.focus();
                    element.blur();
                })
                .then(() => {
                    expect(element.shadowRoot.activeElement).toBeNull();
                });
        });

        it('checkValidity method', () => {
            const spy = jest.spyOn(element, 'checkValidity');

            element.checkValidity();
            expect(spy).toHaveBeenCalled();
        });

        it('setCustomValidity method', () => {
            const spy = jest.spyOn(element, 'setCustomValidity');

            element.setCustomValidity('Something');
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('Events', () => {
        it('blur', () => {
            const handler = jest.fn();
            element.addEventListener('blur', handler);

            const input = element.shadowRoot.querySelector(
                '[data-element-id="input"]'
            );
            input.dispatchEvent(new CustomEvent('blur'));

            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.bubbles).toBeFalsy();
            expect(call.composed).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
        });

        it('focus', () => {
            const handler = jest.fn();
            element.addEventListener('focus', handler);

            const input = element.shadowRoot.querySelector(
                '[data-element-id="input"]'
            );
            input.focus();

            expect(handler).toHaveBeenCalled();
            const call = handler.mock.calls[0][0];
            expect(call.bubbles).toBeFalsy();
            expect(call.composed).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
        });

        // Input counter change
        it('decrement defaults', () => {
            const handler = jest.fn();
            element.addEventListener('change', handler);

            return Promise.resolve().then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-decrement"]'
                );
                button.click();
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.value).toBe(-1);
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });

        it('decrement to Min floor', () => {
            element.min = 5;
            element.value = 10;
            element.step = 6;

            const handler = jest.fn();
            element.addEventListener('change', handler);

            return Promise.resolve().then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-decrement"]'
                );
                button.click();
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.value).toBe(5);
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });

        it('decrement to Max ceiling', () => {
            element.max = 20;
            element.value = 65;
            element.step = 6;

            const handler = jest.fn();
            element.addEventListener('change', handler);

            return Promise.resolve().then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-decrement"]'
                );
                button.click();
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.value).toBe(20);
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });

        it('increment defaults', () => {
            const handler = jest.fn();
            element.addEventListener('change', handler);

            return Promise.resolve().then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-increment"]'
                );
                button.click();
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.value).toBe(1);
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });

        it('test Max ceiling on increment', () => {
            element.max = 5;
            element.value = 0;
            element.step = 6;

            const handler = jest.fn();
            element.addEventListener('change', handler);

            return Promise.resolve().then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-increment"]'
                );
                button.click();
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.value).toBe(5);
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });

        it('test under Min floor on increment', () => {
            element.min = 5;
            element.value = -19;
            element.step = 6;

            const handler = jest.fn();
            element.addEventListener('change', handler);

            return Promise.resolve().then(() => {
                const button = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-increment"]'
                );
                button.click();
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.value).toBe(5);
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
        });
    });
});
