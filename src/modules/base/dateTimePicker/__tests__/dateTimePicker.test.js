import DateTimePicker from 'c/dateTimePicker';
import { callObserver } from 'c/resizeObserver';
import { createElement } from 'lwc';

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

    describe('Attributes', () => {
        it('Default attributes', () => {
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
            expect(element.nextDatesButtonAlternativeText).toBe('Next dates');
            expect(element.nextWeekButtonAlternativeText).toBe('Next week');
            expect(element.noResultsMessage).toBe(
                'No available time slots for this period.'
            );
            expect(element.previousDatesButtonAlternativeText).toBe(
                'Previous dates'
            );
            expect(element.previousWeekButtonAlternativeText).toBe(
                'Previous week'
            );
            expect(element.readOnly).toBeFalsy();
            expect(element.required).toBeFalsy();
            expect(element.requiredAlternativeText).toBe('Required');
            expect(element.showDisabledDates).toBeUndefined();
            expect(element.showEndTime).toBeUndefined();
            expect(element.showTimeZone).toBeFalsy();
            expect(element.startTime).toBe('08:00');
            expect(element.timeFormatHour).toBe('numeric');
            expect(element.timeFormatHour12).toBeUndefined();
            expect(element.timeFormatMinute).toBe('2-digit');
            expect(element.timeFormatSecond).toBeUndefined();
            expect(element.timeSlotDuration).toBe(1800000);
            expect(element.timezoneLabel).toBe('Time Zone:');
            expect(element.timezonePlaceholder).toBe('Select time zone');
            expect(element.todayButtonLabel).toBe('Today');
            expect(element.type).toBe('radio');
            expect(element.validity).toMatchObject({});
            expect(element.value).toBeUndefined();
            expect(element.variant).toBe('daily');
            expect(element.weekStartDay).toBe(0);
        });

        describe('Avatar', () => {
            it('Passed to the component', () => {
                element.avatar = { fallbackIconName: 'standard:apps' };

                return Promise.resolve().then(() => {
                    const avatar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-avatar"]'
                    );
                    expect(avatar).toBeTruthy();
                    expect(avatar.fallbackIconName).toBe('standard:apps');
                });
            });
        });

        describe('Button alternative text', () => {
            it('Next dates', () => {
                element.nextDatesButtonAlternativeText =
                    'Next dates alternative text';
                element.value = new Date(2024, 0, 2);

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-next"]'
                    );
                    expect(button.title).toBe('Next dates alternative text');
                });
            });

            it('Next week', () => {
                element.datePickerVariant = 'inline';
                element.nextWeekButtonAlternativeText =
                    'Next week alternative text';
                element.value = new Date(2024, 0, 2);

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-next-week"]'
                    );
                    expect(button.title).toBe('Next week alternative text');
                });
            });

            it('Previous dates', () => {
                element.previousDatesButtonAlternativeText =
                    'Previous dates alternative text';
                element.value = new Date(2024, 0, 2);

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-previous"]'
                    );
                    expect(button.title).toBe(
                        'Previous dates alternative text'
                    );
                });
            });

            it('Previous week', () => {
                element.datePickerVariant = 'inline';
                element.previousWeekButtonAlternativeText =
                    'Previous week alternative text';
                element.value = new Date(2024, 0, 2);

                return Promise.resolve().then(() => {
                    const button = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-icon-previous-week"]'
                    );
                    expect(button.title).toBe('Previous week alternative text');
                });
            });
        });

        describe('Date format day', () => {
            it('Passed to the component', () => {
                element.dateFormatDay = '2-digit';
                element.value = new Date(2024, 0, 2);

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="p-date-label"]'
                    );
                    expect(label.textContent).toContain('02');
                });
            });
        });

        describe('Date format month', () => {
            it('Passed to the component', () => {
                element.dateFormatMonth = '2-digit';
                element.value = new Date(2024, 0, 2);

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="p-date-label"]'
                    );
                    expect(label.textContent).toContain('01');
                });
            });
        });

        describe('Date format year', () => {
            it('Passed to the component', () => {
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
        });

        describe('Date picker variant', () => {
            it('Input', () => {
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

                        // Make sure the test is not affected by the local language
                        const month = new Intl.DateTimeFormat('default', {
                            month: 'long',
                            hour12: false
                        }).formatToParts(new Date('2023-04-14'))[0].value;

                        expect(buttons[0].textContent).toBe(`9${month}`);
                    });
                });

                it('Drag to the right', () => {
                    element.datePickerVariant = 'inline';
                    element.value = '2023-04-14';
                    jest.useFakeTimers();

                    return Promise.resolve()
                        .then(() => {
                            const sunday = new Date(2023, 3, 9).getTime();
                            const sundayButton =
                                element.shadowRoot.querySelector(
                                    '[data-element-id="button-inline-date-picker"]'
                                );
                            expect(Number(sundayButton.dataset.date)).toBe(
                                sunday
                            );

                            const wrapper = element.shadowRoot.querySelector(
                                '[data-element-id="div-inline-date-picker-wrapper"]'
                            );
                            const startEvent = new CustomEvent('touchstart');
                            startEvent.changedTouches = [{ clientX: 0 }];
                            wrapper.dispatchEvent(startEvent);

                            const moveEvent = new CustomEvent('touchmove');
                            moveEvent.changedTouches = [{ clientX: 100 }];
                            window.dispatchEvent(moveEvent);

                            const pickerDates =
                                element.shadowRoot.querySelector(
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
                            const sundayButton =
                                element.shadowRoot.querySelector(
                                    '[data-element-id="button-inline-date-picker"]'
                                );
                            expect(Number(sundayButton.dataset.date)).toBe(
                                sunday
                            );

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
                            const sundayButton =
                                element.shadowRoot.querySelector(
                                    '[data-element-id="button-inline-date-picker"]'
                                );
                            expect(Number(sundayButton.dataset.date)).toBe(
                                sunday
                            );

                            const wrapper = element.shadowRoot.querySelector(
                                '[data-element-id="div-inline-date-picker-wrapper"]'
                            );
                            const startEvent = new CustomEvent('touchstart');
                            startEvent.changedTouches = [{ clientX: 0 }];
                            wrapper.dispatchEvent(startEvent);

                            const moveEvent = new CustomEvent('touchmove');
                            moveEvent.changedTouches = [{ clientX: -32 }];
                            window.dispatchEvent(moveEvent);

                            const pickerDates =
                                element.shadowRoot.querySelector(
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
                            const sundayButton =
                                element.shadowRoot.querySelector(
                                    '[data-element-id="button-inline-date-picker"]'
                                );
                            expect(Number(sundayButton.dataset.date)).toBe(
                                sunday
                            );

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

        describe('Disabled', () => {
            it('Daily', () => {
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

            it('Weekly', () => {
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

            it('Inline', () => {
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

            it('Timeline', () => {
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

            it('Monthly', () => {
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
        });

        describe('Disabled date times', () => {
            it('Removed from the time slots', () => {
                element.value = new Date(2025, 9, 27, 9);
                element.disabledDateTimes = [
                    new Date(2025, 9, 30, 10, 30),
                    'Wed'
                ];
                element.variant = 'weekly';

                return Promise.resolve().then(() => {
                    const dayLabels = element.shadowRoot.querySelectorAll(
                        '[data-element-id="span-day-label"]'
                    );
                    expect(dayLabels).toHaveLength(6);
                    expect(dayLabels[2].textContent).toContain('28');
                    expect(dayLabels[3].textContent).toContain('30');

                    const days = element.shadowRoot.querySelectorAll(
                        '[data-element-id="div-day"]'
                    );
                    const day30Hours = days[3].querySelectorAll(
                        '[data-element-id="button-default"]'
                    );
                    expect(day30Hours).toHaveLength(19);
                });
            });

            it('Displayed as disabled', () => {
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
                    expect(day16Hours).toHaveLength(20);
                    expect(day16Hours[4].disabled).toBeFalsy();
                    expect(day16Hours[5].disabled).toBeTruthy();
                    expect(day16Hours[6].disabled).toBeFalsy();
                    expect(day16Hours[12].disabled).toBeTruthy();
                });
            });

            it('Value is not accepted if disabled', () => {
                const date = new Date(2023, 9, 16, 10, 30);
                element.disabledDateTimes = [date];
                element.value = date;
                element.variant = 'weekly';
                element.showDisabledDates = true;

                return Promise.resolve()
                    .then(() => {
                        element.goToDate(date);
                    })
                    .then(() => {
                        const days = element.shadowRoot.querySelectorAll(
                            '[data-element-id="div-day"]'
                        );
                        const day16Hours = days[1].querySelectorAll(
                            '[data-element-id="button-default"]'
                        );
                        expect(day16Hours[5].ariaPressed).toBeFalsy();
                        element.disabledDateTimes = null;
                    })
                    .then(() => {
                        // The value is not disabled anymore
                        const days = element.shadowRoot.querySelectorAll(
                            '[data-element-id="div-day"]'
                        );
                        const day16Hours = days[1].querySelectorAll(
                            '[data-element-id="button-default"]'
                        );
                        expect(day16Hours[5].ariaPressed).toBeTruthy();
                    });
            });

            it('Imprecise disabled date times', () => {
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

            it('Full day disabled', () => {
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
        });

        describe('End time', () => {
            it('Passed to the component', () => {
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
        });

        describe('Field level help', () => {
            it('Passed to the component', () => {
                element.fieldLevelHelp = 'This is a field level help text';

                return Promise.resolve().then(() => {
                    const helptext = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-helptext"]'
                    );
                    expect(helptext).toBeTruthy();
                    expect(helptext.content).toBe(
                        'This is a field level help text'
                    );
                });
            });
        });

        describe('Hide date label', () => {
            it('false', () => {
                element.hideDateLabel = false;

                return Promise.resolve().then(() => {
                    const dateLabel = element.shadowRoot.querySelector(
                        '[data-element-id="p-date-label"]'
                    );
                    expect(dateLabel).toBeTruthy();
                });
            });

            it('true', () => {
                element.hideDateLabel = true;

                return Promise.resolve().then(() => {
                    const dateLabel = element.shadowRoot.querySelector(
                        '[data-element-id="p-date-label"]'
                    );
                    expect(dateLabel).toBeFalsy();
                });
            });
        });

        describe('Hide date picker', () => {
            it('Passed to the component', () => {
                element.hideDatePicker = true;

                return Promise.resolve().then(() => {
                    const datePicker = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-input"]'
                    );
                    expect(datePicker).toBeFalsy();
                });
            });

            describe('Center the picker on the right date', () => {
                it('Passed to the component', () => {
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
            });
        });

        describe('Hide label', () => {
            it('Passed to the component', () => {
                element.label = 'This is a label text';
                element.hideLabel = true;

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="p-label"]'
                    );
                    expect(label).toBeFalsy();
                });
            });
        });

        describe('Hide navigation', () => {
            it('Passed to the component', () => {
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
        });

        describe('Label', () => {
            it('Passed to the component', () => {
                element.label = 'This is a label text';

                return Promise.resolve().then(() => {
                    const label = element.shadowRoot.querySelector(
                        '[data-element-id="p-label"]'
                    );
                    expect(label).toBeTruthy();
                    expect(label.textContent).toBe('This is a label text');
                });
            });
        });

        describe('Max and min', () => {
            it('Passed to the component', () => {
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
        });

        describe('Message when value is missing', () => {
            it('Passed to the component', () => {
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
        });

        describe('Name', () => {
            it('Passed to the component', () => {
                element.name = 'a-string-name';
                const input = element.shadowRoot.querySelector(
                    '[data-element-id="lightning-input"]'
                );

                return Promise.resolve().then(() => {
                    expect(input.name).toBe('a-string-name');
                });
            });
        });

        describe('Read only', () => {
            it('Daily', () => {
                element.readOnly = true;
                const buttons = element.shadowRoot.querySelectorAll(
                    '[data-element-id="button-default"]'
                );
                const firstButton = buttons[0];

                return Promise.resolve().then(() => {
                    firstButton.click();
                    expect(firstButton.ariaPressed).toBeFalsy();
                });
            });
        });

        describe('Required', () => {
            it('Passed to the component', () => {
                element.required = true;
                element.requiredAlternativeText = 'Required Alternative Text';

                return Promise.resolve().then(() => {
                    const required = element.shadowRoot.querySelector(
                        '[data-element-id="abbr-required"]'
                    );
                    expect(required).toBeTruthy();
                    expect(required.textContent).toBe('*');
                    expect(required.title).toBe('Required Alternative Text');
                });
            });
        });

        describe('Show disabled dates', () => {
            it('false', () => {
                element.disabled = true;
                element.showDisabledDates = false;

                return Promise.resolve().then(() => {
                    const times = element.shadowRoot.querySelectorAll(
                        '[data-element-id="button-default"]'
                    );
                    expect(times.length).toBeFalsy();
                });
            });

            it('true', () => {
                element.disabled = true;
                element.showDisabledDates = true;

                return Promise.resolve().then(() => {
                    const times = element.shadowRoot.querySelectorAll(
                        '[data-element-id="button-default"]'
                    );
                    expect(times.length).toBeTruthy();
                });
            });
        });

        describe('Show end time', () => {
            it('false', () => {
                element.showEndTime = false;

                return Promise.resolve().then(() => {
                    const endTimes = element.shadowRoot.querySelectorAll(
                        '.date-time-picker__formatted-end-time'
                    );
                    expect(endTimes).toHaveLength(0);
                });
            });

            it('true', () => {
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
        });

        describe('Show time zone', () => {
            it('Passed to the component', () => {
                element.showTimeZone = true;

                const timeZone = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="lightning-combobox"]'
                );

                return Promise.resolve().then(() => {
                    expect(timeZone).toBeTruthy();
                });
            });
        });

        describe('Start time', () => {
            it('Passed to the component', () => {
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
        });

        describe('Static Labels', () => {
            it('No results message', () => {
                element.noResultsMessage =
                    'No results message alternative text';
                element.disabled = true;
                element.variant = 'daily';

                return Promise.resolve().then(() => {
                    const noResultsMessage = element.shadowRoot.querySelector(
                        '[data-element-id="p-empty-message"]'
                    );
                    expect(noResultsMessage.textContent).toBe(
                        'No results message alternative text'
                    );
                });
            });

            it('Time zone label and placeholder', () => {
                element.showTimeZone = true;
                element.timezoneLabel = 'Zone de temps:';
                element.timezonePlaceholder = 'Sélectionner la zone de temps';

                return Promise.resolve().then(() => {
                    const timeZone = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-combobox"]'
                    );
                    expect(timeZone.label).toBe('Zone de temps:');
                    expect(timeZone.placeholder).toBe(
                        'Sélectionner la zone de temps'
                    );
                });
            });

            it('Today button label', () => {
                element.todayButtonLabel = "Aujourd'hui";
                return Promise.resolve().then(() => {
                    const todayButton = element.shadowRoot.querySelector(
                        '[data-element-id="lightning-button-today"]'
                    );
                    expect(todayButton.label).toBe("Aujourd'hui");
                });
            });
        });

        describe('Time format hour', () => {
            it('Numeric', () => {
                const times = element.shadowRoot.querySelectorAll(
                    '[data-element-id^="lightning-formatted-date-time-default"]'
                );

                return Promise.resolve().then(() => {
                    times.forEach((time) => {
                        expect(time.hour).toBe('numeric');
                    });
                });
            });

            it('2-digit', () => {
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
        });

        describe('timeFormatHour12', () => {
            it('Passed to the component', () => {
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
        });

        describe('Time format minute', () => {
            it('Numeric', () => {
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

            it('2-digit', () => {
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
        });

        describe('Time format second', () => {
            it('Numeric', () => {
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

            it('2-digit', () => {
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
        });

        describe('Time slot duration', () => {
            it('Passed to the component', () => {
                element.timeSlotDuration = '01:00';

                return Promise.resolve().then(() => {
                    const times = element.shadowRoot.querySelectorAll(
                        '[data-element-id="button-default"]'
                    );
                    expect(times.length).toBeTruthy();
                });
            });

            it('true', () => {
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
        });

        describe('Timezone', () => {
            it('Passed to the component', () => {
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
                    expect(selectedButton.ariaPressed).toBe('true');

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
        });

        describe('Type', () => {
            it('Checkbox', () => {
                element.type = 'checkbox';

                return Promise.resolve()
                    .then(() => {
                        const buttons = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button-default"]'
                        );
                        buttons[0].click();
                        buttons[1].click();
                        buttons[2].click();
                    })
                    .then(() => {
                        const buttons = element.shadowRoot.querySelectorAll(
                            '[data-element-id="button-default"]'
                        );
                        expect(buttons[0].ariaPressed).toBeTruthy();
                        expect(buttons[1].ariaPressed).toBeTruthy();
                        expect(buttons[2].ariaPressed).toBeTruthy();
                    });
            });

            it('Radio', () => {
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
                    expect(firstButton.ariaPressed).toBeFalsy();
                    expect(secondButton.ariaPressed).toBeFalsy();
                    expect(thirdButton.ariaPressed).toBeFalsy();
                });
            });
        });

        describe('Week start day', () => {
            it('Inline date picker', () => {
                element.weekStartDay = 3;
                element.datePickerVariant = 'inline';
                element.value = '2025-10-28';

                return Promise.resolve().then(() => {
                    const firstTime = element.shadowRoot.querySelector(
                        '[data-element-id="button-inline-date-picker"]'
                    );
                    expect(Number(firstTime.dataset.date)).toBe(
                        new Date(2025, 9, 22).getTime()
                    );
                });
            });

            it('Weekly variant', () => {
                element.weekStartDay = 1;
                element.variant = 'weekly';
                element.value = '2025-10-28';

                return Promise.resolve().then(() => {
                    const firstTime = element.shadowRoot.querySelector(
                        '[data-element-id="button-default"]'
                    );
                    expect(new Date(firstTime.dataset.time).getTime()).toBe(
                        new Date(2025, 9, 27, 8).getTime()
                    );
                });
            });

            it('Monthly variant', () => {
                element.weekStartDay = 1;
                element.variant = 'monthly';

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar"]'
                    );
                    expect(calendar.weekStartDay).toBe(1);
                });
            });
        });
    });

    describe('Methods', () => {
        it('checkValidity', () => {
            const spy = jest.spyOn(element, 'checkValidity');

            element.checkValidity();
            expect(spy).toHaveBeenCalled();
        });

        it('getDateRangeBounds', () => {
            element.value = new Date(2024, 7, 30);

            return Promise.resolve().then(() => {
                const dateRange = element.shadowRoot.querySelector(
                    '[data-element-id="p-date-label"]'
                );
                const bounds = dateRange.getBoundingClientRect();
                expect(bounds).toEqual(element.getDateRangeBounds());
            });
        });

        it('goToDate', () => {
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

        it('reportValidity', () => {
            const spy = jest.spyOn(element, 'reportValidity');

            element.reportValidity();
            expect(spy).toHaveBeenCalled();
        });

        it('setCustomValidity', () => {
            const spy = jest.spyOn(element, 'setCustomValidity');

            element.setCustomValidity('Something');
            expect(spy).toHaveBeenCalled();
        });

        it('showHelpMessageIfInvalid', () => {
            const datePicker = element.shadowRoot.querySelector(
                '[data-element-id="lightning-input"]'
            );
            const spy = jest.spyOn(datePicker, 'reportValidity');

            element.showHelpMessageIfInvalid();
            expect(spy).toHaveBeenCalled();
        });
    });

    describe('Events', () => {
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

            it('Disabled date time picker cannot be selected', () => {
                element.disabled = true;
                element.showDisabledDates = true;
                element.value = new Date(2023, 9, 16, 10, 30);

                const handler = jest.fn();
                element.addEventListener('change', handler);

                return Promise.resolve().then(() => {
                    const time = element.shadowRoot.querySelector(
                        '[data-element-id="button-default"]'
                    );
                    time.dispatchEvent(new CustomEvent('click'));
                    expect(handler).not.toHaveBeenCalled();
                });
            });

            it('Disabled time cannot be selected', () => {
                element.variant = 'weekly';
                element.showDisabledDates = true;
                element.disabledDateTimes = [
                    new Date(2023, 9, 16, 10, 30),
                    new Date(2023, 9, 16, 11, 30)
                ];
                element.value = new Date(2023, 9, 16, 10, 30);

                const handler = jest.fn();
                element.addEventListener('change', handler);

                return Promise.resolve()
                    .then(() => {
                        element.goToDate(new Date(2023, 9, 16));
                    })
                    .then(() => {
                        const days = element.shadowRoot.querySelectorAll(
                            '[data-element-id="div-day"]'
                        );
                        const day16Hours = days[1].querySelectorAll(
                            '[data-element-id="button-default"]'
                        );
                        // Prevent selection of disabled time
                        const hour1130 = day16Hours[7];
                        hour1130.dispatchEvent(new CustomEvent('click'));
                        expect(handler).not.toHaveBeenCalled();
                        const hour1100 = day16Hours[6];

                        // Disabled times are erased from the change event value
                        hour1100.dispatchEvent(new CustomEvent('click'));
                        expect(handler).toHaveBeenCalled();
                        const value = handler.mock.calls[0][0].detail.value;
                        expect(new Date(value)).toEqual(
                            new Date(2023, 9, 16, 11)
                        );
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
