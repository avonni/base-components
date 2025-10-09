import { DateTime } from 'c/luxon';
import {
    containsAllowedDateTimes,
    getDisabledWeekdaysLabels,
    getFirstAvailableWeek,
    isAllDay,
    isAllowedDay,
    isAllowedTime,
    nextAllowedDay,
    nextAllowedMonth,
    nextAllowedTime,
    previousAllowedDay,
    previousAllowedMonth,
    previousAllowedTime,
    sortDaysOfTheWeek,
    spansOnMoreThanOneDay
} from '../dateComputations';

const timeZone = { zone: 'America/Toronto' };

describe('Date Computations', () => {
    describe('containsAllowedDateTimes()', () => {
        it('Fully allowed', () => {
            const start = DateTime.fromISO(
                '2025-09-28T00:00:00-05:00',
                timeZone
            );
            const end = DateTime.fromISO('2025-10-04T13:00:00-05:00', timeZone);
            const result = containsAllowedDateTimes({
                start,
                end,
                allowedMonths: [0, 1, 7, 8, 9, 10, 11],
                allowedDays: [1, 2, 3, 4, 5, 6],
                allowedTimeFrames: ['00:00-23:59'],
                unit: 'day',
                span: 1
            });
            expect(result).toBe(true);
        });

        it('Does not contain allowed month', () => {
            const start = DateTime.fromISO(
                '2025-09-28T00:00:00-05:00',
                timeZone
            );
            const end = DateTime.fromISO('2025-10-04T13:00:00-05:00', timeZone);
            const result = containsAllowedDateTimes({
                start,
                end,
                allowedMonths: [0, 1, 2],
                allowedDays: [1, 2, 3, 4, 5],
                allowedTimeFrames: ['00:00-23:59'],
                unit: 'day',
                span: 1
            });
            expect(result).toBe(false);
        });

        it('Does not contain allowed day', () => {
            const start = DateTime.fromISO(
                '2025-10-05T00:00:00-05:00',
                timeZone
            );
            const end = DateTime.fromISO('2025-10-08T13:00:00-05:00', timeZone);
            const result = containsAllowedDateTimes({
                start,
                end,
                allowedMonths: [5, 7, 9, 10, 11, 0],
                allowedDays: [6],
                allowedTimeFrames: ['00:00-23:59'],
                unit: 'day',
                span: 1
            });
            expect(result).toBe(false);
        });

        it('Does not contain allowed time frame', () => {
            const start = DateTime.fromISO(
                '2025-10-05T08:00:00-05:00',
                timeZone
            );
            const end = DateTime.fromISO('2025-10-05T13:00:00-05:00', timeZone);
            const result = containsAllowedDateTimes({
                start,
                end,
                allowedMonths: [0, 2, 3, 49],
                allowedDays: [0, 1, 2, 3, 4, 5, 6],
                allowedTimeFrames: ['16:00-22:00'],
                unit: 'hour',
                span: 1
            });
            expect(result).toBe(false);
        });

        it('Empty interval is an allowed time', () => {
            const start = DateTime.fromISO(
                '2025-10-05T08:00:00-05:00',
                timeZone
            );
            const end = DateTime.fromISO('2025-10-05T08:00:00-05:00', timeZone);
            const result = containsAllowedDateTimes({
                start,
                end,
                allowedMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                allowedDays: [0, 1, 2, 3, 4, 5, 6],
                allowedTimeFrames: ['00:00-23:59'],
                unit: 'hour',
                span: 1
            });
            expect(result).toBe(true);
        });

        it('Empty interval is not an allowed time', () => {
            const start = DateTime.fromISO(
                '2025-10-05T08:00:00-05:00',
                timeZone
            );
            const end = DateTime.fromISO('2025-10-05T08:00:00-05:00', timeZone);
            const result = containsAllowedDateTimes({
                start,
                end,
                allowedMonths: [0, 1],
                allowedDays: [0, 1, 2, 3, 4, 5, 6],
                allowedTimeFrames: ['00:00-23:59'],
                unit: 'hour',
                span: 1
            });
            expect(result).toBe(false);
        });

        it('Start date after end date returns false', () => {
            const start = DateTime.fromISO(
                '2025-10-02T10:00:00-04:00',
                timeZone
            );
            const end = DateTime.fromISO('2025-10-02T08:00:00-04:00', timeZone);
            const result = containsAllowedDateTimes({
                start,
                end,
                allowedMonths: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
                allowedDays: [0, 1, 2, 3, 4, 5, 6],
                allowedTimeFrames: ['00:00-23:59'],
                unit: 'hour',
                span: 1
            });
            expect(result).toBe(false);
        });
    });

    describe('getDisabledWeekdaysLabels()', () => {
        it('All days are allowed', () => {
            const result = getDisabledWeekdaysLabels([0, 1, 2, 3, 4, 5, 6]);
            expect(result).toEqual([]);
        });

        it('All days are disabled', () => {
            const result = getDisabledWeekdaysLabels([]);
            expect(result).toEqual([
                'Sun',
                'Mon',
                'Tue',
                'Wed',
                'Thu',
                'Fri',
                'Sat'
            ]);
        });

        it('Some days are disabled', () => {
            const result = getDisabledWeekdaysLabels([1, 2, 3, 4, 5]);
            expect(result).toEqual(['Sun', 'Sat']);
        });
    });

    describe('getFirstAvailableWeek()', () => {
        it('Week has available days', () => {
            const date = DateTime.fromISO(
                '2025-10-02T12:00:00-04:00',
                timeZone
            );
            const result = getFirstAvailableWeek(date, [1, 2, 3, 4, 5]);
            expect(result.toISO()).toBe(date.toISO());
        });

        it('Week has available days, week start day is passed', () => {
            const start = DateTime.fromISO(
                '2025-10-08T12:00:00-04:00',
                timeZone
            );
            const result = getFirstAvailableWeek(start, [0, 1], 2);
            expect(result.toISO()).toBe(start.toISO());
        });

        it('Week has available days, date is at start of week', () => {
            const date = DateTime.fromISO(
                '2025-10-05T10:00:00-04:00',
                timeZone
            );
            const result = getFirstAvailableWeek(date, [1, 0, 3, 4, 5]);
            expect(result.toISO()).toBe(date.toISO());
        });

        it('No days available in current week', () => {
            const start = DateTime.fromISO(
                '2025-10-08T12:00:00-04:00',
                timeZone
            );
            const result = getFirstAvailableWeek(start, [0, 1]);
            expect(result.toISO()).toBe('2025-10-15T12:00:00.000-04:00');
        });

        it('No days available in current week, week start day is passed', () => {
            const date = DateTime.fromISO(
                '2025-10-08T12:00:00-04:00',
                timeZone
            );
            const result = getFirstAvailableWeek(date, [5, 6], 5);
            expect(result.toISO()).toBe('2025-10-15T12:00:00.000-04:00');
        });
    });

    describe('isAllDay()', () => {
        describe('True', () => {
            it('event.allDay is true', () => {
                const event = { allDay: true };
                const from = DateTime.fromISO(
                    '2025-10-02T10:00:00-04:00',
                    timeZone
                );
                const to = DateTime.fromISO(
                    '2025-10-02T14:00:00-04:00',
                    timeZone
                );
                const startOfFrom = from.startOf('day');
                const endOfTo = to.endOf('day');
                const result = isAllDay({
                    event,
                    from,
                    to,
                    startOfFrom,
                    endOfTo
                });
                expect(result).toBe(true);
            });

            it('Event spans full day (start at beginning, end at end)', () => {
                const event = { allDay: false };
                const from = DateTime.fromISO(
                    '2025-10-02T00:00:00-04:00',
                    timeZone
                );
                const to = DateTime.fromISO(
                    '2025-10-02T23:59:59-04:00',
                    timeZone
                );
                const startOfFrom = from.startOf('day');
                const endOfTo = to.endOf('day');
                const result = isAllDay({
                    event,
                    from,
                    to,
                    startOfFrom,
                    endOfTo
                });
                expect(result).toBe(true);
            });

            it('Event spans full day with normalized end time', () => {
                const event = { allDay: false };
                const from = DateTime.fromISO(
                    '2025-10-02T00:00:00-04:00',
                    timeZone
                );
                const to = DateTime.fromISO(
                    '2025-10-02T23:59:30-04:00',
                    timeZone
                );
                const startOfFrom = from.startOf('day');
                const endOfTo = to.endOf('day');
                const result = isAllDay({
                    event,
                    from,
                    to,
                    startOfFrom,
                    endOfTo
                });
                expect(result).toBe(true);
            });

            it('Event spans multiple days but starts and ends at day boundaries', () => {
                const event = { allDay: false };
                const from = DateTime.fromISO(
                    '2025-10-02T00:00:00-04:00',
                    timeZone
                );
                const to = DateTime.fromISO(
                    '2025-10-03T23:59:59-04:00',
                    timeZone
                );
                const startOfFrom = from.startOf('day');
                const endOfTo = to.endOf('day');
                const result = isAllDay({
                    event,
                    from,
                    to,
                    startOfFrom,
                    endOfTo
                });
                expect(result).toBe(true);
            });

            it('Handle DST transition day', () => {
                const event = { allDay: false };
                const from = DateTime.fromISO(
                    '2025-03-09T00:00:00-05:00',
                    timeZone
                );
                const to = DateTime.fromISO(
                    '2025-03-09T23:59:59-04:00',
                    timeZone
                );
                const startOfFrom = from.startOf('day');
                const endOfTo = to.endOf('day');
                const result = isAllDay({
                    event,
                    from,
                    to,
                    startOfFrom,
                    endOfTo
                });
                expect(result).toBe(true);
            });
        });

        describe('False', () => {
            it('Event does not start at beginning of day', () => {
                const event = { allDay: false };
                const from = DateTime.fromISO(
                    '2025-10-02T10:00:00-04:00',
                    timeZone
                );
                const to = DateTime.fromISO(
                    '2025-10-02T23:59:59-04:00',
                    timeZone
                );
                const startOfFrom = from.startOf('day');
                const endOfTo = to.endOf('day');
                const result = isAllDay({
                    event,
                    from,
                    to,
                    startOfFrom,
                    endOfTo
                });
                expect(result).toBe(false);
            });

            it('Event does not end at end of day', () => {
                const event = { allDay: false };
                const from = DateTime.fromISO(
                    '2025-10-02T00:00:00-04:00',
                    timeZone
                );
                const to = DateTime.fromISO(
                    '2025-10-02T14:00:00-04:00',
                    timeZone
                );
                const startOfFrom = from.startOf('day');
                const endOfTo = to.endOf('day');
                const result = isAllDay({
                    event,
                    from,
                    to,
                    startOfFrom,
                    endOfTo
                });
                expect(result).toBe(false);
            });

            it('Invalid values', () => {
                const event = { allDay: false };
                const from = DateTime.fromISO(
                    '2025-10-02T00:00:00-04:00',
                    timeZone
                );
                const to = DateTime.fromISO(
                    '2025-10-02T23:59:59-04:00',
                    timeZone
                );
                const startOfFrom = from.startOf('day');
                const endOfTo = to.endOf('day');
                expect(
                    isAllDay({ event: null, from, to, endOfTo, startOfFrom })
                ).toBe(false);
                expect(
                    isAllDay({ event, from: null, to, endOfTo, startOfFrom })
                ).toBe(false);
                expect(
                    isAllDay({ event, from, to: null, endOfTo, startOfFrom })
                ).toBe(false);
                expect(
                    isAllDay({ event, from, to: null, endOfTo, startOfFrom })
                ).toBe(false);
            });
        });
    });

    describe('isAllowedDay()', () => {
        it('Allowed', () => {
            const date = DateTime.fromISO(
                '2025-10-02T12:00:00-04:00',
                timeZone
            );
            const result = isAllowedDay(date, [0, 2, 4, 5]);
            expect(result).toBe(true);
        });

        it('Not allowed', () => {
            const date = DateTime.fromISO(
                '2025-10-02T12:00:00-04:00',
                timeZone
            );
            const result = isAllowedDay(date, [1, 3, 5, 6]);
            expect(result).toBe(false);
        });
    });

    describe('isAllowedTime()', () => {
        it('Allowed', () => {
            const date = DateTime.fromISO(
                '2025-10-02T12:00:00-04:00',
                timeZone
            );
            const result = isAllowedTime(date, ['00:00-02:00', '07:30-14:45']);
            expect(result).toBe(true);
        });

        it('Not allowed', () => {
            const date = DateTime.fromISO(
                '2025-10-02T06:10:00-04:00',
                timeZone
            );
            const result = isAllowedTime(date, ['00:00-02:00', '07:30-14:45']);
            expect(result).toBe(false);
        });
    });

    describe('nextAllowedMonth()', () => {
        it('Current date month is allowed', () => {
            const date = DateTime.fromISO(
                '2025-10-02T12:00:00-04:00',
                timeZone
            );
            const result = nextAllowedMonth(date, [0, 2, 4, 5, 9, 11]);
            expect(result).toBe(date);
        });

        it('Current date month is not allowed', () => {
            const date = DateTime.fromISO(
                '2025-01-02T12:00:00-05:00',
                timeZone
            );
            const result = nextAllowedMonth(date, [3, 5, 6, 11]);
            expect(result).toEqual(
                DateTime.fromISO('2025-04-01T12:00:00-04:00', timeZone)
            );
        });

        it('Keep the original date day number', () => {
            const date = DateTime.fromISO(
                '2025-01-02T12:00:00-05:00',
                timeZone
            );
            const result = nextAllowedMonth(date, [3, 5, 6, 11], false);
            expect(result).toEqual(
                DateTime.fromISO('2025-04-02T12:00:00-04:00', timeZone)
            );
        });

        it('Next allowed month is in another year', () => {
            const date = DateTime.fromISO(
                '2025-11-18T08:30:00-04:00',
                timeZone
            );
            const result = nextAllowedMonth(date, [1, 3, 5, 6, 9]);
            expect(result).toEqual(
                DateTime.fromISO('2026-02-01T08:30:00-04:00', timeZone)
            );
        });
    });

    describe('nextAllowedDay()', () => {
        it('Current date day is allowed', () => {
            const date = DateTime.fromISO(
                '2025-10-02T08:30:00-04:00',
                timeZone
            );
            const allowedMonths = [0, 1, 2, 3, 9, 11];
            const allowedDays = [2, 3, 4, 6];
            const result = nextAllowedDay(date, allowedMonths, allowedDays);
            expect(result).toBe(date);
        });

        it('Current date day is not allowed', () => {
            const date = DateTime.fromISO(
                '2025-10-02T08:30:00-04:00',
                timeZone
            );
            const allowedMonths = [0, 1, 2, 3, 9, 11];
            const allowedDays = [2, 3, 6];
            const result = nextAllowedDay(date, allowedMonths, allowedDays);
            expect(result.toISO()).toBe('2025-10-04T00:00:00.000-04:00');
        });

        it('Take into account allowed months', () => {
            const date = DateTime.fromISO(
                '2025-10-30T08:30:00-04:00',
                timeZone
            );
            const allowedMonths = [0, 1, 2, 3, 11];
            const allowedDays = [2, 3, 6];
            const result = nextAllowedDay(date, allowedMonths, allowedDays);
            expect(result.toISO()).toBe('2025-12-02T00:00:00.000-05:00');
        });
    });

    describe('nextAllowedTime()', () => {
        it('Current hour is allowed', () => {
            const date = DateTime.fromISO(
                '2025-10-02T08:30:00-04:00',
                timeZone
            );
            const result = nextAllowedTime({
                date,
                allowedMonths: [0, 1, 2, 3, 9, 11],
                allowedDays: [2, 3, 4, 6],
                allowedTimeFrames: ['00:00-02:00', '07:30-14:45'],
                span: 1,
                unit: 'hour'
            });
            expect(result).toBe(date);
        });

        it('Current hour is not allowed', () => {
            const date = DateTime.fromISO(
                '2025-10-02T06:00:00-04:00',
                timeZone
            );
            const result = nextAllowedTime({
                date,
                allowedMonths: [0, 1, 2, 3, 9, 11],
                allowedDays: [2, 3, 4, 6],
                allowedTimeFrames: ['00:00-02:00', '07:00-14:00'],
                span: 1,
                unit: 'hour'
            });
            expect(result.toISO()).toBe('2025-10-02T07:00:00.000-04:00');
        });

        it('Current minute is allowed', () => {
            const date = DateTime.fromISO(
                '2025-10-02T00:30:00-04:00',
                timeZone
            );
            const result = nextAllowedTime({
                date,
                allowedMonths: [0, 1, 2, 3, 9, 11],
                allowedDays: [2, 3, 4, 6],
                allowedTimeFrames: ['00:00-02:00', '08:00-14:30'],
                span: 5,
                unit: 'minute'
            });
            expect(result).toBe(date);
        });

        it('Current minute is not allowed', () => {
            const date = DateTime.fromISO(
                '2025-10-02T04:30:00.000-04:00',
                timeZone
            );
            const result = nextAllowedTime({
                date,
                allowedMonths: [0, 1, 2, 3, 9, 11],
                allowedDays: [2, 3, 4, 6],
                allowedTimeFrames: ['00:00-02:00', '07:00-14:00'],
                span: 5,
                unit: 'minute'
            });
            expect(result.toISO()).toBe('2025-10-02T07:00:00.000-04:00');
        });

        it('Next allowed time is in another day', () => {
            const date = DateTime.fromISO(
                '2025-10-02T18:00:00-04:00',
                timeZone
            );
            const result = nextAllowedTime({
                date,
                allowedMonths: [0, 1, 2, 3, 9, 11],
                allowedDays: [2, 3, 4, 6],
                allowedTimeFrames: ['00:00-02:00', '07:00-14:00'],
                span: 1,
                unit: 'hour'
            });
            expect(result.toISO()).toBe('2025-10-04T00:00:00.000-04:00');
        });
    });

    describe('previousAllowedDay()', () => {
        it('Current date day is allowed', () => {
            const date = DateTime.fromISO(
                '2025-10-02T08:30:00-04:00',
                timeZone
            );
            const allowedMonths = [0, 1, 2, 3, 9, 11];
            const allowedDays = [2, 3, 4, 6];
            const result = previousAllowedDay(date, allowedMonths, allowedDays);
            expect(result.toISO()).toBe(date.toISO());
        });

        it('Current date day is not allowed', () => {
            const date = DateTime.fromISO(
                '2025-10-02T08:30:00-04:00',
                timeZone
            );
            const allowedMonths = [0, 1, 2, 3, 9, 11];
            const allowedDays = [2, 3, 6];
            const result = previousAllowedDay(date, allowedMonths, allowedDays);
            expect(result.toISO()).toBe('2025-10-01T00:00:00.000-04:00');
        });

        it('Take into account allowed months', () => {
            const date = DateTime.fromISO(
                '2025-10-01T08:30:00-04:00',
                timeZone
            );
            const allowedMonths = [0, 1, 2, 3, 11];
            const allowedDays = [2, 4, 6];
            const result = previousAllowedDay(date, allowedMonths, allowedDays);
            expect(result.toISO()).toBe('2025-04-01T00:00:00.000-04:00');
        });
    });

    describe('previousAllowedMonth()', () => {
        it('Current date month is allowed', () => {
            const date = DateTime.fromISO(
                '2025-10-02T12:00:00-04:00',
                timeZone
            );
            const result = previousAllowedMonth(date, [0, 2, 4, 5, 9, 11]);
            expect(result).toEqual(date);
        });

        it('Current date month is not allowed', () => {
            const date = DateTime.fromISO(
                '2025-01-02T12:00:00-05:00',
                timeZone
            );
            const result = previousAllowedMonth(date, [3, 5, 6, 11]);
            expect(result).toEqual(
                DateTime.fromISO('2024-12-01T12:00:00-05:00', timeZone)
            );
        });

        it('Keep the original date day number', () => {
            const date = DateTime.fromISO(
                '2025-01-02T12:00:00-05:00',
                timeZone
            );
            const result = previousAllowedMonth(date, [3, 5, 6, 11], false);
            expect(result).toEqual(
                DateTime.fromISO('2024-12-02T12:00:00-05:00', timeZone)
            );
        });

        it('Previous allowed month is in another year', () => {
            const date = DateTime.fromISO(
                '2025-01-18T08:30:00-05:00',
                timeZone
            );
            const result = previousAllowedMonth(date, [1, 3, 5, 6, 9, 11]);
            expect(result).toEqual(
                DateTime.fromISO('2024-12-01T08:30:00-05:00', timeZone)
            );
        });
    });

    describe('previousAllowedTime()', () => {
        it('Current hour is allowed', () => {
            const date = DateTime.fromISO(
                '2025-10-02T08:30:00-04:00',
                timeZone
            );
            const result = previousAllowedTime({
                date,
                allowedMonths: [0, 1, 2, 3, 9, 11],
                allowedDays: [2, 3, 4, 6],
                allowedTimeFrames: ['00:00-02:00', '07:30-14:45'],
                unit: 'hour',
                span: 1
            });
            expect(result).toBe(date);
        });

        it('Current hour is not allowed', () => {
            const date = DateTime.fromISO(
                '2025-10-02T06:00:00-04:00',
                timeZone
            );
            const result = previousAllowedTime({
                date,
                allowedMonths: [0, 1, 2, 3, 9, 11],
                allowedDays: [2, 3, 4, 6],
                allowedTimeFrames: ['00:00-02:00', '07:00-14:00'],
                unit: 'hour',
                span: 1
            });
            expect(result.toISO()).toBe('2025-10-02T01:00:00.000-04:00');
        });

        it('Current minute is allowed', () => {
            const date = DateTime.fromISO(
                '2025-10-02T00:30:00-04:00',
                timeZone
            );
            const result = previousAllowedTime({
                date,
                allowedMonths: [0, 1, 2, 3, 9, 11],
                allowedDays: [2, 3, 4, 6],
                allowedTimeFrames: ['00:00-02:00', '08:00-14:30'],
                unit: 'minute',
                span: 5
            });
            expect(result).toBe(date);
        });

        it('Current minute is not allowed', () => {
            const date = DateTime.fromISO(
                '2025-10-02T04:30:00.000-04:00',
                timeZone
            );
            const result = previousAllowedTime({
                date,
                allowedMonths: [0, 1, 2, 3, 9, 11],
                allowedDays: [2, 3, 4, 6],
                allowedTimeFrames: ['00:00-02:00', '07:00-14:00'],
                unit: 'minute',
                span: 5
            });
            expect(result.toISO()).toBe('2025-10-02T01:55:00.000-04:00');
        });

        it('Previous allowed time is in another day', () => {
            const date = DateTime.fromISO(
                '2025-10-02T06:00:00-04:00',
                timeZone
            );
            const result = previousAllowedTime({
                date,
                allowedMonths: [0, 1, 2, 3, 9, 11],
                allowedDays: [2, 3, 4, 6],
                allowedTimeFrames: ['00:00-02:00', '07:00-14:00'],
                unit: 'hour',
                span: 1
            });

            expect(result.toISO()).toBe('2025-10-02T01:00:00.000-04:00');
        });
    });

    describe('sortDaysOfTheWeek()', () => {
        it('Sort days when no weekStartDay is provided', () => {
            const result = sortDaysOfTheWeek([1, 3, 5, 0, 2, 4, 6]);
            expect(result).toEqual([0, 1, 2, 3, 4, 5, 6]);
        });

        it('Sort days starting from Sunday', () => {
            const result = sortDaysOfTheWeek([1, 3, 5, 0, 2, 4, 6], 0);
            expect(result).toEqual([0, 1, 2, 3, 4, 5, 6]);
        });

        it('Sort days starting from Monday', () => {
            const result = sortDaysOfTheWeek([1, 3, 5, 0, 2, 4, 6], 1);
            expect(result).toEqual([1, 2, 3, 4, 5, 6, 0]);
        });

        it('Sort days starting from Tuesday', () => {
            const result = sortDaysOfTheWeek([1, 3, 5, 0, 2, 4, 6], 2);
            expect(result).toEqual([2, 3, 4, 5, 6, 0, 1]);
        });

        it('Sort days starting from Wednesday', () => {
            const result = sortDaysOfTheWeek([1, 3, 5, 0, 2, 4, 6], 3);
            expect(result).toEqual([3, 4, 5, 6, 0, 1, 2]);
        });

        it('Sort days starting from Thursday', () => {
            const result = sortDaysOfTheWeek([1, 3, 5, 0, 2, 4, 6], 4);
            expect(result).toEqual([4, 5, 6, 0, 1, 2, 3]);
        });

        it('Sort days starting from Friday', () => {
            const result = sortDaysOfTheWeek([1, 3, 5, 0, 2, 4, 6], 5);
            expect(result).toEqual([5, 6, 0, 1, 2, 3, 4]);
        });

        it('Sort days starting from Saturday', () => {
            const result = sortDaysOfTheWeek([1, 3, 5, 0, 2, 4, 6], 6);
            expect(result).toEqual([6, 0, 1, 2, 3, 4, 5]);
        });

        it('Partial day arrays is sorted', () => {
            const result = sortDaysOfTheWeek([1, 3, 5], 2);
            expect(result).toEqual([3, 5, 1]);
        });

        it('Handle duplicate days', () => {
            const result = sortDaysOfTheWeek([1, 1, 3, 3, 5, 5], 2);
            expect(result).toEqual([3, 3, 5, 5, 1, 1]);
        });
    });

    describe('spansOnMoreThanOneDay()', () => {
        describe('True', () => {
            it('Event spans multiple days (different start and end day)', () => {
                const event = { allDay: false };
                const from = DateTime.fromISO(
                    '2025-10-02T10:00:00-04:00',
                    timeZone
                );
                const to = DateTime.fromISO(
                    '2025-10-03T14:00:00-04:00',
                    timeZone
                );
                const startOfFrom = from.startOf('day');
                const endOfTo = to.endOf('day');
                const result = spansOnMoreThanOneDay({
                    event,
                    from,
                    to,
                    startOfFrom,
                    endOfTo
                });
                expect(result).toBe(true);
            });

            it('All-day event', () => {
                const event = { allDay: true };
                const from = DateTime.fromISO(
                    '2025-10-02T00:00:00-04:00',
                    timeZone
                );
                const to = DateTime.fromISO(
                    '2025-10-02T12:00:00-04:00',
                    timeZone
                );
                const startOfFrom = from.startOf('day');
                const endOfTo = to.endOf('day');
                const result = spansOnMoreThanOneDay({
                    event,
                    from,
                    to,
                    startOfFrom,
                    endOfTo
                });
                expect(result).toBe(true);
            });

            it('Event spans multiple days with weekday recurrence but weekdays is null', () => {
                const event = {
                    allDay: false,
                    recurrenceAttributes: { weekdays: null }
                };
                const from = DateTime.fromISO(
                    '2025-10-02T10:00:00-04:00',
                    timeZone
                );
                const to = DateTime.fromISO(
                    '2025-10-03T14:00:00-04:00',
                    timeZone
                );
                const startOfFrom = from.startOf('day');
                const endOfTo = to.endOf('day');
                const result = spansOnMoreThanOneDay({
                    event,
                    from,
                    to,
                    startOfFrom,
                    endOfTo
                });
                expect(result).toBe(true);
            });
        });

        describe('False', () => {
            it('Event spans single day (same start and end day)', () => {
                const event = { allDay: false };
                const from = DateTime.fromISO(
                    '2025-10-02T10:00:00-04:00',
                    timeZone
                );
                const to = DateTime.fromISO(
                    '2025-10-02T14:00:00-04:00',
                    timeZone
                );
                const startOfFrom = from.startOf('day');
                const endOfTo = to.endOf('day');
                const result = spansOnMoreThanOneDay({
                    event,
                    from,
                    to,
                    startOfFrom,
                    endOfTo
                });
                expect(result).toBe(false);
            });

            it('Event spans multiple days but has weekday recurrence', () => {
                const event = {
                    allDay: false,
                    recurrenceAttributes: { weekdays: [1, 2, 3] }
                };
                const from = DateTime.fromISO(
                    '2025-10-02T10:00:00-04:00',
                    timeZone
                );
                const to = DateTime.fromISO(
                    '2025-10-03T14:00:00-04:00',
                    timeZone
                );
                const startOfFrom = from.startOf('day');
                const endOfTo = to.endOf('day');
                const result = spansOnMoreThanOneDay({
                    event,
                    from,
                    to,
                    startOfFrom,
                    endOfTo
                });
                expect(result).toBe(false);
            });

            it('All-day event spans multiple days but has weekday recurrence', () => {
                const event = {
                    allDay: true,
                    recurrenceAttributes: { weekdays: [1, 2, 3] }
                };
                const from = DateTime.fromISO(
                    '2025-10-02T00:00:00-04:00',
                    timeZone
                );
                const to = DateTime.fromISO(
                    '2025-10-04T23:59:59-04:00',
                    timeZone
                );
                const startOfFrom = from.startOf('day');
                const endOfTo = to.endOf('day');
                const result = spansOnMoreThanOneDay({
                    event,
                    from,
                    to,
                    startOfFrom,
                    endOfTo
                });
                expect(result).toBe(false);
            });

            it('Event spans single day with weekday recurrence', () => {
                const event = {
                    allDay: false,
                    recurrenceAttributes: { weekdays: [1, 2, 3] }
                };
                const from = DateTime.fromISO(
                    '2025-10-02T10:00:00-04:00',
                    timeZone
                );
                const to = DateTime.fromISO(
                    '2025-10-02T14:00:00-04:00',
                    timeZone
                );
                const startOfFrom = from.startOf('day');
                const endOfTo = to.endOf('day');
                const result = spansOnMoreThanOneDay({
                    event,
                    from,
                    to,
                    startOfFrom,
                    endOfTo
                });
                expect(result).toBe(false);
            });

            it('Invalid values', () => {
                const event = { allDay: false };
                const from = DateTime.fromISO(
                    '2025-10-02T10:00:00-04:00',
                    timeZone
                );
                const to = DateTime.fromISO(
                    '2025-10-03T14:00:00-04:00',
                    timeZone
                );
                const startOfFrom = from.startOf('day');
                const endOfTo = to.endOf('day');

                expect(
                    spansOnMoreThanOneDay({
                        event: null,
                        from,
                        to,
                        startOfFrom,
                        endOfTo
                    })
                ).toBe(false);
                expect(
                    spansOnMoreThanOneDay({
                        event,
                        from: null,
                        to,
                        startOfFrom,
                        endOfTo
                    })
                ).toBe(false);
                expect(
                    spansOnMoreThanOneDay({
                        event,
                        from,
                        to: null,
                        startOfFrom,
                        endOfTo
                    })
                ).toBe(false);
                expect(
                    spansOnMoreThanOneDay({
                        event,
                        from,
                        to,
                        startOfFrom: null,
                        endOfTo
                    })
                ).toBe(false);
                expect(
                    spansOnMoreThanOneDay({
                        event,
                        from,
                        to,
                        startOfFrom,
                        endOfTo: null
                    })
                ).toBe(false);
            });
        });
    });
});
