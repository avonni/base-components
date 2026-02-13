import { createElement } from 'lwc';
import Calendar from '../calendar';

// not tested : mouse over, mouse out events on calendar, keyboard selecting a date ouside current month, trying to select a disabled date, previous month and next month buttons

let element;
describe('Calendar', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllTimers();
        window.requestAnimationFrame.mockRestore();
    });

    beforeEach(() => {
        element = createElement('base-calendar', {
            is: Calendar
        });
        jest.useFakeTimers();
        jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
            setTimeout(() => cb(), 0);
        });
        document.body.appendChild(element);
    });

    describe('Attributes', () => {
        it('Default Attributes', () => {
            expect(element.dateLabels).toMatchObject([]);
            expect(element.disabled).toBeFalsy();
            expect(element.disabledDates).toMatchObject([]);
            expect(element.hideNavigation).toBeFalsy();
            expect(element.nbMonthCalendars).toBe(1);
            expect(element.markedDates).toMatchObject([]);
            expect(element.max).toMatchObject(new Date(2099, 11, 31));
            expect(element.min).toMatchObject(new Date(1900, 0, 1));
            expect(element.nextMonthButtonAlternativeText).toBe('Next Month');
            expect(element.previousMonthButtonAlternativeText).toBe(
                'Previous Month'
            );
            expect(element.selectionMode).toBe('single');
            expect(element.timezone).toBeUndefined();
            expect(element.value).toBeUndefined();
            expect(element.weekNumber).toBeFalsy();
            expect(element.weekStartDay).toBe(0);
            expect(element.yearSelectAssistiveText).toBe('Pick a year');
        });

        describe('dateLabels', () => {
            it('Passed to the component', () => {
                element.value = '05/14/2022';
                element.dateLabels = [
                    {
                        date: new Date('05/26/2022'),
                        label: '26 may'
                    }
                ];

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.dateLabels).toEqual(element.dateLabels);
                });
            });
        });

        describe('disabled', () => {
            it('Passed to the component', () => {
                element.value = '04/15/2021';
                element.disabled = true;
                return Promise.resolve().then(() => {
                    const buttons = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="lightning-button-icon"]'
                    );
                    buttons.forEach((button) => {
                        expect(button.disabled).toBeTruthy();
                    });
                    const year = element.shadowRoot.querySelector(
                        '[data-element-id="select-year"]'
                    );
                    expect(year.disabled).toBeTruthy();

                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.disabled).toBe(true);
                });
            });
        });

        describe('disabledDates', () => {
            it('Passed to the component', () => {
                element.value = '05/09/2021';
                element.disabledDates = '05/06/2021';
                element.min = new Date('05/01/2021');
                element.max = new Date('05/25/2021');

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.disabledDates).toEqual([
                        new Date('05/06/2021')
                    ]);
                });
            });
        });

        describe('hideNavigation', () => {
            it('Passed to the component', () => {
                element.hideNavigation = true;

                return Promise.resolve().then(() => {
                    const calendarNavigation = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__header"]'
                    );
                    expect(calendarNavigation).toBeNull();
                });
            });
        });

        describe('focusDate', () => {
            it('Passed to the component', () => {
                element.value = new Date(2022, 8, 5);

                return Promise.resolve().then(() => {
                    const date = new Date(2022, 8, 8);
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    const spy8 = jest.spyOn(calendar, 'focusDate');
                    element.focusDate(date);
                    jest.runAllTimers();

                    expect(spy8).toHaveBeenCalledWith(date, true);
                });
            });
        });

        describe('goToDate', () => {
            it('Passed to the component', () => {
                element.value = '05/12/2022';
                element.goToDate('08/04/2002');

                return Promise.resolve().then(() => {
                    const monthValue = element.shadowRoot.querySelector(
                        '[data-element-id="h2"]'
                    ).textContent;

                    const yearOption = element.shadowRoot.querySelector(
                        '[data-element-id="option-year"][value="2002"]'
                    );

                    expect(monthValue).toBe('August');
                    expect(yearOption.selected).toBeTruthy();
                });
            });
        });

        describe('nextMonth', () => {
            it('Passed to the component', () => {
                element.value = '05/12/2022';
                element.nextMonth();
                element.nextMonthButtonAlternativeText = 'Next Months';

                return Promise.resolve().then(() => {
                    const monthValue = element.shadowRoot.querySelector(
                        '[data-element-id="h2"]'
                    ).textContent;
                    expect(monthValue).toBe('June');
                    const nextMonthButton = element.shadowRoot.querySelector(
                        '[data-element-id="next-lightning-button-icon"]'
                    );
                    expect(nextMonthButton.title).toBe('Next Months');
                });
            });
        });

        describe('previousMonth', () => {
            it('Passed to the component', () => {
                element.value = '05/12/2022';
                element.previousMonth();
                element.previousMonthButtonAlternativeText = 'Previous Months';

                return Promise.resolve().then(() => {
                    const monthValue = element.shadowRoot.querySelector(
                        '[data-element-id="h2"]'
                    ).textContent;
                    expect(monthValue).toBe('April');
                    const previousMonthButton =
                        element.shadowRoot.querySelector(
                            '[data-element-id="previous-lightning-button-icon"]'
                        );
                    expect(previousMonthButton.title).toBe('Previous Months');
                });
            });
        });

        describe('marked dates', () => {
            it('Passed to the component', () => {
                element.value = '05/09/2021';
                element.markedDates = [
                    { date: new Date('05/05/2021'), color: 'rgb(255, 0, 0)' },
                    { date: new Date('05/10/2021'), color: 'rgb(0, 0, 0)' },
                    {
                        date: new Date('05/15/2021'),
                        color: 'rgb(255, 255, 255)'
                    }
                ];
                element.min = new Date('05/01/2021');
                element.max = new Date('05/31/2021');

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.markedDates).toEqual(element.markedDates);
                });
            });
        });

        describe('min max', () => {
            it('Passed to component', () => {
                element.value = '05/16/2021';
                element.min = new Date('05/15/2021');
                element.max = new Date('05/23/2021');

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );

                    expect(calendar.min).toEqual(new Date('05/15/2021'));
                    expect(calendar.max).toEqual(new Date('05/23/2021'));
                });
            });
        });

        describe('nbMonthCalendars', () => {
            it('Passed to the component', () => {
                element.value = '05/09/2021';
                element.nbMonthCalendars = 2;

                return Promise.resolve()
                    .then(() => {
                        const calendars = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-calendar__primitive-calendar"]'
                        );

                        expect(calendars.length).toBe(2);

                        calendars.forEach((calendar, index) => {
                            const date = new Date('05/01/2021');
                            const displayDate = new Date(
                                new Date(date).setMonth(date.getMonth() + index)
                            );

                            expect(calendar.isMultiCalendars).toBe(true);
                            expect(calendar.value).toEqual([
                                new Date('05/09/2021')
                            ]);
                            expect(calendar.displayDate).toEqual(displayDate);
                        });

                        element.value = '06/09/2021';
                    })
                    .then(() => {
                        const calendars = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-calendar__primitive-calendar"]'
                        );

                        expect(calendars.length).toBe(2);

                        calendars.forEach((calendar, index) => {
                            const date = new Date('05/01/2021');
                            const displayDate = new Date(
                                new Date(date).setMonth(date.getMonth() + index)
                            );

                            expect(calendar.isMultiCalendars).toBe(true);
                            expect(calendar.value).toEqual([
                                new Date('06/09/2021')
                            ]);
                            expect(calendar.displayDate).toEqual(displayDate);
                        });

                        element.value = '07/09/2021';
                    })
                    .then(() => {
                        const calendars = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-calendar__primitive-calendar"]'
                        );

                        expect(calendars.length).toBe(2);

                        calendars.forEach((calendar, index) => {
                            const date = new Date('07/01/2021');
                            const displayDate = new Date(
                                new Date(date).setMonth(date.getMonth() + index)
                            );

                            expect(calendar.isMultiCalendars).toBe(true);
                            expect(calendar.value).toEqual([
                                new Date('07/09/2021')
                            ]);
                            expect(calendar.displayDate).toEqual(displayDate);
                        });
                    });
            });
        });

        describe('timezone', () => {
            it('Passed to the component', () => {
                element.value = '2021-05-18T20:00:00.000Z';
                element.min = '2021-05-15T18:00:00.000Z';
                element.max = '2021-05-23T04:00:00.000Z';
                element.selectionMode = 'single';
                // UTC+11
                element.timezone = 'Pacific/Noumea';

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.timezone).toBe('Pacific/Noumea');
                });
            });
        });

        describe('values', () => {
            it('Selection-mode: single', () => {
                element.selectionMode = 'single';
                element.value = '04/15/2021';
                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.value).toEqual([new Date('04/15/2021')]);
                    const month = element.shadowRoot.querySelector(
                        '[data-element-id="h2"]'
                    );
                    expect(month.textContent).toBe('April');
                    const year2021 = element.shadowRoot.querySelector(
                        '[data-element-id="option-year"][value="2021"]'
                    );
                    expect(year2021.selected).toBeTruthy();
                });
            });

            it('Current day bigger than upper bound should re-center calendar to max value', () => {
                element.selectionMode = 'single';
                element.min = new Date('01/01/2020');
                element.max = new Date('12/31/2030');
                element.value = '11/11/2040';
                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.value).toEqual([]);
                    expect(calendar.displayDate).toEqual(
                        new Date('12/01/2030')
                    );
                    const month = element.shadowRoot.querySelector(
                        '[data-element-id="h2"]'
                    );
                    expect(month.textContent).toBe('December');
                    const year2030 = element.shadowRoot.querySelector(
                        '[data-element-id="option-year"][value="2030"]'
                    );
                    expect(year2030.selected).toBeTruthy();
                });
            });
            it('Current day smaller than lower bound should change to min value', () => {
                element.selectionMode = 'single';
                element.min = new Date('01/01/2020');
                element.max = new Date('12/31/2030');
                element.value = '04/04/100';
                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.value).toEqual([]);
                    expect(calendar.displayDate).toEqual(
                        new Date('01/01/2020')
                    );
                    const month = element.shadowRoot.querySelector(
                        '[data-element-id="h2"]'
                    );
                    expect(month.textContent).toBe('January');
                    const year2020 = element.shadowRoot.querySelector(
                        '[data-element-id="option-year"][value="2020"]'
                    );
                    expect(year2020.selected).toBeTruthy();
                });
            });

            it('Invalid calendar current day should change to current date if it is in min-max interval', () => {
                element.selectionMode = 'single';
                const currentDate = new Date();
                const currentMonthName = currentDate.toLocaleString('default', {
                    month: 'long'
                });
                element.min = new Date('01/01/2020');
                element.max = new Date('12/31/2099');
                element.value = '00/00/2022';

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    const today = new Date();
                    today.setDate(1);
                    today.setHours(0, 0, 0, 0);
                    expect(calendar.value).toEqual([]);
                    expect(calendar.displayDate).toEqual(today);
                    const month = element.shadowRoot.querySelector(
                        '[data-element-id="h2"]'
                    );
                    expect(month.textContent).toBe(currentMonthName);
                    const currentYear = currentDate.getFullYear();
                    const selectedYear = element.shadowRoot.querySelector(
                        `[data-element-id="option-year"][value="${currentYear}"]`
                    );
                    expect(selectedYear.selected).toBeTruthy();
                });
            });

            it('only dates in range should be selected', () => {
                element.selectionMode = 'multiple';
                element.min = new Date('01/01/2020');
                element.max = new Date('12/31/2030');
                element.value = [
                    '01/02/1000',
                    '03/04/1032',
                    '05/06/2022',
                    '07/08/2300',
                    '09/10/2444'
                ];
                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.displayDate).toEqual(
                        new Date('05/01/2022')
                    );
                    expect(calendar.value).toEqual([new Date('05/06/2022')]);
                    const month = element.shadowRoot.querySelector(
                        '[data-element-id="h2"]'
                    );
                    expect(month.textContent).toBe('May');
                    const year2022 = element.shadowRoot.querySelector(
                        '[data-element-id="option-year"][value="2022"]'
                    );
                    expect(year2022.selected).toBeTruthy();
                });
            });

            it('value validation with value below min', () => {
                element.selectionMode = 'interval';
                element.min = new Date('01/01/2020');
                element.max = new Date('12/31/2021');
                element.value = ['02/11/1000', '01/10/2020'];

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.value).toEqual([
                        new Date('01/01/2020'),
                        new Date('01/10/2020')
                    ]);
                    const month = element.shadowRoot.querySelector(
                        '[data-element-id="h2"]'
                    );
                    expect(month.textContent).toBe('January');
                    const year2020 = element.shadowRoot.querySelector(
                        '[data-element-id="option-year"][value="2020"]'
                    );
                    expect(year2020.selected).toBeTruthy();
                });
            });

            it('value validation with value higher than max', () => {
                element.selectionMode = 'interval';
                element.min = new Date('01/01/2020');
                element.max = new Date('12/31/2021');
                element.value = ['12/29/2021', '01/10/2025'];

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.value).toEqual([
                        new Date('12/29/2021'),
                        new Date('12/31/2021')
                    ]);
                    const month = element.shadowRoot.querySelector(
                        '[data-element-id="h2"]'
                    );
                    expect(month.textContent).toBe('December');
                    const year2021 = element.shadowRoot.querySelector(
                        '[data-element-id="option-year"][value="2021"]'
                    );
                    expect(year2021.selected).toBeTruthy();
                });
            });

            it('invalid values (before min)', () => {
                element.selectionMode = 'interval';
                element.min = new Date('01/01/2020');
                element.max = new Date('12/31/2021');
                element.value = ['12/29/1000', '01/10/2000'];

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.value).toEqual([]);
                    const month = element.shadowRoot.querySelector(
                        '[data-element-id="h2"]'
                    );
                    expect(month.textContent).toBe('January');
                    const year2020 = element.shadowRoot.querySelector(
                        '[data-element-id="option-year"][value="2020"]'
                    );
                    expect(year2020.selected).toBeTruthy();
                });
            });

            it('invalid values (after max)', () => {
                element.selectionMode = 'interval';
                element.min = new Date('01/01/2020');
                element.max = new Date('12/31/2021');
                element.value = ['12/29/2022', '01/10/2024'];

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.value).toEqual([]);
                    const month = element.shadowRoot.querySelector(
                        '[data-element-id="h2"]'
                    );
                    expect(month.textContent).toBe('January');
                    const year2020 = element.shadowRoot.querySelector(
                        '[data-element-id="option-year"][value="2020"]'
                    );
                    expect(year2020.selected).toBeTruthy();
                });
            });

            it('values before min and after max', () => {
                element.selectionMode = 'interval';
                element.min = new Date('01/01/2020');
                element.max = new Date('01/31/2020');
                element.value = ['12/29/1000', '01/10/2025'];

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.value).toEqual([
                        new Date('01/01/2020'),
                        new Date('01/31/2020')
                    ]);
                    const month = element.shadowRoot.querySelector(
                        '[data-element-id="h2"]'
                    );
                    expect(month.textContent).toBe('January');
                    const year2020 = element.shadowRoot.querySelector(
                        '[data-element-id="option-year"][value="2020"]'
                    );
                    expect(year2020.selected).toBeTruthy();
                });
            });

            it('two valid values selected', () => {
                element.selectionMode = 'interval';
                element.min = new Date('01/01/2020');
                element.max = new Date('12/31/2025');
                element.value = ['04/22/2022', '04/02/2022'];

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.value).toEqual([
                        new Date('04/02/2022'),
                        new Date('04/22/2022')
                    ]);
                    const month = element.shadowRoot.querySelector(
                        '[data-element-id="h2"]'
                    );
                    expect(month.textContent).toBe('April');
                    const year2022 = element.shadowRoot.querySelector(
                        '[data-element-id="option-year"][value="2022"]'
                    );
                    expect(year2022.selected).toBeTruthy();
                });
            });

            it('single no value', () => {
                element.value = '05/15/2021';
                element.min = new Date('05/01/2021');
                element.max = new Date('05/31/2021');
                element.selectionMode = 'single';
                const day14 = new Date('05/14/2021');
                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.value).toEqual([new Date('05/15/2021')]);
                    calendar.dispatchEvent(
                        new CustomEvent('selectdate', {
                            detail: {
                                fullDate: String(day14.getTime()),
                                disabled: false
                            }
                        })
                    );
                    expect(new Date(element.value)).toEqual(
                        new Date('05/14/2021')
                    );
                });
            });

            it('single same value', () => {
                element.value = '05/14/2021';
                element.min = new Date('05/01/2021');
                element.max = new Date('05/31/2021');
                const day14 = new Date('05/14/2021');
                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.value).toEqual([new Date('05/14/2021')]);
                    calendar.dispatchEvent(
                        new CustomEvent('selectdate', {
                            detail: {
                                fullDate: String(day14.getTime()),
                                disabled: false
                            }
                        })
                    );
                    expect(element.value).toBeNull();
                });
            });

            it('multiple', () => {
                element.value = ['04/15/2021', '04/16/2021', '04/17/2021'];
                element.selectionMode = 'multiple';
                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.value).toEqual([
                        new Date('04/15/2021'),
                        new Date('04/16/2021'),
                        new Date('04/17/2021')
                    ]);

                    const month = element.shadowRoot.querySelector(
                        '[data-element-id="h2"]'
                    );
                    expect(month.textContent).toBe('April');
                    const year2021 = element.shadowRoot.querySelector(
                        '[data-element-id="option-year"][value="2021"]'
                    );
                    expect(year2021.selected).toBeTruthy();
                });
            });

            it('multiple no value', () => {
                element.value = '05/15/2021';
                element.min = new Date('05/01/2021');
                element.max = new Date('05/31/2021');
                element.selectionMode = 'multiple';
                const day14 = new Date('05/14/2021');
                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.value).toEqual([new Date('05/15/2021')]);
                    calendar.dispatchEvent(
                        new CustomEvent('selectdate', {
                            detail: {
                                fullDate: String(day14.getTime()),
                                disabled: false
                            }
                        })
                    );
                    expect(element.value).toHaveLength(2);
                    expect(new Date(element.value[0])).toEqual(
                        new Date('05/15/2021')
                    );
                    expect(new Date(element.value[1])).toEqual(
                        new Date('05/14/2021')
                    );
                });
            });

            it('interval no value', () => {
                element.value = '05/14/2021';
                element.min = new Date('05/01/2021');
                element.max = new Date('05/31/2021');
                element.selectionMode = 'interval';
                const day14 = new Date('05/14/2021');
                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.value).toEqual([new Date('05/14/2021')]);
                    calendar.dispatchEvent(
                        new CustomEvent('selectdate', {
                            detail: {
                                fullDate: String(day14.getTime()),
                                disabled: false
                            }
                        })
                    );
                    expect(element.value).toEqual([]);
                    calendar.dispatchEvent(
                        new CustomEvent('selectdate', {
                            detail: {
                                fullDate: String(day14.getTime()),
                                disabled: false
                            }
                        })
                    );
                    expect(new Date(element.value)).toEqual(
                        new Date('05/14/2021')
                    );
                });
            });

            it('interval newDate < startDate', () => {
                element.value = '05/15/2021';
                element.min = new Date('05/01/2021');
                element.max = new Date('05/31/2021');
                element.selectionMode = 'interval';
                const day14 = new Date('05/14/2021');
                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.value).toEqual([new Date('05/15/2021')]);
                    calendar.dispatchEvent(
                        new CustomEvent('selectdate', {
                            detail: {
                                fullDate: String(day14.getTime()),
                                disabled: false
                            }
                        })
                    );
                    expect(element.value).toHaveLength(2);
                    expect(new Date(element.value[0])).toEqual(
                        new Date('05/14/2021')
                    );
                    expect(new Date(element.value[1])).toEqual(
                        new Date('05/15/2021')
                    );
                });
            });

            it('interval newDate > startDate', () => {
                element.value = '05/15/2021';
                element.min = new Date('05/01/2021');
                element.max = new Date('05/31/2021');
                element.selectionMode = 'interval';
                const day17 = new Date('05/17/2021');
                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.value).toEqual([new Date('05/15/2021')]);
                    calendar.dispatchEvent(
                        new CustomEvent('selectdate', {
                            detail: {
                                fullDate: String(day17.getTime()),
                                disabled: false
                            }
                        })
                    );
                    expect(element.value).toHaveLength(2);
                    expect(new Date(element.value[0])).toEqual(
                        new Date('05/15/2021')
                    );
                    expect(new Date(element.value[1])).toEqual(
                        new Date('05/17/2021')
                    );
                });
            });

            it('interval newDate < endDate', () => {
                element.value = ['05/15/2021', '05/16/2021'];
                element.min = new Date('05/01/2021');
                element.max = new Date('05/31/2021');
                element.selectionMode = 'interval';
                const day17 = new Date('05/17/2021');
                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.value).toEqual([
                        new Date('05/15/2021'),
                        new Date('05/16/2021')
                    ]);
                    calendar.dispatchEvent(
                        new CustomEvent('selectdate', {
                            detail: {
                                fullDate: String(day17.getTime()),
                                disabled: false
                            }
                        })
                    );
                    expect(element.value).toHaveLength(2);
                    expect(new Date(element.value[0])).toEqual(
                        new Date('05/15/2021')
                    );
                    expect(new Date(element.value[1])).toEqual(
                        new Date('05/17/2021')
                    );
                });
            });

            it('interval newDate < startDate < endDate', () => {
                element.value = ['05/15/2021', '05/16/2021'];
                element.min = new Date('05/01/2021');
                element.max = new Date('05/31/2021');
                element.selectionMode = 'interval';
                const day14 = new Date('05/14/2021');
                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.value).toEqual([
                        new Date('05/15/2021'),
                        new Date('05/16/2021')
                    ]);
                    calendar.dispatchEvent(
                        new CustomEvent('selectdate', {
                            detail: {
                                fullDate: String(day14.getTime()),
                                disabled: false
                            }
                        })
                    );
                    expect(element.value).toHaveLength(2);
                    expect(new Date(element.value[0])).toEqual(
                        new Date('05/14/2021')
                    );
                    expect(new Date(element.value[1])).toEqual(
                        new Date('05/16/2021')
                    );
                });
            });
        });

        describe('week number', () => {
            it('Passed to the component', () => {
                element.value = '05/09/2021';
                element.min = new Date('05/01/2021');
                element.max = new Date('05/31/2021');
                element.weekNumber = true;

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.weekNumber).toEqual(true);
                });
            });
        });

        describe('week start day', () => {
            it('Weeks start on Tuesday', () => {
                element.weekStartDay = 2;
                element.value = '2025-10-10T00:00:00Z';

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    expect(calendar.weekStartDay).toBe(2);
                });
            });
        });

        describe('yearSelectAssistiveText', () => {
            it('Passed to the component', () => {
                element.yearSelectAssistiveText = 'Year Select';

                return Promise.resolve().then(() => {
                    const yearSelectAssistiveText =
                        element.shadowRoot.querySelector(
                            '[data-element-id="year-select-assistive-text"]'
                        );
                    expect(yearSelectAssistiveText.textContent).toBe(
                        'Year Select'
                    );
                });
            });
        });
    });

    describe('Events', () => {
        it('privatefocus', () => {
            const handler = jest.fn();
            element.addEventListener('privatefocus', handler);

            return Promise.resolve().then(() => {
                const previousButton = element.shadowRoot.querySelector(
                    '[data-element-id="previous-lightning-button-icon"]'
                );

                previousButton.dispatchEvent(
                    new CustomEvent('focus', { bubbles: true })
                );
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                expect(handler.mock.calls[0][0].composed).toBeFalsy();
                expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
            });
        });

        it('privateblur', () => {
            const handler = jest.fn();
            element.addEventListener('privateblur', handler);

            return Promise.resolve().then(() => {
                const calendarContainer = element.shadowRoot.querySelector(
                    '[data-element-id="avonni-calendar__container"]'
                );
                calendarContainer.dispatchEvent(new CustomEvent('blur'));
                expect(handler).toHaveBeenCalled();
                expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                expect(handler.mock.calls[0][0].composed).toBeTruthy();
                expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
            });
        });

        describe('change', () => {
            it('Fired on day click', () => {
                element.value = '05/09/2021';
                element.min = new Date('05/01/2021');
                element.max = new Date('05/31/2021');
                const day7 = new Date('05/07/2021');
                const handler = jest.fn();
                element.addEventListener('change', handler);

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    calendar.dispatchEvent(
                        new CustomEvent('selectdate', {
                            detail: {
                                fullDate: String(day7.getTime()),
                                disabled: false,
                                bounds: { x: 1, y: 1 }
                            }
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    const normalizedDate = new Date('05/07/2021');
                    expect(typeof call.detail.value).toBe('string');
                    expect(call.detail.bounds).toEqual({ x: 1, y: 1 });
                    expect(new Date(call.detail.value)).toEqual(normalizedDate);
                    expect(call.bubbles).toBeFalsy();
                    expect(call.composed).toBeFalsy();
                    expect(call.cancelable).toBeFalsy();
                });
            });

            it('Selection-mode: multiple', () => {
                element.value = '05/09/2021';
                element.selectionMode = 'multiple';
                element.min = new Date('05/01/2021');
                element.max = new Date('05/31/2021');
                const day7 = new Date('05/07/2021');

                const handler = jest.fn();
                element.addEventListener('change', handler);

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    calendar.dispatchEvent(
                        new CustomEvent('selectdate', {
                            detail: {
                                fullDate: String(day7.getTime()),
                                disabled: false,
                                bounds: { x: 1, y: 1 }
                            }
                        })
                    );

                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.detail.value).toHaveLength(2);
                    expect(call.detail.bounds).toEqual({ x: 1, y: 1 });
                    call.detail.value.forEach((val) => {
                        expect(typeof val).toBe('string');
                    });
                    expect(new Date(call.detail.value[0])).toEqual(
                        new Date('05/09/2021')
                    );
                    expect(new Date(call.detail.value[1])).toEqual(
                        new Date('05/07/2021')
                    );
                });
            });

            it('Selection-mode: multiple unselect', () => {
                element.value = '05/09/2021';
                element.min = new Date('05/01/2021');
                element.max = new Date('05/31/2021');
                element.selectionMode = 'multiple';
                const day9 = new Date('05/09/2021');

                const handler = jest.fn();
                element.addEventListener('change', handler);

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    calendar.dispatchEvent(
                        new CustomEvent('selectdate', {
                            detail: {
                                fullDate: String(day9.getTime()),
                                disabled: false,
                                bounds: { x: 1, y: 1 }
                            }
                        })
                    );
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toMatchObject(
                        []
                    );
                    expect(handler.mock.calls[0][0].detail.bounds).toEqual({
                        x: 1,
                        y: 1
                    });
                });
            });

            it('Selection-mode: interval', () => {
                element.value = '05/09/2021';
                element.min = new Date('05/01/2021');
                element.max = new Date('05/31/2021');
                element.selectionMode = 'interval';
                const day11 = new Date('05/11/2021');

                const handler = jest.fn();
                element.addEventListener('change', handler);

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    calendar.dispatchEvent(
                        new CustomEvent('selectdate', {
                            detail: {
                                fullDate: String(day11.getTime()),
                                disabled: false,
                                bounds: { x: 1, y: 1 }
                            }
                        })
                    );
                    expect(handler).toHaveBeenCalled();
                    const value = handler.mock.calls[0][0].detail.value;
                    expect(value).toHaveLength(2);
                    value.forEach((val) => {
                        expect(typeof val).toBe('string');
                    });
                    expect(new Date(value[0])).toEqual(new Date('05/09/2021'));
                    expect(new Date(value[1])).toEqual(new Date('05/11/2021'));
                    expect(handler.mock.calls[0][0].detail.bounds).toEqual({
                        x: 1,
                        y: 1
                    });
                });
            });
        });

        describe('navigate', () => {
            it('Next month', () => {
                element.value = '05/08/2022';

                const handler = jest.fn();
                element.addEventListener('navigate', handler);

                return Promise.resolve().then(() => {
                    const nextMonthButton = element.shadowRoot.querySelector(
                        '[data-element-id="next-lightning-button-icon"]'
                    );
                    nextMonthButton.click();
                    expect(handler).toHaveBeenCalled();
                    const date = handler.mock.calls[0][0].detail.date;
                    expect(typeof date).toBe('string');
                    expect(new Date(date)).toEqual(new Date('06/01/2022'));
                });
            });

            it('Previous month', () => {
                element.value = '05/08/2022';

                const handler = jest.fn();
                element.addEventListener('navigate', handler);

                return Promise.resolve().then(() => {
                    const previousMonthButton =
                        element.shadowRoot.querySelector(
                            '[data-element-id="previous-lightning-button-icon"]'
                        );
                    previousMonthButton.click();
                    expect(handler).toHaveBeenCalled();
                    const date = handler.mock.calls[0][0].detail.date;
                    expect(new Date(date)).toEqual(new Date('04/01/2022'));
                });
            });

            it('Fired on year change', () => {
                element.value = '05/09/2021';
                const handler = jest.fn();
                element.addEventListener('navigate', handler);

                return Promise.resolve().then(() => {
                    const selectYear = element.shadowRoot.querySelector(
                        '[data-element-id="select-year"]'
                    );
                    selectYear.value = '2025';
                    selectYear.dispatchEvent(new CustomEvent('change'));

                    expect(handler).toHaveBeenCalled();
                    const date = handler.mock.calls[0][0].detail.date;
                    expect(new Date(date)).toEqual(new Date('05/01/2025'));
                });
            });
        });

        describe('keydowndate', () => {
            it('Dispatch navigate on different month/year', () => {
                element.value = '05/08/2022';

                const handler = jest.fn();
                element.addEventListener('navigate', handler);

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    const focusDateSpy = jest.spyOn(calendar, 'focusDate');
                    calendar.dispatchEvent(
                        new CustomEvent('keydowndate', {
                            detail: {
                                fullDate: new Date('05/08/2022'),
                                nextDate: new Date('06/08/2022')
                            }
                        })
                    );
                    expect(handler).toHaveBeenCalled();
                    const date = handler.mock.calls[0][0].detail.date;
                    expect(typeof date).toBe('string');
                    expect(new Date(date)).toEqual(new Date('06/01/2022'));
                    jest.runAllTimers();
                    expect(focusDateSpy).toHaveBeenCalledWith(
                        new Date('06/08/2022'),
                        true
                    );
                });
            });

            it('Does not dispatch navigate on same month/year', () => {
                element.value = '05/08/2022';

                const handler = jest.fn();
                element.addEventListener('navigate', handler);

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    const focusDateSpy = jest.spyOn(calendar, 'focusDate');
                    calendar.dispatchEvent(
                        new CustomEvent('keydowndate', {
                            detail: {
                                fullDate: new Date('05/08/2022'),
                                nextDate: new Date('05/09/2022')
                            }
                        })
                    );
                    expect(handler).not.toHaveBeenCalled();
                    jest.runAllTimers();
                    expect(focusDateSpy).toHaveBeenCalledWith(
                        new Date('05/09/2022'),
                        true
                    );
                });
            });

            it('Next date above max', () => {
                element.value = '05/08/2022';
                element.max = '12/31/2099';
                element.min = '01/01/2000';

                const handler = jest.fn();
                element.addEventListener('navigate', handler);

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    calendar.dispatchEvent(
                        new CustomEvent('keydowndate', {
                            detail: {
                                fullDate: new Date('05/08/2022'),
                                nextDate: new Date('05/08/2100')
                            }
                        })
                    );
                    expect(handler).toHaveBeenCalled();
                    const date = handler.mock.calls[0][0].detail.date;
                    expect(typeof date).toBe('string');
                    expect(new Date(date)).toEqual(new Date('05/01/2100'));
                    const focusDateSpy = jest.spyOn(calendar, 'focusDate');
                    jest.runAllTimers();
                    const lastCall =
                        focusDateSpy.mock.calls[
                            focusDateSpy.mock.calls.length - 1
                        ];
                    expect(lastCall).toEqual([new Date('12/31/2099'), true]);
                });
            });

            it('Next date below min', () => {
                element.value = '05/08/2022';
                element.max = '12/31/2099';
                element.min = '01/01/2000';

                const handler = jest.fn();
                element.addEventListener('navigate', handler);

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    calendar.dispatchEvent(
                        new CustomEvent('keydowndate', {
                            detail: {
                                fullDate: new Date('05/08/2022'),
                                nextDate: new Date('05/08/1999')
                            }
                        })
                    );
                    expect(handler).toHaveBeenCalled();
                    const date = handler.mock.calls[0][0].detail.date;
                    expect(typeof date).toBe('string');
                    expect(new Date(date)).toEqual(new Date('05/01/1999'));
                    const focusDateSpy = jest.spyOn(calendar, 'focusDate');
                    jest.runAllTimers();
                    const lastCall =
                        focusDateSpy.mock.calls[
                            focusDateSpy.mock.calls.length - 1
                        ];
                    expect(lastCall).toEqual([new Date('01/01/2000'), true]);
                });
            });

            it('Dispatch navigate on multi calendars if next date not visible', () => {
                element.value = '05/08/2022';
                element.nbMonthCalendars = 2;

                const handler = jest.fn();
                element.addEventListener('navigate', handler);

                return Promise.resolve()
                    .then(() => {
                        const calendars = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-calendar__primitive-calendar"]'
                        );
                        calendars[1].dispatchEvent(
                            new CustomEvent('keydowndate', {
                                detail: {
                                    fullDate: new Date('06/08/2022'),
                                    nextDate: new Date('07/08/2022')
                                }
                            })
                        );
                        expect(handler).toHaveBeenCalled();
                        const date = handler.mock.calls[0][0].detail.date;
                        expect(typeof date).toBe('string');
                        expect(new Date(date)).toEqual(new Date('06/01/2022'));
                    })
                    .then(() => {
                        const calendars = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-calendar__primitive-calendar"]'
                        );
                        const focusDateSpy = jest.spyOn(
                            calendars[1],
                            'focusDate'
                        );
                        jest.runAllTimers();
                        const lastCall =
                            focusDateSpy.mock.calls[
                                focusDateSpy.mock.calls.length - 1
                            ];
                        expect(lastCall).toEqual([
                            new Date('07/08/2022'),
                            true
                        ]);
                    });
            });

            it('Dispatch not navigate on multi calendars if next date visible', () => {
                element.value = '05/08/2022';
                element.nbMonthCalendars = 2;

                const handler = jest.fn();
                element.addEventListener('navigate', handler);

                return Promise.resolve()
                    .then(() => {
                        const calendars = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-calendar__primitive-calendar"]'
                        );
                        calendars[1].dispatchEvent(
                            new CustomEvent('keydowndate', {
                                detail: {
                                    fullDate: new Date('05/08/2022'),
                                    nextDate: new Date('06/08/2022')
                                }
                            })
                        );
                        expect(handler).not.toHaveBeenCalled();
                    })
                    .then(() => {
                        const calendars = element.shadowRoot.querySelectorAll(
                            '[data-element-id="avonni-calendar__primitive-calendar"]'
                        );
                        const focusDateSpy = jest.spyOn(
                            calendars[1],
                            'focusDate'
                        );
                        jest.runAllTimers();
                        const lastCall =
                            focusDateSpy.mock.calls[
                                focusDateSpy.mock.calls.length - 1
                            ];
                        expect(lastCall).toEqual([
                            new Date('06/08/2022'),
                            true
                        ]);
                    });
            });

            it('Does not dispatch navigate if initial date is NaN', () => {
                element.value = '05/08/2022';

                const handler = jest.fn();
                element.addEventListener('navigate', handler);

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    calendar.dispatchEvent(
                        new CustomEvent('keydowndate', {
                            detail: {
                                fullDate: NaN,
                                nextDate: new Date('05/09/2022')
                            }
                        })
                    );
                    expect(handler).not.toHaveBeenCalled();
                });
            });

            it('Does not dispatch navigate if next date is NaN', () => {
                element.value = '05/08/2022';

                const handler = jest.fn();
                element.addEventListener('navigate', handler);

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    calendar.dispatchEvent(
                        new CustomEvent('keydowndate', {
                            detail: {
                                fullDate: new Date('05/09/2022'),
                                nextDate: NaN
                            }
                        })
                    );
                    expect(handler).not.toHaveBeenCalled();
                });
            });
        });

        describe('mouseoutdate', () => {
            it('Mouse out date', () => {
                element.value = '05/08/2022';

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    const spy = jest.spyOn(calendar, 'mouseOutDate');
                    calendar.dispatchEvent(new CustomEvent('mouseoutdate'));
                    expect(spy).toHaveBeenCalledTimes(1);
                });
            });
        });

        describe('mouseoverdate', () => {
            it('Mouse over date', () => {
                element.value = '05/08/2022';

                return Promise.resolve().then(() => {
                    const calendar = element.shadowRoot.querySelector(
                        '[data-element-id="avonni-calendar__primitive-calendar"]'
                    );
                    const spyMouseOut = jest.spyOn(calendar, 'mouseOutDate');
                    const spyMouseOver = jest.spyOn(calendar, 'mouseOverDate');
                    calendar.dispatchEvent(
                        new CustomEvent('mouseoverdate', {
                            detail: {
                                day: new Date('05/10/2022').getTime()
                            }
                        })
                    );
                    expect(spyMouseOut).toHaveBeenCalledTimes(1);
                    expect(spyMouseOver).toHaveBeenCalledTimes(1);
                });
            });
        });
    });
});
