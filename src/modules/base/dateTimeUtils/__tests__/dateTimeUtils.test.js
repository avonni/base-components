import { getFormattedDate } from '../dateTimeUtils';
import { DateTime } from 'c/luxon';

const PRESETS = [
    'DATE_SHORT',
    'DATE_MED',
    'DATE_MED_WITH_WEEKDAY',
    'DATE_FULL',
    'DATE_HUGE',
    'TIME_SIMPLE',
    'TIME_WITH_SECONDS',
    'TIME_WITH_SHORT_OFFSET',
    'TIME_WITH_LONG_OFFSET',
    'TIME_24_SIMPLE',
    'TIME_24_WITH_SECONDS',
    'TIME_24_WITH_SHORT_OFFSET',
    'TIME_24_WITH_LONG_OFFSET',
    'DATETIME_SHORT',
    'DATETIME_SHORT_WITH_SECONDS',
    'DATETIME_MED',
    'DATETIME_MED_WITH_SECONDS',
    'DATETIME_MED_WITH_WEEKDAY',
    'DATETIME_FULL',
    'DATETIME_FULL_WITH_SECONDS',
    'DATETIME_HUGE',
    'DATETIME_HUGE_WITH_SECONDS'
];

const TOKENS = [
    'S',
    'SSS',
    'u',
    'uu',
    'uuu',
    's',
    'ss',
    'm',
    'mm',
    'h',
    'hh',
    'H',
    'HH',
    'ZZZZ',
    'ZZZZZ',
    'z',
    'a',
    'd',
    'dd',
    'c',
    'E',
    'ccc',
    'EEE',
    'cccc',
    'EEEE',
    'ccccc',
    'EEEEE',
    'L',
    'M',
    'LL',
    'MM',
    'LLL',
    'MMM',
    'LLLL',
    'MMMM',
    'LLLLL',
    'MMMMM',
    'y',
    'ii',
    'yy',
    'iiii',
    'yyyy',
    'G',
    'GG',
    'GGGGG',
    'kk',
    'kkkk',
    'W',
    'n',
    'nn',
    'WW',
    'o',
    'ooo',
    'q',
    'qq',
    'D',
    'DD',
    'DDD',
    'DDDD',
    't',
    'tt',
    'ttt',
    'tttt',
    'T',
    'TT',
    'TTT',
    'TTTT',
    'f',
    'ff',
    'fff',
    'ffff',
    'F',
    'FF',
    'FFF',
    'FFFF',
    'X',
    'x'
];

