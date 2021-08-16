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

describe('DateTimePicker', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('Default attributes', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });

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
        expect(element.timeFormatHour).toBeUndefined();
        expect(element.timeFormatHour12).toBeUndefined();
        expect(element.timeFormatMinute).toBeUndefined();
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
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.disabled = true;

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelectorAll('p');
            expect(paragraph[2].textContent).toBe(
                'No available time slots for this period.'
            );
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeFalsy();
        });
    });

    it('Date time picker disabled weekly', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.variant = 'weekly';
        element.disabled = true;

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelectorAll('p');
            expect(paragraph[2].textContent).toBe(
                'No available time slots for this period.'
            );
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeFalsy();
        });
    });

    it('Date time picker disabled inline', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.variant = 'inline';
        element.disabled = true;

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelectorAll('p');
            expect(paragraph[2].textContent).toBe(
                'No available time slots for this period.'
            );
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeFalsy();
        });
    });

    it('Date time picker disabled timeline', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.variant = 'timeline';
        element.disabled = true;

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelectorAll('p');
            expect(paragraph[2].textContent).toBe(
                'No available time slots for this period.'
            );
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeFalsy();
        });
    });

    it('Date time picker disabled monthly', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.variant = 'monthly';
        element.disabled = true;

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelectorAll('p');
            expect(paragraph[2].textContent).toBe(
                'No available time slots for this period.'
            );
            const time = element.shadowRoot.querySelector(
                '.avonni-date-time-picker__time'
            );
            expect(time).toBeFalsy();
            const calendar = element.shadowRoot.querySelector('c-calendar');
            expect(calendar.disabled).toBeTruthy();
        });
    });

    // field level help
    it('Date time picker field level help', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.fieldLevelHelp = 'This is a field level help text';

        return Promise.resolve().then(() => {
            const helptext = element.shadowRoot.querySelector(
                'lightning-helptext'
            );
            expect(helptext).toBeTruthy();
            expect(helptext.content).toBe('This is a field level help text');
        });
    });

    // label
    it('Date time picker label', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

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
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

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
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.variant = 'daily';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector('c-calendar');
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
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.variant = 'weekly';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector('c-calendar');
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
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.variant = 'inline';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector('c-calendar');
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
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.variant = 'timeline';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector('c-calendar');
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
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.variant = 'monthly';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector('c-calendar');
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
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.readOnly = true;
        const buttons = element.shadowRoot.querySelectorAll('button');
        const firstButton = element.shadowRoot.querySelector('button');

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
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

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
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

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
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.name = 'a-string-name';
        const input = element.shadowRoot.querySelector('lightning-input');

        return Promise.resolve().then(() => {
            expect(input.name).toBe('a-string-name');
        });
    });

    // start time
    it('Date time picker start time', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.startTime = '10:00';
        const date = new Date(`1970-01-01T10:00`);

        return Promise.resolve().then(() => {
            const times = element.shadowRoot.querySelectorAll(
                'lightning-formatted-date-time'
            );
            const startTimeDate = new Date(times[0].value);
            expect(startTimeDate.getHours()).toBe(date.getHours());
            expect(startTimeDate.getMinutes()).toBe(date.getMinutes());
        });
    });

    // end time
    // Depends on showEndTime and startTime
    it('Date time picker end time', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

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
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.timeSlotDuration = '01:00';

        return Promise.resolve().then(() => {
            const times = element.shadowRoot.querySelectorAll(
                'lightning-formatted-date-time'
            );
            const firstDate = new Date(times[0].value);
            const secondDate = new Date(times[1].value);

            expect(secondDate.getHours() - firstDate.getHours()).toBe(1);
        });
    });

    // time format hour
    it('Date time picker time format hour numeric', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        const times = element.shadowRoot.querySelectorAll(
            'lightning-formatted-date-time'
        );

        return Promise.resolve().then(() => {
            times.forEach((time) => {
                expect(time.hour).toBe('numeric');
            });
        });
    });

    it('Date time picker time format hour 2-digit', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.timeFormatHour = '2-digit';

        const times = element.shadowRoot.querySelectorAll(
            'lightning-formatted-date-time'
        );

        return Promise.resolve().then(() => {
            times.forEach((time) => {
                expect(time.hour).toBe('2-digit');
            });
        });
    });

    // time format hour 12
    it('Date time picker time format hour 12', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.timeFormatHour12 = true;

        const times = element.shadowRoot.querySelectorAll(
            'lightning-formatted-date-time'
        );

        return Promise.resolve().then(() => {
            times.forEach((time) => {
                expect(time.hour12).toBeTruthy();
            });
        });
    });

    // time format minute
    it('Date time picker time format minute numeric', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        const times = element.shadowRoot.querySelectorAll(
            'lightning-formatted-date-time'
        );

        element.timeFormatMinute = 'numeric';

        return Promise.resolve().then(() => {
            times.forEach((time) => {
                expect(time.minute).toBe('numeric');
            });
        });
    });

    it('Date time picker time format minute 2-digit', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        const times = element.shadowRoot.querySelectorAll(
            'lightning-formatted-date-time'
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
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        const times = element.shadowRoot.querySelectorAll(
            'lightning-formatted-date-time'
        );

        element.timeFormatSecond = 'numeric';

        return Promise.resolve().then(() => {
            times.forEach((time) => {
                expect(time.second).toBe('numeric');
            });
        });
    });

    it('Date time picker time format second 2-digit', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        const times = element.shadowRoot.querySelectorAll(
            'lightning-formatted-date-time'
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
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.showEndTime = false;

        return Promise.resolve().then(() => {
            const endTimes = element.shadowRoot.querySelectorAll(
                '.date-time-picker__formatted-end-time'
            );
            expect(endTimes).toHaveLength(0);
        });
    });

    it('Date time picker show end time = true', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

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
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.disabled = true;
        element.showDisabledDates = true;

        return Promise.resolve().then(() => {
            const times = element.shadowRoot.querySelectorAll('button');
            times.forEach((time) => {
                expect(time.disabled).toBeTruthy();
            });
        });
    });

    it('Date time picker show disabled dates weekly', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.disabled = true;
        element.showDisabledDates = true;
        element.variant = 'weekly';

        return Promise.resolve().then(() => {
            const times = element.shadowRoot.querySelectorAll('button');
            times.forEach((time) => {
                expect(time.disabled).toBeTruthy();
            });
        });
    });

    it('Date time picker show disabled dates inline', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.disabled = true;
        element.showDisabledDates = true;
        element.variant = 'inline';

        return Promise.resolve().then(() => {
            const times = element.shadowRoot.querySelectorAll('button');
            times.forEach((time) => {
                expect(time.disabled).toBeTruthy();
            });
        });
    });

    it('Date time picker show disabled dates timeline', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.disabled = true;
        element.showDisabledDates = true;
        element.variant = 'timeline';

        return Promise.resolve().then(() => {
            const times = element.shadowRoot.querySelectorAll('button');
            times.forEach((time) => {
                expect(time.disabled).toBeTruthy();
            });
        });
    });

    it('Date time picker show disabled dates monthly', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.disabled = true;
        element.showDisabledDates = true;
        element.variant = 'monthly';

        return Promise.resolve().then(() => {
            const times = element.shadowRoot.querySelectorAll('button');
            times.forEach((time) => {
                expect(time.disabled).toBeTruthy();
            });
        });
    });

    // max and min
    it('Date time picker max and min', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        const maxDate = new Date(2021, 11, 30);
        const minDate = new Date(2021, 12, 1);
        element.max = maxDate;
        element.min = minDate;

        const input = element.shadowRoot.querySelector('lightning-input');

        return Promise.resolve().then(() => {
            expect(input.max).toBe(maxDate.toISOString());
            expect(input.min).toBe(minDate.toISOString());
        });
    });

    // type
    it('Date time picker type checkbox', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.type = 'checkbox';

        const buttons = element.shadowRoot.querySelectorAll('button');
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
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.type = 'radio';

        const buttons = element.shadowRoot.querySelectorAll('button');
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
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.showTimeZone = true;

        const timeZone = element.shadowRoot.querySelectorAll(
            'lightning-combobox'
        );

        return Promise.resolve().then(() => {
            expect(timeZone).toBeTruthy();
        });
    });

    // hide navigation
    it('Date time picker hide navigation', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.hideNavigation = true;

        return Promise.resolve().then(() => {
            const prevButton = element.shadowRoot.querySelector(
                "lightning-button-icon[title='Previous dates']"
            );
            const todayButton = element.shadowRoot.querySelector(
                "lightning-button[label='today']"
            );
            const nextButton = element.shadowRoot.querySelector(
                "lightning-button-icon[title='Next dates']"
            );
            expect(prevButton).toBeFalsy();
            expect(todayButton).toBeFalsy();
            expect(nextButton).toBeFalsy();
        });
    });

    // hide date picker
    it('Date time picker hide date picker', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.hideDatePicker = true;

        return Promise.resolve().then(() => {
            const datePicker = element.shadowRoot.querySelector(
                'lightning-input'
            );
            expect(datePicker).toBeFalsy();
        });
    });

    /* ----- EVENTS ----- */

    // date time picker change
    it('Date time picker change event', () => {
        const element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);

        element.startTime = '08:30';
        const startTimeDate = new Date(`1970-01-01T08:30`);
        const now = new Date();
        const day = now.getDate();
        const month = now.getMonth();
        const year = now.getFullYear();
        const handler = jest.fn();
        element.addEventListener('change', handler);

        return Promise.resolve().then(() => {
            const button = element.shadowRoot.querySelectorAll('button');
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
