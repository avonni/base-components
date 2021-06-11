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
import InputDateRange from 'c/inputDateRange';

// not tested
// timezone

const startDate = new Date('7/20/2021 10:00');
const endDate = new Date('7/21/2021 18:15');

describe('Input Date Range', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Input Date Range Default attributes', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });

        expect(element.type).toBe('date');
        expect(element.dateStyle).toBe('medium');
        expect(element.timeStyle).toBe('short');
        expect(element.timezone).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.labelStartDate).toBeUndefined();
        expect(element.labelEndDate).toBeUndefined();
        expect(element.readOnly).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.startDate).toBeUndefined();
        expect(element.endDate).toBeUndefined();
        expect(element.variant).toBe('standard');
    });

    /* ----- ATTRIBUTES ----- */

    // type
    it('Input Date Range date type date', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        element.startDate = startDate;
        element.endDate = endDate;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelectorAll('input');
            expect(input).toHaveLength(2);
            const lightningInput = element.shadowRoot.querySelectorAll(
                'lightning-input'
            );
            expect(lightningInput).toHaveLength(0);
        });
    });

    it('Input Date Range date type datetime', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        element.type = 'datetime';
        element.startDate = startDate;
        element.endDate = endDate;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelectorAll('input');
            expect(input).toHaveLength(2);
            const lightningInput = element.shadowRoot.querySelectorAll(
                'lightning-input'
            );
            expect(lightningInput).toHaveLength(2);
        });
    });

    // date style, start-date and end-date
    it('Input Date Range date style short', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        const sDate = '7/20/2021';
        const eDate = '7/21/2021';
        element.dateStyle = 'short';
        element.startDate = startDate;
        element.endDate = endDate;

        return Promise.resolve().then(() => {
            const startInput = element.shadowRoot.querySelector('.start-date');
            expect(startInput.value).toBe(sDate);
            const endInput = element.shadowRoot.querySelector('.end-date');
            expect(endInput.value).toBe(eDate);
        });
    });

    it('Input Date Range date style medium', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        const startMonth = startDate.toLocaleString('default', {
            month: 'short'
        });
        const startDay = startDate.getDate();
        const startYear = startDate.getFullYear();
        const start = `${startMonth} ${startDay}, ${startYear}`;

        const endMonth = endDate.toLocaleString('default', { month: 'short' });
        const endDay = endDate.getDate();
        const endYear = endDate.getFullYear();
        const end = `${endMonth} ${endDay}, ${endYear}`;

        element.startDate = startDate;
        element.endDate = endDate;

        return Promise.resolve().then(() => {
            const startInput = element.shadowRoot.querySelector('.start-date');
            expect(startInput.value).toBe(start);
            const endInput = element.shadowRoot.querySelector('.end-date');
            expect(endInput.value).toBe(end);
        });
    });

    it('Input Date Range date style long', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        const startMonth = startDate.toLocaleString('default', {
            month: 'long'
        });
        const startDay = startDate.getDate();
        const startYear = startDate.getFullYear();
        const start = `${startMonth} ${startDay}, ${startYear}`;

        const endMonth = endDate.toLocaleString('default', { month: 'long' });
        const endDay = endDate.getDate();
        const endYear = endDate.getFullYear();
        const end = `${endMonth} ${endDay}, ${endYear}`;

        element.dateStyle = 'long';
        element.startDate = startDate;
        element.endDate = endDate;

        return Promise.resolve().then(() => {
            const startInput = element.shadowRoot.querySelector('.start-date');
            expect(startInput.value).toBe(start);
            const endInput = element.shadowRoot.querySelector('.end-date');
            expect(endInput.value).toBe(end);
        });
    });

    //time style
    it('Input Date Range date time style short', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        element.type = 'datetime';
        element.startDate = startDate;
        element.endDate = endDate;
        const startTime = '10:00';
        const endTime = '18:15';

        return Promise.resolve().then(() => {
            const lightningInputs = element.shadowRoot.querySelectorAll(
                'lightning-input'
            );
            lightningInputs.forEach((input) => {
                expect(input.timeStyle).toBe('short');
            });
            expect(lightningInputs[0].value).toBe(startTime);
            expect(lightningInputs[1].value).toBe(endTime);
        });
    });

    it('Input Date Range date time style medium', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        element.type = 'datetime';
        element.timeStyle = 'medium';
        element.startDate = startDate;
        element.endDate = endDate;
        const startTime = '10:00';
        const endTime = '18:15';

        return Promise.resolve().then(() => {
            const lightningInputs = element.shadowRoot.querySelectorAll(
                'lightning-input'
            );
            lightningInputs.forEach((input) => {
                expect(input.timeStyle).toBe('medium');
            });
            expect(lightningInputs[0].value).toBe(startTime);
            expect(lightningInputs[1].value).toBe(endTime);
        });
    });

    it('Input Date Range date time style long', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        element.type = 'datetime';
        element.timeStyle = 'long';
        element.startDate = startDate;
        element.endDate = endDate;
        const startTime = '10:00';
        const endTime = '18:15';

        return Promise.resolve().then(() => {
            const lightningInputs = element.shadowRoot.querySelectorAll(
                'lightning-input'
            );
            lightningInputs.forEach((input) => {
                expect(input.timeStyle).toBe('long');
            });
            expect(lightningInputs[0].value).toBe(startTime);
            expect(lightningInputs[1].value).toBe(endTime);
        });
    });

    // disabled
    it('Input Date Range disabled', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        element.disabled = true;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll('input');
            inputs.forEach((input) => {
                expect(input.disabled).toBeTruthy();
            });
        });
    });

    // field level help
    it('Input Date Range field level help', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        element.fieldLevelHelp = 'This is a field level help text';

        return Promise.resolve().then(() => {
            const helpText = element.shadowRoot.querySelector(
                'lightning-helptext'
            );
            expect(helpText).toBeTruthy();
            expect(helpText.content).toBe('This is a field level help text');
        });
    });

    // label
    it('Input Date Range label', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        element.label = 'This is a label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.avonni-label-container > p'
            );
            expect(label.textContent).toBe('This is a label');
        });
    });

    // label start date
    it('Input Date Range label start date', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        element.labelStartDate = 'This is a label start date';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.textContent).toBe('This is a label start date');
        });
    });

    // label end date
    it('Input Date Range label end date', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        element.labelEndDate = 'This is a label end date';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.textContent).toBe('This is a label end date');
        });
    });

    // read-only
    // Depends on type
    it('Input Date Range read only false', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        element.readOnly = false;
        element.type = 'datetime';

        return Promise.resolve()
            .then(() => {
                // Time inputs should not be read only
                const timeInputs = element.shadowRoot.querySelectorAll(
                    'lightning-input'
                );
                timeInputs.forEach((input) => {
                    expect(input.readOnly).toBeFalsy();
                });

                // Start date input should not be read only
                const startDateInput = element.shadowRoot.querySelector(
                    'input.start-date'
                );

                expect(startDateInput.readOnly).toBeFalsy();
                expect(startDateInput.ariaReadOnly).toBe('false');

                // On focus on start date input, the date picker should open
                startDateInput.dispatchEvent(new CustomEvent('focus'));
            })
            .then(() => {
                const datePicker = element.shadowRoot.querySelector(
                    '.slds-datepicker'
                );
                expect(datePicker).toBeTruthy();

                // End date input should not be read only
                const endDateInput = element.shadowRoot.querySelector(
                    'input.end-date'
                );

                expect(endDateInput.readOnly).toBeFalsy();
                expect(endDateInput.ariaReadOnly).toBe('false');

                // On focus on end date input, the date picker should open
                endDateInput.dispatchEvent(new CustomEvent('focus'));
            })
            .then(() => {
                const datePicker = element.shadowRoot.querySelector(
                    '.slds-datepicker'
                );
                expect(datePicker).toBeTruthy();
            });
    });

    it('Input Date Range read only true', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        element.readOnly = true;
        element.type = 'datetime';

        return Promise.resolve()
            .then(() => {
                // Time inputs should be read only
                const timeInputs = element.shadowRoot.querySelectorAll(
                    'lightning-input'
                );
                timeInputs.forEach((input) => {
                    expect(input.readOnly).toBeTruthy();
                });

                // Start date input should be read only
                const startDateInput = element.shadowRoot.querySelector(
                    'input.start-date'
                );

                expect(startDateInput.readOnly).toBeTruthy();
                expect(startDateInput.ariaReadOnly).toBe('true');

                // On focus on start date input, the date picker should not open
                startDateInput.dispatchEvent(new CustomEvent('focus'));
            })
            .then(() => {
                const datePicker = element.shadowRoot.querySelector(
                    '.slds-datepicker'
                );
                expect(datePicker).toBeFalsy();

                // End date input should be read only
                const endDateInput = element.shadowRoot.querySelector(
                    'input.end-date'
                );

                expect(endDateInput.readOnly).toBeTruthy();
                expect(endDateInput.ariaReadOnly).toBe('true');

                // On focus on end date input, the date picker should not open
                endDateInput.dispatchEvent(new CustomEvent('focus'));
            })
            .then(() => {
                const datePicker = element.shadowRoot.querySelector(
                    '.slds-datepicker'
                );
                expect(datePicker).toBeFalsy();
            });
    });

    // required
    it('Input Date Range required', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        element.required = true;

        return Promise.resolve().then(() => {
            const required = element.shadowRoot.querySelector('.slds-required');
            expect(required).toBeTruthy();
            expect(required.textContent).toBe('*');
        });
    });

    // variant
    it('Input Date Range variant standard', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        element.variant = 'standard';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.avonni-label-container'
            );
            const wrapper = element.shadowRoot.querySelector('div');

            expect(label.classList).not.toContain('slds-assistive-text');
            expect(label.classList).not.toContain('slds-m-right_small');
            expect(wrapper.classList).not.toContain('slds-grid');
        });
    });

    it('Input Date Range variant label-hidden', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        element.variant = 'label-hidden';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.avonni-label-container'
            );
            const wrapper = element.shadowRoot.querySelector('div');

            expect(label.classList).toContain('slds-assistive-text');
            expect(label.classList).not.toContain('slds-m-right_small');
            expect(wrapper.classList).not.toContain('slds-grid');
        });
    });

    it('Input Date Range variant label-inline', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        element.variant = 'label-inline';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.avonni-label-container'
            );
            const wrapper = element.shadowRoot.querySelector('div');

            expect(label.classList).not.toContain('slds-assistive-text');
            expect(label.classList).toContain('slds-m-right_small');
            expect(wrapper.classList).toContain('slds-grid');
        });
    });

    it('Input Date Range variant stacked', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        element.variant = 'stacked';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.avonni-label-container'
            );
            const wrapper = element.shadowRoot.querySelector('div');

            expect(label.classList).not.toContain('slds-assistive-text');
            expect(label.classList).not.toContain('slds-m-right_small');
            expect(wrapper.classList).not.toContain('slds-grid');
        });
    });

    /* ----- METHODS ----- */

    // Input date range method focus
    it('Input date range method: focus', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        let focusEvent = false;
        const startInput = element.shadowRoot.querySelector('.start-date');
        startInput.addEventListener('focus', () => {
            focusEvent = true;
        });
        startInput.focus();

        return Promise.resolve().then(() => {
            expect(focusEvent).toBeTruthy();
        });
    });

    // Input date range method blur
    it('Input date range method: blur', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        let blurEvent = false;
        const startInput = element.shadowRoot.querySelector('.start-date');

        startInput.focus();

        startInput.addEventListener('blur', () => {
            blurEvent = true;
        });

        startInput.blur();

        return Promise.resolve().then(() => {
            expect(blurEvent).toBeTruthy();
        });
    });

    /* ----- EVENTS ----- */

    // Input date range change
    it('Input date range change event', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        element.startDate = startDate;
        element.endDate = endDate;
        const startInput = element.shadowRoot.querySelector('.start-date');
        const handler = jest.fn();

        startInput.addEventListener('change', handler);

        return Promise.resolve()
            .then(() => {
                startInput.dispatchEvent(
                    new CustomEvent('change', {
                        detail: { startDate: startDate, endDate: endDate }
                    })
                );
            })
            .then(() => {
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.startDate).toBe(
                    startDate
                );
                expect(handler.mock.calls[0][0].detail.endDate).toBe(endDate);
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
    });

    // Input date range change
    it('Input date range change event with timezone', () => {
        const element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        document.body.appendChild(element);

        element.startDate = startDate;
        element.endDate = endDate;
        element.timezone = 'America/Port-au-Prince';
        const startInput = element.shadowRoot.querySelector('.start-date');
        const handler = jest.fn();

        startInput.addEventListener('change', handler);

        return Promise.resolve()
            .then(() => {
                startInput.dispatchEvent(
                    new CustomEvent('change', {
                        detail: { startDate: startDate, endDate: endDate }
                    })
                );
            })
            .then(() => {
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.startDate).toBe(
                    startDate
                );
                expect(handler.mock.calls[0][0].detail.endDate).toBe(endDate);
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
    });
});
