import { createElement } from 'lwc';
import PrimitiveCalendar from '../primitiveCalendar';

// not tested : mouse over, mouse out events on calendar, keyboard selecting a date ouside current month, trying to select a disabled date, previous month and next month buttons

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
                element.value = new Date('05/14/2022');
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
                element.value = new Date('04/15/2021');
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
                element.value = new Date('05/09/2021');
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
                element.value = new Date('05/09/2021');
                const handler = jest.fn();
                element.addEventListener('selectdatekey', handler);

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
                        new Date(Number(day8.dataset.fullDate))
                    );
                });
            });

            it('[right]', () => {
                element.value = new Date('05/09/2021');
                element.displayDate = new Date('05/09/2021');
                const handler = jest.fn();
                element.addEventListener('selectdatekey', handler);
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
                        new Date(Number(day10.dataset.fullDate))
                    );
                });
            });

            it('[up]', () => {
                element.value = new Date('05/09/2021');
                element.displayDate = new Date('05/09/2021');
                const handler = jest.fn();
                element.addEventListener('selectdatekey', handler);

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
                        new Date(Number(day2.dataset.fullDate))
                    );
                });
            });

            it('[down]', () => {
                element.value = new Date('05/09/2021');
                element.displayDate = new Date('05/09/2021');
                const handler = jest.fn();
                element.addEventListener('selectdatekey', handler);

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
                        new Date(Number(day16.dataset.fullDate))
                    );
                });
            });

            it('go to Sunday [home]', () => {
                element.value = new Date('05/10/2022');
                element.displayDate = new Date('05/10/2022');
                const handler = jest.fn();
                element.addEventListener('selectdatekey', handler);

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
                        new Date(Number(day8.dataset.fullDate))
                    );
                });
            });

            it('Calendar: keyboard accessibility - go to Saturday [end]', () => {
                element.value = new Date('05/09/2022');
                element.displayDate = new Date('05/09/2022');
                const handler = jest.fn();
                element.addEventListener('selectdatekey', handler);

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
                        new Date(Number(day14.dataset.fullDate))
                    );
                });
            });

            it('Month down [PageDown]', () => {
                element.value = new Date('05/09/2022');
                element.displayDate = new Date('05/09/2022');
                const handler = jest.fn();
                element.addEventListener('selectdatekey', handler);

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
                        new Date('04/09/2022')
                    );
                });
            });

            it('Month up [PageUp]', () => {
                element.value = new Date('05/09/2022');
                element.displayDate = new Date('05/09/2022');
                const handler = jest.fn();
                element.addEventListener('selectdatekey', handler);

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
                        new Date('06/09/2022')
                    );
                });
            });

            it('Year up [alt + PageDown]', () => {
                element.value = new Date('05/09/2022');
                element.displayDate = new Date('05/09/2022');
                const handler = jest.fn();
                element.addEventListener('selectdatekey', handler);

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
                        new Date('05/09/2023')
                    );
                });
            });

            it('Year down [alt + PageUp]', () => {
                element.value = new Date('05/09/2022');
                element.displayDate = new Date('05/09/2022');
                const handler = jest.fn();
                element.addEventListener('selectdatekey', handler);

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
                        new Date('05/09/2021')
                    );
                });
            });
        });

        describe('marked dates', () => {
            it('Passed to the component', () => {
                element.value = new Date('05/09/2021');
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
                element.value = new Date('05/09/2021');
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
                element.value = new Date('05/09/2021');
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
                        day14.dataset.fullDate
                    );
                    expect(day14Call.detail.disabled).toEqual(true);
                    expect(day18Call.detail.fullDate).toEqual(
                        day18.dataset.fullDate
                    );
                    expect(day18Call.detail.disabled).toEqual(false);
                    expect(day24Call.detail.fullDate).toEqual(
                        day24.dataset.fullDate
                    );
                    expect(day24Call.detail.disabled).toEqual(true);
                });
            });
        });

        describe('timezone', () => {
            it('Passed to the component', () => {
                element.value = new Date('2021-05-18T20:00:00.000Z');
                element.min = new Date('2021-05-15T18:00:00.000Z');
                element.max = new Date('2021-05-23T04:00:00.000Z');
                element.selectionMode = 'single';
                // UTC+11
                element.timezone = 'Pacific/Noumea';
                element.displayDate = new Date('2021-05-18T20:00:00.000Z');

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

        // describe('values', () => {
        //     it('Selection-mode: single', () => {
        //         element.selectionMode = 'single';
        //         element.value = new Date('04/15/2021');
        //         element.displayDate = new Date('04/15/2021');
        //         return Promise.resolve().then(() => {
        //             const selected =
        //                 element.shadowRoot.querySelector('.slds-is-selected');
        //             const selectedDayLabel = selected.querySelector(
        //                 '[data-element-id="span-day-label"]'
        //             );
        //             expect(selectedDayLabel.textContent).toBe('15');
        //         });
        //     });

        //     it('Current day bigger than upper bound should re-center calendar to max value', () => {
        //         element.selectionMode = 'single';
        //         element.min = new Date('01/01/2020');
        //         element.max = new Date('12/31/2030');
        //         element.value = new Date('11/11/2040');
        //         return Promise.resolve().then(() => {
        //             const day =
        //                 element.shadowRoot.querySelector('.slds-is-selected');
        //             expect(day).toBeNull();
        //         });
        //     });
        //     it('Current day smaller than lower bound should change to min value', () => {
        //         element.selectionMode = 'single';
        //         element.min = new Date('01/01/2020');
        //         element.max = new Date('12/31/2030');
        //         element.value = new Date('04/04/100');
        //         return Promise.resolve().then(() => {
        //             const day =
        //                 element.shadowRoot.querySelector('.slds-is-selected');
        //             expect(day).toBeNull();
        //         });
        //     });

        //     it('Invalid calendar current day should change to current date if it is in min-max interval', () => {
        //         element.selectionMode = 'single';
        //         element.min = new Date('01/01/2020');
        //         element.max = new Date('12/31/2030');
        //         element.value = new Date('00/00/2022');

        //         return Promise.resolve().then(() => {
        //             const day =
        //                 element.shadowRoot.querySelector('.slds-is-selected');
        //             expect(day).toBeNull();
        //         });
        //     });

        //     it('only dates in range should be selected', () => {
        //         element.selectionMode = 'multiple';
        //         element.min = new Date('01/01/2020');
        //         element.max = new Date('12/31/2030');
        //         element.value = [
        //             new Date('01/02/1000'),
        //             new Date('03/04/1032'),
        //             new Date('05/06/2022'),
        //             new Date('07/08/2300'),
        //             new Date('09/10/2444')
        //         ];
        //         element.displayDate = new Date('05/06/2022');
        //         return Promise.resolve().then(() => {
        //             const selected =
        //                 element.shadowRoot.querySelector('.slds-is-selected');
        //             const selectedDayLabel = selected.querySelector(
        //                 '[data-element-id="span-day-label"]'
        //             );
        //             expect(selectedDayLabel.textContent).toBe('6');
        //         });
        //     });

        //     it('value validation with value below min', () => {
        //         element.selectionMode = 'interval';
        //         element.min = new Date('01/01/2020');
        //         element.max = new Date('12/31/2021');
        //         element.value = [new Date('02/11/1000'), new Date('01/10/2020')];
        //         element.displayDate = new Date('01/01/2020');

        //         return Promise.resolve().then(() => {
        //             const days =
        //                 element.shadowRoot.querySelectorAll(
        //                     '.slds-is-selected'
        //                 );
        //             expect(days.length).toBe(10);
        //             for (let i = 0; i < days.length; ++i) {
        //                 const dayLabel = days[i].querySelector(
        //                     '[data-element-id="span-day-label"]'
        //                 );
        //                 expect(dayLabel.textContent).toBe((i + 1).toString());
        //             }
        //         });
        //     });

        //     it('value validation with value higher than max', () => {
        //         element.selectionMode = 'interval';
        //         element.min = new Date('01/01/2020');
        //         element.max = new Date('12/31/2021');
        //         element.value = [new Date('12/29/2021'), new Date('01/10/2025')];

        //         return Promise.resolve().then(() => {
        //             const days =
        //                 element.shadowRoot.querySelectorAll(
        //                     '.slds-is-selected'
        //                 );
        //             expect(days.length).toBe(3);
        //             for (let i = 0; i < days.length; ++i) {
        //                 const dayLabel = days[i].querySelector(
        //                     '[data-element-id="span-day-label"]'
        //                 );
        //                 expect(dayLabel.textContent).toBe((i + 29).toString());
        //             }
        //             const month = element.shadowRoot.querySelector(
        //                 '[data-element-id="h2"]'
        //             );
        //             expect(month.textContent).toBe('December');
        //             const year2021 = element.shadowRoot.querySelector(
        //                 '[data-element-id="option-year"][value="2021"]'
        //             );
        //             expect(year2021.selected).toBeTruthy();
        //         });
        //     });

        //     it('invalid values (before min)', () => {
        //         element.selectionMode = 'interval';
        //         element.min = new Date('01/01/2020');
        //         element.max = new Date('12/31/2021');
        //         element.value = ['12/29/1000', '01/10/2000'];

        //         return Promise.resolve().then(() => {
        //             const days =
        //                 element.shadowRoot.querySelector('.slds-is-selected');
        //             expect(days).toBeNull();
        //             const month = element.shadowRoot.querySelector(
        //                 '[data-element-id="h2"]'
        //             );
        //             expect(month.textContent).toBe('January');
        //             const year2020 = element.shadowRoot.querySelector(
        //                 '[data-element-id="option-year"][value="2020"]'
        //             );
        //             expect(year2020.selected).toBeTruthy();
        //         });
        //     });

        //     it('invalid values (after max)', () => {
        //         element.selectionMode = 'interval';
        //         element.min = new Date('01/01/2020');
        //         element.max = new Date('12/31/2021');
        //         element.value = ['12/29/2022', '01/10/2024'];

        //         return Promise.resolve().then(() => {
        //             const days =
        //                 element.shadowRoot.querySelector('.slds-is-selected');
        //             expect(days).toBeNull();
        //             const month = element.shadowRoot.querySelector(
        //                 '[data-element-id="h2"]'
        //             );
        //             expect(month.textContent).toBe('January');
        //             const year2020 = element.shadowRoot.querySelector(
        //                 '[data-element-id="option-year"][value="2020"]'
        //             );
        //             expect(year2020.selected).toBeTruthy();
        //         });
        //     });

        //     it('values before min and after max', () => {
        //         element.selectionMode = 'interval';
        //         element.min = new Date('01/01/2020');
        //         element.max = new Date('01/31/2020');
        //         element.value = ['12/29/1000', '01/10/2025'];

        //         return Promise.resolve().then(() => {
        //             const days =
        //                 element.shadowRoot.querySelectorAll(
        //                     '.slds-is-selected'
        //                 );
        //             expect(days.length).toBe(31);
        //             for (let i = 0; i < days.length; ++i) {
        //                 const dayLabel = days[i].querySelector(
        //                     '[data-element-id="span-day-label"]'
        //                 );
        //                 expect(dayLabel.textContent).toBe((i + 1).toString());
        //             }
        //             const month = element.shadowRoot.querySelector(
        //                 '[data-element-id="h2"]'
        //             );
        //             expect(month.textContent).toBe('January');
        //             const year2020 = element.shadowRoot.querySelector(
        //                 '[data-element-id="option-year"][value="2020"]'
        //             );
        //             expect(year2020.selected).toBeTruthy();
        //         });
        //     });

        //     it('two valid values selected', () => {
        //         element.selectionMode = 'interval';
        //         element.min = new Date('01/01/2020');
        //         element.max = new Date('12/31/2025');
        //         element.value = ['04/22/2022', '04/02/2022'];

        //         return Promise.resolve().then(() => {
        //             const days =
        //                 element.shadowRoot.querySelectorAll(
        //                     '.slds-is-selected'
        //                 );
        //             expect(days.length).toBe(21);
        //             for (let i = 0; i < days.length; ++i) {
        //                 const dayLabel = days[i].querySelector(
        //                     '[data-element-id="span-day-label"]'
        //                 );
        //                 expect(dayLabel.textContent).toBe((i + 2).toString());
        //             }
        //             const month = element.shadowRoot.querySelector(
        //                 '[data-element-id="h2"]'
        //             );
        //             expect(month.textContent).toBe('April');
        //             const year2022 = element.shadowRoot.querySelector(
        //                 '[data-element-id="option-year"][value="2022"]'
        //             );
        //             expect(year2022.selected).toBeTruthy();
        //         });
        //     });

        //     it('single no value', () => {
        //         element.value = '05/15/2021';
        //         element.min = new Date('05/01/2021');
        //         element.max = new Date('05/31/2021');
        //         element.selectionMode = 'single';
        //         return Promise.resolve().then(() => {
        //             const day14 = element.shadowRoot.querySelector(
        //                 'span[data-date="14"]'
        //             );
        //             day14.click();
        //             expect(new Date(element.value)).toEqual(
        //                 new Date('05/14/2021')
        //             );
        //         });
        //     });

        //     it('single same value', () => {
        //         element.value = '05/14/2021';
        //         element.min = new Date('05/01/2021');
        //         element.max = new Date('05/31/2021');
        //         return Promise.resolve().then(() => {
        //             const day14 = element.shadowRoot.querySelector(
        //                 'span[data-date="14"]'
        //             );
        //             day14.click();
        //             expect(element.value).toBeNull();
        //         });
        //     });

        //     it('multiple', () => {
        //         element.value = ['04/15/2021', '04/16/2021', '04/17/2021'];
        //         element.selectionMode = 'multiple';
        //         return Promise.resolve().then(() => {
        //             const days =
        //                 element.shadowRoot.querySelectorAll(
        //                     '.slds-is-selected'
        //                 );
        //             const dates = [];
        //             days.forEach((day) => {
        //                 const dayLabel = day.querySelector(
        //                     '[data-element-id="span-day-label"]'
        //                 );
        //                 dates.push(dayLabel.textContent);
        //             });

        //             expect(dates.includes('15')).toBeTruthy();
        //             expect(dates.includes('16')).toBeTruthy();
        //             expect(dates.includes('17')).toBeTruthy();

        //             const month = element.shadowRoot.querySelector(
        //                 '[data-element-id="h2"]'
        //             );
        //             expect(month.textContent).toBe('April');
        //             const year2021 = element.shadowRoot.querySelector(
        //                 '[data-element-id="option-year"][value="2021"]'
        //             );
        //             expect(year2021.selected).toBeTruthy();
        //         });
        //     });

        //     it('multiple no value', () => {
        //         element.value = '05/15/2021';
        //         element.min = new Date('05/01/2021');
        //         element.max = new Date('05/31/2021');
        //         element.selectionMode = 'multiple';
        //         return Promise.resolve().then(() => {
        //             const day14 = element.shadowRoot.querySelector(
        //                 'span[data-date="14"]'
        //             );
        //             day14.click();
        //             expect(element.value).toHaveLength(2);
        //             expect(new Date(element.value[0])).toEqual(
        //                 new Date('05/15/2021')
        //             );
        //             expect(new Date(element.value[1])).toEqual(
        //                 new Date('05/14/2021')
        //             );
        //         });
        //     });

        //     it('interval no value', () => {
        //         element.value = '05/14/2021';
        //         element.min = new Date('05/01/2021');
        //         element.max = new Date('05/31/2021');
        //         element.selectionMode = 'interval';
        //         return Promise.resolve().then(() => {
        //             const day14 = element.shadowRoot.querySelector(
        //                 'span[data-date="14"]'
        //             );
        //             day14.click();
        //             expect(element.value).toEqual([]);
        //             day14.click();
        //             expect(new Date(element.value)).toEqual(
        //                 new Date('05/14/2021')
        //             );
        //         });
        //     });

        //     it('interval newDate < startDate', () => {
        //         element.value = '05/15/2021';
        //         element.min = new Date('05/01/2021');
        //         element.max = new Date('05/31/2021');
        //         element.selectionMode = 'interval';
        //         return Promise.resolve().then(() => {
        //             const day14 = element.shadowRoot.querySelector(
        //                 'span[data-date="14"]'
        //             );
        //             day14.click();
        //             expect(element.value).toHaveLength(2);
        //             expect(new Date(element.value[0])).toEqual(
        //                 new Date('05/14/2021')
        //             );
        //             expect(new Date(element.value[1])).toEqual(
        //                 new Date('05/15/2021')
        //             );
        //         });
        //     });

        //     it('interval newDate > startDate', () => {
        //         element.value = '05/15/2021';
        //         element.min = new Date('05/01/2021');
        //         element.max = new Date('05/31/2021');
        //         element.selectionMode = 'interval';
        //         return Promise.resolve().then(() => {
        //             const day17 = element.shadowRoot.querySelector(
        //                 'span[data-date="17"]'
        //             );
        //             day17.click();
        //             expect(element.value).toHaveLength(2);
        //             expect(new Date(element.value[0])).toEqual(
        //                 new Date('05/15/2021')
        //             );
        //             expect(new Date(element.value[1])).toEqual(
        //                 new Date('05/17/2021')
        //             );
        //         });
        //     });

        //     it('interval newDate < endDate', () => {
        //         element.value = ['05/15/2021', '05/16/2021'];
        //         element.min = new Date('05/01/2021');
        //         element.max = new Date('05/31/2021');
        //         element.selectionMode = 'interval';
        //         return Promise.resolve().then(() => {
        //             const day17 = element.shadowRoot.querySelector(
        //                 'span[data-date="17"]'
        //             );
        //             day17.click();
        //             expect(element.value).toHaveLength(2);
        //             expect(new Date(element.value[0])).toEqual(
        //                 new Date('05/15/2021')
        //             );
        //             expect(new Date(element.value[1])).toEqual(
        //                 new Date('05/17/2021')
        //             );
        //         });
        //     });

        //     it('interval newDate < startDate < endDate', () => {
        //         element.value = ['05/15/2021', '05/16/2021'];
        //         element.min = new Date('05/01/2021');
        //         element.max = new Date('05/31/2021');
        //         element.selectionMode = 'interval';
        //         return Promise.resolve().then(() => {
        //             const day14 = element.shadowRoot.querySelector(
        //                 'span[data-date="14"]'
        //             );
        //             day14.click();
        //             expect(element.value).toHaveLength(2);
        //             expect(new Date(element.value[0])).toEqual(
        //                 new Date('05/14/2021')
        //             );
        //             expect(new Date(element.value[1])).toEqual(
        //                 new Date('05/16/2021')
        //             );
        //         });
        //     });
        // });

        describe('week number', () => {
            it('Passed to the component', () => {
                element.value = new Date('05/09/2021');
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

    describe('Events', () => {});
});
