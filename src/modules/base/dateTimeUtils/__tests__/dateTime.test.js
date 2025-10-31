import { DateTime } from '../dateTime';
import { DateTime as LuxonDateTime } from 'c/luxon';

describe('Date Time Utils: Date Time', () => {
    describe('Properties', () => {
        it('day', () => {
            const utc = new DateTime('2025-01-28T00:00:00Z', 'UTC');
            expect(utc.day).toBe(28);

            const date = new DateTime(
                '2025-01-28T00:00:00Z',
                'America/Toronto'
            );
            expect(date.day).toBe(27);

            const luxon = LuxonDateTime.fromISO('2025-01-28T00:00:00Z', {
                timeZone: 'America/Toronto'
            });
            expect(date.day).toBe(luxon.day);
        });

        it('hour', () => {
            const utc = new DateTime('2025-01-28T00:00:00Z', 'UTC');
            expect(utc.hour).toBe(24);

            const date = new DateTime(
                '2025-01-28T00:00:00Z',
                'America/Toronto'
            );
            expect(date.hour).toBe(24 - 5);

            const luxon = LuxonDateTime.fromISO('2025-01-28T00:00:00Z', {
                timeZone: 'America/Toronto'
            });
            expect(date.hour).toBe(luxon.hour);
        });

        it('hour12', () => {
            const utc = new DateTime('2025-01-28T00:00:00Z', 'UTC');
            expect(utc.hour12).toBe(12);

            const date = new DateTime(
                '2025-01-28T00:00:00Z',
                'America/Toronto'
            );
            expect(date.hour12).toBe(12 - 5);
        });

        it('isoWeek', () => {
            const utc = new DateTime('2025-01-27T00:00:00Z', 'UTC');
            expect(utc.isoWeek).toBe(5);

            const date = new DateTime(
                '2025-01-27T00:00:00Z',
                'America/Toronto'
            );
            expect(date.isoWeek).toBe(4);
        });

        it('isoYear', () => {
            const utc = new DateTime('2024-12-30T00:00:00Z', 'UTC');
            expect(utc.isoYear).toBe(2025);

            const date = new DateTime(
                '2024-12-30T00:00:00Z',
                'America/Toronto'
            );
            expect(date.isoYear).toBe(2024);
        });

        it('minute', () => {
            const utc = new DateTime('2025-01-28T00:00:00Z', 'UTC');
            expect(utc.minute).toBe(0);

            const date = new DateTime(
                '2025-01-28T00:00:00Z',
                'America/Toronto'
            );
            expect(date.minute).toBe(0);

            const luxon = LuxonDateTime.fromISO('2025-01-28T00:00:00Z', {
                timeZone: 'America/Toronto'
            });
            expect(date.minute).toBe(luxon.minute);
        });

        it('month', () => {
            const utc = new DateTime('2025-01-01T00:00:00Z', 'UTC');
            expect(utc.month).toBe(1);

            const date = new DateTime(
                '2025-01-01T00:00:00Z',
                'America/Toronto'
            );
            expect(date.month).toBe(12);

            const luxon = LuxonDateTime.fromISO('2025-01-01T00:00:00Z', {
                timeZone: 'America/Toronto'
            });
            expect(date.month).toBe(luxon.month);
        });

        it('ordinal', () => {
            const utc = new DateTime('2025-01-01T00:00:00Z', 'UTC');
            expect(utc.ordinal).toBe(1);

            const date = new DateTime(
                '2025-01-01T00:00:00Z',
                'America/Toronto'
            );
            expect(date.ordinal).toBe(366);

            const luxon = LuxonDateTime.fromISO('2025-01-01T00:00:00Z', {
                timeZone: 'America/Toronto'
            });
            expect(date.ordinal).toBe(luxon.ordinal);
        });

        it('quarter', () => {
            const utc = new DateTime('2025-01-01T00:00:00Z', 'UTC');
            expect(utc.quarter).toBe(1);

            const date = new DateTime(
                '2025-01-01T00:00:00Z',
                'America/Toronto'
            );
            expect(date.quarter).toBe(4);

            const luxon = LuxonDateTime.fromISO('2025-01-01T00:00:00Z', {
                timeZone: 'America/Toronto'
            });
            expect(date.quarter).toBe(luxon.quarter);
        });

        it('second', () => {
            const utc = new DateTime('2025-01-01T00:00:00Z', 'UTC');
            expect(utc.second).toBe(0);

            const date = new DateTime(
                '2025-01-01T00:00:00Z',
                'America/Toronto'
            );
            expect(date.second).toBe(0);

            const luxon = LuxonDateTime.fromISO('2025-01-01T00:00:00Z', {
                timeZone: 'America/Toronto'
            });
            expect(date.second).toBe(luxon.second);
        });

        it('tzDate', () => {
            const noTimeZone = new DateTime('2025-01-01T00:00:00Z');
            expect(noTimeZone.tzDate).toEqual(new Date('2025-01-01T00:00:00Z'));

            const utc = new DateTime('2025-01-01T00:00:00Z', 'UTC');
            expect(utc.tzDate).toEqual(new Date(2025, 0, 1));

            const date = new DateTime(
                '2025-01-01T00:00:00-05:00',
                'America/Toronto'
            );
            expect(date.tzDate).toEqual(new Date(2025, 0, 1));
        });

        it('tzOffset', () => {
            const utc = new DateTime('2025-01-01T00:00:00Z', 'UTC');
            expect(utc.tzOffset).toBe('+00:00');

            const date = new DateTime(
                '2025-01-01T00:00:00-05:00',
                'America/Toronto'
            );
            expect(date.tzOffset).toBe('-05:00');
        });

        it('weekday', () => {
            const utc = new DateTime('2025-01-28T00:00:00Z', 'UTC');
            expect(utc.weekday).toBe(2);

            const date = new DateTime(
                '2025-01-28T00:00:00Z',
                'America/Toronto'
            );
            expect(date.weekday).toBe(1);

            const luxon = LuxonDateTime.fromISO('2025-01-28T00:00:00Z', {
                timeZone: 'America/Toronto'
            });
            expect(date.weekday).toBe(luxon.weekday);
        });

        it('year', () => {
            const utc = new DateTime('2025-01-01T00:00:00Z', 'UTC');
            expect(utc.year).toBe(2025);

            const date = new DateTime(
                '2025-01-01T00:00:00Z',
                'America/Toronto'
            );
            expect(date.year).toBe(2024);

            const luxon = LuxonDateTime.fromISO('2025-01-01T00:00:00Z', {
                timeZone: 'America/Toronto'
            });
            expect(date.year).toBe(luxon.year);
        });
    });

    describe('Methods', () => {
        it('toISO()', () => {
            const noTimeZone = new DateTime('2025-01-28T00:00:00Z');
            expect(noTimeZone.toISO()).toBe(
                new Date('2025-01-28T00:00:00Z').toISOString()
            );

            const utc = new DateTime('2025-01-28T00:00:00Z', 'UTC');
            expect(utc.toISO()).toBe('2025-01-28T00:00:00.000Z');

            const date = new DateTime(
                '2025-01-28T00:00:00Z',
                'America/Toronto'
            );
            expect(date.toISO()).toBe('2025-01-27T19:00:00.000-05:00');
        });
    });
});
