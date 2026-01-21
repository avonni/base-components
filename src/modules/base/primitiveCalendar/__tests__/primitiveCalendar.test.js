import { createElement } from 'lwc';
import PrimitiveCalendar from '../primitiveCalendar';

// not tested : keyboard selecting a date ouside current month, trying to select a disabled date

let element;
describe('Primitive Calendar', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        jest.clearAllTimers();
        window.requestAnimationFrame.mockRestore();
    });

    beforeEach(() => {
        element = createElement('base-primitive-calendar', {
            is: PrimitiveCalendar
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
            expect(element.isMultiCalendars).toBeFalsy();
            expect(element.markedDates).toMatchObject([]);
            expect(element.max).toMatchObject(new Date(2099, 11, 31));
            expect(element.min).toMatchObject(new Date(1900, 0, 1));
            expect(element.selectionMode).toBe('single');
            expect(element.timezone).toBeUndefined();
            expect(element.value).toEqual([]);
            expect(element.weekNumber).toBeFalsy();
            expect(element.weekStartDay).toBe(0);
        });

        describe('dateLabels', () => {
            it('Passed to the component', () => {
                element.displayDate = new Date('05/01/2022');
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
                        'avonni-primitive-calendar__chip-label avonni-primitive-calendar__chip-without-icon'
                    );
                });
            });
        });

        describe('disabled', () => {
            it('Passed to the component', () => {
                element.value = '04/15/2021';
                element.displayDate = new Date('04/01/2021');
                element.disabled = true;
                return Promise.resolve().then(() => {
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
                element.displayDate = new Date('05/09/2021');
                element.disabledDates = new Date('05/06/2021');
                element.min = new Date('05/01/2021');
                element.max = new Date('05/25/2021');

                return Promise.resolve().then(() => {
                    const dates = [];
                    const disabledDates = element.shadowRoot.querySelectorAll(
                        '.avonni-primitive-calendar__disabled-cell'
                    );
                    disabledDates.forEach((date) => {
                        dates.push(date.getAttribute('data-date'));
                    });
                    expect(dates.includes('6')).toBeTruthy();
                });
            });
        });

        describe('isMultiCalendars', () => {
            it('Display only dates of the month', () => {
                element.displayDate = new Date('05/09/2021');
                element.value = '05/09/2021';
                element.isMultiCalendars = true;

                return Promise.resolve().then(() => {
                    const tds = element.shadowRoot.querySelectorAll(
                        '[data-element-id^="span-day-label"]:not([data-is-date-hidden="true"])'
                    );
                    expect(tds.length).toBe(31);
                });
            });
        });

        describe('focusDate', () => {
            it('Passed to the component', () => {
                element.displayDate = new Date(2022, 8, 5);
                element.value = new Date(2022, 8, 5);

                return Promise.resolve().then(() => {
                    const date = new Date(2022, 8, 8);
                    const day8 = element.shadowRoot.querySelector(
                        `td[data-full-date="${date.getTime()}"]`
                    );
                    const spy8 = jest.spyOn(day8, 'focus');

                    element.focusDate(date, true);
                    jest.runAllTimers();

                    expect(spy8).toHaveBeenCalled();
                });
            });
        });

        describe('keyboard accessibility', () => {
            it('[left]', () => {
                element.displayDate = new Date('05/09/2021');
                element.value = '05/09/2021';
                const handler = jest.fn();
                element.addEventListener('keydowndate', handler);

                return Promise.resolve().then(() => {
                    const day8 =
                        element.shadowRoot.querySelector('td[data-date="8"]');

                    jest.runOnlyPendingTimers();
                    const day9 =
                        element.shadowRoot.querySelector('td[data-date="9"]');
                    day9.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'ArrowLeft',
                            bubbles: true
                        })
                    );
                    jest.runOnlyPendingTimers();

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.fullDate).toBe(
                        Number(day9.dataset.fullDate)
                    );
                    expect(handler.mock.calls[0][0].detail.nextDate).toEqual(
                        Number(day8.dataset.fullDate)
                    );
                });
            });

            it('[right]', () => {
                element.value = '05/09/2021';
                element.displayDate = new Date('05/09/2021');
                const handler = jest.fn();
                element.addEventListener('keydowndate', handler);
                return Promise.resolve().then(() => {
                    const day10 =
                        element.shadowRoot.querySelector('td[data-date="10"]');

                    jest.runOnlyPendingTimers();
                    const day9 =
                        element.shadowRoot.querySelector('td[data-date="9"]');
                    day9.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'ArrowRight',
                            bubbles: true
                        })
                    );
                    jest.runOnlyPendingTimers();

                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.fullDate).toBe(
                        Number(day9.dataset.fullDate)
                    );
                    expect(handler.mock.calls[0][0].detail.nextDate).toEqual(
                        Number(day10.dataset.fullDate)
                    );
                });
            });

            it('[up]', () => {
                element.value = '05/09/2021';
                element.displayDate = new Date('05/09/2021');
                const handler = jest.fn();
                element.addEventListener('keydowndate', handler);

                return Promise.resolve().then(() => {
                    const day2 =
                        element.shadowRoot.querySelector('td[data-date="2"]');

                    jest.runOnlyPendingTimers();
                    const day9 =
                        element.shadowRoot.querySelector('td[data-date="9"]');
                    day9.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'ArrowUp',
                            bubbles: true
                        })
                    );
                    jest.runOnlyPendingTimers();
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.fullDate).toBe(
                        Number(day9.dataset.fullDate)
                    );
                    expect(handler.mock.calls[0][0].detail.nextDate).toEqual(
                        Number(day2.dataset.fullDate)
                    );
                });
            });

            it('[down]', () => {
                element.value = '05/09/2021';
                element.displayDate = new Date('05/09/2021');
                const handler = jest.fn();
                element.addEventListener('keydowndate', handler);

                return Promise.resolve().then(() => {
                    const day16 =
                        element.shadowRoot.querySelector('td[data-date="16"]');

                    jest.runOnlyPendingTimers();
                    const day9 =
                        element.shadowRoot.querySelector('td[data-date="9"]');
                    day9.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'ArrowDown',
                            bubbles: true
                        })
                    );
                    jest.runOnlyPendingTimers();
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.fullDate).toBe(
                        Number(day9.dataset.fullDate)
                    );
                    expect(handler.mock.calls[0][0].detail.nextDate).toEqual(
                        Number(day16.dataset.fullDate)
                    );
                });
            });

            it('go to Sunday [home]', () => {
                element.value = '05/10/2022';
                element.displayDate = new Date('05/10/2022');
                const handler = jest.fn();
                element.addEventListener('keydowndate', handler);

                return Promise.resolve().then(() => {
                    const day8 =
                        element.shadowRoot.querySelector('td[data-date="8"]');

                    jest.runAllTimers();
                    const day9 =
                        element.shadowRoot.querySelector('td[data-date="9"]');
                    day9.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'Home',
                            bubbles: true
                        })
                    );
                    jest.runOnlyPendingTimers();
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.fullDate).toBe(
                        Number(day9.dataset.fullDate)
                    );
                    expect(handler.mock.calls[0][0].detail.nextDate).toEqual(
                        Number(day8.dataset.fullDate)
                    );
                });
            });

            it('Calendar: keyboard accessibility - go to Saturday [end]', () => {
                element.value = '05/09/2022';
                element.displayDate = new Date('05/09/2022');
                const handler = jest.fn();
                element.addEventListener('keydowndate', handler);

                return Promise.resolve().then(() => {
                    const day14 =
                        element.shadowRoot.querySelector('td[data-date="14"]');

                    jest.runAllTimers();
                    const day9 =
                        element.shadowRoot.querySelector('td[data-date="9"]');
                    day9.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'End',
                            bubbles: true
                        })
                    );
                    jest.runAllTimers();
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.fullDate).toBe(
                        Number(day9.dataset.fullDate)
                    );
                    expect(handler.mock.calls[0][0].detail.nextDate).toEqual(
                        Number(day14.dataset.fullDate)
                    );
                });
            });

            it('Month down [PageDown]', () => {
                element.value = '05/09/2022';
                element.displayDate = new Date('05/09/2022');
                const handler = jest.fn();
                element.addEventListener('keydowndate', handler);

                return Promise.resolve().then(() => {
                    const day9 =
                        element.shadowRoot.querySelector('td[data-date="9"]');
                    day9.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'PageDown',
                            bubbles: true
                        })
                    );
                    jest.runAllTimers();
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.fullDate).toBe(
                        Number(day9.dataset.fullDate)
                    );
                    expect(handler.mock.calls[0][0].detail.nextDate).toEqual(
                        new Date('04/09/2022').getTime()
                    );
                });
            });

            it('Month up [PageUp]', () => {
                element.value = '05/09/2022';
                element.displayDate = new Date('05/09/2022');
                const handler = jest.fn();
                element.addEventListener('keydowndate', handler);

                return Promise.resolve().then(() => {
                    const day9 =
                        element.shadowRoot.querySelector('td[data-date="9"]');
                    day9.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'PageUp',
                            bubbles: true
                        })
                    );
                    jest.runAllTimers();
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.fullDate).toBe(
                        Number(day9.dataset.fullDate)
                    );
                    expect(handler.mock.calls[0][0].detail.nextDate).toEqual(
                        new Date('06/09/2022').getTime()
                    );
                });
            });

            it('Year up [alt + PageDown]', () => {
                element.value = '05/09/2022';
                element.displayDate = new Date('05/09/2022');
                const handler = jest.fn();
                element.addEventListener('keydowndate', handler);

                return Promise.resolve().then(() => {
                    const day9 =
                        element.shadowRoot.querySelector('td[data-date="9"]');
                    day9.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'PageDown',
                            altKey: true,
                            bubbles: true
                        })
                    );
                    jest.runAllTimers();
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.fullDate).toBe(
                        Number(day9.dataset.fullDate)
                    );
                    expect(handler.mock.calls[0][0].detail.nextDate).toEqual(
                        new Date('05/09/2023').getTime()
                    );
                });
            });

            it('Year down [alt + PageUp]', () => {
                element.value = '05/09/2022';
                element.displayDate = new Date('05/09/2022');
                const handler = jest.fn();
                element.addEventListener('keydowndate', handler);

                return Promise.resolve().then(() => {
                    const day9 =
                        element.shadowRoot.querySelector('td[data-date="9"]');
                    day9.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'PageUp',
                            altKey: true,
                            bubbles: true
                        })
                    );
                    jest.runAllTimers();
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].detail.fullDate).toBe(
                        Number(day9.dataset.fullDate)
                    );
                    expect(handler.mock.calls[0][0].detail.nextDate).toEqual(
                        new Date('05/09/2021').getTime()
                    );
                });
            });

            it('[enter], [Spacebar], [ ]', () => {
                element.displayDate = new Date('05/09/2021');
                element.value = '05/09/2021';
                const handlerDateKey = jest.fn();
                const handlerSelectDate = jest.fn();
                element.addEventListener('keydowndate', handlerDateKey);
                element.addEventListener('selectdate', handlerSelectDate);

                return Promise.resolve().then(() => {
                    const day9 =
                        element.shadowRoot.querySelector('td[data-date="9"]');
                    day9.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'Enter',
                            bubbles: true
                        })
                    );
                    day9.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: ' ',
                            bubbles: true
                        })
                    );
                    day9.dispatchEvent(
                        new KeyboardEvent('keydown', {
                            key: 'Spacebar',
                            bubbles: true
                        })
                    );
                    jest.runOnlyPendingTimers();
                    expect(handlerDateKey).not.toHaveBeenCalled();
                    expect(handlerSelectDate).toHaveBeenCalledTimes(3);
                    handlerSelectDate.mock.calls.forEach((call) => {
                        expect(call[0].detail.fullDate).toEqual(
                            Number(day9.dataset.fullDate)
                        );
                    });
                });
            });
        });

        describe('marked dates', () => {
            it('Passed to the component', () => {
                element.value = '05/09/2021';
                element.displayDate = new Date('05/09/2021');
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
                element.displayDate = new Date('05/09/2021');
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
                element.displayDate = new Date('05/09/2021');
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
                element.displayDate = new Date('05/16/2021');
                element.min = new Date('05/15/2021');
                element.max = new Date('05/23/2021');
                element.selectionMode = 'single';
                const handler = jest.fn();
                element.addEventListener('selectdate', handler);

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
                    expect(handler).toHaveBeenCalledTimes(3);
                    const day14Call = handler.mock.calls[0][0];
                    const day18Call = handler.mock.calls[1][0];
                    const day24Call = handler.mock.calls[2][0];
                    expect(day14Call.detail.fullDate).toEqual(
                        Number(day14.dataset.fullDate)
                    );
                    expect(day14Call.detail.bounds).not.toBeUndefined();
                    expect(day14Call.detail.disabled).toEqual(true);
                    expect(day18Call.detail.fullDate).toEqual(
                        Number(day18.dataset.fullDate)
                    );
                    expect(day18Call.detail.bounds).not.toBeUndefined();
                    expect(day18Call.detail.disabled).toEqual(false);
                    expect(day24Call.detail.fullDate).toEqual(
                        Number(day24.dataset.fullDate)
                    );
                    expect(day24Call.detail.bounds).not.toBeUndefined();
                    expect(day24Call.detail.disabled).toEqual(true);
                });
            });
        });

        describe('values', () => {
            it('Selection-mode: single', () => {
                element.selectionMode = 'single';
                element.value = '04/15/2021';
                element.displayDate = new Date('04/15/2021');
                return Promise.resolve().then(() => {
                    const selected =
                        element.shadowRoot.querySelector('.slds-is-selected');
                    const selectedDayLabel = selected.querySelector(
                        '[data-element-id="span-day-label"]'
                    );
                    expect(selectedDayLabel.textContent).toBe('15');
                });
            });

            it('value multiple', () => {
                element.selectionMode = 'multiple';
                element.min = new Date('01/01/2020');
                element.max = new Date('12/31/2030');
                element.value = '05/06/2022';
                element.displayDate = new Date('05/06/2022');
                return Promise.resolve().then(() => {
                    const selected =
                        element.shadowRoot.querySelector('.slds-is-selected');
                    const selectedDayLabel = selected.querySelector(
                        '[data-element-id="span-day-label"]'
                    );
                    expect(selectedDayLabel.textContent).toBe('6');
                });
            });

            it('value with interval', () => {
                element.selectionMode = 'interval';
                element.min = new Date('01/01/2020');
                element.max = new Date('12/31/2021');
                element.value = ['01/01/2020', '01/10/2020'];
                element.displayDate = new Date('01/01/2020');

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
                });
            });
        });

        describe('week number', () => {
            it('Passed to the component', () => {
                element.value = '05/09/2021';
                element.min = new Date('05/01/2021');
                element.max = new Date('05/31/2021');
                element.weekNumber = true;
                element.displayDate = new Date('05/09/2021');

                return Promise.resolve().then(() => {
                    const weekNumbers = [];
                    const weeks = element.shadowRoot.querySelectorAll(
                        '.avonni-primitive-calendar__week-cell'
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
                element.value = new Date(2025, 9, 10);
                element.displayDate = new Date(2025, 9, 1);

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
    });

    describe('Events', () => {
        describe('datefocus', () => {
            it('dispatched when focused', () => {
                element.displayDate = new Date('05/01/2022');
                element.value = '05/01/2022';
                element.selectionMode = 'interval';
                const handler = jest.fn();
                element.addEventListener('datefocus', handler);

                return Promise.resolve().then(() => {
                    const td = element.shadowRoot.querySelector(
                        '[data-element-id="td"]'
                    );
                    td.dispatchEvent(new CustomEvent('focus'));
                    expect(handler).toHaveBeenCalledTimes(1);
                    expect(handler.mock.calls[0][0].detail.fullDate).toEqual(
                        td.dataset.fullDate
                    );
                });
            });
        });

        describe('mouseoutdate', () => {
            it('dispatched when mouse out', () => {
                element.displayDate = new Date('05/01/2022');
                element.value = ['05/01/2022'];
                element.selectionMode = 'interval';
                const handler = jest.fn();
                element.addEventListener('mouseoutdate', handler);

                return Promise.resolve().then(() => {
                    const td = element.shadowRoot.querySelector(
                        '[data-element-id="td"]'
                    );
                    td.dispatchEvent(new CustomEvent('mouseout'));
                    expect(handler).toHaveBeenCalled();
                });
            });
        });

        describe('mouseoverdate', () => {
            it('dispatched when mouse over', () => {
                element.displayDate = new Date('05/01/2022');
                element.value = '05/01/2022';
                element.selectionMode = 'interval';
                const handler = jest.fn();
                element.addEventListener('mouseoverdate', handler);

                return Promise.resolve().then(() => {
                    const td = element.shadowRoot.querySelector(
                        '[data-element-id="td"][data-date="1"]'
                    );
                    td.dispatchEvent(new CustomEvent('mouseover'));
                    expect(handler).toHaveBeenCalledTimes(1);
                    expect(handler.mock.calls[0][0].detail.day).toEqual(
                        Number(td.dataset.fullDate)
                    );
                });
            });
            it('not dispatched when mouse over on disabled', () => {
                element.displayDate = new Date('05/01/2022');
                element.value = '05/01/2022';
                element.selectionMode = 'interval';
                element.isMultiCalendars = true;
                const june1 = new Date('06/01/2022');
                const june1FullDate = june1.getTime().toString();
                const mouseOverDateHandler = jest.fn();
                const mouseOutDateHandler = jest.fn();
                element.addEventListener('mouseoverdate', mouseOverDateHandler);
                element.addEventListener('mouseoutdate', mouseOutDateHandler);

                return Promise.resolve().then(() => {
                    const td = element.shadowRoot.querySelector(
                        `[data-element-id="td"][data-full-date="${june1FullDate}"]`
                    );
                    td.dispatchEvent(new CustomEvent('mouseover'));
                    expect(mouseOverDateHandler).toHaveBeenCalledTimes(0);
                    expect(mouseOutDateHandler).toHaveBeenCalledTimes(1);
                });
            });
        });

        describe('private blur', () => {
            it('dispatched when blured', () => {
                element.displayDate = new Date('05/01/2022');
                element.value = '05/01/2022';
                element.selectionMode = 'interval';
                const handler = jest.fn();
                element.addEventListener('privateblur', handler);

                return Promise.resolve().then(() => {
                    const td = element.shadowRoot.querySelector(
                        '[data-element-id="td"]'
                    );
                    td.dispatchEvent(new CustomEvent('blur'));
                    expect(handler).toHaveBeenCalled();
                    expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
                    expect(handler.mock.calls[0][0].composed).toBeTruthy();
                    expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
                });
            });
        });
    });

    describe('Methods', () => {
        describe('mouseoverdate & mouseoutdate', () => {
            it('date after selected, single value', () => {
                element.displayDate = new Date('05/01/2022');
                element.value = '05/01/2022';
                element.selectionMode = 'interval';
                const day31 = new Date('05/31/2022');
                const day31FullDate = day31.getTime().toString();

                return Promise.resolve()
                    .then(() => {
                        element.mouseOverDate(day31FullDate);
                    })
                    .then(() => {
                        const cellBorderTopBottom =
                            element.shadowRoot.querySelectorAll(
                                '.avonni-primitive-calendar__cell_bordered-top_bottom'
                            );
                        expect(cellBorderTopBottom.length).toBe(31);
                        const cellBorderLeft =
                            element.shadowRoot.querySelectorAll(
                                '.avonni-primitive-calendar__cell_bordered-left'
                            );
                        expect(cellBorderLeft.length).toBe(0);
                        const cellBorderRight =
                            element.shadowRoot.querySelectorAll(
                                '.avonni-primitive-calendar__cell_bordered-right'
                            );
                        expect(cellBorderRight.length).toBe(1);
                        expect(cellBorderRight[0].dataset.fullDate).toBe(
                            day31FullDate
                        );
                        element.mouseOutDate();
                    })
                    .then(() => {
                        const borderedCells = element.shadowRoot
                            .querySelectorAll(`
                        .avonni-primitive-calendar__cell_bordered-top_bottom,
                        .avonni-primitive-calendar__cell_bordered-left,
                        .avonni-primitive-calendar__cell_bordered-right
                    `);

                        expect(borderedCells.length).toBe(0);
                    });
            });

            it('date before selected, single value', () => {
                element.displayDate = new Date('05/01/2022');
                element.value = '05/31/2022';
                element.selectionMode = 'interval';
                const day1 = new Date('05/01/2022');
                const day1FullDate = day1.getTime().toString();

                return Promise.resolve()
                    .then(() => {
                        element.mouseOverDate(day1FullDate);
                    })
                    .then(() => {
                        const cellBorderTopBottom =
                            element.shadowRoot.querySelectorAll(
                                '.avonni-primitive-calendar__cell_bordered-top_bottom'
                            );
                        expect(cellBorderTopBottom.length).toBe(31);
                        const cellBorderRight =
                            element.shadowRoot.querySelectorAll(
                                '.avonni-primitive-calendar__cell_bordered-right'
                            );
                        expect(cellBorderRight.length).toBe(0);
                        const cellBorderLeft =
                            element.shadowRoot.querySelectorAll(
                                '.avonni-primitive-calendar__cell_bordered-left'
                            );
                        expect(cellBorderLeft.length).toBe(1);
                        expect(cellBorderLeft[0].dataset.fullDate).toBe(
                            day1FullDate
                        );
                        element.mouseOutDate();
                    })
                    .then(() => {
                        const borderedCells = element.shadowRoot
                            .querySelectorAll(`
                        .avonni-primitive-calendar__cell_bordered-top_bottom,
                        .avonni-primitive-calendar__cell_bordered-left,
                        .avonni-primitive-calendar__cell_bordered-right
                    `);

                        expect(borderedCells.length).toBe(0);
                    });
            });

            it('date after selected, two values', () => {
                element.displayDate = new Date('05/01/2022');
                element.value = ['05/10/2022', '05/22/2022'];
                element.selectionMode = 'interval';
                const day31 = new Date('05/31/2022');
                const day31FullDate = day31.getTime().toString();

                return Promise.resolve()
                    .then(() => {
                        element.mouseOverDate(day31FullDate);
                    })
                    .then(() => {
                        const cellBorderTopBottom =
                            element.shadowRoot.querySelectorAll(
                                '.avonni-primitive-calendar__cell_bordered-top_bottom'
                            );
                        expect(cellBorderTopBottom.length).toBe(10);
                        cellBorderTopBottom.forEach((td, index) => {
                            expect(td.dataset.date).toBe(String(index + 22));
                        });
                        const cellBorderLeft =
                            element.shadowRoot.querySelectorAll(
                                '.avonni-primitive-calendar__cell_bordered-left'
                            );
                        expect(cellBorderLeft.length).toBe(0);
                        const cellBorderRight =
                            element.shadowRoot.querySelectorAll(
                                '.avonni-primitive-calendar__cell_bordered-right'
                            );
                        expect(cellBorderRight.length).toBe(1);
                        expect(cellBorderRight[0].dataset.fullDate).toBe(
                            day31FullDate
                        );
                        element.mouseOutDate();
                    })
                    .then(() => {
                        const borderedCells = element.shadowRoot
                            .querySelectorAll(`
                        .avonni-primitive-calendar__cell_bordered-top_bottom,
                        .avonni-primitive-calendar__cell_bordered-left,
                        .avonni-primitive-calendar__cell_bordered-right
                    `);

                        expect(borderedCells.length).toBe(0);
                    });
            });

            it('date before selected, two values', () => {
                element.displayDate = new Date('05/01/2022');
                element.value = ['05/10/2022', '05/22/2022'];
                element.selectionMode = 'interval';
                const day1 = new Date('05/01/2022');
                const day1FullDate = day1.getTime().toString();

                return Promise.resolve()
                    .then(() => {
                        element.mouseOverDate(day1FullDate);
                    })
                    .then(() => {
                        const cellBorderTopBottom =
                            element.shadowRoot.querySelectorAll(
                                '.avonni-primitive-calendar__cell_bordered-top_bottom'
                            );
                        expect(cellBorderTopBottom.length).toBe(10);
                        cellBorderTopBottom.forEach((td, index) => {
                            expect(td.dataset.date).toBe(String(1 + index));
                        });

                        const cellBorderRight =
                            element.shadowRoot.querySelectorAll(
                                '.avonni-primitive-calendar__cell_bordered-right'
                            );
                        expect(cellBorderRight.length).toBe(0);
                        const cellBorderLeft =
                            element.shadowRoot.querySelectorAll(
                                '.avonni-primitive-calendar__cell_bordered-left'
                            );
                        expect(cellBorderLeft.length).toBe(1);
                        expect(cellBorderLeft[0].dataset.fullDate).toBe(
                            day1FullDate
                        );
                        element.mouseOutDate();
                    })
                    .then(() => {
                        const borderedCells = element.shadowRoot
                            .querySelectorAll(`
                        .avonni-primitive-calendar__cell_bordered-top_bottom,
                        .avonni-primitive-calendar__cell_bordered-left,
                        .avonni-primitive-calendar__cell_bordered-right
                    `);

                        expect(borderedCells.length).toBe(0);
                    });
            });
        });
    });
});
