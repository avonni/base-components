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
                    const day26Label = element.shadowRoot.querySelector(
                        '[data-element-id="chip-date-label"]'
                    );
                    expect(day26Label).toBeTruthy();
                    expect(day26Label.variant).toBe('base');
                    expect(day26Label.outline).toBeFalsy();
                    expect(day26Label.label).toBe('26 may');
                    expect(day26Label.className).toBe(
                        'avonni-calendar__chip-label avonni-calendar__chip-without-icon'
                    );
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
                    const tds = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="span-day-label"]'
                    );
                    tds.forEach((td) => {
                        expect(td.className).toContain('slds-day');
                    });
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
                    const dates = [];
                    const disabledDates = element.shadowRoot.querySelectorAll(
                        '.avonni-calendar__disabled-cell'
                    );
                    disabledDates.forEach((date) => {
                        dates.push(date.getAttribute('data-date'));
                    });
                    expect(dates.includes('6')).toBeTruthy();
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
                    const day8 = element.shadowRoot.querySelector(
                        `td[data-full-date="${date.getTime()}"]`
                    );
                    const spy8 = jest.spyOn(day8, 'focus');

                    element.focusDate(date);
                    jest.runAllTimers();

                    expect(spy8).toHaveBeenCalled();
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

        describe('keyboard accessibility', () => {
            it('[left]', () => {
                element.value = '05/09/2021';

                return Promise.resolve().then(() => {
                    const day8 =
                        element.shadowRoot.querySelector('td[data-date="8"]');
                    const spy8 = jest.spyOn(day8, 'focus');

                    jest.runOnlyPendingTimers();
                    const day9 =
                        element.shadowRoot.querySelector('td[tabindex="0"]');
                    day9.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'ArrowLeft',
                            bubbles: true
                        })
                    );
                    jest.runOnlyPendingTimers();

                    expect(spy8).toHaveBeenCalled();
                });
            });

            it('[right]', () => {
                element.value = '05/09/2021';

                return Promise.resolve().then(() => {
                    const day10 =
                        element.shadowRoot.querySelector('td[data-date="10"]');
                    const spy10 = jest.spyOn(day10, 'focus');

                    jest.runOnlyPendingTimers();
                    const day9 =
                        element.shadowRoot.querySelector('td[tabindex="0"]');
                    day9.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'ArrowRight',
                            bubbles: true
                        })
                    );
                    jest.runOnlyPendingTimers();

                    expect(spy10).toHaveBeenCalled();
                });
            });

            it('[up]', () => {
                element.value = '05/09/2021';

                return Promise.resolve().then(() => {
                    const day2 =
                        element.shadowRoot.querySelector('td[data-date="2"]');
                    const spy2 = jest.spyOn(day2, 'focus');

                    jest.runOnlyPendingTimers();
                    const day9 =
                        element.shadowRoot.querySelector('td[tabindex="0"]');
                    day9.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'ArrowUp',
                            bubbles: true
                        })
                    );
                    jest.runOnlyPendingTimers();

                    expect(spy2).toHaveBeenCalled();
                });
            });

            it('[down]', () => {
                element.value = '05/09/2021';

                return Promise.resolve().then(() => {
                    const day16 =
                        element.shadowRoot.querySelector('td[data-date="16"]');
                    const spy16 = jest.spyOn(day16, 'focus');

                    jest.runOnlyPendingTimers();
                    const day9 =
                        element.shadowRoot.querySelector('td[tabindex="0"]');
                    day9.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'ArrowDown',
                            bubbles: true
                        })
                    );
                    jest.runOnlyPendingTimers();

                    expect(spy16).toHaveBeenCalled();
                });
            });

            it('go to Sunday [home]', () => {
                element.value = '05/10/2022';

                return Promise.resolve().then(() => {
                    const day8 =
                        element.shadowRoot.querySelector('td[data-date="8"]');
                    const spy8 = jest.spyOn(day8, 'focus');

                    jest.runAllTimers();
                    const day9 =
                        element.shadowRoot.querySelector('td[tabindex="0"]');
                    day9.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'Home',
                            bubbles: true
                        })
                    );
                    jest.runAllTimers();

                    expect(spy8).toHaveBeenCalled();
                });
            });

            it('Calendar: keyboard accessibility - go to Saturday [end]', () => {
                element.value = '05/09/2022';

                return Promise.resolve().then(() => {
                    const day14 =
                        element.shadowRoot.querySelector('td[data-date="14"]');
                    const spy14 = jest.spyOn(day14, 'focus');

                    jest.runAllTimers();
                    const day9 =
                        element.shadowRoot.querySelector('td[tabindex="0"]');
                    day9.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'End',
                            bubbles: true
                        })
                    );
                    jest.runAllTimers();

                    expect(spy14).toHaveBeenCalled();
                });
            });

            it('Month down [PageDown]', () => {
                element.value = '05/09/2022';

                return Promise.resolve()
                    .then(() => {
                        const day9 =
                            element.shadowRoot.querySelector(
                                'td[data-date="9"]'
                            );
                        day9.dispatchEvent(
                            new KeyboardEvent('keydown', {
                                key: 'PageDown',
                                bubbles: true
                            })
                        );
                    })
                    .then(() => {
                        const monthLabel = element.shadowRoot.querySelector(
                            '[data-element-id="h2"]'
                        );
                        expect(monthLabel.textContent).toBe('April');
                        // value should not change with month change
                        expect(new Date(element.value)).toEqual(
                            new Date('05/09/2022')
                        );
                    });
            });

            it('Month up [PageUp]', () => {
                element.value = '05/09/2022';

                return Promise.resolve()
                    .then(() => {
                        const day9 =
                            element.shadowRoot.querySelector(
                                'td[data-date="9"]'
                            );
                        day9.dispatchEvent(
                            new KeyboardEvent('keydown', {
                                key: 'PageUp',
                                bubbles: true
                            })
                        );
                    })
                    .then(() => {
                        const monthLabel = element.shadowRoot.querySelector(
                            '[data-element-id="h2"]'
                        );

                        expect(monthLabel.textContent).toBe('June');
                        expect(new Date(element.value)).toEqual(
                            new Date('05/09/2022')
                        );
                    });
            });

            it('Year up [alt + PageDown]', () => {
                element.value = '05/09/2022';

                return Promise.resolve()
                    .then(() => {
                        const day9 =
                            element.shadowRoot.querySelector(
                                'td[data-date="9"]'
                            );
                        day9.dispatchEvent(
                            new KeyboardEvent('keydown', {
                                key: 'PageDown',
                                altKey: true,
                                bubbles: true
                            })
                        );
                    })
                    .then(() => {
                        const year2023 = element.shadowRoot.querySelector(
                            '[data-element-id="option-year"][value="2023"]'
                        );
                        expect(year2023.selected).toBeTruthy();
                        expect(new Date(element.value)).toEqual(
                            new Date('05/09/2022')
                        );
                    });
            });

            it('Year down [alt + PageUp]', () => {
                element.value = '05/09/2022';

                return Promise.resolve()
                    .then(() => {
                        const day9 =
                            element.shadowRoot.querySelector(
                                'td[data-date="9"]'
                            );
                        day9.dispatchEvent(
                            new KeyboardEvent('keydown', {
                                key: 'PageUp',
                                altKey: true,
                                bubbles: true
                            })
                        );
                    })
                    .then(() => {
                        const year2021 = element.shadowRoot.querySelector(
                            '[data-element-id="option-year"][value="2021"]'
                        );
                        expect(year2021.selected).toBeTruthy();
                        expect(new Date(element.value)).toEqual(
                            new Date('05/09/2022')
                        );
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
                    const markedDates = element.shadowRoot.querySelectorAll(
                        '[data-element-id="div-marked-cells"]'
                    );
                    expect(markedDates).toHaveLength(3);
                    expect(markedDates[0].style.background).toBe(
                        'rgb(255, 0, 0)'
                    );
                    expect(markedDates[1].style.background).toBe(
                        'rgb(0, 0, 0)'
                    );
                    expect(markedDates[2].style.background).toBe(
                        'rgb(255, 255, 255)'
                    );
                });
            });

            it('A maximum of 3 per date is displayed', () => {
                element.value = '05/09/2021';
                element.markedDates = [
                    { date: new Date('05/05/2021'), color: 'tomato' },
                    { date: new Date('05/05/2021'), color: 'blue' },
                    { date: new Date('05/05/2021'), color: 'violet' },
                    { date: new Date('05/05/2021'), color: 'purple' },
                    { date: new Date('05/05/2021'), color: 'orange' }
                ];

                return Promise.resolve().then(() => {
                    const markedDates = element.shadowRoot.querySelectorAll(
                        '[data-element-id="div-marked-cells"]'
                    );
                    expect(markedDates).toHaveLength(3);
                });
            });
        });

        describe('enable current month only', () => {
            it('Passed to the component', () => {
                element.value = '05/09/2021';
                return Promise.resolve().then(() => {
                    const dateArray = [];
                    const dates = element.shadowRoot.querySelectorAll(
                        ':not(.slds-day_adjacent-month) > .slds-day'
                    );
                    dates.forEach((date) => {
                        dateArray.push(date.textContent);
                    });
                    expect(dateArray.slice(0, 1)[0]).toBe('1');
                    expect(dateArray.slice(-1)[0]).toBe('31');
                });
            });
        });

        describe('min max', () => {
            it('Click only inside min-max', () => {
                element.value = '05/16/2021';
                element.min = new Date('05/15/2021');
                element.max = new Date('05/23/2021');
                element.selectionMode = 'single';

                return Promise.resolve().then(() => {
                    const day14 = element.shadowRoot.querySelector(
                        'span[data-date="14"]'
                    );
                    const day18 = element.shadowRoot.querySelector(
                        'span[data-date="18"]'
                    );
                    const day24 = element.shadowRoot.querySelector(
                        'span[data-date="24"]'
                    );
                    day14.click();
                    day18.click();
                    day24.click();
                    expect(new Date(element.value)).toEqual(
                        new Date('05/18/2021')
                    );
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
                    const selected = element.shadowRoot.querySelector(
                        '[data-element-id="td"][data-selected="true"]'
                    );
                    const selectedDayLabel = selected.querySelector(
                        '[data-element-id="span-day-label"]'
                    );
                    expect(selectedDayLabel.textContent).toBe('19');

                    const day15 = element.shadowRoot.querySelector(
                        '[data-element-id="span-day-label"][data-date="15"]'
                    );
                    expect(day15.dataset.disabled).toBe('true');

                    const day23 = element.shadowRoot.querySelector(
                        '[data-element-id="span-day-label"][data-date="23"]'
                    );
                    expect(day23.dataset.disabled).toBe('false');
                });
            });
        });

        describe('values', () => {
            it('Selection-mode: single', () => {
                element.selectionMode = 'single';
                element.value = '04/15/2021';
                return Promise.resolve().then(() => {
                    const selected =
                        element.shadowRoot.querySelector('.slds-is-selected');
                    const selectedDayLabel = selected.querySelector(
                        '[data-element-id="span-day-label"]'
                    );
                    expect(selectedDayLabel.textContent).toBe('15');
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
                    const day =
                        element.shadowRoot.querySelector('.slds-is-selected');
                    expect(day).toBeNull();
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
                    const day =
                        element.shadowRoot.querySelector('.slds-is-selected');
                    expect(day).toBeNull();
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
                element.max = new Date('12/31/2030');
                element.value = '00/00/2022';

                return Promise.resolve().then(() => {
                    const day =
                        element.shadowRoot.querySelector('.slds-is-selected');
                    expect(day).toBeNull();
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
                    const selected =
                        element.shadowRoot.querySelector('.slds-is-selected');
                    const selectedDayLabel = selected.querySelector(
                        '[data-element-id="span-day-label"]'
                    );
                    expect(selectedDayLabel.textContent).toBe('6');
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
                    const days =
                        element.shadowRoot.querySelectorAll(
                            '.slds-is-selected'
                        );
                    expect(days.length).toBe(10);
                    for (let i = 0; i < days.length; ++i) {
                        const dayLabel = days[i].querySelector(
                            '[data-element-id="span-day-label"]'
                        );
                        expect(dayLabel.textContent).toBe((i + 1).toString());
                    }
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
                    const days =
                        element.shadowRoot.querySelectorAll(
                            '.slds-is-selected'
                        );
                    expect(days.length).toBe(3);
                    for (let i = 0; i < days.length; ++i) {
                        const dayLabel = days[i].querySelector(
                            '[data-element-id="span-day-label"]'
                        );
                        expect(dayLabel.textContent).toBe((i + 29).toString());
                    }
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
                    const days =
                        element.shadowRoot.querySelector('.slds-is-selected');
                    expect(days).toBeNull();
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
                    const days =
                        element.shadowRoot.querySelector('.slds-is-selected');
                    expect(days).toBeNull();
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
                    const days =
                        element.shadowRoot.querySelectorAll(
                            '.slds-is-selected'
                        );
                    expect(days.length).toBe(31);
                    for (let i = 0; i < days.length; ++i) {
                        const dayLabel = days[i].querySelector(
                            '[data-element-id="span-day-label"]'
                        );
                        expect(dayLabel.textContent).toBe((i + 1).toString());
                    }
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
                    const days =
                        element.shadowRoot.querySelectorAll(
                            '.slds-is-selected'
                        );
                    expect(days.length).toBe(21);
                    for (let i = 0; i < days.length; ++i) {
                        const dayLabel = days[i].querySelector(
                            '[data-element-id="span-day-label"]'
                        );
                        expect(dayLabel.textContent).toBe((i + 2).toString());
                    }
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
                return Promise.resolve().then(() => {
                    const day14 = element.shadowRoot.querySelector(
                        'span[data-date="14"]'
                    );
                    day14.click();
                    expect(new Date(element.value)).toEqual(
                        new Date('05/14/2021')
                    );
                });
            });

            it('single same value', () => {
                element.value = '05/14/2021';
                element.min = new Date('05/01/2021');
                element.max = new Date('05/31/2021');
                return Promise.resolve().then(() => {
                    const day14 = element.shadowRoot.querySelector(
                        'span[data-date="14"]'
                    );
                    day14.click();
                    expect(element.value).toBeNull();
                });
            });

            it('multiple', () => {
                element.value = ['04/15/2021', '04/16/2021', '04/17/2021'];
                element.selectionMode = 'multiple';
                return Promise.resolve().then(() => {
                    const days =
                        element.shadowRoot.querySelectorAll(
                            '.slds-is-selected'
                        );
                    const dates = [];
                    days.forEach((day) => {
                        const dayLabel = day.querySelector(
                            '[data-element-id="span-day-label"]'
                        );
                        dates.push(dayLabel.textContent);
                    });

                    expect(dates.includes('15')).toBeTruthy();
                    expect(dates.includes('16')).toBeTruthy();
                    expect(dates.includes('17')).toBeTruthy();

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
                return Promise.resolve().then(() => {
                    const day14 = element.shadowRoot.querySelector(
                        'span[data-date="14"]'
                    );
                    day14.click();
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
                return Promise.resolve().then(() => {
                    const day14 = element.shadowRoot.querySelector(
                        'span[data-date="14"]'
                    );
                    day14.click();
                    expect(element.value).toEqual([]);
                    day14.click();
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
                return Promise.resolve().then(() => {
                    const day14 = element.shadowRoot.querySelector(
                        'span[data-date="14"]'
                    );
                    day14.click();
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
                return Promise.resolve().then(() => {
                    const day17 = element.shadowRoot.querySelector(
                        'span[data-date="17"]'
                    );
                    day17.click();
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
                return Promise.resolve().then(() => {
                    const day17 = element.shadowRoot.querySelector(
                        'span[data-date="17"]'
                    );
                    day17.click();
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
                return Promise.resolve().then(() => {
                    const day14 = element.shadowRoot.querySelector(
                        'span[data-date="14"]'
                    );
                    day14.click();
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
                    const weekNumbers = [];
                    const weeks = element.shadowRoot.querySelectorAll(
                        '.avonni-calendar__week-cell'
                    );
                    expect(weeks).toHaveLength(6);

                    weeks.forEach((week) => {
                        const dayLabel = week.querySelector(
                            '[data-element-id="span-day-label"]'
                        );
                        weekNumbers.push(dayLabel.textContent);
                    });
                    expect(weekNumbers.includes('16')).toBeTruthy();
                    expect(weekNumbers.includes('17')).toBeTruthy();
                    expect(weekNumbers.includes('18')).toBeTruthy();
                    expect(weekNumbers.includes('19')).toBeTruthy();
                    expect(weekNumbers.includes('20')).toBeTruthy();
                    expect(weekNumbers.includes('21')).toBeTruthy();
                });
            });
        });

        describe('week start day', () => {
            it('Weeks start on Tuesday', () => {
                element.weekStartDay = 2;
                element.value = '2025-10-10T00:00:00Z';

                return Promise.resolve().then(() => {
                    const headers = element.shadowRoot.querySelectorAll(
                        '[data-element-id="th"]'
                    );
                    expect(headers).toHaveLength(7);
                    expect(headers[0].textContent).toBe('Tue');
                    expect(headers[1].textContent).toBe('Wed');
                    expect(headers[2].textContent).toBe('Thu');
                    expect(headers[3].textContent).toBe('Fri');
                    expect(headers[4].textContent).toBe('Sat');
                    expect(headers[5].textContent).toBe('Sun');
                    expect(headers[6].textContent).toBe('Mon');

                    const days = element.shadowRoot.querySelectorAll(
                        '[data-element-id="td"]'
                    );
                    const firstDay = new Date(2025, 8, 30).getTime().toString();
                    expect(days[0].dataset.fullDate).toBe(firstDay);

                    const lastDay = new Date(2025, 10, 10).getTime().toString();
                    expect(days[days.length - 1].dataset.fullDate).toBe(
                        lastDay
                    );
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

                const handler = jest.fn();
                element.addEventListener('change', handler);

                return Promise.resolve().then(() => {
                    const days = element.shadowRoot.querySelectorAll(
                        '[data-element-id="span-day-label"]'
                    );
                    const day7 = days[12];
                    day7.click();

                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    const normalizedDate = new Date('05/07/2021');
                    expect(typeof call.detail.value).toBe('string');
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

                const handler = jest.fn();
                element.addEventListener('change', handler);

                return Promise.resolve().then(() => {
                    const days = element.shadowRoot.querySelectorAll(
                        '[data-element-id="span-day-label"]'
                    );
                    const day7 = days[12];
                    day7.click();

                    expect(handler).toHaveBeenCalled();
                    const call = handler.mock.calls[0][0];
                    expect(call.detail.value).toHaveLength(2);
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

                const handler = jest.fn();
                element.addEventListener('change', handler);

                return Promise.resolve().then(() => {
                    const day9 = element.shadowRoot.querySelector(
                        'span[data-date="9"]'
                    );
                    day9.click();
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.value).toMatchObject(
                        []
                    );
                });
            });

            it('Selection-mode: interval', () => {
                element.value = '05/09/2021';
                element.min = new Date('05/01/2021');
                element.max = new Date('05/31/2021');
                element.selectionMode = 'interval';

                const handler = jest.fn();
                element.addEventListener('change', handler);

                return Promise.resolve().then(() => {
                    const day11 = element.shadowRoot.querySelector(
                        'span[data-date="11"]'
                    );
                    day11.click();
                    expect(handler).toHaveBeenCalled();
                    const value = handler.mock.calls[0][0].detail.value;
                    expect(value).toHaveLength(2);
                    value.forEach((val) => {
                        expect(typeof val).toBe('string');
                    });
                    expect(new Date(value[0])).toEqual(new Date('05/09/2021'));
                    expect(new Date(value[1])).toEqual(new Date('05/11/2021'));
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

            describe('Using keyboard', () => {
                it('Previous month - [left]', () => {
                    const handler = jest.fn();
                    element.value = '05/01/2022';
                    element.addEventListener('navigate', handler);

                    return Promise.resolve()
                        .then(() => {
                            const day9 =
                                element.shadowRoot.querySelector(
                                    'td[data-date="1"]'
                                );
                            day9.dispatchEvent(
                                new KeyboardEvent('keydown', {
                                    key: 'ArrowLeft',
                                    bubbles: true
                                })
                            );
                        })
                        .then(() => {
                            expect(handler).toHaveBeenCalled();
                            expect(
                                handler.mock.calls[0][0].bubbles
                            ).toBeFalsy();
                            expect(
                                handler.mock.calls[0][0].composed
                            ).toBeFalsy();
                            expect(
                                handler.mock.calls[0][0].cancelable
                            ).toBeFalsy();
                            const date = handler.mock.calls[0][0].detail.date;
                            expect(new Date(date)).toEqual(
                                new Date('04/01/2022')
                            );
                        });
                });

                it('Next month - [right]', () => {
                    const handler = jest.fn();
                    element.value = '05/31/2022';
                    element.addEventListener('navigate', handler);

                    return Promise.resolve()
                        .then(() => {
                            const day9 =
                                element.shadowRoot.querySelector(
                                    'td[data-date="31"]'
                                );
                            day9.dispatchEvent(
                                new KeyboardEvent('keydown', {
                                    key: 'ArrowRight',
                                    bubbles: true
                                })
                            );
                        })
                        .then(() => {
                            expect(handler).toHaveBeenCalled();
                            expect(
                                handler.mock.calls[0][0].bubbles
                            ).toBeFalsy();
                            expect(
                                handler.mock.calls[0][0].composed
                            ).toBeFalsy();
                            expect(
                                handler.mock.calls[0][0].cancelable
                            ).toBeFalsy();
                            const date = handler.mock.calls[0][0].detail.date;
                            expect(new Date(date)).toEqual(
                                new Date('06/01/2022')
                            );
                        });
                });

                it('Previous month - [up]', () => {
                    const handler = jest.fn();
                    element.value = '05/07/2022';
                    element.addEventListener('navigate', handler);

                    return Promise.resolve()
                        .then(() => {
                            const day9 =
                                element.shadowRoot.querySelector(
                                    'td[data-date="7"]'
                                );
                            day9.dispatchEvent(
                                new KeyboardEvent('keydown', {
                                    key: 'ArrowUp',
                                    bubbles: true
                                })
                            );
                        })
                        .then(() => {
                            expect(handler).toHaveBeenCalled();
                            expect(
                                handler.mock.calls[0][0].bubbles
                            ).toBeFalsy();
                            expect(
                                handler.mock.calls[0][0].composed
                            ).toBeFalsy();
                            expect(
                                handler.mock.calls[0][0].cancelable
                            ).toBeFalsy();
                            const date = handler.mock.calls[0][0].detail.date;
                            expect(new Date(date)).toEqual(
                                new Date('04/01/2022')
                            );
                        });
                });

                it('Next month - [down]', () => {
                    const handler = jest.fn();
                    element.value = '05/28/2022';
                    element.addEventListener('navigate', handler);

                    return Promise.resolve()
                        .then(() => {
                            const day9 =
                                element.shadowRoot.querySelector(
                                    'td[data-date="28"]'
                                );
                            day9.dispatchEvent(
                                new KeyboardEvent('keydown', {
                                    key: 'ArrowDown',
                                    bubbles: true
                                })
                            );
                        })
                        .then(() => {
                            expect(handler).toHaveBeenCalled();
                            expect(
                                handler.mock.calls[0][0].bubbles
                            ).toBeFalsy();
                            expect(
                                handler.mock.calls[0][0].composed
                            ).toBeFalsy();
                            expect(
                                handler.mock.calls[0][0].cancelable
                            ).toBeFalsy();
                            const date = handler.mock.calls[0][0].detail.date;
                            expect(new Date(date)).toEqual(
                                new Date('06/01/2022')
                            );
                        });
                });

                it('Previous month - [home]', () => {
                    const handler = jest.fn();
                    element.value = '06/04/2022';
                    element.addEventListener('navigate', handler);

                    return Promise.resolve()
                        .then(() => {
                            const day9 =
                                element.shadowRoot.querySelector(
                                    'td[data-date="4"]'
                                );
                            day9.dispatchEvent(
                                new KeyboardEvent('keydown', {
                                    key: 'Home',
                                    bubbles: true
                                })
                            );
                        })
                        .then(() => {
                            expect(handler).toHaveBeenCalled();
                            expect(
                                handler.mock.calls[0][0].bubbles
                            ).toBeFalsy();
                            expect(
                                handler.mock.calls[0][0].composed
                            ).toBeFalsy();
                            expect(
                                handler.mock.calls[0][0].cancelable
                            ).toBeFalsy();
                            const date = handler.mock.calls[0][0].detail.date;
                            expect(new Date(date)).toEqual(
                                new Date('05/01/2022')
                            );
                        });
                });

                it('Previous month - [home] - custom week start day', () => {
                    const handler = jest.fn();
                    element.value = new Date(2025, 9, 10);
                    element.weekStartDay = 2;
                    element.addEventListener('navigate', handler);

                    return Promise.resolve()
                        .then(() => {
                            const day9 =
                                element.shadowRoot.querySelector(
                                    'td[data-date="4"]'
                                );
                            day9.dispatchEvent(
                                new KeyboardEvent('keydown', {
                                    key: 'Home',
                                    bubbles: true
                                })
                            );
                        })
                        .then(() => {
                            expect(handler).toHaveBeenCalled();
                            const firstDay = element.shadowRoot.querySelector(
                                '[data-element-id="td"]'
                            );
                            expect(firstDay.dataset.fullDate).toBe(
                                new Date(2025, 7, 26).getTime().toString()
                            );
                        });
                });

                it('Next month - [end]', () => {
                    const handler = jest.fn();
                    element.value = '05/29/2022';
                    element.addEventListener('navigate', handler);

                    return Promise.resolve()
                        .then(() => {
                            const day9 =
                                element.shadowRoot.querySelector(
                                    'td[data-date="29"]'
                                );
                            day9.dispatchEvent(
                                new KeyboardEvent('keydown', {
                                    key: 'End',
                                    bubbles: true
                                })
                            );
                        })
                        .then(() => {
                            expect(handler).toHaveBeenCalled();
                            expect(
                                handler.mock.calls[0][0].bubbles
                            ).toBeFalsy();
                            expect(
                                handler.mock.calls[0][0].composed
                            ).toBeFalsy();
                            expect(
                                handler.mock.calls[0][0].cancelable
                            ).toBeFalsy();
                            const date = handler.mock.calls[0][0].detail.date;
                            expect(new Date(date)).toEqual(
                                new Date('06/01/2022')
                            );
                        });
                });

                it('Next month - [PageDown]', () => {
                    const handler = jest.fn();
                    element.value = '05/29/2022';
                    element.addEventListener('navigate', handler);

                    return Promise.resolve()
                        .then(() => {
                            const day9 =
                                element.shadowRoot.querySelector(
                                    'td[data-date="29"]'
                                );
                            day9.dispatchEvent(
                                new KeyboardEvent('keydown', {
                                    key: 'End',
                                    bubbles: true
                                })
                            );
                        })
                        .then(() => {
                            expect(handler).toHaveBeenCalled();
                            expect(
                                handler.mock.calls[0][0].bubbles
                            ).toBeFalsy();
                            expect(
                                handler.mock.calls[0][0].composed
                            ).toBeFalsy();
                            expect(
                                handler.mock.calls[0][0].cancelable
                            ).toBeFalsy();
                            const date = handler.mock.calls[0][0].detail.date;
                            expect(new Date(date)).toEqual(
                                new Date('06/01/2022')
                            );
                        });
                });

                it('Previous month - [PageUp]', () => {
                    const handler = jest.fn();
                    element.value = '05/29/2022';
                    element.addEventListener('navigate', handler);

                    return Promise.resolve()
                        .then(() => {
                            const day9 =
                                element.shadowRoot.querySelector(
                                    'td[data-date="29"]'
                                );
                            day9.dispatchEvent(
                                new KeyboardEvent('keydown', {
                                    key: 'PageDown',
                                    bubbles: true
                                })
                            );
                        })
                        .then(() => {
                            expect(handler).toHaveBeenCalled();
                            expect(
                                handler.mock.calls[0][0].bubbles
                            ).toBeFalsy();
                            expect(
                                handler.mock.calls[0][0].composed
                            ).toBeFalsy();
                            expect(
                                handler.mock.calls[0][0].cancelable
                            ).toBeFalsy();
                            const date = handler.mock.calls[0][0].detail.date;
                            expect(new Date(date)).toEqual(
                                new Date('04/01/2022')
                            );
                        });
                });
            });
        });
    });
});
