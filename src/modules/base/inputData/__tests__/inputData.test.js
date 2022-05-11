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
import InputData from 'c/inputData';

let element;
describe('InputData', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('avonni-input-data', {
            is: InputData
        });
        document.body.appendChild(element);
    });

    /* ----- ATTRIBUTES ----- */

    it('Input data: Default attributes', () => {
        expect(element.label).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.placeholder).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.readOnly).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.type).toBe('text');
        expect(element.value).toBe('');
        expect(element.latitude).toBeUndefined();
        expect(element.longitude).toBeUndefined();
    });

    it('Input data: Label attribute', () => {
        element.label = 'Base input';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );
            expect(input.label).toBe('Base input');
        });
    });

    it('Input data: No label attribute', () => {
        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );
            expect(input.label).toBe('Data input');
            expect(input.variant).toBe('label-hidden');
        });
    });

    it('Input data: Disabled attribute', () => {
        element.label = 'Base input';
        element.disabled = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );
            expect(input.disabled).toBeTruthy();
        });
    });

    it('Input data: Read-only attribute', () => {
        element.label = 'Base input';
        element.readOnly = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );
            expect(input.readOnly).toBeTruthy();
        });
    });

    it('Input data: Required attribute', () => {
        element.label = 'Base input';
        element.required = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );
            expect(input.required).toBeTruthy();
        });
    });

    it('Input data: Variant attribute', () => {
        element.label = 'Base input';
        element.variant = 'label-inline';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );
            expect(input.variant).toBe('label-inline');
        });
    });

    it('Input data: Value attribute', () => {
        element.label = 'Base input';
        element.value = 'Default text';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );
            expect(input.value).toBe('Default text');
        });
    });

    it('Input data: Undefined value attribute', () => {
        element.label = 'Base input';
        element.value = undefined;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );
            expect(input.value).toBe('');
        });
    });

    it('Input data: Checked attribute', () => {
        element.label = 'Base input';
        element.type = 'checkbox';
        element.checked = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );
            expect(input.checked).toBeTruthy();
        });
    });

    it('Input data: Valid location attributes', () => {
        element.label = 'Base input';
        element.type = 'location';
        element.latitude = 80;
        element.longitude = -50;

        return Promise.resolve().then(() => {
            const locationInput = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-location"]'
            );
            expect(locationInput.latitude).toBe(80);
            expect(locationInput.longitude).toBe(-50);
        });
    });

    it('Input data: Corrected positive location attributes', () => {
        element.label = 'Base input';
        element.type = 'location';
        element.latitude = 100;
        element.longitude = 200;

        return Promise.resolve().then(() => {
            const locationInput = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-location"]'
            );
            expect(locationInput.latitude).toBe(90);
            expect(locationInput.longitude).toBe(180);
        });
    });

    it('Input data: Corrected negative location attributes', () => {
        element.label = 'Base input';
        element.type = 'location';
        element.latitude = -100;
        element.longitude = -200;

        return Promise.resolve().then(() => {
            const locationInput = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-location"]'
            );
            expect(locationInput.latitude).toBe(-90);
            expect(locationInput.longitude).toBe(-180);
        });
    });

    it('Input data: Valid location attributes as (0, 0)', () => {
        element.label = 'Base input';
        element.type = 'location';
        element.latitude = 0;
        element.longitude = 0;

        return Promise.resolve().then(() => {
            const locationInput = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-location"]'
            );
            expect(locationInput.latitude).toBe(0);
            expect(locationInput.longitude).toBe(0);
        });
    });

    it('Input data: Undefined location attributes', () => {
        element.label = 'Base input';
        element.type = 'location';
        element.latitude = undefined;
        element.longitude = undefined;

        return Promise.resolve().then(() => {
            const locationInput = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-location"]'
            );
            expect(locationInput.latitude).toBeUndefined();
            expect(locationInput.longitude).toBeUndefined();
        });
    });

    /* ----- DATA INPUT TYPES ----- */

    it('Input data: Boolean input', () => {
        element.label = 'Label';
        element.type = 'boolean';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );
            expect(input.type).toBe('checkbox');
        });
    });

    it('Input data: Number input', () => {
        element.label = 'Label';
        element.type = 'number';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );
            expect(input.type).toBe('number');
            expect(input.formatter).toBe('decimal');
        });
    });

    it('Input data: Currency input', () => {
        element.label = 'Label';
        element.type = 'currency';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );
            expect(input.type).toBe('number');
            expect(input.formatter).toBe('currency');
        });
    });

    it('Input data: Percent input', () => {
        element.label = 'Label';
        element.type = 'percent';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );
            expect(input.type).toBe('number');
            expect(input.formatter).toBe('percent');
        });
    });

    it('Input data: Date input', () => {
        element.label = 'Label';
        element.type = 'date';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );
            expect(input.type).toBe('date');
        });
    });

    it('Input data: Email input', () => {
        element.label = 'Label';
        element.type = 'email';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );
            expect(input.type).toBe('email');
        });
    });

    it('Input data: Location input', () => {
        element.label = 'Label';
        element.type = 'location';

        return Promise.resolve().then(() => {
            const baseInput = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );
            const locationInput = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-location"]'
            );
            expect(baseInput).toBeFalsy();
            expect(locationInput).toBeTruthy();
        });
    });

    it('Input data: Phone input', () => {
        element.label = 'Label';
        element.type = 'phone';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-phone"]'
            );
            expect(input.type).toBe('tel');
        });
    });

    it('Input data: Phone input with default value to format', () => {
        element.type = 'phone';
        element.label = 'Label';
        element.value = '1234567890';
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-phone"]'
            );
            expect(input.value).toBe('123-456-7890');
        });
    });

    it('Input data: URL input', () => {
        element.label = 'Label';
        element.type = 'url';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );
            expect(input.type).toBe('url');
        });
    });

    it('Input data: Text input', () => {
        element.label = 'Label';
        element.type = 'text';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input-base"]'
            );
            expect(input.type).toBe('text');
        });
    });

    /* ----- BEHAVIOR ON INPUT CHANGE ----- */

    it('Input data: Formatted valid phone input', () => {
        element.label = 'Label';
        element.type = 'phone';

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-phone"]'
                );
                input.value = '4501234567';
                input.dispatchEvent(new CustomEvent('change'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-phone"]'
                );
                expect(input.value).toBe('450-123-4567');
            });
    });

    it('Input data: Formatted invalid phone input with 7 digits', () => {
        element.label = 'Label';
        element.type = 'phone';

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-phone"]'
                );
                input.value = '4501234';
                input.dispatchEvent(new CustomEvent('change'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-phone"]'
                );
                expect(input.value).toBe('450-123-4');
            });
    });

    it('Input data: Formatted invalid phone input with 5 digits', () => {
        element.label = 'Label';
        element.type = 'phone';

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-phone"]'
                );
                input.value = '45012';
                input.dispatchEvent(new CustomEvent('change'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-phone"]'
                );
                expect(input.value).toBe('450-12');
            });
    });

    it('Input data: Formatted invalid phone input without with 1 digit', () => {
        element.label = 'Label';
        element.type = 'phone';

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-phone"]'
                );
                input.value = '4';
                input.dispatchEvent(new CustomEvent('change'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-phone"]'
                );
                expect(input.value).toBe('4');
            });
    });

    it('Input data: Location input change for adding values', () => {
        element.label = 'Label';
        element.type = 'location';

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-location"]'
                );
                input.latitude = 10;
                input.longitude = -10;
                input.dispatchEvent(new CustomEvent('change'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-location"]'
                );
                expect(input.latitude).toBe(10);
                expect(input.longitude).toBe(-10);
            });
    });

    it('Input data: Location input change for removing values', () => {
        element.label = 'Label';
        element.type = 'location';
        element.latitude = 80;
        element.longitude = -50;

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-location"]'
                );
                input.latitude = undefined;
                input.longitude = undefined;
                input.dispatchEvent(new CustomEvent('change'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-location"]'
                );
                expect(input.latitude).toBeUndefined();
                expect(input.longitude).toBeUndefined();
            });
    });

    it('Input data: Text input change for removing value', () => {
        element.label = 'Label';

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-base"]'
                );
                input.value = '';
                input.dispatchEvent(new CustomEvent('change'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-base"]'
                );
                expect(input.value).toBe('');
            });
    });

    /* ----- HANDLING LIGHTNING-INPUT EVENTS AND THEIR TRANSFER (FOR COVERAGE PURPOSES) ----- */

    it('Input data: Transfer commit event', () => {
        element.label = 'Label';

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-base"]'
                );
                input.value = 'Simple text';
                input.dispatchEvent(new CustomEvent('commit'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input-base"]'
                );
                expect(input.value).toBe('Simple text');
            });
    });

    it('Input data: Transfer blur event', () => {
        element.label = 'Label';

        const handler = jest.fn();

        const input = element.shadowRoot.querySelector(
            '[data-element-id="lightning-input-base"]'
        );

        input.addEventListener('blur', handler);

        return Promise.resolve()
            .then(() => {
                input.value = 'Simple text';
                input.dispatchEvent(new CustomEvent('blur'));
            })
            .then(() => {
                expect(input.value).toBe('Simple text');
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
    });

    it('Input data: Transfer focus event', () => {
        element.label = 'Label';
        const handler = jest.fn();

        const input = element.shadowRoot.querySelector(
            '[data-element-id="lightning-input-base"]'
        );

        input.addEventListener('focus', handler);

        return Promise.resolve()
            .then(() => {
                input.value = 'Simple text';
                input.dispatchEvent(new CustomEvent('focus'));
            })
            .then(() => {
                expect(input.value).toBe('Simple text');
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
    });

    /* ----- PUBLIC METHODS ----- */

    it('Input data: Transfer focus and blur', () => {
        element.label = 'Label';

        return Promise.resolve()
            .then(() => {
                element.focus();
                element.blur();
            })
            .then(() => {
                expect(element.shadowRoot.activeElement).toBeNull();
            });
    });

    it('Input data: Transfer error messages on basic input', () => {
        element.label = 'Label';

        return Promise.resolve()
            .then(() => {
                element.setCustomValidity('Error');
                element.setCustomValidityForField('Latitude error', 'latitude'); // Will be ignored
            })
            .then(() => {
                expect(element.showHelpMessageIfInvalid()).toBeFalsy();
            });
    });

    it('Input data: Transfer error messages on location input', () => {
        element.label = 'Label';
        element.type = 'location';

        return Promise.resolve()
            .then(() => {
                element.setCustomValidityForField('Latitude error', 'latitude');
                element.setCustomValidity('Error'); // Will be ignored
            })
            .then(() => {
                expect(element.showHelpMessageIfInvalid()).toBeFalsy();
            });
    });
});
