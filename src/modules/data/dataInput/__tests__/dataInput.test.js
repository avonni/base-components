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
import DataInput from 'c/dataInput';

describe('DataInput', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    /* ----- ATTRIBUTES ----- */

    it('Default attributes', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        expect(element.label).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.placeholder).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.readOnly).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.type).toBe('text');
    });

    it('Label attribute', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        element.label = 'Base input';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.label).toBe('Base input');
        });
    });

    it('No label attribute', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.label).toBe('Data input');
            expect(input.variant).toBe('label-hidden');
        });
    });

    it('Disabled attribute', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        element.label = 'Base input';
        element.disabled = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.disabled).toBeTruthy();
        });
    });

    it('Read-only attribute', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        element.label = 'Base input';
        element.readOnly = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.readOnly).toBeTruthy();
        });
    });

    it('Required attribute', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        element.label = 'Base input';
        element.required = true;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.required).toBeTruthy();
        });
    });

    it('Variant attribute', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        element.label = 'Base input';
        element.variant = 'label-inline';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.variant).toBe('label-inline');
        });
    });

    /* ----- DATA INPUT TYPES ----- */

    it('Boolean input', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        element.label = 'Label';
        element.type = 'boolean';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.type).toBe('checkbox');
        });
    });

    it('Number input', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        element.label = 'Label';
        element.type = 'number';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.type).toBe('number');
            expect(input.formatter).toBe('decimal');
        });
    });

    it('Currency input', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        element.label = 'Label';
        element.type = 'currency';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.type).toBe('number');
            expect(input.formatter).toBe('currency');
        });
    });

    it('Percent input', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        element.label = 'Label';
        element.type = 'percent';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.type).toBe('number');
            expect(input.formatter).toBe('percent');
        });
    });

    it('Date input', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        element.label = 'Label';
        element.type = 'date';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.type).toBe('date');
        });
    });

    it('Email input', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        element.label = 'Label';
        element.type = 'email';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.type).toBe('email');
        });
    });

    it('Location input', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        element.label = 'Label';
        element.type = 'location';

        return Promise.resolve().then(() => {
            const baseInput = element.shadowRoot.querySelector(
                'lightning-input'
            );
            const locationInput = element.shadowRoot.querySelector(
                'lightning-input-location'
            );
            expect(baseInput).toBeFalsy();
            expect(locationInput).toBeTruthy();
        });
    });

    it('Phone input', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        element.label = 'Label';
        element.type = 'phone';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.type).toBe('tel');
        });
    });

    it('URL input', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        element.label = 'Label';
        element.type = 'url';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.type).toBe('url');
        });
    });

    it('Text input', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        element.label = 'Label';
        element.type = 'text';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector('lightning-input');
            expect(input.type).toBe('text');
        });
    });

    /* ----- PHONE INPUT FORMAT ----- */

    it('Formatted valid phone input', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        element.label = 'Label';
        element.type = 'phone';

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    'lightning-input'
                );
                input.value = '4501234567';
                input.dispatchEvent(new CustomEvent('change'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    'lightning-input'
                );
                expect(input.value).toBe('450-123-4567');
            });
    });

    it('Formatted invalid phone input with 7 digits', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        element.label = 'Label';
        element.type = 'phone';

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    'lightning-input'
                );
                input.value = '4501234';
                input.dispatchEvent(new CustomEvent('change'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    'lightning-input'
                );
                expect(input.value).toBe('450-123-4');
            });
    });

    it('Formatted invalid phone input with 5 digits', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        element.label = 'Label';
        element.type = 'phone';

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    'lightning-input'
                );
                input.value = '45012';
                input.dispatchEvent(new CustomEvent('change'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    'lightning-input'
                );
                expect(input.value).toBe('450-12');
            });
    });

    it('Formatted invalid phone input without with 1 digit', () => {
        const element = createElement('avonni-data-input', {
            is: DataInput
        });
        document.body.appendChild(element);

        element.label = 'Label';
        element.type = 'phone';

        return Promise.resolve()
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    'lightning-input'
                );
                input.value = '4';
                input.dispatchEvent(new CustomEvent('change'));
            })
            .then(() => {
                const input = element.shadowRoot.querySelector(
                    'lightning-input'
                );
                expect(input.value).toBe('4');
            });
    });
});
