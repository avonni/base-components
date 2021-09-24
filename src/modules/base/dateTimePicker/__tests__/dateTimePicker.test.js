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
import DateTimePicker from 'c/dateTimePicker';

// Not tested
// validity
// value
// date format day
// date format month
// date format weekday
// date format year
// disabled date times

let element;
describe('DateTimePicker', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    beforeEach(() => {
        element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);
    });

    it('Default attributes', () => {
        expect(element.disabled).toBeFalsy();
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.label).toBeUndefined();
        expect(element.hideLabel).toBeFalsy();
        expect(element.variant).toBe('daily');
        expect(element.messageWhenValueMissing).toBeUndefined();
        expect(element.name).toBeUndefined();
        expect(element.readOnly).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.validity).toMatchObject({});
        expect(element.value).toBeUndefined();
        expect(element.startTime).toBe(46800000);
        expect(element.endTime).toBe(82800000);
        expect(element.timeSlotDuration).toBe(1800000);
        expect(element.timeFormatHour).toBe('numeric');
        expect(element.timeFormatHour12).toBeUndefined();
        expect(element.timeFormatMinute).toBe('2-digit');
        expect(element.timeFormatSecond).toBeUndefined();
        expect(element.dateFormatDay).toBe('numeric');
        expect(element.dateFormatMonth).toBe('long');
        expect(element.dateFormatWeekday).toBe('short');
        expect(element.dateFormatYear).toBeUndefined();
        expect(element.showEndTime).toBeUndefined();
        expect(element.showDisabledDates).toBeUndefined();
        expect(element.disabledDateTimes).toMatchObject([]);
        expect(element.max).toMatchObject(
            new Date(new Date(2099, 11, 31).setHours(0, 0, 0, 0))
        );
        expect(element.min).toMatchObject(
            new Date(new Date(1900, 0, 1).setHours(0, 0, 0, 0))
        );
        expect(element.type).toBe('radio');
        expect(element.showTimeZone).toBeFalsy();
        expect(element.hideNavigation).toBeFalsy();
        expect(element.hideDatePicker).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */

    // disabled
    it('Date time picker disabled daily', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelector('[data-element-id="p-empty-message"]');
            expect(paragraph.textContent).toBe(
                'No available time slots for this period.'
            );
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeFalsy();
        });
    });

    it('Date time picker disabled weekly', () => {
        element.variant = 'weekly';
        element.disabled = true;

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelector('[data-element-id="p-empty-message"]');
            expect(paragraph.textContent).toBe(
                'No available time slots for this period.'
            );
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeFalsy();
        });
    });

    it('Date time picker disabled inline', () => {
        element.variant = 'inline';
        element.disabled = true;

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelector('[data-element-id="p-empty-message"]');
            expect(paragraph.textContent).toBe(
                'No available time slots for this period.'
            );
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeFalsy();
        });
    });

    it('Date time picker disabled timeline', () => {
        element.variant = 'timeline';
        element.disabled = true;

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelector('[data-element-id="p-empty-message"]');
            expect(paragraph.textContent).toBe(
                'No available time slots for this period.'
            );
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeFalsy();
        });
    });

    it('Date time picker disabled monthly', () => {
        element.variant = 'monthly';
        element.disabled = true;

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelector('[data-element-id="p-empty-message"]');
            expect(paragraph).toBeFalsy();
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeFalsy();
            const calendar = element.shadowRoot.querySelector('[data-element-id="avonni-calendar"]');
            expect(calendar.disabled).toBeTruthy();
        });
    });

    // field level help
    it('Date time picker field level help', () => {
        element.fieldLevelHelp = 'This is a field level help text';

        return Promise.resolve().then(() => {
            const helptext = element.shadowRoot.querySelector(
                '[data-element-id="lightning-helptext"]'
            );
            expect(helptext).toBeTruthy();
            expect(helptext.content).toBe('This is a field level help text');
        });
    });

    // label
    it('Date time picker label', () => {
        element.label = 'This is a label text';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label).toBeTruthy();
            expect(label.textContent).toBe('This is a label text');
        });
    });

    // hide label
    it('Date time picker hide label', () => {
        element.label = 'This is a label text';
        element.hideLabel = true;

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '.slds-form-element__label'
            );
            expect(label).toBeFalsy();
        });
    });

    // variant
    it('Date time picker variant daily', () => {
        element.variant = 'daily';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector('[data-element-id="avonni-calendar"]');
            expect(calendar).toBeFalsy();
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeTruthy();
            const days = element.shadowRoot.querySelectorAll(
                '.avonni-date-time-picker__day'
            );
            expect(days).toHaveLength(1);
        });
    });

    it('Date time picker variant weekly', () => {
        element.variant = 'weekly';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector('[data-element-id="avonni-calendar"]');
            expect(calendar).toBeFalsy();
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeTruthy();
            const days = element.shadowRoot.querySelectorAll(
                '.avonni-date-time-picker__day'
            );
            expect(days).toHaveLength(7);
        });
    });

    it('Date time picker variant inline', () => {
        element.variant = 'inline';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector('[data-element-id="avonni-calendar"]');
            expect(calendar).toBeFalsy();
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeTruthy();
            const days = element.shadowRoot.querySelectorAll(
                '.avonni-date-time-picker__day_inline'
            );
            expect(days).toHaveLength(1);
        });
    });

    it('Date time picker variant timeline', () => {
        element.variant = 'timeline';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector('[data-element-id="avonni-calendar"]');
            expect(calendar).toBeFalsy();
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeTruthy();
            const days = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__day_inline'
            );
            expect(days).toBeFalsy();
            const timeline = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__timeline'
            );
            expect(timeline).toBeTruthy();
        });
    });

    it('Date time picker variant monthly', () => {
        element.variant = 'monthly';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector('[data-element-id="avonni-calendar"]');
            expect(calendar).toBeTruthy();
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeTruthy();
            const days = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__day_inline'
            );
            expect(days).toBeFalsy();
            const timeline = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__timeline'
            );
            expect(timeline).toBeFalsy();
        });
    });

    // read only
    it('Date time picker read only daily', () => {
        element.readOnly = true;
        const buttons = element.shadowRoot.querySelectorAll('[data-element-id="button-default"]');
        const firstButton = buttons[0];

        return Promise.resolve().then(() => {
            firstButton.click();
            expect(firstButton.ariaSelected).toBeFalsy();
            buttons.forEach((button) => {
                expect(button.ariaReadOnly).toBeTruthy();
            });
        });
    });

    // required
    it('Date time picker required', () => {
        element.required = true;

        return Promise.resolve().then(() => {
            const required = element.shadowRoot.querySelector('.slds-required');
            expect(required).toBeTruthy();
            expect(required.textContent).toBe('*');
        });
    });

    // message when value is missing
    // Depends on required, focus(), blur() and showHelpMessageIfInvalid()
    it('Date time picker message when value is missing', () => {
        element.required = true;
        element.messageWhenValueMissing = 'Missing value!';

        return Promise.resolve()
            .then(() => {
                element.focus();
                element.blur();
                element.showHelpMessageIfInvalid();
            })
            .then(() => {
                const message = element.shadowRoot.querySelector(
                    '.slds-form-element__help'
                );
                expect(message.textContent).toBe('Missing value!');
            });
    });

    // name
    it('Date time picker name', () => {
        element.name = 'a-string-name';
        const input = element.shadowRoot.querySelector('[data-element-id="lightning-input"]');

        return Promise.resolve().then(() => {
            expect(input.name).toBe('a-string-name');
        });
    });

    // start time
    it('Date time picker start time', () => {
        element.startTime = '10:00';
        const date = new Date(`1970-01-01T10:00`);

        return Promise.resolve().then(() => {
            const times = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-formatted-date-time-default"]'
            );
            const startTimeDate = new Date(times[0].value);
            expect(startTimeDate.getHours()).toBe(date.getHours());
            expect(startTimeDate.getMinutes()).toBe(date.getMinutes());
        });
    });

    // end time
    // Depends on showEndTime and startTime
    it('Date time picker end time', () => {
        element.startTime = '09:00';
        element.endTime = '11:00';
        element.showEndTime = true;
        const date = new Date(`1970-01-01T11:00`);

        return Promise.resolve().then(() => {
            const times = element.shadowRoot.querySelectorAll(
                '.date-time-picker__formatted-end-time'
            );

            const endTime = times[times.length - 1].value;
            const endTimeDate = new Date(endTime);
            expect(endTimeDate.getHours()).toBe(date.getHours());
            expect(endTimeDate.getMinutes()).toBe(date.getMinutes());
        });
    });

    // time slot duration
    it('Date time picker time slot duration', () => {
        element.timeSlotDuration = '01:00';

        return Promise.resolve().then(() => {
            const times = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-formatted-date-time-default"]'
            );
            const firstDate = new Date(times[0].value);
            const secondDate = new Date(times[1].value);

            expect(secondDate.getHours() - firstDate.getHours()).toBe(1);
        });
    });

    // time format hour
    it('Date time picker time format hour numeric', () => {
        const times = element.shadowRoot.querySelectorAll(
            '[data-element-id^="lightning-formatted-date-time-default"]'
        );

        return Promise.resolve().then(() => {
            times.forEach((time) => {
                expect(time.hour).toBe('numeric');
            });
        });
    });

    it('Date time picker time format hour 2-digit', () => {
        element.timeFormatHour = '2-digit';

        const times = element.shadowRoot.querySelectorAll(
            '[data-element-id^="lightning-formatted-date-time-default"]'
        );

        return Promise.resolve().then(() => {
            times.forEach((time) => {
                expect(time.hour).toBe('2-digit');
            });
        });
    });

    // time format hour 12
    it('Date time picker time format hour 12', () => {
        element.timeFormatHour12 = true;

        const times = element.shadowRoot.querySelectorAll(
            '[data-element-id^="lightning-formatted-date-time-default"]'
        );

        return Promise.resolve().then(() => {
            times.forEach((time) => {
                expect(time.hour12).toBeTruthy();
            });
        });
    });

    // time format minute
    it('Date time picker time format minute numeric', () => {
        const times = element.shadowRoot.querySelectorAll(
            '[data-element-id^="lightning-formatted-date-time-default"]'
        );

        element.timeFormatMinute = 'numeric';

        return Promise.resolve().then(() => {
            times.forEach((time) => {
                expect(time.minute).toBe('numeric');
            });
        });
    });

    it('Date time picker time format minute 2-digit', () => {
        const times = element.shadowRoot.querySelectorAll(
            '[data-element-id^="lightning-formatted-date-time-default"]'
        );

        element.timeFormatMinute = '2-digit';

        return Promise.resolve().then(() => {
            times.forEach((time) => {
                expect(time.minute).toBe('2-digit');
            });
        });
    });

    // time format second
    it('Date time picker time format second numeric', () => {
        const times = element.shadowRoot.querySelectorAll(
            '[data-element-id^="lightning-formatted-date-time-default"]'
        );

        element.timeFormatSecond = 'numeric';

        return Promise.resolve().then(() => {
            times.forEach((time) => {
                expect(time.second).toBe('numeric');
            });
        });
    });

    it('Date time picker time format second 2-digit', () => {
        const times = element.shadowRoot.querySelectorAll(
            '[data-element-id^="lightning-formatted-date-time-default"]'
        );

        element.timeFormatSecond = '2-digit';

        return Promise.resolve().then(() => {
            times.forEach((time) => {
                expect(time.second).toBe('2-digit');
            });
        });
    });

    // show end time
    // Depends on startTime, endTime and timeSlotDuration
    it('Date time picker show end time = false', () => {
        element.showEndTime = false;

        return Promise.resolve().then(() => {
            const endTimes = element.shadowRoot.querySelectorAll(
                '.date-time-picker__formatted-end-time'
            );
            expect(endTimes).toHaveLength(0);
        });
    });

    it('Date time picker show end time = true', () => {
        element.showEndTime = true;
        element.timeSlotDuration = '01:00';
        element.startTime = '10:00';
        element.endTime = '12:00';

        return Promise.resolve().then(() => {
            const endTimes = element.shadowRoot.querySelectorAll(
                '.date-time-picker__formatted-end-time'
            );
            expect(endTimes).toHaveLength(2);
        });
    });

    // show disabled dates
    it('Date time picker show disabled dates daily', () => {
        element.disabled = true;
        element.showDisabledDates = true;

        return Promise.resolve().then(() => {
            const times = element.shadowRoot.querySelectorAll('[data-element-id="button-default"]');
            times.forEach((time) => {
                expect(time.disabled).toBeTruthy();
            });
        });
    });

    it('Date time picker show disabled dates weekly', () => {
        element.disabled = true;
        element.showDisabledDates = true;
        element.variant = 'weekly';

        return Promise.resolve().then(() => {
            const times = element.shadowRoot.querySelectorAll('[data-element-id="button-default"]');
            times.forEach((time) => {
                expect(time.disabled).toBeTruthy();
            });
        });
    });

    it('Date time picker show disabled dates inline', () => {
        element.disabled = true;
        element.showDisabledDates = true;
        element.variant = 'inline';

        return Promise.resolve().then(() => {
            const times = element.shadowRoot.querySelectorAll('[data-element-id="button-default"]');
            times.forEach((time) => {
                expect(time.disabled).toBeTruthy();
            });
        });
    });

    it('Date time picker show disabled dates timeline', () => {
        element.disabled = true;
        element.showDisabledDates = true;
        element.variant = 'timeline';

        return Promise.resolve().then(() => {
            const times = element.shadowRoot.querySelectorAll('[data-element-id="button-default"]');
            times.forEach((time) => {
                expect(time.disabled).toBeTruthy();
            });
        });
    });

    it('Date time picker show disabled dates monthly', () => {
        element.disabled = true;
        element.showDisabledDates = true;
        element.variant = 'monthly';

        return Promise.resolve().then(() => {
            const times = element.shadowRoot.querySelectorAll('[data-element-id="button-default"]');
            times.forEach((time) => {
                expect(time.disabled).toBeTruthy();
            });
        });
    });

    // max and min
    it('Date time picker max and min', () => {
        const maxDate = new Date(2021, 11, 30);
        const minDate = new Date(2021, 12, 1);
        element.max = maxDate;
        element.min = minDate;

        const input = element.shadowRoot.querySelector('[data-element-id="lightning-input"]');

        return Promise.resolve().then(() => {
            expect(input.max).toBe(maxDate.toISOString());
            expect(input.min).toBe(minDate.toISOString());
        });
    });

    // type
    it('Date time picker type checkbox', () => {
        element.type = 'checkbox';

        const buttons = element.shadowRoot.querySelectorAll('[data-element-id="button-default"]');
        const firstButton = buttons[0];
        const secondButton = buttons[1];
        const thirdButton = buttons[2];

        return Promise.resolve().then(() => {
            firstButton.click();
            secondButton.click();
            thirdButton.click();
            expect(firstButton.ariaSelected).toBeTruthy();
            expect(secondButton.ariaSelected).toBeTruthy();
            expect(thirdButton.ariaSelected).toBeTruthy();
        });
    });

    it('Date time picker type radio', () => {
        element.type = 'radio';

        const buttons = element.shadowRoot.querySelectorAll('[data-element-id="button-default"]');
        const firstButton = buttons[0];
        const secondButton = buttons[1];
        const thirdButton = buttons[2];

        return Promise.resolve().then(() => {
            firstButton.click();
            secondButton.click();
            thirdButton.click();
            expect(firstButton.ariaSelected).toBeFalsy();
            expect(secondButton.ariaSelected).toBeFalsy();
            expect(thirdButton.ariaSelected).toBeFalsy();
        });
    });

    // show time zone
    it('Date time picker show time zone', () => {
        element.showTimeZone = true;

        const timeZone = element.shadowRoot.querySelectorAll(
            '[data-element-id^="lightning-combobox"]'
        );

        return Promise.resolve().then(() => {
            expect(timeZone).toBeTruthy();
        });
    });

    // hide navigation
    it('Date time picker hide navigation', () => {
        element.hideNavigation = true;

        return Promise.resolve().then(() => {
            const prevButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-previous"]'
            );
            const todayButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-today"]'
            );
            const nextButton = element.shadowRoot.querySelector(
                '[data-element-id="lightning-button-icon-previous"]'
            );
            expect(prevButton).toBeFalsy();
            expect(todayButton).toBeFalsy();
            expect(nextButton).toBeFalsy();
        });
    });

    // hide date picker
    it('Date time picker hide date picker', () => {
        element.hideDatePicker = true;

        return Promise.resolve().then(() => {
            const datePicker = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );
            expect(datePicker).toBeFalsy();
        });
    });

    /* ----- JS --------- */
    // checkValidity
    it('checkValidity method', () => {
        const spy = jest.spyOn(element, 'checkValidity');

        element.checkValidity();
        expect(spy).toHaveBeenCalled();
    });

    // reportValidity
    it('reportValidity method', () => {
        const spy = jest.spyOn(element, 'reportValidity');

        element.reportValidity();
        expect(spy).toHaveBeenCalled();
    });

    // setCustomValidity
    it('setCustomValidity method', () => {
        const spy = jest.spyOn(element, 'setCustomValidity');

        element.setCustomValidity('Something');
        expect(spy).toHaveBeenCalled();
    });

    // showHelpMessageIfInvalid
    it('showHelpMessageIfInvalid method', () => {
        const datePicker = element.shadowRoot.querySelector('lightning-input');
        const spy = jest.spyOn(datePicker, 'reportValidity');

        element.showHelpMessageIfInvalid();
        expect(spy).toHaveBeenCalled();
    });

    /* ----- EVENTS ----- */

    // date time picker change
    it('Date time picker change event', () => {
        element.startTime = '08:30';
        const startTimeDate = new Date(`1970-01-01T08:30`);
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth();
        const year = now.getFullYear();
        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelectorAll('[data-element-id="button-default"]');
            button[0].click();
            const date = new Date(handler.mock.calls[0][0].detail.value);
            const eventDay = date.getDate();
            const eventMonth = date.getMonth();
            const eventYear = date.getFullYear();
            const eventHour = date.getHours();
            const eventMinutes = date.getMinutes();
            expect(handler).toHaveBeenCalled();
            expect(eventDay).toBe(day);
            expect(eventMonth).toBe(month);
            expect(eventYear).toBe(year);
            expect(eventHour).toBe(startTimeDate.getHours());
            expect(eventMinutes).toBe(startTimeDate.getMinutes());
            expect(handler.mock.calls[0][0].bubbles).toBeFalsy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeFalsy();
        });
    });
});
