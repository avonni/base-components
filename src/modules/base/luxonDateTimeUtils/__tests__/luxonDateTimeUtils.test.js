import { DateTime, Interval } from 'c/luxon';
import {
    addToDate,
    dateTimeObjectFrom,
    getEndOfWeek,
    getStartOfWeek,
    getWeekday,
    intervalFrom,
    isInTimeFrame,
    numberOfUnitsBetweenDates,
    parseTimeFrame,
    removeFromDate
} from '../luxonDateTimeUtils';

describe('Luxon Date Time Utils', () => {
    describe('addToDate()', () => {
        it('Days', () => {
            const date = DateTime.fromISO('2025-01-01T00:00:00-05:00');
            const result = addToDate(date, 'day', 3);
            expect(result.toISO()).toBe('2025-01-04T00:00:00.000-05:00');
        });

        it('Hours', () => {
            const date = DateTime.fromISO('2025-01-01T00:00:00-05:00');
            const result = addToDate(date, 'hour', 3);
            expect(result.toISO()).toBe('2025-01-01T03:00:00.000-05:00');
        });

        it('Minutes', () => {
            const date = DateTime.fromISO('2025-01-01T00:00:00-05:00');
            const result = addToDate(date, 'minute', 30);
            expect(result.toISO()).toBe('2025-01-01T00:30:00.000-05:00');
        });

        it('Seconds', () => {
            const date = DateTime.fromISO('2025-01-01T00:00:00-05:00');
            const result = addToDate(date, 'second', 30);
            expect(result.toISO()).toBe('2025-01-01T00:00:30.000-05:00');
        });

        it('Milliseconds', () => {
            const date = DateTime.fromISO('2025-01-01T00:00:00-05:00');
            const result = addToDate(date, 'millisecond', 30);
            expect(result.toISO()).toBe('2025-01-01T00:00:00.030-05:00');
        });

        it('Weeks', () => {
            const date = DateTime.fromISO('2025-01-01T00:00:00-05:00');
            const result = addToDate(date, 'week', 3);
            expect(result.toISO()).toBe('2025-01-22T00:00:00.000-05:00');
        });

        it('Months', () => {
            const date = DateTime.fromISO('2025-01-01T00:00:00-05:00');
            const result = addToDate(date, 'month', 3);
            expect(result.toISO()).toBe('2025-04-01T00:00:00.000-04:00');
        });

        it('Years', () => {
            const date = DateTime.fromISO('2025-01-01T00:00:00-05:00');
            const result = addToDate(date, 'year', 3);
            expect(result.toISO()).toBe('2028-01-01T00:00:00.000-05:00');
        });
    });

    describe('dateTimeObjectFrom()', () => {
        it('Date object', () => {
            const date = new Date('2025-01-01T00:00:00Z');
            const result = dateTimeObjectFrom(date);
            expect(result).toBeInstanceOf(DateTime);
            expect(result.toMillis()).toBe(date.getTime());
        });

        it('Custom object', () => {
            const obj = { toString: () => '2025-01-01T00:00:00Z' };
            const result = dateTimeObjectFrom(obj);
            expect(result).toBeInstanceOf(DateTime);
            expect(result.toMillis()).toBe(
                new Date('2025-01-01T00:00:00Z').getTime()
            );
        });

        describe('DateTime object', () => {
            it('Create a new DateTime object', () => {
                const dateTime = DateTime.fromISO('2025-01-01T12:00:00Z');
                const result = dateTimeObjectFrom(dateTime);
                expect(result).toBeInstanceOf(DateTime);
                expect(result).not.toBe(dateTime);
                expect(result.toMillis()).toBe(dateTime.toMillis());
            });

            it('Apply new time zone when options are provided', () => {
                const dateTime = DateTime.fromISO('2025-01-01T12:00:00Z', {
                    zone: 'Asia/Magadan'
                });
                const options = { zone: 'Europe/London' };
                const result = dateTimeObjectFrom(dateTime, options);
                expect(result.zoneName).toBe('Europe/London');
                expect(result.toMillis()).toBe(dateTime.toMillis());
            });

            it('Use time zone from DateTime when no options are provided', () => {
                const dateTime = DateTime.fromISO('2025-01-01T12:00:00Z', {
                    zone: 'Asia/Magadan'
                });
                const result = dateTimeObjectFrom(dateTime);
                expect(result.zoneName).toBe('Asia/Magadan');
                expect(result.toMillis()).toBe(dateTime.toMillis());
            });
        });

        describe('Timestamp', () => {
            it('Create a new DateTime object', () => {
                const timestamp = 1735689600000; // 2025-01-01T00:00:00Z
                const result = dateTimeObjectFrom(timestamp);
                expect(result).toBeInstanceOf(DateTime);
                expect(result.toMillis()).toBe(timestamp);
            });

            it('Apply new time zone when options are provided', () => {
                const timestamp = 1735689600000; // 2025-01-01T00:00:00Z
                const options = { zone: 'Asia/Magadan' };
                const result = dateTimeObjectFrom(timestamp, options);
                expect(result.zoneName).toBe('Asia/Magadan');
                expect(result.toMillis()).toBe(timestamp);
            });

            it('Negative timestamp', () => {
                const negativeTimestamp = -86400000; // 1969-12-31T00:00:00Z
                const result = dateTimeObjectFrom(negativeTimestamp);
                expect(result).toBeInstanceOf(DateTime);
                expect(result.toMillis()).toBe(negativeTimestamp);
            });

            it('Large timestamp', () => {
                const largeTimestamp = 4102444800000; // 2100-01-01T00:00:00Z
                const result = dateTimeObjectFrom(largeTimestamp);
                expect(result).toBeInstanceOf(DateTime);
                expect(result.toMillis()).toBe(largeTimestamp);
            });
        });

        // Test valid date string input
        describe('ISO Date', () => {
            it('Create a new DateTime object', () => {
                const dateString = '2025-01-01T12:00:00Z';
                const result = dateTimeObjectFrom(dateString);
                expect(result).toBeInstanceOf(DateTime);
                expect(result.toMillis()).toBe(new Date(dateString).getTime());
            });

            it('Apply new time zone when options are provided', () => {
                const dateString = '2025-01-01T12:00:00Z';
                const options = { zone: 'Europe/London' };
                const result = dateTimeObjectFrom(dateString, options);
                expect(result.zoneName).toBe('Europe/London');
                expect(result.toMillis()).toBe(new Date(dateString).getTime());
            });
        });

        // Test Salesforce format strings
        describe('Salesforce date format', () => {
            it('Create a new DateTime object, a.m. time', () => {
                const salesforceDate = '2025-01-01, 9:30 a.m.';
                const result = dateTimeObjectFrom(salesforceDate);
                expect(result).toBeInstanceOf(DateTime);
                expect(result.hour).toBe(9);
                expect(result.minute).toBe(30);
                expect(result.toMillis()).toBe(
                    new Date(2025, 0, 1, 9, 30).getTime()
                );
            });

            it('Create a new DateTime object, p.m. time', () => {
                const salesforceDate = '2025-01-01, 2:30 p.m.';
                const result = dateTimeObjectFrom(salesforceDate);
                expect(result).toBeInstanceOf(DateTime);
                expect(result.hour).toBe(14);
                expect(result.minute).toBe(30);
                expect(result.toMillis()).toBe(
                    new Date(2025, 0, 1, 14, 30).getTime()
                );
            });

            it('Apply new time zone when options are provided', () => {
                const salesforceDate = '2025-01-01, 12:00 p.m.';
                const options = { zone: 'Asia/Magadan' };
                const result = dateTimeObjectFrom(salesforceDate, options);
                expect(result).toBeInstanceOf(DateTime);
                expect(result.zoneName).toBe('Asia/Magadan');
                expect(result.toMillis()).toBe(
                    new Date(2025, 0, 1, 12, 0).getTime()
                );
            });
        });

        describe('Invalid inputs', () => {
            it('Invalid date string', () => {
                const invalidDate = 'not-a-date';
                const result = dateTimeObjectFrom(invalidDate);
                expect(result).toBe(false);
            });

            it('Null input', () => {
                const result = dateTimeObjectFrom(null);
                expect(result).toBe(false);
            });

            it('Undefined input', () => {
                const result = dateTimeObjectFrom(undefined);
                expect(result).toBe(false);
            });

            it('Empty string', () => {
                const result = dateTimeObjectFrom('');
                expect(result).toBe(false);
            });

            it('NaN', () => {
                const result = dateTimeObjectFrom(NaN);
                expect(result).toBe(false);
            });

            it('Invalid Salesforce format', () => {
                const invalidSalesforceDate = '2025-01-01, invalid time';
                const result = dateTimeObjectFrom(invalidSalesforceDate);
                expect(result).toBe(false);
            });

            it('Ignore invalid options and log error', () => {
                const consoleSpy = jest
                    .spyOn(console, 'error')
                    .mockImplementation(() => {});
                const date = new Date('2025-01-01T00:00:00Z');
                const invalidOptions = { zone: 'Invalid/Zone' };

                const result = dateTimeObjectFrom(date, invalidOptions);

                expect(result).toBeInstanceOf(DateTime);
                expect(result.toMillis()).toBe(date.getTime());
                expect(consoleSpy).toHaveBeenCalled();
                expect(consoleSpy).toHaveBeenCalledWith(
                    expect.stringContaining('zone')
                );
                consoleSpy.mockRestore();
            });

            it('Ignore zero timestamp', () => {
                const result = dateTimeObjectFrom(0);
                expect(result).toBe(false);
            });
        });
    });

    describe('getEndOfWeek()', () => {
        it('Sunday as start (default)', () => {
            const date = DateTime.fromISO('2024-12-29T12:00:00-05:00');
            const result = getEndOfWeek(date);
            expect(result).toBeInstanceOf(DateTime);
            expect(result.toISO()).toBe('2025-01-04T23:59:59.999-05:00');
        });

        it('Sunday as start, date is already at end of week', () => {
            const date = DateTime.fromISO('2025-01-04T00:00:00.000-05:00');
            const result = getEndOfWeek(date, 0);
            expect(result).toBeInstanceOf(DateTime);
            expect(result.toISO()).toBe('2025-01-04T23:59:59.999-05:00');
        });

        it('Date week day number is before week start day', () => {
            const date = DateTime.fromISO('2024-12-30T09:00:00-05:00'); // Monday
            const result = getEndOfWeek(date, 3);
            expect(result).toBeInstanceOf(DateTime);
            expect(result.toISO()).toBe('2024-12-31T23:59:59.999-05:00');
        });

        it('Date week day number is after week start day', () => {
            const date = DateTime.fromISO('2024-12-28T12:00:00-05:00'); // Saturday
            const result = getEndOfWeek(date, 5);
            expect(result.toISO()).toBe('2025-01-02T23:59:59.999-05:00');
        });

        it('Date is already at end of week', () => {
            const date = DateTime.fromISO('2025-01-03T09:00:00-05:00');
            const result = getEndOfWeek(date, 6);
            expect(result.toISO()).toBe('2025-01-03T23:59:59.999-05:00');
        });
    });

    describe('getStartOfWeek()', () => {
        it('Sunday as start (default)', () => {
            const date = DateTime.fromISO('2025-01-01T12:00:00-05:00');
            const result = getStartOfWeek(date);
            expect(result).toBeInstanceOf(DateTime);
            expect(result.toISO()).toBe('2024-12-29T00:00:00.000-05:00');
        });

        it('Sunday as start, date is already at start of week', () => {
            const date = DateTime.fromISO('2025-01-05T12:00:00-05:00');
            const result = getStartOfWeek(date, 0);
            expect(result).toBeInstanceOf(DateTime);
            expect(result.toISO()).toBe('2025-01-05T00:00:00.000-05:00');
        });

        it('Date week day number is before week start day', () => {
            const date = DateTime.fromISO('2025-01-01T09:00:00-05:00'); // Wednesday
            const result = getStartOfWeek(date, 4);
            expect(result).toBeInstanceOf(DateTime);
            expect(result.toISO()).toBe('2024-12-26T00:00:00.000-05:00');
        });

        it('Date week day number is after week start day', () => {
            const date = DateTime.fromISO('2025-01-03T12:00:00-05:00'); // Friday
            const result = getStartOfWeek(date, 2);
            expect(result.toISO()).toBe('2024-12-31T00:00:00.000-05:00');
        });

        it('Date is already at start of week', () => {
            const date = DateTime.fromISO('2025-01-06T09:00:00-05:00');
            const result = getStartOfWeek(date, 1);
            expect(result.toISO()).toBe('2025-01-06T00:00:00.000-05:00');
        });
    });

    describe('getWeekday()', () => {
        it('DateTime object', () => {
            const sunday = DateTime.fromISO('2025-01-05T12:00:00Z');
            expect(getWeekday(sunday)).toBe(0);

            const wednesday = DateTime.fromISO('2025-01-08T12:00:00Z');
            expect(getWeekday(wednesday)).toBe(3);
        });

        it('Date object', () => {
            const sunday = new Date('2025-01-05T12:00:00Z');
            expect(getWeekday(sunday)).toBe(0);

            const tuesday = new Date('2025-01-07T12:00:00Z');
            expect(getWeekday(tuesday)).toBe(2);
        });

        it('timestamp', () => {
            const sunday = 1736092800000;
            expect(getWeekday(sunday)).toBe(0);

            const monday = 1736179200000;
            expect(getWeekday(monday)).toBe(1);
        });

        it('ISO string', () => {
            const sunday = '2025-01-05T12:00:00Z';
            expect(getWeekday(sunday)).toBe(0);

            const thursday = '2025-01-09T12:00:00Z';
            expect(getWeekday(thursday)).toBe(4);
        });

        it('Salesforce format string', () => {
            const salesforceDate = '2025-01-05, 12:00 p.m.';
            expect(getWeekday(salesforceDate)).toBe(0);

            const friday = '2025-01-09, 12:00 p.m.';
            expect(getWeekday(friday)).toBe(4);
        });

        it('Invalid date', () => {
            expect(getWeekday('not-a-date')).toBe(null);
            expect(getWeekday(null)).toBe(null);
            expect(getWeekday(undefined)).toBe(null);
            expect(getWeekday('')).toBe(null);
            expect(getWeekday(NaN)).toBe(null);
            expect(getWeekday('2025-01-05, invalid time')).toBe(null);
        });
    });

    describe('intervalFrom()', () => {
        it('Create interval from DateTime objects', () => {
            const start = DateTime.fromISO('2025-01-01T00:00:00Z');
            const end = DateTime.fromISO('2025-01-02T00:00:00Z');
            const result = intervalFrom(start, end);

            expect(result).toBeInstanceOf(Interval);
            expect(result.start.toMillis()).toBe(start.toMillis());
            expect(result.end.toMillis()).toBe(end.toMillis());
        });

        it('Create interval from Date objects', () => {
            const start = new Date('2025-01-01T00:00:00Z');
            const end = new Date('2025-01-02T00:00:00Z');
            const result = intervalFrom(start, end);

            expect(result).toBeInstanceOf(Interval);
            expect(result.start.toMillis()).toBe(start.getTime());
            expect(result.end.toMillis()).toBe(end.getTime());
        });

        it('Create interval from timestamps', () => {
            const start = 1735689600000; // 2025-01-01T00:00:00Z
            const end = 1735776000000; // 2025-01-02T00:00:00Z
            const result = intervalFrom(start, end);

            expect(result).toBeInstanceOf(Interval);
            expect(result.start.toMillis()).toBe(start);
            expect(result.end.toMillis()).toBe(end);
        });

        it('Create interval from ISO strings', () => {
            const start = '2025-01-01T00:00:00Z';
            const end = '2025-01-02T00:00:00Z';
            const result = intervalFrom(start, end);

            expect(result).toBeInstanceOf(Interval);
            expect(result.start.toMillis()).toBe(new Date(start).getTime());
            expect(result.end.toMillis()).toBe(new Date(end).getTime());
        });

        it('Create interval from Salesforce format strings', () => {
            const start = '2025-01-01, 12:00 p.m.';
            const end = '2025-01-02, 12:00 p.m.';
            const result = intervalFrom(start, end);

            expect(result).toBeInstanceOf(Interval);
            expect(result.start.toMillis()).toBe(
                new Date(2025, 0, 1, 12, 0).getTime()
            );
            expect(result.end.toMillis()).toBe(
                new Date(2025, 0, 2, 12, 0).getTime()
            );
        });

        it('Create interval with zero duration', () => {
            const dateTime = DateTime.fromISO('2025-01-01T12:00:00Z');
            const result = intervalFrom(dateTime, dateTime);

            expect(result).toBeInstanceOf(Interval);
            expect(result.length('milliseconds')).toBe(0);
        });

        describe('Invalid inputs', () => {
            it('Return null when dates are invalid', () => {
                expect(intervalFrom('not-a-date', '2025-01-02T00:00:00Z')).toBe(
                    null
                );
                expect(intervalFrom('2025-01-01T00:00:00Z', 'not-a-date')).toBe(
                    null
                );
                expect(intervalFrom('not-a-date', 'also-not-a-date')).toBe(
                    null
                );
            });

            it('Return null when dates are null', () => {
                expect(intervalFrom(null, '2025-01-02T00:00:00Z')).toBe(null);
                expect(intervalFrom('2025-01-01T00:00:00Z', null)).toBe(null);
                expect(intervalFrom(null, null)).toBe(null);
            });

            it('Return null when dates are undefined', () => {
                expect(intervalFrom(undefined, '2025-01-02T00:00:00Z')).toBe(
                    null
                );
                expect(intervalFrom('2025-01-01T00:00:00Z', undefined)).toBe(
                    null
                );
                expect(intervalFrom(undefined, undefined)).toBe(null);
            });

            it('Return null when dates are empty string', () => {
                expect(intervalFrom('', '2025-01-02T00:00:00Z')).toBe(null);
                expect(intervalFrom('2025-01-01T00:00:00Z', '')).toBe(null);
                expect(intervalFrom('', '')).toBe(null);
            });

            it('Return null when dates are NaN', () => {
                expect(intervalFrom(NaN, '2025-01-02T00:00:00Z')).toBe(null);
                expect(intervalFrom('2025-01-01T00:00:00Z', NaN)).toBe(null);
                expect(intervalFrom(NaN, NaN)).toBe(null);
            });
        });
    });

    describe('isInTimeFrame()', () => {
        it('Date is within time frame', () => {
            const date = DateTime.fromISO('2025-01-01T11:30:00-05:00');
            const result = isInTimeFrame(date, '09:00-17:00');
            expect(result).toBe(true);
        });

        it('Date is at start of time frame', () => {
            const date = DateTime.fromISO('2025-01-01T09:00:00-05:00');
            const result = isInTimeFrame(date, '09:00-17:00');
            expect(result).toBe(true);
        });

        it('Date is at end of time frame', () => {
            const date = DateTime.fromISO('2025-01-01T17:00:00-05:00');
            const result = isInTimeFrame(date, '09:00-17:00');
            expect(result).toBe(false);
        });

        it('Date is before time frame', () => {
            const date = DateTime.fromISO('2025-01-01T06:30:00-05:00');
            const result = isInTimeFrame(date, '09:00-17:00');
            expect(result).toBe(false);
        });

        it('Date is after time frame', () => {
            const date = DateTime.fromISO('2025-01-01T23:00:00-05:00');
            const result = isInTimeFrame(date, '09:00-17:00');
            expect(result).toBe(false);
        });

        it('Date time zone is applied to time frame', () => {
            const date = DateTime.fromISO('2025-01-01T14:00:00+11:00', {
                zone: 'Asia/Magadan'
            });
            const result = isInTimeFrame(date, '09:00-17:00');
            expect(result).toBe(true);
        });

        it('Return true for invalid time frame', () => {
            const consoleSpy = jest
                .spyOn(console, 'error')
                .mockImplementation(() => {});
            const date = DateTime.fromISO('2025-01-01T12:00:00Z');
            const result = isInTimeFrame(date, 'invalid-format');
            expect(result).toBe(true);
            expect(consoleSpy).toHaveBeenCalledTimes(1);
            consoleSpy.mockRestore();
        });
    });

    describe('numberOfUnitsBetweenDates()', () => {
        it('Minutes', () => {
            const firstDate = DateTime.fromISO('2025-01-01T12:00:00-05:00');
            const secondDate = DateTime.fromISO('2025-01-01T12:30:00-05:00');
            const result = numberOfUnitsBetweenDates({
                unit: 'minute',
                firstDate,
                secondDate
            });

            expect(result).toBe(30);
        });

        it('Hours', () => {
            const firstDate = DateTime.fromISO('2025-01-01T12:00:00-05:00');
            const secondDate = DateTime.fromISO('2025-01-01T15:00:00-05:00');
            const result = numberOfUnitsBetweenDates({
                unit: 'hour',
                firstDate,
                secondDate
            });

            expect(result).toBe(3);
        });

        describe('Days', () => {
            it('First date is before second date', () => {
                const firstDate = DateTime.fromISO('2025-01-03T17:00:00-05:00');
                const secondDate = DateTime.fromISO(
                    '2025-01-05T04:00:00-05:00'
                );
                const result = numberOfUnitsBetweenDates({
                    unit: 'day',
                    firstDate,
                    secondDate
                });

                expect(result).toBe(3);
            });

            it('First date is after second date', () => {
                const firstDate = DateTime.fromISO('2025-01-01T00:00:00-05:00');
                const secondDate = DateTime.fromISO(
                    '2024-12-28T12:00:00-05:00'
                );
                const result = numberOfUnitsBetweenDates({
                    unit: 'day',
                    firstDate,
                    secondDate
                });
                expect(result).toBe(5);
            });

            it('Same date', () => {
                const firstDate = DateTime.fromISO('2025-01-01T12:00:00-05:00');
                const secondDate = DateTime.fromISO(
                    '2025-01-01T18:00:00-05:00'
                );
                const result = numberOfUnitsBetweenDates({
                    unit: 'day',
                    firstDate,
                    secondDate
                });

                expect(result).toBe(1);
            });
        });

        describe('Weeks', () => {
            it('First date is before second date', () => {
                const firstDate = DateTime.fromISO('2024-12-23T12:00:00-05:00');
                const secondDate = DateTime.fromISO(
                    '2025-01-09T00:40:00-05:00'
                );
                const result = numberOfUnitsBetweenDates({
                    unit: 'week',
                    firstDate,
                    secondDate
                });
                expect(result).toBe(3);
            });

            it('First date is after second date', () => {
                const firstDate = DateTime.fromISO('2025-01-25T12:00:00-05:00');
                const secondDate = DateTime.fromISO(
                    '2025-01-09T00:40:00-05:00'
                );
                const result = numberOfUnitsBetweenDates({
                    unit: 'week',
                    firstDate,
                    secondDate
                });
                expect(result).toBe(3);
            });

            it('Week start day is not Sunday', () => {
                const firstDate = DateTime.fromISO('2025-01-03T12:00:00-05:00'); // Wednesday
                const secondDate = DateTime.fromISO(
                    '2025-01-05T12:00:00-05:00'
                );
                const result = numberOfUnitsBetweenDates({
                    unit: 'week',
                    firstDate,
                    secondDate,
                    weekStartDay: 3
                });

                expect(result).toBe(1);
            });
        });

        it('Months', () => {
            const firstDate = DateTime.fromISO('2025-01-01T12:00:00-05:00');
            const secondDate = DateTime.fromISO('2025-04-01T12:00:00-05:00');
            const result = numberOfUnitsBetweenDates({
                unit: 'month',
                firstDate,
                secondDate
            });
            expect(result).toBe(4);
        });

        it('Years', () => {
            const firstDate = DateTime.fromISO('2025-01-01T12:00:00-05:00');
            const secondDate = DateTime.fromISO('2028-01-01T12:00:00-05:00');
            const result = numberOfUnitsBetweenDates({
                unit: 'year',
                firstDate,
                secondDate
            });
            expect(result).toBe(4);
        });

        it('Handle daylight saving time boundary', () => {
            const firstDate = DateTime.fromISO('2025-03-09T01:00:00-05:00');
            const secondDate = DateTime.fromISO('2025-03-09T04:00:00-05:00');
            const result = numberOfUnitsBetweenDates({
                unit: 'hour',
                firstDate,
                secondDate
            });
            expect(result).toBe(3);
        });

        it('Handle leap year', () => {
            const firstDate = DateTime.fromISO('2024-02-28T12:00:00-05:00');
            const secondDate = DateTime.fromISO('2024-03-01T12:00:00-05:00');
            const result = numberOfUnitsBetweenDates({
                unit: 'day',
                firstDate,
                secondDate
            });
            expect(result).toBe(3);
        });
    });

    describe('parseTimeFrame()', () => {
        it('Simple time frame', () => {
            const result = parseTimeFrame('09:00-17:00');

            expect(result.valid).toBe(true);
            expect(result.start).toBeInstanceOf(DateTime);
            expect(result.end).toBeInstanceOf(DateTime);
            expect(result.start.hour).toBe(9);
            expect(result.start.minute).toBe(0);
            expect(result.end.hour).toBe(17);
            expect(result.end.minute).toBe(0);
        });

        it('Time frame with seconds', () => {
            const result = parseTimeFrame('09:30:45-17:30:45');

            expect(result.valid).toBe(true);
            expect(result.start).toBeInstanceOf(DateTime);
            expect(result.end).toBeInstanceOf(DateTime);
            expect(result.start.hour).toBe(9);
            expect(result.start.minute).toBe(30);
            expect(result.start.second).toBe(45);
            expect(result.end.hour).toBe(17);
            expect(result.end.minute).toBe(30);
            expect(result.end.second).toBe(45);
        });

        it('Time frame with milliseconds', () => {
            const result = parseTimeFrame('09:30:45.123-17:30:45.456');

            expect(result.valid).toBe(true);
            expect(result.start).toBeInstanceOf(DateTime);
            expect(result.end).toBeInstanceOf(DateTime);
            expect(result.start.hour).toBe(9);
            expect(result.start.minute).toBe(30);
            expect(result.start.second).toBe(45);
            expect(result.start.millisecond).toBe(123);
            expect(result.end.hour).toBe(17);
            expect(result.end.minute).toBe(30);
            expect(result.end.second).toBe(45);
            expect(result.end.millisecond).toBe(456);
        });

        it('Time frame with time zone', () => {
            const result = parseTimeFrame('09:00-17:00', {
                zone: 'Asia/Magadan'
            });

            expect(result.valid).toBe(true);
            expect(result.start).toBeInstanceOf(DateTime);
            expect(result.end).toBeInstanceOf(DateTime);
            expect(result.start.zoneName).toBe('Asia/Magadan');
            expect(result.end.zoneName).toBe('Asia/Magadan');
        });

        it('Same start and end time', () => {
            const result = parseTimeFrame('12:00-12:00');

            expect(result.valid).toBe(true);
            expect(result.start).toBeInstanceOf(DateTime);
            expect(result.end).toBeInstanceOf(DateTime);
            expect(result.start.hour).toBe(12);
            expect(result.end.hour).toBe(12);
        });

        describe('Invalid time frames', () => {
            let consoleSpy;
            beforeEach(() => {
                consoleSpy = jest
                    .spyOn(console, 'error')
                    .mockImplementation(() => {});
            });

            afterEach(() => {
                jest.restoreAllMocks();
            });

            it('Missing start time', () => {
                const result = parseTimeFrame('-17:00');

                expect(result.valid).toBe(false);
                expect(result.start).toBeUndefined();
                expect(result.end).toBeUndefined();
                expect(consoleSpy).toHaveBeenCalledTimes(1);
            });

            it('Missing end time', () => {
                const result = parseTimeFrame('09:00-');

                expect(result.valid).toBe(false);
                expect(result.start).toBeUndefined();
                expect(result.end).toBeUndefined();
                expect(consoleSpy).toHaveBeenCalledTimes(1);
            });

            it('Missing dash', () => {
                const result = parseTimeFrame('09:0017:00');

                expect(result.valid).toBe(false);
                expect(result.start).toBeUndefined();
                expect(result.end).toBeUndefined();
                expect(consoleSpy).toHaveBeenCalledTimes(1);
            });

            it('Empty string', () => {
                const result = parseTimeFrame('');

                expect(result.valid).toBe(false);
                expect(result.start).toBeUndefined();
                expect(result.end).toBeUndefined();
                expect(consoleSpy).toHaveBeenCalledTimes(1);
            });

            it('Non-string input', () => {
                const result = parseTimeFrame(null);

                expect(result.valid).toBe(false);
                expect(result.start).toBeUndefined();
                expect(result.end).toBeUndefined();
                expect(consoleSpy).toHaveBeenCalledTimes(1);
            });

            it('End time is before start time', () => {
                const timeFrame = '17:00-09:00';
                const result = parseTimeFrame(timeFrame);

                expect(result.valid).toBe(false);
                expect(result.start).toBeUndefined();
                expect(result.end).toBeUndefined();
                expect(consoleSpy).toHaveBeenCalledTimes(1);
            });
        });
    });

    describe('removeFromDate()', () => {
        it('Days', () => {
            const date = DateTime.fromISO('2025-01-01T00:00:00-05:00');
            const result = removeFromDate(date, 'day', 3);
            expect(result.toISO()).toBe('2024-12-29T00:00:00.000-05:00');
        });

        it('Hours', () => {
            const date = DateTime.fromISO('2025-01-01T00:00:00-05:00');
            const result = removeFromDate(date, 'hour', 3);
            expect(result.toISO()).toBe('2024-12-31T21:00:00.000-05:00');
        });

        it('Minutes', () => {
            const date = DateTime.fromISO('2025-01-01T00:00:00-05:00');
            const result = removeFromDate(date, 'minute', 30);
            expect(result.toISO()).toBe('2024-12-31T23:30:00.000-05:00');
        });

        it('Seconds', () => {
            const date = DateTime.fromISO('2025-01-01T00:00:00-05:00');
            const result = removeFromDate(date, 'second', 30);
            expect(result.toISO()).toBe('2024-12-31T23:59:30.000-05:00');
        });

        it('Milliseconds', () => {
            const date = DateTime.fromISO('2025-01-01T00:00:00-05:00');
            const result = removeFromDate(date, 'millisecond', 30);
            expect(result.toISO()).toBe('2024-12-31T23:59:59.970-05:00');
        });

        it('Weeks', () => {
            const date = DateTime.fromISO('2025-01-01T00:00:00-05:00');
            const result = removeFromDate(date, 'week', 3);
            expect(result.toISO()).toBe('2024-12-11T00:00:00.000-05:00');
        });

        it('Months', () => {
            const date = DateTime.fromISO('2025-01-01T00:00:00-05:00');
            const result = removeFromDate(date, 'month', 3);
            expect(result.toISO()).toBe('2024-10-01T00:00:00.000-04:00');
        });

        it('Years', () => {
            const date = DateTime.fromISO('2025-01-01T00:00:00-05:00');
            const result = removeFromDate(date, 'year', 3);
            expect(result.toISO()).toBe('2022-01-01T00:00:00.000-05:00');
        });
    });
});
