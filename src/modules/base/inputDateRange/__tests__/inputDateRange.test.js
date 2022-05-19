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
import InputDateRange from 'avonni/inputDateRange';

// not tested
// timezone, date changes (occur inside lightning-focus-trap), calendar focus in

const startDate = new Date('7/20/2021 10:00');
const endDate = new Date('7/21/2021 18:15');

let element;
describe('Input Date Range', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-input-date-range', {
            is: InputDateRange
        });
        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(), 0);
        });
        document.body.appendChild(element);
    });

    it('Input Date Range: Default attributes', () => {
        expect(element.type).toBe('date');
        expect(element.dateStyle).toBe('medium');
        expect(element.timeStyle).toBe('short');
        expect(element.timezone).toBeUndefined();
        expect(element.disabled).toBeFalsy();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.labelStartDate).toBeUndefined();
        expect(element.labelStartTime).toBeUndefined();
        expect(element.labelEndDate).toBeUndefined();
        expect(element.labelEndTime).toBeUndefined();
        expect(element.readOnly).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.messageWhenValueMissing).toBeUndefined();
        expect(element.startDate).toBeUndefined();
        expect(element.endDate).toBeUndefined();
        expect(element.value).toMatchObject({
            endDate: undefined,
            startDate: undefined
        });
        expect(element.validity).toMatchObject({});
        expect(element.variant).toBe('standard');
    });

    /* ----- ATTRIBUTES ----- */

    // type
    it('Input Date Range: date type date', () => {
        element.startDate = startDate;
        element.endDate = endDate;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelectorAll(
                '[data-element-id^="input"]'
            );
            expect(input).toHaveLength(2);
            const lightningInput = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-input"]'
            );
            expect(lightningInput).toHaveLength(0);
        });
    });

    it('Input Date Range: date type datetime', () => {
        element.type = 'datetime';
        element.startDate = startDate;
        element.endDate = endDate;

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelectorAll(
                '[data-element-id^="input"]'
            );
            expect(input).toHaveLength(2);
            const lightningInput = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-input"]'
            );
            expect(lightningInput).toHaveLength(2);
        });
    });

    // date style, start-date and end-date
    it('Input Date Range: date style short', () => {
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

    it('Input Date Range: date style medium', () => {
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

    it('Input Date Range: date style long', () => {
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
    it('Input Date Range: date time style short', () => {
        element.type = 'datetime';
        element.startDate = startDate;
        element.endDate = endDate;
        const startTime = '10:00';
        const endTime = '18:15';

        return Promise.resolve().then(() => {
            const lightningInputs = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-input"]'
            );
            lightningInputs.forEach((input) => {
                expect(input.timeStyle).toBe('short');
            });
            expect(lightningInputs[0].value).toBe(startTime);
            expect(lightningInputs[1].value).toBe(endTime);
        });
    });

    it('Input Date Range: date time style medium', () => {
        element.type = 'datetime';
        element.timeStyle = 'medium';
        element.startDate = startDate;
        element.endDate = endDate;
        const startTime = '10:00';
        const endTime = '18:15';

        return Promise.resolve().then(() => {
            const lightningInputs = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-input"]'
            );
            lightningInputs.forEach((input) => {
                expect(input.timeStyle).toBe('medium');
            });
            expect(lightningInputs[0].value).toBe(startTime);
            expect(lightningInputs[1].value).toBe(endTime);
        });
    });

    it('Input Date Range: date time style long', () => {
        element.type = 'datetime';
        element.timeStyle = 'long';
        element.startDate = startDate;
        element.endDate = endDate;
        const startTime = '10:00';
        const endTime = '18:15';

        return Promise.resolve().then(() => {
            const lightningInputs = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-input"]'
            );
            lightningInputs.forEach((input) => {
                expect(input.timeStyle).toBe('long');
            });
            expect(lightningInputs[0].value).toBe(startTime);
            expect(lightningInputs[1].value).toBe(endTime);
        });
    });

    // disabled
    it('Input Date Range: disabled', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-element-id^="input"]'
            );
            inputs.forEach((input) => {
                expect(input.disabled).toBeTruthy();
            });
        });
    });

    // field level help
    it('Input Date Range: field level help', () => {
        element.fieldLevelHelp = 'This is a field level help text';

        return Promise.resolve().then(() => {
            const helpText = element.shadowRoot.querySelector(
                '[data-element-id="lightning-helptext"]'
            );
            expect(helpText).toBeTruthy();
            expect(helpText.content).toBe('This is a field level help text');
        });
    });

    // keyboard access
    it('Input Date Range: open start calendar with keyboard', () => {
        return Promise.resolve()
            .then(() => {
                const startInput = element.shadowRoot.querySelector(
                    '[data-element-id="input-start-date"]'
                );
                startInput.click();
            })
            .then(() => {
                const startCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-start-date"]'
                );
                expect(startCalendar).toBeTruthy();
            });
    });

    it('Input Date Range: open and escape start calendar with keyboard on icon', () => {
        return Promise.resolve()
            .then(() => {
                const startInput = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-icon-start-date"]'
                );
                startInput.click();
            })
            .then(() => {
                const startCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-start-date"]'
                );
                expect(startCalendar).toBeTruthy();
            })
            .then(() => {
                const startInput = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-icon-start-date"]'
                );
                startInput.dispatchEvent(
                    new KeyboardEvent('keydown', {
                        key: 'Escape',
                        bubbles: true
                    })
                );
            })
            .then(() => {
                const startCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-start-date"]'
                );
                expect(startCalendar).toBeFalsy();
            });
    });

    it('Input Date Range: open and escape end calendar with keyboard on icon', () => {
        return Promise.resolve()
            .then(() => {
                const endInput = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-icon-end-date"]'
                );
                endInput.click();
            })
            .then(() => {
                const endCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-end-date"]'
                );
                expect(endCalendar).toBeTruthy();
            })
            .then(() => {
                const endInput = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-icon-end-date"]'
                );
                endInput.dispatchEvent(
                    new KeyboardEvent('keydown', {
                        key: 'Escape',
                        bubbles: true
                    })
                );
            })
            .then(() => {
                const endCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-end-date"]'
                );
                expect(endCalendar).toBeFalsy();
            });
    });

    // label
    it('Input Date Range: label', () => {
        element.label = 'This is a label';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="p-label"]'
            );
            expect(label.textContent).toBe('This is a label');
        });
    });

    // label start date
    it('Input Date Range: label start date', () => {
        element.labelStartDate = 'This is a label start date';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.textContent).toBe('This is a label start date');
        });
    });

    // label start time
    it('Input Date Range: label start time', () => {
        element.type = 'datetime';
        element.labelStartTime = 'This is a label start time';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.textContent).toBe('This is a label start time');
        });
    });

    // label end date
    it('Input Date Range: label end date', () => {
        element.labelEndDate = 'This is a label end date';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.textContent).toBe('This is a label end date');
        });
    });

    // label start time
    it('Input Date Range: label end time', () => {
        element.type = 'datetime';
        element.labelEndTime = 'This is a label end time';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label.textContent).toBe('This is a label end time');
        });
    });

    // read only
    it('Input Date Range: read only false', () => {
        element.readOnly = false;
        element.type = 'datetime';

        return Promise.resolve().then(() => {
            const lightningInputs = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-input"]'
            );
            const inputs = element.shadowRoot.querySelectorAll(
                '[data-element-id^="input"]'
            );
            inputs.forEach((input) => {
                expect(input.readOnly).toBeFalsy();
            });
            lightningInputs.forEach((input) => {
                expect(input.readOnly).toBeFalsy();
            });
        });
    });

    it('Input Date Range: read only true', () => {
        element.readOnly = true;
        element.type = 'datetime';
        element.startDate = startDate;
        element.endDate = endDate;

        return Promise.resolve().then(() => {
            const startDateString = element.shadowRoot.querySelector(
                '[data-element-id="start-date"]'
            );
            expect(startDateString.textContent).toBeTruthy();

            const endDateString = element.shadowRoot.querySelector(
                '[data-element-id="end-date"]'
            );
            expect(endDateString.textContent).toBeTruthy();
        });
    });

    it('Input Date Range: Case: SELECT_ONLY_START', () => {
        return Promise.resolve()
            .then(() => {
                const startInput = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-icon-start-date"]'
                );
                startInput.click();
            })
            .then(() => {
                const startCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-start-date"]'
                );
                startCalendar.dispatchEvent(
                    new CustomEvent('change', {
                        detail: {
                            value: [new Date('7/25/2021')],
                            clickedDate: new Date('7/25/2021')
                        }
                    })
                );
                expect(element.value).toMatchObject({
                    startDate: new Date('7/25/2021'),
                    endDate: undefined
                });
                jest.runAllTimers();
            })
            .then(() => {
                const endCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-end-date"]'
                );
                expect(endCalendar).toBeTruthy();
            });
    });

    it('Input Date Range: Case: SELECT_ONLY_END', () => {
        return Promise.resolve()
            .then(() => {
                const endInput = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-icon-end-date"]'
                );
                endInput.click();
            })
            .then(() => {
                const endCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-end-date"]'
                );
                endCalendar.dispatchEvent(
                    new CustomEvent('change', {
                        detail: {
                            value: [new Date('7/25/2021')],
                            clickedDate: new Date('7/25/2021')
                        }
                    })
                );
                expect(element.value).toMatchObject({
                    startDate: undefined,
                    endDate: new Date('7/25/2021')
                });
                jest.runAllTimers();
            })
            .then(() => {
                const startCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-start-date"]'
                );
                expect(startCalendar).toBeTruthy();
                jest.runAllTimers();
            })
            .then(() => {
                const endCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-end-date"]'
                );
                expect(endCalendar).toBeFalsy();
            });
    });

    it('Input Date Range: Case: SELECT_NEW_START', () => {
        element.startDate = new Date('7/15/2021');
        element.endDate = new Date('7/30/2021');

        return Promise.resolve()
            .then(() => {
                const startInput = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-icon-start-date"]'
                );
                startInput.click();
            })
            .then(() => {
                const startCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-start-date"]'
                );
                startCalendar.dispatchEvent(
                    new CustomEvent('change', {
                        detail: {
                            value: [new Date('7/25/2021')],
                            clickedDate: new Date('7/25/2021')
                        }
                    })
                );
                expect(element.value).toMatchObject({
                    startDate: new Date('7/25/2021'),
                    endDate: new Date('7/30/2021')
                });
                jest.runAllTimers();
            })
            .then(() => {
                const startCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-start-date"]'
                );
                expect(startCalendar).toBeFalsy();
            });
    });

    it('Input Date Range: Case: SELECT_NEW_END', () => {
        element.startDate = new Date('7/20/2021');
        element.endDate = new Date('7/25/2021');

        return Promise.resolve()
            .then(() => {
                const endInput = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-icon-end-date"]'
                );
                endInput.click();
            })
            .then(() => {
                const endCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-end-date"]'
                );
                endCalendar.dispatchEvent(
                    new CustomEvent('change', {
                        detail: {
                            value: [
                                new Date('7/20/2021'),
                                new Date('7/27/2021')
                            ],
                            clickedDate: new Date('7/27/2021')
                        }
                    })
                );
                expect(element.value).toMatchObject({
                    startDate: new Date('7/20/2021'),
                    endDate: new Date('7/27/2021')
                });
                jest.runAllTimers();
            })
            .then(() => {
                const endCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-end-date"]'
                );
                expect(endCalendar).toBeFalsy();
            });
    });

    it('Input Date Range: Case: SELECT_START_ABOVE_END', () => {
        element.startDate = new Date('7/15/2022');
        element.endDate = new Date('7/20/2022');

        return Promise.resolve()
            .then(() => {
                const startInput = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-icon-start-date"]'
                );
                startInput.click();
                expect(element.value).toMatchObject({
                    startDate: new Date('7/15/2022'),
                    endDate: new Date('7/20/2022')
                });
            })
            .then(() => {
                const startCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-start-date"]'
                );
                startCalendar.dispatchEvent(
                    new CustomEvent('change', {
                        detail: {
                            value: [new Date('7/26/2022')],
                            clickedDate: new Date('7/26/2022')
                        }
                    })
                );
                expect(element.value).toMatchObject({
                    startDate: new Date('7/26/2022'),
                    endDate: null
                });
                jest.runAllTimers();
            })
            .then(() => {
                const endCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-end-date"]'
                );
                expect(endCalendar).toBeTruthy();
            });
    });

    it('Input Date Range: Case: SELECT_END_BELOW_START', () => {
        element.startDate = new Date('7/25/2022');
        element.endDate = new Date('7/28/2022');

        return Promise.resolve()
            .then(() => {
                const endInput = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-icon-end-date"]'
                );
                endInput.click();
                expect(element.value).toMatchObject({
                    startDate: new Date('7/25/2022'),
                    endDate: new Date('7/28/2022')
                });
            })
            .then(() => {
                const endCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-end-date"]'
                );
                endCalendar.dispatchEvent(
                    new CustomEvent('change', {
                        detail: {
                            value: [new Date('7/22/2022')],
                            clickedDate: new Date('7/22/2022')
                        }
                    })
                );
                expect(element.value).toMatchObject({
                    startDate: null,
                    endDate: new Date('7/22/2022')
                });
                jest.runAllTimers();
            })
            .then(() => {
                const startCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-start-date"]'
                );
                expect(startCalendar).toBeTruthy();
            });
    });

    it('Input Date Range: Case: DESELECT_START', () => {
        element.startDate = new Date('7/15/2022');
        element.endDate = new Date('7/20/2022');

        return Promise.resolve()
            .then(() => {
                const startInput = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-icon-start-date"]'
                );
                startInput.click();
                expect(element.value).toMatchObject({
                    startDate: new Date('7/15/2022'),
                    endDate: new Date('7/20/2022')
                });
            })
            .then(() => {
                const startCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-start-date"]'
                );
                startCalendar.dispatchEvent(
                    new CustomEvent('change', {
                        detail: {
                            value: [new Date('7/20/2022')],
                            clickedDate: new Date('7/15/2022')
                        }
                    })
                );
                expect(element.value).toMatchObject({
                    startDate: null,
                    endDate: new Date('7/20/2022')
                });
                jest.runAllTimers();
                expect(startCalendar).toBeTruthy();
            });
    });

    it('Input Date Range: Case: DESELECT_END', () => {
        element.startDate = new Date('7/25/2022');
        element.endDate = new Date('7/28/2022');

        return Promise.resolve()
            .then(() => {
                const endInput = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-icon-end-date"]'
                );
                endInput.click();
                expect(element.value).toMatchObject({
                    startDate: new Date('7/25/2022'),
                    endDate: new Date('7/28/2022')
                });
            })
            .then(() => {
                const endCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-end-date"]'
                );
                endCalendar.dispatchEvent(
                    new CustomEvent('change', {
                        detail: {
                            value: [new Date('7/25/2022')],
                            clickedDate: new Date('7/28/2022')
                        }
                    })
                );
                expect(element.value).toMatchObject({
                    startDate: new Date('7/25/2022'),
                    endDate: null
                });
                jest.runAllTimers();
                expect(endCalendar).toBeTruthy();
            });
    });

    it('Input Date Range: Case: SELECT_START_EQUAL_END', () => {
        element.startDate = new Date('7/15/2022');
        element.endDate = new Date('7/20/2022');

        return Promise.resolve()
            .then(() => {
                const startInput = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-icon-start-date"]'
                );
                startInput.click();
                expect(element.value).toMatchObject({
                    startDate: new Date('7/15/2022'),
                    endDate: new Date('7/20/2022')
                });
            })
            .then(() => {
                const startCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-start-date"]'
                );
                startCalendar.dispatchEvent(
                    new CustomEvent('change', {
                        detail: {
                            value: [new Date('7/20/2022')],
                            clickedDate: new Date('7/20/2022')
                        }
                    })
                );
                expect(element.value).toMatchObject({
                    startDate: new Date('7/20/2022'),
                    endDate: new Date('7/20/2022')
                });
            });
    });

    it('Input Date Range: Case: SELECT_END_EQUAL_START', () => {
        element.startDate = new Date('7/25/2022');
        element.endDate = new Date('7/28/2022');

        return Promise.resolve()
            .then(() => {
                const endInput = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-icon-end-date"]'
                );
                endInput.click();
                expect(element.value).toMatchObject({
                    startDate: new Date('7/25/2022'),
                    endDate: new Date('7/28/2022')
                });
            })
            .then(() => {
                const endCalendar = element.shadowRoot.querySelector(
                    '[data-element-id="calendar-end-date"]'
                );
                endCalendar.dispatchEvent(
                    new CustomEvent('change', {
                        detail: {
                            value: [new Date('7/25/2022')],
                            clickedDate: new Date('7/25/2022')
                        }
                    })
                );
                expect(element.value).toMatchObject({
                    startDate: new Date('7/25/2022'),
                    endDate: new Date('7/25/2022')
                });
            });
    });

    // required
    it('Input Date Range: required', () => {
        element.required = true;

        return Promise.resolve().then(() => {
            const required = element.shadowRoot.querySelector('.slds-required');
            expect(required).toBeTruthy();
            expect(required.textContent).toBe('*');
        });
    });

    // message-when-value-missing
    // Depends on required, focus(), blur() and showHelpMessageIfInvalid()
    it('Input Date Range: messageWhenValueMissing', () => {
        element.required = true;
        element.messageWhenValueMissing = 'Missing value!';
        element.type = 'datetime';

        return Promise.resolve()
            .then(() => {
                element.focus();
                element.blur();
                element.showHelpMessageIfInvalid();
                jest.runAllTimers();
            })
            .then(() => {
                const lightningInputs = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="lightning-input"]'
                );
                lightningInputs.forEach((input) => {
                    expect(input.className).toContain('slds-has-error');
                });
                const inputs = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="input"]'
                );
                inputs.forEach((input) => {
                    expect(input.className).toContain('slds-has-error');
                });

                const message = element.shadowRoot.querySelector(
                    '.slds-form-element__help'
                );
                expect(message.textContent).toBe('Missing value!');
            });
    });

    // variant
    it('Input Date Range: variant standard', () => {
        element.variant = 'standard';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.avonni-date-range__label-container'
            );

            expect(label.classList).not.toContain('slds-assistive-text');
            expect(label.classList).not.toContain('slds-m-right_small');
        });
    });

    it('Input Date Range: variant label-hidden', () => {
        element.variant = 'label-hidden';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.avonni-date-range__label-container'
            );

            expect(label.classList).toContain('slds-assistive-text');
            expect(label.classList).not.toContain('slds-m-right_small');
        });
    });

    /* ----- METHODS ----- */

    // Input date range method focus
    it('Input date Range: method: focus', () => {
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
    it('Input date Range: method: blur', () => {
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

    // reportValidity
    // Depends on required
    it('Input Date Range: reportValidity method', () => {
        element.required = true;
        element.reportValidity();

        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector(
                '.slds-form-element__help'
            );
            expect(help).toBeTruthy();
        });
    });

    // showHelpMessageIfInvalid
    // Depends on required
    it('Input Date Range: showHelpMessageIfInvalid method', () => {
        element.required = true;
        element.showHelpMessageIfInvalid();

        return Promise.resolve().then(() => {
            const help = element.shadowRoot.querySelector(
                '.slds-form-element__help'
            );
            expect(help).toBeTruthy();
        });
    });

    // checkValidity
    it('Input Date Range: checkValidity method', () => {
        const spy = jest.spyOn(element, 'checkValidity');

        element.checkValidity();
        expect(spy).toHaveBeenCalled();
    });

    // setCustomValidity
    it('Input Date Range: setCustomValidity method', () => {
        const spy = jest.spyOn(element, 'setCustomValidity');

        element.setCustomValidity('Something');
        expect(spy).toHaveBeenCalled();
    });

    /* ----- EVENTS ----- */

    // Input date range change
    it('Input date Range: change event', () => {
        element.startDate = startDate.setHours(0, 0, 0, 0);
        element.endDate = endDate.setHours(0, 0, 0, 0);
        const startInput = element.shadowRoot.querySelector(
            '[data-element-id="input-start-date"]'
        );
        const handler = jest.fn();

        const newDate = new Date('12/12/2022').setHours(0, 0, 0, 0);
        startInput.addEventListener('change', handler);

        return Promise.resolve()
            .then(() => {
                startInput.dispatchEvent(
                    new CustomEvent('change', {
                        detail: { startDate: newDate, endDate: endDate }
                    })
                );
            })
            .then(() => {
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].detail.startDate).toBe(newDate);
                expect(handler.mock.calls[0][0].detail.endDate).toBe(endDate);
                expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
            });
    });

    // Input date range change
    it('Input date Range: change event with timezone', () => {
        element.startDate = startDate;
        element.endDate = endDate;
        element.timezone = 'America/Port-au-Prince';
        const startInput = element.shadowRoot.querySelector(
            '[data-element-id="input-start-date"]'
        );
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
