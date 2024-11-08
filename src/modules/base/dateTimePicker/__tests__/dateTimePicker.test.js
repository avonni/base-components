import { createElement } from 'lwc';
import DateTimePicker from 'c/dateTimePicker';
import { callObserver } from 'c/resizeObserver';

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
        jest.clearAllTimers();
        jest.clearAllMocks();
        window.requestAnimationFrame.mockRestore();
    });

    beforeEach(() => {
        element = createElement('base-date-time-picker', {
            is: DateTimePicker
        });
        document.body.appendChild(element);
        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(), 0);
        });
    });

    it('Date time picker: default attributes', () => {
        expect(element.avatar).toEqual({});
        expect(element.dateFormatDay).toBe('numeric');
        expect(element.dateFormatMonth).toBe('long');
        expect(element.dateFormatWeekday).toBe('short');
        expect(element.dateFormatYear).toBeUndefined();
        expect(element.datePickerVariant).toBe('input');
        expect(element.disabled).toBeFalsy();
        expect(element.disabledDateTimes).toMatchObject([]);
        expect(element.endTime).toBe('18:00');
        expect(element.fieldLevelHelp).toBeUndefined();
        expect(element.hideDateLabel).toBeFalsy();
        expect(element.hideDatePicker).toBeFalsy();
        expect(element.hideLabel).toBeFalsy();
        expect(element.hideNavigation).toBeFalsy();
        expect(element.label).toBeUndefined();
        expect(element.max).toBe('2099-12-31');
        expect(element.messageWhenValueMissing).toBeUndefined();
        expect(element.min).toBe('1900-01-01');
        expect(element.name).toBeUndefined();
        expect(element.readOnly).toBeFalsy();
        expect(element.required).toBeFalsy();
        expect(element.showDisabledDates).toBeUndefined();
        expect(element.showEndTime).toBeUndefined();
        expect(element.showTimeZone).toBeFalsy();
        expect(element.startTime).toBe('08:00');
        expect(element.timeFormatHour).toBe('numeric');
        expect(element.timeFormatHour12).toBeUndefined();
        expect(element.timeFormatMinute).toBe('2-digit');
        expect(element.timeFormatSecond).toBeUndefined();
        expect(element.timeSlotDuration).toBe(1800000);
        expect(element.type).toBe('radio');
        expect(element.validity).toMatchObject({});
        expect(element.value).toBeUndefined();
        expect(element.variant).toBe('daily');
    });

    /*
     * ------------------------------------------------------------
     *  ATTRIBUTES
     * -------------------------------------------------------------
     */

    // avatar
    it('Date time picker: avatar', () => {
        element.avatar = { fallbackIconName: 'standard:apps' };

        return Promise.resolve().then(() => {
            const avatar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-avatar"]'
            );
            expect(avatar).toBeTruthy();
            expect(avatar.fallbackIconName).toBe('standard:apps');
        });
    });

    // date-format-day
    it('Date time picker: date format day', () => {
        element.dateFormatDay = '2-digit';
        element.value = new Date(2024, 0, 2);

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="p-date-label"]'
            );
            expect(label.textContent).toContain('02');
        });
    });

    // date-format-month
    it('Date time picker: date format month', () => {
        element.dateFormatMonth = '2-digit';
        element.value = new Date(2024, 0, 2);

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="p-date-label"]'
            );
            expect(label.textContent).toContain('01');
        });
    });

    // date-format-year
    it('Date time picker: date format year', () => {
        element.dateFormatYear = '2-digit';
        element.value = new Date(2024, 0, 2);

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="p-date-label"]'
            );
            expect(label.textContent).toContain('24');
            expect(label.textContent).not.toContain('2024');
        });
    });

    // date-picker-variant
    describe('Date picker variant', () => {
        it('input', () => {
            element.datePickerVariant = 'input';

            return Promise.resolve().then(() => {
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );
                expect(input).toBeTruthy();

                const inline = element.shadowRoot.querySelector(
                    '[data-element-id="div-inline-date-picker"]'
                );
                expect(inline).toBeFalsy();
            });
        });

        describe('inline', () => {
            it('Display is updated', () => {
                element.datePickerVariant = 'inline';
                element.value = '2023-04-14';

                return Promise.resolve().then(() => {
                    const input = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    );
                    expect(input).toBeFalsy();

                    const inline = element.shadowRoot.querySelector(
                        '[data-element-id="div-inline-date-picker"]'
                    );
                    expect(inline).toBeTruthy();

                    const labels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="avonni-layout-item-inline-date-picker-weekday-label"]'
                    );
                    expect(labels).toHaveLength(7);

                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id="button-inline-date-picker"]'
                    );
                    expect(buttons).toHaveLength(7);
                    expect(buttons[0].textContent).toBe('9April');
                });
            });

            it('Drag to the right', () => {
                element.datePickerVariant = 'inline';
                element.value = '2023-04-14';
                jest.useFakeTimers();

                return Promise.resolve()
                    .then(() => {
                        const sunday = new Date(2023, 3, 9).getTime();
                        const sundayButton = element.shadowRoot.querySelector(
                            '[data-element-id="button-inline-date-picker"]'
                        );
                        expect(Number(sundayButton.dataset.date)).toBe(sunday);

                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-inline-date-picker-wrapper"]'
                        );
                        const startEvent = new CustomEvent('touchstart');
                        startEvent.changedTouches = [{ clientX: 0 }];
                        wrapper.dispatchEvent(startEvent);

                        const moveEvent = new CustomEvent('touchmove');
                        moveEvent.changedTouches = [{ clientX: 100 }];
                        window.dispatchEvent(moveEvent);

                        const pickerDates = element.shadowRoot.querySelector(
                            '[data-element-id="div-inline-date-picker"]'
                        );
                        expect(pickerDates.style.transform).toBe(
                            'translateX(25px)'
                        );

                        const endEvent = new CustomEvent('touchend');
                        endEvent.changedTouches = [{ clientX: 100 }];
                        window.dispatchEvent(endEvent);
                    })
                    .then(() => {
                        const sunday = new Date(2023, 3, 2).getTime();
                        const sundayButton = element.shadowRoot.querySelector(
                            '[data-element-id="button-inline-date-picker"]'
                        );
                        expect(Number(sundayButton.dataset.date)).toBe(sunday);

                        jest.runAllTimers();
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-inline-date-picker-wrapper"]'
                        );
                        expect(wrapper.style.transform).toBeFalsy();
                    });
            });

            it('Drag to the left', () => {
                element.datePickerVariant = 'inline';
                element.value = '2023-04-14';
                jest.useFakeTimers();

                return Promise.resolve()
                    .then(() => {
                        const sunday = new Date(2023, 3, 9).getTime();
                        const sundayButton = element.shadowRoot.querySelector(
                            '[data-element-id="button-inline-date-picker"]'
                        );
                        expect(Number(sundayButton.dataset.date)).toBe(sunday);

                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-inline-date-picker-wrapper"]'
                        );
                        const startEvent = new CustomEvent('touchstart');
                        startEvent.changedTouches = [{ clientX: 0 }];
                        wrapper.dispatchEvent(startEvent);

                        const moveEvent = new CustomEvent('touchmove');
                        moveEvent.changedTouches = [{ clientX: -32 }];
                        window.dispatchEvent(moveEvent);

                        const pickerDates = element.shadowRoot.querySelector(
                            '[data-element-id="div-inline-date-picker"]'
                        );
                        expect(pickerDates.style.transform).toBe(
                            'translateX(-25px)'
                        );

                        const endEvent = new CustomEvent('touchend');
                        endEvent.changedTouches = [{ clientX: -35 }];
                        window.dispatchEvent(endEvent);
                    })
                    .then(() => {
                        const sunday = new Date(2023, 3, 16).getTime();
                        const sundayButton = element.shadowRoot.querySelector(
                            '[data-element-id="button-inline-date-picker"]'
                        );
                        expect(Number(sundayButton.dataset.date)).toBe(sunday);

                        jest.runAllTimers();
                        const wrapper = element.shadowRoot.querySelector(
                            '[data-element-id="div-inline-date-picker-wrapper"]'
                        );
                        expect(wrapper.style.transform).toBeFalsy();
                    });
            });

            it('Number of visible dates is updated on resize', () => {
                element.datePickerVariant = 'inline';
                element.variant = 'weekly';

                return Promise.resolve()
                    .then(() => {
                        const buttons = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button-inline-date-picker"]'
                        );
                        expect(buttons).toHaveLength(7);
                        const datePickerWrapper =
                            element.shadowRoot.querySelector(
                                '[data-element-id="avonni-date-time-picker"]'
                            );
                        jest.spyOn(
                            datePickerWrapper,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { width: 300 };
                        });
                        callObserver();
                    })
                    .then(() => {
                        const buttons = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button-inline-date-picker"]'
                        );
                        expect(buttons).toHaveLength(1);
                    });
            });
        });
    });

    // disabled
    it('Date time picker: disabled daily', () => {
        element.disabled = true;

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelector(
                '[data-element-id="p-empty-message"]'
            );
            expect(paragraph.textContent).toBe(
                'No available time slots for this period.'
            );
            const time = element.shadowRoot.querySelector(
                '[data-element-id="avonni-layout-item-time"]'
            );
            expect(time).toBeFalsy();
        });
    });

    it('Date time picker: disabled weekly', () => {
        element.variant = 'weekly';
        element.disabled = true;

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelector(
                '[data-element-id="p-empty-message"]'
            );
            expect(paragraph.textContent).toBe(
                'No available time slots for this period.'
            );
            const time = element.shadowRoot.querySelector(
                '[data-element-id="avonni-layout-item-time"]'
            );
            expect(time).toBeFalsy();
        });
    });

    it('Date time picker: disabled inline', () => {
        element.variant = 'inline';
        element.disabled = true;

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelector(
                '[data-element-id="p-empty-message"]'
            );
            expect(paragraph.textContent).toBe(
                'No available time slots for this period.'
            );
            const time = element.shadowRoot.querySelector(
                '[data-element-id="avonni-layout-item-time"]'
            );
            expect(time).toBeFalsy();
        });
    });

    it('Date time picker: disabled timeline', () => {
        element.variant = 'timeline';
        element.disabled = true;

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelector(
                '[data-element-id="p-empty-message"]'
            );
            expect(paragraph.textContent).toBe(
                'No available time slots for this period.'
            );
            const time = element.shadowRoot.querySelector(
                '[data-element-id="avonni-layout-item-time"]'
            );
            expect(time).toBeFalsy();
        });
    });

    it('Date time picker: disabled monthly', () => {
        element.variant = 'monthly';
        element.disabled = true;

        return Promise.resolve().then(() => {
            const paragraph = element.shadowRoot.querySelector(
                '[data-element-id="p-empty-message"]'
            );
            expect(paragraph).toBeFalsy();
            const time = element.shadowRoot.querySelector(
                '[data-element-id="avonni-layout-item-time"]'
            );
            expect(time).toBeFalsy();
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-calendar"]'
            );
            expect(calendar.disabled).toBeTruthy();
        });
    });

    it('Date time picker: disabled date times', () => {
        element.value = new Date(2023, 9, 16, 9);
        element.disabledDateTimes = [
            new Date(2023, 9, 16, 10, 30),
            'Wed',
            new Date(2023, 9, 16, 14).toISOString()
        ];
        element.variant = 'weekly';
        element.timezone = 'America/Montreal';
        element.showDisabledDates = true;

        return Promise.resolve().then(() => {
            const days = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-day"]'
            );
            const wedHours = days[3].querySelectorAll(
                '[data-element-id="button-default"]'
            );
            wedHours.forEach((timeSlot) => {
                expect(timeSlot.disabled).toBeTruthy();
            });
            const day16Hours = days[1].querySelectorAll(
                '[data-element-id="button-default"]'
            );
            expect(day16Hours[4].disabled).toBeFalsy();
            expect(day16Hours[5].disabled).toBeTruthy();
            expect(day16Hours[6].disabled).toBeFalsy();
            expect(day16Hours[12].disabled).toBeTruthy();
        });
    });

    it('Date time picker: imprecise disabled date times', () => {
        element.value = new Date(2023, 9, 16, 9);
        element.disabledDateTimes = [new Date(2023, 9, 16, 10, 43)];
        element.timezone = 'America/Montreal';
        element.showDisabledDates = true;

        return Promise.resolve().then(() => {
            const hours = element.shadowRoot.querySelectorAll(
                '[data-element-id="button-default"]'
            );
            expect(hours[4].disabled).toBeFalsy();
            expect(hours[5].disabled).toBeTruthy();
            expect(hours[6].disabled).toBeFalsy();
        });
    });

    it('Date time picker: full day disabled', () => {
        element.goToDate(new Date(2023, 8, 16));

        return Promise.resolve()
            .then(() => {
                const hours = element.shadowRoot.querySelectorAll(
                    '[data-element-id="button-default"]'
                );
                const emptyMessage = element.shadowRoot.querySelector(
                    '[data-element-id="p-empty-message"]'
                );
                expect(emptyMessage).toBeFalsy();
                expect(hours.length).toBeTruthy();
                element.disabledDateTimes = ['2023-09-16'];
            })
            .then(() => {
                const hours = element.shadowRoot.querySelectorAll(
                    '[data-element-id="button-default"]'
                );
                const emptyMessage = element.shadowRoot.querySelector(
                    '[data-element-id="p-empty-message"]'
                );
                expect(emptyMessage).toBeTruthy();
                expect(hours.length).toBeFalsy();
            });
    });

    // field level help
    it('Date time picker: field level help', () => {
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
    it('Date time picker: label', () => {
        element.label = 'This is a label text';

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="p-label"]'
            );
            expect(label).toBeTruthy();
            expect(label.textContent).toBe('This is a label text');
        });
    });

    // hide label
    it('Date time picker: hide label', () => {
        element.label = 'This is a label text';
        element.hideLabel = true;

        return Promise.resolve().then(() => {
            const label = element.shadowRoot.querySelector(
                '[data-element-id="p-label"]'
            );
            expect(label).toBeFalsy();
        });
    });

    // variant
    it('Date time picker: variant daily', () => {
        element.variant = 'daily';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-calendar"]'
            );
            expect(calendar).toBeFalsy();
            const time = element.shadowRoot.querySelector(
                '[data-element-id="avonni-layout-item-time"]'
            );
            expect(time).toBeTruthy();
            const days = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-day"]'
            );
            expect(days).toHaveLength(1);
        });
    });

    it('Date time picker: variant weekly', () => {
        element.variant = 'weekly';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-calendar"]'
            );
            expect(calendar).toBeFalsy();
            const time = element.shadowRoot.querySelector(
                '[data-element-id="avonni-layout-item-time"]'
            );
            expect(time).toBeTruthy();
            const days = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-day"]'
            );
            expect(days).toHaveLength(7);
        });
    });

    it('Date time picker: variant inline', () => {
        element.variant = 'inline';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-calendar"]'
            );
            expect(calendar).toBeFalsy();
            const time = element.shadowRoot.querySelector(
                '[data-element-id="avonni-layout-item-time"]'
            );
            expect(time).toBeTruthy();
            const days = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-day"]'
            );
            expect(days).toHaveLength(1);
        });
    });

    it('Date time picker: variant timeline', () => {
        element.variant = 'timeline';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-calendar"]'
            );
            expect(calendar).toBeFalsy();
            const time = element.shadowRoot.querySelector(
                '[data-element-id="avonni-layout-item-time-timeline"]'
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

    it('Date time picker: variant monthly', () => {
        element.variant = 'monthly';

        return Promise.resolve().then(() => {
            const calendar = element.shadowRoot.querySelector(
                '[data-element-id="avonni-calendar"]'
            );
            expect(calendar).toBeTruthy();
            const time = element.shadowRoot.querySelector(
                '[data-element-id="avonni-layout-item-time"]'
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
    it('Date time picker: read only daily', () => {
        element.readOnly = true;
        const buttons = element.shadowRoot.querySelectorAll(
            '[data-element-id="button-default"]'
        );
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
    it('Date time picker: required', () => {
        element.required = true;

        return Promise.resolve().then(() => {
            const required = element.shadowRoot.querySelector('.slds-required');
            expect(required).toBeTruthy();
            expect(required.textContent).toBe('*');
        });
    });

    // message when value is missing
    // Depends on required, focus(), blur() and showHelpMessageIfInvalid()
    it('Date time picker: message when value is missing', () => {
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
    it('Date time picker: name', () => {
        element.name = 'a-string-name';
        const input = element.shadowRoot.querySelector(
            '[data-element-id="lightning-input"]'
        );

        return Promise.resolve().then(() => {
            expect(input.name).toBe('a-string-name');
        });
    });

    // start time
    it('Date time picker: start time', () => {
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
    it('Date time picker: end time', () => {
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
    it('Date time picker: time slot duration', () => {
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
    it('Date time picker: time format hour numeric', () => {
        const times = element.shadowRoot.querySelectorAll(
            '[data-element-id^="lightning-formatted-date-time-default"]'
        );

        return Promise.resolve().then(() => {
            times.forEach((time) => {
                expect(time.hour).toBe('numeric');
            });
        });
    });

    it('Date time picker: time format hour 2-digit', () => {
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
    it('Date time picker: time format hour 12', () => {
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
    it('Date time picker: time format minute numeric', () => {
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

    it('Date time picker: time format minute 2-digit', () => {
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
    it('Date time picker: time format second numeric', () => {
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

    it('Date time picker: time format second 2-digit', () => {
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
    it('Date time picker: show end time = false', () => {
        element.showEndTime = false;

        return Promise.resolve().then(() => {
            const endTimes = element.shadowRoot.querySelectorAll(
                '.date-time-picker__formatted-end-time'
            );
            expect(endTimes).toHaveLength(0);
        });
    });

    it('Date time picker: show end time = true', () => {
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
    it('Date time picker: show disabled dates = false', () => {
        element.disabled = true;
        element.showDisabledDates = false;

        return Promise.resolve().then(() => {
            const times = element.shadowRoot.querySelectorAll(
                '[data-element-id="button-default"]'
            );
            expect(times.length).toBeFalsy();
        });
    });

    it('Date time picker: show disabled dates = true', () => {
        element.disabled = true;
        element.showDisabledDates = true;

        return Promise.resolve().then(() => {
            const times = element.shadowRoot.querySelectorAll(
                '[data-element-id="button-default"]'
            );
            expect(times.length).toBeTruthy();
        });
    });

    // max and min
    it('Date time picker: max and min', () => {
        const maxDate = new Date(2021, 11, 30);
        const minDate = new Date(2021, 12, 1);
        element.max = maxDate;
        element.min = minDate;

        const input = element.shadowRoot.querySelector(
            '[data-element-id="lightning-input"]'
        );

        return Promise.resolve().then(() => {
            expect(new Date(input.max).toISOString()).toBe(
                new Date(2021, 11, 30, 23, 59, 59, 999).toISOString()
            );
            expect(new Date(input.min).toISOString()).toBe(
                minDate.toISOString()
            );
        });
    });

    // timezone
    it('Date time picker: timezone', () => {
        element.value = '2023-01-25T20:00:00.000Z';
        element.startTime = '01:00';
        element.endTime = '20:00';
        element.min = '2023-01-24T17:00:00.000Z';
        element.max = '2023-01-27T00:18:00.000Z';
        element.disabledDateTimes = ['2023-01-25T17:30:00.000Z'];
        element.variant = 'weekly';
        element.timezone = 'Pacific/Noumea';

        return Promise.resolve().then(() => {
            const input = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );
            const disabledButton = element.shadowRoot.querySelector(
                '[data-element-id="button-default"][data-time="2023-01-26T04:30:00.000+11:00"]'
            );
            expect(disabledButton).toBeFalsy();

            const selectedButton = element.shadowRoot.querySelector(
                '[data-element-id="button-default"][data-time="2023-01-26T07:00:00.000+11:00"]'
            );
            expect(selectedButton.ariaSelected).toBe('true');

            expect(input.max).toBe('2023-01-27T23:59:59.999+11:00');
            expect(input.min).toBe('2023-01-25T00:00:00.000+11:00');

            const firstDay = element.shadowRoot.querySelector(
                '[data-element-id="div-day"]'
            );
            const firstDayButtons = firstDay.querySelectorAll(
                '[data-element-id="button-default"]'
            );
            expect(firstDayButtons[0].dataset.time).toBe(
                '2023-01-25T01:00:00.000+11:00'
            );
            expect(
                firstDayButtons[firstDayButtons.length - 1].dataset.time
            ).toBe('2023-01-25T19:30:00.000+11:00');
        });
    });

    // type
    it('Date time picker: type checkbox', () => {
        element.type = 'checkbox';

        const buttons = element.shadowRoot.querySelectorAll(
            '[data-element-id="button-default"]'
        );
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

    it('Date time picker: type radio', () => {
        element.type = 'radio';

        const buttons = element.shadowRoot.querySelectorAll(
            '[data-element-id="button-default"]'
        );
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
    it('Date time picker: show time zone', () => {
        element.showTimeZone = true;

        const timeZone = element.shadowRoot.querySelectorAll(
            '[data-element-id^="lightning-combobox"]'
        );

        return Promise.resolve().then(() => {
            expect(timeZone).toBeTruthy();
        });
    });

    // hide navigation
    it('Date time picker: hide navigation', () => {
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

    // hide date label
    it('Date time picker: hideDateLabel = false', () => {
        element.hideDateLabel = false;

        return Promise.resolve().then(() => {
            const dateLabel = element.shadowRoot.querySelector(
                '[data-element-id="p-date-label"]'
            );
            expect(dateLabel).toBeTruthy();
        });
    });

    it('Date time picker: hideDateLabel = true', () => {
        element.hideDateLabel = true;

        return Promise.resolve().then(() => {
            const dateLabel = element.shadowRoot.querySelector(
                '[data-element-id="p-date-label"]'
            );
            expect(dateLabel).toBeFalsy();
        });
    });

    // hide date picker
    it('Date time picker: hide date picker', () => {
        element.hideDatePicker = true;

        return Promise.resolve().then(() => {
            const datePicker = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );
            expect(datePicker).toBeFalsy();
        });
    });

    // Date Picker centering on the right date
    it('Date time picker: center the picker on the right date', () => {
        const today = new Date();
        const min = new Date(2040, 11, 1);
        const max = new Date(1994, 0, 28);
        const date = new Date(1993, 4, 5);

        // By default, the picker is centered on the current date
        let input = element.shadowRoot.querySelector(
            '[data-element-id="lightning-input"]'
        );
        const value = new Date(input.value);
        expect(value.getDate()).toBe(today.getDate());
        expect(value.getMonth()).toBe(today.getMonth());
        expect(value.getYear()).toBe(today.getYear());

        // Center the picker on the min
        element.min = min;
        return Promise.resolve()
            .then(() => {
                input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );
                expect(new Date(input.value)).toEqual(min);

                // Center the picker on the max
                element.min = undefined;
                element.max = max;
            })
            .then(() => {
                input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );
                expect(new Date(input.value)).toEqual(max);

                // Center the picker on the value
                element.value = date;
            })
            .then(() => {
                input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );
                expect(new Date(input.value)).toEqual(date);
            });
    });

    /* ----- JS --------- */
    // checkValidity
    it('Date time picker: checkValidity method', () => {
        const spy = jest.spyOn(element, 'checkValidity');

        element.checkValidity();
        expect(spy).toHaveBeenCalled();
    });

    // getDateRangeBounds
    it('Date time picker: getDateRangeBounds method', () => {
        element.value = new Date(2024, 7, 30);

        return Promise.resolve().then(() => {
            const dateRange = element.shadowRoot.querySelector(
                '[data-element-id="p-date-label"]'
            );
            const bounds = dateRange.getBoundingClientRect();
            expect(bounds).toEqual(element.getDateRangeBounds());
        });
    });

    // goToDate
    it('Date time picker: goToDate method', () => {
        const date = new Date(2021, 12, 1);
        element.variant = 'monthly';

        let spy;
        return Promise.resolve()
            .then(() => {
                const calendar = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-calendar"]'
                );
                spy = jest.spyOn(calendar, 'goToDate');
                element.goToDate(date);
            })
            .then(() => {
                expect(spy).toHaveBeenCalled();
                const datePicker = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );
                expect(new Date(datePicker.value)).toEqual(date);
            });
    });

    // reportValidity
    it('Date time picker: reportValidity method', () => {
        const spy = jest.spyOn(element, 'reportValidity');

        element.reportValidity();
        expect(spy).toHaveBeenCalled();
    });

    // setCustomValidity
    it('Date time picker: setCustomValidity method', () => {
        const spy = jest.spyOn(element, 'setCustomValidity');

        element.setCustomValidity('Something');
        expect(spy).toHaveBeenCalled();
    });

    // showHelpMessageIfInvalid
    it('Date time picker: showHelpMessageIfInvalid method', () => {
        const datePicker = element.shadowRoot.querySelector(
            '[data-element-id="lightning-input"]'
        );
        const spy = jest.spyOn(datePicker, 'reportValidity');

        element.showHelpMessageIfInvalid();
        expect(spy).toHaveBeenCalled();
    });

    /*
     * ------------------------------------------------------------
     *  EVENTS
     * -------------------------------------------------------------
     */

    describe('Events', () => {
        // change
        describe('change', () => {
            it('Select a time', () => {
                element.startTime = '08:30';
                const startTimeDate = new Date(`1970-01-01T08:30`);
                const now = new Date();
                const day = now.getDate();
                const month = now.getMonth();
                const year = now.getFullYear();
                const handler = jest.fn();
                element.addEventListener('change', handler);

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelectorAll(
                        '[data-element-id="button-default"]'
                    );
                    button[0].click();
                    const date = new Date(
                        handler.mock.calls[0][0].detail.value
                    );
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

            it('Select a date through inline date picker', () => {
                element.startTime = '08:30';
                element.value = '2023-04-15T09:00';
                element.datePickerVariant = 'inline';

                const handler = jest.fn();
                element.addEventListener('change', handler);

                return Promise.resolve()
                    .then(() => {
                        const datePickerButtons =
                            element.shadowRoot.querySelectorAll(
                                '[data-element-id="button-inline-date-picker"]'
                            );
                        datePickerButtons[3].click();
                    })
                    .then(() => {
                        const button = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button-default"]'
                        );
                        button[0].click();

                        expect(handler).toHaveBeenCalled();
                        const value = handler.mock.calls[0][0].detail.value;
                        const expectedDate = new Date(
                            '2023-04-12T08:30'
                        ).toISOString();
                        const receivedDate = new Date(value).toISOString();
                        expect(receivedDate).toEqual(expectedDate);
                    });
            });
        });

        // Connected and disconnected events
        describe('Connected and disconnected', () => {
            it('privatedatetimepickerconnected', () => {
                while (document.body.firstChild) {
                    document.body.removeChild(document.body.firstChild);
                }
                element = createElement('avonni-date-time-picker', {
                    is: DateTimePicker
                });
                const handler = jest.fn();
                element.addEventListener(
                    'privatedatetimepickerconnected',
                    handler
                );
                document.body.appendChild(element);

                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.bubbles).toBeTruthy();
                expect(call.composed).toBeTruthy();
                expect(call.cancelable).toBeFalsy();
                expect(
                    call.detail.callbacks.renderDateTimePicker
                ).toBeInstanceOf(Function);
                expect(
                    call.detail.callbacks.setIsResizedByParent
                ).toBeInstanceOf(Function);
            });

            it('Resize can be managed by the parent', () => {
                while (document.body.firstChild) {
                    document.body.removeChild(document.body.firstChild);
                }
                element = createElement('avonni-date-time-picker', {
                    is: DateTimePicker
                });
                const handler = jest.fn();
                element.addEventListener(
                    'privatedatetimepickerconnected',
                    handler
                );
                document.body.appendChild(element);

                element.datePickerVariant = 'inline';
                element.variant = 'weekly';

                expect(handler).toHaveBeenCalled();
                const { renderDateTimePicker, setIsResizedByParent } =
                    handler.mock.calls[0][0].detail.callbacks;
                setIsResizedByParent(true);

                return Promise.resolve()
                    .then(() => {
                        const buttons = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button-inline-date-picker"]'
                        );
                        expect(buttons).toHaveLength(7);
                        const datePickerWrapper =
                            element.shadowRoot.querySelector(
                                '[data-element-id="avonni-date-time-picker"]'
                            );
                        jest.spyOn(
                            datePickerWrapper,
                            'getBoundingClientRect'
                        ).mockImplementation(() => {
                            return { width: 300 };
                        });
                        callObserver();
                    })
                    .then(() => {
                        // The default resize should have been ignored
                        const buttons = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button-inline-date-picker"]'
                        );
                        expect(buttons).toHaveLength(7);

                        // Trigger the resize
                        renderDateTimePicker();
                    })
                    .then(() => {
                        const buttons = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button-inline-date-picker"]'
                        );
                        expect(buttons).toHaveLength(1);
                    });
            });

            it('privatedatetimepickerdisconnected', () => {
                const handler = jest.fn();
                element.addEventListener(
                    'privatedatetimepickerdisconnected',
                    handler
                );
                while (document.body.firstChild) {
                    document.body.removeChild(document.body.firstChild);
                }
                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(call.bubbles).toBeTruthy();
                expect(call.composed).toBeTruthy();
                expect(call.cancelable).toBeFalsy();
            });
        });

        // navigate
        describe('navigate', () => {
            it('Fired on gotToDate()', () => {
                const handler = jest.fn();
                element.addEventListener('navigate', handler);
                const date = new Date('2023-12-13');
                element.goToDate(date);
                expect(handler).toHaveBeenCalled();
                const call = handler.mock.calls[0][0];
                expect(typeof call.detail.date).toBe('string');
                expect(new Date(call.detail.date)).toEqual(date);
                expect(call.bubbles).toBeFalsy();
                expect(call.composed).toBeFalsy();
                expect(call.cancelable).toBeFalsy();
            });

            it('Fired on Previous button click', () => {
                element.value = new Date('2023-12-13');

                const handler = jest.fn();
                element.addEventListener('navigate', handler);

                return Promise.resolve().then(() => {
                    const previous = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-previous"]'
                    );
                    previous.click();
                    expect(handler).toHaveBeenCalled();
                    const date = new Date(handler.mock.calls[0][0].detail.date);
                    expect(date).toEqual(new Date('2023-12-12'));
                });
            });

            it('Fired on date picker navigation', () => {
                const handler = jest.fn();
                element.addEventListener('navigate', handler);

                const datePicker = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );
                datePicker.dispatchEvent(
                    new CustomEvent('change', {
                        detail: {
                            value: '2023-12-12'
                        }
                    })
                );
                expect(handler).toHaveBeenCalled();
                expect(new Date(handler.mock.calls[0][0].detail.date)).toEqual(
                    new Date(2023, 11, 12)
                );
            });

            it('Fired on monthly calendar navigation', () => {
                element.variant = 'monthly';

                const handler = jest.fn();
                element.addEventListener('navigate', handler);

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar"]'
                    );
                    calendar.dispatchEvent(
                        new CustomEvent('navigate', {
                            detail: {
                                date: new Date(2023, 11, 12).toISOString()
                            }
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    expect(
                        new Date(handler.mock.calls[0][0].detail.date)
                    ).toEqual(new Date(2023, 11, 12));
                });
            });

            it('Fired on today click', () => {
                const handler = jest.fn();
                element.addEventListener('navigate', handler);

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-today"]'
                    );
                    button.click();

                    expect(handler).toHaveBeenCalled();
                    const date = new Date(handler.mock.calls[0][0].detail.date);
                    const today = new Date();
                    expect(date.getMonth()).toEqual(today.getMonth());
                    expect(date.getDate()).toEqual(today.getDate());
                    expect(date.getYear()).toEqual(today.getYear());
                });
            });
        });
    });
});
