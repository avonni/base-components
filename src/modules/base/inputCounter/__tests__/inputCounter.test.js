/**
 * BSD 3-Clause License
 *
 * Copyright (c) 2021, Avonni Labs, Inc.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the copyright holder nor the names of its
 *   contributors may be used to endorse or promote products derived from
 *   this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

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
            expect(element.disabled).toBeFalsy();
            expect(element.fieldLevelHelp).toBeUndefined();
            expect(element.fractionDigits).toBeUndefined();
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
            expect(element.step).toBe(1);
            expect(element.type).toBe('number');
            expect(element.value).toBeNull();
            expect(element.variant).toBe('standard');
        });

        describe('Access Key', () => {
            it('accessKey', () => {
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
            it('aria-label', () => {
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
            it('disabled', () => {
                element.disabled = true;

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="input"]'
                    );
                    expect(input.disabled).toBeTruthy();
                });
            });
        });

        describe('Field Level Help', () => {
            it('fieldLevelHelp', () => {
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
            it('fractionDigits', () => {
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

        describe('Label', () => {
            it('label', () => {
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
            it('test Max and value unchanged on increment', () => {
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
            it('test Min and value unchanged on decrement', () => {
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
            it('name', () => {
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
            it('step', () => {
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
            it('readOnly', () => {
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
            it('required', () => {
                element.required = true;

                return Promise.resolve().then(() => {
                    const required = element.shadowRoot.querySelector(
                        '[data-element-id="abbr"]'
                    );
                    expect(required).toBeTruthy();
                    expect(required.textContent).toBe('*');
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
            it('value', () => {
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
