import { formatDateFromStyle, formatTimeString } from '../itemFormatUtils';

describe('Filter Menu: Item Format Utils', () => {
    describe('formatDateFromStyle()', () => {
        it('Date should be formatted', () => {
            const date = new Date('01/01/2020');
            const result = formatDateFromStyle(date, {
                timeStyle: 'long',
                showTime: true,
                timeZone: 'America/Toronto',
                dateStyle: 'long'
            });
            expect(result).toBe('January 1, 2020 at 12:00:00 AM EST');
        });

        it('Date should be formatted with short date style by default', () => {
            const date = new Date('01/01/2020');
            const result = formatDateFromStyle(date);
            expect(result).toBe('Jan 1, 2020');
        });

        it('Date should be formatted without time if showTime is false', () => {
            const date = new Date('01/01/2020');
            const result = formatDateFromStyle(date, {
                timeStyle: 'long',
                timeZone: 'America/Toronto',
                dateStyle: 'long'
            });
            expect(result).toBe('January 1, 2020');
        });

        it('Not instance date should return an empty string', () => {
            const result = formatDateFromStyle(null, {});
            expect(result).toBe('');
        });

        it('NaN should return an empty string', () => {
            const result = formatDateFromStyle(NaN, {});
            expect(result).toBe('');
        });
    });

    describe('formatTimeString()', () => {
        it('Time string in hh:mm:ss.SSS format should be formatted', () => {
            const result = formatTimeString('08:30:00.000');
            expect(result).toBe('8:30 AM');
        });

        it('Invalid DateTime should return empty string', () => {
            const result = formatTimeString('11:30');
            expect(result).toBe('');
        });

        it('Invalid time string should return empty string', () => {
            const result = formatTimeString('Invalid Time String');
            expect(result).toBe('');
        });
    });
});
