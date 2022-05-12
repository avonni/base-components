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
import Calendar from 'c/calendar';

// not tested : mouse over, mouse out events on calendar

let element;
describe('Calendar', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
        window.requestAnimationFrame.mockRestore();
        jest.clearAllTimers();
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

    it('Calendar: default attributes', () => {
        element = createElement('base-calendar', {
            is: Calendar
        });

        expect(element.dateLabels).toMatchObject([]);
        expect(element.disabled).toBeFalsy();
        expect(element.disabledDates).toMatchObject([]);
        expect(element.markedDates).toMatchObject([]);
        expect(element.max).toMatchObject(new Date(2099, 11, 31));
        expect(element.min).toMatchObject(new Date(1900, 0, 1));
        expect(element.selectionMode).toBe('single');
        expect(element.value).toMatchObject([]);
        expect(element.weekNumber).toBeFalsy();
    });

    /* ----- ATTRIBUTES ----- */

    // dateLabels
    it('Calendar: date labels', () => {
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

    // disabled
    it('Calendar: disabled', () => {
        element.value = '04/15/2021';
        element.disabled = true;
        return Promise.resolve().then(() => {
            const buttons = element.shadowRoot.querySelectorAll(
                '[data-element-id^="lightning-button-icon"]'
            );
            buttons.forEach((button) => {
                expect(button.disabled).toBeTruthy();
            });
            const combobox = element.shadowRoot.querySelector(
                '[data-element-id="lightning-combobox"]'
            );
            expect(combobox.disabled).toBeTruthy();
            const tds = element.shadowRoot.querySelectorAll(
                '[data-element-id^="span-day-label"]'
            );
            tds.forEach((td) => {
                expect(td.className).toContain('slds-day');
            });
        });
    });

    // disabled dates
    it('Calendar: disabled dates', () => {
        element.value = '05/09/2021';
        element.disabledDates = '05/06/2021';
        element.min = new Date('05/20/2021');
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

    // keyboard accessibility
    it('Calendar keyboard accessibility: [left]', () => {
        element.value = '05/09/2021';

        return Promise.resolve().then(() => {
            const day8 = element.shadowRoot
                .querySelector('span[data-date="8"]')
                .closest('td');
            const spy8 = jest.spyOn(day8, 'focus');

            jest.runOnlyPendingTimers();
            const day9 = element.shadowRoot.querySelector('td[tabindex="0"]');
            day9.dispatchEvent(
                // [right = 39], [left = 37], [down = 40], [up = 38]
                new KeyboardEvent('keydown', { keyCode: 37, bubbles: true })
            );
            jest.runOnlyPendingTimers();

            expect(spy8).toHaveBeenCalled();
        });
    });

    // keyboard accessibility right
    it('Calendar keyboard accessibility: [right]', () => {
        element.value = '05/09/2021';

        return Promise.resolve().then(() => {
            const day10 = element.shadowRoot
                .querySelector('span[data-date="10"]')
                .closest('td');
            const spy10 = jest.spyOn(day10, 'focus');

            jest.runOnlyPendingTimers();
            const day9 = element.shadowRoot.querySelector('td[tabindex="0"]');
            day9.dispatchEvent(
                // [right = 39], [left = 37], [down = 40], [up = 38]
                new KeyboardEvent('keydown', { keyCode: 39, bubbles: true })
            );
            jest.runOnlyPendingTimers();

            expect(spy10).toHaveBeenCalled();
        });
    });

    // keyboard accessibility
    it('Calendar keyboard accessibility: [up]', () => {
        element.value = '05/09/2021';

        return Promise.resolve().then(() => {
            const day2 = element.shadowRoot
                .querySelector('span[data-date="2"]')
                .closest('td');
            const spy2 = jest.spyOn(day2, 'focus');

            jest.runOnlyPendingTimers();
            const day9 = element.shadowRoot.querySelector('td[tabindex="0"]');
            day9.dispatchEvent(
                // [right = 39], [left = 37], [down = 40], [up = 38]
                new KeyboardEvent('keydown', { keyCode: 38, bubbles: true })
            );
            jest.runOnlyPendingTimers();

            expect(spy2).toHaveBeenCalled();
        });
    });

    // keyboard accessibility
    it('Calendar keyboard accessibility: [down]', () => {
        element.value = '05/09/2021';

        return Promise.resolve().then(() => {
            const day16 = element.shadowRoot
                .querySelector('span[data-date="16"]')
                .closest('td');
            const spy16 = jest.spyOn(day16, 'focus');

            jest.runOnlyPendingTimers();
            const day9 = element.shadowRoot.querySelector('td[tabindex="0"]');
            day9.dispatchEvent(
                // [right = 39], [left = 37], [down = 40], [up = 38]
                new KeyboardEvent('keydown', { keyCode: 40, bubbles: true })
            );
            jest.runOnlyPendingTimers();

            expect(spy16).toHaveBeenCalled();
        });
    });

    // keyboard accessibility
    it('Calendar keyboard accessibility: [page down]', () => {
        element.value = '05/09/2021';

        return Promise.resolve().then(() => {
            const day9 = element.shadowRoot.querySelector('td[tabindex="0"]');
            day9.dispatchEvent(
                // [page up = 33], [page down = 34]
                new KeyboardEvent('keydown', { keyCode: 34, bubbles: true })
            );
            jest.runOnlyPendingTimers();
            const day16 = element.shadowRoot
                .querySelector('span[data-date="09"]')
                .closest('td');
            const spy16 = jest.spyOn(day16, 'focus');
            jest.runOnlyPendingTimers();

            expect(spy16).toHaveBeenCalled();
        });
    });

    // keyboard accessibility
    it('Calendar keyboard accessibility: [page up]', () => {
        element.value = '05/09/2021';

        return Promise.resolve().then(() => {
            const day16 = element.shadowRoot
                .querySelector('span[data-date="16"]')
                .closest('td');
            const spy16 = jest.spyOn(day16, 'focus');

            const day9 = element.shadowRoot.querySelector('td[tabindex="0"]');
            day9.dispatchEvent(
                // [page up = 33], [page down = 34]
                new KeyboardEvent('keydown', { keyCode: 33, bubbles: true })
            );
            jest.runOnlyPendingTimers();

            expect(spy16).toHaveBeenCalled();
        });
    });

    // keyboard accessibility
    it('Calendar keyboard accessibility: [home]', () => {
        element.value = '05/09/2021';

        return Promise.resolve().then(() => {
            const day16 = element.shadowRoot
                .querySelector('span[data-date="08"]')
                .closest('td');
            const spy16 = jest.spyOn(day16, 'focus');

            const day9 = element.shadowRoot.querySelector('td[tabindex="0"]');
            day9.dispatchEvent(
                // [home = 35], [end = 36]
                new KeyboardEvent('keydown', { keyCode: 35, bubbles: true })
            );
            jest.runOnlyPendingTimers();

            expect(spy16).toHaveBeenCalled();
        });
    });

    // keyboard accessibility
    it('Calendar keyboard accessibility: [end]', () => {
        element.value = '05/09/2021';

        return Promise.resolve().then(() => {
            const day16 = element.shadowRoot
                .querySelector('span[data-date="14"]')
                .closest('td');
            const spy16 = jest.spyOn(day16, 'focus');

            const day9 = element.shadowRoot.querySelector('td[tabindex="0"]');
            day9.dispatchEvent(
                // [home = 35], [end = 36]
                new KeyboardEvent('keydown', { keyCode: 36, bubbles: true })
            );
            jest.runOnlyPendingTimers();

            expect(spy16).toHaveBeenCalled();
        });
    });

    // disabled all sundays
    it('Calendar disabled all sundays', () => {
        element.value = '05/08/2022';
        element.disabledDates = 'Sun';
        element.min = new Date('05/01/2022');
        element.max = new Date('05/31/2022');

        return Promise.resolve().then(() => {
            const dates = [];
            const disabledDates = element.shadowRoot.querySelectorAll(
                '.avonni-calendar__disabled-cell'
            );
            disabledDates.forEach((date) => {
                dates.push(date.getAttribute('data-date'));
            });
            expect(dates.includes('29')).toBeTruthy();
        });
    });

    // disabled all sundays with sunday on week 5
    it('Calendar disabled all sundays (month with 5 sundays)', () => {
        element.value = '01/31/2022';
        element.disabledDates = 'Sun';
        element.min = new Date('01/01/2022');
        element.max = new Date('01/31/2022');

        return Promise.resolve().then(() => {
            const dates = [];
            const disabledDates = element.shadowRoot.querySelectorAll(
                '.avonni-calendar__disabled-cell'
            );
            disabledDates.forEach((date) => {
                dates.push(date.getAttribute('data-date'));
            });
            expect(dates.includes('23')).toBeTruthy();
            expect(dates.includes('30')).toBeTruthy();
        });
    });

    // marked dates
    it('Calendar: marked dates', () => {
        element.value = '05/09/2021';
        element.markedDates = [
            { date: new Date('05/05/2021'), color: 'rgb(255, 0, 0)' },
            { date: new Date('05/10/2021'), color: 'rgb(0, 0, 0)' },
            { date: new Date('05/15/2021'), color: 'rgb(255, 255, 255)' }
        ];
        element.min = new Date('05/01/2021');
        element.max = new Date('05/31/2021');

        return Promise.resolve().then(() => {
            const markedDates = element.shadowRoot.querySelectorAll(
                '[data-element-id="div-marked-cells"]'
            );
            expect(markedDates).toHaveLength(3);
            expect(markedDates[0].style.background).toBe('rgb(255, 0, 0)');
            expect(markedDates[1].style.background).toBe('rgb(0, 0, 0)');
            expect(markedDates[2].style.background).toBe('rgb(255, 255, 255)');
        });
    });

    // enable current month only
    it('Calendar: disable dates of previous and next months', () => {
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

    // min max
    it('Calendar: click only inside min-max', () => {
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
            expect(element.value).toMatchObject([new Date('05/18/2021')]);
        });
    });

    // values
    it('Calendar: values selection-mode: single', () => {
        element.value = '04/15/2021';
        return Promise.resolve().then(() => {
            const day = element.shadowRoot.querySelector('.slds-is-selected');
            expect(day.textContent).toBe('15');
            const month = element.shadowRoot.querySelector(
                '[data-element-id="h2"]'
            );
            expect(month.textContent).toBe('April');
            const year = element.shadowRoot.querySelector(
                '[data-element-id="lightning-combobox"]'
            );
            expect(year.value).toBe(2021);
        });
    });

    it('Calendar: values selection-mode: single no value', () => {
        element.value = '05/15/2021';
        element.min = new Date('05/01/2021');
        element.max = new Date('05/31/2021');
        element.selectionMode = 'single';
        return Promise.resolve().then(() => {
            const day14 = element.shadowRoot.querySelector(
                'span[data-date="14"]'
            );
            day14.click();
            expect(element.value).toMatchObject([new Date('05/14/2021')]);
        });
    });

    it('Calendar: values selection-mode: single same value', () => {
        element.value = '05/14/2021';
        element.min = new Date('05/01/2021');
        element.max = new Date('05/31/2021');
        return Promise.resolve().then(() => {
            const day14 = element.shadowRoot.querySelector(
                'span[data-date="14"]'
            );
            day14.click();
            expect(element.value).toMatchObject([]);
        });
    });

    it('Calendar: values selection-mode: multiple', () => {
        element.value = ['04/15/2021', '04/16/2021', '04/17/2021'];
        element.selectionMode = 'multiple';
        return Promise.resolve().then(() => {
            const days =
                element.shadowRoot.querySelectorAll('.slds-is-selected');
            const dates = [];
            days.forEach((day) => {
                dates.push(day.textContent);
            });

            expect(dates.includes('15')).toBeTruthy();
            expect(dates.includes('16')).toBeTruthy();
            expect(dates.includes('17')).toBeTruthy();

            const month = element.shadowRoot.querySelector(
                '[data-element-id="h2"]'
            );
            expect(month.textContent).toBe('April');
            const year = element.shadowRoot.querySelector(
                '[data-element-id="lightning-combobox"]'
            );
            expect(year.value).toBe(2021);
        });
    });

    it('Calendar: values selection-mode: multiple no value', () => {
        element.value = '05/15/2021';
        element.min = new Date('05/01/2021');
        element.max = new Date('05/31/2021');
        element.selectionMode = 'multiple';
        return Promise.resolve().then(() => {
            const day14 = element.shadowRoot.querySelector(
                'span[data-date="14"]'
            );
            day14.click();
            expect(element.value).toMatchObject([
                new Date('05/15/2021'),
                new Date('05/14/2021')
            ]);
        });
    });

    it('Calendar: values selection-mode: interval no value', () => {
        element.value = '05/14/2021';
        element.min = new Date('05/01/2021');
        element.max = new Date('05/31/2021');
        element.selectionMode = 'interval';
        return Promise.resolve().then(() => {
            const day14 = element.shadowRoot.querySelector(
                'span[data-date="14"]'
            );
            day14.click();
            expect(element.value).toMatchObject([]);
            day14.click();
            expect(element.value).toMatchObject([new Date('05/14/2021')]);
        });
    });

    it('Calendar: values selection-mode: interval newDate < startDate', () => {
        element.value = '05/15/2021';
        element.min = new Date('05/01/2021');
        element.max = new Date('05/31/2021');
        element.selectionMode = 'interval';
        return Promise.resolve().then(() => {
            const day14 = element.shadowRoot.querySelector(
                'span[data-date="14"]'
            );
            day14.click();
            expect(element.value).toMatchObject([
                new Date('05/14/2021'),
                new Date('05/15/2021')
            ]);
        });
    });

    it('Calendar: values selection-mode: interval newDate > startDate', () => {
        element.value = '05/15/2021';
        element.min = new Date('05/01/2021');
        element.max = new Date('05/31/2021');
        element.selectionMode = 'interval';
        return Promise.resolve().then(() => {
            const day17 = element.shadowRoot.querySelector(
                'span[data-date="17"]'
            );
            day17.click();
            expect(element.value).toMatchObject([
                new Date('05/15/2021'),
                new Date('05/17/2021')
            ]);
        });
    });

    it('Calendar: values selection-mode: interval newDate < endDate', () => {
        element.value = ['05/15/2021', '05/16/2021'];
        element.min = new Date('05/01/2021');
        element.max = new Date('05/31/2021');
        element.selectionMode = 'interval';
        return Promise.resolve().then(() => {
            const day17 = element.shadowRoot.querySelector(
                'span[data-date="17"]'
            );
            day17.click();
            expect(element.value).toMatchObject([
                new Date('05/15/2021'),
                new Date('05/17/2021')
            ]);
        });
    });

    it('Calendar: values selection-mode: interval newDate < startDate < endDate', () => {
        element.value = ['05/15/2021', '05/16/2021'];
        element.min = new Date('05/01/2021');
        element.max = new Date('05/31/2021');
        element.selectionMode = 'interval';
        return Promise.resolve().then(() => {
            const day14 = element.shadowRoot.querySelector(
                'span[data-date="14"]'
            );
            day14.click();
            expect(element.value).toMatchObject([
                new Date('05/14/2021'),
                new Date('05/16/2021')
            ]);
        });
    });

    // week number
    it('Calendar: week number', () => {
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
                weekNumbers.push(week.textContent);
            });
            expect(weekNumbers.includes('18')).toBeTruthy();
            expect(weekNumbers.includes('19')).toBeTruthy();
            expect(weekNumbers.includes('20')).toBeTruthy();
            expect(weekNumbers.includes('21')).toBeTruthy();
            expect(weekNumbers.includes('22')).toBeTruthy();
            expect(weekNumbers.includes('23')).toBeTruthy();
        });
    });

    /* ----- EVENTS ----- */

    // calendar private focus event
    it('Calendar: event privatefocus', () => {
        const handler = jest.fn();
        element.addEventListener('privatefocus', handler);

        return Promise.resolve().then(() => {
            const previousButton = element.shadowRoot.querySelector(
                '[data-element-id="previous-lightning-button-icon"]'
            );
            previousButton.focus();
            expect(handler).toHaveBeenCalled();
            expect(handler.mock.calls[0][0].bubbles).toBeTruthy();
            expect(handler.mock.calls[0][0].composed).toBeFalsy();
            expect(handler.mock.calls[0][0].cancelable).toBeTruthy();
        });
    });

    // calendar private blur event
    it('Calendar: event privateblur', () => {
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

    // calendar change
    it('Calendar: event change', () => {
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
            const normalizedDate = new Date('05/07/2021').toISOString();
            expect(call.detail.value).toBe(normalizedDate);
            expect(call.bubbles).toBeFalsy();
            expect(call.composed).toBeFalsy();
            expect(call.cancelable).toBeFalsy();
        });
    });

    it('Calendar: event change selection-mode: multiple', () => {
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
            const normalizedFirst = new Date('05/09/2021').toISOString();
            const normalizedSecond = new Date('05/07/2021').toISOString();
            expect(call.detail.value).toEqual([
                normalizedFirst,
                normalizedSecond
            ]);
        });
    });

    it('Calendar: event change selection-mode: multiple unselect', () => {
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
            expect(handler.mock.calls[0][0].detail.value).toMatchObject([]);
        });
    });

    it('Calendar: event change selection-mode: interval', () => {
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
            const normalizedStart = new Date('05/09/2021').toISOString();
            const normalizedEnd = new Date('05/11/2021').toISOString();
            expect(handler.mock.calls[0][0].detail.value).toEqual([
                normalizedStart,
                normalizedEnd
            ]);
        });
    });
});