describe('Date Time Utils', () => {
    describe('STANDARD format', () => {
        it('Today', () => {
            const time = Intl.DateTimeFormat('default', {
                hour: 'numeric',
                minute: '2-digit'
            }).format(new Date());
            expect(
                getFormattedDate({ date: new Date(), format: 'STANDARD' })
            ).toBe(`Today ${time}`);
        });

        it('Yesterday', () => {
            const date = new Date(new Date() - 86400000);
            const time = Intl.DateTimeFormat('default', {
                hour: 'numeric',
                minute: '2-digit'
            }).format(date);
            expect(getFormattedDate({ date, format: 'STANDARD' })).toBe(
                `Yesterday ${time}`
            );
        });

        it('Any date', () => {
            const date = new Date(2024, 0, 28, 15, 30);
            const reference = Intl.DateTimeFormat('default', {
                hour: 'numeric',
                minute: '2-digit',
                month: 'short',
                day: 'numeric'
            }).format(date);
            expect(getFormattedDate({ date, format: 'STANDARD' })).toBe(
                reference
            );
        });

        it('Includes time zone', () => {
            const date = new Date(2024, 0, 28, 15, 30);
            const reference = Intl.DateTimeFormat('default', {
                hour: 'numeric',
                minute: '2-digit',
                month: 'short',
                day: 'numeric',
                timeZone: 'Pacific/Honolulu'
            }).format(date);
            expect(
                getFormattedDate({
                    date,
                    format: 'STANDARD',
                    timeZone: 'Pacific/Honolulu'
                })
            ).toBe(reference);
        });
    });

    describe('RELATIVE format', () => {
        it('Now', () => {
            const result = getFormattedDate({
                date: new Date(),
                format: 'RELATIVE'
            });
            expect(result).toBe('now');
        });

        it('5 minutes ago', () => {
            const result = getFormattedDate({
                date: new Date(new Date().getTime() - 300000),
                format: 'RELATIVE'
            });
            expect(result).toBe('5 minutes ago');
        });

        it('5 hours ago', () => {
            const result = getFormattedDate({
                date: new Date(new Date().getTime() - 18000000),
                format: 'RELATIVE'
            });
            expect(result).toBe('5 hours ago');
        });

        it('5 days ago', () => {
            const result = getFormattedDate({
                date: new Date(new Date().getTime() - 431999990),
                format: 'RELATIVE'
            });
            expect(result).toBe('5 days ago');
        });

        it('5 weeks ago', () => {
            const result = getFormattedDate({
                date: new Date(new Date().getTime() - 3024000000),
                format: 'RELATIVE'
            });
            expect(result).toBe('5 weeks ago');
        });

        it('2 years ago', () => {
            const result = getFormattedDate({
                date: new Date(new Date().getTime() - 47300000000),
                format: 'RELATIVE'
            });
            expect(result).toBe('2 years ago');
        });

        it('In 5 minutes', () => {
            const result = getFormattedDate({
                date: new Date(new Date().getTime() + 300005),
                format: 'RELATIVE'
            });
            expect(result).toBe('in 5 minutes');
        });

        it('In 5 hours', () => {
            const result = getFormattedDate({
                date: new Date(new Date().getTime() + 18000005),
                format: 'RELATIVE'
            });
            expect(result).toBe('in 5 hours');
        });

        it('In 5 days', () => {
            const result = getFormattedDate({
                date: new Date(new Date().getTime() + 432000001),
                format: 'RELATIVE'
            });
            expect(result).toBe('in 5 days');
        });

        it('In 5 weeks', () => {
            const result = getFormattedDate({
                date: new Date(new Date().getTime() + 3024000010),
                format: 'RELATIVE'
            });
            expect(result).toBe('in 5 weeks');
        });

        it('In 1 year', () => {
            const result = getFormattedDate({
                date: new Date(new Date().getTime() + 31540000000),
                format: 'RELATIVE'
            });
            expect(result).toBe('in 1 year');
        });
    });

    describe('Presets', () => {
        const date = new Date(2024, 0, 28, 15, 30);
        const dateTime = DateTime.fromJSDate(date);

        PRESETS.forEach((format) => {
            it(`${format}`, () => {
                const reference = dateTime.toLocaleString(DateTime[format]);
                expect(getFormattedDate({ date, format })).toBe(reference);
            });
        });

        it('Take time zone into account', () => {
            const format = {
                ...DateTime.DATE_FULL,
                timeZone: 'Pacific/Honolulu'
            };
            const reference = dateTime.toLocaleString(format);
            expect(
                getFormattedDate({
                    date,
                    format: 'DATE_FULL',
                    timeZone: 'Pacific/Honolulu'
                })
            ).toBe(reference);
        });
    });

    describe('Custom Format', () => {
        const date = new Date(2024, 0, 28, 15, 30);
        const dateTime = DateTime.fromJSDate(date);

        it('Contains a custom string and multiple tokens', () => {
            const result = getFormattedDate({
                date,
                format: "HH 'hours and' mm 'minutes'"
            });
            expect(result).toBe(
                dateTime.toFormat("HH 'hours and' mm 'minutes'")
            );
        });

        TOKENS.forEach((token) => {
            it(`Token ${token}`, () => {
                expect(
                    getFormattedDate({
                        date,
                        format: token
                    })
                ).toBe(dateTime.toFormat(token));
            });
        });
    });
});
