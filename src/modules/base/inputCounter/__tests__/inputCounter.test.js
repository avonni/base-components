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
import InputCounter from 'c/inputCounter';

// Not tested
// aria-controls
// aria-labelled-by
// aria-described-by
// Not tested because cannot test lightning-input:
// messageWhenBadInput
// messageWhenPatternMismatch
// messageWhenRangeOverflow
// messageWhenRangeUnderflow
// messageWhenStepMismatch
// messageWhenValueMissing
// focus method
// blur method

let element;
describe('Input Counter', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-input-counter', {
            is: InputCounter
        });
        document.body.appendChild(element);
    });

    it('Input Counter Default attributes', () => {
        expect(element.name).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.messageWhenBadInput).toBeUndefined();
        expect(element.messageWhenPatternMismatch).toBeUndefined();
        expect(element.messageWhenRangeOverflow).toBeUndefined();
        expect(element.messageWhenRangeUnderflow).toBeUndefined();
        expect(element.messageWhenStepMismatch).toBeUndefined();
        expect(element.messageWhenValueMissing).toBeUndefined();
        expect(element.ariaLabel).toBeUndefined();
        expect(element.ariaControls).toBeUndefined();
        expect(element.ariaLabelledBy).toBeUndefined();
        expect(element.ariaDescribedBy).toBeUndefined();
        expect(element.max).toBeUndefined();
        expect(element.min).toBeUndefined();
        expect(element.step).toBe(1);
        expect(element.value).toBeNull();
        expect(element.variant).toBe('standard');
        expect(element.disabled).toBeFalsy();
        expect(element.readOnly).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.accessKey).toBeUndefined();
        expect(element.type).toBe('number');
        expect(element.fractionDigits).toBeUndefined();
    });

    /* ----- ATTRIBUTES ----- */

    // name
    it('Input Counter name', () => {
        element.name = 'This is a name text';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );
            expect(input.name).toBe('This is a name text');
        });
    });

    // label
    it('Input Counter label', () => {
        element.label = 'This is a label text';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="input-counter-label"]'
            );
            expect(label.textContent).toBe('This is a label text');
        });
    });

    it('Input Counter label label-inline', () => {
        element.label = 'This is a label text';
        element.variant = 'label-inline';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="input-counter-label"]'
            );
            expect(label.textContent).toBe('This is a label text');
        });
    });

    // aria-label
    it('Input Counter aria-label', () => {
        element.ariaLabel = 'Aria-label';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );
            expect(input.ariaLabel).toBe('Aria-label');
        });
    });

    // max
    it('Input Counter max', () => {
        element.max = 20;

        return Promise.resolve().then(() => {
            expect(element.max).toBe(20);
        });
    });

    // min
    it('Input Counter min', () => {
        element.min = 5;

        return Promise.resolve().then(() => {
            expect(element.min).toBe(5);
        });
    });

    // step
    it('Input Counter step // no input-step given - defaults to 1', () => {
        element.step = 5;
        element.value = 0;
        element.fractionDigits = null;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="lightning-input"]'
        );

        return Promise.resolve()
            .then(() => {
                expect(input.step).toBe(1);
                expect(element.value).toBe(0);
            })
            .then(() => {
                const addButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-increment"]'
                );
                addButton.click();
                expect(element.value).toBe(5);
            });
    });

    it('Input Counter step no decimal // input-step 0.01', () => {
        element.step = 5;
        element.value = 0;
        element.fractionDigits = 2;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="lightning-input"]'
        );

        return Promise.resolve()
            .then(() => {
                expect(input.step).toBe(0.01);
                expect(element.value).toBe(0);
            })
            .then(() => {
                const addButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-increment"]'
                );
                addButton.click();
                expect(element.value).toBe(5);
            });
    });

    it('Input Counter step decimal // input-step 0.01', () => {
        element.step = 5.55;
        element.value = 0;
        element.fractionDigits = 2;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="lightning-input"]'
        );

        return Promise.resolve()
            .then(() => {
                expect(input.step).toBe(0.01);
                expect(element.value).toBe(0);
            })
            .then(() => {
                const addButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-increment"]'
                );
                addButton.click();
                expect(element.value).toBe(5.55);
            });
    });

    // Precision Handler
    it('Input Counter Precision step decimal // input-step', () => {
        element.step = 55.3658;
        element.value = 1256.789;
        element.fractionDigits = 3;
        const input = element.shadowRoot.querySelector(
            '[data-element-id="lightning-input"]'
        );

        return Promise.resolve()
            .then(() => {
                expect(input.step).toBe(0.001);
                expect(element.value).toBe(1256.789);
            })
            .then(() => {
                const addButton = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-increment"]'
                );
                addButton.click();
                expect(element.value).toBe(1312.155);
            });
    });

    // value
    it('Input Counter value', () => {
        element.value = 5;

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );
                expect(input.value).toBe(5);
            })
            .then(() => {
                const minus = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-button-icon-decrement"]'
                );
                minus.click();
                expect(element.value).toBe(4);
            });
    });

    // type
    it('Input Counter number', () => {
        element.type = 'number';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );
            expect(input.formatter).toBe('number');
        });
    });

    it('Input Counter percent', () => {
        element.type = 'percent';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );
            expect(input.formatter).toBe('percent');
        });
    });

    it('Input Counter currency', () => {
        element.type = 'currency';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );
            expect(input.formatter).toBe('currency');
        });
    });

    // disabled
    it('Input Counter disabled', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );
            expect(input.disabled).toBeTruthy();
        });
    });

    // read only
    it('Input Counter read only', () => {
        element.readOnly = true;

        return Promise.resolve().then(() => {
            const buttonIcon = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button-icon"]'
            );
            expect(buttonIcon).toHaveLength(0);
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );
            expect(input.className).toBe('');
        });
    });

    // required needs to be label inline
    it('Input Counter required', () => {
        element.required = true;

        return Promise.resolve().then(() => {
            const required = element.shadowRoot.querySelector(
                '[data-element-id="abbr"]'
            );
            expect(required).toBeTruthy();
            expect(required.textContent).toBe('*');
        });
    });

    // field level help
    it('Input Counter field level help', () => {
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

    /* ----- EVENTS ----- */

    // Input counter change
    it('Input counter change event // decrement defaults', () => {
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

    it('Input counter change event // decrement to Min floor', () => {
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

    it('Input counter change event // decrement to Max ceiling', () => {
        element.max = 20;
        element.value = 25;
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

    it('Input counter change event // increment defaults', () => {
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

    it('Input counter test Max ceiling on increment', () => {
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

    it('Input counter test under Min floor on increment', () => {
        element.min = 5;
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

    it('Input counter test Max and value unchanged on increment', () => {
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
                    '[data-element-id="lightning-input"]'
                );
                expect(input.value).toBe(5);
            });
    });

    it('Input counter test Min and value unchanged on decrement', () => {
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
                    '[data-element-id="lightning-input"]'
                );
                expect(input.value).toBe(5);
            });
    });
});
